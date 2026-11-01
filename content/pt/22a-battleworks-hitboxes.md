---
title: Geometria de hitbox, danos e políticas de repetição
slug: battleworks-hitboxes
order: 235
description: Construa um impulso, alinhe seu centro e distinga os danos compartilhados das configurações por ação.
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

## Um hitbox é o espaço testado para danos.

Uma espada ou animação visível não cria BattleWorks Danos por conta própria. Conecte uma definição da Hitbox Library à ação Hitbox de um padrão.

## 1. Abra a definição de sua ação

1. Selecione o padrão e a linha Hitbox do estágio de ação.
2. Pressione **Edit this hitbox**.
3. Confirme seu nome e uso.
4. Use **Pattern:** para escolher o uso relevante.
5. Volte com **Edit pattern**.

As hitboxes desacopladas podem ser visualizadas, mas o tempo de execução real pertence a uma ação vinculada.

![Geometria e tempo da varredura larga gerada Hitbox.](assets/media/guides/battleworks-016-neo1211/battleworks-hitbox-geometry.png "BattleWorks 0.1.6 / NeoForge 1.21.1. O painel modelo é dobrado usando sua seta de cabeçalho. Dano 4, Alcance 2.4 e Espessura 0.5 definem o hitbox; o marcador no tick 27 define quando ele é executado.")

## 2. Escolha uma forma

| Forma | Controles principais | Uso típico |
| --- | --- | --- |
| Caixa | Largura, altura, profundidade | Impulso para a frente |
| Esfera | Raio | Circundante explosão |
| Cilindro | Raio, altura. | Área de terra |
| Cápsula | Espessura, altura | Volume vertical arredondado |
| Varredura | Alcance, Espessura, ângulos, Varredura Passos | Corte curvo |
| Polígono | Pelo menos três vértices e altura | Área irregular |

Sweep Steps amostras do arco, não é uma contagem de sucesso. Pontos de varredura personalizados substituem o arco gerado automaticamente.

## 3. Ajuste o tamanho antes dos deslocamentos

| Configurando | Significado |
| --- | --- |
| Largura / Altura / Profundidade | Dimensões da forma |
| Raio | Raio ou alcance de varredura; um raio de 2 dá um diâmetro de esfera perto 4 |
| Espessão | Raio do tubo de varredura ou raio da cápsula |
| Deslocamento X | Mudança de lado local; positivo é a esquerda do NPC |
| Deslocamento Y | Mudança vertical do centro de hitbox NPC comum |
| Deslocamento Z | Mudança local para a frente |
| Yaw / Pitch | Rotação horizontal / inclinação |

A altura média do centro é **NPC feet Y + half NPC height + Offset Y**. Offset Y 0 já começa em torno do centro do corpo. Ajustando-o para 1 move-o mais um bloco para cima.

### Construir um impulso

1. Crie uma caixa de seleção.
2. Digite Largura `0.8`, Altura `1.5`, Profundidade `2.8`.
3. Use deslocamentos X `0`, Y `0`, Z `1.8`.
4. Comece com Dano `4` e Alvo Fechado Apenas Ligado.
5. Conecte-o a um evento de ação e visualize o volume para frente.
6. Teste na frente e no lado do NPC.

São valores iniciais para um humanoide normal. Verifique novamente a geometria depois de mudar o tamanho do modelo ou o comprimento da arma.

## 4. Multiplicador de dano e ação compartilhado

```text
configured damage = library Damage × action Damage Multiplier
4 × 1.5 = 6
```

Mudando a biblioteca Dano muda todas as referências a que hitbox. Para fortalecer apenas um uso, altere o multiplicador dessa ação ou crie outro hitbox.

Isto é um dano configurado **Antes** armadura, resistência, armações de invulnerabilidade, e outras regras mod. O knockback é aplicado após um ataque bem-sucedido.

## 5. Restrição de alvo e efeitos

O alvo bloqueado só restringe os ataques ao alvo atual quando existe um. Desabilitar pode incluir entidades vivas próximas. Uma ação pode adicionar essa restrição, mas não pode afrouxar uma configuração de biblioteca verdadeira.

Para um efeito verificado como `minecraft:slowness`, Amplificador `0` significa nível I, e duração `40` solicita cerca de dois segundos. O dano zero ainda pode ser usado com um efeito. Um hitbox de dano zero pode produzir um aviso.

## 6. Escolha a política de repetição

| hitPolicy | Comportamento |
| --- | --- |
| ilimitado | Sem restrição extra BattleWorks |
| once_per_pattern | Esta ação pode afetar com sucesso cada alvo uma vez durante o padrão |
| once_per_repeat | Cada ocorrência desta ação pode afetar cada alvo uma vez |
| Arrefecer | Forçar targetCooldownTicks antes que esta ação afete o alvo novamente |

Apenas aplicações bem-sucedidas de dano/efeito são lembradas. A memória é ** por ação **, então ações Hitbox separadas permanecem tentativas independentes. Estas políticas não removem a imunidade de dano de baunilha.

Para uma área persistente, comece com a recarga e targetCooldownTicks `10`, depois teste as batidas reais antes de aumentar a frequência de repetição.

## 7. Alinhar contato

1. Escolha o padrão do hitbox e o estágio de ação.
2. Selecione um clipe compatível e Reproduzir em uma velocidade de visualização mais lenta.
3. Encontre a postura de contato.
4. Volte ao padrão e mova o Tick do Evento.
5. Salvar/aplicar e testar frente, lados, traseira, e alturas diferentes.

Se for muito alto, verifique o Offset Y. Se estiver de lado, confira Offset X e Yaw. Se for curto, compare o deslocamento Z, as dimensões e o intervalo inicial. Continue com [animação](#mob-editor/battleworks-animation).
