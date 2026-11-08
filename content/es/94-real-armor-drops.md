---
title: Configurar drops de armadura en la GUI
slug: dochi-real-armor-drops
order: 915
description: Elige objetos, probabilidades y cantidades por armadura en Armor Drop Editor, guarda el conjunto y aplícalo.
product: dochi-real-armor
category: Drops de objetos
section: drops
status: Estable
version: 0.1.5
audience: Operadores de servidores y autores de modpacks
tags:
  - armor
  - drops
  - editor
translationSource: en
translationMethod: assisted
---

## ¿Cuándo caen los objetos?

Usa **Armor Drop Editor** de Real Armor 0.1.5 para elegir qué suelta cada armadura. La tirada ocurre cuando un NPC recibe un golpe y **la armadura pierde durabilidad de verdad**, incluido el último golpe que la rompe. Los objetos pueden caer mientras el NPC sigue vivo.

Al principio no hay reglas ni conjuntos activos. En los [ajustes de armadura](#dochi-real-armor/dochi-real-armor-setup), activa **Enable armor calculation**, la integración de tu NPC y **Damage armor items**, y equipa al NPC. DRM es opcional; Real Armor ofrece su propio editor.

## Crear el primer drop en la GUI

Este ejemplo suelta **1–3 Iron Nuggets con un 100% de probabilidad cuando se daña un Iron Chestplate**.

1. Entra en un mundo y abre **Config → Armor Drop Editor** de Real Armor. Con DRM instalado, también puedes elegir **Armor Drop Editor** en el selector compartido. La edición multijugador requiere nivel de permiso 2.
2. Elige **Create New** para crear un borrador. **Use Default** también empieza vacío; **Load Existing** abre un conjunto guardado.
3. A la izquierda, elige **Armor rules → Add**, busca y selecciona **Iron Chestplate** y pulsa **Apply** en el selector de objetos.
4. En el centro, elige **Drop items → Add**, busca y selecciona **Iron Nugget** y pulsa **Apply** en el selector.
5. En la pestaña **Drop** de la derecha, activa **Enable drop**, establece **Drop chance (%)** en **100**, **Minimum quantity** en **1** y **Maximum quantity** en **3**. Mantén **Enable rule** activado en la pestaña **Armor**.
6. Usa **Save As**, llama al conjunto **iron_salvage** y pulsa **Save**. Espera la confirmación del servidor.
7. Pulsa **Apply** en el editor para activar el conjunto. Comprueba arriba los nombres del conjunto editado y del aplicado.

![Flujo real de la GUI de Real Armor: añadir Iron Chestplate e Iron Nugget, introducir probabilidad y cantidad, usar Save As y Apply.](assets/media/guides/armor-drops-015-20261108/armor-drop-editor.mp4 "Ejemplo de GUI en Real Armor 0.1.5 / NeoForge 1.21.1. Confirma cada objeto con Apply en el selector, guarda con Save As → Save y activa el conjunto en el mundo con Apply en el editor.")

El selector ofrece **All items**, categorías creativas y **Player inv**. Usa **Player inv** para objetos con nombre personalizado, encantamientos u otros datos. La selección copia los datos sin consumir ni mover la pila original del inventario. **Cancel** cancela esa selección.

El panel izquierdo contiene las reglas de armadura; la zona inferior central muestra **Item / Chance / Quantity**; el panel derecho edita la entrada seleccionada. El soporte de armadura central es una vista previa estática y no genera objetos en el mundo.

## Elegir probabilidades y cantidades

| Ajuste | Comportamiento |
| --- | --- |
| Drop chance (%) | Probabilidad por objeto de 0–100%. Cero nunca suelta; 100 siempre tiene éxito |
| Minimum / Maximum quantity | Si tiene éxito, elige un entero uniformemente entre los límites. Ambos van de 1–64; mínimo ≤ máximo |
| Enable rule / Enable drop | Activa o desactiva una regla completa o una entrada de drop |
| Horizontal spread / Upward speed | Dispersión horizontal y velocidad de lanzamiento hacia arriba, cada una de 0–2 |

Cada drop activo se evalúa **independientemente**. Con Iron Nuggets al 100% y Emeralds al 25%, los nuggets caen siempre y las esmeraldas tienen su propia tirada del 25%. La suma no tiene que ser 100%. Una regla admite hasta 16 entradas.

Perder varios puntos de durabilidad en un golpe sigue produciendo una tirada por entrada y pieza dañada. Si varias piezas pierden durabilidad, cada una se evalúa por separado. El servidor genera objetos recogibles cerca de la ranura afectada y divide las cantidades según el límite nativo de pila de cada objeto.

## Distinguir guardar, cargar y aplicar

| Acción | Resultado |
| --- | --- |
| Save / Save As | Guarda un conjunto con nombre y mantiene las reglas activas del mundo |
| Load / Load Existing | Abre un conjunto guardado como borrador sin activarlo |
| Apply | Sustituye todas las reglas activas del mundo por el conjunto guardado |
| Unapply | Desactiva el conjunto activo y conserva los conjuntos guardados y el borrador |

**Solo puede haber un conjunto activo por mundo.** Aplicar otro sustituye las reglas anteriores, sin combinarlas. Guardar con el nombre activo también mantiene **el contenido previamente aplicado hasta pulsar Apply de nuevo**. Guarda los cambios pendientes antes de aplicar.

La selección activa o el estado desactivado se conserva al reiniciar el servidor. Los errores de permisos, valores inválidos, conflictos de edición y fallos al guardar mantienen las reglas anteriores. Lee el mensaje de estado y vuelve a cargar el estado actual del servidor antes de revisar el borrador.

## Almacenamiento y solución de problemas

Los archivos pertenecen al **mundo actual del servidor**. Ejemplo de un jugador:

```text
saves/<world>/serverconfig/dochi_real_armor/
  armor_drops.json
  armor_drop_presets/
    iron_salvage.json
```

En un servidor dedicado, la misma estructura está en la carpeta del mundo del servidor. Los nombres usan de 1–64 letras ASCII, dígitos, guiones bajos o guiones. La serialización de los datos depende de la versión de Minecraft; comprueba la compatibilidad antes de mover conjuntos entre versiones.

| Síntoma | Comprobar |
| --- | --- |
| Guardado, pero no cae nada | Comprueba Apply del editor, nombre del conjunto aplicado, interruptores de regla/drop y la armadura equipada |
| Los golpes no producen drops | Activa el desgaste y confirma que disminuye la durabilidad. Los objetos irrompibles y el daño que ignora armadura pueden no cumplir la condición |
| Apply no está disponible | Guarda primero el borrador y espera la confirmación del servidor |
| La edición es de solo lectura | Comprueba conexión al mundo, permisos OP, respuesta del servidor y soporte de aplicación explícita de conjuntos |
| No aparecen objetos en la vista previa | La vista previa es estática. Los drops reales se generan en el servidor cuando disminuye la durabilidad |

Los accesorios Curios gestionan su propia durabilidad. No los trates como objetivos de drops de armadura de esta función.
