---
title: Edição simples, receitas e técnicas reutilizáveis
slug: battleworks-authoring
order: 227
description: Crie um ataque por receita, ajuste seus valores e reutilize uma técnica independente.
product: mob-editor
section: start
category: BattleWorks
status: Guide
version: 0.1.7
audience: Iniciantes e criadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Começar com uma receita

Abra BattleWorks com a [varinha ou comando do editor](#mob-editor/mob-editor-setup). Em **Pattern Workbench**, escolha **Attack recipes** e selecione um ataque inicial.

| Receita | Comportamento inicial |
| --- | --- |
| Wide sweep | Golpe corpo a corpo com aviso no chão vinculado e movimento nativo |
| Charge and slash | Aproximação durante a preparação, parada e golpe |
| Delayed ground strike | Salva a posição do alvo, avisa ali e atinge a posição salva |
| Retreat and counter | Recua durante a preparação e contra-ataca à frente |

Receitas adicionam padrões e recursos editáveis. Não instalam magias ou modelos externos. Uma animação incompatível com o modelo é omitida; escolha um clipe compatível com seu ator. O ataque atrasado acerta a posição salva, permitindo que um jogador em movimento escape.

## 2. Ajustar o ataque em Simple edit

Selecione o novo padrão e **Simple edit**. Ajuste nome, Enabled, Min/Max Range, Windup, Action, Recovery e Cooldown. Os campos de tempo também mostram segundos: na velocidade normal do servidor, 20 ticks equivalem a um segundo.

Escolha uma hitbox vinculada para ajustar dano e dimensões comuns. Se outra ação causar o dano, use **Detailed edit** nessa ação. Alternar as vistas preserva condições, eventos, movimento e animação existentes; a vista simples não substitui o documento por um arquivo simplificado.

Confira **Shared by … patterns** antes de editar dano ou dimensões. Use **Make this hitbox independent** quando só este padrão deve mudar. Confira a geometria completa e o tick de contato na [Hitbox Library](#mob-editor/battleworks-hitboxes).

## 3. Salvar uma técnica para outro documento

1. Selecione o ataque e escolha **Save technique**.
2. Abra outro documento de combate no mesmo servidor com o mesmo jogador.
3. Abra **My techniques**, selecione uma entrada e pressione **Load technique**.
4. Confira padrões, destinos de combo, hitboxes e partículas importados antes de salvar.

A biblioteca pertence ao seu jogador naquele servidor. A importação cria IDs independentes e reconecta as referências do pacote. Arquivos de partículas referenciados podem ser incluídos; mods, modelos, sons e provedores de habilidades externos ainda precisam existir na instalação de destino. Uma importação incompatível rejeitada deixa o documento intacto.

## 4. Escolher o compartilhamento da cópia

| Opção de Copy technique | Resultado |
| --- | --- |
| Independent copy | Copia ataque, padrões de combo vinculados, hitboxes e efeitos de partículas com novos IDs |
| Share existing resources | Copia apenas o padrão selecionado; os recursos vinculados continuam compartilhados |

Use uma cópia independente para uma variante com dano ou partículas diferentes. Compartilhe quando vários movimentos devem manter a mesma definição. Editar recursos compartilhados afeta todos os padrões que os referenciam; mudar apenas o nome não os separa.

## 5. Desfazer, salvar e aplicar

**Undo / Redo** restaura edições do documento e o estado de carregamento de arquivos. As setas Back/Forward navegam pelo histórico do editor. Desfazer não apaga entradas já salvas na biblioteca do servidor.

Use **Save As** para um novo caminho. Com o NPC desejado conectado, pressione **Save** depois para vinculá-lo, ou aplique o arquivo pelo catálogo do NPC. Veja [arquivos e armazenamento da biblioteca](#mob-editor/battleworks-files).

Use Simulation para observar movimento e hitbox, depois teste uma luta real no Sobrevivência. Um aviso visual sozinho não causa dano. Configure [avisos vinculados](#mob-editor/battleworks-hitboxes) e [reinício da arena](#mob-editor/battleworks-encounters) antes de testar o chefe completo.
