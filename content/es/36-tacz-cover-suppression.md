---
title: Cubierta, fuego supresor y defensa de la facción
slug: warfare-cover-suppression
order: 335
description: Configure disparadores de cobertura, vigilancia supresora y posterior al incendio, asistencia de facciones, límites y comportamiento de recuperación.
product: dochi-warfare
category: Combat AI
section: combat-ai
status: Proyecto
version: 0.3.1
audience: Diseñadores de encuentros
tags:
  - cover
  - suppression
  - faction
translationSource: en
translationMethod: assisted
---

## Encuentra cobertura y fuego supresor

**Cover** controla el movimiento hacia un terreno protector. Habilite **Enable Cover** y, a continuación, elija desencadenadores como **On Reload / On Damage**. Disparar hacia la última posición vista de un objetivo se configura por separado en **Senses → Quick View → Suppressive Fire**.

![La cubierta activa el interruptor, los disparadores, el radio de búsqueda y la sincronización.](assets/media/guides/warfare-031-neo1211/dw-cover.png "DW 0.3.1 / NeoForge 1.21.1. En este ejemplo, habilite la cubierta. Incluso cuando está habilitado, un campo plano abierto puede no proporcionar ninguna cubierta válida.")

## Dónde se editan estos ajustes

Estos son los ajustes del creador, no las pantallas del jugador en el juego.

* Abre el NPC con `DW Npc Core`.
* Configure `Suppressive Fire` y `Faction Defense` en los controles de combate y detección.
* Configure la cubierta estratégica en la categoría separada `Cover`.

La cubierta es experimental. El conmutador de servidor global y el propio conmutador del NPC deben estar habilitados:

```toml
[experimentalCover]
enabled = true
```

```text
Cover > Enable Cover: ON
```

La cubierta solo puede comenzar mientras el NPC está en su fase `COMBAT`. No reemplaza las patrullas inactivas, el movimiento de formación de mercenarios o la adquisición de objetivos ordinarios.

## Cover triggers

Cada activador se habilita de forma independiente por NPC.

| Disparador | Cuando se puede empezar a cubrir |
| --- | --- |
| `On Reload` | Una recarga gestionada está activa y al menos `Reload Left (ms)` permanece. |
| `On Damage` | Un evento de daño final real alcanza `Damage Ratio` de salud máxima. Un golpe invisible puede usar su origen de daño recordado antes de que exista un objetivo visible. |
| `On Low Health` | La salud cruza por debajo de `Low Health Ratio`; esta es una respuesta umbral en lugar de un bucle de cobertura permanente. |
| `On Repeated Hits` | Suficiente daño-golpeó los racimos ocurren dentro de `Damage Window (ms)`. |
| `On Grenade Threat` | Se aterriza una granada de fragmentación LR Tactical cercana, o una granada de fragmentación en el aire tiene un fusible inminente. |

Las granadas de humo y aturdimiento no activan la cobertura de fragmentación. La cubierta de la granada utiliza el origen de la explosión como la dirección de la amenaza mientras preserva el objetivo de combate actual.

## Búsqueda, movimiento y tiempo

| Configuración | Uso práctico |
| --- | --- |
| `Search Radius` | Radio de búsqueda de cobertura horizontal. El rango guardado es 3-12 bloques y el trabajo de búsqueda está limitado internamente. |
| `Cover Move Speed` | CustomNPCs velocidad de marcha utilizada solo al entrar, asomarse o regresar de la cubierta. |
| `Hold Time (ms)` | Tiempo mínimo de retención para daños y cobertura de impactos repetidos. |
| `Low-HP Hold (ms)` | Retención mínima separada para una cobertura de salud baja. |
| `Cooldown (ms)` | Retrasar antes de que otra acción de cobertura pueda comenzar. |
| `Max Duration (ms)` | Límite difícil para una acción de cobertura. |
| `Peek After Cover` | Permite el movimiento a un lado de disparo validado por geometría después de sostenerlo. |
| `Max Peek Cycles` | Movimientos máximos en una acción de cobertura, de 0 a 4. |

Un escondite debe proteger tanto la cabeza como el pecho del PNJ. La cubierta de disparo también necesita espacio para disparar. Si no se puede alcanzar el lugar elegido, el NPC puede intentar otro camino.

El movimiento de cubierta no crea un accesorio de munición separado. La recarga continúa a través de la pila nativa del arma operada más el estado de recarga DW. La parte superior del cuerpo mantiene la acción de recarga mientras que la parte inferior del cuerpo sigue el movimiento real.

## Flujo de tiempo de ejecución

Una acción de cubierta normal sigue esta forma:

1. Un disparador configurado se vuelve válido durante el combate.
2. El servidor busca un radio limitado para la cobertura alcanzable contra el objetivo actual, recuerda el origen del daño, recarga / estado de munición, estado de supresión o amenaza de granada.
3. El NPC entra en cobertura usando `Cover Move Speed`.
4. Se mantiene durante el tiempo mínimo del disparador mientras que la duración máxima dura continúa aplicándose.
5. Si el asomarse está habilitado y la geometría es válida, el NPC se mueve a un lado de disparo con línea de visión.
6. El NPC vuelve al combate ordinario o aborta de forma segura cuando la fase se completa, la ruta falla, o `Max Duration` expira.

La cubierta no garantiza que exista un punto válido. El terreno abierto, las habitaciones selladas, la base insegura, un radio que es demasiado pequeño o un camino que el NPC no puede atravesar pueden no producir correctamente ninguna acción de cobertura.

## Fuego represivo

`Suppressive Fire` es una política de última posición vista, no de seguimiento de objetivos ocultos.

* Solo puede ejecutarse después de que el NPC haya visto el objetivo durante el combate.
* Dispara rondas de armas reales en esa última posición visible.
* Permanece permitido sólo para `Suppression Time Ms`.
* No actualiza su objetivo desde la posición actual del objetivo oculto.
* El disparo final, el stock de munición, el modo de arma, la recarga y las reglas de línea de fuego aún se aplican.

`Post-Fire Watch Ms` controla el período de vigilancia después de que termina el fuego supresivo. Durante este tiempo, el NPC sigue apuntando al último punto visto sin disparar o gastar munición. Ponlo en `0` para desactivar el reloj post-fuego.

Comience con la ventana corta predeterminada. Una ventana de supresión larga puede desperdiciar munición finita y hacer que un objetivo perdido parezca como si todavía estuviera siendo rastreado.

## Defensa de facción

`Faction Defense` permite que un NPC administrado por DW dañado transmita a su atacante a aliados administrados dentro de la misma facción `Faction Alert Radius`. El uso compartido vertical es limitado, y un aliado aún necesita la línea de visión final antes de disparar.

Esta ayuda no es una anulación de fuego amigo universal:

* Los selectores explícitos y las reglas de etiqueta aún se aplican.
* Las entidades pasivas o no relacionadas no se convierten en objetivos.
* La protección del propietario mercenario y la tolerancia al golpe del propietario aún se aplican.
* Las represalias de la misma facción requieren hostilidad genuina o una subvención reactiva corta autorizada por el servidor.

## Orden de ajuste recomendado

1. Confirmar combate ordinario `Ranged` o `Auto` en terreno abierto.
2. Confirma el comportamiento de movimiento y recarga sin cobertura.
3. Habilitar un disparador, generalmente `On Reload`.
4. Mantener `Search Radius` pequeño y verificar que existe un obstáculo sólido accesible.
5. Ajusta el tiempo de espera y el tiempo de reutilización.
6. Agregue mirar solo después de que las rutas de entrada y salida funcionen.
7. Agrega daño, golpes repetidos, baja salud y dispara granadas de uno en uno.
8. Agregue el fuego supresor y la defensa de las facciones para que sus efectos sean fáciles de distinguir.

Si la cubierta falla, primero prueba con un NPC, un objetivo, un gatillo y una pared simple. Esto separa la geometría de la cubierta del objetivo, la formación, la patrulla y los problemas de munición.
