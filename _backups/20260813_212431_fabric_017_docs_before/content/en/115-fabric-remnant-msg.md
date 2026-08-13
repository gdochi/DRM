---
title: Remnant Msg
slug: remnant-msg
order: 87
description: How to configure message documents, policies, and display GUI in Remnant Msg Editor.
product: core-fabric
category: Core Systems
section: remnant-msg
status: Stable
version: 0.1.6
audience: Creators / Operators
tags:
  - remnant
  - message
---

## Role

Remnant Msg manages world-placed interaction messages separately from NPC dialogue nodes. Message documents, policies, the display GUI, marker blocks/entities, and the setter item work together.

DRM Core installs a default Remnant Msg GUI plus sample message and policy files as default content.

## Storage

Remnant Msg files use these paths.

| Data | Path |
| --- | --- |
| Messages | `config/dochi_rpg_maker/remnant_msg/messages` |
| Policies | `config/dochi_rpg_maker/remnant_msg/policies` |
| Default GUI | `config/dochi_rpg_maker/gui/default_remnant_msg_gui.json` |

Display layout uses the GUI Maker `remnant_msg` layout profile.

## Basic Workflow

1. Right-click the `Dochi RPG Maker Core` item.
2. Open `Remnant Msg Editor`.
3. Create or edit the message document.
4. Configure output rules or policies.
5. If a custom display is needed, edit a `remnant_msg` GUI in GUI Maker.
6. Save and reload the server data.

## Messages, Policies, And GUI

| Type | Role |
| --- | --- |
| Message | Actual text and message unit. |
| Policy | Rule for when and how a message appears. |
| GUI | Layout that controls how the message is displayed. |

Separating content from display makes it easier to reuse one GUI across multiple policies or connect one message to different display styles.

Message documents support `message`, ranged `messageStyles`, separate interaction and view conditions, `messageActions`, and `messageTrigger`. Use `every_view` to run enabled actions on each view or `once_per_player` for one execution per player.

## Setter And World List

| Action | Result |
| --- | --- |
| Right-click a block face with `remnant_msg_setter` | Places a marker facing from that surface. |
| Right-click air | Opens the world marker list. |
| Sneak-right-click a block | Opens the list without placing a marker. |

The paged `World List` provides `Edit`, `Teleport`, `Delete`, and `Refresh`. Policy fields determine whether a general user may use the flow, write embedded text, select JSON, use triggers, or consume the setter. Runtime checks interaction/view conditions and runs enabled actions according to `messageTrigger`.

In 0.1.6, message and policy selectors search the server JSON lists. A marker appearance can be `Default`, `Item`, or `Block`; item/block choices search localized names, namespaces, and IDs. `Scale` accepts `0.05` through `16.0`. Billboard modes are `fixed`, `vertical`, `horizontal`, and `center`. Item appearances support `none`, first/third-person hand transforms, `head`, `gui`, `ground`, and `fixed`. The server validates these settings and persists them with marker saved data and the display entity.

The bundled policy allows general use and direct writing but reserves JSON and triggers for administrators. It defaults to no setter consumption, unlimited marker lifetime, and a 4096-character message limit. Existing policy files are not overwritten during updates.

## GUI Connection

Remnant Msg GUI files live in the same `gui` storage as dialogue and shop GUI files, but the `guiType` and components are different. The default file is `default_remnant_msg_gui.json`; create a copy instead of editing the protected default directly.

Preview values in GUI Maker can differ from runtime values. Runtime output comes from the Remnant Msg document and policy data.

## Checklist

| Symptom | Check |
| --- | --- |
| Message does not appear | Message file, policy file, and server reload. |
| GUI is broken | `guiType`, component IDs, and default GUI path. |
| Wrong message appears | Message ID referenced by the policy. |
| Position is wrong | Whether the GUI was opened with the `remnant_msg` profile. |
