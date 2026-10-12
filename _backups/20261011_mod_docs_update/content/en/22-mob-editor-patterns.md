---
title: Workspace, events, and timeline
slug: mob-editor-patterns
order: 230
description: Find controls, select individual actions, and edit timing, repeats, and probability.
product: mob-editor
section: authoring
category: BattleWorks
status: Guide
version: 0.1.3
audience: Beginners and combat creators
tags:
  - battleworks
  - combat
---

## Read the workspace in this order

Select a pattern in the left list, choose Windup / Action / Recovery, then select an action row and edit its properties.

| Tool | Purpose |
| --- | --- |
| Pattern Workbench | Pattern conditions and action timeline |
| Hitbox Library | Shared geometry, damage, placement, and model preview |
| Combat Rules | Manager, targeting, phases, death, and BGM |
| Particle Maker | Separate reusable visual files |
| Pattern Build Assist | Generate a physical attack from answers |
| Pattern Graph | Inspect pattern and combo links |
| Simulation | Rehearse motion and hitbox placement |

## 1. Select a pattern

Use **Find pattern** to search names or IDs. Click the intended pattern and edit its name, Enabled state, and range in Core. Use Score for selection preferences and Combo for follow-up links.

Names are for readers; IDs connect JSON references. If editing IDs externally, update every combo and transition reference that uses them.

## 2. Set stage lengths

| Stage | Purpose | Practice value |
| --- | --- | --- |
| Windup | Prepare and warn | 24 ticks |
| Action | Execute hit, skill, or movement | 16 ticks |
| Recovery | Finish the motion and offer an opening | 24 ticks |

Core's **Recovery Delay** is a post-pattern delay floor, separate from the Recovery stage's length. After shortening a stage, check all its events and repeats again.

## 3. Add one action

1. Select Action.
2. Press **+ Action**.
3. Choose a purpose category, then the actual action.
4. For Hitbox, use **Choose from list** or create a hitbox.
5. Click the named action row.
6. Set Event Tick `3`, Interval `0`, and Repeat Count `1`.
7. Keep both event and action chances at 100 while testing.

Categories organize the picker; selecting a category is not an enable switch. Return to the parent category or use Esc when navigating the list.

**+ Skill** opens skill selection directly. **+ FX** helps add sounds, titles, and commands.

## 4. Separate events from action rows

An event means “the actions scheduled at this time.” A Hitbox and Sound inside one event share its tick and repeats, but each has a selectable row.

| Edit | Affects |
| --- | --- |
| Event Tick | All actions inside that event |
| Event Interval / Repeat Count | The entire event schedule |
| Event chance | Whether that occurrence runs at all |
| Action Chance | That action's independent chance |
| Hitbox action multiplier | That use of the shared hitbox |
| Library Damage | Every use of that hitbox definition |

Put a sound at tick 3 and damage at tick 8 in separate events.

## 5. Move pins and the playhead

Drag an action pin to retime its event. Clicking or dragging the ruler and empty lanes moves the preview playhead. Scroll when there are many action rows.

Event Tick is local to the selected stage. With a 24-tick Windup, Action tick 3 appears at overall tick 27.

## 6. Create a repeated event

Use a 20-tick Action with:

| Setting | Value |
| --- | --- |
| Event Tick | 4 |
| Interval | 6 |
| Repeat Count | 3 |
| Execution ticks | 4, 10, 16 |

```text
first tick + interval × (count - 1) ≤ stage length
4 + 6 × (3 - 1) = 16 ≤ 20
```

Count includes the first execution. Interval 0 means no repeat. Repeating a hitbox does not automatically restart the stage animation. See [hit policies](#mob-editor/battleworks-hitboxes) to control repeated damage attempts.

## 7. Adjust probability in one place first

For reliable damage with occasional dialogue, use event 100%, Hitbox 100%, Sound 100%, and dialogue 20%.

A 50% event containing a 20% action gives 10% base probability. Advanced conditions and health/phase chance bonuses can change the effective frequency further.

## 8. Recover a cramped layout

- Drag dividers to resize lists, workspace, and properties.
- In Hitbox Library, resize model/timeline height and model/Clips width.
- Use header arrows to fold or unfold panels.
- Press **Reset panels** to restore the arrangement.
- Drag Simulation by its header and resize using its lower-right grip.

Preview speed 0.1x–4.0x changes observation speed, not saved pattern ticks. Layout belongs to local client settings.

## Before saving

Check Enabled, missing IDs, event bounds, and the last repeat. Resolve validation errors, save/apply, and test the actual NPC. Continue with [hitboxes](#mob-editor/battleworks-hitboxes).
