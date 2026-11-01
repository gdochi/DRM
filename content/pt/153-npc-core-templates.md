---
title: Salvar e reutilizar um NPC
slug: npc-core-templates
order: 1530
description: Mantenha um NPC acabado como modelo, clone-o ou carregue-o em um NPC existente.
product: dochi-npc-core
category: Modelos de clone NPC
section: operations
status: Guia
version: 0.1.3
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Salvar um NPC concluído

1. Abra o NPC e termine sua aparência, equipamento e comportamento.
2. Pressione **Save to NPC**.
3. Pressione **Save As**, digite um distinto **Name** como `guide_guard`, depois pressione **Save**.

![A caixa de diálogo DNPC do editor Save As com o modelo Name, Salvar e Cancelar.](assets/media/guides/dnpc-012-neo1211/dnpc-templates-save.png "DNPC 0.1.2 / NeoForge 1.21.1. Save to NPC atualiza o NPC mundial; Save As mantém um modelo reutilizável.")

Os arquivos são mantidos em `config/dochi_npc_core/templates/`. Use Ctrl+C / Ctrl+V para uma cópia rápida; use um modelo para manter um NPC para mais tarde.

![O NPC equipado com capacete depois de salvar seu modelo, com a resposta salva.](assets/media/guides/dnpc-013-neo1211/dnpc-template-saved.png "DNPC 0.1.3 / NeoForge 1.21.1. Este NPC foi salvo como guide_guard, selecionado em Spawn Control e gerado com seu capacete de ferro preservado.")

## O que é reutilizado?

Modelos reutilizam aparência, equipamentos, inventário, comportamento e configurações de diálogo/loja vinculadas. Novos NPCs começam de novo em vez de herdar uma entrega ativa, passeio ou batalha.

Carregar um modelo em um NPC existente mantém a localização e a carga ativa do NPC. Escolha a operação pretendida: criar um novo NPC ou aplicar configurações a um existente.

## Guardas espancados em vários lugares

Escolha seu NPC salvo de **NPC clone template** em [Spawn Control](#dochi-spawn-control/spawn-control-npc-templates). Use-o para um posto de guarda fixo ou aparições programadas/locais. Essa conexão também precisa de DRM.

Salvar DNPC modelos por si só não requer DRM.

![Os originais e gerados NPCs equipados com capacete ao lado do desovador.](assets/media/guides/spawn-control-014-neo1211/spawn-template-runtime.png "Spawn Control 0.1.4  +  DNPC 0.1.3 / NeoForge 1.21.1. Novos NPCs retêm o capacete de ferro salvo. O limite de propriedade padrão é 6, então ativações posteriores podem adicionar mais NPCs.")

## Um arquivo antigo está faltando na lista

Carregue um modelo somente de configurações ou v2 em um NPC e, em seguida, use **Save to NPC → Save As**. Use um novo nome para manter o arquivo antigo.

Se os modelos editados ainda mostrarem equipamentos antigos, recarregue e aplique novamente o modelo em Spawn Control.
