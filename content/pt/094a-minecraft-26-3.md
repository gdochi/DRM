---
title: 26.3 Configuração e diferenças de recursos
slug: minecraft-26-3
order: 6
description: Escolha 26.3 arquivos e NPCs e verifique quais recursos do editor diferem.
product: core-fabric
category: Minecraft 26.3
section: getting-started
status: Guia
version: 0.3.1 / Minecraft 26.3
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Instalar 26.3 arquivos

Use **Fabric or NeoForge / Java 25**. Instale os arquivos 26.3 de cada mod no servidor e nos clientes. Fabric também precisa da API Fabric exigida por esses mods.

Crie NPCs com **DNPC**. **CustomNPCs não está disponível em 26.3.** DRM e DNPC Também pode funcionar de forma independente.

![DNPC editor nativo em Minecraft 26.3.](assets/media/guides/dnpc-013-neo263/core263-dnpc-identity.png "DNPC 0.1.3  +  DRM 0.3.1 / NeoForge 26.3.0.95 / Java 25.0.2. Este é um DNPC real em um mundo novo. Identity edita o nome; Appearance & Model edita a aparência. DRM funções conecta DRM características.")

## Escolha os recursos que você deseja

| Característica | Mods |
| --- | --- |
| Criação de NPC, aparência e horários | DNPC |
| Diálogo, lojas, missões e layouts de tela | DRM |
| Padrões de NPC e combate de chefe | DRM + BattleWorks + DNPC |
| Regras comuns de criação de criaturas | Spawn Control |
| Espalhe um NPC salvo de um bloco | Spawn Control + DRM + DNPC |
| Efeitos de armadura NPC | Real Armor e um mod NPC suportado |
| Minijogos/MWENT tabelas | Minijogos |
| ícones de mapa NPC | DRM + MapIcon + um mapa suportado |

Cobblemon Editor e DW/DWE não estão incluídos como 26.3 Mods aqui. Use o mais velho deles. 1.21.1/1.20.1 Guias.

## Diferenças de versões mais antigas

26.3 DRM não tem **Faction Editor, tela de facção de jogador ou GUI Maker elementos de facção**. Fabric também exclui **Item Editor and Stat Builder**.

Siga [ criação NPC](#dochi-npc-core/npc-core-setup) e [DRM começando](#core-fabric/quick-start) para NPCs com conversas ou lojas.

![Adicionando uma caixa de texto independente no 26.3 GUI Maker.](assets/media/guides/drm-031-neo263/core263-independent-text.png "DRM 0.3.1 / NeoForge 26.3.0.95. + Texto adiciona uma caixa separada do corpo do diálogo. O conteúdo escolhe o texto direto ou o nome NPC. Save As armazena sua GUI. Isso verifica a tela de edição, não um resultado de diálogo aplicado.")

![Item Editor em NeoForge 26.3.](assets/media/guides/drm-031-neo263/core263-item-editor.png "DRM 0.3.1 / NeoForge 26.3.0.95. Definição de item, linhas de dica de ferramenta, regras de estatísticas e atributo de baunilha estão editando guias. Fabric 26.3 exclui o Editor de Itens. Modelo de item: não selecionado significa que este exemplo ainda não tem a aparência de item selecionada.")

Use [placed NPC templates](#dochi-spawn-control/spawn-control-npc-templates) em Spawn Control. CustomNPCs clones antigos não são convertidos diretamente em DNPC desovas.

Depois de mudar MWENTAs definições de comércio de aldeões nativos, reconectar-se ao mundo ou reiniciar o servidor.

## Trazendo um mundo antigo

Experimente os NPCs, conversas, lojas e outros recursos que você usa em uma cópia antes de substituir o mundo original. Mantenha sua configuração e mundo juntos.
