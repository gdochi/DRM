---
title: Fabric 0.2.0 Atualização
slug: release-notes-0-2-0
order: 8
description: Tooltip Maker, ajuda compartilhada, apresentação de diálogo e melhorias na animação do Gecko em Fabric 0.2.0.
product: core-fabric
category: Primeiros passos
section: getting-started
status: Estável
version: 0.2.0
audience: Criadores / Operadores
translationSource: en
translationMethod: assisted
hiddenNav: true
---

Este é um registro histórico de lançamento. Veja [DRM0.3.1](#core-fabric/release-notes-0-3-1) para orientação atual.

## Personalizar uma dica de ferramenta de item

Tooltip Maker organiza o nome, descrição e visualização do item. Selecione um elemento na tela central, edite-o à direita e use a Visualização. Esta é uma corrente NeoForge tela, não o histórico Fabric 0.2.0 UI. Continue com o guia [ atual](#core-fabric/tooltip-maker) para salvá-lo e aplicá-lo.

![Personalize uma dica de item.](assets/media/guides/drm-031-neo1211/tooltip-maker.png "DRM 0.3.1 / NeoForge 1.21.1. Esta é a característica relacionada na produção atual, não uma captura da interface histórica descrita abaixo.")

## Alterar log 0.2.0

### Mudou.

- Os campos e botões do editor agora usam larguras mais compactas baseadas em conteúdo, quando apropriado.
- Os cartões de ajuda compartilhada agora envolvem, reposicionam e ficam acima do conteúdo do editor de forma mais consistente.
- A reprodução da animação Gecko agora usa uma linha do tempo do servidor sincronizado e alcança corretamente os espectadores atrasados.

### Adicionado

- **Tooltip Maker** para layouts de cursor de item, visualizações de itens 2D ou 3D, imagens, texto, rolagem e efeitos de entrada.
- Jogador-cabeça HUD renderização.
- Tamanho do texto de escolha de diálogo por nó e destaques de pulso opcionais.
- Gecko animação Iniciar Rotas com um alvo Goto.

### Corrigido

- A navegação de diálogo não impede mais que ações posteriores, como animações, comandos, tags ou ações de itens sejam executadas.
- As pré-visualizações do Gecko podem procurar e reiniciar independentemente, tentar novamente os ativos perdidos e voltar com segurança quando o carregamento falhar.
- Sobrepostos, esticados e controles recortados incorretamente foram corrigidos em GUI Maker, Quest Editor, Faction Editor e telas relacionadas.

### Actualização

Faça backup do seu mundo e `config/dochi_rpg_maker/` e instale o mesmo DRM Core 0.2.0 JAR no servidor e em todos os clientes. CustomNPCs permanece exigido por este Fabric construir. Os dados existentes 0.1.9 continuam sendo o ponto de partida; use `Save As` ao personalizar padrões protegidos.
