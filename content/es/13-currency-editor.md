---
title: Currency Editor
slug: currency-editor
order: 85
description: Cómo configurar definiciones de divisas, conversión de recolección de artículos, saldos y reglas de defunción en Currency Editor.
product: core
category: Sistemas de núcleo
section: currency-editor
status: Estable
version: 0.3.1
audience: Creadores / Operadores
tags:
  - currency
  - editor
translationSource: en
translationMethod: assisted
---

## Crea dinero para tu tienda

Abra **Currency Editor** desde el selector del editor del núcleo. Las siguientes pantallas en inglés son de **DRM 0.3.1 / Forge 1.20.1**.

![Currency Editor con identidad de moneda, icono, visualización de cantidad, reglas de defunción y ajustes HUD.](assets/media/guides/drm-031-forge1201/currency-editor.png "Define un tipo de dinero aquí. Fije los precios de los productos por separado en NPC Shop.")

1. Elija un **ID** y un nombre de visualización: por ejemplo, `town_coin` y “Town Coin”. Las tiendas se refieren al ID después de guardar, en lugar de buscar el nombre de visualización.
2. Elige un icono y muestra la cantidad, luego usa **Save As** para guardar tu propio archivo de moneda.
3. Seleccione la moneda en [NPC Shop](#core/shop-system) y fije los precios de los productos. El intercambio directo de artículos y el pago desde un saldo DRM utilizan diferentes fuentes de pago.
4. Para mostrar el saldo durante el juego, agregue un elemento para esta moneda en [HUD Maker](#core/hud-maker).

### Los jugadores de dinero pueden llevar

Abrir **Physical currency** para configurar un elemento de moneda. Un valor de `10` significa que un artículo representa diez unidades de esa moneda; está separado del número de productos vendidos por una tienda.

![Currency Editor's Página de moneda física con un nombre de artículo, identidad y valor por artículo.](assets/media/guides/drm-031-forge1201/currency-physical.png "Configure el saldo de la billetera y la moneda transportada por separado, luego verifique qué método de pago utiliza la tienda.")

## Donde se utiliza la moneda

Utilice Currency Editor para elegir nombres de dinero, iconos, conversión de recolección y pérdidas por muerte. Selecciona esa moneda en tiendas, recompensas y HUD.

Las monedas no son solo etiquetas de visualización. Se conectan a los pagos de la tienda, la conversión de recolección de artículos, la pantalla del HUD y el comportamiento de muerte.

| Artículo | Significado |
| --- | --- |
| ID de moneda | ID único utilizado por el nombre del archivo y la clave de saldo. |
| Mostrar nombre | Nombre mostrado en HUD, tiendas y mensajes. |
| Icono | Elemento o textura utilizados como el icono de moneda. |
| Formato | Formato de visualización para saldos. |
| Conversión de artículos | Si los artículos recogidos se convierten en saldo de divisas. |
| Regla de la muerte | Si el jugador mantiene o pierde el equilibrio a la muerte. |

## Elementos de moneda física

En 0.1.8, habilitar `physicalItem` crea una forma de moneda que puede ser transportada y comercializada en el inventario.

| Configuración | Significado |
| --- | --- |
| Nombre | Mostrar nombre o clave de traducción que se muestra en el elemento. |
| ID | Valor único que distingue esta moneda en el elemento de moneda física compartida. |
| Valor unitario | Valor de la moneda representado por un elemento. |

Las tiendas pueden aceptar la moneda física como pago o pagarla cuando se configura para hacerlo. Mantenga cada identificación física única.

## Almacenamiento

Los archivos de moneda se guardan en la ruta del lado del servidor a continuación.

```text
config/dochi_rpg_maker/
  currency/
    definitions/
      <currency_id>.json
```

El servidor JSON `kind` es `currency`. La lista de divisas y la vista previa lee el uso `currency_index`.

## Flujo de trabajo básico

1. Haga clic con el botón derecho en el elemento `Dochi RPG Maker Core`.
2. Abrir `Currency Editor`.
3. Elige un ID de moneda.
4. Establezca el nombre de visualización, el icono y el formato.
5. Si se necesita una conversión de recolección, configure el elemento y la cantidad.
6. Establezca la regla de la muerte en `KEEP` o `LOSE`.
7. Guardar y, a continuación, ejecutar `/drm currency reload` o `/drm reload`.

DRM copia la billetera y las claves de saldo bancarias compatibles cuando Minecraft reemplaza la entidad del jugador después de la muerte. `KEEP` preserva el equilibrio, mientras que `LOSE` lleva adelante el valor posterior a la deducción. La conversión automática de artículos y la pérdida de la muerte notifican al jugador afectado en el chat. La conversión de recolección ordinaria procesa solo la pila recién recogida, no las pilas de divisas no relacionadas que ya están en el inventario.

## Command Checks

Las monedas guardadas se pueden comprobar a través de comandos del servidor.

| Comando | Finalidad |
| --- | --- |
| `/drm currency list` | Lista las monedas registradas. |
| `/drm currency create <id>` | Crea una definición básica de moneda. |
| `/drm currency give <player> <id> <amount>` | Le da dinero a un jugador. |
| `/drm currency take <player> <id> <amount>` | Elimina la moneda de un jugador. |
| `/drm currency set <player> <id> <amount>` | Establece el equilibrio directamente. |
| `/drm currency get <player> <id>` | Lee el balance actual. |

## Conexión de tienda

NPC Shop los precios se calculan por ID de moneda. Si el ID de moneda utilizado por un artículo de la tienda no existe en `currency/definitions`, el pago o la visualización pueden fallar.

Cuando una tienda utiliza varias monedas, crea primero todas las monedas y luego conecta los campos de precios en NPC Shop.

## Conexión HUD

Añade un componente de moneda en [HUD Maker](#core/hud-maker) y selecciona la moneda guardada. Configure su formato de cantidad, posición y visibilidad en el HUD. No agregue campos obsoletos de permiso de visualización a la definición de moneda.

El balance del servidor es autoritario. Si la pantalla del cliente no se actualiza, compruebe `/drm currency reload` y el conjunto de HUD activo.

## Lista de comprobación

| Síntoma | Comprobar |
| --- | --- |
| La moneda no aparece en la lista | Ruta de archivo y sintaxis JSON. |
| Pickup no se convierte en equilibrio | ID del elemento, cantidad de conversión y recarga del servidor. |
| El pago de la tienda falla | ID de moneda en el precio de la tienda y el archivo de definición. |
| El equilibrio después de la muerte es inesperado | Si la regla de la muerte es `KEEP` o `LOSE`. |
