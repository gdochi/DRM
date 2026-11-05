---
title: Vincular la alegría enfermera a una máquina de curación
slug: cobblemon-nurse-joy
order: 550
description: Escribe un saludo de sanación, aplica el rol NPC y conecta su máquina de sanación Cobblemon.
product: drm-cobblemon-editor
category: NPCs de servicio
section: services
status: Proyecto
version: Fabric / NeoForge 0.2.9
audience: Creadores de NPC y operadores de servidores
tags:
  - nurse-joy
  - healer
  - dialogue
translationSource: en
translationMethod: assisted
---

## Crea un PNJ que cure al equipo

Después de que un jugador pide tratamiento, el PNJ camina hacia su máquina de curación vinculada Cobblemon, sana al equipo y regresa. Aplica el rol a un DNPC o CustomNPCs NPC en **Minecraft 1.21.1, Fabric or NeoForge**.

![Enfermera Joy nombre, distancia, diálogo y etiquetas de tratamiento / cierre.](assets/media/guides/cobble-029-neo1211/cobble-nurse.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1, Inglés UI. Aquí no se selecciona ningún NPC; guarde y aplique el perfil antes de vincular una máquina.")

1. Abre **Nurse Joy Editor → Use Default** de la lista de editores DRM.
2. Establecer **Display Name** para que pueda reconocer este perfil.
3. Escribe el saludo debajo de **Dialogue Text** y las dos opciones debajo de **Treatment Choice Text / Close Choice Text**.
4. **Save As** un archivo de usuario como `custom/village_healer.json`.
5. Abra el NPC previsto con el núcleo DRM y **Apply** ese archivo en **Nurse Joy**.
6. Enlaza una máquina siguiendo los pasos a continuación. Guardar el perfil no vincula una máquina.

El tratamiento y las acciones cercanas tienen un comportamiento y orden fijos. Cambiar el nombre de una opción no la convierte en un botón de recompensa. Utilice [DRM diálogo](#core-fabric/dialogue-system) para las ramas generales o recompensas.

![Ruta de acceso del usuario y estado guardado después de Save As.](assets/media/guides/cobble-029-neo1211/cobble-nurse-save.png "El ejemplo de ruta guardada a través de Save As. Crear el archivo y aplicar el rol NPC son pasos separados.")

## Enlace de la máquina de curación

![Aplicar el rol a un PNJ con la skin de Nurse Joy, enlazar la máquina y completar la curación y el regreso.](assets/media/guides/short-gifs-20261105/nurse-joy-treatment.gif "Captura real: Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 / NeoForge 1.21.1, interfaz en inglés. Bulbasaur recuperó sus 19 PS desde 1 PS y el PNJ regresó al punto inicial.")

La grabación utiliza la [skin de Nurse Joy de AcidFlounder391](https://www.minecraftskins.com/skin/22531361/nurse-joy/).

1. En el editor del NPC aplicado, elija **Link Healing Machine**.
2. Dentro de **60 segundos**, **Shift+right-click** una Cobblemon máquina de curación en la misma dimensión.
3. Manténgalo dentro de **Max Distance**, de 1 a 16 bloques; este ejemplo usa 16.
4. Deja espacio y terreno seguros al lado de la máquina para que el NPC se pare y regrese.
5. Interactúa con el PNJ con ambas manos vacías y elige el tratamiento.

Una máquina enlazada se utiliza a través de Nurse Joy. Mantenga una máquina separada para uso público directo. Dos NPCs de Enfermera Joy no pueden poseer la misma máquina; romperla elimina el enlace.

## Actualizar diálogos o cambiar máquinas

**Save to the same referenced file** para actualizar la redacción o la distancia para la siguiente interacción. Aplicar de nuevo después de guardar bajo un nombre diferente. Los enlaces de máquina pertenecen a NPC individuales: la aplicación de un perfil compartido no comparte su enlace de máquina.

| Problema | Comprobar |
| --- | --- |
| Se abre otro diálogo o tienda | Utilice la mano vacía **Shift+right-click** para acceder a Nurse Joy. |
| Solicitud de enlace caducada | Elija la máquina de enlace de nuevo y enlace dentro de 60 segundos. |
| NPC no puede llegar a la máquina | Misma dimensión, distancia permitida, terreno seguro y un espacio adyacente libre. |
| El tratamiento no comenzará | Jugador dentro de 12 bloques, sin batalla activa, y una máquina cargada/utilizable. Espere cualquier tratamiento que ya esté en curso. |
| La vieja redacción permanece | Guardar en la ruta realmente aplicada al NPC. |

Los perfiles están bajo `config/dochi_rpg_maker/cobblemon/nurse_joy/`. Mantenga el mundo también al mover un servidor: el enlace de la máquina del NPC es datos del mundo.
