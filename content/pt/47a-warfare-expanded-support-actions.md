---
title: Apoio de veículos, armas e NPCs
slug: expanded-support-actions
order: 331
description: Desenhe rotas e configure veículos, armas, fontes de NPCs e horários.
product: dochi-warfare-expanded
category: Apoio de combate
section: support
status: Guia
version: 0.3.3
audience: Criadores de mapas e operadores
translationSource: en
translationMethod: assisted
---

## Escolha uma ferramenta

Aprenda primeiro os controles da [primeira timeline](#dochi-warfare-expanded/expanded-support-timeline). Estas ferramentas podem compartilhar um documento.

| Ferramenta | Entrada no mundo | Início |
| --- | --- | --- |
| Vehicle support | Arraste da partida ao destino | Geração/movimento do veículo |
| Fire support | Clique no alvo e arraste a aproximação | Geração do veículo/aeronave |
| NPC deployment | Arraste da partida ao destino | Geração de clones ou seleção/movimento de NPCs |

Teste um único evento antes de combinar vários. Depois, siga para [salvar, simular e executar](#dochi-warfare-expanded/expanded-support-run).

## 1. Reforce com um veículo

1. Escolha **Vehicle support** num documento vazio.
2. Arraste entre partida e destino num chão transitável.
3. Volte a **Select / move** e selecione o evento.
4. Confira o seletor de veículo. O exemplo mantém **um M1A2 básico**.
5. Defina início **3 segundos**, quantidade **1**, espaçamento **12**, raio de defesa **24** e duração **60 segundos**.
6. Confira as duas posições em **Advanced**. Corrija-as pelos controles no mundo ou pelas coordenadas.

![Crie uma rota com início em três segundos, um veículo, espaçamento 12, raio 24 e duração 60.](assets/media/guides/dwe-tutorials-20261109/dwe-vehicles.mp4 "06 · Configuração da rota. O vídeo 10 mostra geração, movimento e remoção reais do veículo temporário.")

| Campo | O que significa |
| --- | --- |
| Count | 1–8 por evento; teste primeiro com um |
| Spacing | Mesmos deslocamentos de formação na partida e chegada |
| Faction | ID numérico; relações normais determinam hostilidade |
| Guard radius | Área defendida após a chegada |
| Lifetime | Conta desde a geração, incluindo a viagem |

Após chegar, a unidade defende os arredores. Veículos terrestres precisam de rotas transitáveis. Helicópteros surgem no chão e decolam com a IA nativa; o Y de destino solicita altura de voo. Aeronaves de asa fixa usam bombardeio/apoio de armas.

## 2. Configure apoio de armas

1. Use **Fire support**, clique no alvo e arraste a direção.
2. Confira **modo terrestre/aéreo → veículo → arma real**. Mudar o modo redefine valores padrão.
3. Exemplo: limite de tiros **20**, janela de fogo **3 segundos**, distância **48**, varredura **16**.
4. Defina início **5 segundos** e duração **30 segundos**.
5. Para apoio aéreo, configure altitude e teste aproximação, tiros e saída no terreno pretendido.

![Configure direção, limite de tiros, tempo, distância e varredura.](assets/media/guides/dwe-tutorials-20261109/dwe-fire.mp4 "07 · Configuração terrestre. Não mostra troca para modo aéreo, outra arma ou disparos reais.")

**Início, janela de fogo e duração são separados.** O início gera a unidade; a janela conta do **primeiro disparo real**. O fogo termina ao atingir tempo ou quantidade. Terreno, alcance, saída segura e duração podem encerrá-lo antes.

Somente metralhadoras/canhões automáticos fornecidos pelo servidor são elegíveis. Bombas, foguetes, mísseis e canhões de baixa velocidade são excluídos. RPM, munição, calor, recarga e segurança nativos continuam ativos. Apoio aéreo ataca e sai; o terrestre varre com a torre.

## 3. Mova NPCs existentes

| Fonte | Preparação e resultado |
| --- | --- |
| Area | Seleciona NPCs com DW AI ativa na esfera de partida no momento da execução |
| Clone | Gera cópias de um NPC salvo na biblioteca DW |

1. Arraste partida ao destino com **NPC deployment**.
2. Confira **Source**. A gravação usa **Area**, pois não há clones salvos.
3. Defina quantidade **4**, raio **16**, espaçamento **2** e velocidade DW **5**.
4. Início **2 segundos**, duração **30 segundos**. Uma facção afeta seleção/geração.
5. Confira partida/destino em **Advanced** e salve.

![Configure rota, quantidade, raio, espaçamento, velocidade e horários de NPCs por área.](assets/media/guides/dwe-tutorials-20261109/dwe-npcs.mp4 "08 · Somente criação da configuração Area. Prepare NPCs com DW AI ativa na partida antes de executar; não é um vídeo de movimento concluído.")

Area usa uma **esfera centrada na partida no instante da execução**. Exclui NPCs montados, contratados ou com outra ordem. Para Clone, ative DW AI no original antes de salvá-lo na biblioteca. IDs de arquivos podem diferir dos nomes exibidos.

O combate DW tem prioridade; o avanço continua depois. Não há teletransporte para contornar obstáculos. Ao expirar, **somente clones gerados são removidos**. NPCs existentes recuperam configurações anteriores sem sobrescrever cegamente edições feitas durante a execução.

## Combine tipos de apoio

Comece com **NPCs em zero segundos → veículos em três → armas em cinco**. A ordem de início não garante a de chegada: navegação, física e combate continuam ativos.

Revise [tempos e centro](#dochi-warfare-expanded/expanded-support-timeline), depois [salve e execute](#dochi-warfare-expanded/expanded-support-run). Veículos temporários não permitem embarque, salvamento como clone ou captura em pedras de alma. Para veículos permanentes, use o [editor de veículos](#dochi-warfare-expanded/expanded-overview).

## Escolher pacotes de veículos e apoio B-2

As listas de veículos, aeronaves, armas e cargas dependem da instalação do servidor e do tipo de apoio. Selecione novamente armas/cargas após trocar a aeronave. **B-2 / GBU-57** pode ser configurado com AshVehicle instalado e quando o catálogo permitir a combinação. Não se pode combinar qualquer aeronave com qualquer carga.

Apoio de asa fixa precisa de espaço para alinhar o ataque e sair. As correções de mira e rota da 0.3.3 não garantem acertos em qualquer terreno. Confira os [veículos compatíveis](#dochi-warfare-expanded/expanded-compatibility) e teste rotas em Simulation.
