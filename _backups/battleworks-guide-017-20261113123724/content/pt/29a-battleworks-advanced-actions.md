---
title: Posições salvas, projéteis, intimações e condições
slug: battleworks-advanced-actions
order: 276
description: Construa ataques atrasados e gerencie entidades agrupadas e encontre o estado.
product: mob-editor
section: combat
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

## Adicionar um recurso avançado de cada vez

Comece depois do [Chefe bifásico.](#mob-editor/battleworks-encounters) Funciona. Mantenha um arquivo conhecido. Escolha uma ação através de sua categoria de propósito e, em seguida, edite suas propriedades e Modificadores.

As teclas JSON abaixo são material de referência para autoria direta.

## 1. Atacar a posição anterior do jogador

1. Crie um hitbox Cilindro com ID warning_blast, Raio 2.4, Altura 3, Dano 4.
2. Crie um padrão com Windup 40, Ação 10, Recuperação 20.
3. Adicione **Save World Position** em Windup tick 0.
4. Definir ID de posição blast_spot, Alvo de origem, Modo Exato.
5. Em Windup tiquetaque 1, adicione **Particle Shape**.
6. Use a posição salva, ID da posição blast_spot.
7. Use Anel, Raio 2.4, Amostras 24, Partícula minecraft:end_rod. Mantenha qualquer repetição dentro Windup.
8. Adicione **Hitbox At Position** em Action tick 0.
9. Link warning_blast e blast_spot.
10. Use animação de palco compatível ou nenhuma explícita.

Resultado esperado: afastar-se depois que o aviso começar deixa a batida no local anterior. As hitboxes de posição salva usam a âncora como seu centro; verifique a altura em vez de assumir que as compensações normais do centro do corpo do NPC se aplicam de forma idêntica.

![Salve a posição mundial com ID de posição salva, alvo e exato.](assets/media/guides/battleworks-016-neo1211/battleworks-save-position.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Adicionada através de + Ação → Convocatórias / Posições → Salvar Posição Mundial. Altere o ID principal inicial para blast_spot e use o mesmo ID em ações posteriores.")

## 2. Gerenciar nomes de posição

| Ação | Propósito |
| --- | --- |
| save_position | Gravar a posição do rodízio/alvo |
| hitbox_at_position | Executar um hitbox em uma âncora |
| move_to_position | Mover o rodízio/alvo para uma âncora |
| clear_position | Apagar uma ou todas as âncoras |

Salvar o mesmo nome o atualiza. Mantenha a ordem de salvar/usar/limpar deliberada. As âncoras são locais de encontro e claras no reset de combate; o limite atual é 32.

Anel Aleatório e Caixa Aleatória escolhem locais aleatórios. Buscas seguras nas alturas próximas para espaço carregado, na fronteira, livre de colisões; não garante um bloco de apoio no solo. Teste destinos no mundo.

## 3. Comece com um projétil gerenciado

1. Adicione **Spawn Projectile / Construct**.
2. Comece com o básico do editor minecraft:snowball Identificação.
3. Defina o ID do grupo training_shots e o Conde 1.
4. Use Spawn em Caster e Diretion Target.
5. Experimente Velocidade 0.5, Dano 2, Vida útil 60 carrapatos.
6. Verifique a criação, viagens, impacto e limpeza antes de aumentar a contagem.

| Campo | Significado |
| --- | --- |
| ID do grupo | Nome usado por liberação posterior/remover ações |
| Ventilador / Radial | Arranjo de direção |
| Ponto / Linha / Anel / Arco / Grade | Colocação de Spawn |
| Segure Ticks. | Atraso antes do lançamento automático |
| Ticks vitalícios | Vida útil máxima |
| Acerte o Raio | Raio de colisão gerenciado |
| Partícula de Trilha | ID de trilha registrada |

Nem todas as entidades mod registradas apoiam a criação genérica. Use uma verdadeira integração de habilidade primeiro para feitiços externos complexos.

![Bola de neve padrão em Spawn Projétil / Construção.](assets/media/guides/battleworks-016-neo1211/battleworks-projectile.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Adicionado através de + Ação → Habilidades / Projéteis. Este exemplo é colocado em Windup; selecione Ação antes de adicioná-lo se esse for o estágio de disparo pretendido.")

## 4. Solte um grupo retido

1. Corte training_shots com Hold Ticks 40.
2. Adicionar **Release Projectiles** 20 marca mais tarde.
3. Use a mesma ID do grupo.
4. Adicionar **Remove Projectiles** quando as entidades restantes devem ser removidas.

Escolha entre o lançamento automático e uma liberação explícita anterior. Os limites são 64 por ação e 128 projéteis gerenciados ao vivo por rodízio. Comece pequeno.

Itens usados para construções não são saques. Configure o saque separadamente em CustomNPCs.

## 5. Invoque um clone do CustomNPC

1. Salve um clone real com CustomNPCs ferramentas.
2. Grave a guia e o nome exatos.
3. Adicione **Summon Clone** com esses valores.
4. Use guardas de identificação do grupo e Conde 1.
5. Configure o local de geração e a vida útil.
6. Opcionalmente, conecte um arquivo de trabalho de batalha filho existente.
7. Adicione **Dismiss Summons** para guardas e teste de limpeza.

Um nome de clone não é uma identificação de entidade arbitrária. O clone e o arquivo filho opcional devem existir no servidor. Arquivos infantis usam caminhos relativos a criaturas/padrões.

As intimações são administradas pelos pais e podem herdar o alvo. Limites são 32 por ação e 64 intimações ao vivo por pai. Revise os arquivos das crianças para evitar correntes de convocação descontroladas.

## 6. Portão de eventos posteriores com condições

As condições podem inspecionar a saúde, a fase, as contagens, as posições, o estado e os resultados da ação. Várias condições são combinadas com E.

Para o array de condições ** de um evento**, isso verifica se a âncora existe:

```json
[
  {
    "type": "position_exists",
    "key": "blast_spot",
    "operator": "eq",
    "value": 1
  }
]
```

Este é um fragmento, não um arquivo completo. A existência da posição é uma verificação booleana; operador/valor se aplica principalmente às condições de comparação numérica.

| Tipo | Propósito |
| --- | --- |
| boss_health / target_health | Comparação da relação de saúde |
| missing_boss_health | Taxa de falta de saúde |
| summon_count / projectile_count | Contar no grupo chamado por chave |
| position_exists | Existência de âncora |
| estado | Compare um número de encontro armazenado |
| action_succeeded / action_failed | Inspecione um resultado de ação nomeado |
| skill_available | Disponibilidade do fornecedor, não garantia de sucesso do elenco |
| target_distance / target_vertical | Distância ou altura |
| fase / on_ground / aleatória | Fase, aterramento ou chance |

Operadores numéricos são eq, neq, gt, gte, lt e lte. Saúde 50% é 0.5. Negate inverte o resultado.

## 7. Números de estado e atributos NPC opcionais

**Set State** suporta Set, Add, Multiply, Random e Clear. Ele pode rastrear as cargas para um movimento posterior. Este é o estado do encontro, não dados permanentes do jogador ou CustomNPCs dados armazenados.

Avançado `npcStats.enabled` pode aplicar a saúde máxima, velocidade de movimento, velocidades específicas de fase, faixa de seguimento e regeneração ociosa/de combate. Está desativado por padrão. Zero valores de saúde/velocidade/intervalo não aplicam um novo valor de atributo; regeneração zero não adiciona cura automática.

O primeiro exercício prepara estatísticas básicas em CustomNPCs. Inspecionar npcStats Quando um chefe importado muda inesperadamente a saúde ou a velocidade.

## 8. Outras ações de status e controle

Cura restaura o rodízio. Aplique Efeito alveja Self ou Target com um efeito registrado. Ignite coloca um alvo em chamas. Lançamento e controle do Tether movimento alvo; Cancelar habilidade e Cancelar Tether parar suas atividades correspondentes.

Shield Punish pode pedir recarga ou destruição para o caso de uso de escudo de baunilha. Não é a opção genérica de parry. Destinatário do teste, probabilidade e repetições em uma configuração de prática.

Depois de cada adição, use o [Sequência de solução de problemas](#mob-editor/battleworks-troubleshooting).
