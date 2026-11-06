---
title: Fabric 0.2.0 Actualización
slug: release-notes-0-2-0
order: 8
description: Tooltip Maker, ayuda de hover compartida, presentación de diálogos y mejoras de animación Gecko en Fabric 0.2.0.
product: core-fabric
category: Primeros pasos
section: getting-started
status: Estable
version: 0.2.0
audience: Creadores / Operadores
translationSource: en
translationMethod: assisted
hiddenNav: true
---

Este es un registro de liberación histórico. Ver [ DRM 0.3.1 ](#core-fabric/release-notes-0-3-1) para la dirección actual.

## Personalizar una sugerencia de artículo

Tooltip Maker organiza el nombre, la descripción y la vista previa del elemento. Seleccione un elemento en el lienzo central, edítelo a la derecha y use Vista previa. Esta es una pantalla actual NeoForge, no la interfaz de usuario histórica Fabric 0.2.0. Continuar con el [guía actual](#core-fabric/tooltip-maker) para guardarlo y aplicarlo.

![Personaliza una sugerencia de artículo.](assets/media/guides/drm-031-neo1211/tooltip-maker.png "DRM 0.3.1 / NeoForge 1.21.1. Esta es la característica relacionada en la compilación de producción actual, no una captura de la interfaz de usuario histórica descrita a continuación.")

## Cambiar registro 0.2.0

### Cambiado

- Los campos y botones del editor ahora usan anchos más compactos basados en contenido cuando sea apropiado.
- Las tarjetas compartidas de ayuda con hover ahora envuelven, reposicionan y se mantienen por encima del contenido del editor de manera más consistente.
- La reproducción de animación Gecko ahora utiliza una línea de tiempo sincronizada del servidor y se pone al día correctamente para los espectadores tardíos.

### Añadido

- **Tooltip Maker** para diseños flotantes de elementos, vistas previas de elementos en 2D o 3D, imágenes, texto, desplazamiento y efectos de entrada.
- Reproducción de HUD con cabeza reproductora.
- Tamaño de texto de elección de diálogo por nodo y resaltados de pulso opcionales.
- Animación Gecko Comience rutas con un objetivo Goto.

### Fijo

- La navegación de diálogo ya no impide que se ejecuten acciones posteriores, como animaciones, comandos, etiquetas o acciones de elementos.
- Las vistas previas de Gecko pueden buscar y reiniciar de forma independiente, volver a intentar los activos faltantes y retroceder de forma segura cuando falla la carga.
- Los controles superpuestos, estirados e incorrectamente recortados se corrigieron en GUI Maker, Quest Editor, Faction Editor y pantallas relacionadas.

### Actualización

Haga una copia de seguridad de su mundo y `config/dochi_rpg_maker/`, luego instale el mismo DRM Core 0.2.0 JAR en el servidor y en cada cliente. CustomNPCs sigue siendo requerido por esta construcción Fabric. Los datos existentes 0.1.9 siguen siendo el punto de partida; use `Save As` cuando personalice los valores predeterminados protegidos.
