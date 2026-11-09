---
title: Condições, Depois de Ações e Pokemon em si
slug: cobblemon-conditions-rewards-pokemon
order: 522
description: Entenda as condições redondas, os resultados baseados em ações, o comportamento de repetição e o próprio Pokémon.
product: drm-cobblemon-editor
category: Cobblemon Editor
section: trainer
status: Rascunho
version: Fabric / NeoForge 0.2.9
audience: Criadores construindo batalhas condicionais e Pokémon NPCs
tags:
  - conditions
  - rewards
  - pokemon-itself
translationSource: en
translationMethod: assisted
---

## Selecione a rodada antes das condições ou recompensas

Em **Battle Config → Conditions**, verifique o número redondo acima da lista e use **Add**. **All (AND)** requer todas as condições do grupo.

![Redondo 1 Condições e Tudo E.](assets/media/guides/cobble-029-neo1211/cobble-conditions.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1, IU Inglês. Verifique a edição novamente depois de trocar de rodada.")

![Depois de Ações com modo Ação e Política de Execução.](assets/media/guides/cobble-029-neo1211/cobble-after-actions.png "Modo de ação controla a ordem de execução; A política de execução controla a repetição. Para recompensas após a conversa, altere o padrão All para Sequential e coloque recompensas após o diálogo.")

## Diálogo sequencial e recompensas

Defina o Modo de Ação do Editor de Treinador como Sequencial para aguardar a conclusão do diálogo antes das recompensas subsequentes. Cada rodada permite um diálogo. O cancelamento ou a desconexão param as concessões posteriores; depois de reconectar ou reiniciar, interaja com a NPC novamente para continuar as ações restantes. Veja o [etapas de configuração](#drm-cobblemon-editor/cobblemon-trainer-editor).

## Quando as condições correm

Uma rodada suporta até 32 condições. Um grupo vazio passa. `AND` requer todas as condições, enquanto `OR` requer pelo menos uma.

O servidor avalia as condições enquanto adquire um alvo automático e novamente imediatamente antes do início da batalha real. Itens ou tags alterados durante a reprodução da apresentação podem, portanto, cancelar a inicialização.

## Comportamento de condição exata

| Tipo | Chave | Valor | Operações |
| --- | --- | --- | --- |
| `tag` | Marca de placar | Não usado | `has`, `not` |
| `item` | ID do item | Quantidade | `has`, `not`, `>=`, `<=`, `==`, `!=`, `>`, `<`; conta itens correspondentes em todo o inventário |
| `stored` | chave de dados armazenados | Valor de comparação | Comparação numérica se ambos os valores forem analisados como números, caso contrário string `==` ou `!=` |
| `advancement` | ID de avanço | Não usado | `has`, `not` com base na conclusão |
| `cobblemon_party` | Espécie | Quantidade | Conta a espécie na equipe ativa; `cobblemon:` pode ser omitido |

Item `has` significa pelo menos um e `not` significa zero. O item NBT não faz parte dessa contagem de condições do treinador.

:::note Valores armazenados
`stored` tem como alvo o CustomNPCs tempo de execução de dados armazenados orientado a scripts usado pelo DRM suporte de diálogo. Não é um leitor de caminho JSON arbitrário.
:::

## Após a ordem de seleção Ação

Uma rodada suporta até 32 Após Ações. Cada ação pode ser executada em `win`, `loss`, `flee` ou `battle_end`; ações que compartilham um resultado correspondente podem ser executadas juntas.

1. Verifique a Política de Subvenção contra o progresso do jogador.
2. Role a chance de cada recompensa de forma independente.
3. `All` executa todas as recompensas elegíveis; `One random` escolhe uma recompensa elegível.
4. Se pelo menos uma recompensa for bem-sucedida, registre a rodada como recompensada quando a política precisar desse estado.

| Política | Comportamento |
| --- | --- |
| `Every clear` | Tenta ações correspondentes após cada resultado de batalha |
| `First clear only` | Só enquanto o NPC contagem clara é zero |
| `Once per round` | Um registro de concessão bem-sucedido por rodada |

A chance varia de 0.0 a 1.0. Em `One random`, somente as entradas que passaram pelo Chance participam da seleção.

## Após a execução da ação

| Tipo | Operações | Comportamento do servidor |
| --- | --- | --- |
| `item` | `give`, `take` | Quantidade 1–6400. `take` é transacional e não remove nada a menos que o valor total exista. O excesso de `give` cai no jogador. |
| `tag` | `add`, `remove` | Muda as tags do placar. |
| `stored` | `set`, `add`, `subtract`, `remove` | Define uma cadeia de caracteres, executa alterações numéricas ou exclui a chave armazenada. |
| `command` | `run` | Executa silenciosamente no nível de permissão do servidor 4; as barras principais são removidas. |
| `advancement` | `grant`, `revoke` | Muda apenas o avanço nomeado. |
| `currency` | `add`, `take`, `set` | Muda o saldo selecionado DRM ou CobbleDollars. Quantidades inválidas ou negativas falham; zero é permitido para `set`. CobbleDollars requer seu provedor opcional. |
| `cobblemon_give` | `give` | Cria a espécie selecionada no nível 1–100 e a adiciona à equipe ativa. |
| `ftb_complete_quest` / `ftb_complete_task` | `complete` | Completa a FTB Quest ou Task selecionada quando o FTB Quests estiver instalado. |
| `npc_hide` / `npc_despawn` | — | Esconde ou remove o NPC depois que ações ordinárias forem bem sucedidas. |

Comandos suportam substituições `{player}`, `{uuid}`, `{npc}` e `{battle}`. Teste todos os comandos em um servidor de teste porque ele é executado com autoridade elevada do servidor.

## Linhas de condição prática

| Objetivo | Tipo | Operação | Chave | Valor |
| --- | --- | --- | --- | --- |
| Exigir uma etiqueta de distintivo | `tag` | `has` | `badge_boulder` | Em branco |
| Exigir 16 esmeraldas | `item` | `>=` | `minecraft:emerald` | `16` |
| Exigir um Pikachu em equipe | `cobblemon_party` | `>=` | `cobblemon:pikachu` | `1` |
| Exigir um avanço inacabado | `advancement` | `not` | ID de avanço | Em branco |

Grupos são planos. Para representar `(A AND B) OR C`, pré-compute uma tag ou valor armazenado em vez de esperar grupos aninhados.

## Pokemon próprio comportamento

Pokemon em si usa um completo Pokémon por rodada em vez de uma equipe de treinamento. Ele suporta as mesmas condições de rodada e os controles After Actions baseados em resultados; IA, inventário e gimmick apenas para treinadores estão desativados.

- Tempo de execução é um único-oponente Cobblemon Batalha PVE.
- A apresentação padrão é `presets/vs_pokemon.json`.
- Espécie, forma, aspectos, estado brilhante, nível, natureza, habilidade, movimentos, bola e item mantido definem o oponente.
- A escala de aparência é 0.05–12.0; o padrão pose é `AUTO`; a animação em branco usa o estado automático.
- `Shiny` é Pokémon dados, enquanto `Shining` é um destaque NPC-render separado.

Aplicando Pokemon em si também deriva o CustomNPCs Pokémon aparência de espécies mais forma/aspectos. Mantenha as alterações de aparência final no próprio documento Pokemon para que uma reaplicação posterior não restaure inesperadamente valores mais antigos.

## Sequência de compilação recomendada

1. Mude apenas espécies e níveis no padrão e verifique a criação da batalha.
2. Adicione Forma e Aspectos, depois compare o modelo mundial e o modelo de batalha.
3. Bloqueie a natureza, a habilidade, os movimentos e o item mantido.
4. Escala de Sintonização, Pose, Animação e Brilho.
5. Atribua uma apresentação personalizada e salve. Um NPC rastreando esse caminho de origem normalmente não precisa reaplicar.

## Moeda Após Ações

Para `currency`, escolha DRM moeda ou CobbleDollars e uma operação: `add`, `take` ou `set`. `set` substitui o saldo e pode defini-lo como zero. Quantidades inválidas/negativas e provedores indisponíveis falham. CobbleDollars é opcional e suas recompensas não podem ser executadas sem o provedor.

## Recompensas e confiscos de itens personalizados

Abra Após Ações → Item → Encontre, escolha Itens ou Meu Inventário. Copiar preserva nomes, conhecimentos, encantamentos, danos e dados personalizados sem consumir a pilha original. Quantidade de prêmio vem da ação. Limpar os dados do item salvo remove os componentes, mantendo o ID do item e a quantidade.

A remoção consciente de componentes corresponde tanto à identificação quanto aos componentes e não consome parcialmente um total insuficiente. O campo JSON opcional é itemComponentsSnbt. Uma derrota confirmada do treinador após a derrota do jogador é fugir. Uma derrota comum permanece perdida. Configure os gatilhos de recompensa separadamente.

## Pós-batalha DRM diálogo

Escolha **Open dialogue after battle** em After Actions e procure por um conjunto de diálogos. Configure as condições de resultado, probabilidade e repetição como com outras ações. DNPC Treinadores apoiam esse caminho depois que a batalha trava e retornam ao final. O diálogo não precisa de `go_battle`. Ações não executadas usam o armazenamento de ação pendente existente e o fluxo de trabalho de repetição.
