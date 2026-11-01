---
title: Encontre o seu caminho ao redor Dialogue Editor
slug: dialogue-editor-screen
order: 61
description: Encontre texto de diálogo, escolhas, conexões e controles de salvamento.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Guia
version: 0.3.1
audience: Criadores de diálogos
translationSource: en
translationMethod: assisted
---

## Editar a linha que um jogador vai ler

Selecione um nó geral à esquerda e abra **Text** para escrever a linha do NPC. Abra **Choices** para as respostas dos jogadores. **Blueprint** mostra qual cena cada resposta abre. Siga [o primeiro exercício de diálogo](#core/dialogue-system) para um exemplo completo salvo e aplicado.

![Lista de nó à esquerda e texto NPC à direita.](assets/media/guides/drm-031-forge1201/dialogue-text.png "DRM 0.3.1 / Forge 1.20.1. Texto edita a linha NPC do nó geral selecionado; Escolhas edita as respostas do jogador.")

| Área | O que fazer lá |
| --- | --- |
| Lista de nós | Selecione ou adicione cenas como `dialogue_1`; mantenha uma `start` entrada |
| Info / Texto | Definir a identidade do nó, tipo, GUI e texto NPC |
| Escolhas | Escreva respostas e escolha o que cada resposta faz |
| Condições / ações | Restringir disponibilidade ou definir um resultado |
| Blueprint | Inspecionar conexões entre cenas |

## Controles da barra de ferramentas

| Controle | Resultado |
| --- | --- |
| Editores | Voltar à seleção do editor |
| Create New | Iniciar um rascunho de diálogo |
| Carregar | Procurar os conjuntos de diálogos salvos |
| Gravar | Salvar o conjunto atual em seu caminho existente |
| Save As | Salve o conjunto inteiro sob outro nome |
| Redefinir | Restaurar o estado padrão do rascunho |
| Duplicar | Copie todo o conjunto e seu layout de Blueprint |
| Fechar | Feche o editor |

Use **Save As** ao personalizar um exemplo empacotado. Para reutilizar o diálogo em vários NPCs, salve um conjunto e selecione-o na lista de aplicação **Dialogue JSON** de cada NPC.

## Um conjunto de diálogos é uma pasta

Save As `blacksmith` cria um conjunto sob:

```text
config/dochi_rpg_maker/dialogue_sets/blacksmith/
  dialogue_set.json
  start.json
  greeting.json
  quest_done.json
```

`dialogue_set.json` contém o conjunto, `start` seleciona a cena de abertura e nós gerais contêm cenas visíveis. **Load / Save / Save As** Opere no set, não apenas na linha selecionada.

## Copiar cenas relacionadas juntos

Selecione nós com **Shift+Click** ou uma seleção de arrastar, então **Copy / Ctrl+C**. Ao colar em outro conjunto, clique no painel **Dialogue Sets** primeiro, depois **Paste / Ctrl+V**. Nomes duplicados recebem sufixos; links entre nós copiados e suas posições Blueprint seguem os novos nomes. Links para nós externos permanecem inalterados.

Arraste linhas de nó, rota, escolha, condição e ação suportadas para reordená-las. Uma linha azul selecionada é o item que está sendo editado; as caixas de seleção de linha marcam itens para operações em massa. **Delete** remove itens verificados, incluindo linhas verificadas fora da área visível.

Crie produtos em [NPC Shop](#core/shop-system), tipos de dinheiro em [Currency Editor](#core/currency-editor), e o layout da janela de diálogo em [GUI Maker](#core/gui-system).
