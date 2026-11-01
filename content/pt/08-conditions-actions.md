---
title: Condições e Ações
slug: conditions-actions
order: 70
description: Escolha quem vê uma escolha de diálogo e o que acontece quando clicam nela.
product: core
category: Dialogue Editor
section: dialogue-editor
status: Guia
version: 0.3.1
audience: Criadores de diálogos
tags:
  - condition
  - action
translationSource: en
translationMethod: assisted
---

## Quem vê a escolha, e o que ela faz

Abra um nó de diálogo geral **Choices** e selecione uma escolha. **Label** é o texto do botão, **Condition list** controla a visibilidade e **Choice actions** é executado quando é clicado.

"Não recebeu o presente" é uma condição. "Dê maçãs e registre a reivindicação" é uma sequência de ação. Uma condição por si só não concede nada, uma concessão sem uma verificação de reivindicação pode ser repetida.

## Carregar um exemplo de recompensa em Forge

Na compilação **DRM 0.3.1 / Forge 1.20.1** testada, escolher Item no menu Tipo deixou a ação como Goto. Se isso acontecer, baixe o exemplo de recompensa [one-time](#core/dialogue-rewards) e abra-o com **Load**. Suas ações Item e Tag existentes são carregadas corretamente. Aplicação NPC, a concessão de maçã e esconder a escolha em uma visita repetida foram verificados.

![Ações de item e tag carregadas no Forge editor de diálogo.](assets/media/guides/drm-031-forge1201/dialogue-reward-template-actions.png "DRM 0.3.1 / Forge 1.20.1. Receber três maçãs está selecionado. A primeira linha de Item concede três maçãs, a seguinte linha de Tag registra a reivindicação. Role o painel direito para baixo para ver o Conde.")

Verifique **Item: give**, **ID: minecraft:apple**, **Count: 3**. Para alterar o presente, edite a linha de Item existente e **Save As** seu próprio conjunto. Aplique o exemplo original primeiro para confirmar a concessão de trabalho antes de alterar suas configurações.

## Esconda o botão depois de reivindicar

Abra essa escolha é **Condition list**. O exemplo usa **Type: tag / Op: not / Tag: welcome_received**, então a escolha aparece apenas enquanto o jogador não tem essa tag.

A segunda ação **Tag** usa **add / welcome_received** para registrar a reivindicação. Mude os nomes de ação e condição juntos; nomes diferentes permitem outra reivindicação. **tem** significa o oposto: o jogador já deve ter a tag.

Sem condições significa que ninguém passa. Com várias condições, ** e ** requer todas elas; ** ou** requer pelo menos uma. "Tem uma licença e pelo menos três esmeraldas" usos e. "Tem qualquer uma das duas licenças" usos ou.

## Para onde deve ir a condição?

| Localização | Use-o para |
| --- | --- |
| Escolhas → Lista de condições | Mostrar ou ocultar um botão na mesma cena |
| Iniciar → Rotas | Escolha a primeira cena quando a conversa começar |
| Condições gerais do nó | Restringir a entrada nessa cena |

Use rotas iniciais para mudar toda a saudação. Use uma condição de escolha para esconder apenas o botão de presente. Veja [criação de diálogo](#core/dialogue-system) para início e nodos gerais.

## Ações comuns

| Resultado desejado | Ação | Escolha também |
| --- | --- | --- |
| Mostrar outra linha | Goto. | Nó geral de destino |
| Terminar a conversa | Fechar | Sem valor adicional |
| Abra uma loja NPC | Vai às compras. | Loja aplicada ou salva |
| Conceder ou levar itens | Item | dar / tomar / conjunto, item e contagem |
| Gravar uma reivindicação ou permissão | Tag | adicionar e um nome de marca |
| Limpe esse registro. | Tag | remover e o mesmo nome da etiqueta |
| Executar um comando de servidor | Comando | Comando sem a sua liderança |
| Conectar uma missão | Ação de missão atual | Use a operação correspondente no guia [quest](#core/quest-system) |

Coloque subsídios e registros antes das transições de tela: **Item → Tag → Goto**. O exemplo fornecido de Item-e-Tag fecha após a concessão. Para mostrar uma resposta, coloque Goto e seu destino por último. Depois de alterar um tipo de ação, verifique se o tipo exibido realmente mudou.

**Command** corre no contexto do jogador. Use `{player}` para o nome ou `{uuid}` para o UUID. Comece com a ação integrada para tarefas como conceder um único item.

## Condições que precisam de outro mod

As condições e ações de FTB exigem missões de FTB. **faction_score** refere-se a CustomNPCs pontos de facção, que diferem de DNPC configurações amigáveis/hostis. **CustomNPCs Stored Data** é um [Integração avançada de scripts](#core/script-stored-data-conditions). Use o exemplo de Tag acima para um presente único normal.

CustomNPCs A integração é limitada ao mais antigo suportado Minecraft alvos; é excluído em Minecraft 26.3. Consulte a referência [JSON](#core/json-reference) quando precisar editar arquivos diretamente.
