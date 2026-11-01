---
title: Reglas del juego y recompensas
slug: minigames-rules-rewards
order: 1310
description: Configuración del juego, confirmación de entrada, umbrales de puntuación y recompensas de ítem o Pokémon.
product: dochi-minigames
category: Autoría
section: rules
status: Guía de uso
version: 0.1.6
audience: Creadores de juegos
translationSource: en
translationMethod: assisted
---

## Reglas por juego

| Juego | Flujo del jugador | Controles de autoría |
| --- | --- | --- |
| Monty Hall | Elegir una puerta → puertas perdidas reveladas → estancia o cambiar | Usa 3– 8 puertas y prepara símbolos y recompensas ganadoras. |
| Ranuras | Confirmación de entrada → palanca → parada de tres carretes | Establezca la parada automática/manual, los símbolos, el intervalo de giro y los tiempos de parada. |
| Memoria | Revelación inicial → seleccionar dos cartas → coincidir con cada par | Utilice 2–10 filas/columnas y un número par de cartas, con un símbolo distinto para cada par. |

El límite de tiempo es 5– 3600 segundos. Uso de preajustes fáciles, normales y duros de la memoria 2×2, 6×6 y 10×10 Juntas. Un tablero 10×10 necesita 50 símbolos distintos. Utilice **Find** junto a un identificador de símbolo para navegar por el catálogo de artículos de DRM.

Los tiempos de parada automática de la ranura deben aumentar desde el primer carrete hasta el tercero, con la última parada dentro del límite de tiempo. A velocidad de juego normal, 20 marca igual a un segundo.

### Tiempos de parada de ranura

Abrir **Slots → Rules**. Este es el editor **Minigames 0.1.5 / NeoForge 1.21.1**. Con **Auto stop** activado, **Reel 1 tick / Reel 2 tick / Reel 3 tick** controla cuando cada carrete se detiene. La imagen `20 / 40 / 60` significa uno, dos y tres segundos a velocidad normal. **Spin interval** es el retardo entre los cambios de símbolo mientras gira.

![Ranuras Reglas con parada automática habilitada y carrete tiempos de parada de 20, 40 y 60 ticks.](assets/media/guides/minigames-015-neo1211/minigames-slots.png "Aumenta los tiempos de parada desde el primer carrete hasta el tercero. La imagen de la ranura en el medio es una vista previa de diseño.")

### Tamaño de la tarjeta de memoria

En **Memory → Rules**, **Rows / Columns** establece el tamaño del tablero. La tabla `4 × 4` representada necesita dieciséis cartas y ocho símbolos distintos. **Reveal ticks** establece la revelación inicial; **Mismatch ticks** establece cuánto tiempo permanece visible un par incorrecto antes de volver a ocultarse.

![Reglas de memoria con un tablero de cuatro por cuatro, ticks Revelar y ticks Desajuste, con ocho pares visibles en la vista previa del diseño.](assets/media/guides/minigames-015-neo1211/minigames-memory.png "Compruebe Símbolos después de ampliar el tablero. El tamaño de la tarjeta se ajusta a través de la configuración del tablero en Abrir GUI Maker debajo de Reglas.")

## Ruleta utiliza una lista de premios por separado

[Item Roulette](#dochi-minigames/minigames-roulette) elige un premio usando artículos, cantidades y pesos de las tragamonedas Prize. Los umbrales de puntuación y las reglas de pérdida a continuación describen los juegos de puntuación existentes. La ruleta retiene un sorteo pagado ya iniciado después del cierre; Jugar nuevamente comienza otro sorteo inmediatamente.

## Cuota de entrada

Establezca el proveedor, ID y cantidad en General.

| Proveedor | Configuración |
| --- | --- |
| `item` | Id. de artículo a consumir |
| `drm` | Identificación de moneda registrada en DRM Currency Editor |
| `cobbledollars` | Configuración mediante el proveedor CobbleDollars instalado |

Una cantidad de `0` es gratis. Al hacer clic en un NPC o Replay no se cobra una tarifa: el jugador debe confirmar Inicio. La cancelación es gratuita; el saldo insuficiente impide comenzar. La confirmación expira después de 60 segundos. Cerrando un juego pagado, comenzó a abandonarlo.

## Umbrales y política de recompensas

Establezca la puntuación y cantidad requeridas de cada recompensa, luego elija cómo se seleccionan las recompensas elegibles.

| Política | Resultado |
| --- | --- |
| `highest` | Todas las recompensas en el umbral más alto alcanzado |
| `cumulative` | Todas las recompensas en cada umbral alcanzado |
| `random` | Una entrada de recompensa elegible seleccionada al azar |

Las recompensas de elemento conceden el elemento configurado. Las recompensas de símbolos usan el símbolo de resultado seleccionado del juego, como el símbolo de ranura correspondiente. Con Cobblemon instalado, **Pokémon Settings** proporciona especies, nivel, brillo, género, forma, naturaleza, habilidad, bola, elemento retenido y propiedades adicionales. Los niveles son 1–100; un equipo completo envía el Pokémon al PC.

Los elementos, símbolos y recompensas Pokémon mencionados se comprueban antes del pago. El servidor posee puntajes, respuestas ocultas, pagos y subvenciones. Cada sesión se establece una vez. Se eliminan las recompensas de elementos que no encajan en el inventario; inspeccione las notificaciones y los registros del servidor en busca de errores de concesión. Las subvenciones fallidas no se vuelven a intentar automáticamente.

Después de guardar, verifique tanto el juego de prueba del editor libre como el flujo de confirmación de entrada real. [La NPC y los enlaces de diálogo](#dochi-minigames/minigames-setup) están cubiertos en la página de inicio.

## Juegos adicionales

| Juego | Juego y autoría |
| --- | --- |
| Whack-a-criatura | Golpee objetivos emergentes, evite trampas; configure modelos y tiempos. |
| Momento | Deténgase dentro de la zona de éxito; configure las rondas, la velocidad y la reducción de las ventanas. |
| Alto-bajo | Predecir la siguiente tarjeta o cobrar una racha. Los empates vuelven a intentarlo; las conjeturas / tiempos de espera incorrectos pierden la puntuación acumulada. |
| Galería de Tiro | Apunta a objetivos de diferente tamaño y evita trampas explosivas; configura modelos de armas, munición, recarga, intervalo de disparo y puntuaciones. |
| MWENT | Facciones, líderes, barajas y estrategia redonda; véase [MWENT ](#mwent/start). |

Sin DRM, use la entrada gratuita o el artículo y las recompensas del artículo. DRM las monedas / condiciones y otras recompensas integradas requieren sus proveedores.
