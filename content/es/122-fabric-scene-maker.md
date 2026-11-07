---
title: Scene Maker
slug: scene-maker
order: 150
description: Crear y editar escenas de cámara en el mundo.
product: core-fabric
category: Scene Maker
section: scene-maker
status: Estable
version: 0.3.1
audience: Creadores / Operadores
translationSource: en
translationMethod: assisted
---

## Haz tu primera escena

Scene Maker es una herramienta creadora para organizar el movimiento de la cámara y los efectos de pantalla. Los jugadores ven la escena guardada cuando se reproduce, no la línea de tiempo de edición.

![Scene Maker con una escena de diez segundos. Las herramientas de adición están a la izquierda, la vista previa y la línea de tiempo en el medio, y las propiedades seleccionadas a la derecha.](assets/media/guides/drm-031-neo1211/scene-maker.png "DRM 0.3.1 / NeoForge 1.21.1. Agregue a la izquierda, seleccione una tarjeta de línea de tiempo y luego edite Propiedades. Usa Aplicar campos, seguido de Jugar para inspeccionar el resultado.")

1. Abra el selector de editor DRM y elija **Scene Maker**.
2. Elige la configuración de la escena, el nombre y la duración. Utilice **Player** para colocar la escena en relación con el jugador, o **Fixed Position** para una ubicación del mundo específica. Elija la dimensión y el origen según sea necesario. No se ofrecen anclajes NPC.
3. Agrega una pista de cámara y cualquier subtitulo, imagen, sonido, fundido, buzón, movimiento o elemento de evento que necesites.
4. Seleccione una tarjeta para editar sus propiedades. Utilice **Apply Fields** para los cambios de campo. Haga clic con el botón derecho en una tarjeta para ver sus acciones disponibles. Algunos tipos de tarjetas no se pueden dividir.
5. Abra **World positions** para colocar y ajustar los puntos de la cámara.
6. Utilice **Play** para previsualizar y, a continuación, guarde su propia escena con **Save As**. **Run Saved** reproduce la versión guardada, así que guarda de nuevo después de hacer cambios.

## Completar una escena en tres vídeos

Los vídeos consecutivos muestran pantallas reales de **DRM 0.3.1 / NeoForge 1.21.1**, con subtítulos y marcas de clic en inglés, sin audio. La puerta y las farolas estaban preparadas para distinguir el movimiento de la cámara.

### 1. Duración y subtítulo

![Configurar una escena de diez segundos y un subtítulo visible entre uno y cinco segundos.](assets/media/guides/tutorial-videos-20261107/scene-settings-subtitle.mp4 "Scene Settings → + Subtitle → Edit Subtitle → Apply Fields. Los tiempos se introducen en segundos.")

1. En **Scene Settings**, introduce ID **tutorial_gate**, Name **Village gate** y conserva Duration **10**. Usa **Apply Fields**. El anclaje **Player** sitúa la escena respecto al jugador. Antes de acortar la duración, ajusta los finales de las cámaras y efectos al nuevo límite.
2. Usa **+ Subtitle**, Start **1**, End **5** y **Apply Fields**. El subtítulo estará activo entre los segundos 1 y 5 de la escena de diez segundos.
3. Abre **Edit Subtitle**, escribe **Welcome to the village!** y vuelve con **Apply Fields**. Cancel descarta los cambios de esa ventana.
4. Mueve el indicador rojo a **3 segundos**. Seleccionar una tarjeta cambia el objetivo de edición, no la posición de reproducción. Los fundidos predeterminados pueden dejar negro el instante cero.

### 2. Crear la ruta de cámara en el mundo

![Seleccionar la cámara, mover la cámara de trabajo, registrar puntos, aplicar y previsualizar.](assets/media/guides/tutorial-videos-20261107/scene-world-camera-path.mp4 "Tarjeta Camera → World positions → WASD/Space → P/N → Enter para Apply → Play. Edición real de posiciones.")

1. Pulsa el **cuerpo de la tarjeta Camera** y **World positions**. Una tarjeta de subtítulo o efecto no selecciona la cámara.
2. Gira la rueda del ratón hacia abajo para reducir la velocidad y mueve la cámara de trabajo con **WASD / Space / Shift**. **P** registra la posición en el instante actual. Moverla por sí solo no registra un punto.
3. Muévete y usa **N** para añadir el siguiente punto. P registra el momento actual; N añade un punto posterior. Los tiempos determinan la duración del recorrido.
4. Usa **Enter o Apply** para incorporar las posiciones al borrador. Cancel descarta los cambios de esta ventana.
5. Usa **Stop → Play** para comprobar cámara y subtítulo juntos. Aplica las posiciones y guarda el archivo de escena.

### 3. Efectos, guardado y reproducción real

![Ajustar Letterbox, guardar y usar Run Saved para comprobar reproducción y finalización en el servidor.](assets/media/guides/tutorial-videos-20261107/scene-effects-save-run.mp4 "+ Letterbox → Apply Fields → Save As → Run Saved. La reproducción final utiliza el archivo guardado.")

1. Usa **+ Letterbox**, Start **0**, End **10** y **Apply Fields**. Los efectos tienen tarjetas e intervalos propios.
2. Usa **Save As** con **tutorial_gate**. El archivo es **config/dochi_rpg_maker/scene/tutorial_gate.json**. Apply de las posiciones y Apply Fields no guardan el archivo.
3. Usa **Run Saved** para reproducirlo mediante el servidor. Vuelve a guardar después de modificarlo.
4. Para repetir con un comando, usa **/drm scene tutorial_gate.json**. Consulta la sección de comandos para seleccionar jugadores.
5. Comprueba la desaparición del subtítulo y el regreso al juego. La reproducción se verificó en el mundo aislado de prueba de un jugador.

## Moverse a través de la línea de tiempo

El pin rojo es la posición de reproducción. Arrastrarlo deliberadamente para buscar. Seleccionar una tarjeta no busca. La barra de desplazamiento horizontal inferior mueve el intervalo de tiempo visible de forma independiente; utilice los controles menos/más para ajustar el zoom. Utilice el interruptor de bucle cuando desee reproducir una vista previa repetida.

En la captura de pantalla, **Camera** contiene el clip de la cámara, mientras que ** abrir / cerrar** en **Effects** marca los efectos de principio y final.

## Trabajar con puntos de cámara

| Control | Medidas adoptadas |
| --- | --- |
| WASD / Espacio / Cambio | Mueva la cámara de edición. |
| Arrastre a la derecha el espacio vacío | Mira a tu alrededor. |
| Rueda del ratón | Ajuste la velocidad de movimiento. |
| Ctrl + rueda | Ajuste el campo de visión de la cámara. |
| Haz clic izquierdo en un pin | Seleccione el punto sin teletransportarse. |
| Mantenga pulsado el ratón izquierdo y arrastre un pin | Mueva el punto en el plano de vista actual. |
| Liberar después de arrastrar | Mantenga el movimiento en la escena de trabajo. |
| Esc o clic derecho durante un arrastre | Cancela ese movimiento. |
| Haga clic derecho en un pin | Acciones de punto abierto. |
| Haga clic derecho en una línea de conexión | Acciones de ruta abierta. |
| P / Marcar la posición | Coloque el punto seleccionado en la cámara de edición. |
| N / Nuevo punto | Agregue un punto en la posición actual de la cámara y la próxima hora disponible elegida por el editor. |
| Ctrl + Z | Deshacer una edición completa dentro de esta ventana. |
| Aplicar | Mantenga las posiciones editadas y vuelva a Scene Maker. |
| Cancelar | Devuelve sin aplicar los cambios de esta ventana. |

Arrastrar mantiene la profundidad original del punto en relación con la vista. Para moverlo en otra dirección, suelte, mueva la cámara de edición y arrastre de nuevo. Un clic con un pequeño movimiento de la mano solo selecciona. Los pines deben permanecer en la parte cargada del mundo. La cámara se queda quieta mientras se arrastra un pin.

Utilice **Move camera here (TP)** para ver un punto seleccionado, o **Move point to camera** para reubicarlo en la vista actual. Estas son acciones separadas. **Walk in world** te permite moverte como jugador y marcar posiciones; sigue los controles de retorno en pantalla.

## Da forma a la ruta

Haga clic con el botón derecho en la línea de conexión o elija **Edit outgoing path** en un alfiler. Elige una ruta recta o suave, agrega un punto medio o coloca una curva en tu cámara. Mueva los pines añadidos para dar forma a la curva. La ruta dibujada muestra la ruta de la cámara utilizada para la reproducción.

Las escenas en órbita utilizan su propia configuración de distancia y ángulo. Mover un punto de órbita puede cambiar la distancia de órbita compartida. La edición de trayectoria recta/suave es para trayectorias de cámara ordinarias, no para rutas en órbita.

## Reproducir una escena guardada

Con permiso del operador:

```text
/drm scene
/drm scene <scene-file>
/drm scene <scene-file> play @a
/drm scene <scene-file> stop @a
```

Utilice las sugerencias después de `/drm scene ` para elegir una escena guardada jugable. Reemplace `<scene-file>` con ese nombre; no es una parte literal del comando. La segunda forma juega para ti, la tercera para los jugadores seleccionados, y la cuarta detiene esa escena para ellos.

Si una escena no aparece en la lista, compruebe que se ha guardado y que su contenido de anclaje y referencia son válidos. World-position Aplicar actualiza el documento de edición; guarde la escena después para guardarla para su posterior reproducción.

## Detener todas las escenas activas

`/drm scene stop @a` detiene las escenas actuales de los jugadores seleccionados sin nombrar un archivo. Usa la raíz `/drm scene`; no hay un comando separado `/drmscene`.

## Cámaras siguiendo un objetivo en movimiento

Usa Seguir, Orbitar o Path+LookAt para mover objetivos. El 1.21.1 y separado 26.3 construye siguen su movimiento más suavemente sin requerir archivos de la escena existentes para cambiar. Forge 1.20.1 no incluye Scene Maker.
