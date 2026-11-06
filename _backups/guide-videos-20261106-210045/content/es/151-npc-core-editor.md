---
title: Apariencia, equipos y trabajos
slug: npc-core-editor
order: 1510
description: Viste a tu NPC y elige sus herramientas, lugar de trabajo y rutina.
product: dochi-npc-core
category: NPCs, horarios y empleo
section: editor
status: Guía
version: 0.1.3
audience: Creadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

## Cambiar la apariencia y el equipo

Haga clic con el botón derecho en un NPC con el núcleo. Elija su nombre, piel, proporciones y equipo, luego guarde. Los modelos instalados añaden opciones de apariencia; los modelos Gecko necesitan GeckoLib.

![DNPC's Identity pantalla, con categorías a la izquierda, una vista previa de NPC en el medio, y campos de nombre y título a la derecha.](assets/media/guides/dnpc-013-neo1211/dnpc-identity.png "DNPC 0.1.3 / NeoForge 1.21.1, Inglés UI. Seleccionar Identity → Information, editar Name a la derecha y Save to NPC en la parte superior. Style cambia la apariencia del nombre y el título del texto.")

### Cambiar la piel y el tamaño

Seleccione **Appearance & Model**. Con **Humanoid**, use el buscador al lado **Skin**, cambie **Scale** por el tamaño total y elija **Slim arms** si es necesario. Utilice **Part scales** para las proporciones individuales del cuerpo y **Hitbox** para las dimensiones de colisión.

![DNPC 0.1.2 en NeoForge 1.21.1, mostrando Appearance & Model con Humanoid, Skin, Scale y Slim arms.](assets/media/guides/dnpc-012-neo1211/dnpc-appearance.png "Compruebe la apariencia en la vista previa del medio. Scale cambia el tamaño total del modelo, en lugar de su lugar de trabajo o rango de ataque.")

Usa el poser para hacer poses y unirlas en animaciones. Para equipos aleatorios, elija candidatos y oportunidades para cada ranura.

### Encuentra el arma y las ranuras de municiones

Equipar armadura bajo **Inventory & Equipment → Equipment**, usando **Head / Chest / Legs / Feet**. Armadura almacenada en **NPC storage** no es armadura equipada.

![DNPC Inventory & Equipment con NPC storage y Player inventory en el medio y ranuras de armadura a la derecha.](assets/media/guides/dnpc-012-neo1211/dnpc-inventory.png "DNPC 0.1.2 / NeoForge 1.21.1. Separar los objetos almacenados de la armadura equipada. Ver Real Armor para ver el comportamiento adicional de la armadura.")

Seleccione **Weapon & ammunition** a la izquierda. **Idle hands** establece lo que el NPC tiene fuera del combate; **Combat hands** establece lo que tiene durante el combate. Elija su arma a distancia y munición en **Ranged weapon** y **Ammunition**.

![DNPC's Weapon & ammunition pantalla. La pestaña Weapons de la derecha muestra las ranuras para manos inactivas y de combate, una ranura para armas a distancia y una ranura para municiones.](assets/media/guides/dnpc-013-neo1211/dnpc-weapons.png "DNPC 0.1.3 / NeoForge 1.21.1, Inglés UI. Utilice las ranuras en la pestaña Weapons. NPC storage en el medio está el inventario, separado de la mano y las ranuras de armas a la derecha.")

## Dale un trabajo al NPC

1. Añadir horas de trabajo debajo de **Schedule** a la izquierda.
2. Elija minería, agricultura, maderería, recolección, transporte u otro trabajo.
3. Establezca su lugar de trabajo / rango, herramientas y almacenamiento de entrada / salida.
4. Suministre las herramientas y los artículos necesarios, luego ahorre.

Si el NPC no funciona, revisa las horas activas, las herramientas y las rutas transitables hasta el lugar de trabajo y el almacenamiento. Los filtros de minería te permiten elegir bloques o etiquetas.

Véase [schedules](#dochi-npc-core/npc-core-schedules) para horas y [cocción](#dochi-npc-core/npc-core-cooking) para producción de alimentos.

## Hacer una guía estacionaria

![DNPC pantalla Movement AI, con Lock position y Lock rotation cambia cerca de la parte inferior derecha.](assets/media/guides/dnpc-013-neo1211/dnpc-movement.png "DNPC 0.1.3 / NeoForge 1.21.1, Inglés UI. Seleccione Movement AI a la izquierda. Lock position fija la ubicación del NPC; Lock rotation fija su dirección de orientación.")

Habilitar **Movement AI → Lock position** para mantener el NPC en su lugar. **Lock rotation** fija por separado la dirección de su cuerpo / cabeza y anula mirando a los jugadores cercanos.

**Combat AI → Invulnerable** bloquea todo el daño. Deshabilitar **Allow player damage** para bloquear solo el daño causado por los jugadores.

![DNPC 0.1.2 en NeoForge 1.21.1, mostrando Combat AI con salud, daño cuerpo a cuerpo, intervalo de ataque, Invulnerable y Allow player damage.](assets/media/guides/dnpc-012-neo1211/dnpc-combat.png "Invulnerable bloquea todo el daño. Allow player damage controla por separado el daño causado por los jugadores.")

Los entrenadores compatibles Cobblemon aún pueden realizar su tablero / retorno configurado mientras están bloqueados, y luego volver a la posición.

## Deja que los jugadores contraten NPCs

Esta característica necesita **DRM**.

1. Terminar y guardar la apariencia del trabajador, equipo y puestos de trabajo.
2. Crea una entrada de reclutamiento en el editor de empleo de DRM ****.
3. Elija el NPC, la ubicación de inicio, el precio, la duración y los trabajos que el empleador puede editar.
4. Aplicarlo al NPC de reclutamiento a través de **NPC Apply → Function → NPC employment**.
5. Los jugadores hablan con el reclutador para contratar. Por defecto **H → My employment** proporciona parada, devolución, renovación, despedir y recogida de carga.

Un NPC vencido permanece disponible hasta que se recoja su carga restante.

### Elige el trabajador y el contrato

Estas son las **DNPC 0.1.2 + DRM 0.3.1 / NeoForge 1.21.1** pantallas de empleo. En **NPC**, use el buscador al lado **Prepared NPC JSON set** para elegir una plantilla NPC [ guardada](#dochi-npc-core/npc-core-templates). Seleccione su trabajador en lugar de **Default NPC** para usar su apariencia y trabajos preparados en la oferta.

![Pestaña NPC del editor de empleo con el conjunto preparado de NPC JSON, el nombre de visualización de NPC y el interruptor de alquiler.](assets/media/guides/dnpc-012-neo1211/employment-npc.png "Seleccione el NPC que se contrata aquí, en lugar del diálogo o la tienda del reclutador.")

Fije el pago, el costo y la duración en **Contract**. Este ejemplo utiliza diez esmeraldas, **20 Minutos** y **Real Ticks**. Real Ticks sigue los ticks del servidor; World Ticks sigue el tiempo mundial, incluidos los comandos de sueño y tiempo.

![Contrato con un coste esmeralda de diez, un periodo de veinte minutos, contrato Real Ticks y Renovación.](assets/media/guides/dnpc-012-neo1211/employment-contract.png "Leer la unidad de período y el reloj de duración junto con el número. Renovar el contrato controla si la renovación está permitida.")

**Allowed Work** controla qué roles puede asignar el empleador. Un switch no crea un nuevo trabajo que el NPC preparado no soporte.

## Hacer un músico

Con **Immersive Melodies** en 1.20.1 / 1.21.1, agregue un rendimiento de instrumento al cronograma. Elige una canción, un instrumento y una ubicación.

**Use equipped instrument only** necesita un instrumento equipado real. **Provide a temporary instrument if missing** muestra una durante la actuación. Los instrumentos temporales no se convierten en gotas de muerte.
