---
title: Entidade Clone Library
slug: warfare-entity-clones
order: 380
description: Salve e invoque modelos higienizados do lado do servidor para CustomNPCs NPCs e veículos suportados SuperbWarfare.
product: dochi-warfare
category: Ferramentas do Mundo
section: tools
status: Rascunho
version: 0.3.1
audience: Criadores de cenários
tags:
  - clone
  - npc
  - vehicle
translationSource: en
translationMethod: assisted
---

## O que é um clone

A Entidade Clone Library armazena modelos JSON de propriedade do servidor para dois domínios:

* DNPC ou CustomNPCs NPCs com suas configurações atuais de DW
* Suportado SuperbWarfare veículos com dados nativos e configurações de combate DW reutilizáveis

Isso é diferente de `Save As` no NPC ou no editor de veículos. Um perfil de configuração copia a configuração em um alvo existente; um clone de entidade cria uma nova entidade higienizada.

![Entidade vazia Clone Library com NPC e filtros de veículo.](assets/media/guides/warfare-031-neo1211/dw-clones.png "DW 0.3.1 / NeoForge 1.21.1. Uma nova configuração pode não ter entradas. Salve com Clone no editor de destino antes de selecioná-lo aqui e usar Summon.")

## Salvar um modelo

1. Digite o modo Criativo.
2. Abra um veículo CustomNPCs NPC ou suportado SuperbWarfare com `DW Npc Core`.
3. Pressione `Clone` na barra superior do editor.
4. Digite um nome e confirme. Salvar o mesmo nome requer uma segunda confirmação de substituição.

O servidor lê e higieniza os dados da entidade. A entidade bruta NBT nunca é aceita do cliente.

## Abra e invoque

Clique com o botão direito do ar com `DW Npc Core` para abrir `Entity Clone Library`. Pesquise na biblioteca combinada, filtre por `NPC` ou `Vehicle`, selecione um modelo e pressione `Summon`.

O servidor valida a permissão criativa, o modelo e mods necessários, em seguida, procura uma posição carregada segura na frente do jogador. Se a dependência está faltando ou nenhum espaço carregado seguro existe, a convocação é rejeitada sem criar uma entidade parcial.

A versão 0.2.9 também pode usar clones NPC da página `Crew` do editor do veículo. Selecione um assento vazio no mapa superior/lado, pressione `Board NPC` e escolha um clone NPC do servidor ou uma pedra da alma cheia de NPC no inventário do jogador. O servidor higieniza um novo NPC e monta-o no lugar exato selecionado; facções hostis, assentos alterados, e pedras inválidas da alma são rejeitadas.

## O que é higienizado

Clones preservam aparência reutilizável, equipamentos, dados de entidades nativas e configuração de combate DW, mas removem a identidade do mundo real e o estado transitório, como:

* UUID, posição, movimento, rotação, passageiros, coleira e identidade do proprietário
* Cérebro atual, raiva, fogo, ar, queda e outros campos ao vivo
* Proprietário ativo de mercenários e comandos de movimento/pegue fogo
* Proprietário da IA do veículo, casa, destino ordenado e estado de posição de patrulha ao vivo

Isso impede que um clone herde a identidade, a propriedade ou a tarefa atual da entidade original.

## Armazenamento

Os modelos são armazenados em pastas de servidor separadas:

```text
config/dochi_warfare/entity_clones/npc/
config/dochi_warfare/entity_clones/vehicle/
```

Trate esses arquivos como conteúdo do servidor. Use o fluxo de trabalho no jogo `Clone` e `Summon` para criação comum para que a validação e a sanitização do servidor permaneçam em vigor.

## Forge 0.3.1 deleção e recuperação

Selecione uma entrada NPC ou veículo, escolha Excluir e, em seguida, confirme o tipo e a ID exibidos. Escape ou Cancelar retorna sem exclusão. Entidades já despachadas não são afetadas.

Os arquivos se movem para `config/dochi_warfare/entity_clones/.deleted/<type>-<UUID>/`. Para restaurar um, primeiro certifique-se de que a pasta original `npc` ou `vehicle` não tem nenhum arquivo de mesmo nome e, em seguida, mova-o de volta. Cronogramas DWE referenciando esse clone não são automaticamente reescritos.

Clonagem de veículos e características da tripulação exigem DWE. Nomes salvos atualmente permitem letras, dígitos, sublinhados, pontos e hífens; outros caracteres são higienizados para sublinhados. Selecione o ID real do clone nas linhas do tempo.
