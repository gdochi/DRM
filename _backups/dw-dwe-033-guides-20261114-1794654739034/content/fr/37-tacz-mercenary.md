---
title: Contrats Mercenaires et Command HUD
slug: warfare-mercenary
order: 355
description: Configurez les conditions de location avec DW Mercenary Core, puis gérez les contrats actifs via la commande player HUD.
product: dochi-warfare
category: Mercenaires
section: mercenary
status: Projet
version: 0.3.1
audience: Créateurs et joueurs
tags:
  - mercenary
  - contract
  - hud
translationSource: en
translationMethod: assisted
---

## Deux types d'écran différents

Le flux de travail mercenaire sépare délibérément les outils de création des écrans de jeu des joueurs.

| Écran ou élément | Qui l'utilise | Objet |
| --- | --- | --- |
| `DW Mercenary Core` et `Mercenary Contract Settings` | Créateur en mode Créatif | Modifiez les conditions de location d'un PNJ géré par DW. |
| `Mercenary Contract` confirmation | Joueur | Vérifiez le coût, la durée, l'utilisation de la liste et les conditions d'attaque du propriétaire avant de payer. |
| `Mercenary Status` commande HUD | Joueur avec des contrats actifs | Inspecter, sélectionner, commander, convoquer, rappeler ou libérer les mercenaires engagés. |

`DW Mercenary Core` ne fait pas partie de l'éditeur d'armes à feu `DW Npc Core`. Il ouvre un éditeur séparé et accepte les PNJ gérés par DW DNPC ou CustomNPCs.

![Paramètres du contrat mercenaire pour la disponibilité, le paiement, la durée et les attaques des propriétaires.](assets/media/guides/warfare-031-neo1211/dw-mercenary.png "DW 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1. Enregistrez d'abord la configuration de l'arme à feu du PNJ, puis ouvrez-la tout en tenant DW Mercenary Core. La location disponible est toujours OFF dans cet exemple.")

## Configuration du créateur

1. Configurez et testez le combat à l'arme à feu du PNJ avec `DW Npc Core`.
2. En mode Créatif, maintenez la touche `DW Mercenary Core`.
3. Cliquez avec le bouton droit sur le PNJ géré par DW.
4. Configurez le contrat et appuyez sur `Save`.

| Champ contractuel | Signification |
| --- | --- |
| `Hire available` | Permet une interaction normale du joueur pour demander une offre de contrat. |
| `Cost item ID` | Identifiant de registre de l'élément d'embauche. |
| `Cost item count` | Numéro supprimé lorsque le joueur confirme. L'accès à la création / création par l'opérateur peut renoncer au coût. |
| `Hire duration (seconds)` | Durée totale du contrat. |
| `Summon windup (seconds)` | Retard de 0 à 60 secondes avant qu'un mercenaire stocké ne se déploie. |
| `Recall windup (seconds)` | Retard de 0 à 60 secondes avant qu'un mercenaire déployé ne soit stocké. |
| `Faction hostility / hits` | Le nombre de coups de possesseurs dommageables avant que les PNJ de même faction proches ne traitent le possesseur comme hostile. Le contrat lui-même reste actif. |
| `Automatic contract break / hits` | Seuil de réussite indépendant qui met fin au contrat et à la protection du propriétaire. |
| `Hit reset window (seconds)` | Fenêtre de propriétaire-frappé consécutive de 1 aux 10 secondes. Le compte se réinitialise après ce temps sans autre coup dommageable. |

L'hostilité à la faction et la rupture automatique du contrat sont indépendantes. Permettre l'un ne permet pas silencieusement l'autre.

## Embauche en tant que joueur

Interagir normalement avec un PNJ louable. Ne pas tenir `DW Npc Core`, `DW Mercenary Core`, ou CustomNPCs élément d'édition; ces éléments conservent leur propre comportement d'édition.

L'écran de confirmation sans pause affiche le PNJ, le prix, la durée du contrat, les créneaux horaires et les règles d'attaque du propriétaire. Le serveur revérifie l'offre, la distance, le coût de l'objet, les conditions actuelles, la propriété et la limite de la liste lorsque le joueur confirme.

Chaque joueur peut détenir jusqu'à cinq contrats actifs. Le paiement n'est facturé qu'après confirmation du serveur. Les contrats libérés manuellement ne sont pas remboursés.

## États du contrat et minuterie

| État | Comportement du minuteur |
| --- | --- |
| Déployé ou suivant/formation/maintien/combat | Le temps de contrat actif continue. |
| Rappelant | Le temps de contrat actif continue pendant la liquidation. |
| Stocké | La minuterie est en pause. |
| Invocation | Le minuteur reste en pause jusqu'à la fin du déploiement. |
| Superficie déchargée | Le contrat reste déployé et est affiché comme déchargé. |

Rappel enregistre l'état PNJ actuel avant le stockage. Invoquer restaure le PNJ stocké près du propriétaire uniquement lorsqu'un espace sécurisé est trouvé. Si les données stockées ne peuvent pas être restaurées en toute sécurité, la commande est rejetée au lieu d'inventer un PNJ de remplacement.

## Ouvrir et utiliser le HUD d'exécution

Maintenez la touche `J` par défaut pour afficher la commande mercenaire HUD. Maintenez la touche `Left Alt` pendant qu'elle est ouverte pour libérer le contrôle de la caméra et interagir avec les boutons HUD. Relâchez `Left Alt` pour retourner le contrôle de la caméra; relâchez `J` pour fermer le HUD.

Le HUD montre jusqu'à cinq contrats détenus, y compris:

* État du contrat et durée restante
* Mode de déplacement et emplacement de formation
* Mode feu et posture de combat
* État de déploiement, d'invocation et de rappel
* Nombre actuel de succès du propriétaire, seuil d'hostilité de faction, seuil de rupture de contrat et temps de réinitialisation

Les mercenaires peuvent être vérifiés individuellement. Les commandes peuvent cibler la sélection ou tous les mercenaires éligibles, et le résultat indique combien ont accepté ou ignoré la commande.

La version 0.2.3 consolide les ordres opposés en boutons conscients de l'état. Par exemple, une sélection All-Follow offre Hold ; sinon, le bouton propose Follow. La formation, la posture défensive/agressive et le feu à volonté/maintenez le feu fonctionnent de la même manière. Si un mercenaire sélectionné est stocké, le déploiement offre l'Invocation en premier; lorsque tous les mercenaires sélectionnés sont déployés, il passe à Rappel. Les sélections mixtes peuvent être normalisées pour suivre, forme arrière, défensive ou feu à volonté.

Pendant que le serveur traite une commande, le bouton garde son état visuel normal mais ignore les clics supplémentaires. Il redevient interactif après l'arrivée du résultat, ce qui évite les commandes accidentelles en double.

## Commandements de mouvement et de combat

| Commande | Comportement |
| --- | --- |
| `Follow` | Suivez le propriétaire sans fente de formation fixe. |
| `Rear Form` | Utilisez une fente de formation arrière derrière le propriétaire. |
| `Front Form` | Utilisez une fente de formation avant. |
| `Hold` | Enregistrez la position actuelle en tant qu'ancre de maintien. |
| `Regroup` | Effacer la tâche de mouvement en cours et revenir à Suivre. |
| `Hold Fire` | Arrêter la production d'armes à feu et l'acquisition de cibles jusqu'à leur libération. |
| `Fire At Will` | Permettre le tir et l'acquisition de la cible à nouveau. |
| `Defensive Posture` | Réagir au combat réel et aux menaces valides. |
| `Aggressive Posture` | Engagez de manière proactive les ennemis reconnus grâce aux relations de menace valides du propriétaire et aux règles de cible du PNJ. |
| `Summon` | Déployez un mercenaire stocké après sa liquidation configurée. |
| `Recall` | Stockez un mercenaire déployé après sa liquidation configurée. |

Une posture agressive n’est pas une autorisation d’attaquer toutes les entités voisines. Les sélecteurs de cibles explicites, l'hostilité des factions CustomNPCs, la protection des joueurs amicaux, les balises et les règles réactives autorisées par le serveur filtrent toujours les candidats.

## Attaques de propriétaires et rupture de contrat

Les dégâts du propriétaire ne sont comptés que lorsqu'il s'agit d'un coup vraiment dommageable. Les dégâts multicoups identiques comptent une fois, et le compteur se réinitialise après la fenêtre silencieuse configurée.

* `Faction hostility / hits` commence une réponse de faction. Les PNJ proches de la même faction peuvent traiter le propriétaire comme hostile, mais le contrat de mercenaire reste actif.
* `Automatic contract break / hits` met fin au contrat et à la protection du propriétaire. Aucun remboursement n'est émis.
* Si les deux seuils sont croisés, les deux résultats sont rapportés.

Le HUD en direct affiche le nombre actuel et les deux seuils afin que le joueur puisse voir le risque avant un autre coup.

## Libération et expiration

La publication d'un contrat nécessite une confirmation et ne donne aucun remboursement. Un PNJ stocké est restauré avant la sortie ; si la restauration échoue, la sortie est annulée pour éviter de perdre le PNJ.

Lorsque le temps de contrat actif atteint zéro, le contrat expire automatiquement. Si un PNJ est supprimé, le contrat prend également fin et le propriétaire en est informé.
