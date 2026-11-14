---
title: Booby Trap Editor y Gerente
slug: warfare-booby-traps
order: 390
description: Configurar el acceso con contraseña, explosiones, efectos, comportamiento de lanzamiento, granadas LRT, perfiles, marcadores y ciclo de vida.
product: dochi-warfare
category: Herramientas del mundo
section: tools
status: Proyecto
version: 0.3.1
audience: Creadores de mapas y escenarios
tags:
  - booby-trap
  - security
  - explosion
translationSource: en
translationMethod: assisted
---

## Roles de editor y tiempo de ejecución

`DW Booby Trap Core` es una herramienta creadora de modo creativo.

* Haga clic con el botón derecho en un bloque con el núcleo para abrir el editor de ese bloque.
* Haga clic con el botón derecho del ratón en el aire con el núcleo para abrir el administrador de trampas registradas.
* Guarde el núcleo antes de probar una trampa configurada a través de la interacción normal del bloque.

El editor y el administrador son pantallas de creadores. Las solicitudes de contraseña y los efectos de trampa son el comportamiento del jugador en el juego, y el servidor toma la decisión final de validación y activación.

## Tipos de trampas

| Tipo | Objetivo y comportamiento |
| --- | --- |
| `Password Door` | Solo puerta de vainilla; autenticarse antes de abrir. |
| `Password Container` | Bloquear con una GUI de inventario; autenticar antes de abrir el contenedor. |
| `Immediate Explosion` | Activar una explosión inmediatamente en la interacción. |
| `Delayed Explosion` | Juega retroalimentación de advertencia configurada, espera y luego explota. |
| `LRT Grenade` | Inicie una entidad de granada de equipos tácticos LesRaisins nativa cuando se instale el mod opcional. |

La elección de un tipo aplica los campos de referencia requeridos, pero cada resultado debe revisarse antes de guardarlo.

## Evento de activación

En 0.2.9, la explosión, la explosión retardada y las trampas de granadas LRT pueden usar `Interact` o `Step on block`. El servidor detecta `Step on block` cuando una entidad entra en el área de contacto superior del bloque configurado y, a continuación, aplica las reglas normales de enfriamiento, bypass del propietario, alcance del objetivo y uso único. Las puertas y contenedores con contraseña mantienen su flujo de interacción normal.

## Contraseña y reglas de acceso

Las trampas de contraseñas admiten un PIN numérico de 4 a 12 dígitos o una contraseña de texto de 1 a 32 caracteres. Puede configurar la sensibilidad del caso, el bypass del propietario, el lado de entrada, el comportamiento inverso, la política de cierre de puerta, los intentos máximos, la ventana de intento, el tiempo de bloqueo y la acción de falla.

Las acciones de falla pueden mostrar una advertencia, causar daño directo o explotar. Los valores de contraseña no se conservan como un borrador editable después de la configuración; cambiar el modo de contraseña o la directiva de caso requiere una nueva contraseña.

## Cargas útiles y efectos

Las trampas de explosión exponen el poder, bloquean la destrucción, la creación de fuego, el retraso, el sonido de advertencia y las partículas de advertencia. Los efectos opcionales pueden empujar al jugador desencadenante y aplicar hasta ocho efectos de poción al jugador desencadenante, a todos los jugadores cercanos o a todas las entidades vivientes cercanas.

La carga útil de granada LRT configura el tipo de granada, fusible, potencia, conteo, dirección, ángulo y guiñada / lanzamiento fijo cuando sea necesario. El editor rechaza esa carga útil cuando los equipos tácticos de LesRaisins no están disponibles o no se puede crear la granada seleccionada.

## Ciclo de vida y pruebas

Una trampa se activa solo mientras `Enabled` y `Armed` están encendidos. Otros controles importantes incluyen bypass del propietario, protección contra roturas, comportamiento de redstone, tiempo de reutilización, eliminación de un solo uso, eliminación de estado después del disparo, eliminación de bloque de destino, destrucción de bloque y creación de fuego.

Prueba en este orden:

1. Guardar una trampa simple con `Enabled` y `Armed` encendido.
2. Apártate `DW Booby Trap Core`.
3. Interactúa normalmente como un jugador de prueba no propietario cuando el bypass propietario está habilitado.
4. Verifique el efecto y el ciclo de vida antes de agregar errores de contraseña, efectos de poción o cargas útiles de LRT.

![Trampas Booby registradas con búsqueda, selección, Configuración, Desarmar trampa y Quitar bloque.](assets/media/guides/warfare-031-neo1211/dw-traps.png "DW 0.3.1 / NeoForge 1.21.1. Esta lista gestiona las trampas registradas. Actualmente tiene 0 seleccionado; elija una entrada para usar ajustes o desarmar controles.")

## Administrador, marcadores y perfiles

Haga clic con el botón derecho en aire con el núcleo para buscar trampas registradas e inspeccionar el estado, como activo, desactivado, desarmado, descargado, bloque obsoleto, explosión retrasada pendiente o dependencia faltante. `Remove Trap` elimina solo el estado de trampa; `Destroy Block` elimina el estado y el bloque de destino. Las acciones destructivas del gerente requieren una segunda confirmación.

Mientras que el núcleo se mantiene en modo creativo, las trampas configuradas cercanas se pueden mostrar con contornos y marcadores compactos. Los perfiles JSON reutilizables se almacenan en:

```text
config/dochi_warfare/booby_traps/profiles/
```

Cargar un perfil aplica ajustes al borrador del editor actual. El servidor aún valida si ese perfil es válido para el tipo de bloque seleccionado antes de guardarlo.
