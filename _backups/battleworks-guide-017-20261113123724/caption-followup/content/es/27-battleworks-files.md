---
title: Archivos, copias de seguridad, muestras y actualizaciones
slug: battleworks-files
order: 280
description: Utilice las rutas del servidor correctamente y empaquete todos los recursos referenciados.
product: mob-editor
section: reference
category: BattleWorks
status: Guía
version: 0.1.7
audience: Principiantes y creadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Encuentra el directorio correcto

Las rutas son relativas a la instancia Minecraft activa o al servidor dedicado.

| Ruta | Sumario |
| --- | --- |
| `config/dochi_rpg_maker/mobs/patterns/` | Combate JSON |
| `config/dochi_rpg_maker/mobs/animations/` | DRM Modelo de recursos de animación |
| `config/dochi_rpg_maker/mobs/geometry/` | DRM activos de geometría |
| `config/dochi_rpg_maker/particles/` | Particle Maker archivos separados |
| `config/dochi_rpg_maker/settings/battleworks_client.json` | Preferencias de editor/presentación local |
| `config/dochi_rpg_maker/settings/battleworks_global_rules.json` | Banderas de combate compartidas |

Usa **criaturas/patrones**, no las criaturas más antiguas/ubicación .json. Geometría y animación JSON no son documentos de combate.

## 2. Organizar archivos de trabajo

```text
config/dochi_rpg_maker/
  mobs/
    patterns/
      training/
        first_sword.json
      bosses/
        training_captain.json
    animations/
    geometry/
  particles/
    training_ring.json
```

Introduzca rutas como bosses/training_captain.json en relación con los patrones. Evite rutas absolutas, prefijos de unidad, recorridos principales y segmentos vacíos.

Utilice letras, dígitos, guiones bajos, guiones y subcarpetas para los nombres de archivo de partículas. Omita .json solo en el comando de partículas, no en las referencias almacenadas.

## 3. NPCs hacen referencia a archivos compartidos

NPC NBT almacena una ruta de combate y pequeñas banderas en lugar de una copia completa de JSON.

1. La aplicación de un archivo a varios NPC comparte el diseño.
2. Utilice Save As para NPCs que necesitan diferentes diseños.
3. Mueva JSON referenciado junto a un mundo transferido o clon.
4. Incluya dependencias de partículas, modelos, sonidos, ventanas emergentes y proveedores.

Cargar abre el archivo. Aplicar lo ata. Ver [guardar/aplicar comportamiento](#mob-editor/mob-editor-setup).

![El archivo de combate guardado en el servidor y enlazado a un DNPC.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. El título abrevia la ruta; el archivo verificado es config/dochi_rpg_maker/mobs/patterns/training/first_sword.json. Transferir este archivo con el NPC a otro servidor.")

## 4. Actualizar ediciones externas

1. Retrocede en el JSON.
2. Editar y guardar externamente.
3. Compruebe la sintaxis estricta de JSON.
4. Actualiza el catálogo del editor y vuelve a abrir el archivo.
5. **Reapply to the NPC or restart the server**.
6. Verificar el comportamiento cambiado.

Combat lee los datos almacenados en caché en lugar de sondear el disco cada tick. Catalog Refresh por sí solo no prueba que el NPC en vivo esté actualizado. Los archivos de partículas tienen una caché separada y una ruta de guardado.

## 5. Archivos de práctica incluidos con estos documentos

| Archivo | Carpeta | Preparación |
| --- | --- | --- |
| [first_sword.json](./assets/media/battleworks/first_sword.json) | `mobs/patterns/training/` | Salvados, aplicados y probados con BattleWorks 0.1.6 / DNPC 0.1.3 / NeoForge 1.21.1 |
| [training_swordsman.json](./assets/media/battleworks/training_swordsman.json) | mobs/patterns/training/ | DNPC humanoide normal o actor antiguo compatible; búsqueda alternativa activada |
| [training_ring.json](./assets/media/battleworks/training_ring.json) | partículas/ | Particle Maker o el comando de partículas |

Si el navegador abre JSON, guárdelo como un archivo. Compruebe que no se convirtió en .json.txt. La muestra de combate utiliza un swing básico y un sonido de vainilla sin una configuración de modelo guardada. La muestra de partículas utiliza una partícula de vainilla.

## 6. Paquetes de entrenamiento separados y Puño de Jar

El paquete de entrenamiento de archivo 30 se mantiene bajo ejemplos de fuente/paquete de entrenamiento/criaturas/patrones. Es **no incluido o instalado automáticamente en el inicio**. Cópielo solo si realmente obtuvo el paquete.

Nombres como 1 .json, 1 .json y 2 .json describen dificultad/integración. Lea la autoría de cada archivo.requiredMods y authoring.steps. Incluso una muestra de entrenamiento físico puede requerir clips Better Combat.

| Muestra del puño del tarro | Finalidad |
| --- | --- |
| battleworks_sample_jar_fist_preview.json | Combat disabled, vista previa de daño cero |
| battleworks_sample_jar_fist_combat.json | Perseguir, ataques y pruebas de retirada |

Cuando se proporcione en los recursos de muestras del JAR, cópielos a patrones antes de cargarlos. El modelo Jar Fist, las texturas y los recursos de animación están separados. Los clips previstos incluyen ready_to_fight, sword_attack, sword_attack2 y rollo; otros modelos necesitan reemplazos compatibles.

Las plantillas de inicio agrupadas y los jefes distribuidos por separado, la música y las ventanas emergentes son paquetes diferentes. La actualización del mod no instala todos los materiales de encuentro externos.

## 7. Actualizar con cuidado

1. Respalda mundo y config antes de cambiar JAR.
2. Instala BattleWorks 0.1.7 para el Minecraft/loader correcto; elimina JAR antiguos duplicados de BattleWorks o Mob Editor.
3. DRM es opcional. Si usas sus funciones, comprueba las dependencias reales de DRM y proveedores de ese entorno.
4. Reabre el combate y revisa vínculo del NPC, modelos, habilidades y audio.
5. Vuelve a aplicar y prueba combate, limpieza y persistencia tras reiniciar.

Los archivos antiguos reconocidos pueden migrar de mobs a patterns, guardando sus bytes originales en config/dochi_rpg_maker/backups/battleworks-mobs-patterns-v1. Los conflictos y JSON desconocidos/de modelos se conservan. Reaplica después de reorganizar; los nombres ambiguos no se recuperan de forma fiable.

El ID sigue siendo dochi_battleworks. La conversión de modelos antiguos no proporciona un proveedor ausente. Los actores y recursos de CustomNPCs solo pertenecen a versiones anteriores compatibles y no son una integración nativa de 26.3.

## 8. Empaquetar un encuentro

Incluye JSON de combate, JSON de partículas, modelos, sonidos, archivos popup/GUI, clones y versiones mod requeridas. Pruebe Cargar y Aplicar en un NPC nuevo en el entorno de destino.

Continúe con [JSON reference](#mob-editor/battleworks-json-reference) o [troubleshooting](#mob-editor/battleworks-troubleshooting).

## Biblioteca personal de técnicas

**Save technique** guarda un paquete reutilizable para tu jugador en el servidor actual. Directorio del servidor:

```text
config/dochi_rpg_maker/battleworks/pattern_library/<UUID>/
```

El límite es de 128 entradas válidas por jugador. La ruta sigue bajo dochi_rpg_maker incluso sin DRM.

Usa **My techniques → Load technique** para importar en otro documento. Patrones y recursos vinculados reciben ID nuevos. Pueden incluirse archivos de partículas del servidor; modelos, sonidos, habilidades y mods externos son dependencias separadas. Copiar solo el JSON de combate del NPC no transfiere la biblioteca personal. Consulta [recetas y copias](#mob-editor/battleworks-authoring).

Deshacer restaura el documento, no una entrada ya guardada en la biblioteca. Al mover servidores, respalda archivos de combate y biblioteca.
