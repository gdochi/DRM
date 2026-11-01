---
title: HUD Maker
slug: hud-maker
order: 86
description: Cómo configurar conjuntos de HUD, diseños activos y componentes de visualización de moneda en HUD Maker.
product: core-fabric
category: Sistemas de núcleo
section: hud-maker
status: Estable
version: 0.3.1
audience: Creadores / Operadores
tags:
  - hud
  - editor
translationSource: en
translationMethod: assisted
---

## Colocar una barra de salud en la pantalla

Un HUD muestra salud, hambre o equilibrios durante el juego. Abra **HUD Maker** desde el núcleo DRM para colocarlo sobre la vista de juego. Esta pantalla en inglés usa **DRM 0.3.1 / NeoForge 1.21.1**.

![Componente de salud posicionado en X 400, Y 250 y guardado como guide_hud.](assets/media/guides/drm-031-neo1211/native-hud-health.png "Añádelo con + Salud a la izquierda, selecciona Salud en Añadidos HUD tipos y, a continuación, desplázate por el Inspector derecho para ver la ubicación y la configuración de los componentes. El contorno verde marca la pantalla de salud editada.")

1. Haz clic en **+ Salud** a la izquierda.
2. Seleccione **Added HUD Types → Health**. A `*` marca el elemento seleccionado.
3. Desplazamiento de la **Inspector** a **X / Y**. El ejemplo usa **400 / 250 ** por lo que es fácil ver cerca del centro; muévalo a la esquina prevista para el juego normal.
4. Utilice **Box ID** para identificar el componente y, a continuación, ajuste el tamaño, el texto y la apariencia de la barra. Contraiga los paneles de edición superpuestos con sus controles `-` para inspeccionar la ubicación.
5. **Save As** un nuevo conjunto como `guide_hud`. Compruebe **Loaded JSON: guide_hud**.
6. Seleccione **Apply**, cierre el editor y compruebe el HUD en el modo de juego previsto y escala GUI.

Guardar guarda los archivos; Aplicar selecciona el conjunto a mostrar. Utilice **Unapply** para dejar de usarlo. Cargue el mismo conjunto para continuar editando y guardando su diseño.

![Juego de supervivencia después de cargar el conjunto guardado guide_hud, con su barra HP 20/20 y corazones de vainilla.](assets/media/guides/drm-031-neo1211/hud-loaded-world.png "Una nueva ejecución del juego cargó los archivos guardados a través del editor. La barra en 400/250 y los corazones de vainilla son visibles; elija la colocación final y la visibilidad de vainilla por separado.")

## Elija una moneda guardada

Guarde la moneda en Currency Editor primero, luego presione ** + Moneda**. En **Apply Currency HUD**, confirme su nombre y su ID y pulse **Apply**. Esta opción Aplicar agrega el componente de moneda seleccionado; la barra de herramientas Aplicar activa un conjunto de HUD.

![La moneda de la ciudad y su town_coin ID en el recolector de divisas HUD.](assets/media/guides/drm-031-neo1211/hud-currency-picker.png "DRM 0.3.1 / NeoForge 1.21.1. La primera línea es el nombre de visualización y la segunda es el ID de la moneda. Si + Moneda está deshabilitada, primero compruebe que Currency Editor guardó una definición.")

Seleccione el agregado **Currency**, ajuste su posición y tamaño, luego guarde el conjunto de HUD. Los ejemplos de saldo/cambio del editor no son evidencia de pago real; pruebe el saldo del jugador previsto y la transacción de la tienda también.


## Añadir otra información

| Botón izquierdo | Información |
| --- | --- |
| ** + Moneda** | Saldo de una moneda creada en Currency Editor |
| **+ Salud / Alimentos / Armadura / Aire / Nivel** | Salud del jugador, hambre, armadura, aire y experiencia |
| **+ Cabeza del jugador** | Rostro del jugador |
| Entradas de integración instaladas | Maná, resistencia u otros valores suministrados por ese mod |

Para obtener dinero, seleccione el **mismo ID de moneda** creado en [ Currency Editor ](#core-fabric/currency-editor). Agregar una pantalla de saldo no otorga dinero.

Los valores específicos de mod requieren su proveedor. **CNPC Tempdata / Storeddata** se aplica solo a entornos compatibles con CustomNPCs instalado. Minecraft 26.3 y más adelante excluye CustomNPCs; no construya HUD alrededor de esas entradas allí.

## Compruebe el editor y el juego normal

La política de visualización de modo creativo puede ocultar información de supervivencia, como la salud y el hambre. Marque **Render survival HUD** en el editor y el modo de juego real, luego pruebe en el entorno de supervivencia destinado a los jugadores.

Si la barra DRM se superpone a corazones de vainilla, oculte la pantalla predeterminada correspondiente en el Inspector **Vanilla HUD Guide**. Ocultar un elemento vainilla no crea su reemplazo.

| Síntoma | Comprobar |
| --- | --- |
| Salvado HUD está ausente | Nombres de conjuntos guardados y aplicados, componentes habilitados |
| Visible solo durante la edición | Compruebe el conjunto guardado/aplicado y vuelva a conectar. Si sigue ausente, compruebe el modo de juego, las condiciones de visibilidad y la superposición de depuración F3. |
| Colocación incorrecta | X/Y, anchor, tamaño de pantalla y escala GUI |
| El saldo se mantiene sin cambios | Identificación de la moneda y el saldo real del jugador |
| Otros mod HUD solapamientos | Configuración de visibilidad de cada mod y colocación de componentes DRM |

## Mantenga el conjunto completo

Los conjuntos están bajo `config/dochi_rpg_maker/hud/sets/<set name>/`. Este ejemplo `guide_hud` crea **hud_set.json** y **components/hp/hp.json**. Mantenga toda la carpeta establecida en lugar de mover solo su componente de salud. `hud/active_set.json` registra el conjunto seleccionado.
