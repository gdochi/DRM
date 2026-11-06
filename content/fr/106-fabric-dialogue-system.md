---
title: Créer une conversation PNJ
slug: dialogue-system
order: 70
description: Écrivez un message d'accueil, ajoutez des choix et connectez la conversation à un PNJ.
product: core-fabric
category: Systèmes centraux
section: dialogue-editor
status: Stable
version: 0.3.1
audience: Créateurs de dialogue
tags:
  - dialogue
  - npc
translationSource: en
translationMethod: assisted
---

## Faire une salutation et une réponse

Construire un guide de village: parler ouvre une salutation, «Parlez-moi du village» ouvre une réponse, et «Au revoir» ferme la conversation.

Ces captures montrent **DRM 0.3.1 on NeoForge 1.21.1, in English**. Les captures de l'éditeur utilisent un exemple préparé contenant la salutation et la réponse.

### 1. Ouvrir l'éditeur de conversation

Faites un clic droit sur l'air avec le noyau. Sélectionnez **Dialogue Editor** au milieu, puis **Use Default** à droite. L'exemple par défaut a d'autres nœuds; commencez par sélectionner ** dialogue_1 ** pour votre message d'accueil.

![Sélecteur de l'éditeur DRM avec Dialogue Editor sélectionné et Load, Use Default et Create New boutons sur la droite.](assets/media/guides/drm-031-neo1211/editor-selector.png "Sélectionnez l'outil au milieu, puis choisissez comment commencer sur la droite. Use Default ouvre l'exemple fourni.")

### 2. Écrire ce que dit le PNJ

Sélectionnez ** dialogue_1 / Général ** sur la gauche et ouvrez **Text**. Entrez un message d’accueil en **Dialogue Text**, comme « Bienvenue à Oakridge. Qu’est-ce que tu aimerais savoir ? »

![L'onglet Texte pour dialogue_1, avec le message d'accueil du village dans Dialogue Text.](assets/media/guides/drm-031-neo1211/dialogue-text.png "Texte édite la ligne PNJ pour le nœud sélectionné. Vérifiez son nom sur la gauche afin que vous éditiez le message d'accueil plutôt que de commencer.")

Utilisez ** + Général ** pour ajouter la scène de réponse. Dans **Info → Node name**, entrez `dialogue_reply_1` et cliquez sur **Rename**. Ouvrez **Text** et écrivez la réponse, comme « L’auberge est à côté de la fontaine ».

### 3. Connecter un choix de joueur à la réponse

Retournez à **dialogue_1** et ouvrez **Choices**. Ajoutez un choix avec ** + Choix** si nécessaire. Sélectionnez sa ligne à gauche, puis entrez le libellé du bouton en **Label** à droite.

![L'onglet Choix avec deux choix à gauche, un champ Étiquette à droite et Choice actions ci-dessous.](assets/media/guides/drm-031-neo1211/dialogue-choices.png "L'étiquette est le texte du bouton du joueur. Définissez ce que ce bouton fait en Choice actions en dessous.")

Pour "Parlez-moi du village", ouvrez **Choice actions**, ajoutez une action **Goto** et sélectionnez ** dialogue_reply_1 ** comme destination. Donnez « Au revoir » une action **Close**. Ajoutez également un choix de fermeture au nœud de réponse.

![Choice actions avec une action Goto ciblant dialogue_reply_1.](assets/media/guides/drm-031-neo1211/dialogue-choice-actions.png "Ajoutez l'opération avec + Action, puis choisissez son Type et sa destination. Cela connecte le premier choix au nœud de réponse.")

Lorsque vous réutilisez un choix par défaut, vérifiez ses actions existantes. La modification de l'étiquette seule peut laisser un exemple d'action d'ouverture de boutique ou de navigation attaché.

### 4. Choisir la première scène

Sélectionner **début** et ouvert **Routes**. Définissez la route de salutation **Action** aux **Goto** et ses **Goto** destination à **dialogue_1**. Commencez par une route et pas de conditions.

![L'onglet Routes pour commencer, avec une route Goto pointant vers dialogue_1.](assets/media/guides/drm-031-neo1211/dialogue-start-routes.png "start choisit la scène d'ouverture. Cet exemple entre start, puis dialogue_1.")

### 5. Enregistrer et joindre la conversation

Cliquez sur **Save As** en haut. Remplacez **Save As ID** par un nouveau nom tel que `village_guide`, puis enregistrez. Remplacez le nom d'exemple protégé `default_set`.

![La boîte de dialogue Enregistrer le dialogue Comme avec un champ Save As ID, chemin de stockage et Save As bouton.](assets/media/guides/drm-031-neo1211/dialogue-save-as.png "Remplacez default_set par votre propre nom. Après l'enregistrement, le chemin au-dessus de l'éditeur et le nom défini sur la gauche y changent.")

Si vous avez besoin d'un PNJ en premier, suivez [DNPC configuration](#dochi-npc-core/npc-core-setup). Faites un clic droit avec le noyau, puis utilisez **NPC Apply**:

1. Sélectionnez **Dialogue JSON** sur la gauche.
2. Sélectionnez **village_guide** au milieu. Utilisez **Refresh** si elle est manquante.
3. Appuyez sur **Apply Dialogue** en bas.
4. Vérifiez que **APPLIED JSON → Dialogue** sur la droite maintenant montre **village_guide**.

![NPC Apply après avoir appliqué village_guide, montrant la fonction, les fichiers enregistrés, le nom appliqué et le bouton Apply Dialogue.](assets/media/guides/drm-031-neo1211/npc-apply-result.png "La sélection d'un fichier seul ne l'applique pas. Appuyez sur Apply Dialogue et vérifiez le nom dans le panneau de droite.")

Videz les deux mains, parlez au PNJ, puis vérifiez la salutation, le choix de réponse et le choix de fermeture dans l'ordre.

![La conversation du joueur s'est ouverte en interagissant avec un DNPC nommé guide Oakridge, montrant le message d'accueil et deux choix.](assets/media/guides/drm-031-neo1211/dialogue-npc-player.png "Le résultat du joueur : Dialogue Text devient la ligne PNJ, et chaque Étiquette devient un choix en dessous.")

![Choisir la question sur le village et suivre la conversation vers la réponse.](assets/media/guides/short-videos-20261106/dialogue-branch.mp4 "DRM 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1, interface anglaise. Une conversation préparée montre la liaison Goto.")

Le premier choix ouvre la réponse ci-dessous. Vérifiez cette connexion ainsi que la salutation initiale.

![La réponse après avoir sélectionné Parlez-moi du village, avec les directions à l'auberge et un choix de fermeture.](assets/media/guides/drm-031-neo1211/dialogue-npc-reply.png "Goto ouvre dialogue_reply_1. Donnez à la réponse un moyen de continuer, de revenir ou de fermer aussi.")

## Qu'est-ce qu'un nœud ?

Un **nœud général est une scène de conversation** : une ligne PNJ et les choix du joueur. La connexion d'un choix à un autre nœud ouvre la scène suivante.

**début** choisit la première scène. Il pointe vers un nœud général plutôt que d'afficher sa propre salutation. Chaque ensemble de conversation a un nœud de début.

## Faire des choix faire quelque chose

| Choix | Mesures prises |
| --- | --- |
| Entendre la partie suivante | Aller à un autre nœud |
| Fin de la conversation | Fermer |
| Acheter quelque chose | Ouvrir une boutique : `go_shop` |
| Recueillir une récompense | Donner un article ou une devise |
| Se souvenir des progrès | Ajouter/supprimer un tag |

Une condition ne peut montrer un choix qu'à certains joueurs, comme offrir une récompense après la fin d'une quête. Voir [conditions et actions ](#core-fabric/conditions-actions).

## Développer et réutiliser une conversation

Faites glisser les lignes node/choice pour changer leur ordre. Sélectionnez plusieurs nœuds avec Maj+clic ou en faisant glisser et utilisez **Copy / Paste**. Utilisez **Duplicate** pour copier un ensemble entier.

Pour un choix de magasin, créez d'abord le [boutique](#core-fabric/shop-system) et sélectionnez-le dans l'action.

## Changer la fenêtre

Écrivez le contenu ici et concevez la fenêtre en [GUI Maker](#core-fabric/gui-system). Vous pouvez terminer la conversation avec la mise en page par défaut et la personnaliser plus tard.

Les ensembles enregistrés sont en `config/dochi_rpg_maker/dialogue_sets/<set name>/`. Copiez tout le dossier set lorsque vous le déplacez vers un autre serveur.
