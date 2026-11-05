---
title: Corte seu NPC salvo
slug: spawn-control-npc-templates
order: 838
description: Use um DNPC salvo em regras naturais ou desovadores colocados.
product: dochi-spawn-control
category: DNPC modelo geração
section: editor
status: Guia
version: 0.1.4
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Espalhe um guarda usando seu capacete salvo.

Este exemplo conecta o modelo DNPC `guide_guard` a um desovador colocado. Precisa de **DNPC and DRM**. A entrada DNPC normal em `Entity` cria um NPC padrão. Escolha **NPC clone template** para reutilizar a aparência e o equipamento que preparou.

Primeiro termine o guarda em DNPC, depois **Save to NPC → Save As → Name: guide_guard → Save**. Veja [salvar modelos NPC](#dochi-npc-core/npc-core-templates) para as duas operações de salvamento diferentes.

## 1. Escolha o NPC salvo

1. Abra **Spawner Editor → Spawn Target**. Reutilizar a entrada inicial; **Add** cria mais entradas quando você quer uma mistura.
2. Mude seu **Source** para **NPC clone template**.
3. Pressione a lupa (**Choose**) ao lado **Entity / Clone** e procure por `guide_guard`.
4. Selecione **NPC [dochi_npc:actor/guide_guard]** e pressione **Select**.

![A entrada salva guide_guard no seletor de modelos NPC.](assets/media/guides/spawn-control-014-neo1211/spawn-npc-template-picker.png "Spawn Control 0.1.4  +  DNPC 0.1.3 / NeoForge 1.21.1. Mesmo quando seu nome de exibição é NPC, o identificador entre colchetes guide_guard distingue esse modelo.")

## 2. Salvar o arquivo do desovador

Ligue **Enabled** e mantenha **Entities per activation** em `1`. Com uma entrada e **Chance** `1.0`, essa entrada tem uma participação de seleção de 100%. Isso não significa que ele gera todos os ticks; tempo e condições são configurações separadas.

Use **Save As**, digite `guide_guard_spawner.json`, depois pressione **Confirm**. Verifique se **JSON file** no topo mostra esse nome.

![O desovador salvo usa o modelo de clone NPC e dochi_npc:actor/guide_guard.](assets/media/guides/spawn-control-014-neo1211/spawn-npc-template-saved.png "Spawn Control 0.1.4 / NeoForge 1.21.1. guide_guard é o NPC original; guide_guard_spawner.json contém suas regras de geração. São arquivos separados.")

## 3. Aplique-o ao desovador do mundo

1. Use **Get Spawner** e coloque o item no mundo.
2. Segure o **DRM Core** e clique com o botão direito no desovador colocado.
3. Selecione ** guide_guard_spawner.json** e pressione **Apply JSON**. A janela fecha depois de aplicar.
4. O padrão **Conditions** requer um jogador próximo e sai **Include creative players** fora. Teste essas configurações em Survival dentro de 16 blocos.

![guide_guard_spawner.json selecionado no spawner de aplicação do desovador colocado JSON janela.](assets/media/guides/spawn-control-014-neo1211/spawn-block-apply.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Save As escreve o documento; Aplicar JSON atualiza este gerador de mundo.")

Seguindo esse fluxo criou um novo NPC e preservou o capacete de ferro original. Ajuste [ tempo, limites e condições de propriedade ](#dochi-spawn-control/dochi-spawn-control-spawner-settings) para reutilizar o mesmo modelo em outros encontros.

![Os originais e gerados NPCs equipados com capacete ao lado do desovador.](assets/media/guides/spawn-control-014-neo1211/spawn-template-runtime.png "Spawn Control 0.1.4  +  DNPC 0.1.3 / NeoForge 1.21.1. Novos NPCs retêm o capacete de ferro salvo. O limite de propriedade padrão é 6, então ativações posteriores podem adicionar mais NPCs.")

## geração natural — 1.20.1 / 1.21.1

Abra o editor com a tecla **K** padrão e encontre o modelo NPC salvo. Use **Add Rule**, defina seu bioma, horas, distâncias e quantidades, habilite-o e economize. O NPC padrão e um modelo salvo são alvos separados. Para 26.3, use o método place-spawner acima.

## Entradas perdidas ou aparência errada

| Problema | Verificar |
| --- | --- |
| Um modelo antigo está faltando | Coloque-o em DNPC, então Save to NPC → Save As sob um novo nome |
| Um arquivo existe, mas está faltando na lista | Verifique o config/dochi_npc_core/templates/ do servidor e a presença de DNPC e DRM |
| Salvar não atualizou um desovador | Abra o gerador do mundo com o Núcleo e aplique JSON novamente. |
| Nada acontece em Criativo | Verifique Incluir jogadores criativos ou teste em Sobrevivência |
| Equipamentos antigos ainda aparecem. | Salvar o NPC original novamente, recarregar seu modelo e reaplicar o desovador |

Spawn Control gerencia a geração repetida de seus NPCs. Seu respawn nativo salvo não corre ao lado dele.
