---
title: Instalar y hacer su primera batalla
slug: cobblemon-editor-setup
order: 510
description: Dar un NPC uno Pokémon y comenzar una batalla con el jugador.
product: drm-cobblemon-editor
category: Configuración
section: setup
status: Proyecto
version: Fabric / NeoForge 0.2.9
audience: Operadores de servidores y creadores por primera vez
tags:
  - setup
  - fabric
  - npc
translationSource: en
translationMethod: assisted
---

## Mods requeridos

| Artículo | Versión / elección |
| --- | --- |
| Minecraft | 1.21.1 / Java 21 |
| Cargador | Fabric o NeoForge |
| DRM Centro | Cargador coincidente; esta guía se ejecutó con 0.3.1 |
| Cobblemon | Esta guía se ejecutó con 1.8.4 |
| Cobblemon Editor | Coincidencia-cargador 0.2.9 |
| PNJ | DNPC o CustomNPCs |

Haga coincidir los archivos del cargador en el servidor y los clientes. Fabric también necesita las versiones de Cargador/API requeridas por DRM y Cobblemon.

## Haz que el primer entrenador

1. Coloca un PNJ. Comience con [DNPC ](#dochi-npc-core/npc-core-setup) si necesita uno.
2. Haga clic con el botón derecho en **Dochi RPG Maker Core** y abra **Add-on → Cobblemon Editor**.
3. Comience desde el equipo inicial o use **Create New**. En **Battle Config → General**, habilite **Trainer Battle** y elija **Battle type → vs Trainer**.
4. Elija uno Pokémon y su nivel bajo **Pokemon Party**.
5. Utilice **Singles** y el disparador **Interaction**.
6. **Save As** `custom/first_trainer.json`.
7. Haga clic con el botón derecho en el NPC con el DRM Core y elija **vs Trainer → su archivo → Apply vs Trainer **. Verifique el nombre debajo de **APPLIED JSON** a la derecha.
8. Pon un Pokémon listo para la batalla en tu propio equipo, vacía ambas manos y habla con el NPC.

![Ajustes generales para un primer entrenador.](assets/media/guides/cobble-029-neo1211/cobble-config.png "Comprobar Entrenador de batalla y tipo de batalla en Configuración de batalla → General. Name fuente elige el nombre de perfil o el nombre de NPC aplicado.")

![Archivo de entrenador adjunto con éxito en NPC Apply.](assets/media/guides/cobble-029-neo1211-flow/cobble-trainer-applied.png "Cobblemon Editor 0.2.9, DRM 0.3.1 y DNPC 0.1.3 / NeoForge 1.21.1. Aplicando custom/guide_trainer.json colocado guide_trainer bajo vs Trainer a la derecha. Guardar un documento y vincular un NPC son pasos separados.")

## Combate el Pokémon mismo

Elija **Battle type → vs Cobblemon**, luego establezca la especie, la apariencia y el nivel. Guardar bajo un nombre diferente y aplicar a través de **vs Cobblemon** en NPC Apply. Este tipo de Pokemon usa un Pokémon por ronda.

## ¿Los cambios necesitan otra aplicación?

Al cambiar Pokémon, niveles u otros contenidos en el mismo archivo con **Save** se actualiza la siguiente interacción. Vuelva a aplicar después de cambiar el nombre del archivo o la función NPC.

Usa `/drm reload` después de editar archivos fuera del juego.

## Si la batalla no se abre

| Problema | Comprobar |
| --- | --- |
| Falta editor | DRM, Cobblemon y addon instalado para el mismo cargador |
| NPC no hace nada | Habilitado Entrenador, archivo guardado aplicado y ambas manos vacías |
| Diálogo/taller abre primero | Conecte su diálogo con go_battle o utilice otro NPC |
| Error del jugador-equipo | Un Pokémon listo para la batalla está en tu equipo |

Continuar con [equipos, rondas y recompensas](#drm-cobblemon-editor/cobblemon-trainer-editor).

## Mira cómo empieza la batalla
![Elige luchar en el diálogo aplicado, observa la entrada y accede a la batalla real.](assets/media/guides/runtime-videos-20261106/trainer-battle-start.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, inglés. Ejemplo preparado: diálogo → go_battle → presentación → batalla.")

Tras abrir la primera batalla, añade un objetivo de gimnasio con [recompensas de medallas](#drm-cobblemon-editor/cobblemon-badges).
