---
title: Instale e faça sua primeira batalha
slug: cobblemon-editor-setup
order: 510
description: Dê a um NPC um Pokémon e comece uma batalha com o jogador.
product: drm-cobblemon-editor
category: Configuração
section: setup
status: Rascunho
version: Fabric / NeoForge 0.2.9
audience: Operadores de servidor e criadores iniciantes
tags:
  - setup
  - fabric
  - npc
translationSource: en
translationMethod: assisted
---

## Mods necessários

| Item | Versão / escolha |
| --- | --- |
| Minecraft | 1.21.1 / Java 21 |
| Carregador | Fabric ou NeoForge |
| DRM Núcleo | Combinando carregador; este guia foi executado com 0.3.1 |
| Cobblemon | Este guia foi executado com 1.8.4 |
| Cobblemon Editor | Correspondência - carregador 0.2.9 |
| NPC | DNPC ou CustomNPCs |

Combine arquivos de carregador no servidor e nos clientes. Fabric também precisa das versões Loader/API exigidas por DRM e Cobblemon.

## Faça o primeiro treinador

1. Coloque um NPC. Comece com [DNPC](#dochi-npc-core/npc-core-setup) se precisar de um.
2. Clique com o botão direito do ar com **Dochi RPG Maker Core** e abra **Add-on → Cobblemon Editor**.
3. Comece pela equipe inicial ou use **Create New**. Em **Battle Config → General**, habilite **Trainer Battle** e escolha **Battle type → vs Trainer**.
4. Escolha um Pokémon e seu nível abaixo de **Pokemon Party**.
5. Use **Singles** e o gatilho **Interaction**.
6. **Save As** `custom/first_trainer.json`.
7. Clique com o botão direito do mouse no NPC com o DRM Core e escolha ** vs Trainer → seu arquivo → Apply vs Trainer**. Verifique o nome em **APPLIED JSON** à direita.
8. Preparar uma batalha Pokémon Em sua própria equipe, esvazie as duas mãos e fale com o NPC.

![Configurações gerais para um primeiro treinador.](assets/media/guides/cobble-029-neo1211/cobble-config.png "Verifique a Batalha do Treinador e o tipo de batalha em Battle Config → General. Name fonte escolhe o nome do perfil ou o nome NPC aplicado.")

![Arquivo do treinador anexado com sucesso em NPC Apply.](assets/media/guides/cobble-029-neo1211-flow/cobble-trainer-applied.png "Cobblemon Editor 0.2.9, DRM 0.3.1 e DNPC 0.1.3 NeoForge 1.21.1. Aplicando custom/guide_trainer.json colocado guide_trainer sob vs Trainer à direita. Salvar um documento e vincular um NPC são etapas separadas.")

## Batalhe o Pokémon em si

Escolha **Battle type → vs Cobblemon**, em seguida, definir espécies, aparência e nível. Salvar sob um nome diferente e aplicar através de ** vs Cobblemon ** em NPC Apply. Este tipo de Pokemon usa um Pokémon por rodada.

## As mudanças precisam de outra aplicação?

Alterar Pokémon, níveis ou outros conteúdos no mesmo arquivo com **Save** atualiza a próxima interação. Aplicar novamente depois de alterar o nome do arquivo ou a função NPC.

Use `/drm reload` depois de editar arquivos fora do jogo.

## Se a batalha não abrir

| Problema | Verificar |
| --- | --- |
| Editor ausente | DRM, Cobblemon e addon instalado para o mesmo carregador |
| NPC não faz nada. | Treinador habilitado, arquivo salvo aplicado e ambas as mãos vazias |
| Diálogo/loja abre primeiro | Conecte seu diálogo com go_battle ou use outro NPC |
| Erro de jogador-equipe | Uma batalha pronta. Pokémon está na sua equipe. |

Continue com [ equipes, rodadas e recompensas](#drm-cobblemon-editor/cobblemon-trainer-editor).

## Veja o início da batalha
![Escolha batalhar no diálogo aplicado, veja a entrada e entre na batalha real.](assets/media/guides/runtime-videos-20261106/trainer-battle-start.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, inglês. Exemplo preparado: diálogo → go_battle → apresentação → batalha.")

Após abrir a primeira batalha, adicione um objetivo de ginásio com [recompensas de insígnias](#drm-cobblemon-editor/cobblemon-badges).
