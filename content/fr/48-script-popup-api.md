---
title: Popup Maker Script API
slug: script-popup-api
order: 131
description: Utilisez drmPopup dans les scripts CustomNPCs pour lire les définitions de Popup Maker et remplacer le texte de présentation ou la chronologie.
product: core
category: API de script
section: script-api
status: Stable
version: 0.3.1
audience: CustomNPCs auteurs de dialogues, de quêtes et de présentations de combat
tags:
  - script
  - customnpcs
  - popup
  - forge
translationSource: en
translationMethod: assisted
---

## Afficher une fenêtre contextuelle enregistrée à partir d'un script

Créez d'abord le titre et le corps en [Popup Maker](#core/world-npc-tools) et enregistrez une définition. Un script sélectionne ensuite ce nom de fichier et le lit pour un joueur. Cet exemple enregistre village_entry et l'appelle avec 10-tick fade-in, 80-tick hold et 20-tick fade-out.

![Réel affiche une fenêtre contextuelle enregistrée à partir d'un résultat de script.](assets/media/guides/drm-031-forge1201-apis/api-popup-shown.png "DRM 0.3.1 / Forge 1.20.1 avec CustomNPCs. L'appel réel PopupScriptApi.timed envoie à un joueur et affiche Village Gate. Ce n'est pas un déclencheur d'entrée de région automatique.")

## Aperçu général

`drmPopup` est un objet de script global CustomNPCs qui lit les définitions enregistrées par Popup Maker pour les joueurs de serveur. Il expose uniquement les actions de présentation. Les opérations d'édition, de liste et de rechargement des définitions restent dans l'interface graphique de Popup Maker.

```js
function interact(event) {
    drmPopup.show(event.player, "village_entry.json");
}
```

Le premier argument résout les joueurs récepteurs. La seconde est un fichier de définition de Popup Maker ; le suffixe `.json` est facultatif.

:::warning Exigence d'exécution
`drmPopup` est enregistré lorsque Forge 1.20.1 DRM et CustomNPCs sont chargés ensemble. Appelez-le sur le serveur. Une cible qui ne résout aucun joueur serveur renvoie `0`.
:::

## Configuration

1. Ouvrir **Popup Maker** à partir de l'intégré DRM Liste des éditeurs.
2. Définissez le titre, le sous-titre, le corps, le fondu-in, le maintien, le fondu-out, le canal et le comportement du conflit.
3. Sélectionnez une GUI JSON et utilisez **Edit Layout** lorsque les positions ou les textures des composants doivent être modifiées.
4. Enregistrez la définition et passez ce nom de fichier à `drmPopup`.

Les définitions sont gérées sous les données `dochi_rpg_maker/popups/definitions` du serveur et chargent leur GUI JSON sélectionné à partir du magasin GUI partagé. L'API de script n'accepte pas la définition brute JSON.

## Tableau de méthodes complet

| Méthode | Retours | Comportement |
| --- | ---: | --- |
| `show(targets, definition)` | Joueurs envoyés | Lecture de la définition enregistrée inchangée |
| `text(targets, definition, text)` | Joueurs envoyés | Remplace seulement le corps `text` |
| `timed(targets, definition, fadeIn, hold, fadeOut)` | Joueurs envoyés | Remplacer les trois segments de la ligne du temps |
| `timed(targets, definition, fadeIn, hold, fadeOut, text)` | Joueurs envoyés | Horaire de dépassement et un corps non vide |
| `stop(targets, instanceKey)` | Joueurs envoyés | Arrêter la clé d'instance popup correspondante |
| `clear(targets)` | Joueurs envoyés | Supprimer tous les popups actifs et en file d’attente |
| `lastError()` | Chaîne | Raison d'échec la plus récente, vide après le succès |

Les arguments de synchronisation sont des ticks Minecraft ; 20 les ticks sont normalement d'environ une seconde.

:::note Ce que `timed` signifie
`timed` ne crée pas d'interface de compte à rebours séparée. Il modifie la durée de la présentation de fade-in, de hold et de fade-out pour cet appel.
:::

## Objectifs

`targets` peut être un joueur serveur, un encapsuleur de joueur CustomNPCs, un tableau ou une collection itérable. Les joueurs en double sont envoyés une fois.

```js
drmPopup.show(event.player, "area_title");

drmPopup.text(
    [event.player, anotherPlayer],
    "quest_notice.json",
    "Quest updated"
);
```

La résolution est limitée à 1,024 joueurs distincts et à quatre niveaux d'imbrication. Les PNJ et les créatures ordinaires ne peuvent pas recevoir de popup.

## Texte du corps, sauts de ligne et espaces réservés

Utilisez `\n` dans une chaîne JavaScript pour un body line break explicite.

```js
drmPopup.text(
    event.player,
    "area_title.json",
    "Northern Frontier\nA new region has been discovered."
);
```

Le titre, le sous-titre, le corps et le texte du corps surchargé enregistrés prennent en charge les espaces réservés par joueur.

| Formulaires | Valeur |
| --- | --- |
| `@player`, `{player}`, `${player}`, `%player%` | Recevoir le nom du joueur |
| `{uuid}`, `${uuid}`, `%uuid%` | Réception du joueur UUID |
| `@npc`, `{npc}`, `${npc}`, `%npc%` | Nom PNJ fourni par un contexte de présentation DRM |

`@npc` ne se résout automatiquement que lorsqu'un chemin DRM, tel qu'une action de dialogue, ouvre un contexte de présentation PNJ. Un appel direct au script `drmPopup` n'a pas d'argument PNJ, alors composez ce texte explicitement lorsque nécessaire.

```js
var body = String(event.npc.getName()) + "\nhas discovered a new area.";
drmPopup.text(event.player, "area_title.json", body);
```

## Délais de livraison

Ce popup s'efface pour 10 ticks, tient pour 60, et s'efface pour 20.

```js
drmPopup.timed(event.player, "area_title.json", 10, 60, 20);
```

Ajoutez un dernier argument pour surcharger le corps aussi.

```js
drmPopup.timed(
    event.player,
    "quest_notice.json",
    5,
    100,
    15,
    "Objective complete\nReturn to @npc"
);
```

Un corps final vide préserve le corps sauvé. Utilisez `text(targets, definition, "")` lorsque le corps doit être nettoyé.

## Comportement de conflit et arrêt

Les contrôles de valeur `conflict` de la définition se chevauchent dans le même canal.

| Valeur | Comportement |
| --- | --- |
| `replace` | Remplacer le popup de canal actif et sa file d'attente |
| `refresh` | Remplacez le popup actif par une nouvelle instance |
| `queue` | Jouer après la fin du popup actuel |
| `stack` | Jouez simultanément avec l'espacement vertical |
| `ignore` | Ignorer une requête lorsque le canal est actif |

`show`, `text`et `timed` retourne les nombres au lieu des UUID d'exécution générés. Utilisez le `instanceKey` enregistré dans la définition lorsque vous vous arrêtez d'un script.

```js
drmPopup.stop(event.player, "area_title");
drmPopup.clear(event.player);
```

## Limites et erreurs de politique

L'interface graphique de stratégie popup applique ces valeurs aux scripts :

- `allowTextOverride` pour `text` et les appels de texte `timed`
- `allowTimingOverride` pour `timed`
- `maxTextLength` pour le titre, le sous-titre et le corps
- `maxDurationTicks` pour le calendrier complet
- `maxActivePerPlayer` et `maxQueuedPerPlayer` pour les limites d'exécution

Une définition manquante ou une interface graphique, ou un contournement bloqué, renvoie `0` et stocke la raison dans `lastError()`.

```js
var sent = drmPopup.text(event.player, "quest_notice.json", "Quest updated");
if (sent == 0) {
    event.npc.say("popup failed: " + drmPopup.lastError());
}
```

## Combiner les compétences Cross-Mod

```js
function interact(event) {
    var ok = drmSkill.use(
        event.npc,
        "cataclysm:void_rune",
        event.player,
        4,
        drmSkill.options().set("damage", 14)
    );

    if (ok) {
        drmPopup.text(
            event.player,
            "skill_notice.json",
            "Void Rune\nCooldown: " + drmSkill.lastCooldownTicks() + " ticks"
        );
    }
}
```

Voir **Cross-Mod Skill Script API** pour la découverte du fournisseur, les identifiants de compétence, les lancers de cible et de direction, les options, les codes de résultat et les temps de recharge.

## Dépannage

1. Si `drmPopup` est indéfini, vérifiez que Forge DRM et CustomNPCs sont chargés ensemble.
2. `Unable to load popup definition` signifie que le nom de fichier Popup Maker est incorrect ou manquant.
3. Une erreur de chargement d'interface graphique signifie que l'interface graphique JSON sélectionnée est absente du magasin d'interface graphique partagé.
4. Si seulement `text` ou `timed` échouent, inspectez les commutateurs de remplacement de la stratégie Popup.
5. Pour une fenêtre contextuelle invisible, inspectez la définition et le composant `enabled`, le comportement de conflit de canal et les limites actives/de file d’attente.
