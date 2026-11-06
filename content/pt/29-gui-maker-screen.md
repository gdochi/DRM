---
title: Organize e salve uma GUI
slug: gui-maker-screen
order: 101
description: Selecione um tipo de tela, mova suas partes e salve um layout reutilizável.
product: core
category: GUI Maker
section: gui-maker
status: Guia
version: 0.3.1
audience: Criadores de GUI
translationSource: en
translationMethod: assisted
---

## Mova uma parte da janela

Abra o layout pretendido em [GUI Maker](#core/gui-system), clique em um elemento de tela e edite suas propriedades à direita. Use **X / Y** para posição e **W / H** para tamanho. **Layer # / Layer − / Layer +** controle qual elemento sobreposto está na frente.

![Elemento de texto selecionado e seu inspetor.](assets/media/guides/drm-031-forge1201/gui-text.png "DRM 0.3.1 / Forge 1.20.1. Selecione na tela e edite o elemento correspondente à direita. Texto aqui pode ser decoração; linhas de diálogo reais vêm de Dialogue Editor.")

![Mover e redimensionar um componente Text e conferir a pré-visualização do editor.](assets/media/guides/extra-videos-20261106/gui-drag-resize.mp4 "DRM 0.3.1 / NeoForge 1.21.1, interface em inglês. Arrastar, redimensionar e Preview; a disposição ainda é um rascunho.")

| Área | Usar |
| --- | --- |
| Barra de ferramentas | Novo, carregar, salvar, Save As e redefinir |
| Tipo seletor | Escolha o que o layout exibirá |
| Ferramentas | Adicionar componentes suportados por esse tipo |
| Canvas / Screen Editor | Selecionar, arrastar, redimensionar e inspecionar sobreposições |
| Inspetor. | Posição, tamanho, cores, texto, imagens e funções de dados |

Diálogo de amostra do Canvas, produtos e valores ajudam na colocação. Os dados reais do jogador vêm do diálogo conectado, da loja ou da moeda. Transparência de fundo e estilo herdado são configurações separadas; substitua apenas os elementos que você deseja alterar.

## Escolha o tipo de tela primeiro

| Tipo | Tela |
| --- | --- |
| diálogo | Conversa NPC |
| npc_shop | Compra e recompra |
| currency_hud | Layout de moeda HUD |
| remnant_msg | Mensagem remanescente |

Outros perfis de layout, como `player_status`, `custom_hud` e `generic`, podem ser usados por ferramentas conectadas. Para um diálogo normal ou uma loja, selecione o tipo correspondente. Um componente de escolha precisa de dados de diálogo; colocá-lo em outro tipo não cria uma conversa.

## Salvar e conectar o layout

**Create New** inicia um rascunho para o tipo atual. **Load** lista os layouts salvos correspondentes. **Save** escreve o arquivo existente; **Save As** dá-lhe outro nome. **Reset** restaura o layout padrão do tipo.

Use **Save As** para um padrão personalizado. Layouts regulares vivem sob `config/dochi_rpg_maker/gui/`; HUDs de moeda podem usar a loja HUD-set. Selecione o arquivo salvo no recurso que o usa e reabra a tela real do player.

Para as partes que cada tipo pode exibir, veja [ componentes GUI](#core/gui-maker-components). Para imagens e importação de um PNG, veja [assets](#core/assets-models).
