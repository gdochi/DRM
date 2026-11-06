---
title: Remnant Msg
slug: remnant-msg
order: 87
description: Comment configurer les documents de message, les stratégies et afficher l'interface graphique en Remnant Msg Éditeur.
product: core-fabric
category: Systèmes centraux
section: remnant-msg
status: Stable
version: 0.3.1
audience: Créateurs / Opérateurs
tags:
  - remnant
  - message
translationSource: en
translationMethod: assisted
---

## Laissez un message dans le monde

![Placer un marqueur avec Remnant Setter, enregistrer son texte et ouvrir le message.](assets/media/guides/short-videos-color-20261106/remnant-place-and-read.mp4 "Capture réelle : DRM 0.3.1 / NeoForge 1.21.1, interface anglaise. Placer → écrire → Save → lire. Le texte enregistré sur le serveur et l'écran de lecture ont été vérifiés.")

La vidéo montre l'option simple pour **écrire directement** : faites un clic droit sur une face de bloc avec le setter, saisissez le texte et choisissez **Save**. Les étapes suivantes expliquent comment lier un message JSON enregistré.

Utilisez **Remnant Msg Editor** pour un message attaché à un endroit sans PNJ. Ouvrez-le à partir du sélecteur d'éditeur du noyau et écrivez son nom et son texte sous **Message**. Ces écrans anglais sont de **DRM 0.3.1 / NeoForge 1.21.1**.

![Remnant Msg Page Message de l'éditeur, avec navigation de la page à gauche et paramètres de message à droite.](assets/media/guides/drm-031-neo1211/remnant-editor.png "Écrivez d'abord le texte sous Message. Le message enregistré et son marqueur mondial placé sont des étapes distinctes.")

1. Ecrivez le texte sous **Message** et sauvegardez votre copie avec **Save As**.
2. Cliquez avec le bouton droit sur une face de bloc avec le passeur de reste pour placer un marqueur. L'enregistrement du fichier de message seul ne le place pas dans le monde.
3. Sélectionnez le message enregistré dans le marqueur. Utilisez **World List** pour trouver, modifier ou téléporter vers des marqueurs existants.
4. Utilisez le marqueur comme un joueur et vérifiez le texte affiché. Configurez les conditions ci-dessous si l'accès doit être restreint.

### Interaction et visionnement ont des conditions distinctes

**Interact Conditions** contrôle l'utilisation du marqueur; **View Conditions** contrôle l'affichage du message. **View Actions** Les actions sont exécutées après visualisation. Un simple avis n'a pas besoin de toutes les conditions et actions configurées.

![Afficher les conditions avec Enable, AND mode, Add et une liste de conditions vide.](assets/media/guides/drm-031-neo1211/remnant-view-conditions.png "Ajoutez la condition souhaitée et cochez Activer. Cette capture d'écran n'a pas encore de conditions configurées.")

## Connexions à d'autres outils

Remnant Msg gère les messages d'interaction placés dans le monde séparément des nœuds de dialogue PNJ. Les documents de message, les stratégies, l'interface graphique d'affichage, les blocs/entités de marqueur et l'élément de réglage fonctionnent ensemble.

DRM Core installe une interface graphique par défaut Remnant Msg ainsi que des exemples de messages et de fichiers de stratégie en tant que contenu par défaut.

## Stockage

Remnant Msg fichiers utilisent ces chemins.

| Données | Chemin |
| --- | --- |
| Messages | `config/dochi_rpg_maker/remnant_msg/messages` |
| Politiques | `config/dochi_rpg_maker/remnant_msg/policies` |
| GUI par défaut | `config/dochi_rpg_maker/gui/default_remnant_msg_gui.json` |

L'affichage utilise le profil de mise en page GUI Maker `remnant_msg`.

## Workflow de base

1. Cliquez avec le bouton droit sur l'élément `Dochi RPG Maker Core`.
2. Ouvrir `Remnant Msg Editor`.
3. Créez ou modifiez le document de message.
4. Configurer les règles ou stratégies de sortie.
5. Si un affichage personnalisé est nécessaire, modifiez une interface graphique `remnant_msg` dans GUI Maker.
6. Enregistrez et rechargez les données du serveur.

## Messages, politiques et interface graphique

| Type | Rôle |
| --- | --- |
| Message | Unité de texte et de message réelle. |
| Politique | Règle pour quand et comment un message apparaît. |
| GUI | Disposition qui contrôle la façon dont le message est affiché. |

Séparer le contenu de l'affichage facilite la réutilisation d'une interface graphique entre plusieurs stratégies ou la connexion d'un message à différents styles d'affichage.

Les documents de message prennent en charge `message`, à distance `messageStyles`, les conditions d'interaction et de vue séparées, `messageActions` et `messageTrigger`. Utilisez `every_view` pour exécuter des actions activées sur chaque vue ou `once_per_player` pour une exécution par joueur.

## Setter et liste mondiale

| Mesures prises | Résultat |
| --- | --- |
| Faites un clic droit sur un bloc avec `remnant_msg_setter` | Placez un marqueur face à cette surface. |
| Faites un clic droit | Ouvre la liste des marqueurs mondiaux. |
| Cliquez avec le bouton droit sur un bloc | Ouvre la liste sans placer de marqueur. |

Le paged `World List` fournit `Edit`, `Teleport`, `Delete`et `Refresh`. Les champs de stratégie déterminent si un utilisateur général peut utiliser le flux, écrire du texte incorporé, sélectionner JSON, utiliser des déclencheurs ou consommer le setter. L'exécution vérifie les conditions d'interaction/de visualisation et exécute les actions activées conformément à `messageTrigger`.

Dans 0.1.8, les sélecteurs de message et de stratégie recherchent les listes JSON du serveur. L'apparence d'un marqueur peut être `Default`, `Item` ou `Block` ; les choix d'éléments/blocs recherchent des noms, des espaces de noms et des identifiants localisés. `Scale` accepte `0.05` à `16.0`. Les modes d'affichage sont `fixed`, `vertical`, `horizontal` et `center`. L'apparence des objets prend en charge `none`, les transformations à la première/troisième personne, `head`, `gui`, `ground` et `fixed`. Le serveur valide ces paramètres et les persiste avec marqueur données enregistrées et l'entité d'affichage.

La stratégie groupée permet une utilisation générale et une écriture directe, mais réserve JSON et les déclencheurs aux administrateurs. Par défaut, il n'y a pas de consommation de setter, durée de vie illimitée du marqueur et limite des messages de 4096 caractères. Les fichiers de stratégie existants ne sont pas écrasés pendant les mises à jour.

## Connexion GUI

Remnant Msg Les fichiers GUI vivent dans le même stockage `gui` que les fichiers GUI de dialogue et de magasin, mais les `guiType` et les composants sont différents. Le fichier par défaut est `default_remnant_msg_gui.json` ; créez une copie au lieu de modifier directement la valeur par défaut protégée.

Les valeurs de prévisualisation en GUI Maker peuvent différer des valeurs d'exécution. La sortie d'exécution provient du document Remnant Msg et des données de politique.

## Liste récapitulative

| Symptôme | Vérifier |
| --- | --- |
| Le message n'apparaît pas | Fichier de message, fichier de stratégie et serveur de rechargement. |
| GUI est cassé | `guiType`, ID de composant et chemin d'accès GUI par défaut. |
| Un message erroné apparaît | Identifiant de message référencé par la politique. |
| La position est erronée | Indique si l'interface graphique a été ouverte avec le profil `remnant_msg`. |

## 0.2.8 Marqueurs et déclencheurs une fois par joueur

Les marqueurs cachés et l'état de déclenchement persistant par joueur sont pris en charge. La visibilité du marqueur et l’historique d’exécution de chaque joueur sont séparés. Testez un nouveau joueur, un joueur qui l'a déjà déclenché, et reconnectez votre comportement. Sauvegardez les messages personnalisés, les politiques et le monde ensemble.
