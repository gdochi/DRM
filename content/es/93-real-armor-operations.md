---
title: Comandos y solución de problemas
slug: dochi-real-armor-operations
order: 930
description: Comandos de administrador, comprobaciones de estado, uso de depuración y problemas comunes CustomNPCs o Easy NPC.
product: dochi-real-armor
category: Comandos y solución de problemas
section: operations
status: Estable
version: 0.1.6
audience: Operadores de servidores y creadores de modpack
tags:
  - commands
  - troubleshooting
  - debug
translationSource: en
translationMethod: assisted
---

## Comandos

Todos los comandos requieren un nivel de permiso 2.

```mcfunction
/dochi_real_armor status
/dochi_real_armor split true
/dochi_real_armor durability false
/dochi_real_armor debug true
```

`status` informa del modo de parte del cuerpo, durabilidad, depuración, soporte CustomNPCs y soporte Easy NPC. Los otros comandos actualizan la configuración común inmediatamente.

## Depurar de forma segura

![Depurar mensajes de daño en Compatibilidad NPC.](assets/media/guides/armor-014-neo1211/armor-compatibility.png "Real Armor 0.1.4 / NeoForge 1.21.1. Utilice los mensajes de daño Debug en la GUI o /dochi_real_armor debug true para habilitar las observaciones de daño.")

Habilite la depuración temporalmente para ver la parte del cuerpo seleccionada y reducir el daño. Debug es un observador: la armadura debe seguir trabajando después de `/dochi_real_armor debug false`.

## Lista de comprobación de solución de problemas

| Síntoma | Comprobar |
| --- | --- |
| Sin reducción de armadura | Confirme que el cálculo de la armadura y el interruptor de compatibilidad NPC correspondiente estén activados |
| Se ignora el NPC fácil | Confirme que su ID de entidad utiliza el espacio de nombres `easy_npc` y el soporte de Easy NPC está activado |
| Los tiros de la parte inferior del cuerpo usan la armadura equivocada | Confirme que la compilación Forge 0.1.1 o NeoForge 0.1.2 coincidente esté instalada en el servidor y pruebe con el modo de parte del cuerpo más debug |
| Cada ranura protege cada golpe | La armadura de la parte del cuerpo está APAGADA, o la posición de golpe no se pudo resolver |
| La protección no hace nada | Compruebe el interruptor de protección y si el tipo de daño pasa por alto armadura o encantamientos |
| Los cambios de GUI son rechazados | Usar una cuenta con nivel de permisos 2 |
| Error de inicio de duplicado-mod | Retire los frascos más antiguos `cnpc_real_armor` y `dochi_real_armor` para que solo quede una versión |

Al informar de un problema, incluya `logs/latest.log`, los nombres de archivo exactos del tarro, las versiones del mod NPC y del mod de arma, los ajustes relevantes y si el mismo golpe se comporta de manera diferente con el debug OFF.
