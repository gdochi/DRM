---
title: Scene Maker
slug: scene-maker
order: 150
description: Crie e edite cenas de câmeras no mundo.
product: core-fabric
category: Scene Maker
section: scene-maker
status: Estável
version: 0.3.1
audience: Criadores / Operadores
translationSource: en
translationMethod: assisted
---

## Faça sua primeira cena

Scene Maker é uma ferramenta criadora para organizar o movimento da câmera e efeitos de tela. Os jogadores veem a cena salva quando é jogada, não a linha do tempo de edição.

![Scene Maker com uma cena de dez segundos. Ferramentas de adição estão à esquerda, visualização e linha do tempo no meio e Propriedades selecionadas à direita.](assets/media/guides/drm-031-neo1211/scene-maker.png "DRM 0.3.1 / NeoForge 1.21.1. Adicione à esquerda, selecione um cartão de linha do tempo e, em seguida, edite Propriedades. Use Apply Fields, seguido de Play para inspecionar o resultado.")

1. Abra o seletor de editor DRM e escolha **Scene Maker**.
2. Escolha suas configurações de cena, nome e comprimento. Use **Player** para colocar a cena em relação ao jogador, ou **Fixed Position** para uma localização mundial específica. Escolha a dimensão e a origem conforme necessário. âncoras NPC não são oferecidos.
3. Adicione uma faixa de câmera e quaisquer legendas, imagens, som, fade, caixa de correio, shake ou elementos de evento que você precisar.
4. Selecione um cartão para editar suas propriedades. Use **Apply Fields** para mudanças de campo. Clique com o botão direito do mouse em um cartão para suas ações disponíveis. Alguns tipos de cartões não podem ser divididos.
5. Abra **World positions** para colocar e ajustar os pontos da câmera.
6. Use **Play** para pré-visualizar e salve sua própria cena com **Save As**. **Run Saved** reproduz a versão salva, então salve novamente depois de fazer alterações.

## Percorra a linha do tempo

O pino vermelho é a posição de reprodução. Arraste-o deliberadamente para procurar. Selecionar um cartão não procura. A barra de rolagem horizontal inferior move o intervalo de tempo visível de forma independente; use os controles de menos/mais para ajustar o zoom. Use o interruptor Loop quando você quiser reprodução de visualização repetida.

Na captura de tela, **Camera** contém o clipe da câmera, enquanto **abrindo/fechando** em **Effects** marca os efeitos de início e fim.

## Trabalhe com pontos de câmera

| Controle | Ação |
| --- | --- |
| WASD / Espaço / Mudança | Mova a câmera de edição. |
| Arraste o espaço vazio | Olhe ao redor. |
| Roda de rato | Ajuste a velocidade de movimento. |
| Ctrl + roda | Ajuste o campo de visão da câmera. |
| Clique com o botão esquerdo do mouse em um pino | Selecione o ponto sem teletransportar. |
| Segure o mouse esquerdo e arraste um alfinete | Mova o ponto no plano de visão atual. |
| Solte depois de arrastar | Mantenha o movimento na cena de trabalho. |
| Esc ou clique com o botão direito do mouse durante um arrastar | Cancele essa jogada. |
| Clique com o botão direito do mouse em um pino | Ações de ponto aberto. |
| Clique com o botão direito do mouse em uma linha de conexão | Ações de caminho aberto. |
| Posição P / Mark | Coloque o ponto selecionado na câmera de edição. |
| N / Novo ponto | Adicione um ponto na posição atual da câmera e na próxima hora disponível escolhida pelo editor. |
| Ctrl + Z | Desfazer uma edição completa dentro desta janela. |
| Aplicar | Mantenha as posições editadas e volte para Scene Maker. |
| Cancelar | Volte sem aplicar as alterações desta janela. |

Arrastar mantém a profundidade original do ponto em relação à vista. Para movê-lo em outra direção, solte, mova a câmera de edição e arraste novamente. Um clique com um pequeno movimento de mão só seleciona. Pins devem permanecer na parte carregada do mundo. A câmera fica parada enquanto um alfinete é arrastado.

Use **Move camera here (TP)** para exibir um ponto selecionado ou **Move point to camera** para realocá-lo para sua visualização atual. São ações separadas. **Walk in world** permite que você se mova como jogador e marque posições; siga os controles de retorno na tela.

## Formar a rota

Clique com o botão direito do mouse na linha de conexão ou escolha **Edit outgoing path** em um pino. Escolha uma rota reta ou suave, adicione um ponto médio ou coloque uma curva na sua câmera. Mova os pinos adicionados para moldar a curva. O caminho traçado mostra a rota da câmera usada para reprodução.

Cenas orbitais usam suas próprias configurações de distância e ângulo. Mover um ponto de órbita pode mudar a distância de órbita compartilhada. A edição de caminho reto/suave é para caminhos comuns da câmera, não para rotas de órbita.

## Tocar uma cena salva

Com permissão do operador:

```text
/drm scene
/drm scene <scene-file>
/drm scene <scene-file> play @a
/drm scene <scene-file> stop @a
```

Use as sugestões depois de `/drm scene ` para escolher uma cena salva jogável. Substitua `<scene-file>` por esse nome; não é uma parte literal do comando. A segunda forma é para você, a terceira para os jogadores selecionados, e a quarta para aquela cena para eles.

Se uma cena não estiver listada, verifique se ela foi salva e se a âncora e o conteúdo referenciado são válidos. A aplicação de posição mundial atualiza o documento de edição; salve a cena depois para mantê-la para reprodução posterior.

## Pare todas as cenas ativas

`/drm scene stop @a` pára as cenas atuais dos jogadores selecionados sem nomear um arquivo. Use a raiz `/drm scene`; não há nenhum comando separado `/drmscene`.

## Câmeras seguindo um alvo em movimento

Use Follow, Orbit ou Path+LookAt para mover alvos. O 1.21.1 e separar 26.3 compilações seguem seu movimento mais suavemente sem exigir que os arquivos de cena existentes mudem. Forge 1.20.1 não inclui Scene Maker.
