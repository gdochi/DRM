---
title: Subastas, reclamaciones y diseños de tiendas
slug: pokemart-auction-gui-runtime
order: 542
description: Configure un NPC de subasta, recoja las compras y las ganancias, y personalice la pantalla del jugador.
product: drm-cobblemon-editor
category: PokéMart Editor
section: pokemart
status: Proyecto
version: Fabric / NeoForge 0.2.9
audience: Creadores que operan casas de subastas y pantallas personalizadas de PokéMart
tags:
  - auction
  - escrow
  - gui-maker
translationSource: en
translationMethod: assisted
---

## Hacer una subasta NPC

En [PokéMart Editor](#drm-cobblemon-editor/cobblemon-pokemart), elija **General → NPC Role → Auction** y un método de pago. Abre **Auction** a la izquierda para establecer **Auction House ID**, enumerando las tarifas y los impuestos. **Save As** tu propio archivo y aplícalo al NPC de la subasta.

![Identificación de la casa de subastas, límites de listado, tarifas e impuestos en el editor.](assets/media/guides/cobble-029-neo1211-flow/cobble-mart-auction.png "Pantalla del creador en Cobblemon Editor 0.2.9 / NeoForge 1.21.1. El ejemplo utiliza el valor predeterminado de la casa, cinco listados por jugador, un límite de 1440 minutos, tarifa 500, impuestos 5% y aumento mínimo de la oferta 100. No muestra una lista completa o venta.")

Utilice la **mismo ID de casa y configuración de moneda compatible** para compartir listados entre aldeas. Diferentes ID crean casas de subastas separadas incluso cuando sus monedas coinciden.

## Lista, puja y recoge

1. En **Auction Listing**, elija una Pokémon y comience la oferta. La pantalla predeterminada actual utiliza la duración configurada de la casa. Establecer una compra opcional si la casa lo permite. El listado cobra la tarifa y mantiene el Pokémon para la subasta.
2. Otros jugadores seleccionan una lista en **Auction** y pujan o compran. Los vendedores no pueden pujar en sus propios listados.
3. Después de la liquidación, abrir **Settlement Inbox → Claim All**. Los compradores recaudan Pokémon; los vendedores recaudan los ingresos después de impuestos. Los jugadores outbid también recogen sus ofertas anteriores aquí.

** Mantenga una ranura de equipo activo libre antes de recoger Pokémon.** El espacio de PC solo no garantiza la entrega. Las entradas que no se pueden entregar permanecen en Claims; fije la capacidad o el acceso a la moneda e intente nuevamente.

![Rattata y precios seleccionados en el Listado de Subastas.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-player.png "Pantalla del reproductor real en 0.2.9 / NeoForge 1.21.1. Este ejercicio utiliza esmeraldas, puja inicial 10, compra 20 y cuota 2. Lista Pokémon · Tasa 2 presenta la lista.")

![La Rattata enumerada y el saldo 62 después de la tarifa de listado.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-listed.png "Listado cambiado esmeraldas 64→62, eliminado Rattata del equipo y creado una lista activa. La oferta y la compra están deshabilitadas para el vendedor; Cancelar El listado sigue disponible.")

![Una oferta expirada Pokémon esperando en la Bandeja de entrada del Acuerdo.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-inbox.png "El reloj de juego del mundo aislado se adelantó para verificar la expiración no puja. Pokémon Esperar: 1 fue seguido por la verdadera Reclamación de toda acción.")

![Cero Pokémon reclamaciones de espera y subasta entregadas después de la recolección.](assets/media/guides/cobble-029-neo1211-player/cobble-auction-claimed.png "Rattata volvió al equipo del servidor y la cuenta de espera cambió 1→0. El saldo permaneció 62 después de la tarifa de cotización pagada. Este ejercicio no incluyó la oferta de otro jugador, una venta completa o una liquidación de impuestos.")

## Referencia de ajustes de subasta

| Configuración | Rango | Comportamiento en tiempo de ejecución |
| --- | ---: | --- |
| ID de la casa | Hasta 64 caracteres simbólicos | Subasta NPCs con el mismo listado de acciones de identificación y alcance de liquidación |
| Max Listados | 1–64 | Listados activos por jugador en esa casa |
| Duración máxima | 5–10,080 minutos | Límite de duración; la pantalla de listado predeterminada actual utiliza este valor |
| Tarifa de listado | Número entero no negativo | Debitado antes del depósito en garantía; reembolsado cuando falla la transferencia del depósito en garantía |
| Impuesto sobre la venta | 0–100% | Deducido de los ingresos de venta completados |
| Incremento mínimo de puja | Al menos 1 | Requerido siguiente aumento de oferta |
| Permitir la compra | Encendido/apagado | Permite la acción y el precio de compra instantánea |
| Permitir Shiny / Legendario | Encendido/apagado | Elegibilidad de listado |

Los listados existentes conservan su moneda original y la configuración de impuestos. La edición del documento de subasta no convierte todos los listados activos a la nueva política.

## Listado y depósito

El servidor requiere una oferta inicial positiva, una compra de cero o al menos la oferta inicial, capacidad de listado disponible, propiedad y comerciable Pokémon, elegibilidad de póliza y una tarifa de listado pagadera.

El registro cobra la tarifa y mantiene el Pokémon para la subasta. El registro fallido reembolsa la tarifa y no crea ninguna lista.

## Ofertas y compra

Si otro jugador puja mientras la pantalla está abierta, cambia las pestañas o vuelve a abrir la pantalla del NPC y comprueba el nuevo precio antes de pujar de nuevo. Las pujas ordinarias deben cumplir con el precio actual más **Minimum Bid Increment**.

- Un nuevo postor deposita la puja completa.
- El mejor postor actual solo paga la diferencia al aumentar su propia oferta.
- La cantidad anterior de un jugador fuera de oferta se mueve a Reclamación de dinero.
- Una oferta en o por encima de la compra se liquida en la cantidad de compra configurada.
- El acuerdo le da al comprador una Reclamación Pokémon y al vendedor una Reclamación de Dinero después de impuestos.

Las reclamaciones no entregadas permanecen almacenadas mientras un jugador está desconectado, su equipo está lleno o el proveedor de divisas no está disponible.

## Cancelación y caducidad

Solo el vendedor puede cancelar, y solo antes de que exista un mejor postor. La cancelación se completa solo si el Pokémon puede regresar inmediatamente al equipo o PC; de lo contrario, el listado se mantiene activo.

El servidor establece listados vencidos aproximadamente cada 20 ticks.

- No hay ofertante: devuelva el Pokémon a través del vendedor Reclamar.
- El mejor postor: crear el comprador Pokémon Reclamación y el vendedor Reclamo de dinero.
- El vendedor procede: `winning amount - (winning amount × tax ÷ 100)`.

`Claim All` elimina solo las entradas entregadas correctamente. Moneda fallida o entrega Pokémon deja el reclamo para un reintento posterior.

## Componentes de la GUI en tiempo de ejecución

Compruebe primero el comportamiento de la tienda y, a continuación, edite un diseño **PokéMart** en [GUI Maker](#core/gui-system). Utilice **Save As** para su propio diseño y conéctelo en **General → Runtime GUI** en PokéMart Editor. La forma del producto del creador y la pantalla de transacción del jugador son pantallas separadas.

PokéMart GUI Maker utiliza una etapa lógica 800×450.

| Componente | Tiempo de ejecución data/action | Inspector ejemplos |
| --- | --- | --- |
| Encabezado y equilibrio | Mostrar nombre, saldo, advertencia del proveedor | Título, balance, colores de advertencia |
| Barra de herramientas | Cerrar | Colores del botón |
| Pestañas de modo | Cambio de pestaña específico de rol | Gap y colores activos/inactivos |
| Buscar | Filtra la lista actual | Clave de traducción del marcador de posición |
| Catálogo | Productos, ofertas o listados desplazables | Altura/hueco de la fila, colores, barra de desplazamiento |
| Pokémon Previsualización | Modelo 3D seleccionado | Escala de modelo, pantalla de nivel / brillante |
| Pokémon Detalles | Especie, descripción, precio, stock o datos de puja | Colores de texto |
| Zona de acción | Comprar, intercambiar, ofertar, listar, cancelar, reclamar | Gap de control y colores de botón |

Estos componentes funcionales son singletones. La eliminación de un componente crítico deja el tiempo de ejecución sin lugar para procesar sus datos o controles.

Las búsquedas de complementos y listados de páginas, elegibles Pokémon, opciones de venta y reclamaciones en el servidor. Los diseños predeterminados PokéMart y Starter Selector usan la hoja de sprites compartida de DRM. Solo los valores predeterminados heredados intactos se actualizan automáticamente; los archivos GUI personalizados se conservan y los valores predeterminados reemplazados se respaldan en `cobblemon/_migration_backups/`.

| Función | Pestañas visibles en el juego |
| --- | --- |
| Ventas | Pokémon Tienda |
| Comercio | Pokémon Comercio |
| Subasta | Subasta, listado de subastas, bandeja de entrada de liquidación |

Si falta GUI JSON, tiene el error `guiType`, o carece de una estructura de elementos válida, el tiempo de ejecución vuelve al complemento predeterminado para ese rol. Si solo falta un área, inspeccione primero la presencia y la geometría de ese componente.

## Prueba de operaciones

1. El jugador A enumera un Pokémon; verifica la tarifa y la eliminación.
2. El jugador B puja; verifique que A no pueda cancelar.
3. El jugador C supera la oferta; verifique que B reciba una reclamación de reembolso.
4. Completar la compra y reclamar al comprador Pokémon y los ingresos netos del vendedor.
5. Caducidad de la prueba con y sin postor.
6. Reinicie el servidor y verifique que los listados, depósitos, ofertas y reclamaciones persistan.
7. Deshabilite temporalmente un proveedor de divisas y verifique que las reclamaciones fallidas permanezcan almacenadas.
