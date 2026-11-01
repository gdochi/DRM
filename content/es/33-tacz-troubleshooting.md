---
title: Solución de problemas
slug: warfare-troubleshooting
order: 360
description: Diagnosticar Dochi's Warfare pistolas NPC, adaptadores opcionales, IA de vehículos, herramientas clonadas, trampas, munición, efectos visuales y rendimiento.
product: dochi-warfare
category: Operaciones
section: operations
status: Proyecto
version: 0.3.1
audience: Operadores
tags:
  - troubleshooting
  - reload
  - npc
translationSource: en
translationMethod: assisted
---

## Flujo de aislamiento rápido

Cuando un NPC de arma de fuego falla, reduzca la configuración antes de cambiar muchos valores:

1. Usa uno nuevo DNPC. Los actores compatibles CustomNPCs también están disponibles en 1.20.1 y 1.21.1.
2. Utilice una pistola simple TACZ 1.1.8 antes de probar un adaptador opcional PointBlank o SuperbWarfare.
3. Enciende `TACZ Fire NPC Mode` y `Enabled`.
4. Utilice `Stance: Ranged` o `Stance: Auto`.
5. Manténgase `Ammo Stock: -1`.
6. En Objetivos, seleccione el objetivo de prueba deseado. Una lista vacía no hace automáticamente que cada entidad sea hostil.
7. Pruebe con un objetivo visible dentro de `Max Distance`.

Si esto funciona, el addon y el bucle del arma están bien. Agregue filtros, munición finita, movimiento, piscinas y FX paso a paso.

![M4A1 seleccionado en la pantalla real de la pistola DW.](assets/media/guides/warfare-031-neo1211/dw-gun.png "DW 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1, Inglés UI. Confirme el arma deseada tanto en el arma almacenada como en la vista previa de NPC. Esto muestra la selección, no la prueba de disparo.")

## Guía de síntomas

| Síntoma | Cheques probables |
| --- | --- |
| `DW Npc Core` no abre la GUI esperada | Utiliza el modo creativo. Haga clic con el botón derecho en un DNPC o NPC CustomNPCs compatible para la configuración de NPC, un vehículo SuperbWarfare compatible para la configuración del vehículo o aire para la biblioteca de clones. |
| NPC nunca dispara | Marca `TACZ Fire NPC Mode`, `Enabled`, posición, pistola seleccionada, visibilidad del objetivo, `Max Distance`, reglas del objetivo y stock de munición. |
| NPC ve el objetivo, pero espera | Verifica `Combat Delay Ms`, `Detect Angle`, `Instant Combat Angle` y línea de visión. |
| NPC falla un objetivo cercano detrás de él | Verifique `Close Detection` y `Close Detect Distance`. OFF se espera para un NPC de estilo backstab intencional. |
| NPC ignora disparos de jugadores o bloquea acciones | Verifique `Sound Detection`, cada rango de eventos, `Detect Distance` y `Sound Investigation`. Los jugadores creativos y espectadores son ignorados. |
| El ritmo de disparo de NPC es incorrecto | Compruebe `RPM Mode`, `Fixed RPM` o `RPM Min/Max`, los límites de ráfaga y el modo de disparo / enfriamiento nativo del arma operada. Los adaptadores externos no pueden exceder la cadencia nativa de un arma. |
| La rampa de precisión nunca avanza | Confirme que el objetivo es un jugador, visible, dentro de `Ramp Max Range`, y moviéndose horizontalmente por encima `Min Target Speed`. |
| NPC se detiene después de vaciar el arma | Verifica `Reload`, `Supply Ammo`, `Ammo Stock`, `Reload Type`, `Ammo-Aware Switching` y repliegue cuerpo a cuerpo/desarmado. |
| No se utiliza daño personalizado, retroceso o velocidad de ataque | Compruebe la selección y los valores de `Gun Spec`/`Weapon Spec` o `Custom` en `Gun` y `Melee`. |
| No aparece el movimiento del arma Better Combat | Revisa Better Combat, la criatura Player Animator, los NPC's `Better Combat Compatibility`, y registra los ataques para el arma. Se espera un swing vainilla mano principal cuando el movimiento registrado no se puede reproducir. |
| La velocidad de ataque personalizada se ignora durante la compatibilidad con Better Combat | La compatibilidad bloquea el tiempo al efectivo del arma `ATTACK_SPEED`. Desactivar `Better Combat Compatibility` para usar una velocidad de ataque `Custom`. |
| Patrulla entra en una pared o hace una pausa a cada paso | Verifique `Default Walk Speed`, puntos de patrulla, altura vertical y accesibilidad A . También confirme que 0.3.1 está instalado tanto en el cliente como en el servidor. |
| NPC ataca el objetivo equivocado | Limpie los filtros de ID de entidad, las etiquetas requeridas, las etiquetas rechazadas y las reglas de etiqueta de la misma facción, luego vuelva a agregarlas gradualmente. |
| NPC sigue mostrando el arma anterior o incorrecta | Confirme que ambos lados usan la corriente 0.3.1, luego guarde de nuevo. Verifique que el elemento sea compatible con su adaptador TACZ, PointBlank o SuperbWarfare y elimine los accesorios físicos de munición improvisada. |
| `DW Pose Core` no abre el editor | Confirmar el modo Creativo, un modelo de jugador Steve/Alex CustomNPCs, una distancia dentro de 12 bloques, y que el núcleo permanezca en cada mano. |
| Una pose personalizada guardada no es visible | En `DW Npc Core > Pose`, confirme que la acción utiliza `Custom JSON` y el perfil previsto. El archivo debe existir bajo `config/dochi_warfare/poses/`. |
| Los cambios de grupo no se pueden guardar | Haga que la probabilidad en línea sea total `100%` o presione `Equalize`. La edición de una fila no redistribuye automáticamente las otras. |
| Las entradas debajo de un grupo de armaduras largas no son visibles | Desplácese dentro de la reserva de armadura con la rueda del ratón o arrastre la barra de desplazamiento interna del lado derecho. Si toda la pantalla está recortada, también ajuste vainilla `GUI Scale`. |
| Faltan iconos de alerta visual | Compruebe la configuración por NPC `Alert Icons` y la configuración de visibilidad del marcador del lado del cliente `dochi_warfare Config`. |
| La GUI parece distorsionada | Ajuste `GUI Scale` en la configuración de vídeo de vainilla y, a continuación, vuelva a comprobar la pantalla. |
| La cubierta nunca comienza | Compruebe global `[experimentalCover].enabled`, por NPC `Enable Cover`, el disparador individual, la fase de combate, el radio de búsqueda, el tiempo de reutilización y si existe una posición de bloqueo de ráfaga / disparo alcanzable. |
| La portada comienza, pero el NPC nunca reanuda la lucha | Compruebe `Max Duration`, `Hold Time`, la configuración de peek, la accesibilidad de la ruta, y que el 0.3.1 actual está instalado. Cover debe proteger tanto el pecho como la cabeza; el servidor vuelve a intentar otro candidato accesible después de un error de búsqueda inicial. |
| La confirmación de alquiler no se abre | El NPC debe ser un NPC administrado por DW con `Hire available` habilitado. Utilice una mano vacía o un elemento de interacción normal; `DW Npc Core`, `DW Mercenary Core` y CustomNPCs las herramientas de interacción mantienen su propio comportamiento de editor. |
| Los clics o las sugerencias de herramientas de la GUI Mercenaria se compensan | Utilice la corriente 0.3.1 en ambos lados. La configuración de mercenarios, la pantalla de confirmación y el comando HUD utilizan el escalado fit-to-viewport y las coordenadas traducidas del mouse. |
| PointBlank El arma no es aceptada | Instale exactamente una rama compatible, 1.11.1 o 2.1.0. Si se detectan ambos, el puente se desactiva por sí mismo. |
| SuperbWarfare el arma o vehículo no está disponible | Compruebe las versiones compatibles específicas del cargador en [setup](#dochi-warfare/warfare-setup). |
| Vehículo AI está habilitado pero no se mueve | Retire los pasajeros del jugador, confirme la versión compatible SuperbWarfare, el modo de movimiento, el hogar / destino y el terreno cargado. Los helicópteros y aviones de ala fija necesitan suficiente espacio para subir y girar. |
| Una torreta del vehículo sigue el objetivo, pero nunca dispara | En `Weapons`, compruebe que la montura está activada e incluida en `Weapon use mode`. Verifique la munición por arma, la recarga, el requisito de tripulación, el alcance mínimo / máximo y los límites de lanzamiento de la torreta. Un objetivo muy cercano puede requerir que el vehículo retroceda. |
| Un vehículo repite un pequeño círculo o se lanza y se detiene abruptamente | Confirme que 0.2.9 está instalado en ambos lados, luego verifique el radio de la Patrulla de Área, la velocidad de movimiento y el terreno accesible. La versión 0.2.9 utiliza sectores de patrulla distribuidos y acelerador/frenado a distancia. |
| La página Crew sigue cargando o no puede subir a un NPC | Pulse `Refresh` y vuelva a seleccionar el vehículo/asiento. Usa un clon de NPC de servidor válido o una piedra del alma de NPC de inventario, quédate dentro de los bloques 64 con permiso creativo y confirma que el NPC no es hostil a la facción del vehículo. |
| Una trampa no dispara | Guarde `DW Booby Trap Core`, verifique tanto `Enabled` como `Armed`, compruebe el bypass / enfriamiento del propietario y confirme las dependencias opcionales de la carga útil de LRT. |

## Problemas de acceso a la GUI

`DW Npc Core` es un elemento de editor de modo creativo con tres contextos: DNPC o NPC CustomNPCs compatible, vehículo SuperbWarfare compatible y aire para la biblioteca de clones. Si el editor NPC nunca se abre, confirme que el objetivo es un actor compatible DNPC o CustomNPCs y que ambas partes tienen el complemento. Si el editor de vehículos no está disponible, compruebe la versión compatible SuperbWarfare en lugar de tratarla como un fallo del objetivo NPC.

## Problemas de fuego y línea de visión

Dochi's Warfare realiza una verificación final de la línea de visión antes de disparar. Si un NPC detecta un objetivo pero no dispara, prueba un cañón plano TACZ en un área plana abierta. Si TACZ funciona, pero una pistola opcional no, aísle la versión del adaptador, el tiempo de reutilización nativo y las reglas de disparo especial no compatibles antes de cambiar la IA.

`Detect Distance` Controla la conciencia inicial. `Max Distance` Controla el fuego a distancia. No afinar uno como si fuera el otro.

## Problemas de munición y recarga

El problema de munición más común es la mezcla de artículos de munición física con material de munición DW. No ponga TACZ, PointBlank, o SuperbWarfare munición o revistas en el NPC de la mano. Usa `Ammo Stock`, `Supply Ammo`, y vuelve a cargar el estado.

Para el diagnóstico:

1. Establecer `Ammo Stock` en `-1`.
2. Mantener `Reload` y `Supply Ammo` encendido.
3. Establece `Reload Duration Ms` en `0` para usar el tiempo de recarga nativo del arma retenida.
4. Prueba de nuevo con un objetivo.

Si el stock infinito funciona pero el stock finito falla, el NPC probablemente alcanza `0` munición de reserva o la regeneración no está configurada.

![Recarga y configuración de reserva-ammo.](assets/media/guides/warfare-031-neo1211/dw-ammo.png "1 significa munición de reserva ilimitada. Ms 0 usa la duración de recarga nativa del arma. Estos controles son independientes de la colocación de un elemento de munición física en la mano del NPC.")

## Problemas de detección de sonido

La versión 0.2.9 usa un sistema de estímulo para disparos administrados, recargas, sonidos de bloqueo, sonidos de entidad y sonidos de mundo solo de posición. Usa un jugador de Supervivencia cuando pruebes sonidos, y comprueba la detección de objetivos por separado de la investigación de sonido; y `Move To Source` todavía cede al combate activo o a una posición bloqueada.

## Patrullero y problemas de búsqueda de caminos

Las patrullas de área y ruta mantienen un camino A activo en `Default Walk Speed`. Si falla la creación o finalización de la ruta, el NPC vuelve a intentar inmediatamente dentro de un límite limitado y luego omite el punto. Empujar repetidamente contra una pared o tratar de romperla no es un comportamiento esperado.

Para un descenso fallido de un bloque, confirme que un punto de ruta directo utiliza los pies previstos Y. La versión 0.2.0 resuelve el terreno cercano e incluye la distancia vertical en los controles de llegada, pero no fuerza el movimiento a través de vallas, espacios sellados o plataformas que no tienen una ruta segura.

## Problemas de política de daños

`Gun Spec` preserva el comportamiento de daño nativo de la pistola operada, mientras que `Custom` aplica la anulación de DW compatible para este NPC. El combate cuerpo a cuerpo `Weapon Spec` usa atributos de objeto; el combate cuerpo a cuerpo `Custom` puede establecer daño, retroceso y ataques por segundo de forma independiente. Cambiar una política a la vez cuando se aísla un resultado inesperado.

Habilitar `Better Combat Compatibility` bloquea la velocidad de ataque al elemento retenido `ATTACK_SPEED`, y `Overview` muestra `Weapon Spec (locked)`. Si los atributos de arma no se aplican en una compilación anterior, actualice tanto el cliente como el servidor a 0.3.1 actual antes de volver a probar.

## Cambio de armas y problemas de animación cuerpo a cuerpo

El complemento sincroniza el estado de la mano principal confirmada por el servidor con los clientes. Si una lectura de equipo cuerpo a cuerpo no coincide con el elemento solicitado, el NPC retrasa el ataque y vuelve a intentar el equipo en lugar de atacar con el arma equivocada. Por lo tanto, se puede esperar una breve pausa durante el cambio; primero se debe verificar si un arma rancia permanentemente no coincide con las versiones JAR del cliente y el servidor.

El movimiento NPC Exact Better Combat requiere tanto de Better Combat como de Player Animator. Incluso con `Better Combat Compatibility` activado, el complemento vuelve a un swing de vainilla de la mano principal cuando la criatura Player Animator falta o no hay ningún movimiento de arma registrado utilizable disponible.

## Plantear problemas de editor

`DW Pose Core` es una herramienta creadora en modo creativo y actualmente admite modelos de reproductores Steve/Alex CustomNPCs. Mantén el núcleo en la mano principal o fuera de la mano y permanece dentro de 12 bloques del NPC mientras editas.

`Save` almacena solo la pose JSON. `Save & Apply` lo almacena y lo aplica como la pose de inactividad personalizada del NPC actual. Para usar el perfil para una acción específica, abra `DW Npc Core > Pose`, establezca esa acción en `Custom JSON`, seleccione el perfil y guarde la configuración de NPC.

Los archivos Pose se almacenan en:

```text
config/dochi_warfare/poses/
```

Bloquear los ejes de la cabeza o las piernas para caminar puede hacer que el movimiento se vea congelado. Deje los ejes que deben seguir el movimiento normal en `Animation` y establezca solo los ejes que necesita anular en `Custom`.

## Problemas de reglas de destino

Una lista de ID de entidad vacía permite administrar CustomNPCs para heredar la hostilidad de facción real CustomNPCs. No hace que las entidades pasivas o no relacionadas sean objetivos automáticos. Una lista de ID de entidad rellenada se convierte en un selector explícito, mientras que las etiquetas requeridas y rechazadas siguen siendo filtros adicionales.

En caso de duda, exporte el perfil de configuración, simplíelo y vuelva a importarlo después de las pruebas.

## Rendimiento y registro

La versión 0.2.0 usa índices espaciales para búsquedas largas `Detect Distance` y audición basada en eventos para reducir los escaneos repetidos. Grandes `Detect Distance`, grandes `Max Distance`, amplias listas de objetivos y muchos NPC administrados aún pueden aumentar el filtrado de candidatos y el trabajo de combate. Mantenga las pruebas tempranas pequeñas.

Los rastros detallados de la mano principal, el interruptor del arma, la cubierta y la animación permanecen detrás del registro de depuración. Habilite la depuración solo mientras reproduce un problema, luego apáguelo para que los registros del servidor en vivo sigan siendo legibles.
