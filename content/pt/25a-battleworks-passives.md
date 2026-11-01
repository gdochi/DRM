---
title: Danos e reações passivas de saúde
slug: battleworks-passives
order: 265
description: Crie reações em fila e distinga-as de gatilhos defensivos imediatos.
product: mob-editor
section: combat
category: BattleWorks
status: Guia
version: 0.1.6
audience: Iniciantes e criadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## Comece com um passivo.

Padrões comuns são escolhidos pelo gerente. Um passivo solicita um padrão quando um evento ocorre, como atravessar a metade da saúde ou receber dano projétil.

Adicione um passivo a um NPC cujos ataques comuns já funcionam.

Selecione o padrão, então **Core → Identity → Trigger: Pattern manager**. Abra a lista de gatilhos na página **Passive trigger**. **When busy: Wait for completion** é o comportamento da fila; **Queue lifetime** controla quanto tempo pode esperar.

## 1. Escolha um gatilho básico na fila

Abra o padrão **Core → Passive trigger**.

| Gatilho | Evento |
| --- | --- |
| Gerente de padrões | Seleção de pontuação ordinária |
| Limite de saúde | Atravesse de cima para baixo / abaixo de um limiar de saúde; uma observação inicial já abaixo também se qualifica |
| Danos Corpo a Corpo | Danos positivos de um atacante vivo direto |
| Dano ao Alcance | Dano positivo projétil/indireto com um dono vivo |
| Qualquer dano | Outros danos positivos elegíveis também |

Essas 4 solicitações básicas de fila passiva em vez de interromper a linha do tempo ativa dentro do retorno de chamada de dano. Os tipos de reação imediata adicionais são descritos separadamente abaixo.

![Limiar de saúde selecionado em Core → Passivo gatilho.](assets/media/guides/battleworks-016-neo1211/battleworks-passive-health.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Saúde 50%, chance de acionar 100%, recarga 100 ticks e vida útil da fila 200 ticks são controles separados. [Passivo] distingue este padrão na lista.")

## 2. Anuncie a metade da saúde uma vez

1. Crie um padrão chamado Aviso de meia-saúde.
2. Escolha Saúde Abaixo.
3. Defina o percentual de saúde para 50 e Chance para 100.
4. Ativar uma vez por combate.
5. Escolha Fila, Fila Ticks 200, Trigger Cooldown 100.
6. Set Windup 0, Ação 20, Recuperação 10.
7. Adicionar um título em Action tick 0Endereçado ao alvo do jogador.
8. Deixe Combo vazio.
9. Salvar/aplicar e reduzir a saúde do NPC abaixo da metade.

Resultado esperado: uma vez que o movimento atual termina e as condições permitem, o aviso começa. Ficar abaixo da metade não aciona todos os carrapatos.

## 3. Entender os controles

| Controle | Significado |
| --- | --- |
| Chance | Probabilidade de solicitar a reação |
| Dano mínimo | Ignorar batidas menores que esse limite |
| Trigger Cooldown | Limite a frequência com que este gatilho pode solicitar uma reação |
| Fila Ticks | Vida útil máxima de um pedido de espera |
| Fila | Espere quando estiver ocupado. |
| Skip | Descarte esse pedido quando estiver ocupado |
| Uma vez por combate | Impedir outro começo bem sucedido até que o combate seja reiniciado |

Um gatilho de Saúde Repetível Abaixo deve se curar acima do limiar antes de outro cruzamento descendente. Uma vez que Per Combat é consumido no início bem sucedido e liberado no reset de combate.

## 4. Retirar depois de uma flecha bater

1. Crie um padrão separado de Dano Alcance.
2. Use o Dano Mínimo 1, Chance 100, Recarga de gatilho 100, Fila Ticks 200.
3. Desativar uma vez por combate.
4. Autor a 12-Tick Away movimento usando o [Exercício de movimento](#mob-editor/battleworks-movement).
5. Permita as distâncias em que as flechas atingirão; não herde cegamente um Max Range só de corpo a corpo.
6. Teste a reação depois que o ataque normal terminar.
7. Só então reduza Chance, por exemplo, para 30%.

As condições são verificadas de novo no início. Uma seta de 12 blocos de distância pode solicitar um padrão cujo alcance máximo 3, em seguida, impede que ele comece.

## 5. Múltiplos passivos básicos

- No máximo oito solicitações esperam por NPC; solicitações duplicadas para a mesma mesclagem de padrões.
- Prioridade afeta pedidos de espera e substituição quando cheio.
- As transições de fase têm precedência.
- Iniciando um passivo básico limpa um combo comum pendente.
- Iniciações passivas básicas têm um mínimo compartilhado 40-Tick gap.
- Um movimento normal elegível recebe uma volta depois de um passivo básico.

Use essas regras ao julgar por que uma reação é ignorada.

## 6. Os gatilhos defensivos imediatos são separados.

0.1.5 também implementa esses tipos avançados de gatilho:

| Tipo | Condição principal |
| --- | --- |
| hit_count | Número de acessos dentro de uma janela de tempo |
| damage_sum | Dano acumulado dentro de uma janela de tempo |
| Evadir | Dano de entrada elegível |
| guarda | Danos recebidos mais uma verificação de ângulo frontal |

O JSON avançado pode definir `interruptActive`, `cancelDamage`, `windowTicks`, `threshold` e valores de chance/limiar específicos de fase. Um padrão ativo ininterrupto pode impedir a substituição forçada.

Os controles genéricos do editor não expõem todo comportamento avançado. Este caminho usa manipulação de reação separada; não assuma que as regras básicas de Once Per Combat, Fila Ticks ou equidade se aplicam de forma idêntica. Teste explicitamente o cancelamento e a interrupção de danos reais.

Esses gatilhos são diferentes do [postura desconectada/campos de ripostas](#mob-editor/mob-editor-parry).

## Ordem de solução de problemas

1. Confirme que o ataque não foi cancelado, zero, inválido ou letal para o caminho passivo básico.
2. Teste um gatilho com Chance 100.
3. Verifique Habilitado, alvo, alcance, fase e condições de saúde.
4. Verifique os cooldowns de gatilho e padrão.
5. Verifique Skip ou Fila expirada.
6. Repor o combate depois de consumir Once Per Combat.
7. Remova links de transição ou combinação passiva inválidos.
