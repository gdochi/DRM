package dochi.docs.capture;

import static dochi.docs.capture.GuideCapture.*;
import com.google.gson.*;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.TimeUnit;
import net.dochi.npc.*;
import net.dochi.npc.core.*;
import net.dochi.npc.compat.*;
import net.minecraft.client.Minecraft;
import net.minecraft.client.gui.components.AbstractWidget;
import net.minecraft.client.gui.screens.Screen;
import net.minecraft.commands.arguments.EntityAnchorArgument;
import net.minecraft.core.BlockPos;
import net.minecraft.core.Direction;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.world.Container;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.item.*;
import net.minecraft.world.level.block.Blocks;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.world.phys.*;
import net.neoforged.neoforge.common.NeoForge;

/** Owned documentation world. Production NPC controllers and Create retain all execution. */
final class GuideCreate {
    private static final BlockPos SOURCE=new BlockPos(-4,-60,0),OUTPUT=new BlockPos(4,-60,0),
        STATION=new BlockPos(0,-60,0),DEVICE=STATION.above(),RETURNS=new BlockPos(-4,-60,4),
        SEAT=new BlockPos(0,-60,1),TICKER=new BlockPos(0,-60,0),SENSOR=new BlockPos(4,-60,2),
        STOCK=new BlockPos(-4,-60,-3),PACKAGER=STOCK.east(),LINK=PACKAGER.above();
    private static int actorId,recipientId;
    private static String kind="",caption="";
    private static boolean tracking,returnBlocked,picking;
    private static long sceneStart;
    private static Path evidence;
    private static final JsonArray samples=new JsonArray();
    private static volatile String statusLine="",countsLine="";
    private static final Gson JSON=new GsonBuilder().setPrettyPrinting().create();
    // Public native APIs avoid resolving unrelated private optional-mod signatures.
    private static Object call(Object target,String name,Object...args)throws Exception{
        var type=target instanceof Class<?> c?c:target.getClass();
        for(var method:type.getMethods())if(method.getName().equals(name)&&method.getParameterCount()==args.length){
            try{return method.invoke(target instanceof Class<?>?null:target,args);}catch(IllegalArgumentException wrongOverload){}
            catch(java.lang.reflect.InvocationTargetException error){throw new RuntimeException(name,error.getCause());}
        }
        return GuideCapture.call(target,name,args);
    }
    static void register(Path output){
        evidence=output;
        NeoForge.EVENT_BUS.addListener((net.neoforged.neoforge.event.tick.ServerTickEvent.Post event)->{
            if(!tracking)return;
            try{sample(event.getServer().overworld());}catch(Exception error){tracking=false;try{Files.writeString(output.resolve("create-sample-error.txt"),error.toString());}catch(Exception ignored){}}
        });
        NeoForge.EVENT_BUS.addListener((net.neoforged.neoforge.client.event.RenderGuiEvent.Post event)->{
            if(caption.isEmpty())return;var mc=Minecraft.getInstance();var g=event.getGuiGraphics();int w=mc.getWindow().getGuiScaledWidth(),h=mc.getWindow().getGuiScaledHeight();
            if(!picking){g.fill(8,8,w-8,42,0xDE101922);g.drawString(mc.font,statusLine,15,14,0xFFFFDD88,false);g.drawString(mc.font,countsLine,15,28,0xFFFFFFFF,false);}
            g.fill(8,h-55,w-8,h-34,0xEE101922);g.drawCenteredString(mc.font,caption,w/2,h-48,0xFFFFFFFF);
        });
    }
    private static ItemStack item(String id,int count){return new ItemStack(BuiltInRegistries.ITEM.get(ResourceLocation.parse(id)),count);}
    private static void block(ServerLevel level,BlockPos at,String id){level.setBlockAndUpdate(at,BuiltInRegistries.BLOCK.get(ResourceLocation.parse(id)).defaultBlockState());}
    @SuppressWarnings({"unchecked","rawtypes"}) private static BlockState property(BlockState state,String name,Comparable value){for(var p:state.getProperties())if(p.getName().equals(name))return state.setValue((net.minecraft.world.level.block.state.properties.Property)p,value);throw new IllegalArgumentException("Missing block property "+name);}
    private static void point(NpcCreateJobSettings.Point p,BlockPos at){p.set=true;p.dimension="minecraft:overworld";p.x=at.getX();p.y=at.getY();p.z=at.getZ();}
    private static Container container(ServerLevel level,BlockPos at){return level.getBlockEntity(at) instanceof Container value?value:null;}
    private static int count(Container inventory,String id){if(inventory==null)return 0;int value=0;for(int i=0;i<inventory.getContainerSize();i++)if(BuiltInRegistries.ITEM.getKey(inventory.getItem(i).getItem()).toString().equals(id))value+=inventory.getItem(i).getCount();return value;}
    private static int packages(Container inventory){if(inventory==null)return 0;int value=0;for(int i=0;i<inventory.getContainerSize();i++)if(NpcCreateJobs.address(inventory.getItem(i))!=null)value+=inventory.getItem(i).getCount();return value;}
    private static ItemStack parcel(String address)throws Exception{var type=Class.forName("com.simibubi.create.content.logistics.box.PackageItem");var stack=(ItemStack)call(type,"containing",List.of(new ItemStack(Items.DIAMOND,3),new ItemStack(Items.IRON_INGOT,7)));call(type,"addAddress",stack,address);return stack;}
    private static DochiNpcEntity actor(ServerLevel level,String name,NpcDayCycle.Work work,double x,double z){
        var npc=DochiNpc.NPC.create(level);var settings=new NpcSettings();settings.name=name;settings.invulnerable=true;settings.fixedPosition=false;settings.fixedRotation=false;settings.lookAtPlayers=false;settings.sleepEnabled=false;settings.returnHome=false;settings.dayCycle.enabled=false;
        var entry=new NpcDayCycle.Entry();entry.name="Create day shift";entry.start=0;entry.end=12000;entry.activity=NpcDayCycle.Activity.WORK;entry.work=work;entry.relativeToNpc=true;entry.radius=32;entry.createJob.repeat=false;entry.createJob.batch=2;entry.createJob.interval=20;entry.createJob.recipientWait=40;
        settings.dayCycle.entries.add(entry);npc.moveTo(x,-60,z,0,0);npc.applySettings(settings);npc.setPersistenceRequired();level.addFreshEntity(npc);return npc;
    }
    private static void setup(Minecraft mc,String task)throws Exception{
        tracking=false;caption="";samples.asList().clear();kind=task;returnBlocked=false;picking=false;recipientId=0;
        call(Class.forName("net.dochi.npc.client.NpcCookingBlockPicker"),"clear");
        mc.setScreen(null);mc.options.fov().set(60);mc.options.bobView().set(false);
        mc.options.getSoundSourceOptionInstance(net.minecraft.sounds.SoundSource.MUSIC).set(0d);mc.options.getSoundSourceOptionInstance(net.minecraft.sounds.SoundSource.RECORDS).set(0d);mc.getSoundManager().stop();
        Files.writeString(evidence.resolve("create-audio.json"),"{\"music\":"+mc.options.getSoundSourceOptionInstance(net.minecraft.sounds.SoundSource.MUSIC).get()+",\"records\":"+mc.options.getSoundSourceOptionInstance(net.minecraft.sounds.SoundSource.RECORDS).get()+",\"existingSoundsStopped\":true}");
        mc.getSingleplayerServer().submit(()->{try{
            var server=mc.getSingleplayerServer();var level=server.overworld();var player=server.getPlayerList().getPlayer(mc.player.getUUID());call(Class.forName("net.dochi.npc.NpcEditSessions"),"end",player);
            for(var old:level.getEntitiesOfClass(DochiNpcEntity.class,new AABB(-40,-65,-40,40,-40,40)))old.discard();
            level.setDayTime(6000);level.getGameRules().getRule(net.minecraft.world.level.GameRules.RULE_DAYLIGHT).set(false,server);level.getGameRules().getRule(net.minecraft.world.level.GameRules.RULE_DOMOBSPAWNING).set(false,server);
            for(int x=-12;x<=12;x++)for(int z=-7;z<=10;z++){level.setBlockAndUpdate(new BlockPos(x,-61,z),((x+z)%2==0?Blocks.SMOOTH_STONE:Blocks.POLISHED_ANDESITE).defaultBlockState());for(int y=-60;y<=-55;y++)level.setBlockAndUpdate(new BlockPos(x,y,z),Blocks.AIR.defaultBlockState());}
            for(var old:level.getEntitiesOfClass(net.minecraft.world.entity.item.ItemEntity.class,new AABB(-40,-65,-40,40,-40,40)))old.discard();
            for(var at:List.of(SOURCE,OUTPUT,RETURNS))level.setBlockAndUpdate(at,Blocks.BARREL.defaultBlockState());
            NpcDayCycle.Work work=switch(task){case "crank","setup"->NpcDayCycle.Work.CREATE_CRANK;case "valve"->NpcDayCycle.Work.CREATE_VALVE;case "polish"->NpcDayCycle.Work.CREATE_POLISH;case "parcel-npc","parcel-container","parcel-return","routes"->NpcDayCycle.Work.CREATE_PACKAGE_DELIVERY;case "keeper"->NpcDayCycle.Work.CREATE_STOCK_KEEPER;case "process","factory"->NpcDayCycle.Work.CREATE_PROCESS;case "supply"->NpcDayCycle.Work.CREATE_SUPPLY;case "control"->NpcDayCycle.Work.CREATE_CONTROL;case "inspect"->NpcDayCycle.Work.CREATE_INSPECT;default->NpcDayCycle.Work.STATION;};
            var npc=actor(level,"Create "+task,work,-2.5,2.5);actorId=npc.getId();var settings=npc.settings();var entry=settings.dayCycle.entries.get(0);var p=entry.createJob;point(p.source,SOURCE);point(p.output,OUTPUT);point(p.returns,RETURNS);point(p.workplace,STATION.offset(0,0,2));p.yaw=0;
            if(List.of("setup","crank","valve","control","inspect").contains(task)){
                level.setBlockAndUpdate(DEVICE.north(),Blocks.STONE_BRICKS.defaultBlockState());block(level,DEVICE,task.equals("valve")?"create:copper_valve_handle":"create:hand_crank");level.setBlockAndUpdate(DEVICE,property(level.getBlockState(DEVICE),"facing",Direction.SOUTH));
                var k=entry.kinetics;k.targetSet=!task.equals("setup");k.x=DEVICE.getX();k.y=DEVICE.getY();k.z=DEVICE.getZ();k.timed=true;k.duration=80;k.repetitions=2;k.interval=20;
                if(task.equals("valve"))call(get(level.getBlockEntity(DEVICE),"angleInput"),"setValue",90);
            }
            if(task.equals("polish")){container(level,SOURCE).setItem(0,item("create:sand_paper",1));container(level,SOURCE).setItem(1,item("create:rose_quartz",2));}
            if(task.startsWith("parcel")||task.equals("routes")){
                var recipient=actor(level,"Workshop recipient",NpcDayCycle.Work.STATION,4.5,2.5);recipientId=recipient.getId();recipient.setNoAi(true);
                var route=new NpcCreateJobSettings.Route();route.address="Workshop A";route.recipient=recipient.getUUID().toString();route.name="Workshop recipient";route.dimension="minecraft:overworld";
                if(task.equals("parcel-container")||task.equals("parcel-return")){route.target="CONTAINER";point(route.destination,OUTPUT);}p.routes.add(route);p.batch=1;
                container(level,SOURCE).setItem(0,parcel("Workshop A"));container(level,SOURCE).setItem(1,parcel("Unknown"));
            }
            if(task.equals("keeper")||task.equals("seat")){block(level,SEAT,"create:yellow_seat");block(level,TICKER,"create:stock_ticker");point(p.ticker,TICKER);point(p.seat,SEAT);
                if(task.equals("seat")){entry.activity=NpcDayCycle.Activity.RIDE;entry.ride.createSeat=true;entry.ride.seatDimension="minecraft:overworld";entry.ride.seatX=SEAT.getX();entry.ride.seatY=SEAT.getY();entry.ride.seatZ=SEAT.getZ();}}
            if(task.equals("process")||task.equals("factory")){
                block(level,STATION,"create:depot");block(level,STATION.above(2),"create:mechanical_press");level.setBlockAndUpdate(STATION.above(2),property(level.getBlockState(STATION.above(2)),"facing",Direction.EAST));
                block(level,STATION.above(2).west(),"create:creative_motor");level.setBlockAndUpdate(STATION.above(2).west(),property(level.getBlockState(STATION.above(2).west()),"facing",Direction.EAST));var motor=level.getBlockEntity(STATION.above(2).west());call(get(motor,"generatedSpeed"),"setValue",64);call(motor,"updateGeneratedRotation");
                container(level,SOURCE).setItem(0,new ItemStack(Items.IRON_INGOT,2));point(p.factory.input,STATION);point(p.factory.result,STATION);p.batch=2;p.factory.timeout=1200;
            }
            if(task.equals("supply")){
                level.setBlockAndUpdate(STOCK,Blocks.BARREL.defaultBlockState());container(level,STOCK).setItem(0,new ItemStack(Items.IRON_INGOT,16));
                block(level,PACKAGER,"create:packager");level.setBlockAndUpdate(PACKAGER,property(level.getBlockState(PACKAGER),"facing",Direction.EAST));block(level,LINK,"create:stock_link");level.setBlockAndUpdate(LINK,property(level.getBlockState(LINK),"face",net.minecraft.world.level.block.state.properties.AttachFace.FLOOR));block(level,TICKER,"create:stock_ticker");
                var network=UUID.fromString("f9be02cb-1d36-4b74-8b6e-9079f018b6da");for(var at:List.of(LINK,TICKER)){var behaviour=get(level.getBlockEntity(at),"behaviour");call(behaviour,"unload");set(behaviour,"freqId",network);call(Class.forName("com.simibubi.create.content.logistics.packagerLink.LogisticallyLinkedBehaviour"),"keepAlive",behaviour);}call(level.getBlockEntity(PACKAGER),"recheckIfLinksPresent");
                point(p.ticker,TICKER);p.factory.address="Workshop A";p.factory.materials.get(0).count=4;
            }
            if(task.equals("control")){level.setBlockAndUpdate(SENSOR,Blocks.BARREL.defaultBlockState());point(p.workplace,DEVICE);point(p.factory.sensor,SENSOR);p.factory.sensorKind="ITEMS";p.factory.sensorItem="minecraft:iron_ingot";p.factory.low=2;p.factory.high=6;p.factory.whenBelow=true;}
            if(task.equals("inspect")){var a=new NpcCreateJobSettings.Point();point(a,DEVICE);p.factory.inspections.add(a);block(level,OUTPUT,"create:fluid_tank");var b=new NpcCreateJobSettings.Point();point(b,OUTPUT);p.factory.inspections.add(b);p.interval=80;}
            npc.applySettings(settings);npc.setNoAi(false);player.getInventory().clearContent();player.getAbilities().flying=true;player.onUpdateAbilities();player.teleportTo(8,-56,10);return true;
        }catch(Exception error){throw new RuntimeException(error);}}).get(15,TimeUnit.SECONDS);
        statusLine="Prepared example — schedule paused";countsLine="DNPC 0.1.3 / Create 6.0.10 / NeoForge 1.21.1";
    }
    private static void sample(ServerLevel level)throws Exception{
        var npc=(DochiNpcEntity)level.getEntity(actorId);if(npc==null)return;long elapsed=level.getGameTime()-sceneStart;
        if(kind.equals("parcel-return")&&!returnBlocked&&npc.createJobs().pendingParcel()){for(int i=0;i<container(level,OUTPUT).getContainerSize();i++)container(level,OUTPUT).setItem(i,new ItemStack(Items.STONE,64));returnBlocked=true;}
        JsonObject row=new JsonObject();row.addProperty("tick",elapsed);row.addProperty("x",npc.getX());row.addProperty("y",npc.getY());row.addProperty("z",npc.getZ());row.addProperty("activity",npc.activity());row.addProperty("status",npc.createJobs().status());row.addProperty("kineticStatus",npc.kinetics().status());row.addProperty("mounted",npc.isPassenger());
        row.addProperty("raw",count(container(level,SOURCE),kind.equals("polish")?"create:rose_quartz":"minecraft:iron_ingot"));row.addProperty("finished",count(container(level,OUTPUT),kind.equals("polish")?"create:polished_rose_quartz":"create:iron_sheet"));row.addProperty("sourceParcels",packages(container(level,SOURCE)));row.addProperty("outputParcels",packages(container(level,OUTPUT)));row.addProperty("returnParcels",packages(container(level,RETURNS)));row.addProperty("cargoParcels",packages(npc.inventory()));row.add("journal",JsonParser.parseString(npc.createJobs().save()));
        if(recipientId!=0&&level.getEntity(recipientId) instanceof DochiNpcEntity recipient)row.addProperty("recipientParcels",packages(recipient.inventory()));
        if(List.of("crank","valve","control","inspect").contains(kind)){var nativeDevice=NpcCreateKinetics.sample(level,DEVICE,0);if(nativeDevice!=null){row.addProperty("rpm",nativeDevice.speed());row.addProperty("inUse",nativeDevice.inUse());}}
        if(kind.equals("supply")){row.addProperty("networkIron",count(container(level,STOCK),"minecraft:iron_ingot"));row.add("packagerInventory",new Gson().toJsonTree(String.valueOf(get(level.getBlockEntity(PACKAGER),"inventory"))));}
        samples.add(row);String key=kind.equals("crank")||kind.equals("valve")?npc.kinetics().status():npc.createJobs().status();statusLine=Component.translatable("dochi_npc."+key).getString();
        countsLine=kind.startsWith("parcel")?"Source "+row.get("sourceParcels")+" | Courier "+row.get("cargoParcels")+" | Delivered "+(recipientId!=0&&kind.equals("parcel-npc")?row.get("recipientParcels"):row.get("outputParcels"))+" | Returns "+row.get("returnParcels"):kind.equals("supply")?"Network iron "+row.get("networkIron")+" | Receiving target 4 | Address Workshop A":kind.equals("control")?"Iron stock "+count(container(level,SENSOR),"minecraft:iron_ingot")+" | Start <= 2 | Stop >= 6":kind.equals("seat")?"Create seat occupied by NPC: "+npc.isPassenger():"Source raw "+row.get("raw")+" | Finished items "+row.get("finished");
    }
    private static void verify(Minecraft mc)throws Exception{
        var report=mc.getSingleplayerServer().submit(()->{try{sample(mc.getSingleplayerServer().overworld());var last=samples.get(samples.size()-1).getAsJsonObject();boolean ok=switch(kind){
            case "crank"->samples.asList().stream().anyMatch(r->r.getAsJsonObject().has("rpm")&&Math.abs(r.getAsJsonObject().get("rpm").getAsDouble())>0);
            case "valve"->samples.asList().stream().anyMatch(r->r.getAsJsonObject().has("inUse")&&r.getAsJsonObject().get("inUse").getAsInt()>0);
            case "polish","process"->last.get("finished").getAsInt()==2;
            case "parcel-npc"->last.get("recipientParcels").getAsInt()==1&&last.get("sourceParcels").getAsInt()==1&&last.get("cargoParcels").getAsInt()==0;
            case "parcel-container"->last.get("outputParcels").getAsInt()==1&&last.get("sourceParcels").getAsInt()==1;
            case "parcel-return"->returnBlocked&&last.get("returnParcels").getAsInt()==1&&last.get("cargoParcels").getAsInt()==0;
            case "keeper"->last.get("mounted").getAsBoolean()&&last.get("status").getAsString().endsWith("attending");
            case "seat"->samples.asList().stream().anyMatch(r->r.getAsJsonObject().get("mounted").getAsBoolean())&&!last.get("mounted").getAsBoolean();
            case "supply"->last.get("networkIron").getAsInt()==12&&last.getAsJsonObject("journal").getAsJsonObject("factory").getAsJsonArray("requests").size()==1;
            case "control"->samples.asList().stream().anyMatch(r->r.getAsJsonObject().get("status").getAsString().endsWith("working"))&&samples.asList().stream().anyMatch(r->r.getAsJsonObject().get("status").getAsString().endsWith("condition"));
            case "inspect"->last.getAsJsonObject("journal").getAsJsonObject("factory").get("inspection").getAsInt()>=0&&samples.asList().stream().anyMatch(r->r.getAsJsonObject().get("status").getAsString().endsWith("inspecting"));
            default->false;};tracking=false;var result=new JsonObject();result.addProperty("kind",kind);result.addProperty("passed",ok);result.addProperty("nativeExecution",true);result.add("samples",samples.deepCopy());result.add("settings",JsonParser.parseString(((DochiNpcEntity)mc.getSingleplayerServer().overworld().getEntity(actorId)).editorJson()));return result;
        }catch(Exception error){throw new RuntimeException(error);}}).get(5,TimeUnit.SECONDS);
        Files.writeString(evidence.resolve("create-"+kind+"-verified.json"),JSON.toJson(report));if(!report.get("passed").getAsBoolean())throw new IllegalStateException("Native Create result not observed: "+kind+" "+samples.get(samples.size()-1));
    }
    private static double zoom(Screen screen)throws Exception{try{return ((Number)get(screen,"zoom")).doubleValue();}catch(NoSuchFieldException ignored){return 1;}}
    private static void click(Screen screen,AbstractWidget widget)throws Exception{double z=zoom(screen);double x=(widget.getX()+widget.getWidth()/2d)*z,y=(widget.getY()+widget.getHeight()/2d)*z;if(!screen.mouseClicked(x,y,0))throw new IllegalStateException("Rejected native click: "+widget.getMessage());screen.mouseReleased(x,y,0);}
    private static AbstractWidget field(Screen screen,String id)throws Exception{return (AbstractWidget)((Map<?,?>)get(screen,"fields")).get(id);}
    private static AbstractWidget revealField(Screen screen,String id)throws Exception{
        int bottom=((Number)get(screen,"logicalH")).intValue()-52;
        for(int i=0;i<70;i++){
            var w=field(screen,id);if(w==null)throw new IllegalStateException("Missing native field "+id);
            if(w.visible&&w.getY()>=132&&w.getY()+w.getHeight()<=bottom)return w;
            double z=zoom(screen);screen.mouseScrolled((screen.width/z-50)*z,screen.height*.65,0,w.getY()<132?2:-2);
        }throw new IllegalStateException("Cannot reveal "+id);
    }
    static void perform(Minecraft mc,String action,Path output)throws Exception{
        String command=action.substring(7);
        if(command.startsWith("setup:")){setup(mc,command.substring(6));return;}
        if(command.startsWith("caption:")){caption=command.substring(8);call(Class.forName("dochi.docs.capture.GuideTutorials"),"perform",mc,"tutorial:caption:"+caption,output);return;}
        if(command.equals("off")){caption="";tracking=false;call(Class.forName("dochi.docs.capture.GuideTutorials"),"perform",mc,"tutorial:off",output);return;}
        if(command.equals("look")){mc.player.lookAt(EntityAnchorArgument.Anchor.EYES,new Vec3(0,-59.1,1));return;}
        if(command.equals("start")){mc.setScreen(null);mc.getSingleplayerServer().submit(()->{try{var server=mc.getSingleplayerServer();var npc=(DochiNpcEntity)server.overworld().getEntity(actorId);call(Class.forName("net.dochi.npc.NpcEditSessions"),"end",server.getPlayerList().getPlayer(mc.player.getUUID()));var settings=npc.settings();settings.dayCycle.enabled=true;npc.applySettings(settings);npc.setNoAi(false);sceneStart=server.overworld().getGameTime();tracking=true;return true;}catch(Exception error){throw new RuntimeException(error);}}).get(5,TimeUnit.SECONDS);return;}
        if(command.equals("end-shift")){mc.getSingleplayerServer().submit(()->{mc.getSingleplayerServer().overworld().setDayTime(12500);return true;}).get(5,TimeUnit.SECONDS);return;}
        if(command.equals("fill-sensor")){mc.getSingleplayerServer().submit(()->{container(mc.getSingleplayerServer().overworld(),SENSOR).setItem(0,new ItemStack(Items.IRON_INGOT,6));return true;}).get(5,TimeUnit.SECONDS);return;}
        if(command.equals("verify")){verify(mc);return;}
        if(command.equals("orders")){boolean opened=mc.getSingleplayerServer().submit(()->{var level=mc.getSingleplayerServer().overworld();var player=level.getServer().getPlayerList().getPlayer(mc.player.getUUID());player.teleportTo(3,-60,5);return ((DochiNpcEntity)level.getEntity(actorId)).createJobs().interact((DochiNpcEntity)level.getEntity(actorId),player);}).get(5,TimeUnit.SECONDS);if(!opened)throw new IllegalStateException("Create did not open native orders");return;}
        if(command.equals("order-outcome")){String text=samples.isEmpty()?"Observe the native order status before configuring delivery.":samples.get(samples.size()-1).getAsJsonObject().get("status").getAsString().equals("factory.status.unavailable")?"This installed Create order API is unavailable. Check the integration capability.":"One accepted order waits for delivery. The NPC does not resend it automatically.";perform(mc,"create:caption:"+text,output);return;}
        if(command.equals("verify-orders")){if(mc.screen==null||!mc.screen.getClass().getName().startsWith("com.simibubi.create."))throw new IllegalStateException("Native Create ordering screen missing");Files.writeString(output.resolve("create-stock-ticker-screen.json"),"{\"screen\":\""+mc.screen.getClass().getName()+"\"}");return;}
        if(command.equals("editor")){mc.getSingleplayerServer().submit(()->{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());var npc=(DochiNpcEntity)player.serverLevel().getEntity(actorId);player.teleportTo(6,-57,8);NpcNetwork.open(player,npc);return true;}).get(5,TimeUnit.SECONDS);return;}
        if(command.equals("work-page")){Screen s=mc.screen;set(s,"category",Enum.valueOf((Class)get(s,"category").getClass(),"DAY_CYCLE"));set(s,"actionPage",true);set(s,"workPage",false);call(s,"rebuild");return;}
        if(command.startsWith("input:")){var pair=command.substring(6).split("=",2);var w=revealField(mc.screen,pair[0]);click(mc.screen,w);call(w,"setValue","");for(char c:pair[1].toCharArray())if(!mc.screen.charTyped(c,0))throw new IllegalStateException("Input rejected");call(mc.screen,"capture");return;}
        if(command.startsWith("scroll:")){var s=mc.screen;s.mouseScrolled(s.width-30,s.height*.65,0,Double.parseDouble(command.substring(7)));return;}
        if(command.equals("save")){mc.screen.keyPressed(83,0,2);mc.screen.keyReleased(83,0,2);return;}
        if(command.equals("verify-save")){
            if((boolean)get(mc.screen,"requestPending"))throw new IllegalStateException("NPC save still pending");
            var report=mc.getSingleplayerServer().submit(()->((DochiNpcEntity)mc.getSingleplayerServer().overworld().getEntity(actorId)).editorJson()).get(5,TimeUnit.SECONDS);
            var entry=NpcSettings.fromJson(report).dayCycle.entries.get(0);
            boolean retained=switch(kind){case "setup"->entry.kinetics.targetSet&&entry.kinetics.duration==120;case "factory"->entry.createJob.factory.materials.get(0).count==2&&entry.createJob.factory.resultCount==2;case "routes"->entry.createJob.recipientWait==80&&entry.createJob.routes.get(0).address.equals("Workshop A");default->false;};
            Files.writeString(output.resolve("create-"+kind+"-editor-saved.json"),report);if(!retained)throw new IllegalStateException("Saved NPC fields do not match the tutorial edits");return;
        }
        if(command.equals("pick-device")){
            var s=mc.screen;for(int attempt=0;attempt<20;attempt++){
                for(var child:s.children())if(child instanceof AbstractWidget w&&w.visible&&w.active){
                    String narration=((Component)call(w,"createNarrationMessage")).getString();
                    if(narration.contains("Assign hand crank block")){click(s,w);picking=true;return;}
                }s.mouseScrolled(s.width-30,s.height*.65,0,-2);
            }throw new IllegalStateException("Native device selector missing");
        }
        if(command.equals("choose-device")){
            boolean previous=mc.player.input.shiftKeyDown;mc.player.input.shiftKeyDown=true;
            var hit=new BlockHitResult(Vec3.atCenterOf(DEVICE),Direction.SOUTH,DEVICE,false);
            try{call(Class.forName("net.dochi.npc.client.NpcCookingBlockPicker"),"choose",mc.player,mc.level,InteractionHand.MAIN_HAND,hit);}finally{mc.player.input.shiftKeyDown=previous;}
            if(mc.screen==null)throw new IllegalStateException("Native block selection did not return to its editor");picking=false;return;
        }
        throw new IllegalArgumentException(action);
    }
}
