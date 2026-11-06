---
title: Qué hay de nuevo en 0.1.6
slug: release-0-1-6
order: 9
description: Mejoras de editor compartido, ayuda de desplazamiento, soporte de HUD de cabeza de jugador y correcciones de renderizado.
product: core
category: Primeros pasos
section: getting-started
status: Estable
version: 0.1.6
audience: Creadores / Operadores
tags:
  - release
  - migration
translationSource: en
translationMethod: assisted
hiddenNav: true
---

Minecraft 1.20.1 · Forge

## Controles de editor compartido

Los iconos de documento, carpeta y guardar mantienen los mismos roles en todos los editores. Las dos flechas se mueven a través de las pantallas visitadas; utilice el icono de disco o Save As para guardar. Continuar con el [guía actual](#core/gui-system) para guardarlo y aplicarlo.

![Controles de editor compartidos.](assets/media/guides/drm-031-forge1201/gui-text.png "DRM 0.3.1 / Forge 1.20.1. Esta es la característica relacionada en la compilación de producción actual, no una captura de la interfaz de usuario histórica descrita a continuación.")

## Cambiado

- Unificó el menú superior y la interfaz de navegación entre los editores.
- Mejora de la interfaz de usuario y la usabilidad de la pantalla de configuración y varios editores.
- Mejora de la representación del modelo de información sobre herramientas y el manejo de animación NPC GeckoLib.

## Añadido

- Añadida la ayuda compartida de hover para editores.
- Añadido un componente HUD de cabeza de jugador.
- Se ha añadido diseño emergente, recorte de viewport y administración de estado de solicitud de lista JSON.

## Fijo

- Se corrigieron los problemas de renderizado, búfer y plantilla en TaCZ puntas de herramientas de armas.
- Se corrigió la vista previa del modelo NPC y los problemas de sincronización de animación.
- Arreglado el diseño, la selección y los problemas de visualización en las pantallas del editor.

Actualice tanto el servidor como los clientes a **0.1.6**. Copia de seguridad `config/dochi_rpg_maker` antes de reemplazar el mod JAR.
