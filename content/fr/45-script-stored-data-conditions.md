---
title: CustomNPCs Intégration des données stockées
slug: script-stored-data-conditions
order: 128
description: Read player, context entity, and world CustomNPCs Données stockées à partir de conditions DRM, avec des exemples complets de configuration et de script.
product: core
category: API de script
section: script-api
status: Stable
version: 0.3.1
audience: CustomNPCs Script et DRM condition auteurs
tags:
  - script
  - customnpcs
  - storeddata
  - condition
translationSource: en
translationMethod: assisted
---

## Utiliser une étape de quête enregistrée comme condition de dialogue

Utilisez cette option pour enregistrer la troisième étape de la quête du joueur et n'autoriser le choix que pour la troisième étape ou plus. Décidez d'abord la clé et le numéro, puis entrez la même clé dans l'éditeur de conditions. Pour une récompense unique, la [Récompense de dialogue basée sur des tags](#core/dialogue-rewards) est un autre flux de travail disponible.

![Utilisez une étape de quête enregistrée comme résultat de condition de dialogue.](assets/media/guides/drm-031-forge1201-apis/api-stored-condition.png "DRM 0.3.1 / Forge 1.20.1 avec CustomNPCs. Données stockées par le joueur réel my_pack.quest.stage3 laissez-passer Numéro / > 3. L'apparence du zombie vient de l'exemple de modèle précédent; cette condition lit la valeur du joueur.")

## Ce que fait cette intégration

Les `cnpc_stored_data` condition lets DRM lire les valeurs écrites à travers le CustomNPCs API de script `getStoreddata()`. Un script peut enregistrer une phase de quête, une phase de boss ou un chapitre du monde, puis DRM peut utiliser cette valeur pour contrôler les dialogues, les téléporteurs, la disponibilité des quêtes et les messages restants.

Cette intégration est **en lecture seule**. DRM lit et compare une valeur mais ne la crée, ne la modifie ou ne la supprime jamais. Utilisez les méthodes de script CustomNPCs telles que `put` et `remove` pour modifier les données.

```text
CustomNPCs script writes a value
        ↓
Player / context entity / world Stored Data
        ↓
DRM cnpc_stored_data condition reads and compares it
        ↓
Dialogue route, choice, teleporter, or quest availability is decided
```

:::warning Mod requis
CustomNPCs doit être chargé sur le serveur pour que cette condition soit évaluée. Si le mod ou son API de script n'est pas disponible, la condition échoue et retourne tranquillement `false`.
:::

## démarrage rapide

### 1. Écrire une valeur à partir d'un script CustomNPCs

Ajoutez ceci au script `Interact` d'un PNJ. En cliquant sur le PNJ, le numéro `3` est stocké sur le lecteur.

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.quest.stage", 3);
    event.player.message("Quest stage changed to 3.");
}
```

### 2. Ajouter une condition DRM

Ajoutez `CustomNPCs Stored Data` dans un éditeur de condition DRM et entrez ces valeurs.

| Terrain | Valeur |
| --- | --- |
| Type | `CustomNPCs Stored Data` |
| Portée | `Player` |
| Clé | `my_pack.quest.stage` |
| Opérateur | `>=` |
| Type de valeur | `Number` |
| Valeur attendue | `3` |

La condition ne passe maintenant que lorsque `my_pack.quest.stage` peut être lu comme un nombre supérieur ou égal à `3`.

:::note Inputs éditeur et JSON
Entrez seulement `3` dans Valeur attendue. Vous n'avez pas besoin de taper des guillemets JSON ou un fragment tel que `"value": "3"`. Les exemples JSON plus tard sont des références pour l'édition manuelle de fichiers et le développement d'addons.
:::

## Éditeurs et contexte soutenus

Sélectionnez `CustomNPCs Stored Data` dans l'éditeur de condition partagée.

| Fonctionnalité | Emplacement typique | `Player` | `Context Entity` | `World` |
| --- | --- | --- | --- | --- |
| Dialogue | Noeud, itinéraire de départ et choix Conditions | Oui | Oui; dialogue en cours PNJ | Oui |
| Téléporteur | Conditions d'interaction et de destination Conditions d'accès | Oui | Oui; PNJ téléporteur | Oui |
| Quest | Disponibilité → Conditions supplémentaires → Conditions | Oui | Seulement quand ce chemin d'évaluation a un contexte PNJ | Oui |
| Remnant Message | Conditions d'utilisation et conditions de message | Oui | Non ; les chemins d'exécution courants ne passent pas une entité de contexte | Oui |

Soyez prudent avec `Context Entity` dans les quêtes. Les vérifications de quêtes pilotées par des PNJ peuvent fournir un PNJ, tandis que les mises à jour automatiques, les commandes et les vérifications d'antécédents peuvent s'exécuter sans un. Utilisez `Player` ou `World` lorsque le résultat doit être cohérent sur chaque chemin d'évaluation.

## Champs d'état

### Portée

`Scope` sélectionne l'objet dont les données stockées sont lues.

| Éditeur Valeur | Valeur JSON | Propriétaire des données | Accès aux scripts correspondants |
| --- | --- | --- | --- |
| Joueur | `player` | Joueur en cours d'évaluation | `event.player.getStoreddata()` |
| Entité contextuelle | `context_entity` | Entité passée avec la condition, normalement le PNJ actuel | `event.npc.getStoreddata()` |
| Monde | `world` | Monde du serveur que le joueur évalué occupe actuellement | `event.player.getWorld().getStoreddata()` ou `event.npc.getWorld().getStoreddata()` |

Les données stockées dans le monde sont spécifiques aux dimensions. Ne supposez pas qu'une valeur écrite dans l'Overworld fait référence au même propriétaire de données dans le Nether. DRM lit le courant du joueur évalué `ServerLevel`.

### Clé

La clé doit correspondre exactement à la chaîne utilisée avec `put`, y compris la casse.

```js
event.player.getStoreddata().put("my_pack.quest.stage", 3);
```

La clé DRM correspondante est :

```text
my_pack.quest.stage
```

Une clé blanche échoue toujours. Clés de préfixe pour éviter les collisions entre les packs de scripts.

```text
my_pack.quest.stage
my_pack.boss.defeated
my_pack.dialogue.blacksmith_intro
```

### Opérateur

| Opérateur | Signification | Valeur attendue requise |
| --- | --- | --- |
| `exists` | Passe quand la clé existe | Non |
| `not_exists` | Passer lorsque les données stockées ont été atteintes avec succès et que la clé est absente | Non |
| `==` | Passer lorsque les valeurs réelles et attendues sont égales | Oui |
| `!=` | Passer lorsque les valeurs réelles et attendues diffèrent | Oui |
| `>` | Le nombre réel est plus grand que prévu | Oui |
| `>=` | Le nombre réel est supérieur ou égal à celui attendu | Oui |
| `<` | Le nombre réel est inférieur aux prévisions | Oui |
| `<=` | Le nombre réel est inférieur ou égal à celui attendu | Oui |

La sélection de `exists` ou `not_exists` masque le type de valeur et la valeur attendue car seule la présence de clé est cochée.

### Type de valeur

| Type de valeur | Article premier | Utilisation recommandée |
| --- | --- | --- |
| Auto | Une `Number` réelle utilise la comparaison numérique ; une chaîne réelle utilise la comparaison de chaînes | Utilisation générale lorsque le type stocké est fiable |
| Chaîne | Comparaison exacte et sensible à la casse; ne prend en charge que `==` et `!=` | Noms d'état, ID, drapeaux |
| Nombre | Convertit un nombre ou une chaîne numérique en un double fini avant de comparer | Stages, scores, compteurs, chronomètres |

La comparaison des chaînes est sensible à la casse: `READY` et `ready` sont différents. Il n'y a pas d'ordre `>`, `>=`, `<` ou `<=`.

Le mode Nombre accepte une valeur numérique ou un texte numérique tel que `"3.5"`. Texte vierge, `abc`, `NaN` et infini sont invalides et échouent.

:::warning Booléens et objets complexes
Le comparateur prend actuellement en charge les valeurs `Number` et chaîne. Le booléen, le tableau, la carte et d'autres objets complexes peuvent être vérifiés avec `exists`, mais les comparaisons de valeurs échouent. Enregistre les drapeaux comme `1`/`0` ou `"yes"`/`"no"` lorsqu'ils doivent être comparés.
:::

## Script Recettes

### Stocker une étape de quête de joueur

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.quest.stage", 3);
}
```

DRM condition:

```text
Scope: Player
Key: my_pack.quest.stage
Operator: >=
Value Type: Number
Expected Value: 3
```

### Stocker un état de chaîne

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.quest.state", "ready");
}
```

DRM condition:

```text
Scope: Player
Key: my_pack.quest.state
Operator: ==
Value Type: String
Expected Value: ready
```

### Vérifier uniquement si une valeur existe

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.intro.seen", 1);
}
```

Utilisez `not_exists` pour les joueurs qui n'ont pas vu l'introduction et `exists` pour les joueurs qui ont. N'entrez pas de valeur attendue pour l'un ou l'autre opérateur.

### Stocker une phase de boss PNJ

```js
function init(event) {
    event.npc.getStoreddata().put("my_pack.boss.phase", 1);
}

function damaged(event) {
    if (event.npc.getHealth() <= event.npc.getMaxHealth() * 0.5) {
        event.npc.getStoreddata().put("my_pack.boss.phase", 2);
    }
}
```

Utilisez cette condition sur le dialogue ou un téléporteur attaché à ce PNJ :

```text
Scope: Context Entity
Key: my_pack.boss.phase
Operator: >=
Value Type: Number
Expected Value: 2
```

Cet exemple ne passe pas dans l'évaluation automatique des quêtes ou les chemins Remnant Message qui n'ont pas d'entité de contexte.

### Stocker un chapitre du monde partagé

```js
function interact(event) {
    event.npc.getWorld().getStoreddata().put("my_pack.world.chapter", "chapter_2");
}
```

DRM condition:

```text
Scope: World
Key: my_pack.world.chapter
Operator: ==
Value Type: String
Expected Value: chapter_2
```

Tous les joueurs de ce même monde partagent cette valeur.

### Incrémenter une valeur numérique en toute sécurité

```js
function interact(event) {
    var data = event.player.getStoreddata();
    var current = data.has("my_pack.kill.count")
        ? Number(data.get("my_pack.kill.count"))
        : 0;

    if (!isFinite(current)) {
        current = 0;
    }

    data.put("my_pack.kill.count", current + 1);
}
```

Utilisez `Value Type: Number`, `Operator: >=` et `Expected Value: 10` pour vérifier qu'il y a dix comptes ou plus.

### Supprimer ou réinitialiser une clé

```js
function interact(event) {
    event.player.getStoreddata().remove("my_pack.quest.stage");
}
```

Après la suppression, `not_exists` passe tandis que `exists` et toutes les comparaisons de valeurs échouent. Définir une valeur à `0` n'est pas la même chose que supprimer sa clé.

### Afficher une valeur pour le débogage

```js
function interact(event) {
    var data = event.player.getStoreddata();
    var key = "my_pack.quest.stage";
    var value = data.has(key) ? String(data.get(key)) : "<missing>";
    event.player.message(key + " = " + value);
}
```

## Exemple complet : Déverrouiller un choix de dialogue

Le but est d'afficher un choix de dialogue gatekeeper uniquement après que le joueur ait reçu la permission d'un autre PNJ.

### Script PNJ d'autorisation

```js
function interact(event) {
    var data = event.player.getStoreddata();
    data.put("my_pack.gate.permission", "granted");
    event.player.message("You received permission to pass the gate.");
}
```

### Condition de choix du dialogue Gatekeeper

```text
Type: CustomNPCs Stored Data
Scope: Player
Key: my_pack.gate.permission
Operator: ==
Value Type: String
Expected Value: granted
```

Fixez cette condition à un choix `Ask to open the gate`. Seuls les joueurs autorisés le voient. Joindre la même condition aux conditions d'accès d'une destination de téléporteur lorsque le mouvement réel doit également être protégé.

## Combinaison des conditions

Les modes de groupe de condition fonctionnent comme suit.

| Mode | Résultat |
| --- | --- |
| PAYS | Chaque condition doit être `true` |
| OU | Au moins une condition doit être `true` |

Pour exiger l'étape de quête 3 et un crochet tripwire utilisé comme clé, placez une condition Données stockées et une condition Objet dans un groupe ET.

```text
AND
├─ CustomNPCs Stored Data: my_pack.quest.stage >= 3
└─ Item: minecraft:tripwire_hook >= 1
```

Un groupe de condition désactivé n'est pas appliqué. Quest enregistre l'état activé et le mode AND/OR sous `Availability → Additional Conditions`, afin de vérifier que le groupe n'a pas été laissé désactivé.

## Référence du champ JSON

Les utilisateurs normaux de l'éditeur n'ont pas besoin d'écrire ce JSON. Utilisez-le pour le développement d'addons, l'inspection de fichiers ou la récupération manuelle.

```json
{
  "type": "cnpc_stored_data",
  "scope": "player",
  "key": "my_pack.quest.stage",
  "op": ">=",
  "valueType": "number",
  "value": "3"
}
```

| Terrain | Requis | Valeurs autorisées / Signification |
| --- | --- | --- |
| `type` | Oui | Doit être `cnpc_stored_data` |
| `scope` | Oui | `player`, `context_entity` ou `world` |
| `key` | Oui | Clé de données stockée non vierge |
| `op` | Oui | `exists`, `not_exists`, `==`, `!=`, `>`, `>=`, `<`, `<=` |
| `valueType` | Pour la comparaison des valeurs | `auto`, `string` ou `number` |
| `value` | Pour la comparaison des valeurs | Valeur attendue de l'éditeur |

### Tableau des conditions de dialogue

```json
{
  "conditionMode": "and",
  "conditions": [
    {
      "type": "cnpc_stored_data",
      "scope": "player",
      "key": "my_pack.quest.stage",
      "op": ">=",
      "valueType": "number",
      "value": "3"
    }
  ]
}
```

### Groupe de condition du téléporteur

```json
{
  "interactionConditions": {
    "enabled": true,
    "conditionMode": "and",
    "conditions": [
      {
        "type": "cnpc_stored_data",
        "scope": "player",
        "key": "my_pack.gate.permission",
        "op": "==",
        "valueType": "string",
        "value": "granted"
      }
    ]
  }
}
```

Les conditions spécifiques à la destination utilisent la même structure de groupe dans le `accessConditions` de cette destination.

### Conditions préalables à la quête

```json
{
  "prerequisites": {
    "conditionsEnabled": true,
    "conditionMode": "and",
    "conditions": [
      {
        "type": "cnpc_stored_data",
        "scope": "player",
        "key": "my_pack.quest.stage",
        "op": ">=",
        "valueType": "number",
        "value": "3"
      }
    ]
  }
}
```

## Migrer l'héritage `stored` Type

L'ancienne condition DRM `stored` a été supprimée. La liste des conditions et le nouveau JSON n'utilisent que `cnpc_stored_data`.

Si un dialogue existant, quête, téléporteur ou Remnant Message JSON contient toujours `"type": "stored"`, DRM le lit comme un alias hérité de `cnpc_stored_data`. L'enregistrement de ce fichier via l'éditeur de conditions canoniques `type` à `cnpc_stored_data`. DRM ne lit plus un magasin de valeur d'exécution existant distinct.

Les anciens JSON peuvent ne pas contenir de portée ou de type de valeur. Dans ce cas, les valeurs par défaut sont `scope: "player"` et `valueType: "auto"`; les existants `key`, `op` et `value` restent en usage. Sélectionnez `CustomNPCs Stored Data` pour chaque nouvelle condition.

## Règles fermées

La condition est server-authoritative. Les échecs de configuration non valides et de mod optionnel n'accordent pas accidentellement l'accès.

| Situation | Résultat |
| --- | --- |
| La clé existe après un accès réussi | `exists` est `true`; `not_exists` est `false` |
| Les données stockées sont accessibles mais la clé est absente | Seul `not_exists` est `true`. |
| CustomNPCs Manque | Chaque opérateur retourne `false` |
| CustomNPCs L'API de script est indisponible | Chaque opérateur retourne `false` |
| `Context Entity` est sélectionné mais aucune entité n'a été fournie | Chaque opérateur retourne `false` |
| Portée inconnue, opérateur ou type de valeur | `false` |
| Clé vierge | `false` |
| La conversion numérique échoue | `false` |
| La valeur réelle est booléenne ou un objet complexe. | Comparaisons de valeurs retour `false` |

Une API CustomNPCs indisponible est intentionnellement différente d'une clé manquante. Par conséquent `not_exists` ne passe pas accidentellement lors d'un échec d'intégration.

## Dépannage

### La condition échoue toujours

Vérifiez ce qui suit dans l'ordre.

1. Confirmez que CustomNPCs est chargé sur le serveur.
2. Confirmez que Type est `CustomNPCs Stored Data`. Sauvegardez l'ancien `stored` JSON pour canoniser le type.
3. Correspond à l'objet utilisé par le script.
4. Cochez Case, ponctuation, soulignements et espaces blancs.
5. Pour la comparaison numérique, utilisez Numéro et vérifiez que la valeur stockée est numérique.
6. Pour Context Entity, vérifiez que la fonctionnalité actuelle et le chemin d'exécution fournissent un contexte PNJ.
7. Affiche la valeur réelle à partir d'un script de débogage CustomNPCs.

### Fichier journal

Lors de la résolution ou de la lecture de l'API d'intégration CustomNPCs lance une exception, DRM enregistre chaque signature d'échec unique une fois pour éviter le spam de journal.

```text
config/dochi_rpg_maker/debug.log
```

Rechercher :

```text
CustomNPCs Stored Data access failed
```

Une clé normalement manquante ou une comparaison `false` ordinaire n'est pas enregistrée comme une erreur.

### Erreurs courantes

| Erreur | Fixer |
| --- | --- |
| Script écrit les données du joueur, mais Scope is World | Changer la portée du joueur |
| Script écrit numérique `3` et condition compare String `03` | Comparer le nombre `3` ou standardiser le format stocké |
| Script écrit `ready` mais condition attend `READY` | Match cas de lettre |
| Remnant Message utilise Context Entity | Utiliser le joueur ou le monde |
| La clé est définie sur `0` et `not_exists` est attendue. | Appelez `remove(key)` pour supprimer la clé |
| Le booléen `true` est comparé à `==` | Enregistre un nombre ou une chaîne comme `1` ou `"true"` |

## Conventions recommandées

- Préfixez les touches comme `pack_id.system.field` pour éviter les collisions.
- Stockez les étapes et les compteurs sous forme de nombres; stockez les noms d'état et les identifiants sous forme de chaînes.
- Conservez un type de valeur pour chaque clé dans chaque script qui l'écrit.
- Préférez le joueur ou le monde lorsqu'une condition doit fonctionner sur chaque chemin d'évaluation.
- Rappelez-vous qu’une valeur mondiale est partagée par tous les joueurs dans cette dimension.
- Préférez l'éditeur de condition DRM à l'édition manuelle JSON.
