---
title: DRM Administración
slug: drm-administration
order: 140
description: Inspección de datos del jugador y mutaciones controladas del operador en la pantalla de administración actual.
product: core
category: Operaciones
section: operations
status: Estable
version: 0.3.1
audience: Operadores de servidor
tags:
  - admin
  - operations
translationSource: en
translationMethod: assisted
---

## Habilitar la herramienta de servidor primero

**El archivo DRM 0.3.1 probado en Forge 1.20.1 tiene un problema de apertura.** La aplicación de la política a continuación tuvo éxito, pero al abrir la pantalla de inspección de Admin se bloqueó el cliente. La inspección F7 no es un procedimiento de trabajo verificado en ese archivo. Las capturas de pantalla y las operaciones de reproductor / etiqueta exitosas a continuación son de NeoForge 1.21.1; use la misma ruta de configuración después de obtener una Forge compilación que solucione este problema.

Una nueva política de servidor comienza con DRM Admin **OFF**. F7 no puede abrirlo en ese estado, ni siquiera para un operador.

1. Unete al mundo o al servidor y haz clic derecho en el aire con DRM Core.
2. Abra **Default Configs → Admin** en la parte inferior del selector del editor.
3. Encienda **Enable DRM Admin** y haga clic en **Apply**.
4. Espere a **Saved and applied on the server**.
5. Cierre los ajustes y pulse **F7**. La edición de esta directiva requiere el nivel de permiso del operador 2 o superior.

![Habilitar DRM Admin y aplicar su política de servidor.](assets/media/guides/drm-031-neo1211/admin-server-policy.png "DRM 0.3.1 / NeoForge 1.21.1. Aplicar realmente guardado habilitado: true en config/dochi_rpg_maker-admin.json y recibió el acuse de recibo del servidor. Esta directiva es independiente de la habilitación del método abreviado de teclado.")

Si F7 no hace nada, también verifique las combinaciones de teclas **Keyboard shortcuts → Open DRM Admin** y Minecraft. El archivo de directiva del servidor es `config/dochi_rpg_maker-admin.json`, fuera de la carpeta `config/dochi_rpg_maker/`.

## Elige un jugador y una categoría de datos

Lea los paneles de izquierda a derecha: **Players → Data categories → Data list → Edit tools**. Seleccione el jugador primero, luego una categoría como Etiquetas, DRM Misiones o Moneda. Al hacer clic en una fila de datos, se abrirán los detalles a la derecha.

![El jugador seleccionado en DRM Descripción general del administrador.](assets/media/guides/drm-031-neo1211/admin-overview.png "DRM 0.3.1 / NeoForge 1.21.1. Este es el reproductor de documentación individual DocsGuide. Las facciones, las misiones FTB, las batallas de entrenadores y los datos almacenados no están disponibles porque sus integraciones están ausentes en este entorno.")

**Checkboxes mark mutation targets**; la fila seleccionada en azul elige los detalles que se están viendo. La eliminación por lotes y los restablecimientos actúan en las entradas verificadas. Compruebe los resultados de búsqueda y el reproductor antes de seleccionar todos.

## Compruebe un registro de regalo único

Si el [Conversación de recompensa única](#core/dialogue-rewards) muestra el estado de regalo equivocado, encontrar `welcome_received` En ese jugador **Tags**. Su presencia significa que se cumple la condición de reclamación. La eliminación de la etiqueta para otra prueba no recupera manzanas previamente concedidas. No hay datos sobre un nuevo jugador significa que no existen etiquetas todavía. Introduzca un nombre en la etiqueta para agregar y haga clic en Agregar para crear una; compruebe una etiqueta existente antes de eliminarla.

![welcome_received añadido a través de DRM Admin y confirmado por el servidor.](assets/media/guides/drm-031-neo1211/admin-tag-added.png "DRM 0.3.1 / NeoForge 1.21.1. Ingresando welcome_received bajo Etiqueta para agregar y haciendo clic en Agregar creado esta fila. El servidor confirmado y la etiqueta real del jugador del servidor se verificaron. Delete está deshabilitado porque la fila no está marcada.")

## Resets de estado versus edición de contenido

| Tarea | Herramienta o efecto |
| --- | --- |
| Cambiar el diálogo, productos, objetivos o recompensas | Editar y aplicar el documento en su editor de autoría |
| Inspeccionar etiquetas, saldos o estado de búsqueda | Seleccione el jugador y la categoría en DRM Admin |
| Restablecer una misión | Cambia el progreso; no recupera automáticamente los artículos o dinero otorgados |
| Cambiar el progreso de las misiones FTB | Puede afectar al equipo del jugador |
| Cambiar DNPC relaciones amistosas/hostiles | Utilice DNPC relaciones; éstas difieren de CustomNPCs Facciones aquí |

CustomNPCs Las facciones y los datos almacenados se aplican a los objetivos anteriores Minecraft compatibles. CustomNPCs se excluye en 26.3.

## 0.2.8 administración

Los cambios de lote muestran el progreso. En Fabric / NeoForge, un Cobblemon Editor compatible registra la inspección del progreso del entrenador y reinicia el recuento de victorias. Estas herramientas requieren el addon. En el complemento actual, restablecer el recuento de batalla también revela un NPC oculto después de la batalla. Compruebe el reproductor de destino, el NPC y el alcance de restablecimiento.

## Eliminar historial de batalla del entrenador — 0.2.9

Utilice esto con un editor compatible Cobblemon en Fabric/NeoForge 1.21.1. Seleccione el jugador y los registros en Batallas de Entrenador y, a continuación, elija **Delete battle history**.

- **Reset battle count** conserva los marcadores de recompensa y la historia.
- **Delete battle history** elimina todo el registro de ID de progreso del jugador seleccionado, incluidos los recuentos, el último resultado, ID de batalla, marcadores de recompensa y recompensas pendientes. Las recompensas pendientes se pueden perder y las recompensas reclamadas anteriormente pueden volver a reclamarse.

Lea la confirmación antes de aplicar. Batallas activas o reservas de entrenador rechazan la eliminación. Los objetivos sin conexión utilizan el flujo de trabajo de operación en cola existente. Los complementos sin eliminación del historial dejan ese botón no disponible; el restablecimiento de cuenta permanece disponible.

`Unknown trainer` o ClearCount 0 no establece un registro huérfano: el NPC puede ser descargado, pueden faltar datos de identidad históricos, o puede permanecer el historial después de un restablecimiento de recuento. No hay limpieza automática. Revisa manualmente los ID retirados permanentemente. Esta operación no elimina entidades NPC ni entrenador JSON.
