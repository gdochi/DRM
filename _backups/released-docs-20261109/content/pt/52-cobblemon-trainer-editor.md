---
title: Escolha equipes, rodadas, diálogos e recompensas
slug: cobblemon-trainer-editor
order: 520
description: Construa a equipe de um treinador e escolha o que acontece antes e depois da batalha.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Rascunho
version: Fabric / NeoForge 0.2.9
audience: Cobblemon lutar contra os criadores de NPC
tags:
  - trainer
  - editor
  - party
translationSource: en
translationMethod: assisted
---

## Comece com um Pokémon

Selecione uma lista Pokémon no meio **Pokemon Party** para editá-la à direita. As telas usam a interface inglesa de ** Cobblemon Editor 0.2.9, DRM 0.3.1 e Cobblemon 1.8.4 em NeoForge 1.21.1 **.

![Nível 5 Bulbassauro selecionado, com configurações básicas à direita.](assets/media/guides/cobble-029-neo1211/cobble-party.png "Esquerda: categorias. Meio: a equipe e o modelo da rodada atual. Direita: o selecionado Pokémon.")

1. Use **Add**. Treinadores suportam até seis Pokémon por rodada; o próprio Pokemon usa um.
2. Clique no nome da espécie em **Basic → Pokemon** para escolher uma espécie. O botão de exemplo diz **Bulbasaur**.
3. Defina **Level** e escolha suportado **Form / Aspects**, **Nature** e **Ability**.
4. Escolha um **Held Item**. Poções usadas pelo treinador pertencem à parte. **Battle Item Inventory** abaixo da lista de equipes.
5. **Save As** seu próprio arquivo, em seguida, aplicá-lo a um NPC. Veja [ a primeira batalha](#drm-cobblemon-editor/cobblemon-editor-setup) para os passos obrigatórios.

![Seletor de espécies aberto a partir do botão Bulbasaur, com busca, filtros e páginas.](assets/media/guides/cobble-029-neo1211/cobble-pokemon-picker.png "Pesquise pelo nome ou limite o catálogo com Filtros; você não precisa memorizar IDs de espécies.")

## Definir estatísticas e movimentos

**Stats** mostra valores calculados no nível de autoria. Use **Edit IV / EV** para mudar IVs e EVs. IVs aleatórios ou natureza produzem um intervalo possível ao invés de um único valor fixo.

![Nível 5 stat varia com IV Aleatório e EV 0 / 510.](assets/media/guides/cobble-029-neo1211/cobble-stats.png "Ajuste de nível de batalha e outras regras de batalha podem mudar os valores usados durante uma batalha.")

| Configurando | Alcance |
| --- | --- |
| Nível | 1–100 |
| Mexe-se. | Até 4 |
| IVs | 0–31 por estado |
| EVs | 0–252 por estatística; 510 total |

Em **Moves**, use o botão de navegação de cada slot para selecionar um movimento. Arraste um movimento designado para reordená-lo. Slots vazios usam as regras de conjunto de movimento existentes; quatro rótulos None não significam que o Pokémon é incapaz de usar qualquer movimento.

![Quatro slots de movimento com botões de seleção individuais.](assets/media/guides/cobble-029-neo1211/cobble-moves.png "Coloque movimentos aqui quando o treinador precisar de um determinado conjunto de movimentos. Os movimentos de aprendizagem da espécie aparecem primeiro no selecionador.")

Use **Generate Party** para uma equipe construída a partir de filtros. Continue para [ AI, geração de equipe e mecânica](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items) para mais controle.

## Conectar gatilhos, rodadas e diálogo

Escolha **Battle Config** à esquerda para alternar para as configurações de batalha.

![Configurações gerais de batalha mostrando Batalha do Treinador, tipo de batalha, fonte de nome e apresentação.](assets/media/guides/cobble-029-neo1211/cobble-config.png "Identidade e tipo. Encontro: gatilhos. Rodadas: configuração redonda. Diálogo: conversa pré-batalha. Depois de Ações: o que segue um resultado.")

1. Em **General**, habilite **Trainer Battle** e escolha **Battle type**. **Name source → Trainer Profile** usa **Trainer Name** aqui; **Applied NPC Name** usa o nome do NPC aplicado.
2. Em **Encounter**, escolha interação ou detecção de jogadores próximos. Veja [ encontros e revanche](#drm-cobblemon-editor/cobblemon-encounters-rematches) para condições e períodos de espera.
3. Em **Rounds**, use **Add / Duplicate** para até 16 rodadas. Cada um pode ter sua própria equipe, regras, condições, diálogo e recompensas. O progresso atual segue a ordem, então revise as mudanças antes de reordenar um treinador operacional. Aplicar de novo não limpa recordes de vitórias.
4. Em **Dialogue**, selecione o diálogo da rodada atual e coloque **go_battle** em sua escolha de batalha. Sem um diálogo definido, a confirmação normal da batalha é usada.
5. Escolha uma entrada em **General → Battle presentation**. Defina Singles/Doubles e ajustes de nível em [ regras de batalha](#drm-cobblemon-editor/cobblemon-battle-rules).

![Regras atuais, IA, truques e configurações de revanche.](assets/media/guides/cobble-029-neo1211/cobble-rounds.png "Os controles redondos são Adicionar / Duplicar. Clique no valor atual ao lado da habilidade AI à direita para abrir configurações de estratégia.")

### Veja o diálogo iniciar uma batalha

Com o treinador e o diálogo da rodada já aplicados, interaja com o NPC e escolha **Let's battle!**. A opção executa **go_battle**, reproduz a introdução configurada e abre a tela de batalha do Cobblemon. Este é o fluxo do jogador após a configuração no editor.

![Converse com Meadow Trainer, escolha Let's battle! e entre na batalha Pokémon após a introdução.](assets/media/guides/runtime-videos-20261106/trainer-battle-start.mp4 "Cobblemon Editor 0.2.9 + DRM 0.3.1 + DNPC 0.1.3 + Cobblemon 1.8.4 / NeoForge 1.21.1, interface em inglês. Diálogo da rodada → go_battle → introdução → batalha.")

## Dê recompensas após o diálogo

Em **Battle Config → After Actions**, escolha **Action Mode → Sequential**. Coloque o diálogo em primeiro lugar e item / moeda recompensas depois dele. Selecione qual resultado aciona a sequência: vitória, perda ou fuga.

A execução sequencial espera que o diálogo termine. Cancelamento ou desconexão para recompensas posteriores; interagir novamente retoma as ações restantes. Cada rodada permite uma ação de diálogo. Reduza as configurações de multi-diálogo mais antigas para uma antes de salvar ou aplicar.

**General Item Inventory** possui requisitos de posse como Mega-chaves. É separado do consumível **Battle Item Inventory**. Copiar um item do inventário do jogador não o consome.
