---
title: Combattre la propriété, la portée des parades et la mort
slug: mob-editor-parry
order: 270
description: Empêchez les contrôleurs qui se chevauchent et comprenez quelles options de combat sont actives.
product: mob-editor
section: combat
category: BattleWorks
status: Guide
version: 0.1.6
audience: Débutants et créateurs de combat
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Supprimer les attaques natives qui se chevauchent

Activer **Combat Rules → Combat → Suppress Native Attacks** lorsque les hitboxes créées doivent posséder un timing d'attaque.

1. Commencez par une attaque hitbox.
2. Activer la suppression et enregistrer/appliquer.
3. Vérifiez les coups supplémentaires pendant la préparation ou la récupération.
4. Si le chevauchement persiste, inspectez les scripts de combat CustomNPC.

## 2. Gérer les scripts hérités délibérément

0.1.5de **Suppress CustomNPC Scripts** empêche l'exécution de scripts hérités de concurrencer BattleWorks. Il conserve les données de script stockées.

Ceci est utile lors du portage d'un patron scripté. Vérifiez tout comportement non-combat fourni par ces scripts avant de compter sur la suppression. Un nouveau PNJ n’en a normalement pas besoin.

## 3. Soutien actuel de la parade

| Fonctionnalité | 0.1.5 Comportement source |
| --- | --- |
| Parade projectile magique mondiale | Intégration de réflexion pour les projectiles Iron's Spellbooks pris en charge |
| Global Lock-on | Autorisation globale avec les paramètres de présentation locaux |
| Débogage Hitbox | Visualisation, pas de dégâts supplémentaires |
| Fenêtre de parade / Posture / Riposte | Éditable et persistant, mais aucun consommateur correspondant à BattleWorks n'a été trouvé |
| Modèle Parryable / Posture Dégâts sur Parry | Ces champs seuls ne mettent pas en œuvre la perte de posture, la parade au corps à corps ou la riposte. |
| Garder / éviter les réactions | Séparez le chemin d'endommagement-réaction ; voir [passifs](#mob-editor/battleworks-passives) |

La réflexion des projectiles n'est pas un support universel pour tous les projectiles mod. Ne pas faire une rencontre nécessite la posture / riposte champs réservés pour devenir beatable.

## 4. Paramètres globaux versus locaux

| Fichier | Objet |
| --- | --- |
| `config/dochi_rpg_maker/settings/battleworks_global_rules.json` | Parade magique partagée, verrouillage et drapeaux hitbox-debug |
| `config/dochi_rpg_maker/settings/battleworks_client.json` | Panneaux, apparence verrouillée, sentiers, audio et préférences locales |

Les valeurs par défaut globales activent la parade magique et le verrouillage et désactivent le débogage de la hitbox.

**Disable vanilla music** est une préférence audio locale indépendante. Il supprime la musique vanille quel que soit l'état de combat et n'écrase pas la valeur du volume de la musique. Voir [Installation de BGM](#mob-editor/battleworks-skills-effects).

![Les paramètres de mort et un calendrier vide des événements de mort.](assets/media/guides/battleworks-016-neo1211/battleworks-death.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Activé est désactivé et la durée est 60 ticks dans cette capture. Activez-le, définissez la longueur souhaitée et ajoutez des événements avec Add Death Event.")

## 5. Faire une courte séquence de la mort

1. Ouvrir **Combat Rules → Death**.
2. Activez-le et définissez Durée 40 ticks.
3. Activer Lock Corpse si le mouvement horizontal doit être maintenu.
4. Ajouter un son ou un titre à la coche 0.
5. Ajouter un autre événement à la coche 20 si nécessaire.
6. Conservez chaque événement et répétition finale dans la durée.
7. Tuez le PNJ réel et observez toute la séquence.

Le tueur peut devenir la cible de la séquence. Les titres et les dialogues dirigés par le joueur ont besoin d'un destinataire approprié. Les compétences nécessitant un lanceur de sorts vivant peuvent échouer après la mort, alors commencez par le son, le titre et le mouvement compatible.

Lock Corpse arrête la navigation et le mouvement horizontal. Les gouttes, la réapparition et toute la physique des cadavres ne sont pas configurées par ce commutateur.

## Contrôles d'achèvement

Vérifiez qu'aucun coup natif/script supplémentaire ne chevauche la timeline, que les champs réservés aux parades ne sont pas requis pour la victoire, que la présentation de la mort se termine correctement et que le fichier prévu reste connecté après une réapparition ou un autre combat.
