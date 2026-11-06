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
    private static JsonObject guiBounds(Object element)throws Exception{
        if(element==null)throw new IllegalStateException("No selected GUI component");
        JsonObject result=new JsonObject();for(String field:List.of("x","y","w","h"))result.addProperty(field,((Number)get(element,field)).intValue());return result;
    }
    private static BlockPos marker;
    private static Screen motionScreen;
    private static String motionKind;
    private static double motionX,motionY,motionDx,motionDy;
    private static long motionStarted;
    private static JsonObject motionBefore;
    private static Object spawnState;
    private static BlockPos spawnAnchor;
    private static boolean spawnWalking;
    private static int warmPigId;
    private static int warfareNpcId,warfareTargetId;
    private static boolean warfareTracking;
    private static final JsonArray warfareSamples=new JsonArray();
    private static int haulNpcId;
    private static BlockPos haulSource,haulDestination;
    private static boolean haulTracking;
    private static final JsonArray haulSamples=new JsonArray();
    private static int aiVehicleId,driverId,gunnerId,vehicleTargetId;
    private static Vec3 vehicleOrigin;
    private static boolean vehicleTracking;
    private static final JsonArray vehicleSamples=new JsonArray();
    private static boolean trainerTransitions;
    static boolean allowsScreenTransition(){return trainerTransitions;}
    static void abort(){recording="";frames.clear();motionScreen=null;spawnWalking=false;warfareTracking=false;haulTracking=false;vehicleTracking=false;trainerTransitions=false;Minecraft.getInstance().options.keyUp.setDown(false);}

    static void register(Path output){
        NeoForge.EVENT_BUS.addListener((net.neoforged.neoforge.event.tick.ServerTickEvent.Post event)->{
            if(warfareTracking)try{sampleWarfare(event.getServer());}catch(Throwable error){frameFailure=error;}
            if(haulTracking)try{sampleHaul(event.getServer());}catch(Throwable error){frameFailure=error;}
            if(vehicleTracking)try{sampleVehicle(event.getServer());}catch(Throwable error){frameFailure=error;}
        });
        NeoForge.EVENT_BUS.addListener((RenderFrameEvent.Post event)->{
            try{frame(Minecraft.getInstance(),output);}catch(Throwable error){frameFailure=error;}
        });
    }

    private static int wheat(net.minecraft.world.Container container){int result=0;for(int i=0;i<container.getContainerSize();i++)if(container.getItem(i).is(net.minecraft.world.item.Items.WHEAT))result+=container.getItem(i).getCount();return result;}
    private static void sampleVehicle(net.minecraft.server.MinecraftServer server)throws Exception{
        var level=server.overworld();var vehicle=level.getEntity(aiVehicleId);Object state=call(Class.forName("net.dochi.warfare.vehicle.runtime.SuperbVehicleAiStorage"),"get",vehicle);
        JsonObject row=new JsonObject();row.addProperty("tick",level.getGameTime());row.addProperty("x",vehicle.getX());row.addProperty("z",vehicle.getZ());row.addProperty("distance",vehicle.position().distanceTo(vehicleOrigin));
        row.addProperty("passengers",vehicle.getPassengers().size());row.addProperty("driverSeat",((Number)call(vehicle,"getSeatIndex",level.getEntity(driverId))).intValue());row.addProperty("gunnerSeat",((Number)call(vehicle,"getSeatIndex",level.getEntity(gunnerId))).intValue());
        for(String field:List.of("enabled","mode","lastFailureReason","lastNavigationFailureReason","lastInputMask","selectedWeaponName","lastFiredTickByWeapon","lastWeaponStatuses"))row.add(field,new Gson().toJsonTree(get(state,field)));
        var target=level.getEntity(vehicleTargetId);if(target instanceof net.minecraft.world.entity.LivingEntity living)row.addProperty("targetHealth",living.getHealth());vehicleSamples.add(row);
    }

    private static void boardVehicle(net.minecraft.world.entity.Entity vehicle,net.minecraft.world.entity.Entity crew,int seat)throws Exception{
        var previous=(java.util.function.Function<net.minecraft.world.entity.Entity,Integer>)call(vehicle,"getEntityIndexOverride");
        java.util.function.Function<net.minecraft.world.entity.Entity,Integer> override=entity->entity==crew?seat:previous==null?-1:previous.apply(entity);
        call(vehicle,"setEntityIndexOverride",override);boolean mounted;
        try{mounted=crew.startRiding(vehicle,true);}finally{call(vehicle,"setEntityIndexOverride",previous);}
        if(!mounted||((Number)call(vehicle,"getSeatIndex",crew)).intValue()!=seat)throw new IllegalStateException("Native crew boarding failed for seat "+seat);
    }
    private static void sampleHaul(net.minecraft.server.MinecraftServer server)throws Exception{
        var level=server.overworld();var npc=(Mob)level.getEntity(haulNpcId);JsonObject row=new JsonObject();
        row.addProperty("tick",level.getGameTime());row.addProperty("x",npc.getX());row.addProperty("z",npc.getZ());
        row.addProperty("source",wheat((net.minecraft.world.Container)level.getBlockEntity(haulSource)));
        row.addProperty("destination",wheat((net.minecraft.world.Container)level.getBlockEntity(haulDestination)));
        row.addProperty("cargo",wheat((net.minecraft.world.Container)call(npc,"inventory")));haulSamples.add(row);
        row.addProperty("ownsAi",(boolean)call(npc,"ownsAi"));row.addProperty("noAi",npc.isNoAi());row.addProperty("dayEntry",String.valueOf(call(npc,"dayEntry")));row.addProperty("activity",String.valueOf(call(npc,"activity")));
    }

    private static void sampleWarfare(net.minecraft.server.MinecraftServer server)throws Exception{
        var npc=(Mob)server.overworld().getEntity(warfareNpcId);
        Object mod=get(Class.forName("net.dochi.tacznpcfire.TaczNpcFireMod"),"instance");
        Object state=call(get(mod,"stateRegistry"),"get",npc);
        JsonObject row=new JsonObject();row.addProperty("tick",server.overworld().getGameTime());row.addProperty("x",npc.getX());row.addProperty("z",npc.getZ());
        if(state!=null){
            row.addProperty("shots",((Number)get(state,"successShots")).longValue());
            row.addProperty("reloadSequence",((Number)get(state,"reloadSequenceId")).longValue());
            row.addProperty("reloading",((Number)get(state,"reloadUntilMs")).longValue()>System.currentTimeMillis());
            row.addProperty("coverPhase",((Number)get(get(state,"reloadCover"),"phase")).intValue());
            row.addProperty("coverResult",String.valueOf(get(get(state,"reloadCover"),"result")));
            row.addProperty("coverAbort",String.valueOf(get(get(state,"reloadCover"),"abortReason")));
            row.addProperty("lastResult",String.valueOf(get(state,"lastResult")));
        }
        var target=(net.minecraft.world.entity.LivingEntity)server.overworld().getEntity(warfareTargetId);
        row.addProperty("targetHealth",target==null?0:target.getHealth());warfareSamples.add(row);
    }

    static void frame(Minecraft mc,Path output)throws Exception {
        if(recording.isEmpty()||mc.level==null||mc.player==null||frameFailure!=null)return;
        long now=System.nanoTime();if(now<nextFrameNanos)return;
        if(spawnWalking&&mc.player.distanceToSqr(Vec3.atCenterOf(spawnAnchor))<16){mc.options.keyUp.setDown(false);spawnWalking=false;}
        if(motionScreen!=null){
            double fraction=Math.min(1,(now-motionStarted)/1_000_000_000d);
            double x=motionX+motionDx*fraction,y=motionY+motionDy*fraction;
            if(!motionScreen.mouseDragged(x,y,0,motionDx/20,motionDy/20))throw new IllegalStateException("Native GUI drag rejected");
            if(fraction>=1){
                motionScreen.mouseReleased(x,y,0);
                JsonObject report=new JsonObject();report.add("before",motionBefore);report.add("after",guiBounds(call(motionScreen,"selectedElement")));
                Files.writeString(output.resolve("gui-motion-"+motionKind+".json"),new GsonBuilder().setPrettyPrinting().create().toJson(report));
                motionScreen=null;
            }
        }
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
        if(action.equals("scene:vehicle-setup")){
            mc.setScreen(null);mc.options.fov().set(70);mc.options.bobView().set(false);
            mc.getSingleplayerServer().submit(()->{try{
                var server=mc.getSingleplayerServer();var level=server.overworld();var player=server.getPlayerList().getPlayer(mc.player.getUUID());var driver=(Mob)level.getEntity(npcId);driverId=npcId;
                server.setDifficulty(net.minecraft.world.Difficulty.NORMAL,true);level.getGameRules().getRule(net.minecraft.world.level.GameRules.RULE_DOMOBSPAWNING).set(false,server);level.setDayTime(6000);
                vehicleOrigin=driver.position().add(6,0,0);BlockPos center=BlockPos.containing(vehicleOrigin);
                for(var entity:level.getEntitiesOfClass(net.minecraft.world.entity.Entity.class,new net.minecraft.world.phys.AABB(center).inflate(40)))if(BuiltInRegistries.ENTITY_TYPE.getKey(entity.getType()).toString().equals("superbwarfare:m_1a_2"))entity.discard();
                for(int dx=-22;dx<=22;dx++)for(int dz=-10;dz<=48;dz++){BlockPos pos=center.offset(dx,0,dz);level.setBlock(pos.below(),Blocks.SMOOTH_STONE.defaultBlockState(),3);for(int dy=0;dy<=5;dy++)level.setBlock(pos.above(dy),Blocks.AIR.defaultBlockState(),3);}
                var vehicle=BuiltInRegistries.ENTITY_TYPE.get(ResourceLocation.parse("superbwarfare:m_1a_2")).create(level);if(vehicle==null)throw new IllegalStateException("M1A2 unavailable");vehicle.moveTo(vehicleOrigin.x,vehicleOrigin.y+.1,vehicleOrigin.z,0,0);vehicle.setInvulnerable(true);level.addFreshEntity(vehicle);aiVehicleId=vehicle.getId();
                if((boolean)call(vehicle,"hasEnergyStorage"))call(vehicle,"setEnergy",((Number)call(vehicle,"getMaxEnergy")).intValue());
                driver.setNoAi(true);driver.setCustomName(net.minecraft.network.chat.Component.literal("Driver"));driver.moveTo(vehicleOrigin.x-3,vehicleOrigin.y,vehicleOrigin.z,0,0);
                var gunner=(Mob)BuiltInRegistries.ENTITY_TYPE.get(ResourceLocation.parse("dochi_npc:npc")).create(level);gunner.setNoAi(true);gunner.setPersistenceRequired();gunner.setCustomName(net.minecraft.network.chat.Component.literal("Gunner"));gunner.moveTo(vehicleOrigin.x-3,vehicleOrigin.y,vehicleOrigin.z+2,0,0);level.addFreshEntity(gunner);gunnerId=gunner.getId();
                Object state=call(Class.forName("net.dochi.warfare.vehicle.runtime.SuperbVehicleAiStorage"),"get",vehicle);set(state,"awarenessFovDegrees",360d);set(state,"detectionDelayTicks",0);set(state,"combatMovementMode",Enum.valueOf((Class)Class.forName("net.dochi.warfare.vehicle.runtime.SuperbVehicleCombatMovementMode"),"HOLD"));
                set(state,"targetPolicy",construct("net.dochi.tacznpcfire.CombatTargetPolicy",List.of("minecraft:husk"),false,false,List.of(),List.of()));call(Class.forName("net.dochi.warfare.vehicle.runtime.SuperbVehicleAiStorage"),"save",vehicle,state);
                player.getInventory().clearContent();player.teleportTo(vehicleOrigin.x-14,vehicleOrigin.y,vehicleOrigin.z+8);return true;
            }catch(Exception e){throw new RuntimeException(e);}}).get(15,TimeUnit.SECONDS);return;
        }
        if(action.equals("scene:vehicle-look")){mc.player.lookAt(EntityAnchorArgument.Anchor.EYES,vehicleOrigin.add(0,1.7,6));return;}
        if(action.equals("scene:vehicle-combat-look")){mc.player.lookAt(EntityAnchorArgument.Anchor.EYES,vehicleOrigin.add(2,1.6,15));return;}
        if(action.equals("scene:vehicle-board")){
            mc.getSingleplayerServer().submit(()->{try{var level=mc.getSingleplayerServer().overworld();var vehicle=level.getEntity(aiVehicleId);vehicleSamples.asList().clear();sampleVehicle(mc.getSingleplayerServer());boardVehicle(vehicle,level.getEntity(driverId),0);boardVehicle(vehicle,level.getEntity(gunnerId),1);vehicleTracking=true;return true;}catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);return;
        }
        if(action.equals("scene:vehicle-drive")){
            mc.getSingleplayerServer().submit(()->{try{var vehicle=mc.getSingleplayerServer().overworld().getEntity(aiVehicleId);if(!(boolean)call(Class.forName("net.dochi.warfare.vehicle.api.SuperbWarfareVehicleBridge"),"moveTo",vehicle,vehicleOrigin.x,vehicleOrigin.y,vehicleOrigin.z+14))throw new IllegalStateException("Native Move To rejected");return true;}catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);return;
        }
        if(action.equals("scene:vehicle-target")){
            mc.getSingleplayerServer().submit(()->{try{var level=mc.getSingleplayerServer().overworld();var vehicle=level.getEntity(aiVehicleId);
                if(vehicle.position().distanceTo(vehicleOrigin)<3)throw new IllegalStateException("Vehicle did not drive before combat");
                if(!(boolean)call(Class.forName("net.dochi.warfare.vehicle.api.SuperbWarfareVehicleBridge"),"setMode",vehicle,"STATIONARY"))throw new IllegalStateException("Stationary command rejected");
                var target=net.minecraft.world.entity.EntityType.HUSK.create(level);target.moveTo(vehicle.getX()+9,vehicleOrigin.y,vehicle.getZ()+25,180,0);target.setNoAi(true);target.setPersistenceRequired();target.getAttribute(net.minecraft.world.entity.ai.attributes.Attributes.MAX_HEALTH).setBaseValue(2000);target.setHealth(2000);target.addTag("dochi_warfare_vehicle_target");level.addFreshEntity(target);vehicleTargetId=target.getId();return true;
            }catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);return;
        }
        if(action.equals("scene:vehicle-verify")){
            mc.getSingleplayerServer().submit(()->{vehicleTracking=false;return true;}).get(5,TimeUnit.SECONDS);Files.writeString(output.resolve("vehicle-ai-runtime.json"),new GsonBuilder().setPrettyPrinting().create().toJson(vehicleSamples));
            boolean boarded=false,moved=false,fired=false;for(JsonElement sample:vehicleSamples){var row=sample.getAsJsonObject();boarded|=row.get("driverSeat").getAsInt()==0&&row.get("gunnerSeat").getAsInt()==1;moved|=row.get("distance").getAsDouble()>3;fired|=!row.getAsJsonObject("lastFiredTickByWeapon").isEmpty();}
            if(!boarded||!moved||!fired)throw new IllegalStateException("Incomplete vehicle AI: boarded="+boarded+", moved="+moved+", fired="+fired);return;
        }
        if(action.equals("scene:trainer-setup")){
            mc.setScreen(null);mc.options.fov().set(60);mc.options.bobView().set(false);
            mc.getSingleplayerServer().submit(()->{try{
                var server=mc.getSingleplayerServer();var level=server.overworld();var player=server.getPlayerList().getPlayer(mc.player.getUUID());var npc=(Mob)level.getEntity(npcId);
                level.getGameRules().getRule(net.minecraft.world.level.GameRules.RULE_DOMOBSPAWNING).set(false,server);level.setDayTime(6000);player.getInventory().clearContent();
                npc.setNoAi(true);npc.setCustomName(net.minecraft.network.chat.Component.literal("Meadow Trainer"));player.teleportTo(npc.getX(),npc.getY(),npc.getZ()+3);
                var pokemonNbt=new net.minecraft.nbt.CompoundTag();pokemonNbt.putString("Species","cobblemon:bulbasaur");pokemonNbt.putInt("Level",10);
                Object slot=call(Class.forName("net.hodu.cobblenpc.CobbleTrainerData$PokemonSlot"),"fromNbt",pokemonNbt);
                Object pokemon=call(Class.forName("net.hodu.cobblenpc.pokemart.PokeMartPokemonService"),"create",slot,player);
                if(!(boolean)call(Class.forName("net.hodu.cobblenpc.pokemart.PokeMartPokemonService"),"give",player,pokemon))throw new IllegalStateException("Practice Pokemon not granted");
                Class<?> dialogue=Class.forName("net.dochi.gameeditor.dialogue.DialogueDocument");Object document=call(dialogue,"fromLegacy",true,"Practice battle","Ready for a practice battle?",new String[]{"Let's battle!","Maybe later."},new String[]{"",""});
                JsonObject nodes=(JsonObject)call(document,"nodes");JsonArray choices=nodes.getAsJsonObject("dialogue_1").getAsJsonArray("choice");
                for(int i=0;i<2;i++){JsonArray actions=choices.get(i).getAsJsonObject().getAsJsonArray("actions");actions.asList().clear();actions.add((JsonObject)call(dialogue,"defaultAction",i==0?"cobble_npc:go_battle":"close",""));}
                call(Class.forName("net.dochi.gameeditor.ServerJsonStorage"),"save","dialogue_set","guide_trainer_challenge",call(document,"toJson"));
                Class<?> trainers=Class.forName("net.hodu.cobblenpc.CobbleTrainerData");Object trainer=call(trainers,"defaultTrainer");var nbt=(net.minecraft.nbt.CompoundTag)call(trainer,"toNbt");nbt.putString("Name","Meadow Trainer");
                var rounds=nbt.getList("Rounds",10);var mapping=new net.minecraft.nbt.CompoundTag();mapping.putString("BeforeBattleSet","guide_trainer_challenge");rounds.getCompound(0).put("Dialogue",mapping);
                trainer=call(trainers,"fromNbt",nbt);call(trainer,"saveToNpc",npc);Files.writeString(output.resolve("trainer-profile.snbt"),nbt.toString());return true;
            }catch(Exception e){throw new RuntimeException(e);}}).get(10,TimeUnit.SECONDS);return;
        }
        if(action.equals("scene:trainer-interact")){trainerTransitions=true;mc.gameMode.interact(mc.player,mc.level.getEntity(npcId),InteractionHand.MAIN_HAND);return;}
        if(action.equals("scene:trainer-click")){
            if(mc.screen==null)throw new IllegalStateException("Trainer dialogue was not opened");Object chosen=null;
            for(Object row:(List<?>)get(mc.screen,"runtimeButtons"))if("Let's battle!".equals(get(row,"label")))chosen=row;
            if(chosen==null)throw new IllegalStateException("Battle challenge choice missing");
            double x=((Number)get(chosen,"x")).doubleValue()+((Number)get(chosen,"w")).doubleValue()/2,y=((Number)get(chosen,"y")).doubleValue()+((Number)get(chosen,"h")).doubleValue()/2;
            if(!mc.screen.mouseClicked(x,y,0))throw new IllegalStateException("Trainer choice click rejected");return;
        }
        if(action.equals("scene:trainer-verify")){
            JsonObject result=mc.getSingleplayerServer().submit(()->{try{
                var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());Object battle=call(Class.forName("com.cobblemon.mod.common.battles.BattleRegistry"),"getBattleByParticipatingPlayer",player);
                if(battle==null)throw new IllegalStateException("No actual Cobblemon battle for player");JsonObject r=new JsonObject();r.addProperty("battleClass",battle.getClass().getName());r.addProperty("player",player.getUUID().toString());return r;
            }catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);Files.writeString(output.resolve("trainer-battle-verified.json"),result.toString());trainerTransitions=false;return;
        }
        if(action.equals("scene:haul-setup")){
            mc.setScreen(null);mc.options.fov().set(60);mc.options.bobView().set(false);haulNpcId=npcId;
            mc.getSingleplayerServer().submit(()->{try{
                var server=mc.getSingleplayerServer();var level=server.overworld();var player=server.getPlayerList().getPlayer(mc.player.getUUID());var npc=(Mob)level.getEntity(npcId);BlockPos center=npc.blockPosition();
                level.getGameRules().getRule(net.minecraft.world.level.GameRules.RULE_DOMOBSPAWNING).set(false,server);level.getGameRules().getRule(net.minecraft.world.level.GameRules.RULE_DAYLIGHT).set(false,server);level.setDayTime(6000);
                for(int x=-7;x<=7;x++)for(int z=-3;z<=10;z++){
                    level.setBlock(center.offset(x,-1,z),Blocks.SMOOTH_QUARTZ.defaultBlockState(),3);
                    for(int y=0;y<=4;y++)level.setBlock(center.offset(x,y,z),Blocks.AIR.defaultBlockState(),3);
                }
                haulSource=center.offset(-4,0,0);haulDestination=center.offset(4,0,0);
                level.setBlock(haulSource,Blocks.CHEST.defaultBlockState(),3);level.setBlock(haulDestination,Blocks.CHEST.defaultBlockState(),3);
                ((net.minecraft.world.Container)level.getBlockEntity(haulSource)).setItem(0,new ItemStack(net.minecraft.world.item.Items.WHEAT,32));
                ((net.minecraft.world.Container)call(npc,"inventory")).clearContent();
                Object settings=call(npc,"settings"),cycle=get(settings,"dayCycle");set(cycle,"enabled",false);((List)get(cycle,"entries")).clear();
                Object entry=construct("net.dochi.npc.NpcDayCycle$Entry");set(entry,"name","Wheat delivery");set(entry,"start",0);set(entry,"end",23999);
                set(entry,"activity",Enum.valueOf((Class)Class.forName("net.dochi.npc.NpcDayCycle$Activity"),"WORK"));set(entry,"work",Enum.valueOf((Class)Class.forName("net.dochi.npc.NpcDayCycle$Work"),"HAUL"));
                set(entry,"located",true);set(entry,"x",haulSource.getX());set(entry,"y",haulSource.getY());set(entry,"z",haulSource.getZ());set(entry,"radius",1);
                Object workSite=get(entry,"workSite");set(workSite,"origin",Enum.valueOf((Class)Class.forName("net.dochi.npc.NpcWorkSiteSettings$Origin"),"CUSTOM"));Object workPoint=get(workSite,"point");set(workPoint,"x",haulSource.getX()+1);set(workPoint,"y",haulSource.getY());set(workPoint,"z",haulSource.getZ()+1);
                Object transfer=get(entry,"transfer");set(transfer,"count",32);set(transfer,"interval",20);((List<String>)get(get(transfer,"filter"),"ids")).add("minecraft:wheat");
                Object job=get(entry,"job");set(job,"outputSet",true);set(job,"deliver",true);Object point=get(job,"output");set(point,"x",haulDestination.getX());set(point,"y",haulDestination.getY());set(point,"z",haulDestination.getZ());
                ((List)get(cycle,"entries")).add(entry);set(settings,"fixedPosition",false);set(settings,"fixedRotation",false);set(settings,"speed",.25d);call(npc,"applySettings",settings);
                npc.setNoAi(false);npc.moveTo(haulSource.getX()+1.5,center.getY(),center.getZ()+1.5,90,0);
                Files.writeString(output.resolve("haul-settings.json"),String.valueOf(call(npc,"editorJson")));
                player.teleportTo(center.getX()+.5,center.getY(),center.getZ()+8.5);return true;
            }catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);return;
        }
        if(action.equals("scene:haul-look")){mc.player.lookAt(EntityAnchorArgument.Anchor.EYES,Vec3.atCenterOf(haulSource).add(4,.4,0));return;}
        if(action.equals("scene:haul-start")){
            mc.getSingleplayerServer().submit(()->{try{
                haulSamples.asList().clear();sampleHaul(mc.getSingleplayerServer());var npc=(Mob)mc.getSingleplayerServer().overworld().getEntity(npcId);Object settings=call(npc,"settings");set(get(settings,"dayCycle"),"enabled",true);call(npc,"applySettings",settings);npc.setNoAi(false);call(Class.forName("net.dochi.npc.NpcEditSessions"),"end",mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID()));mc.getSingleplayerServer().overworld().setDayTime(6001);haulTracking=true;return true;
            }catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);return;
        }
        if(action.equals("scene:haul-verify")){
            mc.getSingleplayerServer().submit(()->{haulTracking=false;return true;}).get(5,TimeUnit.SECONDS);
            Files.writeString(output.resolve("haul-runtime.json"),new GsonBuilder().setPrettyPrinting().create().toJson(haulSamples));
            boolean carried=false;for(JsonElement item:haulSamples)carried|=item.getAsJsonObject().get("cargo").getAsInt()>0;
            JsonObject last=haulSamples.get(haulSamples.size()-1).getAsJsonObject();
            if(!carried||last.get("source").getAsInt()!=0||last.get("destination").getAsInt()!=32||last.get("cargo").getAsInt()!=0)throw new IllegalStateException("Native hauling not completed: "+last);return;
        }
        if(action.equals("scene:dw-setup")||action.equals("scene:dw-setup-reload")){
            boolean coverDemo=action.equals("scene:dw-setup");
            mc.setScreen(null);mc.options.fov().set(65);mc.options.bobView().set(false);warfareNpcId=npcId;
            mc.getSingleplayerServer().submit(()->{try{
                var server=mc.getSingleplayerServer();var player=server.getPlayerList().getPlayer(mc.player.getUUID());var level=player.serverLevel();var npc=(Mob)level.getEntity(npcId);
                server.setDifficulty(net.minecraft.world.Difficulty.NORMAL,true);
                double x=npc.getX(),y=npc.getY(),z=npc.getZ();
                if(warfareTargetId!=0&&level.getEntity(warfareTargetId)!=null)level.getEntity(warfareTargetId).discard();
                if(coverDemo&&npc.getClass().getName().startsWith("net.dochi.npc.")){
                    Object settings=call(npc,"settings");set(settings,"mode",Enum.valueOf((Class)Class.forName("net.dochi.npc.NpcSettings$Mode"),"GUARD"));
                    set(settings,"fixedPosition",false);set(settings,"fixedRotation",false);set(settings,"speed",.25d);call(npc,"applySettings",settings);
                }
                level.getGameRules().getRule(net.minecraft.world.level.GameRules.RULE_DOMOBSPAWNING).set(false,server);level.setDayTime(6000);
                for(int dx=-8;dx<=8;dx++)for(int dz=-5;dz<=17;dz++){
                    BlockPos pos=BlockPos.containing(x+dx,y,z+dz);level.setBlock(pos.below(),Blocks.SMOOTH_STONE.defaultBlockState(),3);
                    for(int dy=0;dy<=4;dy++)level.setBlock(pos.above(dy),Blocks.AIR.defaultBlockState(),3);
                }
                // Real high cover beside the initial firing lane, with navigable ground.
                if(coverDemo)for(int dx=-3;dx<=-1;dx++)for(int dy=0;dy<=2;dy++)level.setBlock(BlockPos.containing(x+dx,y+dy,z+1),Blocks.STONE_BRICKS.defaultBlockState(),3);
                var target=net.minecraft.world.entity.EntityType.HUSK.create(level);target.moveTo(x,y,z+12,180,0);target.setNoAi(true);target.setPersistenceRequired();
                target.getAttribute(net.minecraft.world.entity.ai.attributes.Attributes.MAX_HEALTH).setBaseValue(500);target.setHealth(500);level.addFreshEntity(target);warfareTargetId=target.getId();
                Object builder=call(Class.forName("com.tacz.guns.api.item.builder.GunItemBuilder"),"create");call(builder,"setId",ResourceLocation.parse("tacz:m4a1"));call(builder,"setCount",1);call(builder,"setAmmoCount",30);call(builder,"setAmmoInBarrel",true);
                ItemStack gun=(ItemStack)call(builder,"build",player.registryAccess());if(gun.isEmpty())throw new IllegalStateException("TACZ M4A1 unavailable");
                Class<?> store=Class.forName("net.dochi.tacznpcfire.TaczNpcFirePolicyStore");Object policy=call(store,"loadForUi",npc);
                set(policy,"taczFireNpc",true);set(policy,"enabled",false);set(policy,"reload",true);set(policy,"storedRangedWeapon",gun);
                set(policy,"ammoStock",-1);set(policy,"ammoStockMax",-1);set(policy,"rpmOverride",300);set(policy,"accuracy",100d);set(policy,"maxDistance",32d);
                set(policy,"moveWhileFiring",coverDemo);
                set(policy,"reloadType",1);set(policy,"forceReloadShots",3);set(policy,"forceReloadMinShots",3);set(policy,"forceReloadMaxShots",3);set(policy,"reloadDurationMs",4000L);
                set(policy,"coverEnabled",coverDemo);set(policy,"coverOnReload",coverDemo);set(policy,"coverOnDamage",false);set(policy,"coverPeekEnabled",true);
                set(policy,"coverSearchRadius",8);set(policy,"coverMoveSpeed",5d);set(policy,"coverMinReloadRemainingMs",200L);
                set(policy,"coverCooldownMs",1000L);set(policy,"coverMaxDurationMs",12000L);set(policy,"detectToCombatMs",0L);set(policy,"awarenessFovDegrees",360d);
                ((List<String>)get(policy,"targetEntityIds")).clear();((List<String>)get(policy,"targetEntityIds")).add("minecraft:husk");
                call(store,"save",npc,policy);npc.setItemSlot(net.minecraft.world.entity.EquipmentSlot.MAINHAND,gun.copy());npc.setNoAi(false);
                call(Class.forName("net.dochi.tacznpcfire.TaczNpcFireMod"),"onGuiPolicySaved",npc);
                JsonObject receipt=new JsonObject();receipt.addProperty("gun","tacz:m4a1");receipt.addProperty("target","minecraft:husk");
                for(String field:List.of("enabled","reload","coverEnabled","coverOnReload","coverPeekEnabled","forceReloadShots","reloadDurationMs","coverSearchRadius","coverMoveSpeed"))receipt.add(field,new Gson().toJsonTree(get(policy,field)));
                Files.writeString(output.resolve("warfare-video-policy.json"),receipt.toString());
                player.teleportTo(x-6,y,z-2);return true;
            }catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);return;
        }
        if(action.equals("scene:dw-look")){
            var npc=mc.level.getEntity(npcId);mc.player.lookAt(EntityAnchorArgument.Anchor.EYES,npc.position().add(-1,1,2));return;
        }
        if(action.equals("scene:dw-start")){
            mc.getSingleplayerServer().submit(()->{try{
                var level=mc.getSingleplayerServer().overworld();var npc=(Mob)level.getEntity(npcId);
                if(!(level.getEntity(warfareTargetId) instanceof net.minecraft.world.entity.LivingEntity target)||!target.isAlive())throw new IllegalStateException("Warfare practice target is absent");
                Class<?> store=Class.forName("net.dochi.tacznpcfire.TaczNpcFirePolicyStore");Object policy=call(store,"loadForUi",npc);set(policy,"enabled",true);call(store,"save",npc,policy);
                call(Class.forName("net.dochi.tacznpcfire.TaczNpcFireMod"),"onGuiPolicySaved",npc);
                npc.setTarget((net.minecraft.world.entity.LivingEntity)level.getEntity(warfareTargetId));warfareSamples.asList().clear();warfareTracking=true;return true;
            }catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);return;
        }
        if(action.equals("scene:dw-verify")||action.equals("scene:dw-verify-reload")){
            mc.getSingleplayerServer().submit(()->{warfareTracking=false;return true;}).get(5,TimeUnit.SECONDS);
            Files.writeString(output.resolve("warfare-video-runtime.json"),new GsonBuilder().setPrettyPrinting().create().toJson(warfareSamples));
            boolean shots=false,reload=false,cover=false;
            for(JsonElement entry:warfareSamples){JsonObject row=entry.getAsJsonObject();shots|=row.has("shots")&&row.get("shots").getAsLong()>=3;reload|=row.has("reloadSequence")&&row.get("reloadSequence").getAsLong()>0;cover|=row.has("coverPhase")&&row.get("coverPhase").getAsInt()==2;}
            if(!shots||!reload||action.equals("scene:dw-verify")&&!cover)throw new IllegalStateException("Incomplete real Warfare sequence: shots="+shots+", reload="+reload+", cover="+cover);return;
        }
        if(action.equals("scene:spawn-setup")){
            mc.setScreen(null);mc.options.fov().set(65);mc.options.bobView().set(false);
            mc.getSingleplayerServer().submit(()->{try{
                var server=mc.getSingleplayerServer();var player=server.getPlayerList().getPlayer(mc.player.getUUID());var level=player.serverLevel();
                spawnAnchor=player.blockPosition().offset(6,0,0);
                level.getGameRules().getRule(net.minecraft.world.level.GameRules.RULE_DOMOBSPAWNING).set(false,server);
                level.getGameRules().getRule(net.minecraft.world.level.GameRules.RULE_DAYLIGHT).set(false,server);level.setDayTime(6000);
                for(int x=-5;x<=5;x++)for(int z=-5;z<=10;z++){
                    level.setBlock(spawnAnchor.offset(x,-1,z),Blocks.SMOOTH_QUARTZ.defaultBlockState(),3);
                    for(int y=0;y<=4;y++)level.setBlock(spawnAnchor.offset(x,y,z),Blocks.AIR.defaultBlockState(),3);
                }
                var block=BuiltInRegistries.BLOCK.get(ResourceLocation.parse("drm_spawn_control:spawner"));if(block==Blocks.AIR)throw new IllegalStateException("Spawn Control block unavailable");
                level.setBlock(spawnAnchor,block.defaultBlockState(),3);
                Object definition=call(Class.forName("net.dochi.spawncontrol.spawner.SpawnerDefinition"),"defaults");
                String[][] settings={{"target","minecraft:pig"},{"initialDelay","1"},{"intervalMin","20"},{"intervalMax","20"},{"includeCreative","true"},{"playerRange","5"},{"exitRange","7"},{"radius","1.5"},{"verticalRange","0"},{"amount","1"},{"maxAlive","1"},{"maxTotal","2"}};
                for(String[] setting:settings)call(definition,"set",setting[0],setting[1]);
                call(definition,"validate");Files.writeString(output.resolve("spawn-video-definition.json"),String.valueOf(call(definition,"serialize")));
                Object instance=call(level.getBlockEntity(spawnAnchor),"instance");
                player.teleportTo(spawnAnchor.getX()+.5,spawnAnchor.getY(),spawnAnchor.getZ()+9);
                spawnState=call(Class.forName("net.dochi.spawncontrol.spawner.SpawnerRuntime"),"apply",instance,definition,"guides/video-cap.json");return true;
            }catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);return;
        }
        if(action.equals("scene:spawn-look")){mc.player.lookAt(EntityAnchorArgument.Anchor.EYES,Vec3.atCenterOf(spawnAnchor).add(0,.2,0));return;}
        if(action.equals("scene:spawn-warm")){
            mc.getSingleplayerServer().submit(()->{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());
                var pig=net.minecraft.world.entity.EntityType.PIG.create(player.serverLevel());pig.moveTo(player.getX(),player.getY(),player.getZ()-2,0,0);pig.setNoAi(true);player.serverLevel().addFreshEntity(pig);warmPigId=pig.getId();return true;
            }).get(5,TimeUnit.SECONDS);return;
        }
        if(action.equals("scene:spawn-warm-clear")){
            mc.getSingleplayerServer().submit(()->{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());
                var pig=(Mob)player.serverLevel().getEntity(warmPigId);pig.hurt(player.damageSources().playerAttack(player),100);return true;
            }).get(5,TimeUnit.SECONDS);return;
        }
        if(action.equals("scene:spawn-enter")){spawnWalking=true;mc.options.keyUp.setDown(true);return;}
        if(action.startsWith("scene:spawn-check:")){
            int expectedTotal=Integer.parseInt(action.substring("scene:spawn-check:".length()));
            JsonObject report=mc.getSingleplayerServer().submit(()->{try{
                JsonObject result=new JsonObject();result.addProperty("total",((Number)get(spawnState,"total")).intValue());
                result.addProperty("owned",((Number)call(Class.forName("net.dochi.spawncontrol.spawner.SpawnerRuntime"),"owned",spawnState)).intValue());
                result.addProperty("status",String.valueOf(get(spawnState,"status")));return result;
            }catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);
            Files.writeString(output.resolve("spawn-video-count-"+expectedTotal+".json"),report.toString());
            if(report.get("total").getAsInt()!=expectedTotal||report.get("owned").getAsInt()!=(expectedTotal==0?0:1))throw new IllegalStateException("Spawner cap/replacement differs: "+report);return;
        }
        if(action.equals("scene:spawn-clear-first")){
            mc.getSingleplayerServer().submit(()->{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());
                var pigs=player.serverLevel().getEntitiesOfClass(net.minecraft.world.entity.animal.Pig.class,new net.minecraft.world.phys.AABB(spawnAnchor).inflate(5));
                if(pigs.size()!=1)throw new IllegalStateException("Expected one owned practice pig");
                pigs.get(0).hurt(player.damageSources().playerAttack(player),100);return true;
            }).get(5,TimeUnit.SECONDS);return;
        }
        if(action.startsWith("scene:gui-motion:")){
            if(motionScreen!=null)throw new IllegalStateException("Previous drag is still active");
            motionKind=action.substring("scene:gui-motion:".length());
            Object element=call(mc.screen,"selectedElement");motionBefore=guiBounds(element);
            int x=motionBefore.get("x").getAsInt(),y=motionBefore.get("y").getAsInt();
            int w=motionBefore.get("w").getAsInt(),h=motionBefore.get("h").getAsInt();
            boolean resize=motionKind.equals("resize");
            int sx=x+(resize?w-2:w/2),sy=y+(resize?h-2:h/2);
            double scale=((Number)call(mc.screen,"renderScale")).doubleValue();
            motionX=((Number)call(mc.screen,"stageScreenX",sx)).doubleValue()*scale;
            motionY=((Number)call(mc.screen,"stageScreenY",sy)).doubleValue()*scale;
            motionDx=(((Number)call(mc.screen,"stageScreenX",sx+32)).doubleValue()*scale)-motionX;
            motionDy=(((Number)call(mc.screen,"stageScreenY",sy+16)).doubleValue()*scale)-motionY;
            if(!mc.screen.mouseClicked(motionX,motionY,0))throw new IllegalStateException("Native GUI drag start rejected");
            motionScreen=mc.screen;motionStarted=System.nanoTime();return;
        }
        if(action.equals("scene:gui-verify")){
            for(String kind:List.of("move","resize")){
                JsonObject report=JsonParser.parseString(Files.readString(output.resolve("gui-motion-"+kind+".json"))).getAsJsonObject();
                String field=kind.equals("move")?"x":"w";
                if(report.getAsJsonObject("before").get(field).equals(report.getAsJsonObject("after").get(field)))throw new IllegalStateException("GUI "+kind+" did not change "+field);
            }return;
        }
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
        if(action.equals("scene:video-framing")) {
            mc.setScreen(null);
            mc.options.fov().set(60);mc.options.bobView().set(false);
            mc.getSingleplayerServer().submit(()->{
                var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());
                var npc=(Mob)player.serverLevel().getEntity(npcId);
                npc.setNoAi(true);npc.moveTo(npc.getX(),npc.getY(),npc.getZ(),0,0);
                npc.setYHeadRot(0);npc.setYBodyRot(0);
                player.teleportTo(npc.getX(),npc.getY(),npc.getZ()+2.5);return true;
            }).get(5,TimeUnit.SECONDS);return;
        }
        if(action.equals("scene:verify-scale")) {
            double scale=mc.getSingleplayerServer().submit(()->{try{
                var npc=mc.getSingleplayerServer().overworld().getEntity(npcId);
                return ((Number)get(call(npc,"settings"),"scale")).doubleValue();
            }catch(Exception e){throw new RuntimeException(e);}}).get(5,TimeUnit.SECONDS);
            if(Math.abs(scale-1.15)>.001)throw new IllegalStateException("NPC scale was not saved: "+scale);
            Files.writeString(output.resolve("npc-scale-verified.json"),"{\"savedScale\":"+scale+"}\n");return;
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
