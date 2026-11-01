---
title: Começando com BattleWorks
slug: mob-editor-overview
order: 210
description: Um caminho de aprendizado desde a instalação até o primeiro ataque, fases do chefe e efeitos de partículas.
product: mob-editor
section: start
category: BattleWorks
status: Guia
version: 0.1.6
audience: Iniciantes e criadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## Comece com um ataque corpo a corpo legível

BattleWorks ** 0.1.6** é o complemento de combate NPC do DRM para Forge 1.20.1, Fabric / NeoForge 1.21.1 e construções separadas 26.3. Tempo de combate do autor, hitboxes, movimento e fases.

Os exercícios abaixo usam **Forge 1.20.1 and CustomNPCs**. Verifique [0.1.6 limites de instalação](#mob-editor/battleworks-update-0-1-6) para outras carregadores de mods e 26.3 DNPC.

Comece com um ataque corpo a corpo lento em um NPC humanoide normal; feitiços opcionais e mods de animação são desnecessários para o primeiro exercício.

## Siga este caminho de aprendizagem

| Passo | Guia | Verificação de conclusão |
| --- | --- | --- |
| 1 | [Instalação e preparação de NPC](#mob-editor/mob-editor-setup) | Abra BattleWorks com seu NPC selecionado. |
| 2 | [ Seu primeiro ataque corpo a corpo](#mob-editor/battleworks-first-attack) | O NPC se aproxima, prepara, acerta e se recupera. |
| 3 | [Espaço de trabalho e cronograma](#mob-editor/mob-editor-patterns) | Mova uma ação para outro carrapato. |
| 4 | [Caixas de segurança](#mob-editor/battleworks-hitboxes) | Ajuste o dano, tamanho e posicionamento separadamente. |
| 5 | [Modelo de animação](#mob-editor/battleworks-animation) | Alinhe contato com o movimento da modelo. |
| 6 | [Targeting](#mob-editor/mob-editor-detection-patrol) e [movimento](#mob-editor/battleworks-movement) | Aproxime-se e retire-se sem movimentos conflitantes. |
| 7 | [Seleção e fases ](#mob-editor/mob-editor-phases), [passivos](#mob-editor/battleworks-passives) | Adicione variedade e reações de saúde. |
| 8 | [ Exercício de chefe em duas fases](#mob-editor/battleworks-encounters) | Combine as características em um encontro. |

Continue com [habilidades e apresentação](#mob-editor/battleworks-skills-effects), [Particle Maker](#mob-editor/battleworks-particles), e [ações avançadas](#mob-editor/battleworks-advanced-actions) quando o encontro básico funcionar.

## Onde cada cenário pertence

![BattleWorks Workbench padrão com padrões à esquerda, Windup/Ação/Recuperação no meio e propriedades padrão/estágio selecionadas à direita.](assets/media/guides/battleworks-016-neo1211/workbench.png "O exemplo padrão do Basic Slash em BattleWorks 0.1.6 em NeoForge 1.21.1. Selecione um padrão à esquerda, um palco no meio e, em seguida, edite suas propriedades à direita.")

Use **Pattern Workbench** para a sequência de ataque, **Hitbox Library** para a forma que causa dano, e **Combat Rules** para perseguição e seleção de padrões. Para construir um primeiro ataque respondendo perguntas, comece com **Create New → Pattern Build Assist**. A assistência está desativada depois de carregar um exemplo existente.

| Tarefa | Editor |
| --- | --- |
| NPC saúde, equipamentos, facções, gotas, respawning | CustomNPCs |
| Modelos, texturas, animações e mapeamentos de comportamento | DRM NPC Básico |
| Padrões, hitboxes, tempo de combate, movimento, fases | BattleWorks |
| Arquivos de partículas visuais reutilizáveis | Visual → Particle Maker |
| Aparência popup e apresentação de diálogo | DRM Popup Maker e sua GUI |

Documentos importados avançados também podem permitir que `npcStats` substitua atributos de combate selecionados. Os exercícios para iniciantes deixam esse recurso desativado e preparam estatísticas básicas em CustomNPCs.

## Cinco termos que você vai usar

| Termo | Significado |
| --- | --- |
| Trabalho de batalha | Um documento de combate. Vários NPCs podem fazer referência ao mesmo arquivo de servidor. |
| Padrão | Um movimento, como uma barra ou retirada. |
| Palco | Windup, Ação ou Recuperação dentro de um padrão. |
| Ações/evento cronometrados | Ações compartilhando um tempo de execução e cronograma de repetição. |
| Hitbox | O espaço testado para danos, de autoria separada da arma visível. |

Na velocidade normal do servidor, **20 Os carrapatos são cerca de um segundo.**.

## Lembre-se destas três regras

1. Visuais e danos são separados. Um efeito de partícula ou balanço de braço não cria um hitbox BattleWorks.
2. Salve o arquivo e conecte-o ao NPC. Save As por si só não liga o NPC para o novo caminho.
3. Teste no mundo depois de usar Simulação. O ensaio mostra a colocação de movimento e hitbox; ele não executa IA real, dano, comandos, sons ou feitiços externos.

Usar [Solução de problemas](#mob-editor/battleworks-troubleshooting) Quando um passo falha e [arquivos e amostras](#mob-editor/battleworks-files) Antes de importar o encontro de outra pessoa.
