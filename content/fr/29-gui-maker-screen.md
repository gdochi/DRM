---
title: Organiser et enregistrer une interface graphique
slug: gui-maker-screen
order: 101
description: Sélectionnez un type d'écran, déplacez ses pièces et enregistrez une mise en page réutilisable.
product: core
category: GUI Maker
section: gui-maker
status: Guide
version: 0.3.1
audience: Créateurs d'interface graphique
translationSource: en
translationMethod: assisted
---

## Déplacer une partie de la fenêtre

Ouvrez la mise en page prévue en [GUI Maker](#core/gui-system), cliquez sur un élément de canevas et modifiez ses propriétés à droite. Utilisez **X / Y** pour la position et **W / H** pour la taille. **Layer # / Layer − / Layer +** contrôle l'élément qui se chevauche devant.

![Élément Texte sélectionné et son Inspecteur.](assets/media/guides/drm-031-forge1201/gui-text.png "DRM 0.3.1 / Forge 1.20.1. Sélectionnez sur le canevas, puis modifiez l'élément correspondant à droite. Le texte ici peut être une décoration; les lignes de dialogue réelles proviennent de Dialogue Editor.")

| Zone | Utilisation |
| --- | --- |
| Barre | Nouveau, charger, enregistrer, Save As et réinitialiser |
| Sélecteur de type | Choisissez ce que la mise en page affichera |
| Outils | Ajouter des composants pris en charge par ce type |
| Tableau / Screen Editor | Sélectionner, faire glisser, redimensionner et inspecter les chevauchements |
| Inspecteur | Position, taille, couleurs, texte, images et rôles de données |

Canevas exemple de dialogue, les produits et les montants aident au placement. Les données réelles du joueur proviennent du dialogue connecté, de la boutique ou de la devise. La transparence de l'arrière-plan et le style hérité sont des paramètres distincts ; ne remplacez que les éléments que vous souhaitez modifier.

## Choisissez d'abord le type d'écran

| Type | Écran |
| --- | --- |
| dialogue | Conversation PNJ |
| npc_shop | Achat et rachat |
| currency_hud | Monnaie HUD layout |
| remnant_msg | Reste du message |

D'autres profils de mise en page tels que `player_status`, `custom_hud` et `generic` peuvent être utilisés par les outils connectés. Pour un dialogue normal ou une boutique, sélectionnez son type correspondant. Un composant de choix a besoin de données de dialogue; le placer dans un autre type ne crée pas de conversation.

## Sauvegarder et connecter la mise en page

**Create New** commence un brouillon pour le type courant. **Load** liste les mises en page enregistrées. **Save** Il écrit le fichier existant ; **Save As** il lui donne un autre nom. **Reset** restaure la disposition par défaut du type.

Utilisez **Save As** pour un défaut personnalisé. Dispositions régulières vivent sous `config/dochi_rpg_maker/gui/`; monnaie HUDs peuvent utiliser le magasin HUD-set. Sélectionnez le fichier enregistré dans la fonctionnalité qui l'utilise, puis rouvrez l'écran du lecteur réel.

Pour les pièces que chaque type peut afficher, voir [Composants GUI](#core/gui-maker-components). Pour les images et l'importation d'une PNG, voir [assets](#core/assets-models).
