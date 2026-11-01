---
title: Reglas de destino
slug: warfare-target-filters
order: 340
description: Restrinja los objetivos NPC de armas de fuego por ID de entidad, facción, etiqueta de marcador y reglas de postura avanzadas.
product: dochi-warfare
category: Objetivos
section: targets
status: Proyecto
version: 0.3.1
audience: Diseñadores de encuentros
tags:
  - target
  - filter
  - faction
translationSource: en
translationMethod: assisted
---

## Elige qué criaturas atacar

Busque un destino como `minecraft:zombie` en la parte superior de **Targets**, luego verifique su fila. **Type / View / Mods** filtrar el catálogo; **All / None** seleccionar o borrar las entradas que se muestran actualmente.

![Lista de entidades objetivo con las condiciones seleccionadas 0 y etiqueta a continuación.](assets/media/guides/warfare-031-neo1211/dw-targets.png "DW 0.3.1 / NeoForge 1.21.1. Este ejemplo tiene cero selecciones explícitas. Cero no significa atacar a todas las criaturas; la hostilidad y las reglas de etiqueta debajo todavía importan.")

## Por qué los objetivos necesitan cuidados adicionales

Los NPC de armas de fuego pueden atacar desde más lejos que la mayoría de los NPC cuerpo a cuerpo, por lo que una regla de objetivo incorrecta es inmediatamente visible. Cree reglas de destino en pequeños pasos: primero confirme que el NPC puede disparar, luego agregue ID de entidad, luego etiquetas y luego comportamiento avanzado de facción o postura.

## Lista de objetivos de ID de entidad

La pestaña `Targets` puede seleccionar los ID de entidad de destino permitidos. La lista incluye búsqueda, solo marcado, solo desmarcado, filtrado de tipo de entidad y filtrado de ID de mod. Esta es la forma más limpia de hacer que un guardia ataque solo a un grupo específico de criaturas o solo a entidades de un mod específico.

| Control | Uso |
| --- | --- |
| Buscar | Identificadores de filtro como `minecraft:zombie`. |
| Ver filtro | Mostrar todas las entradas, solo marcadas o solo no marcadas. |
| Tipo filtro | Amplios grupos de entidades vivientes. |
| Filtro Mod | Mostrar los ID de entidad de los ID de mod seleccionados. |
| Seleccionar todo / ninguno | Aplicar a la lista filtrada visible actualmente. |

Una lista de entidad objetivo vacía significa que no hay una lista de permiso de entidad estricta. Un gestionado CustomNPCs shooter sigue escaneando para que pueda heredar auténtico CustomNPCs hostilidad de la facción hacia NPCs o jugadores. El candidato aún debe coincidir con un selector explícito, la excepción de etiqueta de la misma facción o una regla de facción hostil real; las entidades pasivas y no relacionadas no se convierten en objetivos automáticos.

Las búsquedas de objetivos vivos a larga distancia utilizan un índice espacial antes de aplicar las reglas de ID de entidad, etiqueta, facción, distancia, ángulo y línea de visión. En 0.2.9, cada objetivo recién descubierto debe pasar el rango configurado, la línea de visión y el ángulo de conciencia incluso mientras el NPC ya está luchando. Solo el daño válido, la autodefensa, la detección cercana o las reacciones de defensa de facciones pueden conceder la excepción documentada; un objetivo silencioso detrás del NPC no se adquiere simplemente porque el combate esté activo.

## Reglas de etiqueta del marcador

Las reglas de etiqueta usan etiquetas de marcador de entidad:

| Campo | Comportamiento |
| --- | --- |
| Etiquetas requeridas | Si se establece, un objetivo debe tener al menos una etiqueta requerida. |
| Etiquetas rechazadas | Si se establece, se rechaza un objetivo con cualquier etiqueta rechazada. |
| Ataque a la misma facción por tag | Permite que la misma facción CustomNPCs sea atacada cuando una etiqueta requerida coincide. |

Las etiquetas son útiles para los eventos con guiones. Por ejemplo, un script de mazmorra puede agregar una etiqueta `intruder` a los jugadores o NPC durante una fase de alarma y luego eliminarla después del encuentro.

## Facciones y postura avanzada

Las reglas de postura avanzadas pueden usar `Always`, salud de NPC por debajo de una proporción, facción objetivo, etiqueta objetivo o ID de entidad objetivo. `Always` y el estado de salud del PNJ puede evaluarse sin un objetivo de combate actual. Las condiciones de facción, etiqueta y entidad de destino requieren un objetivo vivo, por lo que debe agregar los identificadores y etiquetas necesarios en `Targets` antes de usarlos desde `Stance Mode: Advanced`.

El modo avanzado admite una regla condicional activa. Esto mantiene el resultado predecible. Utilice `Default` comportamiento si el NPC debe volver a la configuración normal `General` cuando la condición avanzada no coincide.

## Cargar y Save As perfiles

Los perfiles de las barras superiores `Load` y `Save As` se almacenan en:

```text
config/dochi_warfare/target_entities/
```

Los perfiles actuales no son solo archivos de entidad objetivo. Funcionan como preajustes de configuración que conectan la configuración de arma de fuego DW de un NPC a otro CustomNPCs NPC. Configure pistolas, IA, objetivos, munición y grupos en un NPC, almacene el perfil con `Save As` y, a continuación, `Load` en otro NPC. JSON de destino heredado todavía se puede cargar desde la raíz heredada migrada.

## Ejemplos prácticos

| Escenario | Regla sugerida |
| --- | --- |
| Guardia zombie | Seleccione los ID de entidad similares a zombies en la lista de entidades. |
| Fase del evento | Utilice la etiqueta requerida `phase2_target`, luego retire la etiqueta cuando termine la fase. |
| Duelo de la misma facción | Use las etiquetas requeridas y habilite la orientación de etiquetas de la misma facción solo para los participantes del evento. |
| Jefe rifle anti-añadir | Permita solo los ID de entidad y deje a los jugadores fuera de la lista. |

## Depuración de reglas de destino

Si el NPC no se dispara, retire los filtros temporalmente y pruebe con un objetivo hostil básico. Luego agregue una regla a la vez. La mayoría de los problemas de destino provienen de la mezcla de una lista de permisos de entidad, etiquetas requeridas, etiquetas rechazadas y reglas de la misma facción antes de confirmar la línea base.

Un NPC que patrulla no debe descartar inmediatamente un objetivo vivo después de una pérdida momentánea de la vista. Los NPC administrados usan memoria de combate corta y la última posición conocida para sobrevivir a una breve oclusión. La comprobación final de la línea de visión todavía evita el fuego directo a través de una pared durante esa ventana de memoria.
