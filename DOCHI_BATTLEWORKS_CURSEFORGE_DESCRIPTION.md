# Dochi's Battleworks

Create attacks and boss encounters for CustomNPCs with an in-game pattern editor. Arrange hitbox contacts, animation, skills, and movement on named timeline tracks, then apply the finished combat specification to an NPC.

Dochi's Battleworks is a **Minecraft Forge 1.20.1 addon for [Dochi's RPG Maker](https://www.curseforge.com/minecraft/mc-mods/dochi-rpg-maker)**. It brings combat authoring into DRM's editor and NPC application workflow.

## Main features

### Pattern-based combat

- Build attacks from **Windup → Action → Recovery** stages.
- Add timed hitbox, skill, animation, and control actions inside each pattern.
- Select actions directly from named rows, including several actions at the same tick.
- Adjust execution ticks, repeat intervals, counts, and chances.
- Reuse patterns through delayed combo links.

### Hitbox Library and model preview

- Create box, capsule, sphere, cylinder, sweep, and polygon hitboxes.
- Edit dimensions, damage, offsets, rotation, and shape-specific settings.
- Preview hitboxes with the selected NPC model.
- Search animation clips beside the model and use the scene's Play/Stop controls.
- Resize panels horizontally and vertically, fold them with directional arrows, and save your workspace layout.

### NPC-specific animation

- **Gecko NPCs:** select clips from the NPC's configured animation asset.
- **Modded entity models:** use native animations exposed through DRM's integrations.
- **Normal NPCs:** use Better Combat humanoid motions when its integration is installed.
- Keep animation separate from reusable hitbox geometry.
- Play attack animations once while placing multiple independent contact timings.

Models, textures, animation assets, and baseline behavior bindings are configured in DRM's **NPC Basic**. Available native clips depend on the selected model and its integration.

### Encounter rules and pursuit

- Control pattern eligibility with distance, height, health, visibility, and phase conditions.
- Tune weighted selection, repeat penalties, cooldowns, recovery, and mobility preferences.
- Create latched health phases with transition patterns.
- Let Battleworks handle pursuit and head/body facing between patterns when native attacks are suppressed.
- Preserve authored hold, dash, orbit, strafe, jump, and retreat movement during attacks.
- Add timed actions to a death sequence.

### Optional combat integrations

Use skills exposed through DRM when their providers are installed. Optional integrations also include supported Iron's Spells 'n Spellbooks projectile deflection and Better Combat motion presentation.

## Getting started

1. Open DRM's editor selector with the **Dochi RPG Maker Core** item and choose **Battleworks**.
2. Configure the target NPC's model in **NPC Basic**.
3. Create a pattern in **Pattern Workbench**, then add its timed actions.
4. Use **Hitbox Library** to tune geometry and preview animation.
5. Save a combat JSON and apply it to the NPC through DRM's NPC apply screen.

The NPC uses its applied document copy. After changing a source file, apply it again to update that NPC.


