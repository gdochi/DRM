---
title: Edição de poses e mapeamento de ações
slug: warfare-pose-editor
order: 332
description: Crie JSON pose e transforma arma com DW Pose Core, em seguida, mapeá-los para ações NPC.
product: dochi-warfare
category: Poses
section: combat-ai
status: Rascunho
version: 0.3.3
audience: Criadores de NPC
tags:
  - pose
  - editor
  - TACZ
translationSource: en
translationMethod: assisted
---

## Funções de editor e tempo de execução

`DW Pose Core` é um editor de poses em modo criativo para criadores, não uma tela de jogador em combate. Crie a pose JSON neste editor, em seguida, use a categoria `Pose` em `DW Npc Core` para mapear perfis salvos para as ações de tempo de execução do NPC.

**Save & Apply** salva a pose padrão de não-combate. O combate usa suas próprias poses, depois o NPC retorna ao seu padrão.

O editor suporta DNPCs de modelo de jogador e modelos Steve/Alex CustomNPCs. A imagem abaixo usa um alvo DNPC real.

## Abra o editor de poses

1. Segure `DW Pose Core` no modo Criativo.
2. Clique com o botão direito do mouse em um modelo de jogador DNPC ou em um NPC Steve/Alex CustomNPCs.
3. Fique dentro de 12 blocos e mantenha o núcleo em ambas as mãos durante a edição.
4. Edite a pose em `NPC Pose Editor`.

Modelos não suportados e alvos distantes não podem ser editados. Comece com um modelo de jogador padrão DNPC ao verificar o fluxo de trabalho.

![A editar eixos de rotação do corpo em um DNPC aberto com DW Pose Core.](assets/media/guides/warfare-031-neo1211/dw-pose-editor.png "DW 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1. Selecione Corpo à esquerda para mostrar seus eixos X/Y/Z. Animação segue o movimento existente; Custom usa o valor escolhido. Salvar e Aplicar salva o perfil e aplica-o a este NPC.")

## Pré-visualização NPC e partes do corpo

A prévia do NPC destacado é uma visão criadora da pele, armadura e estado da arma do alvo. Arraste para girá-lo e use a roda do mouse para ampliar. Dependendo da parte selecionada e do modo de edição, o arrasto de visualização direta pode ajustar os valores de rotação ou os deslocamentos de posição. Habilite `Walking Preview` para inspecionar como a pose se mistura com o movimento de caminhada.

As partes editáveis são:

* Cabeça
* Corpo
* Braço direito/braço esquerdo
* Perna Direita / Perna Esquerda
* Renderização de armas

Cada parte do corpo expõe a rotação X, Y e Z com dois modos de eixo:

| Modo Eixo | Significado |
| --- | --- |
| `Animation` | Mantenha o eixo calculado por TACZ ou a animação do jogador. |
| `Custom` | Substitua esse eixo com o valor deslizante. |

Mantenha a cabeça rastreada e as pernas ambulantes em `Animation` quando eles devem continuar se movendo. Substitua apenas os eixos necessários para a posição personalizada.

## Arma renderizar transformar

`Gun Render` expõe:

| Valor | Usar |
| --- | --- |
| Posição X / Y / Z | Posição de exibição da arma |
| Pitch / Yaw / Roll | Rotação da arma |
| Escala X / Y / Z | Escala da arma por eixo |

`All Guns` armazena uma transformação de fallback para cada TACZ arma. `This Gun Only` armazena uma transformação separada para a corrente do NPC alvo TACZ arma. Uma transformação por arma igual tem prioridade sobre o retorno de todas as armas.

## Criar, carregar e salvar poses

| Ferramenta | Comportamento |
| --- | --- |
| `New` | Cria uma pose vazia que herda animação. |
| `Use Base Preset` | Aplica uma pose empacotada pesquisável como o rascunho atual sem carregar um arquivo JSON. |
| `Load` | Carrega uma pose salva JSON. |
| `Save` | Salva o nome atual do JSON. |
| `Save As` | Salva sob um novo nome. Pressione novamente para confirmar a substituição de um nome existente. |
| `Save & Apply` | Salva o perfil e aplica-o como a posição ociosa personalizada do NPC atual. |
| `Reset` | Reverte todas as alterações não salvas para o último estado carregado ou salvo. |
| Redefinição de parte/valor | Reverte apenas a parte ou o valor selecionado. |

Os arquivos pose são armazenados no servidor em:

```text
config/dochi_warfare/poses/
```

Você não precisa editar este JSON à mão. Sua estrutura é material de referência para criadores que usam ferramentas externas ou controle de versão.

O 0.2.9 biblioteca embutida inclui Low Ready, High Ready, e múltiplas poses de combate, ocioso, andando e em movimento. Aplique um, ajuste apenas os eixos necessários e transforme a arma, depois use `Save As` para criar um usuário JSON sem modificar os valores agrupados.

![Coloque o mapeamento de categoria em pé, andando, mirando, disparando e recarregando.](assets/media/guides/warfare-031-neo1211/dw-pose.png "DW 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1. Escolha Built-in, Herança ou outra fonte para cada ação, em seguida, selecione a pose à sua direita.")

## Mapa poses para ações

`DW Npc Core > Pose` não cria uma pose. Ele mapeia poses embutidas ou salvas para ações para o atual NPC.

| Grupo | Ações |
| --- | --- |
| Ocioso e Consciente | Idle - Standing, Idle - Walking, Alert |
| Combate à distância | Apontar combate, disparar, mover fogo |
| Movimento de Combate | Avanço tático, Retiro, Recarga |
| Equipamentos e Outras Ações | Interruptor de armas, Melee Ready, Ataque corpo a corpo, Grenade Throw |

Cada ação usa uma fonte:

| Fonte | Significado |
| --- | --- |
| `Built-in` | Usa `TACZ Default`, `Low Ready`, `High Ready` ou `Aim Ready`. |
| `Inherit` | Usa a mesma pose que a ação dos pais ligados. |
| `Custom JSON` | Usa um perfil salvo em `config/dochi_warfare/poses/`. |

O mapeamento padrão usa Low Ready para ficar ocioso, com marcha ociosa e Alert herdando. Apontar de combate, recarregar, trocar de arma, corpo a corpo, e granadas ações padrão para o compartilhado TACZ-Controlador DW apoiado. Durante a recarga, a ação da parte superior do corpo permanece ativa enquanto a parte inferior do corpo continua o estado real de caminhada, corrida ou agachamento do NPC. Comece mudando apenas as ações que realmente precisam de um perfil personalizado.

## Fluxo de teste recomendado

1. Crie um perfil a partir do modelo Low Ready ou High Ready.
2. Mude apenas os eixos necessários do braço e do corpo, deixando a cabeça e as pernas sobre `Animation` quando possível.
3. Verifique ambos em pé e `Walking Preview`.
4. Alinhe a arma com `All Guns`, então corrija apenas armas de forma incomum com `This Gun Only`.
5. Use `Save & Apply` e verifique a pose ociosa no jogo.
6. Mapeie uma ação de cada vez em `DW Npc Core > Pose`, depois teste separadamente disparo, recarga, movimento e troca corpo a corpo.
