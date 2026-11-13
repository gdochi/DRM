---
title: Espacio de trabajo, eventos y cronograma
slug: mob-editor-patterns
order: 230
description: Busque controles, seleccione acciones individuales y edite el tiempo, las repeticiones y la probabilidad.
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

## Leer el espacio de trabajo en este orden

Seleccione un patrón en la lista de la izquierda, elija Windup / Acción / Recuperación, luego seleccione una fila de acción y edite sus propiedades.

| Herramienta | Finalidad |
| --- | --- |
| Banco de trabajo de patrón | Condiciones del patrón y línea de tiempo de acción |
| Biblioteca de Hitbox | Geometría compartida, daño, ubicación y vista previa del modelo |
| Reglas de combate | Gerente, focalización, fases, muerte y BGM |
| Fabricante de partículas | Archivos visuales reutilizables separados |
| Ayuda de construcción de patrón | Generar un ataque físico a partir de las respuestas |
| Gráfico de patrón | Inspeccione los enlaces de patrón y combo |
| Simulación | Ensayo de movimiento y colocación de hitbox |

![Patrón Banco de trabajo después de generar un ataque.](assets/media/guides/battleworks-016-neo1211/battleworks-assist-built.png "BattleWorks 0.1.6 / NeoForge 1.21.1. El barrido ancho se selecciona a la izquierda. El medio muestra las etapas y el tiempo; la derecha es el inspector de elementos seleccionado. Seleccione una fila de acción para editar esa acción.")

## 1. Seleccione un patrón

Utilice **Find pattern** para buscar nombres o identificadores. Haga clic en el patrón deseado y edite su nombre, Estado habilitado y rango en Núcleo. Utilice Score para las preferencias de selección y Combo para los enlaces de seguimiento.

Los nombres son para lectores; los ID conectan las referencias JSON. Si edita los ID externamente, actualice cada referencia combinada y de transición que los use.

## 2. Fijar longitudes de etapa

| Etapa | Finalidad | Valor de práctica |
| --- | --- | --- |
| Windup | Preparar y advertir | 24 garrapatas |
| Medidas adoptadas | Ejecutar golpe, habilidad o movimiento | 16 garrapatas |
| Recuperación | Termina el movimiento y ofrece una apertura | 24 garrapatas |

El núcleo **Recovery Delay** es un piso de retardo posterior al patrón, separado de la longitud de la etapa de recuperación. Después de acortar una etapa, revise todos sus eventos y repita de nuevo.

## 3. Añadir una acción

1. Selecciona Acción.
2. Pulsa **+ Acción**.
3. Elija una categoría de propósito, luego la acción real.
4. Para Hitbox, usa **Choose from list** o crea un hitbox.
5. Haga clic en la fila de acción con nombre.
6. Establece la marca de evento `3`, el intervalo `0` y el recuento de repeticiones `1`.
7. Mantenga las posibilidades de evento y acción en 100 durante la prueba.

Las categorías organizan el selector; seleccionar una categoría no es un interruptor de habilitación. Vuelva a la categoría principal o utilice Esc cuando navegue por la lista.

**+ Habilidad** abre la selección de habilidades directamente. ** + FX** ayuda a agregar sonidos, títulos y comandos.

## 4. Separar eventos de las filas de acción

Un evento significa “las acciones programadas en este momento”. Un Hitbox y Sonido dentro de un evento comparten su tick y se repiten, pero cada uno tiene una fila seleccionable.

| Editar | Afecta |
| --- | --- |
| Tick Evento | Todas las acciones dentro de ese evento |
| Intervalo de evento / Repetir recuento | Todo el calendario del evento |
| Oportunidad de evento | Si esa ocurrencia se ejecuta en absoluto |
| Posibilidad de acción | Esa acción es una oportunidad independiente |
| Multiplicador de acción Hitbox | El uso del hitbox compartido |
| Daño de biblioteca | Cada uso de esa definición de hitbox |

Ponga un sonido en la marca 3 y el daño en la marca 8 en eventos separados.

## 5. Mueve los pines y el cabezal de reproducción

Arrastre un pin de acción para volver a cronometrar su evento. Al hacer clic o arrastrar la regla y los carriles vacíos se mueve el cabezal de reproducción de vista previa. Desplácese cuando haya muchas filas de acción.

La marca de evento es local a la etapa seleccionada. Con un 24-tic Windup, el tick de Acción 3 aparece en el tick general 27.

## 6. Crear un evento repetido

Utilice un 20-tick Acción con:

| Configuración | Valor |
| --- | --- |
| Tick Evento | 4 |
| Intervalo | 6 |
| Repetir recuento | 3 |
| Marcajes de ejecución | 4, 10, 16 |

```text
first tick + interval × (count - 1) ≤ stage length
4 + 6 × (3 - 1) = 16 ≤ 20
```

La cuenta incluye la primera ejecución. Intervalo 0 significa que no se repite. Repetir un hitbox no reinicia automáticamente la animación del escenario. Ver [ políticas de golpe](#mob-editor/battleworks-hitboxes) para controlar los repetidos intentos de daño.

## 7. Ajustar la probabilidad en un lugar primero

Para obtener daño confiable con diálogos ocasionales, usa evento 100%, Hitbox 100%, Sonido 100% y diálogo 20 %.

Un evento 50% que contiene una acción 20% da 10% de probabilidad base. Las condiciones avanzadas y los bonos de oportunidad de salud / fase pueden cambiar aún más la frecuencia efectiva.

## 8. Recuperar un diseño apretado

- Arrastre los divisores para cambiar el tamaño de las listas, el espacio de trabajo y las propiedades.
- En la biblioteca de Hitbox, cambie el tamaño del modelo/la altura de la línea de tiempo y el ancho del modelo/los clips.
- Utilice las flechas de encabezado para doblar o desplegar los paneles.
- Presione **Reset panels** para restaurar el arreglo.
- Arrastre la simulación por su encabezado y cambie el tamaño utilizando su agarre inferior derecho.

Velocidad de vista previa 0.1x–4.0x cambia la velocidad de observación, no los ticks de patrón guardados. El diseño pertenece a la configuración del cliente local.

## Antes de ahorrar

Marque Habilitado, ID faltantes, límites de eventos y la última repetición. Resuelve errores de validación, guarda/aplica y prueba el NPC real. Continúe con [hitboxes](#mob-editor/battleworks-hitboxes).
