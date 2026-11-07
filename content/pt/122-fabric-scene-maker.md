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

## Completar uma cena em três vídeos

Os vídeos sequenciais mostram telas reais de **DRM 0.3.1 / NeoForge 1.21.1**, com legendas e indicadores de clique em inglês, sem áudio. O portão e as lâmpadas foram preparados no mundo de teste para tornar o movimento visível.

### 1. Duração e legenda

![Configurar uma cena de dez segundos e uma legenda ativa entre um e cinco segundos.](assets/media/guides/tutorial-videos-20261107/scene-settings-subtitle.mp4 "Scene Settings → + Subtitle → Edit Subtitle → Apply Fields. O tempo é informado em segundos.")

1. Em **Scene Settings**, digite ID **tutorial_gate**, Name **Village gate** e mantenha Duration **10**. Use **Apply Fields**. A âncora **Player** torna a cena relativa ao jogador. Antes de reduzir a duração, ajuste o fim das câmeras e efeitos existentes ao novo limite.
2. Use **+ Subtitle**, Start **1**, End **5** e **Apply Fields**. A legenda fica ativa entre 1 e 5 segundos da cena de dez segundos.
3. Abra **Edit Subtitle**, escreva **Welcome to the village!** e volte com **Apply Fields**. Cancel descarta as alterações dessa janela.
4. Mova o indicador vermelho para **3 segundos**. Selecionar um cartão muda o alvo de edição, não o tempo. Os fades padrão podem deixar o instante zero preto.

### 2. Construir a rota da câmera no mundo

![Selecionar a câmera, mover a câmera de trabalho, registrar pontos, aplicar e visualizar.](assets/media/guides/tutorial-videos-20261107/scene-world-camera-path.mp4 "Cartão Camera → World positions → WASD/Space → P/N → Enter para Apply → Play. Edição real das posições.")

1. Clique no **corpo do cartão Camera** e em **World positions**. Um cartão de legenda ou efeito não seleciona a câmera.
2. Role a roda do mouse para baixo para reduzir a velocidade e mova a câmera de trabalho com **WASD / Space / Shift**. **P** registra a posição no tempo atual; apenas mover a câmera não cria um ponto.
3. Vá a outro lugar e use **N** para adicionar o próximo ponto. P registra o momento atual; N adiciona um ponto posterior. Os tempos da linha do tempo determinam a duração do percurso.
4. Use **Enter ou Apply** para incorporar as posições ao rascunho. Cancel descarta as alterações da janela.
5. Use **Stop → Play** para conferir câmera e legenda juntas. Aplique as posições e salve o arquivo da cena.

### 3. Efeitos, arquivo e reprodução real

![Ajustar Letterbox, salvar e usar Run Saved para conferir reprodução e término no servidor.](assets/media/guides/tutorial-videos-20261107/scene-effects-save-run.mp4 "+ Letterbox → Apply Fields → Save As → Run Saved. A reprodução final usa o arquivo salvo.")

1. Use **+ Letterbox**, Start **0**, End **10** e **Apply Fields**. Efeitos possuem cartões e intervalos próprios.
2. Use **Save As** com **tutorial_gate**. O arquivo é **config/dochi_rpg_maker/scene/tutorial_gate.json**. Apply das posições e Apply Fields não salvam o arquivo.
3. Use **Run Saved** para reproduzir o arquivo pelo servidor. Salve novamente após novas alterações.
4. Para repetir por comando, use **/drm scene tutorial_gate.json**. Consulte os seletores de jogadores na seção de comandos abaixo.
5. Confira o desaparecimento da legenda e a volta ao jogo. A reprodução foi verificada no mundo de teste isolado de um jogador.

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
