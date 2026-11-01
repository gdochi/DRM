---
title: Hacer una ruleta de artículos
slug: minigames-roulette
order: 1315
description: Elige premios y cuotas, luego ejecuta un sorteo desde una pantalla de máquina o juego.
product: dochi-minigames
category: Creación de juegos
section: rules
status: Guía
version: 0.1.6
audience: Jugadores / creadores de juegos
translationSource: en
translationMethod: assisted
---

## Un giro, un premio

La Ruleta del artículo se añadió en **Minigames 0.1.6** y funciona sin DRM. Conecte un juego guardado a una máquina de ruleta y haga clic derecho para jugar.

**Current bundled presets default to Spin on block**: hacer clic con el botón derecho hace girar la máquina sin abrir una ventana. Para una pantalla de entrada que muestra primero los premios y las probabilidades, seleccione **Rules → Play mode → Game screen**, guarde y aplique. Marca el modo de reproducción en los perfiles guardados existentes.

![Una máquina de ruleta colocada en el mundo.](assets/media/guides/minigames-016-neo1211/roulette-native-world-stopped.png "Minijuegos 0.1.6 / NeoForge 1.21.1. La ruleta está en el centro; Whack-a-Mole y Ranuras utilizan máquinas separadas. Este original fue capturado durante la verificación del cliente nativo del proyecto.")

En el modo **Game screen**, compruebe los premios, las cantidades, las cuotas y la cuota de inscripción y, a continuación, pulse **Spin**. La flecha determina un premio. **Hide prizes & odds / Show prizes & odds** controla la lista de la derecha.

![Una pantalla de entrada a la ruleta pagada antes de Spin.](assets/media/guides/minigames-016-neo1211/roulette-native-entry.png "Minijuegos 0.1.6 / NeoForge 1.21.1. Este ejemplo de pago cobra una esmeralda y le da a cada una de las ocho ranuras 12.5%. El preajuste de ruleta incluido es gratuito, así que verifique su propia configuración.")

**Play again** inmediatamente comienza otro sorteo y cobra otra tarifa en un juego pagado. No es un botón de reproducción de resultados.

## Crea la máquina y conecta un juego

Crear una máquina de ruleta con ** lingote de oro / reloj / lingote de oro ** en la primera fila, ** palo / polvo de piedra roja / palo ** en el segundo, y ** tres tablones ** en el tercero. Los tipos de tablones se pueden mezclar.

1. Colóquelo con un bloque claro arriba.
2. Abra `/minigame editor` y elija **Item Roulette**.
3. Configurarlo a continuación, luego **Save As** su propio nombre, como `village_roulette`.
4. **Shift-right-click with empty hands**, elija el perfil y aplíquelo a la tabla. La configuración necesita el nivel de permiso del operador 2 o superior.
5. Haz clic con el botón derecho del ratón normalmente para jugar. Véase [table setup](#dochi-minigames/minigames-tables) para la tabla genérica de minijuegos.

## Cambiar premios y cuotas

Seleccione una fila en **Prize slots**. Utilice el buscador al lado de **Reward ID** para elegir un elemento, luego establezca **Count**. La selección de un elemento de inventario puede conservar su nombre personalizado y datos nativos sin consumirlo.

![Edición del artículo, cantidad y peso de un premio seleccionado.](assets/media/guides/minigames-016-neo1211/roulette-editor-prizes.png "Minijuegos 0.1.6 / NeoForge 1.21.1. La fila de diamantes azules está siendo editada. Las casillas de verificación marcan los premios para la eliminación por lotes por separado. La probabilidad a la derecha muestra la probabilidad resultante.")

Con **Rules → Weighted chances** apagado, todas las ranuras de premios son igualmente probables. Con él, cada premio utiliza su parte del total **Weight**. Dos pesos de 1 y 3 dan 25% y 75%. La cantidad no cambia la probabilidad. Los sectores de ruedas también siguen las probabilidades reales.

**Spin time (seconds)** varía de 3 a 8. Establezca el elemento de entrada y la cantidad bajo **General**; `0` es gratis. Ruleta actualmente cobra artículos físicos. Otorga una entrada de premio en lugar de usar la política de recompensa más alta o acumulativa del juego de puntuación.

![Modo de juego de ruleta, la duración y el interruptor de oportunidad ponderada.](assets/media/guides/minigames-016-final-neo1211/roulette-editor-rules.png "Los minijuegos actuales 0.1.6 / NeoForge 1.21.1 artefacto reemplazado en 15:40 KST en noviembre 1. Los valores predeterminados son Gire en bloque, cinco segundos y posibilidades ponderadas OFF, dando ocho premios 12.5% cada uno. La foto de la pantalla de entrada de arriba es un ejemplo de pantalla de juego separada.")

## Haga girar la máquina física sin una pantalla

Elija **Rules → Play mode → Spin on block**. Un clic derecho normal inicia la rueda física sin abrir la pantalla del juego y paga la tarifa si está configurada. Hacer clic en una máquina de hilar ocupada no se carga de nuevo.

**Game screen** abre la gran interfaz de usuario de la ruleta. Guarde el modo elegido, aplique el perfil a la máquina y compruebe el comportamiento real del clic derecho.

Spin on block puede comenzar sin un archivo de diseño de GUI. Las construcciones 26.3 también agregan partículas de premio y sonidos cuando la rueda se detiene; las imágenes 1.21.1 anteriores no establecen esos efectos.

## Cerrar la ventana o tener un inventario completo

Un sorteo de ruleta ya iniciado continúa después de cerrar la pantalla o alejarse. El servidor retiene el sorteo y el premio. Un inventario completo mantiene el premio pendiente y evita otro sorteo pagado. Haga espacio, confirme la recepción del premio guardado y luego vuelva a jugar.

Esto difiere de perder un juego de puntuación normal, como Monty Hall o Slots. Guardar un perfil y conectarlo a una máquina también son pasos separados; ver [archivos y GUI](#dochi-minigames/minigames-files-gui).
