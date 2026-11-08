package dochi.docs.capture;

import static dochi.docs.capture.GuideCapture.*;
import com.google.gson.*;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.TimeUnit;
import net.dochi.npc.*;
import net.dochi.npc.core.*;
import net.minecraft.client.Minecraft;
import net.minecraft.client.gui.components.AbstractWidget;
import net.minecraft.client.gui.components.EditBox;
import net.minecraft.client.gui.screens.Screen;
import net.minecraft.commands.arguments.EntityAnchorArgument;
import net.minecraft.core.BlockPos;
import net.minecraft.core.Direction;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.world.Container;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.entity.Display;
import net.minecraft.world.item.*;
import net.minecraft.world.level.block.Blocks;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.world.phys.*;
import net.neoforged.neoforge.common.NeoForge;

/** Full native authoring lessons. No OBS APIs, files, profiles or process control. */
final class GuideCreateLessons {
    private static final Gson JSON=new GsonBuilder().setPrettyPrinting().create();
    private static final BlockPos SOURCE=new BlockPos(-4,-60,0), OUTPUT=new BlockPos(4,-60,0), RETURNS=new BlockPos(-4,-60,4),
        DEVICE=new BlockPos(0,-59,0), DEPOT=new BlockPos(0,-60,0), SEAT=new BlockPos(0,-60,1), SENSOR=new BlockPos(4,-60,2), BOARD=new BlockPos(-3,-58,-3);
    private static int actorId,recipientId,step;
    private static String task="",recording="";
    private static String lastContainerSettings="";
    private static boolean active,following;
    private static Path output;
    private static JsonArray annotations=new JsonArray(),actions=new JsonArray(),focus=new JsonArray();
    private static Throwable failure;
    private static long clock;
    private static Operation operation;
    private static Screen pointerScreen;
    private static double px=-1,py=-1,fromX,fromY,toX,toY;
    private static long moveAt,clickUntil;
    private static Rect highlight;
    private interface Locate {Rect find()throws Exception;}
    private interface Execute {void run(Rect rect)throws Exception;}
    private record Rect(double x,double y,double w,double h,boolean visible,double sx,double sy,int direction){}
    private static final class Operation {Locate locate;Execute execute;Rect rect;long at;int stage,revealTicks;String type="";int character;Screen owner;}
    static boolean allowsScreenTransition(){return active;}
    static boolean busy(){if(failure!=null)throw new IllegalStateException("Native lesson input failed",failure);return operation!=null;}
    static void abort(){active=false;following=false;failure=null;operation=null;pointerScreen=null;recording="";highlight=null;}

    private static Object nativeCall(Object target,String name,Object...args)throws Exception{
        var type=target instanceof Class<?> c?c:target.getClass();
        for(var m:type.getMethods())if(m.getName().equals(name)&&m.getParameterCount()==args.length)try{m.setAccessible(true);return m.invoke(target instanceof Class<?>?null:target,args);}catch(IllegalArgumentException wrong){}catch(java.lang.reflect.InvocationTargetException error){throw new RuntimeException(name,error.getCause());}
        return call(target,name,args);
    }
    private static void staticValue(String name,Object value)throws Exception{var field=GuideCreate.class.getDeclaredField(name);field.setAccessible(true);field.set(null,value);}
    static void register(Path folder){
        output=folder;
        NeoForge.EVENT_BUS.addListener((net.neoforged.neoforge.client.event.ClientTickEvent.Post event)->{
            clock++;try{tick(Minecraft.getInstance());}catch(Throwable error){failure=error;operation=null;try{Files.writeString(output.resolve("lesson-input-failure.txt"),error.toString());}catch(Exception ignored){}}
        });
        NeoForge.EVENT_BUS.addListener((net.neoforged.neoforge.client.event.ScreenEvent.Render.Post event)->{
            if(!active||pointerScreen!=event.getScreen()||px<0)return;var g=event.getGuiGraphics();g.pose().pushPose();g.pose().translate(0,0,1800);
            int x=(int)px,y=(int)py,c=System.nanoTime()<clickUntil?0xFFFFC857:0xFF6CE2F0;
            if(highlight!=null)g.renderOutline((int)highlight.x-3,(int)highlight.y-3,(int)highlight.w+6,(int)highlight.h+6,0xFFFFC857);
            g.fill(x-6,y-1,x+7,y+1,0xFF101922);g.fill(x-1,y-6,x+1,y+7,0xFF101922);g.fill(x-5,y,x+6,y+1,c);g.fill(x,y-5,x+1,y+6,c);g.renderOutline(x-9,y-9,19,19,c);g.pose().popPose();
        });
    }
    private static void tick(Minecraft mc)throws Exception{
        if(!active)return;
        if(following&&mc.screen==null&&mc.level!=null&&mc.level.getEntity(actorId)!=null){var npc=mc.level.getEntity(actorId);mc.player.lookAt(EntityAnchorArgument.Anchor.EYES,npc.position().add(0,1.05,0));}
        var op=operation;if(op==null)return;
        if(op.stage==0){
            var r=op.locate.find();if(!r.visible){if(++op.revealTicks>200)throw new IllegalStateException("Native control cannot be revealed");mc.screen.mouseScrolled(r.sx,r.sy,0,r.direction);return;}
            op.rect=r;pointerScreen=mc.screen;highlight=r;fromX=px<0?mc.screen.width/2d:px;fromY=py<0?mc.screen.height/2d:py;toX=r.x+r.w/2;toY=r.y+r.h/2;moveAt=System.nanoTime();op.at=clock;op.stage=1;
            if(!op.type.isEmpty()&&mc.screen.getClass().getSimpleName().equals("NpcEditorScreen")&&get(mc.screen,"choice")==null)focus(r,1.65);return;
        }
        if(op.stage==1){double t=Math.min(1,(clock-op.at)/8d),smooth=t*t*(3-2*t);px=fromX+(toX-fromX)*smooth;py=fromY+(toY-fromY)*smooth;
            set(mc.mouseHandler,"xpos",px*mc.getWindow().getGuiScale());set(mc.mouseHandler,"ypos",py*mc.getWindow().getGuiScale());
            if(clock-op.at<22)return;op.execute.run(op.rect);clickUntil=System.nanoTime()+700_000_000L;op.at=clock;op.stage=op.type.isEmpty()?3:2;return;
        }
        if(op.stage==2){if(clock-op.at<2)return;op.at=clock;if(op.character<op.type.length()){
                if(!op.owner.charTyped(op.type.charAt(op.character++),0))throw new IllegalStateException("Native character rejected");return;
            }captureFields(op.owner);op.stage=3;op.at=clock;return;
        }
        if(clock-op.at>=14){if(!op.type.isEmpty())focus(null,1);operation=null;highlight=null;}
    }
    private static double scale(Screen screen)throws Exception{try{return ((Number)get(screen,"zoom")).doubleValue();}catch(NoSuchFieldException absent){return 1;}}
    private static Rect rectangle(Screen s,AbstractWidget widget)throws Exception{
        double z=scale(s);boolean in=widget.visible;
        int top=132;
        if(s.getClass().getSimpleName().equals("NpcEditorScreen")&&((Collection<?>)get(s,"inspectorWidgets")).contains(widget)){
            top=((Number)nativeCall(s,"inspectorTop")).intValue();int bottom=((Number)get(s,"logicalH")).intValue()-52;in=widget.visible&&widget.getY()>=top&&widget.getY()+widget.getHeight()<=bottom;
        }
        return new Rect(widget.getX()*z,widget.getY()*z,widget.getWidth()*z,widget.getHeight()*z,in,s.width-40,s.height*.65,widget.getY()<top?2:-2);
    }
    private static AbstractWidget button(Screen s,String label)throws Exception{
        return s.children().stream().filter(v->v instanceof AbstractWidget w&&w.active&&w.getMessage().getString().equals(label)).map(v->(AbstractWidget)v).findFirst().orElseThrow(()->new IllegalStateException("Native control missing: "+label));
    }
    private static AbstractWidget field(Screen s,String key)throws Exception{
        if(key.equals("search"))return (AbstractWidget)get(s,"search");
        if(key.equals("menu-search"))return (AbstractWidget)get(get(get(s,"choice"),"schedule"),"search");
        var w=(AbstractWidget)((Map<?,?>)get(s,"fields")).get(key);if(w==null)throw new IllegalStateException("Native field missing: "+key);return w;
    }
    private static void click(Screen s,Rect r)throws Exception{double x=r.x+r.w/2,y=r.y+r.h/2;if(!s.mouseClicked(x,y,0))throw new IllegalStateException("Native click rejected at "+x+","+y);s.mouseReleased(x,y,0);}
    private static void captureFields(Screen s)throws Exception{
        if(s!=null&&s.getClass().getSimpleName().equals("NpcEditorScreen")&&get(s,"choice")==null)if(!(boolean)nativeCall(s,"capture"))throw new IllegalStateException("Native form rejected its fields");
    }
    private static void queue(Locate locate,Execute execute,String type)throws Exception{
        if(operation!=null)throw new IllegalStateException("Previous native operation still active");var op=new Operation();op.locate=locate;op.execute=execute;op.type=type;op.owner=Minecraft.getInstance().screen;operation=op;
    }
    private static Rect menuCategory(Screen screen,String wanted)throws Exception{
        var menu=get(get(screen,"choice"),"schedule");var categories=(List<String>)get(menu,"categories");int i=-1;
        for(int n=0;n<categories.size();n++)if(Component.translatable("dochi_npc.cycle.catalog.category."+categories.get(n)).getString().equals(wanted)){i=n;break;}
        if(i<0)throw new IllegalStateException("Action category missing: "+wanted);double z=scale(screen);return new Rect((((Number)get(menu,"x")).doubleValue()+8)*z,(((Number)get(menu,"listY")).doubleValue()+i*24)*z,((Number)get(menu,"left")).doubleValue()*z,22*z,true,0,0,0);
    }
    private static Rect menuAction(Screen screen,String wanted)throws Exception{
        var menu=get(get(screen,"choice"),"schedule");double z=scale(screen);var choices=(Map<?,?>)get(menu,"choices");
        for(var row:(List<?>)get(menu,"rows")){var item=nativeCall(row,"item");if(item==null)continue;var choice=choices.get(nativeCall(item,"id"));if(!((Component)nativeCall(choice,"label")).getString().equals(wanted))continue;
            double left=((Number)get(menu,"listX")).doubleValue(),top=((Number)get(menu,"listY")).doubleValue(),height=((Number)get(menu,"listH")).doubleValue(),y=top+((Number)nativeCall(row,"top")).doubleValue()-((Number)get(menu,"scroll")).doubleValue();
            return new Rect(left*z,y*z,(((Number)get(menu,"listW")).doubleValue()-16)*z,22*z,y>=top&&y+22<=top+height,(left+30)*z,(top+height/2)*z,y<top?1:-1);
        }throw new IllegalStateException("Action row missing: "+wanted);
    }
    private static BlockPos point(String key){return switch(key){case "source"->SOURCE;case "output","tank"->OUTPUT;case "returns"->RETURNS;case "device"->DEVICE;case "depot","ticker"->DEPOT;case "seat"->SEAT;case "workplace"->new BlockPos(0,-61,2);case "standing"->new BlockPos(0,-61,1);case "sensor"->SENSOR;case "board"->BOARD;case "network"->new BlockPos(-4,-60,-3);default->throw new IllegalArgumentException(key);};}
    private static void position(Minecraft mc,double x,double y,double z,Vec3 target)throws Exception{
        mc.getSingleplayerServer().submit(()->{var p=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());p.getAbilities().flying=true;p.onUpdateAbilities();p.teleportTo(x,y,z);return true;}).get(5,TimeUnit.SECONDS);mc.player.setPos(x,y,z);mc.player.lookAt(EntityAnchorArgument.Anchor.EYES,target);
    }
    private static ItemStack item(String id,int count){return new ItemStack(BuiltInRegistries.ITEM.get(ResourceLocation.parse(id)),count);}
    @SuppressWarnings({"unchecked","rawtypes"}) private static BlockState property(BlockState state,String name,Comparable value){for(var p:state.getProperties())if(p.getName().equals(name))return state.setValue((net.minecraft.world.level.block.state.properties.Property)p,value);throw new IllegalStateException(name);}
    private static void block(ServerLevel level,BlockPos at,String id){level.setBlockAndUpdate(at,BuiltInRegistries.BLOCK.get(ResourceLocation.parse(id)).defaultBlockState());}
    private static void label(ServerLevel level,BlockPos at,String text){
        var display=net.minecraft.world.entity.EntityType.TEXT_DISPLAY.create(level);var tag=new CompoundTag();tag.putString("text",new Gson().toJson(Map.of("text",text)));tag.putString("billboard","center");tag.putInt("background",0xC0101922);tag.putBoolean("shadow",true);tag.putInt("line_width",200);display.load(tag);display.moveTo(at.getX()+.5,at.getY()+1.25,at.getZ()+.5,0,0);level.addFreshEntity(display);
    }
    private static void network(ServerLevel level)throws Exception{
        var stock=new BlockPos(-4,-60,-3);var packager=stock.east();var link=packager.above();level.setBlockAndUpdate(stock,Blocks.BARREL.defaultBlockState());((Container)level.getBlockEntity(stock)).setItem(0,new ItemStack(Items.IRON_INGOT,16));
        block(level,packager,"create:packager");level.setBlockAndUpdate(packager,property(level.getBlockState(packager),"facing",Direction.EAST));block(level,link,"create:stock_link");level.setBlockAndUpdate(link,property(level.getBlockState(link),"face",net.minecraft.world.level.block.state.properties.AttachFace.FLOOR));
        var frequency=UUID.fromString("40fe7c33-d2cd-4155-b6e1-83ca717d2114");for(var at:List.of(link,DEPOT)){var behaviour=get(level.getBlockEntity(at),"behaviour");nativeCall(behaviour,"unload");set(behaviour,"freqId",frequency);nativeCall(Class.forName("com.simibubi.create.content.logistics.packagerLink.LogisticallyLinkedBehaviour"),"keepAlive",behaviour);}nativeCall(level.getBlockEntity(packager),"recheckIfLinksPresent");label(level,stock,"NETWORK STOCK · 16 IRON");
    }
    private static void board(ServerLevel level)throws Exception{
        for(int x=0;x<8;x++)for(int y=0;y<4;y++){var at=BOARD.offset(x,y,0);level.setBlockAndUpdate(at.north(),Blocks.STONE_BRICKS.defaultBlockState());block(level,at,"create:display_board");level.setBlockAndUpdate(at,property(level.getBlockState(at),"facing",Direction.SOUTH));}
        // The display's shaft axis follows its facing (Z here), unlike the press's X shaft.
    }
    private static void prepare(Minecraft mc,String kind)throws Exception{
        active=true;following=false;failure=null;operation=null;pointerScreen=null;px=py=-1;highlight=null;task=kind;
        GuideCreate.perform(mc,"create:setup:"+kind,output);GuideCreate.perform(mc,"create:off",output);active=true;
        actorId=((Number)get(GuideCreate.class,"actorId")).intValue();recipientId=((Number)get(GuideCreate.class,"recipientId")).intValue();
        mc.getSingleplayerServer().submit(()->{try{
            var level=mc.getSingleplayerServer().overworld();for(var entity:level.getEntitiesOfClass(Display.TextDisplay.class,new AABB(-20,-65,-20,20,-45,20)))entity.discard();
            var npc=(DochiNpcEntity)level.getEntity(actorId);var settings=npc.settings();settings.name="Create Worker";settings.dayCycle.enabled=false;settings.dayCycle.entries.clear();npc.applySettings(settings);
            if(kind.equals("parcel-return")&&!lastContainerSettings.isEmpty()){var replay=NpcSettings.fromJson(lastContainerSettings);replay.name="Create Worker";replay.dayCycle.enabled=false;npc.applySettings(replay);}
            if(recipientId!=0&&level.getEntity(recipientId) instanceof DochiNpcEntity recipient){var r=recipient.settings();r.name="Receiving Clerk";recipient.applySettings(r);}
            for(int x=-6;x<=6;x++)for(int z=-4;z<=6;z++)level.setBlockAndUpdate(new BlockPos(x,-61,z),(Math.abs(x)<=1?Blocks.SMOOTH_STONE:Blocks.POLISHED_ANDESITE).defaultBlockState());
            level.setBlockAndUpdate(SOURCE.below(),Blocks.LIME_TERRACOTTA.defaultBlockState());level.setBlockAndUpdate(OUTPUT.below(),Blocks.LIGHT_BLUE_TERRACOTTA.defaultBlockState());level.setBlockAndUpdate(RETURNS.below(),Blocks.ORANGE_TERRACOTTA.defaultBlockState());
            boolean source=List.of("polish","process","supply","parcel-npc","parcel-container","parcel-return").contains(kind);
            boolean destination=List.of("polish","process","parcel-container","parcel-return").contains(kind);
            boolean returns=kind.startsWith("parcel");
            if(source)label(level,SOURCE,kind.equals("supply")?"RECEIVING STOCK":"01 SOURCE");else level.setBlockAndUpdate(SOURCE,Blocks.AIR.defaultBlockState());
            if(destination)label(level,OUTPUT,"04 FINISHED");else if(!kind.equals("inspect"))level.setBlockAndUpdate(OUTPUT,Blocks.AIR.defaultBlockState());
            if(returns)label(level,RETURNS,"RETURN");else level.setBlockAndUpdate(RETURNS,Blocks.AIR.defaultBlockState());
            if(kind.equals("process"))label(level,DEPOT,"02 INPUT / 03 RESULT");
            if(kind.equals("keeper"))network(level);
            if(kind.equals("inspect"))board(level);
            if(kind.equals("seat")){level.setBlockAndUpdate(DEPOT,Blocks.AIR.defaultBlockState());label(level,SEAT,"CREATE SEAT");}
            if(kind.equals("control"))label(level,SENSOR,"IRON STOCK · SENSOR");
            for(var entity:level.getEntitiesOfClass(net.minecraft.world.entity.item.ItemEntity.class,new AABB(-20,-65,-20,20,-45,20)))entity.discard();
            var player=level.getServer().getPlayerList().getPlayer(mc.player.getUUID());player.getInventory().setItem(0,item("dochi_npc:dochi_core",1));player.getInventory().selected=0;return true;
        }catch(Exception error){throw new RuntimeException(error);}}).get(10,TimeUnit.SECONDS);
        mc.options.hideGui=false;mc.options.fov().set(50);position(mc,3,-58,6,new Vec3(0,-59,1));
    }
    private static void record(Minecraft mc,String id)throws Exception{
        recording=id;step=0;annotations=new JsonArray();actions=new JsonArray();focus=new JsonArray();GuideScenes.perform(mc,"gif:start:"+id,actorId,output);
    }
    private static double elapsed()throws Exception{return (System.nanoTime()-((Number)get(GuideScenes.class,"recordingStarted")).longValue())/1_000_000d;}
    private static void caption(String text)throws Exception{var parts=text.split("\\|",2);var row=new JsonObject();row.addProperty("startMs",elapsed());row.addProperty("step",++step);row.addProperty("title",parts[0]);row.addProperty("body",parts.length>1?parts[1]:"");annotations.add(row);Files.writeString(output.resolve(recording+"-annotations.json"),JSON.toJson(annotations));}
    private static void focus(Rect rect,double zoom)throws Exception{if(recording.isEmpty())return;var row=new JsonObject();row.addProperty("startMs",elapsed());row.addProperty("zoom",zoom);if(rect!=null){double factor=Minecraft.getInstance().getWindow().getGuiScale();row.addProperty("centerX",(rect.x+rect.w/2)*factor);row.addProperty("centerY",(rect.y+rect.h/2)*factor);}focus.add(row);Files.writeString(output.resolve(recording+"-focus.json"),JSON.toJson(focus));}
    static void perform(Minecraft mc,String action,Path folder)throws Exception{
        String command=action.substring(7);if(command.startsWith("prepare:")){prepare(mc,command.substring(8));return;}
        if(command.startsWith("record:")){record(mc,command.substring(7));return;}
        if(command.startsWith("caption:")){caption(command.substring(8));return;}
        if(command.equals("power-board")){
            mc.getSingleplayerServer().submit(()->{try{var level=mc.getSingleplayerServer().overworld();var controller=NpcCreateFactoryAccess.board(level,BOARD);if(controller==null)throw new IllegalStateException("Board not assembled before preparing power");var cog=((BlockPos)nativeCall(controller,"getBlockPos")).west();block(level,cog,"create:cogwheel");level.setBlockAndUpdate(cog,property(level.getBlockState(cog),"axis",Direction.Axis.Z));var at=cog.north();block(level,at,"create:creative_motor");level.setBlockAndUpdate(at,property(level.getBlockState(at),"facing",Direction.SOUTH));nativeCall(get(level.getBlockEntity(at),"generatedSpeed"),"setValue",64);nativeCall(level.getBlockEntity(at),"updateGeneratedRotation");return true;}catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);return;
        }
        if(command.equals("check-board-power")){
            var controller=NpcCreateFactoryAccess.board(mc.level,BOARD);var power=new JsonObject();power.addProperty("clientController",controller==null?"missing":nativeCall(controller,"getBlockPos").toString());power.addProperty("clientSpeed",controller==null?0:((Number)nativeCall(controller,"getSpeed")).doubleValue());power.addProperty("clientRunning",controller!=null&&(Boolean)nativeCall(controller,"isSpeedRequirementFulfilled"));
            power.addProperty("serverSpeed",mc.getSingleplayerServer().submit(()->{try{return ((Number)nativeCall(NpcCreateFactoryAccess.board(mc.getSingleplayerServer().overworld(),BOARD),"getSpeed")).doubleValue();}catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS));Files.writeString(output.resolve("board-power.json"),JSON.toJson(power));
            if(!power.get("clientRunning").getAsBoolean())throw new IllegalStateException("The actual client board is not powered: "+power);return;
        }
        if(!recording.isEmpty()){var row=new JsonObject();row.addProperty("atMs",elapsed());row.addProperty("command",command);row.addProperty("screen",mc.screen==null?"world":mc.screen.getClass().getSimpleName());actions.add(row);Files.writeString(output.resolve(recording+"-actions.json"),JSON.toJson(actions));}
        if(command.startsWith("button:")){String label=command.substring(7);Screen s=mc.screen;queue(()->rectangle(s,button(s,label)),r->click(s,r),"");return;}
        if(command.startsWith("input:")){
            var pair=command.substring(6).split("=",2);Screen s=mc.screen;queue(()->rectangle(s,field(s,pair[0])),r->{click(s,r);var box=(EditBox)field(s,pair[0]);box.setCursorPosition(box.getValue().length());box.setHighlightPos(0);},pair[1]);return;
        }
        if(command.startsWith("category:")){String wanted=command.substring(9);Screen s=mc.screen;queue(()->menuCategory(s,wanted),r->click(s,r),"");return;}
        if(command.startsWith("action:")){String wanted=command.substring(7);Screen s=mc.screen;queue(()->menuAction(s,wanted),r->click(s,r),"");return;}
        if(command.startsWith("item:")){
            String id=command.substring(5);Screen s=mc.screen;queue(()->{var rows=(List<ItemStack>)get(s,"results");int index=-1;for(int i=0;i<rows.size();i++)if(BuiltInRegistries.ITEM.getKey(rows.get(i).getItem()).toString().equals(id)){index=i;break;}if(index<0)throw new IllegalStateException("Item search did not find "+id);int visible=index-((Number)get(s,"row")).intValue()*18;double z=scale(s),x=((Number)get(s,"gridX")).doubleValue(),y=((Number)get(s,"gridY")).doubleValue();return new Rect((x+visible%18*30)*z,(y+visible/18*30)*z,28*z,28*z,visible>=0&&visible<108,(x+200)*z,(y+90)*z,visible<0?1:-1);},r->click(s,r),"");return;
        }
        if(command.startsWith("recipient:")){
            String name=command.substring(10);Screen s=mc.screen;queue(()->{var widget=s.children().stream().filter(v->v instanceof AbstractWidget w&&w.active&&w.getMessage().getString().startsWith(name+" ·")).map(v->(AbstractWidget)v).findFirst().orElseThrow();return rectangle(s,widget);},r->click(s,r),"");return;
        }
        if(command.startsWith("view:")){String key=command.substring(5);var at=point(key);mc.options.hideGui=false;following=false;pointerScreen=null;highlight=null;position(mc,at.getX()+3.1,at.getY()+1.3,at.getZ()+3.4,Vec3.atCenterOf(at));return;}
        if(command.startsWith("choose:")){
            var at=point(command.substring(7));boolean old=mc.player.input.shiftKeyDown;mc.player.input.shiftKeyDown=true;var hit=new BlockHitResult(Vec3.atCenterOf(at),Direction.UP,at,false);mc.hitResult=hit;
            try{nativeCall(Class.forName("net.dochi.npc.client.NpcCookingBlockPicker"),"choose",mc.player,mc.level,InteractionHand.MAIN_HAND,hit);}finally{mc.player.input.shiftKeyDown=old;}
            if(mc.screen==null)throw new IllegalStateException("Native target picker did not return");pointerScreen=null;highlight=null;return;
        }
        if(command.equals("editor")){
            following=false;mc.options.hideGui=false;var npc=mc.level.getEntity(actorId);position(mc,npc.getX()+1.7,npc.getY()+.3,npc.getZ()+2.2,npc.getEyePosition());mc.getSingleplayerServer().submit(()->{mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID()).getInventory().selected=0;return true;}).get(5,TimeUnit.SECONDS);mc.player.getInventory().selected=0;
            if(!DochiNpc.isCore(mc.player.getMainHandItem()))throw new IllegalStateException("Recording player is not holding the actual NPC Core");
            mc.gameMode.interact(mc.player,mc.level.getEntity(actorId),InteractionHand.MAIN_HAND);return;
        }
        if(command.equals("verify-saved")){
            if((boolean)get(mc.screen,"requestPending"))throw new IllegalStateException("Server save pending");String json=mc.getSingleplayerServer().submit(()->((DochiNpcEntity)mc.getSingleplayerServer().overworld().getEntity(actorId)).editorJson()).get(5,TimeUnit.SECONDS);var settings=NpcSettings.fromJson(json);
            if(!settings.dayCycle.enabled||settings.dayCycle.entries.size()!=1||settings.dayCycle.entries.get(0).actions.size()!=1||settings.dayCycle.entries.get(0).end!=12000)throw new IllegalStateException("The complete authored schedule was not saved");
            Files.writeString(output.resolve(recording+"-saved.json"),json);if(task.equals("parcel-container"))lastContainerSettings=json;return;
        }
        if(command.equals("expand-time")){
            var s=mc.screen;queue(()->{double z=scale(s),x=((Number)nativeCall(s,"middleLeft")).doubleValue();return new Rect(x*z,140*z,20*z,20*z,true,0,0,0);},r->click(s,r),"");return;
        }
        if(command.equals("reuse-action")){
            var s=mc.screen;int left=((Number)nativeCall(s,"middleLeft")).intValue()+46;
            // Select the expanded native action row. Wrapped tabs obtain their label from a supplier.
            queue(()->{var w=s.children().stream().filter(v->v instanceof AbstractWidget a&&a.active&&a.getX()==left&&a.getY()>=166).map(v->(AbstractWidget)v).findFirst().orElseThrow(()->new IllegalStateException("Expanded delivery action row missing"));return rectangle(s,w);},r->click(s,r),"");return;
        }
        if(command.equals("arm")){staticValue("sceneStart",mc.getSingleplayerServer().overworld().getGameTime());((JsonArray)get(GuideCreate.class,"samples")).asList().clear();staticValue("tracking",true);return;}
        if(command.equals("close")){if(mc.screen!=null)mc.screen.onClose();pointerScreen=null;highlight=null;return;}
        if(command.equals("camera")){mc.options.hideGui=true;mc.options.fov().set(40);position(mc,3,-59.1,4.5,new Vec3(0,-59,1));following=true;return;}
        if(command.equals("board-camera")){following=false;mc.options.hideGui=true;mc.options.fov().set(40);position(mc,.5,-56.4,6.5,new Vec3(.5,-56.4,-3));return;}
        if(command.startsWith("open:")){
            var at=point(command.substring(5));following=false;mc.getSingleplayerServer().submit(()->{var p=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());p.getInventory().selected=1;return true;}).get(5,TimeUnit.SECONDS);mc.player.getInventory().selected=1;
            mc.gameMode.useItemOn(mc.player,InteractionHand.MAIN_HAND,new BlockHitResult(Vec3.atCenterOf(at),Direction.SOUTH,at,false));return;
        }
        if(command.equals("interact")){
            following=false;position(mc,2,-60,4,mc.level.getEntity(actorId).getEyePosition());mc.getSingleplayerServer().submit(()->{mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID()).getInventory().selected=1;return true;}).get(5,TimeUnit.SECONDS);mc.player.getInventory().selected=1;mc.gameMode.interact(mc.player,mc.level.getEntity(actorId),InteractionHand.MAIN_HAND);return;
        }
        if(command.equals("end-shift")){GuideCreate.perform(mc,"create:end-shift",output);return;}
        if(command.equals("fill-sensor")){GuideCreate.perform(mc,"create:fill-sensor",output);return;}
        if(command.equals("block-destination")){staticValue("kind","parcel-return");task="parcel-return";return;}
        if(command.equals("verify")){GuideCreate.perform(mc,"create:verify",output);return;}
        if(command.equals("verify-orders")){GuideCreate.perform(mc,"create:verify-orders",output);return;}
        if(command.equals("verify-board")){
            perform(mc,"lesson:check-board-power",folder);
            var clientBoard=NpcCreateFactoryAccess.board(mc.level,BOARD);var titleLine=((List<?>)nativeCall(clientBoard,"getLines")).get(1);
            for(var section:(List<?>)nativeCall(titleLine,"getSections"))for(boolean spinning:(boolean[])get(section,"spinning"))if(spinning)throw new IllegalStateException("Board title has not visually settled");
            var report=mc.getSingleplayerServer().submit(()->{try{var level=mc.getSingleplayerServer().overworld();var board=NpcCreateFactoryAccess.board(level,BOARD);if(board==null)throw new IllegalStateException("Native display controller unavailable");var lines=(List<?>)nativeCall(board,"getLines");var values=new JsonArray();
                for(var line:lines){var text=new StringBuilder();for(var section:(List<?>)nativeCall(line,"getSections")){var value=nativeCall(section,"getText");text.append(value instanceof Component c?c.getString():value);}values.add(text.toString());}
                if(values.asList().stream().noneMatch(v->v.getAsString().contains("Factory report")))throw new IllegalStateException("NPC report did not reach the powered board: "+values);var proof=new JsonObject();proof.add("lines",values);proof.addProperty("speed",((Number)nativeCall(board,"getSpeed")).doubleValue());proof.addProperty("nativeClientPowered",true);proof.addProperty("nativeClientTitleSettled",true);return proof;
            }catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);Files.writeString(output.resolve(recording+"-board.json"),JSON.toJson(report));return;
        }
        if(command.equals("finish")){GuideScenes.perform(mc,"gif:stop",actorId,output);active=false;following=false;pointerScreen=null;highlight=null;recording="";return;}
        throw new IllegalArgumentException(action);
    }
}
