---
title: Sélection de motifs, combos et phases de santé
slug: mob-editor-phases
order: 260
description: Comprendre l'éligibilité, le score, le rythme et une transition de phase en pourcentage 50.
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

## 1. L'éligibilité vient avant la préférence

Les motifs ne sont pas simplement exécutés de haut en bas.

| Paramètres | Question |
| --- | --- |
| Principaux | Ce modèle peut-il commencer maintenant ? |
| Score | Dans quelle mesure le manager devrait-il le préférer ? |
| Règles de combat → Manager | Comment gérer la répétition, le mouvement et l’attente ? |

Les scores plus élevés ne contournent pas l'état désactivé, la cible / la plage / la phase / les exigences de santé, les temps de recharge ou les conditions supplémentaires.

![Sélection de motifs, pénalités de répétition et récupération dans Manager.](assets/media/guides/battleworks-016-neo1211/battleworks-manager.png "BattleWorks 0.1.6 / NeoForge 1.21.1. La pénalité du même modèle affecte la notation de la resélection, pas la longueur de la scène. Le paramètre par défaut capturé diffère du paramètre 1.0 utilisé pour tester une seule attaque.")

## 2. Testez deux attaques ordinaires

1. Terminer le [Première attaque](#mob-editor/battleworks-first-attack).
2. Ajoutez une poussée en utilisant l'exercice [Box](#mob-editor/battleworks-hitboxes).
3. Activer les deux et donner initialement les deux gammes 0–2.7.
4. Fixez la priorité 10 et le score de base 10.
5. Commencez la pénalité du même modèle autour de 0.5.
6. Combattez à plusieurs reprises et confirmez que les deux peuvent être choisis.

Quelques essais n'établissent pas exactement 50:50 la sélection. Les bonus de distance et les multiplicateurs d'histoire sont également importants.

## 3. Champs d'éligibilité et de score communs

| Terrain | Objet |
| --- | --- |
| gamme Min / Max | Intervalle horizontal de départ et de distance |
| Max Vertical | Différence de hauteur autorisée |
| Min / Max Phase | Intervalle de phase autorisé |
| Gammes Boss / Target Health | Prescriptions relatives au ratio santé |
| Score de base | Préférence initiale |
| Idéal Distance / Distance Pic | Préférence de distance à l'intérieur de l'intervalle autorisé |
| Score HP manquant | Bonus proportionnel à la santé manquante du patron |
| Phase 2 / Phase 3 Bonus | Préférences dans ces phases |
| Priorité | Niveau de sélection fort |

Gardez les attaques ordinaires à la même priorité au début. La priorité n'est pas un petit ajustement de probabilité.

## 4. Lire correctement les multiplicateurs de gestionnaire

| Terrain | Signification |
| --- | --- |
| Sélection étage | Exclure les candidats en dessous du meilleur score × cette valeur |
| Pénalité du même modèle | Multiplicateur pour répéter le dernier motif |
| Pénalité récente | Multiplicateur pour répéter le motif utilisé il y a deux tours |
| Pénalité du même rôle | Multiplicateur pour le rôle précédent |
| Facteur aléatoire | Score la gigue; la sélection pondérée aléatoire existe toujours à zéro |
| Mobilité Urgence / Bonus | Augmenter la préférence après une longue période sans mobilité |
| Max Pénalité Stationnaire / Stationnaire | Réduire les choix stationnaires après une série |

Un multiplicateur de pénalité de 1 laisse le score inchangé; 0 le supprime. Avec une attaque, utilisez la pénalité de même modèle 1 pendant les tests. L'ancien `avoidImmediateRepeat` drapeau seul n'est pas le contrôle de répétition du sélecteur actif.

## 5. Quatre réglages de synchronisation différents

| Réglage | Signification |
| --- | --- |
| Étape de récupération Ticks | Troisième segment de la chorégraphie |
| Retard de récupération | Délai minimal post-modèle |
| Manager Récupération Min / Max | Plage de retard post-modèle aléatoire |
| Core Cooldown / Gestionnaire de temps de recharge global | Restriction de réutilisation sur le motif terminé |

L'attente post-modèle est le maximum du délai de récupération de base et du délai aléatoire du gestionnaire. Par exemple, le noyau 8 avec le gestionnaire 10 – 14 donne 10 – 14 ticks.

Le temps de recharge global n'est pas un verrou partagé supplémentaire sur chaque modèle. Le modèle terminé reçoit `max(pattern cooldown, global cooldown)`. D'autres modèles éligibles peuvent encore être sélectionnés après l'attente post-modèle.

## 6. Lier une barre oblique à une poussée

1. Ouvrez les paramètres Combo de la barre oblique.
2. Reliez le modèle de poussée existant.
3. Commencez par Chance 50 % et Delay 6 ticks.
4. Définissez le gestionnaire Max Combo à au moins 1.
5. Tester à une distance permise par les deux mouvements.

Le suivi vérifie toujours sa cible, sa portée, sa santé, sa phase, sa ligne de vue et son temps de recharge. Gardez les chances de départ égales ou inférieures à 100%; probabilité inutilisée signifie pas de combo. Max Combo 0 désactive les chaînes.

Les modèles passifs ne peuvent pas posséder de liens combo ou être des destinations combo.

## 7. Ajouter la phase 2 à la demi-santé

1. Ouvrir **Combat Rules → Phase / Boss Phases**.
2. Maintenir la phase 1 à 100%.
3. Ajoutez la phase 2, nommez-la Enragée, et fixez **Health At or Below (%) to 50**.
4. Définissez la phase minimale d'une attaque améliorée sur 2.
5. Autoriser les attaques existantes en phase 2 si elles doivent rester disponibles.
6. Réduisez la santé en dessous de la moitié et vérifiez que la nouvelle attaque est éligible.

Le pourcentage de l'éditeur est **50**; JSON `enterAtHealthRatio` est **0.5**.

Phases de verrouillage vers le haut pendant le combat. La guérison ne ramène pas la phase 2 à la phase 1. La perte de cible plus le délai de réinitialisation du combat réinitialise l'état de combat, mais une faible santé restante peut déclencher à nouveau la phase supérieure lors du réengagement.

![Phases de boss avec la phase d'ouverture sélectionnée.](assets/media/guides/battleworks-016-neo1211/battleworks-phases.png "BattleWorks 0.1.6 / NeoForge 1.21.1. L'ouverture utilise actuellement 100. Dans cette build, le label Health At or Below (%) a un préfixe d'erreur Format ; le numéro adjacent est le pourcentage d'entrée-santé. Sélectionnez la deuxième phase pour la définir sur 50.")

## 8. Ajouter une annonce de transition seulement

1. Créez un court motif Enrage Start avec son/titre.
2. Laissez son déclencheur sur le gestionnaire.
3. Autoriser la phase 2 et rendre les conditions cibles/de hauteur/de santé appropriées.
4. Sélectionnez-le comme modèle de transition de la phase 2.
5. Définissez son score de base et chaque bonus de score additif à 0 s'il ne doit jamais entrer dans la sélection ordinaire.

L'exécution de transition est séparée de la sélection de score. Il vérifie toujours les conditions supplémentaires, la cible, la phase, la portée et la santé; la transition forcée actuelle peut contourner le temps de recharge et la ligne de vue ordinaires.

Un grand succès peut sauter les seuils de phase intermédiaire. Ne supposez pas que toutes les transitions intermédiaires sont jouées en séquence. Continuer avec [réactions passives ](#mob-editor/battleworks-passives).
