---
title: Qué hay de nuevo en 0.1.4
slug: release-0-1-4
order: 10
description: La característica verificada, comportamiento, dependencia y migración cambia de Forge 0.1.3 a 0.1.4.
product: core
category: Primeros pasos
section: getting-started
status: Estable
version: 0.1.4
audience: Creadores / Operadores
tags:
  - release
  - migration
translationSource: en
translationMethod: assisted
---

Este es un registro de liberación histórico. Ver [ DRM 0.3.1 ](#core/release-notes-0-3-1) para la dirección actual.

## Buscar autoría de misión

Crea una categoría y una búsqueda, luego establece el título y el comportamiento de inicio/finalización en Información. Los objetivos contienen la tarea; las recompensas contienen el pago. Sigue la guía de búsqueda actual para aceptarla y completarla. Continuar con el [guía actual](#core/quest-system) para guardarlo y aplicarlo.

![Busca authoring de misiones.](assets/media/guides/drm-031-forge1201/quest-info.png "DRM 0.3.1 / Forge 1.20.1. Esta es la característica relacionada en la compilación de producción actual, no una captura de la interfaz de usuario histórica descrita a continuación.")

## Alcance de lanzamiento

0.1.4 agregó herramientas para misiones, estadísticas de jugadores, artículos personalizados, teletransportadores y ventanas emergentes. Las conversaciones y las tiendas podrían estar conectadas a recompensas de búsqueda y destinos de viaje.

## Nuevos sistemas de autoría

| Sistema | Lo que 0.1.4 añade |
| --- | --- |
| Búsqueda | Paquetes de misiones, capítulos/categorías, objetivos, recompensas, requisitos previos, reglas de repetición/finalización, `After Complete` y el diario `U`. |
| Constructor de estadísticas | Conjuntos de estadísticas personalizados, costos puntuales, efectos de atributos, selección de conjunto activo, `Y` UI de asignación y `Go Stat Builder`. |
| Editor de artículos | DRM Elementos de base de datos, categorías, rarezas, información sobre herramientas, requisitos, bonificaciones, atributos y escalado. |
| Facción | CustomNPCs presentación de la facción, orden, estilos de estado y una visión general del jugador. |
| Teletransportador | Categorías, destinos, condiciones, comandos, fundidos, sonidos y enlaces NPC. |
| Popup | Definiciones popup reutilizables, política de conflicto/temporización, diseño de GUI, invocación de comando/script. |
| Admin | Búsqueda DRM/FTB, avance, facción, etiqueta y herramientas de datos almacenados. |

## Cambios de comportamiento importantes

- CustomNPCs es ahora una dependencia cliente-y-servidor requerida.
- Los requisitos de estadísticas de artículos ya no rechazan el equipo. Cuando no se cumple, `Unmet penalty %` elimina ese porcentaje de la contribución stat/attribute/scaling configurada del elemento.
- Las acciones de los eventos de búsqueda se limitan intencionalmente a `After Complete`. Corren una vez después de que las recompensas tienen éxito y la misión se completa.
- El selector de texturas usa selección explícita más `Apply`; la paginación o el filtrado no escriben en el destino.
- Los metadatos de animación de compañero `texture.png.mcmeta` válidos se transfieren con activos PNG personalizados.
- Los accesos directos de editor compartidos usan `Ctrl+S`, `Ctrl+Z` y `Ctrl+Y`/`Ctrl+Shift+Z` donde el editor admite deshacer historial.

## Lista de comprobación de actualización

1. Retroceder `config/dochi_rpg_maker`.
2. Instalar 0.1.4 y emparejar CustomNPCs en el servidor y cada cliente.
3. Comience una vez y revise las nuevas plantillas predeterminadas de GUI, quest, stat, item, teleporter y popup.
4. Mantenga el contenido de producción bajo ID personalizados; comience desde los valores predeterminados protegidos con `Save As`.
5. Revisar la superposición de HUD si los indicadores de datos Hechizos de hierro, Rollo de combate o CustomNPCs están habilitados.
6. Prueba la entrega de recompensas de misiones y las acciones `After Complete` en un reproductor de puesta en escena antes del uso de producción.

:::warning Datos predeterminados
Los paquetes predeterminados son plantillas de referencia y pueden actualizarse con la versión instalada. No trate un `default_*` o archivo de muestra como la única copia del trabajo de producción.
:::
