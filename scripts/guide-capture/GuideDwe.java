package dochi.docs.capture;

import static dochi.docs.capture.GuideCapture.*;
import com.google.gson.*;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.TimeUnit;
import net.minecraft.client.Minecraft;
import net.minecraft.client.gui.components.AbstractWidget;
import net.minecraft.client.gui.screens.Screen;
import net.neoforged.neoforge.common.NeoForge;

/** Documentation driver: production mouse/keyboard handlers, original framebuffer, no product edits. */
final class GuideDwe {
    private static String clip="";
    private static long clipStarted;
    private static final JsonArray notes=new JsonArray(),events=new JsonArray();
    private static double pointerX=-1,pointerY=-1;
    private static Screen moving;
    private static double sx,sy,ex,ey,lastX,lastY;
    private static int mouseButton;
    private static long motionStart;
    private static Throwable motionFailure;
    private static volatile boolean tracking;
    private static final JsonArray runtime=new JsonArray();
    static boolean busy(){if(motionFailure!=null)throw new IllegalStateException("DWE tutorial drag failed",motionFailure);return moving!=null;}
    static void register(Path output){
        NeoForge.EVENT_BUS.addListener((net.neoforged.neoforge.event.tick.ServerTickEvent.Post event)->{
            if(!tracking||event.getServer().overworld().getGameTime()%5!=0)return;
            try{var level=event.getServer().overworld();JsonObject sample=new JsonObject();sample.addProperty("tick",level.getGameTime());JsonArray actors=new JsonArray();
                for(var entity:level.getAllEntities())if((Boolean)call(Class.forName("net.dochi.warfare.vehicle.runtime.GimmickSimulationRuntime"),"simulated",entity)){
                    JsonObject row=new JsonObject();row.addProperty("id",entity.getId());row.addProperty("type",net.minecraft.core.registries.BuiltInRegistries.ENTITY_TYPE.getKey(entity.getType()).toString());row.addProperty("x",entity.getX());row.addProperty("y",entity.getY());row.addProperty("z",entity.getZ());actors.add(row);
                }sample.add("actors",actors);sample.addProperty("roadPreserved",level.getBlockState(new net.minecraft.core.BlockPos(0,-61,0)).is(net.minecraft.world.level.block.Blocks.SMOOTH_STONE));synchronized(runtime){runtime.add(sample);}
            }catch(Throwable failure){motionFailure=failure;tracking=false;}
        });
        NeoForge.EVENT_BUS.addListener((net.neoforged.neoforge.client.event.ClientTickEvent.Post event)->{
            if(moving==null)return;
            try{double t=Math.min(1,(System.nanoTime()-motionStart)/1_200_000_000d),x=sx+(ex-sx)*t,y=sy+(ey-sy)*t;
                moving.mouseDragged(x,y,mouseButton,x-lastX,y-lastY);pointerX=lastX=x;pointerY=lastY=y;
                if(t>=1){moving.mouseReleased(x,y,mouseButton);moving=null;}
            }catch(Throwable failure){motionFailure=failure;moving=null;}
        });
        NeoForge.EVENT_BUS.addListener((net.neoforged.neoforge.client.event.ScreenEvent.Render.Post event)->{
            if(pointerX<0)return;var g=event.getGuiGraphics();int x=(int)pointerX,y=(int)pointerY;
            g.pose().pushPose();g.pose().translate(0,0,1500);
            g.fill(x-8,y-1,x+9,y+2,0xFF111111);g.fill(x-1,y-8,x+2,y+9,0xFF111111);
            g.fill(x-7,y,x+8,y+1,0xFFFFD35C);g.fill(x,y-7,x+1,y+8,0xFFFFD35C);g.pose().popPose();
        });
    }
    private static double n(Object value,String method)throws Exception{return ((Number)call(value,method)).doubleValue();}
    private static double z(Screen s)throws Exception{return ((Number)call(s,"scale")).doubleValue();}
    private static void click(Screen s,double x,double y,int button){pointerX=x;pointerY=y;if(!s.mouseClicked(x,y,button))throw new IllegalStateException("Click rejected at "+x+","+y);s.mouseReleased(x,y,button);}
    private static void widget(Screen s,AbstractWidget b)throws Exception{click(s,(b.getX()+b.getWidth()/2d)*z(s),(b.getY()+b.getHeight()/2d)*z(s),0);}
    private static void press(Screen s,String key)throws Exception{
        String label=(String)call(Class.forName("net.dochi.warfare.api.client.DwClientText"),"translate",key,new Object[0]);
        // Language helper is deliberately optional; production labels also identify controls.
        for(Object child:s.children())if(child instanceof AbstractWidget b&&b.active&&b.visible&&b.getMessage().getString().equals(label)){widget(s,b);return;}
        throw new IllegalStateException("Button missing: "+key+" / "+label);
    }
    private static void type(Screen s,AbstractWidget field,String text)throws Exception{
        widget(s,field);if(s.getFocused()!=field)throw new IllegalStateException("Field did not focus");
        call(field,"setValue","");
        for(char c:text.toCharArray())if(!s.charTyped(c,0))throw new IllegalStateException("Character rejected");
        if(!text.equals(call(field,"getValue")))throw new IllegalStateException("Text differs: wanted "+text+", actual "+call(field,"getValue"));
    }
    private static AbstractWidget field(Screen s,String key)throws Exception{
        for(int i=0;i<35;i++){
            AbstractWidget b=(AbstractWidget)((Map<?,?>)get(s,"fields")).get(key);if(b==null)throw new IllegalStateException("Field missing "+key);
            if(key.equals("title"))return b;
            Object viewport=call(get(s,"inspectorForm"),"viewport");double top=n(viewport,"y"),bottom=n(viewport,"bottom");
            if(b.getY()>=top&&b.getY()+b.getHeight()<=bottom)return b;
            double scale=z(s);s.mouseScrolled((n(viewport,"x")+n(viewport,"width")/2)*scale,(top+n(viewport,"height")/2)*scale,0,b.getY()<top?3:-3);
        }throw new IllegalStateException("Cannot scroll field "+key);
    }
    private static void drag(Screen s,double x,double y,double toX,double toY,int button){
        pointerX=x;pointerY=y;if(!s.mouseClicked(x,y,button))throw new IllegalStateException("Drag start rejected");
        moving=s;sx=lastX=x;sy=lastY=y;ex=toX;ey=toY;mouseButton=button;motionStart=System.nanoTime();
    }
    private static Object rect(Screen s,String name)throws Exception{return call(call(s,"layout"),name);}
    private static double[] ground(Screen s,double x,double depth)throws Exception{
        Object point=makePoint(x,-60,depth);Object p=call(get(s,"worldView"),"project",point);
        if(p==null)throw new IllegalStateException("Ground is behind camera");return new double[]{n(p,"x")*z(s),n(p,"y")*z(s)};
    }
    private static Object makePoint(double x,double y,double depth)throws Exception{
        return Class.forName("net.dochi.warfare.vehicle.gimmick.GimmickDocument$Point").getConstructor(double.class,double.class,double.class).newInstance(x,y,depth);
    }
    private static void saveJson(Path path,Object value)throws Exception{Files.writeString(path,new GsonBuilder().setPrettyPrinting().create().toJson(value));}
    static void perform(Minecraft mc,String action,Path output)throws Exception{
        String command=action.substring(4);Screen s=mc.screen;
        JsonObject event=new JsonObject();event.addProperty("action",command);event.addProperty("nanoTime",System.nanoTime());events.add(event);saveJson(output.resolve("dwe-inputs.json"),events);
        if(command.equals("fixture")){
            mc.setScreen(null);
            mc.getSingleplayerServer().submit(()->{var server=mc.getSingleplayerServer();var level=server.overworld();var player=server.getPlayerList().getPlayer(mc.player.getUUID());
                level.setDayTime(6000);level.getGameRules().getRule(net.minecraft.world.level.GameRules.RULE_DAYLIGHT).set(false,server);
                for(int x=-24;x<=24;x++)for(int depth=-24;depth<=60;depth++)level.setBlock(new net.minecraft.core.BlockPos(x,-61,depth),(Math.abs(x)<=3?net.minecraft.world.level.block.Blocks.SMOOTH_STONE:net.minecraft.world.level.block.Blocks.GRASS_BLOCK).defaultBlockState(),3);
                player.teleportTo(0,-60,-16);player.setYRot(0);player.setXRot(48);return true;
            }).get(10,TimeUnit.SECONDS);mc.player.setYRot(0);mc.player.setXRot(48);return;
        }
        if(command.startsWith("begin:")){clip=command.substring(6);clipStarted=System.nanoTime();notes.asList().clear();pointerX=-1;return;}
        if(command.equals("runtime-begin")){synchronized(runtime){runtime.asList().clear();}tracking=true;return;}
        if(command.equals("runtime-verify")){tracking=false;JsonArray copy; synchronized(runtime){copy=runtime.deepCopy();}saveJson(output.resolve("simulation-runtime.json"),copy);
            boolean seen=false;Map<Integer,double[]> first=new HashMap<>();double moved=0;for(var sample:copy){var row=sample.getAsJsonObject();if(!row.get("roadPreserved").getAsBoolean())throw new IllegalStateException("Road changed");for(var actor:row.getAsJsonArray("actors")){var a=actor.getAsJsonObject();seen=true;int id=a.get("id").getAsInt();double x=a.get("x").getAsDouble(),depth=a.get("z").getAsDouble();first.putIfAbsent(id,new double[]{x,depth});double[] before=first.get(id);moved=Math.max(moved,Math.hypot(x-before[0],depth-before[1]));}}
            if(!seen||moved<0.25||!copy.get(copy.size()-1).getAsJsonObject().getAsJsonArray("actors").isEmpty()||get(s,"simulationId")!=null)throw new IllegalStateException("Simulation spawn/move/cleanup not verified: moved="+moved);return;}
        if(command.startsWith("note:")){String[] parts=command.substring(5).split("\\|",2);JsonObject note=new JsonObject();note.addProperty("startMs",(System.nanoTime()-clipStarted)/1_000_000d);note.addProperty("step",notes.size()+1);note.addProperty("title",parts[0]);note.addProperty("body",parts.length>1?parts[1]:"");notes.add(note);saveJson(output.resolve(clip+"-notes.json"),notes);pointerX=-1;return;}
        if(command.startsWith("press:")){press(s,command.substring(6));return;}
        if(command.startsWith("input:")){String[] p=command.substring(6).split("=",2);type(s,field(s,p[0]),p[1]);return;}
        if(command.startsWith("tool:")){int i=List.of("select","npc","support","fire","point","line","area").indexOf(command.substring(5));click(s,90*z(s),(116+i*20)*z(s),0);return;}
        if(command.startsWith("place:")){String[] p=command.substring(6).split(",");double[] a=ground(s,Double.parseDouble(p[0]),Double.parseDouble(p[1]));if(p.length==2)click(s,a[0],a[1],0);else{double[] b=ground(s,Double.parseDouble(p[2]),Double.parseDouble(p[3]));drag(s,a[0],a[1],b[0],b[1],0);}return;}
        if(command.startsWith("fold:")){for(var e:((Map<?,?>)get(s,"foldButtons")).entrySet())if(e.getKey().toString().equals(command.substring(5))){widget(s,(AbstractWidget)e.getValue());return;}throw new IllegalStateException("Missing fold");}
        if(command.startsWith("split:")){String which=command.substring(6);Object split=Enum.valueOf((Class)Class.forName("net.dochi.warfare.vehicle.client.GimmickEditorLayout$Split"),which);Object r=call(call(s,"layout"),"bar",split);double x=(n(r,"x")+n(r,"width")/2)*z(s),y=(n(r,"y")+n(r,"height")/2)*z(s);drag(s,x,y,x+(which.equals("TIMELINE")?0:30)*z(s),y-(which.equals("TIMELINE")?28:0)*z(s),0);return;}
        if(command.startsWith("camera:")){Object r=call(s,"worldBounds");double x=(n(r,"x")+n(r,"width")*.5)*z(s),y=(n(r,"y")+n(r,"height")*.5)*z(s);if(command.endsWith("zoom"))s.mouseScrolled(x,y,0,2);else drag(s,x,y,x+34*z(s),y+10*z(s),command.endsWith("pan")?2:1);return;}
        if(command.equals("timeline-zoom-out")){Object r=call(call(s,"timelineControls"),"less");click(s,(n(r,"x")+10)*z(s),(n(r,"y")+10)*z(s),0);return;}
        if(command.startsWith("key:")){String[] p=command.substring(4).split(",");s.setFocused(null);int key=Integer.parseInt(p[0]),mod=p.length>1?Integer.parseInt(p[1]):0;s.keyPressed(key,0,mod);s.keyReleased(key,0,mod);return;}
        if(command.equals("coordinates")){Object slot=call(call(s,"docBar"),"slot","coordinates");click(s,(n(slot,"x")+20)*z(s),(n(slot,"y")+9)*z(s),0);return;}
        if(command.startsWith("choice:")){int i=Integer.parseInt(command.substring(7));Object r=get(s,"choiceBounds");click(s,(n(r,"x")+35)*z(s),(n(r,"y")+12+i*20)*z(s),0);return;}
        if(command.equals("query")){throw new IllegalArgumentException("Use query=text");}
        if(command.startsWith("query=")){type(s,(AbstractWidget)get(s,"query"),command.substring(6));return;}
        if(command.equals("file-row")||command.equals("file-action")){Object f=call(s,"flyout");String x=command.equals("file-row")?"listX":"actionX",y=command.equals("file-row")?"listY":"actionY";click(s,(n(f,x)+24)*z(s),(n(f,y)+8)*z(s),0);return;}
        if(command.startsWith("row:")){int row=Integer.parseInt(command.substring(4));click(s,95*z(s),(((Number)call(s,"listTop")).intValue()+row*20+8)*z(s),0);return;}
        if(command.startsWith("timeline:")){int tick=Integer.parseInt(command.substring(9));Object list=call(get(s,"draft"),"steps");Object step=((List<?>)list).get(((Number)get(s,"selected")).intValue());int before=((Number)call(step,"atTick")).intValue(),duration=((Number)call(s,"timelineDuration")).intValue();Object r=rect(s,"timeline");double from=((Number)call(s,"timeX",before,duration)).doubleValue(),to=((Number)call(s,"timeX",tick,duration)).doubleValue();String shape=(String)call(step,"shape");int lane=((Number)call(s,"lane",shape)).intValue(),height=((Number)call(s,"laneHeight")).intValue();double y=n(r,"y")+42+lane*height+height/2d;drag(s,from*z(s),y*z(s),to*z(s),y*z(s),0);return;}
        if(command.startsWith("verify:")){String id=command.substring(7);Object document=call(get(s,"draft"),"document");String json=(String)call(Class.forName("net.dochi.warfare.vehicle.gimmick.GimmickCodec"),"encode",document);Files.writeString(output.resolve(id+"-document.json"),json);JsonObject report=new JsonObject();report.addProperty("status",String.valueOf(get(s,"status")));report.addProperty("name",String.valueOf(get(s,"name")));report.addProperty("dirty",(Boolean)call(get(s,"draft"),"dirty"));report.addProperty("simulationPending",(Boolean)get(s,"simulationPending"));report.addProperty("simulationId",String.valueOf(get(s,"simulationId")));saveJson(output.resolve(id+"-state.json"),report);return;}
        throw new IllegalArgumentException(command);
    }
}
