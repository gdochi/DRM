---
title: Geometría de Hitbox, daño y políticas de repetición
slug: battleworks-hitboxes
order: 235
description: Construye un empuje, alinea su centro y distingue el daño compartido de la configuración por acción.
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

## Un hitbox es el espacio probado para daños.

Una espada o animación visible no crea BattleWorks daño por sí misma. Conecte una definición de Biblioteca Hitbox a la acción Hitbox de un patrón.

## 1. Abra la definición de su acción

1. Seleccione el patrón y la fila de Hitbox de etapa de acción.
2. Presione **Edit this hitbox**.
3. Confirme su nombre y uso.
4. Utilice **Pattern:** para elegir el uso relevante.
5. Devuelve con **Edit pattern**.

Los hitboxes no conectados se pueden previsualizar, pero el tiempo de ejecución real pertenece a una acción vinculada.

![Geometría y temporización del barrido ancho generado Hitbox.](assets/media/guides/battleworks-016-neo1211/battleworks-hitbox-geometry.png "BattleWorks 0.1.6 / NeoForge 1.21.1. El panel del modelo se pliega utilizando su flecha de encabezado. Daño 4, Alcance 2.4 y Espesor 0.5 definen la caja de golpe; el marcador en la marca 27 define cuándo se ejecuta.")

## 2. Elige una forma

| Forma | Controles principales | Uso típico |
| --- | --- | --- |
| Recuadro | Ancho, alto, profundidad | Empuje hacia delante |
| Esfera | Radio | Estallido circundante |
| Cilindro | Radio, Altura | Área de suelo |
| Capsules | Espesor, altura | Volumen vertical redondeado |
| Barrer | Alcance, Espesor, Ángulos, Barrer Pasos | Barra curva |
| Polígono | Al menos tres vértices y altura | Zona irregular |

Los pasos de barrido muestrean el arco; no es un conteo de aciertos. Los puntos de barrido personalizados reemplazan el arco generado automáticamente.

## 3. Ajustar el tamaño antes de los desplazamientos

| Configuración | Significado |
| --- | --- |
| Ancho / Alto / Profundidad | Dimensiones de forma |
| Radio | Radio o alcance de barrido; un radio de 2 da un diámetro de esfera cercano 4 |
| Espesor | Radio del tubo de barrido o radio de la cápsula |
| Desplazamiento X | Cambio lateral local; positivo es la izquierda del PNJ |
| Desplazamiento Y | Cambio vertical desde el centro de la caja de golpe NPC ordinaria |
| Desplazamiento Z | Desplazamiento hacia adelante local |
| Bostezo / Pitch | Rotación horizontal / inclinación |

La altura del centro de la caja de golpe ordinaria es **NPC feet Y + half NPC height + Offset Y**. La compensación Y 0 ya comienza alrededor del centro del cuerpo. Fijarlo a 1 lo mueve otro bloque hacia arriba.

### Construir un empuje

1. Crear una caja de visitas.
2. Ingrese Ancho `0.8`, Altura `1.5`, Profundidad `2.8`.
3. Utilice los desplazamientos X `0`, Y `0`, Z `1.8`.
4. Comienza con Daño `4` y Objetivo bloqueado solo activado.
5. Conéctelo a un evento de acción y obtenga una vista previa del volumen hacia adelante.
6. Prueba al frente y al lado del NPC.

Estos son valores iniciales para un humanoide normal. Vuelva a verificar la geometría después de cambiar el tamaño del modelo o la longitud del arma.

## 4. Multiplicador compartido de daño y acción

```text
configured damage = library Damage × action Damage Multiplier
4 × 1.5 = 6
```

Cambiar biblioteca El daño cambia todas las referencias a ese hitbox. Para fortalecer un solo uso, cambia el multiplicador de esa acción o crea otro hitbox.

Esto se configura daño ** antes** armadura, resistencia, marcos de invulnerabilidad y otras reglas de mod. El Knockback se aplica después de un golpe de daño exitoso.

## 5. Restricción de objetivos y efectos

Solo reduce los golpes al objetivo actual cuando existe uno. Deshabilitarlo puede incluir entidades vivientes cercanas. Una acción puede agregar esta restricción pero no puede aflojar una configuración de biblioteca verdadera.

Para un efecto verificado como `minecraft:slowness`, Amplificador `0` significa nivel I, y duración `40` solicita alrededor de dos segundos. El daño cero todavía se puede usar con un efecto. Una caja de golpeo de daño cero puede producir una advertencia.

## 6. Elija la política de repetición

| hitPolicy | Comportamiento |
| --- | --- |
| ilimitado | Sin restricción adicional de repetición BattleWorks |
| once_per_pattern | Esta acción puede afectar con éxito a cada objetivo una vez durante el patrón |
| once_per_repeat | Cada ocurrencia de esta acción puede afectar a cada objetivo una vez |
| Tiempo de reutilización | Hacer cumplir targetCooldownTicks antes de que esta acción afecte de nuevo a ese objetivo |

Solo se recuerdan las aplicaciones de daño / efecto exitosas. La memoria es ** por acción**, por lo que las acciones separadas de Hitbox siguen siendo intentos independientes. Estas políticas no eliminan la inmunidad a los daños de vainilla.

Para un área persistente, comience con el tiempo de reutilización y targetCooldownTicks `10`, luego pruebe los golpes reales antes de aumentar la frecuencia de repetición.

## 7. Alinear contacto

1. Elija el uso del patrón de la caja de golpe y la etapa de acción.
2. Selecciona un clip compatible y reproduce a una velocidad de vista previa más lenta.
3. Encuentra la postura de contacto.
4. Vuelve al patrón y mueve Event Tick.
5. Guardar/aplicar y probar frente, laterales, traseros y diferentes alturas.

Si es demasiado alto, marque Desplazamiento Y. Si está lateralmente, marque Desplazamiento X y Yaw. Si es corto, compare Offset Z, dimensiones y rango de inicio. Continuar con [animación](#mob-editor/battleworks-animation).

## Hitboxes compartidas y avisos vinculados

Antes de editar una definición, comprueba sus usos en **Simple edit**. Daño y geometría compartidos afectan a todos los patrones que los referencian. **Make this hitbox independent** copia la definición y reconecta las referencias del patrón actual; los demás conservan la original. [Copias independientes de técnicas](#mob-editor/battleworks-authoring) también copian recursos vinculados y destinos de combo.

Para un aviso relativo al NPC, abre **Telegraph** en la preparación. Activa **Link ground warning to hitbox**, elige **Warning hitbox** o **Next hitbox contact** y, si quieres, **Fill until contact**. El aviso usa la huella de la hitbox y el momento de contacto. Es visual; la acción Hitbox sigue causando el daño.

Una explosión en una posición guardada o el área de un hechizo externo necesita su propio ancla y aviso. El vínculo no predice geometrías arbitrarias de hechizos. Revisa toda la etapa y prueba el contacto en el mundo.
