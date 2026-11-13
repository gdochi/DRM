---
title: Posiciones, proyectiles, invocaciones y condiciones guardadas
slug: battleworks-advanced-actions
order: 276
description: Cree ataques retrasados y administre entidades agrupadas y estado de encuentro.
product: mob-editor
section: combat
category: BattleWorks
status: Guía
version: 0.1.7
audience: Principiantes y creadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## Añadir una función avanzada a la vez

Comience después de la [jefe de dos fases](#mob-editor/battleworks-encounters) funciona. Mantenga un archivo conocido. Elija una acción a través de su categoría de propósito, luego edite sus propiedades y modificadores.

Las teclas JSON a continuación son material de referencia para la creación directa.

## 1. Atacar la posición anterior del jugador

1. Crear una caja de cilindros con ID warning_blast, radio 2.4, altura 3, daño 4.
2. Crear un patrón con Windup 40, Acción 10, Recuperación 20.
3. Añadir **Save World Position** a la garrapata de Windup 0.
4. Establecer ID de posición blast_spot, Destino de origen, Modo Exacto.
5. En la garrapata de Windup 1, añadir **Particle Shape**.
6. Use Posición guardada, ID de posición blast_spot.
7. Utilice Anillo, Radio 2.4, Muestras 24, Partícula minecraft:end_rod. Mantenga cualquier repetición dentro de Windup.
8. Añada **Hitbox At Position** en la marca de acción 0.
9. Enlace warning_blast y blast_spot.
10. Utilice una animación de escenario compatible o una explícita Ninguno.

Resultado esperado: alejarse después de que comience la advertencia deja el golpe en la ubicación anterior. Las cajas de golpe de posición guardadas usan el ancla como su centro; verifica la altura en lugar de asumir que los desplazamientos ordinarios del centro del cuerpo del NPC se aplican de manera idéntica.

![Guardar posición del mundo con ID de posición guardada, objetivo y exacta.](assets/media/guides/battleworks-016-neo1211/battleworks-save-position.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Añadido a través de + Acción → Invocaciones / Posiciones → Guardar posición del mundo. Cambie el ID inicial principal a blast_spot y use el mismo ID en acciones posteriores.")

## 2. Administrar nombres de posición

| Medidas adoptadas | Finalidad |
| --- | --- |
| save_position | Posición récord del lanzador/objetivo |
| hitbox_at_position | Ejecutar un hitbox en un ancla |
| move_to_position | Mover el lanzador/objetivo a un ancla |
| clear_position | Eliminar uno o todos los anclajes |

Guardar el mismo nombre lo actualiza. Mantenga guardado/uso/orden claro deliberadamente. Los anclajes son de encuentro local y claro en el restablecimiento de combate; el límite actual es 32.

Random Ring y Random Box eligen ubicaciones aleatorias. La seguridad busca en las alturas cercanas espacio cargado, en la frontera, libre de colisiones; no garantiza un bloque de tierra de apoyo. Probar destinos en el mundo.

## 3. Comience con un proyectil controlado

1. Añadir **Spawn Projectile / Construct**.
2. Comience con el ID básico minecraft:snowball del editor.
3. Establecer ID de grupo training_shots y Contar 1.
4. Utilice Spawn en Caster y Direction Target.
5. Prueba Speed 0.5, Damage 2, Lifetime 60 ticks.
6. Verifique la creación, los viajes, el impacto y la limpieza antes de aumentar la cuenta.

| Campo | Significado |
| --- | --- |
| ID de grupo | Nombre utilizado por las acciones posteriores de la versión/eliminación |
| Ventilador / Radial | Disposición de dirección |
| Punto / Línea / Anillo / Arco / Rejilla | Colocación de spawn |
| Mantenga las garrapatas | Retraso antes del lanzamiento automático |
| garrapatas de por vida | Vida útil máxima |
| Hit Radio | Radio de colisión gestionado |
| Partícula Trail | Identificador de sendero registrado |

No todas las entidades mod registradas admiten la creación genérica. Usa una verdadera integración de Habilidad primero para complejos hechizos externos.

![Bola de nieve por defecto en Spawn Projectile / Construct.](assets/media/guides/battleworks-016-neo1211/battleworks-projectile.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Agregado a través de + Acción → Habilidades / Proyectiles. Este ejemplo se coloca en Windup; seleccione Action antes de agregarlo si esa es la etapa de disparo prevista.")

## 4. Liberar un grupo retenido

1. Engendrado training_shots con garrapatas 40.
2. Añadir **Release Projectiles** 20 garrapatas más tarde.
3. Utilice el mismo ID de grupo.
4. Añada **Remove Projectiles** cuando las entidades restantes deban eliminarse.

Elija entre el lanzamiento automático y una versión explícita anterior. Los límites son 64 por acción y 128 proyectiles manejados en vivo por lanzador. Empieza con poco.

Configura el botín en el editor del propio NPC. Los aspectos de objetos en construcciones son independientes del botín recogible.

## 5. Invocar una plantilla de NPC guardada

1. Guarda una plantilla con las herramientas del proveedor instalado, como DNPC.
2. Añade **Summon NPC** y elige **Summon source → NPC template**.
3. Abre el selector, busca y revisa la vista previa. Elige una plantilla real del servidor; escribir un ID de entidad no crea una plantilla.
4. Configura Group ID guards, Count 1 y el origen de aparición.
5. En Modifiers ajusta radio y duración; opcionalmente sustituye salud máxima y velocidad o hereda el objetivo.
6. Si quieres, conecta un Battlework File hijo existente relativo a mobs/patterns.
7. Añade **Dismiss Summons** para guards y prueba expiración, limpieza del padre y guardado/reinicio.

Una duración positiva expira tras los ticks indicados; 0 no tiene expiración temporal, pero sigue la limpieza gestionada. Propietario, grupo y expiración persisten con el mundo. Los límites son 32 por acción y 64 invocaciones vivas por padre. Evita cadenas ilimitadas de invocación.

**Solo antiguo:** las instalaciones CustomNPCs compatibles anteriores a 26.3 pueden elegir la fuente clone con pestaña/nombre reales. Esa fuente no está disponible desde 26.3.

## 6. Puerta eventos posteriores con condiciones

Las condiciones pueden inspeccionar los resultados de salud, fase, conteos, posiciones, estado y acción. Múltiples condiciones se combinan con AND.

Para el array **conditions de un evento**, esto comprueba que existe el anclaje:

```json
[
  {
    "type": "position_exists",
    "key": "blast_spot",
    "operator": "eq",
    "value": 1
  }
]
```

Este es un fragmento, no un archivo completo. La existencia de la posición es una comprobación booleana; el operador/valor se aplica principalmente a las condiciones de comparación numérica.

| Tipo | Finalidad |
| --- | --- |
| boss_health / target_health | Comparación de la proporción de salud |
| missing_boss_health | Ratio de falta de salud |
| summon_count / projectile_count | Cuenta en el grupo nombrado por clave |
| position_exists | Ancla existencia |
| Estado | Comparar un número de encuentro almacenado |
| action_succeeded / action_failed | Inspeccione un resultado de acción con nombre |
| skill_available | Disponibilidad del proveedor, no garantiza el éxito del reparto |
| target_distance / target_vertical | Distancia o altura |
| fase / on_ground / aleatorio | Fase, puesta a tierra o azar |

Los operadores numéricos son eq, neq, gt, gte, lt e lte. Salud 50% es 0.5. Negación invierte el resultado.

## 7. Números de estado y atributos NPC opcionales

**Set State** admite Establecer, Agregar, Multiplicar, Aleatorio y Borrar. Puede realizar un seguimiento de los cargos para un movimiento posterior. Este es el estado de encuentro, no los datos permanentes del reproductor o los datos almacenados CustomNPCs.

Avanzado `npcStats.enabled` puede aplicar máxima salud, velocidad de movimiento, velocidades específicas de fase, rango de seguimiento y regeneración de ralentí/combate. Está deshabilitado por defecto. Los valores de salud/velocidad/rango cero no aplican un nuevo valor de atributo; la regeneración cero no agrega curación automática.

Prepara los atributos base en DNPC o en el editor del actor compatible. Revisa npcStats si un jefe importado cambia su salud o velocidad.

## 8. Otras acciones de estatus y control

Sanar restaura el taumaturgo. Aplicar efectos a los objetivos Self u Target con un efecto registrado. La ignición pone un objetivo en llamas. Lanzar y controlar el movimiento de destino; Cancelar habilidad y cancelar Tether detienen sus actividades correspondientes.

Shield Punish puede solicitar el tiempo de reutilización o la destrucción de la funda de uso del escudo de vainilla compatible. No es la opción genérica de Parry. Prueba receptora, probabilidad y repeticiones en una configuración de práctica.

Después de cada adición, utilice el [secuencia de solución de problemas](#mob-editor/battleworks-troubleshooting).
