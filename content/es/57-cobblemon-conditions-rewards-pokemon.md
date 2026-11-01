---
title: Condiciones, después de las acciones y Pokémon en sí
slug: cobblemon-conditions-rewards-pokemon
order: 522
description: Comprenda las condiciones redondas, las acciones posteriores basadas en resultados, el comportamiento de reintento y Pokemon mismo.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Proyecto
version: Fabric / NeoForge 0.2.9
audience: Creadores que construyen batallas condicionales y Pokémon NPCs
tags:
  - conditions
  - rewards
  - pokemon-itself
translationSource: en
translationMethod: assisted
---

## Seleccione la ronda antes de condiciones o recompensas

En **Battle Config → Conditions**, compruebe el número de ronda encima de la lista y, a continuación, utilice **Add**. **All (AND)** requiere cada condición en el grupo.

![Ronda 1 Condiciones y todos Y.](assets/media/guides/cobble-029-neo1211/cobble-conditions.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1, Inglés UI. Vuelva a comprobar Edición después de cambiar de ronda.")

![Después de Acciones con modo Acción y Ejecutar política.](assets/media/guides/cobble-029-neo1211/cobble-after-actions.png "El modo de acción controla el orden de ejecución; Ejecutar política controla la repetición. Para recompensas después de la conversación, cambie el valor predeterminado Todo a Secuencial y coloque recompensas después del diálogo.")

## Diálogo secuencial y recompensas

Establezca el Modo de Acción del Editor del Entrenador en Secuencial para esperar a que se complete el diálogo antes de las recompensas posteriores. Cada ronda permite un diálogo. Cancelación o desconexión se detiene más tarde concede; después de volver a conectar o reiniciar, interactuar con el NPC de nuevo para continuar las acciones restantes. Vean el [pasos de configuración](#drm-cobblemon-editor/cobblemon-trainer-editor).

## Cuando las condiciones corren

Una ronda soporta hasta 32 condiciones. Un grupo vacío pasa. `AND` requiere cada condición, mientras que `OR` requiere al menos una.

El servidor evalúa las condiciones mientras adquiere un objetivo automático y nuevamente inmediatamente antes de que comience la batalla real. Por lo tanto, los elementos o etiquetas modificados durante la reproducción de la presentación pueden cancelar el inicio.

## Comportamiento de condición exacta

| Tipo | Clave | Valor | Operaciones |
| --- | --- | --- | --- |
| `tag` | Marcador tag | No utilizado | `has`, `not` |
| `item` | Id. de artículo | Cantidad | `has`, `not`, `>=`, `<=`, `==`, `!=`, `>`, `<`; cuenta los artículos coincidentes en todo el inventario |
| `stored` | clave de datos almacenados | Valor de comparación | Comparación numérica si ambos valores se analizan como números, de lo contrario string `==` o `!=` |
| `advancement` | ID de avance | No utilizado | `has`, `not` basado en la finalización |
| `cobblemon_party` | Especies | Cantidad | Cuenta la especie en el equipo activo; `cobblemon:` puede omitirse |

Elemento `has` significa al menos uno y `not` significa cero. Item NBT no forma parte de este recuento de condiciones del entrenador.

:::note Valores almacenados
`stored` apunta al tiempo de ejecución de datos almacenados CustomNPCs orientado a scripting utilizado por DRM soporte de diálogo. No es un lector de ruta JSON arbitrario.
:::

## Orden de selección después de la acción

Una ronda soporta hasta 32 después de las acciones. Cada acción puede ejecutarse en `win`, `loss`, `flee` o `battle_end`; las acciones que comparten un resultado coincidente pueden ejecutarse juntas.

1. Revisa la Política de Subvenciones contra el progreso del jugador.
2. Lanza la oportunidad de cada recompensa de forma independiente.
3. `All` ejecuta cada recompensa elegible; `One random` elige una recompensa elegible.
4. Si al menos una recompensa tiene éxito, registre la ronda como recompensa cuando la política necesite ese estado.

| Política | Comportamiento |
| --- | --- |
| `Every clear` | Intenta hacer coincidir las acciones después de cada resultado de batalla |
| `First clear only` | Solo mientras el recuento de borrados de NPC es cero |
| `Once per round` | Un récord de subvención exitoso por ronda |

La probabilidad varía de 0.0 a 1.0. En `One random`, solo las entradas que pasaron Chance participan en la selección.

## Tras la ejecución de la acción

| Tipo | Operaciones | Comportamiento del servidor |
| --- | --- | --- |
| `item` | `give`, `take` | Cantidad 1–6400. `take` es transaccional y no elimina nada a menos que exista la cantidad total. El desbordamiento de `give` cae sobre el jugador. |
| `tag` | `add`, `remove` | Cambia las etiquetas del marcador. |
| `stored` | `set`, `add`, `subtract`, `remove` | Establece una cadena, realiza cambios numéricos o elimina la clave almacenada. |
| `command` | `run` | Se ejecuta en silencio en el nivel de permiso del servidor 4; las barras principales se eliminan. |
| `advancement` | `grant`, `revoke` | Cambia solo el avance nombrado. |
| `currency` | `add`, `take`, `set` | Cambia el balance seleccionado DRM o CobbleDollars. Las cantidades no válidas o negativas fallan; se permite cero para `set`. CobbleDollars requiere su proveedor opcional. |
| `cobblemon_give` | `give` | Crea la especie seleccionada en el nivel 1–100 y la agrega al equipo activo. |
| `ftb_complete_quest` / `ftb_complete_task` | `complete` | Completa la misión o tarea FTB seleccionada cuando se instalan misiones FTB. |
| `npc_hide` / `npc_despawn` | — | Oculta o elimina el NPC después de que las acciones ordinarias tengan éxito. |

Los comandos soportan `{player}`, `{uuid}`, `{npc}` y `{battle}` reemplazos. Pruebe cada comando en un servidor de prueba porque se ejecuta con autoridad de servidor elevada.

## Filas de condiciones prácticas

| Objetivo | Tipo | Funcionamiento | Clave | Valor |
| --- | --- | --- | --- | --- |
| Requerir una etiqueta insignia | `tag` | `has` | `badge_boulder` | En blanco |
| Requerir 16 esmeraldas | `item` | `>=` | `minecraft:emerald` | `16` |
| Pikachu en el equipo | `cobblemon_party` | `>=` | `cobblemon:pikachu` | `1` |
| Requiere un avance inacabado | `advancement` | `not` | ID de avance | En blanco |

Los grupos son planos. Para representar `(A AND B) OR C`, calcule previamente una etiqueta o valor almacenado en lugar de esperar grupos anidados.

## Pokemon mismo comportamiento

Pokemon usa un Pokémon completo por ronda en lugar de un equipo de entrenadores. Soporta las mismas condiciones redondas y después de acciones basadas en resultados; los controles de IA, inventario y trucos solo para entrenadores están deshabilitados.

- El tiempo de ejecución es una batalla PVE de un solo oponente Cobblemon.
- La presentación por defecto es `presets/vs_pokemon.json`.
- Las especies, la forma, los aspectos, el estado brillante, el nivel, la naturaleza, la habilidad, los movimientos, la pelota y el elemento retenido definen al oponente.
- Apariencia Escala es 0.05–12.0; Pose predeterminados a `AUTO`; animación en blanco utiliza el estado automático.
- `Shiny` es Pokémon datos, mientras que `Shining` es un destacado NPC-render separado.

La aplicación de Pokemon en sí también deriva la apariencia CustomNPCs Pokémon de especies más formas/aspectos. Mantenga los cambios finales de aspecto en el documento de Pokemon mismo para que una nueva aplicación posterior no restaure inesperadamente los valores anteriores.

## Secuencia de compilación recomendada

1. Cambia solo especies y nivel en el valor predeterminado y verifica la creación de batallas.
2. Agregue Forma y Aspectos, luego compare el modelo mundial y el modelo de batalla.
3. Bloquear la naturaleza, la habilidad, los movimientos y el objeto retenido.
4. Tune Scale, Pose, Animación y Brillante.
5. Asignar una presentación personalizada y guardar. Un seguimiento de NPC que la ruta de origen normalmente no necesita volver a aplicar.

## Moneda después de las acciones

Para `currency`, elija DRM moneda o CobbleDollars y una operación: `add`, `take` o `set`. `set` reemplaza el equilibrio y puede establecerlo en cero. Cantidades no válidas/negativas y proveedores no disponibles fallan. CobbleDollars es opcional y sus recompensas no pueden ejecutarse sin el proveedor.

## Recompensas y pérdidas de artículos personalizados

Abrir después de las acciones → Elemento → Buscar y, a continuación, elija Elementos o Mi inventario. Copiar conserva nombres, tradiciones, encantamientos, daños y datos personalizados sin consumir la pila original. La cantidad del premio proviene de la acción. Borrar los datos del elemento guardado elimina los componentes a la vez que conserva el ID y la cantidad del elemento.

La eliminación consciente de componentes coincide con el ID y los componentes y no consume parcialmente un total insuficiente. El campo opcional JSON es itemComponentsSnbt. Una derrota confirmada del entrenador después de la pérdida del jugador es huir; una derrota ordinaria sigue siendo pérdida. Configure sus disparadores de recompensa por separado.

## Diálogo posterior a la batalla DRM

Elija **Open dialogue after battle** en Después de acciones y busque un conjunto de diálogos. Configure las condiciones de resultado, probabilidad y repetición como con otras acciones. DNPC Los entrenadores apoyan este camino después de los bloqueos de batalla y el final de manejo de retorno. El diálogo no necesita `go_battle`. Las acciones no ejecutadas utilizan el flujo de trabajo existente de almacenamiento y reintento de acciones pendientes.
