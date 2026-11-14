---
title: Armas, Stance, e IA tática
slug: warfare-weapons-ai
order: 330
description: Como configurar a posição de arma de fogo, movimento, consciência, piscinas de armas e recuo corpo a corpo.
product: dochi-warfare
category: Combat AI
section: combat-ai
status: Rascunho
version: 0.3.3
audience: Criadores de NPC de armas de fogo
tags:
  - weapon
  - stance
  - ai
translationSource: en
translationMethod: assisted
---

## Escolha uma arma, então seu comportamento de combate

Coloque a arma de fogo pretendida no **Inventário do jogador** Primeiro. Em **Gun**, clique em seu ícone para adicioná-lo à lista de armas inferior e à visualização NPC à direita. As telas usam **DW 0.3.1, DNPC 0.1.3 and NeoForge 1.21.1**.

![M4A1 selecionado no inventário do jogador; a entrada de arma única tem 100% de probabilidade.](assets/media/guides/warfare-031-neo1211/dw-gun.png "Isso mostra seleção de armas e pré-visualização. Salve para o NPC antes de testar o fogo real. Múltiplos candidatos a armas devem totalizar 100%.")

![Sentidos mostrando o modo de resistência, consciência e modo de combate.](assets/media/guides/warfare-031-neo1211/dw-senses.png "A Visualização rápida à direita navega na página Sentidos longos. Controles de consciência aquisição; Controles de modo de combate comportamento ranged/melee.")

![Sentir modos de fogo, fogo supressor e comportamento tático.](assets/media/guides/warfare-031-neo1211/dw-fire.png "Não há separado guia Fogo. Use Senses → Quick View → Modos de fogo. Encontre a taxa e a precisão sob a taxa de incêndio na mesma lista.")

## Modos Stance

`Stance` decide qual forma de combate o NPC gerenciado deve usar.

| Stance | Comportamento |
| --- | --- |
| `Idle` | Pare o combate na ponte e guarde as armas gerenciadas. |
| `Ranged` | Use a arma gerenciada TACZ, PointBlank ou SuperbWarfare apenas. |
| `Melee` | Use apenas a arma corporal armazenada. |
| `Auto` | Troque entre intervalo e corpo a corpo com base na distância. A arma à distância permanece visível durante a marcha lenta. |
| `Auto Hidden` | Troque durante o combate, mas mantenha as mãos vazias fora do combate. |

`Stance Mode: General` usa as configurações de posição normais. `Stance Mode: Advanced` aplica uma regra condicional como `Always`, saúde abaixo da razão, entidade-alvo, facção-alvo ou tag-alvo. `Always` e a condição de saúde do NPC pode ser avaliada sem um alvo de combate atual; somente a entidade alvo, facção e condições de tag exigem um alvo vivo. O modo avançado intencionalmente tem uma regra ativa para evitar comportamentos conflitantes.

## Configurações de disparo

| Configurando | Significado prático |
| --- | --- |
| `Max Distance` | Distância máxima do alvo para o fogo controlado. Alvos além disso são ignorados pelo addon. |
| `Melee Switch Range` | Distância onde `Auto` A posição muda para corpo a corpo. Alcance real ainda vem de CustomNPCs Comportamento corpo a corpo. |
| `RPM Mode` | Escolha exatamente uma fonte: `TACZ Native`, `Fixed` ou `Random Range`. Apenas os valores usados por esse modo são mostrados. |
| `Fixed RPM` | Corrigimos a taxa de fogo alvo usada por `RPM Mode: Fixed`. |
| `RPM Min` e `RPM Max` | Alcance alvo de fogo usado por `RPM Mode: Random Range`. |
| `Fixed Accuracy %` | Precisão usada continuamente enquanto `Accuracy Ramp` está desativado. `100` não adiciona nenhum erro de mira extra. |
| `Ramp Start Accuracy %` | Iniciando a precisão enquanto `Accuracy Ramp` está habilitado. |
| `Ramp Max Accuracy %` | Máxima precisão após rastreamento qualificado. Deve ser maior que o valor inicial. |
| `Ramp Time Ms` | Tempo de rastreamento qualificado necessário para atingir a máxima precisão. |
| `Ramp Max Range` | Distância máxima onde o progresso da rampa pode se acumular. |
| `Min Target Speed` | Velocidade mínima de jogador horizontal necessária para avançar a rampa. |
| `Burst Minimum Shots` / `Burst Maximum Shots` | Seleciona uma nova contagem de disparos inclusiva para cada explosão configurada. Valores iguais criam explosões de comprimento fixo. |

`Accuracy Ramp` só progride enquanto o alvo visível é um jogador em movimento dentro do intervalo configurado e acima da velocidade mínima. Progresso pausa enquanto o jogador está parado ou fora do alcance, em seguida, reinicia quando o alvo ou ativo Geral / Avançado perfil muda. Geral e Avançado podem usar configurações de rampa independentes. Em 0.2.9, RPM nativo e fixo são reconciliados com a cadência suportada pela arma operada; TACZ tiros também usam programação mais fina para reduzir visível 50 Ms tique a quantização em RPM alto.

Comece com `RPM Mode: TACZ Native` e precisão fixa. Adicione RPM aleatório, intervalos de explosão e precisão, um de cada vez, depois que a arma, o alvo, a linha de visão e o circuito de munição estiverem funcionando.

## Políticas de danos

A versão 0.2.0 permite que cada NPC escolha como arma de fogo e dano corpo a corpo é calculado.

| Localização | Política |
| --- | --- |
| `Gun` | `Gun Spec` mantém o comportamento de dano nativo da arma operada. `Custom` aplica a substituição de dano DW suportado sem alterar os dados originais da arma. |
| `Melee` | `Weapon Spec` usa os atributos de ataque do item selecionado. `Custom` usa dano corporal fixo. |
| `Melee` | A velocidade de ataque pode usar independentemente atributos de armas ou valores personalizados fixos. Velocidade de ataque personalizada é medida em ataques por segundo. |

CustomNPCsO dano corpo a corpo padrão não substitui essas políticas corpo a corpo gerenciadas. Confirme o comportamento nativo da arma primeiro e adicione valores personalizados.

## Melhor compatibilidade de combate

A versão 0.2.1 adiciona uma alternância per-NPC `Better Combat Compatibility` sob `Melee`. O padrão é ON quando o Better Combat está instalado e não pode ser usado quando o Better Combat está ausente.

Quando ativado, o NPC resolve o melhor conjunto de ataque de combate e arma pose registrado para o item detido. Ordem combinada, condições de ataque, condições de duas mãos ou fora de mão, e o item transforma siga os dados registrados da arma. Intervalos de ataque e tempo de dano usam o item mantido como efetivo `ATTACK_SPEED`. A política de velocidade de ataque corpo a corpo é mostrada como `Weapon Spec (locked)`, e uma velocidade de ataque personalizada não se aplica até que essa alternância de compatibilidade seja desativada.

A reprodução exata do movimento NPC de Combate Melhor no cliente requer tanto Melhor Combate quanto Animador de Jogador de Criaturas. Se a criatura Jogador Animador está ausente ou o movimento de arma registrado não pode ser jogado, o addon não cria um movimento de imitação; ele usa um balanço de baunilha mão principal.

## Movimento tático

`Tactical Move` controla como o addon dirige o movimento de combate:

| Modo | Caso de uso |
| --- | --- |
| `Hold` | Guardas estáticos, torres, franco-atiradores, fases de chefes encenados. |
| `Spread` | Esquadrões que devem se separar dos aliados próximos. |
| `Compact` | Esquadrões que se reagrupam em vez de se dispersarem. |
| `Advance` | Ataque NPCs que pressionam em direção ao alvo. |
| `Retreat` | NPCs defensivos que abrem a distância. |

`Engagement` adiciona comportamento alvo-distância. `Hold` não se reposiciona para a distância, `Advance` se aproxima até `Approach Distance`, e `Retreat` recua até `Retreat Distance`.

Os movimentos úteis incluem `Move While Firing`, `Retreat Fire` e `Keep Distance Fire`. `Keep Distance Fire` tenta manter um intervalo preferido, mas é apenas um intervalo e bloqueia a troca corpo a corpo.

`Reposition Minimum Ms` e `Reposition Maximum Ms` controle quanto tempo um plano de movimento tático permanece ativo antes que o NPC o reconsidere. Uma nova duração entre esses valores é selecionada para cada plano. Geral e Avançado podem usar faixas diferentes.

`Suppressive Fire` é diferente do rastreamento de alvos. Depois que a linha de visão é perdida durante o combate, pode disparar de verdade. TACZ rodadas apenas na última posição que o NPC realmente viu, para o configurado `Suppression Time Ms`. Não segue a posição atual do alvo oculto e ainda consome munição através do estado normal da arma. `Post-Fire Watch Ms` mantém o NPC mirando nesse ponto depois de disparar pára sem gastar mais munição.

## Sensibilização e controle ocioso

Use as configurações de conscientização para decidir quando o NPC pode entrar em combate:

| Configurando | Significado |
| --- | --- |
| `Detect Distance` | Bloqueios onde NPCs ociosos detectam primeiro um alvo visível. Isso não é o mesmo que atirar. |
| `Detect Angle` | Cone de detecção horizontal. `360` permite a detecção total. |
| `Combat Delay Ms` | Tempo que o NPC observa um alvo detectado antes do combate confirmado. |
| `Instant Combat Angle` | Cone frontal que pode pular o atraso e entrar em combate imediatamente. |
| `Close Detection` | Permite que os alvos dentro de `Close Detect Distance` ignorem o ângulo de detecção horizontal. Desabilite-o para backstab ou NPCs estilo assassinato. |

`Sound Detection` usa um sistema de estímulo para tiros gerenciados, recargas, sons de bloqueio, sons de entidade e sons de mundo somente de posição. Sobrevivência e jogadores criativos são tratados de forma consistente; os alvos dos espectadores permanecem excluídos. A investigação pode ser `Off`, `Look Only` ou `Move To Source`. Combate ativo tem prioridade, e uma posição bloqueada volta a olhar em vez de deixar seu posto.

`Faction Defense` deixa um DW-gerenciado danificado NPC alerta aliados gerenciados mesmo-facção dentro `Faction Alert Radius`. Um aliado assistente pode se mover para ajudar antes de ver o atacante, mas ainda precisa da linha final de visão antes de disparar. A tolerância do proprietário do mercenário e a validação do alvo amigável permanecem em vigor, então a defesa da facção não ignora o contrato ou as regras do alvo.

O movimento ocioso tem quatro modos: `Stationary`, `Area Patrol`, `Return Only` e `Route Patrol`. Patrulhas de área e rota usam a GUI `Default Walk Speed` e mantêm um caminho A* válido ativo. Eles não substituem o caminho falhado pelo movimento direto em uma parede; pontos inalcançáveis são tentados dentro de um limite limitado e depois ignorados. As coordenadas da patrulha resolvem-se para um terreno estável nas proximidades, e as verificações de chegada incluem distância vertical para pontos de passagem inferiores de um bloco.

## Arma não-combate poses

`Non-Combat Weapon Pose` controla como um NPC tem uma arma fora de combate.

| Pose | Comportamento |
| --- | --- |
| `TACZ Default (Custom Off)` | Desativa a pose ociosa personalizada e deixa a apresentação para TACZ. |
| `Low Ready` | Segura a arma em uma posição baixa. |
| `High Ready` | Segura a arma em uma posição elevada. |
| `Aim Ready` | Mantém uma posição pronta para o objetivo fora do combate. |
| `Custom Pose` | Usa uma pose que JSON salvou com `DW Pose Core`. |

Low Ready e High Ready permanecem ativos enquanto estão de pé, patrulhando a área/rota, ou voltando para casa. Com o mapeamento de ação padrão, eles cedem a TACZ mirar, disparar e recarregar o comportamento quando um alvo é detectado ou o combate começa. Use a categoria `Pose` para um mapeamento mais fino por ação.

## Arma e piscinas de aparência

`Gun` lê suporte TACZ, PointBlank e SuperbWarfare pilhas de armas do inventário do jogador. A arma selecionada pode ser salva diretamente, ou várias armas suportadas podem ser adicionadas a um pool de armas aleatório. Rolos de piscina podem acontecer. CustomNPCs eventos init como respawn, inicialização de carga de blocos, restauração de clones ou restauração de pedra da alma.

TACZ é sempre a linha de base de postura e animação. Adaptadores opcionais mantêm o item nativo da arma externa renderizando, projétil ou hitscan, sons, fases de recarga e mecânica intrínseca. PointBlank suporta pontes separadas 1.11.1 e 2.1.0; SuperbWarfare o suporte é fixado à compilação final verificada 0.8.9. Armas de fogo especial não suportadas ou só de corpo a corpo falham.

`Melee` lê itens não-TACZ do inventário do jogador. Melhor integração de combate não salva um ID de animação de substituição. No momento do ataque, ele resolve o ataque e pose realmente registrado para a arma mantida. Suporte de ataque corpo a corpo de mão vazia também está disponível para configurações capazes de corpo a corpo.

`Visual & FX` armazena cada pele ponderada DNPC ou CustomNPCs como um caminho de textura local ou um URL HTTP/HTTPS, além de um modelo explícito `Steve` ou `Alex`, sobreposições e configurações de capa. Não altera a textura fornecida. `Armor` lojas conjuntos completos em real cabeça, peito, pernas e pés slots. As pré-visualizações da arma, do corpo e da armadura mostram o modelo, a pele, a armadura e a arma selecionados juntos.

A versão 0.2.1 mostra campos de chance diretamente nas fileiras de armas, peles e armaduras. Editar uma chance não redistribui as outras entradas, e um pool de entradas múltiplas deve totalizar `100%` antes de salvar. `Equalize` redistribui as entradas somente quando pressionadas, enquanto uma piscina de entrada fica em `100%`. O conjunto de armaduras mostra até cinco fileiras ao mesmo tempo; use a roda do mouse ou sua barra de rolagem interna para as entradas restantes.

## Ordem de equilíbrio

1. Confirme `Ranged` ou `Auto` posição com uma arma.
2. Sintonize `Max Distance` e comportamento de linha de visão.
3. Sintonize precisão fixa e `RPM Mode: TACZ Native`.
4. Armas de fogo e políticas de danos corpo a corpo.
5. Adicione `Move While Firing` ou movimento tático.
6. Adicione troca corpo-a-corpo e retorno de munição vazia.
7. Adicione armas aleatórias, pele e piscinas de armadura.
8. Adicione intervalos de rajadas, ramping de precisão e tempo de reposicionamento aleatório somente após o comportamento normal ficar estável.
9. Adicione regras de postura avançadas.
10. Adicione fogo supressivo e cobertura experimental por último, depois que o movimento normal e o comportamento de linha de visão forem confirmados.

## Aplicar um conjunto de skins no DNPC

Os conjuntos de skins do DNPC aplicam a textura e o modelo Steve/Alex selecionados. Ative **Init Event** e configure candidatos e probabilidades para sortear na criação/carga da entidade. Se estiver desativado ou o conjunto estiver vazio, a aparência atual permanece. Salvar e os ticks de combate não fazem um novo sorteio.
