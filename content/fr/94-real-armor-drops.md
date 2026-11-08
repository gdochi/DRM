---
title: Configurer les drops d'armure dans la GUI
slug: dochi-real-armor-drops
order: 915
description: Choisissez objets, probabilités et quantités par armure dans Armor Drop Editor, puis enregistrez et appliquez un ensemble.
product: dochi-real-armor
category: Drops d'objets
section: drops
status: Stable
version: 0.1.5
audience: Administrateurs de serveurs et auteurs de modpacks
tags:
  - armor
  - drops
  - editor
translationSource: en
translationMethod: assisted
---

## Quand les objets tombent-ils ?

Utilisez **Armor Drop Editor** de Real Armor 0.1.5 pour choisir les objets lâchés par chaque armure. Le tirage se produit lorsqu'un PNJ reçoit un coup et que **l'armure perd réellement de la durabilité**, y compris au dernier coup qui la casse. Les objets peuvent tomber alors que le PNJ est encore vivant.

Au départ, aucune règle ni aucun ensemble n'est actif. Dans les [paramètres d'armure](#dochi-real-armor/dochi-real-armor-setup), activez **Enable armor calculation**, votre intégration PNJ et **Damage armor items**, puis équipez le PNJ. DRM est facultatif ; Real Armor fournit son propre éditeur.

## Créer un premier drop dans la GUI

Cet exemple lâche **1–3 Iron Nuggets avec une probabilité de 100% lorsqu'un Iron Chestplate est endommagé**.

1. Rejoignez un monde et ouvrez **Config → Armor Drop Editor** de Real Armor. Avec DRM installé, vous pouvez aussi choisir **Armor Drop Editor** dans le sélecteur partagé. L'édition multijoueur exige le niveau de permission 2.
2. Choisissez **Create New** pour un nouveau brouillon. **Use Default** démarre aussi vide ; **Load Existing** ouvre un ensemble enregistré.
3. À gauche, choisissez **Armor rules → Add**, recherchez et sélectionnez **Iron Chestplate**, puis appuyez sur **Apply** dans le sélecteur d'objets.
4. Au centre, choisissez **Drop items → Add**, recherchez et sélectionnez **Iron Nugget**, puis appuyez sur **Apply** dans le sélecteur.
5. Dans l'onglet **Drop** à droite, activez **Enable drop**, réglez **Drop chance (%)** sur **100**, **Minimum quantity** sur **1** et **Maximum quantity** sur **3**. Gardez **Enable rule** activé dans l'onglet **Armor**.
6. Utilisez **Save As**, nommez l'ensemble **iron_salvage** et appuyez sur **Save**. Attendez la confirmation du serveur.
7. Appuyez sur **Apply** dans l'éditeur pour activer l'ensemble. Vérifiez en haut les noms de l'ensemble édité et de l'ensemble appliqué.

![Parcours réel de la GUI Real Armor : ajouter Iron Chestplate et Iron Nugget, saisir probabilité et quantité, puis utiliser Save As et Apply.](assets/media/guides/armor-drops-015-20261108/armor-drop-editor.mp4 "Exemple de GUI dans Real Armor 0.1.5 / NeoForge 1.21.1. Confirmez chaque objet avec Apply dans le sélecteur, enregistrez avec Save As → Save, puis activez l'ensemble dans le monde avec Apply dans l'éditeur.")

Le sélecteur propose **All items**, les catégories créatives et **Player inv**. Utilisez **Player inv** pour un objet avec un nom personnalisé, des enchantements ou d'autres données. La sélection copie les données sans consommer ni déplacer la pile d'origine. **Cancel** annule cette sélection.

Le panneau gauche contient les règles d'armure ; la partie centrale inférieure affiche **Item / Chance / Quantity** ; le panneau droit modifie l'entrée sélectionnée. Le porte-armure central est un aperçu statique et ne génère aucun objet dans le monde.

## Choisir probabilités et quantités

| Paramètre | Comportement |
| --- | --- |
| Drop chance (%) | Probabilité par objet de 0–100%. Zéro ne lâche jamais ; 100 réussit toujours |
| Minimum / Maximum quantity | En cas de succès, choisit uniformément un entier entre les limites. Chacune va de 1–64 ; minimum ≤ maximum |
| Enable rule / Enable drop | Active ou désactive une règle entière ou une entrée de drop |
| Horizontal spread / Upward speed | Dispersion horizontale et vitesse verticale des objets, chacune de 0–2 |

Chaque drop actif est tiré **indépendamment**. Avec Iron Nuggets à 100% et Emeralds à 25%, les pépites tombent à chaque fois et les émeraudes ont leur propre tirage à 25%. La somme ne doit pas nécessairement être de 100%. Une règle accepte jusqu'à 16 entrées.

Perdre plusieurs points de durabilité en un coup ne produit toujours qu'un tirage par entrée et pièce endommagée. Si plusieurs pièces perdent de la durabilité, chacune est évaluée séparément. Le serveur génère des objets récupérables près de l'emplacement touché et divise les quantités selon la limite native de pile de chaque objet.

## Distinguer enregistrer, charger et appliquer

| Action | Résultat |
| --- | --- |
| Save / Save As | Enregistre un ensemble nommé et conserve les règles actives du monde |
| Load / Load Existing | Ouvre un ensemble enregistré comme brouillon sans l'activer |
| Apply | Remplace toutes les règles actives du monde par l'ensemble enregistré |
| Unapply | Désactive l'ensemble actif et conserve les ensembles enregistrés et le brouillon |

**Un seul ensemble peut être actif par monde.** En appliquer un autre remplace les règles précédentes sans les fusionner. Enregistrer sous le nom actif conserve aussi **le contenu précédemment appliqué jusqu'au prochain Apply**. Enregistrez les modifications du brouillon avant de l'appliquer.

La sélection active ou l'état désactivé persiste après redémarrage du serveur. Les refus de permission, valeurs invalides, conflits d'édition et erreurs d'enregistrement conservent les règles précédentes. Lisez le message d'état et rechargez l'état actuel du serveur avant de réviser le brouillon.

## Stockage et dépannage

Les fichiers appartiennent au **monde actuel du serveur**. Exemple en solo :

```text
saves/<world>/serverconfig/dochi_real_armor/
  armor_drops.json
  armor_drop_presets/
    iron_salvage.json
```

Sur un serveur dédié, la même structure se trouve dans le dossier du monde du serveur. Les noms utilisent 1–64 lettres ASCII, chiffres, traits de soulignement ou tirets. La sérialisation des données dépend de la version Minecraft ; vérifiez la compatibilité avant de déplacer des ensembles entre versions.

| Symptôme | Vérification |
| --- | --- |
| Enregistré, mais aucun drop | Vérifiez Apply dans l'éditeur, le nom de l'ensemble appliqué, les interrupteurs règle/drop et l'armure réellement équipée |
| Les coups ne produisent aucun drop | Activez l'usure et confirmez la baisse de durabilité. Un équipement incassable ou des dégâts ignorant l'armure peuvent ne pas remplir la condition |
| Apply indisponible | Enregistrez d'abord le brouillon et attendez la confirmation du serveur |
| Édition en lecture seule | Vérifiez connexion au monde, permissions OP, réponse du serveur et prise en charge de l'application explicite des ensembles |
| Aucun objet dans l'aperçu | L'aperçu est statique. Les drops réels sont générés sur le serveur lors de la perte de durabilité |

Les accessoires Curios utilisent leur propre gestion de durabilité. Ne les traitez pas comme cibles de drops d'armure de cette fonction.
