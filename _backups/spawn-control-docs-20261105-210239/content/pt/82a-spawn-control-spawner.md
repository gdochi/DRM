---
title: Criando um Spawner Colocado
slug: dochi-spawn-control-spawner
order: 835
description: Autor desovador JSON, configurar alvos ponderados, escolher um modelo e aplicar o documento a um desovador colocado.
product: dochi-spawn-control
category: Editor
section: editor
status: Rascunho
version: 0.1.4
audience: Criadores de Spawners
tags:
  - spawner
  - editor
  - probability
translationSource: en
translationMethod: assisted
---

## Criar um documento e aplicá-lo

`Spawner Editor` é um editor JSON voltado para o criador. Você pode criar documentos sem um desovador instalado. Editar e aplicar requer modo criativo ou nível de permissão 2.

1. Clique com o botão direito do mouse no ar com DRM Core para abrir o seletor de editores.
2. Escolha `Spawner Editor`, crie um documento ou carregue o JSON existente.
3. Defina o nome e a lista de alvos em `Spawn Target`.
4. Configure a ativação, entidades por tentativa, limites e posicionamento em `Conditions` e `Spawn Settings`.
5. Ajuste a destruição, os efeitos e a aparência conforme necessário.
6. Use `Save As` para nomear e salvar o documento. Use `Save` para edições posteriores nesse arquivo.
7. Clique em `Get Spawner` para receber um item em branco e coloque-o onde for necessário.
8. Clique com o botão direito do mouse no desovador colocado com DRM Core. Selecione o arquivo salvo em `Apply Spawner JSON` e clique em `Apply JSON`.

** Salvar JSON e aplicá-lo ao mundo são ações separadas.** Um novo desovador está inativo até ser configurado. Depois de editar um documento, aplique o arquivo salvo novamente a cada desovador que você pretende atualizar.

Os documentos são armazenados no servidor em `config/dochi_rpg_maker/spawn_control/spawners/`. Em singleplayer, o diretório de jogos da instância é a raiz; documentos são compartilhados em seus mundos. Veja [Compartilhamento e Operações](#dochi-spawn-control/dochi-spawn-control-presets-operations) para caminhos e backups.

![Uma entrada de zumbis em Spawn Target.](assets/media/guides/spawn-control-014-neo1211/spawn-placed.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Entidades por ativação 1 tenta uma entidade. Chance 1.0 é 100% porque é a única entrada. A colocação bem-sucedida ainda depende das condições e do espaço disponível.")

## Layout do editor

Selecione uma categoria no painel esquerdo e edite valores à direita. O caminho JSON é um rótulo que identifica o documento atual. Use `Save As` para mudar seu destino.

| Categoria | Conteúdo |
| --- | --- |
| `Spawn Target` | Nome, estado habilitado, entidade/clone lista e chances relativas |
| `Conditions` | Gatilho, intervalo, jogadores, tempo, tempo, redstone e condições compartilhadas |
| `Spawn Settings` | Entidades por tentativa, propriedade / limites de vida, colocação, terreno e luz |
| `Destruction` | Modo de colheita ou saúde, saúde, hitbox e item drops |
| `Effects` | Acerte partículas, toque/quebre sons, e barra chefe do desovador |
| `Appearance` | Modelo, escala, rotação, deslocamento e visualização |

Clique em um tipo ou botão de modo para abrir um flyout e selecione uma opção diretamente. Listas longas suportam busca, a roda do mouse e uma barra de rolagem. Cancelar ou Esc mantém a seleção anterior. `On/Off` Controles são alternâncias.

## Lista de alvos e chances

Adicione entradas, selecione uma linha e, em seguida, edite seu alvo e chance. Remova entradas não utilizadas ou defina sua chance para `0`. Uma lista pode conter até 64 entradas e precisa de pelo menos uma chance positiva.

| Fonte | Alvo |
| --- | --- |
| `Entity` | Um ID de entidade registrado no servidor |
| `CNPC Clone` | Um clone de servidor salvo CustomNPCs, identificado por guia e nome |
| `DW Clone` | Um modelo de clone de Dochi salvo |
| `NPC clone template` | Um modelo de clone v3 exato salvo em DNPC |

Fontes de clones exigem seu correspondente mod e clone salvo. Os alvos comuns da entidade não fazem de nenhum clone mod uma dependência necessária.

Os valores de chance são relativos às outras entradas. Um valor maior torna esse alvo mais provável; não garante que a entrada mais alta vença. O editor mostra a porcentagem efetiva calculada a partir do total.

| Entrada | Chance de seleção |
| --- | --- |
| Porco 70, vaca 30 | Porco 70%, vaca 30% |
| Porco 1, vaca 1 | 50% cada |
| Porco 10, vaca 0 | Só porco. |

Defina `Entities per activation` para `3` para tentar até três entidades em uma ativação. Cada entidade é desenhada de forma independente, então repetições são possíveis. A 70:30 A lista não garante dois porcos e uma vaca. Falhas de colocação e limites podem reduzir o número realmente gerado.

`Maximum owned entities` limita a população de propriedade total do desovador. `Total spawn limit` limita suas criações cumulativas; `0` significa ilimitado. Ambas as tampas cobrem a lista inteira, não cada entrada separadamente.

![Visualização da aparência do modelo de bloco minecraft:spawner.](assets/media/guides/spawn-control-014-neo1211/spawn-appearance.png "Spawn Control 0.1.4 / NeoForge 1.21.1. O painel direito pré-visualiza o corpo do desovador, não a entidade que ele criará. A fonte do modelo, a escala, a rotação e o deslocamento vertical são separados do Spawn Target.")

## Aparência e visualização

`Model source` em `Appearance` ofertas **Item, Entity, and Block**. A aparência é independente da lista de geração: um desovador em forma de bloco pode criar zumbis.

Use `Choose` para selecionar o ID do modelo e, em seguida, ajuste a escala, a rotação e o deslocamento vertical. Configure estados de bloco com `Block properties (JSON)` e dados de modelo com `Model NBT (SNBT)`. CNPC e DW clones são fontes de geração, não tipos de aparência adicionais.

A visualização é renderizada dentro do editor e não cria uma entidade no mundo. Enquanto um modelo alterado está sendo resolvido, ele mantém a última visualização e atualizações bem-sucedidas da solicitação mais recente.

Continue com [Condições e Efeitos de Pawner](#dochi-spawn-control/dochi-spawn-control-spawner-settings).

Para salvar DNPCs, siga a configuração [template](#dochi-spawn-control/spawn-control-npc-templates). A entidade `dochi_npc:npc` cria um NPC padrão sem copiar a aparência/equipamento salvo. `CNPC Clone` aplica-se aos alvos mais antigos e é excluído em 26.3.
