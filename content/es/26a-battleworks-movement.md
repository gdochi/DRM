---
title: Caminar, correr, teletransportarse y mover objetivos
slug: battleworks-movement
order: 245
description: Movimiento del autor con dirección clara, duración, cancelación y pasos de prueba en vivo.
product: mob-editor
section: authoring
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

## Decidir lo que debe moverse

| Intento | Característica |
| --- | --- |
| Enfoque entre ataques | Objetivo Chase |
| Avanzar o alejarse durante la preparación | Etapa hacia / lejos |
| Moverse en un tick de evento específico | Movimiento de línea de tiempo |
| Tire del jugador hacia el jefe | Tirar del objetivo |
| Reubicar el objetivo en coordenadas jefe-locales o mundiales | Mover objetivo relativo / absoluto |
| Mover a una ubicación registrada anteriormente | [Posiciones salvadas](#mob-editor/battleworks-advanced-actions) |

## 1. Construye un retiro corto

1. Añade un patrón llamado Retiro Corto.
2. Utilice Rango mínimo 0, Rango máximo 3 y habilite Movilidad.
3. Establecer Windup 6, Acción 12, Recuperación 12 ticks.
4. En Acción, deshabilite Stop Horizontal y elija Away at speed 0.08.
5. Mantenga la preparación y la recuperación en espera.
6. No añadir daños inicialmente.
7. Guarda/aplica y confirma la retirada seguida de una búsqueda renovada.

La movilidad le dice al gerente cómo registrar el patrón. No crea el movimiento por sí mismo.

![La etapa de acción bajo la etapa → Movimiento.](assets/media/guides/battleworks-016-neo1211/battleworks-stage-movement.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Seleccione Acción por encima de la línea de tiempo y, a continuación, cambie la subpágina Etapa a Movimiento. Movimiento: Ninguno significa que todavía no se haya configurado ningún movimiento de escenario.")

Utilice **Stage → Movement** para el movimiento de la etapa, o línea de tiempo **+ Acción → Movimiento Caster** para una acción en un tick en particular. Esto muestra la ubicación de edición en lugar de un retiro completado.

## 2. Entender las tres acciones del movimiento dedicado

| Tipo | Comportamiento | Valores |
| --- | --- | --- |
| Caminar | Navegar a un destino calculado al principio | Multiplicador de velocidad, distancia, tiempo de espera |
| Impulso Dash | Aplicar un impulso de velocidad | Velocidad horizontal, potencia vertical, duración de la propiedad |
| Teletransporte | Reubicar después de las comprobaciones de destino | Dirección y distancia |

Adelante/atrás/izquierda/derecha usa la cara inicial del PNJ. Hacia / lejos use la ubicación inicial del objetivo y requiera un objetivo. Los destinos de caminata y las direcciones de impulso no siguen reorientando.

La etapa anterior `dash` refresca la velocidad continuamente; `impulse_dash` aplica un solo impulso.

## 3. Haz un guión físico

1. Establecer Windup 12, Acción 24, Recuperación 16.
2. Añada la marca Movimiento en acción 0.
3. Seleccione Impulse Dash hacia el objetivo.
4. Comience con Velocidad 0.6, Potencia vertical 0.1, Duración 12.
5. Prueba sin daños primero.
6. Si se necesita una parada explícita, agregue la marca 12 de Hold at Action.
7. Agregue una Hitbox separada en la marca de contacto prevista.

Este es un fragmento de **evento**, no un documento completo:

```json
{
  "id": "dash_start",
  "at": 0,
  "interval": 0,
  "count": 1,
  "chancePercent": 100,
  "actions": [
    {
      "type": "dochi_battleworks:movement",
      "chancePercent": 100,
      "params": {
        "movementType": "impulse_dash",
        "direction": "toward",
        "speed": 0.6,
        "verticalPower": 0.1,
        "durationTicks": 12
      }
    }
  ]
}
```

La duración es la propiedad del control, no el tiempo de vuelo o la distancia de viaje garantizados. La gravedad, la fricción y la colisión aún se aplican. Dash en sí no tiene ningún daño.

## 4. Evite los movimientos superpuestos

Un nuevo movimiento dedicado reemplaza a la sesión anterior. Puede anular la detención y la búsqueda de etapas ordinarias, cruzar un límite de etapa y posponer el siguiente patrón mientras la propiedad permanece. Una acción explícita Hold lo cancela.

Repetir un evento de movimiento inicia un nuevo movimiento cada vez que ocurre. Mantenga la duración inicial dentro de su etapa; extiéndala solo deliberadamente.

## 5. Teletransportación NPC de prueba

Comience con Atrás, Distancia 3 en terreno plano cargado. Compara el espacio abierto con una pared, agua y un borde.

NPC Teleport busca un lugar de aterrizaje y verifica las condiciones de carga, borde, colisión y líquido. El fracaso deja al NPC en su lugar.

## 6. Tire del objetivo físicamente

1. Agrega Pull Target a un patrón de destino requerido.
2. Comienza con Fuerza 0.08 y Duración 40 garrapatas.
3. Pruebe aproximadamente dos segundos de tracción.
4. Ajuste gradualmente alrededor de 0.03–0.12.
5. Compruebe las paredes, los cambios de altura y el retroceso existente.

La fuerza agrega velocidad a cada garrapata; los valores grandes acumulan fuerza rápidamente. Tirar no reescribe las coordenadas, y el impulso permanece después. Un nuevo tirón reemplaza a la sesión anterior; las entidades inválidas, la muerte, los cambios de dimensión o la interrupción del combate pueden ponerle fin.

## 7. Reubicar el objetivo exactamente

| Medidas adoptadas | Entradas | Origen |
| --- | --- | --- |
| Mover relativo de destino | Desplazamiento X/Y/Z | Pies de jefe y mirando hacia la ejecución |
| Mover el objetivo absoluto | X/Y/Z | Coordenadas mundiales absolutas |

Relativo X 0, Y 0, Z 3 coloca los pies del objetivo tres cuadras por delante del jefe. La X positiva queda, Y hacia arriba y Z hacia adelante.

Estas acciones permanecen en la misma dimensión y requieren destinos cargados, en la frontera, en la altura y sin colisiones. Ellos no **** buscar hacia abajo para el suelo. La Y aerotransportada permanece aerotransportada. Verifica `Battleworks target movement rejected` en caso de fallo.

Una reubicación exitosa no cancela automáticamente un tirón activo.

## Orden de prueba en vivo

Pruebe los cambios de suelo plano, paredes, esquinas, escaleras y altura. El ensayo de piso plano de la simulación no valida la navegación, colisión o aterrizaje real.
