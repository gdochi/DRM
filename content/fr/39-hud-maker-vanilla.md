---
title: Hide Vanilla HUD Pièces
slug: hud-maker-vanilla
order: 112
description: Contrôlez les cœurs par défaut, l'expérience, la barre de raccourcis et les mod HUD pris en charge lors de l'ajout de remplacements.
product: core
category: HUD Maker
section: hud-maker
status: Guide
version: 0.3.1
audience: Créateurs de HUD
translationSource: en
translationMethod: assisted
---

## Empêcher deux écrans de santé de se chevaucher

L’ajout d’une barre de santé personnalisée ne masque pas automatiquement le cœur de Minecraft. Développez **HUD Maker → Inspector → Vanilla HUD Guide** pour contrôler l'affichage par défaut séparément.

![Commutateurs visibles pour la santé, la nourriture, l'XP, la barre chaude et d'autres parties de vanille HUD.](assets/media/guides/drm-031-forge1201/forge-hud-guide.png "DRM 0.3.1 / Forge 1.20.1. Ces commutateurs lisent actuellement Visible. Ils contrôlent MinecraftL’existant HUD; Ajouté HUD Types sur la gauche contient DRMLes additions.")

1. Sauvegardez [ votre nouveau HUD](#core/hud-maker) et vérifiez qu'il apparaît réellement.
2. Développez **Vanilla HUD Guide → HUD Guide +**.
3. Éteignez le commutateur **Visible** correspondant. Commencez par **HP Health** pour remplacer les cœurs seuls.
4. Enregistrez, activez et inspectez l'écran du lecteur. Sur l'artefact Forge 0.3.1 coché, une erreur d'activation signifie que cette étape ne s'est pas terminée ; voir [la limitation](#core/hud-maker).

| Étiquette | Affichage par défaut |
| --- | --- |
| HP Santé / AR Armor / FD Food / O2 Air | Cœurs, armure, faim et air |
| XP XP Bar / LV Level | Expérience bar et niveau |
| HB Hotbar / + Crosshair / BB Bossbar | Hotbar, crosshair et barre de patron |

Cacher des cœurs ne crée pas une barre de remplacement. Laissez l'original visible pendant la construction d'un remplacement qui n'a pas encore été vérifié.

## Mod HUD pris en charge

**Mod HUD Guide** contrôle les écrans existants des fournisseurs pris en charge. Un bouton de gauche comme **+ Iron’s Mana** crée un nouvel affichage DRM. Définissez si l'ancien écran est visible et où le nouvel écran va séparément.
