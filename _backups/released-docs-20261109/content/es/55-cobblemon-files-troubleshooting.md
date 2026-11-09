---
title: Rutas de archivo y solución de problemas
slug: cobblemon-files-troubleshooting
order: 550
description: Encuentre archivos JSON adicionales, proteja los valores predeterminados, comprenda la prioridad de interacción de NPC y ejecute comprobaciones de versión.
product: drm-cobblemon-editor
category: Operaciones
section: operations
status: Proyecto
version: Fabric / NeoForge 0.2.9
audience: Operadores de servidores y editores de contenido
tags:
  - paths
  - troubleshooting
  - release
translationSource: en
translationMethod: assisted
---


## Compruebe primero el archivo guardado y la vinculación NPC

**Save As almacena un archivo de servidor; NPC Apply adjunta un rol a un NPC mundial.** Si el archivo existe pero el NPC no cambia, comprueba su rol seleccionado y la ruta de origen. Aplicar Entrenadores a través de [NPC Apply vs Entrenador](#drm-cobblemon-editor/cobblemon-trainer-editor); roles como Selector de inicio proporcionan su propio botón Aplicar a NPC.

![Selector de inicio guardado como custom/village_starters.json.](assets/media/guides/cobble-029-neo1211/cobble-starter-save.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. El archivo actual a la izquierda y guardado a continuación confirma el archivo guardado. Esto pertenece a starter_selectors, un dominio diferente de los archivos de Trainer.")

## Guardar-mapa de ruta

Todos los JSON editados por servidor comienzan en `config/dochi_rpg_maker`.

| Ruta | Contenido |
| --- | --- |
| `cobblemon/trainers/` | Entrena equipos, rondas, encuentros, condiciones y recompensas |
| `cobblemon/pokemon_itself/` | Batallas individualesPokémon y aparición en NPC |
| `cobblemon/battle_presentations/` | Presentaciones de línea de tiempo antes de la batalla |
| `cobblemon/pokemarts/` | Documentos de ventas, comercio y subastas |
| `cobblemon/nurse_joy/` | Documentos de Enfermera Joy |
| `cobblemon/starter_selectors/` | Documentos del selector inicial |
| `cobblemon/entity_clones/` | Complemento Clone Library tienda de compatibilidad |
| `npc_spawner/entity_clones/` | DRM Core NPC Spawner tienda de clones |
| `gui/` | PokéMart y Starter Selector en el juego |
| `cobblemon/_migration_backups/` | Copias de seguridad realizadas cuando los valores predeterminados canónicos se actualizan de forma segura |

`Save As` acepta una ruta relativa dentro del dominio actual. Guardar la ruta del entrenador `custom/gym/leader.json` crea:

```text
config/dochi_rpg_maker/cobblemon/trainers/custom/gym/leader.json
```

## Predeterminados y muestras

El primer lanzamiento instala muestras de entrenador y encuentro, equipos campeones, muestras de Pokemon Itself, preajustes y muestras de presentación de batalla, muestras de roles de PokéMart y GUI de tiempo de ejecución específicos de rol.

Los archivos que faltan se instalan sin sobrescribir el contenido del usuario. Un valor predeterminado canónico conocido se actualiza solo cuando su hash actual coincide exactamente con una versión anterior intacta reconocida. Antes del reemplazo, el addon crea:

```text
config/dochi_rpg_maker/cobblemon/_migration_backups/canonical_defaults_<timestamp>/
```

:::warning Mantener el contenido del usuario separado
Los valores predeterminados y las muestras son puntos de partida. Guarde el contenido del proyecto bajo una ruta de usuario como `custom/` para que las actualizaciones del complemento y el contenido de autor permanezcan claramente separados.
:::

## Prioridad de clic derecho NPC

La interacción normal en tiempo de ejecución utiliza un clic derecho de la mano principal mientras ambas manos están vacías.

| Prioridad | Rol adjunto | Resultado |
| --- | --- | --- |
| 1 | DRM Diálogo o DRM NPC Shop | El DRM diálogo o tienda posee la interacción |
| 2 | PokéMart | Abre la pantalla de PokéMart en el juego |
| 3 | Entrenador o Pokémon en sí | Abre la confirmación de batalla |
| 4 | Sin función de complemento | Pasa a otro mod o interacción normal CustomNPCs |

Un elemento central u otra herramienta de configuración mantiene su propia ruta de edición, por lo que no abre el indicador de batalla. Vacíe la mano principal y la mano derecha durante las pruebas de tiempo de ejecución.

## Problemas comunes

### El archivo guardado, pero el NPC no cambió

Entrenador basado en archivos, Pokémon mismo, PokéMart, Nurse Joy y Starter Selector siguen su ruta JSON original. Confirme que el NPC está vinculado al archivo que ha editado y, a continuación, abra una nueva solicitud de tiempo de ejecución. Usa `/drm reload` después de editar archivos fuera del juego. Aplicar de nuevo al cambiar la ruta de origen o el rol.

### El archivo no se encuentra en Load

- Haga coincidir el dominio del editor actual con la carpeta real.
- Los entrenadores pertenecen en `trainers/`; los documentos de Pokemon Itself pertenecen en `pokemon_itself/`.
- Confirme que el archivo tiene una extensión `.json`.
- Si los archivos se editaron fuera del juego, utilice el flujo de trabajo de recarga de DRM o reinicie el servidor de forma segura.

### La interacción mano-vacío no abre una batalla

- Vacía ambas manos.
- Confirme que los datos de Entrenador o Pokemon se aplican al NPC.
- Compruebe si DRM Dialogue, DRM NPC Shop o PokéMart es el propietario de la interacción primero.
- Confirme que el jugador no está ya en una batalla Cobblemon.
- Confirme que la batalla de otro jugador no ha reservado el NPC.

### Visión o radio no se activa

- Los jugadores creativos y espectadores están excluidos de la detección automática.
- Confirme que el disparador no es todavía `Interaction`.
- Compruebe la distancia de visión, el ángulo de visión, el radio y la línea de visión.
- Revisa las condiciones de la ronda, los límites de revancha y el tiempo de reutilización.
- Consulta la distancia y duración de Chase Max.
- Max Distance compara las posiciones actuales de los NPC y del jugador objetivo cada vez que el servidor marca; el punto de inicio capturado solo se usa en Return Home y Battle Positioning.

### Una presentación de batalla no se carga

- Usa una ruta relativa a `battle_presentations/`.
- Mantenga los ID de capa únicos.
- Utilice identificadores de recursos Minecraft válidos para texturas y sonidos.
- Mantenga la marca de inicio en o debajo de la marca final y ambas dentro de Duración.

### El pago de PokéMart falla

- Haga coincidir el proveedor de divisas con el mod instalado o la moneda DRM.
- Instalar CobbleDollars antes de usar `cobbledollars`.
- Para la moneda del artículo, haga coincidir el ID del artículo y la NBT opcional exactamente.
- Compruebe si las condiciones de interacción bloquean el acceso.

## Lista de verificación previa a la publicación

1. Inicie un servidor y una instancia de cliente limpia sin errores de dependencia.
2. Confirme los valores predeterminados y las muestras se instalan en una nueva configuración.
3. Guarda, aplica, ingresa y termina una batalla de Entrenador y una batalla de Pokémon.
4. Prueba la interacción, la visión y el radio con un jugador en modo Supervivencia.
5. Después de ganar, perder y huir, verifica correctamente la apariencia, posición, sonido y estado del jugador Pokémon.
6. Prueba la reproducción de presentaciones, saltos, música de batalla, escala GUI pequeña y diferentes relaciones de aspecto.
7. Pruebe Ventas, Comercio y Subasta antes y después de reiniciar un servidor.
8. Incluya el usuario JSON y `_migration_backups` en la política de copia de seguridad del servidor.
9. Confirme que la versión JAR es `dochi_cobblemon_editor-0.2.6-fabric-1.21.1.jar` o `dochi_cobblemon_editor-0.2.6-neoforge-1.21.1.jar` para el cargador seleccionado; el ID de mod interno permanece `cobble_npc`.

## Copias de seguridad de identidad y misiones de entrenador

`cobblemon/trainer_registry.json` y `cobblemon/trainer_registry.initialized` preservar la identidad del entrenador. Hazles una copia de seguridad con los perfiles de entrenador, los paquetes de misiones y el progreso del jugador mundial. Los nombres de archivo coincidentes o los nombres de pantalla NPC por sí solos no identifican al mismo entrenador.

El códec actual de Entrenador/Pokémon usa esquema 23. Los documentos antiguos se cargan a través de la conversión de compatibilidad; los documentos sin identidad comienzan sin vincular. Vincule la identidad en el editor en lugar de cambiar manualmente solo el número de esquema.

## Comprobación de los datos de inventario copiados

Después de copiar desde `My Inventory`, guarde y vuelva a cargar el entrenador y compruebe el nombre del elemento y los datos personalizados. Si una edición de cantidad parece perder esos detalles, compruebe si creó una entrada de ID de elemento simple en su lugar y, a continuación, vuelva a seleccionar la pila original. Una copia rechazada por datos no válidos o de gran tamaño no se agrega al documento.
