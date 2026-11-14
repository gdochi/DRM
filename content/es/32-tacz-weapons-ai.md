---
title: Armas, postura y IA táctica
slug: warfare-weapons-ai
order: 330
description: Cómo configurar la postura del arma de fuego, el movimiento, la conciencia, las piscinas de armas y el retroceso cuerpo a cuerpo.
product: dochi-warfare
category: Combat AI
section: combat-ai
status: Proyecto
version: 0.3.3
audience: Creadores de PNJ con armas de fuego
tags:
  - weapon
  - stance
  - ai
translationSource: en
translationMethod: assisted
---

## Elige un arma, luego su comportamiento de combate

Ponga el arma de fuego prevista en el inventario del jugador **** primero. En **Gun**, haga clic en su icono para agregarlo a la lista inferior de armas y a la vista previa de NPC a la derecha. Las pantallas usan **DW 0.3.1, DNPC 0.1.3 and NeoForge 1.21.1**.

![M4A1 seleccionado del inventario del jugador; la entrada de arma única tiene 100% de probabilidad.](assets/media/guides/warfare-031-neo1211/dw-gun.png "Esto muestra la selección de armas y la vista previa. Guardar en el NPC antes de probar el fuego real. Los candidatos a múltiples armas deben sumar 100%.")

![Sentidos que muestran el modo de posición, conciencia y modo de combate.](assets/media/guides/warfare-031-neo1211/dw-senses.png "Vista rápida a la derecha navega por la página de sentidos largos. La conciencia controla la adquisición; El modo de combate controla el comportamiento a distancia / cuerpo a cuerpo.")

![Detecta los modos de fuego, el fuego represivo y el comportamiento táctico.](assets/media/guides/warfare-031-neo1211/dw-fire.png "No hay ninguna pestaña de Fuego separada. Uso de los sentidos → Vista rápida → Modos de disparo. Encuentra tasa y precisión bajo tasa de fuego en la misma lista.")

## Modos de posición

`Stance` decide qué forma de combate debe usar el NPC administrado.

| Posición | Comportamiento |
| --- | --- |
| `Idle` | Detenga el combate en el puente y guarde las armas administradas. |
| `Ranged` | Utilice el TACZ, PointBlank o SuperbWarfare arma a distancia solamente. |
| `Melee` | Usa solo el arma cuerpo a cuerpo almacenada. |
| `Auto` | Intercambia entre distancia y cuerpo a cuerpo basado en la distancia. El arma a distancia permanece visible durante la inactividad. |
| `Auto Hidden` | Intercambia durante el combate, pero mantén las manos vacías fuera del combate. |

`Stance Mode: General` utiliza la configuración de postura normal. `Stance Mode: Advanced` aplica una regla condicional como `Always`, salud por debajo de una proporción, entidad objetivo, facción objetivo o etiqueta objetivo. `Always` y la condición de salud del NPC se puede evaluar sin un objetivo de combate actual; solo la entidad objetivo, la facción y las condiciones de etiqueta requieren un objetivo vivo. El modo avanzado intencionalmente tiene una regla activa para evitar comportamientos conflictivos.

## Ajustes de fuego

| Configuración | Significado práctico |
| --- | --- |
| `Max Distance` | Distancia máxima objetivo para el fuego controlado a distancia. Los objetivos más allá de esto son ignorados por el complemento. |
| `Melee Switch Range` | Distancia donde `Auto` la postura cambia a cuerpo a cuerpo. Alcance de golpe real todavía viene de CustomNPCs comportamiento cuerpo a cuerpo. |
| `RPM Mode` | Elija exactamente una fuente: `TACZ Native`, `Fixed` o `Random Range`. Solo se muestran los valores utilizados por ese modo. |
| `Fixed RPM` | Tasa de tiro objetivo fija utilizada por `RPM Mode: Fixed`. |
| `RPM Min` y `RPM Max` | Alcance objetivo de la tasa de fuego utilizado por `RPM Mode: Random Range`. |
| `Fixed Accuracy %` | La precisión se usa continuamente mientras `Accuracy Ramp` está deshabilitado. `100` no añade ningún error de objetivo adicional. |
| `Ramp Start Accuracy %` | Precisión de inicio mientras `Accuracy Ramp` está habilitado. |
| `Ramp Max Accuracy %` | Máxima precisión después del seguimiento elegible. Debe ser mayor que el valor inicial. |
| `Ramp Time Ms` | Tiempo de seguimiento elegible acumulado necesario para alcanzar la máxima precisión. |
| `Ramp Max Range` | Distancia máxima donde el progreso de la rampa puede acumularse. |
| `Min Target Speed` | Velocidad mínima del jugador horizontal necesaria para avanzar la rampa. |
| `Burst Minimum Shots` / `Burst Maximum Shots` | Selecciona un nuevo recuento de disparos incluido para cada ráfaga configurada. Los valores iguales crean ráfagas de longitud fija. |

`Accuracy Ramp` progresa solo mientras el objetivo visible es un jugador en movimiento dentro del rango configurado y por encima de la velocidad mínima. El progreso se detiene mientras el jugador está parado o fuera de rango, y luego se restablece cuando cambia el perfil general/avanzado objetivo o activo. General y Avanzado pueden usar ajustes de rampa independientes. En 0.2.9, las RPM nativas y fijas se reconcilian con la cadencia soportada del arma operada; TACZ los disparos también usan una programación más fina para reducir la cuantificación de ticks visibles 50 ms a altas RPM.

Comience con `RPM Mode: TACZ Native` y precisión fija. Agregue RPM aleatorios, rangos de ráfaga y aumento gradual de precisión de uno en uno después de que el arma, el objetivo, la línea de visión y el bucle de munición estén funcionando.

## Políticas de daños

La versión 0.2.0 permite a cada NPC elegir cómo se calcula el daño de arma de fuego y cuerpo a cuerpo.

| Ubicación | Política |
| --- | --- |
| `Gun` | `Gun Spec` mantiene el comportamiento de daño nativo del arma operada. `Custom` aplica la anulación de daño DW compatible sin cambiar los datos originales del arma. |
| `Melee` | `Weapon Spec` utiliza los atributos de ataque del elemento seleccionado. `Custom` usa daño cuerpo a cuerpo fijo. |
| `Melee` | La velocidad de Knockback y ataque puede usar independientemente atributos de arma o valores personalizados fijos. La velocidad de ataque personalizada se mide en ataques por segundo. |

CustomNPCs El daño cuerpo a cuerpo predeterminado no anula estas políticas de cuerpo a cuerpo administradas. Confirme primero el comportamiento nativo del arma y, a continuación, agregue valores personalizados.

## Mejor compatibilidad de combate

La versión 0.2.1 añade una conmutación por NPC `Better Combat Compatibility` debajo de `Melee`. Por defecto, se activa cuando Better Combat está instalado y no se puede usar cuando Better Combat está ausente.

Cuando está activado, el PNJ resuelve el conjunto de ataque Better Combat y la pose de arma registrada para el objeto retenido. El orden combinado, las condiciones de ataque, las condiciones de dos manos o fuera de juego y las transformaciones de objetos siguen los datos de armas registrados. Los intervalos de ataque y el tiempo de daño usan el efectivo del elemento retenido `ATTACK_SPEED`. La política de velocidad de ataque cuerpo a cuerpo se muestra como `Weapon Spec (locked)`, y una velocidad de ataque personalizada no se aplica hasta que esta palanca de compatibilidad esté desactivada.

La reproducción de movimiento NPC Exact Better Combat en el cliente requiere tanto Better Combat como Player Animator. Si la criatura Player Animator está ausente o el movimiento del arma registrado no se puede reproducir, el complemento no crea un movimiento de imitación; utiliza un columpio de mano principal de vainilla.

## Movimiento táctico

`Tactical Move` controla cómo el addon dirige el movimiento de combate a distancia:

| Modo | Caso de uso |
| --- | --- |
| `Hold` | Guardias estáticos, torretas, francotiradores, fases jefe escenificadas. |
| `Spread` | Escuadrones que deberían separarse de los aliados cercanos. |
| `Compact` | Escuadrones que se reagrupan en lugar de dispersarse. |
| `Advance` | Asalto NPCs que presionan hacia el objetivo. |
| `Retreat` | NPCs defensivos que abren la distancia. |

`Engagement` añade el comportamiento de la distancia objetivo. `Hold` no se reposiciona para la distancia, `Advance` se acerca hasta `Approach Distance`, y `Retreat` retrocede hasta `Retreat Distance`.

Los interruptores de movimiento útiles incluyen `Move While Firing`, `Retreat Fire` y `Keep Distance Fire`. `Keep Distance Fire` trata de mantener un rango preferido, pero es solo a distancia y bloquea el cambio cuerpo a cuerpo.

`Reposition Minimum Ms` y `Reposition Maximum Ms` controlan cuánto tiempo un plan de movimiento táctico permanece activo antes de que el NPC lo reconsidere. Se selecciona una nueva duración entre esos valores para cada plan. General y Avanzado pueden usar diferentes rangos.

`Suppressive Fire` es diferente del seguimiento de objetivos. Después de que la línea de visión se pierde durante el combate, puede disparar balas reales TACZ solo en la última posición que el NPC realmente vio, para el configurado `Suppression Time Ms`. No sigue la posición actual del objetivo oculto y aún consume municiones a través del estado normal del arma. `Post-Fire Watch Ms` mantiene al NPC apuntando a ese punto después de que el disparo se detiene sin gastar más munición.

## Conciencia y control inactivo

Utilice la configuración de conciencia para decidir cuándo el NPC puede entrar en combate:

| Configuración | Significado |
| --- | --- |
| `Detect Distance` | Bloques donde los NPC inactivos detectan primero un objetivo visible. Esto no es lo mismo que el campo de tiro. |
| `Detect Angle` | Cono de detección horizontal. `360` permite la detección completa. |
| `Combat Delay Ms` | Tiempo que el NPC observa un objetivo detectado antes del combate confirmado. |
| `Instant Combat Angle` | Cono frontal que puede saltarse el retraso y entrar en combate inmediatamente. |
| `Close Detection` | Permite que los objetivos dentro de `Close Detect Distance` eviten el ángulo de detección horizontal. Desactivarlo para puñaladas o NPC de estilo asesinato. |

`Sound Detection` usa un sistema de estímulo para disparos administrados, recargas, sonidos de bloqueo, sonidos de entidad y sonidos de mundo solo de posición. Los jugadores creativos y de supervivencia se manejan de manera consistente; los objetivos de los espectadores permanecen excluidos. La investigación puede ser `Off`, `Look Only` o `Move To Source`. El combate activo tiene prioridad, y una postura bloqueada vuelve a mirar en lugar de abandonar su puesto.

`Faction Defense` permite que un PNJ administrado por DW dañado alerte a los aliados administrados por la misma facción dentro `Faction Alert Radius`. Un aliado de asistencia puede moverse para ayudar antes de ver al atacante, pero aún necesita la línea de visión final antes de disparar. La tolerancia al golpe del propietario de mercenarios y la validación de objetivos amistosos permanecen vigentes, por lo que la defensa de facciones no pasa por alto las reglas del contrato o del objetivo.

El movimiento inactivo tiene cuatro modos: `Stationary`, `Area Patrol`, `Return Only` y `Route Patrol`. Las patrullas de área y ruta usan la GUI `Default Walk Speed` y mantienen activa una ruta A válida. No reemplazan la búsqueda de caminos fallidos con el movimiento directo hacia una pared; los puntos inalcanzables se vuelven a intentar dentro de un límite limitado y luego se saltan. Las coordenadas de patrulla se resuelven en un terreno cercano, y los controles de llegada incluyen la distancia vertical para los puntos de referencia más bajos de un bloque.

## Armas no combativas

`Non-Combat Weapon Pose` controla cómo un PNJ tiene un arma a distancia fuera del combate.

| Pose | Comportamiento |
| --- | --- |
| `TACZ Default (Custom Off)` | Deshabilita la pose inactiva personalizada y deja la presentación en TACZ. |
| `Low Ready` | Sostiene el arma en una posición lista baja. |
| `High Ready` | Sostiene el arma en una posición lista levantada. |
| `Aim Ready` | Mantiene una postura de puntería fuera del combate. |
| `Custom Pose` | Utiliza una pose JSON guardada con `DW Pose Core`. |

Low Ready y High Ready permanecen activos mientras están de pie, patrullando el área / ruta o regresando a casa. Con la asignación de acción predeterminada, ceden a TACZ el comportamiento de apuntar, disparar y recargar cuando se detecta un objetivo o comienza el combate. Utilice la categoría `Pose` para una asignación por acción más fina.

## Piscinas de armas y apariencia

`Gun` lee las pilas de armas soportadas TACZ, PointBlank y SuperbWarfare del inventario del jugador. El arma seleccionada se puede guardar directamente, o se pueden agregar múltiples armas compatibles a un grupo de armas aleatorias. Las tiradas de grupo pueden ocurrir en CustomNPCs eventos de inicio como reaparecer, inicialización de carga de fragmentos, restauración de clon o restauración de piedra del alma.

TACZ siempre es la línea base de la postura y la animación. Los adaptadores opcionales mantienen la renderización de elementos nativos del arma externa, el proyectil o el escaneo de impactos, los sonidos, las fases de recarga y la mecánica intrínseca. PointBlank soporta puentes separados 1.11.1 y 2.1.0; SuperbWarfare el soporte está anclado a la construcción final 0.8.9 verificada. Las armas de fuego especial o cuerpo a cuerpo no soportadas fallan cerradas.

`Melee` lee artículos no-TACZ del inventario del jugador. La integración de Better Combat no guarda un ID de animación de reemplazo. En el momento del ataque, resuelve el conjunto de ataque y posa realmente registrado para el arma retenida. El soporte de ataque cuerpo a cuerpo con la mano vacía también está disponible para configuraciones con capacidad cuerpo a cuerpo.

`Visual & FX` almacena cada aspecto ponderado DNPC o CustomNPCs como una ruta de textura local o una URL HTTP/HTTPS, además de un modelo explícito `Steve` o `Alex`, superposiciones y ajustes de capa. No altera la textura suministrada. `Armor` almacena conjuntos completos en ranuras reales para la cabeza, el pecho, las piernas y los pies. Las vistas previas de Pistola, Cuerpo a cuerpo y Armadura muestran el modelo, la piel, la armadura y el arma seleccionados juntos.

La versión 0.2.1 muestra los campos de probabilidad directamente en las filas de armas, pieles y armaduras. La edición de una oportunidad no redistribuye las otras entradas, y un grupo de entradas múltiples debe totalizar `100%` antes de guardar. `Equalize` redistribuye entradas solo cuando se presiona, mientras que un grupo de una entrada permanece en `100%`. El fondo de armadura muestra hasta cinco filas a la vez; use la rueda del ratón o su barra de desplazamiento interna para las entradas restantes.

## Orden de equilibrio

1. Confirmar `Ranged` o `Auto` postura con un arma.
2. Sintonizar `Max Distance` y comportamiento de línea de visión.
3. Ajuste la precisión fija y `RPM Mode: TACZ Native`.
4. Ajusta las políticas de armas de fuego y daños cuerpo a cuerpo.
5. Sumar `Move While Firing` o movimiento táctico.
6. Añadir cambio cuerpo a cuerpo y fallback de munición vacía.
7. Añade grupos aleatorios de armas, piel y armaduras.
8. Agregue rangos de ráfaga, aumento de precisión y temporización de reposición aleatoria solo después de que el comportamiento normal sea estable.
9. Añada reglas de postura avanzadas.
10. Agregue fuego supresor y cobertura experimental al final, después de que se confirme el movimiento ordinario y el comportamiento de la línea de visión.

## Aplicar un grupo de skins DNPC

Los grupos de skins DNPC aplican la textura y el modelo Steve/Alex seleccionados. Activa **Init Event** y configura candidatos y probabilidades para elegir al crear/cargar la entidad. Si está desactivado o el grupo está vacío, conserva la apariencia actual. Los ticks de combate y guardar ajustes no vuelven a sortearla.
