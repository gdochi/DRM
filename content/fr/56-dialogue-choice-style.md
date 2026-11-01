---
title: Choix du texte et du pouls
slug: dialogue-choice-style
order: 63
description: Taillez les choix de dialogue et mettez en surbrillance une réponse lorsqu'elle apparaît.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Stable
version: 0.3.1
audience: Créateurs de dialogue
tags:
  - dialogue
  - choice
translationSource: en
translationMethod: assisted
---

## Modifier la taille du texte de choix

Ouvrez la section **Choices** d'un nœud de dialogue. **Choice text px (0 = GUI)** définit la taille du texte de choix pour ce nœud. Une valeur de **0** utilise le paramètre de l'interface graphique liée ; une valeur positive l'emporte.

Pour une apparence partagée, ouvrez la disposition des dialogues en **GUI Maker**, sélectionnez son composant **Choice** et ajustez **Text size (px)**. Les tailles de texte disponibles sont 6–32 pixels GUI. Ce sont des unités GUI Minecraft, donc la taille à l'écran dépend également de l'échelle GUI.

![Les choix avec la taille du texte 0 et la surbrillance de Pulse sont désactivés pour la ligne sélectionnée.](assets/media/guides/drm-031-forge1201/dialogue-choices.png "DRM 0.3.1 / Forge 1.20.1. La taille du texte 0 suit l'interface graphique. La surbrillance du pouls s'applique au choix sélectionné à gauche.")


## Rendre les réponses longues

Utilisez la largeur automatique des boutons lorsque les réponses ont des longueurs différentes. DRM mesure le texte affiché, y compris les traductions en paquet de ressources, et utilise la largeur disponible avant l'emballage. Une réponse longue peut atteindre la largeur intérieure de la zone de choix; les réponses courtes gardent une largeur compacte.

Si le texte a encore besoin de plus d'une ligne, le bouton se développe verticalement. Une liste de choix bondée peut être défilée. Pour les boutons compacts, utilisez une hauteur minimale automatique de **0**. La valeur par défaut ajoute environ **5 pixels GUI au-dessus et au-dessous du texte**. Une hauteur minimale plus grande que vous vous fixez s'applique toujours.

Pour utiliser des traductions de ressources, marquez l'étiquette comme une clé de traduction et fournissez cette clé dans votre fichier de langue. Les mots traduits sont ce qui compte lors du calcul de la taille du bouton.

## Mettre en surbrillance un choix avec une impulsion

1. Ouvrez **Dialogue Editor → Choices** et sélectionnez une réponse.
2. Allumez **Pulse highlight**.
3. Définissez les contrôles suivants.

| Contrôle | Signification |
| --- | --- |
| Total des tiques | Temps total pour toutes les impulsions. 20 C’est une seconde. |
| Nombre de pulsations | Nombre de cycles d'éclaircissement et de décoloration au cours de cette période. |
| Couleur (RGB) | Choisissez une couleur à l'aide du champ de couleur, de l'échantillon ou de la palette de couleurs. |
| Intensité | Force de 0 aux 100. Utilisez les flèches ou entrez un nombre dans le champ du milieu. 0 rend l'effet invisible. |

Par exemple, **60 ticks / 3 pulsations** joue trois pulsations sur trois secondes. L'intensité change la force de la surbrillance; elle ne change pas la couleur ou la taille du texte choisie.

L'effet commence lorsque ce choix devient visible. Un choix en attente de l'effet de frappe de dialogue, ou en attente en dessous de la zone de défilement, n'utilise pas son pouls tôt. Le défilement arrière et arrière ne redémarre pas un effet fini. L'ouverture de la scène de dialogue lui donne une nouvelle lecture.

## Fichiers de dialogue existants

Les vieux dialogues continuent sans pulsation. Activez-le uniquement sur les choix que vous souhaitez souligner. L'éteindre conserve ses paramètres pour une utilisation ultérieure. Enregistrez le dialogue après l'édition.
