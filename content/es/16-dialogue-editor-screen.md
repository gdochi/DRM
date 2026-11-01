---
title: Encuentra tu camino alrededor Dialogue Editor
slug: dialogue-editor-screen
order: 61
description: Encuentre texto de diálogo, opciones, conexiones y controles de guardado.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Guía
version: 0.3.1
audience: Creadores de diálogo
translationSource: en
translationMethod: assisted
---

## Editar la línea que un jugador leerá

Seleccione un nodo general a la izquierda y abra **Text** para escribir la línea del NPC. Abrir **Choices** para las respuestas de los jugadores. **Blueprint** muestra qué escena se abre cada respuesta. Siga [el primer ejercicio de diálogo ](#core/dialogue-system) para un ejemplo completo guardado y aplicado.

![Lista de nodos a la izquierda y texto NPC a la derecha.](assets/media/guides/drm-031-forge1201/dialogue-text.png "DRM 0.3.1 / Forge 1.20.1. El texto edita la línea NPC del nodo general seleccionado; las opciones editan las respuestas del reproductor.")

| Zona | Qué hacer allí |
| --- | --- |
| Lista de nodos | Seleccione o agregue escenas como `dialogue_1`; mantenga una entrada `start` |
| Información / Texto | Establecer identidad de nodo, tipo, GUI y texto NPC |
| Opciones | Escribe respuestas y elige lo que hace cada respuesta |
| Condiciones / acciones | Restringir la disponibilidad o establecer un resultado |
| Plano | Inspeccione las conexiones entre escenas |

## Controles de barra de herramientas

| Control | Resultado |
| --- | --- |
| Editores | Volver a la selección del editor |
| Create New | Iniciar un proyecto de diálogo |
| Cargar | Buscar conjuntos de diálogos guardados |
| Guardar | Guardar el conjunto actual en su ruta existente |
| Save As | Guardar todo el conjunto bajo otro nombre |
| Restablecer | Restaurar el estado predeterminado del borrador |
| Duplicar | Copiar todo el conjunto y su diseño de plano |
| Cerrar | Cierra el editor |

Utilice **Save As** cuando personalice un ejemplo incluido. Para reutilizar el diálogo en varios NPC, guarde un conjunto y selecciónelo en la lista de aplicación de cada NPC **Dialogue JSON**.

## Un conjunto de diálogos es una carpeta

Save As `blacksmith` crea un conjunto bajo:

```text
config/dochi_rpg_maker/dialogue_sets/blacksmith/
  dialogue_set.json
  start.json
  greeting.json
  quest_done.json
```

`dialogue_set.json` contiene el conjunto, `start` selecciona la escena de apertura, y los nodos generales contienen escenas visibles. **Load / Save / Save As** operar en el conjunto, no solo en la línea seleccionada.

## Copiar escenas relacionadas juntas

Seleccione nodos con **Shift+Click** o una selección de arrastre y, a continuación, **Copy / Ctrl+C**. Al pegar en otro conjunto, haga clic en su panel **Dialogue Sets** primero, luego **Paste / Ctrl+V**. Los nombres duplicados reciben sufijos; los enlaces entre los nodos copiados y sus posiciones Blueprint siguen a los nuevos nombres. Los enlaces a nodos externos permanecen sin cambios.

Arrastre las filas de nodo, ruta, elección, condición y acción compatibles para reordenarlas. Una fila seleccionada en azul es el elemento que se está editando; las casillas de verificación de fila marcan elementos para operaciones en bloque. **Delete** elimina los elementos verificados, incluidas las filas verificadas fuera del área visible.

Cree productos en [NPC Shop](#core/shop-system), tipos de dinero en [Currency Editor](#core/currency-editor) y el diseño de la ventana de diálogo en [GUI Maker](#core/gui-system).
