---
title: Presentaciones y pantallas de medallas
slug: cobblemon-badge-presentations
order: 581
product: drm-cobblemon-editor
section: trainer
category: Badges and Trophies
status: Usage guide
version: Fabric / NeoForge 0.2.9
description: Asigna efectos separados de obtención y selección y personaliza la colección.
translationSource: en
translationMethod: assisted
---

## Obtención y selección son independientes
Selecciona una entrada de [crear medallas](#drm-cobblemon-editor/cobblemon-badges) y abre **Presentation**. Asigna un efecto al obtenerla y otro al seleccionarla. Usa los valores del conjunto o una excepción individual.

## Copia y guarda una presentación en vídeo
![Copia la presentación, guarda Meadow Shine y el vínculo del catálogo.](assets/media/guides/cobble-release-20261109/badge-presentation.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, inglés, sin sonido. Copy and Edit → nombre → Restart → Save → volver → Save del catálogo.")

1. Pulsa **Copy and Edit** en el evento de **Presentation**. **Edit** modifica la presentación compartida; copia para cambiar una sola medalla.
2. Define **Name** a la derecha y reproduce desde el inicio con **Restart**. **Template** ofrece **Soft Shine**, **Golden Ring** y **Gentle Rise**.
3. Selecciona una pista. **Transform** controla ticks inicial/final, posición, escala, rotación y opacidad. **Effect** controla las propiedades del efecto. **Add Key** añade una clave en el instante actual.
4. Pulsa **Save** en el editor de presentaciones y **Cancel** para volver. Pulsa también **Save** en el editor de medallas para confirmar el vínculo.

## Valores del conjunto y vínculos individuales
El selector de ámbito distingue la medalla actual de los valores del conjunto. Heredar sigue sus cambios. **None** desactiva explícitamente la presentación del evento. Obtención y selección tienen vínculos independientes.

![Asigna por separado la obtención y la selección en Presentation.](assets/media/guides/cobble-release-20261109/badge-presentation-bindings.png "Copy and Edit superior: obtención; inferior: selección. Diferencia editar una presentación compartida de editar una copia.")

Importar una presentación de batalla la convierte en un documento de medalla. No reutiliza el vínculo del NPC de batalla.

## Pantallas y distribución
**Display** controla la distribución y las posiciones. **GUI** vincula las pantallas **Collection / Detail / Acquisition** de GUI Maker. Coloca listas, imágenes, nombres y descripciones; el runtime aporta la posesión real. Edita claves de animación en el editor de presentaciones y textos de pantalla en GUI Maker.

## Opciones de visualización
Los avisos se encolan; los automáticos predeterminados duran al menos ocho segundos. Los ajustes permiten confirmación, movimiento reducido y sonido. El vídeo es mudo y no verifica audio. Distingue la vista previa de una obtención real y comprueba la posesión con **/badges**.
