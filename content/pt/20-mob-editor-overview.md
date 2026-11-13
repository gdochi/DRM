---
title: Começando com BattleWorks
slug: mob-editor-overview
order: 210
description: Um caminho de aprendizado desde a instalação até o primeiro ataque, fases do chefe e efeitos de partículas.
product: mob-editor
section: start
category: BattleWorks
status: Guia
version: 0.1.7
audience: Iniciantes e criadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## Comece com um ataque corpo a corpo legível

O BattleWorks **0.1.7** permite criar tempos de ataque, hitboxes, movimento e fases de chefes para NPCs. Use a versão correspondente: Forge 1.20.1, Fabric / NeoForge 1.21.1 ou as compilações separadas de Fabric / NeoForge 26.3.

**DRM é opcional.** Abra os editores com a BattleWorks Wand e crie arquivos sem um NPC conectado. Uma luta real precisa de um ator compatível, como DNPC. CustomNPCs continua opcional nos destinos antigos e está excluído a partir de 26.3.

Comece por [edição simples e receitas](#mob-editor/battleworks-authoring), ou siga o exercício detalhado abaixo. Um movimento básico de braço e uma hitbox não precisam de mods externos de magia ou animação.

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

## Onde configurar cada recurso

![Inspetor Simple edit e linha do tempo do ataque.](assets/media/guides/battleworks-017-20261113/simple-edit.png "BattleWorks 0.1.7 / NeoForge 1.21.1 / DRM 0.3.2 / DNPC 0.1.4. Basic Slash padrão selecionado. A imagem mostra a organização da edição, não a criação por receita nem dano real.")

Use **Pattern Workbench** para a sequência, **Hitbox Library** para a geometria de dano e **Combat Rules** para alvos, fases e arena. **Simple edit** reúne valores comuns; **Detailed edit** preserva e mostra condições, eventos, movimento e animação completos. [Receitas e My techniques](#mob-editor/battleworks-authoring) oferecem pontos de partida reutilizáveis.

| Tarefa | Editor |
| --- | --- |
| Nome, vida base, equipamento, relações, saques e reaparecimento | Editor do próprio ator, como DNPC |
| Aparência e modelo | DNPC Appearance & Model ou provedor instalado; DRM NPC Basic para modelos DRM |
| Padrões, hitboxes, tempos, movimento e fases | BattleWorks |
| Arquivos reutilizáveis de efeitos visuais | Particle Maker no seletor independente ou na categoria Visual do DRM |
| Popups e diálogos DRM | DRM e suas ferramentas de popup/GUI |

Documentos importados podem ativar npcStats para substituir atributos de combate. Confira essas opções se a aplicação de um chefe alterar vida ou movimento.

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
