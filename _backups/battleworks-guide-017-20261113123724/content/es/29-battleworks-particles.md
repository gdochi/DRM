---
title: Crear efectos con Particle Maker
slug: battleworks-particles
order: 274
description: Construye un anillo de dos segundos, pruébalo con un comando y agrégalo a una etapa de combate.
product: mob-editor
section: effects
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

## Lo que este ejercicio produce

Un archivo visual emite un anillo durante aproximadamente dos segundos. Lo jugarás a través de un comando y un jefe Windup. El daño sigue siendo un Hitbox o Habilidad separada.

El 0.1.5 Particle Maker compartido utiliza **archivos separados `dochi.particles.v1`**. Los documentos en línea más antiguos particleEffects siguen siendo una ruta de compatibilidad.

## 1. Abrir sin un NPC

1. Utilice DRM Core en modo Creativo.
2. Elija **Visual → Particle Maker**.
3. Crear un efecto o Cargar `particle_sample.json`.
4. Save As una copia de trabajo.

Una acción BattleWorks Particle Shape también puede abrir el mismo editor con **Open Particle Maker** y, a continuación, conectar el archivo guardado.

## 2. Construir una capa de anillo

| Control | Valor |
| --- | --- |
| Nombre del efecto | Anillo de entrenamiento |
| Emisión (ticks) | 40 |
| + Capa | Una capa |
| Inicio / Fin de la marca | 0 / 39 |
| Intervalo | 2 |
| Partículas | minecraft:end_rod |
| Origen | Rueda |
| Forma / radio | Anillo / 2.4 |
| Puntos de muestra / Recuento por punto | 24 / 1 |
| Spread / Velocidad | 0 / 0 |
| Local y | 0.05 |

1. Establezca el tiempo en **Timing / names**.
2. Elija la partícula y el origen bajo **Particle / origin**.
3. Establecer la forma y las dimensiones bajo **Shape / size**.
4. Muévase ligeramente por encima del suelo debajo de **Starting position / rotation**.
5. Inspeccione el juego / Pausa y Restablecer.

La garrapata final de una capa de partículas es inclusiva, pero debe ser ** menor que la duración **. Un efecto 40-tic utiliza garrapatas 0–39. Esto difiere de los límites de la etapa de combate.

En el intervalo 2, este ejemplo emite en 0, 2, 4 a 38: 20 emisiones de 24 partículas, solicitando 480 total.

![Temporización de capas en Particle Maker y sus ajustes de temporización/nombres.](assets/media/guides/battleworks-016-neo1211/battleworks-particles.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Leer Emisión (ticks) 40 con Inicio 0, Fin 39 y Intervalo 2. El panel de vista previa anterior se pliega; expandirlo para inspeccionar la geometría de la partícula.")

## 3. Animar el radio

1. Abra **End values (linear)** y habilite Animate para finalizar valores.
2. Utilice el radio inicial 1 y el radio final 2.4.
3. Haga coincidir las otras coordenadas finales con las coordenadas iniciales.
4. Juega y observa cómo se expande el anillo.

Para varios puntos de tiempo, busque la línea de tiempo, abra **Motion keyframes**, presione **Add key** y establezca la posición, el radio y la guiñada. Los valores interpolan linealmente entre las claves.

Las teclas tienen prioridad para sus valores X/Y/Z, radio y guiñada. Ellos animan el **emisor**, no las posiciones de cada partícula ya creada.

## 4. Seleccionar opciones de partículas válidas

El selector enumera las partículas registradas de vainilla y mod. Las opciones adicionales aparecen solo cuando es necesario.

Ejemplos: `minecraft:dust` puede usar `1 0.3 0.1 1`; una partícula de bloque puede usar `minecraft:stone`. Las opciones específicas de mod deben coincidir con su decodificador real. Comience con end_rod antes de cambiar los tipos.

## 5. Controles y límites de vista previa

Arrastre el lienzo para girar y utilice la rueda para hacer zoom. Frente / Perspectiva cambia la vista.

**End: Hold** mantiene el fotograma final de la vista previa. **End: Clear** borra la vista previa después de la reproducción. Estos no son comandos para anular la vida útil de cada partícula del mundo.

Preview utiliza proveedores de partículas reales, texturas y tipos de renderizado. Algunos renderizadores personalizados necesitan una etapa de renderización mundial separada y no pueden ser incrustados; NO_RENDER las partículas son intencionalmente invisibles. Compruebe la iluminación del mundo real, la profundidad y la apariencia también.

## 6. Guardar y ejecutar un comando

1. Save As `training_ring.json`.
2. Confirma el resultado de guardado.
3. Verifica que esté en `config/dochi_rpg_maker/particles/`.
4. Con el nivel de permisos 2 o superior, ejecute una vez:

```mcfunction
/drm particle play training_ring ~ ~ ~
```

**No incluya .json en el comando.** Las subcarpetas usan nombres como effects/training_ring. La finalización sugiere nombres sin extensión.

Un comando programa todo el efecto. Repetir cada garrapata es innecesario. Las coordenadas relativas usan la posición de ejecución del comando.

También puede guardar el archivo de partículas [practice](./assets/media/battleworks/training_ring.json) en esa carpeta.

## 7. Adjuntarlo a Windup

1. Seleccione un patrón de BattleWorks Windup.
2. Añada **Particle Shape** de la categoría de presentación.
3. Utilice **Choose particle JSON** y seleccione training_ring.json.
4. Elige Origin Caster.
5. Establecer marca de evento 0, intervalo 0, recuento de repeticiones 1.
6. Para este ejercicio, use un 40-tick Windup antes del contacto.
7. Guarda/aplica el documento de combate.

La acción almacena una referencia particleFile. La edición de ese archivo de partículas compartidas afecta a otros encuentros que lo usan.

Los efectos Caster/Target pueden seguir la posición de su origen y la cara mientras emiten. Para una advertencia fija en la ubicación anterior del jugador, registre una posición y elija la posición guardada.

## 8. Límites de emisiones

| Ámbito | Límite actual |
| --- | --- |
| Duración del efecto | 600 garrapatas |
| Capas / teclas por capa | 32 / 64 |
| Muestras/recuento de geometría única | 512 / 32 |
| Combate efectos concurrentes NPC / presupuesto por tick | 8 / 2,048 |
| Efectos de comando por dimensión / presupuesto por tick | 64 / 4,096 |

Si se omite la salida, reduzca las muestras, el recuento, la frecuencia o los efectos simultáneos. Inspeccione `Particle JSON rejected` en busca de fallos de archivo. Utilice el comando world cuando se muestren informes de vista previa sin soporte.

Se espera un anillo visible sin daño hasta que se conecte un [hitbox](#mob-editor/battleworks-hitboxes) separado.
