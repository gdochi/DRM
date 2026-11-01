---
title: Alterar a aparência do botão
slug: gui-maker-button-config
order: 103
description: Escolha a renderização do botão Minecraft ou o estilo personalizado DRM para uma tela.
product: core
category: GUI Maker
section: gui-maker
status: Guia
version: 0.3.1
audience: Criadores de GUI
translationSource: en
translationMethod: assisted
---

## Use botões de escolha no estilo Minecraft

1. Abra o layout do diálogo em [GUI Maker](#core/gui-system).
2. Escolha **Button Config** no topo.
3. Ligue o interruptor para **Choice / choice_box** usar a renderização de baunilha. **Custom** usa o estilo personalizado de DRM.
4. Volte com **Done** e inspecione **Preview**.
5. **Save As** seu layout e selecione-o nas configurações de GUI do Dialogue Editor.

![Escolha / choice_box definido como Personalizado no Button Config.](assets/media/guides/drm-031-forge1201/gui-button-config.png "DRM 0.3.1 / Forge 1.20.1. A lista contém tipos de botões suportados pelo layout atual. Cada interruptor muda esse tipo de renderização.")

![Escolha / choice_box mudou para Vanilla.](assets/media/guides/drm-031-forge1201/gui-vanilla-buttons.png "Retorne com Concluído e verifique o tamanho da escolha e as respostas longas na Visualização. Este é o estado do editor comutado.")

Button Config muda de aparência. Defina se uma resposta abre uma loja ou outra cena em **Dialogue Editor → Choice actions**.

| Mudar | Onde |
| --- | --- |
| Responder texto | Dialogue Editor → Escolhas → Etiqueta |
| Escolha a posição e o tamanho da área | GUI Maker tela |
| Tamanho do texto, respostas longas e pulsos | [Escolha estilo](#core/dialogue-choice-style) |
| Vanilla / renderização de botão personalizado | Botão Config |

Abrir um layout de loja mostra seus próprios tipos de botões suportados. Alterar um layout de diálogo não altera os botões de cada tela.
