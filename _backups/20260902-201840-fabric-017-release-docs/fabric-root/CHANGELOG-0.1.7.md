# 0.1.7 Change Log

## Added

- Added the Teleporter Set editor, GUI Maker-driven player destination browser, NPC Apply binding, dialogue navigation, travel conditions, and transition effects.
- Added the placed NPC Spawner workflow with library and Soul Stone sources, weighted multi-source pools, spawn conditions, effects, appearance controls, and searchable JSON loading.
- Added live FUNCTION search to NPC Apply. Core and addon targets can be found by localized label, action name, stable ID, editor ID, server JSON kind, or binding group.

## Changed

- Changed NPC Apply FUNCTION filtering to preserve the selected function until the user explicitly chooses another result. Applied JSON continues to show every registered target.
- Changed NPC Apply list loading to report progress inside the JSON list instead of flashing a duplicate footer label.
- Changed NPC Spawner controls, classification layout, condition modes, particle selection, and scrollbars for denser non-overlapping editor use.

## Fixed

- Fixed the Teleporter Editor Load flow and NPC-opened Teleporter runtime screen being blurred by the Minecraft 1.21.1 inherited screen background pass.
- Fixed NPC Spawner Load using the Reset path instead of opening a searchable server JSON list.
- Fixed NPC Apply function changes briefly showing and then clearing a server-list loading label beside Cancel.
