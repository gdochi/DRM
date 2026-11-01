---
title: 0.1.5 — Sinergia y adiciones de asedio
slug: version-0-1-5
order: 1590
description: 72 nuevas tarjetas de espacio de trabajo, mecánicas y especificaciones añadidas.
product: mwent
category: Facciones y tarjetas
section: releases
status: Referencia de especificación
version: 0.1.5
audience: Jugadores / creadores
translationSource: en
translationMethod: assisted
---

## Histórico 0.1.5 Línea base del espacio de trabajo

Basado en las fuentes independientes Minecraft 26.3 Fabric / NeoForge y producción 0.1.5 JAR en octubre 30, 2026. Esto es independiente del historial de carga de [CurseForge](#mwent/releases).

Las definiciones incorporadas aumentan **263 → 335 **, las definiciones opcionales permanecen **89** y el total aumenta **352 → 424 **. Impresiones regulares y animadas totales 848. El poder existente, las provisiones, los marcos, las rarezas y las definiciones heredadas de implementación, orden y palabras clave permanecen intactas. Los identificadores añadidos son 1700– 1759 y 1800 – 1811.

## Añadida mecánica

![Editor de habilidades de tarjetas personalizadas con condiciones, objetivos y operaciones.](assets/media/guides/minigames-015-neo1211/minigames-card-abilities.png "Minijuegos reales 0.1.5 / NeoForge 1.21.1 pantalla de habilidad. Los mecanismos a continuación se relacionan con estos controles de autoría. Guardar una definición está separado de otorgar la propiedad.")

Para construir una tarjeta, comience con [custom-card authoring](#mwent/authoring). Para el comportamiento táctico de apertura actual, continúe con [0.1.6](#mwent/version-0-1-6).

- Los escenarios avanzan capítulos a través de jugadas clasificatorias, las ubicaciones ofrecen órdenes persistentes y las trampas proporcionan reacciones ocultas. Ocupan enchufes sin agregar puntos unitarios.
- Velo, Inmunidad, Ruptura, Infusión, Resiliencia, contadores, temporizadores y evolución redonda son apoyados.
- Las operaciones añadidas incluyen elegir cartas creadas, jugar desde el mazo/cementerio, recordar/repetir, aumentar manos/mazos, cambios de potencia base, duelo/choque y reactivar Deathwish/Despliegue.
- Las condiciones cubren las cubiertas iniciales, el tamaño de la mano, la potencia más alta, la potencia de los tres primeros y el gasto de suministro, junto con los costos opcionales y cuatro bonos de apertura.
- El editor de tarjetas personalizadas expone estas habilidades, condiciones, objetivos, operaciones y costos. El ahorro no otorga tarjetas propias.

## Sesenta nuevas tarjetas de facción

Se añaden diez cartas por facción. Estas tablas resumen la potencia almacenada real, las provisiones y las habilidades.

En el móvil, desplácese dentro de la tabla horizontalmente para leer la columna de capacidad.

### Imperio Volkar

| Tarjeta y primera versión | Poder / provisiones | Marco y rareza | Resumen de habilidades |
| --- | --- | --- | --- |
| Volkar Founding Chronicle (card_1700) · 0.1.5 | — / 10 | Oro · Legendario | Escenario; Progreso: Constructo de Ally Played; Condenado; Despliegue · Tablero de la Unidad Todo · Objetivo: Invocar una ficha con poder 2  # 0 · por turno 1; Capítulo 1: Tablero de la Unidad Todo · Objetivo: Armadura 2 · por turno 1; Capítulo 2: Tablero de la Unidad Todo · Objetivo: Rearm 2 · por turno 1 |
| Volkar Field Workshop (card_1701) · 0.1.5 | — / 7 | Oro · Épico | Ubicación; Resiliencia; Desplegar · Junta de la Unidad de Aliados Todos · Objetivo: Armadura 1 · por turno 1; Orden · Junta de la Unidad Personal Todos · Objetivo: Generar en la mano 0 · por turno 1 |
| Volkar Hidden Snare (card_1702) · 0.1.5 | — / 4 | Bronce · Raros | Trampa; Revelar: Unidad enemiga jugada; Reacción de trampa · Junta de unidad enemiga Potencia máxima · Objetivo: Daño 3 · por turno 1 |
| Volkar Signal Keeper (card_1703) · 0.1.5 | 4 / 5 | Bronce · Raros | Contador 2; Temporizador 2; Turn End · Self Unit Board All · Objetivo: Reducir el contador 1 · por turno 1; El contador llega a cero · Self Unit Board All · Objetivo: Escudo 1 · por turno 1; El temporizador expira · Self Unit Board All · Objetivo: Boost 2 · por turno 1 |
| Volkar Unexpected Ally (card_1704) · 0.1.5 | 4 / 5 | Bronce · Raros | Ally Played · si la carta de activación tiene la categoría Construct · Self Unit Board All · Target: Armor 1 · por turno 1 |
| Volkar Sworn Vanguard (card_1705) · 0.1.5 | 4 / 5 | Bronce · Raros | Despliegue · si el mazo de salida no contiene neutrales · Self Unit Board Todos · Objetivo: Aumentar las unidades en la cubierta 1 · por turno 1; Gire el extremo · Tamaño de la mano ≤ 3 · Self Unit Board Todos · Objetivo: Boost 1 · por turno 1 |
| Volkar Challenge Bearer (card_1706) · 0.1.5 | 4 / 5 | Bronce · Raros | Despliegue · Junta de la unidad enemiga Elija · Objetivo: Choque · por turno 1; Golpe mortal · Junta de la unidad Todos · Objetivo: Aumento 2 · por turno 1 |
| Volkar Unwritten Possibilities (card_1707) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Self Unit Board Todos · Objetivo: Crear y jugar una de hasta tres opciones que cuestan como máximo 5 · por turno 1 |
| Volkar Shared Instinct (card_1708) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Tablero de la Unidad de Aliados Elegir · Objetivo: Infundir habilidades y categorías 1704 · por turno 1 |
| Volkar Relic Breaker (card_1709) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Tablero de artefactos enemigos Elegir · Objetivo: Destruir artefacto · por turno 1 |

### Avalin

| Tarjeta y primera versión | Poder / provisiones | Marco y rareza | Resumen de habilidades |
| --- | --- | --- | --- |
| Avalin Founding Chronicle (card_1710) · 0.1.5 | — / 10 | Oro · Legendario | Escenario; Progreso: Ally Played Beast; Condenado; Implementar · Self Unit Board Todos · Objetivo: Invocar una ficha con poder 2 #8 · por turno 1; Capítulo 1: Tablero de la unidad del aliado · Objetivo: Sanar 2 · por turno 1; Capítulo 2: Self Unit Board Todos · Objetivo: Invocar una ficha con poder 4 #8 · por turno 1 |
| Avalin Field Workshop (card_1711) · 0.1.5 | — / 7 | Oro · Épico | Ubicación; Resiliencia; Desplegar · Junta de la Unidad de Aliados Todos · Objetivo: Armadura 1 · por turno 1; Orden · Junta de la Unidad Personal Todos · Objetivo: Generar en la mano 8 · por turno 1 |
| Avalin Hidden Snare (card_1712) · 0.1.5 | — / 4 | Bronce · Raros | Trampa; Revelar: Enemigo especial jugado; Trampa de reacción · Junta de la Unidad Aliada Potencia más baja · Objetivo: Boost 3 · por turno 1 |
| Avalin Signal Keeper (card_1713) · 0.1.5 | 4 / 5 | Bronce · Raros | Contador 2; Temporizador 2; Turn End · Self Unit Board All · Objetivo: Reducir el contador 1 · por turno 1; El contador llega a cero · Self Unit Board All · Objetivo: Escudo 1 · por turno 1; El temporizador expira · Self Unit Board All · Objetivo: Boost 2 · por turno 1 |
| Avalin Unexpected Ally (card_1714) · 0.1.5 | 4 / 5 | Bronce · Raros | Especial Jugado · si la carta de activación tiene categoría Naturaleza · Self Unit Board Todos · Objetivo: Boost 1 · por turno 1 |
| Avalin Sworn Vanguard (card_1715) · 0.1.5 | 4 / 5 | Bronce · Raros | Despliegue · si el mazo de salida no contiene neutrales · Self Unit Board Todos · Objetivo: Aumentar las unidades en la cubierta 1 · por turno 1; Gire el extremo · Tamaño de la mano ≤ 3 · Self Unit Board Todos · Objetivo: Boost 1 · por turno 1 |
| Avalin Challenge Bearer (card_1716) · 0.1.5 | 4 / 5 | Bronce · Raros | Despliegue · Junta de la unidad enemiga Elija · Objetivo: Choque · por turno 1; Golpe mortal · Junta de la unidad Todos · Objetivo: Aumento 2 · por turno 1 |
| Avalin Unwritten Possibilities (card_1717) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Self Unit Board Todos · Objetivo: Crear y jugar una de hasta tres opciones que cuestan como máximo 5 · por turno 1 |
| Avalin Shared Instinct (card_1718) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Tablero de la Unidad de Aliados Elegir · Objetivo: Infundir habilidades y categorías 1714 · por turno 1 |
| Avalin Relic Breaker (card_1719) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Tablero de artefactos enemigos Elegir · Objetivo: Destruir artefacto · por turno 1 |

### Liga de Roden

| Tarjeta y primera versión | Poder / provisiones | Marco y rareza | Resumen de habilidades |
| --- | --- | --- | --- |
| Roden Founding Chronicle (card_1720) · 0.1.5 | — / 10 | Oro · Legendario | Escenario; Progreso: Ally Played Merchant; Doomed; Despliegue · Self Unit Board Todos · Objetivo: Invocar un token con poder 2  # 16 · por turno 1; Capítulo 1: Self Unit Board Todos · Objetivo: Entrega de suministros 3 · por turno 1; Capítulo 2: Enemy Unit Board Máxima potencia · Objetivo: Marcar y golpear 4 · por turno 1 |
| Roden Field Workshop (card_1721) · 0.1.5 | — / 7 | Oro · Épico | Ubicación; Resiliencia; Desplegar · Junta de la Unidad de Aliados Todos · Objetivo: Armadura 1 · por turno 1; Orden · Junta de la Unidad Personal Todos · Objetivo: Generar en la mano 16 · por turno 1 |
| Roden Hidden Snare (card_1722) · 0.1.5 | — / 4 | Bronce · Raros | Trampa; Revelar: Unidad enemiga jugada; Reacción de trampa · Junta de unidad enemiga Máxima potencia · Objetivo: Marcar y golpear 1 · por turno 1 |
| Roden Signal Keeper (card_1723) · 0.1.5 | 4 / 5 | Bronce · Raros | Contador 2; Temporizador 2; Turn End · Self Unit Board All · Objetivo: Reducir el contador 1 · por turno 1; El contador llega a cero · Self Unit Board All · Objetivo: Escudo 1 · por turno 1; El temporizador expira · Self Unit Board All · Objetivo: Boost 2 · por turno 1 |
| Roden Unexpected Ally (card_1724) · 0.1.5 | 4 / 5 | Bronce · Raros | Suministros gastados · Junta de la unidad de uno mismo Todos · Objetivo: Boost 1 · por turno 1 |
| Roden Sworn Vanguard (card_1725) · 0.1.5 | 4 / 5 | Bronce · Raros | Despliegue · si el mazo de salida no contiene neutrales · Self Unit Board Todos · Objetivo: Aumentar las unidades en la cubierta 1 · por turno 1; Gire el extremo · Tamaño de la mano ≤ 3 · Self Unit Board Todos · Objetivo: Boost 1 · por turno 1 |
| Roden Challenge Bearer (card_1726) · 0.1.5 | 4 / 5 | Bronce · Raros | Despliegue · Junta de la unidad enemiga Elija · Objetivo: Choque · por turno 1; Golpe mortal · Junta de la unidad Todos · Objetivo: Aumento 2 · por turno 1 |
| Roden Unwritten Possibilities (card_1727) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Self Unit Board Todos · Objetivo: Crear y jugar una de hasta tres opciones que cuestan como máximo 5 · por turno 1 |
| Roden Shared Instinct (card_1728) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Tablero de la Unidad de Aliados Elegir · Objetivo: Infundir habilidades y categorías 1724 · por turno 1 |
| Roden Relic Breaker (card_1729) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Tablero de artefactos enemigos Elegir · Objetivo: Destruir artefacto · por turno 1 |

### Nevra

| Tarjeta y primera versión | Poder / provisiones | Marco y rareza | Resumen de habilidades |
| --- | --- | --- | --- |
| Nevra Founding Chronicle (card_1730) · 0.1.5 | — / 10 | Oro · Legendario | Escenario; Progreso: Ally Played Agent; Condenado; Implementar · Self Unit Board Todos · Objetivo: Invocar una ficha con poder 2 #24 · por turno 1; Capítulo 1: Junta de la unidad enemiga · Objetivo: Infiltrarse 1 · por turno 1; Capítulo 2: Espionaje de objetivos ≥ 1 · Junta de la unidad enemiga · Objetivo: Bloqueo 1, Objetivo: Daño 3 · por turno 1 |
| Nevra Field Workshop (card_1731) · 0.1.5 | — / 7 | Oro · Épico | Ubicación; Resiliencia; Desplegar · Junta de la Unidad de Aliados Todos · Objetivo: Armadura 1 · por turno 1; Orden · Junta de la Unidad Personal Todos · Objetivo: Generar en la mano 24 · por turno 1 |
| Nevra Hidden Snare (card_1732) · 0.1.5 | — / 4 | Bronce · Raros | Trampa; Revelar: Enemy special played; Reacción de trampa · Junta de unidad enemiga Potencia máxima · Objetivo: Bloquear 1 · por turno 1 |
| Nevra Signal Keeper (card_1733) · 0.1.5 | 4 / 5 | Bronce · Raros | Contador 2; Temporizador 2; Turn End · Self Unit Board All · Objetivo: Reducir el contador 1 · por turno 1; El contador llega a cero · Self Unit Board All · Objetivo: Escudo 1 · por turno 1; El temporizador expira · Self Unit Board All · Objetivo: Boost 2 · por turno 1 |
| Nevra Unexpected Ally (card_1734) · 0.1.5 | 4 / 5 | Bronce · Raros | Ally jugó · Evento Generado fuera de la cubierta de inicio ≥ 1 · Self Unit Board Todos · Objetivo: Boost 1 · por turno 1 |
| Nevra Sworn Vanguard (card_1735) · 0.1.5 | 4 / 5 | Bronce · Raros | Despliegue · si el mazo de salida no contiene neutrales · Self Unit Board Todos · Objetivo: Aumentar las unidades en la cubierta 1 · por turno 1; Gire el extremo · Tamaño de la mano ≤ 3 · Self Unit Board Todos · Objetivo: Boost 1 · por turno 1 |
| Nevra Challenge Bearer (card_1736) · 0.1.5 | 4 / 5 | Bronce · Raros | Despliegue · Junta de la unidad enemiga Elija · Objetivo: Choque · por turno 1; Golpe mortal · Junta de la unidad Todos · Objetivo: Aumento 2 · por turno 1 |
| Nevra Unwritten Possibilities (card_1737) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Self Unit Board Todos · Objetivo: Crear y jugar una de hasta tres opciones que cuestan como máximo 5 · por turno 1 |
| Nevra Shared Instinct (card_1738) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Tablero de la Unidad de Aliados Elegir · Objetivo: Infundir habilidades y categorías 1734 · por turno 1 |
| Nevra Relic Breaker (card_1739) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Tablero de artefactos enemigos Elegir · Objetivo: Destruir artefacto · por turno 1 |

### Clanes Mistwake

| Tarjeta y primera versión | Poder / provisiones | Marco y rareza | Resumen de habilidades |
| --- | --- | --- | --- |
| Haemu Founding Chronicle (card_1740) · 0.1.5 | — / 10 | Oro · Legendario | Escenario; Progreso: Ally Played Raider; Condenado; Despliegue · Self Unit Board Todos · Objetivo: Invocar una ficha con poder 2  # 1300 · por turno 1; Capítulo 1: Ally Unit Board Todos · Objetivo: Sanar 2 · por turno 1; Capítulo 2: Ally Unit Board El poder más bajo · Objetivo: Rito de sangre 5 · por turno 1 |
| Haemu Field Workshop (card_1741) · 0.1.5 | — / 7 | Oro · Épico | Ubicación; Resiliencia; Desplegar · Junta de la Unidad de Aliados Todos · Objetivo: Armadura 1 · por turno 1; Orden · Junta de la Unidad Personal Todos · Objetivo: Generar en la mano 1300 · por turno 1 |
| Haemu Hidden Snare (card_1742) · 0.1.5 | — / 4 | Bronce · Raros | Trampa; Revelar: Unidad enemiga jugada; Reacción de trampa · Junta de unidad enemiga Potencia máxima · Objetivo: Sangrado 3 · por turno 1 |
| Haemu Signal Keeper (card_1743) · 0.1.5 | 4 / 5 | Bronce · Raros | Contador 2; Temporizador 2; Turn End · Self Unit Board All · Objetivo: Reducir el contador 1 · por turno 1; El contador llega a cero · Self Unit Board All · Objetivo: Escudo 1 · por turno 1; El temporizador expira · Self Unit Board All · Objetivo: Boost 2 · por turno 1 |
| Haemu Unexpected Ally (card_1744) · 0.1.5 | 4 / 5 | Bronce · Raros | Ally dañó · Self Unit Board Todos · Objetivo: Boost 1 · por turno 1 |
| Haemu Sworn Vanguard (card_1745) · 0.1.5 | 4 / 5 | Bronce · Raros | Despliegue · si el mazo de salida no contiene neutrales · Self Unit Board Todos · Objetivo: Aumentar las unidades en la cubierta 1 · por turno 1; Gire el extremo · Tamaño de la mano ≤ 3 · Self Unit Board Todos · Objetivo: Boost 1 · por turno 1 |
| Haemu Challenge Bearer (card_1746) · 0.1.5 | 4 / 5 | Bronce · Raros | Despliegue · Junta de la unidad enemiga Elija · Objetivo: Choque · por turno 1; Golpe mortal · Junta de la unidad Todos · Objetivo: Aumento 2 · por turno 1 |
| Haemu Unwritten Possibilities (card_1747) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Self Unit Board Todos · Objetivo: Crear y jugar una de hasta tres opciones que cuestan como máximo 5 · por turno 1 |
| Haemu Shared Instinct (card_1748) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Tablero de la Unidad de Aliados Elegir · Objetivo: Infundir habilidades y categorías 1744 · por turno 1 |
| Haemu Relic Breaker (card_1749) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Tablero de artefactos enemigos Elegir · Objetivo: Destruir artefacto · por turno 1 |

### Morga Brood

| Tarjeta y primera versión | Poder / provisiones | Marco y rareza | Resumen de habilidades |
| --- | --- | --- | --- |
| Morga Founding Chronicle (card_1750) · 0.1.5 | — / 10 | Oro · Legendario | Escenario; Progreso: Ally Played Swarm; Condenado; Despliegue · Self Unit Board Todos · Objetivo: Invocar un token con poder 2  # 1400 · por turno 1; Capítulo 1: Ally Unit Board Todos · Objetivo: Seed a Husk 1 · por turno 1; Capítulo 2: Self Unit Board Todos · Objetivo: Invocar un token con poder 4 # 1400 · por turno 1 |
| Morga Field Workshop (card_1751) · 0.1.5 | — / 7 | Oro · Épico | Ubicación; Resiliencia; Desplegar · Junta de la Unidad de Aliados Todos · Objetivo: Armadura 1 · por turno 1; Orden · Junta de la Unidad Personal Todos · Objetivo: Generar en la mano 1400 · por turno 1 |
| Morga Hidden Snare (card_1752) · 0.1.5 | — / 4 | Bronce · Raros | Trampa; Revelar: Unidad enemiga jugada; Reacción de trampa · Junta de unidad enemiga Potencia máxima · Objetivo: Veneno 1 · por turno 1 |
| Morga Signal Keeper (card_1753) · 0.1.5 | 4 / 5 | Bronce · Raros | Contador 2; Temporizador 2; Turn End · Self Unit Board All · Objetivo: Reducir el contador 1 · por turno 1; El contador llega a cero · Self Unit Board All · Objetivo: Escudo 1 · por turno 1; El temporizador expira · Self Unit Board All · Objetivo: Boost 2 · por turno 1 |
| Morga Unexpected Ally (card_1754) · 0.1.5 | 4 / 5 | Bronce · Raros | Ally Destroy · Self Unit Board Todos · Objetivo: Boost 1 · por turno 1 |
| Morga Sworn Vanguard (card_1755) · 0.1.5 | 4 / 5 | Bronce · Raros | Despliegue · si el mazo de salida no contiene neutrales · Self Unit Board Todos · Objetivo: Aumentar las unidades en la cubierta 1 · por turno 1; Gire el extremo · Tamaño de la mano ≤ 3 · Self Unit Board Todos · Objetivo: Boost 1 · por turno 1 |
| Morga Challenge Bearer (card_1756) · 0.1.5 | 4 / 5 | Bronce · Raros | Despliegue · Junta de la unidad enemiga Elija · Objetivo: Choque · por turno 1; Golpe mortal · Junta de la unidad Todos · Objetivo: Aumento 2 · por turno 1 |
| Morga Unwritten Possibilities (card_1757) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Self Unit Board Todos · Objetivo: Crear y jugar una de hasta tres opciones que cuestan como máximo 5 · por turno 1 |
| Morga Shared Instinct (card_1758) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Tablero de la Unidad de Aliados Elegir · Objetivo: Infundir habilidades y categorías 1754 · por turno 1 |
| Morga Relic Breaker (card_1759) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Tablero de artefactos enemigos Elegir · Objetivo: Destruir artefacto · por turno 1 |

## Doce cartas de asedio

Siete modelos originales de máquinas con componentes móviles son compartidos por tarjetas, campos y previsualizaciones. Las cartas, las habilidades y los modelos básicos funcionan sin crear o grandes cañones. Las paletas opcionales utilizan activos instalados compatibles.

Se agregaron categorías de motor de asedio, eventos de orden de aliados/enemigos y reducción de tiempo de reutilización, reducción de tiempo de reutilización, carga de órdenes y habilidades de preservación de invocaciones. Tales invocaciones no vuelven a activar Deploy y ganan Doomed.

| Tarjeta y primera versión | Poder / provisiones | Marco y rareza | Resumen de habilidades |
| --- | --- | --- | --- |
| Volkar Timber Ballista (card_1800) · 0.1.5 | 4 / 5 | Bronce · Raros | Armadura 1; Orden: Daño 2; Enfriamiento 2; Reabastecimiento 1; Tripulación 1 |
| Volkar Counterweight Catapult (card_1801) · 0.1.5 | 5 / 7 | Bronce · Raros | Armadura 1; Orden: Socket burst 2; Enfriamiento 3; Reabastecimiento 1; Paciencia 1; Contrapeso de la máquina Catapulta |
| Volkar Armored Cannon (card_1802) · 0.1.5 | 5 / 8 | Oro · Épico | Armadura 2; Orden: Perforación de armadura 3; Enfriamiento 3; Reabastecimiento 1; Gasto 1; Cañón blindado máquina |
| Volkar Automatic Loader (card_1803) · 0.1.5 | 4 / 6 | Bronce · Raros | Armadura 1; Giro final · Unidad de aliado adyacente a todo el motor de asedio · Objetivo: Reducir el tiempo de reutilización solo 1 · por giro 1; Cargador automático de la máquina |
| Volkar Steam Ballista (card_1804) · 0.1.5 | 5 / 7 | Bronce · Raros | Armadura 3; Orden: Descarga de armadura 2; Enfriamiento 2; Reabastecimiento 1; Tripulación 1 |
| Volkar Repeating Cannon (card_1805) · 0.1.5 | 4 / 10 | Oro · Épico | Armadura 1; Orden: Daño 1; Enfriamiento 2; Reabastecimiento 1; Un enfriamiento aliado disminuye · si la carta de activación tiene la categoría Motor de asedio · Junta de unidad enemiga aleatoria · Objetivo: Daño 1 · por turno 3; Cañón de repetición de máquina |
| Volkar Armored Crew (card_1806) · 0.1.5 | 4 / 5 | Bronce · Raros | Armadura 2; Defensor 1; Despliegue · Unidad Aliada Adyacente Todo · Objetivo: Armadura 1 · por turno 1 |
| Volkar Field Engineer (card_1807) · 0.1.5 | 4 / 5 | Bronce · Raros | Armadura 1; Despliegue · Junta de la unidad de aliados Elegir motor de asedio · Objetivo: Rearm 2 · por turno 1 |
| Volkar Ammunition Cart (card_1808) · 0.1.5 | 5 / 5 | Bronce · Raros | Armadura 1; Comercio 1; Turn End · Self Unit Board Todos · Objetivo: Entrega de suministros 1 · por turno 1; Carro de municiones de máquina |
| Volkar Field Maintenance (card_1809) · 0.1.5 | — / 5 | Bronce · Raros | Desplegar · Junta de la unidad de aliados Elegir motor de asedio · Objetivo: Rearm 2 · por turno 1 |
| Volkar Bombardment Order (card_1810) · 0.1.5 | — / 4 | Bronce · Raros | Desplegar · Fila de unidad enemiga Todos · Objetivo: Daño 1 · por turno 1 |
| Volkar Siege Encampment (card_1811) · 0.1.5 | — / 12 | Oro · Legendario | Escenario; Progreso: Ally jugó el motor de asedio; Doomed; Implementar · Self Unit Board Todos · Objetivo: Invocar 1 unidad con habilidades y Doomed; no Deploy1800 · por turno 1; Capítulo 1: Self Unit Board Todos · Objetivo: Invocar 1 unidad con habilidades y Doomed; no Deploy1801 · por turno 1; Capítulo 2: Ally Unit Board Todos los motores de asedio · Objetivo: Rearm 2 · por turno 1 |

Véase [autoría de mesa y tarjeta](#mwent/authoring) y el [catálogo de especificación completa](#mwent/card-catalog).
