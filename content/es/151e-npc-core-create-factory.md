---
title: Create · Procesamiento y pedidos de material
slug: npc-core-create-factory
order: 1516
description: Distingue cuatro inventarios, configura lotes y solicita faltas mediante logística real de Create.
product: dochi-npc-core
category: Integración Create
section: editor
status: Guía
version: 0.1.3
audience: Creadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Empieza con una máquina funcional

**Factory Process** alimenta una máquina real y recoge su resultado. Prueba la receta manualmente. Create controla potencia, dirección, esfuerzo, calor y fluidos. Ejemplo: **Iron Ingot → Mechanical Press + Depot → Iron Sheet**, con Creative Motor como fuente de ejemplo.

Lee [Inicio Create](#dochi-npc-core/npc-core-create-start) y [Paquetes](#dochi-npc-core/npc-core-create-logistics). Vídeos sin sonido: DNPC 0.1.3 + Create 6.0.10 / NeoForge 1.21.1.

## Cuatro funciones de inventario

| Campo | Función | Ejemplo |
| --- | --- | --- |
| Source inventory | Retirar materia prima | Barril izquierdo |
| Machine input inventory | Insertar materiales | Depot bajo la prensa |
| Finished output inventory | Recoger resultados reales | Mismo Depot |
| Finished items inventory | Entregar productos | Barril derecho |

Entrada y resultado pueden compartir Depot. Origen debe diferir de entrada; destino final debe diferir de la salida de la máquina. Las mitades del cofre doble son el mismo inventario. Empieza con dos barriles y un Depot.

## Configurar Factory Process

1. Añade **Schedule → + del turno → Create → Factory Process**.
2. Asigna cuatro posiciones con **🔍** y revisa caras/filtros nativos.
3. Elige **Material item / Material quantity**. **Add material** permite **8 objetos distintos**, **1–64** de cada uno por lote.
4. Define **Finished item / Finished quantity per batch** según la receta.
5. Primero desactiva **Order missing materials automatically** y abastece manualmente.
6. Activa **Repeat throughout shift** o define **Batch size** finito, que aquí cuenta lotes.
7. Configura **Processing timeout in ticks / Work interval (ticks)**, activa y guarda.

![Elegir las cuatro posiciones y ambos objetos de Factory Process, introducir cantidades y tiempos y producir dos placas.](assets/media/guides/create-lessons-20261108/lesson-factory-process.mp4 "Parte de horario vacío. Entrada y resultado eligen el mismo Depot. Un lingote y una placa por lote, Batch size 2; se abre el inventario final.")

**Momentos**: 0:10 Horario vacío · 0:42 Cuatro posiciones · 1:15 Elegir objetos · 1:49 Cantidad/número · 2:03 Activar/guardar · 2:17 Ejecución real · 2:35 Resultado en inventario.

## Cantidades por lote

| Ajustes | Por lote | Total finito |
| --- | --- | --- |
| Material 1, resultado 1, Batch size 2 | 1 lingote → 1 placa | 2 → 2 |
| Material 2, resultado 2, Batch size 3 | 2 lingotes → 2 placas | 6 → 6 |

Se presupone receta garantizada 1:1. Los resultados aleatorios pueden dejar al NPC esperando una cantidad inalcanzable. **Los IDs de materia prima y producto deben diferir**.

## Reunir, insertar, esperar y entregar

Retira el producto configurado que ya esté en la salida antes de empezar. El NPC reúne, inserta, espera el resultado real y entrega. Un trabajador reserva entrada/resultado; otro que los comparta puede esperar con **Workstation is reserved by another worker**.

## El tiempo límite conserva las mercancías

Predeterminado: **1200 ticks**, unos 60 segundos a 20 TPS; rango **20–24000 ticks**. **Processing timed out; existing materials remain owned** conserva el lote en lugar de borrarlo e insertar un duplicado.

Revisa potencia/esfuerzo, ingredientes, calor/fluidos, salida real, ID y cantidad. Un destino lleno deja productos con el NPC; inventario NPC lleno impide recoger. Comprueba reservas antes de sustituir máquinas o mover carga. Reconectar o editar no cancela de forma segura un lote activo.

## Material Ordering mantiene existencias objetivo

**Material Ordering** comprueba **Receiving inventory to maintain** y pide solo la falta por Stock Ticker. Objetivo **4 lingotes** pide cuatro desde vacío o uno si ya hay tres. Aquí cantidad significa **existencias objetivo**; en procesamiento significa **consumo por lote**.

Prepara Create:

1. Inventario proveedor con existencias y **Packager**.
2. **Stock Link / Stock Ticker** en la misma red; comprueba sus existencias visibles.
3. Ruta real de entrega y apertura para depositar materiales sueltos en el receptor; pedir no teletransporta objetos.
4. Configura [Addressed Parcel Delivery](#dochi-npc-core/npc-core-create-logistics) aparte si NPCs llevan paquetes. Guardar un paquete sellado no lo abre.

Después añade **Material Ordering**, asigna receptor, materiales/objetivos, **Stock Ticker**, **Delivery address** e intervalo; guarda.

![Asignar inventario receptor, hierro, objetivo cuatro, Ticker y dirección y comprobar pedido y existencias 16→12.](assets/media/guides/create-lessons-20261108/lesson-material-order.mp4 "Incluye búsqueda, selección y Apply reales. Muestra pedido aceptado y embalaje; llegada y apertura necesitan una ruta separada.")

**Momentos**: 0:04 Horario vacío · 0:36 Inventario receptor · 0:45 Objetivo de existencias · 1:02 Ticker/dirección · 1:17 Activar/guardar · 1:31 Ejecución real · 1:44 Existencias proveedor · 1:49 Pedido/llegada.

## Los pedidos pendientes no se reenvían automáticamente

Los pedidos aceptados sobreviven a guardados y reconexiones. El tiempo no causa un reenvío. Debe observarse llegada al receptor original; poner objetos directamente en el NPC no completa una entrega ausente.

| Estado | Revisa |
| --- | --- |
| Native logistics network has insufficient stock | Proveedor, Stock Link y resumen del Ticker |
| Native logistics network rejected the order | Condiciones nativas de red/pedido |
| Accepted order is waiting for delivery | Packager, dirección, transporte, apertura y receptor original |
| Order result uncertain; automatic resend stopped | Si Create ya reservó o envió mercancía |
| Target stock is available | Objetivo satisfecho; espera normal |

Cambiar el receptor no hace llegar un pedido antiguo al nuevo inventario.

## Abastecimiento automático para procesamiento

Tras probar el proceso manual, activa **Factory Process → Order missing materials automatically** y asigna **Stock Ticker / Delivery address**. El proceso continúa cuando llegan materiales al origen. Empieza con un responsable del pedido para evitar tareas superpuestas. Continúa con [Control e inspección](#dochi-npc-core/npc-core-create-control).
