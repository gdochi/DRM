---
title: Presentaciones Wild, RCT y PvP
slug: cobblemon-encounter-presentations
order: 535
description: Atar escenas guardadas para encontrar categorías y excepciones individuales.
product: drm-cobblemon-editor
category: Presentación de batalla
section: presentation
status: Proyecto
version: Fabric / NeoForge 0.2.9
audience: Creadores y operadores
translationSource: en
translationMethod: assisted
---

## Crear una escena, luego enlazarla

`Battle Presentation Maker` Escenografías de autores. **Encounter Presentations** une por separado las escenas guardadas a las batallas ordinarias salvajes Pokémon, RCT entrenadores y PvP. Encuéntralo directamente debajo de Battle Presentation en la lista de editores del complemento DRM.

1. Guarda una escena en [ Presentación de batalla](#drm-cobblemon-editor/cobblemon-battle-presentation).
2. Abre Presentaciones de Encuentro y selecciona Salvaje, RCT o PvP.
3. Habilite el conmutador global de esa categoría y seleccione una escena JSON del servidor.
4. Agregue excepciones de especies silvestres o RCT entidades si es necesario.
5. Guarda y comprueba la siguiente batalla.

Nueva categoría cambia por defecto a OFF. Los entrenadores de PNJ complementarios existentes conservan sus propios ajustes de presentación de Entrenador sin reproducción doble. RCT API sigue siendo opcional.

| Configuración | Resultado |
| --- | --- |
| Global OFF | Inhabilitado incluso cuando una regla individual está activada |
| Global ON, individual OFF | Discapacitados para ese objetivo |
| Global ON, individual ON o ausente | Habilitado |
| Conjunto de ruta de escena individual | Utiliza la escena individual |
| Camino individual vacío | Hereda la escena global |
| El camino global también está vacío | Utiliza la escena predeterminada de la categoría de batalla |

Las excepciones salvajes usan ID de **especies**, como `cobblemon:pikachu`, en lugar de entidades del mundo individuales. RCT Excepciones Uso **UUID de entidad mundial**. PvP proporciona solo un cambio global y una ruta de escena, sin excepciones por jugador.

![Pokémon, Entrenadores y enlace de presentación PvP con valores predeterminados de categoría.](assets/media/guides/cobble-029-neo1211/cobble-encounters.png "0.2.9 / NeoForge 1.21.1. El top OFF de una categoría lo desactiva por completo. Elija su archivo compartido en Categoría presentación global y, a continuación, seleccione una entrada para una anulación individual.")

## PvP y saltar

PvP para dos jugadores con un jugador en cada lado admite formatos individuales y dobles. Dos contra dos batallas múltiples están fuera de este flujo de trabajo de presentación. Cada participante se ve a sí mismo como jugador y a su rival como oponente.

Para una escena saltable, un salto participante no acorta el temporizador del otro. Ambos saltos pueden comenzar la batalla temprano. El servidor posee el tiempo, bloquea las solicitudes de participantes superpuestas y permite que las batallas independientes continúen simultáneamente.

## Almacenamiento y solución de problemas

```text
config/dochi_rpg_maker/cobblemon/encounter_presentations/settings.json
config/dochi_rpg_maker/cobblemon/battle_presentations/
```

El primer archivo almacena encuadernaciones; la carpeta almacena escenas. Transfiera escenas referenciadas con sus enlaces y seleccione rutas de servidor, no archivos locales de cliente.

Si falta la reproducción, compruebe la categoría de batalla real → individual OFF rule → JSON path →. Las imágenes y los sonidos personalizados también deben existir en los paquetes de recursos del cliente. Las compilaciones actuales corrigen las solicitudes repetidas de la lista de carga que agotaron el presupuesto de lectura compartido. Para errores repetidos `rate limited` en compilaciones anteriores, alinee el servidor y los clientes con la compilación actual para su cargador.
