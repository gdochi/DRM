---
title: Ocultar peças Vanilla HUD
slug: hud-maker-vanilla
order: 112
description: Controle corações padrão, experiência, hotbar e HUDs mod suportados ao adicionar substituições.
product: core
category: HUD Maker
section: hud-maker
status: Guia
version: 0.3.1
audience: Criadores de HUD
translationSource: en
translationMethod: assisted
---

## Impedir que dois monitores de saúde se sobreponham

Adicionar uma barra de saúde personalizada não esconde automaticamente os corações de Minecraft. Expanda **HUD Maker → Inspector → Vanilla HUD Guide** para controlar a exibição padrão separadamente.

![Interruptores visíveis para saúde, comida, XP, hotbar e outras baunilhas HUD partes.](assets/media/guides/drm-031-forge1201/forge-hud-guide.png "DRM 0.3.1 / Forge 1.20.1. Estes interruptores atualmente lêem Visible. Eles controlam Minecraft existentes HUD; Adicionado HUD Tipos à esquerda contém adições de DRM.")

1. Gravar [seu novo HUD](#core/hud-maker) e verifique se ele realmente aparece.
2. Expanda **Vanilla HUD Guide → HUD Guide +**.
3. Desligue o interruptor **Visible** relevante. Comece com **HP Health** para substituir corações sozinhos.
4. Salve, ative e inspecione a tela do jogador. No artefato verificado Forge 0.3.1, um erro de ativação significa que essa etapa não terminou; veja [ a limitação](#core/hud-maker).

| Etiqueta | Exibição padrão |
| --- | --- |
| HP Health / AR Armor / FD Food / O2 Air | Corações, armaduras, fome e ar |
| XP XP Bar / Nível LV | Experiência bar e nível |
| HB Hotbar / + Crosshair / BB Bossbar | Hotbar, crosshair e Boss Bar |

Ocultar corações não cria uma barra de substituição. Deixe o original visível enquanto constrói um substituto que ainda não foi verificado.

## HUDs mod suportados

**Mod HUD Guide** controla os monitores existentes dos provedores suportados. Um botão do lado esquerdo, como ** + Mana de Ferro**, cria uma nova tela DRM. Defina se a tela antiga está visível e onde a nova tela será exibida separadamente.
