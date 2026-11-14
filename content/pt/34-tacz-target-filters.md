---
title: Regras do alvo
slug: warfare-target-filters
order: 340
description: Restringir alvos de NPC de armas de fogo por ID da entidade, facção, tag de placar e regras de postura avançadas.
product: dochi-warfare
category: Alvos
section: targets
status: Rascunho
version: 0.3.3
audience: Designers de encontros
tags:
  - target
  - filter
  - faction
translationSource: en
translationMethod: assisted
---

## Escolha quais criaturas atacar

Procure por um alvo como `minecraft:zombie` no topo de **Targets**, então verifique sua linha. **Type / View / Mods** filtre o catálogo; **All / None** selecione ou desmarque as entradas atualmente exibidas.

![Segmenta a lista de entidades com as Condições Selecionadas 0 e Marca abaixo.](assets/media/guides/warfare-031-neo1211/dw-targets.png "DW 0.3.1 / NeoForge 1.21.1. Este exemplo tem zero seleções explícitas. Zero não significa atacar todas as criaturas; a hostilidade e as regras de etiqueta abaixo ainda importam.")

## Por que os alvos precisam de cuidados extras

NPCs de armas de fogo podem atacar mais longe do que a maioria dos NPCs corpo a corpo, então uma regra de alvo errada é imediatamente visível. Crie regras de destino em pequenos passos: primeiro confirme se o NPC pode disparar, depois adicione IDs de entidade, depois tags e, em seguida, comportamento avançado de facção ou postura.

## Lista de destino do ID da entidade

A guia `Targets` pode selecionar IDs de entidade de destino permitidos. A lista inclui pesquisa, somente verificada, somente desmarcada, filtragem de tipo de entidade e filtragem de ID de modificação. Esta é a maneira mais limpa de fazer um ataque de guarda apenas um grupo específico de criaturas ou apenas entidades de um mod específico.

| Controle | Usar |
| --- | --- |
| Pesquisar | Filtre IDs como `minecraft:zombie`. |
| Ver filtro | Mostrar todas, somente as entradas marcadas ou não verificadas. |
| Digite o filtro | Grupos estreitos de entidades vivas. |
| Mod filtro | Mostrar IDs de entidade a partir de IDs de modificação selecionadas. |
| Selecionar tudo / nenhum | Aplique na lista filtrada atualmente visível. |

Uma lista de entidades-alvo vazia significa que não há uma lista de permissões estritas. Um gerenciado CustomNPCs O atirador ainda escaneia para que possa herdar genuíno CustomNPCs hostilidade de facção contra NPCs ou jogadores. O candidato ainda deve corresponder a um seletor explícito, a mesma exceção de tag de facção, ou uma regra de facção hostil real; entidades passivas e não relacionadas não se tornam alvos automáticos.

Pesquisas de longa distância usam um índice espacial antes de aplicar ID da entidade, tag, facção, distância, ângulo e regras de linha de visão. Em 0.2.9, cada alvo recém-descoberto deve passar pelo alcance configurado, linha de visão e ângulo de consciência, mesmo enquanto o NPC já está lutando. Apenas danos válidos, autodefesa, detecção próxima ou reações de defesa de facções podem conceder a exceção documentada; um alvo silencioso por trás do NPC não é adquirido apenas porque o combate está ativo.

## Regras da tag Scoreboard

Regras de tags usam tags do scoreboard da entidade:

| Campo | Comportamento |
| --- | --- |
| Tags necessárias | Se definido, um alvo deve ter pelo menos uma tag necessária. |
| Etiquetas rejeitadas | Se definido, um alvo com qualquer tag rejeitada é rejeitado. |
| Atacar a mesma facção por tag | Permite que a mesma fração CustomNPCs seja atacada quando uma tag necessária corresponder. |

Tags são úteis para eventos roteirizados. Por exemplo, um script de calabouço pode adicionar uma tag `intruder` aos jogadores ou NPCs durante uma fase de alarme e, em seguida, removê-lo após o encontro.

## Facções e posição avançada

Regras de postura avançadas podem usar `Always`, saúde NPC abaixo de uma proporção, facção alvo, tag alvo ou ID da entidade alvo. `Always` e a condição de saúde do NPC pode ser avaliada sem um alvo de combate atual. As condições de facção, tag e entidade de destino exigem um alvo vivo, então adicione as IDs e tags necessárias em `Targets` antes de usá-las de `Stance Mode: Advanced`.

O modo avançado suporta uma regra condicional ativa. Isso mantém o resultado previsível. Use o comportamento `Default` se o NPC voltar às configurações normais `General` quando a condição avançada não corresponder.

## Carregar e Save As perfis

Topbar `Load` e `Save As` perfis são armazenados em:

```text
config/dochi_warfare/target_entities/
```

Perfis atuais não são apenas arquivos de entidades-alvo. Eles funcionam como predefinições de configuração que conectam a configuração de arma de fogo DW de um NPC a outro CustomNPCs NPC. Configure armas, IA, alvos, munição e pools em um NPC, armazene o perfil com `Save As`, depois `Load` em outro NPC. O JSON só pode ser carregado da raiz do legado migrado.

## Exemplos práticos

| Cenário | Regra sugerida |
| --- | --- |
| Guarda zumbi. | Selecione IDs de entidades semelhantes a zumbis na lista de entidades. |
| Fase do evento | Use a tag necessária `phase2_target` e remova a tag quando a fase terminar. |
| Duelo da mesma facção. | Use tags necessárias e habilite a segmentação de tags da mesma facção apenas para os participantes do evento. |
| Chefe anti-adicionar rifle | Permita que apenas as IDs da entidade sejam adicionadas e deixe os jogadores fora da lista. |

## Depurando regras de destino

Se o NPC não disparar, remova filtros temporariamente e teste com um alvo hostil básico. Então adicione uma regra de cada vez. A maioria dos problemas de destino vem da mistura de uma lista de permissões de entidade, tags exigidas, tags rejeitadas e regras de mesma fração antes de confirmar a linha de base.

Um NPC patrulhando não deve descartar imediatamente um alvo vivo depois de uma perda momentânea de visão. Os NPCs gerenciados usam memória de combate curta e a última posição conhecida para sobreviver a uma breve oclusão. A última verificação de linha de visão ainda impede fogo direto através de uma parede durante a janela de memória.
