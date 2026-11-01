---
title: Seleção de padrões, combos e fases de saúde
slug: mob-editor-phases
order: 260
description: Entenda a elegibilidade, pontuação, ritmo e uma transição de fase de 50 por cento.
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

## 1. Elegibilidade vem antes da preferência

Os padrões não são simplesmente executados de cima para baixo.

| Configurações | Pergunta |
| --- | --- |
| Núcleo | Esse padrão pode começar agora? |
| Pontuação | Quanto o gerente deve preferir? |
| Regras de Combate → Gerente | Como a repetição, o movimento e a espera devem ser tratados? |

Pontuações mais altas não ignoram o estado desabilitado, o alvo/intervalo/fase/requisitos de saúde, cooldowns ou condições adicionais.

![Seleção de padrões, penalidades de repetição e recuperação no Manager.](assets/media/guides/battleworks-016-neo1211/battleworks-manager.png "BattleWorks 0.1.6 / NeoForge 1.21.1. A mesma pena padrão afeta a pontuação de reeleição, não a duração do palco. O padrão capturado difere da configuração 1.0 usada para testar um único ataque.")

## 2. Teste dois ataques comuns.

1. Termine o [Primeiro ataque](#mob-editor/battleworks-first-attack).
2. Adicione um impulso usando o exercício [Box](#mob-editor/battleworks-hitboxes).
3. Ativar ambos e inicialmente dar ambos alcance 0–2.7.
4. Defina Prioridade 10 e Pontuação Base 10.
5. Comece o mesmo padrão de penalidade em torno de 0.5.
6. Lute repetidamente e confirme que ambos podem ser escolhidos.

Alguns ensaios não estabelecem exatamente 50:50 Seleção. Bônus de distância e multiplicadores de história também importam.

## 3. Campos comuns de elegibilidade e pontuação

| Campo | Propósito |
| --- | --- |
| Min / Max Range | Intervalo horizontal de partida-distância |
| Max Vertical | Diferença de altura permitida |
| Fase Min / Max | Intervalo de fase permitido |
| Patrão / Alcance de Saúde | Requisitos de relação saúde |
| Pontuação Base | Preferência inicial |
| Distância ideal / pico de distância | Preferência de distância dentro do intervalo permitido |
| Faltando HP Score | Bônus proporcional à falta de saúde do chefe |
| Fase 2 / Fase 3 Bônus | Preferência nessas fases |
| Prioridade | Nível de seleção forte |

Mantenha ataques comuns na mesma prioridade inicialmente. Prioridade não é um pequeno ajuste de probabilidade.

## 4. Leia os multiplicadores gerenciais corretamente

| Campo | Significado |
| --- | --- |
| Pavimento de Seleção | Exclua os candidatos abaixo da melhor pontuação × este valor |
| Mesma Penalidade Padrão | Multiplicador para repetir o último padrão |
| Pena recente. | Multiplicador para repetir o padrão usado há duas voltas |
| Mesma Pena de Papel | Multiplicador para a função anterior |
| Fator aleatório | Pontuação jitter; seleção ponderada-aleatória ainda existe em zero |
| Mobilidade Urgência / Bônus | Aumentar a preferência após um longo período sem mobilidade |
| Max Stationary / Penalidade Estacionária | Reduza as escolhas estacionárias depois de uma série |

Um multiplicador de penalidade de 1 deixa a pontuação inalterada; 0 remove-a. Com um ataque, use a mesma penalidade padrão. 1 durante o teste. O legado `avoidImmediateRepeat` bandeira por si só não é o controle de repetição do seletor ativo.

## 5. Quatro configurações de tempo diferentes

| Configurando | Significado |
| --- | --- |
| Estágio de recuperação Ticks | Terceiro segmento da coreografia |
| Atraso de Recuperação do Núcleo | Atraso mínimo pós-padrão |
| Gerente Recuperação Min / Max | Intervalo aleatório de atraso pós-padrão |
| Core Cooldown / Gerente Global Cooldown | Reutilizar a restrição no padrão completo |

A espera pós-padrão é o máximo de Core Recovery Delay e o atraso aleatório do gerente. Por exemplo, Core 8 com o gerente 10–14 dá 10–14 carrapatos.

Global Cooldown não é um bloqueio compartilhado adicional em todos os padrões. O padrão completo recebe `max(pattern cooldown, global cooldown)`. Outros padrões elegíveis ainda podem ser selecionados após a espera pós-padrão.

## 6. Ligar uma barra em um impulso

1. Abra as configurações Combo da barra.
2. Vincule o padrão de impulso existente.
3. Comece com Chance 50% e Atraso 6 carrapatos.
4. Defina o gerente Max Combo para pelo menos 1.
5. Teste a uma distância permitida por ambos os movimentos.

O acompanhamento ainda verifica seu alvo, alcance, saúde, fase, linha de visão e recarga. Mantenha as chances de saída em ou abaixo de 100%; probabilidade não utilizada significa nenhuma combinação. Max Combo 0 desativa correntes.

Padrões passivos não podem possuir links combinados ou ser destinos combinados.

## 7. Adicionar fase 2 em meia saúde

1. Abra **Combat Rules → Phase / Boss Phases**.
2. Mantenha a fase 1 em 100%.
3. Adicione a fase 2, nomeie-a Enfurecido e defina **Health At or Below (%) to 50**.
4. Defina a Fase Min de um ataque aprimorado para 2.
5. Permitir ataques existentes na fase 2 se eles devem permanecer disponíveis.
6. Reduza a saúde abaixo da metade e verifique se o novo ataque se torna elegível.

A porcentagem de editores é **50**; JSON `enterAtHealthRatio` é **0.5**.

Fases se agarram durante o combate. A cura não retorna a fase 2 para a fase 1. A perda de alvos e o Retardo do Retardo do Combate reiniciam o estado de combate, mas a baixa saúde restante pode desencadear a fase mais alta novamente no reengajamento.

![Fases de Chefe com a fase de abertura selecionada.](assets/media/guides/battleworks-016-neo1211/battleworks-phases.png "BattleWorks 0.1.6 / NeoForge 1.21.1. A abertura atualmente usa 100. Nesta compilação, o rótulo Saúde em ou abaixo (%) tem um prefixo de erro de formato; o número adjacente é a porcentagem de entrada de saúde. Selecione a segunda fase para definir como 50.")

## 8. Adicionar um anúncio de transição somente

1. Crie um padrão Enrage Start curto com som/título.
2. Deixe o gatilho no Manager.
3. Permitir a fase 2 e tornar o alvo/intervalo/altura/condições de saúde adequadas.
4. Selecione-o como padrão de transição da fase 2.
5. Defina sua Pontuação Base e todos os bônus de pontuação aditiva para 0 se nunca deve entrar em seleção comum.

A execução de transição é separada da seleção de pontuação. Ele ainda verifica condições adicionais, alvo, fase, alcance e saúde; a transição forçada atual pode contornar o resfriamento comum e a linha de visão.

Um grande golpe pode pular os limiares de fase intermediária. Não assuma que todas as transições intermediárias são jogadas em sequência. Continue com [ reações passivas](#mob-editor/battleworks-passives).
