---
title: MWENT adquisición de la tarjeta
slug: acquisition
order: 1545
description: Configure operaciones comerciales, botín de pecho, piscinas ponderadas y activación de perfil.
product: mwent
category: MWENT adquisición de la tarjeta
section: authoring
status: Guía
version: 0.1.6
audience: Creadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

## Abra el editor

Minigames **0.1.6 ** soporta tarjetas físicas y paquetes en ofertas de aldeanos/traders errantes y botín generado en el pecho. DRM es opcional.

1. Abre la configuración de Minigames y elige **Edit MWENT**.
2. Elija **General / Merchant trades / Chest rewards / Product pools** a la izquierda.
3. Seleccione una regla y edite sus valores en el medio.
4. Elige las cartas, los paquetes o los objetivos de la mesa de botín a la derecha.
5. Utilice la barra superior **Apply** para activar el borrador.

Mientras está conectado, edita la configuración del servidor con el nivel de operador 2. Fuera de un mundo, edita archivos locales de destino para la próxima puesta en marcha. Los selectores de elementos no están disponibles allí, pero los ID, valores y pesos existentes siguen siendo editables.

## Tipos de reglas

![Conmutador maestro de adquisición e interruptores comerciales/de pecho separados.](assets/media/guides/minigames-016-neo1211/mwent-acquisition-general.png "Minijuegos 0.1.6 / NeoForge 1.21.1. Habilitado es el interruptor maestro; los siguientes tres controlan a los aldeanos, los comerciantes errantes y los cofres naturales por separado. Borrador del servidor significa que las ediciones aún necesitan la barra superior Aplicar.")

| Categoría | Sumario |
| --- | --- |
| Comercios mercantiles | Profesión / nivel, piscina, elemento de pago, rango de precios, recuento, stock y experiencia |
| Botín de pecho | Incluye/excluye IDs de mesa de botín, pool, chance, rollos y conteo |
| Pozos de tarjetas | Tarjetas automáticas/opcionales, facciones, rareza, edición, tarjetas/paquetes explícitos ponderados y exclusiones |

El pago utiliza elementos físicos como esmeraldas, por separado de los pagos basados en la cuenta DRM/CobbleDollars. Los recolectores de tarjetas/exclusiones solo muestran tarjetas MWENT y no consumen artículos de inventario.

## Leer una regla de comerciante

Elija una regla en **Merchant trades**. Establece la profesión, el nivel, el grupo de productos y el elemento de pago en el medio. Los precios mínimos y máximos son cantidades de elementos de pago. **Items per offer** es la cantidad de producto recibida por operación.

![Profesión, rango de precios y cantidad de tarjetas de bibliotecario.](assets/media/guides/minigames-016-neo1211/mwent-acquisition-trades.png "Minijuegos 0.1.6 / NeoForge 1.21.1. En este ejemplo se utiliza el nivel de bibliotecario 2, un precio de 6–12, un producto por oferta y stock 12 antes de reponer existencias. Tarjetas, Packs y Excluidos a la derecha editan los productos y exclusiones explícitas del grupo.")

## Añadir una carta al botín de la mazmorra

1. Habilita la adquisición y el botín de pecho en General.
2. Agregar y habilitar una regla de Botín de pecho.
3. Elija un grupo, chance `0.2`, una tirada y cuente `1–1`.
4. Seleccione la tabla de botín `minecraft:chests/simple_dungeon` y Aplicar.
5. Revisa un cofre de mazmorra cuyo botín aún no se haya generado.

Esto agrega una carta o paquete seleccionado por el grupo con 20% de probabilidad por cofre elegible. Los cofres previamente abiertos no se vuelven a enrollar. Las pesas de la piscina eligen el producto; no establecen la probabilidad de pecho.

`minecraft:chests/village/*` apunta al botín del pueblo de vainilla. Los centros modificados Pokémon necesitan sus propios ID de tabla de botín. `minecraft:chests/` solo no es una coincidencia recursiva. El 18% por defecto de la regla de la carta del pueblo es por cofre elegible, no por pueblo.

![Edición de las mesas de botín.](assets/media/guides/minigames-016-neo1211/mwent-acquisition-chests.png "Minijuegos 0.1.6 / NeoForge 1.21.1. Las cartas de Exploración predeterminadas en la imagen usan 0.18, una tirada y un conteo 1–1. Establezca Chance per roll en 0.2 para el ejemplo 20% anterior. Los objetivos incluyen tablas; Excluded las elimina.")

## Elige los productos disponibles

Edite el grupo al que se hace referencia por operaciones y cofres en **Product pools**. **Card edition**, **Rarity filter** y **Faction filter** restringen las tarjetas disponibles. Utilice tarjetas y paquetes a la derecha para entradas explícitas. La edición de un grupo afecta a todas las reglas que utilizan ese grupo.

![Tarjetas automáticas, integraciones, edición y filtros en tarjetas estándar.](assets/media/guides/minigames-016-neo1211/mwent-acquisition-pools.png "Minijuegos 0.1.6 / NeoForge 1.21.1. Una piscina elige los productos disponibles. Las recompensas de pecho deciden por separado la probabilidad y el número de rollos de ese grupo.")

## Perfiles versus activación

Archivos en vivo bajo `config/dochi_minigames/`.

- `acquisition.json`: configuración de adquisición activa
- `acquisition_profiles/<name>.json`: perfil de regla completa guardado

| Medidas adoptadas | Significado |
| --- | --- |
| Cargar / Guardar / Save As | Cargar un borrador o conservar un perfil |
| Aplicar | Validar y almacenar la política activa |
| Cancelar / Esc | Descartar el borrador no aplicado del editor |

El perfil incluido `default.json` se instala solo cuando falta. Guardar perfiles personalizados bajo un nombre diferente. Cargar o guardar un perfil no lo activa.

Para editar archivos externos, use `/minigame acquisition reload`. Ordinary `/reload` no vuelve a leer esta configuración. Las ediciones no válidas conservan la última política de trabajo. **En 26.3, los cambios en la definición del comercio nativo, incluyendo los precios, las acciones, las profesiones y las nuevas reglas, requieren una reconexión mundial o un reinicio del servidor.**

Las operaciones existentes y las partidas concedidas permanecen sin cambios. Las nuevas ofertas se unen a los grupos de candidatos existentes y no están garantizadas en todos los comerciantes. Los ajustes de adquisición no crean estructuras o cofres. La concesión de una tarjeta física no la registra simultáneamente en el almacenamiento de la tarjeta.
