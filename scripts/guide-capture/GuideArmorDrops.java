package dochi.docs.capture;

import com.google.gson.*;
import java.nio.file.*;
import java.util.*;
import net.minecraft.client.Minecraft;
import net.minecraft.client.gui.components.AbstractWidget;
import net.minecraft.client.gui.screens.Screen;
import static dochi.docs.capture.GuideCapture.*;

/** Documentation fixture: real production widgets and server acknowledgements. */
final class GuideArmorDrops {
    static void perform(Minecraft mc,String action,Path output)throws Exception {
        Screen screen=mc.screen;
        if(screen==null)throw new IllegalStateException("Armor tutorial requires a native screen");
        String command=action.substring(6);
        if(command.startsWith("click:")){
            String[] parts=command.substring(6).split(":",2);
            int occurrence=parts.length>1?Integer.parseInt(parts[1]):0;
            var matches=screen.children().stream().filter(c->c instanceof AbstractWidget w&&w.visible&&w.active&&w.getMessage().getString().equals(parts[0])).map(c->(AbstractWidget)c).toList();
            if(matches.size()<=occurrence)throw new IllegalStateException("Missing active control: "+command+"; "+labels(screen));
            click(screen,matches.get(occurrence));return;
        }
        if(command.startsWith("field:")){
            String[] parts=command.substring(6).split("=",2);String key=parts[0];AbstractWidget widget=null;
            if(key.equals("search"))widget=(AbstractWidget)get(screen,"search");
            else widget=findField(screen,key);
            if(widget==null)throw new IllegalStateException("Missing native field: "+key);
            if(!key.equals("search")&&!key.equals("save_name"))widget=ensureVisible(screen,key);
            click(screen,widget);call(widget,"setValue","");
            for(char c:parts[1].toCharArray())if(!screen.charTyped(c,0))throw new IllegalStateException("Rejected input: "+key);
            if(!parts[1].equals(call(widget,"getValue")))throw new IllegalStateException("Field did not retain "+key);
            return;
        }
        if(command.startsWith("pick:")){
            String wanted=command.substring(5);List<?> rows=(List<?>)get(screen,"results");int index=-1;
            for(int i=0;i<rows.size();i++)if(wanted.equals(call(call(rows.get(i),"selection"),"itemId"))){index=i;break;}
            if(index<0||index>=108)throw new IllegalStateException("Item not visible in native catalog: "+wanted);
            int scroll=((Number)get(screen,"scroll")).intValue(),visible=index-scroll*18;
            if(visible<0||visible>=108)throw new IllegalStateException("Item outside current picker page");
            clickAt(screen,18+(visible%18)*30+14,138+(visible/18)*30+14);
            if(!wanted.equals(call(get(screen,"selected"),"itemId")))throw new IllegalStateException("Wrong item selected");
            return;
        }
        if(command.startsWith("verify:")){
            String stage=command.substring(7);Object session=get(screen,"session");
            if((boolean)call(session,"busy")||!(boolean)call(session,"canEdit"))throw new IllegalStateException("Server acknowledgement is pending");
            String expected=stage.equals("saved")?"saved":"applied";
            if(!expected.equals(get(session,"status")))throw new IllegalStateException("Unexpected server status: "+get(session,"status"));
            JsonObject evidence=mc.getSingleplayerServer().submit(()->{
                try{
                    Object store=call(Class.forName("com.hodu.realarmor.drops.ArmorDropStore"),"get",mc.getSingleplayerServer());
                    JsonObject preset=JsonParser.parseString((String)call(call(store,"load","iron_salvage"),"json")).getAsJsonObject();
                    var rules=preset.getAsJsonArray("rules");if(rules.size()!=1)throw new IllegalStateException("Expected one armor rule");
                    var rule=rules.get(0).getAsJsonObject();if(!rule.get("armor").getAsString().equals("minecraft:iron_chestplate"))throw new IllegalStateException("Wrong armor rule");
                    var entries=rule.getAsJsonArray("drops");if(entries.size()!=1)throw new IllegalStateException("Expected one drop");
                    var drop=entries.get(0).getAsJsonObject();
                    if(drop.get("chance").getAsDouble()!=100||drop.get("min").getAsInt()!=1||drop.get("max").getAsInt()!=3||!drop.getAsJsonObject("stack").toString().contains("minecraft:iron_nugget"))throw new IllegalStateException("Saved GUI fields differ");
                    boolean enabled=(boolean)call(store,"enabled");if(enabled!=stage.equals("applied"))throw new IllegalStateException("Save/Apply activation differs");
                    JsonObject report=new JsonObject();report.addProperty("stage",stage);report.addProperty("enabled",enabled);
                    report.addProperty("serverRevision",((Number)call(store,"revision")).longValue());report.add("preset",preset);
                    report.add("active",JsonParser.parseString((String)call(call(store,"document"),"json")));return report;
                }catch(Exception error){throw new RuntimeException(error);}
            }).get(5,java.util.concurrent.TimeUnit.SECONDS);
            if(stage.equals("applied")&&!"iron_salvage".equals(get(session,"activeName")))throw new IllegalStateException("Client active set differs");
            Files.writeString(output.resolve("armor-drops-"+stage+".json"),new GsonBuilder().setPrettyPrinting().create().toJson(evidence)+"\n");return;
        }
        throw new IllegalArgumentException(action);
    }

    private static String labels(Screen screen){return screen.children().stream().filter(c->c instanceof AbstractWidget).map(c->((AbstractWidget)c).getMessage().getString()).toList().toString();}
    private static double scale(Screen screen)throws Exception{return ((Number)call(screen,"scale")).doubleValue();}
    private static void click(Screen screen,AbstractWidget widget)throws Exception{clickAt(screen,widget.getX()+widget.getWidth()/2d,widget.getY()+widget.getHeight()/2d);}
    private static void clickAt(Screen screen,double x,double y)throws Exception{
        double factor=scale(screen);
        if(screen.getClass().getSimpleName().equals("EditorItemPickerScreen")){x+=((Number)call(screen,"offsetX")).doubleValue();y+=((Number)call(screen,"offsetY")).doubleValue();}
        x*=factor;y*=factor;
        if(!screen.mouseClicked(x,y,0))throw new IllegalStateException("Native click rejected at "+x+", "+y);
        screen.mouseReleased(x,y,0);
    }
    private static AbstractWidget findField(Screen screen,String key)throws Exception{
        for(Object control:(List<?>)get(screen,"controls")){
            String id=(String)call(control,"key");
            if(id.equals(key)||(id.startsWith("number_")&&id.endsWith(key)))return (AbstractWidget)call(control,"widget");
        }
        throw new IllegalStateException("Missing native field: "+key);
    }
    private static AbstractWidget ensureVisible(Screen screen,String key)throws Exception{
        for(int i=0;i<12;i++){
            AbstractWidget field=findField(screen,key);
            Object rect=call(screen,"formView");int top=((Number)call(rect,"y")).intValue(),height=((Number)call(rect,"height")).intValue();
            if(field.getY()>=top&&field.getY()+field.getHeight()<=top+height)return field;
            double factor=scale(screen),x=(((Number)call(rect,"x")).doubleValue()+((Number)call(rect,"width")).doubleValue()/2)*factor;
            screen.mouseScrolled(x,(top+height/2d)*factor,0,field.getY()<top?2:-2);
            // Native scrolling rebuilds the fields; look them up again next time.
        }
        throw new IllegalStateException("Inspector input is outside its native viewport");
    }
}
