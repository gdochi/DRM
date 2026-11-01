---
title: API de script de ataque incorporada
slug: script-combat-api
order: 127
description: Usa drmCombat en scripts CustomNPCs para habilitar o deshabilitar los ataques cuerpo a cuerpo y a distancia incorporados en un NPC.
product: core
category: API de scripts
section: script-api
status: Estable
version: 0.3.1
audience: CustomNPCs Descubrimiento de la Tierra
tags:
  - script
  - customnpcs
  - combat
  - ai
translationSource: en
translationMethod: assisted
---

## Deshabilitar ataques incorporados para un NPC con script

Un actor CustomNPCs que usa hechizos o ataques personalizados puede desactivar sus ataques cuerpo a cuerpo y a distancia incorporados. El resultado a continuación comprueba ambos switches almacenados después de deshabilitarlos. Esta configuración por sí sola no agrega ningún hechizo o patrón de combate. Para los ataques basados en pantalla, comience con [BattleWorks](#mob-editor/battleworks-first-attack).

![Deshabilite los ataques incorporados para un resultado npc con script.](assets/media/guides/drm-031-forge1201-apis/api-combat-switches.png "DRM 0.3.1 / Forge 1.20.1 con CustomNPCs. true en chat significa que el cambio fue aceptado; melee false / raged false son los estados inhabilitados consultados. Esto comprueba el estado del interruptor en lugar de un ciclo de combate completo.")

## Primeros pasos

`drmCombat` es una API de script autorizada por el servidor para habilitar o deshabilitar independientemente un CustomNPCs NPC construido en cuerpo a cuerpo y ataques a distancia.

Deshabilitar ambos ataques incorporados para un NPC que solo utiliza hechizos o ataques con script personalizados.

```js
function init(event) {
    drmCombat.setAttacks(event.npc, false, false);
}
```

Permitir solo ataques a distancia de la siguiente manera.

```js
function init(event) {
    drmCombat.setAttacks(event.npc, false, true);
}
```

:::note Objetivo
Los métodos que cambian de estado solo aceptan un NPC del lado del servidor CustomNPCs. Otra entidad o un objetivo del lado del cliente devuelve `false`.
:::

## Interruptores de ataque individuales

```js
drmCombat.setMeleeAttack(event.npc, false);
drmCombat.setRangedAttack(event.npc, true);
```

| Método | Efecto cuando `enabled` es `false` |
| --- | --- |
| `setMeleeAttack` | Detiene el inicio, la continuación y la ejecución cuerpo a cuerpo. |
| `setRangedAttack` | Detiene el inicio de AI a distancia y la ejecución a distancia directa. |

Utilice `setAttacks(npc, meleeEnabled, rangedEnabled)` para cambiar ambos interruptores en una llamada.

## Estado actual de lectura

```js
var meleeEnabled = drmCombat.isMeleeAttackEnabled(event.npc);
var rangedEnabled = drmCombat.isRangedAttackEnabled(event.npc);
```

Ambas consultas devuelven `true` cuando no se ha guardado ningún bloqueo. Por lo tanto, los NPC existentes mantienen el valor predeterminado heredado en el que se permiten los ataques cuerpo a cuerpo y a distancia.

Los métodos de consulta también tratan un objetivo no válido como el valor predeterminado heredado `true`. No los use para validar un objetivo; en su lugar, verifique el valor de retorno de un método que cambie de estado.

## Persistencia y comportamiento de IA

Los switches se almacenan en el lado del servidor en PersistentData del NPC. Sobreviven a las recargas de NPC y del mundo. Al volver a habilitar un ataque, se quita la llave de la cerradura.

```js
function enableNormalCombat(npc) {
    return drmCombat.setAttacks(npc, true, true);
}
```

Rango `enabled` significa permitido, no listo. El CustomNPCs NPC también debe tener un elemento de proyectil no vacío en su ranura de proyectil antes de que la IA a distancia pueda funcionar. Cuando los ataques a distancia están desactivados o no existe ningún proyectil utilizable, un NPC con cuerpo a cuerpo habilitado se trata como libre de proyectiles para que su AI cuerpo a cuerpo pueda funcionar.

## Valores de retorno y patrón de uso

Los métodos de cambio de estado devuelven `true` después de aplicar valores a un NPC del lado del servidor CustomNPCs y `false` cuando no pueden aplicar el cambio.

```js
function makeMagicOnly(npc) {
    if (!drmCombat.setAttacks(npc, false, false)) {
        // Verify that this is a server-side CustomNPCs NPC.
        return false;
    }

    // Configure separate spell or scripted attacks here.
    return true;
}
```

Deshabilitar los ataques incorporados no bloquea el daño por secuencias de comandos por separado, como una llamada `drmHitbox`. Estos interruptores controlan solo las rutas de ataque cuerpo a cuerpo y a distancia CustomNPCs incorporadas.

## Referencia de firma completa

```js
drmCombat.setMeleeAttack(npc, enabled);
drmCombat.setRangedAttack(npc, enabled);
drmCombat.setAttacks(npc, meleeEnabled, rangedEnabled);
drmCombat.isMeleeAttackEnabled(npc);
drmCombat.isRangedAttackEnabled(npc);
```
