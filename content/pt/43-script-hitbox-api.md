---
title: API de script do Hitbox
slug: script-hitbox-api
order: 126
description: Use drmHitbox em scripts CustomNPCs para criar volumes de ataque one-shot autoritativos do servidor.
product: core
category: API de script
section: script-api
status: Estável
version: 0.3.1
audience: CustomNPCs autores de roteiros de combate
tags:
  - script
  - customnpcs
  - hitbox
  - combat
translationSource: en
translationMethod: assisted
---

## Veja onde um ataque de um tiro atinge

Verifique as partículas de forma separadamente do dano real. Este exemplo dá uma única vaca a uma esfera centrada no jogador, raio seis, e aplica seis danos uma vez. Mesmo com a mesma vaca listada duas vezes, a contagem de acertos é uma e a saúde muda de 20 Para 14. Para criação de padrões baseados em tela, comece com [BattleWorks primeiro ataque](#mob-editor/battleworks-first-attack).

![Na verdade, veja onde um ataque de um tiro atinge o resultado.](assets/media/guides/drm-031-forge1201-apis/api-hitbox-one-shot.png "DRM 0.3.1 / Forge 1.20.1. Compare partículas brancas de depuração, combinadas -1 / danificadas -1 em bate-papo e saúde da vaca 20→14. Este é um teste de servidor de um tiro contra uma vaca preparada.")

## Primeiros passos

`drmHitbox` é uma API de volume de ataque autoritativa do servidor que avalia uma vez quando chamada. Passe alvos atacantes e candidatos; alvos cujos limites de entidade cruzam a forma solicitada recebem dano.

```js
function slash(attacker, targets) {
    return drmHitbox.arc(
        attacker,
        targets,
        0.0, 1.0, 1.5,
        3.5, 100.0, 2.0,
        8.0,
        false
    );
}
```

O valor de retorno é o número de entidades danificadas com sucesso, não apenas o número que cruzou o volume.

## Atacante e Alvos

- `attacker` pode ser um CustomNPCs wrapper de entidade de script ou a Minecraft entidade viva.
- `targets` pode ser uma entidade viva, um array, uma coleção iterável, ou os valores de um mapa.
- Entidades duplicadas são avaliadas uma vez pela UUID.
- Uma ligação avalia no máximo 256 candidatos únicos.
- O atacante, alvos mortos e alvos em outro nível são ignorados.

`drmHitbox` não procura no mundo ao seu redor. Colete os candidatos no roteiro e passe apenas os alvos desejados. Isso torna possível selecionar jogadores, facções ou qualquer grupo filtrado separadamente antes de aplicar o volume.

## Coordenadas e Formas

`offsetX`, `offsetY` e `offsetZ` são coordenadas locais baseadas na posição dos pés do atacante. Deslocamentos horizontais e orientação de forma giram com a guinada atual do atacante. Um positivo. `offsetZ` coloca o volume na frente do atacante.

| Método | Argumentos de tamanho | Volume |
| --- | --- | --- |
| `box` | `width`, `height`, `depth` | Uma caixa girada com o atacante |
| `rectangle` | `width`, `height`, `depth` | Alias de `box` |
| `sphere` | `radius` | Esfera |
| `circle` | `radius`, `height` | Cilindro horizontal |
| `cylinder` | `radius`, `height` | O mesmo cilindro que `circle` |
| `arc` | `range`, `angleDegrees`, `height` | Setor horizontal voltado para a frente |

Um volume com altura se estende metade acima e metade abaixo do centro selecionado por `offsetY`.

```js
// 3 x 2 x 2 box in front of the attacker
drmHitbox.box(attacker, targets, 0, 1, 2, 3, 2, 2, 6, false);

// Sphere with radius 2.5
drmHitbox.sphere(attacker, targets, 0, 1, 0, 2.5, 4, false);

// 120-degree forward sector
drmHitbox.arc(attacker, targets, 0, 1, 0, 4, 120, 2, 8, false);
```

Dano usa um jogador-ataque ou criatura-ataque fonte atribuída ao atacante.

## Depurar partículas

O argumento final de cada método é `debug`. Quando `true`, DRM desenha o volume e marcadores de alvo danificado com partículas. Um atacante recebe o resumo diretamente; para outro atacante vivo, como um NPC, jogadores dentro de 64 blocos o recebem. O log do servidor registra o mesmo resumo e alvos danificados.

```js
drmHitbox.arc(
    attacker, targets,
    0, 1, 1,
    4, 90, 2,
    8,
    "minecraft:crit",
    true
);
```

Omitindo que o ID da partícula use `minecraft:end_rod`. Um ID de partícula inválida, ou um tipo de partícula que requer dados extras, cai de volta para `minecraft:end_rod` e relata o retorno na saída de depuração.

Não há um renderizador de depuração de linha direta separado. `line` não é um valor especial e é tratado como um ID de partícula não suportado.

:::warning Servidores de produção
O modo de depuração emite partículas de forma, marcadores de hit, mensagens e linhas de log. Ative-o enquanto verifica um volume e deixe-o `false` em roteiros normais de combate.
:::

## Faixas aceitas

| Valor | Faixa aceita |
| --- | --- |
| Cada deslocamento | `-64.0` através de `64.0` |
| Largura, altura, profundidade, raio, alcance | Maior que `0`, até `64.0` |
| ângulo do arco | Maior que `0`, até `360.0` |
| Danos | Maior que `0`, até `2048.0` |

Números não finitos ou fora de alcance e nomes desconhecidos retornam `0` sem causar danos. Quando a depuração está ativada e o atacante é um jogador, DRM também exibe uma mensagem de rejeição de argumento inválido.

## Referência de assinatura completa

Cada forma tem uma sobrecarga de partículas padrão e uma sobrecarga com `debugParticle`. Os suportes abaixo descrevem a posição opcional; não digite os suportes em um script.

```js
drmHitbox.hit(attacker, targets, shape,
    offsetX, offsetY, offsetZ,
    sizeA, sizeB, sizeC,
    damage, [debugParticle], debug);

drmHitbox.box(attacker, targets,
    offsetX, offsetY, offsetZ,
    width, height, depth,
    damage, [debugParticle], debug);

drmHitbox.rectangle(attacker, targets,
    offsetX, offsetY, offsetZ,
    width, height, depth,
    damage, [debugParticle], debug);

drmHitbox.sphere(attacker, targets,
    offsetX, offsetY, offsetZ,
    radius, damage, [debugParticle], debug);

drmHitbox.circle(attacker, targets,
    offsetX, offsetY, offsetZ,
    radius, height, damage, [debugParticle], debug);

drmHitbox.cylinder(attacker, targets,
    offsetX, offsetY, offsetZ,
    radius, height, damage, [debugParticle], debug);

drmHitbox.arc(attacker, targets,
    offsetX, offsetY, offsetZ,
    range, angleDegrees, height,
    damage, [debugParticle], debug);
```

Para genérico `hit`, `sizeA`, `sizeB` e `sizeC`, siga a mesma ordem que os argumentos de tamanho da forma selecionada. Uma esfera usa apenas `sizeA`; um cilindro usa `sizeA` e `sizeB`.
