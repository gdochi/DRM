---
title: Texto, Imagens, Modelos e Tempo
slug: battle-presentation-layers-runtime
order: 531
description: Coloque texto e modelos, adicione movimento, imagens de tempo e som.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Rascunho
version: Fabric / NeoForge 0.2.9
audience: Criadores organizando entradas de batalha
tags:
  - layers
  - timeline
  - actors
  - audio
translationSource: en
translationMethod: assisted
---


## Mover uma camada de texto

Em Battle Presentation Maker siga **Element → Add Label → Content**. A etiqueta define o texto, o tamanho da fonte define o tamanho e a cor. Layout controla a posição e as dimensões da caixa; Animação controla separadamente tempo e movimento.

![Propriedades de conteúdo depois de adicionar um rótulo.](assets/media/guides/cobble-029-neo1211/cobble-layer-content.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. {opponent_name - em Label resolve o nome do oponente. O cursor está no tick zero, o início do Fade In, então o texto da tela ainda não está visível. Use o Play para inspecionar seu intervalo ativo.")

![Propriedades de animação para esse rótulo.](assets/media/guides/cobble-029-neo1211/cobble-layer-animation.png "Start/End Tick é o intervalo visível; Start/Final X são posições de partida e chegada. Este exemplo corre 0–144 carrapatos, se move X 280→360 enquanto mantém Y 220, e cresce de 0.8 para 1. Verifique se o mesmo elemento está selecionado na linha do tempo.")

## Tipos de elementos

| Tipo | Renderização | Campos importantes |
| --- | --- | --- |
| `Label` | Centrais de texto dentro de sua caixa e clipes de texto que excede a largura da caixa | Texto, Tamanho da fonte, Cor, estilos de texto parciais |
| `Texture` | Desenha uma imagem de recurso Minecraft; uma textura não resolvida pode cair de volta para uma caixa colorida | Imagem, Opacidade, Fit, Crop |
| `Color` | Desenha um retângulo ARGB | Cor, dimensões da caixa, Alfa |

Use `{player_name}` para mostrar o nome do jogador e `{opponent_name}` para mostrar o nome do oponente.

A imagem deve ser um ID de recurso como `namespace:textures/gui/file.png`, não um caminho de arquivo absoluto. `Stretch` distorce para a caixa cheia, enquanto `Contain` preserva a proporção e centra a imagem completa. Crop seleciona o retângulo de origem antes de se encaixar.

## Posicionar e arrastar o Canvas

O layout X/Y está sincronizado com a posição de movimento final. Arrastar um elemento no Canvas move tanto Start X/Y quanto Final X/Y pelo mesmo delta, preservando sua distância de viagem existente.

Para um slide-in:

1. Coloque a posição final no Canvas.
2. Mova apenas Start X ou Start Y para fora do Palco.
3. Definir escala de início/final e rotação.
4. Jogue toda a gama ativa para julgar o afrouxamento.

Largura e altura definem a caixa de design. Tamanho da fonte é separado, então redimensionar uma caixa de etiqueta não redimensiona automaticamente seu texto.

## Cálculo da linha do tempo

| Campo | Cálculo do tempo de execução |
| --- | --- |
| Início / Fim Tick | Fora do alcance, o elemento não é renderizado. O fim é normalizado para pelo menos um carrapato após o início. |
| De / Para | Posição, escala, rotação, e Alpha interpolar sobre o progresso ativo. |
| Desaparecer | Multiplica Alpha calculado de 0 para 1 após o Início. |
| Desaparecer | Multiplica Alfa de 1 a 0 antes do fim. |
| Facilitando | Mudanças de/para progresso; o Alpha final também recebe multiplicadores de desvanecimento. |

| Facilitando | Resultado |
| --- | --- |
| `Linear` | Velocidade constante |
| `Ease In` | Acelera de um início lento |
| `Ease Out` | Diminui para o alvo |
| `Ease In Out` | Início e fim suaves |
| `Back Out` | Overshoots, então retorna |
| `Step` | Detém até o final, em seguida, muda para |

Arrastar a régua da linha do tempo pausa a reprodução. Ele continua na liberação somente quando a reprodução estava sendo executada antes do arrasto. Para testar novamente o Intro Audio, esfregue antes do Start Tick e jogue para a frente.

## Ordem Z com atores

Cada jogador e oponente tem um valor Z. Tempo de execução caminha elementos normais por Z e insere um ator quando o ator Z se torna menor ou igual ao próximo elemento Z.

Uma pilha útil é fundo em 1, painéis em 5–12, adversário / jogador em 23–24, rótulos de nomes em 30–31, VS em 40, e um flash final em 100. Se o texto aparecer atrás de um modelo, inspecione Z antes de mover as coordenadas.

## Modelos de atores

| Configurando | Comportamento |
| --- | --- |
| Visível | Desativa a interpretação do ator quando desligado |
| `Humanoid` | Usa Steve/Alex renderização mais cabeça, corpo, braço e perna posam rotações |
| `Pokemon` | Usa rotação de modelo inteiro; a pose do membro não é aplicada |
| `Auto` | Compatibilidade com legado; use um tipo explícito para novo trabalho |
| X/Y | Posição de estágio na base do modelo |
| Escala e Yaw/Pitch/Roll | Tamanho e rotação do modelo inteiro |
| Z | Ordem relativa a elementos normais |

O jogador mostra o jogador com sua liderança PokémonA bola. Opositor mostra o NPC alvo. Ambos podem ser posicionados e em camadas com a cena.

Quando o editor não tem NPC alvo, ele pode mostrar uma amostra Bulbasaur. Essa amostra não prova que o modelo escolhido corresponde ao NPC final.

## Fundo e áudio

O fundo do mundo cobre toda a janela atrás do palco e tem sua própria cor, opacidade e desvanecimento. Um elemento Color é uma camada Stage com comportamento normal de Z e timeline. Imagem de Palco é uma única imagem fixa por trás de elementos de Palco com opacidade, ajuste e corte.

| Áudio | Comportamento de tempo de execução |
| --- | --- |
| Introdução | Começa uma vez quando a reprodução cruza Start Tick. Saltar, perder o alvo, ou interrupção, para. A conclusão normal pode deixar uma cauda longa continuar durante a transição. |
| Batalha | Não joga na linha do tempo de apresentação. É passado para o controle de batalha após a apresentação. |

Inspector Play/Stop visualiza apenas o som selecionado e não move a linha do tempo. Cada cliente deve ter a referência Minecraft recurso de som.

## Skip e cancelamento

Quando o Skippable está ativado, `Esc` ou `Space` envia um resultado ignorado. Saltar deve estar habilitado na cena salva.

Jogadores mortos ou desaparecidos, alvos removidos ou inválidos, uma tela de cliente interrompida, remarcação de condição falhada e equipes de batalha inválidas podem cancelar a inicialização com segurança. Teste o primeiro quadro, o gatilho de áudio, o flash médio, final, pular, batalha real e restauração pós-batalha como um fluxo completo.

## Bloquear estágios, FX e agendamento

Veja [ estágios de bloqueio e FX](#drm-cobblemon-editor/cobblemon-presentation-region-fx) para criação de Região/FX em 0.2.4, e [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler) para clone, cena e execução de batalha.
