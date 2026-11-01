---
title: Guardar, cargar y aplicar
slug: core-concepts
order: 50
description: Comprenda los botones que utiliza para guardar el trabajo y adjúntelo a un NPC.
product: core
category: Sistemas de núcleo
section: getting-started
status: Estable
version: 0.3.1
audience: Creadores
tags:
  - concepts
  - glossary
translationSource: en
translationMethod: assisted
---

## Los botones que usarás

| Botón | Utilízalo para |
| --- | --- |
| **Load** | Abrir trabajo guardado o un ejemplo incluido |
| **Save** | Mantenga los cambios en su propio archivo |
| **Save As** | Haga su propia copia de un ejemplo o guarde bajo otro nombre |
| **Apply** | Adjuntar una conversación, tienda u otro trabajo guardado a un NPC |

**Close** y las flechas Atrás/Adelante no guardan tu trabajo.

![NPC Apply con funciones a la izquierda, archivos en el centro y enlaces aplicados a la derecha.](assets/media/guides/drm-031-forge1201/npc-apply-result.png "DRM 0.3.1 / Forge 1.20.1. Cree el archivo con Save As, luego conéctelo al NPC aquí. El diálogo muestra village_guide en este ejemplo.")


## El contenido y la apariencia están separados

Escribe el diálogo y las opciones en **Dialogue Editor**. Organice la ventana de diálogo, los colores y las imágenes en **GUI Maker**. Fije los productos y precios en **NPC Shop**.

Puede terminar el contenido utilizando primero la pantalla predeterminada. Para cambiar su apariencia más tarde, elija la GUI guardada en la conversación o en la configuración de la GUI de la tienda.

## Reutilizar el trabajo en varios NPC

Aplica una conversación guardada a varios NPC para compartirla. La edición de ese archivo actualiza su contenido compartido. Para diferentes conversaciones, haga copias separadas con **Save As**.

Las tiendas que usan el mismo archivo de producto todavía tienen ** stock separado para cada NPC**. Los jugadores que visitan el mismo PNJ comparten las acciones de ese PNJ.

## Condiciones y acciones

Una **condición** decide quién puede ver o usar algo: por ejemplo, mostrar una elección después de que se complete una misión. Una **acción** decide lo que sucede cuando se elige, como dar un artículo o abrir una tienda.

Utilice [condiciones y acciones](#core/conditions-actions) para agregar estos comportamientos.
