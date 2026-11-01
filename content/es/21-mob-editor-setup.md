---
title: Instalación y preparación de NPC
slug: mob-editor-setup
order: 220
description: Prepare los mods correspondientes, un NPC de prueba y el flujo de trabajo de guardado/aplicación correcto.
product: mob-editor
section: start
category: BattleWorks
status: Guía
version: 0.1.6
audience: Principiantes y creadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Preparar la instalación de la práctica

Esta es la combinación utilizada para las pantallas capturadas y la prueba de primer ataque. Instalar **BattleWorks, DRM and an NPC mod**. Para otros archivos Minecraft/loader, consulte [Opciones de instalación](#mob-editor/battleworks-update-0-1-6).

| Componente | Este ejercicio |
| --- | --- |
| Minecraft / cargador | 1.21.1 / NeoForge |
| Java | 21 |
| BattleWorks | 0.1.6 |
| DRM | 0.3.1 |
| PNJ | DNPC 0.1.3 |

Instalar sus dependencias coincidentes en la misma instancia. Esta tabla registra una combinación probada; compruebe los archivos seleccionados Minecraft, el cargador y los requisitos antes de reemplazar una instalación compatible existente. Coincidir con el servidor y las instalaciones del cliente también.

Los actores CustomNPCs compatibles también están disponibles en Forge 1.20.1 y Fabric/NeoForge 1.21.1. **Use the DNPC workflow on 26.3 and later**; CustomNPCs se excluye allí.

## 2. Crear una práctica DNPC

1. Sigue [creando un DNPC](#dochi-npc-core/npc-core-setup) en Creativo para colocar un NPC.
2. Dale un nombre reconocible y comienza con un modelo de jugador normal.
3. Prepare terreno plano sin otros NPC o criaturas cercanas.
4. Este ejercicio utiliza BattleWorks **Scan Without Target** para encontrar al jugador. Evite asignar trabajo u otro controlador de combate al mismo NPC durante el ejercicio.
5. Autor en Creativos y ataques de prueba en Survival.

![Preparar al actor en la pantalla de DNPC Identity.](assets/media/guides/dnpc-013-neo1211/dnpc-identity.png "DNPC 0.1.3 / NeoForge 1.21.1. El archivo BattleWorks se adjuntará a este actor. La apariencia y el equipo están separados de BattleWorks daños y cajas de golpe.")

Una espada sostenida ayuda a comunicar el ataque. El ejercicio establece el daño en el BattleWorks Hitbox en lugar de depender del daño de ataque del objeto. Aumentar la salud de los NPC puede esperar hasta que el jefe haga ejercicio.

## 3. Abierto BattleWorks para el PNJ

Seleccione el NPC de práctica con el núcleo DRM y abra su editor BattleWorks. Cargue un archivo de combate existente o elija **Create New**, luego continúe con [ su primer ataque cuerpo a cuerpo](#mob-editor/battleworks-first-attack).

La categoría de aplicación de archivo del NPC es **Battlework JSON**. Si comenzó a crear sin un NPC, guarde el archivo, selecciónelo en el catálogo de ese NPC y presione **Apply Battlework**. Para otro modelo, configure DNPC apariencia y su [conexión de animación](#mob-editor/battleworks-animation) primero.

## 4. Agregue integraciones cuando la función las necesite

| Objetivo | Preparación adicional |
| --- | --- |
| Brazo básico swing y hitbox | Comience con la instalación probada de arriba |
| Mejor movimiento de combate | Compatible Better Combat, el movimiento y un arma compatible |
| Clips de Gecko | Activos de modelo, textura y animación más su proveedor |
| Clips del animador del jugador | Proveedor compatible y clips reales |
| Hechizos/habilidades de otros mods | El mod, las dependencias y la habilidad registrada |
| Sonidos/texturas personalizados | Un mod o paquete de recursos que proporciona sus ID |

Primero verifique el ataque básico, luego agregue movimientos o habilidades para que los errores de las aplicaciones de archivo sigan siendo fáciles de distinguir de los activos externos faltantes.

## 5. Entender Guardar, Save As, Cargar y Aplicar

| Funcionamiento | Resultado | Próximo paso |
| --- | --- | --- |
| Cargar | Abre un archivo de servidor en el editor | Editar, guardar o aplicarlo |
| Save As | Escribe JSON en el camino elegido | Vincular el NPC a la nueva ruta |
| Guardar con un NPC seleccionado | Guarda el documento y vincula ese NPC | Combate de prueba |
| Guardar sin un NPC, archivo cargado | Actualiza ese archivo | Compruebe el enlace del NPC previsto |
| Guardar sin un NPC, nuevo documento | Abre el símbolo del nombre de archivo | Guardar, luego aplicar a un NPC |
| Catálogo de NPC Aplicar | Vincula la ruta de archivo del servidor seleccionada | Combate de prueba |

Introduzca `training/first_sword.json` en Save As. El camino resultante es:

```text
config/dochi_rpg_maker/mobs/patterns/training/first_sword.json
```

No introduzca la ruta de configuración completa o una ruta de unidad de Windows en el campo ruta relativa.

Los valores predeterminados agrupados son plantillas protegidas. Utilice **Save As** para una copia de trabajo. Si el editor tiene un NPC adjunto, al presionar **Save after Save As** se vincula ese NPC al nuevo archivo.

## 6. Verificar el resultado guardado

1. Resuelva cualquier validación o error de guardado del servidor.
2. Actualizar Cargar y volver a abrir el archivo de trabajo.
3. Aplicarlo a través del catálogo de NPC, o Guardar con ese NPC adjunto.
4. Prueba como jugador de Supervivencia.

Cuando se conecta a un servidor remoto, los archivos se guardan en el directorio de configuración del servidor ****. Una copia en su directorio de un solo jugador separado no aparecerá en ese servidor.

Los NPC ahora hacen referencia a archivos en lugar de almacenar copias JSON completas. Usa rutas separadas Save As cuando diferentes NPCs necesiten encuentros diferentes. Continúe con [ su primer ataque](#mob-editor/battleworks-first-attack).
