---
title: Dê uma recompensa uma vez
slug: dialogue-rewards
order: 71
description: Conceda itens, registre a reivindicação e esconda uma escolha na próxima visita.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Guia
version: 0.3.1
audience: Criadores de diálogos
tags:
  - dialogue
  - reward
translationSource: en
translationMethod: assisted
---

## Dê três maçãs uma vez por jogador

Comece com [ uma conversa curta ](#core/dialogue-system), depois abra um nó geral **Choices**. Este exemplo concede três maçãs, registra a reivindicação com tag jogador `welcome_received`, e esconde o botão de presente na próxima visita.

As telas e o resultado abaixo foram verificados com **DRM 0.3.1 / NeoForge 1.21.1**. A escolha chama-se **Receive three apples**; use seu próprio texto, se preferir.

## Forge: comece com o exemplo salvo

** [ Baixe o exemplo de recompensa única](assets/media/dialogue/welcome_reward_once.zip)**

No teste **DRM 0.3.1 / Forge 1.20.1** build, escolhendo Item para uma nova ação deixou como Goto. Use este exemplo salvo e edite seus valores existentes em vez de seguir o NeoForge passos de ação-criação abaixo.

1. Extraia toda a pasta `welcome_reward_once` para o jogo ou servidor `config/dochi_rpg_maker/dialogue_sets/`. O caminho resultante deve ser `dialogue_sets/welcome_reward_once/dialogue_set.json`. Preserve qualquer trabalho existente com esse nome primeiro.
2. Abra **Dialogue Editor → Load → welcome_reward_once → Load**.
3. Selecione ** dialogue_1 → Escolhas → Receba três maçãs → Choice actions **. Edite o item e a contagem da linha de Item existente ou teste o exemplo inalterado primeiro.
4. **Save As** seu próprio nome, em seguida, siga "Salvar, aplicar e visitar novamente" abaixo. Mude uma tag de reivindicação na condição e na ação Tag.

![welcome_reward_once selecionado em Forge Load Dialogue Set.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-load.png "DRM 0.3.1 / Forge 1.20.1. Coloque a pasta completa em dialogue_sets e selecione-a aqui. Se estiver faltando, procure uma pasta aninhada extra.")

![A doação de Item carregado e o registro de Tag em Forge.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-actions.png "DRM 0.3.1 / Forge 1.20.1. A ação Item existente é dar / minecraft:apple / 3. Aplicando este conjunto a um NPC produziu três maçãs e a etiqueta de reivindicação no servidor.")

O download contém a pasta completa salva pelo editor NeoForge. Carregando, aplicando, reivindicando e revisitando também foram verificados em Forge. Os passos de nova ação abaixo mostram NeoForge.

## 1. Adicionar a concessão do item

1. Selecione a opção de presente e digite **Label: Receive three apples**.
2. Abra **Choice actions**. Substitua o exemplo Goto ou use **+ Action** para adicionar uma linha.
3. Escolha **Type: Item → Item: give**.
4. Conjunto **ID: minecraft:apple**, **Count: 3**. Role o painel direito para baixo se o Conde estiver fora da área visível.

## 2. Gravar a reivindicação

Use **+ Ação** na mesma escolha. Defina a nova linha para **Type: Tag**, **Op: add**, **Tag: welcome_received**. A lista é **Item → Tag**.

![Uma concessão de item seguido pelo welcome_received Tag action.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-actions.png "DRM 0.3.1 / NeoForge 1.21.1. A primeira ação concede três maçãs; a segunda registra a reivindicação sobre o jogador. Combine o nome da etiqueta na próxima condição exatamente.")

Este exemplo de duas ações fecha depois de conceder o presente. Para mostrar uma resposta depois, crie um nó geral e adicione **Goto → that node last**, após o registro de concessão e reivindicação.

## 3. Esconda a escolha depois de reivindicar

Na mesma escolha, abra **Condition list → Add** e coloque **Type: tag**, **Op: not**, **Tag: welcome_received**.

![Uma tag sem condição que não requer welcome_received tag.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-condition.png "DRM 0.3.1 / NeoForge 1.21.1. Esta escolha tem 2 ações / 1 condições. A condição controla a visibilidade, não concede nada por si só.")

**tem** requer que a etiqueta esteja presente. Use **não** aqui então só um jogador que não reivindicou o presente vê o botão.

## 4. Salvar, aplicar e visitar novamente

1. **Save As** `welcome_reward_once`.
2. Clique com o botão direito do mouse no NPC com DRM Core, selecione esse conjunto em **Dialogue JSON**, então **Apply Dialogue**.
3. Esvazie as duas mãos e fale com o NPC de perto.
4. Clique na opção de presente e verifique se há três maçãs no seu inventário.
5. Fale de novo e verifique se a escolha do presente se foi.

![Só o Adeus permanece quando o diálogo é reaberto após o presente.](assets/media/guides/drm-031-neo1211/dialogue-reward-once-hidden.png "DRM 0.3.1 / NeoForge 1.21.1. Depois de confirmar três maçãs e o welcome_received jogador tag no servidor, a interação foi repetida. A escolha do presente estava escondida e Goodbye permaneceu.")

A etiqueta pertence ao jogador. Se vários NPCs usarem a mesma etiqueta, alegando que um esconde esse presente dos outros também. Use nomes separados como `gate_guard_gift` e `innkeeper_gift` para presentes independentes, combinando cada ação e condição.

![Só o Adeus permanece depois de reivindicar o presente importado em Forge.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-hidden.png "DRM 0.3.1 / Forge 1.20.1. Esta é uma segunda conversa depois de carregar o conjunto fornecido, aplicando-o ao NPC, clicando no presente e verificando a concessão do servidor e a etiqueta de reivindicação.")

## Teste o presente novamente.

Com a permissão do administrador, remova sua etiqueta de reivindicação e fale novamente:

```text
/tag @s remove welcome_received
```

Isso não leva de volta as maçãs já recebidas. Verifique as quantidades de inventário separadamente durante os testes de repetição.

## Continue em uma loja ou busca

Prepare preços e estoque em [NPC Shop](#core/shop-system), então conecte-se **Go Shop**. Use as ações atuais no guia [quest](#core/quest-system) para a aceitação de missões e objetivos. Veja [condições e ações](#core/conditions-actions) para nó, rotas e visibilidade de escolha.
