---
title: Bombardeio e Timelines de Suporte
slug: expanded-support-timeline
order: 330
description: Agendar bombardeios, suporte de armas, reforços de veículos e movimento NPC juntos.
product: dochi-warfare-expanded
category: Apoio de combate
section: support
status: Rascunho
version: 0.3.1
audience: Mapear criadores e operadores
translationSource: en
translationMethod: assisted
---

## Crie uma linha do tempo

1. Abra o editor de truques da seleção do editor.
2. Escolha `Create New` para um documento vazio ou `Use Default` para um rascunho de bombardeio em sua posição.
3. Defina a origem e adicione tipos de ação à linha do tempo.
4. Configure o tick, as coordenadas, a unidade de suporte e a vida útil de cada ação.
5. Nomeie e salve o arquivo com `Save As`.
6. Use a ação run-at-my-position para invocar o layout salvo em relação à sua posição.

Salve as mudanças pendentes primeiro. Se outro usuário alterou o arquivo, atualize antes de executá-lo. A pré-visualização do editor mostra o layout criado; teste a navegação real e acertos no terreno pretendido.

| Ação | Configurações e resultado |
| --- | --- |
| Bombardeio | Avião, bomba, alvo, direção, altitude, forma de ataque e intervalo; usa armas nativas de queda livre. |
| Suporte do veículo | Veículo, contagem, partida/destino, espaçamento, facção e raio de guarda; move-se para defender o destino. |
| Suporte de arma | Modo ar/terra, arma de veículo real, aproximação, corredor de tiro, duração e boné de tiro. |
| Movimento NPC | Espawns selecionados DW NPC clones ou temporariamente direciona existentes DW NPCs em uma área. |

O servidor fornece armas de apoio de armas elegíveis. Bombas, foguetes, mísseis e armas principais de baixa velocidade estão excluídos. Ataques de apoio aéreo e saídas; apoio terrestre varre um corredor com sua torre. A RPM nativa, munição, calor, recarga e verificações de segurança permanecem ativas.

Escolha clones NPC da biblioteca DW. A seleção de área requer CustomNPCs com IA DW ativada e exclui NPCs montados, contratados ou já direcionados. O combate existente tem prioridade antes que o movimento seja retomado. Não há retorno de teletransporte. As facções usam IDs numéricos; as referências de arquivos clone diferem dos nomes de exibição.

![Gimmick Editor com etapas, visualização superior, configurações e cronograma.](assets/media/guides/warfare-expanded-031-neo1211/dwe-gimmick.png "DWE 0.3.1 / NeoForge 1.21.1. O rascunho padrão usa A-10A, MK-82 e Point, com a primeira gota no carrapato 20. Combine Entrada, Alvo e Saída para a linha do tempo antes de correr.")

## Tempo e origem

20 carrapatos igual a um segundo em 20 TPS. Uma ação de bombardeio é a **Primeiro lançamento de bomba**, não impacto. Veículos, armas e NPCs começam a geração ou movimento. A duração do apoio à arma começa ao entrar no alcance da arma; a expiração da saída ou da vida pode acabar mais cedo.

`lifetime_ticks` limita o apoio temporário. Os NPCs separados são removidos no vencimento; os NPCs selecionados por área existentes recuperam suas configurações de movimento anteriores sem substituir as edições feitas durante a execução. Veículos de suporte temporário não podem ser abordados, clonados ou capturados em pedras da alma.

## Comandos do operador

O nível de permissão 2 é necessário. Salve `my_support` primeiro e omita `.json` de seu nome de comando.

```text
/dw callgimmicks my_support
/dw callgimmicks my_support ~ ~ ~
/dw bombard ~ ~ ~ superbwarfare:ju_87 superbwarfare:sc_250 10
```

Sem coordenadas, o layout salvo funciona no lugar. Com coordenadas, alvos, começos e destinos mudam pela diferença dos salvos `origin`. O último exemplo libera sua primeira bomba depois de 10 carrapatos. Verifique os IDs de aeronaves/cargas de pagamento instalados com a conclusão do comando. O comando one-shot suporta pontos e `area`; layouts de linha de autor no editor/JSON.

## Arquivos e referência JSON

Arquivos ao vivo em `config/dochi_warfare/vehicle_ai/gimmicks/<name>.json`. Os exemplos incorporados instalam somente quando faltam, preservando arquivos de usuário.

O esquema atual é `dochi.warfare.gimmicks.v6`; v1–v5 permanecem legíveis. `origin` define a âncora de layout, `steps` mantém ações, e `at_tick` programa-as. Cada passo contém um de `bombard`, `vehicle_support`, `fire_support` ou `npc_move`. Comece a partir de arquivos gerados pelo editor ao editar o JSON.

Campos de bombardeio `explosion_damage` e `direct_damage` são valores básicos de dano da HP. Zero desabilita esse componente de dano; um valor de editor vazio mantém o valor da arma nativa. A queda nativa e a armadura ainda afetam os danos reais. Estes campos não mudam o raio de explosão ou a destruição do terreno.
