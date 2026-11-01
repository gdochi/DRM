---
title: Selección de texto y pulso
slug: dialogue-choice-style
order: 63
description: Dimensión opciones de diálogo y resaltar una respuesta cuando aparece.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Estable
version: 0.3.1
audience: Creadores de diálogo
tags:
  - dialogue
  - choice
translationSource: en
translationMethod: assisted
---

## Cambiar el tamaño del texto

Abra la sección **Choices** de un nodo de diálogo. **Choice text px (0 = GUI)** establece el tamaño de texto de elección para ese nodo. Un valor de **0** utiliza la configuración de la GUI vinculada; un valor positivo lo anula.

Para una apariencia compartida, abra el diseño de diálogo en **GUI Maker**, seleccione su componente **Choice** y ajuste **Text size (px)**. Los tamaños de texto disponibles son 6–32 píxeles GUI. Estas son Minecraft unidades GUI, por lo que el tamaño en pantalla también depende de la escala de la GUI.

![Opciones con tamaño de texto 0 y resaltado de pulso OFF para la fila seleccionada.](assets/media/guides/drm-031-forge1201/dialogue-choices.png "DRM 0.3.1 / Forge 1.20.1. El tamaño del texto 0 sigue a la GUI. El resaltado de pulso se aplica a la opción seleccionada a la izquierda.")


## Haga que las respuestas largas encajen

Utilice el ancho de botón automático cuando las respuestas tengan diferentes longitudes. DRM mide el texto mostrado, incluidas las traducciones de paquetes de recursos, y usa el ancho disponible antes de envolverlo. Una respuesta larga puede crecer hasta el ancho interior del área de elección; las respuestas cortas mantienen un ancho compacto.

Si el texto aún necesita más de una línea, el botón crece verticalmente. Se puede desplazar una lista de opciones abarrotada. Para los botones compactos, utilice una altura mínima automática de **0**. El valor predeterminado agrega aproximadamente **5 píxeles GUI por encima y por debajo del texto**. Todavía se aplica una altura mínima más grande que usted mismo.

Para usar traducciones de paquetes de recursos, marque la etiqueta como una clave de traducción y proporcione esa clave en el archivo de idioma. Las palabras traducidas son lo que cuenta al calcular el tamaño del botón.

## Resaltar una elección con un pulso

1. Abra **Dialogue Editor → Choices** y seleccione una respuesta.
2. Gire **Pulse highlight**.
3. Establezca los siguientes controles.

| Control | Significado |
| --- | --- |
| garrapatas totales | Tiempo total para todos los pulsos. 20 garrapatas un segundo. |
| Recuento de pulsos | Número de ciclos de brillo y desvanecimiento dentro de ese tiempo. |
| Color (RGB) | Elija un color utilizando el campo de color, la muestra o la paleta de colores. |
| Intensidad | fuerza de 0 a 100. Utilice las flechas o introduzca un número en el campo del medio. 0 hace invisible el efecto. |

Por ejemplo, **60 pulsa / 3 pulsa** reproduce tres pulsaciones durante tres segundos. La intensidad cambia lo fuerte que se ve el resaltado; no cambia el color o el tamaño del texto elegido.

El efecto comienza cuando esa elección se hace visible por primera vez. Una opción que espera el efecto de escritura de diálogo, o que espera debajo del área de desplazamiento, no usa su pulso temprano. Desplazarse y retroceder no reinicia un efecto terminado. Abrir la escena de diálogo de nuevo le da una nueva reproducción.

## Archivos de diálogo existentes

Los viejos diálogos continúan sin pulso. Habilitelo solo en las opciones que desea enfatizar. Apagarlo mantiene su configuración para su uso posterior. Guarde el diálogo después de editar.
