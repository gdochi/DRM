---
title: Configurar tablas, tarjetas y paquetes
slug: authoring
order: 1540
description: Mapeos de tablas de operadores, tarjetas personalizadas, paquetes de tarjetas y rutas de almacenamiento propias.
product: mwent
category: Operaciones y autoría
section: authoring
status: Guía
version: 0.1.6
audience: Creadores / operadores de servidores
translationSource: en
translationMethod: assisted
---

## Asignar un juego a una mesa

Los operadores pueden hacer clic con el botón derecho del ratón en una tabla con una mano vacía para seleccionar un juego guardado MWENT o un perfil incorporado. Múltiples tablas pueden reutilizar un ID de juego. El mapeo no requiere un nuevo JSON para cada bloque. La selección del mazo de jugadores es independiente de la configuración del juego del operador compartido.

El editor de juegos actual administra las reglas, las condiciones de inicio, las recompensas, la presentación y la selección de IA incorporada. Configure las recompensas de victoria en la pestaña Recompensas. La práctica de IA predeterminada es gratuita y no recompensada. El servidor comprueba las condiciones de inicio, los destinatarios de las recompensas y los resultados. Las referencias a monedas, condiciones o acciones DRM requieren su proveedor.

## Crear una tarjeta personalizada en 0.1.5

1. Abrir **MWENT Table → Card Editor** o **Mods Config → Minigames → Custom Cards → Card Editor**. `/minigame cards` es otra entrada.
2. Cree una tarjeta o use **Save As** para copiar una tarjeta existente en la biblioteca personalizada.
3. Establecer facción, marco, rareza, poder, provisiones, modelo y equipo.
4. Configurar condiciones de disparo → → dirigir → operaciones → costos y límites.
5. Guarda, conecta la carta a colecciones, mazos, packs o pools de adquisición y compruébalo en una batalla.

El ahorro registra una definición; no otorga elementos físicos ni copias propias. Las variantes cosméticas de las cartas existentes comparten la propiedad del original y duplican los límites y conservan sus valores de combate. Las coincidencias de ejecución conservan las definiciones con las que comenzaron.

### Leer el editor de tarjetas

Estas pantallas **Minigames 0.1.5 / NeoForge 1.21.1** muestran el integrado **Imperial Artisan**. Utilice **Save As** para crear una tarjeta personalizada antes de intentar editar los campos incorporados deshabilitados.

![Ficha básica del editor de tarjetas con la vista previa de la tarjeta, nombre, tipo, facción, descripción y lista de tarjetas personalizadas.](assets/media/guides/minigames-015-neo1211/minigames-card-basic.png "Básico establece la identidad y el tipo. La apariencia maneja el modelo / equipo, las estadísticas manejan el poder y los estados, y las habilidades manejan los efectos activados.")

![Estadísticas con la palabra clave Salvage 1 existente, contador/temporizador inicial, estados especiales y Power.](assets/media/guides/minigames-015-neo1211/minigames-card-stats.png "Las estadísticas incluyen palabras clave y estados iniciales, así como potencia. Este ejemplo incorporado tiene Salvage 1.")

![Habilidades con la habilidad existente seleccionada, mostrando Boost y Cantidad 2.](assets/media/guides/minigames-015-neo1211/minigames-card-abilities.png "Seleccione una habilidad a la izquierda primero. Su efecto Boost 2 está separado del propio Poder de la carta 4.")

Cada carta soporta hasta doce habilidades, con ocho condiciones y ocho operaciones por habilidad. Conectar despliegue, orden, turno final, destrucción, movimiento, curación y eventos de juego de cartas. La selección directa de destino se utiliza para implementar y ordenar; los disparadores automáticos utilizan selecciones como todas o aleatorias. También se pueden crear escenarios, ubicaciones, trampas y capítulos.

## Modelos de asedio y proveedores opcionales

0.1.5 incluye modelos originales de ballesta, trebuchet, cañón, autocargador, ballesta motorizada, cañón automático y vagón de suministro. Seleccione un modelo de máquina en la apariencia de una tarjeta de entidad. Los modelos básicos y las habilidades funcionan sin crear o grandes cañones. Las paletas compatibles usan activos instalados reales; el combate de cartas no requiere maquinaria mundial ni una red eléctrica.

DNPC las apariencias de los clones son opcionales. Guarde una entidad alternativa para que los proveedores o plantillas que faltan restauren el modelo predeterminado. La IA clon, los trabajos, los inventarios y las estadísticas de combate no se convierten en reglas de cartas.

## Hacer paquetes de tarjetas

El editor de paquetes controla tarjetas fijas, grupos ponderados, cantidades, opciones de tarjetas finales y apariencia. Compruebe si los destinatarios pueden usar las tarjetas seleccionadas. El servidor posee los resultados de apertura. Conecte el comerciante y la distribución del cofre a través de [ ajustes de adquisición](#mwent/acquisition).

![El ejemplo de Volkar Muster Pack, con un fondo de cartas ponderado a la izquierda, opciones de apertura arriba y detalles de la tarjeta a la derecha.](assets/media/guides/minigames-015-neo1211/minigames-card-packs.png "El peso es un peso de selección relativo dentro de la piscina. Lea las tarjetas garantizadas para la cantidad y las opciones de elección para la elección final por separado.")

Utilice **Get saved pack** en la parte superior para obtener un paquete guardado. Guarde su propio primero, luego abra su elemento físico para verificar el recuento garantizado y la secuencia de elección.

## Referencia de almacenamiento

| Ubicación | Contenido |
| --- | --- |
| `config/dochi_minigames/games/mob_battle/` | Reutilizable MWENT mapas de juego / AI |
| `config/dochi_minigames/cards/custom_card_<number>.json` | 0.1.5 Definición de las tarjetas personalizadas |
| `config/dochi_minigames/card_packs/` | Definiciones de pack de tarjetas |
| `config/dochi_minigames/acquisition.json` | Configuración de adquisición activa |
| `<world>/data/dochi_minigames/cards/` | Cantidades de bóveda por jugador |
| `<world>/data/dochi_minigames/decks/` | Cubiertas guardadas por jugador |

Minigames posee juegos, cartas y paquetes incluso con DRM instalado. Utilice Save As para archivos personalizados antes de asignarlos. Los archivos heredados `table_<32 hex>` siguen siendo compatibles con la lectura en `config/dochi_minigames/internal/tables/`; los nuevos bloques no los crean automáticamente. DRM GUI Maker Los diseños están separados de las reglas del juego.
