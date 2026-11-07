---
title: Archivos de mapa y solución de problemas
slug: mapicon-files-operations
order: 1420
description: Ubicaciones de perfil y PNG, límites de visualización de NPC en vivo y solución de problemas.
product: dochi-mapicon-integration
category: Archivos y operaciones
section: operations
status: Guía de uso
version: 0.1.3
audience: Creadores / operadores
translationSource: en
translationMethod: assisted
---

## Perfiles e imágenes

| Datos | Ruta / ejemplo |
| --- | --- |
| Perfiles de servidor | `config/dochi_mapicon_integration/*.json` |
| Nombre de perfil activo | `config/dochi_mapicon_integration/active.txt` |
| DRM PNGs de servidor | `config/dochi_rpg_maker/assets/textures/icons/` |
| PNGs instalados | `config/dochi_rpg_maker/assets/textures/icons/nikoichu/` |

Coloque los PNG personalizados en la carpeta de textura del servidor y busque **Choose Icon → External Images**. `assets/textures/icons/vendor.png` utiliza el ID de visualización `dochi_rpg_maker:textures/icons/vendor.png`. Los clientes usan la transferencia de texturas y la caché de DRM.

Para un paquete de recursos `assets/myserver/textures/icons/vendor.png`, ingrese `myserver:textures/icons/vendor.png`. Se recomiendan PNG estáticos 32×32 o 64×64; el máximo es 1024×1024. Las imágenes que faltan o están pendientes usan el icono de NPC predeterminado. La inicialización del servidor solo instala los PNG agrupados que faltan y conserva los archivos existentes.

MapIcon 0.1.3 reutiliza las imágenes y los marcadores de JourneyMap que no han cambiado. Después de sustituir un PNG de un paquete de recursos con el mismo ID de recurso, recargue los paquetes de recursos para actualizar la imagen en los mapas.

## Límites de visualización en vivo

Solo se muestran los NPC cargados en el servidor en la dimensión del jugador: dentro de los bloques 4096, el más cercano primero, hasta 512 entradas. El servidor se actualiza cada segundo; los clientes que rastrean una entidad usan su posición real.

Descarga, muerte, cambios de dimensión y desconecta entradas obsoletas. La versión 0.1.3 no almacena los POI fijos ni las últimas ubicaciones conocidas para los NPC descargados. Los NPC administrados suprimen su marcador de radar Xaero normal para reducir los duplicados. El modo de juego limpio de Xaero no dibuja la capa de minimapa adicional.

![El marcador recibido DNPC renderizado en el minimapa Xaero real.](assets/media/guides/mapicon-012-neo1211/mapicon-minimap.png "MapIcon 0.1.2 / NeoForge 1.21.1 / Minimapa de Xaero 26.6.0. El humanoide azul sobre el marcador del jugador blanco representa el NPC visible en el mundo. Compruebe el mapa real después de guardar, así como la vista previa del editor.")

## Solución de problemas

| Síntoma | Comprobar |
| --- | --- |
| Sin iconos | Xaero / XaeroLib o JourneyMap 6 compatibles, visualización global, cambio de mapa, NPC cargado, dimensión y distancia |
| Oculto solo para un jugador | DRM Condiciones de visibilidad NPC, ocultamiento por NPC y una regla de inhabilitación coincidente |
| Icono inesperado | Anulación por NPC, ruta JSON, prioridad de regla y orden de tipo predeterminado |
| Marcadores duplicados | Si el complemento administra ese NPC y la compatibilidad de la compilación Xaero instalada |
| Conflicto al guardar | Use **Reload saved settings** y vuelva a aplicar los cambios; otro editor puede haber cambiado el perfil o el NPC seleccionado |
| Los iconos desaparecen muy lejos | Los NPC descargados están fuera del alcance actual de la pantalla en vivo |

La edición, la exploración de archivos y el almacenamiento requieren un nivel de permiso 2, mientras que los jugadores comunes pueden ver los iconos del mapa. Haga copias de seguridad de los perfiles de mapas, los activos DRM y los datos de los PNJ del mundo juntos.
