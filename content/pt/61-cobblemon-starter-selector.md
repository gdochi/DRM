---
title: Faça um NPC de Seleção Inicial
slug: cobblemon-starter-selector
order: 551
description: Escolha cartões iniciais e concedido Pokémon, em seguida, adicione uma condição de seleção única.
product: drm-cobblemon-editor
category: Serviço NPCs
section: services
status: Rascunho
version: Fabric / NeoForge 0.2.9
audience: Criadores de NPC e operadores de servidor
tags:
  - starter-selector
  - pokemon-give
  - runtime-gui
translationSource: en
translationMethod: assisted
---

## Deixe os jogadores escolherem uma das três entradas.

Crie candidatos em **Starter Selector Editor** e, em seguida, aplique o perfil a um NPC. Os jogadores selecionam uma carta e confirmam a sua Pokémon. Use um DNPC ou CustomNPCs NPC em **Minecraft 1.21.1, Fabric or NeoForge**.

![Três candidatos iniciais, palavras de cartão no meio e Pokémon configurações à direita.](assets/media/guides/cobble-029-neo1211/cobble-starter.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1, IU Inglês. Selecione um candidato à esquerda, edite o texto do cartão no meio e o dado Pokémon à direita.")

1. Abra **Starter Selector Editor → Use Default** da lista de editores do DRM.
2. Selecione um candidato. Defina **Card Name / Pokémon Description**, e mantenha cada **Option ID** único.
3. Em **Starter settings → Edit Pokémon**, coloque espécies, nível, forma, natureza, habilidade, item e movimentos. Renomar o cartão não muda a espécie concedida.
4. Usar **Add / Delete** Para 1–32 candidatos.
5. **Save As** um arquivo de usuário como `custom/village_starters.json`.
6. Abra o NPC com o DRM Core e **Apply** o arquivo para **Starter Selector**.
7. Interaja com as duas mãos vazias e verifique os cartões, detalhes e confirmação.

Se o diálogo normal DRM ou uma loja abrir primeiro, use a mão vazia **Shift+right-click**. Para abrir a seleção de uma opção de diálogo normal, adicione **go_starter_selector** e escolher um arquivo, ou **amarrado** para o perfil aplicado ao NPC atual.

![Caminho do usuário e status salvo após Save As.](assets/media/guides/cobble-029-neo1211/cobble-starter-save.png "O caminho do exemplo foi salvo através de Save As. Criar o arquivo e aplicar a função NPC são etapas separadas.")

![Três cartas iniciais e o botão Escolha este Pokémon aberto interagindo com o NPC.](assets/media/guides/cobble-029-neo1211/cobble-starter-runtime.png "Vista do jogador: selecione uma carta e confirme com Escolha este Pokémon no canto inferior direito. Este exemplo seleciona Bulbasaur dos três candidatos padrão.")

A confirmação fecha o seletor e adiciona o Pokémon à equipe. O painel da equipe à esquerda abaixo mostra **Bulbasaur / Lv.5**; a equipe do servidor também foi verificada para o único Bulbassaur concedido.

![Após a confirmação, o jogo mostra um nível 5 Bulbassaur na equipe à esquerda.](assets/media/guides/cobble-029-neo1211/cobble-starter-granted.png "Cobblemon Editor 0.2.9 / DNPC 0.1.3 / NeoForge 1.21.1. O resultado da concessão; configure as condições abaixo para um limite único.")

## Permitir uma seleção por jogador

O seletor não impõe um limite único permanente e universal. Configure a ação de seleção bem-sucedida e as condições:

1. Em **Dialogue and GUI → Success Tag (optional)**, digite `starter_chosen` e defina o botão abaixo para **Add tag after grant**.
2. Sob o **Card display conditions** de cada candidato, exija que o jogador ** não tenha starter_chosen**. Ative as condições com **Enabled** e aplique o limite a todos os candidatos.
3. Se usar um diálogo introdutório, coloque a mesma condição na seleção de abertura.
4. Selecione com um novo jogador e, em seguida, interaja novamente para verificar se iniciadores reivindicados anteriormente não estão disponíveis.

Ações de sucesso são executadas somente depois que o Pokémon é concedido. Uma equipe inteira volta para o armazenamento de PC. Se nenhum dos dois pode receber o Pokémon, as ações de sucesso não correm.

![Diálogo e GUI com Success Tag e Adicionar tag após concessão.](assets/media/guides/cobble-029-neo1211/cobble-starter-dialogue.png "Digite a tag de conclusão em Success Tag e mantenha Add tag após concessão. Um caminho GUI de diálogo em branco ignora o diálogo introdutório e abre as cartas.")

## Alterar cartões, diálogo e áudio

| Localização | Controles |
| --- | --- |
| **Starter settings → Edit Pokémon** | O Pokémon realmente concedido |
| **Card display conditions** | Quando o candidato está visível e selecionável |
| **Card Selection Audio** | Espécie chorar ou um som personalizado |
| **Dialogue and GUI** | Diálogo introdutório, caminho de tela e ações de seleção bem-sucedidas |
| **DRM GUI Maker** | Lista de cartas do jogador, visualização e layout de botões |

Um caminho em branco **Dialogue GUI (optional)** abre as cartas diretamente. Um habilitado usa fixo **Open Selector / Close** Escolhas. Construa ramos de forma livre em [DRM diálogo](#core-fabric/dialogue-system), em seguida, conecte sua ação inicial.

A tela padrão mostra três cartas por página. Uma sessão de seleção dura 60 segundos; interaja novamente se uma tela antiga não puder confirmar. O áudio suporta Volume 0–4 e Pitch 0.05–4.

**Save to the same file** para a próxima interação; Aplicar novamente depois de mudar seu caminho. Os perfis estão em `config/dochi_rpg_maker/cobblemon/starter_selectors/`; o layout padrão é `gui/starter_selector_gui.json`. Use **Save As** antes de personalizar o layout e manter os cartões e controles de confirmação.
