---
title: GUI, archivos y solución de problemas
slug: minigames-files-gui
order: 1320
description: Separe los archivos de reglas de los diseños del juego, edítelos con GUI Maker y diagnostique problemas comunes.
product: dochi-minigames
category: Archivos y operaciones
section: operations
status: Guía de uso
version: 0.1.6
audience: Creadores / operadores
translationSource: en
translationMethod: assisted
---

## Almacenamiento

| Datos | Ruta |
| --- | --- |
| Reglas de juego | `config/dochi_rpg_maker/minigames/games/<id>.json` |
| Interfaz gráfica de usuario en tiempo de ejecución predeterminada | `config/dochi_rpg_maker/gui/minigames/minigames_gui.json` |
| Altas puntuaciones | `<world>/data/dochi_minigames_scores.json` |

JSON almacena tarifas, límites de tiempo, símbolos y recompensas. GUI JSON almacena el tablero del jugador y el diseño del panel de puntuación. Los enlaces de NPC persisten en los datos de NPC; los NPC que usan el mismo ID de juego comparten la configuración de ese juego.

El valor predeterminado de la ruleta **Spin on block** comienza en la máquina sin un archivo de diseño de GUI. Los archivos GUI organizan los juegos basados en pantalla existentes y la ruleta configurada para **Game screen**.

## Editar la pantalla en GUI Maker

Utilice **Open GUI Maker** para abrir el diseño vinculado del juego. Edite la posición y el tamaño del tablero y del panel de puntuación y, a continuación, guarde. Para personalizar un valor predeterminado por separado, cree una copia con `Save As` y selecciónela en **General → GUI JSON**.

![La página General del editor del minijuego con GUI JSON, su buscador y Abierto GUI Maker a continuación.](assets/media/guides/minigames-015-neo1211/minigames-editor.png "Minijuegos 0.1.5 / NeoForge 1.21.1. Establece el título, el tiempo y las recompensas en el editor del juego; usa Abrir GUI Maker para la posición y apariencia del tablero.")

**Game Board → Memory Card Size** acepta 16 – 96px, por defecto a 40px. Las tarjetas grandes encogen las tarjetas para que encajen, y la detección de clic sigue el tamaño mostrado. `previewGame` solo cambia la pantalla de muestra de GUI Maker, no las reglas de juego reales.

Un valor numérico incompleto bloquea los cambios de pestaña y el ahorro hasta que se corrige. La navegación compartida hacia atrás/hacia adelante y el cambio de tamaño de la ventana preservan el borrador, pero no lo guarde en el servidor.

## Solución de problemas

| Síntoma | Comprobar |
| --- | --- |
| Juego que falta en Load | Carpeta de juego del servidor, esquema, tipo de juego admitido y errores de validación |
| NPC abre el juego de inmediato | Aplicar cuando la entrada debe ocurrir solo a través del diálogo |
| Inicio falla después de la confirmación | Balance, elementos referenciados, integraciones opcionales y mensaje de servidor |
| La configuración de la memoria no se puede guardar | Incluso el conteo de cartas y suficientes símbolos de pares distintos |
| Los cambios de GUI no tienen efecto | Editar y guardar la interfaz gráfica de usuario realmente vinculada a ese juego |
| Combinación de recompensas inesperadas | Umbrales de puntuación y política `highest`, `cumulative` o `random` |

Retroceda `config/dochi_rpg_maker` y el mundo antes de actualizar. Utilice JARs de liberación ordinaria sin código de prueba de desarrollo.

## Referencia JSON

Para editores externos: el esquema de reglas es `dochi.minigames.v1`, con tipos `monty`, `slots`, `memory`, `whack`, `timing`, `highlow`, `shooting`, `mob_battle` y `roulette`. `guiLayout` es relativo a la carpeta `gui/` de DRM y por defecto a `minigames/minigames_gui.json`. Los archivos de reglas no almacenan respuestas ocultas ni sesiones en vivo.

## Archivos independientes y migración

Las rutas `config/dochi_rpg_maker/minigames/` y `gui/minigames/` permanecen en uso sin DRM. Las ubicaciones anteriores `dochi_minigames/games/` y `gui/dochi_minigames/` son entradas de migración; haga una copia de seguridad antes de actualizar. La configuración de la interfaz de usuario del cliente usa `config/dochi_minigames/client.json`; la finalización de la lección usa `<world>/data/dochi_minigames/tutorial/<UUID>.json`.
