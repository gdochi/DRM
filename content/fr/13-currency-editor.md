---
title: Currency Editor
slug: currency-editor
order: 85
description: Comment configurer les définitions de devises, la conversion de ramassage d'articles, les soldes et les règles de décès en Currency Editor.
product: core
category: Systèmes centraux
section: currency-editor
status: Stable
version: 0.3.1
audience: Créateurs / Opérateurs
tags:
  - currency
  - editor
translationSource: en
translationMethod: assisted
---

## Créer de l’argent pour votre boutique

Ouvrez **Currency Editor** à partir du sélecteur d'éditeur du noyau. Les écrans anglais suivants proviennent de **DRM 0.3.1 / Forge 1.20.1**.

![Currency Editor avec l'identité de la devise, l'icône, l'affichage du montant, les règles de mort et les paramètres HUD.](assets/media/guides/drm-031-forge1201/currency-editor.png "Définissez une sorte d'argent ici. Fixer les prix des produits séparément en NPC Shop.")

1. Choisissez un **ID** et un nom d’affichage : par exemple, `town_coin` et « Town Coin ». Les magasins se réfèrent à l’ID après l’enregistrement, plutôt que de rechercher le nom d’affichage.
2. Choisissez une icône et un affichage du montant, puis utilisez **Save As** pour enregistrer votre propre fichier de devise.
3. Sélectionnez la devise en [ NPC Shop ](#core/shop-system) et définissez les prix des produits. L'échange direct d'articles et le paiement à partir d'un solde DRM utilisent différentes sources de paiement.
4. Pour afficher le solde pendant le jeu, ajoutez un élément pour cette devise en [HUD Maker](#core/hud-maker).

### Les joueurs peuvent transporter de l'argent

Ouvrez **Physical currency** pour configurer un élément de devise. Une valeur de `10` signifie qu’un article représente dix unités de cette monnaie; il est distinct du nombre de produits vendus par un magasin.

![Currency Editor page de devise physique avec un nom, une identité et une valeur par élément.](assets/media/guides/drm-031-forge1201/currency-physical.png "Configurez le solde du portefeuille et la devise transportée séparément, puis vérifiez le mode de paiement utilisé par la boutique.")

## Où la monnaie est utilisée

Utilisez Currency Editor pour choisir les noms d'argent, les icônes, la conversion de ramassage et les pertes de décès. Sélectionnez cette devise dans les magasins, les récompenses et les HUD.

Les devises ne sont pas seulement des étiquettes d'affichage. Ils se connectent aux paiements en magasin, à la conversion de ramassage d'articles, à l'affichage HUD et au comportement de mort.

| Poste | Signification |
| --- | --- |
| Numéro de la monnaie | ID unique utilisé par le nom de fichier et la clé de balance. |
| Afficher le nom | Nom affiché dans les HUD, les magasins et les messages. |
| Icône | Élément ou texture utilisé comme icône de devise. |
| Format | Format d'affichage pour les balances. |
| Conversion d'articles | Que les articles ramassés deviennent le solde de la monnaie. |
| Règle de la mort | Que le joueur garde ou perd l'équilibre à la mort. |

## Éléments de monnaie physique

En 0.1.8, l'activation `physicalItem` crée une forme de devise qui peut être transportée et échangée dans l'inventaire.

| Réglage | Signification |
| --- | --- |
| Nom | Afficher le nom ou la clé de traduction affiché sur l'élément. |
| ID | Valeur unique qui distingue cette devise sur l'élément de monnaie physique partagé. |
| Valeur unitaire | Valeur monétaire représentée par un élément. |

Les magasins peuvent accepter la monnaie physique comme moyen de paiement ou la payer lorsqu’ils sont configurés pour le faire. Gardez chaque identifiant physique unique.

## Stockage

Les fichiers de devises sont enregistrés sous le chemin d'accès côté serveur ci-dessous.

```text
config/dochi_rpg_maker/
  currency/
    definitions/
      <currency_id>.json
```

Le serveur JSON `kind` est `currency`. La liste des devises et les lectures de prévisualisation utilisent `currency_index`.

## Workflow de base

1. Cliquez avec le bouton droit sur l'élément `Dochi RPG Maker Core`.
2. Ouvrir `Currency Editor`.
3. Choisissez un ID de devise.
4. Définir le nom d'affichage, l'icône et la mise en forme.
5. Si la conversion de ramassage est nécessaire, configurez l'article et le montant.
6. Définissez la règle de la mort sur `KEEP` ou `LOSE`.
7. Enregistrer, puis exécuter `/drm currency reload` ou `/drm reload`.

DRM copie le portefeuille et les clés de solde bancaire compatibles lorsque Minecraft remplace l'entité du joueur après sa mort. `KEEP` conserve l'équilibre, tandis que `LOSE` reporte la valeur post-déduction. La conversion automatique des objets et la perte de la mort informent le joueur affecté dans le chat. La conversion de ramassage ordinaire ne traite que la pile nouvellement ramassée, et non les piles de devises non apparentées déjà dans l'inventaire.

## Contrôles de commande

Les devises enregistrées peuvent être vérifiées via les commandes du serveur.

| Commande | Objet |
| --- | --- |
| `/drm currency list` | Listes des devises enregistrées. |
| `/drm currency create <id>` | Crée une définition de devise de base. |
| `/drm currency give <player> <id> <amount>` | Donne de la monnaie à un joueur. |
| `/drm currency take <player> <id> <amount>` | Supprime la monnaie d'un joueur. |
| `/drm currency set <player> <id> <amount>` | Définit l'équilibre directement. |
| `/drm currency get <player> <id>` | Lit le solde actuel. |

## Connexion boutique

NPC Shop Les prix sont calculés par ID de devise. Si l'ID de devise utilisé par un élément de la boutique n'existe pas en `currency/definitions`, le paiement ou l'affichage peuvent échouer.

Lorsqu'une boutique utilise plusieurs devises, créez d'abord toutes les devises, puis connectez les champs de prix en NPC Shop.

## connexion HUD

Ajoutez un composant Devise en [HUD Maker](#core/hud-maker) et sélectionnez la devise enregistrée. Configurez son format de quantité, sa position et sa visibilité dans le HUD. N'ajoutez pas de champs de permission d'affichage obsolètes à la définition de la devise.

Le solde du serveur fait autorité. Si l'affichage client ne se met pas à jour, cochez `/drm currency reload` et l'ensemble HUD actif.

## Liste récapitulative

| Symptôme | Vérifier |
| --- | --- |
| La devise n'apparaît pas dans la liste | Chemin de fichier et syntaxe JSON. |
| Pickup ne se convertit pas à l'équilibre | ID d'élément, montant de la conversion et rechargement du serveur. |
| Le paiement du magasin échoue | ID de devise dans le prix du magasin et le fichier de définition. |
| L'équilibre après la mort est inattendu | Si la règle de mort est `KEEP` ou `LOSE`. |
