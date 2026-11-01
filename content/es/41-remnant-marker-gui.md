---
title: Colocar un marcador de mensaje
slug: remnant-marker-gui
order: 117
description: Coloque un marcador, escriba su mensaje, léalo y cambie la GUI de visualización.
product: core
category: Remnant Msg
section: remnant-msg
status: Estable
version: 0.3.1
audience: Creadores / operadores
tags:
  - remnant
  - gui
  - marker
translationSource: en
translationMethod: assisted
---

## Deja una nota corta en un lugar

Para una nota utilizada en una ubicación, no es necesario crear un archivo primero. Mantenga pulsado **Remnant Msg Setter** y haga clic con el botón derecho en una cara de bloque para colocar un marcador y abrir su configuración. Con permiso de edición, escriba en Mensaje y pulse **Save**.

![Texto del mensaje introducido después de colocar un marcador con el setter.](assets/media/guides/drm-031-neo1211/remnant-message-ready.png "DRM 0.3.1 / NeoForge 1.21.1, Inglés UI. El texto es ‘Siga las linternas para llegar al pueblo.’ Mensaje JSON selecciona un documento existente; Modelo de marcador controla el marcador del mundo; Guardar almacena su mensaje.")

1. Consiga el setter con `/give @s dochi_rpg_maker:remnant_msg_setter`.
2. Haga clic con el botón derecho en la cara del bloque donde debe adjuntarse el marcador.
3. Introduzca el texto en **Message**.
4. Mantenga **Marker model: Default icon** y Escalar 1 para el primer intento, luego Guardar.
5. Guarde el setter y haga clic con el botón derecho en el marcador para leerlo. Un creador autorizado que sostiene el setter abre la edición en su lugar.

![El marcador guardado se abre mediante el uso con las manos vacías.](assets/media/guides/drm-031-neo1211/remnant-placed-setter.png "Resultado real del mensaje guardado en el mismo DRM 0.3.1 / NeoForge 1.21.1 artefacto. Esta GUI predeterminada muestra texto y Cerrar. Siga los pasos de la GUI a continuación para cambiar su posición de fondo o texto.")

Guardar en este flujo de trabajo crea el archivo de mensaje del servidor y lo vincula al marcador de mundo. Guardar un documento y colocar un marcador son operaciones separadas.

## Cambiar el marcador del mundo

Abra **Marker model** y elija el icono Predeterminado, Elemento, Bloque u Oculto. Para Elemento o Bloque, busque una entrada, selecciónela y aplique. De vuelta en el setter, presione Guardar para actualizar el marcador.

![El selector de modelo de marcador real.](assets/media/guides/drm-031-neo1211/remnant-marker-picker.png "DRM 0.3.1 / NeoForge 1.21.1. Las cuatro pestañas controlan la apariencia del marcador de mundo, no el fondo de la pantalla de lectura. Esta captura mantiene el icono Predeterminado.")

**Scale** controla el tamaño del marcador, **Billboard** cómo se enfrenta a la cámara y X/Y/Z sus desplazamientos de modelo. Cambie el tamaño y la posición del texto de la pantalla de lectura en GUI Maker.

## Encuentra un marcador colocado de nuevo

Con el setter, ** haz clic con el botón derecho en el aire** o ** haz clic con el botón derecho en un bloque** para abrir la lista del mundo. Utilice las flechas de mensaje para seleccionar un marcador, comprobar su ubicación y texto y, a continuación, editar. Antes de Eliminar, compruebe que el marcador deseado está seleccionado.

![Un mensaje guardado en la lista mundial.](assets/media/guides/drm-031-neo1211/remnant-populated-world-list.png "Real DRM 0.3.1 / NeoForge 1.21.1 guardar resultado. La lista muestra la dimensión, coordenadas, marcador vinculado, json y texto. Anterior/Próxima página cambia las páginas; la central cambia el mensaje seleccionado.")

## Reutilizar un mensaje y conectar una GUI

Para el mismo texto en varios lugares, guarde un documento en [Remnant Msg Editor](#core/remnant-msg), luego elija con **Message JSON** en cada setter. **Policy** selecciona reglas como quién puede colocar o editar marcadores. Los usuarios generales solo pueden acceder a lo que permite la directiva de servidor.

Para personalizar la pantalla de lectura:

1. Crea una **remnant_msg ** GUI en [GUI Maker](#core/gui-system).
2. Coloque un elemento `dialog` para el mensaje real; agregue `panel` o `image` elementos para un fondo si lo desea.
3. Save As un nuevo nombre de GUI.
4. Seleccione esa GUI en el documento de mensaje Remnant y guarde.
5. Vuelve a leer un marcador vinculado a ese documento.

Los tipos de GUI `dialogue` y remnant_msg sirven a diferentes pantallas. Para las opciones de NPC y ramificación, use [Dialogue Editor](#core/dialogue-system).
