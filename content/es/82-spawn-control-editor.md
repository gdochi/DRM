---
title: Spawn Control Editor
slug: dochi-spawn-control-editor
order: 830
description: Utilice la barra superior, el catálogo de objetivos, la vista previa, el administrador de reglas, el inspector, los filtros y las acciones masivas.
product: dochi-spawn-control
category: Editor
section: editor
status: Proyecto
version: 0.1.4
audience: Creadores de reglas de spawn
tags:
  - editor
  - profiles
  - filters
translationSource: en
translationMethod: assisted
---

Esta página describe **perfiles naturales**. Para los reproductores colocados, utilice el [Guía del editor Spawner](#dochi-spawn-control/dochi-spawn-control-spawner). Natural-spawn `Spawn Chance (0-1)` está separado de las posibilidades relativas en una lista de objetivos del generador.

## Qué es esta pantalla

Spawn Control es un ** editor de autoría** para la configuración activa de natural-spawn del servidor. No es una pantalla de juego orientada al jugador. Los cambios permanecen en el borrador actual hasta que complete `Save` o una operación predeterminada.

![Spawn Control con Entity / Clone Catalog a la izquierda, una vista previa de destino y Natural Spawn Rules en el medio, y Rule Inspector a la derecha.](assets/media/guides/spawn-control-014-neo1211/catalog.png "Spawn Control 0.1.4 el NeoForge 1.21.1. Seleccione un destino, agregue una regla con Agregar regla y, a continuación, edite sus condiciones de aparición a la derecha.")

Encuentra la criatura en el campo de búsqueda de la izquierda. **Selected Target** muestra sus reglas; **All Configured** incluye otros objetivos. Si el panel derecho dice "No se selecciona ninguna regla", seleccione una regla en el medio.

## Barra superior

| Medidas adoptadas | Comportamiento |
| --- | --- |
| `Editors` | Vuelva al selector de editor compartido DRM cuando DRM Core esté disponible. |
| `Create New` | Inicie un borrador de conjunto de generación vacío sin cambiar la configuración del servidor activo todavía. |
| `Load` | Buscar y cargar un conjunto completo o preajuste de destino. |
| `Save` | Almacene el borrador como la configuración activa del servidor y aplíquelo inmediatamente. |
| `Save As` | Elija Conjunto completo o Preset de destino actual antes de nombrar el archivo. |
| `Reset` | Restaurar la línea base recibida cuando el editor se abrió o se actualizó por última vez después de guardar. |
| `Close` | Cierre el editor. Las ediciones no guardadas no se aplican. |

## Izquierda: Catálogo Entidad / Clon

El catálogo elige el destino para las nuevas reglas.

- Busca juntos criaturas registradas y plantillas NPC guardadas compatibles. Véase [spawning saved NPCs](#dochi-spawn-control/spawn-control-npc-templates) para las plantillas DNPC.
- Busque por ID, nombre de visualización o nombre de mod.
- Utilice `mod:<id>` o `support:<state>` consultas.
- Combine fuente de entidad/clon, estado de soporte y filtros de mod instalado.
- Vista previa del objetivo seleccionado en el panel central.
- Utilice la acción inferior `Native: ON/OFF` para una entidad registrada. No se aplica a los clones.

Se excluyen los proyectiles, efectos, vehículos y otros EntityTypes que no sean criaturas. Pueden aparecer jefes especiales con estado de soporte experimental.

## Medio: vista previa y reglas de spawn natural

La sección superior muestra una vista previa del destino del catálogo seleccionado. La sección inferior gestiona las reglas configuradas.

| Ver | Significado |
| --- | --- |
| `Selected Target` | Mostrar solo las reglas que pertenecen al destino de catálogo actual. Este es el valor predeterminado. |
| `All Configured` | Mostrar reglas para cada objetivo en una vista de administración. |

La selección de un cuerpo de reglas en `All Configured` selecciona ese perfil y mueve el catálogo a su objetivo real. No copia ni hereda la regla en la entidad previamente vista previamente.

Cada parte de una fila de reglas tiene una acción separada.

| Área de la fila | Medidas adoptadas |
| --- | --- |
| Casilla izquierda | Seleccionar reglas para duplicar, habilitar, deshabilitar o eliminar a granel |
| Cuerpo de fila | Seleccione el perfil que se muestra en el inspector |
| Interruptor derecho | Alternar el estado habilitado de un perfil |

`Add Rule` siempre crea un perfil para el destino de catálogo actual. Las acciones masivas solo afectan a las reglas verificadas. Eliminar tiene un paso de confirmación y sigue siendo un cambio de borrador hasta que se guarde.

## Buscar, filtrar y ordenar

La búsqueda de reglas cubre nombres, ID de perfil, claves de destino, EntityTypes, pestaña/nombre de clon y errores de validación. El estado en línea, la clave de ordenación y los menús desplegables de dirección debajo de la búsqueda de reglas proporcionan:

- estado: Todos, Habilitado, Deshabilitado o Error
- sort key: Prioridad, Nombre u Objetivo
- Dirección: Ascendiendo o Descendiendo

No se ha eliminado ninguna regla oculta por búsqueda o filtrado. Si un destino tiene reglas pero el resultado está vacío, primero borre la consulta y el filtro de estado.

## Derecha: Inspector de reglas

El inspector edita el perfil seleccionado en Identidad, Condiciones Mundiales, Tasa de Spawn y Grupo, Límites de Población y Ciclo de Vida.

Dimensiones y biomas utilizan selectores de selección múltiple de búsqueda. Ninguna selección significa sin restricciones. Los rangos numéricos usan campos separados; los rangos invertidos se pueden normalizar en orden seguro durante el guardado.

La etiqueta EntityType o clon bajo el inspector es el objetivo real ** propiedad de la regla seleccionada**. Si difiere de la vista previa, compruebe si seleccionó intencionalmente una regla diferente en `All Configured`.

## Diagnóstico avanzado

| Medidas adoptadas | Impacto mundial |
| --- | --- |
| `Check Here` | Evaluar las condiciones y límites en la ubicación actual sin crear una entidad |
| `Spawn One` | Crear una entidad administrada real después de la confirmación |
| `Clear Generated` | Eliminar entidades generadas actualmente rastreadas por este mod |

Los diagnósticos envían el borrador actual para una evaluación temporal del lado del servidor sin reemplazar primero el archivo de configuración activo.

Los filtros de reglas cambian la presentación de la lista sin guardar el documento. Escape o un clic externo cancela un menú desplegable abierto sin activar los controles de fondo. Los paneles estrechos envuelven los controles en la siguiente línea.
