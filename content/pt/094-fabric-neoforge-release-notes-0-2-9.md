---
title: 0.2.9 atualização
slug: release-notes-0-2-9
order: 4
description: Integração NPC opcional, modelos de clone e correções atuais.
product: core-fabric
category: 0.2.9 atualização
section: getting-started
status: Guia
version: 0.2.9
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

Esta página registra uma versão ** mais antiga**. Use [DRM0.3.1](#core-fabric/release-notes-0-3-1) para instalação e uso atuais. As ilustrações da versão atual abaixo são separadas do histórico de lançamento.


## 0.2.9 mudar registro

DRM ** 0.2.9** alvos Forge 1.20.1 / Java 17 e Fabric / NeoForge 1.21.1 / Java 21. Separe Fabric / NeoForge 26.3 builds use Java 25. Veja o [26.3 guia](#core-fabric/minecraft-26-3) para exclusões e limites de verificação.

CustomNPCs e DNPC são integrações opcionais. As ferramentas básicas de criação não exigem nenhum mod NPC; os recursos específicos do provedor precisam de seu provedor. CustomNPCs está permanentemente excluído de 26.3 em diante. Esse alvo usa o opcional DNPC API de ator/provedor.

## Mudanças que você pode usar

- **DNPC clone templates:** Core expõe uma API de provedor de modelo público. Salve um modelo de clone v3 NPC em DNPC e escolha-o em Spawn Control. Veja [criando templates](#dochi-npc-core/npc-core-templates).
- **Models without CustomNPCs:** os três alvos mais antigos corrigem CustomNPCs carregamento de classe quando DNPC ou entidades genéricas têm perfis ativos de animação/modelo. Se você já usa 0.2.9, substitua-o por uma compilação contendo essa correção e reinicie Minecraft.
- **Creative tools:** em 1.20.1 / 1.21.1, DRM registra suas próprias ferramentas públicas nas abas dos provedores NPC instalados, sem duplicá-las quando ambos os provedores estiverem instalados.
- **Trainer history deletion:** compatível Cobblemon Editor baseado em Fabric / NeoForge 1.21.1 expõe a exclusão completa de registros de batalha no Admin. Isso difere de um reset de contagem e remove recompensas pendentes e marcadores de recompensa. Leia o guia [Admin](#core-fabric/drm-administration).

Núcleos mais antigos sem a capacidade de modelo retêm seus outros recursos. Mods de ecossistema não precisam de números de versão correspondentes.

## De um NPC a um modelo reutilizável

Salve a aparência e o equipamento do NPC e selecione esse NPC em Spawn Control. Esta tela mostra a integração usada nas versões atuais; não é uma tela histórica 0.2.9.

![Selecionando um modelo DNPC salvo em Spawn Control.](assets/media/guides/spawn-control-014-neo1211/spawn-npc-template-picker.png "Spawn Control 0.1.4 + DRM 0.3.1 + DNPC 0.1.3 / NeoForge 1.21.1. DNPC salvo guide_guard aparece como dochi_npc:actor/guide_guard. Salvar a definição do desovador e aplicá-lo a um desovador colocado antes de esperar um geração.")

## Atualizar

1. Faça backup da configuração do servidor e do mundo juntos.
2. Instalar correspondência Minecraft/loader constrói no servidor e em cada cliente, substituindo o arquivo antigo.
3. Verifique os requisitos do núcleo declarados de cada addon.
4. Abra os arquivos de diálogo, compras e missões existentes; verifique salvando e NPC Apply separadamente. Personalize modelos padrão com `Save As`.

Algumas correções mantêm o mesmo número de versão. Um nome de arquivo por si só não estabelece que uma correção está presente. Versões aqui identificam ** builds de produção local verificados em 2026-10-28**, não disponibilidade de upload público. Histórico [0.2.8 notas](#core/release-notes-0-2-8) Fiquem disponíveis.
