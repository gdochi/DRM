---
title: Reutilizar los entrenadores con Clone Library
slug: cobblemon-clone-library-spawner
order: 560
description: Guardar un entrenador aplicado como un clon y conectarlo a un Core NPC Spawner.
product: drm-cobblemon-editor
category: Clones y Dueñas
section: world-tools
status: Guía de uso
version: Fabric / NeoForge 0.2.9
audience: Creadores que reutilizan NPCs de batalla
tags:
  - clone-library
  - npc-spawner
translationSource: en
translationMethod: assisted
---

## Guardar un entrenador terminado para su reutilización

**Clone Library** guarda un NPC que ya tiene un rol de Entrenador o Pokemon. Elija ese clon como fuente en **DRM Core NPC Spawner**. DNPC propias plantillas Save As utilizan un formato diferente, el uso [ Spawn Control ](#dochi-spawn-control/spawn-control-npc-templates) para esas plantillas.

El siguiente flujo de guardar y aplicar se comprobó con **Cobblemon Editor 0.2.9, DRM 0.3.1 y DNPC 0.1.3 en NeoForge 1.21.1 **.

1. Crea un equipo en [Trainer Editor](#drm-cobblemon-editor/cobblemon-trainer-editor) y **Save As** tu propio archivo.
2. Abre el NPC con el Núcleo DRM. Elija **vs Trainer → su archivo → Aplicar vs Trainer**. Compruebe el nombre de archivo en **APPLIED JSON** a la derecha.
3. Abrir **Clone Library** para ese NPC y elegir **Save As**.
4. Habilitar **Follow applied JSON source** si los nuevos clones deben seguir las ediciones al archivo original. Compruebe el nombre y pulse **Confirm**.
5. Encuentra el NPC bajo **Saved Clones**. Seleccione su fila para los detalles y **Test Spawn**.

![NPC Apply con guide_trainer conectado bajo vs Entrenador.](assets/media/guides/cobble-029-neo1211-flow/cobble-trainer-applied.png "vs Entrenador a la izquierda selecciona una categoría; Aplicar vs Entrenador en la parte inferior realiza la encuadernación. El servidor reconoció custom/guide_trainer.json y el nombre de archivo apareció a la derecha.")

![Guardado entrenador guía Oakridge en Clone Library.](assets/media/guides/cobble-029-neo1211-flow/cobble-clone-library.png "El servidor devolvió Saved clone: trainer/guide_trainer_clone y creó su archivo. El entityType almacenado es dochi_npc:npc y bindingPolicy es follow_source. Esto muestra el guardado de clones, no una ejecución de generador completa.")

## Elige cómo afectan las ediciones a los clones

| Configuración | Utilícelo cuando |
| --- | --- |
| **Follow applied JSON source** habilitado | Los NPC recién creados deben leer los cambios en el archivo de origen aplicado |
| Deshabilitado: **Snapshot** | El NPC guardado debe mantener su contenido capturado sin seguir ediciones de origen posteriores. |

Guardar un ID de clon existente requiere sobrescribir la confirmación. Antes de eliminar un clon, compruebe qué reproductores usan su ID; esas entradas no pueden aparecer después de que se elimine su fuente.

La ficha **Filled Soul Stones** importa fuentes heredadas CustomNPCs a través de ese proveedor en los objetivos anteriores Minecraft admitidos. Está separado de guardar un objetivo DNPC.

## Conectar un Core NPC Spawner

1. Lugar `dochi_rpg_maker:npc_spawner`.
2. Mantenga pulsado el elemento central DRM, `dochi_rpg_maker:dialogue_editor`, y haga clic con el botón derecho del ratón en el bloque.
3. En **Source**, agregue un clon guardado.
4. En **Spawn**, comience con **Wave size 1** y **Max active 1**, luego **Save** al bloque.
5. Prueba de detección de objetivos en Supervivencia: Se excluyen los jugadores creativos y espectadores.

![Core NPC Spawner Ajustes de tiempo y cantidad.](assets/media/guides/drm-031-neo1211/core-npc-spawner-rules.png "El modo selecciona el disparador, Enfriar el intervalo, Máx. activa el límite de vida y Tamaño de onda el recuento por activación. Esta captura separada tiene fuentes Asignadas 0 y solo muestra la configuración; no establece que el clon guardado se generó.")

Utilice el bloque Núcleo para nuevas ubicaciones. El antiguo bloque de complementos `cobble_npc:clone_spawner` sigue siendo compatible con el mundo existente. Este es un generador de bloques fijo; el bioma y la generación de fragmentos pertenecen a un sistema separado de engendro natural.

### Trigger y referencia de cantidad

| Configuración | Opciones / rango |
| --- | --- |
| Modo | Continuo, Target cercano, Target Enter, Redstone Pulse |
| Enfriamiento | 20–72,000 ticks |
| Tamaño de onda/máximo activo | 1– 32 cada uno |
| Radio objetivo | 1–64 bloques |
| Desplazamiento | −32–32 bloques por eje |
| Radio aleatorio | 0–32 bloques |
| Fuente pool | Hasta 64 clones; cada peso 1–10,000 |
| Condiciones | Hasta 32 reglas comprobadas por el servidor |

Las ponderaciones influyen en la selección aleatoria de cada ranura de generación; no definen una secuencia fija. **Require Target**, **Remove Inactive** y redstone Ignorar/Potenciado/Potenciado control cuando el bloque puede funcionar. **Effects** los cambios generan partículas y la apariencia del bloque; la apariencia del NPC proviene de su clon.

## Mantener los archivos necesarios juntos

| Carpeta | Sumario |
| --- | --- |
| `config/dochi_rpg_maker/npc_spawner/entity_clones/` | Almacenamiento de clon básico |
| `config/dochi_rpg_maker/cobblemon/entity_clones/` | Cobblemon Clone Library almacenamiento de compatibilidad |

El núcleo actual lee ambas ubicaciones. Evite duplicar IDs y mantenga los archivos de origen `cobblemon/trainers/` y `pokemon_itself/` con clones de código de seguimiento. Preservar el mundo también cuando se mueven los generadores instalados.

## Compruebe la limpieza de batalla antes de añadir olas

Cobblemon El editor registra la limpieza consciente de la batalla con Core. Un NPC reservado para la batalla no se elimina inmediatamente por **Remove Inactive** o limpieza de olas; la eliminación espera hasta que finalice la reserva.

Comience con un clon. Confirme su apariencia y rol de batalla con **Test Spawn**, luego pruebe el generador instalado, salga de su área de detección durante una batalla, limpie después y reinicie el servidor. Verifique las distribuciones ponderadas sobre las activaciones repetidas en lugar de juzgar un solo resultado.
