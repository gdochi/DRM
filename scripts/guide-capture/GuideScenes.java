package dochi.docs.capture;

import static dochi.docs.capture.GuideCapture.*;
import com.google.gson.*;
import net.minecraft.client.Minecraft;
import net.minecraft.client.Screenshot;
import net.minecraft.client.gui.screens.Screen;
import net.minecraft.core.BlockPos;
import net.minecraft.core.Direction;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.entity.Mob;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.block.Blocks;
import net.minecraft.world.level.block.BedBlock;
import net.minecraft.world.level.block.state.properties.BedPart;
import net.minecraft.world.phys.Vec3;
import net.minecraft.commands.arguments.EntityAnchorArgument;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.*;
import com.mojang.blaze3d.platform.NativeImage;
import net.neoforged.neoforge.common.NeoForge;
import net.neoforged.neoforge.client.event.RenderFrameEvent;

/** Original framebuffer sequences in an isolated world, using production screens and services. */
final class GuideScenes {
    static String expected="";
    static String takeExpected(){String value=expected;expected="";return value;}
    private static Object construct(String name,Object...args)throws Exception{
        var method=GuideCapture.class.getDeclaredMethod("construct",String.class,Object[].class);
        method.setAccessible(true);return method.invoke(null,name,args);
    }
    private static String recording="";
    private static int frameNumber,droppedFrames;
    private static long recordingStarted,nextFrameNanos;
    private static volatile Throwable frameFailure;
    private static final ThreadPoolExecutor writers=new ThreadPoolExecutor(4,4,10,TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(16),r->{var thread=new Thread(r,"Guide frame writer");thread.setDaemon(true);return thread;},new ThreadPoolExecutor.AbortPolicy());
    private static final List<Future<?>> pending=new ArrayList<>();
    private static final List<JsonObject> frames=new ArrayList<>();
    private static final BlockPos MACHINE=new BlockPos(3,-60,0), BED=new BlockPos(3,-60,0);
    private static BlockPos marker;
    static void abort(){recording="";frames.clear();}

    static void register(Path output){
        NeoForge.EVENT_BUS.addListener((RenderFrameEvent.Post event)->{
            try{frame(Minecraft.getInstance(),output);}catch(Throwable error){frameFailure=error;}
        });
    }

    static void frame(Minecraft mc,Path output)throws Exception {
        if(recording.isEmpty()||mc.level==null||mc.player==null||frameFailure!=null)return;
        long now=System.nanoTime();if(now<nextFrameNanos)return;
        nextFrameNanos=Math.max(nextFrameNanos+50_000_000L,now);
        Path folder=output.resolve(recording+"-frames");Files.createDirectories(folder);
        String file=String.format(Locale.ROOT,"%05d.png",frameNumber);
        NativeImage image=Screenshot.takeScreenshot(mc.getMainRenderTarget());
        try{pending.add(writers.submit(()->{try(image){image.writeToFile(folder.resolve(file));}catch(Throwable error){frameFailure=error;}}));}
        catch(RejectedExecutionException busy){image.close();droppedFrames++;return;}
        frameNumber++;
        JsonObject row=new JsonObject();row.addProperty("file",file);row.addProperty("elapsedMs",(now-recordingStarted)/1_000_000d);
        row.addProperty("screen",mc.screen==null?"world":mc.screen.getClass().getSimpleName());
        frames.add(row);
    }

    static void perform(Minecraft mc,String action,int npcId,Path output)throws Exception {
        if(frameFailure!=null)throw new IllegalStateException("Frame writer failed",frameFailure);
        if(action.startsWith("gif:start:")) {
            if(!recording.isEmpty())throw new IllegalStateException("Recording already active");
            recording=action.substring(10);if(!recording.matches("[a-z0-9-]+"))throw new IllegalArgumentException(recording);
            frameNumber=droppedFrames=0;frames.clear();pending.clear();recordingStarted=nextFrameNanos=System.nanoTime();return;
        }
        if(action.equals("gif:stop")) {
            if(recording.isEmpty())throw new IllegalStateException("No recording");
            String completed=recording;recording="";
            for(Future<?> future:pending)future.get(30,TimeUnit.SECONDS);
            if(frameFailure!=null)throw new IllegalStateException("Frame writer failed",frameFailure);
            if(droppedFrames!=0)throw new IllegalStateException("Capture writer dropped "+droppedFrames+" frames; retry rather than publish a stuttering clip");
            Files.writeString(output.resolve(completed+"-frames.json"),new GsonBuilder().setPrettyPrinting().create().toJson(frames));return;
        }
        if(action.endsWith("-setup")) {
            String kind=action.substring(6,action.length()-6);
            mc.setScreen(null);mc.options.fov().set(55);mc.options.bobView().set(false);
            mc.getSingleplayerServer().submit(()->{try{
                var p=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());var level=p.serverLevel();
                level.getGameRules().getRule(net.minecraft.world.level.GameRules.RULE_DAYLIGHT).set(false,mc.getSingleplayerServer());
                level.getGameRules().getRule(net.minecraft.world.level.GameRules.RULE_DOMOBSPAWNING).set(false,mc.getSingleplayerServer());
                level.setDayTime(6000);level.setWeatherParameters(0,6000,false,false);
                for(int x=-5;x<=8;x++)for(int z=-4;z<=8;z++) {
                    level.setBlock(new BlockPos(x,-61,z),Blocks.SMOOTH_QUARTZ.defaultBlockState(),3);
                    for(int y=-60;y<=-56;y++)level.setBlock(new BlockPos(x,y,z),Blocks.AIR.defaultBlockState(),3);
                }
                for(int x=-10;x<=12;x++)for(int y=-60;y<=-54;y++)level.setBlock(new BlockPos(x,y,-3),(y==-59?Blocks.PINK_CONCRETE:Blocks.WHITE_CONCRETE).defaultBlockState(),3);
                for(int x:new int[]{-4,7})level.setBlock(new BlockPos(x,-56,-3),Blocks.SEA_LANTERN.defaultBlockState(),3);
                var npc=(Mob)level.getEntity(npcId);npc.setNoAi(false);npc.moveTo(.5,-60,.5,0,0);
                Object settings=call(npc,"settings");set(settings,"name",kind.equals("nurse")?"Nurse Joy":"Village resident");
                set(settings,"lookAtPlayers",kind.equals("nurse"));set(settings,"lookAtInteraction",kind.equals("nurse"));set(settings,"sleepEnabled",false);
                set(settings,"texture",kind.equals("nurse")?"dochi_docs:textures/nurse_joy.png":"minecraft:textures/entity/player/wide/steve.png");
                set(settings,"slim",kind.equals("nurse"));
                ((List)get(settings,"houses")).clear();set(get(settings,"dayCycle"),"enabled",false);
                ((List)get(get(settings,"dayCycle"),"entries")).clear();
                call(npc,"applySettings",settings);call(npc,"setHome");
                float facing=kind.equals("nurse")?-38.66f:0;
                npc.setYRot(facing);npc.yRotO=facing;npc.setYHeadRot(facing);npc.yHeadRotO=facing;npc.yBodyRot=facing;npc.yBodyRotO=facing;
                p.getInventory().clearContent();p.setItemInHand(InteractionHand.OFF_HAND,ItemStack.EMPTY);
                p.teleportTo(4.5,-60,5.5);p.containerMenu.broadcastChanges();
                if(kind.equals("nurse")) {
                    var block=BuiltInRegistries.BLOCK.get(ResourceLocation.parse("cobblemon:healing_machine"));
                    if(block==Blocks.AIR)throw new IllegalStateException("Healing machine not registered");
                    var state=block.defaultBlockState();
                    if(state.hasProperty(net.minecraft.world.level.block.HorizontalDirectionalBlock.FACING))state=state.setValue(net.minecraft.world.level.block.HorizontalDirectionalBlock.FACING,Direction.SOUTH);
                    level.setBlock(MACHINE,state,3);
                    var be=level.getBlockEntity(MACHINE);call(be,"setHealingCharge",10f);
                    var nbt=new net.minecraft.nbt.CompoundTag();nbt.putString("Species","cobblemon:bulbasaur");nbt.putInt("Level",5);
                    Object slot=call(Class.forName("net.hodu.cobblenpc.CobbleTrainerData$PokemonSlot"),"fromNbt",nbt);
                    Object pokemon=call(Class.forName("net.hodu.cobblenpc.pokemart.PokeMartPokemonService"),"create",slot,p);
                    call(pokemon,"setCurrentHealth",1);call(Class.forName("net.hodu.cobblenpc.pokemart.PokeMartPokemonService"),"give",p,pokemon);
                } else if(kind.equals("bed")) {
                    var state=Blocks.RED_BED.defaultBlockState().setValue(BedBlock.FACING,Direction.NORTH);
                    level.setBlock(BED,state.setValue(BedBlock.PART,BedPart.FOOT),3);
                    level.setBlock(BED.north(),state.setValue(BedBlock.PART,BedPart.HEAD),3);
                } else if(kind.equals("remnant")) {
                    npc.moveTo(-3,-60,1,0,0);p.teleportTo(.5,-60,4.5);
                    marker=p.blockPosition().offset(2,0,0);
                    level.setBlock(marker.below(),Blocks.CHISELED_STONE_BRICKS.defaultBlockState(),3);
                    p.setItemInHand(InteractionHand.MAIN_HAND,new ItemStack(BuiltInRegistries.ITEM.get(ResourceLocation.parse("dochi_rpg_maker:remnant_msg_setter"))));
                }
                return true;
            }catch(Exception e){throw new RuntimeException(e);}}).get(10,TimeUnit.SECONDS);
            return;
        }
        if(action.startsWith("scene:look-")) {
            Vec3 target=action.endsWith("remnant")?Vec3.atCenterOf(marker):new Vec3(1.7,-59.15,.25);
            mc.player.lookAt(EntityAnchorArgument.Anchor.EYES,target);return;
        }
        if(action.equals("scene:nurse-editor")) {
            mc.setScreen((Screen)construct("net.hodu.cobblenpc.client.NurseJoyEditorScreen",mc.level.getEntity(npcId)));return;
        }
        if(action.equals("scene:nurse-link")) {
            mc.getSingleplayerServer().submit(()->{try{
                var p=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());p.setShiftKeyDown(true);
                Object service=Class.forName("net.hodu.cobblenpc.nursejoy.NurseJoyService");
                call(service,"onUseHealingMachine",p,p.serverLevel(),MACHINE,p.serverLevel().getBlockEntity(MACHINE),InteractionHand.MAIN_HAND);
                p.setShiftKeyDown(false);return true;
            }catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);return;
        }
        if(action.equals("scene:nurse-interact")) {
            mc.setScreen(null);mc.player.getInventory().selected=8;
            mc.gameMode.interact(mc.player,mc.level.getEntity(npcId),InteractionHand.MAIN_HAND);expected="DialogueRuntimeScreen";return;
        }
        if(action.equals("scene:heal-choice")) {
            List<?> buttons=(List<?>)get(mc.screen,"runtimeButtons");if(buttons.isEmpty())throw new IllegalStateException("Missing healing choice");
            Object button=buttons.get(0);double x=((Number)get(button,"x")).doubleValue()+((Number)get(button,"w")).doubleValue()/2;
            double y=((Number)get(button,"y")).doubleValue()+((Number)get(button,"h")).doubleValue()/2;
            if(!mc.screen.mouseClicked(x,y,0))throw new IllegalStateException("Healing click rejected");expected="@closed";return;
        }
        if(action.equals("scene:bed-editor")) {
            mc.setScreen(null);mc.getSingleplayerServer().submit(()->{try{
                var p=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());
                call(Class.forName("net.dochi.npc.NpcNetwork"),"open",p,p.serverLevel().getEntity(npcId));return true;
            }catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);expected="NpcEditorScreen";return;
        }
        if(action.equals("scene:bed-select")) {
            // The normal DNPC selection sends this same request for a Shift/right-click hit.
            Object request=construct("net.dochi.npc.NpcNetwork$Request","select_bed",npcId,mc.level.getEntity(npcId).getUUID(),0L,Long.toString(BED.asLong()));
            mc.getSingleplayerServer().submit(()->{var p=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());p.setShiftKeyDown(true);return true;}).get(5,TimeUnit.SECONDS);
            call(Class.forName("net.dochi.npc.NpcNetwork"),"sendToServer",request);expected="NpcEditorScreen";return;
        }
        if(action.equals("scene:bed-sleep")) {
            mc.setScreen(null);mc.getSingleplayerServer().submit(()->{try{
                var p=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());p.setShiftKeyDown(false);
                var npc=(Mob)p.serverLevel().getEntity(npcId);Object settings=call(npc,"settings");
                Object cycle=get(settings,"dayCycle");set(cycle,"enabled",true);
                Object entry=construct("net.dochi.npc.NpcDayCycle$Entry");set(entry,"name","Night sleep");set(entry,"start",12000);set(entry,"end",23000);
                set(entry,"activity",Enum.valueOf((Class)Class.forName("net.dochi.npc.NpcDayCycle$Activity"),"SLEEP"));
                ((List)get(cycle,"entries")).clear();((List)get(cycle,"entries")).add(entry);call(npc,"applySettings",settings);
                call(Class.forName("net.dochi.npc.NpcEditSessions"),"end",p);p.serverLevel().setDayTime(14000);return true;
            }catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);return;
        }
        if(action.equals("scene:remnant-place")) {
            mc.getSingleplayerServer().submit(()->{var p=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());
                var hit=new net.minecraft.world.phys.BlockHitResult(Vec3.atCenterOf(marker.below()).add(0,.5,0),Direction.UP,marker.below(),false);
                p.getMainHandItem().getItem().useOn(new net.minecraft.world.item.context.UseOnContext(p,InteractionHand.MAIN_HAND,hit));return true;
            }).get(5,TimeUnit.SECONDS);expected="RemnantMsgSetterScreen";return;
        }
        if(action.equals("scene:verify-nurse")||action.equals("scene:verify-bed")) {
            JsonObject result=mc.getSingleplayerServer().submit(()->{try{
                var p=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());var npc=(Mob)p.serverLevel().getEntity(npcId);var r=new JsonObject();
                r.addProperty("sleeping",npc.isSleeping());r.addProperty("npcX",npc.getX());r.addProperty("npcZ",npc.getZ());
                r.addProperty("settings",String.valueOf(call(npc,"editorJson")));
                if(action.endsWith("nurse")) {
                    r.addProperty("busy",(boolean)call(Class.forName("net.hodu.cobblenpc.nursejoy.NurseJoyService"),"isBusyNpc",npc.getUUID()));
                    JsonArray party=new JsonArray();for(Object pokemon:(Iterable<?>)call(Class.forName("com.cobblemon.mod.common.util.PlayerExtensionsKt"),"party",p)){
                        JsonObject row=new JsonObject();row.addProperty("health",((Number)call(pokemon,"getCurrentHealth")).intValue());row.addProperty("maxHealth",((Number)call(pokemon,"getMaxHealth")).intValue());party.add(row);
                    }r.add("party",party);
                }return r;
            }catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);
            Files.writeString(output.resolve(action.substring(6)+".json"),new GsonBuilder().setPrettyPrinting().create().toJson(result));
            if(action.endsWith("bed")&&!result.get("sleeping").getAsBoolean())throw new IllegalStateException("NPC did not sleep in assigned bed");
            if(action.endsWith("nurse")) {
                JsonObject pokemon=result.getAsJsonArray("party").get(0).getAsJsonObject();
                if(result.get("busy").getAsBoolean()||pokemon.get("health").getAsInt()!=pokemon.get("maxHealth").getAsInt())throw new IllegalStateException("Treatment not complete: "+result);
            }return;
        }
        throw new IllegalArgumentException(action);
    }
}
