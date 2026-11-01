---
title: Faça uma Roleta de Itens
slug: minigames-roulette
order: 1315
description: Escolha prêmios e probabilidades, em seguida, execute um empate de uma máquina ou tela de jogo.
product: dochi-minigames
category: Criação de jogos
section: rules
status: Guia
version: 0.1.6
audience: Jogadores / criadores de jogos
translationSource: en
translationMethod: assisted
---

## Uma rodada, um prêmio.

O item Roleta foi adicionado **Minigames 0.1.6** e funciona sem DRM. Conecte um jogo salvo a uma Máquina de Roleta e clique com o botão direito para jogar.

**Current bundled presets default to Spin on block**: o botão direito gira a máquina sem abrir uma janela. Para uma tela de entrada mostrando prêmios e probabilidades primeiro, selecione **Rules → Play mode → Game screen**, salvar e aplicar. Verifique o modo Reproduzir nos perfis salvos existentes.

![Uma máquina de roleta colocada no mundo.](assets/media/guides/minigames-016-neo1211/roulette-native-world-stopped.png "Minijogos 0.1.6 / NeoForge 1.21.1. A roleta está no centro; Whack-a-Mole e Slots usam máquinas separadas. Este original foi capturado durante a verificação do cliente nativo do projeto.")

No modo **Game screen**, verifique os prêmios, quantidades, odds e taxa de entrada, depois pressione **Spin**. A flecha determina um prêmio. **Hide prizes & odds / Show prizes & odds** controla a lista à direita.

![Uma tela de entrada da roleta paga antes do Spin.](assets/media/guides/minigames-016-neo1211/roulette-native-entry.png "Minijogos 0.1.6 / NeoForge 1.21.1. Este exemplo pago cobra uma esmeralda e dá a cada um dos oito slots 12.5%. A pré-configuração da roleta é gratuita, então verifique suas próprias configurações.")

**Play again** imediatamente começa outro sorteio e cobra outra taxa em um jogo pago. Não é um botão de replay de resultado.

## Crie a máquina e conecte um jogo

Crie uma máquina de roleta com **lingote de ouro / relógio / lingote de ouro** Na primeira fila, **stick / pó redstone / stick** no segundo, e **três tábuas** no terceiro. Tipos de prancha podem ser misturados.

1. Coloque com um bloco limpo acima.
2. Abra `/minigame editor` e escolha **Item Roulette**.
3. Configure-o abaixo, depois **Save As** seu próprio nome, como `village_roulette`.
4. **Shift-right-click with empty hands**, escolha o perfil e aplique-o na mesa. A configuração precisa do nível de permissão do operador 2 ou superior.
5. Clique com o botão direito do mouse normalmente para jogar. Veja [Configuração da tabela](#dochi-minigames/minigames-tables) para a tabela genérica do Minigame.

## Troque prêmios e probabilidades

Selecione uma linha em **Prize slots**. Use o localizador ao lado de **Reward ID** para escolher um item, em seguida, definir **Count**. Selecionar um item de inventário pode preservar seu nome personalizado e dados nativos sem consumi-lo.

![Editando um item de prêmio selecionado, quantidade e peso.](assets/media/guides/minigames-016-neo1211/roulette-editor-prizes.png "Minijogos 0.1.6 / NeoForge 1.21.1. O diamante azul está sendo editado. As caixas de seleção marcam prêmios para exclusão em lote separadamente. Chance à direita mostra a probabilidade resultante.")

Com **Rules → Weighted chances** off, todos os prêmios são igualmente prováveis. Com isso, cada prêmio usa sua parcela do total. **Weight**. Dois pesos de 1 e 3 dão 25% e 75%. A quantidade não muda a probabilidade. Setores de rodas também seguem as probabilidades.

**Spin time (seconds)** varia de 3 a 8. Defina o item de entrada e o valor em **General**; `0` é gratuito. Roleta atualmente cobra itens físicos. Ele concede uma entrada de slots de prêmio em vez de usar a política de recompensa mais alta ou cumulativa do jogo.

![Modo de jogo de roleta, duração e troca de chance ponderada.](assets/media/guides/minigames-016-final-neo1211/roulette-editor-rules.png "Minigames reais 0.1.6 / NeoForge 1.21.1 artefato substituído em 15:40 KST em novembro 1. O padrão é girar no bloco, cinco segundos e chances ponderadas OFF, dando oito prêmios 12.5% cada. A foto da tela de entrada acima é um exemplo de tela de jogo separada.")

## Girar a máquina física sem uma tela

Escolha **Rules → Play mode → Spin on block**. Um clique direito normal inicia a roda física sem abrir a tela do jogo, e paga a taxa se configurado. Clicar em uma máquina de fiar ocupada não carrega novamente.

**Game screen** abre a grande interface da roleta. Salve o modo escolhido, aplique o perfil à máquina e verifique o comportamento real do botão direito do mouse.

Girar no bloco pode começar sem um arquivo de layout GUI. O 26.3 builds também adicionam partículas de prêmio e sons quando a roda pára; 1.21.1 As imagens acima não estabelecem esses efeitos.

## Fechando a janela ou tendo um inventário completo

Um sorteio de roleta já iniciado continua depois de fechar a tela ou ir embora. O servidor mantém o sorteio e o prêmio. Um inventário completo mantém o prêmio pendente e impede outro sorteio pago. Abra espaço, confirme o recebimento do prêmio salvo e jogue de novo.

Isso difere de perder um jogo de pontuação normal, como Monty Hall ou Slots. Salvar um perfil e conectá-lo a uma máquina também são etapas separadas; veja [arquivos e GUIs](#dochi-minigames/minigames-files-gui).
