## DWE
### 0.3.2 Change Log
> **Important:** Use the same DWE 0.3.2 build on the client and server.
#### Forge 1.20.1
##### Added
* Added mouse-wheel zoom controls to the world editor.
* Added relative coordinate editing and movable virtual centers for all world components.
* Added camera elevation controls and adjustable movement speed in the world editor.
* Added checkbox selection, select-all, and bulk deletion for timeline actions.
* Added timeline zoom buttons and scrolling through time.
* Added Ctrl+S saving for gimmick and vehicle editors.
* Added world placement tools for NPCs, vehicle support, fire support, and bombing.
* Added draggable world handles, detached editor cameras, and placement undo and redo.
* Added collapsible tool, property, and timeline panels with size restoration.
* Added pixel effect icons to placement tools, world markers, action lists, and timelines.
* Added live simulation with temporary NPCs, vehicles, aircraft, and terrain protection.
* Added play and stop controls with automatic cleanup of temporary actors and projectiles.
* Added left-drag and middle-drag camera panning in the world editor.
* Added WASD player movement with camera following while the world editor stays open.
* Added compact, clickable world effect icons with hover details.
##### Fixed
* Fixed startup crashes when mod loaders cannot enumerate addon classes.
* Fixed compatible DW releases being rejected by a fixed version list.
* Fixed overlapping gimmick property labels across languages and panel sizes.
* Fixed misplaced help on the gimmick launch screen.
* Fixed aircraft circling above ground targets without lining up attack passes.
* Fixed aircraft losing valid targets during attack maneuvers.
* Fixed bombing runs stalling before alignment or rejecting reachable release trajectories.
* Fixed dropdown menus remaining off-screen after resizing the world editor.
* Fixed loaded relative-coordinate JSON remaining outside the current world preview.
* Fixed timeline ruler labels overlapping zoom and collapse controls.
* Fixed world and timeline icons staying behind while dragging.
* Fixed undo coverage for action deletion, retiming, reordering, and property edits.
* Fixed detached editor cameras starting inside the player's head.
* Fixed first-person hands covering the world editor after collapsing panels.
* Fixed restrictive panel resizing limits and narrow-panel control placement.
##### Changed
* Changed world editor mode selectors to dropdown menus.
* Changed camera elevation to configured Jump and Sneak keys.
* Changed panel folding controls to directional arrows.
* Changed gimmick editing to use the world view exclusively.
* Changed editor controls to remove legacy schematic and relocated execution actions.
* Changed persistent control instructions to compact hover help.
* Changed simulation timing to follow the server without speed, pause, or rewind controls.
* Changed event timing controls to seconds with searchable vehicle, aircraft, and payload lists.
* Changed world effect markers to show descriptions only on hover, without colored frames.
##### Improved
* Improved DW compatibility checks using required classes, methods, and fields.
* Improved world editor zoom-out range with distance-based zoom steps.
* Improved speed and time-range controls with centered numeric values.
* Improved the launch screen with compact document actions and fewer intermediate tool screens.
* Improved world and timeline controls at narrow viewport widths.
* Improved resizable editor panels to retain input values, focus, and cursor positions.
* Improved document toolbar spacing with compact, content-sized action buttons.
