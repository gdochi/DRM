---
title: Adicione suas fotos e modelos NPC
slug: assets-models
order: 130
description: Importe um PNG para suas telas e escolha modelos e animações NPC.
product: core
category: Ferramentas do mundo e NPC
section: world-tools
status: Estável
version: 0.3.1
audience: Criadores de GUI e NPC
tags:
  - assets
  - geckolib
  - animation
translationSource: en
translationMethod: assisted
---

## Escolha um PNG para uma tela

Em GUI Maker siga **+ Imagem → Ativo: no inspetor direito → escolha uma imagem → Aplique**. Percorra o inspetor se a propriedade estiver abaixo da vista. Pesquisar por nome de arquivo ou restringir o seletor por mod e pasta pai.

![O real GUI Maker Image Asset Picker.](assets/media/guides/drm-031-neo1211/gui-custom-png-search.png "DRM 0.3.1 / NeoForge 1.21.1, IU Inglês. Pesquisando guide_icon encontra o PNG colocado na pasta do servidor. Este exemplo copia o ícone existente de DNPC inalterado. Selecione a linha e pressione Aplicar no topo.")

**Aplicar atribui a imagem ao elemento Imagem selecionado.** Salvar toda a GUI é um passo separado. Depois de fechar o seletor, ajuste a posição, largura, altura e ajuste; use Save As para um novo arquivo. Para exibi-lo em um diálogo ou loja, selecione a GUI salva no recurso correspondente.

![O PNG selecionado aplicou e salvou como guide_image.](assets/media/guides/drm-031-neo1211/gui-custom-png-applied.png "Aplicação real e Save As na mesma 0.3.1 Corra. Verifique a imagem de tela selecionada e guide_image.json no topo. Isso verifica a edição e salvamento da GUI, separado de reproduzir um diálogo usando-o.")

## Se o seu PNG está faltando

1. Coloque embaixo do servidor `config/dochi_rpg_maker/assets/textures/`. Subpastas são permitidas.
2. Pressione **Refresh** no seletor e pesquise seu nome de arquivo.
3. Redefinir filtros de mod ou pasta para **All**, se necessário.
4. Verifique a visualização da linha e pressione Aplicar.

Fotos de propriedade do servidor são enviadas para os jogadores. Cada PNG deve ser ** 8 MiB ou menos**, **4096 pixels ou menos por lado**, e **16,777,216 pixels ou menos total**. Ao transferir uma GUI, inclua o JSON e as imagens referenciadas.

## Onde mudar um modelo NPC

Para DNPC, **Clique com o botão direito do mouse no NPC com Dochi Npc Core → Appearance & Model** para escolher seu modelo, pele e escala. Um elemento de Imagem GUI coloca uma imagem em uma tela; não altera o corpo do NPC.

![DNPC Appearance & Model.](assets/media/guides/dnpc-012-neo1211/dnpc-appearance.png "DNPC 0.1.2 / NeoForge 1.21.1, IU Inglês. Compare Humanoid, Skin e Scale com a visualização central. Isto é... DNPCA tela de aparência, separada da DRM's CustomNPCs Tela básica do NPC.")

Projetos existentes 1.20.1 e 1.21.1 usando CustomNPCs configuram DRM modelos em **NPC Basic**. CustomNPCs está excluído de Minecraft 26.3 em diante. Seguir [DNPC aparência e equipamentos](#dochi-npc-core/npc-core-editor) para o caminho que combina com seu ator.

Um modelo Gecko precisa de um modelo, textura e animação mais o correto GeckoLib. Um PNG sozinho não cria movimentos de caminhada ou ataque. **loop** Repetições, **Uma vez.** Joga uma vez, e **hold-last** segura a pose final. Escolha um movimento realmente fornecido pelo modelo.

## PNGs animados

Para uma imagem de quadro vertical, inclua resource-pack-style `.png.mcmeta`: por exemplo, `priest.png` e `priest.png.mcmeta`. Metadados definem o tamanho do quadro, ordem e tempo. Continue com [GUI Maker](#core/gui-system) para layout e [ criação de diálogo](#core/dialogue-system) para conectá-lo.
