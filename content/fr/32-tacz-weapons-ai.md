---
title: Armes, position et IA tactique
slug: warfare-weapons-ai
order: 330
description: Comment configurer la position de l'arme à feu, le mouvement, la conscience, les pools d'armes et le repli de mêlée.
product: dochi-warfare
category: Combat AI
section: combat-ai
status: Projet
version: 0.3.3
audience: Firearm PNJ Créateurs
tags:
  - weapon
  - stance
  - ai
translationSource: en
translationMethod: assisted
---

## Choisissez une arme, puis son comportement de combat

Mettez l'arme à feu prévue dans l'inventaire **joueur ** en premier. Dans **Gun**, cliquez sur son icône pour l'ajouter à la liste d'armes inférieure et l'aperçu des PNJ à droite. Les écrans utilisent **DW 0.3.1, DNPC 0.1.3 and NeoForge 1.21.1**.

![M4A1 sélectionné à partir de l'inventaire du joueur ; la seule entrée d'arme a une probabilité de 100%.](assets/media/guides/warfare-031-neo1211/dw-gun.png "Cela montre la sélection et la prévisualisation des armes. Sauvegarder dans le PNJ avant de tester le feu réel. Les armes multiples candidates doivent totaliser 100%.")

![Sens montrant le mode Stance, la conscience et le mode Combat.](assets/media/guides/warfare-031-neo1211/dw-senses.png "Quick View sur la droite navigue sur la longue page Senses. Prise de conscience des contrôles; Contrôles en mode Combat comportement à distance / mêlée.")

![Sense les modes de feu, supprime le feu et le comportement tactique.](assets/media/guides/warfare-031-neo1211/dw-fire.png "Il n'y a pas d'onglet Feu séparé. Utiliser les sens → Affichage rapide → Modes de tir. Trouvez le taux et la précision sous Taux de tir dans la même liste.")

## Modes de position

`Stance` décide quelle forme de combat le PNJ géré doit utiliser.

| Stance | Comportement |
| --- | --- |
| `Idle` | Arrêtez le combat de pont et rangez les armes gérées. |
| `Ranged` | Utilisez uniquement l'arme à distance gérée TACZ, PointBlank ou SuperbWarfare. |
| `Melee` | Utilisez uniquement l'arme de mêlée stockée. |
| `Auto` | Échangage entre à distance et mêlée en fonction de la distance. L'arme à distance reste visible pendant le ralenti. |
| `Auto Hidden` | Échangez pendant le combat, mais gardez les mains vides en dehors du combat. |

`Stance Mode: General` utilise les paramètres de position normaux. `Stance Mode: Advanced` applique une règle conditionnelle telle que `Always`, health below a ratio, target entity, target faction ou target tag. `Always` et l'état de santé des PNJ peut être évalué sans cible de combat actuelle ; seules les conditions d'entité, de faction et d'étiquette de cible nécessitent une cible vivante. Le mode avancé a intentionnellement une règle active pour éviter les comportements conflictuels.

## Paramètres de tir

| Réglage | Signification pratique |
| --- | --- |
| `Max Distance` | Distance cible maximale pour un tir à distance géré. Les cibles au-delà sont ignorées par l'addon. |
| `Melee Switch Range` | Distance où la position de `Auto` se met en mêlée. La portée réelle du hit provient toujours du comportement de mêlée CustomNPCs. |
| `RPM Mode` | Choisissez une source : `TACZ Native`, `Fixed` ou `Random Range`. Seules les valeurs utilisées par ce mode sont affichées. |
| `Fixed RPM` | Taux de tir cible fixe utilisé par `RPM Mode: Fixed`. |
| `RPM Min` et `RPM Max` | Plage cible de taux de feu utilisée par `RPM Mode: Random Range`. |
| `Fixed Accuracy %` | Précision utilisée en continu alors que `Accuracy Ramp` est désactivé. `100` n'ajoute aucune erreur de visée supplémentaire. |
| `Ramp Start Accuracy %` | La précision de démarrage tandis que `Accuracy Ramp` est activée. |
| `Ramp Max Accuracy %` | Précision maximale après un suivi admissible. Elle doit être supérieure à la valeur de départ. |
| `Ramp Time Ms` | Temps de suivi admissible accumulé nécessaire pour atteindre une précision maximale. |
| `Ramp Max Range` | Distance maximale à laquelle la progression de la rampe peut s'accumuler. |
| `Min Target Speed` | Vitesse horizontale minimale du joueur nécessaire pour faire avancer la rampe. |
| `Burst Minimum Shots` / `Burst Maximum Shots` | Sélectionne un nouveau nombre de coups inclus pour chaque rafale configurée. Des valeurs égales créent des rafales de longueur fixe. |

`Accuracy Ramp` ne progresse que lorsque la cible visible est un joueur en mouvement à l'intérieur de la plage configurée et au-dessus de la vitesse minimale. La progression s'arrête lorsque le joueur est à l'arrêt ou hors de portée, puis se réinitialise lorsque la cible ou le profil général/avancé actif change. Général et Avancé peuvent utiliser des paramètres de rampe indépendants. En 0.2.9, le RPM natif et le RPM fixe sont réconciliés avec la cadence prise en charge par le canon; TACZ les tirs utilisent également une planification plus fine pour réduire la quantification des tiques visible 50 ms à haut RPM.

Commencez par `RPM Mode: TACZ Native` et une précision fixe. Ajoutez des tours aléatoires, des plages de rafales et de la précision une à la fois après que le pistolet, la cible, la ligne de visée et la boucle de munitions fonctionnent.

## Politiques de dommages

La version 0.2.0 permet à chaque PNJ de choisir la manière dont les dégâts d'arme à feu et de corps à corps sont calculés.

| Emplacement | Politique |
| --- | --- |
| `Gun` | `Gun Spec` garde le comportement natif de l'arme. `Custom` applique le remplacement des dégâts DW pris en charge sans modifier les données d'origine du pistolet. |
| `Melee` | `Weapon Spec` utilise les attributs d'attaque de l'élément sélectionné. `Custom` utilise des dégâts de mêlée fixes. |
| `Melee` | La vitesse de Knockback et d'attaque peut indépendamment utiliser des attributs d'arme ou des valeurs personnalisées fixes. La vitesse d'attaque personnalisée est mesurée en attaques par seconde. |

CustomNPCs' les dégâts de mêlée par défaut ne remplacent pas ces politiques de mêlée gérées. Confirmez d'abord le comportement natif de l'arme, puis ajoutez des valeurs personnalisées.

## Meilleure compatibilité de combat

La version 0.2.1 ajoute un bouton per-NPC `Better Combat Compatibility` sous `Melee`. Il est activé par défaut lorsque Better Combat est installé et ne peut pas être utilisé lorsque Better Combat est absent.

Lorsqu'il est activé, le PNJ résout le set d'attaque Better Combat et la pose d'arme enregistrée pour l'objet retenu. L'ordre combiné, les conditions d'attaque, les conditions à deux mains ou à deux mains et les transformations d'objets suivent les données d'armes enregistrées. Les intervalles d'attaque et le moment des dégâts utilisent le `ATTACK_SPEED` effectif de l'objet retenu. La stratégie de vitesse d'attaque en mêlée est affichée en tant que `Weapon Spec (locked)`, et une vitesse d'attaque personnalisée ne s'applique pas tant que cette bascule de compatibilité n'est pas désactivée.

La lecture exacte des mouvements des PNJ de combat sur le client nécessite à la fois un meilleur combat et un animateur de joueur de créature. Si la créature Player Animator est absente ou que le mouvement d'arme enregistré ne peut pas être joué, l'addon ne crée pas un mouvement d'imitation; il utilise une balançoire à la main vanille.

## Mouvement tactique

`Tactical Move` contrôle la façon dont l'addon dirige le mouvement de combat à distance:

| Mode | Cas d'utilisation |
| --- | --- |
| `Hold` | Gardes statiques, tourelles, snipers, phases de boss mises en scène. |
| `Spread` | Des escouades qui devraient se séparer des alliés proches. |
| `Compact` | Des escouades qui se regroupent au lieu de se disperser. |
| `Advance` | Les PNJ d'assaut qui appuient vers la cible. |
| `Retreat` | Des PNJ défensifs qui ouvrent la distance. |

`Engagement` Ajoute un comportement cible-distance. `Hold` ne se repositionne pas pour la distance, `Advance` s'approche jusqu'à `Approach Distance`, et `Retreat` recule jusqu'à `Retreat Distance`.

Les mouvements utiles comprennent `Move While Firing`, `Retreat Fire` et `Keep Distance Fire`. `Keep Distance Fire` essaie de maintenir une plage préférée, mais elle est à distance seulement et verrouille la commutation de mêlée.

`Reposition Minimum Ms` et `Reposition Maximum Ms` contrôlent la durée pendant laquelle un plan de mouvement tactique reste actif avant que le PNJ ne le reconsidère. Une nouvelle durée entre ces valeurs est sélectionnée pour chaque plan. Général et Avancé peuvent utiliser différentes gammes.

`Suppressive Fire` est différent du suivi de cible. Une fois que la ligne de visée est perdue pendant le combat, il peut tirer des coups réels TACZ uniquement à la dernière position que le PNJ a réellement vue, pour la configuration `Suppression Time Ms`. Il ne suit pas la position actuelle de la cible cachée et consomme toujours des munitions dans l'état normal des armes à feu. `Post-Fire Watch Ms` permet au PNJ de viser ce point après les arrêts de tir sans dépenser plus de munitions.

## Prise de conscience et contrôle du ralenti

Utilisez les paramètres de sensibilisation pour décider quand le PNJ peut entrer en combat :

| Réglage | Signification |
| --- | --- |
| `Detect Distance` | Blocs où les PNJ inactifs détectent d'abord une cible visible. Ce n'est pas la même chose que le champ de tir. |
| `Detect Angle` | Cône de détection horizontal. `360` permet une détection complète. |
| `Combat Delay Ms` | Le temps que le PNJ regarde une cible détectée avant le combat confirmé. |
| `Instant Combat Angle` | Cône avant qui peut sauter le retard et entrer en combat immédiatement. |
| `Close Detection` | Permet aux cibles à l'intérieur de `Close Detect Distance` de contourner l'angle de détection horizontal. Désactivez-le pour les PNJ de type backstab ou assassinat. |

`Sound Detection` utilise un système de stimulus pour gérer les coups de feu, les rechargements, les sons de bloc, les sons d'entité et les sons du monde en position seulement. Les joueurs de survie et de création sont gérés de manière cohérente ; les cibles des spectateurs restent exclues. L'enquête peut être `Off`, `Look Only`, ou `Move To Source`. Le combat actif prend la priorité, et une position verrouillée revient à regarder au lieu de quitter son poste.

`Faction Defense` permet à un PNJ endommagé géré par DW d'alerter les alliés gérés par la même faction à l'intérieur `Faction Alert Radius`. Un allié assistant peut se déplacer pour aider avant de voir l'attaquant, mais il a encore besoin de la ligne de vue finale avant de tirer. La tolérance du propriétaire mercenaire et la validation amicale de la cible restent en vigueur, de sorte que la défense de faction ne contourne pas les règles du contrat ou de la cible.

Le mouvement de ralenti a quatre modes: `Stationary`, `Area Patrol`, `Return Only` et `Route Patrol`. Les patrouilles de zone et d'itinéraire utilisent l'interface graphique `Default Walk Speed` et gardent un chemin A* valide actif. Ils ne remplacent pas la recherche de chemin échouée par un mouvement direct dans un mur; les points inaccessibles sont réessayés dans une limite bornée, puis ignorés. Les coordonnées de la patrouille se résolvent au sol debout à proximité, et les contrôles d'arrivée incluent la distance verticale pour les points de passage inférieurs d'un bloc.

## Poses d'armes non-combattantes

`Non-Combat Weapon Pose` contrôle comment un PNJ détient une arme à distance en dehors du combat.

| Pose | Comportement |
| --- | --- |
| `TACZ Default (Custom Off)` | Désactive la pose de ralenti personnalisée et laisse la présentation à TACZ. |
| `Low Ready` | Tenir le pistolet dans une position abaissée. |
| `High Ready` | Tenir le pistolet dans une position relevée. |
| `Aim Ready` | Garde une position de visée prête en dehors du combat. |
| `Custom Pose` | Utilise une pose JSON enregistrée avec `DW Pose Core`. |

Low Ready et High Ready restent actifs en position debout, patrouillent en zone/route ou rentrent chez eux. Avec le mappage d'action par défaut, ils cèdent au comportement de visée, de tir et de rechargement TACZ lorsqu'une cible est détectée ou que le combat commence. Utilisez la catégorie `Pose` pour un mappage plus fin par action.

## Piscines d'armes et d'apparence

`Gun` lit les piles de pistolet prises en charge TACZ, PointBlank et SuperbWarfare de l'inventaire du joueur. Le pistolet sélectionné peut être sauvegardé directement, ou plusieurs pistolets pris en charge peuvent être ajoutés à un pool d'armes aléatoire. Les jets de pool peuvent se produire sur les événements d'initialisation CustomNPCs tels que respawn, l'initialisation de morceaux, la restauration de clones ou la restauration de pierre d'âme.

TACZ est toujours la position et l'animation de base. Les adaptateurs optionnels conservent le rendu d'objet natif du canon externe, le projectile ou le hitscan, les sons, les phases de rechargement et la mécanique intrinsèque. PointBlank prend en charge les ponts séparés 1.11.1 et 2.1.0; SuperbWarfare le support est épinglé à la construction finale vérifiée 0.8.9. Les canons spéciaux non pris en charge ou les canons de mêlée seulement sont fermés.

`Melee` lit des objets non-TACZ de l'inventaire du joueur. L'intégration Better Combat n'enregistre pas un identifiant d'animation de remplacement. Au moment de l'attaque, il résout l'ensemble d'attaque et pose effectivement enregistré pour l'arme retenue. Le support d'attaque de mêlée à main vide est également disponible pour les configurations capables de mêlée.

`Visual & FX` stocke chaque skin DNPC ou CustomNPCs pondéré comme un chemin de texture local ou une URL HTTP/HTTPS, plus un modèle explicite `Steve` ou `Alex`, des superpositions et des paramètres de cape. Il ne modifie pas la texture fournie. `Armor` stocke les ensembles complets dans de véritables fentes pour la tête, la poitrine, les jambes et les pieds. Les aperçus Gun, Melee et Armor montrent le modèle, la peau, l'armure et l'arme sélectionnés ensemble.

La version 0.2.1 affiche les champs de chance directement sur les rangées d'armes, de skin et de pool d'armures. La modification d'une chance ne redistribue pas les autres entrées, et un pool multi-entrées doit totaliser `100%` avant d'enregistrer. `Equalize` redistribue les entrées uniquement lorsqu'on appuie dessus, tandis qu'un pool à une entrée reste à `100%`. Le pool d'armures affiche jusqu'à cinq rangées à la fois; utilisez la molette de la souris ou sa barre de défilement interne pour les entrées restantes.

## Ordre d'équilibrage

1. Confirmez la position `Ranged` ou `Auto` avec une arme.
2. Réglez `Max Distance` et le comportement en ligne de mire.
3. Réglez la précision fixe et `RPM Mode: TACZ Native`.
4. Réglez les politiques sur les armes à feu et les dommages au corps à corps.
5. Ajouter `Move While Firing` ou mouvement tactique.
6. Ajoutez la commutation de mêlée et le repli vide-ammoniaque.
7. Ajoutez des armes à feu, de la peau et des armures aléatoires.
8. Ajoutez des plages de rafales, une rampe de précision et un timing de repositionnement aléatoire uniquement après que le comportement normal soit stable.
9. Ajoutez des règles de posture avancées.
10. Ajoutez le feu suppressif et la couverture expérimentale en dernier, après que le mouvement ordinaire et le comportement en ligne de mire soient confirmés.

## Appliquer un ensemble de skins DNPC

Les ensembles de skins DNPC appliquent la texture et le modèle Steve/Alex choisis. Activez **Init Event**, puis définissez les candidats et probabilités pour le tirage à la création/au chargement. S’il est désactivé ou si l’ensemble est vide, l’apparence actuelle reste. Les ticks de combat et la sauvegarde ne relancent pas le tirage.
