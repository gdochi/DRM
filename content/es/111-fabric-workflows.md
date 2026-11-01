---
title: Flujos de trabajo recomendados
slug: workflows
order: 120
description: Flujos prácticos para el diálogo, tiendas, Teleporter, NPC Spawner y configuración de moneda / HUD.
product: core-fabric
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

## Construye un PNJ de pueblo en este orden

Empieza con **una escena de conversación → interacción real → tienda o viaje → apariencia personalizada**. Los diseños predeterminados son suficientes para probar el diálogo y las transacciones.

## Guía NPC: saludo y respuesta

1. [Colocar a DNPC](#dochi-npc-core/npc-core-setup).
2. Escriba un saludo en un nodo general Dialogue Editor y una pregunta en Opciones.
3. Cree su nodo de respuesta y conecte Goto. Punto de inicio Rutas al saludo.
4. Save As `village_guide` y Apply Dialogue a la NPC.
5. Vaciar ambas manos y responder a la pregunta de prueba → → cerrar.

![Una respuesta NPC real después de seleccionar la pregunta.](assets/media/guides/drm-031-neo1211/dialogue-npc-reply.png "DRM 0.3.1 / NeoForge 1.21.1. Compruebe la conexión entre el texto de autor y la respuesta que el jugador realmente ve.")

Siga las instrucciones [Tutorial de conversación](#core-fabric/dialogue-system) para cada pantalla. Para un regalo de una sola vez, conecte una etiqueta de reclamación como se muestra en [condiciones y acciones](#core-fabric/conditions-actions).

## Tienda NPC: vender un paquete de pan

Seleccione Pan en el valor predeterminado NPC Shop. Verifique la cantidad del producto `3` y el precio `4`, y utilice el pago esmeralda en Configuración de la tienda. Save As y aplicar NPC Shop al NPC.

En la tienda real, compruebe Pan y pulse **Buy Selected**. Verificar **tres panes concedidos, cuatro esmeraldas tomadas y un paquete de stock consumido** antes de añadir otros sistemas de recompensa.

![La tienda real después de que se compró el pan.](assets/media/guides/drm-031-neo1211/shop-bread-purchased.png "DRM 0.3.1 / NeoForge 1.21.1. El servidor comprueba el pan confirmado 0→3, las esmeraldas 10→6 y el caldo de pan 12→11. El pie de página sigue el producto seleccionado actualmente.")

Sigue [el tutorial de la tienda](#core-fabric/shop-system). Añada [Currency Editor](#core-fabric/currency-editor) cuando necesite dinero de la cuenta. Utilice Go Shop para conectar la tienda guardada desde una opción de diálogo.

## NPC de viaje: guarda un destino, luego viaja

En el Editor de teletransportadores, nombre un destino y elija coordenadas en la misma dimensión. Save As y aplicar el teletransportador al NPC. Ábrelo con las manos vacías, selecciona el destino y presiona **Travel**.

![Llegada al destino de viaje guardado.](assets/media/guides/drm-031-neo1211/teleporter-arrived.png "DRM 0.3.1 / NeoForge 1.21.1. Las coordenadas del servidor confirmaron la llegada a 20.5 / -60 / 0.5. El hito fue preparado de antemano para la verificación de ubicación.")

Véase [la guía del teletransportador](#core-fabric/teleporter) para condiciones y destinos cerrados. Utilice Go Teleporter para conectar el conjunto guardado desde el diálogo.

## Extender un NPC de trabajo

| Próxima tarea | Guía |
| --- | --- |
| Diálogo/Aparición en la tienda | [GUI Maker](#core-fabric/gui-system) |
| Salud persistente o pantalla de dinero | [HUD Maker](#core-fabric/hud-maker) |
| Reutilizar un NPC en varios puntos de aparición | [DNPC plantillas y Spawn Control](#dochi-spawn-control/spawn-control-npc-templates) |
| Más viejo Core NPC Spawner | [Su propia guía](#core-fabric/npc-spawner); CustomNPCs los flujos de trabajo pertenecen solo a objetivos soportados más antiguos |
| Mover el trabajo a otro servidor | [Carpetas](#core-fabric/paths) y [aplicación de cambios](#core-fabric/data-flow) |

Después de Save As bajo un nuevo nombre, seleccione ese nuevo archivo para el NPC también. Traiga imágenes vinculadas, divisas y tiendas, y preserve la colocación y el progreso de los PNJ mundiales por separado.
