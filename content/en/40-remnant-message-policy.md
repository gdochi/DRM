---
title: Remnant Conditions, Actions and Permissions
slug: remnant-message-policy
order: 116
description: Choose who can use or read a message and what happens when it is read.
product: core
category: Remnant Msg
section: remnant-msg
status: Guide
version: 0.3.1
audience: Creators and operators
---

## Decide who can read the notice

Create a [Remnant message](#core/remnant-msg), then configure **Interact Conditions / View Conditions / View Actions**. Follow [marker placement](#core/remnant-marker-gui) to put it in the world.

| Desired behavior | Open |
| --- | --- |
| Restrict who can use the marker | Interact Conditions |
| Restrict who sees its body | View Conditions |
| Give an item, set a tag or perform another action on reading | View Actions |

After adding conditions, also enable their **Enable** switch. **and** requires all conditions; **or** requires one. Choose whether view actions happen every time or once per player, then save.

![View Conditions Enable switch and condition list.](assets/media/guides/drm-031-forge1201/remnant-view-conditions.png "DRM 0.3.1 / Forge 1.20.1. Adding a rule and enabling its checks are separate steps. Interact controls use; View controls message display.")

## Message-file reference

The editor can write these settings. Use this table when inspecting an external file.

| Field | Meaning |
| --- | --- |
| id / name / enabled | Saved identity, list name and whether it is used |
| message / messageStyles | Body and styled text ranges |
| gui | The connected remnant_msg layout |
| useConditions / messageConditions | Interaction and display conditions |
| messageActionsEnabled / messageActions | Whether view actions run and their contents |
| messageTrigger | `every_view` or `once_per_player` |

Message styles can color, bold, italicize, underline or strike through ranges of the body. Conditions use the same general family as dialogue conditions.

## Server policy permissions

The policy controls what authors may do; it does not contain a message body.

| Policy field | Controls |
| --- | --- |
| generalUseAllowed | Ordinary-player setter/marker use |
| generalCanWriteMessage | Ordinary-player direct text writing |
| generalCanUseJson / generalCanUseTriggers | Ordinary-player saved-message and trigger use |
| adminCanUseJson / adminCanUseTriggers | Administrator saved-message and trigger use |
| consumeSetterOnGeneralUse | Whether ordinary use consumes the setter |
| markerLifetimeTicks | Marker lifetime |
| maxMessageLength | Body-length limit |

The bundled `default_policy.json` allows ordinary use and direct writing, but disables ordinary JSON/trigger use. Administrators may use JSON and triggers. Defaults do not consume the setter, use lifetime 0 and permit 4096 characters. An existing policy is preserved on update.

Keep the four roles separate: the **message** defines content, **policy** defines permission, **GUI** defines layout and **marker** defines the world location. A GUI cannot grant permissions; a message’s conditions apply to that message alone.
