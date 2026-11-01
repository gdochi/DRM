---
title: Booby Trap Éditeur et gestionnaire
slug: warfare-booby-traps
order: 390
description: Configurez l'accès au mot de passe, les explosions, les effets, le comportement de lancement, les grenades LRT, les profils, les marqueurs et le cycle de vie.
product: dochi-warfare
category: Outils du monde
section: tools
status: Projet
version: 0.3.1
audience: Créateurs de cartes et de scénarios
tags:
  - booby-trap
  - security
  - explosion
translationSource: en
translationMethod: assisted
---

## Rôles d'éditeur et d'exécution

`DW Booby Trap Core` est un outil créateur en mode Créatif.

* Cliquez avec le bouton droit sur un bloc avec le noyau pour ouvrir l'éditeur pour ce bloc.
* Faites un clic droit avec le noyau pour ouvrir le gestionnaire pour les pièges enregistrés.
* Rangez le noyau avant de tester un piège configuré grâce à une interaction de bloc normale.

L'éditeur et le gestionnaire sont des écrans de création. Les invites de mot de passe et les effets de piège sont le comportement du joueur dans le jeu, et le serveur prend la validation finale et la décision de déclenchement.

## Types de pièges

| Type | Cible et comportement |
| --- | --- |
| `Password Door` | Porte vanille seulement; s'authentifier avant l'ouverture. |
| `Password Container` | Bloquer avec une interface graphique d'inventaire ; s'authentifier avant d'ouvrir le conteneur. |
| `Immediate Explosion` | Déclenchez une explosion immédiatement lors de l'interaction. |
| `Delayed Explosion` | Jouez le feedback d'avertissement configuré, attendez, puis explosez. |
| `LRT Grenade` | Lancez une grenade LesRaisins Tactical Equipments native lorsque le mod optionnel est installé. |

Le choix d'un type applique les champs de référence requis, mais chaque résultat doit être examiné avant d'être enregistré.

## Trigger event

En 0.2.9, explosion, explosion retardée, et les pièges à grenade LRT peuvent utiliser soit `Interact` ou `Step on block`. Le serveur détecte `Step on block` lorsqu'une entité entre dans la zone de contact supérieure du bloc configuré, puis applique les règles normales de recharge, de contournement du propriétaire, de portée cible et à usage unique. Les portes de mots de passe et les conteneurs conservent leur flux d'interaction normal.

## Règles de mot de passe et d'accès

Les pièges à mot de passe prennent en charge un code PIN numérique de 4 à 12 chiffres ou un mot de passe texte de 1 à 32 caractères. Vous pouvez configurer la sensibilité du boîtier, le contournement du propriétaire, le côté entrée, le comportement inverse, la politique de fermeture de la porte, les tentatives maximales, la fenêtre de tentative, le temps de verrouillage et l'action d'échec.

Les actions d'échec peuvent afficher un avertissement, causer des dommages directs ou exploser. Les valeurs de mot de passe ne sont pas conservées en tant que brouillon simple modifiable après la configuration; la modification du mode de mot de passe ou de la stratégie de cas nécessite un nouveau mot de passe.

## Charges utiles et effets

Les pièges à explosion exposent la puissance, bloquent la destruction, créent le feu, retardent, avertissent le son et avertissent les particules. Les effets optionnels peuvent pousser le joueur déclenchant et appliquer jusqu'à huit effets de potion au joueur déclenchant, à tous les joueurs à proximité ou à toutes les entités vivantes à proximité.

La charge utile de la grenade LRT configure le type de grenade, le fusible, la puissance, le comptage, la direction, l'angle et le lacet / tangage fixe si nécessaire. L'éditeur rejette cette charge utile lorsque les équipements tactiques de LesRaisins ne sont pas disponibles ou que la grenade sélectionnée ne peut pas être créée.

## Cycle de vie et essais

Un piège ne se déclenche que lorsque les deux `Enabled` et `Armed` sont activés. D'autres contrôles importants incluent le contournement du propriétaire, la protection contre les bris, le comportement redstone, le temps de recharge, l'utilisation unique, l'élimination de l'état après déclenchement, l'élimination du bloc cible, la destruction du bloc et la création de feu.

Test dans cet ordre :

1. Il suffit d'un simple piège avec `Enabled` et `Armed`.
2. Enlevez `DW Booby Trap Core`.
3. Interagissez normalement en tant que joueur de test non propriétaire lorsque le bypass propriétaire est activé.
4. Vérifiez l'effet et le cycle de vie avant d'ajouter des échecs de mot de passe, des effets de potion ou des charges utiles LRT.

![Pièges Booby enregistrés avec recherche, sélection, paramètres, désarmer le piège et supprimer le bloc.](assets/media/guides/warfare-031-neo1211/dw-traps.png "DW 0.3.1 / NeoForge 1.21.1. Cette liste gère les pièges enregistrés. Il a actuellement 0 sélectionné; choisissez une entrée pour utiliser les paramètres ou désarmer les contrôles.")

## Gestionnaire, marqueurs et profils

Faites un clic droit sur l'air avec le noyau pour rechercher les pièges enregistrés et inspecter l'état tel que actif, désactivé, désarmé, morceau déchargé, bloc périmé, en attente d'explosion retardée ou dépendance manquante. `Remove Trap` ne supprime que l'état du piège; `Destroy Block` supprime l'état et le bloc cible. Les actions destructrices du manager nécessitent une deuxième confirmation.

Alors que le noyau est maintenu en mode créatif, les pièges configurés à proximité peuvent être affichés avec des contours et des marqueurs compacts. Les profils JSON réutilisables sont stockés sous :

```text
config/dochi_warfare/booby_traps/profiles/
```

Le chargement d'un profil applique les paramètres au brouillon de l'éditeur actuel. Le serveur valide toujours si ce profil est valide pour le type de bloc sélectionné avant de l'enregistrer.
