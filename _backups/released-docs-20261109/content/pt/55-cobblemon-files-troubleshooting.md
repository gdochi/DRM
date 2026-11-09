---
title: Caminhos de arquivo e solução de problemas
slug: cobblemon-files-troubleshooting
order: 550
description: Encontre arquivos JSON adicionais, proteja padrões, entenda a prioridade de interação com NPC e execute verificações de liberação.
product: drm-cobblemon-editor
category: Operações
section: operations
status: Rascunho
version: Fabric / NeoForge 0.2.9
audience: Operadores de servidor e editores de conteúdo
tags:
  - paths
  - troubleshooting
  - release
translationSource: en
translationMethod: assisted
---


## Verifique primeiro o arquivo salvo e a ligação NPC

**Save As armazena um arquivo de servidor; NPC Apply atribui um papel a um NPC mundial.** Se o arquivo existir, mas o NPC não for alterado, verifique sua função selecionada e o caminho de origem. Aplique Treinadores através de [NPC Apply vs Treinador](#drm-cobblemon-editor/cobblemon-trainer-editor); papéis como Starter Selector fornecem seu próprio botão Aplicar ao NPC.

![Seletor de partida salvo como custom/village_starters.json.](assets/media/guides/cobble-029-neo1211/cobble-starter-save.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1. O arquivo atual à esquerda e salvo abaixo confirma o arquivo salvo. Isso pertence a starter_selectors, um domínio diferente dos arquivos do Trainer.")

## Salvar o mapa do caminho

Todo o JSON editado por servidor começa em `config/dochi_rpg_maker`.

| Caminho | Conteúdo |
| --- | --- |
| `cobblemon/trainers/` | Equipes de treinamento, rodadas, encontros, condições e recompensas |
| `cobblemon/pokemon_itself/` | Batalhas single-Pokémon e aparência NPC |
| `cobblemon/battle_presentations/` | Apresentações de cronograma pré-batalha |
| `cobblemon/pokemarts/` | Documentos de vendas, comércio e leilão |
| `cobblemon/nurse_joy/` | Enfermeira Joy documentos |
| `cobblemon/starter_selectors/` | Documentos do seletor de partida |
| `cobblemon/entity_clones/` | Addon Clone Library loja de compatibilidade |
| `npc_spawner/entity_clones/` | DRM Core NPC Spawner loja de clones |
| `gui/` | Layouts de PokéMart e Starter Selector no jogo |
| `cobblemon/_migration_backups/` | Backups feitos quando padrões canônicos são atualizados com segurança |

`Save As` aceita um caminho relativo dentro do domínio atual. Salvar o caminho do treinador `custom/gym/leader.json` cria:

```text
config/dochi_rpg_maker/cobblemon/trainers/custom/gym/leader.json
```

## Defaults e amostras

O primeiro lançamento instala amostras de treinamento e encontro, equipes campeãs, amostras de Pokémon em si, predefinições de apresentação de batalha e amostras, amostras de papel do PokéMart e GUIs de tempo de execução específicas.

Arquivos ausentes são instalados sem substituir o conteúdo do usuário. Um padrão canônico conhecido é atualizado somente quando seu hash atual corresponde exatamente a uma versão antiga intocada reconhecida. Antes da substituição, o addon cria:

```text
config/dochi_rpg_maker/cobblemon/_migration_backups/canonical_defaults_<timestamp>/
```

:::warning Manter o conteúdo do usuário separado
Os padrões e as amostras são pontos de partida. Salve o conteúdo do projeto em um caminho de usuário como `custom/` para que as atualizações do addon e o conteúdo criado permaneçam claramente separados.
:::

## Prioridade do botão direito do NPC

A interação normal de tempo de execução usa um clique com o botão direito da mão enquanto ambas as mãos estão vazias.

| Prioridade | Função anexada | Resultado |
| --- | --- | --- |
| 1 | DRM Diálogo ou DRM NPC Shop | O DRM diálogo ou loja possui a interação |
| 2 | PokéMart | Abre a tela do PokéMart no jogo |
| 3 | Treinador ou Pokémon em si | Abre a confirmação da batalha |
| 4 | Nenhum papel extra | Passa para outra interação mod ou normal CustomNPCs |

Um item principal ou outra ferramenta de configuração mantém seu próprio caminho de edição, para que não abra o prompt de batalha. Esvazie a mão principal e a mão durante testes de tempo de execução.

## Problemas comuns

### O arquivo salvo, mas o NPC não mudou

Treinador baseado em arquivos, Pokemon em si, PokéMart, Enfermeira Joy e Starter Selector rastreiam seu caminho JSON original. Confirme se o NPC está vinculado ao arquivo que você editou e abra uma nova solicitação de tempo de execução. Use `/drm reload` depois de editar arquivos fora do jogo. Aplicar novamente ao alterar o caminho ou o papel de origem.

### O arquivo está faltando no Load

- Combine o domínio do editor atual com a pasta real.
- Os treinadores pertencem a `trainers/`; os próprios documentos de Pokémon pertencem a `pokemon_itself/`.
- Confirme se o arquivo tem uma extensão `.json`.
- Se os arquivos foram editados fora do jogo, use o fluxo de trabalho de recarga do DRM ou reinicie o servidor com segurança.

### Interação com a mão vazia não abre uma batalha

- Esvazie as duas mãos.
- Confirme que os dados do Treinador ou do próprio Pokemon são aplicados ao NPC.
- Verifique se DRM Diálogo, DRM NPC Shop, ou PokéMart possui a interação primeiro.
- Confirme se o jogador ainda não está em um Cobblemon batalha.
- Confirme que a batalha de outro jogador não reservou o NPC.

### Visão ou Raio não aciona

- Jogadores criativos e espectadores são excluídos da detecção automática.
- Confirme que o gatilho ainda não está `Interaction`.
- Verifique a distância da visão, ângulo de visão, raio e linha de visão.
- Verifique as condições de rodada, limites de revanche e recarga.
- Verifique a distância e duração do Chase Max.
- A Distância Máxima compara as posições atuais do NPC e do jogador-alvo em todos os ticks do servidor; o ponto de origem capturado é usado apenas pelo Retorno para Casa e Posicionamento de Batalha.

### Uma apresentação de batalha não carrega

- Use um caminho relativo a `battle_presentations/`.
- Mantenha os IDs da camada únicos.
- Use Minecraft IDs de recursos válidos para texturas e sons.
- Mantenha o Tique Iniciar em ou abaixo do Tique Final e ambos dentro da Duração.

### O pagamento do PokéMart falha.

- Combine o Provedor de Moedas com a moeda mod ou DRM instalada.
- Instale o CobbleDollars antes de usar `cobbledollars`.
- Para moeda do item, ID do item de correspondência e NBT opcional exatamente.
- Verifique se as Condições de Interação bloqueiam o acesso.

## Lista de verificação de pré-lançamento

1. Inicie um servidor e uma instância de cliente limpa sem erros de dependência.
2. Confirme padrões e amostras instaladas em uma nova configuração.
3. Salve, aplique, entre e termine uma batalha de Treinador e uma batalha de Pokemon.
4. Teste Interação, Visão e Raio com um jogador do modo Sobrevivência.
5. Depois de ganhar, perder e fugir, verifique a aparência do NPC, posição, som e jogador Pokémon estado restaurar corretamente.
6. Teste a reprodução da apresentação, pular, música de batalha, pequena escala de GUI e diferentes proporções.
7. Teste vendas, comércio e leilão antes e depois de uma reinicialização do servidor.
8. Inclua o usuário JSON e `_migration_backups` na política de backup do servidor.
9. Confirme a liberação JAR é `dochi_cobblemon_editor-0.2.6-fabric-1.21.1.jar` ou `dochi_cobblemon_editor-0.2.6-neoforge-1.21.1.jar` para o carregador selecionado; o ID mod interno permanece `cobble_npc`.

## Identidade do treinador e backups de missões

`cobblemon/trainer_registry.json` e `cobblemon/trainer_registry.initialized` preservar a identidade do treinador. Faça backup deles com perfis de treinador, pacotes de missões e progresso de jogadores do mundo. Corresponder nomes de arquivos ou nomes de exibição NPC por si só não identifica o mesmo treinador.

O atual codec Treinador/Pokemon em si usa esquema 23. Documentos mais antigos carregam através da conversão de compatibilidade; documentos sem uma identidade começam desvinculados. Vincule a identidade no editor em vez de alterar manualmente apenas o número do esquema.

## Verificando dados de inventário copiados

Depois de copiar de `My Inventory`, salve e recarregue o treinador e verifique o nome do item e os dados personalizados. Se uma edição de quantidade parece perder esses detalhes, verifique se você criou uma entrada de ID de item simples, em vez disso, selecione a pilha original novamente. Uma cópia rejeitada para dados inválidos ou grandes não é adicionada ao documento.
