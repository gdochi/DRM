---
title: Remnant Msg
slug: remnant-msg
order: 87
description: Cómo configurar documentos de mensajes, políticas y mostrar la GUI en Remnant Msg Editor.
product: core
category: Sistemas de núcleo
section: remnant-msg
status: Estable
version: 0.3.1
audience: Creadores / Operadores
tags:
  - remnant
  - message
translationSource: en
translationMethod: assisted
---

## Deja un mensaje en el mundo

![Colocar un marcador con Remnant Setter, guardar el texto y abrir el mensaje.](assets/media/guides/short-gifs-20261105/remnant-place-and-read.gif "Captura real: DRM 0.3.1 / NeoForge 1.21.1, interfaz en inglés. Colocar → escribir → Save → leer. Se verificaron el texto guardado en el servidor y la pantalla de lectura.")

El GIF muestra la opción sencilla de **escribir directamente**: haz clic derecho en una cara de bloque con el setter, escribe el texto y pulsa **Save**. Los pasos siguientes explican cómo vincular un mensaje JSON guardado.

Utilice **Remnant Msg Editor** para un mensaje adjunto a un lugar sin NPC. Ábrelo desde el selector del editor del núcleo y escribe su nombre y texto bajo **Message**. Estas pantallas inglesas son de **DRM 0.3.1 / Forge 1.20.1**.

![Remnant Msg Página de mensaje del editor, con navegación por la página a la izquierda y configuración de mensajes a la derecha.](assets/media/guides/drm-031-forge1201/remnant-editor.png "Escribe el texto bajo Mensaje primero. El mensaje guardado y su marcador de mundo colocado son pasos separados.")

1. Escribe el texto debajo de **Message** y guarda tu copia con **Save As**.
2. Haga clic con el botón derecho en una cara de bloque con el setter Remanente para colocar un marcador. Guardar el archivo de mensaje por sí solo no lo coloca en el mundo.
3. Seleccione el mensaje guardado en el marcador. Utilice **World List** para buscar, editar o teletransportarse a marcadores existentes.
4. Usa el marcador como jugador y revisa el texto mostrado. Configure las condiciones a continuación si es necesario restringir el acceso.

### La interacción y la visualización tienen condiciones separadas

**Interact Conditions** controla el uso del marcador; **View Conditions** controla mostrando el mensaje. **View Actions** ejecuta acciones después de verlas. Un simple aviso no necesita todas las condiciones y acciones configuradas.

![Ver condiciones con Habilitar, Y modo, Agregar y una lista de condiciones vacía.](assets/media/guides/drm-031-forge1201/remnant-view-conditions.png "Agregue la condición deseada y marque Habilitar. Esta captura de pantalla aún no tiene condiciones configuradas.")

## Conexiones con otras herramientas

Remnant Msg gestiona los mensajes de interacción colocados en el mundo por separado de los nodos de diálogo NPC. Los documentos de mensajes, las políticas, la GUI de visualización, los bloques/entidades de marcadores y el elemento de ajuste funcionan juntos.

DRM Core instala una interfaz gráfica de usuario predeterminada Remnant Msg más un mensaje de muestra y archivos de directiva como contenido predeterminado.

## Almacenamiento

Remnant Msg los archivos usan estas rutas.

| Datos | Ruta |
| --- | --- |
| Mensajes | `config/dochi_rpg_maker/remnant_msg/messages` |
| Políticas | `config/dochi_rpg_maker/remnant_msg/policies` |
| Interfaz gráfica predeterminada | `config/dochi_rpg_maker/gui/default_remnant_msg_gui.json` |

El diseño de la pantalla utiliza el perfil de diseño GUI Maker `remnant_msg`.

## Flujo de trabajo básico

1. Haga clic con el botón derecho en el elemento `Dochi RPG Maker Core`.
2. Abrir `Remnant Msg Editor`.
3. Cree o edite el documento de mensaje.
4. Configurar reglas o políticas de salida.
5. Si se necesita una pantalla personalizada, edite una `remnant_msg` GUI en GUI Maker.
6. Guardar y recargar los datos del servidor.

## Mensajes, políticas y GUI

| Tipo | Función |
| --- | --- |
| Mensaje | Unidad de texto y mensaje real. |
| Política | Regla para cuándo y cómo aparece un mensaje. |
| GUI | Diseño que controla cómo se muestra el mensaje. |

Separar el contenido de la pantalla hace que sea más fácil reutilizar una GUI a través de múltiples políticas o conectar un mensaje a diferentes estilos de visualización.

Los documentos de mensajes soportan `message`, a distancia `messageStyles`, interacción separada y condiciones de vista, `messageActions` y `messageTrigger`. Utilice `every_view` para ejecutar acciones habilitadas en cada vista o `once_per_player` para una ejecución por jugador.

## Setter y lista del mundo

| Medidas adoptadas | Resultado |
| --- | --- |
| Haga clic con el botón derecho en una cara de bloque con `remnant_msg_setter` | Coloca un marcador mirando desde esa superficie. |
| Haga clic derecho en Air | Abre la lista de marcadores del mundo. |
| Haz clic con el botón derecho del ratón en un bloque | Abre la lista sin colocar un marcador. |

El `World List` paginado proporciona `Edit`, `Teleport`, `Delete` y `Refresh`. Los campos de directiva determinan si un usuario general puede usar el flujo, escribir texto incrustado, seleccionar JSON, usar disparadores o consumir el setter. El tiempo de ejecución comprueba las condiciones de interacción/visión y ejecuta las acciones habilitadas de acuerdo con `messageTrigger`.

En 0.1.8, los selectores de mensajes y políticas buscan en las listas JSON del servidor. Una apariencia de marcador puede ser `Default`, `Item` o `Block`; opciones de elemento/bloque buscan nombres localizados, espacios de nombres e ID. `Scale` acepta `0.05` a `16.0`. Los modos de cartelera son `fixed`, `vertical`, `horizontal` y `center`. Artículo apariencias apoyo `none`, primera / tercera persona mano transforma, `head`, `gui`, `ground` y `fixed`. El servidor valida estos ajustes y los mantiene con los datos guardados del marcador y la entidad de visualización.

La política incluida permite el uso general y la escritura directa, pero reserva JSON y activadores para los administradores. Por defecto, no tiene consumo de setter, vida de marcador ilimitada y un límite de mensaje de carácter 4096. Los archivos de directiva existentes no se sobrescriben durante las actualizaciones.

## Conexión GUI

Remnant Msg Los archivos GUI viven en el mismo `gui` almacenamiento que los archivos GUI de diálogo y tienda, pero el `guiType` y los componentes son diferentes. El archivo predeterminado es `default_remnant_msg_gui.json`; cree una copia en lugar de editar el valor predeterminado protegido directamente.

Los valores de vista previa en GUI Maker pueden diferir de los valores de tiempo de ejecución. La salida en tiempo de ejecución proviene del documento Remnant Msg y de los datos de política.

## Lista de comprobación

| Síntoma | Comprobar |
| --- | --- |
| El mensaje no aparece | Archivo de mensaje, archivo de directiva y recarga del servidor. |
| El GUI está roto | `guiType`, ID de componentes y ruta GUI predeterminada. |
| Aparece un mensaje incorrecto | ID de mensaje referenciado por la política. |
| La posición es incorrecta | Si la GUI se abrió con el perfil `remnant_msg`. |

## 0.2.8 marcadores y disparadores una vez por jugador

Se admiten marcadores ocultos y estado de activación persistente una vez por jugador. La visibilidad del marcador y el historial de ejecución de cada jugador están separados. Prueba un nuevo jugador, un jugador que ya lo ha activado, y vuelve a conectar el comportamiento. Respaldar mensajes personalizados, políticas y el mundo juntos.
