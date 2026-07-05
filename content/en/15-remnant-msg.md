---
title: Remnant Msg
slug: remnant-msg
order: 87
description: How to configure message documents, policies, and display GUI in Remnant Msg Editor.
product: core
category: Core Systems
section: remnant-msg
status: Stable
version: 0.1.2
audience: Creators / Operators
tags:
  - remnant
  - message
---

## Role

Remnant Msg manages message output rules separately from dialogue nodes. It is useful for event notices, status messages, and cinematic text because messages, policies, and display GUI can be edited separately.

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
