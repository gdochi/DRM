---
title: Entidad Clone Library
slug: warfare-entity-clones
order: 380
description: Guardar y convocar plantillas del lado del servidor desinfectadas para CustomNPCs NPC y vehículos SuperbWarfare compatibles.
product: dochi-warfare
category: Herramientas del mundo
section: tools
status: Proyecto
version: 0.3.3
audience: Creadores de escenarios
tags:
  - clone
  - npc
  - vehicle
translationSource: en
translationMethod: assisted
---

## Qué es un clon

La Entidad Clone Library almacena plantillas JSON propiedad del servidor para dos dominios:

* DNPC o CustomNPCs PNJ con su configuración de DW actual
* Vehículos compatibles SuperbWarfare con datos nativos y ajustes de combate DW reutilizables

Esto es diferente de `Save As` en el NPC o el editor de vehículos. Un perfil de configuración copia la configuración en un destino existente; un clon de entidad crea una nueva entidad desinfectada.

![Entidad vacía Clone Library con NPC y filtros de vehículo.](assets/media/guides/warfare-031-neo1211/dw-clones.png "DW 0.3.1 / NeoForge 1.21.1. Una nueva configuración puede no tener entradas. Guardar con Clone en el editor de destino antes de seleccionarlo aquí y usar Summon.")

## Guardar una plantilla

1. Entra en el modo creativo.
2. Abra un vehículo CustomNPCs NPC o soportado SuperbWarfare con `DW Npc Core`.
3. Pulse `Clone` en la barra superior del editor.
4. Introduzca un nombre y confirme. Guardar el mismo nombre requiere una segunda confirmación de sobreescritura.

El servidor lee y desinfecta los datos de la entidad. La entidad bruta NBT nunca es aceptada por el cliente.

## Abrir y convocar

Haga clic con el botón derecho del ratón en `DW Npc Core` para abrir `Entity Clone Library`. Busque la biblioteca combinada, filtre por `NPC` o `Vehicle`, seleccione una plantilla y, a continuación, presione `Summon`.

El servidor valida el permiso Creative, la plantilla y los mods necesarios, y luego busca una posición cargada segura frente al jugador. Si falta la dependencia o no existe ningún espacio seguro cargado, la invocación se rechaza sin crear una entidad parcial.

La versión 0.2.9 también puede usar clones NPC desde la página del editor de vehículos `Crew`. Selecciona un asiento vacío en el mapa superior / lateral, presiona `Board NPC`, luego elige un clon de NPC servidor o una piedra de alma llena de NPC en el inventario del jugador. El servidor desinfecta un nuevo NPC y lo monta en el asiento exacto seleccionado; las facciones hostiles, los asientos cambiados y las piedras del alma inválidas son rechazadas.

## Lo que se desinfecta

Los clones conservan la apariencia reutilizable, el equipo, los datos de la entidad nativa y la configuración de combate DW, pero eliminan la identidad del mundo en vivo y el estado transitorio, como:

* UUID, posición, movimiento, rotación, pasajeros, correa e identidad del propietario
* Cerebro actual, ira, fuego, aire, caída y otros campos de tiempo de ejecución en vivo
* El propietario mercenario activo y los comandos de movimiento/retener-disparo
* Dueño del vehículo AI, hogar, destino ordenado y estado de posición de patrulla en vivo

Esto evita que un clon herede la identidad, propiedad o tarea del mundo actual de la entidad original.

## Almacenamiento

Las plantillas se almacenan en carpetas de servidor separadas:

```text
config/dochi_warfare/entity_clones/npc/
config/dochi_warfare/entity_clones/vehicle/
```

Tratar estos archivos como contenido del servidor. Utilice el flujo de trabajo en el juego `Clone` y `Summon` para la creación ordinaria para que la validación y desinfección del servidor permanezcan en efecto.

## Forge 0.3.1 Supresión y recuperación

Seleccione una entrada de NPC o vehículo, elija Eliminar y, a continuación, confirme el tipo y el ID que se muestran. Escapar o cancelar devoluciones sin eliminación. Las entidades ya creadas no se ven afectadas.

Los archivos se mueven a `config/dochi_warfare/entity_clones/.deleted/<type>-<UUID>/`. Para restaurar uno, primero asegúrese de que la carpeta original `npc` o `vehicle` no tiene ningún archivo con el mismo nombre y luego muévala hacia atrás. Las líneas de tiempo de DWE que hacen referencia a ese clon no se reescriben automáticamente.

El clon del vehículo y las características de la tripulación requieren DWE. Los nombres guardados actualmente permiten letras, dígitos, guiones bajos, puntos y guiones; otros caracteres se desinfectan para los guiones bajos. Seleccione el ID de clon real en las líneas de tiempo.
