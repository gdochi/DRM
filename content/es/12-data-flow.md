---
title: Haz que aparezcan los cambios guardados
slug: data-flow
order: 105
description: Sepa cuándo guardar, aplicar a un NPC y volver a cargar archivos editados.
product: core
category: Referencia / Operaciones
section: operations
status: Estable
version: 0.3.1
audience: Creadores / Operadores
tags:
  - data-flow
  - architecture
  - json
translationSource: en
translationMethod: assisted
---

## Una nueva conversación o tienda

Utilice este orden: **editar → Save As → Aplicar a un NPC → interactuar con las manos vacías**.

Guardar crea el archivo. Apply elige el NPC que lo utiliza. Si solo guardó, haga clic con el botón derecho en el NPC con el núcleo y seleccione el archivo a aplicar.

![La carpeta set después de Save As cambia a village_guide.](assets/media/guides/drm-031-forge1201/dialogue-save-result.png "DRM 0.3.1 / Forge 1.20.1. Esto confirma el archivo guardado. Elija su NPC por separado en NPC Apply.")


## Cambiar algo ya aplicado

Abre el mismo archivo, usa **Save** y vuelve a interactuar con el NPC. Si guardó bajo un nuevo nombre, aplique ese nuevo archivo al NPC.

También revise los archivos vinculados, como la GUI del diálogo o la moneda de la tienda, cuando los reemplace.

## Después de editar un archivo directamente

| Contenido editado | Recargar |
| --- | --- |
| Diálogo, tiendas y otros entornos ordinarios | `/drm reload` |
| Configuración de divisas | `/drm currency reload` |
| Trabajo guardado en un editor | Cierre y vuelva a abrir la pantalla correspondiente |

El multijugador utiliza los archivos del servidor. Editar solo la copia local no cambia la conversación del servidor.

## Mover el trabajo a otro servidor

Los archivos están bajo `config/dochi_rpg_maker/`. Mueva toda una carpeta de conjunto de conversaciones e incluya archivos de tienda/GUI vinculados.

La colocación de NPC, el stock restante de tiendas y los contratos de empleo también viven en el mundo. **Keep configuration and the world together** al mover o restaurar un servidor completo.



Ver [folders](#core/paths) para ubicaciones exactas.
