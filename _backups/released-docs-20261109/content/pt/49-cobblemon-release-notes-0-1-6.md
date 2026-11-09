---
title: Cobblemon Editor 0.1.6 Alterações
slug: cobblemon-editor-release-0-1-6
order: 490
description: Regras de batalha, compatibilidade, editor e alterações de tempo de execução na versão 0.1.6.
product: drm-cobblemon-editor
category: Primeiros passos
section: overview
status: Estável
version: 0.1.6
audience: Criadores / Operadores
tags:
  - release
  - changelog
translationSource: en
translationMethod: assisted
hiddenNav: true
---


Esta página é um ** histórico 0.1.6 registro de mudança**. Para o uso atual da instalação [0.2.9 configuração](#drm-cobblemon-editor/cobblemon-editor-setup); para o uso de controles [Regras de Batalha](#drm-cobblemon-editor/cobblemon-battle-rules).

![A atual tela de cenários de batalha por rodada.](assets/media/guides/cobble-029-neo1211/cobble-battle-rules.png "Atual 0.2.9 / NeoForge 1.21.1 ilustra regras comuns e específicas. Não é uma captura de tela arquivada 0.1.6 e pode conter controles posteriores.")

## Em um relance

A versão 0.1.6 reorganiza as configurações de batalha em regras comuns e por rodada e suporta Cobblemon 1.7.3 e 1.8.0 com um JAR. Também adiciona sons de batalha de treinador e corrige listas de movimentos aprendíveis, aplicação de itens, avaliação de IA de propagação, estado do editor e compartilhado DRM Navegação.

## Instalação no momento de 0.1.6

- Minecraft 1.21.1, Java 21, Fabric Loader 0.17.2+, Fabric API 0.116.6+1.21.1+
- Necessário: DRM Núcleo 0.1.9 +,  Cobblemon 1.7.3 abaixo 1.9.0, CustomNPCs Fabric 1.0.0
- Opcional por recurso: CobbleDollars, RCT API 0.15.1-beta+, FTB Quests, Mega Showdown e outras integrações compatíveis
- JAR: `dochi_cobblemon_editor-0.1.6-fabric-1.21.1.jar`

RCT API permanece opcional. Falhas de ausência ou chamada recaem no limite do addon em vez de fazer RCT uma dependência de tempo de execução necessária. Substitua o 0.1.6 JAR no servidor e em todos os clientes.

## Regras de batalha focadas em rodadas

- Abra as regras de batalha de `Rounds`, depois escolha `Common Rules` ou uma rodada explícita de 1–16.
- Cada rodada pode herdar as regras comuns ou manter uma substituição independente.
- Os formatos incluem Singles, Doubles, Triples e Lead Duel.
- Os modos de nível incluem níveis de autoria, média jogador-equipe mais deslocamento, e níveis fixos com escopo.
- As regras dos itens cobrem a permissão de batalha / item controlado, uma lista bloqueada pesquisável, limites de uso, voltas mínimas e limites de HP alvo.
- Pokémon E regras mecânicas cobrem restrições lendárias, seleção de leads e permissão Mega/Tera/Dynamax.

Clicar em uma linha de catálogo de itens bloqueia ou permite imediatamente. O servidor impõe itens de batalha, revive e captura itens antes do consumo; jogadores criativos ainda seguem os limites de uso. Duelo de chumbo cria um...Pokémon Equipes solteiras sem excluir as equipes criadas.

O equipamento do NPC e as regras de batalha são separadas. O equipamento configura o NPC da rodada e o item-chave; a regra de batalha controla se o mecânico é permitido para ambos os lados.

## Sons de batalha

As batalhas de treinador podem tocar um som uma vez por batalha em cada configuração restante.Pokémon Contar com 1–6. Defina regras comuns, então deixe cada rodada herdar, substituir ou desativá-las. O editor fornece pesquisa e visualização de ID de som, volume 0–4, pitch 0.05–4, e uma opção para parar o áudio de batalha atual antes do novo som.

## Pokémon, AI, e editor corrige

- Os seletores de movimento mostram apenas os movimentos aprendizes resolvidos pelo servidor para a espécie, forma e aspectos selecionados.
- Conjuntos explícitos de um a quatro movimentos mantêm sua contagem e ordem exatas na pré-visualização e na batalha.
- DRM AI agora avalia dano, digitação, STAB, múltiplos alvos e dano aliado para propagação e movimentos de alvo automático, como Terremoto e Rock Slide.
- Os rascunhos do inventário de batalha/geral sobrevivem à busca, paginação e redimensionamento; rótulos de movimento longo, visualizações e estados de botão de página foram corrigidos.
- Setas para trás e para a frente compartilhadas e ajuda com o mouse agora usam DRM Núcleo 0.1.9Histórico compartilhado e APIs de interface do usuário.

## Contratos de dados

- Treinador JSON: `22`
- Esquema do próprio Pokémon JSON: `8`
- Esquema do cérebro do treinador: `4`
- ID de mod interno e namespace de recursos: `cobble_npc`

Os dados JSON e NBT mais antigos suportados são normalizados para os campos atuais. Faça backup `config/dochi_rpg_maker/cobblemon/` junto com o mundo antes de atualizar.
