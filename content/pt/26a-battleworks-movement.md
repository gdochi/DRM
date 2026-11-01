---
title: Caminhar, correr, teletransportar e mover alvos
slug: battleworks-movement
order: 245
description: Movimento do autor com direção clara, duração, cancelamento e etapas de teste ao vivo.
product: mob-editor
section: authoring
category: BattleWorks
status: Guia
version: 0.1.6
audience: Iniciantes e criadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## Decida o que deve se mover

| Intenção | Característica |
| --- | --- |
| Abordagem entre ataques | Perseguição Alvo |
| Passo em direção ou longe durante a preparação | Palco Para / Longe |
| Mover-se em um evento específico | Movimento da linha do tempo |
| Puxe o jogador em direção ao chefe | Puxe o alvo |
| Mude o alvo para as coordenadas chefe-local ou mundial. | Mover alvo relativo / absoluto |
| Mover para um local gravado anteriormente | [Posições salvas](#mob-editor/battleworks-advanced-actions) |

## 1. Construa um pequeno retiro

1. Adicione um padrão chamado Short Retreat.
2. Use o Min Range 0, Max Range 3 e habilite a Mobilidade.
3. Definir Windup 6, Ação 12, Recuperação 12 carrapatos.
4. Em Ação, desabilite Stop Horizontal e escolha Away em velocidade 0.08.
5. Mantenha a preparação e recuperação em espera.
6. Não adicione nenhum dano inicialmente.
7. Salvar/aplicar e confirmar retiro seguido de uma busca renovada.

A mobilidade diz ao gerente como gravar o padrão. Não cria movimento por si só.

![O estágio de Ação sob o Movimento Stage →.](assets/media/guides/battleworks-016-neo1211/battleworks-stage-movement.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Selecione Ação acima da linha do tempo e, em seguida, altere a subpágina Etapa para Movimento. Movimento: Nenhum significa que nenhum movimento de palco está configurado ainda.")

Use **Stage → Movement** para o movimento de palco, ou linha do tempo ** + Ação → Movimento de rodízio** para uma ação em um carrapato específico. Isso mostra o local de edição ao invés de um retiro completo.

## 2. Entenda as três ações de movimento dedicadas

| Tipo | Comportamento | Valores |
| --- | --- | --- |
| Andar | Navegue para um destino calculado no início | Multiplicador de velocidade, distância, tempo limite |
| Impulse Dash | Aplique um impulso de velocidade | Velocidade horizontal, potência vertical, duração da propriedade |
| Teletransporte | Relocalizar após verificação de destino | Direção e distância |

Para frente/para trás/esquerda/direita, use a frente inicial do NPC. Para fora, use a localização inicial do alvo e exija um alvo. Os destinos a pé e as direções de impulso não mantêm o retargeting.

O estágio mais antigo `dash` atualiza a velocidade continuamente; `impulse_dash` aplica um único impulso.

## 3. Faça um traço físico

1. Set Windup 12, Ação 24, Recuperação 16.
2. Adicione Movimento em Ação 0.
3. Selecione Impulse Dash em direção ao alvo.
4. Comece com Speed 0.6, Vertical Power 0.1, Duração 12.
5. Teste sem danos primeiro.
6. Adicione Hold at Action tiquetaque 12 se for necessária uma parada explícita.
7. Adicione um Hitbox separado no tick de contato pretendido.

Esta é uma **fragmento de evento**Não um documento inteiro:

```json
{
  "id": "dash_start",
  "at": 0,
  "interval": 0,
  "count": 1,
  "chancePercent": 100,
  "actions": [
    {
      "type": "dochi_battleworks:movement",
      "chancePercent": 100,
      "params": {
        "movementType": "impulse_dash",
        "direction": "toward",
        "speed": 0.6,
        "verticalPower": 0.1,
        "durationTicks": 12
      }
    }
  ]
}
```

Duração é controle de propriedade, não tempo de voo garantido ou distância de viagem. Gravidade, fricção e colisão ainda se aplicam. Dash em si não tem danos.

## 4. Evite movimentos sobrepostos

Um novo movimento dedicado substitui a sessão anterior. Pode substituir a parada e a perseguição do estágio comum, cruzar um limite de estágio e adiar o próximo padrão enquanto a propriedade permanece. Uma ação explícita de espera a cancela.

Repetir um evento de movimento inicia um novo movimento a cada ocorrência. Mantenha a duração inicial dentro de seu estágio; estenda-a apenas deliberadamente.

## 5. Teste o teletransporte NPC

Comece com Back, Distância 3 em terreno plano carregado. Compare o espaço aberto com uma parede, água e uma borda.

A NPC Teleport procura por terra de pouso e verifica o carregamento, a fronteira, a colisão e as condições líquidas. O fracasso deixa o NPC no lugar.

## 6. Puxe o alvo fisicamente

1. Adicione Pull Target a um padrão exigido pelo alvo.
2. Comece com os ticks Força 0.08 e Duração 40.
3. Teste aproximadamente dois segundos de puxar.
4. Ajuste gradualmente em torno de 0.03–0.12.
5. Verifique as paredes, as mudanças de altura e o knockback existente.

Força adiciona velocidade a cada carrapato; valores grandes acumulam força rapidamente. Puxar não reescreve as coordenadas, e o impulso permanece depois. Uma nova atração substitui a sessão antiga; entidades inválidas, morte, mudanças de dimensão ou interrupção de combate podem acabar com ela.

## 7. Mude o alvo exatamente.

| Ação | Entradas | Origem |
| --- | --- | --- |
| Mover parente alvo | Deslocamento X/Y/Z | Chefe pés e enfrentando na execução |
| Mover Alvo Absoluto | X/Y/Z | Coordenadas mundiais absolutas |

Relativo X 0, Y 0, Z 3 coloca os pés do alvo três quadras à frente do chefe. Positivo X é deixado, Y para cima, e Z para a frente.

Essas ações permanecem na mesma dimensão e exigem destinos carregados, na fronteira, em altura, sem colisões. Eles têm. **Não.** Procure pelo chão. Aerotransportado Y permanece no ar. Verifique `Battleworks target movement rejected` sobre falha.

Uma realocação bem-sucedida não cancela automaticamente uma atração ativa.

## Ordem de teste ao vivo

Teste chão plano, paredes, cantos, escadas e mudanças de altura. O ensaio da simulação não valida a navegação, colisão ou aterrissagem.
