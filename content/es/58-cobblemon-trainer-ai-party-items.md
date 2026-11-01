---
title: Entrena IA, equipos y artículos
slug: cobblemon-trainer-ai-party-items
order: 580
description: Motores de IA, equipos aleatorios y la distinción entre inventario general y artículos de batalla redondos.
product: drm-cobblemon-editor
category: Primeros pasos
section: trainer
status: Estable
version: Fabric / NeoForge 0.2.9
audience: Creadores / Operadores
translationSource: en
translationMethod: assisted
---

## Encuentre AI, generación de equipos y artículos

Seleccione una ronda en **Battle Config → Rounds**, luego haga clic en el valor al lado **AI skill**; dice Avanzado en este ejemplo. Autor de su equipo y bolsa de batalla para la misma ronda. Las pantallas usan **0.2.9 / NeoForge 1.21.1, interfaz de usuario en inglés**.

![Rondas que muestran la ronda seleccionada y la habilidad AI.](assets/media/guides/cobble-029-neo1211/cobble-rounds.png "Un Pokémon 's elemento y una poción utilizada por su entrenador son ajustes separados.")

## Elegir el motor de IA

| Motor | Uso |
| --- | --- |
| `DRM Strategy` | DRM puesta a punto, planes de estrategia, artículos de entrenador y decisiones de trucos de entrenador. |
| `RCT` | Proveedor opcional RCT. Requiere una instalación API RCT compatible. |
| `Cobblemon Strong` | Cobblemon es una IA fuerte incorporada. |

DRM La estrategia funciona sin RCT. RCT ausencia o errores de llamada se manejan en el límite del complemento; no hacen RCT una dependencia requerida. DRM's round item bag and gimmick plan apply to DRM Estrategia.

Comienza con un ajuste preestablecido, luego cambia un valor o estrategia de IA a la vez y compara usando el mismo equipo y reglas de batalla. La selección de movimiento, el cambio y la sincronización de elementos también dependen del estado de batalla actual.

## Equipo aleatorio

![Aspectos básicos del equipo aleatorio, generar y aplicar.](assets/media/guides/cobble-029-neo1211/cobble-party-generator.png "Abrir equipo Pokemon → Generar equipo. Establece el tamaño, los niveles y los filtros, genera una vista previa y, a continuación, aplícalo al equipo actual.")

Configure el tamaño del equipo, el nivel, las generaciones, los tipos, la etapa de evolución, la elegibilidad legendaria / mítica, las especies duplicadas, la posibilidad brillante, la configuración IV / EV y las opciones automáticas de naturaleza / capacidad / movimiento. Los candidatos provienen del registro instalado Cobblemon. Relaja los filtros si hay muy pocos candidatos.

Una semilla fija es reproducible dentro de la misma configuración de mod/datapack/registro. Cambiar las especies disponibles puede cambiar el resultado.

## Artículos de Entrenador

![Catálogo de artículos de batalla, inventario por batalla y política de IA.](assets/media/guides/cobble-029-neo1211/cobble-battle-items.png "Equipo de Pokemon abierto → Objeto de batalla Inventory. Deshabilitado guarda la bolsa pero evita el uso de IA; agregue elementos, elija una política y aplique.")

La bolsa de batalla virtual de la ronda tiene capacidad para 16 tipos de artículos, cada uno con cantidad 1–99. Se recrea para cada batalla y utiliza DRM Estrategia; no elimina elementos del inventario físico del NPC.

Use recuperación, cura de estado, reavivamiento, recuperación de PP o elementos stat-boost. La frecuencia de uso del elemento, el umbral de HP de curación, los giros de impulso tempranos y las categorías de recuperación permitidas controlan cuando la IA los considera. El suministro de un artículo no garantiza el uso en el primer turno.

## Gimmicks de entrenador

Configure el equipo y la política Mega, Dynamax, Z-Move, Tera u Omni de la ronda. Coloque el elemento clave apropiado en el inventario general y prepare Pokémon elementos guardados, tipo Tera, nivel Dynamax o factor Gigantamax cuando sea necesario. Estas integraciones necesitan una instalación Mega Showdown compatible.

Los permisos de equipo y de regla de batalla están separados. Un truco prohibido permanece prohibido incluso cuando su elemento clave está presente. Véase [Reglas de batalla](#drm-cobblemon-editor/cobblemon-battle-rules).

## Agregar elementos personalizados al inventario general

![Entrenador General Inventory con Todos los artículos y Player inv.](assets/media/guides/cobble-029-neo1211/cobble-general-items.png "El artículo general Inventory suministra requisitos de posesión tales como llaves de truco. Elija entre todos los elementos o Player inv, Agregar seleccionado y luego Aplicar.")

Abrir `General > General Item Inv` para el inventario compartido por todo el Entrenador.

1. Busque `Items` para una pila predeterminada registrada, o seleccione una pila de jugador real de `My Inventory`.
2. Elija `Add selected`. `My Inventory` copia la pila sin consumir el objeto del jugador.
3. Establece `Quantity` en 1 – 99 y salva al entrenador. El inventario contiene hasta 64.
4. Las pilas con el mismo ID de elemento pero diferentes nombres, encantamientos o componentes personalizados pueden seguir siendo entradas separadas.

Las ediciones de cantidad preservan NBT y componentes. Para una entrada con datos almacenados, elija otro elemento de la lista en lugar de editar su ID de elemento. Los datos no válidos o sobredimensionados se rechazan en lugar de reemplazarse silenciosamente con un elemento simple.

Este inventario comprueba la posesión de la llave sin consumir las llaves. Está separado de `Trainer Items`, la bolsa redonda de curación / batalla de AI.

Referencia JSON: el esquema Trainer permanece `23`. Las entradas generales almacenan `componentsSnbt` y siguen leyendo datos `components` más antiguos. No cambie `schemaVersion` a mano para habilitar la función.

## 0.2.7 Estrategia y selección de movimientos

DRM La estrategia evalúa las etapas estadísticas reales y el campo actual para la configuración, las pantallas, la sala de trucos, el cambio, los trucos y la sinergia del equipo. Las correcciones cubren la conmutación posterior a la configuración, el refuerzo repetido y las reservas de ranuras dobles vacías. RCT sigue siendo un proveedor de IA opcional independiente.

La búsqueda de movimientos incluye primero cada movimiento registrado, clasificación normal, evento y movimientos de conjunto de aprendizaje pasado. La selección no establece la capacidad de aprendizaje de las especies ni garantiza un comportamiento arbitrario del proveedor. Compruebe permisos de truco, políticas, elementos clave y proveedores compatibles.

Véase [0.2.7 compatibilidad](#drm-cobblemon-editor/cobblemon-editor-current-update) para las versiones Cobblemon realmente ejercidas.
