---
title: Edición simple, recetas y técnicas reutilizables
slug: battleworks-authoring
order: 227
description: Crea un ataque con una receta, ajusta sus valores y reutiliza una técnica independiente.
product: mob-editor
section: start
category: BattleWorks
status: Guide
version: 0.1.7
audience: Principiantes y creadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Empezar con una receta

Abre BattleWorks con la [varita o el comando del editor](#mob-editor/mob-editor-setup). En **Pattern Workbench**, elige **Attack recipes** y selecciona un ataque inicial.

| Receta | Comportamiento inicial |
| --- | --- |
| Wide sweep | Barrido cuerpo a cuerpo con aviso en el suelo vinculado y movimiento nativo |
| Charge and slash | Acercarse durante la preparación, detenerse y golpear |
| Delayed ground strike | Guardar la posición del objetivo, avisar allí y golpear la posición guardada |
| Retreat and counter | Retroceder durante la preparación y contraatacar hacia delante |

Las recetas añaden patrones y recursos editables. No instalan hechizos ni modelos externos. Se omite una animación incompatible con el modelo; elige un clip compatible con tu actor. El ataque retrasado golpea la posición guardada, por lo que un jugador puede escapar moviéndose.

## 2. Ajustar el ataque en Simple edit

Selecciona el patrón nuevo y **Simple edit**. Ajusta nombre, Enabled, Min/Max Range, Windup, Action, Recovery y Cooldown. Los campos de tiempo también muestran segundos: a velocidad normal del servidor, 20 ticks equivalen a un segundo.

Elige una hitbox vinculada para ajustar daño y dimensiones comunes. Si otra acción causa el daño, usa **Detailed edit** para esa acción. Cambiar de vista conserva condiciones, eventos, movimiento y animación existentes; la vista simple no sustituye el documento por un archivo simplificado.

Comprueba **Shared by … patterns** antes de editar daño o dimensiones. Usa **Make this hitbox independent** cuando solo deba cambiar este patrón. Revisa la geometría completa y el tick de contacto en [Hitbox Library](#mob-editor/battleworks-hitboxes).

## 3. Guardar una técnica para otro documento

1. Selecciona el ataque y elige **Save technique**.
2. Abre otro documento de combate en el mismo servidor con el mismo jugador.
3. Abre **My techniques**, selecciona una entrada y pulsa **Load technique**.
4. Revisa patrones, destinos de combo, hitboxes y partículas importados antes de guardar.

La biblioteca pertenece a tu jugador en ese servidor. La importación crea ID independientes y reconecta las referencias del paquete. Puede incluir archivos de partículas referenciados; los mods, modelos, sonidos y proveedores de habilidades externos deben existir también en el destino. Una importación incompatible rechazada deja el documento intacto.

## 4. Elegir qué comparte una copia

| Opción de Copy technique | Resultado |
| --- | --- |
| Independent copy | Copia ataque, patrones de combo vinculados, hitboxes y efectos de partículas con ID nuevos |
| Share existing resources | Copia solo el patrón seleccionado; los recursos vinculados siguen compartidos |

Usa una copia independiente para variantes con daño o partículas diferentes. Comparte cuando varios movimientos deban mantener una misma definición. Editar recursos compartidos afecta a todos los patrones que los usan; cambiar solo el nombre no los separa.

## 5. Deshacer, guardar y aplicar

**Undo / Redo** restaura ediciones del documento y el estado de carga de archivos. Las flechas Back/Forward navegan por el historial del editor. Deshacer no elimina entradas ya guardadas en la biblioteca del servidor.

Usa **Save As** para una ruta nueva. Con el NPC deseado conectado, pulsa **Save** después para vincularlo, o aplica el archivo desde su catálogo. Consulta [archivos y almacenamiento de la biblioteca](#mob-editor/battleworks-files).

Usa Simulation para observar movimiento e hitbox y después prueba un combate real en Supervivencia. Un aviso visual por sí solo no causa daño. Configura [avisos vinculados](#mob-editor/battleworks-hitboxes) y [reinicio de arena](#mob-editor/battleworks-encounters) antes de probar el jefe completo.
