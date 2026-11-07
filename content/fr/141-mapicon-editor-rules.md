---
title: Édition d'icônes et priorité
slug: mapicon-editor-rules
order: 1410
description: Tapez les valeurs par défaut, les exceptions JSON, les remplacements par PNJ et le comportement d'enregistrement/application.
product: dochi-mapicon-integration
category: Création d'icônes
section: editor
status: Guide d'utilisation
version: 0.1.3
audience: Créateurs PNJ
translationSource: en
translationMethod: assisted
---

## Par défaut par type JSON

Sélectionnez **Type defaults** sur la gauche, puis choisissez **NPC**, **Dialogue JSON**, **NPC Shop JSON** ou une autre catégorie au milieu. Modifier l'image, la taille, la teinte et la visibilité de la carte en **Icon settings** à droite. Vérifiez son apparence en **Icon preview** en dessous de la liste du milieu.

![MapIcon est le type par défaut avec PNJ sélectionné au milieu et image, taille, teinte, minicarte et paramètres de carte du monde sur la droite.](assets/media/guides/mapicon-012-neo1211/type-defaults.png "MapIcon 0.1.2 le NeoForge 1.21.1. Pour modifier les icônes de la boutique, sélectionnez NPC Shop JSON au milieu, puis modifiez ses paramètres à droite.")

**NPC** est l'icône PNJ de base. Les catégories dialogue, boutique et téléporteur ci-dessous choisissent des icônes pour les fonctions appliquées aux PNJ. Cobblemon Éditeur ajoute des cibles telles que Dresseur, Pokémon Lui-même, PokéMart, Nurse Joy et Starter Selector.

**Type Default Icons** donne aux PNJ une icône basée sur JSON appliqué même sans règle d'exception. Les valeurs par défaut PNJ et les valeurs par défaut de type individuel sont enregistrées indépendamment. Les fichiers de présentation et de planification ne sont pas des cibles NPC Apply et n'apparaissent pas dans cette liste.

## Image, couleur et affichage

| Réglage | Options |
| --- | --- |
| Image | Recherche d'icônes groupées, recherche d'images externes ou ID de ressource directe |
| Taille | 8–64 |
| Tint | Spectre, saturation/luminosité, HEX et RGB avec un aperçu en direct |
| Carte | Minicarte indépendante et affichage de la carte du monde |
| Nom | Afficher ou masquer le nom du PNJ sur la carte |

**Choose Icon** ouvre une liste consultable avec des aperçus et des noms PNG. La bibliothèque groupée contient 1,476 Nikoichu CC0 1-bit Pixel Icons et un filtre RPG. Tint modifie le rendu de la carte, laissant la source PNG intacte.

## Exceptions et priorité à la visibilité

Les règles correspondent au type JSON et au chemin d'accès au fichier. Un chemin vide correspond à chaque fichier de ce type. La règle de correspondance la plus prioritaire gagne ; les liens utilisent la première règle de correspondance par ordre de liste.

1. Global OFF ou per-NPC Hide supprime l'icône.
2. Une règle de correspondance désactivée le cache. Per-NPC Show peut remplacer OFF de cette règle, mais ne peut pas remplacer OFF global.
3. La sélection d'image utilise le style par NPC → règle de correspondance → type par défaut → NPC par défaut.
4. DRM Les conditions de visibilité des PNJ s'appliquent également : un PNJ caché d'un joueur reste caché sur la carte de ce joueur.

Ajoutez, dupliquez, supprimez et recherchez des règles, puis sélectionnez les fichiers JSON réels dans le sélecteur de fichiers. **Apply Type Icon** remplace l'image d'une règle existante par l'icône de type.

![Une nouvelle règle NPC Shop dans JSON Rules.](assets/media/guides/mapicon-012-neo1211/mapicon-rule-added.png "MapIcon 0.1.2 / NeoForge 1.21.1. Après Ajouter une règle, choisissez NPC Shop JSON comme type de source DRM. Un fichier vide JSON correspond à tous les fichiers de ce type. Pour un magasin, choisissez son fichier avec la loupe, définissez Priority et save.")

## Remplacer un PNJ

Ouvrez **Addons → Map icon** dans l'éditeur DNPC. L'écran individuel n'a que **Selected NPC**. Utilisez **Icon** pour l'afficher ou le cacher, choisissez sa propre image, sa taille, sa teinte et ses commutateurs de carte, puis **Save**. Attendre **Settings saved** en bas.

![L'éditeur individuel après avoir enregistré une icône de PNJ.](assets/media/guides/mapicon-012-neo1211/mapicon-npc-saved.png "MapIcon 0.1.2 / DNPC 0.1.3 / NeoForge 1.21.1. Cet écran PNJ n'a pas de Type par défaut ou de Règles JSON. Sa sauvegarde est séparée de la sauvegarde du profil serveur de l'éditeur complet.")

Un commutateur d'icônes ne contourne pas les conditions de visibilité du Core PNJ pour ce joueur. Comparez le résultat en utilisant l'exemple [actual minimap](#dochi-mapicon-integration/mapicon-setup).

## Enregistrer et appliquer

Load ouvre un profil pour l'édition sans changer de stratégie de serveur. **Save & Apply**, Enregistrer et Save As enregistrer le profil et l'activer. Le fichier bas **Active** signale le profil confirmé par le serveur. Mods Config bascule mettre à jour l'affichage immédiatement; appuyez sur **Apply** pour les enregistrer sur le serveur.

MapIcon 0.1.3 vérifie le PNJ sélectionné avant d'enregistrer un profil serveur. L'éditeur complet et l'éditeur individuel refusent les modifications obsolètes du PNJ ; un enregistrement refusé laisse intacts le profil et les paramètres actuels du PNJ sur le serveur. Notez les modifications à conserver, utilisez **Reload saved settings**, puis réappliquez-les. Le rechargement abandonne les modifications non enregistrées.

Voir [fichiers et dépannage](#dochi-mapicon-integration/mapicon-files-operations) pour les chemins de texture et les limites d'affichage.
