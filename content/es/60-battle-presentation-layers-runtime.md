---
title: Texto, imágenes, modelos y tiempo
slug: battle-presentation-layers-runtime
order: 531
description: Coloque texto y modelos, agregue movimiento e imágenes y sonido de tiempo.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Proyecto
version: Fabric / NeoForge 0.2.9
audience: Creadores arreglando entradas de batalla
tags:
  - layers
  - timeline
  - actors
  - audio
translationSource: en
translationMethod: assisted
---


## Mover una capa de texto

En Battle Presentation Maker seguir **Element → Add Label → Content**. La etiqueta establece el texto, el tamaño de la fuente establece su tamaño y el color su color. El diseño controla la posición y las dimensiones de la caja; la animación controla por separado el tiempo y el movimiento.

![Propiedades de contenido después de agregar una etiqueta.](assets/media/guides/cobble-029-neo1211/cobble-layer-content.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. {opponent_nameEn la etiqueta se resuelve el nombre del oponente. El cursor está en el tick cero, el comienzo de Fade In, por lo que el texto del lienzo aún no es visible. Utilice Play para inspeccionar su intervalo activo.")

![Propiedades de animación para esa etiqueta.](assets/media/guides/cobble-029-neo1211/cobble-layer-animation.png "Start/End Tick es el intervalo visible; Start/Final X son las posiciones de salida y llegada. Este ejemplo ejecuta 0–144 garrapatas, mueve X 280→360 mientras mantiene Y 220, y crece de 0.8 a 1. Compruebe que el mismo elemento está seleccionado en la línea de tiempo.")

## Tipos de elementos

| Tipo | Representación | Campos importantes |
| --- | --- | --- |
| `Label` | Centra el texto dentro de su caja y recorta el texto que excede el ancho de la caja | Texto, tamaño de fuente, color, estilos de texto parcial |
| `Texture` | Dibuja una imagen de recurso Minecraft; una textura no resuelta puede volver a caer en un cuadro de color | Imagen, Opacidad, Ajuste, Cultivo |
| `Color` | Dibuja un rectángulo ARGB | Color, dimensiones de la caja, Alfa |

Utilice `{player_name}` para mostrar el nombre del jugador y `{opponent_name}` para mostrar el nombre del oponente.

La imagen debe ser un ID de recurso como `namespace:textures/gui/file.png`, no una ruta de archivo absoluta. `Stretch` distorsiona la caja completa, mientras que `Contain` conserva la relación de aspecto y centra la imagen completa. Recortar selecciona el rectángulo de origen antes de ajustar.

## Posición y arrastre de Canvas

La disposición X/Y se sincroniza con la posición de movimiento final. Arrastrar un elemento en Canvas mueve tanto Start X/Y como Final X/Y en el mismo delta, preservando su distancia de viaje existente.

Para un deslizamiento:

1. Coloca la posición final en Canvas.
2. Mueva solo Start X o Start Y fuera del escenario.
3. Establezca la escala inicial/final y la rotación.
4. Juega todo el rango activo para juzgar la relajación.

El ancho y la altura definen la caja de diseño. El tamaño de fuente está separado, por lo que cambiar el tamaño de un cuadro de etiqueta no cambia automáticamente el tamaño de su texto.

## Cálculo de la línea de tiempo

| Campo | Cálculo del tiempo de ejecución |
| --- | --- |
| Inicio / Fin de la garrapata | Fuera del rango, el elemento no se representa. El final se normaliza a al menos una marca después del inicio. |
| Desde / a | Posición, escala, rotación y alfa interpolan sobre el progreso activo. |
| Desvanecerse | Multiplica el alfa calculado de 0 a 1 después del inicio. |
| Desvanecerse | Multiplica Alfa de 1 a 0 antes de Fin. |
| Facilidad | Cambios Desde/Para progresar; el Alfa final también recibe multiplicadores de desvanecimiento. |

| Facilidad | Resultado |
| --- | --- |
| `Linear` | Velocidad constante |
| `Ease In` | Acelera desde un comienzo lento |
| `Ease Out` | Decelera hacia el objetivo |
| `Ease In Out` | Suave inicio y final |
| `Back Out` | Excede, luego regresa |
| `Step` | Sostiene Desde hasta el final, luego cambia a |

Arrastrar la regla de línea de tiempo pausa la reproducción. Se reanuda en la versión solo cuando la reproducción se estaba ejecutando antes del arrastre. Para volver a probar Intro Audio, frote antes de comenzar a marcar y reproducir.

## Z Orden con los actores

El jugador y el oponente tienen cada uno un valor Z. El tiempo de ejecución recorre los elementos normales por Z e inserta un actor cuando el actor Z es menor o igual que el siguiente elemento Z.

Una pila útil es el fondo en 1, los paneles en 5–12, el oponente / jugador en 23–24, las etiquetas de nombres en 30–31, VS en 40 y un flash final en 100. Si el texto aparece detrás de un modelo, inspeccione Z antes de mover las coordenadas.

## Modelos de actores

| Configuración | Comportamiento |
| --- | --- |
| Visible | Desactiva el renderizado del actor cuando está apagado |
| `Humanoid` | Utiliza renderizado Steve/Alex más rotaciones de posturas de cabeza, cuerpo, brazo y pierna |
| `Pokemon` | Utiliza rotación de modelo completo; no se aplica la postura de la extremidad |
| `Auto` | Compatibilidad heredada; use un tipo explícito para el nuevo trabajo |
| X/Y | Posición de la etapa en la base del modelo |
| Escala y guiñada/pitch/roll | Tamaño y rotación de todo el modelo |
| Z | Orden relativo a los elementos normales |

El jugador muestra al jugador con su bola de plomo Pokémon. El oponente muestra el NPC objetivo. Ambos se pueden colocar y superponer con la escena.

Cuando el editor no tiene NPC objetivo, puede mostrar un Bulbasaur de muestra. Esa muestra no prueba que el tipo de modelo elegido coincida con el NPC final.

## Fondo y audio

World Background cubre la ventana completa detrás del escenario y tiene su propio color, opacidad y desvanecimientos. Un elemento Color es una capa Stage con un comportamiento Z y de línea de tiempo normal. Stage Image es una imagen fija única detrás de los elementos Stage con opacidad, ajuste y recorte.

| Audio | Comportamiento en tiempo de ejecución |
| --- | --- |
| Introducción | Se inicia una vez cuando la reproducción cruza Start Tick. Omitir, perder el objetivo o la interrupción lo detiene. La terminación normal puede permitir que una cola larga continúe a través de la transición. |
| Batalla | No juega en la línea de tiempo de presentación. Se pasa al control de batalla después de la finalización de la presentación. |

Inspector Play/Stop muestra solo el sonido seleccionado y no mueve la línea de tiempo. Cada cliente debe tener el recurso de sonido referenciado Minecraft.

## Omitir y cancelar

Cuando Skippable está habilitado, `Esc` o `Space` envía un resultado omitido. El salto debe estar habilitado en la escena guardada.

Los jugadores muertos o desaparecidos, los objetivos eliminados o no válidos, una pantalla de cliente interrumpida, una nueva comprobación de condición fallida y los equipos de batalla no válidos pueden cancelar el inicio de forma segura. Pruebe el primer fotograma, el disparador de audio, el medio, el flash final, el salto, la batalla real y la restauración posterior a la batalla como un flujo completo.

## Etapas de bloque, FX y programación

Véase [ block stages y FX](#drm-cobblemon-editor/cobblemon-presentation-region-fx) para autoría de Región/FX en 0.2.4, y [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler) para ejecución de clonación, escena y batalla.
