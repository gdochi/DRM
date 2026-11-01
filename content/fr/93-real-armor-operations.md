---
title: Commandes et dépannage
slug: dochi-real-armor-operations
order: 930
description: Commandes d'administration, vérifications d'état, utilisation de débogage et problèmes communs de CustomNPCs ou de PNJ facile.
product: dochi-real-armor
category: Commandes et dépannage
section: operations
status: Stable
version: 0.1.4
audience: Opérateurs de serveur et créateurs de modpack
tags:
  - commands
  - troubleshooting
  - debug
translationSource: en
translationMethod: assisted
---

## Commandes

Toutes les commandes nécessitent une autorisation de niveau 2.

```mcfunction
/dochi_real_armor status
/dochi_real_armor split true
/dochi_real_armor durability false
/dochi_real_armor debug true
```

`status` signale le mode partie du corps, la durabilité, le débogage, le support CustomNPCs et le support Easy NPC. Les autres commandes mettent à jour la configuration commune immédiatement.

## Déboguer en toute sécurité

![Déboguer les messages d'endommagement sous Compatibilité PNJ.](assets/media/guides/armor-014-neo1211/armor-compatibility.png "Real Armor 0.1.4 / NeoForge 1.21.1. Utilisez les messages Debug damage dans l'interface graphique ou /dochi_real_armor debug true pour activer les observations de dégâts.")

Activez le débogage temporairement pour voir la partie du corps sélectionnée et réduire les dégâts. Le débogage est un observateur : l'armure doit continuer à travailler après `/dochi_real_armor debug false`.

## Liste de contrôle de dépannage

| Symptôme | Vérifier |
| --- | --- |
| Pas de réduction d'armure | Confirmer le calcul de l'armure et le commutateur de compatibilité des PNJ correspondants sont activés |
| Easy PNJ ignoré | Confirmez que son identifiant d'entité utilise l'espace de noms `easy_npc` et que le support Easy NPC est activé. |
| Les tirs du bas du corps utilisent la mauvaise armure | Confirmez que la compilation correspondante Forge 0.1.1 ou NeoForge 0.1.2 est installée sur le serveur et testez avec le mode partie-corps plus debug |
| Chaque emplacement protège chaque coup | L'armure de la partie du corps est OFF, ou la position de frappe n'a pas pu être résolue |
| La protection ne fait rien | Vérifiez le commutateur de protection et si le type de dégâts contourne l'armure ou les enchantements |
| Les changements d'interface graphique sont rejetés | Utiliser un compte avec niveau d'autorisation 2 |
| Erreur de démarrage de Duplicate-mod | Retirez les anciens bocaux `cnpc_real_armor` et `dochi_real_armor` pour qu'il ne reste qu'une seule libération |

Lorsque vous signalez un problème, incluez `logs/latest.log`, les noms de fichiers jar exacts, les versions de mod et de mod d'arme du PNJ, les paramètres pertinents et si le même coup se comporte différemment avec le débogage OFF.
