---
title: Règles du jeu et récompenses
slug: minigames-rules-rewards
order: 1310
description: Paramètres du jeu, confirmation d'entrée, seuils de score et récompenses de l'objet ou Pokémon.
product: dochi-minigames
category: Création
section: rules
status: Guide d'utilisation
version: 0.1.6
audience: Créateurs de jeux
translationSource: en
translationMethod: assisted
---

## Règles par jeu

| Jeu | Flux de joueurs | Contrôles d'auteur |
| --- | --- | --- |
| Monty Hall | Choisissez une porte → portes perdantes révélées → rester ou changer | Utilisez les portes 3–8 et préparez des symboles et gagnez des récompenses. |
| Fentes | Confirmation d'entrée → levier → Arrêter trois rouleaux | Définissez l'arrêt automatique/manuel, les symboles, l'intervalle de rotation et les temps d'arrêt. |
| Mémoire | Initial reveal → sélectionner deux cartes → correspondent à chaque paire | Utilisez 2–10 lignes/colonnes et un nombre de cartes pair, avec un symbole distinct pour chaque paire. |

La limite de temps est 5–3600 secondes. Les préréglages faciles, normaux et durs de la mémoire utilisent des cartes 2×2, 6×6 et 10×10. Une carte 10×10 a besoin de 50 symboles distincts. Utilisez **Find** à côté d'un identifiant de symbole pour parcourir le catalogue d'articles DRM.

Les temps d'arrêt automatiques doivent augmenter de la première bobine à la troisième, avec le dernier arrêt à l'intérieur de la limite de temps. À la vitesse normale du jeu, 20 est égal à une seconde.

### Temps d'arrêt des machines à sous

Ouvrir **Slots → Rules**. C'est l'éditeur **Minigames 0.1.5 / NeoForge 1.21.1**. Avec **Auto stop** activé, **Reel 1 tick / Reel 2 tick / Reel 3 tick** contrôle lorsque chaque bobine s'arrête. L'image `20 / 40 / 60` signifie une, deux et trois secondes à la vitesse normale. **Spin interval** est le délai entre les changements de symbole pendant la rotation.

![Règles des machines à sous avec arrêt automatique activé et temps d'arrêt des rouleaux de 20, 40 et 60 ticks.](assets/media/guides/minigames-015-neo1211/minigames-slots.png "Augmentez les temps d'arrêt de la première bobine à la troisième. L'image de la fente au milieu est un aperçu de la conception.")

### Taille de la carte mémoire

En dessous de **Memory → Rules**, **Rows / Columns** définit la taille de la carte. Le tableau `4 × 4` illustré nécessite seize cartes et huit symboles distincts. **Reveal ticks** définit la révélation initiale; **Mismatch ticks** définit combien de temps une paire incorrecte reste visible avant de se cacher à nouveau.

![Règles de mémoire avec un tableau quatre par quatre, des ticks Reveal et des ticks Mismatch, avec huit paires visibles dans l'aperçu du design.](assets/media/guides/minigames-015-neo1211/minigames-memory.png "Cochez Symboles après avoir agrandi le tableau. La taille de la carte est ajustée via les paramètres du tableau dans Open GUI Maker ci-dessous Règles.")

## La roulette utilise une liste de prix séparée

[Item Roulette](#dochi-minigames/minigames-roulette) choisit un prix en utilisant des éléments de prix, des quantités et des poids. Les seuils de score et les règles de confiscation ci-dessous décrivent les jeux de score existants. Roulette conserve un tirage déjà commencé après la fermeture; Jouer à nouveau commence un autre tirage immédiatement.

## Frais d'entrée

Définissez le fournisseur, l'ID et le montant en général.

| Fournisseur | Configuration |
| --- | --- |
| `item` | ID de l'élément à consommer |
| `drm` | Devise de l'unité enregistrée en DRM Currency Editor |
| `cobbledollars` | Configuration avec le fournisseur CobbleDollars installé |

Une quantité de `0` est gratuite. Cliquer sur un PNJ ou Replay ne facture pas de frais : le joueur doit confirmer Démarrer. L'annulation est gratuite ; un équilibre insuffisant empêche de démarrer. La confirmation expire après 60 secondes. La fermeture d'un jeu payant, commencé l'abandonne.

## Seuils et politique de récompense

Définissez le score et la quantité requis de chaque récompense, puis choisissez comment les récompenses éligibles sont sélectionnées.

| Politique | Résultat |
| --- | --- |
| `highest` | Toutes les récompenses au plus haut seuil atteint |
| `cumulative` | Toutes les récompenses à chaque seuil atteint |
| `random` | Une entrée de récompense éligible sélectionnée au hasard |

Les récompenses d'objet accordent l'objet configuré. Les récompenses de symboles utilisent le symbole de résultat sélectionné du jeu, tel que le symbole de fente correspondant. Avec Cobblemon installé, **Pokémon Settings** fournit des espèces, niveau, brillant, sexe, forme, nature, capacité, balle, objet tenu et propriétés supplémentaires. Les niveaux sont 1–100; une équipe complète envoie le Pokémon au PC.

Les articles référencés, les symboles et les récompenses Pokémon sont vérifiés avant paiement. Le serveur possède des scores, des réponses cachées, des paiements et des subventions. Chaque séance se termine une fois. Les récompenses d'éléments qui ne rentrent pas dans l'inventaire sont abandonnées ; inspectez les notifications et les journaux du serveur pour détecter les erreurs d'attribution. Les subventions échouées ne sont pas automatiquement rejugées.

Après l'enregistrement, vérifiez à la fois le test gratuit de l'éditeur et le flux réel de confirmation d'entrée. [NPC et les liaisons de dialogue](#dochi-minigames/minigames-setup) sont couvertes sur la page d'accueil.

## Jeux supplémentaires

| Jeu | Jouer et créer |
| --- | --- |
| Whack-a-creature | Atteignez des cibles émergentes, évitez les pièges; configurez les modèles et le calendrier. |
| Calendrier | Arrêtez-vous à l'intérieur de la zone de succès; configurer les tours, la vitesse et le rétrécissement des fenêtres. |
| Haut-bas | Prédire la prochaine carte ou encaisser une série. Les égalités réessayent; les fausses suppositions / timeouts perdent le score accumulé. |
| Galerie de tir | Visez des cibles de tailles différentes et évitez les pièges explosifs; configurez les modèles d'armes, les munitions, le rechargement, l'intervalle de tir et les scores. |
| MWENT | Factions, leaders, decks et stratégie ronde ; voir [MWENT](#mwent/start). |

Sans DRM, utilisez les récompenses d'entrée et d'objet gratuites. DRM Les devises / conditions et autres récompenses intégrées nécessitent leurs fournisseurs.
