---
title: Referência JSON de ordens táticas
slug: expanded-tactical-json
order: 334
description: Exemplo JSON completo, IDs de arquivos, comandos de recarga/distribuição e limites de configuração.
product: dochi-warfare-expanded
category: Apoio ao combate
section: support
status: Guide
version: 0.3.3
audience: Administradores e autores de integrações
translationSource: en
translationMethod: assisted
---

## Antes de editar arquivos

Comece pelo [guia da GUI de ordens táticas](#dochi-warfare-expanded/expanded-tactical-orders) para criação comum. Esta página é referência para edição direta dos arquivos do servidor. Crie o apoio com o [tutorial da linha do tempo](#dochi-warfare-expanded/expanded-support-timeline).

## Exemplo de arquivo completo

Salve este arquivo completo em **config/dochi_warfare/vehicle_ai/tactical_orders/tutorial_air_support.json**. O ID é **tutorial_air_support**, igual ao nome do arquivo. Ele vincula o gimmick incluído de ataque preciso; esse gimmick e SuperbWarfare precisam estar disponíveis. O arquivo separado não substitui uma tática padrão instalada automaticamente.

```json
{
  "schema": "dochi.warfare.tactical_order.v1",
  "id": "tutorial_air_support",
  "enabled": true,
  "name": "Tutorial air support",
  "description": "Request precision support at the designated point.",
  "gimmick": "sample_a10_point_strike",
  "appearance": {
    "default": "ww2_radio",
    "allowed": [
      "ww2_radio",
      "rugged_tablet"
    ]
  },
  "targeting": {
    "mode": "ground_point",
    "max_distance": 128,
    "require_line_of_sight": true,
    "heading": "caller_yaw"
  },
  "activation": {
    "hold_ticks": 20,
    "consume_self": 1,
    "allow_movement": true
  },
  "limits": {
    "cooldown_group": "air_support",
    "cooldown_ticks": 1200,
    "max_active_per_player": 1,
    "allowed_dimensions": [
      "minecraft:overworld"
    ]
  },
  "hud": {
    "bar_style": "horizontal",
    "guide_color": "#68D0DE",
    "bar_color": "#21AA41"
  },
  "sounds": {
    "rugged_tablet": {
      "cast": {
        "id": "minecraft:block.note_block.pling",
        "volume": 0.27,
        "pitch": 1.33,
        "loop": false
      }
    }
  }
}
```

## Recarregar e distribuir itens

Execute os comandos com permissão nível 2. Confira o resultado da recarga antes de distribuir. O primeiro give entrega um item com aparência padrão; o segundo entrega dois tablets. Siga o [guia de mira do jogador](#dochi-warfare-expanded/expanded-tactical-orders) para usá-los.

```text
/dw tactical reload
/dw tactical give @s tutorial_air_support
/dw tactical give @s tutorial_air_support rugged_tablet 2
```

## Valores aceitos e limites

Um ID contém 1–64 letras minúsculas, dígitos, sublinhados ou hífens e começa com letra minúscula ou dígito. Extensões, separadores de caminho e nomes reservados do Windows são rejeitados. O catálogo permite até 256 arquivos; cada um até 32 KiB. Nome/ID diferentes ou campos desconhecidos são rejeitados.

Os tempos pressupõem 20 TPS. Valores válidos ainda precisam de veículos/armas compatíveis, terreno carregado e rota válida.

| Campo | Valores aceitos e significado |
| --- | --- |
| `schema` | Exatamente dochi.warfare.tactical_order.v1 |
| `id` | ID igual ao nome do arquivo JSON |
| `gimmick` | ID da linha do tempo salva, sem extensão |
| `targeting.mode` | Somente ground_point |
| `targeting.max_distance` | 8–512 blocos |
| `targeting.heading` | Somente caller_yaw; direção no fim do tempo de uso |
| `activation.hold_ticks` | Inteiro de 1–200 ticks, 0,05–10 segundos |
| `activation.consume_self` | Sempre 1; consome um na aceitação até no Criativo |
| `activation.allow_movement` | true permite movimento durante o uso |
| `limits.cooldown_group` | Táticas do grupo compartilham recarga por jogador |
| `limits.cooldown_ticks` | Inteiro de 0–72000 ticks, até uma hora |
| `limits.max_active_per_player` | Inteiro de 1–8; vale para todos os pedidos táticos ativos do jogador |
| `limits.allowed_dimensions` | Lista não vazia com 1–32 IDs explícitos de dimensão |

## Configurações de HUD e som

A orientação é horizontal ou vertical. As cores usam #RRGGBB opaco, sem canal alfa. Omitir hud usa a barra vertical e as cores padrão.

sounds configura equip/use/cast/fail para ww2_radio ou rugged_tablet. O exemplo altera só o som de aceitação do tablet; os demais mantêm os padrões. Volume: 0–1; pitch: 0,5–2. Somente use pode repetir. id vazio ou volume 0 silencia o evento. O ID aponta para uma definição registrada num pacote de recursos, não um caminho OGG ou URL.

Para desativar um padrão incluído, salve enabled como false. Excluir pode restaurá-lo na próxima inicialização. Use outro ID para personalizações e preserve os originais.
