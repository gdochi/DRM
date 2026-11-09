---
title: Crea y entrega medallas y trofeos
slug: cobblemon-badges
order: 580
product: drm-cobblemon-editor
section: trainer
category: Badges and Trophies
status: Usage guide
version: Fabric / NeoForge 0.2.9
description: Guarda un conjunto, entrega una medalla y comprueba la colección.
translationSource: en
translationMethod: assisted
---

## Activa las medallas
Incluido en Cobblemon Editor **0.2.9 / Fabric·NeoForge 1.21.1**. En los ajustes de DRM, activa **Badges → Enable badges**. Solo los operadores pueden cambiarlo; empieza en OFF en mundos nuevos. Después asigna **Badge Case** en Controls o abre con **/badges**.

## Sigue el primer vídeo
El vídeo empieza con una copia del conjunto de ejemplo. Cambia el conjunto a **Meadow League**, la medalla a **Meadow Badge** y guarda en el servidor real.

![Renombra el conjunto y la medalla y guarda el catálogo.](assets/media/guides/cobble-release-20261109/badge-create.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, interfaz en inglés. Edición y guardado reales. La función se activó antes de grabar.")

1. Abre **Add-on → Badge Editor** en DRM o usa **/badges edit** como operador.
2. Elige un ejemplo en **Select Set** y cópialo con **Save Set As Copy**. Crea nuevos ID; no pide un nombre de archivo.
3. En **Basic**, cambia **Set Name** a **Meadow League** y **Name** de la medalla a **Meadow Badge**. Añade entradas con **Add Count → Add**.
4. Elige **Badge** o **Trophy**. El buscador de **Front Texture** selecciona un recurso DRM. El reverso vacío reutiliza el frontal.
5. Revisa la descripción y **Enabled** y pulsa **Save**. Renombrar conserva la identidad; copiar o crear genera otros ID.

## Entrega y comprueba la colección
Requiere nivel de permiso 2 o superior. El último argumento es el nombre; Tab sugiere nombres e ID. Usa el ID único si hay nombres repetidos.

```mcfunction
/drm badge give @s Meadow Badge
/badges
/drm badge take @s Meadow Badge
```

Para trofeos, usa **/drm trophy give** y **/drm trophy take**. Selecciona **Meadow League** en la colección. Entregar de nuevo una medalla obtenida no aumenta su cantidad.

![Definiciones guardadas de Meadow League en el editor.](assets/media/guides/cobble-release-20261109/badge-editor-saved.png "Esta pantalla confirma la definición guardada. Comprueba la posesión del jugador aparte con /badges.")

## Conecta recompensas, diálogos y misiones
En **Battle Config → After Actions**, añade **Badge** o **Trophy** y busca la entrada guardada. Limita el resultado a victoria para una medalla de victoria. Para entregarla tras el diálogo, ponlo primero en modo **Sequential**.

Las acciones de diálogo también permiten buscar objetivos para entregar y retirar. **Badge owned / Trophy owned** comprueba la posesión; **Badge count** cuenta medallas del conjunto; **Badge set complete** comprueba todas las obligatorias. Los trofeos no cuentan como medallas. Define las obligatorias con **Required for Completion**. Un conjunto sin medallas obligatorias no supera la condición de finalización.

En una misión, selecciona el objetivo de obtener una medalla y su destino. Volver a entregar una medalla obtenida no es un nuevo evento de adquisición. Consulta [acciones posteriores a la batalla](#drm-cobblemon-editor/cobblemon-conditions-rewards-pokemon).

## Presentaciones y datos
Configura avisos y animaciones en [presentaciones y GUI de la colección](#drm-cobblemon-editor/cobblemon-badge-presentations).

Las definiciones están en **config/dochi_rpg_maker/cobblemon/badges/catalog.json**; la opción del mundo en **serverconfig/cobble_npc/badges.json**. La posesión se guarda aparte en los datos de jugadores del mundo. Copiar definiciones no transfiere la posesión. Respalda definiciones, presentaciones, texturas y jugadores juntos. Si una referencia impide borrar una medalla, cambia primero las recompensas y condiciones vinculadas.
