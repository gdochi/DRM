---
title: Mostrar ícones de NPC no mapa
slug: mapicon-setup
order: 1400
description: Dê lojas, treinadores e outros ícones de mapas reconhecíveis.
product: dochi-mapicon-integration
category: Iniciar
section: setup
status: Guia de uso
version: 0.1.2
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Dê a um NPC um ícone azul

Prepare DRM, MapIcon Integração e o mapa que deseja exibir. Essas telas foram verificadas com **MapIcon 0.1.2 / DNPC 0.1.3 / NeoForge 1.21.1 / Minimapa de Xaero 26.6.0**. A edição de ícones também funciona sem um mapa instalado.

1. [ Coloque um DNPC ](#dochi-npc-core/npc-core-setup).
2. Abra **NPC editor → Addons → Map icon**. O editor individual tem apenas **Selected NPC** à esquerda.
3. Ative **Icon** e escolha uma imagem. Este exemplo usa o ícone humanóide azul embutido.
4. Use **Size 16**, **Tint 4AB7FF** e habilite **Minimap**. Habilitar **World map** para esse mapa também.
5. Pressione **Save** e espere por **Settings saved**.
6. Feche o editor e encontre o ícone NPC no minimapa.

![O ícone humanoide azul guardado para o NPC selecionado.](assets/media/guides/mapicon-012-neo1211/mapicon-npc-saved.png "Salvar nesta tela salva o NPC selecionado. O painel do meio é uma visualização de ícone, não um mapa. Verifique o recurso de textura, tamanho, tonalidade e o mapa se alternam.")

![O DNPC exibido como um humanóide azul no mapa Xaero real.](assets/media/guides/mapicon-012-neo1211/mapicon-minimap.png "No minimapa superior esquerdo, o humanóide azul logo acima do marcador do jogador branco é o guia Oakridge. Marcadores amarelos são outros animais. O NPC foi colocado a cerca de vinte quarteirões de distância para comparar seu mapa e posições mundiais.")

## Use um ícone para todas as lojas

Para uma categoria inteira, abra o editor de ícones completo da lista de editores do DRM ou **Mods Config**.

1. Ative a exibição global e selecione **Type defaults → NPC Shop JSON**.
2. Escolha a imagem, tamanho, tonalidade e visibilidade do mapa.
3. Use **Save & Apply** para salvar e ativar o perfil do servidor.
4. Verifique um NPC com um real DRM loja aplicada.

Escolha o padrão correspondente para diálogo NPCs ou treinadores. Cobblemon funções aparecem quando Cobblemon Editor está instalado. A arte finala individual do NPC tem prioridade; veja [ prioridade do ícone](#dochi-mapicon-integration/mapicon-editor-rules).

## Instalação

| Minecraft | Carregador | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

Instale arquivos correspondentes DRM e MapIcon no servidor e nos clientes. Instale o(s) mapa(s) desejado(s) e as bibliotecas necessárias. Fabric também precisa de Fabric API.

Você pode editar ícones sem um mapa instalado, mas não pode vê-los em um mapa. Use DNPC em 26.3; CustomNPCs não está disponível lá.

Para imagens personalizadas ou ícones ausentes, consulte [imagens e solução de problemas](#dochi-mapicon-integration/mapicon-files-operations).
