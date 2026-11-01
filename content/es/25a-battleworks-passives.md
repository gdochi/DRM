---
title: Daños y reacciones pasivas de salud
slug: battleworks-passives
order: 265
description: Crear reacciones en cola y distinguirlos de los desencadenantes defensivos inmediatos.
product: mob-editor
section: combat
category: BattleWorks
status: Guía
version: 0.1.6
audience: Principiantes y creadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## Comience con un pasivo

Los patrones ordinarios son elegidos por el gerente. Un pasivo solicita un patrón cuando ocurre un evento, como cruzar la mitad de la salud o recibir daño del proyectil.

Añadir un pasivo a un NPC cuyos ataques ordinarios ya funcionan.

Seleccione el patrón, luego **Core → Identity → Trigger: Pattern manager**. Abra la lista de desencadenadores en la página **Passive trigger**. **When busy: Wait for completion** es el comportamiento de la cola; **Queue lifetime** controla cuánto tiempo puede esperar.

## 1. Elija un desencadenador básico en cola

Abra el patrón **Core → Passive trigger**.

| Disparador | Evento |
| --- | --- |
| Administrador de patrones | Selección ordinaria puntuada |
| Umbral de salud | Cruce desde arriba hasta / por debajo de un umbral de salud; una observación inicial ya por debajo también califica |
| Daño cuerpo a cuerpo | Daños positivos de un atacante vivo directo |
| Daños a distancia | Proyectil positivo/daño indirecto con un propietario vivo |
| Cualquier daño | Otros daños positivos elegibles también |

Estas cuatro solicitudes básicas de cola pasiva en lugar de interrumpir la línea de tiempo activa dentro de la devolución de llamada de daño. Los tipos de reacción inmediata adicionales se describen por separado a continuación.

![Umbral de salud seleccionado en Núcleo → Activador pasivo.](assets/media/guides/battleworks-016-neo1211/battleworks-passive-health.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Salud 50%, probabilidad de activación 100%, tiempo de reutilización 100 garrapatas y tiempo de vida de la cola 200 garrapatas son controles separados. [Pasivo] distingue este patrón en la lista.")

## 2. Anunciar la mitad de la salud una vez

1. Crea un patrón llamado Half-Health Warning.
2. Elija Salud abajo.
3. Establezca el porcentaje de salud en 50 y Oportunidad en 100.
4. Habilitar una vez por combate.
5. Seleccione Cola, Cola garrapatas 200, Enfriamiento del disparador 100.
6. Establecer Windup 0, Acción 20, Recuperación 10.
7. Añadir un Título en la Acción 0, dirigido al objetivo del jugador.
8. Deja el combo vacío.
9. Ahorrar/aplicar y reducir la salud de los NPC por debajo de la mitad.

Resultado esperado: una vez que el movimiento actual termina y las condiciones lo permiten, comienza la advertencia. Permanecer por debajo de la mitad no desencadena cada garrapata.

## 3. Entender los controles

| Control | Significado |
| --- | --- |
| Oportunidad | Probabilidad de solicitar la reacción |
| Daño mínimo | Ignorar golpes menores que este umbral |
| Enfriamiento del disparador | Limite la frecuencia con la que este desencadenante puede solicitar una reacción |
| Ticks de cola | Duración máxima de una solicitud de espera |
| Cola | Espera cuando estés ocupado |
| Saltar | Descarte esa solicitud cuando esté ocupado |
| Una vez por combate | Evitar otro inicio exitoso hasta que se restablezca el combate |

Un disparador de Salud por debajo debe sanar por encima del umbral antes de otro cruce hacia abajo. Una vez que Per Combat se consume en el inicio exitoso y se borra en el reinicio de combate.

## 4. Retirarse después de un golpe de flecha

1. Crea un patrón de daño a distancia separado.
2. Usa Daño Mínimo 1, Probabilidad 100, Enfriamiento del Disparador 100, Mareas de Cola 200.
3. Desactivar una vez por combate.
4. Autor de un movimiento 12-tic Away usando el ejercicio [movement](#mob-editor/battleworks-movement).
5. Permita las distancias a las que golpearán las flechas; no herede un rango máximo solo cuerpo a ciegas.
6. Pruebe la reacción después de que se complete el ataque ordinario.
7. Sólo entonces reducir la probabilidad, por ejemplo a 30%.

Las condiciones se comprueban de nuevo al principio. Una flecha de 12 bloques de distancia puede solicitar un patrón cuyo rango máximo 3 entonces evita que se inicie.

## 5. Múltiples pasivos básicos

- Como máximo ocho solicitudes esperan por NPC; las solicitudes duplicadas para la misma combinación de patrones.
- La prioridad afecta a las solicitudes de espera y al reemplazo cuando están llenas.
- Las transiciones de fase tienen prioridad.
- A partir de un pasivo básico se borra un combo ordinario pendiente.
- Los arranques pasivos básicos tienen un intervalo de tick mínimo compartido 40.
- Un movimiento ordinario elegible obtiene un turno después de un pasivo básico.

Use estas reglas al juzgar por qué una reacción de impacto espera o se salta.

## 6. Los desencadenantes defensivos inmediatos están separados

0.1.5 también implementa estos tipos de desencadenadores avanzados:

| Tipo | Condición principal |
| --- | --- |
| hit_count | Número de visitas dentro de una ventana de tiempo |
| damage_sum | Daño acumulado dentro de una ventana de tiempo |
| evadir | Daños entrantes elegibles |
| guardia | Daños entrantes más un control de ángulo frontal |

Advanced JSON puede establecer valores de probabilidad/umbral `interruptActive`, `cancelDamage`, `windowTicks`, `threshold` y específicos de fase. Un patrón activo ininterrumpible puede evitar el reemplazo forzado.

Los controles genéricos del editor no exponen cada comportamiento avanzado. Esta ruta utiliza un manejo de reacción separado; no asuma que las reglas básicas de una vez por combate, garrapatas de cola o reglas de imparcialidad se aplican de manera idéntica. Pruebe la cancelación e interrupción de daños de forma explícita.

Estos factores desencadenantes son diferentes de los campos [postura/tiposte sin conexión](#mob-editor/mob-editor-parry).

## Orden de solución de problemas

1. Confirmar que el golpe no es cancelado, cero, inválido o letal para la ruta pasiva básica.
2. Prueba un disparador con Chance 100.
3. Compruebe Habilitado, objetivo, rango, fase y condiciones de salud.
4. Compruebe los tiempos de reutilización del disparador y del patrón.
5. Compruebe Saltear o caducar cola.
6. Restablecer el combate después de consumir una vez por combate.
7. Elimine los enlaces de transición o combo pasivos no válidos.
