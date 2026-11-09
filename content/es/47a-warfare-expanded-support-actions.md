---
title: Apoyo de vehículos, armas y NPC
slug: expanded-support-actions
order: 331
description: Dibuja rutas y configura vehículos, armas, fuentes de NPC y tiempos.
product: dochi-warfare-expanded
category: Apoyo de combate
section: support
status: Guía
version: 0.3.2
audience: Creadores de mapas y operadores
translationSource: en
translationMethod: assisted
---

## Elige una herramienta

Aprende los controles en [tu primera línea de tiempo](#dochi-warfare-expanded/expanded-support-timeline). Estas herramientas pueden compartir un documento.

| Herramienta | Entrada en el mundo | Inicio |
| --- | --- | --- |
| Vehicle support | Arrastra de salida a destino | Generación/movimiento del vehículo |
| Fire support | Pulsa el blanco y arrastra la aproximación | Generación del vehículo/aeronave |
| NPC deployment | Arrastra de salida a destino | Clones o selección/movimiento de NPC existentes |

Prueba un único evento antes de combinarlos. Continúa con [guardar, simular e invocar](#dochi-warfare-expanded/expanded-support-run).

## 1. Envía un vehículo de refuerzo

1. Elige **Vehicle support** en un documento vacío.
2. Arrastra entre salida y destino sobre suelo transitable.
3. Vuelve a **Select / move** y selecciona el evento.
4. Revisa el selector. El ejemplo conserva **un M1A2 básico**.
5. Inicio **3 segundos**, cantidad **1**, separación **12**, radio de defensa **24**, duración **60 segundos**.
6. Comprueba las dos posiciones en **Advanced**. Corrige mediante controles del mundo o coordenadas.

![Crea una ruta con inicio a tres segundos, un vehículo, separación 12, radio 24 y duración 60.](assets/media/guides/dwe-tutorials-20261109/dwe-vehicles.mp4 "06 · Configuración de ruta. El vídeo 10 muestra generación, movimiento y retirada reales del vehículo temporal.")

| Campo | Significado |
| --- | --- |
| Count | 1–8 por evento; empieza con uno |
| Spacing | Mismos desplazamientos de formación en salida y llegada |
| Faction | ID numérico; relaciones normales para hostilidad |
| Guard radius | Zona defendida al llegar |
| Lifetime | Desde la generación, incluyendo el viaje |

Al llegar, las unidades defienden los alrededores. Los vehículos terrestres necesitan una ruta transitable. Los helicópteros aparecen en el suelo y despegan con IA nativa; el Y de destino solicita altura de vuelo. Usa bombardeo/armas para aviones de ala fija.

## 2. Configura apoyo de armas

1. Usa **Fire support**, pulsa el blanco y arrastra la dirección.
2. Revisa **modo terrestre/aéreo → vehículo → arma real**. Cambiar modo restablece valores predeterminados.
3. Ejemplo: límite **20** disparos, ventana **3 segundos**, distancia **48**, barrido **16**.
4. Inicio **5 segundos**, duración **30 segundos**.
5. En apoyo aéreo, configura altitud y prueba entrada, fuego y salida sobre el terreno previsto.

![Configura dirección, límite de disparos, tiempo, distancia y barrido.](assets/media/guides/dwe-tutorials-20261109/dwe-fire.mp4 "07 · Configuración terrestre; no demuestra modo aéreo, otra arma ni disparos reales.")

**Inicio, ventana de fuego y duración son distintos.** El inicio genera la unidad; la ventana cuenta desde el **primer disparo real**. Se detiene al agotar tiempo o disparos. Terreno, alcance, salida segura o duración pueden terminarlo antes.

Solo son elegibles ametralladoras/cañones automáticos del servidor. Se excluyen bombas, cohetes, misiles y cañones lentos. RPM, munición, calor, recarga y seguridad nativos siguen activos. El apoyo aéreo ataca y se retira; el terrestre barre con la torreta.

## 3. Mueve NPC existentes

| Fuente | Preparación y resultado |
| --- | --- |
| Area | Selecciona NPC con DW AI activada dentro de la esfera de salida al ejecutar |
| Clone | Genera copias de un NPC guardado en la biblioteca DW |

1. Arrastra salida a destino con **NPC deployment**.
2. Revisa **Source**. La grabación usa **Area** porque no hay clones guardados.
3. Cantidad **4**, radio **16**, separación **2**, velocidad DW **5**.
4. Inicio **2 segundos**, duración **30 segundos**. La facción afecta selección/generación.
5. Revisa las posiciones en **Advanced** y guarda.

![Configura ruta, cantidad, radio, separación, velocidad y tiempos de selección por área.](assets/media/guides/dwe-tutorials-20261109/dwe-npcs.mp4 "08 · Solo creación de Area; no demuestra movimiento completado. Prepara NPC con DW AI activada alrededor de la salida.")

Area usa una **esfera centrada en la salida al ejecutar**. Excluye NPC montados, contratados o con otra orden. Para Clone, activa DW AI en el original antes de guardarlo. Los ID de archivo pueden diferir del nombre mostrado.

El combate DW tiene prioridad y después continúa el avance. No hay teletransporte para evitar obstáculos. Al expirar, **solo se eliminan los clones generados**. Los NPC existentes recuperan la configuración previa sin sobrescribir indiscriminadamente cambios realizados durante la ejecución.

## Combina apoyos

Empieza con **NPC a cero segundos → vehículos a tres → armas a cinco**. El orden de inicio no garantiza el de llegada: se aplican navegación, física y combate.

Revisa [tiempos y centro](#dochi-warfare-expanded/expanded-support-timeline) y después [guarda y ejecuta](#dochi-warfare-expanded/expanded-support-run). Los vehículos temporales no permiten montar, guardar clones ni capturarlos con piedras de alma. Para vehículos permanentes usa el [editor de vehículos](#dochi-warfare-expanded/expanded-overview).
