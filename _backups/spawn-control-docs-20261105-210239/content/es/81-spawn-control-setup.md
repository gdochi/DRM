---
title: Crea tu primera regla de spawn natural
slug: dochi-spawn-control-setup
order: 820
description: Elige una criatura, sus condiciones y cantidades, luego aplica la regla.
product: dochi-spawn-control
category: Configuración
section: setup
status: Proyecto
version: 0.1.4
audience: Operadores de servidor por primera vez
tags:
  - installation
  - first rule
  - permissions
translationSource: en
translationMethod: assisted
---

## Instalar y abrir el editor

Utilice Spawn Control 0.1.4 para Forge 1.20.1, Fabric/NeoForge 1.21.1 o el objetivo 26.3 separado. Coincidir con versiones de servidor/cliente y cargadores; Fabric también necesita Fabric API.

Las reglas ordinarias de las criaturas no requieren otros mods de Dochi. La edición necesita un nivel de permiso 2 o permiso creativo.

Presione **K**. Si otro mod lo usa, cambie **Open Spawn Control** en la configuración clave de Minecraft. Con DRM, también puede abrir **Spawn Control** desde el selector del editor.

## Añadir una regla para una criatura

1. Elige la criatura en la lista de la izquierda.
2. En la vista **Selected target**, pulse **Add rule**.
3. Darle un nombre y un único **Profile ID**.
4. Establecer dimensiones, biomas, tiempo y luz. Las listas de dimensión/bioma vacías lo permiten todo.
5. Elija **Ground** para las criaturas terrestres o **Water** para las criaturas acuáticas.
6. Establezca la probabilidad, el intervalo de comprobación, el tamaño del grupo y los límites de población.
7. Habilite la regla y presione **Save**.

![Condiciones inmediatamente después de agregar regla.](assets/media/guides/spawn-control-014-neo1211/spawn-rule.png "Spawn Control 0.1.4 / NeoForge 1.21.1. DNPC 0.1.2. Este ejemplo selecciona la entidad predeterminada DNPC, no una plantilla NPC guardada. La nueva regla todavía está fuera. Seleccione su destino, configúrelo, habilite la regla y guarde.")

## Compruebe la ubicación actual

Utilice **Advanced diagnostics → Check current position** para ver las condiciones fallidas. **Spawn one mob** crea una criatura real. Utilice **Clean spawned entities** para eliminar las secuencias de prueba.

Las criaturas terrestres necesitan terreno y espacio adecuado; las criaturas acuáticas necesitan suficiente agua.

## Reemplazar los engendros originales

Después de comprobar su regla, gire **Original spawning OFF** para reemplazar el aparición natural. Dejarlo encendido también mantiene los engendros originales.

## Usar un NPC guardado

Guárdelo como una plantilla de clon **** en DNPC, luego elija su nombre en el catálogo. Véase [configuración de la plantilla](#dochi-spawn-control/spawn-control-npc-templates).

Para un bloque en una ubicación fija, use un generador [colocado](#dochi-spawn-control/dochi-spawn-control-spawner).
