---
title: Coloque um esquadrão em cada estrutura
slug: spawn-control-guards
order: 841
description: Configure filtros de biomas e estruturas, membros, equipamentos e esperas de reaparecimento.
product: dochi-spawn-control
category: Regras
section: rules
status: Guia
version: 0.1.5
audience: Operadores de servidores e criadores de mapas
translationSource: en
translationMethod: assisted
---

Na 0.1.5, uma regra natural pode reunir vários alvos e quantidades dentro de estruturas existentes. Vale para Forge 1.20.1, Fabric/NeoForge 1.21.1 e 26.3. Criaturas comuns não exigem DRM nem mod de NPC. Modelos DNPC salvos exigem DRM e DNPC; CustomNPCs não está disponível na 26.3.

## 1. Abrir as configurações de local

Pressione **K**, escolha um alvo e use **Add Rule**. No Forge, abra **World → Locations and guard squad → Edit**. No Fabric/NeoForge, role o inspetor até **Locations and guard squad → Edit**.

Esta ferramenta de criação tem abas **Locations** e **Squad and equipment**. **Apply** atualiza o rascunho; depois **Save** no editor principal aplica ao servidor. Cancel ou Escape descarta as alterações desta janela.

## 2. Escolher biomas e estruturas

Use 🔍 em Locations para buscar biomas e estruturas registrados no servidor, incluindo os de mods e datapacks.

| Seleção | Exemplo e significado |
| --- | --- |
| Included biomes | Corresponde a qualquer ID/tag selecionado, como `minecraft:plains` |
| Excluded biomes | Rejeita mesmo quando um seletor incluído corresponde |
| Included structures | Uma instância existente de, por exemplo, `minecraft:pillager_outpost` |
| Excluded structures | Rejeita posições dentro destes limites |
| Tags | Seleciona um grupo registrado com `#namespace:tag` |

Inclusão vazia não limita essa categoria; exclusões têm prioridade. Estruturas usam todos os limites registrados. Isso não reconhece castelos manuais nem gera estruturas. Os chunks candidatos e as informações iniciais da estrutura já devem estar carregados; a regra não força o carregamento.

![Filtros de local e controles de ocupação por estrutura.](assets/media/guides/spawn-control-015-fabric263/guard-locations-en.png "Spawn Control 0.1.5 / Fabric 26.3 / DRM 0.3.1. Tela real em inglês. Included structures mostra Any: ainda não há limite de estrutura ativo.")

## 3. Compor o esquadrão inteiro

Em Squad and equipment, ative **Use squad** e use **Add**. Por exemplo, defina **Member count** como 2 para uma linha de zumbis e 1 para uma de esqueletos: três entidades. Para um NPC salvo, escolha seu modelo exato em vez do EntityType padrão.

O total máximo é 64. **Member spread** vai de 1 a 32 blocos, com padrão 5. O esquadrão usa quantidades por membro em vez de Minimum/Maximum Group. Um sorteio prepara toda a composição; cada membro deve atender posição, colisão, condições e limites antes da inserção conjunta. Falta de espaço ou capacidade faz a tentativa inteira falhar.

Esta função pertence à geração natural. Um gerador colocado continua sorteando alvos individuais na lista de probabilidades. Configure patrulha, facção e IA de combate no mod da criatura ou NPC.

## 4. Ajustar os equipamentos

Selecione um membro e use 🔍 para cabeça, peito, pernas, pés e mãos. O seletor oferece todos os itens e **Player inv** sem consumir o inventário.

**Keep** preserva o equipamento original ou do modelo. Escolher um item configura o espaço. **Clear** o esvazia; ao desligar, restaura o item escolhido ou Keep se não houver seleção. Sem linhas de membros, o lado direito edita o equipamento do alvo base.

![Espaços de equipamento e interruptores Clear separados.](assets/media/guides/spawn-control-015-fabric263/guard-members-en.png "Spawn Control 0.1.5 / Fabric 26.3 / DRM 0.3.1. Configuração de um membro com Clear ligado na cabeça. Não é uma cena de combate ou aplicação concluída de equipamentos.")

## 5. Evitar grupos duplicados

**One group per structure instance** vem ligado e exige uma estrutura incluída. Os jogadores compartilham o local definido por dimensão, regra, tipo de estrutura e chunk inicial. Várias chegadas não duplicam o grupo desta regra. Outras regras têm ocupação independente.

**Respawn delay** começa após remover o último membro próprio; o padrão é 1200 ticks. Perder apenas alguns membros não repõe o esquadrão imediatamente. Descarregar chunks, mudar de dimensão ou atrair guardas para longe não libera o local. Ocupação e esperas persistem nos dados do mundo. Sem estruturas incluídas, esse limite e sua espera não se aplicam.

## 6. Salvar e testar

Aplique, ative a regra e salve. Comece com chance 1 e intervalo de cerca de 200 ticks, com capacidade e espaço para todo o esquadrão. Dimensão, horário, luz e distância continuam valendo. A distância mínima padrão de 24 blocos pode fazer uma verificação aos pés do jogador falhar.

Use **Advanced Diagnostics** para investigar falhas. O teste confirmado cria entidades reais, incluindo todo o esquadrão ativado; Forge chama isso de **Spawn Squad**. Confira limites da estrutura, carregamento, espaço e capacidade antes dos ajustes finais. Veja [condições e limites](#dochi-spawn-control/dochi-spawn-control-rules).

## 7. Levar para outro servidor

O esquema natural é 4; os esquemas 2 e 3 continuam legíveis. Evite salvar novas predefinições em versões antigas do Spawn Control. Forneça os mods dos alvos e itens, além dos modelos DNPC originais. O NBT avançado de itens 1.20.1 e os componentes posteriores não são convertidos automaticamente entre versões.

Faça backup do mundo junto com os JSON para manter ocupação e esperas. Veja [predefinições e operações](#dochi-spawn-control/dochi-spawn-control-presets-operations) para caminhos e escopos de salvamento.
