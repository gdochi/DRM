---
title: Spawner Condições e Efeitos
slug: dochi-spawn-control-spawner-settings
order: 845
description: Configure gatilhos posicionados, condições compartilhadas, limites de posicionamento, destruição, partículas, sons e barras de chefe.
product: dochi-spawn-control
category: Condições e efeitos
section: rules
status: Rascunho
version: 0.1.5
audience: Criadores de Spawners
tags:
  - spawner
  - conditions
  - effects
translationSource: en
translationMethod: assisted
---

## Gatilhos e condições

Use `Conditions` para definir o gatilho e requisitos adicionais. Um gatilho ainda precisa passar pelas verificações do jogador, do tempo, do tempo, do redstone e da tampa de geração.

| Gatilho | Comportamento |
| --- | --- |
| `Interval` | Repetidas tentativas usando o intervalo mínimo e máximo configurado |
| Entrada do jogador | Ativa na entrada no intervalo de ativação; deixando além da distância de saída e retornando pode rearmá-lo |
| Onda anterior apagada | Tenta a próxima onda depois que o desovador não tem entidades próprias restantes |
| Tempo | No máximo uma ativação bem-sucedida por dia de jogo dentro da janela de tempo configurada |
| `Redstone Rising Edge` | Tentativas quando o sinal de redstone muda de off para on |

`Initial delay` É a espera inicial. Intervalos mínimos e máximos controlam tentativas repetidas. Os valores estão em ticks; 20 ticks igual a um segundo na velocidade normal do servidor.

Verifique se os jogadores são necessários, se os jogadores criativos contam, a contagem mínima de jogadores e as distâncias de ativação/saída. `Shared Conditions` abre o editor de condição comum de DRM. Comparações de dados armazenados referem-se a CustomNPCs script player/world storeddata, não a objetivos de placar. Cada jogador contado deve passar no grupo de condições compartilhadas.

O tempo usa `0–23999`. Um começo maior que o fim se estende à meia-noite. O tempo e o estado de redstone necessário podem impor mais restrições.

![Ativação do jogador e intervalo nas Condições.](assets/media/guides/spawn-control-014-neo1211/spawn-conditions.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Requer que o jogador esteja ligado e inclua jogadores criativos aqui. Um autor criativo próximo não conta para a ativação neste estado. Em velocidade normal, 200 Os carrapatos são cerca de 10 segundos.")

## Contagens e colocação

| Configurando | Propósito |
| --- | --- |
| `Entities per activation` | Número tentado por ativação, 1–64 |
| `Maximum owned entities` | Cobertura populacional total para este desovador. |
| `Total spawn limit` | Cap de criação cumulativa; 0 significa ilimitado |
| Raio, faixa vertical, mínimo/máximo Y | Área de pesquisa do candidato |
| Colocação | Verificação de solo, ar, água ou lava |
| Tentativas de posição por entidade | Limita a busca por um local válido |
| Bioma ou `#tag` | Restrição opcional de bioma/tag |
| Fonte de luz e luz mínima/máxima | Combinado, bloco ou faixa de luz do céu |

Os candidatos são verificados apenas em partes carregadas; o desovador não força partes carregadas. Verificações internacionais e de colisão também se aplicam. Aumentar a contagem não pode garantir que muitas entidades se o espaço ou tampas impedir a geração. Grandes operações podem estar espalhadas pelo orçamento de processamento do servidor.

![Limites de propriedade e colocação em Spawn Settings.](assets/media/guides/spawn-control-014-neo1211/spawn-settings.png "Spawn Control 0.1.4 / NeoForge 1.21.1. As entidades de propriedade máxima 6 limitam as entidades de propriedade viva; O limite total de geração 0 remove o limite cumulativo. Entidades grandes também precisam de espaço vertical e de colisão suficiente.")

## Destruição

Escolha colheita ou destruição baseada na saúde em `Destruction`.

| Modo | Configurações e resultado |
| --- | --- |
| Colheita | Configurar os requisitos de dureza e ferramenta; remover o desovador por mineração |
| Saúde | Configurar a saúde máxima e hitbox; destruí-lo com dano de ataque |

Você também pode escolher se a destruição deixa cair o item de geração configurado. Efeitos de acerto em modo de saúde são executados somente quando o servidor aceita danos. Ataques rejeitados e ataques dentro da recarga de danos não os reproduzem.

![Destruição com colheita selecionada.](assets/media/guides/spawn-control-014-neo1211/spawn-destruction.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Colheita usa dureza de mineração e ferramenta necessária. A saúde máxima e Hitbox são cinza porque a destruição baseada na saúde não é selecionada.")

## Acerte partículas e sons

Em `Effects`, habilite partículas de acerto, escolha o tipo de partícula registrado e defina partículas por acerto. Pesquise a lista de partículas registradas na instância atual. Tipos que exigem dados adicionais também precisam de parâmetros correspondentes.

Bater sons e quebrar sons tem interruptores de ativação independentes. Escolha uma identificação de som e configure volume e pitch. Partículas e sons modificados referenciados requerem o mod fornecendo esses recursos no ambiente de execução.

![Acerte partículas, acerte som e som de destruição em Efeitos.](assets/media/guides/spawn-control-014-neo1211/spawn-effects.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Os interruptores estão desligados, então as entradas relacionadas são cinza. Inserir um ID sozinho não ativa o efeito. Ative-o e, em seguida, defina o tipo e a contagem ou o volume.")

## Spawner chefe bar

Ative a barra de chefe para mostrar o nome do desovador e a saúde restante, e escolha sua cor. É mostrado para os jogadores rastreando o desovador e removido quando o desovador é destruído ou deixa seu conjunto rastreado. Não é uma barra de servidor sempre visível.

## Referência de JSON: três desenhos de uma lista de 70:30

Use o editor para a autoria normal. Este exemplo mínimo é para inspecionar ou compartilhar arquivos; configurações omitidas recebem padrões.

```json
{
  "schemaVersion": 1,
  "name": "Mixed encounter",
  "sources": [
    { "kind": "entity", "id": "minecraft:pig", "weight": 70 },
    { "kind": "entity", "id": "minecraft:cow", "weight": 30 }
  ],
  "activation": { "requirePlayer": true, "includeCreative": true },
  "spawn": { "count": 3, "maxOwned": 9, "maxTotal": 0 }
}
```

Salve-o como `config/dochi_rpg_maker/spawn_control/spawners/examples/mixed.json` e carregue-o no editor. Este exemplo de teste inclui jogadores criativos em verificações de ativação. Aplique o JSON salvo a um desovador colocado para executá-lo.
