---
title: Ocultar piezas de Vanilla HUD
slug: hud-maker-vanilla
order: 112
description: Controle los corazones predeterminados, la experiencia, la barra de tareas y los HUD de mod compatibles al agregar reemplazos.
product: core
category: HUD Maker
section: hud-maker
status: Guía
version: 0.3.1
audience: Creadores de HUD
translationSource: en
translationMethod: assisted
---

## Evitar que dos pantallas de salud se superpongan

Agregar una barra de salud personalizada no oculta automáticamente los corazones de Minecraft. Expanda **HUD Maker → Inspector → Vanilla HUD Guide** para controlar la pantalla predeterminada por separado.

![Interruptores visibles para salud, comida, XP, barra caliente y otras partes de vainilla HUD.](assets/media/guides/drm-031-forge1201/forge-hud-guide.png "DRM 0.3.1 / Forge 1.20.1. Estos switches actualmente leen Visible. Ellos controlan Minecraft existente HUD; Añadido HUD Tipos a la izquierda contiene DRM adiciones.")

1. Guarda [ tu nuevo HUD](#core/hud-maker) y comprueba que realmente aparezca.
2. Expandir **Vanilla HUD Guide → HUD Guide +**.
3. Apague el interruptor **Visible** correspondiente. Comience con **HP Health** para reemplazar solo los corazones.
4. Guardar, activar e inspeccionar la pantalla del reproductor. En el artefacto verificado Forge 0.3.1, un error de activación significa que este paso no terminó; véase [la limitación](#core/hud-maker).

| Etiqueta | Visualización predeterminada |
| --- | --- |
| HP Health / AR Armor / FD Food / O2 Air | Corazones, armaduras, hambre y aire |
| Barra XP / Nivel LV | Bar de experiencia y nivel |
| Hotbar HB / + Mirilla / BB Bossbar | Hotbar, crosshair y barra de jefe |

Ocultar corazones no crea una barra de reemplazo. Deje el original visible mientras construye un reemplazo que aún no se ha comprobado.

## HUDs mod compatibles

**Mod HUD Guide** controla las pantallas existentes de los proveedores compatibles. Un botón del lado izquierdo como **+ Iron’s Mana** crea una nueva pantalla DRM. Establezca si la pantalla antigua es visible y hacia dónde va la nueva pantalla por separado.
