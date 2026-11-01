---
title: Flujos de trabajo recomendados
slug: workflows
order: 120
description: Flujos prácticos para NPC de diálogo, NPC de tienda y configuración de moneda / HUD.
product: core
category: Referencia / Operaciones
section: operations
status: Estable
version: 0.3.1
audience: Creadores
tags:
  - workflow
  - examples
translationSource: en
translationMethod: assisted
---

## Terminar un diálogo NPC

1. Abra el ejemplo en [Dialogue Editor](#core/dialogue-system) y escriba el saludo en **Text**.
2. En **Choices**, cree una opción de respuesta y una opción de cierre.
3. Verifique que **start → Routes** apunte al saludo.
4. **Save As** `village_guide`.
5. Abra el NPC con el núcleo y elija **Dialogue JSON → village_guide → Apply Dialogue**.
6. Interactúa con ambas manos vacías y prueba cada opción.

![village_guide aplicado como el Diálogo NPC.](assets/media/guides/drm-031-forge1201/npc-apply-result.png "DRM 0.3.1 / Forge 1.20.1. Seleccione el archivo, presione Apply Dialogue y luego verifique su nombre a la derecha.")

Completa la conversación con el diseño predeterminado primero. Para cambiar su apariencia, copie un diseño en [GUI Maker](#core/gui-system) y conéctelo en la configuración del diálogo **GUI**.

## Conectar una tienda

En [NPC Shop ](#core/shop-system), establece **Product → Payment → Restock** para los bienes, el precio y la acción. Verifique **Preview**, Save As el archivo y aplíquelo en **NPC Shop JSON**. Prepare el pago, compre una vez, luego verifique el inventario y el stock.

![Precio del pan 4 con pago de la tienda heredada.](assets/media/guides/drm-031-forge1201/shop-bread-payment.png "DRM 0.3.1 / Forge 1.20.1. Cantidad 3 es el pan recibido por compra; Precio 4 es las esmeraldas pagadas por compra.")

Para entrar a través del diálogo, agregue **go_shop** en **Choice actions** y elija la tienda guardada. Utilice **bound** para la tienda aplicada al NPC actual.

## Añadir moneda y una pantalla de saldo

1. Crear una moneda en [Currency Editor ](#core/currency-editor) y Save As.
2. Seleccione para el pago de la tienda, igualar los elementos físicos o DRM el saldo con el método previsto.
3. Añadir moneda en [HUD Maker](#core/hud-maker) y seleccionar la misma moneda.
4. Prueba de concesión de dinero, compras y la pantalla de saldo juntos. Agregar un HUD no otorga dinero.

Al mover archivos, compruebe la interfaz gráfica de usuario conectada, tienda y moneda en [ carpetas guardadas ](#core/paths).
