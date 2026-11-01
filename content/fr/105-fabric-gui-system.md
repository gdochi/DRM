---
title: Personnaliser les écrans de dialogue et de boutique
slug: gui-system
order: 60
description: Copiez une mise en page par défaut et organisez le texte, les images et les boutons en GUI Maker.
product: core-fabric
category: Systèmes centraux
section: gui-maker
status: Stable
version: 0.3.1
audience: Créateurs d'interface graphique
tags:
  - gui
  - layout
translationSource: en
translationMethod: assisted
---

## Créez votre propre écran par défaut

1. Faites un clic droit sur l'air avec le noyau et ouvrez **GUI Maker**.
2. Choisissez le type d'écran et chargez une valeur par défaut : **dialogue** pour les conversations ou **npc_shop** pour les magasins.
3. Sélectionnez des éléments sur le canevas et changez la position, la taille et les couleurs.
4. Utilisez **Save As** pour enregistrer votre mise en page.
5. Sélectionnez ce fichier dans la boîte de dialogue ou les paramètres de l'interface graphique de la boutique.
6. Interagissez avec le PNJ pour voir l'écran face au joueur.

Prévisualiser le texte et les produits vous aider à organiser la mise en page. Écrivez le dialogue réel en Dialogue Editor et définissez les produits/prix en NPC Shop.

![GUI Maker avec Outils à gauche, Toile au milieu et la position et la taille de l'élément sélectionné dans Inspecteur à droite.](assets/media/guides/drm-031-neo1211/gui-maker.png "DRM 0.3.1 le NeoForge 1.21.1. Ajoutez des éléments à gauche, sélectionnez-les sur le canevas, puis modifiez-les dans Inspecteur.")

La disposition de conversation par défaut contient déjà des zones de dialogue et de choix. Conservez-les pendant le démarrage et sélectionnez l'élément que vous souhaitez modifier. **X / Y** définit la position, **W / H** définit la largeur et la hauteur, et **Layer #** définit l'ordre de dessin. Utilisez **Preview** en haut pour vérifier le résultat.

## Choisissez un élément

| Ce que vous voulez | Élément |
| --- | --- |
| Dialogue PNJ | **Dialog** |
| Choix des joueurs | **Choice** |
| Votre propre texte ou le nom du PNJ | **Text** |
| Un fond ou une section | **Panel** |
| Un logo ou une image | **Image** |
| L'apparence du PNJ | **Entity** |
| Magasiner les produits | **Item Slot** |
| Boutons d'achat/vente | **Shop Action Button** |
| Affichage de l'argent | **Currency Display** |

Utilisez des éléments fonctionnels, tels que des produits pour la boutique et des boutons de transaction, avec leur type d'écran correspondant.

## Ajouter des noms et des étiquettes

Ajoutez **Text** à une mise en page de dialogue et choisissez **Content**.

![Une zone de texte ajoutée avec + Texte, avec le contenu, la saisie directe, le texte et les paramètres de clé de traduction dans Inspecteur.](assets/media/guides/drm-031-neo1211/gui-text.png "Utilisez + Texte pour une étiquette séparée. Le contenu choisit entre une étiquette fixe et le nom du PNJ actuel.")

- **Direct input:** Entrez une étiquette fixe, comme « Forgeron ».
- **NPC name:** affiche le nom du partenaire de conversation actuel.

Pour votre propre formulation, entrez-le dans **Text** et changez **Translation Key** en **Literal Text** si nécessaire. Utilisez la clé de traduction pour un nom enregistré dans un fichier de langue.

Ajoutez plusieurs zones de texte pour les étiquettes séparées. Chacun a sa propre position, taille, remplissage et bordure.

## Répéter ou redimensionner une image

Sélectionnez une image et choisissez **Fit**. **Stretch** remplit sa surface, **Contain** garde les proportions de l'image, et **Tile** la répète.

Pour Tile, **Tile W % / H %** contrôle la taille de chaque image répétée : par défaut 100%, plage 10–800%, séparément pour la largeur et la hauteur. La largeur/hauteur de l'élément contrôle toute la zone qu'il couvre.

**Default UI Settings → Sprite Scale %** change la taille du panneau/bouton : par défaut 100%, plage 50–400%. Il ne redimensionne pas les outils de l'éditeur.

## La mise en page enregistrée ne s'affiche pas

Vérifiez que votre dialogue ou boutique sélectionne l'interface graphique enregistrée. L'enregistrement d'une mise en page seule ne remplace pas un écran existant.

Les mises en page sont stockées en `config/dochi_rpg_maker/gui/`. Utilisez la référence [JSON ](#core-fabric/json-reference) lorsque vous modifiez des fichiers directement.
