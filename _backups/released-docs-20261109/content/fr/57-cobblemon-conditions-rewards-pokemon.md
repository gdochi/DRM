---
title: Conditions, après les actions et Pokemon lui-même
slug: cobblemon-conditions-rewards-pokemon
order: 522
description: Comprenez les conditions de round, les résultats basés sur les Actions Après, le comportement de réessai et Pokémon Lui-même.
product: drm-cobblemon-editor
category: Cobblemon Éditeur
section: trainer
status: Projet
version: Fabric / NeoForge 0.2.9
audience: Créateurs construisant des batailles conditionnelles et Pokémon PNJ
tags:
  - conditions
  - rewards
  - pokemon-itself
translationSource: en
translationMethod: assisted
---

## Sélectionnez le tour avant conditions ou récompenses

Dans **Battle Config → Conditions**, vérifiez le nombre rond au-dessus de la liste, puis utilisez **Add**. **All (AND)** nécessite toutes les conditions du groupe.

![1 Toutes les conditions et.](assets/media/guides/cobble-029-neo1211/cobble-conditions.png "Cobblemon Éditeur 0.2.9 / NeoForge 1.21.1, interface utilisateur anglaise. Cochez à nouveau Modifier après avoir changé de round.")

![Après Actions avec le mode Action et la stratégie Exécuter.](assets/media/guides/cobble-029-neo1211/cobble-after-actions.png "Le mode Action contrôle l'ordre d'exécution; Exécuter la stratégie contrôle la répétition. Pour les récompenses après la conversation, changez le Tout par défaut en Séquentiel et placez les récompenses après le dialogue.")

## Dialogue séquentiel et récompenses

Définissez le mode d'action de l'éditeur d'entraîneur sur Séquentiel pour attendre la fin du dialogue avant les récompenses suivantes. Chaque tour permet un dialogue. L'annulation ou la déconnexion arrête les subventions ultérieures ; après avoir reconnecté ou redémarré, interagissez à nouveau avec le PNJ pour continuer les actions restantes. Voir le [étapes de configuration](#drm-cobblemon-editor/cobblemon-trainer-editor).

## Quand les conditions tournent

Un rond supporte jusqu'à 32 conditions. Un groupe vide passe. `AND` nécessite toutes les conditions, tandis que `OR` en nécessite au moins une.

Le serveur évalue les conditions tout en acquérant une cible automatique et à nouveau immédiatement avant le début de la vraie bataille. Les éléments ou balises modifiés lors de la lecture de la présentation peuvent donc annuler le démarrage.

## Comportement exact de la condition

| Type | Clé | Valeur | Opérations |
| --- | --- | --- | --- |
| `tag` | Tableau d'affichage | Inutilisé | `has`, `not` |
| `item` | ID de l'article | Quantité | `has`, `not`, `>=`, `<=`, `==`, `!=`, `>`, `<`; compte les éléments correspondants dans l'inventaire |
| `stored` | Clé de données stockées | Valeur de comparaison | Comparaison numérique si les deux valeurs s'analysent en nombres, sinon chaîne `==` ou `!=` |
| `advancement` | ID d'avancement | Inutilisé | `has`, `not` sur la base de l'achèvement |
| `cobblemon_party` | Espèce | Quantité | Compte les espèces dans l'équipe active ; `cobblemon:` peut être omis |

L'élément `has` signifie au moins un et `not` signifie zéro. L'élément NBT ne fait pas partie de ce nombre d'états de l'entraîneur.

:::note Valeurs stockées
`stored` cible l'exécution de données stockées orientée script CustomNPCs utilisée par le support des dialogues DRM. Ce n'est pas un lecteur JSON-path arbitraire.
:::

## Après l'ordre de sélection Action

Un tour prend en charge jusqu'à 32 Après Actions. Chaque action peut s'exécuter sur `win`, `loss`, `flee` ou `battle_end` ; les actions partageant un résultat correspondant peuvent s'exécuter ensemble.

1. Vérifiez la politique de subvention contre la progression du joueur.
2. Lancez la Chance de chaque récompense indépendamment.
3. `All` chaque récompense ; `One random` Choisissez une récompense éligible.
4. Si au moins une récompense réussit, enregistrez le tour comme récompensé lorsque la politique a besoin de cet état.

| Politique | Comportement |
| --- | --- |
| `Every clear` | Tentatives de correspondance des actions après chaque résultat de bataille |
| `First clear only` | Seulement pendant que le nombre de PNJ est nul |
| `Once per round` | Un dossier de subvention réussi par tour |

La probabilité varie de 0.0 à 1.0. En `One random`, seules les entrées ayant réussi Chance participent à la sélection.

## Après exécution de l'action

| Type | Opérations | Comportement du serveur |
| --- | --- | --- |
| `item` | `give`, `take` | Quantité 1–6400. `take` est transactionnel et ne supprime rien à moins que le montant total existe. Débordement de `give` tombe sur le joueur. |
| `tag` | `add`, `remove` | Modifier les balises du tableau de bord. |
| `stored` | `set`, `add`, `subtract`, `remove` | Définit une chaîne, effectue des modifications numériques ou supprime la clé stockée. |
| `command` | `run` | S'exécute silencieusement au niveau d'autorisation du serveur 4 ; les barres obliques menantes sont dépouillées. |
| `advancement` | `grant`, `revoke` | Ne change que l'avancement nommé. |
| `currency` | `add`, `take`, `set` | Change l'équilibre sélectionné DRM ou CobbleDollars. Les montants non valides ou négatifs échouent ; zéro est autorisé pour `set`. CobbleDollars a besoin de son fournisseur optionnel. |
| `cobblemon_give` | `give` | Crée l'espèce sélectionnée au niveau 1–100 et l'ajoute à l'équipe active. |
| `ftb_complete_quest` / `ftb_complete_task` | `complete` | Termine la quête ou la tâche FTB sélectionnée lorsque FTB Quests est installé. |
| `npc_hide` / `npc_despawn` | — | Masque ou supprime le PNJ après que les actions ordinaires aient réussi. |

Les commandes prennent en charge `{player}`, `{uuid}`, `{npc}` et `{battle}` remplacements. Testez chaque commande sur un serveur intermédiaire car il s'exécute avec une autorité de serveur élevée.

## Rangées de condition pratique

| Objectif | Type | Fonctionnement | Clé | Valeur |
| --- | --- | --- | --- | --- |
| Nécessite une étiquette de badge | `tag` | `has` | `badge_boulder` | Blanc |
| Nécessite 16 émeraudes | `item` | `>=` | `minecraft:emerald` | `16` |
| Nécessite un Pikachu en équipe | `cobblemon_party` | `>=` | `cobblemon:pikachu` | `1` |
| Nécessite un avancement inachevé | `advancement` | `not` | ID d'avancement | Blanc |

Les groupes sont plats. Pour représenter `(A AND B) OR C`, précalculez une balise ou une valeur stockée au lieu de vous attendre à des groupes imbriqués.

## Pokémon lui-même

Pokémon lui-même utilise un Pokémon complet par tour au lieu d’une équipe d’entraîneurs. Il prend en charge les mêmes conditions rondes et les contrôles After Actions basés sur les résultats ; les contrôles IA, inventaire et gimmick réservés aux formateurs sont désactivés.

- L'exécution est une bataille Cobblemon PVE à un seul adversaire.
- La présentation par défaut est `presets/vs_pokemon.json`.
- L'espèce, la forme, les aspects, l'état brillant, le niveau, la nature, la capacité, les mouvements, la balle et l'objet tenu définissent l'adversaire.
- L'échelle d'apparence est 0.05–12.0 ; Pose vaut par défaut `AUTO` ; blank Animation utilise l'état automatique.
- `Shiny` est Pokémon données, alors que `Shining` est une mise en évidence de NPC-render séparée.

L'application de Pokemon lui-même dérive également l'apparence CustomNPCs Pokémon des espèces plus la forme / les aspects. Conservez les modifications d'apparence finales dans le document Pokémon lui-même afin qu'une nouvelle application ultérieure ne restaure pas de manière inattendue les anciennes valeurs.

## Séquence de construction recommandée

1. Modifiez uniquement les espèces et le niveau par défaut et vérifiez la création de la bataille.
2. Ajoutez Forme et Aspects, puis comparez le modèle mondial et le modèle de combat.
3. Verrouiller la nature, la capacité, les mouvements et l'objet détenu.
4. Réglez l'échelle, la pose, l'animation et la brillance.
5. Attribuer une présentation personnalisée et enregistrer. Un PNJ qui suit ce chemin source n'a normalement pas besoin d'être réappliqué.

## Monnaie après les actions

Pour `currency`, choisissez DRM devise ou CobbleDollars et une opération: `add`, `take` ou `set`. `set` remplace le solde et peut le mettre à zéro. Les montants non valides / négatifs et les fournisseurs indisponibles échouent. CobbleDollars est facultatif et ses récompenses ne peuvent pas fonctionner sans le fournisseur.

## Récompenses et forfaits d'objets personnalisés

Ouvrir après les actions → Article → Recherchez, puis choisissez Articles ou Mon inventaire. La copie préserve les noms, les traditions, les enchantements, les dommages et les données personnalisées sans consommer la pile d'origine. La quantité vient de l'action. Effacer les données d'élément enregistrées supprime les composants tout en conservant l'ID de l'élément et la quantité.

La suppression des composants correspond à la fois ID et composants et ne consomme pas partiellement un total insuffisant. Le champ optionnel JSON est itemComponentsSnbt. Une défaite confirmée de l'entraîneur après la défaite du joueur est une fuite; une défaite ordinaire reste une perte. Configurez leurs déclencheurs de récompense séparément.

## Dialogue d'après-bataille DRM

Choisissez **Open dialogue after battle** dans Après les actions et recherchez un jeu de dialogues. Configurez les conditions de résultat, la probabilité et la répétition comme avec d'autres actions. DNPC les entraîneurs prennent en charge ce chemin après les verrous de combat et la finition de manutention de retour. Le dialogue n'a pas besoin de `go_battle`. Les actions non exécutées utilisent le flux de travail existant de stockage et de réessai des actions en attente.
