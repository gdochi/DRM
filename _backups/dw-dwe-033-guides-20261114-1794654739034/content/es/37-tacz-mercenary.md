---
title: Contratos de mercenarios y HUD de comando
slug: warfare-mercenary
order: 355
description: Configure los términos de contratación con DW Mercenary Core y, a continuación, administre los contratos activos a través del HUD de comando del jugador.
product: dochi-warfare
category: Mercenarios
section: mercenary
status: Proyecto
version: 0.3.1
audience: Creadores y jugadores
tags:
  - mercenary
  - contract
  - hud
translationSource: en
translationMethod: assisted
---

## Dos tipos de pantalla diferentes

El flujo de trabajo mercenario separa deliberadamente las herramientas del creador de las pantallas del jugador en el juego.

| Pantalla o artículo | Quién lo usa | Finalidad |
| --- | --- | --- |
| `DW Mercenary Core` y `Mercenary Contract Settings` | Creator en modo creativo | Edite los términos de contratación de un PNJ administrado por DW. |
| `Mercenary Contract` confirmación | Jugador | Revisa el costo, la duración, el uso de la lista y los términos de ataque del propietario antes de pagar. |
| `Mercenary Status` comando HUD | Jugador con contratos activos | Inspeccionar, seleccionar, comandar, convocar, recordar o liberar mercenarios contratados. |

`DW Mercenary Core` no es parte del editor de armas `DW Npc Core`. Abre un editor separado y acepta NPC administrados por DW DNPC o CustomNPCs.

![Configuración de contrato de mercenarios para disponibilidad, pago, duración y ataques del propietario.](assets/media/guides/warfare-031-neo1211/dw-mercenary.png "DW 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1. Guarde la configuración del arma de fuego del NPC primero, luego ábrala mientras sostiene DW Mercenary Core. El alquiler disponible todavía está OFF en este ejemplo.")

## Configuración del creador

1. Configura y prueba el combate con armas de fuego del NPC con `DW Npc Core`.
2. En el modo Creativo, mantenga pulsado `DW Mercenary Core`.
3. Haga clic con el botón derecho en el NPC administrado por DW.
4. Configure el contrato y pulse `Save`.

| Campo del contrato | Significado |
| --- | --- |
| `Hire available` | Permite la interacción normal del jugador para solicitar una oferta de contrato. |
| `Cost item ID` | ID de registro del elemento de contratación. |
| `Cost item count` | Número eliminado cuando el jugador confirma. El acceso de autor creativo / operador puede renunciar al costo. |
| `Hire duration (seconds)` | Tiempo total de contrato activo. |
| `Summon windup (seconds)` | Retraso de 0 a 60 segundos antes de que se despliegue un mercenario almacenado. |
| `Recall windup (seconds)` | Retraso de 0 a 60 segundos antes de que se almacene un mercenario desplegado. |
| `Faction hostility / hits` | Número de golpes dañinos del propietario antes de que los NPC cercanos de la misma facción traten al propietario como hostil. El contrato en sí permanece activo. |
| `Automatic contract break / hits` | Umbral de golpe independiente que termina el contrato y la protección del propietario. |
| `Hit reset window (seconds)` | Ventana golpeada consecutivamente por el propietario de 1 a 10 segundos. El conteo se restablece después de tanto tiempo sin otro golpe dañino. |

La hostilidad de facción y la ruptura automática del contrato son independientes. La habilitación de uno no habilita silenciosamente al otro.

## Contratar como jugador

Interactúa normalmente con un NPC alquilable. No sostenga `DW Npc Core`, `DW Mercenary Core`, o un elemento del editor CustomNPCs; esos elementos mantienen su propio comportamiento de edición.

La pantalla de confirmación sin pausa muestra el PNJ, el precio, la duración del contrato, las franjas horarias de la lista y las reglas de ataque del propietario. El servidor vuelve a verificar la oferta, la distancia, el costo del artículo, los términos actuales, la propiedad y el límite de la lista cuando el jugador confirma.

Cada jugador puede tener hasta cinco contratos activos. El pago se cobra solo después de la confirmación del servidor. Los contratos liberados manualmente no se reembolsan.

## Estados contractuales y temporizador

| Estado | Comportamiento del temporizador |
| --- | --- |
| Desplegado o siguiente / formación / tenencia / combate | El tiempo de contrato activo continúa. |
| Recordando | El tiempo de contrato activo continúa durante la liquidación. |
| Almacenado | El temporizador está en pausa. |
| Convocatoria | El temporizador permanece en pausa hasta que se complete la implementación. |
| Área descargada | El contrato sigue siendo desplegado y se muestra como descargado. |

Recordar guarda el estado actual del NPC antes del almacenamiento. Invocar restaura el NPC almacenado cerca del propietario solo cuando se encuentra un espacio seguro. Si es necesario, los datos almacenados no se pueden restaurar de forma segura, el comando se rechaza en lugar de inventar un NPC de reemplazo.

## Abrir y usar el HUD en tiempo de ejecución

Mantenga pulsada la tecla predeterminada `J` para mostrar el comando mercenario HUD. Mantén presionado `Left Alt` mientras está abierto para liberar el control de la cámara e interactuar con los botones HUD. Suelte `Left Alt` para devolver el control de la cámara; suelte `J` para cerrar el HUD.

El HUD se muestra hasta los cinco contratos de propiedad, incluyendo:

* Estado del contrato y tiempo restante
* Modo de movimiento y ranura de formación
* Modo de fuego y postura de combate
* Despliegue, invocación y estado de recuperación
* Recuento actual de golpes de propietario, umbral de hostilidad de facción, umbral de ruptura de contrato y tiempo de reinicio

Los mercenarios pueden ser revisados individualmente. Los comandos pueden apuntar a la selección o a todos los mercenarios elegibles, y el resultado informa cuántos aceptaron u omitieron la orden.

La versión 0.2.3 consolida órdenes opuestas en botones de estado. Por ejemplo, una selección all-Follow ofrece Hold; de lo contrario, el botón ofrece Follow. La formación, la postura defensiva / agresiva y el fuego a voluntad / fuego de retención funcionan de la misma manera. Si se almacena algún mercenario seleccionado, el despliegue ofrece Invocar primero; cuando se despliegan todos los mercenarios seleccionados, cambia a Recordar. Las selecciones mixtas se pueden normalizar a Seguir, Forma Trasera, Defensiva o Fuego a Voluntad.

Mientras el servidor procesa un pedido, el botón mantiene su estado visual normal, pero ignora los clics adicionales. Se vuelve interactivo de nuevo después de que llegue el resultado, evitando pedidos duplicados accidentales.

## Comandos de movimiento y combate

| Comando | Comportamiento |
| --- | --- |
| `Follow` | Siga al propietario sin una ranura de formación fija. |
| `Rear Form` | Utilice una ranura de formación trasera detrás del propietario. |
| `Front Form` | Usa una ranura de formación frontal. |
| `Hold` | Guarde la posición actual como ancla de retención. |
| `Regroup` | Despeje la tarea de movimiento actual y vuelva a Seguir. |
| `Hold Fire` | Detener la producción de armas de fuego y la adquisición de objetivos hasta que se libere. |
| `Fire At Will` | Permitir el disparo y la adquisición de objetivos de nuevo. |
| `Defensive Posture` | Reaccionar al combate real y a amenazas válidas. |
| `Aggressive Posture` | Enfréntate proactivamente a los enemigos reconocidos a través de las relaciones de amenaza válidas del propietario y las reglas objetivo del PNJ. |
| `Summon` | Implemente un mercenario almacenado después de su liquidación configurada. |
| `Recall` | Almacenar un mercenario desplegado después de su liquidación configurada. |

La postura agresiva no es un permiso para atacar a todas las entidades cercanas. Selectores de objetivos explícitos, CustomNPCs La hostilidad de la facción, la protección del jugador amistoso, las etiquetas y las reglas reactivas autorizadas por el servidor aún filtran a los candidatos.

## Ataques del propietario y ruptura de contrato

El daño del propietario se cuenta solo cuando es un verdadero golpe dañino. El daño del mismo golpe múltiple cuenta una vez, y el contador se restablece después de la ventana silenciosa configurada.

* `Faction hostility / hits` comienza una respuesta de facción. Los NPC cercanos de la misma facción pueden tratar al propietario como hostil, pero el contrato mercenario permanece activo.
* `Automatic contract break / hits` finaliza el contrato y la protección del propietario. No se emite ningún reembolso.
* Si se cruzan ambos umbrales, se notifican ambos resultados.

El HUD en vivo muestra el recuento actual y ambos umbrales para que el jugador pueda ver el riesgo antes de otro golpe.

## Liberación y expiración

La liberación de un contrato requiere confirmación y no da ningún reembolso. Un NPC almacenado se restaura antes de la liberación; si la restauración falla, la liberación se cancela para evitar perder el NPC.

Cuando el tiempo de contrato activo llega a cero, el contrato expira automáticamente. Si se elimina un NPC contratado, el contrato también finaliza y se notifica al propietario.
