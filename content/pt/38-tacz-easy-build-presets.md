---
title: Fácil construção e predefinições de combate
slug: warfare-easy-build-presets
order: 325
description: Crie o comportamento NPC rapidamente com o fluxo de Easy Build guiado ou cinco predefinições de combate.
product: dochi-warfare
category: Ferramentas de configuração
section: setup
status: Rascunho
version: 0.3.3
audience: Criadores de NPC de armas de fogo
tags:
  - easy-build
  - preset
  - setup
translationSource: en
translationMethod: assisted
---

## Duas ferramentas de configuração rápida

`Easy Build` e `Presets` são ferramentas criadoras na área de ajuda da barra superior do editor `DW Npc Core`. Ambos criam um ponto de partida de combate útil, mas funcionam de forma diferente.

| Ferramenta | Melhor usado quando | Resultado |
| --- | --- | --- |
| `Easy Build` | Você quer compor o comportamento respondendo perguntas | Cria configurações de combate diretamente das respostas. Não aplica uma predefinição de função nomeada. |
| `Presets` | Você quer um tipo de combate comprovado imediatamente. | Aplica uma das cinco doutrinas: Guarda Rifleman, Patrulhador, Assalto, Artilheiro de Apoio, ou Sniper. |

Nenhuma ferramenta bloqueia o resultado. Todo valor aplicado permanece editável nas categorias normais.

## Fluxo de trabalho de compilação fácil

1. Abra o NPC com `DW Npc Core`.
2. Pressione `Easy Build` na barra superior.
3. Escolha a quantidade de detalhes que você quer.
4. Responda as perguntas. Perguntas adicionais podem aparecer somente quando o sistema relacionado estiver habilitado.
5. Revise os traços centrais, força geral, advertências e avisos de conflito.
6. Pressione `Apply`.
7. Volte para o editor normal, inspecione a arma e os valores gerados, depois pressione `Save`.

![Fácil de abrir com Iniciante, Intermediário e Especialista.](assets/media/guides/warfare-031-neo1211/dw-easy.png "DW 0.3.1 / NeoForge 1.21.1. Comece com sete perguntas para iniciantes, aplique o comportamento resultante e, em seguida, salve as configurações NPC.")

## Níveis de detalhe

| Nível | Estilo de pergunta |
| --- | --- |
| `Beginner` | Sete grandes questões compõem comportamento ocioso, movimento de combate, alcance, reação, controle de fogo e sobrevivência. A primeira pergunta de temperamento só recomenda respostas posteriores, não atribui um papel. |
| `Intermediate` | Seleciona diretamente o modo ocioso agrupado, consciência, engajamento, reposicionamento, fogo, precisão-ramp, supressão, cobertura e comportamento de munição vazia. |
| `Expert` | Edita distâncias de nível de campo, tempo, velocidade, explosão, supressão e valores de cobertura. Perguntas de acompanhamento aparecem apenas para sistemas habilitados. |

Easy Build não é baseado em uma predefinição de combate nomeada. Escolhas de temperamento iniciantes, como agressivas, equilibradas ou cautelosas, só mudam sugestões; elas não substituem silenciosamente respostas posteriores.

## Configurações preservadas

O Easy Build compõe o comportamento enquanto preserva o conteúdo de outros editores:

* Armas à distância e corpo a corpo e suas piscinas
* Entidades-alvo, facções e regras de tags
* Piscinas de pele e armadura
* Contratos mercenários
* Granadas e combate FX
* Atual virtual `Ammo Stock` e seu máximo

Você pode inspecionar esses valores inalterados depois em `Gun`, `Targets`, `Ammo`, `Visual & FX`, e as outras categorias normais.

![Guarda Rifleman, Patrulhador e Assalto cartões predefinidos com rolagem horizontal.](assets/media/guides/warfare-031-neo1211/dw-presets.png "Clique em um cartão Presets para aplicá-lo. Role horizontalmente para o artilheiro de apoio e as cartas de atirador. Verifique a arma, os alvos e o estoque de munição atual separadamente.")

## Predefinições de combate

`Presets` aplica uma doutrina geral de combate completa em um passo.

| Predefinir | Comportamento inicial |
| --- | --- |
| `Guard Rifleman` | Defende uma posição com fogo mid-range controlado |
| `Patroller` | Patrulha uma área, investiga o som e reposiciona durante o combate. |
| `Assault` | Fecha a distância rapidamente e aplica pressão de fogo em movimento |
| `Support Gunner` | Mantém o espaçamento do esquadrão e usa fogo e supressão sustentados de médio a longo alcance |
| `Sniper` | Usa longos intervalos de detecção e disparo com alta precisão |

Predefinições mudam de consciência, comportamento ocioso, distância de engajamento, movimento tático, controle de fogo, cobertura e resposta de recarga. Eles não substituem armas, armaduras, peles, alvos, relações de facção, granadas, FX, contratos de mercenários, ou `Ammo Stock`.

## Verifique o resultado antes de salvar

Easy Build e predefinições são pontos de partida. Depois de aplicar um:

1. Confirme que a arma atual combina com o alcance selecionado e estilo de disparo.
2. Verifique `Max Distance`, alcance de detecção e aproxime-se ou retire a distância contra o terreno de encontro.
3. Certifique-se de que `RPM Mode`, precisão e alcance são razoáveis para o estoque de munição disponível.
4. Teste o movimento e a cobertura em terreno simples.
5. Pressione `Save` quando o resultado estiver correto, ou use `Save As` para manter a configuração NPC completa como um perfil reutilizável.
