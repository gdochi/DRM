---
title: Qué hay de nuevo en 0.1.5
slug: release-0-1-5
order: 10
description: Tooltip Maker, opciones de diálogo más claras, mejores vistas previas de elementos y correcciones de HUD.
product: core
category: Primeros pasos
section: getting-started
status: Estable
version: 0.1.5
audience: Creadores / Operadores
tags:
  - release
  - migration
translationSource: en
translationMethod: assisted
hiddenNav: true
---

Este es un registro de liberación histórico. Ver [ DRM 0.3.1 ](#core/release-notes-0-3-1) para la dirección actual.

Minecraft 1.20.1 · Forge

Esta actualización añade un Tooltip Maker dedicado y da a los creadores más control sobre las opciones de diálogo. También mejora las previsualizaciones de elementos y corrige varios problemas de visualización de HUD.

## Encontrar Tooltip Maker

Edite la descripción del elemento en el lienzo central. Rendered Item muestra el elemento; Tooltip Text añade secciones de texto. Compruebe Vista previa y Save As su propio diseño. Continuar con el [guía actual](#core/tooltip-maker) para guardarlo y aplicarlo.

![Encuentra Tooltip Maker.](assets/media/guides/drm-031-forge1201/tooltip-maker.png "DRM 0.3.1 / Forge 1.20.1. Esta es la característica relacionada en la compilación de producción actual, no una captura de la interfaz de usuario histórica descrita a continuación.")

## Añadido

- **Tooltip Maker:** Diseña las descripciones de los elementos en su propio editor, disponible en **Visual**. Organice vistas previas de elementos, texto, secciones estadísticas, imágenes y divisores.
- **Tooltip effects:** Añadir efectos de entrada y reproducirlos con el botón de reproducción mientras se edita. Elija iconos de elementos 2D, elementos giratorios 3D o vistas previas de equipos portátiles.
- **Long tooltip scrolling:** Lea la información que no encaja en la pantalla desplazándose por la información sobre herramientas.
- **Choice text size:** Cambiar el tamaño del texto de la opción de diálogo en el editor de diálogos o en su diseño de GUI.
- **Choice pulse highlight:** Hacer una elección individual parpadear suavemente cuando aparece. Elija el color, la duración total, el recuento de pulsos y la fuerza de **0 a 100**. Las conversaciones existentes permanecen sin cambios a menos que habilite el efecto.
- **NPC stat screens:** Conectar un archivo Stat Builder a un NPC para interactuar con ese NPC abre la pantalla de asignación de estadísticas del jugador.

## Mejorado

- Los botones de elección ahora usan el ancho disponible antes de envolver texto largo, incluido el texto traducido a través de un paquete de recursos.
- Las opciones largas se hacen más altas cuando son necesarias. Las listas con demasiadas opciones se pueden desplazar.
- Los botones de opción predeterminados tienen aproximadamente **5 píxeles GUI de espacio por encima y por debajo del texto**, en lugar de relleno vacío de gran tamaño.
- La edición de punta de herramienta tiene límites de lienzo más claros, controles de tamaño y espacio para colocar temporalmente elementos fuera del lienzo. Solo se guardan los elementos completamente dentro del lienzo de salida.
- Se ha mejorado el ahorro, la carga y la reapertura de la descripción para que el diseño predeterminado ya no parpadee antes del diseño cargado anteriormente.

## Fijo

- Se fijaron los bloques ordinarios y otros artículos no ponibles que se mostraban en la mano del jugador o de un puesto de armadura cuando se seleccionaba una vista previa del equipo.
- Se ha mejorado el tamaño y el centro de rotación de las vistas previas de objetos modificadas, incluidas las armas de Epic Knights. Reducción de recortes y causas corregidas de parpadeo oscuro mientras los elementos giran.
- Arreglado TaCZ armas que faltaban en las vistas previas de la información de herramientas. Los detalles de la pistola y los accesorios instalados se mantienen al mostrar sus modelos.
- Se corrigieron los fondos de la ranura del artículo que se mantenían pequeños cuando se ampliaba su caja de ayuda.
- Se corrigieron los nombres de las pestañas de Creative que recibían incorrectamente el diseño personalizado de la sugerencia de herramientas.
- Moneda fija que aparece en el inventario de Supervivencia cuando su opción de visualización de inventario estaba desactivada.
- Se corrigieron las barras de HUD personalizadas que volvían a las barras de vainilla cuando se abría **F3**.
- Se ha corregido el efecto de daño que se producía al retirar el equipo solo bajaba la salud máxima del jugador.
- Se ha mejorado la carga de modelos NPC personalizados para evitar mostrar brevemente partes de modelo y textura no coincidentes.

## Actualización

Actualice tanto el servidor como los clientes a **0.1.5**. Guarde una copia de su carpeta `config/dochi_rpg_maker` antes de reemplazar archivos. Utilice **Save As** cuando personalice las plantillas agrupadas.
