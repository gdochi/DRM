---
title: Crie e conceda insígnias e troféus
slug: cobblemon-badges
order: 580
product: drm-cobblemon-editor
section: trainer
category: Badges and Trophies
status: Usage guide
version: Fabric / NeoForge 0.2.9
description: Salve um conjunto, conceda uma insígnia e confira a coleção do jogador.
translationSource: en
translationMethod: assisted
---

## Ative as insígnias
Incluído no Cobblemon Editor **0.2.9 / Fabric·NeoForge 1.21.1**. Nas configurações do DRM, ative **Badges → Enable badges**. Apenas operadores podem alterar isso; em um mundo novo fica OFF. Depois, atribua uma tecla a **Badge Case** em Controls ou abra com **/badges**.

## Acompanhe o primeiro vídeo
O vídeo começa com uma cópia do conjunto de exemplo. Renomeia o conjunto para **Meadow League**, a insígnia para **Meadow Badge** e salva no servidor real.

![Renomeie o conjunto e a insígnia, depois salve.](assets/media/guides/cobble-release-20261109/badge-create.mp4 "Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 · Cobblemon 1.8.4 / NeoForge 1.21.1, interface em inglês. Edição e salvamento reais. As insígnias foram ativadas antes da gravação.")

1. Abra **Add-on → Badge Editor** no DRM ou use **/badges edit** como operador.
2. Escolha um exemplo em **Select Set** e faça uma cópia em **Save Set As Copy**. Isso cria novos IDs; não abre um campo de nome de arquivo.
3. Em **Basic**, mude **Set Name** para **Meadow League** e **Name** da insígnia para **Meadow Badge**. **Add Count → Add** adiciona entradas.
4. Escolha **Badge** ou **Trophy**. A busca de **Front Texture** seleciona um recurso DRM. Verso vazio reutiliza a frente.
5. Confira a descrição e **Enabled**, depois pressione **Save**. Renomear mantém a identidade; copiar ou criar gera outros IDs.

## Conceda e confira a coleção
Use permissão de operador nível 2 ou superior. O último argumento é o nome da insígnia; Tab sugere nomes e IDs. Para nomes repetidos, use o ID único.

```mcfunction
/drm badge give @s Meadow Badge
/badges
/drm badge take @s Meadow Badge
```

Para troféus, use **/drm trophy give** e **/drm trophy take**. Selecione **Meadow League** na coleção. Conceder novamente uma insígnia já possuída não aumenta a quantidade.

![Definições salvas de Meadow League no editor.](assets/media/guides/cobble-release-20261109/badge-editor-saved.png "A tela confirma a definição salva. Confira a posse do jogador separadamente com /badges.")

## Vincule recompensas, diálogos e missões
Em **Battle Config → After Actions**, adicione **Badge** ou **Trophy** e busque a entrada salva. Restrinja o resultado à vitória para uma insígnia de vitória. Para conceder após o diálogo, coloque-o primeiro no modo **Sequential**.

As ações de diálogo também permitem buscar alvos para conceder e remover. **Badge owned / Trophy owned** verifica a posse; **Badge count** conta insígnias no conjunto; **Badge set complete** verifica todas as obrigatórias. Troféus não entram na contagem. Defina as obrigatórias com **Required for Completion**. Um conjunto sem insígnias obrigatórias não passa na condição de conclusão.

Na missão, selecione o objetivo de aquisição de insígnia e seu alvo. Uma insígnia já possuída não gera nova aquisição. Veja [ações após a batalha](#drm-cobblemon-editor/cobblemon-conditions-rewards-pokemon).

## Apresentações e dados salvos
Configure os avisos e animações em [apresentações e GUI da coleção](#drm-cobblemon-editor/cobblemon-badge-presentations).

As definições ficam em **config/dochi_rpg_maker/cobblemon/badges/catalog.json**; a opção do mundo em **serverconfig/cobble_npc/badges.json**. A posse fica separada nos dados dos jogadores do mundo. Copiar definições não transfere a posse. Faça backup de definições, apresentações, texturas e dados de jogadores juntos. Se uma exclusão for bloqueada por referências, altere antes as recompensas e condições vinculadas.
