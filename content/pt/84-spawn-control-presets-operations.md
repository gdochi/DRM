---
title: Predefinições, Compartilhamento e Operações
slug: dochi-spawn-control-presets-operations
order: 850
description: Salve e carregue políticas, caminhos de armazenamento, conflitos de destino, compartilhamento e solução de problemas.
product: dochi-spawn-control
category: Predefinições e Operações
section: operations
status: Guia
version: 0.1.5
audience: Operadores de servidor e distribuidores de conteúdo
tags:
  - presets
  - troubleshooting
translationSource: en
translationMethod: assisted
---

## Salvar comportamento

A tabela a seguir descreve o editor **natural-spawn**. Salvamento e aplicação de spawner são explicados separadamente abaixo.

| Ação | Resultado |
| --- | --- |
| `Save` | Armazene e aplique imediatamente o rascunho como ativo `spawn_control.json` |
| `Save As → Complete Set` | Salve todas as regras, políticas nativas e orçamento global do agendador como um conjunto nomeado e ative-o |
| `Save As → Current Target Preset` | Salve cada perfil para a entidade atual ou clone mais sua política nativa recomendada |
| `Reset` | Retornar à linha de base recebida quando o editor abriu ou foi atualizado pela última vez após salvar |
| `Create New` | Inicie um rascunho de conjunto vazio sem alterar a configuração do servidor ativo até salvar |

Uma predefinição de destino exclui orçamentos globais de agendadores. Isso permite que as regras de uma criatura se movam entre servidores sem substituir o orçamento operacional do servidor de destino.

## Mova apenas as regras da vaca para outro servidor.

Encontre `minecraft:cow` no catálogo natural e use **Add Rule**. Termine suas condições e pressione **Save As** para escolher o escopo.

![O selecionador de escopo Save As oferece conjunto completo e predefinição de alvo atual.](assets/media/guides/spawn-control-014-neo1211/spawn-preset-scope.png "Spawn Control 0.1.4 / NeoForge 1.21.1. O conjunto completo move a configuração do servidor; a predefinição de destino atual move apenas as regras para o alvo de vaca selecionado.")

Escolha **Current Target Preset**, digite **Display Name** `Meadow Cows` e **Stable ID** `meadow_cows`, depois pressione **Save As**. A resposta `Target preset saved. The active set was not changed.` confirma a salvação. **Esta operação não altera as regras ativas do servidor.** Volte para o editor e use o topo **Save** para ativar o rascunho aqui também.

![Salvamento bem-sucedido da predefinição do alvo meadow_cows.](assets/media/guides/spawn-control-014-neo1211/spawn-target-preset-saved.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Os alvos reais...meadow_cowsO arquivo .json foi verificado. A exibição Name marca a lista; a identificação estável identifica o arquivo.")

Coloque o arquivo no servidor de destino `targets/` e selecione-o em **Load → Target Presets**. Use a política de conflito abaixo para substituir as regras de vaca existentes ou mantê-las.

## Caminhos de armazenamento

A criação de documentos ao vivo no diretório `config` compartilhado na pasta de trabalho do jogo ou do servidor. Em singleplayer, este é o diretório `minecraft` da instância, compartilhado por mundos nessa instância. No modo multiplayer, use a pasta do servidor conectado. Os arquivos copiados apenas para o cliente não aparecem na lista de servidores.

```text
config/dochi_rpg_maker/spawn_control/
├─ spawn_control.json
├─ spawn_control.json.bak
├─ sets/
│  └─ <set-id>.json
├─ targets/
│  └─ <target-preset-id>.json
└─ spawners/
   └─ examples/mixed.json
```

A configuração ativa e as predefinições do Natural-spawn usam a substituição de arquivo temporário e mantêm o destino anterior como `.bak`. O Spawner JSON também usa substituição temporária de arquivos, mas não cria um `.bak` automático; faça backup separadamente.

## Salvando e aplicando o gerador JSON

`Save` em `Spawner Editor` salva apenas o documento de autoria. Clique com o botão direito do mouse no desovador colocado com DRM Core, selecione o arquivo salvo e clique em `Apply JSON` para alterar esse desovador. A edição de um arquivo não atualiza automaticamente todos os criadores previamente configurados a partir dele.

Compartilhe JSON de `spawners/` junto com suas dependências. Ele não incorpora clones de servidor CNPC ou modelos DW. Também fornecem mods fornecendo entidades referenciadas, modelos, partículas e sons.

### A lista de arquivos do spawner está vazia

Verifique a pasta `config/dochi_rpg_maker/spawn_control/spawners/` do servidor e clique em `Refresh`. World serverconfig não é o local de criação. Limpar filtros de busca e verificar o JSON para erros.

### Um desovador colocado não corre

Um novo desovador está inativo até JSON ser aplicado. Verificar `Enabled`, condições do jogador e do jogador criativo, tempo, espaço de colocação e tampas de geração. Um mod ou clone ausente exigido por uma entrada de chance positiva pode suspender o desovador. Veja [Condições e efeitos do spawner](#dochi-spawn-control/dochi-spawn-control-spawner-settings).

## Política de carregamento e conflito

Carregar um conjunto completo substitui o conjunto ativo e requer confirmação. Uma predefinição de destino se funde no rascunho não salvo atualmente aberto no editor e requer uma política.

| Política | Comportamento |
| --- | --- |
| `Replace Target` | Remova as regras existentes para o mesmo destino e adicione as regras predefinidas |
| `Merge by ID` | Substituir perfis com o mesmo alvo e ID do perfil; reter os outros |
| `Keep Both` | Retenha as regras existentes e atribua um novo ID exclusivo quando um ID importado entrar em conflito |

A política nativa recomendada pela predefinição pode ser aplicada para entidades registradas, a menos que o Keep Both esteja selecionado. Sempre verifique novamente. `Native: ON/OFF` depois da importação.

## Compartilhamento

Distribua arquivos JSON de `sets/` ou `targets/`. Predefinições de registro necessário mod namespaces em `requiredMods`.

- Uma predefinição EntityType modificada requer o mod que registra esse EntityType.
- Uma predefinição de destino CustomNPCs registra o requisito `customnpcs`, mas não contém dados de clone.
- Distribua um clone de servidor com a mesma guia e nome separadamente.
- Um alvo ausente não exclui o arquivo inteiro; somente o perfil afetado é isolado como desabilitado com um erro.

## Solução de problemas

### A regra de outra entidade aparece sob a entidade selecionada

1. Confirme que a visão do meio é `Selected Target`; `All Configured` intencionalmente lista todos os alvos.
2. Leia o rótulo EntityType ou clone no inspetor para identificar o alvo real da regra selecionada.
3. Se a interface não tem `Selected Target` e `All Configured` botões e ainda mostra o mais velho `Target / + / All / P / Name` Layout, um velho JAR está funcionando.
4. Remova JARs duplicados, instale a mesma compilação atual no cliente e no servidor e reinicie totalmente ambos.

A compilação atual limpa o perfil anterior e o inspetor quando um alvo recém-selecionado não tem regra. Perfis nunca herdam entre alvos.

### Um perfil habilitado não gera

Verifique nesta ordem:

1. Corra! `Advanced Diagnostics → Check Here`.
2. Verifique a dimensão, o tempo, Y, o bioma, a luz e a distância do jogador.
3. Confirme o posicionamento de superfície, caverna, ar ou água para o alvo.
4. Verifique Spawn Chance e Interval Ticks.
5. Verifique o servidor, a dimensão, o bloco, o jogador, o perfil, o alvo e os limites de grupo compartilhado.
6. Confirme se os candidatos estão carregados.
7. Inspecione o log do servidor para uma negação Forge de outro mod.

### Um perfil se desativa

- `MISSING ENTITY`: o mod registrando que EntityType está ausente
- `MISSING CLONE`: a aba/nome salva CustomNPCs não existe
- `CUSTOMNPCS NOT LOADED`: um perfil de clone está ativo sem CustomNPCs
- `ADAPTER REQUIRED OR UNSUPPORTED`: `MISC`, um tipo de entidade em branco CustomNPCs ou um caminho de criação especial
- `RUNTIME ERROR`: ocorreu uma falha isolada no adaptador-alvo

### Criaturas nativas e gerenciadas aparecem com muita frequência.

Verifique se a geração nativa e um perfil gerenciado estão habilitados. Depois que a regra gerenciada for comprovada, salve `Native: OFF` para essa entidade registrada e ajuste seus limites de perfil, destino e servidor.

## Escopo de backup recomendado

- `config/dochi_rpg_maker/spawn_control/`
- o mundo completo salvar
- servidor e listas de versão mod do cliente
- combinando dados de servidor-clone ao usar alvos CustomNPCs

Fazer backup do JSON sozinho não restaura entidades já presentes no mundo ou dados de propriedade de outros mods.

## Integrações de NPCs e veículos na 0.1.5

DRM, DNPC e Warfare são opcionais; CustomNPCs é opcional apenas em 1.20.1/1.21.1. Gerar o DNPC padrão exige a API de atores do DRM; clonar um NPC salvo exige a API provedora de modelos do DRM e seu modelo DNPC. Veja [salvar e gerar veículos](#dochi-spawn-control/spawn-control-vehicles) para os passos de cada veículo.

## Predefinições 0.1.5 e backups do mundo

Documentos naturais usam o esquema 4. Os esquemas 2 e 3 continuam legíveis, mas evite salvar predefinições com novos filtros, esquadrões ou equipamentos em versões antigas do Spawn Control. Forneça os mods dos alvos e itens, além dos modelos DNPC originais. O NBT avançado de itens da 1.20.1 e os componentes posteriores não são convertidos automaticamente entre versões.

A ocupação por estrutura e as esperas ficam nos dados do mundo; faça backup do mundo junto com os JSON. Veja [limites de estruturas](#dochi-spawn-control/spawn-control-guards).
