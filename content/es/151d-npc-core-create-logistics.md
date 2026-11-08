---
title: Create · Pulido, paquetes y mostradores
slug: npc-core-create-logistics
order: 1515
description: Configura lija, entregas con dirección a NPCs o inventarios, devoluciones y atención Stock Ticker.
product: dochi-npc-core
category: Integración Create
section: editor
status: Guía
version: 0.1.3
audience: Creadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Antes de empezar

Son ajustes de **Schedule** para creadores y su ejecución en el mundo. Lee [Inicio Create](#dochi-npc-core/npc-core-create-start). Vídeos sin sonido: DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1. Las ejecuciones tienen turnos y dispositivos preparados; la edición muestra los cambios indicados.

## Pulido con lija

1. Elige **Sandpaper Polishing**. Coloca **Sand Paper / Red Sand Paper** reales y materiales pulibles en **Source inventory**.
2. Asigna **Finished items inventory**.
3. Define **Working position and facing** con el selector o **Use my position and facing**, que guarda pies y orientación.
4. Usa **Repeat throughout shift** o **Finish one batch per shift** con **Batch size** finito. El ejemplo convierte dos Rose Quartz en dos Polished Rose Quartz.
5. Define **Work interval (ticks)**, activa y guarda. **20 ticks** son un segundo a 20 TPS.

![Recoger lija y cuarzo, pulir en el lugar asignado y entregar dos resultados.](assets/media/guides/create-tutorials-20261108/create-polish.mp4 "Receta y desgaste reales; los contadores leen inventarios del servidor.")

La lija pierde durabilidad. Un destino lleno deja productos con el NPC; su inventario también necesita espacio. Asignar solo el lugar no aporta herramientas, material o destino.

## Direcciones y destinos

**Addressed Parcel Delivery** lleva el paquete Create sellado. No empaqueta ingredientes sueltos ni abre automáticamente la entrega.

| Campo | Función |
| --- | --- |
| Source inventory | Recoger paquetes preparados con dirección |
| Return inventory | Devolver paquetes fallidos tras recogerlos |
| Address routes → Address | Comparar la dirección Create |
| Recipient: NPC / inventory | Destinatario real |
| Recipient wait (ticks) | Espera tras quedar el destino lleno/ausente; predeterminado 400 ticks |

Empieza con origen, destino y devolución separados. Origen y destino deben diferir; ambas mitades del cofre doble son un inventario.

Se admiten **32 rutas**. **Batch size 1–64** finito cuenta **paquetes sellados**, no sus objetos internos. **Repeat throughout shift** sigue entregando durante el turno. **Work interval** admite **4–1200 ticks** y **Recipient wait**, **20–24000 ticks**. Los segundos indicados suponen 20 TPS.

## Ruta hacia un NPC

1. Prepara un paquete Create con dirección **Workshop A** en el origen.
2. Elige la acción y asigna origen y devolución.
3. Usa **Add address route** y elige un DNPC cargado a **64 bloques** o menos.
4. Cambia la dirección generada a **Workshop A** y revisa destinatario con **🔍**.
5. Configura espera, repetición/cantidad finita e intervalo; guarda.

![Editar Workshop A, una espera de 80 ticks y guardar la ruta preparada.](assets/media/guides/create-tutorials-20261108/create-parcel-routes.mp4 "Destinatario e inventarios preparados. 80 ticks son cuatro segundos a 20 TPS; el valor predeterminado es 400.")

Se guarda el **UUID**, no el nombre. Recrear o clonar un NPC con el mismo nombre no sustituye su identidad. Selecciona el reemplazo; consulta [Plantillas NPC](#dochi-npc-core/npc-core-templates).

![Workshop A llega al NPC mientras Unknown queda en origen.](assets/media/guides/create-tutorials-20261108/create-parcel-npc.mp4 "Un paquete sellado llega al inventario receptor; el otro no coincide.")

## Ruta hacia un inventario

Usa **Add inventory delivery route**, selecciona el contenedor con Mayús + clic derecho e introduce la dirección. Cambia rutas existentes con **Choose a receiving inventory / Choose an NPC recipient**.

![Entregar un paquete sellado a un barril receptor.](assets/media/guides/create-tutorials-20261108/create-parcel-container.mp4 "Entrega intacta, sin apertura con Packager ni transporte posterior.")

Cada paquete debe coincidir con **exactamente una** ruta. Se usan patrones Create: **Workshop *** puede solaparse con **Workshop A**. Los paquetes ambiguos quedan en origen. Empieza con direcciones exactas distintas.

## Espera y devoluciones

Si el receptor ya falta o está lleno antes de recoger, el paquete queda en origen. Si ocurre durante el transporte, el NPC espera y vuelve a **Return inventory**. Una devolución llena deja el paquete con el mensajero.

![Devolver el paquete si su destino se llena después de recogerlo.](assets/media/guides/create-tutorials-20261108/create-parcel-return.mp4 "La herramienta llena deliberadamente el destino con piedra tras la recogida para demostrar la obstrucción. El paquete vuelve intacto.")

| Estado | Acción |
| --- | --- |
| Waiting for a uniquely addressed package | Compara la dirección con todas las rutas |
| Recipient unavailable; keeping the package | Revisa identidad, dimensión, área cargada y camino |
| Recipient full; keeping the package | Libera espacio |
| Returning the undelivered package | Mantén accesible la devolución |
| Output full; keeping the item | Libera destino y comprueba la carga retenida |

Acabar el turno no borra la carga. Un paquete recogido puede conservar el destino original después de editar los ajustes. Revisa mercancías en tránsito antes de redirigir.

## Atención Stock Ticker

1. Coloca un **Create Seat parado** con **exactamente un Stock Ticker** al lado.
2. Configura red y existencias reales.
3. Elige **Stock Ticker Attendance** y asigna **Stock Ticker / Create seat** por separado.
4. Guarda, cierra y espera **Attending the Stock Ticker**.
5. La interacción normal abre el menú nativo. Las herramientas de edición conservan prioridad.

![El NPC se sienta en el mostrador y abre el menú real de Create.](assets/media/guides/create-tutorials-20261108/create-stock-keeper.mp4 "Muestra atención y entrada al menú; no completa pago ni envío.")

**No Packagers Linked** aparece porque este mostrador de ejemplo no conecta un Packager proveedor. Conecta una red logística y existencias reales para pedir. La guía de pedidos utiliza otra red conectada.

Es el menú de Create para jugadores, separado de la tienda DRM. Tickers ausentes/ambiguos y asientos ocupados impiden atender. El NPC baja con seguridad al acabar. Sentarse, atender y [pedir materiales automáticamente](#dochi-npc-core/npc-core-create-factory) son acciones distintas.

## Combustible para Blaze Burner

El transporte de objetos existente entrega combustible aceptado a un Create Blaze Burner compatible y conserva recipientes devueltos, como cubos. Reserva espacio. Configura filtros y cantidades en [Trabajo y transporte NPC](#dochi-npc-core/npc-core-editor). Estos vídeos no muestran el repostaje por separado. Calentar el Burner no aporta automáticamente potencia, tuberías o todos los requisitos de la receta.
