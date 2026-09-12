import java.nio.file.*;
import net.dochi.cnpcirons.battleworks.*;

public class ValidateBattleworksDocs {
  public static void main(String[] args) throws Exception {
    Path assets = Path.of(args[0]);
    String input = Files.readString(assets.resolve("training_swordsman.json"));
    BattleworkDocument doc = BattleworkDocument.fromJson(input);
    if (!doc.id.equals("training_swordsman") || doc.patterns.size() != 1 || doc.hitboxes.size() != 1)
      throw new AssertionError("Combat parser fell back or changed document identity");
    var validation = doc.validate();
    for (var issue : validation.issues()) System.out.println(issue);
    if (validation.hasErrors()) throw new AssertionError("Combat sample rejected");
    var roundTrip = BattleworkDocument.fromJson(doc.toJson());
    if (roundTrip.validate().hasErrors() || roundTrip.patterns.get(0).action.events.get(0).at != 3)
      throw new AssertionError("Combat round-trip changed timing");
    ParticleDocument particle = ParticleDocument.parse(Files.readString(assets.resolve("training_ring.json")));
    var restored = ParticleDocument.parse(particle.toJson());
    if (!restored.effect.id.equals("training_ring") || restored.effect.durationTicks != 40)
      throw new AssertionError("Particle round-trip changed effect");
    int emissions = 0;
    for (int tick = 0; tick < restored.effect.durationTicks; tick++)
      for (var layer : restored.effect.layers) if (layer.emits(tick)) emissions++;
    if (emissions != 20) throw new AssertionError("Particle schedule does not match tutorial");
    System.out.println("PASS: live-source combat validator (" + validation.errorCount() + " errors, "
      + validation.warningCount() + " warnings), JSON round trips, 20 particle emissions.");
  }
}
