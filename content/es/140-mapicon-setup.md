---
title: Mostrar iconos de NPC en el mapa
slug: mapicon-setup
order: 1400
description: Ofrezca a las tiendas, entrenadores y otros iconos de mapas reconocibles de NPC.
product: dochi-mapicon-integration
category: Inicio
section: setup
status: Guía de uso
version: 0.1.2
audience: Creadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

## Dar a un NPC un icono azul

Prepare DRM, MapIcon Integración y el mapa que desea mostrar. Estas pantallas se verificaron con **MapIcon 0.1.2 / DNPC 0.1.3 / NeoForge 1.21.1 / Xaero’s Minimap 26.6.0**. La edición de iconos también funciona sin un mapa instalado.

1. [Colocar a DNPC](#dochi-npc-core/npc-core-setup).
2. Abrir **NPC editor → Addons → Map icon**. El editor individual solo tiene **Selected NPC** a la izquierda.
3. Habilite **Icon** y elija una imagen. Este ejemplo utiliza el icono humanoide azul incorporado.
4. Utilice **Size 16**, **Tint 4AB7FF** y habilite **Minimap**. Habilitar **World map** para ese mapa también.
5. Presiona **Save** y espera a **Settings saved**.
6. Cierra el editor y encuentra el icono de NPC en el minimapa.

![El icono humanoide azul guardado para el PNJ seleccionado.](assets/media/guides/mapicon-012-neo1211/mapicon-npc-saved.png "Guardar en esta pantalla guarda el NPC seleccionado. El panel central es una vista previa de iconos, no un mapa. Compruebe el recurso Textura, Tamaño, Tint y los cambios de mapa juntos.")

![El DNPC mostrado como un humanoide azul en el minimapa Xaero real.](assets/media/guides/mapicon-012-neo1211/mapicon-minimap.png "En el minimapa superior izquierdo, el humanoide azul justo encima del marcador de jugador blanco es la guía de Oakridge. Los marcadores amarillos son otros animales. El NPC se colocó a unas veinte cuadras de distancia para comparar su mapa y las posiciones del mundo.")

## Utilice un icono para todas las tiendas

Para una categoría completa, abra el editor de iconos completo de la lista de editores de DRM o **Mods Config**.

1. Habilite la visualización global y seleccione **Type defaults → NPC Shop JSON**.
2. Elija la imagen, el tamaño, el tinte y la visibilidad del mapa.
3. Utilice **Save & Apply** para guardar y activar el perfil del servidor.
4. Compruebe un NPC con una tienda real DRM aplicada.

Elija el valor predeterminado correspondiente para los NPC o entrenadores de diálogo. Cobblemon Los roles aparecen cuando se instala Cobblemon Editor. Las ilustraciones individuales del NPC tienen prioridad; véase [icon priority](#dochi-mapicon-integration/mapicon-editor-rules).

## Instalación

| Minecraft | Cargador | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

Instalar archivos match-loader DRM y MapIcon en el servidor y los clientes. Instale los mapas que desee y sus bibliotecas requeridas. Fabric también necesita Fabric API.

Puede editar iconos sin un mapa instalado, pero no puede verlos en un mapa. El uso DNPC en 26.3; CustomNPCs no está disponible allí.

Para obtener imágenes personalizadas o iconos que faltan, consulte [imágenes y solución de problemas](#dochi-mapicon-integration/mapicon-files-operations).
