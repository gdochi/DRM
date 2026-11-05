---
title: Crie sua primeira regra de Spawn natural
slug: dochi-spawn-control-setup
order: 820
description: Escolha uma criatura, suas condições e quantidades, então aplique a regra.
product: dochi-spawn-control
category: Configuração
section: setup
status: Rascunho
version: 0.1.4
audience: Operadores de servidor pela primeira vez
tags:
  - installation
  - first rule
  - permissions
translationSource: en
translationMethod: assisted
---

## Instalar e abrir o editor

Use Spawn Control 0.1.4 para Forge 1.20.1, Fabric/NeoForge 1.21.1 ou o alvo separado 26.3. Corresponder versões de servidor/cliente e carregadores; Fabric também precisa de Fabric API.

Regras comuns de criaturas não exigem outros mods de Dochi. A edição precisa de nível de permissão 2 ou permissão criativa.

Pressione **K**. Se outro mod o usar, altere **Open Spawn Control** nas configurações de chave de Minecraft. Com DRM, você também pode abrir **Spawn Control** do seletor de editores.

## Adicionar uma regra para uma criatura

1. Escolha a criatura na lista da esquerda.
2. Em **Selected target** vista, pressione **Add rule**.
3. Dê-lhe um nome e um único **Profile ID**.
4. Defina dimensões, biomas, tempo e luz. Listas de dimensões/biomas vazias permitem tudo.
5. Escolha **Ground** para criaturas terrestres ou **Water** para criaturas aquáticas.
6. Defina a chance, o intervalo de verificação, o tamanho do grupo e os limites populacionais.
7. Ative a regra e pressione **Save**.

![Condições imediatamente após Adicionar Regra.](assets/media/guides/spawn-control-014-neo1211/spawn-rule.png "Spawn Control 0.1.4 / NeoForge 1.21.1. DNPC 0.1.2. Este exemplo seleciona a entidade DNPC padrão, não um modelo NPC salvo. A nova regra ainda está fora. Selecione seu alvo, configure-o, habilite a regra e salve.")

## Verifique a localização atual

Use **Advanced diagnostics → Check current position** para ver condições fracassadas. **Spawn one mob** cria uma criatura real. Use **Clean spawned entities** para remover desovas de teste.

Criaturas terrestres precisam de terra e espaço adequado; criaturas aquáticas precisam de água suficiente.

## Substitua os filhotes originais

Depois de verificar sua regra, vire **Original spawning OFF** para substituir a geração natural. Deixando-o ligado mantém os filhotes originais também.

## Usar um NPC salvo

Salve-o como um modelo **clone** em DNPC, em seguida, escolha seu nome no catálogo. Veja [template setup](#dochi-spawn-control/spawn-control-npc-templates).

Para um bloco em um local fixo, use um desovador [ colocado](#dochi-spawn-control/dochi-spawn-control-spawner).
