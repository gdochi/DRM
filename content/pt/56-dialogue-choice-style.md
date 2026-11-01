---
title: Escolha Texto e Pulso
slug: dialogue-choice-style
order: 63
description: Dimensionar as opções de diálogo e destacar uma resposta quando ela aparecer.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Estável
version: 0.3.1
audience: Criadores de diálogos
tags:
  - dialogue
  - choice
translationSource: en
translationMethod: assisted
---

## Alterar o tamanho do texto de escolha

Abra a seção **Choices** de um nó de diálogo. **Choice text px (0 = GUI)** define o tamanho do texto escolhido para esse nó. Um valor de **0** usa a configuração da GUI vinculada; um valor positivo a substitui.

Para uma aparência compartilhada, abra o layout de diálogo em **GUI Maker**, selecione seu componente **Choice** e ajuste **Text size (px)**. Os tamanhos de texto disponíveis são 6–32 pixels GUI. Estes são... Minecraft Unidades GUI, então o tamanho na tela também depende da escala GUI.

![Escolhas com tamanho de texto 0 e destaque Pulse OFF para a linha selecionada.](assets/media/guides/drm-031-forge1201/dialogue-choices.png "DRM 0.3.1 / Forge 1.20.1. Tamanho do texto 0 segue a GUI. O destaque do pulso se aplica à escolha selecionada à esquerda.")


## Faça as respostas longas caberem

Use a largura automática do botão quando as respostas tiverem comprimentos diferentes. DRM mede o texto exibido, incluindo traduções de pacotes de recursos, e usa a largura disponível antes de embrulhar. Uma resposta longa pode crescer até a largura interna da área de escolha; respostas curtas mantêm uma largura compacta.

Se o texto ainda precisar de mais de uma linha, o botão cresce verticalmente. Uma lista de escolhas lotada pode ser rolada. Para botões compactos, use uma altura mínima automática de **0**. O padrão adiciona cerca de **5 pixels de GUI acima e abaixo do texto**. Uma altura mínima maior que você mesmo ainda se aplica.

Para usar traduções de pacote de recursos, marque o rótulo como uma chave de tradução e forneça essa chave no seu arquivo de idioma. As palavras traduzidas são o que contam ao calcular o tamanho do botão.

## Realce uma escolha com um pulso

1. Abra **Dialogue Editor → Choices** e selecione uma resposta.
2. Ligar **Pulse highlight**.
3. Defina os seguintes controles.

| Controle | Significado |
| --- | --- |
| Total de carrapatos | Tempo total para todos os pulsos. 20 carrapatos é um segundo. |
| Contagem de pulso | Número de ciclos de brilho e desvanecimento dentro desse tempo. |
| Cor (RGB) | Escolha uma cor usando o campo de cores, amostra ou paleta de cores. |
| Intensidade | Força de 0 a 100. Use as setas ou digite um número no campo do meio. 0 torna o efeito invisível. |

Por exemplo, ** 60 carrapatos / 3 pulsos** toca três pulsos ao longo de três segundos. A intensidade altera a aparência do destaque; não altera a cor ou o tamanho do texto escolhido.

O efeito começa quando essa escolha se torna visível. Uma escolha esperando pelo efeito de digitação de diálogo, ou esperando abaixo da área de rolagem, não usa seu pulso cedo. Deslocar e voltar não reiniciar um efeito acabado. Abrir a cena do diálogo novamente dá uma nova reprodução.

## Ficheiros de diálogo existentes

Diálogos antigos continuam sem pulso. Ative-o apenas nas escolhas que você quer enfatizar. Desligá-lo mantém suas configurações para uso posterior. Salve o diálogo após a edição.
