---
title: SuperbWarfare Veículo AI
slug: warfare-vehicle-ai
order: 370
description: Configure SuperbWarfare movimento de superfície e ar, alvos, armas, munição virtual, equipe NPC, perfis e comandos.
product: dochi-warfare
category: Veículo AI
section: vehicles
status: Rascunho
version: 0.3.3
audience: Criadores e operadores de cenários
tags:
  - SuperbWarfare
  - vehicle
  - ai
translationSource: en
translationMethod: assisted
---

**DWE 0.3.3** fornece veículos no Forge 1.20.1, NeoForge 1.21.1 e Fabric 1.21.1. Veja [instalação e arquivos](#dochi-warfare-expanded/expanded-overview), [reações](#dochi-warfare-expanded/expanded-vehicle-gimmicks) e a [timeline redesenhada](#dochi-warfare-expanded/expanded-support-timeline).

DW continua sendo o núcleo obrigatório. A compatibilidade verifica as APIs usadas, sem exigir números DW/DWE iguais. Confira [instalação por carregador](#dochi-warfare/warfare-setup) para dependências externas.

## Requisitos e editor

A IA do veículo é uma integração opcional SuperbWarfare. Combine o carregador e a versão suportada descrita no guia de instalação. No modo Criativo, segure `DW Npc Core` e clique com o botão direito do mouse em um veículo suportado. Isso abre um editor de veículos separado do editor de NPC de infantaria.

DW usa o motor nativo do `processInput` ou controles de voo. SuperbWarfare continua a possuir física do motor, velocidade, colisão, energia, torres, armas, recargas, projéteis e sons; DW não substitui diretamente posição, rotação ou velocidade. Um jogador que embarca em um veículo de IA é desmontado por segurança, então desative a IA antes de dirigi-la. DNPC ou CustomNPCs tripulação colocada através do editor do veículo pode permanecer a bordo.

![Resumo da visão geral do veículo de detecção, memória e proteção amigável.](assets/media/guides/warfare-expanded-031-neo1211/dwe-ai.png "DWE 0.3.1 / NeoForge 1.21.1. A visão geral resume os valores atuais; as configurações do veículo são armazenadas separadamente dos sentidos do NPC da infantaria.")

## Modos de movimento

| Modo ocioso | Comportamento |
| --- | --- |
| `Stationary` | Permaneça na posição de salvo até que o combate ou uma ordem explícita exija movimento. |
| `Area Patrol` | Distribua destinos em todos os setores da área de origem e evite setores visitados recentemente. |
| `Return Only` | Volte para casa e espere. |
| `Route Patrol` | Siga os waypoints salvos e aplique o tempo de espera configurado em cada ponto. |

O movimento de combate é configurado separadamente como `Hold Position`, `Advance` ou `Retreat`. Manutenção de alcance mínimo pode recuar temporariamente quando a arma de referência está muito perto ou sua torre não pode deprimir longe o suficiente para atingir o alvo.

### Movimentação de terra e água

Perfis de rodas, rastreados e de navios usam pegadas separadas, raios de viragem, degraus, declive, suporte, obstáculo, água e comportamento de recuperação preso. Rotas são planejadas apenas através de terrenos carregados com trabalhos de busca limitados.

Em 0.2.9, a Patrulha da Área marca oito setores relacionados em casa em vez de repetir um pequeno círculo em torno da posição atual. Aceleração e rampa de frenagem da distância restante, velocidade atual, distância de parada, demanda de volta e estado de obstáculo, evitando lançamentos de potência total para movimentos curtos.

### Helicópteros e aeronaves de asa fixa

Helicópteros usam a potência do rotor nativo e a entrada do mouse para decolagem, altitude, aceleração para a frente, frenagem, subida de obstáculos, aproximação de destino, pairar e retorno de geofence. Com raio de patrulha suficiente, a Patrulha de Área conecta arcos mais longos ao invés de parar completamente em cada ponto curto.

As aeronaves de asa fixa usam entradas nativas de acelerador, passo, rolo e engrenagem de pouso para ground roll, decolagem, escalada, cruzeiro, aproximação, evitação de terreno e loiter perto de um destino. Porque aviões de asa fixa não podem parar no ar, eles não suportam `Pause movement before fire` e precisam de espaço suficiente para girar.

## Conscientização e alvos

A segmentação de veículos combina IDs de entidade, tags de placar exigidas/rejeitadas, regras de facção e proteção de proprietário/equipe/amigável. A consciência inclui raio de detecção, campo de visão horizontal, atraso de reação, detecção de perto, alertas de danos, defesa de facção, memória de destino e detecção de som.

`Nearest` seleciona por distância. `Custom` combina pessoal/vivo, veículo terrestre/superfície, e pesos de veículos aéreos com bônus de retaliação, retenção de alvo atual, distância e diferença de troca. O `dochi_warfare_vehicle_target` tag pode marcar um alvo explícito, mas não ignora o proprietário, equipe, facção, alcance ou verificações de fogo amigável.

## Armas e munição virtual

O `Weapons` A página é dona da habilitação da arma. Cada montagem nativa tem configurações independentes para:

- ON/OFF e 0-100 preferência
- Categorias de precisão e pessoal, terra/superfície e alvo aéreo
- Entidade, facção, etiqueta e condições de saúde do veículo
- Alcance mínimo e máximo nativo/padrão ou manual
- Comportamento de pausa antes do fogo (exceto as asas fixas) e sinais de espera
- Herança global de munição ou por arma revista infinita/limitada, reserva e recarga
- Sempre ativo ou necessário. DNPC/CustomNPCs tripulação no assento de controle ligado

`Weapon use mode` seleciona apenas armas que estão ativadas e atualmente elegíveis, então usa uma, uma contagem configurada, ou todas as armas elegíveis por oportunidade de ataque. Uma arma OFF não participa da seleção de candidatos ou de referência.

Use as configurações de munição da DW para o estoque de veículos e recargas; você não precisa colocar munição ou revistas na mão de um membro da tripulação.

## Equipe do NPC

A página `Crew` mostra os assentos do veículo em um mapa superior ou lateral. Selecionar um assento mostra sua posição local, ocupação, motorista/turrete/estação de armas/paixão de passageiros, estado do modelo oculto e visibilidade do item mantido.

Para um assento vazio, `Board NPC` pode usar:

- Um clone NPC JSON do servidor Entidade Clone Library
- Uma pedra da alma cheia de NPC no inventário principal do jogador, armadura ou slot offhand

O servidor revalida a permissão criativa, 64- distância de bloqueio, estado de assento, tipo NPC, caminho de clone, fenda de pedra da alma e hostilidade de facção. Um novo NPC é higienizado de UUID, posição, propriedade, e estado de combate ao vivo, em seguida, colocado no assento exato selecionado. A equipe do NPC pode ser desmontada deste editor. DNPC usa clones NPC JSON; soulstones são uma fonte separada que requer CustomNPCs.

![O mapa do assento da tripulação da base SuperbWarfare M1A2.](assets/media/guides/warfare-expanded-031-neo1211/dwe-crew.png "DWE 0.3.1 / NeoForge 1.21.1. Selecione um número de assento para inspecionar seu papel e ocupante à direita. Este é um mapa de assento vazio, não um resultado de embarque completo. É a base. SuperbWarfare veículo, distinto do MCSP M1A2.")

### Veja a tripulação e a IA do veículo

Dois tripulantes DNPC já preparados embarcam no M1A2 básico do SuperbWarfare, que segue uma ordem **Move To**. Depois, o veículo muda para combate estacionário e dispara contra um alvo de treino. O vídeo mostra o resultado em jogo; use a página Crew acima para escolher as fontes de NPCs e os assentos, e configure as regras de movimento e alvos antes de ativar a IA.

![Dois NPCs embarcam em um M1A2, a IA o conduz e suas armas disparam contra um alvo de treino.](assets/media/guides/runtime-videos-20261106/vehicle-ai-crew-drive.mp4 "DW + DWE 0.3.2 + DNPC 0.1.3 + SuperbWarfare 0.8.9.1 / NeoForge 1.21.1, interface em inglês. Tripulação e política preparadas → embarque → movimento por IA → detecção e disparo.")

## Perfis, pedras da alma e clones

`Save As` e `Load` armazenam perfis de IA de veículos reutilizáveis em:

```text
config/dochi_warfare/vehicle_ai/profiles/
```

Perfis omitem identidade de entidade viva e estado de posição mundial. Empty CustomNPCs soul stones pode capturar veículos suportados SuperbWarfare e reimplantá-los, preservando dados nativos e configurações de DW. `Clone` armazena um modelo de veículo de servidor higienizado; clique com o botão direito no ar com `DW Npc Core` para invocá-lo da biblioteca de clones.

## Comandos do operador

Comandos requerem nível de permissão 2. Olhe diretamente para a SuperbWarfare veículo dentro 24 blocos, então use:

```text
/dw vehicle_ai enable
/dw vehicle_ai disable
/dw vehicle_ai wander
/dw vehicle_ai guard
/dw vehicle_ai engage
/dw vehicle_ai move_to_me
/dw vehicle_ai return_home
/dw vehicle_ai patrol_add
/dw vehicle_ai patrol_clear
/dw vehicle_ai status
```

A GUI é o fluxo de trabalho principal do criador. Comandos são destinados para operação ao vivo, ordens rápidas e diagnóstico de status.

## Danos aos componentes de veículos terrestres

A 0.3.3 reage a falhas nativas de componentes de veículos terrestres com rodas/esteiras sob controle da IA do DWE. Esta política não se aplica a barcos ou aeronaves.

- Rodas/esteiras danificadas interrompem movimento, recuo e recuperação de obstáculos; armas utilizáveis continuam defendendo. O reparo restaura as decisões de movimento.
- Uma torre avariada exclui suas armas principais/coaxiais. Armas secundárias independentes ainda precisam respeitar ativação, tripulação, munição e alcance.
- Falhas no motor principal/auxiliar iniciam a evacuação de motoristas, atiradores e passageiros NPC após uma parada segura em baixa velocidade. Jogadores não são expulsos. Saídas bloqueadas mantêm os ocupantes a bordo até haver saída segura.

NPCs se afastam brevemente da ameaça quando há um destino seguro. O reembarque automático tem uma espera de 30 segundos. Após a evacuação, repare o veículo e embarque nova tripulação para recuperá-lo. Isso é separado de **NPC combat dismount**, que só desembarca passageiros. As configurações de patrulha e armas são preservadas.
