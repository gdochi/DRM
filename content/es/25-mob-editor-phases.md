---
title: Selección de patrones, combos y fases de salud
slug: mob-editor-phases
order: 260
description: Comprenda la elegibilidad, la puntuación, el ritmo y una transición de fase 50 por ciento.
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

## 1. La elegibilidad viene antes de la preferencia

Los patrones no se ejecutan simplemente de arriba a abajo.

| Ajustes | Pregunta |
| --- | --- |
| Fundamentos | ¿Puede este patrón comenzar ahora? |
| Puntuación | ¿Cuánto debería preferirlo el gerente? |
| Reglas de combate → Gerente | ¿Cómo se debe manejar la repetición, el movimiento y la espera? |

Las puntuaciones más altas no pasan por alto el estado deshabilitado, los requisitos de salud, los tiempos de reutilización o las condiciones adicionales.

![Selección de patrones, penalidades por repetición y recuperación en Manager.](assets/media/guides/battleworks-016-neo1211/battleworks-manager.png "BattleWorks 0.1.6 / NeoForge 1.21.1. La pena del mismo patrón afecta la puntuación de reselección, no la duración de la etapa. El valor predeterminado capturado difiere de la configuración 1.0 utilizada para probar un solo ataque.")

## 2. Prueba dos ataques ordinarios

1. Terminar el [Primer ataque](#mob-editor/battleworks-first-attack).
2. Añada un empuje usando el ejercicio [Box](#mob-editor/battleworks-hitboxes).
3. Habilitar ambos e inicialmente dar ambos rangos 0–2.7.
4. Establecer tanto la prioridad 10 como la puntuación base 10.
5. Inicio Mismo patrón Penalización alrededor de 0.5.
6. Luchar repetidamente y confirmar que ambos pueden ser elegidos.

Algunas pruebas no establecen la selección exacta 50:50. Las bonificaciones por distancia y los multiplicadores de historia también son importantes.

## 3. Campos comunes de elegibilidad y puntuación

| Campo | Finalidad |
| --- | --- |
| Mín. / Rango máximo | Intervalo horizontal de la distancia inicial |
| Max Vertical | Diferencia de altura permitida |
| Min / Max Fase | Intervalo de fase permitido |
| Gamas de salud Boss / Target | Requerimientos de la proporción de salud |
| Puntuación base | Preferencia inicial |
| Distancia ideal / distancia pico | Preferencia de distancia dentro del intervalo permitido |
| Falta HP Score | Bono proporcional a la falta de salud del jefe |
| Fase 2 / Fase 3 Bono | La preferencia en estas fases |
| Prioridad | Nivel de selección fuerte |

Mantenga los ataques ordinarios con la misma prioridad inicialmente. La prioridad no es un ajuste de probabilidad pequeño.

## 4. Leer correctamente los multiplicadores del gestor

| Campo | Significado |
| --- | --- |
| Piso de Selección | Excluir candidatos por debajo de la mejor puntuación × este valor |
| El mismo patrón de penalización | Multiplicador para repetir el último patrón |
| Penalización reciente | Multiplicador para repetir el patrón utilizado hace dos vueltas |
| El mismo rol penal | Multiplicador para el rol anterior |
| Factor aleatorio | Puntuación de jitter; selección ponderada-aleatoria todavía existe en cero |
| Movilidad Urgencia / Bonificación | Aumentar la preferencia después de un largo período sin movilidad |
| Max Estacionario / Penalidad Estacionaria | Reducir las opciones estacionarias después de una racha |

Un multiplicador de penalidades de 1 deja la puntuación sin cambios; 0 la elimina. Con un ataque, usa el mismo patrón de penalización 1 durante las pruebas. La bandera heredada `avoidImmediateRepeat` sola no es el control de repetición del selector activo.

## 5. Cuatro configuraciones de tiempo diferentes

| Configuración | Significado |
| --- | --- |
| Ticks de la etapa de recuperación | Tercer segmento de la coreografía |
| Retraso en la recuperación del núcleo | Mínimo retraso post-patrón |
| Recuperación del Administrador Min / Max | Rango de retardo post-patrón aleatorio |
| Enfriamiento del núcleo / Enfriamiento global de Manager | Reutilizar la restricción en el patrón completado |

La espera posterior al patrón es el máximo del retraso de recuperación del núcleo y el retraso aleatorio del administrador. Por ejemplo, el núcleo 8 con el gerente 10–14 da 10–14 ticks.

El enfriamiento global no es un bloqueo compartido adicional en cada patrón. El patrón completo recibe `max(pattern cooldown, global cooldown)`. Todavía se pueden seleccionar otros patrones elegibles después de la espera posterior al patrón.

## 6. Enlazar una barra en un empuje

1. Abra la barra de configuración Combo.
2. Vincular el patrón de empuje existente.
3. Comience con chance 50% y retraso 6 marca.
4. Establezca el combo del administrador Max en al menos 1.
5. Prueba a una distancia permitida por ambos movimientos.

El seguimiento aún verifica su objetivo, alcance, salud, fase, línea de visión y enfriamiento. Mantenga las posibilidades de salida en o por debajo de 100%; la probabilidad no utilizada significa que no hay combo. Max Combo 0 desactiva las cadenas.

Los patrones pasivos no pueden poseer enlaces combinados o ser destinos combinados.

## 7. Añadir fase 2 a media salud

1. Abrir **Combat Rules → Phase / Boss Phases**.
2. Mantener la fase 1 en 100%.
3. Añadir fase 2, nombrarlo Enraged y establecer **Health At or Below (%) to 50**.
4. Establezca la fase mínima de un ataque mejorado en 2.
5. Permitir ataques existentes en la fase 2 si deben permanecer disponibles.
6. Reduce la salud por debajo de la mitad y verifica que el nuevo ataque sea elegible.

El porcentaje del editor es **50**; JSON `enterAtHealthRatio` es **0.5**.

Las fases se enganchan hacia arriba durante el combate. La curación no vuelve fase 2 a fase 1. La pérdida de objetivo más el Retardo de reinicio de combate restablece el estado de combate, pero la salud restante baja puede desencadenar la fase superior nuevamente al volver a activarse.

![Fases Jefe con la fase de apertura seleccionada.](assets/media/guides/battleworks-016-neo1211/battleworks-phases.png "BattleWorks 0.1.6 / NeoForge 1.21.1. La apertura actualmente usa 100. En esta compilación, la etiqueta Salud En o Abajo (%) tiene un prefijo de error Formato; el número adyacente es el porcentaje de entrada-salud. Seleccione la segunda fase para establecerla en 50.")

## 8. Agregar un anuncio de solo transición

1. Crear un patrón de inicio Enrage corto con sonido/título.
2. Deje su disparador en el Administrador.
3. Permitir la fase 2 y hacer que las condiciones objetivo/rango/altura/salud sean adecuadas.
4. Seleccione como patrón de transición de fase 2.
5. Establezca su puntuación base y cada bonificación de puntuación aditiva en 0 si nunca debe ingresar la selección ordinaria.

La ejecución de la transición es independiente de la selección de puntuación. Todavía comprueba las condiciones adicionales, el objetivo, la fase, el alcance y la salud; la transición forzada actual puede evitar el tiempo de reutilización y la línea de visión normales.

Un golpe grande puede saltarse umbrales de fase intermedios. No asuma que cada transición intermedia se juega en secuencia. Continuar con [reacciones pasivas](#mob-editor/battleworks-passives).
