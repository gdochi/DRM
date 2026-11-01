---
title: Colecciones y construcción de cubiertas
slug: cards-decks
order: 1530
description: Depósitos en bóveda, impresiones regulares y animadas, rarezas y requisitos de cubierta.
product: mwent
category: Facciones y tarjetas
section: cards
status: Guía
version: 0.1.6
audience: Jugadores
translationSource: en
translationMethod: assisted
---

## Adquirir y almacenar tarjetas

Recoger tarjetas físicas y paquetes distribuidos por el servidor. La adquisición del mercader y del cofre depende de la configuración del servidor; los operadores pueden usar el [Guía de adquisición](#mwent/acquisition). Recibir una tarjeta es independiente de depositarla en la bóveda.

Con un cursor vacío, haga clic con el botón derecho en una pila de tarjetas en su inventario o en un cofre para depositar su cantidad. Abra la bóveda con la tecla predeterminada **V**, que puede ser rebote. Retirar las tarjetas para obtener elementos físicos de nuevo.

La construcción del mazo agrega cantidades propias en la bóveda y el inventario del jugador. Se excluyen los cofres y las cartas de otros jugadores. Añadir cartas a un mazo o usarlas en un partido no las consume. Las cartas reservadas durante la preparación o el juego no se pueden retirar de la bóveda.

## Grabados regulares y animados

Las impresiones regulares y animadas son elementos físicos separados y cuentas propias, pero comparten el mismo límite de la baraja. La animación no mejora las estadísticas de combate.

**Rarity** tiene cuatro valores: Común, Raro, Épico y Legendario. El **Bronze / Gold frame** determina el límite duplicado. No infiera ese límite solo por rareza.

## Crear un mazo

![El navegador de la baraja de preparación, con filtros preestablecidos a la izquierda y las cartas del Coro Compañero, cuenta y proporciona a la derecha.](assets/media/guides/minigames-015-neo1211/minigames-mwent-play.png "Prueba de juego en Minigames 0.1.5 / NeoForge 1.21.1. Usa este mazo para abrir la preparación con el mazo seleccionado; Mis mazos encuentran tus mazos guardados.")

1. Abrir **My Decks → New Deck** desde la bóveda, enciclopedia o preparación de batalla.
2. Elige una facción y comprueba el líder y el límite de provisión.
3. Añadir facción o cartas neutrales, nombre de la cubierta y guardarlo.
4. Selecciona el mazo guardado antes de un partido. Corrige primero los requisitos incompletos o las copias que faltan.

En 0.1.6 preparación, también elegir una de [ cinco tácticas de apertura](#mwent/version-0-1-6). Está separado de las cartas de mano y se coloca para el jugador que gana el lanzamiento de la moneda del primer jugador.

| Requisito | Cubierta completa |
| --- | --- |
| Tarjetas | 25–40 |
| Unidades | Al menos 13 |
| Disposiciones | Como máximo 150 más el bono del líder seleccionado |
| Misma tarjeta de oro | A lo sumo uno |
| Misma tarjeta de bronce | A lo sumo dos |
| Propiedad | A lo sumo la bóveda combinada y la cantidad de inventario |
| Facción | Facción elegida y neutral |

Ahorra hasta dieciséis cubiertas. Los borradores incompletos se pueden guardar, pero no pueden entrar automáticamente en una partida. El cambio de facción elimina la composición y requiere un nuevo líder; cambiar solo el líder conserva las cartas y vuelve a verificar el nuevo límite.

![Preparación del mazo con la facción, el líder y las disposiciones a la izquierda, más / menos controles de cartas a la derecha y el partido Begin arriba.](assets/media/guides/minigames-015-neo1211/minigames-mwent-mulligan.png "Ajustar cuentas con +/-, comprobar el total de cartas, unidades y Provisiones y, a continuación, comenzar la partida. Esta es la preparación de la cubierta, antes de la mano de apertura.")

## Enciclopedia e inspección

La enciclopedia no concede ni consume cartas. Selecciona cartas para leer nombres, facciones, rarezas, poder, provisiones y habilidades. Haga clic derecho en la batalla para más detalles. Distinguir los valores base de los valores actuales afectados por daños o aumentos.

Las tarjetas sin dueño todavía se pueden inspeccionar. Una carta opcional que aparece en la lista no significa que se pueda jugar sin su proveedor. El catálogo actual contiene 335 definiciones integradas y 89 definiciones de mods opcionales; la disponibilidad real depende de los mods y los activos instalados. Las ranuras de tarjetas personalizadas no utilizadas se excluyen de estos recuentos.

Utilice la [catálogo de especificación](#mwent/card-catalog) para los valores y habilidades de la tarjeta y el [Historial de lanzamientos](#mwent/releases) para adiciones y cambios.

## Si falta un modelo de tarjeta DNPC

Dado que 0.1.5, DNPC se leen los ajustes del modelo Gecko y se actualizan las vistas previas temporales creadas durante la carga de activos. El modelo, los recursos y las bibliotecas de representación opcionales deben estar disponibles; una entrada de catálogo no instala la integración.
