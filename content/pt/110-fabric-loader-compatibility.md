---
title: Configuração do carregador e migração de dados
slug: loader-compatibility
order: 45
description: Escopo de Forge e compartilhado Fabric/NeoForge docs, instalação e movimentação de dados existentes.
product: core-fabric
category: Primeiros passos
section: getting-started
status: Estável
version: 0.3.1
audience: Criadores / Operadores
translationSource: en
translationMethod: assisted
---

## Escopo da documentação

** Fabric e NeoForge 1.21.1 compartilham essa documentação.** Diálogo, NPC Shop, GUI Maker, moeda, HUD, missões, Scene Maker e Core NPC Spawner usam o mesmo fluxo de trabalho de autoria normal. Escolha arquivos para a mesma versão e carregador Minecraft. Siga as notas de carregador de cada guia para diferenças, como aplicar botões, conclusão de missões e ativação de HUD.

Forge 1.20.1 tem uma entrada de documentação separada. A rota `core-fabric` existente permanece para compatibilidade de links e também serve NeoForge leitores.

## Requisitos de instalação

| Carregador | Minecraft | DRM | Java | Integração NPC opcional |
| --- | --- | --- | --- | --- |
| Forge 47+ | 1.20.1 | 0.3.1 | 17 | DNPC ou compatível CustomNPCs |
| Fabric | 1.21.1 | 0.3.1 | 21 | DNPC ou compatível CustomNPCs |
| NeoForge 21.1+ | 1.21.1 | 0.3.1 | 21 | DNPC ou compatível CustomNPCs |

Fabric também requer Loader 0.18.0+ e Fabric API 0.116.11+1.21.1+. Veja [Instalação](#core-fabric/installation) para arquivos e integrações opcionais.

## Mover dados de autoria

Os documentos de autoria usam `config/dochi_rpg_maker`. Os arquivos de servidor fornecem as configurações compartilhadas. O mundo também armazena conexões de NPC e progresso do jogador.

1. Faça backup da configuração e do mundo juntos.
2. Prepare uma instância separada com o carregador de destino DRM e dependências.
3. Carregue cópias de seus documentos personalizados.
4. Verifique se itens, entidades, modelos e animações referenciados existem nesse carregador.
5. Testar diálogo, comprar/vender/reabastecer, buscar recompensas e reconectar persistência.

A orientação de autoria compartilhada não converte automaticamente Minecraft/mod IDs ou CustomNPCs dados do mundo. Os documentos de gerador do núcleo `dochi_rpg_maker:npc_spawner` e do addon separado Spawn Control usam cada um seus próprios caminhos de dados.

## Verifique a conversa migrada em seu NPC

Depois de mover os arquivos, abra o NPC com DRM Core e use **Dialogue JSON → your set → Apply Dialogue**. Esvazie as duas mãos, fale com o NPC real e verifique o texto, escolhas e recompensas.

![Aplicando um diálogo movido definido para um NPC.](assets/media/guides/drm-031-neo1211/npc-apply-result.png "DRM 0.3.1 / NeoForge 1.21.1. village_guide foi selecionado e aplicado; Aplicado JSON à direita mostra a conexão. Encontrar um arquivo e conectá-lo a um NPC são verificações separadas.")

## Controles diretos de missão

Disponível em Fabric e NeoForge com nível de permissão 2.

```text
/drm quest @s pack:quest_id start
/drm quest @s pack:quest_id complete
/drm quest @s pack:quest_id reset
/drm quest @s pack:quest_id objective objective_id complete
/drm quest @s pack:quest_id objective objective_id reset
```

`start` ignora os portões de disponibilidade normais. `complete` forças completando e concede recompensas não reclamadas. Todo o pedido `reset` limpa o progresso e os registros de recompensa; não recupera itens concedidos ou moeda. A redefinição de um objetivo mantém o progresso dos irmãos e recompensa a história.

As missões criadas no editor atual usam a conclusão automática em ambas as carregadores de mods. Ao migrar o JSON mais antigo com `completionMode: turn_in`, Fabric retém o turn-in manual enquanto NeoForge completa automaticamente. Verifique o momento da recompensa ao importar esses dados legados.

Mudanças atuais: [ DRM 0.3.1 ](#core-fabric/release-notes-0-3-1).

Minecraft 26.3 usa compilações Java 25 separadas. Veja [26.3 configuração e exclusões](#core-fabric/minecraft-26-3).
