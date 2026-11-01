package dochi.docs.capture263;

import com.google.gson.*;
import java.lang.reflect.*;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.Function;
import net.minecraft.client.Minecraft;
import net.minecraft.client.Screenshot;
import net.minecraft.client.gui.components.AbstractWidget;
import net.minecraft.client.gui.screens.Screen;
import net.minecraft.client.gui.screens.TitleScreen;
import net.minecraft.client.input.MouseButtonEvent;
import net.minecraft.client.input.MouseButtonInfo;
import net.neoforged.fml.common.Mod;
import net.neoforged.api.distmarker.Dist;
import net.neoforged.neoforge.common.NeoForge;
import net.neoforged.neoforge.client.event.ClientTickEvent;

/** Native 26.3 documentation fixture, confined to a new workspace-owned world. */
@Mod(value="dochi_docs_capture263", dist=Dist.CLIENT)
public final class GuideCapture263 {
    private final Path out=Path.of(System.getProperty("dochi.docs.output"));
    private final List<JsonObject> results=new ArrayList<>();
    private JsonArray plan;
    private int ticks,phase,index,action,waitTicks,npcId;
    private boolean done,capturing;
    private CompletableFuture<Integer> actor;
    private Object document;
    private final long started=System.nanoTime();
    public GuideCapture263(){NeoForge.EVENT_BUS.addListener((ClientTickEvent.Post e)->tick(Minecraft.getInstance()));}
    private void tick(Minecraft mc){
        if(done)return;
        try{
            if(System.nanoTime()-started>420_000_000_000L)throw new IllegalStateException("Timeout at phase "+phase);
            if(mc.gui.overlay()!=null||++ticks%12!=0||capturing)return;
            if(waitTicks>0){waitTicks--;return;}
            Files.createDirectories(out);
            if(phase==0){
                if(!(mc.gui.screen() instanceof TitleScreen))mc.gui.setScreen(new TitleScreen());
                mc.options.pauseOnLostFocus=false;
                mc.options.guiScale().set(2);mc.options.framerateLimit().set(60);mc.resizeGui();
                org.lwjgl.sdl.SDLVideo.SDL_HideWindow(mc.getWindow().handle());
                createWorld(mc);phase=1;return;
            }
            if(phase==1){
                if(mc.level==null||mc.player==null)return;
                if(actor==null){actor=mc.getSingleplayerServer().submit(()->{
                    try{
                        Object player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());
                        Object level=call(player,"level");
                        Object type=((Optional<?>)call(get(Class.forName("net.minecraft.core.registries.BuiltInRegistries"),"ENTITY_TYPE"),"getOptional",call(Class.forName("net.minecraft.resources.Identifier"),"parse","dochi_npc:npc"))).orElseThrow();
                        Object npc=call(type,"create",level,get(Class.forName("net.minecraft.world.entity.EntitySpawnReason"),"COMMAND"));
                        call(npc,"setPos",((Number)call(player,"getX")).doubleValue()+2,((Number)call(player,"getY")).doubleValue(),((Number)call(player,"getZ")).doubleValue());
                        call(npc,"setCustomName",call(Class.forName("net.minecraft.network.chat.Component"),"literal","Oakridge guide"));
                        call(npc,"setNoAi",true);call(level,"addFreshEntity",npc);
                        return ((Number)call(npc,"getId")).intValue();
                    }catch(Exception e){throw new RuntimeException(e);}
                });return;}
                if(!actor.isDone())return;npcId=actor.join();if(mc.level.getEntity(npcId)==null)return;
                call(Class.forName("net.dochi.gameeditor.client.DochiGameEditorClient"),"bootstrapClientRegistries");
                document=call(Class.forName("net.dochi.gameeditor.dialogue.DialogueDocument"),"defaults");
                plan=JsonParser.parseString(Files.readString(Path.of(System.getProperty("dochi.docs.plan")))).getAsJsonArray();
                JsonObject registry=new JsonObject();registry.add("global",new Gson().toJsonTree(call(Class.forName("net.dochi.gameeditor.api.DochiEditorRegistry"),"availableFor",-1)));
                Files.writeString(out.resolve("editors.json"),new GsonBuilder().setPrettyPrinting().create().toJson(registry));
                phase=2;return;
            }
            if(phase==2){
                if(index>=plan.size()){done=true;Files.writeString(out.resolve("finished.txt"),"Native 26.3 capture complete\n");mc.stop();return;}
                JsonObject spec=plan.get(index).getAsJsonObject();
                mc.gui.setScreen(null);
                if(spec.has("editor")){
                    boolean opened=(boolean)call(Class.forName("net.dochi.gameeditor.api.client.DochiClientEditorRegistry"),"openSource",spec.get("editor").getAsString(),-1,document,"use_default");
                    if(!opened)throw new IllegalStateException("No registered opener");
                }else if(spec.has("nativeNpc"))call(Class.forName("net.dochi.npc.client.DrmClientBridge"),"openNative",npcId,"");
                else if(spec.has("apply"))mc.gui.setScreen((Screen)construct("net.dochi.gameeditor.client.NpcApplyTargetScreen",npcId,document));
                else mc.gui.setScreen((Screen)construct("net.dochi.gameeditor.client.EditorSelectScreen",-1,document));
                action=0;waitTicks=8;phase=3;return;
            }
            JsonObject spec=plan.get(index).getAsJsonObject();
            if(spec.has("actions")&&action<spec.getAsJsonArray("actions").size()){
                String label=spec.getAsJsonArray("actions").get(action++).getAsString();
                if(label.startsWith("wait:")){waitTicks=Integer.parseInt(label.substring(5))/12;return;}
                Screen screen=mc.gui.screen();if(screen==null)throw new IllegalStateException("No screen for "+label);
                boolean found=false;
                for(Object child:screen.children())if(child instanceof AbstractWidget w&&w.visible&&w.active&&w.getMessage().getString().equals(label)){
                    double scale=1;try{scale=((Number)call(screen,"uiScale")).doubleValue();}catch(NoSuchMethodException ignored){}
                    screen.mouseClicked(new MouseButtonEvent((w.getX()+w.getWidth()/2d)*scale,(w.getY()+w.getHeight()/2d)*scale,new MouseButtonInfo(1,0)),false);found=true;break;
                }
                if(!found)throw new IllegalStateException("Visible button missing: "+label);
                waitTicks=4;return;
            }
            Screen screen=mc.gui.screen();if(screen==null)throw new IllegalStateException("Screen did not open");
            JsonObject result=new JsonObject();result.addProperty("id",spec.get("id").getAsString());result.addProperty("status","captured_in_game");result.addProperty("screenClass",screen.getClass().getName());
            JsonArray labels=new JsonArray();for(Object child:screen.children())if(child instanceof AbstractWidget w&&w.visible)labels.add(w.getMessage().getString());result.add("visibleWidgetLabels",labels);
            result.add("entry",spec.deepCopy());result.addProperty("note","Native screen rendering; completed workflow checks are recorded separately.");
            capturing=true;
            Screenshot.takeScreenshot(mc.gameRenderer.mainRenderTarget(),frame->{
                try(frame){
                    if(frame.getWidth()<1280||frame.getHeight()<720)throw new IllegalStateException("Framebuffer too small");
                    frame.writeToFile(out.resolve(spec.get("id").getAsString()+".png"));
                    result.addProperty("width",frame.getWidth());result.addProperty("height",frame.getHeight());results.add(result);
                    Files.writeString(out.resolve("screens.json"),new GsonBuilder().setPrettyPrinting().create().toJson(results));index++;phase=2;capturing=false;
                }catch(Exception e){fail(mc,e);}
            });
        }catch(Throwable e){fail(mc,e);}
    }
    private void fail(Minecraft mc,Throwable e){e.printStackTrace();done=true;try{Files.writeString(out.resolve("failure.txt"),e.toString());}catch(Exception ignored){}mc.stop();}
    private static void createWorld(Minecraft mc)throws Exception{
        Object settings=construct("net.minecraft.world.level.LevelSettings","Dochi illustrated guide",get(Class.forName("net.minecraft.world.level.GameType"),"CREATIVE"),construct("net.minecraft.world.level.LevelSettings$DifficultySettings",get(Class.forName("net.minecraft.world.Difficulty"),"PEACEFUL"),false,false),true,get(Class.forName("net.minecraft.world.level.WorldDataConfiguration"),"DEFAULT"));
        Object options=construct("net.minecraft.world.level.levelgen.WorldOptions",84L,false,false);
        Function<Object,Object> dimensions=access->{try{
            Object reg=call(access,"lookupOrThrow",get(Class.forName("net.minecraft.core.registries.Registries"),"WORLD_PRESET"));
            Object preset=call(call(reg,"getOrThrow",get(Class.forName("net.minecraft.world.level.levelgen.presets.WorldPresets"),"FLAT")),"value");return call(preset,"createWorldDimensions");
        }catch(Exception e){throw new RuntimeException(e);}};
        call(mc.createWorldOpenFlows(),"createFreshLevel","dochi_docs_263",settings,options,dimensions,new TitleScreen());
    }
    private static boolean matches(Class<?>[] ps,Object[] a){if(ps.length!=a.length)return false;for(int i=0;i<ps.length;i++){Class<?> p=ps[i];if(p==int.class)p=Integer.class;if(p==boolean.class)p=Boolean.class;if(p==long.class)p=Long.class;if(p==double.class)p=Double.class;if(p==float.class)p=Float.class;if(a[i]!=null&&!p.isInstance(a[i]))return false;}return true;}
    private static Object construct(String name,Object...args)throws Exception{for(Constructor<?> c:Class.forName(name).getDeclaredConstructors())if(matches(c.getParameterTypes(),args)){c.setAccessible(true);return c.newInstance(args);}throw new NoSuchMethodException(name+" constructor");}
    private static Object get(Object o,String name)throws Exception{for(Class<?> c=o instanceof Class<?> k?k:o.getClass();c!=null;c=c.getSuperclass())try{Field f=c.getDeclaredField(name);f.setAccessible(true);return f.get(o instanceof Class<?>?null:o);}catch(NoSuchFieldException ignored){}throw new NoSuchFieldException(name);}
    private static Object call(Object o,String name,Object...args)throws Exception{Class<?> type=o instanceof Class<?> k?k:o.getClass();for(Class<?> c=type;c!=null;c=c.getSuperclass())for(Method m:c.getDeclaredMethods())if(m.getName().equals(name)&&matches(m.getParameterTypes(),args)){m.setAccessible(true);try{return m.invoke(o instanceof Class<?>?null:o,args);}catch(InvocationTargetException e){throw new RuntimeException(name,e.getCause());}}for(Method m:type.getMethods())if(m.getName().equals(name)&&matches(m.getParameterTypes(),args)){m.setAccessible(true);return m.invoke(o instanceof Class<?>?null:o,args);}throw new NoSuchMethodException(name+"/"+args.length);}
}
