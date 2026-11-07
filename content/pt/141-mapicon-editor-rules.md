---
title: Edição de ícones e prioridade
slug: mapicon-editor-rules
order: 1410
description: Digite padrões, exceções JSON, substituições por NPC e salvar/aplicar comportamento.
product: dochi-mapicon-integration
category: Criação de ícones
section: editor
status: Guia de uso
version: 0.1.3
audience: Criadores de NPC
translationSource: en
translationMethod: assisted
---

## Padrão por tipo JSON

Selecione **Type defaults** à esquerda e escolha **NPC**, **Dialogue JSON**, **NPC Shop JSON** ou outra categoria no meio. Edite a imagem, o tamanho, a tonalidade e a visibilidade do mapa em **Icon settings** à direita. Verifique sua aparência em **Icon preview** abaixo da lista do meio.

![MapIcon's Type defaults with NPC selected in the middle and image, Size, Tint, Minimap and World map settings on the right.](assets/media/guides/mapicon-012-neo1211/type-defaults.png "MapIcon 0.1.2 em NeoForge 1.21.1. Para alterar os ícones da loja, selecione NPC Shop JSON no meio e, em seguida, edite suas configurações à direita.")

**NPC** é o ícone básico do NPC. As categorias de diálogo, loja e teletransporte abaixo escolhem ícones para as funções aplicadas aos NPCs. Cobblemon Editor adiciona alvos como Treinador, Pokemon em si, PokéMart, Enfermeira Alegria e Seletor de Iniciação.

**Type Default Icons** dá aos NPCs um ícone baseado em JSON aplicado mesmo sem uma regra de exceção. Os padrões NPC e os padrões de tipo individual são salvos de forma independente. Os arquivos de apresentação e agendamento não são alvos NPC Apply e não aparecem nesta lista.

## Imagem, cor e exibição

| Configurando | Opções |
| --- | --- |
| Imagem | Busca de ícone empacotado, pesquisa de imagem externa ou ID de recurso direto |
| Tamanho | 8–64 |
| Tint | Espectro, saturação/brilho, HEX e RGB com visualização ao vivo |
| Mapa | Minimapa independente e exibição de mapa do mundo |
| Nome | Mostrar ou ocultar o nome do NPC no mapa |

**Choose Icon** abre uma lista pesquisável com pré-visualizações e nomes PNG. A biblioteca empacotada contém 1,476 Nikoichu CC0 1-bit Pixel Icons e um filtro de RPG. Tint muda a renderização do mapa, deixando a fonte PNG intacta.

## Exceções e prioridade de visibilidade

As regras correspondem ao tipo JSON e ao caminho do arquivo. Um caminho vazio corresponde a todos os arquivos desse tipo. A regra de correspondência de maior prioridade vence; os laços usam a primeira regra de correspondência em ordem de lista.

1. Global Off ou per-NPC Hide suprime o ícone.
2. Uma regra de correspondência para deficientes a esconde. O Per-NPC Show pode substituir o OFF desta regra, mas não pode substituir o OFF global.
3. A seleção de imagens usa o estilo por NPC → regra de correspondência → tipo padrão → NPC padrão.
4. DRM Condições de visibilidade do NPC também se aplicam: um NPC escondido de um jogador permanece oculto no mapa desse jogador.

Adicione, duplique, exclua e pesquise regras e selecione arquivos JSON reais no seletor de arquivos. **Apply Type Icon** substitui a imagem de uma regra existente pelo ícone de tipo.

![Uma nova NPC Shop governe em JSON Regras.](assets/media/guides/mapicon-012-neo1211/mapicon-rule-added.png "MapIcon 0.1.2 / NeoForge 1.21.1. Depois de Adicionar regra, escolha NPC Shop JSON como tipo de fonte DRM. Um vazio. JSON O arquivo corresponde a todos os arquivos desse tipo. Para uma loja, escolha seu arquivo com a lupa, coloque Prioridade e salve.")

## Substituir um NPC

Abra **Addons → Map icon** no editor DNPC. A tela individual tem apenas **Selected NPC**. Use **Icon** para mostrá-lo ou escondê-lo, escolha sua própria imagem, tamanho, tonalidade e interruptores de mapa, então **Save**. Espere por **Settings saved** no fundo.

![O editor individual depois de salvar um ícone NPC.](assets/media/guides/mapicon-012-neo1211/mapicon-npc-saved.png "MapIcon 0.1.2 / DNPC 0.1.3 / NeoForge 1.21.1. Esta tela somente NPC não tem padrões de Tipo ou JSON Regras. Seu save é separado do save de perfil do editor completo.")

Um interruptor de ícone não ignora as condições de visibilidade do Core NPC para esse jogador. Compare o resultado usando o exemplo do minimapa [ real](#dochi-mapicon-integration/mapicon-setup).

## Salvar e aplicar

O carregamento abre um perfil para edição sem alterar a política do servidor. **Save & Apply**, Salvar e Save As salvar o perfil e ativá-lo. O nome de arquivo inferior **Active** relata o perfil confirmado pelo servidor. Mods Config alterna atualizar a exibição imediatamente; pressione **Apply** para salvá-los no servidor.

MapIcon 0.1.3 verifica o NPC selecionado antes de salvar um perfil do servidor. Tanto o editor completo quanto o editor individual rejeitam edições desatualizadas do NPC; um salvamento rejeitado mantém intactos o perfil e as configurações atuais do NPC no servidor. Anote as alterações que deseja manter, use **Reload saved settings** e reaplique-as. Recarregar descarta as alterações não salvas.

Veja [arquivos e solução de problemas](#dochi-mapicon-integration/mapicon-files-operations) para caminhos de textura e limites de exibição.
