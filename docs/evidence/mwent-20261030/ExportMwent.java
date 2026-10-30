import java.nio.file.*;
import java.util.*;
import com.google.gson.*;
import net.dochi.minigames.model.*;

/** Read-only export of the compiled card catalog, without starting Minecraft. */
public class ExportMwent {
    public static void main(String[] args) throws Exception {
        var data = new LinkedHashMap<String,Object>();
        data.put("cards", MobCards.ALL);
        data.put("optional", MobOptionalDecks.ALL);
        var gson = new GsonBuilder().setPrettyPrinting().create();
        for (var locale : List.of("ko_kr", "en_us")) {
            try (var in = MobCards.class.getResourceAsStream("/assets/dochi_minigames/lang/" + locale + ".json")) {
                data.put(locale, JsonParser.parseReader(new java.io.InputStreamReader(in, java.nio.charset.StandardCharsets.UTF_8)));
            }
        }
        Files.writeString(Path.of(args[0]), gson.toJson(data));
        System.out.println("Exported " + MobCards.ALL.size() + " built-in cards and " + MobOptionalDecks.ALL.stream().mapToInt(p -> p.cards().size()).sum() + " optional cards");
    }
}
