---
title: Regalará tu NPC guardado
slug: spawn-control-npc-templates
order: 838
description: Usa un DNPC guardado en las reglas naturales o los generadores colocados.
product: dochi-spawn-control
category: DNPC el aparición de plantilla
section: editor
status: Guía
version: 0.1.5
audience: Creadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

## Engendrar un guardia con su casco guardado

Este ejemplo conecta la plantilla DNPC `guide_guard` a un generador colocado. Se necesita **DNPC and DRM**. La entrada ordinaria DNPC en `Entity` crea un NPC por defecto. Elija **NPC clone template** para reutilizar la apariencia y el equipo que preparó.

Primero termina la guardia en DNPC, luego **Save to NPC → Save As → Name: guide_guard → Save**. Consulte [guardar plantillas NPC](#dochi-npc-core/npc-core-templates) para las dos operaciones de guardado diferentes.

## 1. Elija el NPC guardado

1. Abrir **Spawner Editor → Spawn Target**. Reutilice la entrada inicial; **Add** crea más entradas cuando desea una mezcla.
2. Cambia su **Source** a **NPC clone template**.
3. Presione la lupa (**Choose**) junto a **Entity / Clone** y busque `guide_guard`.
4. Seleccione **NPC [dochi_npc:actor/guide_guard]** y, a continuación, presione **Select**.

![La entrada guardada guide_guard en el selector de plantillas NPC.](assets/media/guides/spawn-control-014-neo1211/spawn-npc-template-picker.png "Spawn Control 0.1.4  +  DNPC 0.1.3 / NeoForge 1.21.1. Incluso cuando su nombre visible es NPC, el identificador guide_guard entre corchetes distingue esta plantilla.")

## 2. Guardar el archivo de generación

Enciende **Enabled** y mantenlo **Entities per activation** en `1`. Con una entrada y **Chance** `1.0`, esa entrada tiene un porcentaje de selección 100%. Esto no significa que genere cada tick; el tiempo y las condiciones son configuraciones separadas.

Utilice **Save As**, introduzca `guide_guard_spawner.json` y, a continuación, pulse **Confirm**. Compruebe que **JSON file** en la parte superior muestra ese nombre.

![El generador guardado utiliza la plantilla de clon NPC y dochi_npc:actor/guide_guard.](assets/media/guides/spawn-control-014-neo1211/spawn-npc-template-saved.png "Spawn Control 0.1.4 / NeoForge 1.21.1. guide_guard es el original NPC; guide_guard_spawner.json contiene sus reglas de aparición. Estos son archivos separados.")

## 3. Aplícalo al reproductor de mundo

1. Usa **Get Spawner** y coloca el objeto en el mundo.
2. Mantenga pulsado el **DRM Core** y haga clic con el botón derecho del ratón en el generador colocado.
3. Seleccione **guide_guard_spawner.json** y pulse **Apply JSON**. La ventana se cierra después de aplicar.
4. Por defecto **Conditions** requieren un jugador cercano y dejar **Include creative players** apagado. Pruebe estos ajustes en Survival dentro de los bloques 16.

![guide_guard_spawner.json seleccionado en la ventana Aplicar Spawner JSON del reproductor colocado.](assets/media/guides/spawn-control-014-neo1211/spawn-block-apply.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Save As escribe el documento; Aplicar JSON actualiza este generador de mundo.")

Después de este flujo creó un nuevo NPC y conservó el casco de hierro original. Ajustar [timing, límites propios y condiciones](#dochi-spawn-control/dochi-spawn-control-spawner-settings) para reutilizar la misma plantilla en otros encuentros.

![Los NPC originales y equipados con casco junto al reproductor.](assets/media/guides/spawn-control-014-neo1211/spawn-template-runtime.png "Spawn Control 0.1.4  +  DNPC 0.1.3 / NeoForge 1.21.1. Los nuevos PNJ conservan el casco de hierro guardado. El límite de propiedad predeterminado es 6, por lo que las activaciones posteriores pueden agregar más NPC.")

## Aparición natural — todos los destinos de 0.1.5

En 0.1.5, las plantillas DNPC guardadas funcionan en reglas naturales en Forge 1.20.1, Fabric/NeoForge 1.21.1 y 26.3. Abre el editor con **K**, busca la plantilla, usa **Add Rule**, ajusta bioma, hora, distancia y cantidades, activa la regla y guarda. El PNJ predeterminado y la plantilla son destinos distintos. Si falta la plantilla o la API proveedora de DRM, se rechaza esa aparición en vez de crear un PNJ vacío.

## Entradas faltantes o apariencia incorrecta

| Problema | Comprobar |
| --- | --- |
| Falta una plantilla antigua | Cargarlo en DNPC, luego Save to NPC → Save As bajo un nuevo nombre |
| Existe un archivo pero no está en la lista | Verificar el servidor config/dochi_npc_core/templates/ y la presencia de DNPC y DRM |
| Guardar no actualizó un reproductor | Abre ese generador de mundos con el Núcleo y vuelve a aplicar JSON |
| Nada sucede en el mundo creativo | Comprobar Incluir jugadores creativos o probar en Survival |
| Los viejos equipos siguen apareciendo | Guarda el original del NPC de nuevo, recarga su plantilla y vuelve a aplicar el generador |

Spawn Control gestiona la generación repetida de sus NPC. Su respawn nativo salvado no corre junto a él.
