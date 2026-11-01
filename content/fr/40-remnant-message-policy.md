---
title: Conditions restantes, actions et permissions
slug: remnant-message-policy
order: 116
description: Choisissez qui peut utiliser ou lire un message et ce qui se passe quand il est lu.
product: core
category: Remnant Msg
section: remnant-msg
status: Guide
version: 0.3.1
audience: Créateurs et opérateurs
translationSource: en
translationMethod: assisted
---

## Décider qui peut lire l'avis

Créez un message [Reste ](#core/remnant-msg), puis configurez **Interact Conditions / View Conditions / View Actions**. Suivez [placement du marqueur](#core/remnant-marker-gui) pour le mettre dans le monde.

| Comportement souhaité | Ouvrir |
| --- | --- |
| Restreindre qui peut utiliser le marqueur | Conditions d'interaction |
| Restreindre qui voit son corps | Voir les conditions |
| Donnez un élément, définissez une balise ou effectuez une autre action à la lecture | Voir les actions |

Après avoir ajouté des conditions, activez également leur commutateur **Enable**. **et** requiert toutes les conditions ; **ou** en requiert une. Choisissez si les actions de vue se produisent à chaque fois ou une fois par joueur, puis sauvegardez.

![Activer le commutateur et la liste des conditions.](assets/media/guides/drm-031-forge1201/remnant-view-conditions.png "DRM 0.3.1 / Forge 1.20.1. L'ajout d'une règle et l'activation de ses contrôles sont des étapes distinctes. Utilisation des contrôles d'interaction ; affichage des messages des contrôles.")

## Référence du fichier-message

L'éditeur peut écrire ces paramètres. Utilisez cette table lors de l'inspection d'un fichier externe.

| Terrain | Signification |
| --- | --- |
| id / nom / activé | Identité enregistrée, nom de la liste et si elle est utilisée |
| message / messageStyles | Gammes de texte corps et style |
| gui | La mise en page remnant_msg connectée |
| useConditions / messageConditions | Interaction et conditions d'affichage |
| messageActionsEnabled / messageActions | Indique si les actions sont exécutées et leur contenu |
| messageTrigger | `every_view` ou `once_per_player` |

Les styles de message peuvent colorer, en gras, en italique, souligner ou frapper à travers les plages du corps. Les conditions utilisent la même famille générale que les conditions de dialogue.

## Autorisations de stratégie serveur

La stratégie contrôle ce que les auteurs peuvent faire ; elle ne contient pas de corps de message.

| Domaine politique | Contrôles |
| --- | --- |
| generalUseAllowed | Utilisation du setter/marker |
| generalCanWriteMessage | Texte écrit directement par le joueur ordinaire |
| generalCanUseJson / generalCanUseTriggers | Messages sauvegardés et utilisation du déclencheur |
| adminCanUseJson / adminCanUseTriggers | Administrator saved-message et trigger utilisation |
| consumeSetterOnGeneralUse | Indique si l'utilisation ordinaire consomme le setter |
| markerLifetimeTicks | Durée de vie du marqueur |
| maxMessageLength | Limite de longueur du corps |

Le paquet `default_policy.json` permet l'utilisation ordinaire et l'écriture directe, mais désactive l'utilisation ordinaire de JSON/trigger. Les administrateurs peuvent utiliser JSON et les déclencheurs. Les valeurs par défaut ne consomment pas le setter, utilisent la durée de vie 0 et permettent 4096 caractères. Une politique existante est conservée lors de la mise à jour.

Gardez les quatre rôles séparés : le **message** définit le contenu, **la politique** définit la permission, **GUI** définit la mise en page et **le marqueur** définit l'emplacement du monde. Une interface graphique ne peut pas accorder d'autorisations ; les conditions d'un message s'appliquent uniquement à ce message.
