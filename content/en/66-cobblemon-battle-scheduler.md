---
title: Battle Scheduler
slug: cobblemon-battle-scheduler
order: 534
description: Connect clone spawning, intro/battle/result scenes and area admission in one run.
product: drm-cobblemon-editor
category: Battle Scheduler
section: scheduler
status: Usage guide
version: Fabric / NeoForge 0.2.6
audience: Encounter creators / server operators
---

## What it connects

The scheduler runs **NPC clone spawn → intro scene → battle presentation → Cobblemon battle → existing rewards/progression → result scene → actor cleanup and exit**. It is available in Fabric and NeoForge Cobblemon Editor 0.2.4 for Minecraft 1.21.1. RCT is optional.

The clone provides the NPC and appearance; Trainer or Pokemon Itself JSON provides battle settings. Scene Maker supplies intro/result scenes, while Battle Presentation Maker supplies the battle entrance. Running a scheduler does not modify the saved clone.

## Create a first encounter

1. Prepare a CNPC server clone and a working Trainer or Pokemon Itself battle JSON.
2. Open **Battle Scheduler** in DRM's addon editor list.
3. In **Actor**, select the clone and choose **Use Existing Settings** or **Apply New JSON**. Use new JSON when the clone has no battle binding.
4. In **Area**, configure room ID, bounds, actor/player/exit positions and facing. Taking the current position also records its world.
5. In **Presentation**, connect intro, battle presentation and win/loss/flee scenes. Scenes are optional; an empty presentation uses the actor's battle binding.
6. In **Policy**, set command/area/both triggering, admission, leave cancellation, cooldown, start timeout and progression scope.
7. In **Preview**, play/stop and choose win, loss or flee. Reload references after changing their files.
8. Validate, save a user file with `Save As`, and use Run to test actual spawning and battle.

Preview reads referenced files, clone appearance, scenes and presentation. Test actual spawning, victory and rewards with a real run. Load the chunks used by the area and preview camera.

## Select an area in the world

Use **Area → Select area** to move the box or drag its corners, then Apply. Esc cancels, and blocks are never changed. Maximum bounds are exclusive. Put actor/player starting positions inside the area and choose a usable exit.

Enable **Show scheduler areas** in Mods Config and hold the DRM Core in Creative to see up to 16 nearby areas within 64 blocks. Green means ON, gray OFF and orange in use. Editing permission is required; guides are hidden during scenes or battles. This local display setting is separate from automatic-entry control.

## Control automatic entry

The saved file's area ON/OFF control applies immediately on the server and persists across restarts. OFF stops new automatic admissions while current battles continue and explicit Start remains available. Use Cancel to stop a run. Saving an editor draft does not reset this operational switch.

```text
/drm battle_scheduler area on "boss_room.json"
/drm battle_scheduler area off "boss_room.json"
/drm battle_scheduler area status "boss_room.json"
```

Automatic entry also requires an enabled document, Area or Both triggering, and enabled bounds. Entry is checked when the player enters; remaining inside does not repeatedly spawn actors.

## Commands and dialogue

Administrator commands target one player. A player running the command may omit the player argument to target themselves.

```text
/drm battle_scheduler start "boss_room.json" PlayerName
/drm battle_scheduler cancel PlayerName
```

In DRM dialogue/quest commands, replace `PlayerName` with `{player}`. **Copy Command** uses that form. `@player` belongs to display-text replacement, not this command's player argument. Alternatively, choose the **Battle Scheduler** dialogue action and select a server JSON. Success closes dialogue; failure keeps it open.

## Reservations and cleanup

The same player, the same world/room ID, or overlapping areas in the same world cannot run concurrently. Different files targeting one room share the reservation until result scenes and cleanup finish. Solo admission rejects occupied rooms; spectator admission allows viewing while blocking a separate battle against the reserved actor.

Cancellation, leaving, disconnect, death, spawn failure and start timeout clean up scenes and the spawned actor and release reservations. Ordinary NPCs are not removed. References are fixed when a run starts, so file changes take effect on the next run.

## Files and troubleshooting

| Data | Path |
| --- | --- |
| Scheduler JSON | `config/dochi_rpg_maker/cobblemon/battle_schedulers/` |
| Automatic-entry operational state | `config/dochi_rpg_maker/cobblemon/battle_scheduler_area_state.json` |

For external tools, the schema is `dochi.cobble.battle_scheduler.v1`. Progression is independent of the temporary actor UUID; Save As to a different file creates a separate progression ID. If starting fails, check editing permission, clone/battle bindings, chunks, room reservations and cooldown.
