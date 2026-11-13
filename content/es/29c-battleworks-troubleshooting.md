---
title: Solución de problemas y controles de combate en vivo
slug: battleworks-troubleshooting
order: 290
description: Reduce la orientación, el daño, la animación, el archivo, la habilidad y los fallos de presentación.
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

## Primeras comprobaciones

1. Comprueba Minecraft, loader y BattleWorks 0.1.7. Comprueba DRM y proveedores externos solo si usas sus funciones; DRM es opcional.
2. Sigue la [preparación del NPC](#mob-editor/mob-editor-setup). Usa DNPC desde 26.3; CustomNPCs está excluido.
3. Confirma que la ruta guardada está vinculada al NPC.
4. Separa edición en Creativo y pruebas en Supervivencia.
5. Empieza con movimiento humanoide nativo e Hitbox antes de modelos o hechizos externos.

El [primer ataque](#mob-editor/battleworks-first-attack) conserva capturas reales de combate en 0.1.6. Los avisos antiguos de vista previa no son una restricción actual. Diagnostica aplicación del archivo, vista del modelo y combate por separado.

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

1. Sal de Creativo/Espectador.
2. Confirma un objetivo válido del actor o activa Scan Without Target en una zona aislada.
3. Comprueba alcance, FOV y línea de visión. La búsqueda alternativa es independiente del filtro de relaciones del NPC.
4. Comprueba Enabled, alcance, altura, salud y fase del patrón.
5. Asegura un patrón Manager ordinario elegible; revisa puntuación, multiplicadores de repetición y recargas.
6. Revisa control del movimiento y límites de arena.

Compara otro NPC con el [archivo sencillo de práctica](./assets/media/battleworks/training_swordsman.json).

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

## Animaciones o ataques se superponen

1. Comprueba Suppress Native Attacks, IA del actor y otros controladores.
2. Solo en CustomNPCs antiguo compatible, revisa scripts y Suppress CustomNPC Scripts. No es un requisito de DNPC ni de 26.3.
3. Evita solicitudes simultáneas de animación de etapa y cronología.
4. Compara Cast Animation Ticks con etapas posteriores y comprueba modelo/proveedor.

Una animación coincidente puede continuar entre etapas consecutivas sin reiniciarse.

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

## Recetas, importaciones y reinicio de arena

| Síntoma | Comprobar |
| --- | --- |
| Editar una copia cambia la hitbox original | Uso compartido; independiza la hitbox o usa Independent copy |
| My techniques vacío en otro servidor | La biblioteca pertenece al jugador en ese servidor |
| Importación rechazada | Recursos necesarios, compatibilidad del modelo, referencias y límites |
| Clips ausentes o sin reproducción | Recursos reales, descripción de fuente y modelo/proveedor compatible |
| El jefe regresa o se cura inesperadamente | Arena aplicada, reinicio al salir y Restore boss health |
| Aviso sin impacto | Acción Hitbox vinculada, tick de contacto y posición del objetivo |

Usa el [flujo de creación](#mob-editor/battleworks-authoring), la [guía de animación](#mob-editor/battleworks-animation) y las [instrucciones de arena](#mob-editor/battleworks-encounters) para probar cada función.
