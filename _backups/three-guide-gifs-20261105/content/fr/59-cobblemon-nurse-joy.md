---
title: Lier la joie infirmière à une machine de guérison
slug: cobblemon-nurse-joy
order: 550
description: Écrivez une salutation de guérison, appliquez le rôle de PNJ et connectez sa machine de guérison Cobblemon.
product: drm-cobblemon-editor
category: PNJ de service
section: services
status: Projet
version: Fabric / NeoForge 0.2.9
audience: Créateurs de PNJ et opérateurs de serveur
tags:
  - nurse-joy
  - healer
  - dialogue
translationSource: en
translationMethod: assisted
---

## Faire un PNJ qui soigne l'équipe

Après qu'un joueur demande un traitement, le PNJ marche vers sa machine de guérison liée Cobblemon, guérit l'équipe et revient. Appliquez le rôle à un DNPC ou un CustomNPCs PNJ sur **Minecraft 1.21.1, Fabric or NeoForge**.

![Nom de l'infirmière Joy, distance, dialogue et étiquettes de traitement/fermeture.](assets/media/guides/cobble-029-neo1211/cobble-nurse.png "Cobblemon Éditeur 0.2.9 / NeoForge 1.21.1, interface utilisateur anglaise. Aucun PNJ n'est sélectionné ici ; enregistrez et appliquez le profil avant de lier une machine.")

1. Ouvrez **Nurse Joy Editor → Use Default** à partir de la liste des éditeurs DRM.
2. Définissez **Display Name** pour pouvoir reconnaître ce profil.
3. Ecrivez le message d'accueil sous **Dialogue Text** et les deux choix sous **Treatment Choice Text / Close Choice Text**.
4. **Save As** un fichier d'utilisateur tel que `custom/village_healer.json`.
5. Ouvrez le PNJ prévu avec le DRM Core et **Apply** ce fichier à **Nurse Joy**.
6. Connectez une machine en suivant les étapes ci-dessous. L'enregistrement du profil ne lie pas une machine.

Le traitement et les actions proches ont un comportement et un ordre fixes. Renommer un choix ne le transforme pas en bouton de récompense. Utilisation [DRM dialogue](#core-fabric/dialogue-system) pour des branches générales ou des récompenses.

![Chemin d'accès utilisateur et statut enregistré après Save As.](assets/media/guides/cobble-029-neo1211/cobble-nurse-save.png "Le chemin d'exemple enregistré par Save As. La création du fichier et l'application du rôle PNJ sont des étapes distinctes.")

## Relier la machine de guérison

1. Dans l’éditeur du PNJ appliqué, choisissez **Link Machine**.
2. En **60 secondes**, **Shift+right-click** une Cobblemon machine de guérison dans la même dimension.
3. Gardez-le dans **Max Distance**, de 1 à 16 blocs; cet exemple utilise 16.
4. Laissez le sol et l'espace sûrs à côté de la machine pour que le PNJ se tienne debout et revienne.
5. Interagissez avec le PNJ les deux mains vides et choisissez un traitement.

Une machine liée est utilisée par l'infirmière Joy. Conservez une machine séparée pour un usage public direct. Deux PNJ de Nurse Joy ne peuvent pas posséder la même machine ; la casser supprime le lien.

## Mettre à jour le dialogue ou changer les machines

**Save to the same referenced file** pour mettre à jour le libellé ou la distance pour la prochaine interaction. Appliquer à nouveau après avoir enregistré sous un autre nom. Les liens machine appartiennent à des PNJ individuels : l'application d'un profil partagé ne partage pas son lien machine.

| Problème | Vérifier |
| --- | --- |
| Un autre dialogue ou boutique s’ouvre | Utilisez la main vide **Shift+right-click** pour accéder à Nurse Joy. |
| La demande de lien a expiré | Choisissez Link Machine à nouveau et liez dans les 60 secondes. |
| Le PNJ ne peut pas atteindre la machine | Même dimension, distance autorisée, sol sûr et un espace adjacent libre. |
| Le traitement ne commencera pas | Joueur dans les blocs 12, pas de bataille active et une machine chargée/utilisable. Attendez tout traitement déjà en cours. |
| L'ancienne formulation reste | Enregistrez le chemin réellement appliqué au PNJ. |

Les profils sont en dessous de `config/dochi_rpg_maker/cobblemon/nurse_joy/`. Gardez le monde aussi lors du déplacement d'un serveur: le lien machine du PNJ est des données du monde.
