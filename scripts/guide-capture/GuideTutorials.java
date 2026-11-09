package dochi.docs.capture;

import static dochi.docs.capture.GuideCapture.*;
import com.google.gson.*;
import java.nio.file.*;
import java.util.*;
import net.minecraft.client.Minecraft;
import net.minecraft.client.gui.components.AbstractWidget;
import net.minecraft.client.gui.screens.Screen;
import net.minecraft.network.chat.Component;
import net.neoforged.neoforge.common.NeoForge;
import net.neoforged.neoforge.client.event.ScreenEvent;

/** Tutorial annotations only. All edits use the real production screen input handlers. */
final class GuideTutorials {
    private static String caption="";
    private static double pointerX=-1,pointerY=-1;
    private static long clickUntil;
    private static final JsonArray events=new JsonArray();
    private static final JsonArray runtimeSamples=new JsonArray();
    private static boolean runtimeTracking,runtimeSeen;
    static boolean allowsScreenTransition(){return runtimeTracking;}

    static void register(Path output){
        NeoForge.EVENT_BUS.addListener((net.neoforged.neoforge.client.event.ClientTickEvent.Post event)->{
            if(!runtimeTracking)return;var mc=Minecraft.getInstance();JsonObject row=new JsonObject();
            String screen=mc.screen==null?"world":mc.screen.getClass().getSimpleName();row.addProperty("screen",screen);
            if(screen.equals("ScenePlaybackScreen"))runtimeSeen=true;
            row.addProperty("nanoTime",System.nanoTime());var position=mc.gameRenderer.getMainCamera().getPosition();
            row.addProperty("cameraX",position.x);row.addProperty("cameraY",position.y);row.addProperty("cameraZ",position.z);runtimeSamples.add(row);
        });
        NeoForge.EVENT_BUS.addListener((ScreenEvent.Render.Post event)->{
            if(caption.isEmpty())return;
            var mc=Minecraft.getInstance();var g=event.getGuiGraphics();
            g.pose().pushPose();g.pose().translate(0,0,1500);
            int w=mc.getWindow().getGuiScaledWidth(),h=mc.getWindow().getGuiScaledHeight();
            int textWidth=mc.font.width(caption),boxWidth=Math.min(w-12,textWidth+20),left=(w-boxWidth)/2;
            g.fill(left,h-24,left+boxWidth,h-6,0xEE101922);
            g.drawCenteredString(mc.font,caption,w/2,h-19,0xFFFFFFFF);
            if(pointerX>=0){
                int x=(int)pointerX,y=(int)pointerY,c=System.nanoTime()<clickUntil?0xFFFFD35C:0xFFFFFFFF;
                g.fill(x-7,y-1,x+8,y+1,0xFF111111);g.fill(x-1,y-7,x+1,y+8,0xFF111111);
                g.fill(x-6,y,x+7,y+1,c);g.fill(x,y-6,x+1,y+7,c);
                if(System.nanoTime()<clickUntil){g.fill(x-9,y-9,x+10,y-8,c);g.fill(x-9,y+9,x+10,y+10,c);g.fill(x-9,y-8,x-8,y+9,c);g.fill(x+9,y-8,x+10,y+9,c);}
            }
            g.pose().popPose();
        });
    }

    private static double scale(Screen screen)throws Exception{
        try{return ((Number)call(screen,"renderScale")).doubleValue();}catch(NoSuchMethodException ignored){try{return ((Number)call(screen,"scale")).doubleValue();}catch(NoSuchMethodException absent){return 1;}}
    }
    private static String label(Object value){return value instanceof Component c?c.getString():String.valueOf(value);}
    private static void point(double x,double y){pointerX=x;pointerY=y;clickUntil=System.nanoTime()+900_000_000L;}
    private static void click(Screen s,double x,double y){
        point(x,y);if(!s.mouseClicked(x,y,0))throw new IllegalStateException("Tutorial click rejected at "+x+","+y);s.mouseReleased(x,y,0);
    }
    private static AbstractWidget field(Screen s,String name)throws Exception{
        if(name.startsWith("regionCorner"))return (AbstractWidget)((Object[])get(s,"regionCorners"))[Integer.parseInt(name.substring(12))];
        try{Object value=get(s,name);if(value instanceof AbstractWidget widget)return widget;}catch(NoSuchFieldException ignored){}
        for(String owner:List.of("boxes","fields"))try{Object value=((Map<?,?>)get(s,owner)).get(name);if(value instanceof AbstractWidget widget)return widget;}catch(NoSuchFieldException ignored){}
        throw new IllegalStateException("Tutorial field absent: "+name);
    }
    private static AbstractWidget visibleField(Screen s,String name)throws Exception{
        AbstractWidget widget=field(s,name);double z=scale(s);
        // The native inspector scrolls and rebuilds widgets. Re-resolve after each scroll.
        for(int attempt=0;attempt<40;attempt++){
            Object clip=null;
            try{clip=((Map<?,?>)get(s,"widgetClips")).get(widget);}catch(NoSuchFieldException ignored){}
            if(clip==null)try{clip=get(s,"inspectorViewport");}catch(NoSuchFieldException ignored){}
            if(clip==null)break;
            double cy=((Number)get(clip,"y")).doubleValue(),ch=((Number)get(clip,"height")).doubleValue();
            if(widget.getY()+8>=cy&&widget.getY()+8<cy+ch)break;
            double cx=((Number)get(clip,"x")).doubleValue(),cw=((Number)get(clip,"width")).doubleValue();
            s.mouseScrolled((cx+cw/2)*z,(cy+ch/2)*z,0,widget.getY()<cy?2:-2);widget=field(s,name);
        }
        return widget;
    }
    private static void button(Screen s,String wanted)throws Exception{
        double z=scale(s);List<Object> children=new ArrayList<>(s.children());
        for(String owner:List.of("modalWidgets","modalButtons"))try{children.addAll((Collection<?>)get(s,owner));}catch(NoSuchFieldException ignored){}
        for(int i=children.size()-1;i>=0;i--)if(children.get(i) instanceof AbstractWidget b&&b.visible&&b.active&&b.getMessage().getString().replaceFirst("^>\\s+","").equals(wanted)){
            click(s,(b.getX()+b.getWidth()/2d)*z,(b.getY()+b.getHeight()/2d)*z);return;
        }
        for(String owner:List.of("styledButtons","buttons"))try{
            for(Object style:(List<?>)get(s,owner))if(label(get(style,"label")).replaceFirst("^>\\s+","").equals(wanted)){
                Object raw=get(style,"button");if(raw instanceof AbstractWidget b){click(s,(b.getX()+b.getWidth()/2d)*z,(b.getY()+b.getHeight()/2d)*z);return;}
            }
        }catch(NoSuchFieldException ignored){}
        throw new IllegalStateException("Tutorial button absent: "+wanted);
    }
    static void perform(Minecraft mc,String action,Path output)throws Exception{
        String command=action.substring(9);Screen s=mc.screen;
        JsonObject event=new JsonObject();event.addProperty("action",command);event.addProperty("nanoTime",System.nanoTime());events.add(event);
        Files.writeString(output.resolve("tutorial-actions.json"),new GsonBuilder().setPrettyPrinting().create().toJson(events));
        if(command.startsWith("caption:")){caption=command.substring(8);pointerX=-1;return;}
        if(command.equals("off")){caption="";pointerX=-1;return;}
        if(command.equals("runtime-begin")){runtimeSamples.asList().clear();runtimeSeen=false;runtimeTracking=true;return;}
        if(command.equals("runtime-verify")){
            JsonObject report=new JsonObject();report.addProperty("sawPlaybackScreen",runtimeSeen);report.addProperty("returnedFromPlayback",s==null||!s.getClass().getSimpleName().equals("ScenePlaybackScreen"));report.add("samples",runtimeSamples);
            Files.writeString(output.resolve("scene-runtime-verified.json"),new GsonBuilder().setPrettyPrinting().create().toJson(report));runtimeTracking=false;
            if(!runtimeSeen||!report.get("returnedFromPlayback").getAsBoolean())throw new IllegalStateException("Saved scene did not start and finish");return;
        }
        if(command.equals("landmarks")){
            mc.getSingleplayerServer().submit(()->{
                var level=mc.getSingleplayerServer().overworld();var player=level.getPlayerByUUID(mc.player.getUUID());var origin=player.blockPosition();
                for(int x=-6;x<=6;x++)for(int z=1;z<=15;z++)level.setBlockAndUpdate(origin.offset(x,-1,z),(Math.abs(x)<=1?net.minecraft.world.level.block.Blocks.SMOOTH_STONE:net.minecraft.world.level.block.Blocks.GRASS_BLOCK).defaultBlockState());
                for(int x:new int[]{-3,3})for(int y=0;y<5;y++)level.setBlockAndUpdate(origin.offset(x,y,9),net.minecraft.world.level.block.Blocks.STONE_BRICKS.defaultBlockState());
                for(int x=-3;x<=3;x++)level.setBlockAndUpdate(origin.offset(x,5,9),net.minecraft.world.level.block.Blocks.STONE_BRICKS.defaultBlockState());
                for(int x:new int[]{-5,5}){for(int y=0;y<2;y++)level.setBlockAndUpdate(origin.offset(x,y,5),net.minecraft.world.level.block.Blocks.STONE_BRICK_WALL.defaultBlockState());level.setBlockAndUpdate(origin.offset(x,2,5),net.minecraft.world.level.block.Blocks.LANTERN.defaultBlockState());}
                level.setDayTime(1000);level.getGameRules().getRule(net.minecraft.world.level.GameRules.RULE_DAYLIGHT).set(false,mc.getSingleplayerServer());return true;
            }).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(command.startsWith("click:")){button(s,command.substring(6));return;}
        if(command.startsWith("click-first:")){
            String wanted=command.substring(12);double z=scale(s);
            for(Object child:s.children())if(child instanceof AbstractWidget b&&b.visible&&b.active&&b.getMessage().getString().equals(wanted)){click(s,(b.getX()+b.getWidth()/2d)*z,(b.getY()+b.getHeight()/2d)*z);return;}
            throw new IllegalStateException("Visible tutorial button absent: "+wanted);
        }
        if(command.startsWith("input-label:")){
            String[] pair=command.substring(12).split("=",2);double z=scale(s);
            for(Object child:s.children())if(child instanceof net.minecraft.client.gui.components.EditBox w&&w.visible&&w.active&&w.getMessage().getString().equals(pair[0])){
                click(s,(w.getX()+w.getWidth()/2d)*z,(w.getY()+8)*z);w.setValue("");for(char c:pair[1].toCharArray())if(!s.charTyped(c,0))throw new IllegalStateException("Tutorial character rejected");
                if(!pair[1].equals(w.getValue()))throw new IllegalStateException("Tutorial value mismatch");return;
            }
            throw new IllegalStateException("Visible tutorial text field absent: "+pair[0]);
        }
        if(command.equals("badge-enable-fixture")){
            mc.getSingleplayerServer().submit(()->{try{call(Class.forName("net.hodu.cobblenpc.badge.BadgeFeature"),"set",mc.getSingleplayerServer(),true);return true;}catch(Exception e){throw new RuntimeException(e);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(command.equals("badge-verify")){
            JsonObject report=mc.getSingleplayerServer().submit(()->{try{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());JsonObject r=new JsonObject();r.add("catalog",((JsonObject)get(call(Class.forName("net.hodu.cobblenpc.badge.BadgeRepository"),"catalog"),"json")).deepCopy());r.add("owned",(JsonObject)call(Class.forName("net.hodu.cobblenpc.badge.BadgeOwnership"),"snapshot",player));return r;}catch(Exception e){throw new RuntimeException(e);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);
            Files.writeString(output.resolve("badge-server-verified.json"),new GsonBuilder().setPrettyPrinting().create().toJson(report));return;
        }
        if(command.startsWith("wheel:")){s.mouseScrolled(s.width/2d,s.height/3d,0,Double.parseDouble(command.substring(6)));return;}
        if(command.startsWith("input:")){
            String[] pair=command.substring(6).split("=",2);AbstractWidget w=visibleField(s,pair[0]);double z=scale(s);
            click(s,(w.getX()+w.getWidth()/2d)*z,(w.getY()+8)*z);
            if(s.getFocused()!=w)throw new IllegalStateException("Tutorial field focus rejected: "+pair[0]);
            call(w,"setValue","");for(char c:pair[1].toCharArray())if(!s.charTyped(c,0))throw new IllegalStateException("Tutorial character rejected");
            if(!pair[1].equals(call(w,"getValue")))throw new IllegalStateException("Tutorial field value mismatch: "+pair[0]);return;
        }
        if(command.startsWith("key:")||command.startsWith("hold:")||command.startsWith("release:")){
            int key=Integer.parseInt(command.substring(command.indexOf(':')+1));
            if(command.startsWith("release:"))s.keyReleased(key,0,0);else{s.setFocused(null);s.keyPressed(key,0,0);if(command.startsWith("key:"))s.keyReleased(key,0,0);}return;
        }
        if(command.startsWith("scrub-battle:")){
            int tick=Integer.parseInt(command.substring(13));Object layout=call(s,"layout"),geometry=call(s,"timelineGeometry",layout);
            int duration=((Number)call(get(s,"data"),"durationTicks")).intValue();double z=scale(s);
            double x=(((Number)get(geometry,"trackX")).doubleValue()+((Number)get(geometry,"trackWidth")).doubleValue()*tick/duration)*z,y=(((Number)get(geometry,"rulerY")).doubleValue()+8)*z;
            click(s,x,y);return;
        }
        if(command.startsWith("scene-card:")){
            String kind=command.substring(11);Object document=call(get(s,"history"),"current");JsonObject root=(JsonObject)call(document,"json");
            JsonObject clip=root.getAsJsonArray(kind).get(0).getAsJsonObject();int row=((Number)call(s,"track",kind,clip)).intValue(),scroll=((Number)get(s,"trackScroll")).intValue();
            double start=clip.has("start")?clip.get("start").getAsDouble():0,end=clip.has("end")?clip.get("end").getAsDouble():start+20;
            double z=scale(s),x=((Number)call(s,"timeX",start+(end-start)*.33)).doubleValue()*z,y=(((Number)call(s,"timelineY")).doubleValue()+32+(row-scroll)*22+7)*z;
            click(s,x,y);return;
        }
        if(command.startsWith("scrub-scene:")){
            double tick=Double.parseDouble(command.substring(12)),z=scale(s);
            double x=((Number)call(s,"timeX",tick)).doubleValue()*z,y=(((Number)call(s,"timelineY")).doubleValue()+24)*z;click(s,x,y);return;
        }
        if(command.startsWith("dump:")){
            String name=command.substring(5);JsonObject report=new JsonObject();report.addProperty("screen",s.getClass().getName());report.addProperty("scale",scale(s));
            JsonArray widgets=new JsonArray();for(Object child:s.children())if(child instanceof AbstractWidget w){JsonObject row=new JsonObject();row.addProperty("class",w.getClass().getSimpleName());row.addProperty("label",w.getMessage().getString());row.addProperty("x",w.getX());row.addProperty("y",w.getY());row.addProperty("width",w.getWidth());row.addProperty("active",w.active);widgets.add(row);}report.add("widgets",widgets);
            for(String key:List.of("boxes","fields"))try{report.add(key,new Gson().toJsonTree(((Map<?,?>)get(s,key)).keySet()));}catch(NoSuchFieldException ignored){}
            try{report.add("document",((JsonObject)call(call(get(s,"history"),"current"),"json")).deepCopy());}catch(NoSuchFieldException ignored){}
            try{report.add("presentation",new Gson().toJsonTree(get(s,"data")));}catch(NoSuchFieldException ignored){}
            Files.writeString(output.resolve(name+".json"),new GsonBuilder().setPrettyPrinting().create().toJson(report));return;
        }
        throw new IllegalArgumentException("Unknown tutorial action: "+command);
    }
}
