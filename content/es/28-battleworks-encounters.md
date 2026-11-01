---
title: Construye un jefe de espada bifásico
slug: battleworks-encounters
order: 272
description: Combina barra, empuje, retirada y una transición de media salud en un solo encuentro.
product: mob-editor
section: combat
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

## Lo que construirás

Un jefe de espada usa barra, empuje y retirada, luego agrega un ataque mejorado por debajo de 50% de salud. No se necesita ningún hechizo opcional mod. Los valores son puntos de partida de enseñanza, no una garantía de dificultad equilibrada.

Comienza con el trabajo [Primer ataque](#mob-editor/battleworks-first-attack).

## 1. Crear un archivo de trabajo separado

1. Carga el primer ataque.
2. Save As `bosses/training_captain.json`.
3. Establezca la salud máxima en **100** en DNPC **Combat AI → Max health**. Para un actor de legado CustomNPCs compatible, use su propia pantalla de estadísticas.
4. Compruebe que los viejos guiones de combate no están compitiendo.
5. Mantenga el equipo y la salud del jugador consistentes entre las pruebas.

Mantener first_sword como una comparación de trabajo conocida.

## 2. Planificar los movimientos

| Patrón | Rango de inicio | Windup / Acción / Recuperación | Función |
| --- | --- | --- | --- |
| Corte | 0–2.7 | 24 / 16 / 24 | Ataque básico |
| Empuje | 0–3.2 | 28 / 16 / 24 | Ataque hacia adelante más largo |
| Retiro corto | 0–2.0 | 6 / 12 / 12 | Hacer espacio |
| Barra mejorada | 0–2.7 | 18 / 16 / 20 | Fase 2 adición |
| Inicio de ira | Amplia gama adecuada | 0 / 30 / 10 | Anuncio de fase |

Fuera del alcance de ataque, Chase Target debe acercar al NPC. Un jefe cuerpo a cuerpo necesita un enfoque navegable.

## 3. Estabilizar la barra y el empuje

1. Mantenga la barra de trabajo.
2. Crea el [thrust Box](#mob-editor/battleworks-hitboxes) y vincúlalo a otro patrón.
3. Inicie ambos en Daño 4.
4. Ponga el golpe de empuje en la marca de acción 3, luego ajuste al contacto real.
5. Dar prioridad 10 y puntuación base 10.
6. Confirma que ambos aparecen en peleas repetidas a corta distancia.

Resolver problemas de selección y rango antes de agregar fases.

## 4. Añadir retiro

1. Sigue el ejercicio [Lejos del movimiento](#mob-editor/battleworks-movement).
2. Marca el patrón Movilidad y usa un rol de movimiento distinto.
3. Inicialmente dejarlo libre de daños.
4. Inicia la puntuación base alrededor de 6, por lo que es menos prominente que los ataques.
5. Verifique que la búsqueda se reanude después de la retirada.

Si el movimiento domina, verifique si los ataques están fallando sus condiciones de alcance antes de cambiar las puntuaciones.

## 5. Añadir fase 2

1. Abrir **Combat Rules → Boss Phases**. Si P1 y P2 ya existen, seleccione P2 y establezca su umbral en **50**; solo agregue si está ausente. Mantener P1 en 100%.
2. Crear una barra separada mejorada y establecer la fase mínima 2.
3. Mantenga los ataques ordinarios disponibles en ambas fases.
4. Antes de aumentar el daño, acorte el Windup mejorado de 24 a 18.
5. Si es demasiado abrupto, sintonice entre 20 y 24.

Cambia el tiempo, el daño o el conteo de golpes uno a la vez.

![El umbral de salud P2 existente se guardó en cincuenta.](assets/media/guides/battleworks-016-neo1211/battleworks-boss-phases-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Seleccione P2 · Enfurecido a la izquierda y guarde el umbral 50 a la derecha. Este artefacto prefijos que subtítulo con formato de error; informes de ahorro Advertencias 0, y controlado servidor de salud 100/100 → 49 / 100 confirma la fase 1→2.")

La primera barra diagonal [ más el archivo de inicio bifásico](assets/media/battleworks/first_two_phases.json) es el guardado de la interfaz de usuario nativo exacto que se muestra arriba. Contiene ** una barra básica y dos fases de salud **. Agregue la secuencia de ataque y enfurecimiento mejorada en los siguientes pasos. Colóquelo debajo `config/dochi_rpg_maker/mobs/patterns/`, cárguelo y guárdelo en el NPC.

## 6. Conectar la transición

1. Dar a Enrage Iniciar un título y sonido en la acción marca 0.
2. Mantenga su disparador en Manager y permita la fase 2.
3. Para usar solo la transición, establece la Puntuación Base y todas las bonificaciones aditivas en cero.
4. Seleccione como patrón de transición de fase 2.
5. Reducir la salud por debajo de la mitad y verificar una transición.
6. Sanar y confirmar que la fase permanece enganchada.

Ver [detalles de fase](#mob-editor/mob-editor-phases) para condiciones de transición forzada y umbrales omitidos.

## 7. Opcionalmente añadir un pasivo

Usa [Retiro de daño de rango](#mob-editor/battleworks-passives) para obtener una respuesta a las flechas. Si también desea un retiro ordinario, mantenga patrones separados: cambiar un patrón a pasivo lo elimina de la selección del administrador.

Las reacciones básicas en cola esperan una apertura. La cancelación inmediata de daños utiliza un disparador avanzado diferente.

## 8. Opcionalmente agregue una advertencia de tierra

Crea un anillo en [Particle Maker](#mob-editor/battleworks-particles) y conéctalo a Windup. Ajusta su tamaño y duración al Hitbox real.

Para un ataque en la posición anterior del jugador ****, use [ guardar la posición → advertencia → golpe retrasado ](#mob-editor/battleworks-advanced-actions).

## 9. Probar una matriz de situación

| Situación | Comprobar |
| --- | --- |
| Sobre el bloque 1 | Elegibilidad para corte y retirada |
| Acerca de 2.5 bloques | Contacto y daños reales |
| Acerca de 3 bloques | Empuje o enfoque renovado |
| Acerca de 6–8 bloques | Perseguir conduciendo a un ataque |
| Paredes y escaleras | Navegación, altura y condiciones de visión |
| Cruce 50% de salud | Transición y movimiento mejorado |
| Curación en combate | La fase permanece enganchada |
| La pérdida de objetivos y otra pelea | Reset de estado previsto |
| Muerte | Presentación, final de BGM, limpieza de invocación |

## 10. Prepare el paquete

Vuelva a abrir el archivo guardado y compruebe los valores. Incluye todas las dependencias de combate, partícula, modelo, sonido, popup, clon y proveedor.

Utilice [archivos y guía de copia de seguridad](#mob-editor/battleworks-files) y [solución de problemas](#mob-editor/battleworks-troubleshooting) antes de compartir.
