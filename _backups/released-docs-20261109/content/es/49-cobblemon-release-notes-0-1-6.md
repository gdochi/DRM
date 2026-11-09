---
title: Cobblemon Cambios en el editor 0.1.6
slug: cobblemon-editor-release-0-1-6
order: 490
description: Reglas de batalla, compatibilidad, editor y cambios en tiempo de ejecución en la versión 0.1.6.
product: drm-cobblemon-editor
category: Primeros pasos
section: overview
status: Estable
version: 0.1.6
audience: Creadores / Operadores
tags:
  - release
  - changelog
translationSource: en
translationMethod: assisted
hiddenNav: true
---


Esta página es un ** histórico 0.1.6 registro de cambios**. Para la instalación actual use [0.2.9 setup](#drm-cobblemon-editor/cobblemon-editor-setup); para los controles use [ Reglas de batalla](#drm-cobblemon-editor/cobblemon-battle-rules).

![La pantalla actual de configuración de batalla por ronda.](assets/media/guides/cobble-029-neo1211/cobble-battle-rules.png "La actual 0.2.9 / NeoForge 1.21.1 ilustra reglas comunes y redondas específicas. No es una captura de pantalla 0.1.6 archivada y puede contener controles posteriores.")

## De un vistazo

La versión 0.1.6 reorganiza la configuración de batalla en reglas comunes y por ronda y soporta Cobblemon 1.7.3 y 1.8.0 con un JAR. También agrega sonidos de batalla de entrenador y corrige listas de movimientos aprendebles, cumplimiento de elementos, evaluación de AI de movimiento extendido, estado del editor y navegación compartida DRM.

## Instalación en el momento de 0.1.6

- Minecraft 1.21.1, Java 21, Fabric Cargador 0.17.2+, Fabric API 0.116.6+1.21.1+
- Obligatorio: DRM Núcleo 0.1.9 +,  Cobblemon 1.7.3 por debajo 1.9.0, CustomNPCs Fabric 1.0.0
- Opcional por característica: CobbleDollars, RCT API 0.15.1-beta+, FTB Quests, Mega Showdown y otras integraciones compatibles
- JAR: `dochi_cobblemon_editor-0.1.6-fabric-1.21.1.jar`

RCT API sigue siendo opcional. Los fallos de ausencia o de llamada recaen en el límite del addon en lugar de hacer RCT una dependencia de tiempo de ejecución requerida. Reemplace el 0.1.6 JAR tanto en el servidor como en todos los clientes.

## Reglas de batalla redondas

- Reglas de batalla abiertas de `Rounds`, luego elija `Common Rules` o una ronda explícita de 1–16.
- Cada ronda puede heredar las reglas comunes o mantener una anulación independiente.
- Los formatos incluyen Individuales, Dobles, Triples y Duelo de plomo.
- Los modos de nivel incluyen niveles creados, promedio jugador-equipo más compensación y niveles fijos con alcance.
- Las reglas del ítem cubren el permiso de batalla/artículo retenido, una lista bloqueada con capacidad de búsqueda, límites de uso, turnos mínimos y límites de HP objetivo.
- Pokémon y las reglas mecánicas cubren restricciones legendarias, selección de clientes potenciales y permiso Mega/Tera/Dynamax.

Al hacer clic en una fila de catálogo de artículos, se bloquea inmediatamente o se permite. El servidor hace cumplir los objetos de batalla, revive y captura objetos antes del consumo; los jugadores creativos aún siguen los límites de uso. Lead Duel crea equipos de uno-Pokémon Singles sin eliminar los equipos creados.

El equipo de trucos de NPC y las reglas de batalla están separados. El equipo configura el NPC y el elemento clave de la ronda; la regla de batalla controla si la mecánica está permitida para ambos lados.

## Sonidos de batalla

Las batallas de entrenador pueden reproducir un sonido una vez por batalla en cada resto configurado.Pokémon Contar desde 1–6. Defina reglas comunes, luego deje que cada ronda las herede, las reemplace o las deshabilite. El editor proporciona búsqueda y vista previa de ID de sonido, volumen 0–4, tono 0.05–4 y una opción para detener el audio de batalla actual antes del nuevo sonido.

## Pokémon, AI y correcciones de editor

- Los selectores de movimientos solo muestran los movimientos aprendibles resueltos por el servidor para la especie, forma y aspectos seleccionados.
- Los conjuntos explícitos de uno a cuatro movimientos mantienen su conteo y orden exactos en vista previa y batalla.
- DRM La IA ahora evalúa el daño, el tipeo, STAB, múltiples objetivos y el daño del aliado para movimientos de propagación y objetivos automáticos como Terremoto y Rock Slide.
- Los borradores de inventario general/de batalla sobreviven a la búsqueda, la paginación y el cambio de tamaño; se corrigieron las etiquetas de movimientos largos, las vistas previas y los estados de botones de página.
- Las flechas hacia atrás y hacia delante compartidas y el desplazamiento ayudan ahora a usar el historial compartido y las API de la interfaz de usuario de DRM Core 0.1.9.

## Contratos de datos

- Esquema del entrenador JSON: `22`
- Pokemon Self JSON schema: `8`
- Esquema cerebral: `4`
- ID de mod interno y espacio de nombres de recursos: `cobble_npc`

Los datos JSON y NBT más antiguos compatibles se normalizan a los campos actuales. Respaldar `config/dochi_rpg_maker/cobblemon/` junto con el mundo antes de actualizar.
