package dochi.docs.capture;

import com.google.gson.*;
import net.minecraft.client.Minecraft;
import net.minecraft.client.Screenshot;
import net.minecraft.client.gui.screens.Screen;
import net.minecraft.client.gui.screens.TitleScreen;
import net.minecraft.client.gui.components.AbstractWidget;
import net.minecraft.client.gui.components.Button;
import net.minecraft.client.tutorial.TutorialSteps;
import net.neoforged.api.distmarker.Dist;
import net.neoforged.fml.common.Mod;
import net.neoforged.neoforge.common.NeoForge;
import net.neoforged.neoforge.client.event.ClientTickEvent;
import java.lang.reflect.*;
import java.nio.file.*;
import java.util.*;
import java.util.function.Function;
import java.util.concurrent.CompletableFuture;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.network.chat.Component;
import net.minecraft.world.entity.Mob;
import net.minecraft.world.entity.LivingEntity;
import net.minecraft.world.entity.EquipmentSlot;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.Items;
import net.minecraft.world.entity.ai.attributes.Attributes;
import net.minecraft.world.InteractionHand;

/** Documentation-only capture mod. Loaded with real production JARs in its own fresh world. */
@Mod(value="dochi_docs_capture", dist=Dist.CLIENT)
public final class GuideCapture {
    private final Path output=Path.of(System.getProperty("dochi.docs.output"));
    private final List<JsonObject> results=new ArrayList<>();
    private final long started=System.nanoTime();
    private String[][] views={
        {"editor-selector","EditorSelectScreen","Dialogue Editor"},
        {"dialogue-open-default","EditorSelectScreen","Dialogue Editor","Use Default"},
        {"dialogue-editor","DialogueEditorScreen"},
        {"dialogue-start-routes","DialogueEditorScreen","Routes"},
        {"dialogue-text","DialogueEditorScreen","node:dialogue_1","Text"},
        {"dialogue-choices","DialogueEditorScreen","node:dialogue_1","Choices"},
        {"dialogue-choice-actions","DialogueEditorScreen","node:dialogue_1","Choices","Choice actions"},
        {"dialogue-choice-condition","DialogueEditorScreen","node:dialogue_1","Choices","Add"},
        {"dialogue-action-types","DialogueEditorScreen","node:dialogue_1","Choices","Choice actions","Type: Goto"},
        {"dialogue-blueprint","DialogueEditorScreen","Blueprint"},
        {"dialogue-save-as","DialogueEditorScreen","Save As"},
        {"dialogue-save-result","DialogueEditorScreen","Save As","input:setName=village_guide","Save As","verify:saved-dialogue"},
        {"dialogue-load","DialogueEditorScreen","Load"},
        {"dialogue-player","DialogueRuntimeScreen","wait:140"},
        {"dialogue-npc-player","DialogueEditorScreen","apply:dialogue","wait:40","verify:npc-dialogue","interact:npc","wait:140"},
        {"npc-apply","NpcApplyTargetScreen"},
        {"npc-apply-result","NpcApplyTargetScreen","candidate:village_guide","Apply Dialogue","wait:60","verify:npc-dialogue"},
        {"dialogue-npc-reply","DialogueEditorScreen","apply:dialogue","wait:40","interact:npc","wait:140","runtime-choice:Tell me about the village.","wait:140","verify:node=dialogue_reply_1"},
        {"dialogue-npc-close","DialogueEditorScreen","apply:dialogue","wait:40","interact:npc","wait:140","runtime-choice:Goodbye.","wait:40","verify:closed"},
        {"shop-editor","NpcShopEditorScreen"},
        {"shop-bread-product","NpcShopEditorScreen","shop-item:1","Product"},
        {"shop-settings","NpcShopEditorScreen","Shop settings"},
        {"shop-payment","NpcShopEditorScreen","Payment"},
        {"shop-bread-payment","NpcShopEditorScreen","shop-item:1","Payment"},
        {"shop-restock","NpcShopEditorScreen","Restock"},
        {"shop-player-preview","NpcShopEditorScreen","Preview"},
        {"shop-save","NpcShopEditorScreen","Save As","input:shopSaveAsName=village_shop","Save As","wait:60","verify:file=config/dochi_rpg_maker/npc_shops/village_shop.json","clear:chat"},
        {"shop-npc-player","NpcApplyTargetScreen","NPC Shop JSON","wait:40","candidate:village_shop","apply:shop-file","wait:60","fixture:shop-funds","interact:shop","wait:80","clear:chat"},
        {"shop-bread-selected","NpcApplyTargetScreen","NPC Shop JSON","wait:40","candidate:village_shop","apply:shop-file","wait:60","fixture:shop-funds","interact:shop","wait:60","shop-check:1","wait:40","clear:chat"},
        {"shop-bread-purchased","NpcApplyTargetScreen","NPC Shop JSON","wait:40","candidate:village_shop","apply:shop-file","wait:60","fixture:shop-funds","interact:shop","wait:60","shop-check:1","Buy Selected","wait:80","verify:shop-purchase","clear:chat"},
        {"gui-maker","GuiMakerScreen"},
        {"gui-text","GuiMakerScreen","+ Text"},
        {"hud-maker","HudMakerScreen"},
        {"hud-open-default","EditorSelectScreen","HUD Maker","next-screen:HudMakerScreen","Use Default"},
        {"hud-screen-editor","HudMakerScreen","Screen Editor"},
        {"hud-health-canvas","HudMakerScreen","Screen Editor","+ Health","wait:180"},
        {"hud-health-saved","HudMakerScreen","Screen Editor","+ Health","Save As","input:guiExportName=guide_hud","Save As","wait:60"},
        {"hud-health-positioned","HudMakerScreen","Screen Editor","+ Health","Render survival HUD","* Health","input:x=400","input:y=250","Save As","input:guiExportName=guide_hud","Save As","wait:40","verify:hud-saved","clear:chat"},
        {"hud-health-runtime","HudMakerScreen","Screen Editor","+ Health","Render survival HUD","* Health","input:x=400","input:y=250","Save As","input:guiExportName=guide_hud","Save As","wait:40","verify:hud-saved","Apply","wait:60","verify:hud-active","fixture:survival","close:screen","wait:40","diagnose:hud","clear:chat"},
        {"hud-loaded-world","@world","","fixture:survival","wait:80","diagnose:hud","clear:chat"},
        {"currency-editor","CurrencyEditorScreen"},
        {"currency-physical","CurrencyEditorScreen","Physical currency"},
        {"quest-editor","QuestEditorScreen"},
        {"quest-category","QuestEditorScreen","+ Category"},
        {"quest-info","QuestEditorScreen","+ Category","+ Quest"},
        {"quest-objectives","QuestEditorScreen","+ Category","+ Quest","Objectives"},
        {"quest-add-objective","QuestEditorScreen","+ Category","+ Quest","Objectives","Add"},
        {"quest-objective-detail","QuestEditorScreen","+ Category","+ Quest","Objectives","+ Add"},
        {"quest-rewards","QuestEditorScreen","+ Category","+ Quest","Rewards"},
        {"teleporter-editor","TeleporterEditorScreen"},
        {"teleporter-destinations","TeleporterEditorScreen","Destination Settings"},
        {"teleporter-conditions","TeleporterEditorScreen","Interaction Conditions"},
        {"teleporter-presentation","TeleporterEditorScreen","Travel Presentation"},
        {"teleporter-save","TeleporterEditorScreen","Destination Settings","input:destination.name=Village gate","input:destination.x=20.5","input:destination.y=-60","input:destination.z=0.5","Save As","input:save_as.name=guide_travel","Save","wait:60","verify:file=config/dochi_rpg_maker/teleporters/guide_travel.json","clear:chat"},
        {"teleporter-npc-player","NpcApplyTargetScreen","Teleporter JSON","wait:40","candidate:guide_travel","Apply Teleporter","wait:60","interact:teleporter","wait:80","clear:chat"},
        {"teleporter-arrived","NpcApplyTargetScreen","Teleporter JSON","wait:40","candidate:guide_travel","Apply Teleporter","wait:40","fixture:travel-marker","interact:teleporter","wait:60","teleport:travel","wait:100","verify:travel-position","clear:chat"},
        {"remnant-editor","RemnantMsgEditorScreen"},
        {"remnant-view-conditions","RemnantMsgEditorScreen","View Conditions"},
        {"popup-maker","PopupMakerScreen"},
        {"popup-village-save","PopupMakerScreen","input:id=village_entry","input:title=Village Gate","input:hold=200","Save As","input:saveAsName=village_entry","Save As","wait:60","verify:file=config/dochi_rpg_maker/popups/definitions/village_entry.json","clear:chat"},
        {"popup-village-runtime","@world","","command:drm popup show @s village_entry","wait:20","verify:popup-active","clear:chat"},
        {"tooltip-maker","TooltipMakerScreen"},
        {"scene-maker","SceneMakerScreen"},
        {"dw-overview","@warfare","","OFF"},
        {"dw-gun","@warfare","","OFF","fixture:gun","Gun","gun-slot:0"},
        {"dw-senses","@warfare","","OFF","Senses"},
        {"dw-fire","@warfare","","OFF","Senses","quick-nav:Fire Modes"},
        {"dw-targets","@warfare","","OFF","Targets"},
        {"dw-ammo","@warfare","","OFF","Ammo"},
        {"dw-armor","@warfare","","OFF","Armor"},
        {"dw-cover","@warfare","","OFF","Cover"}
        ,{"dw-gun-saved","@warfare","","OFF","fixture:gun","Gun","gun-slot:0","Save","wait:60","verify:dw-saved"}
        ,{"dw-pose","@warfare","","OFF","Pose"}
        ,{"dw-presets","@warfare","","OFF","Presets"}
        ,{"dw-easy","@warfare","","OFF","next-screen:TaczNpcFireEasyBuilderScreen","Easy Build"}
        ,{"dw-clones","@clones",""}
        ,{"dw-mercenary","@mercenary",""}
        ,{"dw-traps","@traps",""}
        ,{"dwe-ai","@vehicle",""}
        ,{"dwe-ai-settings","@vehicle","","AI"}
        ,{"dwe-targets","@vehicle","","Targets"}
        ,{"dwe-weapons","@vehicle","","Weapons"}
        ,{"dwe-reactions","@vehicle","","Gimmicks"}
        ,{"dwe-crew","@vehicle","","Crew","wait:40"}
        ,{"dwe-world","@world","","look-at:vehicle","wait:40"}
        ,{"dw-pose-editor","@pose-editor",""}
        ,{"dwe-gimmick","@gimmick",""}
    };
    private int phase,ticks,index,actionIndex,viewActionStart;
    private net.minecraft.core.BlockPos ownedSpawnerPos;
    private int clonedNpcId;
    private boolean done;
    private Screen current;
    private CompletableFuture<Integer> npcReady;
    private int npcId;
    private int vehicleId;
    private String expectedScreen="";
    private String nextScreen="";
    private int screenWait;
    private int phaseWait;
    private final Class<?> guideScenes=optionalGuideScenes();

    private static Class<?> optionalGuideScenes(){
        try{return Class.forName("dochi.docs.capture.GuideScenes");}catch(ClassNotFoundException ignored){return null;}
    }

    public GuideCapture(){
        NeoForge.EVENT_BUS.addListener((ClientTickEvent.Post event)->tick());
        if(guideScenes!=null)try{call(guideScenes,"register",output);}catch(Exception error){throw new RuntimeException(error);}
        try{call(Class.forName("dochi.docs.capture.GuideTutorials"),"register",output);}catch(ClassNotFoundException ignored){}catch(Exception error){throw new RuntimeException(error);}
        try{call(Class.forName("dochi.docs.capture.GuideCreate"),"register",output);}catch(ClassNotFoundException ignored){}catch(Exception error){throw new RuntimeException(error);}
        try{call(Class.forName("dochi.docs.capture.GuideCreateLessons"),"register",output);}catch(ClassNotFoundException ignored){}catch(Exception error){throw new RuntimeException(error);}
    }

    private void tick(){
        if(done)return;
        Minecraft mc=Minecraft.getInstance();
        try{
            if(System.nanoTime()-started>Long.getLong("dochi.docs.timeoutSeconds",480L)*1_000_000_000L)throw new IllegalStateException("Capture timed out at phase "+phase);
            if(mc.getOverlay()!=null||++ticks<12)return;
            ticks=0;Files.createDirectories(output);
            if(phase==0){
                if(!(mc.screen instanceof TitleScreen))mc.setScreen(new TitleScreen());
                mc.options.pauseOnLostFocus=false;
                mc.options.guiScale().set(2);
                mc.options.renderDistance().set(4);
                mc.options.simulationDistance().set(5);
                mc.options.framerateLimit().set(60);
                mc.options.languageCode=System.getProperty("dochi.docs.locale","en_us");
                mc.getLanguageManager().setSelected(mc.options.languageCode);
                mc.getTutorial().setStep(TutorialSteps.NONE);
                mc.resizeDisplay();
                // Keep native hover help away from the controls being documented.
                // This changes only the owned Minecraft client's pointer state.
                set(mc.mouseHandler,"xpos",0d);set(mc.mouseHandler,"ypos",0d);
                org.lwjgl.glfw.GLFW.glfwHideWindow(mc.getWindow().getWindow());
                createWorld(mc);phase=1;return;
            }
            if(phase==1){
                if(mc.level==null||mc.player==null)return;
                if(npcReady==null){npcReady=mc.getSingleplayerServer().submit(()->{
                    var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());
                    var level=player.serverLevel();net.minecraft.world.entity.EntityType<?> type;
                    if("customnpcs".equals(System.getProperty("dochi.docs.actor","dnpc"))){try{type=(net.minecraft.world.entity.EntityType<?>)get(Class.forName("noppes.npcs.CustomEntities"),"entityCustomNpc");}catch(Exception error){throw new RuntimeException(error);}}
                    else type=BuiltInRegistries.ENTITY_TYPE.get(ResourceLocation.parse("dochi_npc:npc"));
                    var npc=type.create(level);if(npc==null)throw new IllegalStateException("DNPC entity could not be created");
                    boolean legacy="customnpcs".equals(System.getProperty("dochi.docs.actor","dnpc"));
                    npc.moveTo(player.getX()+(legacy?4.5:2),player.getY(),player.getZ(),90,0);npc.setCustomName(Component.literal("Oakridge guide"));
                    if(legacy)try{set(get(npc,"display"),"name","Guide actor");}catch(Exception ignored){}
                    npc.setCustomNameVisible(true);npc.setInvulnerable(true);if(npc instanceof Mob mob)mob.setNoAi(true);
                    level.addFreshEntity(npc);
                    ResourceLocation vehicleType=ResourceLocation.parse("superbwarfare:m_1a_2");
                    if(BuiltInRegistries.ENTITY_TYPE.containsKey(vehicleType)){
                        var vehicle=BuiltInRegistries.ENTITY_TYPE.get(vehicleType).create(level);
                        vehicle.moveTo(player.getX()+5,player.getY()+1,player.getZ()+4,90,0);vehicle.setInvulnerable(true);level.addFreshEntity(vehicle);vehicleId=vehicle.getId();
                    }
                    return npc.getId();
                });return;}
                if(!npcReady.isDone())return;npcId=npcReady.join();if(mc.level.getEntity(npcId)==null)return;
                call(Class.forName("net.dochi.gameeditor.client.DochiGameEditorClient"),"bootstrapClientRegistries");
                List<?> editors=(List<?>)call(Class.forName("net.dochi.gameeditor.api.DochiEditorRegistry"),"availableFor",-1);
                JsonArray entries=new JsonArray();List<String[]> registeredViews=new ArrayList<>();
                for(Object editor:editors){String id=String.valueOf(call(editor,"id"));JsonObject entry=new JsonObject();entry.addProperty("id",id);entries.add(entry);
                    registeredViews.add(new String[]{"registry-"+id.replaceAll("[^a-zA-Z0-9_.-]","-"),"@registry",id});}
                Files.writeString(output.resolve("editors.json"),new GsonBuilder().setPrettyPrinting().create().toJson(entries)+"\n");
                JsonArray actorEntries=new JsonArray();for(Object editor:(List<?>)call(Class.forName("net.dochi.gameeditor.api.DochiEditorRegistry"),"availableFor",npcId)){
                    JsonObject entry=new JsonObject();entry.addProperty("id",String.valueOf(call(editor,"id")));actorEntries.add(entry);}
                Files.writeString(output.resolve("actor-editors.json"),new GsonBuilder().setPrettyPrinting().create().toJson(actorEntries)+"\n");
                if(Boolean.getBoolean("dochi.docs.allEditors"))views=registeredViews.toArray(String[][]::new);
                String plan=System.getProperty("dochi.docs.plan","");
                if(!plan.isBlank()){
                    List<String[]> planned=new ArrayList<>();
                    for(JsonElement item:JsonParser.parseString(Files.readString(Path.of(plan))).getAsJsonArray()){
                        JsonObject spec=item.getAsJsonObject();List<String> parts=new ArrayList<>();parts.add(spec.get("id").getAsString());
                        parts.add(spec.has("screen")?spec.get("screen").getAsString():spec.has("class")?(spec.has("target")&&spec.get("target").getAsBoolean()?"@npc-class":"@class"):spec.has("target")&&spec.get("target").getAsBoolean()?"@registry-target":"@registry");
                        if(!spec.has("screen"))parts.add(spec.has("class")?spec.get("class").getAsString():spec.get("editor").getAsString());
                        if(spec.has("actions"))for(JsonElement action:spec.getAsJsonArray("actions"))parts.add(action.getAsString());planned.add(parts.toArray(String[]::new));
                    }views=planned.toArray(String[][]::new);
                }
                mc.getToasts().clear();phase=2;return;
            }
            if(phase==2){
                if(index==views.length){finish(mc);return;}
                String requested=System.getProperty("dochi.docs.views","");
                if(!requested.isBlank()&&!Arrays.asList(requested.split(",")).contains(views[index][0])){index++;return;}
                try{
                    expectedScreen="";nextScreen="";screenWait=0;phaseWait=0;
                    String type=views[index][1];
                    Object document=type.equals("DialogueEditorScreen")||type.equals("DialogueRuntimeScreen")?exampleDialogue():call(Class.forName("net.dochi.gameeditor.dialogue.DialogueDocument"),"defaults");
                    if(type.equals("NpcApplyTargetScreen"))document=mc.getSingleplayerServer().submit(()->{try{
                        return call(Class.forName("net.dochi.gameeditor.dialogue.DialogueStorage"),"load",mc.getSingleplayerServer().overworld().getEntity(npcId));
                    }catch(Exception error){throw new RuntimeException(error);}}).get(3,java.util.concurrent.TimeUnit.SECONDS);
                    if(type.equals("@admin")){
                        mc.setScreen(null);call(Class.forName("net.dochi.gameeditor.admin.DrmAdminNetwork"),"open");current=null;expectedScreen="DrmAdminScreen";screenWait=0;
                    }else if(type.equals("@remnant-place")){
                        mc.setScreen(null);mc.getSingleplayerServer().submit(()->{try{
                            var p=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());var pos=p.blockPosition().offset(2,-1,0);
                            p.serverLevel().setBlock(pos,net.minecraft.world.level.block.Blocks.STONE.defaultBlockState(),3);
                            var item=BuiltInRegistries.ITEM.get(ResourceLocation.parse("dochi_rpg_maker:remnant_msg_setter"));p.setItemInHand(InteractionHand.MAIN_HAND,new ItemStack(item));
                            var hit=new net.minecraft.world.phys.BlockHitResult(net.minecraft.world.phys.Vec3.atCenterOf(pos).add(0,0.5,0),net.minecraft.core.Direction.UP,pos,false);
                            item.useOn(new net.minecraft.world.item.context.UseOnContext(p,InteractionHand.MAIN_HAND,hit));
                        }catch(Exception e){throw new RuntimeException(e);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);
                        current=null;expectedScreen="RemnantMsgSetterScreen";screenWait=0;
                    }else if(type.equals("@remnant-list")){
                        mc.setScreen(null);call(Class.forName("net.dochi.gameeditor.RemnantMsgNetwork"),"requestWorldList");current=null;expectedScreen="RemnantMsgWorldListScreen";screenWait=0;
                    }else if(type.equals("@core-spawner")){
                        mc.setScreen(null);mc.getSingleplayerServer().submit(()->{try{
                            var p=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());var pos=p.blockPosition().offset(2,0,2);
                            var block=BuiltInRegistries.BLOCK.get(ResourceLocation.parse("dochi_rpg_maker:npc_spawner"));p.serverLevel().setBlock(pos,block.defaultBlockState(),3);
                            call(Class.forName("net.dochi.gameeditor.spawner.NpcSpawnerNetworking"),"open",p,pos);
                        }catch(Exception e){throw new RuntimeException(e);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);
                        current=null;expectedScreen="NpcSpawnerScreen";screenWait=0;
                    }else if(type.equals("@current")){
                        if(mc.screen==null)throw new IllegalStateException("No native screen to continue");current=mc.screen;
                    }else if(type.equals("@world")){
                        mc.setScreen(null);current=null;
                    }else if(type.equals("@warfare")){
                        mc.setScreen(null);call(Class.forName("net.dochi.tacznpcfire.network.TaczNpcFireConfigPackets"),"requestConfig",npcId);
                        current=mc.screen;expectedScreen="TaczNpcFireConfigScreen";screenWait=0;
                    }else if(type.equals("@vehicle")){
                        if(vehicleId==0)throw new IllegalStateException("No owned M1A2 vehicle");
                        holdWarfareItem(mc,"CONFIGURATOR_WAND");
                        mc.setScreen(null);call(Class.forName("net.dochi.warfare.vehicle.network.VehicleNetwork"),"requestVehicleAiConfig",vehicleId);
                        current=mc.screen;expectedScreen="SuperbVehicleAiConfigScreen";screenWait=0;
                    }else if(type.equals("@gimmick")){
                        current=(Screen)construct("net.dochi.warfare.vehicle.client.GimmickEditorScreen",new TitleScreen(),"use_default");mc.setScreen(current);
                    }else if(type.equals("@pose-editor")){
                        holdWarfareItem(mc,"POSE_CORE");mc.setScreen(null);
                        call(Class.forName("net.dochi.tacznpcfire.TaczNpcFireNetwork"),"requestPoseEditor",npcId);
                        current=mc.screen;expectedScreen="TaczNpcPoseEditorScreen";screenWait=0;
                    }else if(type.equals("@clones")||type.equals("@mercenary")||type.equals("@traps")){
                        if(type.equals("@mercenary"))holdWarfareItem(mc,"MERCENARY_TEST_CORE");
                        if(type.equals("@traps"))holdWarfareItem(mc,"BOOBY_TRAP_CORE");
                        mc.setScreen(null);Class<?> network=Class.forName("net.dochi.tacznpcfire.TaczNpcFireNetwork");
                        if(type.equals("@clones"))call(network,"requestEntityCloneLibrary");
                        if(type.equals("@mercenary"))call(network,"requestMercenaryTestConfig",npcId);
                        if(type.equals("@traps"))call(network,"requestBoobyTrapManager",0,"");
                        current=mc.screen;expectedScreen=type.equals("@clones")?"EntityCloneLibraryScreen":type.equals("@mercenary")?"MercenaryTestConfigScreen":"BoobyTrapManagerScreen";screenWait=0;
                    }else if(type.equals("@npc-class")){
                        if(!views[index][2].equals("net.dochi.mapicon.client.MapIconEditorScreen"))throw new IllegalArgumentException("Unsupported native NPC-only entry");
                        current=(Screen)construct(views[index][2],npcId,null,true);mc.setScreen(current);
                    }else if(type.equals("@class")){
                        current=(Screen)construct(views[index][2],new TitleScreen());mc.setScreen(current);
                    }else if(type.startsWith("@registry")){
                        mc.setScreen(null);
                        Class<?> registry=Class.forName("net.dochi.gameeditor.api.client.DochiClientEditorRegistry");boolean opened=false;
                        if(type.equals("@registry-target"))opened=(boolean)call(registry,"openTarget",views[index][2],npcId,document);
                        if(!opened)opened=(boolean)call(registry,"openSource",views[index][2],type.equals("@registry-target")?npcId:-1,document,"use_default");
                        if(!opened)throw new IllegalStateException("Editor has no registered opener: "+views[index][2]);
                        current=mc.screen;expectedScreen="*";screenWait=0;
                    }else{
                        current=(Screen)(type.equals("QuestEditorScreen")||type.equals("TeleporterEditorScreen")
                            ?construct("net.dochi.gameeditor.client."+type,-1,document,"create_new")
                            :construct("net.dochi.gameeditor.client."+type,type.equals("DialogueRuntimeScreen")||type.equals("NpcApplyTargetScreen")?npcId:-1,document));
                        mc.setScreen(current);
                    }
                    if(type.equals("DialogueEditorScreen")){set(current,"page",0);call(current,"init");}
                    mc.getToasts().clear();actionIndex=type.startsWith("@")?3:2;
                    if(!System.getProperty("dochi.docs.plan","").isBlank()){
                        JsonObject planned=JsonParser.parseString(Files.readString(Path.of(System.getProperty("dochi.docs.plan")))).getAsJsonArray().get(index).getAsJsonObject();
                        if(planned.has("screen"))actionIndex=2;
                    }
                    viewActionStart=actionIndex;phase=3;
                }catch(Throwable error){recordFailure(views[index][0],error);index++;}
                return;
            }
            if(phase==3){
                try{if((boolean)call(Class.forName("dochi.docs.capture.GuideCreateLessons"),"busy"))return;}catch(ClassNotFoundException ignored){}
                catch(Throwable error){recordFailure(views[index][0],error);index++;phase=2;return;}
                if(!expectedScreen.isBlank()){
                    if(expectedScreen.equals("@closed")?mc.screen!=null:expectedScreen.equals("@changed")?mc.screen==null||mc.screen==current:mc.screen==null||(!expectedScreen.equals("*")&&!mc.screen.getClass().getSimpleName().equals(expectedScreen))){
                        if(++screenWait>40){recordFailure(views[index][0],new IllegalStateException("Expected screen did not open: "+expectedScreen));index++;phase=2;expectedScreen="";}return;
                    }
                    current=mc.screen;expectedScreen="";screenWait=0;
                }
                if(mc.screen!=current){
                    if((guideScenes!=null&&(boolean)call(guideScenes,"allowsScreenTransition"))||tutorialTransitions())current=mc.screen;
                    else{recordFailure(views[index][0],new IllegalStateException("Unexpected screen for "+views[index][0]+": "+mc.screen));index++;phase=2;return;}
                }
                if(actionIndex<views[index].length){
                    String action=views[index][actionIndex++];
                    try{perform(mc,action);current=mc.screen;}catch(Throwable error){recordFailure(views[index][0],error);index++;phase=2;}
                    return;
                }
                mc.getToasts().clear();
                String name=views[index][0];
                try(var frame=Screenshot.takeScreenshot(mc.getMainRenderTarget())){
                    if(frame.getWidth()<1280||frame.getHeight()<720)throw new IllegalStateException("Capture framebuffer is too small: "+frame.getWidth()+"x"+frame.getHeight());
                    frame.writeToFile(output.resolve(name+".png"));
                }
                JsonObject record=new JsonObject();record.addProperty("id",name);
                record.addProperty("screenClass",current==null?"world":current.getClass().getName());
                record.addProperty("status","captured_in_game");
                int actionStart=viewActionStart;
                if(views[index][1].startsWith("@registry")){record.addProperty("editorId",views[index][2]);record.addProperty("entry","registered editor source/target opener");}
                record.add("actions",new Gson().toJsonTree(Arrays.copyOfRange(views[index],actionStart,views[index].length)));
                record.addProperty("width",mc.getWindow().getWidth());record.addProperty("height",mc.getWindow().getHeight());
                JsonArray controls=new JsonArray();
                if(current!=null){for(Object child:current.children())if(child instanceof AbstractWidget widget&&widget.visible&&!widget.getMessage().getString().isBlank()){
                    JsonObject control=new JsonObject();control.addProperty("label",widget.getMessage().getString());control.addProperty("active",widget.active);controls.add(control);
                }}
                record.add("visibleWidgetLabels",controls);
                if(current!=null&&current.getClass().getSimpleName().equals("MobBattleScreen"))record.addProperty("gamePhase",String.valueOf(get(get(current,"v"),"phase")));
                record.addProperty("note","Screen rendered in a fresh creative world; does not establish a completed player workflow.");
                results.add(record);writeResults();index++;phase=2;
            }
        }catch(Throwable error){
            error.printStackTrace();try{Files.writeString(output.resolve("failure.txt"),error.toString());writeResults();}catch(Exception ignored){}
            done=true;mc.stop();
        }
    }

    private Object exampleDialogue()throws Exception{
        Class<?> documentClass=Class.forName("net.dochi.gameeditor.dialogue.DialogueDocument");
        Object document=call(documentClass,"fromLegacy",true,"Village guide","Welcome to Oakridge. What would you like to know?",
                new String[]{"Tell me about the village.","Goodbye."},new String[]{"The inn is beside the fountain. Follow the path to the square.",""});
        JsonObject nodes=(JsonObject)call(document,"nodes");
        for(String key:new ArrayList<>(nodes.keySet()))if(!Set.of("start","dialogue_1","dialogue_reply_1").contains(key))nodes.remove(key);
        JsonArray routes=nodes.getAsJsonObject("start").getAsJsonArray("routes");while(!routes.isEmpty())routes.remove(0);
        routes.add((JsonObject)call(documentClass,"defaultRoute","dialogue_1"));
        JsonObject close=(JsonObject)call(documentClass,"defaultAction","close","");
        nodes.getAsJsonObject("dialogue_1").getAsJsonArray("choice").get(1).getAsJsonObject().getAsJsonArray("actions").add(close.deepCopy());
        JsonObject replyChoice=(JsonObject)call(documentClass,"defaultChoice","Thank you. Goodbye.");replyChoice.getAsJsonArray("actions").add(close);
        JsonArray replyChoices=nodes.getAsJsonObject("dialogue_reply_1").getAsJsonArray("choice");while(!replyChoices.isEmpty())replyChoices.remove(0);replyChoices.add(replyChoice);
        return document;
    }

    private void perform(Minecraft mc,String action)throws Exception{
        if(action.startsWith("lesson:")){call(Class.forName("dochi.docs.capture.GuideCreateLessons"),"perform",mc,action,output);current=mc.screen;
            if(action.equals("lesson:editor")||action.equals("lesson:interact")||action.startsWith("lesson:open:")){expectedScreen=action.equals("lesson:editor")?"NpcEditorScreen":"*";screenWait=0;}return;}
        if(action.startsWith("create:")){
            call(Class.forName("dochi.docs.capture.GuideCreate"),"perform",mc,action,output);current=mc.screen;
            if(action.equals("create:editor")||action.equals("create:orders")){expectedScreen=action.equals("create:editor")?"NpcEditorScreen":"*";screenWait=0;}
            return;
        }
        if(action.startsWith("armor:")){call(Class.forName("dochi.docs.capture.GuideArmorDrops"),"perform",mc,action,output);current=mc.screen;return;}
        if(action.startsWith("tutorial:")){call(Class.forName("dochi.docs.capture.GuideTutorials"),"perform",mc,action,output);current=mc.screen;return;}
        if(action.startsWith("gif:")||action.startsWith("scene:")){
            if(guideScenes==null)throw new IllegalStateException("Animated guide fixture is not installed for this runtime");
            call(guideScenes,"perform",mc,action,npcId,output);current=mc.screen;
            String expected=String.valueOf(call(guideScenes,"takeExpected"));
            if(!expected.isEmpty()){expectedScreen=expected;screenWait=0;}
            return;
        }
        if(action.startsWith("label-row:")){
            String[] parts=action.substring(10).split(":");int wanted=Integer.parseInt(parts[1]);Object row=null;
            for(Object entry:(List<?>)call(get(current,parts[0]),"visibleRows"))if(((Number)get(entry,"index")).intValue()==wanted)row=entry;
            if(row==null)throw new IllegalStateException("Native label row is not visible: "+action);
            clickRow(row,"width","height");return;
        }
        if(action.equals("fixture:mart-funds")){
            mc.getSingleplayerServer().submit(()->{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());player.getInventory().clearContent();player.getInventory().add(new ItemStack(Items.EMERALD,64));player.getInventory().selected=8;player.containerMenu.broadcastChanges();return true;}).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(action.equals("fixture:mart-rattata")){
            mc.getSingleplayerServer().submit(()->{try{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());var nbt=new net.minecraft.nbt.CompoundTag();nbt.putString("Species","cobblemon:rattata");nbt.putInt("Level",5);Object slot=call(Class.forName("net.hodu.cobblenpc.CobbleTrainerData$PokemonSlot"),"fromNbt",nbt);Class<?> service=Class.forName("net.hodu.cobblenpc.pokemart.PokeMartPokemonService");Object pokemon=call(service,"create",slot,player);if(!(boolean)call(service,"give",player,pokemon))throw new IllegalStateException("Fixture Rattata did not enter party");return true;}catch(Exception error){throw new RuntimeException(error);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(action.equals("fixture:auction-expire")){
            mc.getSingleplayerServer().submit(()->{try{var level=mc.getSingleplayerServer().overworld();call(level.getLevelData(),"setGameTime",level.getGameTime()+6200);return true;}catch(Exception error){throw new RuntimeException(error);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(action.equals("interact:mart")){
            mc.player.getInventory().selected=8;mc.setScreen(null);mc.gameMode.interact(mc.player,mc.level.getEntity(npcId),InteractionHand.MAIN_HAND);expectedScreen="PokeMartRuntimeScreen";screenWait=0;return;
        }
        if(action.startsWith("verify:mart-")){
            String kind=action.substring(12);JsonObject report=mc.getSingleplayerServer().submit(()->{try{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());var npc=(LivingEntity)player.serverLevel().getEntity(npcId);Object binding=call(Class.forName("net.hodu.cobblenpc.pokemart.PokeMartBinding"),"fromNpc",npc);JsonObject r=new JsonObject();r.addProperty("enabled",(boolean)call(binding,"enabled"));r.addProperty("document",String.valueOf(call(binding,"documentJson")));int emeralds=0;for(int i=0;i<player.getInventory().getContainerSize();i++){ItemStack stack=player.getInventory().getItem(i);if(stack.is(Items.EMERALD))emeralds+=stack.getCount();}r.addProperty("emeralds",emeralds);JsonArray party=new JsonArray();for(Object pokemon:(Iterable<?>)call(Class.forName("com.cobblemon.mod.common.util.PlayerExtensionsKt"),"party",player)){Object summary=call(Class.forName("net.hodu.cobblenpc.pokemart.PokeMartPokemonService"),"summary",pokemon);JsonObject p=new JsonObject();p.addProperty("species",String.valueOf(call(summary,"species")));p.addProperty("level",((Number)call(summary,"level")).intValue());party.add(p);}r.add("party",party);return r;}catch(Exception error){throw new RuntimeException(error);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);
            if(current.getClass().getSimpleName().equals("PokeMartRuntimeScreen"))report.add("snapshot",((JsonObject)get(current,"snapshot")).deepCopy());
            Files.writeString(output.resolve("mart-"+kind+".json"),new GsonBuilder().setPrettyPrinting().create().toJson(report)+"\n");
            int emeralds=report.get("emeralds").getAsInt();JsonArray party=report.getAsJsonArray("party");
            if(!report.get("enabled").getAsBoolean())throw new IllegalStateException("PokéMart binding disabled");
            if(kind.equals("buy")&&(emeralds!=60||party.size()!=1||!party.get(0).getAsJsonObject().get("species").getAsString().contains("bulbasaur")))throw new IllegalStateException("Purchase result differs: "+report);
            if(kind.equals("trade")&&(emeralds!=60||party.size()!=2||party.toString().contains("rattata")))throw new IllegalStateException("Trade result differs: "+report);
            if(kind.equals("listed")&&(emeralds!=58||party.size()!=1))throw new IllegalStateException("Listing result differs: "+report);
            if(kind.equals("claimed")&&(emeralds!=58||party.size()!=2))throw new IllegalStateException("Claim result differs: "+report);
            verified("mart-"+kind,"verified_native_flow_state",report.toString());return;
        }
        if(action.equals("verify:trainer-binding")){
            String name=String.valueOf(call(current,"appliedTargetName"));
            if(!name.contains("guide_trainer"))throw new IllegalStateException("Trainer binding differs: "+name);
            verified("trainer-binding","verified_server_acknowledged_binding",name);return;
        }
        if(action.startsWith("rail:")){
            String label=action.substring(5);Button target=current.children().stream().filter(child->child instanceof Button b&&b.visible&&b.active&&b.getMessage().getString().equals(label)).map(child->(Button)child).min(Comparator.comparingInt(Button::getX)).orElseThrow();
            double scale=nativeUiScale(),x=(target.getX()+target.getWidth()/2d)*scale,y=(target.getY()+target.getHeight()/2d)*scale;if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Rail click rejected");current.mouseReleased(x,y,0);expectNextScreen();return;
        }
        if(action.equals("fixture:cobble-stage")){
            mc.getSingleplayerServer().submit(()->{var level=mc.getSingleplayerServer().overworld();for(int x=4;x<=8;x++)for(int z=4;z<=8;z++)level.setBlock(new net.minecraft.core.BlockPos(x,-61,z),net.minecraft.world.level.block.Blocks.MOSSY_STONE_BRICKS.defaultBlockState(),3);for(int y=-60;y<=-58;y++)for(int x:new int[]{4,8})level.setBlock(new net.minecraft.core.BlockPos(x,y,8),net.minecraft.world.level.block.Blocks.OAK_LOG.defaultBlockState(),3);return true;}).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(action.startsWith("fixture:api-")){
            String kind=action.substring(12);JsonObject result=mc.getSingleplayerServer().submit(()->{try{
                var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());var npc=(LivingEntity)player.serverLevel().getEntity(npcId);JsonObject r=new JsonObject();r.addProperty("kind",kind);r.addProperty("actor",npc.getClass().getName());
                if(kind.equals("combat")){
                    Object api=construct("net.dochi.gameeditor.npccombat.NpcAttackLockScriptApi");boolean accepted=(boolean)call(api,"setAttacks",npc,false,false);boolean melee=(boolean)call(api,"isMeleeAttackEnabled",npc),ranged=(boolean)call(api,"isRangedAttackEnabled",npc);
                    r.addProperty("accepted",accepted);r.addProperty("meleeEnabled",melee);r.addProperty("rangedEnabled",ranged);if(!accepted||melee||ranged)throw new IllegalStateException("Attack switches differ");
                    player.sendSystemMessage(Component.literal("drmCombat.setAttacks(false, false): "+accepted+" | melee="+melee+" | ranged="+ranged));
                }else if(kind.equals("effect")){
                    Object effect=get(Class.forName("net.minecraft.world.effect.MobEffects"),"MOVEMENT_SPEED");player.addEffect((net.minecraft.world.effect.MobEffectInstance)construct("net.minecraft.world.effect.MobEffectInstance",effect,1200,1));
                    Object api=construct("net.dochi.gameeditor.skill.NpcEffectScriptApi");r.addProperty("has",(boolean)call(api,"has",player,"minecraft:speed"));r.addProperty("level",((Number)call(api,"level",player,"minecraft:speed")).intValue());r.addProperty("amplifier",((Number)call(api,"amplifier",player,"minecraft:speed")).intValue());r.addProperty("ticks",((Number)call(api,"remainingTicks",player,"minecraft:speed")).intValue());
                    if(!r.get("has").getAsBoolean()||r.get("level").getAsInt()!=2||r.get("amplifier").getAsInt()!=1)throw new IllegalStateException("Effect query differs");player.sendSystemMessage(Component.literal("drmEffect: Speed II | level=2 | amplifier=1 | remainingTicks="+r.get("ticks")));
                }else if(kind.equals("hitbox")){
                    var target=net.minecraft.world.entity.EntityType.COW.create(player.serverLevel());target.setNoAi(true);target.moveTo(npc.getX(),npc.getY(),npc.getZ()-1.5,90,0);target.getAttribute(Attributes.MAX_HEALTH).setBaseValue(20);target.setHealth(20);player.serverLevel().addFreshEntity(target);Object api=construct("net.dochi.gameeditor.hitbox.NpcHitboxScriptApi");
                    int hits=((Number)call(api,"sphere",player,List.of(target,target),0d,1d,0d,6d,6d,true)).intValue();r.addProperty("hits",hits);r.addProperty("health",target.getHealth());r.addProperty("targetId",target.getId());if(hits!=1||target.getHealth()!=14)throw new IllegalStateException("One-shot hitbox result differs: "+r);player.sendSystemMessage(Component.literal("drmHitbox.sphere: hits="+hits+" | cow health 20 -> "+target.getHealth()));
                }else if(kind.equals("model")){
                    Object api=construct("net.dochi.gameeditor.npcmodel.NpcAnimationScriptApi");boolean accepted=(boolean)call(api,"useModdedEntityModel",npc,"minecraft:zombie");r.addProperty("accepted",accepted);r.addProperty("model","minecraft:zombie");if(!accepted)throw new IllegalStateException("Model API rejected owned actor");player.sendSystemMessage(Component.literal("drmAnimation.useModdedEntityModel: minecraft:zombie | "+accepted));
                }else if(kind.equals("stored")){
                    Object api=call(Class.forName("noppes.npcs.api.NpcAPI"),"Instance");Object wrapper=call(api,"getIEntity",player);Object data=call(wrapper,"getStoreddata");call(data,"put","my_pack.quest.stage",3d);
                    JsonObject condition=JsonParser.parseString("{\"type\":\"cnpc_stored_data\",\"scope\":\"player\",\"key\":\"my_pack.quest.stage\",\"op\":\">=\",\"valueType\":\"number\",\"value\":\"3\"}").getAsJsonObject();
                    boolean pass=(boolean)call(Class.forName("net.dochi.gameeditor.runtime.CustomNpcStoredDataCondition"),"test",player,npc,condition);r.add("condition",condition);r.addProperty("stored",((Number)call(data,"get","my_pack.quest.stage")).doubleValue());r.addProperty("pass",pass);if(!pass)throw new IllegalStateException("Stored-data condition did not pass");player.sendSystemMessage(Component.literal("Stored Data: my_pack.quest.stage = 3 | Player / Number / >= 3 : PASS"));
                }else if(kind.equals("popup")){
                    player.removeAllEffects();Object api=construct("net.dochi.gameeditor.popup.PopupScriptApi");int sent=((Number)call(api,"timed",player,"village_entry",10,80,20)).intValue();r.addProperty("sent",sent);if(sent!=1)throw new IllegalStateException("Popup API did not send to owned player: "+call(api,"lastError"));
                }else if(kind.equals("skill")){
                    player.removeAllEffects();Object api=construct("net.dochi.gameeditor.skill.NpcSkillScriptApi");r.add("providers",new Gson().toJsonTree(call(api,"providers")));r.addProperty("available",(boolean)call(api,"available","irons_spellbooks:fireball"));
                    var cow=net.minecraft.world.entity.EntityType.COW.create(player.serverLevel());cow.setNoAi(true);cow.moveTo(npc.getX(),npc.getY(),npc.getZ()+7,0,0);cow.getAttribute(Attributes.MAX_HEALTH).setBaseValue(100);cow.setHealth(100);player.serverLevel().addFreshEntity(cow);((Mob)npc).setTarget(cow);npc.setYRot(0);npc.setXRot(0);
                    boolean accepted=(boolean)call(api,"use",npc,"irons_spellbooks:fireball",cow,1);r.addProperty("accepted",accepted);r.addProperty("code",String.valueOf(call(api,"lastCode")));r.addProperty("targetId",cow.getId());if(!accepted)throw new IllegalStateException("Skill cast rejected: "+r);player.sendSystemMessage(Component.literal("drmSkill.use: irons_spellbooks:fireball | accepted="+accepted+" | "+r.get("code")));
                }else throw new IllegalArgumentException(kind);
                return r;
            }catch(Exception e){throw new RuntimeException(e);}}).get(10,java.util.concurrent.TimeUnit.SECONDS);
            Files.writeString(output.resolve("api-"+kind+"-result.json"),new GsonBuilder().setPrettyPrinting().create().toJson(result));verified("script-api-"+kind,"verified_direct_production_api_call",result.toString());return;
        }
        if(action.equals("look-at:api-scene")||action.equals("verify:api-skill-impact")){
            JsonObject saved=JsonParser.parseString(Files.readString(output.resolve("api-skill-result.json"))).getAsJsonObject();int targetId=saved.get("targetId").getAsInt();
            if(action.equals("verify:api-skill-impact")){
                JsonObject impact=mc.getSingleplayerServer().submit(()->{var target=(LivingEntity)mc.getSingleplayerServer().overworld().getEntity(targetId);JsonObject r=new JsonObject();r.addProperty("health",target==null?0:target.getHealth());r.addProperty("alive",target!=null&&target.isAlive());return r;}).get(5,java.util.concurrent.TimeUnit.SECONDS);
                Files.writeString(output.resolve("api-skill-impact.json"),new GsonBuilder().setPrettyPrinting().create().toJson(impact));verified("script-api-skill-impact","observed_server_target_health",impact.toString());return;
            }
            var target=mc.level.getEntity(targetId);var npc=mc.level.getEntity(npcId);if(target==null||npc==null)throw new IllegalStateException("API scene actors not tracked");mc.player.lookAt(net.minecraft.commands.arguments.EntityAnchorArgument.Anchor.EYES,npc.getBoundingBox().getCenter().add(target.getBoundingBox().getCenter()).scale(.5));return;
        }
        if(action.equals("inventory:player")){mc.setScreen(new net.minecraft.client.gui.screens.inventory.InventoryScreen(mc.player));current=mc.screen;return;}
        if(action.equals("fixture:asset-file")){
            Path p=mc.gameDirectory.toPath().resolve("config/dochi_rpg_maker/assets/textures/guide_icon.png");Files.createDirectories(p.getParent());
            try(var in=mc.getResourceManager().getResource(ResourceLocation.parse("dochi_npc:textures/item/dochi_core.png")).orElseThrow().open()){Files.copy(in,p);}
            verified("custom-png","fixture_copied_original_png","Original DNPC icon copied unchanged as guide_icon.png in owned server texture directory");return;
        }
        if(action.equals("verify:gui-image")){
            Object element=call(current,"selectedElement");String asset=String.valueOf(call(current,"imageForElement",element));if(!asset.endsWith("guide_icon.png"))throw new IllegalStateException("Custom PNG not applied: "+asset);verified("custom-png","verified_native_picker_apply",asset);return;
        }
        if(action.equals("verify:remnant-saved")||action.equals("remnant-read")){
            JsonObject info=mc.getSingleplayerServer().submit(()->{try{
                var p=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());var pos=p.blockPosition().offset(2,0,0);
                Object data=call(Class.forName("net.dochi.gameeditor.remnant.RemnantMarkerSavedData"),"get",p.serverLevel());Object record=call(data,"getByMarkerPos",p.serverLevel().dimension(),pos);
                if(record==null)throw new IllegalStateException("Native setter did not retain a marker");Object definition=call(Class.forName("net.dochi.gameeditor.remnant.RemnantMarkerInteractionService"),"definition",record);
                JsonObject result=new JsonObject();result.addProperty("uuid",String.valueOf(call(record,"id")));result.addProperty("message",String.valueOf(call(definition,"message")));result.addProperty("messageFile",String.valueOf(call(record,"messageFile")));result.add("definition",new Gson().toJsonTree(definition));
                if(action.equals("remnant-read")){p.setItemInHand(InteractionHand.MAIN_HAND,ItemStack.EMPTY);call(Class.forName("net.dochi.gameeditor.remnant.RemnantMarkerInteractionService"),"use",p.serverLevel(),pos,p,InteractionHand.MAIN_HAND);}return result;
            }catch(Exception e){throw new RuntimeException(e);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);
            Files.writeString(output.resolve("remnant-saved-marker.json"),new GsonBuilder().setPrettyPrinting().create().toJson(info));
            if(!info.toString().contains("Follow the lanterns to reach the village."))throw new IllegalStateException("Saved marker text differs");
            if(action.equals("remnant-read")){current=null;expectedScreen="RemnantMsgViewScreen";screenWait=0;}else verified("remnant-setter","verified_native_saved_marker","Actual setter placement and Save request; text retained by server");return;
        }
        if(action.startsWith("snapshot:")){
            String id=action.substring(9);if(!id.matches("[a-zA-Z0-9-]+"))throw new IllegalArgumentException("Invalid snapshot ID");
            try(var frame=Screenshot.takeScreenshot(mc.getMainRenderTarget())){if(frame.getWidth()<1280||frame.getHeight()<720)throw new IllegalStateException("Small framebuffer");frame.writeToFile(output.resolve(id+".png"));}
            JsonObject r=new JsonObject();r.addProperty("id",id);r.addProperty("status","captured_in_game");r.addProperty("screenClass",current==null?"world":current.getClass().getName());r.add("actions",new Gson().toJsonTree(Arrays.copyOfRange(views[index],viewActionStart,actionIndex)));r.addProperty("width",mc.getWindow().getWidth());r.addProperty("height",mc.getWindow().getHeight());r.addProperty("note","Intermediate original screenshot from the same native workflow; runtime results remain separate.");results.add(r);writeResults();return;
        }
        if(action.startsWith("mini-choice:")){
            String wanted=action.substring(12);Class<?> type=Class.forName("net.dochi.minigames.client.EditorChoiceMenu");Object menu=get(type,"menu");List<?> options=(List<?>)get(menu,"options");int row=-1;for(int i=0;i<options.size();i++)if(wanted.equals(call(options.get(i),"id")))row=i;
            if(row<0)throw new IllegalStateException("Missing minigame choice "+wanted);double scale=((Number)get(type,"scale")).doubleValue();
            double x=(((Number)get(menu,"x")).doubleValue()+((Number)get(menu,"width")).doubleValue()/2)*scale,y=(((Number)get(menu,"y")).doubleValue()+((Number)((List<?>)get(menu,"tops")).get(row)).doubleValue()+((Number)((List<?>)get(menu,"heights")).get(row)).doubleValue()/2-((Number)get(menu,"scroll")).doubleValue())*scale;
            if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Native minigame choice click rejected");current.mouseReleased(x,y,0);return;
        }
        if(action.equals("verify:mwent-tactic")){
            int selected=((Number)get(get(get(current,"v"),"battle"),"stratagemChoice")).intValue();if(selected!=4)throw new IllegalStateException("Server tactic differs: "+selected);verified("mwent-opening-tactic","verified_server_view_tactic_selection","Golem seal core / 4");return;
        }
        if(action.equals("record:mwent-opening")){
            Object battle=get(get(current,"v"),"battle");Object tactic=null;for(Object unit:(List<?>)get(battle,"allies"))if((boolean)get(unit,"openingTactic"))tactic=unit;
            if(tactic==null)throw new IllegalStateException("This random coin toss gave the player no opening tactic; do not treat it as a use test");
            Files.writeString(output.resolve("mwent-opening-before.json"),new GsonBuilder().setPrettyPrinting().create().toJson(tactic));return;
        }
        if(action.equals("verify:mwent-golem")){
            JsonObject before=JsonParser.parseString(Files.readString(output.resolve("mwent-opening-before.json"))).getAsJsonObject();Object battle=get(get(current,"v"),"battle");Object token=null;
            for(Object unit:(List<?>)get(battle,"allies"))if(((Number)get(unit,"slot")).intValue()==before.get("slot").getAsInt()&&((Number)get(unit,"row")).intValue()==before.get("row").getAsInt())token=unit;
            if(token==null||(boolean)get(token,"openingTactic")||((Number)get(token,"card")).intValue()!=1||((Number)get(token,"power")).intValue()!=4||!(boolean)get(token,"generated")||!(boolean)get(token,"doomed")||(boolean)get(battle,"stratagem"))throw new IllegalStateException("Native Golem conversion not confirmed");
            Files.writeString(output.resolve("mwent-opening-after.json"),new GsonBuilder().setPrettyPrinting().create().toJson(token));verified("mwent-golem","verified_native_same_socket_transform","4 power; same row/socket; opening tactic consumed");return;
        }
        if(action.startsWith("admin-tab:")){
            String id=action.substring(10);Object chosen=null;for(Object row:(List<?>)get(current,"tabRows"))if(id.equals(get(row,"id")))chosen=row;
            if(chosen==null)throw new IllegalStateException("Admin category missing: "+id);clickRow(chosen,"width","height");return;
        }
        if(action.startsWith("dialogue-load-entry:")){
            String wanted=action.substring(20);Object row=null;for(Object item:(List<?>)get(current,"importEntryCards"))if(wanted.equals(String.valueOf(get(item,"path"))))row=item;
            if(row==null)throw new IllegalStateException("Saved dialogue absent from native Load list: "+wanted);clickRow(row,"width","height");
            if(!wanted.equals(get(current,"importSelectedPath")))throw new IllegalStateException("Wrong dialogue Load selection");return;
        }
        if(action.equals("diagnose:dropdown")){
            Class<?> layer=Class.forName("net.dochi.gameeditor.client.EditorDropdownLayer");Object menu=get(layer,"dropdown");JsonObject r=new JsonObject();
            if(menu!=null){r.addProperty("scale",((Number)get(layer,"scale")).doubleValue());for(String key:List.of("x","y","width","height","scroll","focus"))r.addProperty(key,((Number)get(menu,key)).doubleValue());JsonArray options=new JsonArray();for(Object option:(List<?>)get(menu,"options")){JsonObject row=new JsonObject();row.addProperty("id",String.valueOf(call(option,"id")));row.addProperty("label",String.valueOf(call(option,"label")));options.add(row);}r.add("options",options);}
            r.add("selectedAction",(JsonObject)call(current,"selectedAction"));Files.writeString(output.resolve(views[index][0]+"-dropdown.json"),new GsonBuilder().setPrettyPrinting().create().toJson(r)+"\n");return;
        }
        if(action.startsWith("drm-choice:")){
            String wanted=action.substring(11);Class<?> layer=Class.forName("net.dochi.gameeditor.client.EditorDropdownLayer");Object menu=get(layer,"dropdown");if(menu==null)throw new IllegalStateException("Native DRM dropdown not open");
            List<?> options=(List<?>)get(menu,"options");int index=-1;for(int i=0;i<options.size();i++)if(wanted.equals(call(options.get(i),"id")))index=i;
            if(index<0)throw new IllegalStateException("DRM dropdown choice absent: "+wanted);double scale=((Number)get(layer,"scale")).doubleValue(),top=((Number)((List<?>)get(menu,"tops")).get(index)).doubleValue(),h=((Number)((List<?>)get(menu,"heights")).get(index)).doubleValue(),scroll=((Number)get(menu,"scroll")).doubleValue(),height=((Number)get(menu,"height")).doubleValue();
            double x=(((Number)get(menu,"x")).doubleValue()+((Number)get(menu,"width")).doubleValue()/2)*scale,y=(((Number)get(menu,"y")).doubleValue()+height/2)*scale;
            if(top+h-scroll>height-4){current.mouseScrolled(x,y,0,-Math.ceil((top+h-scroll-height+8)/24));scroll=((Number)get(menu,"scroll")).doubleValue();}
            y=(((Number)get(menu,"y")).doubleValue()+top+h/2-scroll)*scale;
            Screen before=current;if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Native DRM choice click rejected");
            JsonObject result=new JsonObject();result.addProperty("wanted",wanted);result.addProperty("clickX",x);result.addProperty("clickY",y);result.addProperty("screenReplaced",mc.screen!=before);result.add("oldActionAfterClick",((JsonObject)call(before,"selectedAction")).deepCopy());result.add("newActionAfterClick",((JsonObject)call(mc.screen,"selectedAction")).deepCopy());
            current=mc.screen;Files.writeString(output.resolve(views[this.index][0]+"-choice-"+wanted+".json"),new GsonBuilder().setPrettyPrinting().create().toJson(result)+"\n");return;
        }
        if(action.startsWith("scroll-page:")){current.mouseScrolled(current.width*.8,current.height*.75,0,Double.parseDouble(action.substring(12)));return;}
        if(action.equals("fixture:empty-inventory")){
            mc.getSingleplayerServer().submit(()->{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());player.getInventory().clearContent();player.inventoryMenu.broadcastChanges();return true;}).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(action.equals("fixture:inventory-screen")){mc.setScreen((Screen)construct("net.minecraft.client.gui.screens.inventory.InventoryScreen",mc.player));return;}
        if(action.equals("fixture:approach-npc")){
            mc.getSingleplayerServer().submit(()->{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());var npc=player.serverLevel().getEntity(npcId);player.teleportTo(npc.getX(),npc.getY(),npc.getZ()+2);return true;}).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(action.equals("verify:apple-reward")){
            int count=mc.getSingleplayerServer().submit(()->{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());return player.getInventory().countItem(Items.APPLE);}).get(5,java.util.concurrent.TimeUnit.SECONDS);
            if(count!=3)throw new IllegalStateException("Expected 3 reward apples, got "+count);verified("dialogue-reward","verified_server_inventory_count","minecraft:apple=3");return;
        }
        if(action.equals("verify:reward-tag")){
            boolean present=mc.getSingleplayerServer().submit(()->mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID()).getTags().contains("welcome_received")).get(5,java.util.concurrent.TimeUnit.SECONDS);
            if(!present)throw new IllegalStateException("Reward tag was not applied");verified("dialogue-reward-tag","verified_server_player_tag","welcome_received");return;
        }
        if(action.equals("verify:reward-hidden")){
            List<?> choices=(List<?>)get(current,"runtimeButtons");List<String> labels=new ArrayList<>();for(Object choice:choices)labels.add(String.valueOf(get(choice,"label")));
            if(labels.contains("Receive three apples")||!labels.contains("Goodbye."))throw new IllegalStateException("Reward condition did not hide the claimed choice: "+labels);verified("dialogue-reward-once","verified_runtime_choice_hidden",labels.toString());return;
        }
        if(action.startsWith("bw-choice:")){
            String id=action.substring(10);Class<?> owner=Class.forName("net.dochi.cnpcirons.client.EditorChoiceMenu");Object menu=get(owner,"menu");
            if(menu!=null){List<?> options=(List<?>)get(menu,"options");int index=-1;for(int i=0;i<options.size();i++)if(id.equals(call(options.get(i),"id")))index=i;
                if(index<0)throw new IllegalStateException("BattleWorks choice absent: "+id);int focus=((Number)get(menu,"focus")).intValue();
                for(int i=focus;i<index;i++)current.keyPressed(264,0,0);for(int i=focus;i>index;i--)current.keyPressed(265,0,0);current.keyPressed(257,0,0);return;}
            Object picker=get(current,"picker");List<?> choices=(List<?>)call(picker,"filtered");int index=-1;for(int i=0;i<choices.size();i++)if(id.equals(call(choices.get(i),"id")))index=i;
            if(index<0)throw new IllegalStateException("BattleWorks picker choice absent: "+id);Object layout=call(current,"pickerLayout"),rows=call(current,"pickerRows");double scale=nativeUiScale();
            double x=(((Number)call(layout,"listX")).doubleValue()+30)*scale;double listY=((Number)call(layout,"listY")).doubleValue(),height=((Number)call(layout,"listHeight")).doubleValue();
            double top=((Number)call(rows,"top",index)).doubleValue(),h=((Number)call(rows,"height",index)).doubleValue(),scroll=((Number)get(picker,"scroll")).doubleValue();
            if(top+h-scroll>height){current.mouseScrolled(x,(listY+height/2)*scale,0,-Math.ceil((top+h-scroll-height+10)/24));scroll=((Number)get(picker,"scroll")).doubleValue();}
            double y=(listY+top+h/2-scroll)*scale;if(!current.mouseClicked(x,y,0))throw new IllegalStateException("BattleWorks picker click rejected");current.mouseReleased(x,y,0);return;
        }
        if(action.startsWith("native-input:")){
            String[] pair=action.substring(13).split("=",2);Object owner=current;String name=pair[0];
            if(name.startsWith("inspector.")){owner=get(current,"inspector");name=name.substring(10);}
            AbstractWidget box=(AbstractWidget)get(owner,name);double scale=nativeUiScale();
            double x=(box.getX()+box.getWidth()/2d)*scale,y=(box.getY()+box.getHeight()/2d)*scale;
            if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Native field click rejected: "+name);current.mouseReleased(x,y,0);call(box,"setValue","");
            for(char c:pair[1].toCharArray())if(!current.charTyped(c,0))throw new IllegalStateException("Native field character rejected: "+name);
            if(!pair[1].equals(call(box,"getValue")))throw new IllegalStateException("Native field value mismatch: "+name);return;
        }
        if(action.startsWith("natural-catalog:")){
            String wanted=action.substring(16);List<?> rows=(List<?>)get(current,"visibleCatalog");int index=-1;
            for(int i=0;i<rows.size();i++)if(wanted.equals(call(rows.get(i),"key")))index=i;
            if(index<0)throw new IllegalStateException("Natural catalog entry absent: "+wanted);int scroll=((Number)get(current,"catalogScroll")).intValue();double scale=nativeUiScale();
            double x=(((Number)get(current,"leftX")).doubleValue()+80)*scale,y=(((Number)get(current,"catalogListTop")).doubleValue()+(index-scroll+.5)*((Number)call(current,"catalogRowHeight")).doubleValue())*scale;
            if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Natural catalog click rejected");current.mouseReleased(x,y,0);
            if(!wanted.equals(call(get(current,"selection"),"catalogKey")))throw new IllegalStateException("Wrong natural target selected");return;
        }
        if(action.equals("verify:spawn-vehicle")){
            JsonObject report=mc.getSingleplayerServer().submit(()->{try{var level=mc.getSingleplayerServer().overworld();Object state=call(level.getBlockEntity(ownedSpawnerPos),"instance");JsonObject r=new JsonObject();
                r.addProperty("file",String.valueOf(get(state,"path")));r.addProperty("total",((Number)get(state,"total")).longValue());r.addProperty("status",String.valueOf(get(state,"status")));r.addProperty("detail",String.valueOf(get(state,"detail")));JsonArray clones=new JsonArray();
                for(var vehicle:level.getEntitiesOfClass(net.minecraft.world.entity.Entity.class,new net.minecraft.world.phys.AABB(ownedSpawnerPos).inflate(40)))if(vehicle.getId()!=vehicleId&&BuiltInRegistries.ENTITY_TYPE.getKey(vehicle.getType()).toString().equals("superbwarfare:m_1a_2")){JsonObject a=new JsonObject();a.addProperty("id",vehicle.getId());a.addProperty("uuid",vehicle.getUUID().toString());a.addProperty("originalUuid",level.getEntity(vehicleId).getUUID().toString());a.addProperty("passengers",vehicle.getPassengers().size());clones.add(a);}r.add("clones",clones);return r;
            }catch(Exception error){throw new RuntimeException(error);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);
            Files.writeString(output.resolve("spawn-vehicle-result.json"),new GsonBuilder().setPrettyPrinting().create().toJson(report)+"\n");
            if(!report.get("file").getAsString().equals("guide_tank_spawner.json")||report.get("total").getAsLong()<1||report.getAsJsonArray("clones").isEmpty())throw new IllegalStateException("No saved vehicle was generated: "+report);
            JsonObject clone=report.getAsJsonArray("clones").get(0).getAsJsonObject();if(clone.get("uuid").equals(clone.get("originalUuid")))throw new IllegalStateException("Vehicle UUID was reused");
            int id=clone.get("id").getAsInt();mc.getSingleplayerServer().submit(()->{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());var vehicle=player.serverLevel().getEntity(id);player.teleportTo(vehicle.getX(),vehicle.getY(),vehicle.getZ()+10);return true;}).get(5,java.util.concurrent.TimeUnit.SECONDS);clonedNpcId=id;verified("vehicle-template","verified_spawned_vehicle_new_uuid",report.toString());return;
        }
        if(action.equals("natural-enable")){
            Object profile=call(current,"selectedProfile");if((boolean)get(profile,"enabled"))return;double scale=nativeUiScale();
            double x=(((Number)get(current,"middleX")).doubleValue()+((Number)get(current,"middleW")).doubleValue()-35)*scale,y=(((Number)get(current,"profileListTop")).doubleValue()+((Number)call(current,"profileRowHeight")).doubleValue()/2)*scale;
            if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Natural profile switch rejected");current.mouseReleased(x,y,0);
            if(!(boolean)get(call(current,"selectedProfile"),"enabled"))throw new IllegalStateException("Natural profile remained disabled");return;
        }
        if(action.equals("place:spawner")){
            var base=mc.player.blockPosition().offset(3,-1,2);ownedSpawnerPos=base.above();
            if(!BuiltInRegistries.ITEM.getKey(mc.player.getMainHandItem().getItem()).toString().equals("drm_spawn_control:spawner"))throw new IllegalStateException("Get Spawner item not held");
            var hit=new net.minecraft.world.phys.BlockHitResult(new net.minecraft.world.phys.Vec3(base.getX()+.5,base.getY()+1,base.getZ()+.5),net.minecraft.core.Direction.UP,base,false);
            mc.gameMode.useItemOn(mc.player,InteractionHand.MAIN_HAND,hit);return;
        }
        if(action.equals("fixture:core")){
            mc.getSingleplayerServer().submit(()->{var item=BuiltInRegistries.ITEM.get(ResourceLocation.parse("dochi_rpg_maker:dialogue_editor"));if(item==Items.AIR)throw new IllegalStateException("DRM Core item unavailable");var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());player.getInventory().setItem(player.getInventory().selected,new ItemStack(item));player.inventoryMenu.broadcastChanges();return true;}).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(action.equals("interact:spawner")){
            if(ownedSpawnerPos==null)throw new IllegalStateException("Owned spawner was not placed");
            mc.setScreen(null);var hit=new net.minecraft.world.phys.BlockHitResult(net.minecraft.world.phys.Vec3.atCenterOf(ownedSpawnerPos),net.minecraft.core.Direction.UP,ownedSpawnerPos,false);
            mc.gameMode.useItemOn(mc.player,InteractionHand.MAIN_HAND,hit);expectedScreen="SpawnerApplyScreen";screenWait=0;return;
        }
        if(action.startsWith("spawn-apply-file:")){
            String file=action.substring(17);Object row=null;for(Object item:(List<?>)get(current,"rows"))if(file.equals(get(item,"path")))row=item;
            if(row==null)throw new IllegalStateException("Saved spawner document absent from native Apply list");Object l=call(current,"layout");double scale=((Number)get(current,"scale")).doubleValue();
            double x=(((Number)call(l,"listX")).doubleValue()+((Number)call(l,"listWidth")).doubleValue()/2)*scale,y=(((Number)get(row,"y")).doubleValue()+((Number)get(row,"height")).doubleValue()/2)*scale;
            if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Spawner Apply file selection rejected");current.mouseReleased(x,y,0);
            if(!file.equals(call(get(current,"model"),"selected")))throw new IllegalStateException("Wrong spawner Apply selection");return;
        }
        if(action.equals("verify:spawner-applied")){
            String path=mc.getSingleplayerServer().submit(()->{try{Object be=mc.getSingleplayerServer().overworld().getBlockEntity(ownedSpawnerPos);return String.valueOf(get(call(be,"instance"),"path"));}catch(Exception error){throw new RuntimeException(error);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);
            if(!path.contains("guide_guard_spawner"))throw new IllegalStateException("Spawner file was not applied: "+path);verified("spawner-apply","verified_server_bound_file",path);return;
        }
        if(action.equals("verify:spawn-clone")){
            JsonObject report=mc.getSingleplayerServer().submit(()->{try{var level=mc.getSingleplayerServer().overworld();Object state=call(level.getBlockEntity(ownedSpawnerPos),"instance");JsonObject r=new JsonObject();
                r.addProperty("file",String.valueOf(get(state,"path")));r.addProperty("total",((Number)get(state,"total")).longValue());r.addProperty("status",String.valueOf(get(state,"status")));r.addProperty("detail",String.valueOf(get(state,"detail")));JsonArray actors=new JsonArray();
                for(var npc:level.getEntitiesOfClass(LivingEntity.class,new net.minecraft.world.phys.AABB(ownedSpawnerPos).inflate(20)))if(npc.getId()!=npcId&&BuiltInRegistries.ENTITY_TYPE.getKey(npc.getType()).toString().equals("dochi_npc:npc")){JsonObject a=new JsonObject();a.addProperty("id",npc.getId());a.addProperty("name",npc.getName().getString());a.addProperty("head",BuiltInRegistries.ITEM.getKey(npc.getItemBySlot(EquipmentSlot.HEAD).getItem()).toString());actors.add(a);}r.add("clones",actors);return r;
            }catch(Exception error){throw new RuntimeException(error);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);
            Files.writeString(output.resolve("spawn-template-result.json"),new GsonBuilder().setPrettyPrinting().create().toJson(report)+"\n");
            if(report.get("total").getAsLong()<1||report.getAsJsonArray("clones").isEmpty())throw new IllegalStateException("No template clone was generated: "+report);
            JsonObject clone=report.getAsJsonArray("clones").get(0).getAsJsonObject();if(!clone.get("head").getAsString().equals("minecraft:iron_helmet"))throw new IllegalStateException("Template equipment not preserved");clonedNpcId=clone.get("id").getAsInt();verified("spawner-template","verified_spawned_clone_and_equipment",report.toString());return;
        }
        if(action.equals("look-at:clone")){
            var npc=mc.level.getEntity(clonedNpcId);if(npc==null)throw new IllegalStateException("Spawned clone not tracked");mc.player.lookAt(net.minecraft.commands.arguments.EntityAnchorArgument.Anchor.EYES,npc.getBoundingBox().getCenter());return;
        }
        if(action.equals("fixture:frame-clone")){
            mc.getSingleplayerServer().submit(()->{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());var npc=player.serverLevel().getEntity(clonedNpcId);player.teleportTo(npc.getX(),npc.getY(),npc.getZ()+4.5);return true;}).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(action.equals("apply:shop-file")){
            String label=current.children().stream().anyMatch(c->c instanceof AbstractWidget w&&w.getMessage().getString().equals("Apply NPC Shop"))?"Apply NPC Shop":"Apply Shop";
            perform(mc,label);verified("shop-apply-control","native_button_used",label);return;
        }
        if(action.equals("fixture:map-position")){
            mc.getSingleplayerServer().submit(()->{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());var npc=player.serverLevel().getEntity(npcId);npc.teleportTo(player.getX()+18,player.getY(),player.getZ()+8);return true;}).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(action.equals("fixture:template-helmet")){
            mc.getSingleplayerServer().submit(()->{LivingEntity npc=(LivingEntity)mc.getSingleplayerServer().overworld().getEntity(npcId);npc.setItemSlot(EquipmentSlot.HEAD,new ItemStack(Items.IRON_HELMET));return true;}).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(action.startsWith("spawn-choice:")){
            String id=action.substring(13);Class<?> owner=Class.forName("net.dochi.spawncontrol.client.EditorChoiceMenu");Object menu=get(owner,"menu");List<?> options=(List<?>)get(menu,"options");int index=-1;
            for(int i=0;i<options.size();i++)if(id.equals(call(options.get(i),"id")))index=i;
            if(index<0)throw new IllegalStateException("Choice absent from native spawn menu: "+id);
            double scale=((Number)get(owner,"scale")).doubleValue();double x=(((Number)get(menu,"x")).doubleValue()+((Number)get(menu,"width")).doubleValue()/2)*scale;
            double y=(((Number)get(menu,"y")).doubleValue()+((Number)((List<?>)get(menu,"tops")).get(index)).doubleValue()+12-((Number)get(menu,"scroll")).doubleValue())*scale;
            if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Native spawn choice rejected");current.mouseReleased(x,y,0);return;
        }
        if(action.startsWith("spawn-input:")){
            String[] pair=action.substring(12).split("=",2);Object input=null;for(Object item:(List<?>)get(current,"inputs"))if(pair[0].equals(get(item,"key")))input=item;
            if(input==null)throw new IllegalStateException("Missing native spawner input "+pair[0]);AbstractWidget w=(AbstractWidget)get(input,"widget");double scale=((Number)get(current,"scale")).doubleValue();
            double x=(w.getX()+w.getWidth()/2d)*scale,y=(w.getY()+8)*scale;if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Spawner input click rejected");current.mouseReleased(x,y,0);call(input,"text","");
            for(char c:pair[1].toCharArray())if(!current.charTyped(c,0))throw new IllegalStateException("Spawner character rejected");
            if(!pair[1].equals(call(input,"text")))throw new IllegalStateException("Spawner input differs");return;
        }
        if(action.startsWith("spawn-catalog:")){
            String wanted=action.substring(14);List<?> rows=(List<?>)call(current,"filteredRows");int index=-1;
            for(int i=0;i<rows.size();i++)if(String.valueOf(get(rows.get(i),"id")).contains(wanted))index=i;
            if(index<0)throw new IllegalStateException("Saved template absent from native spawner catalog: "+wanted);
            Object layout=call(Class.forName("net.dochi.spawncontrol.client.SpawnerFlyoutUi"),"jsonLoadLayout",get(current,"width"),get(current,"height"));
            Object rect=call(Class.forName("net.dochi.spawncontrol.client.SpawnerListUi"),"row",layout,index-((Number)get(current,"pickerScroll")).intValue());
            clickRow(rect,"width","height");if(!String.valueOf(get(current,"selected")).contains(wanted))throw new IllegalStateException("Template catalog row did not select");return;
        }
        if(action.equals("verify:map-marker")){
            Map<?,?> markers=(Map<?,?>)get(Class.forName("net.dochi.mapicon.client.MapIconClient"),"markers");Object marker=markers.get(mc.level.getEntity(npcId).getUUID());
            if(marker==null)throw new IllegalStateException("Server did not deliver marker for owned NPC");
            Files.writeString(output.resolve("mapicon-marker.json"),new GsonBuilder().setPrettyPrinting().create().toJson(marker)+"\n");verified("mapicon-npc","verified_received_npc_marker","");return;
        }
        if(action.startsWith("command:")){
            mc.player.connection.sendCommand(action.substring(8));return;
        }
        if(action.startsWith("picker-item:")){
            String id=action.substring(12);Object search=get(current,"search");AbstractWidget w=(AbstractWidget)search;
            double scale=((Number)call(current,"scale")).doubleValue(),ox=((Number)call(current,"offsetX")).doubleValue(),oy=((Number)call(current,"offsetY")).doubleValue();
            double sx=(ox+w.getX()+w.getWidth()/2d)*scale,sy=(oy+w.getY()+8)*scale;
            if(!current.mouseClicked(sx,sy,0))throw new IllegalStateException("Item search click rejected");current.mouseReleased(sx,sy,0);call(search,"value","");
            for(char c:id.toCharArray())if(!current.charTyped(c,0))throw new IllegalStateException("Item search input rejected");
            List<?> entries=(List<?>)get(current,"results");int index=-1;for(int i=0;i<entries.size();i++)if(id.equals(call(get(entries.get(i),"selection"),"itemId")))index=i;
            if(index<0||index>=108)throw new IllegalStateException("Exact item not in visible filtered picker");
            double x=(ox+18+(index%18)*30+14)*scale,y=(oy+138+(index/18)*30+14)*scale;
            if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Item grid click rejected");current.mouseReleased(x,y,0);
            if(!id.equals(call(get(current,"selected"),"itemId")))throw new IllegalStateException("Wrong item chosen");return;
        }
        if(action.equals("picker-apply")){
            AbstractWidget w=(AbstractWidget)get(current,"applyButton");double scale=((Number)call(current,"scale")).doubleValue(),ox=((Number)call(current,"offsetX")).doubleValue(),oy=((Number)call(current,"offsetY")).doubleValue();
            double x=(ox+w.getX()+w.getWidth()/2d)*scale,y=(oy+w.getY()+w.getHeight()/2d)*scale;
            if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Native item picker Apply rejected");current.mouseReleased(x,y,0);expectNextScreen();return;
        }
        if(action.equals("diagnose:controls")){
            JsonObject report=new JsonObject();report.addProperty("screen",current.getClass().getName());report.addProperty("scale",nativeUiScale());JsonArray controls=new JsonArray();
            for(Object child:current.children())if(child instanceof AbstractWidget w){JsonObject c=new JsonObject();c.addProperty("label",w.getMessage().getString());c.addProperty("x",w.getX());c.addProperty("y",w.getY());c.addProperty("w",w.getWidth());c.addProperty("h",w.getHeight());c.addProperty("active",w.active);controls.add(c);}report.add("widgets",controls);
            JsonArray styles=new JsonArray();try{for(Object style:(List<?>)get(current,"styledButtons")){JsonObject c=new JsonObject();for(String key:new String[]{"label","x","y","width","height"})c.addProperty(key,String.valueOf(get(style,key)));Object b=get(style,"button");if(b instanceof AbstractWidget w){c.addProperty("widgetX",w.getX());c.addProperty("widgetY",w.getY());}styles.add(c);}}catch(NoSuchFieldException ignored){}report.add("styles",styles);
            Files.writeString(output.resolve(views[index][0]+"-controls.json"),new GsonBuilder().setPrettyPrinting().create().toJson(report)+"\n");return;
        }
        if(action.equals("verify:popup-active")){
            List<?> active=(List<?>)get(Class.forName("net.dochi.gameeditor.client.PopupClientRuntime"),"ACTIVE");
            boolean found=false;for(Object instance:active)if("village_entry".equals(call(get(instance,"definition"),"id")))found=true;
            if(!found)throw new IllegalStateException("Command did not create expected active popup");verified("popup-command","verified_active_client_instance","village_entry");return;
        }
        if(action.equals("verify:bw-simulation")){
            if(!(boolean)get(get(current,"simulation"),"open"))throw new IllegalStateException("Simulation did not open");
            verified("battleworks-simulation","verified_native_preview_open","");return;
        }
        if(action.equals("verify:bw-document")){
            String json=(String)call(get(current,"document"),"toJson");JsonObject doc=JsonParser.parseString(json).getAsJsonObject();
            if(doc.getAsJsonArray("patterns").size()!=1||doc.getAsJsonArray("hitboxes").size()!=1)throw new IllegalStateException("Unexpected generated pattern structure");
            Files.writeString(output.resolve("battleworks-generated.json"),json+"\n");verified("battleworks-assist","verified_generated_document","");return;
        }
        if(action.startsWith("fixture:bw-health:")){
            float health=Float.parseFloat(action.substring(18));mc.getSingleplayerServer().submit(()->{var npc=(LivingEntity)mc.getSingleplayerServer().overworld().getEntity(npcId);npc.setHealth(health);}).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(action.startsWith("verify:bw-phase:")){
            int expected=Integer.parseInt(action.substring(16));JsonObject result=mc.getSingleplayerServer().submit(()->{try{
                var npc=(LivingEntity)mc.getSingleplayerServer().overworld().getEntity(npcId);Object state=((Map<?,?>)get(Class.forName("net.dochi.cnpcirons.battleworks.BattleworkRuntimeController"),"STATES")).get(npc.getUUID());if(state==null)throw new IllegalStateException("No runtime state");
                JsonObject r=new JsonObject();r.addProperty("phase",((Number)get(state,"phase")).intValue());r.addProperty("health",npc.getHealth());r.addProperty("maxHealth",npc.getMaxHealth());r.addProperty("lastPattern",String.valueOf(get(state,"lastPattern")));return r;
            }catch(Exception e){throw new RuntimeException(e);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);
            Files.writeString(output.resolve("battleworks-boss-phase-"+expected+".json"),new GsonBuilder().setPrettyPrinting().create().toJson(result));if(result.get("phase").getAsInt()!=expected)throw new IllegalStateException("Runtime phase differs: "+result);verified("battleworks-boss","verified_runtime_phase",result.toString());return;
        }
        if(action.equals("fixture:bw-combat")||action.equals("fixture:bw-boss")){
            mc.getSingleplayerServer().submit(()->{try{var server=mc.getSingleplayerServer();var player=server.getPlayerList().getPlayer(mc.player.getUUID());Mob npc=(Mob)server.overworld().getEntity(npcId);
                String reference=(String)call(Class.forName("net.dochi.cnpcirons.battleworks.BattleworkStore"),"reference",npc);
                if(!reference.contains(action.equals("fixture:bw-boss")?"training_captain":"first_sword"))throw new IllegalStateException("Battlework not bound before combat: "+reference);
                if(action.equals("fixture:bw-boss")){npc.getAttribute(Attributes.MAX_HEALTH).setBaseValue(100);npc.setHealth(100);}
                server.getGameRules().getRule(net.minecraft.world.level.GameRules.RULE_DOMOBSPAWNING).set(false,server);
                for(var other:player.serverLevel().getEntitiesOfClass(LivingEntity.class,npc.getBoundingBox().inflate(80)))if(other!=npc&&other!=player)other.discard();
                npc.setNoAi(false);server.setDifficulty(net.minecraft.world.Difficulty.NORMAL,true);server.getGameRules().getRule(net.minecraft.world.level.GameRules.RULE_NATURAL_REGENERATION).set(false,server);
                player.setGameMode(net.minecraft.world.level.GameType.SURVIVAL);player.setHealth(20);return true;
            }catch(Exception error){throw new RuntimeException(error);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(action.equals("verify:bw-hit")){
            JsonObject report=mc.getSingleplayerServer().submit(()->{try{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());Mob npc=(Mob)player.serverLevel().getEntity(npcId);JsonObject data=new JsonObject();
                data.addProperty("playerHealth",player.getHealth());data.addProperty("targetUuid",npc.getTarget()==null?"":npc.getTarget().getUUID().toString());data.addProperty("file",(String)call(Class.forName("net.dochi.cnpcirons.battleworks.BattleworkStore"),"reference",npc));
                Object doc=call(Class.forName("net.dochi.cnpcirons.battleworks.BattleworkStore"),"loadRuntime",npc);data.add("document",JsonParser.parseString((String)call(doc,"toJson")));return data;
            }catch(Exception error){throw new RuntimeException(error);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);
            Files.writeString(output.resolve("battleworks-combat-result.json"),new GsonBuilder().setPrettyPrinting().create().toJson(report)+"\n");
            if(report.get("playerHealth").getAsFloat()>=20||report.get("playerHealth").getAsFloat()<=0)throw new IllegalStateException("Expected live survival player to receive combat damage");verified("battleworks-combat","verified_server_health_reduction",report.get("playerHealth").getAsString());return;
        }
        if(action.equals("bw-fold-scene")){
            Object layout=call(current,"layout"),canvas=get(layout,"canvas");double scale=nativeUiScale();
            double x=(((Number)get(canvas,"x")).doubleValue()+((Number)get(canvas,"width")).doubleValue()-12)*scale;
            double y=(((Number)get(canvas,"y")).doubleValue()+12)*scale;
            if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Native scene fold rejected");current.mouseReleased(x,y,0);
            if(!(boolean)get(call(current,"layout"),"sceneCollapsed"))throw new IllegalStateException("Scene did not fold");return;
        }
        if(action.equals("fixture:shop-funds")){
            mc.getSingleplayerServer().submit(()->{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());
                player.getInventory().clearContent();player.getInventory().setItem(9,new ItemStack(Items.EMERALD,10));player.inventoryMenu.broadcastChanges();return true;
            }).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(action.startsWith("shop-check:")){
            int wanted=Integer.parseInt(action.substring(11));List<?> indices=(List<?>)call(current,"filteredBuyItemIndices");int row=indices.indexOf(wanted);
            if(row<0)throw new IllegalStateException("Shop product is not in native list");
            if(((Set<?>)get(current,"buyBasket")).contains(wanted))return;
            int x=((Number)call(current,"buyCheckboxX",call(current,"panelLeft"))).intValue()+6;
            int y=((Number)call(current,"listY")).intValue()+row*((Number)call(current,"rowStride")).intValue()+14;
            if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Shop checkbox click rejected");current.mouseReleased(x,y,0);
            if(!((Set<?>)get(current,"buyBasket")).contains(wanted))throw new IllegalStateException("Native checkbox did not select requested product");return;
        }
        if(action.equals("verify:shop-purchase")){
            JsonObject inventory=mc.getSingleplayerServer().submit(()->{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());JsonObject data=new JsonObject();
                data.addProperty("emeralds",player.getInventory().countItem(Items.EMERALD));data.addProperty("bread",player.getInventory().countItem(Items.BREAD));return data;
            }).get(5,java.util.concurrent.TimeUnit.SECONDS);
            JsonObject bread=((JsonArray)get(current,"runtimeItems")).get(1).getAsJsonObject();inventory.add("breadProductAfterPurchase",bread.deepCopy());
            if(inventory.get("emeralds").getAsInt()!=6||inventory.get("bread").getAsInt()!=3||bread.get("stock").getAsInt()!=11)throw new IllegalStateException("Unexpected shop purchase result: "+inventory);
            Files.writeString(output.resolve("shop-purchase.json"),new GsonBuilder().setPrettyPrinting().create().toJson(inventory)+"\n");verified("shop-purchase","verified_server_inventory_and_runtime_stock",inventory.toString());return;
        }
        if(action.equals("look-at:vehicle")){
            var vehicle=mc.level.getEntity(vehicleId);if(vehicle==null)throw new IllegalStateException("Owned vehicle not tracked by client");
            mc.player.lookAt(net.minecraft.commands.arguments.EntityAnchorArgument.Anchor.EYES,vehicle.getBoundingBox().getCenter());return;
        }
        if(action.equals("look-at:npc")){
            var npc=mc.level.getEntity(npcId);if(npc==null)throw new IllegalStateException("Owned NPC not tracked by client");
            mc.player.lookAt(net.minecraft.commands.arguments.EntityAnchorArgument.Anchor.EYES,npc.getBoundingBox().getCenter());return;
        }
        if(action.equals("verify:starter-granted")){
            JsonArray party=mc.getSingleplayerServer().submit(()->{try{
                var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());
                Iterable<?> storage=(Iterable<?>)call(Class.forName("com.cobblemon.mod.common.util.PlayerExtensionsKt"),"party",player);
                JsonArray entries=new JsonArray();for(Object pokemon:storage){
                    Object slot=call(Class.forName("net.hodu.cobblenpc.pokemart.PokeMartPokemonService"),"summary",pokemon);
                    JsonObject entry=new JsonObject();entry.addProperty("species",String.valueOf(call(slot,"species")));entry.addProperty("level",((Number)call(slot,"level")).intValue());entries.add(entry);
                }return entries;
            }catch(Exception error){throw new RuntimeException(error);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);
            if(party.size()!=1||!party.get(0).getAsJsonObject().get("species").getAsString().contains("bulbasaur"))throw new IllegalStateException("Unexpected granted party: "+party);
            Files.writeString(output.resolve("starter-granted-party.json"),new GsonBuilder().setPrettyPrinting().create().toJson(party)+"\n");
            verified("starter-selection","verified_server_party",party.toString());return;
        }
        if(action.equals("verify:dw-saved")){
            boolean saved=mc.getSingleplayerServer().submit(()->{try{
                Object snapshot=call(Class.forName("net.dochi.tacznpcfire.TaczNpcFirePolicyStore"),"loadForUi",mc.getSingleplayerServer().overworld().getEntity(npcId));
                return (boolean)get(snapshot,"taczFireNpc")&&(boolean)get(snapshot,"enabled")&&!((ItemStack)get(snapshot,"storedRangedWeapon")).isEmpty();
            }catch(Exception error){throw new RuntimeException(error);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);
            if(!saved)throw new IllegalStateException("DW firearm settings not saved on server NPC");verified("dw-save","verified_server_mode_and_weapon","");return;
        }
        if(action.startsWith("type:")){
            for(char c:action.substring(5).toCharArray())if(!current.charTyped(c,0))throw new IllegalStateException("Focused text entry rejected");return;
        }
        if(action.equals("key:enter")){current.keyPressed(257,0,0);return;}
        if(action.equals("fixture:travel-marker")){
            mc.getSingleplayerServer().submit(()->{var level=mc.getSingleplayerServer().overworld();
                for(int x=18;x<=22;x++)for(int z=-1;z<=3;z++)level.setBlock(new net.minecraft.core.BlockPos(x,-61,z),net.minecraft.world.level.block.Blocks.COBBLESTONE.defaultBlockState(),3);
                for(int y=-60;y<=-57;y++)for(int x:new int[]{18,22})level.setBlock(new net.minecraft.core.BlockPos(x,y,3),net.minecraft.world.level.block.Blocks.OAK_LOG.defaultBlockState(),3);
                for(int x=18;x<=22;x++)level.setBlock(new net.minecraft.core.BlockPos(x,-56,3),net.minecraft.world.level.block.Blocks.OAK_LOG.defaultBlockState(),3);
                return true;
            }).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(action.equals("teleport:travel")){
            JsonObject selected=(JsonObject)call(current,"selected");
            if(selected==null||!selected.get("available").getAsBoolean())throw new IllegalStateException("Native teleporter selection is unavailable");
            Files.writeString(output.resolve("teleporter-selected.json"),new GsonBuilder().setPrettyPrinting().create().toJson(selected)+"\n");
            clickRow(get(current,"travelRect"),"width","height");expectedScreen="@closed";screenWait=0;return;
        }
        if(action.equals("verify:travel-position")){
            JsonObject position=mc.getSingleplayerServer().submit(()->{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());JsonObject p=new JsonObject();p.addProperty("x",player.getX());p.addProperty("y",player.getY());p.addProperty("z",player.getZ());return p;}).get(5,java.util.concurrent.TimeUnit.SECONDS);
            if(Math.abs(position.get("x").getAsDouble()-20.5)>.01||Math.abs(position.get("y").getAsDouble()+60)>.01||Math.abs(position.get("z").getAsDouble()-.5)>.01)throw new IllegalStateException("Unexpected destination position: "+position);
            Files.writeString(output.resolve("teleporter-arrival.json"),new GsonBuilder().setPrettyPrinting().create().toJson(position)+"\n");verified("teleporter-travel","verified_server_arrival",position.toString());return;
        }
        if(action.startsWith("verify:work=")){
            Object entry=call(current,"cycleAction");
            if(!action.substring(12).equals(String.valueOf(get(entry,"work"))))throw new IllegalStateException("Wrong schedule work");return;
        }
        if(action.equals("interact:starter")){
            mc.setScreen(null);mc.gameMode.interact(mc.player,mc.level.getEntity(npcId),InteractionHand.MAIN_HAND);
            expectedScreen="StarterSelectorRuntimeScreen";screenWait=0;return;
        }
        if(action.equals("verify:starter-bound")){
            boolean enabled=mc.getSingleplayerServer().submit(()->{try{
                var npc=mc.getSingleplayerServer().overworld().getEntity(npcId);
                Object binding=call(Class.forName("net.hodu.cobblenpc.starter.StarterSelectorBinding"),"fromNpc",npc);
                return (boolean)call(binding,"enabled");
            }catch(Exception error){throw new RuntimeException(error);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);
            if(!enabled)throw new IllegalStateException("Starter role not enabled on server NPC");verified("starter-apply","verified_server_binding","");return;
        }
        if(action.equals("diagnose:hud")){
            JsonObject report=new JsonObject();Class<?> overlay=Class.forName("net.dochi.gameeditor.client.CurrencyHudOverlay");Object manager=get(overlay,"HUD_MANAGER");
            report.addProperty("callbacksRegistered",(boolean)get(overlay,"fabricCallbacksRegistered"));
            report.add("clientActiveRoot",(JsonObject)call(manager,"activeHudRoot"));
            report.add("clientLayout",(JsonObject)call(overlay,"editorHudLayout"));
            String server=mc.getSingleplayerServer().submit(()->{try{return (String)call(Class.forName("net.dochi.gameeditor.ServerJsonStorage"),"load","currency_hud_layout","guide_hud");}catch(Exception error){throw new RuntimeException(error);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);
            report.add("serverRoot",JsonParser.parseString(server));
            Files.writeString(output.resolve("hud-runtime-diagnostic.json"),new GsonBuilder().setPrettyPrinting().create().toJson(report)+"\n");return;
        }
        if(action.equals("fixture:survival")){
            mc.getSingleplayerServer().submit(()->mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID()).setGameMode(net.minecraft.world.level.GameType.SURVIVAL)).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(action.startsWith("quick-nav:")){
            String wanted=action.substring(10);List<?> regions=(List<?>)get(current,"quickNavRegions");
            for(int i=0;i<regions.size();i++)if(wanted.equals(String.valueOf(call(current,"advancedQuickNavLabel",i)))){clickRow(regions.get(i),"width","height");return;}
            throw new IllegalStateException("Missing quick navigation section: "+wanted);
        }
        if(action.startsWith("gun-slot:")){
            Object row=((List<?>)get(current,"gunSlots")).get(Integer.parseInt(action.substring(9)));
            double scale=((Number)call(current,"renderScale")).doubleValue();
            double x=(((Number)get(row,"x")).doubleValue()+8)*scale,y=(((Number)get(row,"y")).doubleValue()+8)*scale;
            if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Gun slot click rejected");current.mouseReleased(x,y,0);
            if(((List<?>)get(get(current,"draft"),"rangedWeaponPool")).isEmpty())throw new IllegalStateException("Weapon pool did not receive gun");return;
        }
        if(action.startsWith("wait-control:")){
            String wanted=action.substring(13);
            boolean available=current.children().stream().anyMatch(child->child instanceof Button button&&button.visible&&button.active&&button.getMessage().getString().equals(wanted));
            if(!available){if(++phaseWait>100)throw new IllegalStateException("Control never became active: "+wanted);actionIndex--;return;}
            phaseWait=0;return;
        }
        if(action.equals("fixture:gun")){
            mc.getSingleplayerServer().submit(()->{try{
                var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());
                Object builder=call(Class.forName("com.tacz.guns.api.item.builder.GunItemBuilder"),"create");
                call(builder,"setId",ResourceLocation.parse("tacz:m4a1"));call(builder,"setCount",1);call(builder,"setAmmoCount",30);call(builder,"setAmmoInBarrel",true);
                ItemStack gun=(ItemStack)call(builder,"build",player.registryAccess());
                if(gun.isEmpty())throw new IllegalStateException("TACZ builder produced no gun");
                player.getInventory().setItem(0,gun);player.inventoryMenu.broadcastChanges();
                return true;
            }catch(Exception error){throw new RuntimeException(error);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);return;
        }
        if(action.startsWith("wait-phase:")){
            String wanted=action.substring(11),actual=String.valueOf(get(get(current,"v"),"phase"));
            if(!wanted.equals(actual)){if(++phaseWait>80)throw new IllegalStateException("Game phase did not reach "+wanted+"; actual "+actual);actionIndex--;return;}
            phaseWait=0;verified("minigames-phase","verified_runtime_phase",wanted);return;
        }
        if(action.equals("fixture:armor-check")){
            JsonObject check=mc.getSingleplayerServer().submit(()->{
                var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());
                LivingEntity npc=(LivingEntity)player.serverLevel().getEntity(npcId);
                try{set(get(npc,"settings"),"invulnerable",false);set(get(npc,"settings"),"allowPlayerDamage",true);}catch(Exception failure){throw new RuntimeException(failure);}
                npc.setInvulnerable(false);npc.getAttribute(Attributes.MAX_HEALTH).setBaseValue(40);
                for(EquipmentSlot slot:List.of(EquipmentSlot.HEAD,EquipmentSlot.CHEST,EquipmentSlot.LEGS,EquipmentSlot.FEET))npc.setItemSlot(slot,ItemStack.EMPTY);
                npc.setHealth(40);npc.invulnerableTime=0;boolean nakedAccepted=npc.hurt(player.damageSources().playerAttack(player),10F);float naked=40-npc.getHealth();
                npc.setItemSlot(EquipmentSlot.HEAD,new ItemStack(Items.IRON_HELMET));npc.setItemSlot(EquipmentSlot.CHEST,new ItemStack(Items.IRON_CHESTPLATE));
                npc.setItemSlot(EquipmentSlot.LEGS,new ItemStack(Items.IRON_LEGGINGS));npc.setItemSlot(EquipmentSlot.FEET,new ItemStack(Items.IRON_BOOTS));
                npc.setHealth(40);npc.invulnerableTime=0;boolean armoredAccepted=npc.hurt(player.damageSources().playerAttack(player),10F);float armored=40-npc.getHealth();
                JsonObject data=new JsonObject();data.addProperty("source","real server LivingEntity.hurt with player_attack, base damage 10");
                data.addProperty("unarmoredAccepted",nakedAccepted);data.addProperty("armoredAccepted",armoredAccepted);data.addProperty("unarmoredHealthLoss",naked);data.addProperty("ironArmorHealthLoss",armored);
                data.addProperty("equipment","iron helmet, chestplate, leggings and boots; no enchantments");
                if(!nakedAccepted||!armoredAccepted||!(naked>armored&&armored>0))throw new IllegalStateException("Armor comparison did not reduce damage: "+data);
                npc.setHealth(40);return data;
            }).get(5,java.util.concurrent.TimeUnit.SECONDS);
            Files.writeString(output.resolve("armor-damage-check.json"),new GsonBuilder().setPrettyPrinting().create().toJson(check)+"\n");
            verified("real-armor-damage","verified_server_damage_reduced",check.toString());return;
        }
        if(action.startsWith("scroll:")){
            String[] parts=action.substring(7).split("=",2);Object area=get(current,parts[0]);
            try{area=get(area,"viewport");}catch(NoSuchFieldException ignored){}
            String w="width",h="height";try{get(area,w);}catch(NoSuchFieldException ignored){w="w";h="h";}
            double x=((Number)get(area,"x")).doubleValue()+((Number)get(area,w)).doubleValue()/2;
            double y=((Number)get(area,"y")).doubleValue()+((Number)get(area,h)).doubleValue()/2;
            if(!current.mouseScrolled(x,y,0,Double.parseDouble(parts[1])))throw new IllegalStateException("Scroll rejected");return;
        }
        if(action.startsWith("candidate:")){
            String wanted=action.substring(10);List<?> candidates=(List<?>)get(current,"candidates");int selected=-1;
            for(int i=0;i<candidates.size();i++)if(wanted.equals(get(candidates.get(i),"documentId")))selected=i;
            if(selected<0)throw new IllegalStateException("No candidate "+wanted);
            Object row=call(get(current,"candidateLabels"),"rowBounds",selected);
            clickRow(row,"width","height");
            if(((Number)get(current,"selectedCandidateIndex")).intValue()!=selected)throw new IllegalStateException("Wrong apply candidate");return;
        }
        if(action.startsWith("runtime-choice:")){
            String wanted=action.substring(15);Object selected=null;
            for(Object button:(List<?>)get(current,"runtimeButtons"))if(wanted.equals(get(button,"label")))selected=button;
            if(selected==null)throw new IllegalStateException("Missing runtime choice "+wanted);
            clickRow(selected,"w","h");expectedScreen=nextScreen.isBlank()?(wanted.equals("Goodbye.")?"@closed":"DialogueRuntimeScreen"):nextScreen;nextScreen="";screenWait=0;return;
        }
        if(action.startsWith("verify:node=")){
            String wanted=action.substring(12);
            if(!wanted.equals(get(current,"currentNodeName")))throw new IllegalStateException("Dialogue did not navigate to "+wanted);
            verified("dialogue-choice-navigation","verified_runtime_node",wanted);return;
        }
        if(action.equals("verify:closed")){
            if(mc.screen!=null)throw new IllegalStateException("Dialogue did not close");verified("dialogue-close","verified_runtime_closed","");return;
        }
        if(action.startsWith("next-screen:")){nextScreen=action.substring(12);return;}
        if(action.equals("clear:chat")){mc.gui.getChat().clearMessages(true);return;}
        if(action.equals("close:screen")){current.onClose();expectedScreen="@closed";screenWait=0;return;}
        if(action.equals("verify:hud-active")){
            Path active=mc.gameDirectory.toPath().resolve("config/dochi_rpg_maker/hud/active_set.json");
            String value=Files.readString(active);
            if(!value.contains("guide_hud"))throw new IllegalStateException("Wrong active HUD set: "+value);
            Files.copy(active,output.resolve("active-hud-set.json"),StandardCopyOption.REPLACE_EXISTING);
            verified("hud-apply","verified_active_set_file",value);return;
        }
        if(action.startsWith("verify:file=")){
            Path root=mc.gameDirectory.toPath().toAbsolutePath().normalize(),file=root.resolve(action.substring(12)).normalize();
            if(!file.startsWith(root)||!Files.isRegularFile(file)||Files.size(file)==0)throw new IllegalStateException("Missing saved file: "+file);
            verified("saved-file","verified_file_exists",file.toString());return;
        }
        if(action.equals("verify:hud-saved")){
            Path set=mc.gameDirectory.toPath().resolve("config/dochi_rpg_maker/hud/sets/guide_hud");
            if(!Files.isRegularFile(set.resolve("hud_set.json"))||!Files.isRegularFile(set.resolve("components/hp/hp.json")))throw new IllegalStateException("Saved HUD set/component missing");
            JsonObject component=JsonParser.parseString(Files.readString(set.resolve("components/hp/hp.json"))).getAsJsonObject();
            Files.writeString(output.resolve("saved-hud-component.json"),new GsonBuilder().setPrettyPrinting().create().toJson(component)+"\n");
            verified("hud-save-as","verified_set_and_component_saved",set.toString());return;
        }
        if(action.startsWith("wait:")){ticks=-Integer.parseInt(action.substring(5));return;}
        if(action.equals("apply:dialogue")){
            call(Class.forName("net.dochi.gameeditor.DochiGameEditorNetwork"),"saveDialogue",npcId,get(current,"draft"),"dialogue_set","village_guide");return;
        }
        if(action.equals("verify:npc-dialogue")){
            String text=mc.getSingleplayerServer().submit(()->{try{
                var npc=mc.getSingleplayerServer().overworld().getEntity(npcId);
                Object document=call(Class.forName("net.dochi.gameeditor.dialogue.DialogueStorage"),"load",npc);
                return ((JsonObject)call(document,"nodes")).getAsJsonObject("dialogue_1").get("text").getAsString();
            }catch(Exception error){throw new RuntimeException(error);}}).get(3,java.util.concurrent.TimeUnit.SECONDS);
            if(!text.equals("Welcome to Oakridge. What would you like to know?"))throw new IllegalStateException("NPC dialogue did not match saved draft");
            JsonObject record=new JsonObject();record.addProperty("id","dialogue-applied-to-dnpc");record.addProperty("status","verified_server_binding");results.add(record);writeResults();return;
        }
        if(action.equals("interact:npc")||action.equals("interact:teleporter")||action.equals("interact:shop")){
            JsonObject diagnostic=mc.getSingleplayerServer().submit(()->{try{var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());var npc=player.serverLevel().getEntity(npcId);JsonObject r=new JsonObject();r.addProperty("distance",player.distanceTo(npc));r.addProperty("held",BuiltInRegistries.ITEM.getKey(player.getMainHandItem().getItem()).toString());r.addProperty("hasDialogue",(boolean)call(Class.forName("net.dochi.gameeditor.dialogue.DialogueStorage"),"hasDialogue",npc));Object d=call(Class.forName("net.dochi.gameeditor.dialogue.DialogueStorage"),"load",npc);r.addProperty("enabled",(boolean)get(d,"enabled"));r.add("document",((JsonObject)call(d,"root")).deepCopy());r.addProperty("shift",player.isShiftKeyDown());r.addProperty("npcScheduled",(boolean)call(npc,"drmScheduled"));return r;}catch(Exception error){throw new RuntimeException(error);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);
            Files.writeString(output.resolve(views[index][0]+"-interaction.json"),new GsonBuilder().setPrettyPrinting().create().toJson(diagnostic)+"\n");
            mc.setScreen(null);mc.gameMode.interact(mc.player,mc.level.getEntity(npcId),InteractionHand.MAIN_HAND);
            expectedScreen=action.equals("interact:teleporter")?"TeleporterRuntimeScreen":action.equals("interact:shop")?"NpcShopRuntimeScreen":"DialogueRuntimeScreen";screenWait=0;return;
        }
        if(action.equals("verify:saved-dialogue")){
            Path saved=mc.gameDirectory.toPath().resolve("config/dochi_rpg_maker/dialogue_sets/village_guide/dialogue_set.json");
            if(!Files.isRegularFile(saved))throw new IllegalStateException("GUI Save As did not produce "+saved);
            JsonObject record=new JsonObject();record.addProperty("id","dialogue-save-file");record.addProperty("status","verified_save_as_file");
            record.addProperty("file",saved.toString());results.add(record);writeResults();return;
        }
        if(action.startsWith("input:")||action.startsWith("field:")){
            String[] pair=action.substring(6).split("=",2);Object box=action.startsWith("field:")?get(current,pair[0]):inputBox(pair[0]);
            if(!(box instanceof AbstractWidget widget))throw new IllegalStateException("Missing input "+pair[0]);
            double scale=nativeUiScale();
            // Scroll the real inspector viewport until its input is inside the native clip.
            try{
                for(int attempt=0;attempt<24;attempt++){
                    Object clip=((Map<?,?>)get(current,"widgetClips")).get(widget);
                    if(clip==null)break;
                    double cx=((Number)get(clip,"x")).doubleValue(),cy=((Number)get(clip,"y")).doubleValue();
                    double cw=((Number)get(clip,"width")).doubleValue(),ch=((Number)get(clip,"height")).doubleValue();
                    if(widget.getY()+8>=cy&&widget.getY()+8<cy+ch)break;
                    current.mouseScrolled((cx+cw/2)*scale,(cy+ch/2)*scale,0,widget.getY()<cy?2:-2);
                    box=inputBox(pair[0]);widget=(AbstractWidget)box;
                }
            }catch(NoSuchFieldException ignored){}
            if(!current.mouseClicked((widget.getX()+widget.getWidth()/2d)*scale,(widget.getY()+8)*scale,0))throw new IllegalStateException("Input click rejected");
            current.mouseReleased((widget.getX()+widget.getWidth()/2d)*scale,(widget.getY()+8)*scale,0);
            if(current.getFocused()!=box)throw new IllegalStateException("Input did not receive focus: "+pair[0]);
            // Fixture preclear; subsequent characters go through the real focused screen input path.
            call(box,"setValue","");
            for(char c:pair[1].toCharArray())if(!current.charTyped(c,0))throw new IllegalStateException("Input rejected: "+pair[0]);
            if(!pair[1].equals(call(box,"getValue")))throw new IllegalStateException("Input differs: "+pair[0]+" -> "+call(box,"getValue"));
            return;
        }
        if(action.startsWith("recipe:")){
            String wanted=action.substring(7);Object list=get(current,"list");Object chosen=null;
            for(Object row:(List<?>)get(list,"rows"))if(wanted.equals(get(row,"id")))chosen=row;
            if(chosen==null)throw new IllegalStateException("Recipe is not in the filtered native list: "+wanted);
            double x=((Number)get(list,"x")).doubleValue()+30;
            double y=((Number)get(list,"y")).doubleValue()+((Number)get(chosen,"top")).doubleValue()-((Number)get(list,"scroll")).doubleValue()+((Number)get(chosen,"height")).doubleValue()/2;
            double scale=nativeUiScale();
            if(y<((Number)get(list,"y")).doubleValue()||y>=((Number)get(list,"y")).doubleValue()+((Number)get(list,"height")).doubleValue())throw new IllegalStateException("Recipe row is outside native viewport");
            if(!current.mouseClicked(x*scale,y*scale,0))throw new IllegalStateException("Recipe click rejected");current.mouseReleased(x*scale,y*scale,0);
            if(!wanted.equals(get(current,"selected")))throw new IllegalStateException("Wrong recipe selected");
            return;
        }
        if(action.startsWith("currency-item:")){
            String wanted=action.substring(14);List<?> entries=(List<?>)call(current,"filteredItemEntries");int index=-1;String key="";
            for(int i=0;i<entries.size();i++)if(wanted.equals(call(current,"itemEntryId",entries.get(i)))){index=i;key=String.valueOf(entries.get(i));break;}
            if(index<0)throw new IllegalStateException("No exact currency picker item: "+wanted);
            Object chosen=null;for(Object row:(List<?>)get(current,"itemPickerRows"))if(((Number)get(row,"index")).intValue()==index)chosen=row;
            if(chosen==null)throw new IllegalStateException("Exact currency item not in native viewport");
            clickRow(chosen,"width","height");
            if(!((Set<?>)get(current,"selectedPickerItemKeys")).contains(key))throw new IllegalStateException("Currency picker selection did not include exact item");return;
        }
        if(action.startsWith("shop-item:")){
            int wanted=Integer.parseInt(action.substring(10));Object row=((List<?>)get(current,"itemRows")).stream().filter(item->{try{return ((Number)get(item,"index")).intValue()==wanted;}catch(Exception error){throw new RuntimeException(error);}}).findFirst().orElseThrow();
            double scale=((Number)call(current,"renderScale")).doubleValue();
            double x=(((Number)get(row,"x")).doubleValue()+((Number)get(row,"width")).doubleValue()/2)*scale;
            double y=(((Number)get(row,"y")).doubleValue()+((Number)get(row,"height")).doubleValue()/2)*scale;
            if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Shop row click rejected");current.mouseReleased(x,y,0);
            if(((Number)get(current,"selectedIndex")).intValue()!=wanted)throw new IllegalStateException("Wrong shop row selected");
            return;
        }
        if(action.startsWith("node:")){
            String wanted=action.substring(5);
            Object row=((List<?>)get(current,"nodeRows")).stream().filter(item->{try{return wanted.equals(get(item,"name"));}catch(Exception error){throw new RuntimeException(error);}}).findFirst().orElseThrow();
            double scale=((Number)call(current,"renderScale")).doubleValue();
            double x=(((Number)get(row,"x")).doubleValue()+((Number)get(row,"width")).doubleValue()/2)*scale;
            double y=(((Number)get(row,"y")).doubleValue()+((Number)get(row,"height")).doubleValue()/2)*scale;
            if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Node row click rejected");current.mouseReleased(x,y,0);
            if(!wanted.equals(call(current,"currentName")))throw new IllegalStateException("Wrong dialogue node selected: "+wanted);
            return;
        }
        boolean contains=action.startsWith("node:"),prefix=action.startsWith("find:");String label=contains?action.substring(5):prefix?action.substring(5):action;
        if(current.getClass().getSimpleName().equals("SpawnerApplyScreen")){
            for(Object control:(List<?>)get(current,"actions"))if(label.equals(get(control,"title"))&&((AbstractWidget)get(control,"button")).active){
                double scale=((Number)get(current,"scale")).doubleValue();double x=(((Number)get(control,"x")).doubleValue()+((Number)get(control,"w")).doubleValue()/2)*scale,y=(((Number)get(control,"y")).doubleValue()+10)*scale;
                if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Spawner Apply action rejected");current.mouseReleased(x,y,0);expectNextScreen();return;
            }
        }
        // Native flyouts draw separate hit targets over the toolbar; prefer the visible overlay.
        if(current.getClass().getSimpleName().equals("NpcShopEditorScreen"))try{
            Object overlay=null;for(Object control:(List<?>)get(current,"overlayButtons"))if(label.equals(String.valueOf(get(control,"label"))))overlay=control;
            if(overlay!=null){clickRow(overlay,"width","height");expectNextScreen();return;}
        }catch(NoSuchFieldException ignored){}
        Set<?> nodeButtons=contains?(Set<?>)get(current,"nodeListButtons"):Set.of();
        List<Object> controls=new ArrayList<>(current.children());
        try{controls.addAll((Collection<?>)get(current,"modalWidgets"));}catch(NoSuchFieldException ignored){}
        try{controls.addAll((Collection<?>)get(current,"modalButtons"));}catch(NoSuchFieldException ignored){}
        List<Button> matches=controls.stream().filter(child->child instanceof Button button&&button.visible&&button.active
            &&(contains?nodeButtons.contains(button)&&button.getMessage().getString().startsWith(label+" /")
                :prefix?button.getMessage().getString().replaceFirst("^>\\s+", "").startsWith(label):button.getMessage().getString().replaceFirst("^>\\s+", "").equals(label))).map(child->(Button)child).toList();
        if(matches.isEmpty()){
            // Some native editors intentionally use silent widgets and draw their own labels.
            List<?> styles;try{styles=(List<?>)get(current,"styledButtons");}catch(NoSuchFieldException ignored){styles=(List<?>)get(current,"buttons");}
            Object chosen=null;
            for(Object style:styles)if(prefix?plainLabel(get(style,"label")).replaceFirst("^>\\s+","").startsWith(label):label.equals(plainLabel(get(style,"label")).replaceFirst("^>\\s+",""))){
                boolean enabled=true;try{enabled=(boolean)get(style,"enabled");}catch(NoSuchFieldException ignored){}
                if(enabled)chosen=style;
            }
            if(chosen==null)throw new IllegalStateException("Missing active labeled control '"+label+"' in "+current.getClass().getSimpleName());
            int height=20;try{height=((Number)get(chosen,"height")).intValue();}catch(NoSuchFieldException ignored){}
            double scale=((Number)call(current,"renderScale")).doubleValue();
            double x,y;
            if(get(chosen,"button") instanceof AbstractWidget w){x=(w.getX()+w.getWidth()/2d)*scale;y=(w.getY()+w.getHeight()/2d)*scale;}
            else{x=(((Number)get(chosen,"x")).doubleValue()+((Number)get(chosen,"width")).doubleValue()/2)*scale;y=(((Number)get(chosen,"y")).doubleValue()+height/2d)*scale;}
            if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Labeled control click rejected: "+label);
            current.mouseReleased(x,y,0);expectNextScreen();return;
        }
        Button button=matches.get(matches.size()-1);double scale=nativeUiScale();
        if(current.getClass().getSimpleName().equals("GuiMakerScreen"))try{
            for(int attempt=0;attempt<32;attempt++){
                Object clip=((Map<?,?>)get(current,"widgetClips")).get(button);if(clip==null)break;
                int cy=((Number)get(clip,"y")).intValue(),ch=((Number)get(clip,"height")).intValue(),cx=((Number)get(clip,"x")).intValue(),cw=((Number)get(clip,"width")).intValue();
                if(button.getY()+button.getHeight()/2>=cy&&button.getY()+button.getHeight()/2<cy+ch)break;
                String exact=button.getMessage().getString();current.mouseScrolled((cx+cw/2d)*scale,(cy+ch/2d)*scale,0,button.getY()<cy?2:-2);
                button=current.children().stream().filter(child->child instanceof Button b&&b.visible&&b.active&&b.getMessage().getString().equals(exact)).map(child->(Button)child).findFirst().orElseThrow();
            }
        }catch(NoSuchFieldException ignored){}
        double x=(button.getX()+button.getWidth()/2d)*scale,y=(button.getY()+button.getHeight()/2d)*scale;
        if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Button click rejected: "+label);
        current.mouseReleased(x,y,0);
        expectNextScreen();
        if(contains&&!label.equals(call(current,"currentName")))throw new IllegalStateException("Wrong dialogue node selected: "+label);
        if(current.getClass().getSimpleName().equals("DialogueEditorScreen")){
            Map<String,Integer> pages=Map.of("Info",0,"Text",1,"Routes",2,"Choices",3,"Blueprint",6);
            if(pages.containsKey(label)&&((Number)get(current,"page")).intValue()!=pages.get(label))throw new IllegalStateException("Wrong dialogue tab after click: "+label);
        }
    }
    private void expectNextScreen(){if(!nextScreen.isBlank()){expectedScreen=nextScreen;nextScreen="";screenWait=0;}}
    private static boolean tutorialTransitions()throws Exception{
        try{if((boolean)call(Class.forName("dochi.docs.capture.GuideCreateLessons"),"allowsScreenTransition"))return true;}catch(ClassNotFoundException ignored){}
        try{return (boolean)call(Class.forName("dochi.docs.capture.GuideTutorials"),"allowsScreenTransition");}catch(ClassNotFoundException ignored){return false;}
    }
    private double nativeUiScale()throws Exception{
        try{return ((Number)call(current,"renderScale")).doubleValue();}
        catch(NoSuchMethodException ignored){
            for(String field:List.of("zoom","scale"))try{return ((Number)get(current,field)).doubleValue();}catch(NoSuchFieldException absent){}
            return 1;
        }
    }
    private Object inputBox(String name)throws Exception{
        if(name.startsWith("regionCorner"))return ((Object[])get(current,"regionCorners"))[Integer.parseInt(name.substring(12))];
        try{return ((Map<?,?>)get(current,"boxes")).get(name);}
        catch(NoSuchFieldException ignored){
            try{Object fields=get(current,"fields");if(fields instanceof Map<?,?> map)return map.get(name);}catch(NoSuchFieldException absent){}
            try{Object direct=get(current,name);if(direct instanceof AbstractWidget)return direct;}catch(NoSuchFieldException absent){}
            for(Object child:current.children())if(child instanceof AbstractWidget widget&&widget.getMessage().getString().equals(name))return child;
            return null;
        }
    }
    private static String plainLabel(Object value){return value instanceof Component c?c.getString():String.valueOf(value);}
    private void holdWarfareItem(Minecraft mc,String field)throws Exception{
        mc.getSingleplayerServer().submit(()->{try{
            var item=(net.minecraft.world.item.Item)call(get(Class.forName("net.dochi.tacznpcfire.TaczNpcFireItems"),field),"get");
            var player=mc.getSingleplayerServer().getPlayerList().getPlayer(mc.player.getUUID());
            player.getInventory().setItem(player.getInventory().selected,new ItemStack(item));player.inventoryMenu.broadcastChanges();return true;
        }catch(Exception error){throw new RuntimeException(error);}}).get(5,java.util.concurrent.TimeUnit.SECONDS);
    }
    private void clickRow(Object row,String width,String height)throws Exception{
        double scale=1;try{scale=((Number)call(current,"renderScale")).doubleValue();}catch(NoSuchMethodException ignored){}
        double x=(((Number)get(row,"x")).doubleValue()+((Number)get(row,width)).doubleValue()/2)*scale;
        double y=(((Number)get(row,"y")).doubleValue()+((Number)get(row,height)).doubleValue()/2)*scale;
        if(!current.mouseClicked(x,y,0))throw new IllegalStateException("Row click rejected");current.mouseReleased(x,y,0);
    }
    private void verified(String id,String status,String detail)throws Exception{
        JsonObject record=new JsonObject();record.addProperty("id",id);record.addProperty("status",status);record.addProperty("detail",detail);results.add(record);writeResults();
    }

    private void recordFailure(String name,Throwable error)throws Exception{
        if(guideScenes!=null)call(guideScenes,"abort");
        try{call(Class.forName("dochi.docs.capture.GuideCreateLessons"),"abort");}catch(ClassNotFoundException ignored){}
        error.printStackTrace();JsonObject record=new JsonObject();record.addProperty("id",name);
        var mc=Minecraft.getInstance();record.addProperty("actualScreenAtFailure",mc.screen==null?"world":mc.screen.getClass().getName());
        try(var frame=Screenshot.takeScreenshot(mc.getMainRenderTarget())){frame.writeToFile(output.resolve(name+"-failure.png"));}
        if(current!=null){record.addProperty("screenClass",current.getClass().getName());JsonArray labels=new JsonArray();for(Object child:current.children())if(child instanceof AbstractWidget widget&&widget.visible)labels.add(widget.getMessage().getString());record.add("visibleWidgetLabelsAtFailure",labels);}
        if(index<views.length){int end=Math.min(actionIndex,views[index].length),start=Math.min(viewActionStart,end);record.add("attemptedActions",new Gson().toJsonTree(Arrays.copyOfRange(views[index],start,end)));}
        record.addProperty("status","failed");record.addProperty("error",error.toString());results.add(record);writeResults();
    }
    private void writeResults()throws Exception{
        Files.writeString(output.resolve("screens.json"),new GsonBuilder().setPrettyPrinting().create().toJson(results)+"\n");
    }
    private void finish(Minecraft mc)throws Exception{
        writeResults();Files.writeString(output.resolve("finished.txt"),"Capture pass finished. Review each image and validate workflows separately.\n");
        done=true;mc.stop();
    }
    private static void createWorld(Minecraft mc)throws Exception{
        Object creative=get(Class.forName("net.minecraft.world.level.GameType"),"CREATIVE");
        Object peaceful=get(Class.forName("net.minecraft.world.Difficulty"),"PEACEFUL");
        Object config=get(Class.forName("net.minecraft.world.level.WorldDataConfiguration"),"DEFAULT");
        Object settings=construct("net.minecraft.world.level.LevelSettings","Dochi documentation",creative,false,peaceful,true,construct("net.minecraft.world.level.GameRules"),config);
        Object options=construct("net.minecraft.world.level.levelgen.WorldOptions",84L,false,false);
        Function<Object,Object> dimensions=access->{try{
            Object key=get(Class.forName("net.minecraft.core.registries.Registries"),"WORLD_PRESET");
            Object registry=call(access,"registryOrThrow",key);
            Object preset=call(call(registry,"getHolderOrThrow",get(Class.forName("net.minecraft.world.level.levelgen.presets.WorldPresets"),"FLAT")),"value");
            return call(preset,"createWorldDimensions");
        }catch(Exception error){throw new RuntimeException(error);}};
        call(call(mc,"createWorldOpenFlows"),"createFreshLevel","dochi_docs_capture",settings,options,dimensions,new TitleScreen());
    }
    private static boolean matches(Class<?>[] parameters,Object[] args){
        if(parameters.length!=args.length)return false;
        for(int i=0;i<parameters.length;i++){
            Class<?> p=parameters[i];if(p==int.class)p=Integer.class;if(p==boolean.class)p=Boolean.class;if(p==long.class)p=Long.class;if(p==double.class)p=Double.class;if(p==float.class)p=Float.class;if(p==short.class)p=Short.class;if(p==byte.class)p=Byte.class;if(p==char.class)p=Character.class;
            if(args[i]!=null&&!p.isInstance(args[i]))return false;
        }return true;
    }
    private static Object construct(String name,Object...args)throws Exception{
        for(Constructor<?> constructor:Class.forName(name).getDeclaredConstructors())if(matches(constructor.getParameterTypes(),args)){constructor.setAccessible(true);return constructor.newInstance(args);}
        throw new NoSuchMethodException(name+" constructor "+args.length);
    }
    static Object get(Object target,String name)throws Exception{
        for(Class<?> cls=target instanceof Class<?> type?type:target.getClass();cls!=null;cls=cls.getSuperclass())try{
            Field field=cls.getDeclaredField(name);field.setAccessible(true);return field.get(target instanceof Class<?>?null:target);
        }catch(NoSuchFieldException ignored){}
        throw new NoSuchFieldException(name);
    }
    static void set(Object target,String name,Object value)throws Exception{
        for(Class<?> cls=target.getClass();cls!=null;cls=cls.getSuperclass())try{Field field=cls.getDeclaredField(name);field.setAccessible(true);field.set(target,value);return;}catch(NoSuchFieldException ignored){}
        throw new NoSuchFieldException(name);
    }
    static Object call(Object target,String name,Object...args)throws Exception{
        for(Class<?> cls=target instanceof Class<?> type?type:target.getClass();cls!=null;cls=cls.getSuperclass())
            for(Method method:cls.getDeclaredMethods())if(method.getName().equals(name)&&matches(method.getParameterTypes(),args)){
                method.setAccessible(true);try{return method.invoke(target instanceof Class<?>?null:target,args);}catch(InvocationTargetException error){throw new RuntimeException(name,error.getCause());}
            }
        for(Method method:(target instanceof Class<?> type?type:target.getClass()).getMethods())
            if(method.getName().equals(name)&&matches(method.getParameterTypes(),args)){
                method.setAccessible(true);try{return method.invoke(target instanceof Class<?>?null:target,args);}catch(InvocationTargetException error){throw new RuntimeException(name,error.getCause());}
            }
        throw new NoSuchMethodException(name+"/"+args.length);
    }
}
