---
title: CustomNPCs Integração de condição de dados armazenados
slug: script-stored-data-conditions
order: 128
description: Leia player, entidade de contexto e mundo CustomNPCs Dados armazenados a partir de DRM condições, com configuração completa e exemplos de script.
product: core
category: API de script
section: script-api
status: Estável
version: 0.3.1
audience: CustomNPCs script e DRM autores de condição
tags:
  - script
  - customnpcs
  - storeddata
  - condition
translationSource: en
translationMethod: assisted
---

## Use um estágio de missão salva como uma condição de diálogo

Use isso para gravar a missão do jogador no estágio três e permitir uma escolha apenas para o estágio três ou superior. Decida a chave e o número primeiro, depois digite a mesma chave no editor de condição. Para uma simples recompensa única, a recompensa de diálogo baseada em [tag](#core/dialogue-rewards) é outro fluxo de trabalho disponível.

![Use um estágio de missão salva como resultado de uma condição de diálogo.](assets/media/guides/drm-031-forge1201-apis/api-stored-condition.png "DRM 0.3.1 / Forge 1.20.1 com CustomNPCs. O Jogador Real Armazenado Dados my_pack.quest.stage ? 3 passa Número / ? 3. A aparência de zumbi vem do exemplo anterior; esta condição lê o valor do jogador.")

## O que essa integração faz

A condição `cnpc_stored_data` permite DRM ler valores escritos através da API de script CustomNPCs `getStoreddata()`. Um script pode gravar um estágio de missão, fase de chefe ou capítulo mundial, então DRM pode usar esse valor para controlar o diálogo, teletransportes, disponibilidade de missão e Mensagens Remanescentes.

Essa integração é ** somente leitura**. DRM lê e compara um valor, mas nunca cria, muda ou remove. Use CustomNPCs métodos de script como `put` e `remove` para alterar os dados.

```text
CustomNPCs script writes a value
        ↓
Player / context entity / world Stored Data
        ↓
DRM cnpc_stored_data condition reads and compares it
        ↓
Dialogue route, choice, teleporter, or quest availability is decided
```

:::warning Mod obrigatório
CustomNPCs deve ser carregado no servidor para que esta condição seja avaliada. Se o mod ou sua API de script não estiver disponível, a condição falhará fechada e retornará silenciosamente `false`.
:::

## Início rápido

### 1. Escreva um valor de um script CustomNPCs

Adicione isso ao script `Interact` de um NPC. Clicando no NPC armazena o número `3` no jogador.

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.quest.stage", 3);
    event.player.message("Quest stage changed to 3.");
}
```

### 2. Adicionar uma condição DRM

Adicione `CustomNPCs Stored Data` em um editor de condição DRM e insira esses valores.

| Campo | Valor |
| --- | --- |
| Tipo | `CustomNPCs Stored Data` |
| Escopo | `Player` |
| Chave | `my_pack.quest.stage` |
| Operador | `>=` |
| Tipo de valor | `Number` |
| Valor esperado | `3` |

A condição agora só passa quando `my_pack.quest.stage` pode ser lido como um número maior ou igual a `3`.

:::note Entradas do editor e JSON
Digite apenas `3` em Valor Esperado. Você não precisa digitar citações JSON ou um fragmento como `"value": "3"`. Os exemplos JSON mais tarde são referências para edição manual de arquivos e desenvolvimento de addon.
:::

## Editores e contexto suportados

Selecione `CustomNPCs Stored Data` no editor de condição compartilhada.

| Característica | Localização típica | `Player` | `Context Entity` | `World` |
| --- | --- | --- | --- | --- |
| Diálogo | Node, comece a rota e escolha Condições | Sim. | Sim, diálogo atual NPC | Sim. |
| Teletransporte | Condições de Interação e Condições de Acesso de destino | Sim. | Sim, teletransporte NPC | Sim. |
| Quest | Disponibilidade → Condições Adicionais → Condições | Sim. | Somente quando esse caminho de avaliação tem um contexto NPC | Sim. |
| Remnant Message | Usar Condições e Condições de Mensagem | Sim. | Não; os caminhos de tempo de execução atuais não passam por uma entidade de contexto | Sim. |

Cuidado com `Context Entity` em missões. Verificações de missão orientadas por NPC podem fornecer um NPC, enquanto atualizações automáticas, comandos e verificações de antecedentes podem ser executadas sem um. Use `Player` ou `World` quando o resultado deve ser consistente em cada caminho de avaliação.

## Campos de Condição

### Escopo

`Scope` seleciona o objeto cujos dados armazenados são lidos.

| Valor do Editor | JSON Value | Proprietário de dados | Acesso de script correspondente |
| --- | --- | --- | --- |
| Jogador | `player` | Jogador sendo avaliado | `event.player.getStoreddata()` |
| Entidade de Contexto | `context_entity` | Entidade passada com a condição, normalmente o NPC atual | `event.npc.getStoreddata()` |
| Mundo | `world` | Servidor do mundo que o jogador avaliado ocupa atualmente | `event.player.getWorld().getStoreddata()` ou `event.npc.getWorld().getStoreddata()` |

Os dados armazenados no mundo são específicos da dimensão. Não assuma que um valor escrito no Overworld se refere ao mesmo proprietário de dados no Nether. DRM lê a corrente do jogador avaliado `ServerLevel`.

### Chave

A Chave deve corresponder exatamente à corda usada com `put`, incluindo letras.

```js
event.player.getStoreddata().put("my_pack.quest.stage", 3);
```

A correspondência DRM A chave é:

```text
my_pack.quest.stage
```

Uma Chave em branco sempre falha. Prefixe chaves para evitar colisões entre pacotes de scripts.

```text
my_pack.quest.stage
my_pack.boss.defeated
my_pack.dialogue.blacksmith_intro
```

### Operador

| Operador | Significado | Valor Esperado Necessário |
| --- | --- | --- |
| `exists` | Passe quando a chave existir | Não. |
| `not_exists` | Passe quando os dados armazenados foram alcançados com sucesso e a chave está ausente | Não. |
| `==` | Passe quando os valores reais e esperados são iguais | Sim. |
| `!=` | Passe quando os valores reais e esperados diferem | Sim. |
| `>` | O número real é maior do que o esperado | Sim. |
| `>=` | O número real é maior ou igual ao esperado | Sim. |
| `<` | O número real é menor do que o esperado | Sim. |
| `<=` | O número real é menor ou igual ao esperado | Sim. |

Selecionar `exists` ou `not_exists` oculta o tipo de valor e o valor esperado porque apenas a presença da chave está marcada.

### Tipo de valor

| Tipo de valor | Regra | Uso recomendado |
| --- | --- | --- |
| Auto | Um `Number` real usa a comparação numérica; uma string real usa a comparação de strings | Uso geral quando o tipo armazenado é confiável |
| String | Comparação exata e sensível a casos; suporta apenas `==` e `!=` | Nomes de estado, IDs, bandeiras |
| Número | Converte um número ou cadeia numérica em um duplo finito antes de comparar | Etapas, pontuações, contadores, temporizadores |

A comparação de cordas é sensível a casos: `READY` e `ready` são diferentes. A ordem das cordas com `>`, `>=`, `<` ou `<=` não passa.

O modo Number aceita um valor numérico ou texto numérico como `"3.5"`. Texto em branco, `abc`, `NaN`, e infinito são inválidos e falham.

:::warning Booleanos e objetos complexos
O comparador atualmente suporta `Number` e valores de string. Booleano, array, mapa e outros objetos complexos podem ser verificados com `exists`, mas as comparações de valores falham. Armazene bandeiras como `1`/`0` ou `"yes"`/`"no"` quando elas precisam ser comparadas.
:::

## Receitas de script

### Armazene um estágio de missão do jogador

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.quest.stage", 3);
}
```

DRM condição:

```text
Scope: Player
Key: my_pack.quest.stage
Operator: >=
Value Type: Number
Expected Value: 3
```

### Armazenar um estado de string

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.quest.state", "ready");
}
```

DRM condição:

```text
Scope: Player
Key: my_pack.quest.state
Operator: ==
Value Type: String
Expected Value: ready
```

### Verifique apenas se existe um valor

```js
function interact(event) {
    event.player.getStoreddata().put("my_pack.intro.seen", 1);
}
```

Use `not_exists` para jogadores que não viram a introdução e `exists` para jogadores que viram. Não insira um Valor Esperado para nenhum operador.

### Armazene uma fase de chefe NPC

```js
function init(event) {
    event.npc.getStoreddata().put("my_pack.boss.phase", 1);
}

function damaged(event) {
    if (event.npc.getHealth() <= event.npc.getMaxHealth() * 0.5) {
        event.npc.getStoreddata().put("my_pack.boss.phase", 2);
    }
}
```

Use esta condição no diálogo ou um teletransporte ligado ao NPC:

```text
Scope: Context Entity
Key: my_pack.boss.phase
Operator: >=
Value Type: Number
Expected Value: 2
```

Este exemplo não passa na avaliação automática de missões ou Remnant Message caminhos que não têm entidade de contexto.

### Armazene um capítulo do mundo compartilhado

```js
function interact(event) {
    event.npc.getWorld().getStoreddata().put("my_pack.world.chapter", "chapter_2");
}
```

DRM condição:

```text
Scope: World
Key: my_pack.world.chapter
Operator: ==
Value Type: String
Expected Value: chapter_2
```

Cada jogador nesse mesmo mundo compartilha esse valor.

### Incrementar um valor numérico com segurança

```js
function interact(event) {
    var data = event.player.getStoreddata();
    var current = data.has("my_pack.kill.count")
        ? Number(data.get("my_pack.kill.count"))
        : 0;

    if (!isFinite(current)) {
        current = 0;
    }

    data.put("my_pack.kill.count", current + 1);
}
```

Use `Value Type: Number`, `Operator: >=` e `Expected Value: 10` para verificar dez ou mais contagens.

### Remover ou redefinir uma chave

```js
function interact(event) {
    event.player.getStoreddata().remove("my_pack.quest.stage");
}
```

Após a remoção, `not_exists` passa enquanto `exists` e todas as comparações de valores falham. Definir um valor para `0` não é o mesmo que remover sua chave.

### Exibir um valor para depuração

```js
function interact(event) {
    var data = event.player.getStoreddata();
    var key = "my_pack.quest.stage";
    var value = data.has(key) ? String(data.get(key)) : "<missing>";
    event.player.message(key + " = " + value);
}
```

## Exemplo completo: Desbloquear uma opção de diálogo

O objetivo é mostrar uma escolha de diálogo do gatekeeper somente depois que o jogador receber permissão de outro NPC.

### script NPC de permissão

```js
function interact(event) {
    var data = event.player.getStoreddata();
    data.put("my_pack.gate.permission", "granted");
    event.player.message("You received permission to pass the gate.");
}
```

### Condição de escolha de diálogo do Gatekeeper

```text
Type: CustomNPCs Stored Data
Scope: Player
Key: my_pack.gate.permission
Operator: ==
Value Type: String
Expected Value: granted
```

Anexe esta condição a uma escolha `Ask to open the gate`. Só permitiam que os jogadores vissem. Anexe a mesma condição às Condições de Acesso de um destino de Teletransporte quando o movimento real também deve ser protegido.

## Combinando condições

Os modos de grupo de condições funcionam da seguinte forma.

| Modo | Resultado |
| --- | --- |
| E | Todas as condições devem ser `true` |
| OR | Pelo menos uma condição deve ser `true` |

Para exigir o estágio de missão 3 e um gancho tripwire usado como chave, coloque uma condição de dados armazenados e uma condição de item em um grupo.

```text
AND
├─ CustomNPCs Stored Data: my_pack.quest.stage >= 3
└─ Item: minecraft:tripwire_hook >= 1
```

Um grupo de condição deficiente não é aplicado. A Quest salva o estado habilitado e o modo AND/OR em `Availability → Additional Conditions`, então verifique se o grupo não foi desativado.

## Referência do campo JSON

Usuários normais do editor não precisam escrever este JSON. Use-o para desenvolvimento de addon, inspeção de arquivos ou recuperação manual.

```json
{
  "type": "cnpc_stored_data",
  "scope": "player",
  "key": "my_pack.quest.stage",
  "op": ">=",
  "valueType": "number",
  "value": "3"
}
```

| Campo | Necessário | Valores permitidos / Significado |
| --- | --- | --- |
| `type` | Sim. | Deve ser `cnpc_stored_data` |
| `scope` | Sim. | `player`, `context_entity` ou `world` |
| `key` | Sim. | Chave de dados armazenada não em branco |
| `op` | Sim. | `exists`, `not_exists`, `==`, `!=`, `>`, `>=`, `<`, `<=` |
| `valueType` | Para comparação de valores | `auto`, `string` ou `number` |
| `value` | Para comparação de valores | Valor esperado do editor |

### Array de condições de diálogo

```json
{
  "conditionMode": "and",
  "conditions": [
    {
      "type": "cnpc_stored_data",
      "scope": "player",
      "key": "my_pack.quest.stage",
      "op": ">=",
      "valueType": "number",
      "value": "3"
    }
  ]
}
```

### Grupo de condição do teletransporte

```json
{
  "interactionConditions": {
    "enabled": true,
    "conditionMode": "and",
    "conditions": [
      {
        "type": "cnpc_stored_data",
        "scope": "player",
        "key": "my_pack.gate.permission",
        "op": "==",
        "valueType": "string",
        "value": "granted"
      }
    ]
  }
}
```

As condições específicas do destino usam a mesma estrutura de grupo no `accessConditions` desse destino.

### Condições de pré-requisito da missão

```json
{
  "prerequisites": {
    "conditionsEnabled": true,
    "conditionMode": "and",
    "conditions": [
      {
        "type": "cnpc_stored_data",
        "scope": "player",
        "key": "my_pack.quest.stage",
        "op": ">=",
        "valueType": "number",
        "value": "3"
      }
    ]
  }
}
```

## Migrando o Legado `stored` Tipo

A velha condição DRM `stored` foi removida. A lista de condições e o novo JSON usam apenas `cnpc_stored_data`.

Se um diálogo existente, busca, teletransporte, ou Remnant Message JSON ainda contém `"type": "stored"`, DRM lê-lo como um pseudônimo legado de `cnpc_stored_data`. Salvando esse arquivo através do editor de condição canoniza `type` a `cnpc_stored_data`. DRM não lê mais uma loja de valor de tempo de execução legada separada.

JSON mais antigo pode não conter Escopo ou Tipo de Valor. Nesse caso, os padrões são `scope: "player"` e `valueType: "auto"`; os existentes `key`, `op` e `value` permanecem em uso. Selecione `CustomNPCs Stored Data` para cada nova condição.

## Regras Fechadas

A condição é de autoridade do servidor. Configuração inválida e falhas de mod opcional não concedem acesso acidentalmente.

| Situação | Resultado |
| --- | --- |
| A chave existe após o acesso bem-sucedido | `exists` é `true`; `not_exists` é `false` |
| Os dados armazenados estão acessíveis, mas a chave está ausente | Apenas `not_exists` é `true` |
| CustomNPCs está faltando | Cada operador retorna `false` |
| CustomNPCs API de script não está disponível | Cada operador retorna `false` |
| `Context Entity` é selecionado, mas nenhuma entidade foi fornecida | Cada operador retorna `false` |
| Escopo, operador ou tipo de valor desconhecidos | `false` |
| Chave em branco | `false` |
| A conversão numérica falha | `false` |
| O valor real é booleano ou um objeto complexo | Comparações de valor retornam `false` |

Uma API CustomNPCs indisponível é intencionalmente diferente de uma chave ausente. Portanto `not_exists` não passa acidentalmente durante uma falha de integração.

## Solução de problemas

### A condição sempre falha.

Verifique o seguinte em ordem.

1. Confirme que CustomNPCs está carregado no servidor.
2. Confirme que Tipo é `CustomNPCs Stored Data`. Re-salvar velho `stored` JSON para canonizar o tipo.
3. Combine Escopo com o objeto usado pelo script.
4. Verifique o caso chave, pontuação, sublinhados e espaço em branco.
5. Para comparação numérica, use Número e verifique se o valor armazenado é numérico.
6. Para Entidade de Contexto, verifique se o recurso atual e o caminho de execução fornecem um contexto NPC.
7. Imprima o valor real de um script de depuração CustomNPCs.

### Arquivo de registro

Ao resolver ou ler a API de integração CustomNPCs lança uma exceção, DRM registra cada assinatura de falha única uma vez para evitar spam de log.

```text
config/dochi_rpg_maker/debug.log
```

Procure por:

```text
CustomNPCs Stored Data access failed
```

Uma chave normalmente ausente ou uma comparação comum `false` não é registrada como um erro.

### Erros comuns

| Erro | Corrigir |
| --- | --- |
| O script grava os dados do jogador, mas o escopo é mundo | Alterar Escopo para Jogador |
| O script escreve numérico `3` e a condição compara String `03` | Comparar Número `3` ou padronizar o formato armazenado |
| O script escreve `ready` mas a condição espera `READY` | Caso de carta correspondente |
| Remnant Message usa Entidade de Contexto | Usar Jogador ou Mundo |
| A chave está definida para `0` e `not_exists` é esperada | Ligue para `remove(key)` para excluir a Chave |
| Booleano `true` é comparado com `==` | Armazene um número ou string como `1` ou `"true"` |

## Convenções Recomendadas

- Prefixe chaves como `pack_id.system.field` para evitar colisões.
- Armazene estágios e contadores como números; armazene nomes de estados e IDs como strings.
- Mantenha um tipo de valor para cada chave em todos os scripts que a escrevem.
- Prefira Jogador ou Mundo quando uma condição deve funcionar em cada caminho de avaliação.
- Lembre-se que um valor mundial é compartilhado por todos os jogadores nessa dimensão.
- Prefira o DRM editor de condições sobre edição manual do JSON.
