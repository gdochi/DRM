---
title: Cubra, fogo supressivo e defesa contra fações.
slug: warfare-cover-suppression
order: 335
description: Configure gatilhos de cobertura, fogo supressivo e relógio pós-fogo, assistência de facção, limites e comportamento de recuperação.
product: dochi-warfare
category: Combat AI
section: combat-ai
status: Rascunho
version: 0.3.3
audience: Designers de encontros
tags:
  - cover
  - suppression
  - faction
translationSource: en
translationMethod: assisted
---

## Encontre cobertura e fogo supressor

**Cover** controla o movimento em direção ao terreno protetor. Ativar **Enable Cover**, em seguida, escolha gatilhos como **On Reload / On Damage**. Atirar em direção à última posição vista de um alvo é configurado separadamente em **Senses → Quick View → Suppressive Fire**.

![Capa ativar interruptor, gatilhos, raio de busca e tempo.](assets/media/guides/warfare-031-neo1211/dw-cover.png "DW 0.3.1 / NeoForge 1.21.1. Ativar a cobertura está desativada neste exemplo. Mesmo quando habilitado, um campo plano aberto pode não fornecer cobertura válida.")

## Onde essas configurações são editadas

São configurações de criador, não telas de jogador no jogo.

* Abra o NPC com `DW Npc Core`.
* Configure `Suppressive Fire` e `Faction Defense` nos controles de combate e detecção.
* Configure a cobertura estratégica na categoria separada `Cover`.

A cobertura é experimental. O switch global do servidor e o switch próprio do NPC devem estar habilitados:

```toml
[experimentalCover]
enabled = true
```

```text
Cover > Enable Cover: ON
```

A cobertura só pode começar enquanto o NPC estiver em sua fase `COMBAT`. Não substitui patrulhas ociosas, movimentos de formação de mercenários, ou aquisição de alvos comuns.

## Gatilhos de cobertura

Cada gatilho é ativado independentemente por NPC.

| Gatilho | Quando ele pode começar a cobrir |
| --- | --- |
| `On Reload` | Uma recarga gerenciada está ativa e pelo menos `Reload Left (ms)` permanece. |
| `On Damage` | Um evento de dano final real chega `Damage Ratio` de saúde máxima. Um golpe invisível pode usar sua origem de dano lembrada antes que um alvo visível exista. |
| `On Low Health` | Saúde cruza abaixo `Low Health Ratio`; esta é uma resposta de limiar ao invés de um loop de cobertura permanente. |
| `On Repeated Hits` | Aglomerados suficientes de dano ocorrem dentro de `Damage Window (ms)`. |
| `On Grenade Threat` | Uma granada de fragmentação tática apoiada nas proximidades é lançada, ou uma granada de fragmentação no ar tem um fusível iminente. |

Fumo e granadas de atordoamento não ativam a cobertura de fragmentação. A cobertura de granada usa a origem da explosão como a direção da ameaça, preservando o alvo de combate atual.

## Busca, movimento e tempo

| Configurando | Uso prático |
| --- | --- |
| `Search Radius` | Raio de busca de cobertura horizontal. O alcance salvo é de 3-12 blocos e o trabalho de busca é limitado internamente. |
| `Cover Move Speed` | CustomNPCs velocidade de caminhada usada apenas ao entrar, espreitar ou retornar da cobertura. |
| `Hold Time (ms)` | Tempo mínimo de espera para danos e cobertura repetida. |
| `Low-HP Hold (ms)` | Separe o mínimo para cobertura de baixa saúde. |
| `Cooldown (ms)` | Atrase antes que outra ação de cobertura possa começar. |
| `Max Duration (ms)` | Limite difícil para uma ação de cobertura. |
| `Peek After Cover` | Permite o movimento para um lado de disparo validado pela geometria depois de segurar. |
| `Max Peek Cycles` | Movimentos máximos de espreita em uma ação de cobertura, de 0 a 4. |

Um esconderijo deve proteger a cabeça e o peito do NPC. A cobertura de incêndio também precisa de espaço para atirar. Se o lugar escolhido não puder ser alcançado, o NPC pode tentar outro caminho.

O movimento de cobertura não cria um suporte de munição separado. O recarregamento continua através da pilha nativa da arma operada, mais o estado de recarga de DW. A parte superior do corpo mantém a ação de recarga enquanto a parte inferior segue o movimento real.

## Fluxo de tempo de execução

Uma ação de cobertura normal segue esta forma:

1. Um gatilho configurado se torna válido durante o combate.
2. O servidor procura um raio limitado para a cobertura alcançável contra o alvo atual, origem de danos lembrados, estado de recarga / munição, estado de supressão ou ameaça de granada.
3. O NPC entra na cobertura usando `Cover Move Speed`.
4. Ele se mantém pelo tempo mínimo do gatilho enquanto a dura duração máxima continua a ser aplicada.
5. Se o peeking estiver ativado e a geometria for válida, o NPC se move para um lado de disparo com linha de visão.
6. O NPC retorna ao combate comum ou aborta com segurança quando a fase termina, a rota falha, ou `Max Duration` expira.

A cobertura não garante que exista um ponto válido. Terreno aberto, salas seladas, pés inseguros, um raio que é muito pequeno, ou um caminho que o NPC não pode atravessar pode corretamente produzir nenhuma ação de cobertura.

## Fogo supressor

`Suppressive Fire` é uma política de última vista, não de rastreamento de alvo oculto.

* Só pode ser executado depois que o NPC realmente viu o alvo durante o combate.
* Ele dispara tiros reais na última posição visível.
* Ele permanece permitido apenas por `Suppression Time Ms`.
* Ele não atualiza seu objetivo da posição atual do alvo oculto.
* Disparo final, munição, modo de arma, recarga e regras de linha de fogo ainda se aplicam.

`Post-Fire Watch Ms` controla o período de vigilância após o fim do fogo supressor. Durante este tempo, o NPC continua mirando no último ponto visto sem disparar ou gastar munição. Coloque em `0` para desativar o relógio pós-fogo.

Comece com a janela curta padrão. Uma longa janela de supressão pode desperdiçar munição finita e fazer um alvo perdido parecer como se ainda estivesse sendo rastreado.

## Defesa da Facção

`Faction Defense` permite que um NPC gerenciado por DW danificado transmita seu atacante para aliados gerenciados pela mesma facção dentro `Faction Alert Radius`. O compartilhamento vertical é limitado, e um aliado ainda precisa da linha final de visão antes de disparar.

Esta assistência não é uma substituição universal de fogo amigável.

* Seletores explícitos e regras de tags ainda se aplicam.
* Entidades passivas ou não relacionadas não se tornam alvos.
* A proteção do dono do mercenário e a tolerância ao proprietário ainda se aplicam.
* Retaliação da mesma facção requer hostilidade genuína ou uma pequena concessão reativa autorizada pelo servidor.

## Ordem de ajuste recomendada

1. Confirme o combate comum `Ranged` ou `Auto` em terreno aberto.
2. Confirme o movimento e recarregue o comportamento sem cobertura.
3. Ative um gatilho, geralmente `On Reload`.
4. Mantenha `Search Radius` pequeno e verifique se existe um obstáculo sólido.
5. Afinar o tempo e esfriar.
6. Adicionar peeking somente após o trabalho de entrada e saída.
7. Adicionar dano, repetido golpe, baixo-saúde e granada dispara um de cada vez.
8. Adicione fogo supressor e defesa de facção por último para que seus efeitos sejam fáceis de distinguir.

Se a cobertura falhar, primeiro teste com um NPC, um alvo, um gatilho e uma parede simples. Isso separa geometria de alvo, formação, patrulha e problemas de munição.
