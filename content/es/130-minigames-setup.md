---
title: Colocar una mesa y jugar
slug: minigames-setup
order: 1300
description: Abre un minijuego y elige sus reglas, cuota de inscripción y recompensas.
product: dochi-minigames
category: Inicio
section: setup
status: Guía de uso
version: 0.1.6
audience: Creadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

## Jugar una ronda primero

Colocar un [mesa de minijuego](#dochi-minigames/minigames-tables) y elige un juego. DRM no es necesario.

Los creadores pueden abrir `/minigame editor`, cargar un preset y **Apply to table**. Los jugadores hacen clic derecho en la tabla para unirse.

### Prueba una ronda del editor

Estas pantallas inglesas son de **Minigames 0.1.5 / NeoForge 1.21.1**. Elija un ejemplo en **Presets** y, a continuación, inspeccione el editor.

![Editor de minijuegos con tipos de juego a la izquierda, una vista previa de Monty Hall en el medio y ajustes de título, tiempo y tarifa a la derecha.](assets/media/guides/minigames-015-neo1211/minigames-editor.png "Elige un juego a la izquierda y configura su Inspector a la derecha. El medio es una vista previa de diseño; el juego de prueba abre la pantalla jugable.")

1. Seleccione **Monty Hall** a la izquierda.
2. Define su título y **Time (s)** debajo de **General**. **Entry fee → 0** es libre.
3. Elija las reglas de la puerta en **Rules**, los elementos en **Symbols** y los premios en **Rewards**.
4. Pulse **Test play** en la parte superior. Elija una puerta cerrada; una vez que se revelan las puertas perdidas, elija si desea mantener su puerta original o cambiar.

![La pantalla de juego de prueba jugable de Monty Hall, que muestra tres puertas cerradas, puntuación y tiempo restante.](assets/media/guides/minigames-015-neo1211/minigames-test-play.png "El juego de prueba no utiliza ninguna tarifa de entrada o recompensas. Después de comprobar el juego, probar la confirmación de entrada y la liquidación en la mesa real por separado.")

## Juegos disponibles

Elige Monty Hall, tragamonedas, memoria, whack, cronometraje, tiro o el juego de cartas **MWENT**. Usa [ reglas de juego](#dochi-minigames/minigames-rules-rewards) para establecer el juego y las recompensas. MWENT tiene su propia [guía de inicio](#mwent/start).

**0.1.6 añade [Item Roulette](#dochi-minigames/minigames-roulette)** junto con los juegos existentes, con sus propios premios y cuotas.

## Hazlo tu juego

1. Cargar un preset en el editor.
2. Cambie su título, límite de tiempo y reglas.
3. Elige una tarifa de entrada y recompensas. Una cuota de 0 es gratis.
4. Utilice **Save As** para mantener su juego.
5. Aplíquelo a la mesa que lo usará.

El pago ocurre cuando el jugador presiona **Start** en la pantalla de entrada. Cancelar esa pantalla es gratis; cerrar un juego de puntuación ya iniciado cuenta como perder. Girar por defecto en el bloque de la ruleta comienza y se carga en la máquina haga clic sin una ventana de entrada, y conserva su sorteo y premio; siga la guía de [roulette](#dochi-minigames/minigames-roulette).

## Abrirlo desde un NPC o diálogo

Con DRM, use **NPC Apply → Minigames** para dar un juego a un NPC.

Para el acceso solo de diálogo, use una acción de opción **Go Minigames** en lugar de aplicar el juego directamente. Un juego aplicado directamente se abre antes del diálogo.

## Elegir archivos de instalación

| Minecraft | Cargador | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

Esta guía sigue 0.1.6. Las capturas de pantalla anteriores 0.1.5 conservan sus subtítulos de versión. Coincidir versiones/cargadores en servidor y clientes; Fabric también necesita Fabric API. DRM dinero o Cobblemon recompensas necesitan sus respectivos mods.
