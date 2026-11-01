---
title: Habilidades, sonidos, diálogo y música de batalla
slug: battleworks-skills-effects
order: 247
description: Conecte habilidades de catálogo reales y agregue presentación sin cambiar el tiempo de daño confiable.
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

## 1. Selecciona una habilidad real

1. Instale el proveedor y las dependencias en el servidor y los clientes.
2. Seleccione la etapa Acción de un patrón y pulse **+ Habilidad**.
3. Filtra por mod, busca por nombre o ID y elige una habilidad de la lista.
4. Fije su evento en el tick de lanzamiento previsto.
5. Mantenga las posibilidades de evento y acción en 100.
6. Comienza con un nivel de habilidad bajo y prueba un lanzamiento.

Una acción tiene una habilidad. Escribir un ID inventado no lo crea. También deben existir activos adicionales del proveedor.

## 2. Diagnosticar un lanzamiento rechazado

| Comprobar | Por qué importa |
| --- | --- |
| Proveedor y ID real | La habilidad debe estar disponible |
| Objetivo, alcance, línea de visión | La acción necesita una situación de lanzamiento válida |
| Reutilización del proveedor | Separado de BattleWorks patrón de enfriamiento |
| Compatibilidad con ruedas | No todos los hechizos de jugador soportan un CustomNPC |
| Opciones soportadas | Diferentes habilidades aceptan diferentes configuraciones |

La simulación no lanza hechizos externos reales. Pruebe en el mundo e inspeccione `Battleworks skill failed` mensajes.

## 3. Ajustar el daño en el lugar correcto

| Ataque | Control de daños |
| --- | --- |
| Caja de golpeo | Daño compartido × por acción Multiplicador de daño |
| DRM Habilidad | Nivel de habilidad y opciones compatibles con el proveedor |
| Ciertas habilidades integradas | Opciones de daño directo expuestas por el editor |
| Proyectil gestionado | Su propia acción daña |

Un `damageMultiplier` genérico copiado en parámetros de Habilidad no es un multiplicador universal de conjuros soportado.

## 4. Añadir fundición repetida

1. Mantenga una copia de un solo molde que funcione.
2. Agregue otro evento o un programa de repetición intencional.
3. Deje suficiente tiempo para el propio enfriamiento del proveedor.
4. Usa acciones de Habilidad separadas cuando cada lanzamiento necesite una animación de lanzamiento diferente.
5. Haz coincidir las garrapatas de animación del elenco con la duración prevista.

El movimiento de lanzamiento se solicita en lanzamientos exitosos. Ningún movimiento puede indicar una habilidad rechazada, no una mala ID de animación.

## 5. Añadir un sonido de ataque

1. Añadir sonido al evento de éxito o a su propio evento.
2. Utilice Seleccionar para elegir un sonido registrado.
3. Vista previa con Play / Stop.
4. Inicia el volumen y el tono en 1.0.
5. Guardar / aplicar y escuchar durante el combate.

`minecraft:entity.player.attack.sweep` es un ejemplo básico. Utilice un ID de sonido registrado `namespace:path`, no un nombre de archivo OGG. Las acciones de Ordinary Sound juegan en el NPC a través de la categoría de criatura hostil.

## 6. Añadir una advertencia de título corto

1. Añadir título en la marca de Windup 0.
2. Introduzca un título corto y un subtítulo.
3. Elige como público al objetivo actual o a los jugadores cercanos.
4. Establezca Radius cuando utilice destinatarios cercanos.
5. Comience con Desvanecimiento en 5, Estancia 20, Desvanecimiento 5.
6. Compruebe la legibilidad y la superposición en la pantalla de un jugador real.

Los títulos frecuentes de varios NPC pueden sobrescribirse entre sí.

## 7. Comandos y ventanas emergentes DRM

Abrir **Command → Edit command / arguments**. Primero verifique el tiempo con:

```text
say BattleWorks timing test
```

No utilice ninguna barra inclinada dentro de la acción Comando. Elija NPC o destino como ejecutor.

| Ficha | Sustitución |
| --- | --- |
| `@npc` | Texto UUID de NPC |
| `@target` / `{target}` | Texto UUID de destino actual |
| `{player}` | Nombre del jugador objetivo |
| `{uuid}` | UUID del jugador objetivo |

Los tokens ?npc/?target son cadenas reemplazadas, no selectores vanilla. Las fichas de jugador necesitan un objetivo de jugador.

Cree y pruebe primero la definición de ventana emergente y la GUI en DRM. A continuación, utilice la finalización de comandos y el nombre de la ventana emergente real. No asuma que otra distribución combatv1.json existe localmente.

Las acciones de comando se ejecutan con permiso de alto comando. Compruebe el destinatario y repita el recuento. Un popup normalmente necesita una invocación; su definición puede proporcionar un sonido de inicio.

## 8. Mantenga el daño confiable y el diálogo ocasional

Utilice el evento 100%, Hitbox 100%, Sonido 100% y Comando de diálogo 20%. Disminuir toda la probabilidad del evento también evitaría el daño.

## 9. Configurar BGM

1. Abrir **Combat Rules → BGM**.
2. Habilitarlo y seleccionar una pista registrada.
3. Comienza con el Volumen 0.7 y Pitch 1.0.
4. Vista previa y guardar/aplicar.
5. Deja que un jugador de Supervivencia se convierta en el objetivo del PNJ.
6. Verifique la detención en caso de pérdida del objetivo o muerte NPC.

Los bucles BGM para el objetivo del jugador actual ****, no todos los jugadores dentro de un radio. Cuando varios NPC apuntan al mismo jugador, el propietario adquirido más recientemente gana.

El volumen **Music** del jugador debe ser audible. Deben existir recursos de audio personalizados en cada cliente receptor. La supresión de música de vainilla utiliza la preferencia de música de vainilla Desactivar independiente.

Agrega un elenco, luego sonido, título, popup y BGM en ese orden. Continuar con [Particle Maker](#mob-editor/battleworks-particles).

![Reglas de combate → Configuración de BGM.](assets/media/guides/battleworks-016-neo1211/battleworks-bgm.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Habilitar BGM está desactivado y Sound ID está vacío aquí. Seleccione el sonido, habilite BGM y ajuste el volumen y el tono. Esto muestra la configuración, no un resultado de reproducción de música verificado.")

## Previsualizaciones visuales para las habilidades soportadas

Simulación, Biblioteca Hitbox y tutoriales comparten la vista previa de habilidades. Se pueden ver proyectiles, efectos de área, invocaciones, partículas y algunos efectos sostenidos en el reloj del editor. Pausa y retrocede para comparar el tiempo y la ubicación.

Esto no es ejecución de hechizos de servidor. Los daños, la destrucción del terreno, la búsqueda de caminos, las estadísticas de combate reales y los efectos de juego completos del tercer equipo aún necesitan pruebas de combate en vivo. Una habilidad enumerada no garantiza un adaptador visual. Distingue los mods faltantes, los proveedores no registrados, los elementos visuales no compatibles y los errores de procesamiento nativo; un efecto no compatible no se reemplaza silenciosamente con otro hechizo.
