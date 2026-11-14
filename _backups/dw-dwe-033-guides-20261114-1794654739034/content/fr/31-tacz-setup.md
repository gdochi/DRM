---
title: Installer et configurer le premier plan
slug: warfare-setup
order: 320
description: Installez les mods requis et configurez un PNJ pour tirer.
product: dochi-warfare
category: Configuration
section: setup
status: Projet
version: 0.3.2
audience: Opérateurs de serveur
tags:
  - setup
  - TACZ
  - gui
translationSource: en
translationMethod: assisted
---

## Mods requis

| Poste | Besoins |
| --- | --- |
| Minecraft / chargeur | Forge 1.20.1, NeoForge 1.21.1 ou Fabric 1.21.1 |
| Java | Forge 17 / NeoForge et Fabric 21 |
| DW | 0.3.2 du bon chargeur |
| TACZ | Requis : TACZ sur Forge/NeoForge ; TACZ Refabricated sur Fabric. L’ancienne restriction sous 1.2 ne s’applique plus |
| Player Animator | Requis sur clients Forge/NeoForge : Forge 1.0.0+ / NeoForge 2.0+. Facultatif sur Fabric |
| Fabric | Fabric API + Forge Config API Port (versions Fabric) |
| NPC mod | DNPC ou CustomNPCs |

Installez matching-loader DW et ses exigences sur le serveur et le client. DRM est facultatif. Pour les véhicules, ajouter **DWE 0.3.2** et SuperbWarfare. Les versions supportées SuperbWarfare sont ** 0.8.9 / 0.8.9.1 / 0.8.9.2 ** sur Forge et ** 0.8.9.1 / 0.8.9.2 ** sur NeoForge. Inclure SuperbWarfareses propres dépendances, comme Kotlin pour Forge.

## Choisissez une arme dans l'inventaire du joueur

Ces écrans anglais utilisent **DW 0.3.1, DNPC 0.1.3 and NeoForge 1.21.1**.

![M4A1 Carbine sélectionné dans Gun avec l'aperçu PNJ armé.](assets/media/guides/warfare-031-neo1211/dw-gun.png "Choisissez Arme à feu sur la gauche, puis cliquez sur une arme à feu dans le catalogue d'inventaire du joueur. Cochez Pistolet stocké et l'entrée 100% arme ci-dessous.")

1. Placez un PNJ. Voir [DNPC setup](#dochi-npc-core/npc-core-setup) pour un premier acteur.
2. Mettre une arme à feu dans le **Inventaire des joueurs**Cliquez avec le bouton droit sur le PNJ avec **DW Npc Core**.
3. Activez **TACZ Fire NPC Mode** en haut à droite. Vérifiez le mode et l'état Activé en **Overview**.
4. Sous **Gun**, sélectionnez l'icône de l'arme à feu. Si la liste est vide, vérifiez l'inventaire du joueur pour un pistolet pris en charge.
5. Dans **Senses → Quick View → Combat Mode**, choisissez **Stance: Ranged** ou **Auto**. Ranged utilise le pistolet; Auto swaps entre rangé et mêlée par distance.
6. En dessous de **Quick View → Fire Rate**, commencez par **RPM Mode: TACZ Native**. Le taux et la précision sont configurés ici.
7. Activez **Reload / Supply Ammo** dans **Ammo** et définissez **Ammo Stock**. `-1` Réserves illimitées.
8. Sélectionnez une cible sous **Targets**, puis utilisez le contrôle top **Save** pour enregistrer dans le PNJ.
9. Tester contre une cible valide à portée, avec une vue dégagée et la bonne direction de détection. Vérifiez le tir et le rechargement.

## Trouver le prochain réglage

![Vue rapide à côté du mode Sensibilisation et combat.](assets/media/guides/warfare-031-neo1211/dw-senses.png "Cliquez sur une entrée Quick View pour accéder à cette section. La distance de détection et la distance de tir sont configurées séparément.")

| Emplacement | Contrôles |
| --- | --- |
| **Gun / Melee** | Armes à distance/de mêlée et dégâts |
| **Senses → Awareness** | Distance d'acquisition, angle, retard et mouvement de ralenti |
| **Senses → Combat Mode** | Comportement de commutation et d'engagement à distance / en mêlée |
| **Senses → Fire Modes / Fire Rate** | Feu et rafales en mouvement / vitesse et précision |
| **Targets** | Cibles à attaquer |
| **Ammo** | Rechargement, réserves et régénération |
| **Armor / Visual & FX / Pose** | Armure, apparence, sons et poses |
| **Cover** | Couverture pendant le combat |

**Overview** résume les valeurs actuelles. Plusieurs candidats d'arme, de peau ou d'armure doivent totaliser **100%** dans leur groupe respectif. Le contrôle **Even** de l’interface utilisateur actuelle répartit la probabilité de manière égale.

## Réutiliser les paramètres sur un autre PNJ

**Save As** un profil, **Load** sur un autre PNJ, puis **Save**. Les profils sont en dessous de `config/dochi_warfare/target_entities/`. Pour garder le PNJ lui-même, faites un clic droit en l'air avec le noyau pour ouvrir la bibliothèque [clone](#dochi-warfare/warfare-entity-clones).

Continuer à [Construction facile et préréglages](#dochi-warfare/warfare-easy-build-presets) pour une configuration de comportement guidé, ou [dépannage](#dochi-warfare/warfare-troubleshooting) S'il ne tire pas. Utilisez **DW Pose Core / DW Mercenary Core / DW Booby Trap Core** pour les poses, la location ou les pièges, et [DWE](#dochi-warfare-expanded/expanded-overview) pour les véhicules.
