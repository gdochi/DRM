---
title: Conectar modelos y animación de combate
slug: battleworks-animation
order: 240
description: Elija clips compatibles y alinee la etapa, la línea de tiempo y el tiempo de animación del elenco.
product: mob-editor
section: authoring
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

## 1. Preparar el modelo en NPC Basic

BattleWorks utiliza las APIs de modelo y reproducción de DRM. Configure primero la geometría, las texturas, los recursos de animación y las asignaciones semánticas en **DRM NPC Basic**.

| Modelo o método | Fuente apropiada |
| --- | --- |
| Humanoide normal | Swing principal o proveedor de movimiento humanoide instalado |
| DRM Modelo de Gecko | Un clip real del archivo de animación de esa modelo |
| DRM modded entity | Clips nativos expuestos por su integración DRM |
| DRM Comportamiento | Un mapeo semántico configurado como ataque |
| Prueba de solo geometría | No hay animación explícita / Ninguno |

Un clip Gecko y una capa de postura humanoide Better Combat no son intercambiables.

![Escenario de acción Animación + Hitbox ajustes con main_hand.](assets/media/guides/battleworks-016-neo1211/battleworks-stage-animation.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Build Assist generó Vanilla Swing / main_hand a velocidad 1. Elegir animación abre clips; Editar este hitbox abre detección de hits.")

Para las DNPC ordinarias, prepare la apariencia en **DNPC editor → Appearance & Model**. Encuentra el mapeo de la etapa a través de la línea de tiempo **Action → Stage → Animation + Hitbox**. Las instrucciones básicas de NPC se aplican a la configuración del modelo DRM.

## 2. Seleccione un clip en la Biblioteca de Hitbox

1. Abrir **Edit this hitbox** de la acción.
2. Elija el uso bajo **Pattern:**.
3. Seleccione Acción en la barra de herramientas de la etapa del modelo.
4. Busque **Clips** y seleccione un clip real.
5. Presione Reproducir, inspeccione el contacto y luego Detener.
6. Cambia la marca de evento del patrón para que coincida con el contacto.

Patrón selecciona un uso; Clips selecciona animación. Una vista previa separada puede usar una configuración de modelo guardada o un modelo predeterminado. Vuelva a abrir con el NPC real si el modelo de vista previa no coincide.

## 3. Tres localizaciones de animación

| Ubicación | Finalidad |
| --- | --- |
| Animación de escenario | Inicie un mapeo en la entrada del escenario |
| Línea de tiempo Acción de animación | Iniciar un movimiento específico en una marca de evento |
| Habilidad Cast Animación | Solicitar una moción sobre cada lanzamiento exitoso |

Comience con una animación de acción. Una animación de escenario configurada tiene prioridad sobre las acciones de animación ordinarias dentro de esa etapa. Para programar varios movimientos explícitos, primero establezca la animación del escenario en Ninguno.

## 4. Cambios de fase en 0.1.5

- Las etapas consecutivas que usan la misma asignación comparten un lapso de reproducción continuo.
- Un mapeo de etapa diferente puede comenzar en la entrada de etapa.
- La recuperación puede esperar mientras una animación de acción/difusión de autoría aún posee su tiempo de reproducción especificado.
- La duración de la acción y las garrapatas de animación utilizan sus duraciones de autoría en lugar de estirarse a todo el patrón restante.
- Las comprobaciones repetidas de hitbox no reinician la animación del escenario.

No aplique la antigua limitación 0.1.2 “una animación de primera etapa para todo el patrón” a esta versión.

## 5. Ajuste la velocidad y el contacto por separado

1. Comienza con Velocidad de animación 1.0.
2. Coincidir con el evento Marcar la postura de contacto.
3. Aumente ligeramente la velocidad de animación solo cuando sea necesario.
4. Vuelva a verificar el contacto y la longitud de la etapa después de cambiarla.
5. Guarda/aplica y compara el combate real.

Vista previa de la velocidad controla la observación. La velocidad de animación se guarda y afecta al movimiento real. La búsqueda arbitraria de fotogramas no está garantizada para todos los clips Gecko; también inspeccione la reproducción normal y reinicie.

## 6. Preservar una selección intencional Ninguna

Lo siguiente es un objeto de animación **stage**, no un archivo de combate completo:

```json
{
  "explicitSelection": true,
  "provider": "none",
  "id": "",
  "playback": "once",
  "speed": 1.0,
  "fadeTicks": 0
}
```

Sin una elección explícita, las etapas más antiguas de solo hitbox pueden migrar al swing básico.

## 7. Diagnosticar una lista de clips vacía

1. Consulte el proveedor de modelos de NPC Basic.
2. Distinguir geometría `.geo.json` de animación `.animation.json`.
3. Confirme que el modelo hace referencia al recurso de animación deseado.
4. Compruebe proveedores opcionales y recursos del cliente.
5. Actualizar después de cargar los activos asincrónicos.
6. Verifique que DRM realmente exponga el clip nativo necesario.

Utilice la lista actual de NPC en lugar de inventar IDs.

## Modelo de instantáneas

Un documento con `drmNpcModel` puede restaurar la configuración del modelo cuando se aplica. `previewNpcModel` y `previewTexture` son datos de vista previa separados. Compruebe las instantáneas antes de aplicar un encuentro importado a un modelo diferente.

Finalmente, verifica que el NPC real reproduzca el mismo movimiento previsto durante el combate.
