---
title: Condições Spawn e Population Caps
slug: dochi-spawn-control-rules
order: 840
description: Entenda as condições do mundo, tempo de tentativa, posicionamento, limites de população e campos de ciclo de vida.
product: dochi-spawn-control
category: Regras
section: rules
status: Rascunho
version: 0.1.5
audience: Operadores equilibrando desovas naturais
tags:
  - conditions
  - caps
  - lifecycle
translationSource: en
translationMethod: assisted
---

Esta página descreve os perfis **natural-spawn**. Para os reprodutores colocados, use o guia [Spawner Editor](#dochi-spawn-control/dochi-spawn-control-spawner). Natural-spawn `Spawn Chance (0-1)` é separado de chances relativas em uma lista de alvos de geração.

## Identidade

| Campo | Significado |
| --- | --- |
| `Name` | Rótulo de lista legível por humanos |
| `Profile ID` | ID exclusivo usado para armazenamento, diagnósticos, comandos e rastreamento de entidades |
| `Priority` | Organiza ordens de regras e cheques; não é um substituto para chance de geração |
| `Enabled` | Perfis desativados são ignorados pelo agendador |

As identificações de perfil devem ser únicas dentro de um documento ativo. O nome da exibição é descritivo; o ID estável é importante para operações e compartilhamento.

## Condições Mundiais

Todas as condições aplicáveis devem passar para uma posição de candidato.

| Campo | Significado |
| --- | --- |
| `Dimensions` | Vazio permite todas as dimensões; IDs selecionados formam uma lista de permissões |
| `Biomes` | Corresponde a qualquer ID/tag incluído; inclusão vazia permite tudo. Exclusões têm prioridade |
| `Minimum Y` / `Maximum Y` | Faixa de altura do bloco de candidatos |
| `Minimum Light` / `Maximum Light` | Faixa de brilho local de 0 a 15 |
| `Start Time` / `End Time` | Tempo mundial de 0 a 23999; um intervalo invertido atravessa a meia-noite |
| `Minimum Distance` / `Maximum Distance` | Distância do candidato ao mais próximo vivo, jogador não-espectador |

Por exemplo, `13000` através de `23000` é um intervalo noturno. `22000` através de `2000` atravessa a meia-noite e permite o fim de um dia mais o início do próximo.

Os candidatos são pesquisados apenas em pedaços já carregados. Uma coordenada correspondente fora de pedaços carregados ou além da fronteira mundial é rejeitada.

![Dimensão, bioma, altura, luz e tempo no Inspetor de Regras.](assets/media/guides/spawn-control-014-neo1211/spawn-rule.png "Spawn Control 0.1.4 / NeoForge 1.21.1. DNPC 0.1.2. Qualquer um para Dimensões e Biomas remove essas restrições. Verifique também a Distância Mínima 24 e o tempo 0 –23999. Uma regra para deficientes não funciona mesmo quando as condições coincidem.")

## Spawn Rate e Grupo

| Campo | Significado |
| --- | --- |
| `Spawn Chance (0-1)` | Probabilidade em cada intervalo elegível; `0.25` significa 25 % |
| `Interval Ticks` | Atraso antes da próxima tentativa deste perfil; 20 carrapatos é de cerca de um segundo |
| `Minimum Group` / `Maximum Group` | Número de entidades solicitadas por uma tentativa bem-sucedida |
| `Spawn Radius` | Raio de busca de candidatos em torno de um jogador ativo selecionado aleatoriamente |
| `Position Attempts` | Verificação máxima de candidatos usada para encontrar um local carregado válido |
| `Placement` | Política de bloqueio e fluidez para posições candidatas |

| Colocação | Regra do candidato |
| --- | --- |
| `Surface` | O bloco de candidatos está vazio e o bloco abaixo tem uma superfície de colisão |
| `Cave` | O bloco de candidatos está vazio e não consegue ver o céu |
| `Air` | O bloco de candidatos e o bloco abaixo estão vazios. |
| `Water` | Bloco de candidatos contém fluido |

Uma chance alta ou um intervalo curto não pode contornar as condições mundiais ou os limites populacionais. Membros adicionais do grupo pesquisam em cinco quarteirões do primeiro candidato bem sucedido.

## Caps População

Caps contam entidades marcadas e rastreadas como geradas por Dochi's Spawn Control. Eles não contam automaticamente entidades nativas comuns ou intimações de comando não gerenciadas.

| Campo | Escopo |
| --- | --- |
| `Profile Cap` | Entidades criadas pelo mesmo ID de perfil |
| `Target Cap` | Entidades com a mesma chave de destino EntityType ou clone |
| `Player Cap` | Entidades registradas no mesmo contexto do jogador |
| `Chunk Cap` | Entidades gerenciadas no bloco de candidatos |
| `Dimension Cap` | Entidades gerenciadas na dimensão candidata |
| `Server Cap` | Entidades gerenciadas em todas as dimensões |
| `Shared Group ID` / `Shared Group Cap` | Limite combinado compartilhado por perfis com o mesmo ID de grupo não vazio |

Quando um alvo tem vários perfis, o Target Cap combina esses perfis. Use um grupo compartilhado quando alvos diferentes devem compartilhar um limite populacional mais amplo.

## Ciclo de vida

| Campo | Significado |
| --- | --- |
| `Persistent` | Marcas geraram criaturas como persistência-necessário e pula limpeza sem jogador |
| `Maximum Lifetime Ticks` | `0` desabilita a limpeza da idade; um máximo positivo é verificado mesmo para perfis persistentes |
| `Despawn Without Player` | Começa a limpeza quando nenhum jogador permanece dentro da distância máxima |
| `No-player Delay Ticks` | Atraso entre perder jogadores próximos e remoção |

A política de ciclo de vida aplica-se apenas a entidades criadas e marcadas por este mod. Não limpa NPCs colocados à mão, NPCs de busca ou intimações de administrador.

## Exemplos de linha de base

### Criatura terrestre

- Colocação: `Surface`
- Distância mínima: `24`
- Distância máxima: `96`
- Raio Spawn: `64`
- Tentativas de posição: `8`
- Intervalo: `200` carrapatos

### Criatura aquática

- Colocação: `Water`
- Comece com bioma amplo e gamas Y
- Teste perto de um corpo real de água
- Reduza a chance e limite para os valores de produção somente depois que a colocação for bem sucedida

:::tip Ordem de equilíbrio
Verifique as condições do mundo e a colocação primeiro, depois ajuste a chance e o intervalo e ajuste os limites por último. Isso mantém tentativas fracassadas mais fáceis de diagnosticar.
:::

## Filtros de estruturas e esquadrões

Na 0.1.5, Locations and guard squad oferece IDs e tags de biomas e estruturas incluídos e excluídos. Usa os limites registrados de estruturas já geradas; não reconhece construções manuais nem gera novas estruturas. Dimensão, horário, luz, distância e limites de população continuam valendo.

Um esquadrão ativado usa quantidades explícitas por membro em vez de Minimum/Maximum Group, com até 64 entidades no total. Um sorteio prepara toda a composição; cada membro precisa de espaço, condições e limites válidos antes de o grupo inteiro ser inserido. Veja o [guia de guardas](#dochi-spawn-control/spawn-control-guards) para o limite por estrutura e a espera após remover o último membro.
