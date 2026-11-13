---
title: Solución de problemas y controles de combate en vivo
slug: battleworks-troubleshooting
order: 290
description: Reduce la orientación, el daño, la animación, el archivo, la habilidad y los fallos de presentación.
product: mob-editor
section: reference
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


## Primeros controles

1. Coincidir con Minecraft, cargador, BattleWorks y DRM archivos.
2. Siga [ la preparación de NPC ](#mob-editor/mob-editor-setup) para el ejercicio actual DNPC. CustomNPCs está excluido en 26.3 y más adelante.
3. Confirme que la ruta guardada es la ruta vinculada al NPC.
4. Separar la creación creativa de las pruebas de combate de supervivencia.
5. Verifique el balanceo básico del brazo y Hitbox antes de agregar modelos o habilidades externas.

![Ajustes de combate utilizados para la prueba real de guardar/aplicar.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / DNPC 0.1.3 / NeoForge 1.21.1. Rango de exploración 16, FOV 360 y guardado. Advertencias: 0 se verificaron antes de verificar la pérdida de salud de Survival. Trata las advertencias de guardar y previsualizar el modelo por separado.")

En esta combinación, la oscilación básica causó un daño real, mientras que también se observaron advertencias de previsualización del modelo/animación y una ventana de simulación que no se abrió. Compare el [Archivo verificado de primer ataque](#mob-editor/battleworks-first-attack) y combate real antes de descartar la vinculación NPC debido a un problema de vista previa.

## El archivo no está en la lista

1. Compruebe la carpeta config/dochi_rpg_maker/mobs/patterns del servidor.
2. Compruebe la extensión .json.
3. Compruebe el esquema dochi.battleworks.v1.
4. Excluir archivos de geometría/animación y carpetas de activos.
5. Parse como JSON estricto.
6. Actualizar carga / aplicar.

Los archivos de partículas usan partículas y dochi.particles.v1 en su lugar.

## El PNJ sigue usando el viejo comportamiento

1. Verifica si solo usaste Save As.
2. Guardar con el NPC adjunto, o aplicar el nuevo archivo a través de su catálogo.
3. Después de ediciones externas, vuelva a aplicar o reinicie el servidor.
4. Compruebe archivos con nombre similar en subcarpetas.
5. Inspeccione cualquier configuración de modelo guardada que también se haya aplicado.

Utilice archivos separados cuando los NPC necesitan un comportamiento independiente.

## El NPC nunca ataca

1. Deja el modo Creativo/Espectador.
2. Confirmar CustomNPCs objetivo hostil.
3. Si utiliza escaneo alternativo, verifique el rango, el FOV y la vista.
4. Amplía temporalmente el rango de patrones, la altura, la fase y las condiciones de salud para aislar el fallo.
5. Asegúrese de que exista al menos un patrón de administrador ordinario.
6. Compruebe la puntuación base y los multiplicadores de repetición cero.
7. Compruebe la propiedad de movimiento largo y los tiempos de reutilización.

Comparar un NPC separado usando el [simple archivo de práctica](./assets/media/battleworks/training_swordsman.json).

## El NPC se detiene antes de llegar a su ataque

Compare la distancia de aproximación, el rango máximo del patrón, las dimensiones/compensaciones de la caja de impacto, la tolerancia de altura y la ubicación del objetivo en el contacto. Compruebe si el movimiento de preparación aleja al PNJ.

El rango de inicio y la geometría real del hitbox están separados.

## La animación se reproduce, pero el daño no

1. Prueba el combate real, no la simulación.
2. Verifica que la acción de Habilidad Hitbox o daño real esté conectada.
3. Verifique el evento y repita los límites.
4. Verifica que el daño, el multiplicador y las posibilidades no sean cero.
5. Inspeccione la altura del hitbox, los desplazamientos y las rotaciones.
6. Verifique la restricción del objetivo.
7. Comprobar armadura, efectos, invulnerabilidad y política de golpe.

Varias casillas de golpe en una marca no garantizan un daño sumado simple.

## La animación o los ataques se superponen

1. Revisa Suprimir ataques nativos.
2. Inspeccione los scripts de combate CustomNPC existentes.
3. Pruebe Suprimir secuencias de comandos CustomNPC cuando sea apropiado.
4. Evite competir con las solicitudes de animación de escenario y línea de tiempo.
5. Compare las garrapatas de animación con etapas posteriores.
6. Compruebe la compatibilidad proveedor/modelo.

No se espera reiniciar una animación coincidente en etapas consecutivas.

## Una habilidad falla

Elija un ID de catálogo real, verifique las dependencias del proveedor en ambos lados y verifique el objetivo, el alcance, la línea de visión y el tiempo de reutilización del proveedor. Retire las opciones sin soporte y pruebe un molde simple. Ha fallado la habilidad Leer Battleworks.

## Combos, fases o pasivos se comportan de manera diferente

| Síntoma | Comprobar |
| --- | --- |
| Combo no se inicia | Max Combo, existencia de destino, condiciones, tiempo de reutilización |
| Un movimiento domina | Prioridad, piso de selección, elegibilidad |
| La fase se mantiene alta después de la curación | Cierre esperado durante el combate |
| El anuncio de transición se repite normalmente | Su puntuación de gerente y bonos |
| Esperas pasivas básicas | Las reacciones en cola esperan una apertura |
| El disparador de salud no se repite | Una vez por combate y volver a cruzar el umbral |
| La reacción desaparece | Salto, cola caducada, condiciones de inicio fallidas |
| Los campos Postura/Ritosta no tienen efecto | Configuración de documentos reservados y no conectados |

## Las partículas están ausentes o son excesivas

1. Reproduce el archivo en Particle Maker.
2. Compruebe las opciones de partículas requeridas.
3. Prueba `/drm particle play training_ring ~ ~ ~` sin la extensión.
4. Verificar que particleFile existe.
5. Compruebe que los orígenes de la posición objetivo/guardada tengan datos válidos.
6. Compruebe que no está reiniciando un efecto largo cada tick.
7. Reduce las muestras, el recuento, la frecuencia y los efectos concurrentes.

## Falta el BGM o el diálogo

Compruebe el volumen de criaturas hostiles para el volumen ordinario de sonido y música para BGM. Verifique el sonido registrado y el recurso del cliente. Confirme el destinatario de un jugador, use 100% chances temporalmente e inspeccione las referencias popup/GUI/command reales.

La propiedad BGM de otro NPC o los títulos/popups superpuestos también pueden cambiar el resultado visible.

## Mensajes de registro útiles

| Mensaje | Significado |
| --- | --- |
| Battleworks JSON no disponible | El archivo de combate referenciado no se pudo cargar |
| Save rechazado | Servidor rechazó el guardar; leer la razón |
| Ha fallado la habilidad Battleworks | Falló la ejecución del proveedor |
| Movimiento objetivo de Battleworks rechazado | Error en las comprobaciones de destino o destino |
| Partículas JSON rechazadas | Archivo de partículas referenciado no pudo cargar/validar |

## Registrar una matriz de prueba final

Pruebas cercanas/medianas/lejas, frontales/laterales/traseras, paredes/escaleras/alturas, cada fase, cada pasiva, muerte, pérdida de objetivos y otra pelea. Vuelva a abrir los archivos para verificar la persistencia.

Para obtener un informe de problemas útil, incluye versiones de mod, pasos de reproducción, los archivos de combate y referencia, el comportamiento esperado/real, latest.log y cualquier informe de bloqueo. Elimine tokens privados o datos personales antes de compartir registros.
