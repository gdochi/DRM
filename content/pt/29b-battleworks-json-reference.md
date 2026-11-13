---
title: Combata a referência JSON e a amostra completa (avançada)
slug: battleworks-json-reference
order: 285
description: Copie um exemplo completo e verifique campos, referências, tempo e limites.
product: mob-editor
section: reference
category: BattleWorks
status: Referência
version: 0.1.7
audience: Criadores editando JSON diretamente
tags:
  - battleworks
  - json
translationSource: en
translationMethod: assisted
---

## Leia isso ao editar JSON diretamente

Iniciantes podem seguir o [Exercício de editor](#mob-editor/battleworks-first-attack) sem memorizar o esquema. Esta página é para inspecionar ou modificar arquivos externos.

Baixe o [amostra de combate completa](./assets/media/battleworks/training_swordsman.json) e [amostra de partículas](./assets/media/battleworks/training_ring.json). Eles usam esquemas e pastas diferentes.

![Um primeiro ataque salvo através do BattleWorks tela.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Salve um padrão no editor primeiro, depois compare seu arquivo e campos. Entrar no JSON completo abaixo não é necessário para começar.")

Para uma curta salva nativa com dano verificado DNPC, use o download first_sword em [primeiro ataque](#mob-editor/battleworks-first-attack). Continue com o [Exercício de chefe](#mob-editor/battleworks-encounters) por duas fases.

## 1. Campos de nível superior

| Campo | Propósito |
| --- | --- |
| schema | dochi.battleworks.v1 para combate |
| id / displayName / ativado | Identidade, nome de exibição, tempo de execução ativar bandeira |
| combate | Supressão de ataque / script, mirando, esperando, BGM |
| npcStats | Atributo de combate opcional substitui; desabilitado por padrão |
| gerente | Seleção ordinária, repetição, combos, ritmo |
| fases | Fases de saúde e ligações de transição |
| hitboxes | Geometria reutilizável |
| padrões | Condições, pontuação, etapas, eventos, combos |
| morte | Cronologia da morte |
| autoria | Notas de criador preservadas |
| drmNpcModel | DRM snapshot de modelo aplicado a um NPC real |
| previewNpcModel / previewTexture | Dados de visualização separada |
| particleEffects | Dados de compatibilidade de efeitos em linha mais antigos |

Novo trabalho de partículas deve usar uma referência separada particleFile. Prepare o nome, equipamentos, facções, gotas e respawn no editor pertencente ao seu NPC: DNPCO próprio editor ou o legado suportado CustomNPCs editor. Importado npcStats pode substituir comportamentos de saúde/velocidade/regeneração selecionados. Preservar dados desconhecidos e instantâneos de modelo opacos ao editar documentos existentes.

## 2. Aplique a amostra

1. Salve o objeto completo abaixo ou baixe-o.
2. Coloque em config/dochi_rpg_maker/mobs/patterns/training/training_swordsman.json.
3. Prepare um humanoide normal. DNPC ou legado suportado CustomNPCs Ator, uma espada e estatísticas básicas.
4. Carregue e verifique a validação.
5. Aplicar e testar em Survival.

A amostra não precisa de feitiço opcional ou provedor de animação. O balanço principal tem como alvo humanóides normais, não Gecko ou modelos de entidades modificadas. A verificação de fallback está ativada neste exemplo. Depois de editar no Creative, mude para o Survival para verificar a aquisição de alvos, visibilidade, alcance e ataques reais.

## 3. Documento de combate completo

Este é um objeto JSON completo sem comentários ou omissões. O dano 4 está configurado antes das defesas.

```json
{
  "schema": "dochi.battleworks.v1",
  "id": "training_swordsman",
  "displayName": "Training Swordsman",
  "enabled": true,
  "description": "BattleWorks 0.1.6 teaching sample. Normal humanoid DNPC or supported legacy actor; fallback target scanning enabled.",
  "combat": {
    "suppressNativeAttacks": true,
    "suppressCustomNpcScripts": false,
    "engageDelayMin": 10,
    "engageDelayMax": 18,
    "combatResetDelayTicks": 100,
    "retryDelayTicks": 10,
    "targeting": {
      "scanWhenNoTarget": true,
      "scanRange": 16,
      "requireLineOfSight": true,
      "fovDegrees": 360,
      "chaseTarget": true,
      "faceTarget": true,
      "chaseSpeed": 1,
      "preferredDistance": 2
    },
    "parry": {
      "mode": "off",
      "magicProjectileDeflect": false,
      "betterCombatMelee": false
    },
    "bgm": {
      "enabled": false,
      "soundId": "",
      "volume": 0.7,
      "pitch": 1
    }
  },
  "manager": {
    "globalCooldownTicks": 0,
    "maxCombo": 0,
    "selectionFloor": 0.65,
    "samePatternPenalty": 1,
    "recentPatternPenalty": 1,
    "sameRolePenalty": 1,
    "randomFactor": 0,
    "stationaryChainPenalty": 1,
    "recoveryMin": 8,
    "recoveryMax": 14
  },
  "phases": [
    {
      "index": 1,
      "id": "phase_1",
      "name": "Training",
      "enabled": true,
      "enterAtHealthRatio": 1,
      "transitionPatternId": ""
    }
  ],
  "hitboxes": [
    {
      "id": "training_sweep",
      "name": "Training Sweep",
      "shape": "sweep",
      "damage": 4,
      "radius": 2.4,
      "width": 1.5,
      "height": 1.8,
      "depth": 1.5,
      "thickness": 0.5,
      "yaw": 0,
      "pitch": 0,
      "offsetX": 0,
      "offsetY": 0,
      "offsetZ": 0,
      "sweepSteps": 6,
      "arcStartYaw": 90,
      "arcStartPitch": 20,
      "arcEndYaw": -90,
      "arcEndPitch": -20,
      "lockedTargetOnly": true,
      "effectId": "",
      "points": []
    }
  ],
  "patterns": [
    {
      "id": "basic_slash",
      "name": "Basic Slash",
      "enabled": true,
      "role": "melee",
      "trigger": {
        "type": "manager"
      },
      "priority": 10,
      "minPhase": 1,
      "maxPhase": 16,
      "minDistance": 0,
      "maxDistance": 2.7,
      "maxVertical": 2.5,
      "minBossHealth": 0,
      "maxBossHealth": 1,
      "minTargetHealth": 0,
      "maxTargetHealth": 1,
      "requiresLineOfSight": true,
      "targetRequired": true,
      "mobility": false,
      "stationary": true,
      "cooldownTicks": 40,
      "recoveryTicks": 8,
      "score": {
        "base": 10,
        "idealDistance": 2,
        "distancePeak": 0
      },
      "windup": {
        "id": "windup",
        "ticks": 24,
        "faceTarget": true,
        "stopHorizontal": true,
        "movement": {
          "type": "hold",
          "speed": 0
        },
        "animation": {
          "explicitSelection": true,
          "provider": "none",
          "id": "",
          "playback": "once",
          "speed": 1,
          "fadeTicks": 0
        },
        "events": []
      },
      "action": {
        "id": "action",
        "ticks": 16,
        "faceTarget": true,
        "stopHorizontal": true,
        "movement": {
          "type": "hold",
          "speed": 0
        },
        "animation": {
          "explicitSelection": true,
          "provider": "vanilla_swing",
          "id": "main_hand",
          "playback": "once",
          "speed": 1,
          "fadeTicks": 0
        },
        "events": [
          {
            "id": "strike",
            "at": 3,
            "interval": 0,
            "count": 1,
            "chancePercent": 100,
            "actions": [
              {
                "type": "dochi_battleworks:hitbox",
                "chancePercent": 100,
                "params": {
                  "hitboxId": "training_sweep",
                  "damageMultiplier": 1,
                  "knockback": 0.2,
                  "hitPolicy": "once_per_pattern"
                }
              },
              {
                "type": "dochi_battleworks:sound",
                "chancePercent": 100,
                "params": {
                  "soundId": "minecraft:entity.player.attack.sweep",
                  "volume": 1,
                  "pitch": 1
                }
              }
            ]
          }
        ]
      },
      "recovery": {
        "id": "recovery",
        "ticks": 24,
        "faceTarget": true,
        "stopHorizontal": true,
        "movement": {
          "type": "hold",
          "speed": 0
        },
        "animation": {
          "explicitSelection": true,
          "provider": "none",
          "id": "",
          "playback": "once",
          "speed": 1,
          "fadeTicks": 0
        },
        "events": []
      },
      "combos": []
    }
  ],
  "death": {
    "enabled": false,
    "durationTicks": 40,
    "lockCorpse": true,
    "events": []
  }
}
```

## 4. Primeiros valores a editar

| Caminho JSON | Mudar |
| --- | --- |
| patterns[0].windup.ticks | Comprimento da preparação |
| patterns[0].action.events0].at | Tempo de contato dentro de Action |
| patterns[0].recovery.ticks | Duração do estágio de recuperação |
| padrões0].cooldownTicks | Reutilizar após a conclusão |
| padrões0].minDistance / maxDistance | Intervalo de início horizontal |
| hitboxes[0].damage | Danos compartilhados |
| hitboxes[0].radius / espessura | Alcance da varredura e raio do tubo |
| Combat. Targeting.preferredDistance | Espaçamento entre padrões |

Alterar um valor, salvar, reaplicar e comparar. O índice de matriz 0 significa a primeira entrada.

## 5. Validar referências e tempo

1. Cada hitboxId deve resolver para um hitbox.
2. Combo patternId e transitionPatternId deve resolver padrões.
3. Passivos não podem possuir combos ou ser destinos de combo/transição.
4. Mantenha IDs exclusivos; IDs de eventos também devem ser únicos em seu estágio.
5. O evento deve estar dentro do palco.
6. Exigir `at + interval × (count - 1) ≤ stage.ticks`.
7. Um estágio de hitbox precisa de uma animação compatível ou explicitSelection verdadeiro com nenhum provedor.
8. Use apenas habilidades reais, animação, som e IDs de partículas.

Use JSON rigoroso sem comentários, vírgulas ou elipses. Não trate o aperto automático como prova de que a entrada original estava correta.

## 6. Fragmento de referência de partículas

Esta é uma ação para a matriz de ações de um evento. Partículas/training_ring.json já devem existir.

```json
{
  "type": "dochi_battleworks:particle_shape",
  "chancePercent": 100,
  "params": {
    "particleFile": "training_ring.json",
    "origin": "caster"
  }
}
```

Uma ação começa todo o efeito. Os danos permanecem separados.

## 7. Limites importantes

| Item | Limite |
| --- | --- |
| Rede de combate JSON string | 524,288 caracteres |
| Fases | 16 |
| Padrões / hitboxes | 256 cada |
| Eventos por palco | 128 |
| Ações por evento | 32 |
| Param entradas por ação | 64 |
| Pontos de hitbox personalizados | 12 |

O limite de string não é o mesmo que uma regra universal do tamanho de arquivo 512-KiB para todas as codificações. O transporte comprimido/encolhido em 0.1.5 não remove o limite do documento.

## 8. Base de origem e escopo de teste

A auditoria detalhada original usou a fonte Forge 0.1.3 em 2026-09-12: BattleworkDocument, BattleworkValidator, BattleworkRuntimeController, BattleworkStore, BattleworkNetwork, BattleworkAnimationPolicy, ParticleDocument, ParticleFiles, ParticleCommands e controles/traduções de editores. A orientação de instalação foi atualizada para 0.1.4 em 2026-10-11, depois para atual 0.1.5 com Fabric instalação em 2026-10-24.

Armazenamento atual, animação e comportamento de ação adicional substituem o antigo 0.1.2 guia. A validação de sintaxe/referência não estabelece contato visual, compatibilidade com o provedor, comportamento do terreno ou equilíbrio de encontro. Use o [Lista de verificação de teste ao vivo](#mob-editor/battleworks-troubleshooting).

O guia atual de 0.1.7 também cobre criação independente, receitas, técnicas reutilizáveis, avisos vinculados e reinício da arena. O combate continua usando dochi.battleworks.v1; não invente outra versão de esquema para esses recursos. Descrições de exemplos e versões de capturas antigas identificam a origem histórica.
