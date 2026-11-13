---
title: Conectar modelos y animación de combate
slug: battleworks-animation
order: 240
description: Elija clips compatibles y alinee la etapa, la línea de tiempo y el tiempo de animación del elenco.
product: mob-editor
section: authoring
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

## 1. Preparar el modelo del actor

Configura primero el actor real: en DNPC usa **Appearance & Model**; para modelos DRM usa **DRM NPC Basic** y sus recursos. **DRM es opcional**. Sin DRM, BattleWorks usa el movimiento humanoide nativo y proveedores opcionales compatibles; con DRM instalado, DRM mantiene el control de la animación.

| Modelo o método | Fuente adecuada |
| --- | --- |
| Humanoide normal | Main-Hand Swing o fuente compatible Player Animator / PAL |
| Movimiento de arma Better Combat | Recursos Better Combat compatibles y arma admitida |
| Modelo Gecko | Clip real expuesto por el proveedor y el archivo de animación |
| Entidad modificada / Behavior DRM | Clips o mapeos semánticos de la integración DRM |
| Prueba solo de geometría | No Animation / None explícito |

Los clips humanoides personalizados pueden aparecer con su propio namespace; no se limitan a ID Better Combat. Un clip Gecko y una capa humanoide no son intercambiables. CustomNPCs solo es una integración antigua opcional anterior a 26.3.

## 2. Seleccionar un clip en Hitbox Library

1. Desde la acción del patrón, abre **Edit this hitbox**.
2. En **Pattern:** selecciona el uso vinculado y su etapa, como Action.
3. Lee la descripción de la fuente sobre **Clips** y busca por nombre o ID.
4. Selecciona un clip compatible, pulsa Play, comprueba el contacto y después Stop.
5. Ajusta el evento de impacto al contacto y guarda/aplica.

Una selección sin patrón vinculado es temporal en la vista previa. Selecciona el uso deseado para guardar su animación de etapa. La vista separada usa la apariencia copiada del NPC, ajustes guardados o un actor predeterminado; vuelve a abrir con el NPC real si el modelo difiere.

![Fuente, búsqueda y nombres largos en Hitbox Library.](assets/media/guides/battleworks-017-20261113/animation-clips.png "BattleWorks 0.1.7 / Fabric 1.21.1 / DRM 0.3.2 / DNPC 0.1.4, con recursos Better Combat instalados. La descripción ocupa varias líneas sobre la búsqueda y el nombre largo se muestra al pasar el cursor. No hay movimiento de etapa compatible asignado en esta imagen; no demuestra reproducción.")

Los nombres largos permanecen en una fila y muestran el texto completo al pasar el cursor. Arrastra el divisor entre modelo y lista para ampliar, o actualiza después de cargar los recursos.

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

## 7. Diagnosticar una lista vacía o incompatible

1. Comprueba el modelo real y la descripción de la fuente sobre Clips.
2. Para Gecko, distingue geometría `.geo.json` y animación `.animation.json` y revisa el recurso vinculado.
3. Para humanoides, comprueba el proveedor Player Animator / PAL correspondiente y los recursos reales del cliente. Better Combat solo hace falta para sus propios movimientos.
4. Actualiza después de la carga asíncrona. Usa clips ofrecidos para el modelo actual sin inventar ID.
5. Con DRM, revisa mapeos y reproducción; sin DRM, prueba el movimiento nativo antes de añadir clips opcionales.

Una entrada visible en el catálogo no demuestra que un modelo incompatible pueda reproducirla. Compara el NPC real después de guardar y aplicar.

## Modelo de instantáneas

Un documento con `drmNpcModel` puede restaurar la configuración del modelo cuando se aplica. `previewNpcModel` y `previewTexture` son datos de vista previa separados. Compruebe las instantáneas antes de aplicar un encuentro importado a un modelo diferente.

Finalmente, verifica que el NPC real reproduzca el mismo movimiento previsto durante el combate.
