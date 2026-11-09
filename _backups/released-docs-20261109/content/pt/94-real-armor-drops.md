---
title: Configurar drops de armadura na GUI
slug: dochi-real-armor-drops
order: 915
description: Escolha itens, probabilidades e quantidades por armadura no Armor Drop Editor, depois salve e aplique um conjunto.
product: dochi-real-armor
category: Drops de itens
section: drops
status: Estável
version: 0.1.5
audience: Operadores de servidores e criadores de modpacks
tags:
  - armor
  - drops
  - editor
translationSource: en
translationMethod: assisted
---

## Quando os itens caem?

Use o **Armor Drop Editor** do Real Armor 0.1.5 para escolher os drops de cada armadura. O sorteio ocorre quando um NPC recebe um golpe e **a armadura realmente perde durabilidade**, incluindo o último golpe que a quebra. O NPC pode continuar vivo quando os itens caem.

Inicialmente não há regras nem conjuntos ativos. Nas [configurações de armadura](#dochi-real-armor/dochi-real-armor-setup), ative **Enable armor calculation**, a integração do seu NPC e **Damage armor items**, depois equipe o NPC. DRM é opcional; Real Armor oferece seu próprio editor.

## Criar o primeiro drop na GUI

Este exemplo solta **1–3 Iron Nuggets com 100% de probabilidade quando um Iron Chestplate é danificado**.

1. Entre em um mundo e abra **Config → Armor Drop Editor** do Real Armor. Com DRM instalado, também pode escolher **Armor Drop Editor** no seletor compartilhado. A edição multijogador exige nível de permissão 2.
2. Escolha **Create New** para um novo rascunho. **Use Default** também começa vazio; **Load Existing** abre um conjunto salvo.
3. À esquerda, escolha **Armor rules → Add**, pesquise e selecione **Iron Chestplate**, depois pressione **Apply** no seletor de itens.
4. No centro, escolha **Drop items → Add**, pesquise e selecione **Iron Nugget**, depois pressione **Apply** no seletor.
5. Na aba **Drop** à direita, ative **Enable drop**, defina **Drop chance (%)** como **100**, **Minimum quantity** como **1** e **Maximum quantity** como **3**. Mantenha **Enable rule** ativo na aba **Armor**.
6. Use **Save As**, nomeie o conjunto **iron_salvage** e pressione **Save**. Aguarde a confirmação do servidor.
7. Pressione **Apply** no editor para ativar o conjunto. Confira os nomes dos conjuntos editado e aplicado no topo.

![Fluxo real da GUI do Real Armor: adicionar Iron Chestplate e Iron Nugget, preencher probabilidade e quantidade, usar Save As e Apply.](assets/media/guides/armor-drops-015-20261108/armor-drop-editor.mp4 "Exemplo na GUI do Real Armor 0.1.5 / NeoForge 1.21.1. Confirme cada item com Apply no seletor, salve com Save As → Save e ative o conjunto no mundo com Apply no editor.")

O seletor oferece **All items**, categorias criativas e **Player inv**. Use **Player inv** para itens com nome personalizado, encantamentos ou outros dados. A seleção copia os dados sem consumir ou mover a pilha original. **Cancel** cancela essa seleção.

O painel esquerdo contém as regras de armadura; a parte inferior central lista **Item / Chance / Quantity**; o painel direito edita a entrada selecionada. O suporte de armadura central é uma prévia estática e não gera itens no mundo.

## Escolher probabilidades e quantidades

| Configuração | Comportamento |
| --- | --- |
| Drop chance (%) | Probabilidade por item de 0–100%. Zero nunca solta; 100 sempre tem sucesso |
| Minimum / Maximum quantity | No sucesso, escolhe um inteiro uniformemente entre os limites. Ambos vão de 1–64; mínimo ≤ máximo |
| Enable rule / Enable drop | Ativa ou desativa uma regra inteira ou uma entrada de drop |
| Horizontal spread / Upward speed | Dispersão horizontal e velocidade vertical dos itens, cada uma de 0–2 |

Cada drop ativo é sorteado **independentemente**. Com Iron Nuggets a 100% e Emeralds a 25%, os nuggets caem sempre e as esmeraldas têm seu próprio sorteio de 25%. A soma não precisa ser 100%. Uma regra aceita até 16 entradas.

Perder vários pontos de durabilidade em um golpe ainda resulta em um sorteio por entrada e por peça danificada. Se várias peças perderem durabilidade, cada uma tem seu sorteio. O servidor gera itens coletáveis perto do slot afetado, dividindo a quantidade pelo limite nativo de pilha de cada item.

## Separar salvamento, carregamento e aplicação

| Ação | Resultado |
| --- | --- |
| Save / Save As | Salva um conjunto nomeado e mantém as regras atualmente ativas no mundo |
| Load / Load Existing | Abre um conjunto salvo como rascunho sem ativá-lo |
| Apply | Substitui todas as regras ativas do mundo pelo conjunto salvo |
| Unapply | Desativa o conjunto ativo e mantém os conjuntos salvos e o rascunho |

**Somente um conjunto pode estar ativo por mundo.** Aplicar outro substitui as regras anteriores, sem mesclá-las. Salvar com o nome ativo também mantém **o conteúdo anteriormente aplicado até pressionar Apply novamente**. Salve as alterações pendentes antes de aplicar.

A seleção ativa ou o estado desativado permanece após reiniciar o servidor. Falhas de permissão, valores inválidos, conflitos de edição e erros de salvamento preservam as regras anteriores. Leia a mensagem de estado e recarregue o estado atual do servidor antes de revisar o rascunho.

## Armazenamento e solução de problemas

Os arquivos pertencem ao **mundo atual do servidor**. Exemplo para um jogador:

```text
saves/<world>/serverconfig/dochi_real_armor/
  armor_drops.json
  armor_drop_presets/
    iron_salvage.json
```

Em um servidor dedicado, a mesma estrutura fica na pasta do mundo do servidor. Nomes usam 1–64 letras ASCII, números, sublinhados ou hífens. A serialização dos dados de itens depende da versão do Minecraft; confira a compatibilidade antes de mover conjuntos entre versões.

| Sintoma | Verificação |
| --- | --- |
| Salvou, mas nada cai | Confira Apply no editor, nome do conjunto aplicado, interruptores de regra/drop e o item de armadura equipado |
| Golpes não produzem drops | Ative o desgaste e confirme que a durabilidade diminui. Equipamento inquebrável e dano que ignora armadura podem não cumprir a condição |
| Apply indisponível | Salve o rascunho primeiro e aguarde a confirmação do servidor |
| Edição somente leitura | Confira conexão ao mundo, permissões OP, resposta do servidor e suporte à aplicação explícita de conjuntos |
| Nenhum item aparece na prévia | A prévia é estática. Drops reais são gerados no servidor quando a durabilidade diminui |

Acessórios Curios usam seu próprio tratamento de durabilidade. Não os trate como alvos de drops de armadura desta função.
