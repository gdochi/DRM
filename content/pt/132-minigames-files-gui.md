---
title: GUI, arquivos e solução de problemas
slug: minigames-files-gui
order: 1320
description: Separe arquivos de regras dos layouts do jogo, edite-os com GUI Maker e diagnostique problemas comuns.
product: dochi-minigames
category: Arquivos e Operações
section: operations
status: Guia de uso
version: 0.1.6
audience: Criadores/operadores
translationSource: en
translationMethod: assisted
---

## Armazenamento

| Dados | Caminho |
| --- | --- |
| Regras do jogo | `config/dochi_rpg_maker/minigames/games/<id>.json` |
| GUI de tempo de execução padrão | `config/dochi_rpg_maker/gui/minigames/minigames_gui.json` |
| Altas pontuações | `<world>/data/dochi_minigames_scores.json` |

A regra do jogo JSON armazena taxas, limites de tempo, símbolos e recompensas. GUI JSON armazena o tabuleiro do jogador e o layout do painel de pontuação. As ligações NPC persistem em dados NPC; NPCs usando o mesmo ID do jogo compartilham a configuração do jogo.

O padrão da roleta **Spin on block** começa na máquina sem um arquivo de layout GUI. Arquivos GUI organizam jogos baseados em tela e roleta configurados para **Game screen**.

## Editar a tela em GUI Maker

Use **Open GUI Maker** para abrir o layout vinculado do jogo. Edite a posição e o tamanho da placa e do painel de pontuação, e então salve. Para personalizar um padrão separadamente, crie uma cópia com `Save As` e selecione-a em **General → GUI JSON**.

![A página geral do editor de minijogos com GUI JSON, seu localizador e Open GUI Maker abaixo.](assets/media/guides/minigames-015-neo1211/minigames-editor.png "Minijogos 0.1.5 / NeoForge 1.21.1. Defina título, tempo e recompensas no editor do jogo; use Abrir GUI Maker para a posição e aparência do tabuleiro.")

**Game Board → Memory Card Size** aceita 16 –96px, inadimplente para 40px. Placas grandes encolhem cartões para caber, e a detecção de cliques segue o tamanho exibido. `previewGame` muda apenas a tela de amostra de GUI Maker, não as regras reais do jogo.

Um valor numérico incompleto bloqueia as alterações da guia e salva até ser corrigido. A navegação e o redimensionamento da janela para trás/para a frente compartilhados preservam o rascunho, mas não o salvam no servidor.

## Solução de problemas

| Sintoma | Verificar |
| --- | --- |
| Jogo que faltava no Load | Pasta de jogo do servidor, esquema, tipo de jogo suportado e erros de validação |
| NPC abre o jogo imediatamente | Remover Minigames diretos Aplicar quando a entrada deve acontecer apenas através de diálogo |
| Começando falha após a confirmação | Equilíbrio, itens referenciados, integrações opcionais e mensagem do servidor |
| Configuração de memória não pode salvar | Até mesmo a contagem de cartas e símbolos de pares distintos suficientes |
| Mudanças na GUI não têm efeito | Editar e salvar a GUI realmente vinculada a esse jogo |
| Combinação inesperada de recompensas | Limites de pontuação e política `highest`, `cumulative` ou `random` |

Faça backup `config/dochi_rpg_maker` e do mundo antes de atualizar. Use JARs comuns sem código de teste de desenvolvimento.

## Referência JSON

Para editores externos: o esquema de regras é `dochi.minigames.v1`, com tipos `monty`, `slots`, `memory`, `whack`, `timing`, `highlow`, `shooting`, `mob_battle` e `roulette`. `guiLayout` é relativo à pasta `gui/` de DRM e padrão a `minigames/minigames_gui.json`. Arquivos de regras não armazenam respostas ocultas ou sessões ao vivo.

## Arquivos autônomos e migração

Os caminhos `config/dochi_rpg_maker/minigames/` e `gui/minigames/` permanecem em uso sem DRM. Locais mais antigos `dochi_minigames/games/` e `gui/dochi_minigames/` são entradas de migração; faça backup deles antes de atualizar. Configurações da interface do cliente usam `config/dochi_minigames/client.json`; a conclusão da lição usa `<world>/data/dochi_minigames/tutorial/<UUID>.json`.
