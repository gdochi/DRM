---
title: DRM Administração
slug: drm-administration
order: 140
description: Inspecção de dados do jogador e mutações de operador controlado na tela Admin atual.
product: core
category: Operações
section: operations
status: Estável
version: 0.3.1
audience: Operadores de servidor
tags:
  - admin
  - operations
translationSource: en
translationMethod: assisted
---

## Ativar a ferramenta do servidor primeiro

**O arquivo testado DRM 0.3.1 em Forge 1.20.1 tem um problema de abertura.** A aplicação da política abaixo foi bem-sucedida, mas a abertura da tela de inspeção do administrador quebrou o cliente. A inspeção F7 não é um procedimento de trabalho verificado naquele arquivo. As capturas de tela e as operações bem-sucedidas de jogador / tag abaixo são de NeoForge 1.21.1; use o mesmo caminho de configuração depois de obter uma compilação Forge que corrige esse problema.

Uma nova política de servidor começa com DRM Admin **OFF**. F7 não pode abri-lo nesse estado, mesmo para um operador.

1. Junte-se ao mundo ou servidor e clique com o botão direito no ar com DRM Core.
2. Abra **Default Configs → Admin** na parte inferior do seletor de editores.
3. Ligue **Enable DRM Admin** e clique em **Apply**.
4. Espere por **Saved and applied on the server**.
5. Feche as configurações e pressione **F7**. Editar esta política requer nível de permissão do operador 2 ou superior.

![Habilitando DRM Admin e aplicando sua política de servidor.](assets/media/guides/drm-031-neo1211/admin-server-policy.png "DRM 0.3.1 / NeoForge 1.21.1. Aplicar realmente salvo habilitado: true in config/dochi_rpg_maker-admin.json e recebeu o reconhecimento do servidor. Esta política é separada de ativar o atalho de teclado.")

Se o F7 não fizer nada, verifique também as ligações principais de **Keyboard shortcuts → Open DRM Admin** e Minecraft. O arquivo de política do servidor é `config/dochi_rpg_maker-admin.json`, fora da pasta `config/dochi_rpg_maker/`.

## Escolha uma categoria de jogador e dados

Leia os painéis da esquerda para a direita: **Players → Data categories → Data list → Edit tools**. Selecione o jogador primeiro, depois uma categoria como Tags, DRM Quests ou Moeda. Clicar em uma linha de dados abre os detalhes à direita.

![O jogador selecionado em DRM Admin Overview.](assets/media/guides/drm-031-neo1211/admin-overview.png "DRM 0.3.1 / NeoForge 1.21.1. Este é o único jogador de documentação DocsGuide. Facções, missões FTB, batalhas de formadores e dados armazenados estão indisponíveis porque suas integrações estão ausentes neste ambiente.")

**Checkboxes mark mutation targets**; a linha azul selecionada escolhe os detalhes que estão sendo vistos. Eliminações em lote e resets agem em entradas verificadas. Verifique os resultados da pesquisa e o jogador antes de selecionar todos.

## Verifique um registro de presente único

Se a [ conversa de recompensa única](#core/dialogue-rewards) mostrar o estado de presente errado, encontre `welcome_received` na do jogador **Tags**. Sua presença significa que a condição de reivindicação é atendida. Remover a etiqueta para outro teste não leva de volta maçãs concedidas anteriormente. Nenhum dado em um novo jogador significa que ainda não existem tags. Insira um nome em Marca para adicionar e clique em Adicionar para criar um; verifique uma marca existente antes de excluí-la.

![welcome_received adicionado através de DRM Admin e confirmado pelo servidor.](assets/media/guides/drm-031-neo1211/admin-tag-added.png "DRM 0.3.1 / NeoForge 1.21.1. Inserindo welcome_received em Marca para adicionar e clicando em Adicionar criado esta linha. Servidor confirmado e a tag do jogador do servidor real foi verificada. Apagar está desativado porque a linha não está marcada.")

## Redefinição de estado versus edição de conteúdo

| Tarefa | Ferramenta ou efeito |
| --- | --- |
| Alterar diálogo, produtos, objetivos ou recompensas | Editar e aplicar o documento em seu editor de autoria |
| Inspecionar tags, saldos ou estado de missão | Selecione o jogador e a categoria em DRM Admin |
| Redefinir uma missão | Muda o progresso; não recupera automaticamente itens ou dinheiro concedidos |
| Mudar FTB Quests progresso | Pode afetar a equipe do jogador. |
| Alterar DNPC relações amigáveis / hostis | Use DNPC relacionamentos; estes diferem de CustomNPCs Facções aqui |

CustomNPCs Facções e dados armazenados aplicam-se a alvos mais antigos suportados Minecraft. CustomNPCs está excluído em 26.3.

## 0.2.8 administração

Mudanças em lote mostram progresso. Ligado. Fabric / NeoForge, um compatível Cobblemon O editor registra a inspeção de progresso do treinador e a contagem de vitórias. Essas ferramentas exigem o addon. No addon atual, redefinindo a contagem de batalha também descodificar um NPC pós-batalha escondida. Verifique o jogador alvo, NPC e redefinir o escopo.

## Delete trainer battle history — 0.2.9

Use isso com um editor compatível Cobblemon em Fabric/NeoForge 1.21.1. Selecione o jogador e os registros em Batalhas de Treinadores e escolha **Delete battle history**.

- **Reset battle count** retém marcadores de recompensa e história.
- **Delete battle history** remove todo o registro de ID de progresso do jogador selecionado, incluindo contagens, último resultado, ID de batalha, marcadores de recompensa e recompensas pendentes. Recompensas pendentes podem ser perdidas e recompensas reivindicadas anteriormente podem se tornar reivindicadas novamente.

Leia a confirmação antes de se inscrever. Batalhas ativas ou reservas de treinador rejeitam a exclusão. Os alvos off-line usam o fluxo de trabalho de operação em fila existente. Complementos sem exclusão de histórico deixam esse botão indisponível; a redefinição de contagem permanece disponível.

`Unknown trainer` ou ClearCount 0 não estabelece um registro órfão: o NPC pode ser descarregado, dados históricos de identidade podem estar faltando, ou o histórico pode permanecer após uma reset de contagem. Não há limpeza automática. Revise as identificações permanentemente aposentadas manualmente. Esta operação não exclui entidades NPC ou treinador JSON.
