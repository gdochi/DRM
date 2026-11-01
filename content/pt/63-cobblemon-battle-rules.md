---
title: Regras de batalha
slug: cobblemon-battle-rules
order: 524
description: Formatos comuns e per-round, níveis, itens, Legendary Pokémon, mecânica e regras de liderança nas compilações atuais.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Estável
version: Fabric / NeoForge 0.2.9
audience: Criadores configurando regras de batalha do treinador
tags:
  - battle-rules
  - rounds
  - items
  - gimmicks
translationSource: en
translationMethod: assisted
---

## Abra o editor

Abra um documento de Treinador ou Pokemon em `Cobblemon Editor` e escolha **Battle Config → Rounds → Edit** para abrir as Regras de Batalha. Esta é uma tela de criação de crianças, não um editor JSON independente. Escolha `Done`, volte ao editor pai e use `Save` ou `Save As` para escrever o documento do próprio Treinador/Pokemon.

As setas DRM para trás e para a frente compartilhadas sempre permanecem visíveis; elas ficam desativadas quando nenhum histórico está disponível. Números inválidos ou IDs de itens bloqueiam a navegação e a conclusão para que o rascunho atual não seja perdido silenciosamente.

![Round-one Battle setup.](assets/media/guides/cobble-029-neo1211/cobble-battle-rules.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. Comum e 1 no topo, escolha o escopo; Usar regras comuns na parte inferior esquerda mostra herança. Distinguir permitiu a mecânica à direita do equipamento NPC Gimmick, atualmente None.")

## Regras comuns e per-round

Selecione `Common Rules` ou uma rodada explícita de 1–16.

- Regras comuns afetam apenas rodadas que ainda as herdam.
- Uma sobreposição de rodadas armazena a configuração completa da batalha de forma independente.
- `Use Common Rules` remove apenas a substituição da rodada selecionada.
- A edição de uma rodada não substitui outras rodadas independentes.

## Configuração da batalha

### Formatos

| Formato | Comportamento |
| --- | --- |
| `Inherit` | Use o formato criado em `Rounds` |
| `Singles` | Um ativo Pokémon por lado |
| `Doubles` | Dois ativos Pokémon por lado |
| `Triples` | Três ativos Pokémon por lado |
| `Lead Duel` | Solteiros usando apenas o lead selecionado de cada lado |

Duplas e Triplas requerem batalha suficiente. Pokémon em ambos os lados. Duelo de chumbo limita apenas as equipes de batalha temporária, ele não exclui as equipes de autoria. Pokemon em si usa Singles e esconde os controles sem sentido do treinador.

### Níveis

| Modo | Comportamento |
| --- | --- |
| `Keep` | Use os níveis criados no documento |
| `Player party average` | Direcione a média atual do jogador-equipe mais um deslocamento de -99 para 99 |
| `Fixed` | Estabeleça uma batalha temporária Pokémon para um nível de 1 a 100 |

O modo fixo pode afetar apenas o treinador ou ambos os lados da batalha. Essas transformações se aplicam a cópias temporárias de batalha e não alteram o original do jogador. Pokémon níveis.

### Mecânica de batalha

A permissão Mega, Tera e Dynamax é uma regra de servidor para ambos os lados. A permissão não instala ou garante um mecânico. A ativação real ainda precisa de um complemento compatível, o equipamento NPC da rodada e o item-chave, e qualquer Pokémon item ou propriedade.

`Trainer Gimmick` configura o equipamento do NPC; Regras de Batalha controlam a permissão para ambos os lados. Se uma regra bloquear o mecânico, o NPC não o escolherá mesmo quando equipado.

## Itens

| Configurando | Efeito de tempo de execução |
| --- | --- |
| Permitir itens | Quando desligado, bloqueie todas as ações cobertas de itens de batalha. |
| Itens proibidos | Bloquear IDs individuais escolhidos por meio de pesquisa de nome/ID |
| Limite de uso | Por ator e por batalha, 0–999 usos ou ilimitados |
| Mínimo turno | Permitir o uso somente no ou após este turno |
| Alvo HP cap | Permitir o uso somente quando a porcentagem atual de HP do alvo estiver em ou abaixo do valor |
| Permitir itens mantidos | Quando sair, recuse a inicialização da batalha se participar. Pokémon segura um item |

A lista banida aceita até 128 IDs únicas. Verifique as entradas no catálogo certo e pressione **Add (selected count)**. Para permitir um item novamente, verifique-o na lista do centro banido e pressione **Remove**. As IDs de um mod atualmente ausente permanecem visíveis sem um ícone em vez de serem excluídas silenciosamente.

O servidor verifica novamente itens de saco de batalha, revive e captura itens antes do consumo. Um lançamento de captura permitido conta para o limite. Quando vários oponentes estão ativos, cada alvo deve satisfazer a regra HP. Jogadores criativos também seguem os limites de uso.

![Tela de itens com seleção e Adicionar controles.](assets/media/guides/cobble-029-neo1211/cobble-battle-rules-items.png "Procure à direita, verifique as entradas e, em seguida, adicione. Adicionar (0) significa que nada está selecionado; a lista proibida no centro também está vazia. Permitir itens de batalha é separado de proibições individuais.")

## Lendário Pokémon

Quando o Legendary Pokémon está desativado, o servidor verifica as duas equipes participantes antes da inicialização e recusa a batalha se uma estiver presente. Isso segue a classificação de Cobblemon `isLegendary()`; não é uma regra separada que inclui automaticamente todos os Míticos Pokémon.

## Leads

Configure as pistas de jogador e treinador de forma independente:

- `Selected`: manter a seleção de chumbo original
- `Random`: escolha entre a equipe saudável do jogador ou a equipe de treinamento gerada
- `Slot`: use slot 1–6

Uma vaga perdida, a liderança do jogador selecionado desmaiado, ou o tamanho insuficiente da equipe para o formato escolhido recusa a inicialização em vez de mudar silenciosamente a regra.

## Pokemon se encontra com regras

Pokemon em si também expõe natural-drop e captura permissão nesta tela. Desativando a captura de blocos de captura para esse encontro independentemente das regras do item. Desativar gotas naturais impede o encontro do addon de permitir quedas normais.

## Fuja das políticas.

Políticas de fuga são comportamento nativo Cobblemon (`native`), fuga imediata (`immediate`), ou mover uma distância configurada da posição inicial (`distance`, 1–512 blocos). No modo de distância, o botão explica a distância necessária; na verdade, mover-se para fora desencadeia a fuga. Essas regras se aplicam a batalhas de propriedade de addon e produzem o resultado `flee`.

## Solução de problemas

| Sintoma | Verificar |
| --- | --- |
| Uma regra não mudou. | Escolha `Done`, salve no editor pai e verifique se a rodada herda Regras Comuns |
| A inicialização é recusada | tamanho da equipe, pistas explícitas, restrição de itens mantidos e restrição lendária |
| Um mecânico não ativa | Compatible addon, equipamento NPC, item chave de inventário geral, Pokémon requisitos e regras de batalha |
| Um item é recusado. | Permissão total, identificação proibida, contagem de uso, turno e destino HP devem permitir |

## Referência JSON

Esta é a informação de referência para ferramentas externas e controle de versão, não o caminho de criação recomendado. O esquema do instrutor 23 armazena as configurações comuns em `trainerOptions.battleConfig` e uma substituição redonda em `rounds[].battleConfigOverride`. Uma rodada sem a substituição usa a configuração comum.
