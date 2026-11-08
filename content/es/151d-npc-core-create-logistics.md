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

Las lecciones muestran la creación en **Schedule** y su ejecución real. Lee [Inicio Create](#dochi-npc-core/npc-core-create-start) para instalación y guardado. Grabaciones sin sonido en DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1, con interfaz inglesa y pasos en coreano. Cada tarea parte de un horario vacío; la devolución continúa la configuración guardada en la entrega a inventario.

## Pulido con lija

1. Elige **Sandpaper Polishing**. Coloca **Sand Paper / Red Sand Paper** reales y materiales pulibles en **Source inventory**.
2. Asigna **Finished items inventory**.
3. Define **Working position and facing** con el selector o **Use my position and facing**, que guarda pies y orientación.
4. Usa **Repeat throughout shift** o **Finish one batch per shift** con **Batch size** finito. El ejemplo convierte dos Rose Quartz en dos Polished Rose Quartz.
5. Define **Work interval (ticks)**, activa y guarda. **20 ticks** son un segundo a 20 TPS.

![Revisar ingredientes, crear horario, asignar origen, salida y puesto, pulir dos piezas y abrir el inventario final.](assets/media/guides/create-lessons-20261108/lesson-polish.mp4 "Lija y dos cuarzos están preparados. Receta y desgaste reales; el inventario final muestra dos Polished Rose Quartz.")

**Momentos**: 0:09 Ingredientes · 0:12 Horario vacío · 0:44 Origen · 0:53 Inventario final · 1:01 Puesto · 1:10 Cantidad/número · 1:17 Activar/guardar · 1:32 Ejecución real · 1:53 Resultado en inventario.

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

Se guarda el **UUID**, no el nombre. Recrear o clonar un NPC con el mismo nombre no sustituye su identidad. Selecciona el reemplazo; consulta [Plantillas NPC](#dochi-npc-core/npc-core-templates).

![Crear la ruta desde un horario vacío, asignar origen y devolución, elegir destinatario y Workshop A y entregar.](assets/media/guides/create-lessons-20261108/lesson-parcel-npc.mp4 "Receiving Clerk se elige en el selector nativo. Un paquete sellado llega al NPC y Unknown queda en origen.")

**Momentos**: 0:10 Horario vacío · 0:42 Origen/devolución · 0:58 NPC destinatario · 1:08 Dirección · 1:11 Cantidad/número · 1:22 Activar/guardar · 1:36 Ejecución real · 1:52 Resultado en inventario.

## Ruta hacia un inventario

Usa **Add inventory delivery route**, selecciona el contenedor con Mayús + clic derecho e introduce la dirección. Cambia rutas existentes con **Choose a receiving inventory / Choose an NPC recipient**.

![Crear una ruta a inventario, asignar origen, devolución, destino y dirección y comprobar la recepción.](assets/media/guides/create-lessons-20261108/lesson-parcel-container.mp4 "Parte de horario vacío. El barril azul recibe el paquete sellado; embalar objetos normales es otra operación de Create.")

**Momentos**: 0:10 Horario vacío · 0:42 Origen/devolución · 0:58 Objetivos del mundo · 1:06 Dirección · 1:10 Cantidad/número · 1:21 Activar/guardar · 1:35 Ejecución real · 1:52 Resultado en inventario.

Cada paquete debe coincidir con **exactamente una** ruta. Se usan patrones Create: **Workshop *** puede solaparse con **Workshop A**. Los paquetes ambiguos quedan en origen. Empieza con direcciones exactas distintas.

## Espera y devoluciones

Si el receptor ya falta o está lleno antes de recoger, el paquete queda en origen. Si ocurre durante el transporte, el NPC espera y vuelve a **Return inventory**. Una devolución llena deja el paquete con el mensajero.

![Reabrir la ruta guardada en la lección anterior, cambiar la espera y revisar destino lleno y paquete devuelto.](assets/media/guides/create-lessons-20261108/lesson-parcel-return.mp4 "La herramienta llena explícitamente el destino de piedra tras la recogida. Se abren ambos inventarios para mostrar el resultado.")

**Momentos**: 0:15 Pausa extra · 0:19 Activar/guardar · 0:33 Obstrucción · 0:53 Revisar destino · 0:58 Paquete devuelto.

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

![Crear el trabajo de mostrador, elegir Ticker y asiento por separado y abrir pedidos con existencias conectadas.](assets/media/guides/create-lessons-20261108/lesson-stock-ticker.mp4 "Packager proveedor y Stock Link están conectados. Muestra aproximación, asiento, interacción con mano vacía y pantalla nativa.")

**Momentos**: 0:08 Horario vacío · 0:40 Objetivos del mundo · 0:56 Activar/guardar · 1:10 Ejecución real · 1:23 Pantalla de pedidos.

El mostrador grabado conecta Packager proveedor, Stock Link y existencias reales de hierro en la misma red. La interacción con la mano vacía abre el menú original con esas existencias visibles. El pago y la entrega final al destinatario quedan fuera de esta lección.

Es el menú de Create para jugadores, separado de la tienda DRM. Tickers ausentes/ambiguos y asientos ocupados impiden atender. El NPC baja con seguridad al acabar. Sentarse, atender y [pedir materiales automáticamente](#dochi-npc-core/npc-core-create-factory) son acciones distintas.

## Combustible para Blaze Burner

El transporte de objetos existente entrega combustible aceptado a un Create Blaze Burner compatible y conserva recipientes devueltos, como cubos. Reserva espacio. Configura filtros y cantidades en [Trabajo y transporte NPC](#dochi-npc-core/npc-core-editor). Estos vídeos no muestran el repostaje por separado. Calentar el Burner no aporta automáticamente potencia, tuberías o todos los requisitos de la receta.
