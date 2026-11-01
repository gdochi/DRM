---
title: Cambiar el aspecto del botón
slug: gui-maker-button-config
order: 103
description: Elija Minecraft representación de botón o el DRM estilo personalizado para una pantalla.
product: core
category: GUI Maker
section: gui-maker
status: Guía
version: 0.3.1
audience: Creadores de GUI
translationSource: en
translationMethod: assisted
---

## Usar botones de opción Minecraft-style

1. Abra el diseño de diálogo en [GUI Maker](#core/gui-system).
2. Elija **Button Config** en la parte superior.
3. Encienda el interruptor para **Choice / choice_box** para usar el renderizado de vainilla. **Custom** utiliza el estilo personalizado de DRM.
4. Regresa con **Done** e inspecciona **Preview**.
5. **Save As** su diseño y selecciónelo en la configuración de GUI Dialogue Editor.

![Opción / choice_box establecida en Configuración de botón personalizada.](assets/media/guides/drm-031-forge1201/gui-button-config.png "DRM 0.3.1 / Forge 1.20.1. La lista contiene tipos de botones soportados por el diseño actual. Cada interruptor cambia la representación de ese tipo.")

![Opción / choice_box cambió a Vanilla.](assets/media/guides/drm-031-forge1201/gui-vanilla-buttons.png "Vuelve con Listo y comprueba el tamaño de la opción y las respuestas largas en Vista previa. Este es el estado real del editor cambiado.")

Button Config cambia de aspecto. Define si una respuesta abre una tienda u otra escena debajo de **Dialogue Editor → Choice actions**.

| Cambiar | Donde |
| --- | --- |
| Texto de respuesta | Dialogue Editor → Opciones → Etiqueta |
| Posición y tamaño del área de elección | GUI Maker canvas |
| Tamaño del texto, respuestas largas y pulsos | [Estilo de elección](#core/dialogue-choice-style) |
| Representación de vainilla/botón personalizado | Configuración de botón |

Abrir un diseño de tienda muestra sus propios tipos de botones compatibles. Cambiar un diseño de diálogo no cambia los botones de cada pantalla.
