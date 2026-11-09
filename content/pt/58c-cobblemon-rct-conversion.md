---
title: Converta treinadores RCT para DNPC
slug: cobblemon-rct-conversion
order: 582
product: drm-cobblemon-editor
section: trainer
category: Trainer Conversion
status: Usage guide
version: Fabric / NeoForge 0.2.9
description: Escolha a IA original RCT ou DRM e diferencie criação, substituição e exportação.
translationSource: en
translationMethod: assisted
---

## O que a conversão faz?
O Cobblemon Editor 0.2.9 lê os dados ativos de **Radical Cobblemon Trainers** do servidor e os converte em treinadores DNPC ou perfis editáveis. RCT é opcional para criar treinadores comuns. Manter a IA original exige uma RCT API compatível; criar ou substituir entidades DNPC também exige DNPC.

## Abra a conversão
1. Abra **Add-on → Cobblemon Editor** no DRM.
2. Pressione **Port Radical Trainers** para abrir **Radical Trainer Porting**.
3. Busque por nome ou ID e marque os treinadores. A lista usa datapacks ativos do servidor e tem paginação.
4. Escolha **Battle AI** e **Conversion target** antes de converter. Comece com um treinador para comparar o resultado.

## Escolha a IA
| Opção | Resultado |
| --- | --- |
| **Keep original RCT AI** | Mantém a IA, a bolsa de itens e as regras RCT originais. É o padrão. |
| **Convert to DRM AI** | Usa a equipe e os itens importados com as decisões e políticas da IA DRM. |

O comportamento RCT preservado é separado das políticas de itens e mecânicas do DRM Strategy. Veja [IA e itens](#drm-cobblemon-editor/cobblemon-trainer-ai-party-items).

## Escolha criação, substituição ou arquivos
| **Conversion target** | Uso |
| --- | --- |
| **Create DNPC trainers** | Cria DNPCs próximos com skins padrão, até 64 por operação. |
| **Replace matching RCT NPCs within 64 blocks** | Substitui NPCs RCT a até 64 blocos cujo ID coincide com a seleção. Ignora NPCs em batalha e outros casos inelegíveis. |
| **Save trainer profiles only** | Salva JSON sem criar ou substituir entidades. |

Os perfis ficam em **config/dochi_rpg_maker/cobblemon/trainers/radical_ported/**. Antes de substituir um NPC, o tipo original, a dimensão e o NBT são salvos em **config/dochi_rpg_maker/cobblemon/rct_conversion_backups/**. É um registro original, não uma interface de desfazer automaticamente.

## Confira o resultado
Confira as contagens de sucesso e falha e o nome, equipe, itens equipados e IA do novo NPC. Altere a aparência no [editor de NPC](#dochi-npc-core/npc-core-editor). Para exportação de perfil, continue com NPC Apply em [primeiro treinador](#drm-cobblemon-editor/cobblemon-editor-setup).

Se faltar um treinador, confira os datapacks ativos. Se manter a IA RCT for recusado, instale uma API compatível ou escolha DRM. Etapas verificadas no código; o ambiente de gravação não tinha RCT, portanto não há vídeo de conversão RCT concluída.
