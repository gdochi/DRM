---
title: Creación de un Spawner colocado
slug: dochi-spawn-control-spawner
order: 835
description: Crea JSON, configura objetivos ponderados, elige un modelo y aplica el documento a un generador colocado.
product: dochi-spawn-control
category: Editor
section: editor
status: Proyecto
version: 0.1.5
audience: Creadores spawner
tags:
  - spawner
  - editor
  - probability
translationSource: en
translationMethod: assisted
---

## Crear un documento y aplicarlo

`Spawner Editor` es un editor JSON orientado al creador. Puede crear documentos sin un generador instalado. La edición y la aplicación requieren modo creativo o nivel de permiso 2.

1. Haga clic con el botón derecho en el aire con DRM Core para abrir el selector del editor.
2. Elija `Spawner Editor` y, a continuación, cree un documento o cargue JSON existente.
3. Establezca el nombre y la lista de destino en `Spawn Target`.
4. Configure la activación, entidades por intento, límites y ubicación en `Conditions` y `Spawn Settings`.
5. Ajuste la destrucción, los efectos y la apariencia según sea necesario.
6. Utilice `Save As` para nombrar y guardar el documento. Use `Save` para ediciones posteriores a ese archivo.
7. Haga clic en `Get Spawner` para recibir un elemento de generación en blanco y colocarlo donde sea necesario.
8. Haga clic con el botón derecho en el generador colocado con DRM Core. Seleccione el archivo guardado en `Apply Spawner JSON` y haga clic en `Apply JSON`.

**Ahorrar JSON y aplicarlo al mundo son acciones separadas.** Un nuevo generador está inactivo hasta que se configura. Después de editar un documento, vuelva a aplicar el archivo guardado a cada reproductor que desee actualizar.

Los documentos se almacenan en el servidor en `config/dochi_rpg_maker/spawn_control/spawners/`. En un jugador, el directorio de juego de la instancia es la raíz; los documentos se comparten en todos sus mundos. Ver [Compartir y Operaciones](#dochi-spawn-control/dochi-spawn-control-presets-operations) para rutas y copias de seguridad.

![Una entrada zombie en Spawn Target.](assets/media/guides/spawn-control-014-neo1211/spawn-placed.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Entidades por activación 1 intenta una entidad. Oportunidad 1.0 es 100% porque es la única entrada. La colocación exitosa aún depende de las condiciones y el espacio disponible.")

## Diseño del editor

Selecciona una categoría en el panel izquierdo y edita los valores a la derecha. La ruta JSON es una etiqueta que identifica el documento actual. Utilice `Save As` para cambiar su destino.

| Categoría | Sumario |
| --- | --- |
| `Spawn Target` | Nombre, estado habilitado, entidad/lista de clones y posibilidades relativas |
| `Conditions` | Disparador, intervalo, jugadores, tiempo, clima, redstone y condiciones compartidas |
| `Spawn Settings` | Entidades por intento, límites de propiedad/vida útil, ubicación, terreno y luz |
| `Destruction` | Modo de cosecha o salud, salud, hitbox y caídas de objetos |
| `Effects` | Partículas de golpe, sonidos de golpe/rotura y barra de jefe de generador |
| `Appearance` | Modelo, escala, rotación, desplazamiento y vista previa |

Haga clic en un tipo o botón de modo para abrir un flyout y seleccione una opción directamente. Las listas largas admiten la búsqueda, la rueda del mouse y una barra de desplazamiento. Cancelar o Esc mantiene la selección anterior. `On/Off` Los controles son toggles.

## Lista de objetivos y posibilidades

Añade entradas, selecciona una fila y, a continuación, edita su destino y oportunidad. Elimine las entradas no utilizadas o establezca su probabilidad en `0`. Una lista puede contener hasta 64 entradas y necesita al menos una oportunidad positiva.

| Fuente | Objetivo |
| --- | --- |
| `Entity` | Un ID de entidad registrado en el servidor |
| `CNPC Clone` | Un clon de servidor guardado CustomNPCs, identificado por pestaña y nombre |
| `DW Clone` | Plantilla de clon de guerra de Dochi guardada |
| `NPC clone template` | Una plantilla exacta de clon v3 guardada en DNPC |

CNPC Clone solo está disponible en 1.20.1/1.21.1. En Minecraft 26.3, selecciona un DNPC guardado en NPC clone template. Las cantidades por función y el equipo de las escuadras de 0.1.5 pertenecen a las reglas naturales, por separado de esta lista de probabilidades.

Las fuentes de clonación requieren su mod correspondiente y el clon guardado. Los objetivos de entidad ordinarios no hacen que ninguno de los mods clonados sea una dependencia requerida.

Los valores de probabilidad son relativos a las otras entradas. Un valor más alto hace que ese objetivo sea más probable; no garantiza que la entrada más alta gane. El editor muestra el porcentaje efectivo calculado a partir del total.

| Entrada | Posibilidad de selección |
| --- | --- |
| Cerdo 70, vaca 30 | Cerdo 70%, vaca 30% |
| Cerdo 1, vaca 1 | 50% cada uno |
| Cerdo 10, vaca 0 | Cerdo solamente |

Establecer `Entities per activation` a `3` para intentar hasta tres entidades en una activación. Cada entidad se dibuja de forma independiente, por lo que las repeticiones son posibles. A 70:30 la lista no garantiza dos cerdos y una vaca. Los fallos de colocación y las tapas pueden reducir el número realmente generado.

`Maximum owned entities` limita la población total de propiedad del reproductor. `Total spawn limit` limita sus creaciones acumulativas; `0` significa ilimitado. Ambas tapas cubren toda la lista, no cada entrada por separado.

![Vista previa de la apariencia del modelo minecraft:spawner Block.](assets/media/guides/spawn-control-014-neo1211/spawn-appearance.png "Spawn Control 0.1.4 / NeoForge 1.21.1. El panel derecho previsualiza el cuerpo del generador, no la entidad que creará. La fuente del modelo, la escala, la rotación y el desplazamiento vertical están separados de Spawn Target.")

## Apariencia y vista previa

`Model source` en `Appearance` ofertas **Item, Entity, and Block**. La apariencia es independiente de la lista de reproducción: un generador en forma de bloque puede crear zombis.

Utilice `Choose` para seleccionar el ID del modelo y, a continuación, ajuste la escala, la rotación y el desplazamiento vertical. Configure los estados de bloque con `Block properties (JSON)` y modele los datos con `Model NBT (SNBT)`. Los clones de CNPC y DW son fuentes de aparición, no tipos de apariencia adicionales.

La vista previa se renderiza dentro del editor y no crea una entidad en el mundo. Mientras se resuelve un modelo modificado, conserva la última vista previa y las actualizaciones de la última solicitud.

Continúe con [ Condiciones y efectos del spawner](#dochi-spawn-control/dochi-spawn-control-spawner-settings).

Para los DNPC guardados, siga [plantilla de configuración](#dochi-spawn-control/spawn-control-npc-templates). Entity `dochi_npc:npc` crea un NPC predeterminado sin copiar la apariencia/equipo guardado. `CNPC Clone` se aplica a los objetivos más antiguos y se excluye en 26.3.
