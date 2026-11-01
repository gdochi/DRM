---
title: Quest Editor E Diário
slug: quest-system
order: 100
description: Pacotes de missões, objetivos, recompensas, links de diálogo do NPC e o diário do jogador.
product: core-fabric
category: Sistema Quest
section: quest-editor
status: Estável
version: 0.3.1
audience: Criadores de missões
tags:
  - quest
  - journal
translationSource: en
translationMethod: assisted
---

## Nomeie sua primeira missão e escolha como aceitá-la

Abra **Quest Editor → Create New** do seletor de editores do núcleo. Use **+ Categoria **, depois **+ Quest** para adicionar uma missão a esse capítulo. Estas são as telas inglesas de **DRM 0.3.1 / NeoForge 1.21.1**.

![Quest Editor com a Nova Busca selecionada dentro do Novo Capítulo. Info contém seu título, descrição e configurações de aceitação.](assets/media/guides/drm-031-neo1211/quest-info.png "A árvore esquerda seleciona uma missão. Trabalhe com informações, objetivos e recompensas à direita.")

1. Dê **Quest ID** um nome que você pode encontrar mais tarde no diálogo. **Title** é o nome voltado para o jogador; **Description** explica a tarefa.
2. Com **Start Policy → Manual Accept**, verifique **Accept Sources**. Habilite **NPC Interaction / Dialogue** para uma oferta de NPC ou **Player Quest Journal** para o botão Aceitar da revista. Somente a fonte NPC está habilitada neste exemplo.
3. Adicione a tarefa em **Objectives**. Para "trazer três pães", escolha se o jogador só precisa possuí-los ou deve realmente entregá-los.
4. Defina **Rewards**, então salve o pacote com **Save As**. As missões atuais do editor são concluídas automaticamente quando seus objetivos são cumpridos; um título por si só não faz uma missão concluída.

Continue com NPC Dialogue Links abaixo para deixar um NPC oferecer a missão. Verifique o ID de busca selecionado do diálogo, o título do diário e a recompensa recebida depois de completar o objetivo.

## Armazenamento

Quest packs são armazenados em `config/dochi_rpg_maker/quests/<pack>/`. `pack.json` possui o pacote e a categoria, enquanto `quests/` contém as missões individuais.

O pacote de amostras empacotado começa desativado. Use-o como referência e crie um pacote de produção separado.

## O que uma missão pode fazer

| Área | Opções principais |
| --- | --- |
| Iniciar | Aceitação manual, início automático quando disponível ou início no primeiro progresso |
| Conclusão | Missões criadas pelo editor atual completam automaticamente após os objetivos |
| Repetir | Nunca, sempre, diariamente, ou depois de um esfriamento. |
| Pré-requisitos | Todas as missões necessárias, qualquer missão, ou uma contagem necessária |
| Objetivos | Localização, item de posse/aquisição/entrega, mata, sinais de diálogo, pontuação da facção |
| Recompensas | Itens, experiência, moeda DRM ou comandos de servidor |

Crie o pacote e as categorias primeiro, depois adicione missões em Quest Editor. Depois de salvar, o servidor mantém o progresso de cada jogador.

## Ligações de diálogo NPC

O selecionador de ação atual oferece `quest_start`, `quest_complete`, `quest_reset`, `quest_objective_complete` e `quest_objective_reset`, com seletores de busca/objetivos apoiados por servidor. Legado turn-in, sinal, falha, abandono, e ações pin permanecem legíveis no JSON existente.

Os editores atuais Fabric e NeoForge escrevem missões automáticas. Distinguir conclusão através de objetivos do administrador forçado `quest_complete`. Veja. [migração de dados](#core-fabric/loader-compatibility) para o JSON mais velho.

## Player Journal

A chave padrão é `U`. Os jogadores podem procurar missões, filtrar por status ou categoria, inspecionar objetivos e recompensas, e aceitar, abandonar, rastrear ou transformar missões.

Personalize o diário pelo tipo GUI Maker's `quest_journal`. Trate `gui/default_quest_journal_gui.json` como um modelo e crie uma cópia com `Save As`.

## Controles diretos e vitórias de treinador

Veja [ orientação de comando do carregador](#core-fabric/loader-compatibility) para operações de quest/objective start, complete e reset. Resets inteiros não recuperam recompensas; resets objetivos retêm o histórico de recompensas.

Com Cobblemon Editor instalado, adicione um `DRM Trainer Victory` Objetivo, escolha sua identidade de treinador e defina o número necessário de vitórias. Siga [Trainer Victory Quests](#drm-cobblemon-editor/cobblemon-trainer-quests).

Arraste divisores entre a árvore/área de trabalho e painéis de informação/descrição para redimensioná-los. Títulos longos enrolam e listas rolam. As larguras pertencem à instância atual do editor, não à missão salva JSON.

## Copiando um pacote com Save As

Digite uma nova ID do pacote e salve. Cada missão precisa de objetivos; IDs de pacotes inválidos ou já usados devem ser corrigidos. Verifique `pack:quest` referências dentro da cópia e referências a outros pacotes, em seguida, carregue a cópia salva e teste aceitação, conclusão e recompensas. Alterar o nome da exibição é separado de alterar o ID do pacote.

## 0.2.8 ações e resultados de relações

Item, tag, pontuação de facção e ações de avanço expõem campos específicos da operação. Selecionadores JSON registrados selecionam arquivos de servidor do tipo correto; os selecionadores de missões suportados incluem outros pacotes e missões não salvas atuais.

Score actions select CustomNPCs Facções ou DNPC Grupos de relacionamento. DNPC suportes de reputação adicionar, subtrair e definir. Use a corrente DRM e uma compilação DNPC com a API de relação juntos; um provedor ausente DNPC não volta para CustomNPCs.

O selecionador de novas ações exclui `go_stat_builder`, `cobble_npc:go_battle` e `dochi_minigames:play`. As ações salvas existentes e os registros de diálogo permanecem suportados.
