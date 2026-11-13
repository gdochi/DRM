---
title: Habilidades, sons, diálogo e música de batalha
slug: battleworks-skills-effects
order: 247
description: Conecte habilidades de catálogo reais e adicione apresentação sem alterar o tempo de dano confiável.
product: mob-editor
section: effects
category: BattleWorks
status: Guia
version: 0.1.7
audience: Iniciantes e criadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Selecione uma habilidade real

1. Instale o provedor e as dependências no servidor e nos clientes.
2. Selecione o estágio de ação de um padrão e pressione **+ Skill**.
3. Filtre por mod, pesquise por nome ou ID e escolha uma habilidade listada.
4. Defina seu evento para o tick de elenco pretendido.
5. Mantenha as chances de eventos e ações em 100.
6. Comece com um baixo nível de habilidade e teste um elenco.

Uma ação tem uma habilidade. Digitar um ID inventado não o cria. Ativos adicionais do provedor também devem existir.

## 2. Diagnosticar um elenco rejeitado

| Verificar | Por que isso importa? |
| --- | --- |
| Provedor e ID real | A habilidade deve estar disponível. |
| Alvo, alcance, linha de visão | A ação precisa de um elenco válido. |
| Recarga do provedor | Separado de BattleWorks recarga padrão |
| Compatibilidade do rodízio | Nem toda magia de jogador aceita o DNPC ou NPC legado selecionado como conjurador |
| Opções suportadas | Habilidades diferentes aceitam configurações diferentes |

Simulação não lança feitiços externos reais. Teste no mundo e inspecione `Battleworks skill failed` Mensagens.

## 3. Ajuste o dano no lugar certo

| Ataque | Controle de danos |
| --- | --- |
| Hitbox | Dano Compartilhado × por ação |
| DRM Habilidade | Nível de habilidade e opções suportadas pelo provedor |
| Certas habilidades integradas | Opções de dano direto expostas pelo editor |
| Projétil gerenciado | Sua própria ação Dano |

Um genérico `damageMultiplier` copiado em parâmetros de habilidade não é um multiplicador universal de feitiços suportado.

## 4. Adicionar casting repetido

1. Mantenha uma cópia single-cast funcionando.
2. Adicione outro evento ou um cronograma de repetição intencional.
3. Deixe tempo para a recarga do próprio provedor.
4. Use ações de habilidade separadas quando cada elenco precisar de uma animação diferente.
5. Combinar Ticks de animação de elenco com a duração pretendida.

O movimento do elenco é solicitado em elencos bem sucedidos. Nenhum movimento pode indicar uma habilidade rejeitada, não uma identificação de animação ruim.

## 5. Adicionar um som de ataque

1. Adicione Som ao evento de sucesso ou ao seu próprio evento.
2. Use Selecionar para escolher um som registrado.
3. Pré-visualizar com Play / Stop.
4. Comece Volume e Pitch em 1.0.
5. Salvar/aplicar e ouvir durante o combate.

`minecraft:entity.player.attack.sweep` é um exemplo básico. Use um `namespace:path` Sound ID registrado, não um nome de arquivo OGG. Ações de som ordinárias são jogadas no NPC através da categoria de criação hostil.

## 6. Adicionar um aviso de título curto

1. Adicionar Título em Windup tiquetaque 0.
2. Digite um título curto e um subtítulo.
3. Escolha o alvo atual ou jogadores próximos como Audiência.
4. Defina Raio ao usar destinatários próximos.
5. Comece com Fade In 5, Stay 20, Fade Out 5.
6. Verifique a legibilidade e sobreposição na tela de um jogador real.

Títulos frequentes de vários NPCs podem substituir um ao outro.

## 7. Comandos e DRM popups

Abra **Command → Edit command / arguments**. Primeiro verifique o tempo com:

```text
say BattleWorks timing test
```

Não use nenhuma barra principal dentro da ação de comando. Escolha NPC ou alvo como executor.

| Token | Substituição |
| --- | --- |
| `@npc` | Texto NPC UUID |
| `@target` / `{target}` | Texto UUID de destino atual |
| `{player}` | Nome do jogador-alvo |
| `{uuid}` | UUID do jogador-alvo |

As fichas de destino são strings substituídas, não seletores de baunilha. Os tokens do jogador precisam de um alvo.

Crie e teste a definição de popup e GUI em DRM primeiro. Então use a conclusão do comando e o nome real do popup. Não assuma que outra distribuição combatv1.json existe localmente.

As ações de comando são executadas com permissão de alto comando. Verifique o destinatário e repita a contagem. Um popup normalmente precisa de uma invocação; sua definição pode fornecer um som inicial.

## 8. Mantenha o dano confiável e diálogo ocasional.

Use evento 100%, Hitbox 100%, Som 100% e diálogo Comando 20%. Diminuir a chance do evento também seria ignorar o dano.

## 9. Configurar o BGM

1. Abra **Combat Rules → BGM**.
2. Ative-o e selecione uma faixa registrada.
3. Comece com Volume 0.7 e Pitch 1.0.
4. Pré-visualize e salve/aplica.
5. Deixe um jogador de sobrevivência se tornar o alvo do NPC.
6. Verifique a parada na perda do alvo ou morte de NPC.

BGM loops para o **alvo do jogador atual**Nem todos os jogadores dentro de um raio. Quando vários NPCs têm como alvo o mesmo jogador, o proprietário adquirido mais recentemente ganha.

O do jogador. **Music** O volume deve ser audível. Recursos de áudio personalizados devem existir em cada cliente receptor. A supressão da música Vanilla usa a preferência independente da música Vanilla Disable.

Adicione um elenco, som, título, popup e BGM nessa ordem. Continue com [Particle Maker](#mob-editor/battleworks-particles).

![Regras de Combate → Configurações de BGM.](assets/media/guides/battleworks-016-neo1211/battleworks-bgm.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Ativar BGM está desligado e Sound ID está vazio aqui. Selecione o som, ative o BGM e ajuste Volume e Pitch. Isso mostra a configuração, não um resultado de reprodução de música verificada.")

## Visual previews para habilidades suportadas

Simulação, Hitbox Library e tutoriais compartilham a visualização de habilidades. Projéteis suportados, efeitos de área, invocação, partículas e alguns efeitos sustentados podem ser vistos no relógio do editor. Pause e rebobine para comparar o tempo e a posição.

Isso não é execução de feitiço de servidor. Danos, destruição de terreno, busca de caminho, estatísticas de combate reais e efeitos completos de jogabilidade da terceira equipe ainda precisam de testes de combate ao vivo. Uma habilidade listada não garante um adaptador visual. Distinguir mods ausentes, provedores não registrados, visuais não suportados e falhas de renderização nativa; um efeito não suportado não é silenciosamente substituído por outro feitiço.
