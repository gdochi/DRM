---
title: Remnant Msg
slug: remnant-msg
order: 87
description: Como configurar documentos de mensagem, políticas e exibir GUI no Editor Remnant Msg.
product: core-fabric
category: Sistemas Principais
section: remnant-msg
status: Estável
version: 0.3.1
audience: Criadores / Operadores
tags:
  - remnant
  - message
translationSource: en
translationMethod: assisted
---

## Deixe uma mensagem no mundo

![Colocar um marcador com Remnant Setter, guardar o texto e abrir a mensagem.](assets/media/guides/short-videos-color-20261106/remnant-place-and-read.mp4 "Captura real: DRM 0.3.1 / NeoForge 1.21.1, interface em inglês. Colocar → escrever → Save → ler. Foram verificados o texto guardado no servidor e o ecrã de leitura.")

O vídeo mostra a opção simples de **escrever diretamente**: clique com o botão direito numa face de bloco com o setter, escreva o texto e escolha **Save**. Os passos seguintes explicam como associar uma mensagem JSON guardada.

Use **Remnant Msg Editor** para uma mensagem anexada a um lugar sem um NPC. Abra-o no seletor de editor do núcleo e escreva seu nome e texto em **Message**. Essas telas inglesas são de **DRM 0.3.1 / NeoForge 1.21.1**.

![Remnant Msg Página de mensagem do editor, com navegação da página à esquerda e configurações de mensagem à direita.](assets/media/guides/drm-031-neo1211/remnant-editor.png "Escreva o texto em Mensagem primeiro. A mensagem salva e o marcador do mundo colocado são passos separados.")

1. Escreva o texto em **Message** e salve sua cópia com **Save As**.
2. Clique com o botão direito do mouse em uma face de bloco com o setter Remnant para colocar um marcador. Salvar o arquivo de mensagem sozinho não o coloca no mundo.
3. Selecione a mensagem salva no marcador. Use **World List** para encontrar, editar ou teletransportar para marcadores existentes.
4. Use o marcador como um jogador e verifique o texto exibido. Configure as condições abaixo se o acesso precisar ser restrito.

### Interação e visão têm condições separadas

**Interact Conditions** controla o uso do marcador; **View Conditions** controles mostrando a mensagem. **View Actions** executa ações depois de ver. Um simples aviso não precisa de todas as condições e ações configuradas.

![Veja Condições com Habilitar, E modo, Adicionar e uma lista de condições vazia.](assets/media/guides/drm-031-neo1211/remnant-view-conditions.png "Adicione a condição desejada e marque Ativar. Esta captura de tela ainda não tem condições configuradas.")

## Conexões a outras ferramentas

Remnant Msg gerencia mensagens de interação colocadas no mundo separadamente dos nós de diálogo NPC. Documentos de mensagem, políticas, a GUI de exibição, blocos de marcadores/entidades e o item setter funcionam juntos.

DRM Core instala um padrão Remnant Msg GUI mais exemplos de mensagens e arquivos de política como conteúdo padrão.

## Armazenamento

Remnant Msg os arquivos usam esses caminhos.

| Dados | Caminho |
| --- | --- |
| Mensagens | `config/dochi_rpg_maker/remnant_msg/messages` |
| Políticas | `config/dochi_rpg_maker/remnant_msg/policies` |
| GUI padrão | `config/dochi_rpg_maker/gui/default_remnant_msg_gui.json` |

O layout de exibição usa o perfil de layout GUI Maker `remnant_msg`.

## Fluxo de trabalho básico

1. Clique com o botão direito do mouse no item `Dochi RPG Maker Core`.
2. Abra `Remnant Msg Editor`.
3. Crie ou edite o documento da mensagem.
4. Configurar regras ou políticas de saída.
5. Se uma exibição personalizada for necessária, edite uma GUI `remnant_msg` em GUI Maker.
6. Salve e recarregue os dados do servidor.

## Mensagens, Políticas e GUI

| Tipo | Papel |
| --- | --- |
| Mensagem | Unidade de texto e mensagem. |
| Política | Regra para quando e como uma mensagem aparece. |
| GUI | Layout que controla como a mensagem é exibida. |

Separar o conteúdo da tela torna mais fácil reutilizar uma GUI em várias políticas ou conectar uma mensagem a diferentes estilos de exibição.

Os documentos de mensagem suportam `message`, intervalo `messageStyles`, interação separada e condições de visualização, `messageActions` e `messageTrigger`. Use `every_view` para executar ações habilitadas em cada modo de exibição ou `once_per_player` para uma execução por jogador.

## Setter e Lista Mundial

| Ação | Resultado |
| --- | --- |
| Clique com o botão direito do mouse em uma face de bloco com `remnant_msg_setter` | Coloque um marcador voltado para essa superfície. |
| Ar com o botão direito do mouse | Abre a lista de marcadores mundiais. |
| Sneak-right-clique em um bloco | Abre a lista sem colocar um marcador. |

A página `World List` fornece `Edit`, `Teleport`, `Delete` e `Refresh`. Campos de política determinam se um usuário geral pode usar o fluxo, escrever texto incorporado, selecionar JSON, usar gatilhos ou consumir o setter. O tempo de execução verifica as condições de interação/visão e executa as ações habilitadas de acordo com `messageTrigger`.

Em 0.1.8, os seletores de mensagem e política pesquisam as listas JSON do servidor. Uma aparência de marcador pode ser `Default`, `Item` ou `Block`; opções de item/bloco pesquisam nomes localizados, namespaces e IDs. `Scale` aceita `0.05` até `16.0`. Os modos da Billboard são `fixed`, `vertical`, `horizontal` e `center`. As aparências dos itens suportam `none`, a mão de primeira/terceira pessoa transforma, `head`, `gui`, `ground` e `fixed`. O servidor valida essas configurações e as persiste com os dados salvos por marcadores e a entidade de exibição.

A política agrupada permite uso geral e escrita direta, mas reserva JSON e gatilhos para administradores. Não há consumo de setter, tempo de vida ilimitado do marcador e um limite de mensagem de 4096 caracteres. Os arquivos de política existentes não são substituídos durante as atualizações.

## Conexão GUI

Remnant Msg Os arquivos GUI vivem no mesmo `gui` armazenamento que os arquivos de diálogo e de loja GUI, mas o `guiType` e os componentes são diferentes. O arquivo padrão é `default_remnant_msg_gui.json`; crie uma cópia em vez de editar o padrão protegido diretamente.

Os valores de visualização em GUI Maker podem diferir dos valores de tempo de execução. A saída do tempo de execução vem dos dados do documento e da política Remnant Msg.

## Lista de verificação

| Sintoma | Verificar |
| --- | --- |
| A mensagem não aparece | Arquivo de mensagem, arquivo de política e recarregamento do servidor. |
| A GUI está quebrada | `guiType`, IDs de componentes e caminho GUI padrão. |
| Mensagem errada aparece | ID da mensagem referenciada pela política. |
| A posição está errada. | Se a GUI foi aberta com o perfil `remnant_msg`. |

## 0.2.8 marcadores e gatilhos uma vez por jogador

Marcadores ocultos e estado de gatilho persistente uma vez por jogador são suportados. Visibilidade do marcador e histórico de execução de cada jogador são separados. Teste um novo jogador, um jogador que já o acionou, e reconecte o comportamento. Faça backup de mensagens personalizadas, políticas e o mundo juntos.
