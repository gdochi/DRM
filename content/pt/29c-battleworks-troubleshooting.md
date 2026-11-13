---
title: Solução de problemas e verificações de combate ao vivo
slug: battleworks-troubleshooting
order: 290
description: Reduza a segmentação, dano, animação, arquivo, habilidade e falhas de apresentação.
product: mob-editor
section: reference
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

## Primeiras verificações

1. Confira Minecraft, loader e BattleWorks 0.1.7. Confira DRM e provedores externos apenas se usar seus recursos; DRM é opcional.
2. Siga a [preparação do NPC](#mob-editor/mob-editor-setup). Use DNPC a partir de 26.3; CustomNPCs está excluído.
3. Confirme que o caminho salvo está vinculado ao NPC.
4. Separe criação no Criativo de testes no Sobrevivência.
5. Comece com movimento humanoide nativo e Hitbox antes de modelos ou magias externos.

O [primeiro ataque](#mob-editor/battleworks-first-attack) mantém capturas reais de combate em 0.1.6. Avisos históricos da prévia não são uma restrição atual. Diagnostique aplicação do arquivo, prévia do modelo e combate separadamente.

## O arquivo está faltando na lista.

1. Verifique a pasta config/dochi_rpg_maker/mobs/patterns do servidor.
2. Verifique a extensão .json.
3. Verifique o esquema dochi.battleworks.v1.
4. Exclua arquivos de geometria/animação e pastas de ativos.
5. Pare como JSON estrito.
6. Atualizar carga/aplicar.

Os arquivos de partículas usam partículas e dochi.partículas.v1.

## O NPC ainda usa o comportamento antigo

1. Verifique se você só usou Save As.
2. Salvar com o NPC anexado, ou aplicar o novo arquivo através de seu catálogo.
3. Após edições externas, reaplicar ou reiniciar o servidor.
4. Verifique arquivos com nomes semelhantes em subpastas.
5. Inspecione quaisquer configurações de modelo salvas que foram aplicadas também.

Use arquivos separados quando NPCs precisam de comportamento independente.

## O NPC nunca ataca

1. Saia do Criativo/Espectador.
2. Confirme um alvo válido do ator ou ative Scan Without Target em uma área isolada.
3. Confira alcance, FOV e linha de visão. A varredura alternativa é separada do filtro de relações do NPC.
4. Confira Enabled, alcance, altura, vida e fase do padrão.
5. Garanta um padrão Manager comum elegível; confira pontuação, multiplicadores de repetição e recargas.
6. Confira controle do movimento e limites da arena.

Compare outro NPC usando o [arquivo simples de prática](./assets/media/battleworks/training_swordsman.json).

## O NPC pára antes de chegar ao seu ataque.

Compare a distância da aproximação, o padrão Max Range, as dimensões/offsets do hitbox, a altura permitida e a localização do alvo no contato. Verifique se o movimento de preparação afasta o NPC.

O alcance inicial e a geometria real do hitbox são separados.

## A animação toca, mas o dano não

1. Teste combate real, não Simulação.
2. Verifique se um Hitbox ou dano real Ação de habilidade está conectada.
3. Verifique o evento e repita os limites.
4. Verifique se os danos, multiplicadores e chances são nulos.
5. Inspecione altura, deslocamentos e rotações.
6. Verifique a restrição do alvo.
7. Verifique armaduras, efeitos, invulnerabilidade e Política de Acertos.

Vários hitboxes em um carrapato não garantem simples danos somados.

## Animações ou ataques se sobrepõem

1. Confira Suppress Native Attacks, IA do ator e outros controladores.
2. Apenas em CustomNPCs antigo compatível, confira scripts e Suppress CustomNPC Scripts. Isso não é requisito do DNPC ou de 26.3.
3. Evite pedidos concorrentes de animação de etapa e linha do tempo.
4. Compare Cast Animation Ticks com etapas seguintes e confira modelo/provedor.

Uma animação igual pode continuar entre etapas consecutivas sem reiniciar.

## Uma habilidade falha.

Escolha um ID de catálogo real, verifique o provedor/dependências em ambos os lados e verifique o destino, o alcance, a linha de visão e a recarga do provedor. Remova opções não suportadas e teste um molde simples. A habilidade de ler Battleworks falhou.

## Combos, fases ou passivos se comportam de forma diferente.

| Sintoma | Verificar |
| --- | --- |
| Combo não começa | Max Combo, existência de destino, condições, recarga |
| Um movimento domina | Prioridade, piso de seleção, elegibilidade |
| A fase permanece alta após a cura. | Espera-se travamento durante o combate |
| O anúncio de transição repete-se normalmente. | Sua pontuação de gerente e bônus |
| Espera passiva básica | As reações de fila esperam por uma abertura. |
| O gatilho de saúde não se repete. | Uma vez por combate e re-cruzando o limiar |
| A reação desaparece. | Skip, fila expirada, condições de início falhadas |
| Postura/campos de riposte não têm efeito | Configurações de documento reservadas e desconectadas |

## Partículas estão ausentes ou excessivas

1. Jogue o arquivo no Particle Maker.
2. Verifique as opções de partículas necessárias.
3. Tente `/drm particle play training_ring ~ ~ ~` sem a extensão.
4. Verifique se particleFile existe.
5. A origem da posição Alvo / Salvo tem dados válidos.
6. Verifique se você não está reiniciando um efeito longo a cada carrapato.
7. Reduza amostras, contagem, frequência e efeitos simultâneos.

## BGM ou diálogo está faltando

Verifique o volume de criação hostil para o volume normal de som e música para BGM. Verifique o som registrado e o recurso do cliente. Confirme um destinatário do jogador, use temporariamente 100% de chances e inspecione referências de popup/GUI/comando reais.

A propriedade BGM de outro NPC ou títulos/popups sobrepostos também podem mudar o resultado visível.

## Mensagens de log úteis

| Mensagem | Significado |
| --- | --- |
| Battleworks JSON indisponível | Arquivo de combate referenciado não pôde carregar |
| Salvar rejeitado | Servidor recusou o salvamento; leia a razão |
| A habilidade Battleworks falhou. | A execução do provedor falhou |
| Movimento alvo de Battleworks rejeitado | Falha nas verificações de destino ou destino |
| Partícula JSON rejeitada | Arquivo de partícula referenciado falhou ao carregar/validar |

## Gravar uma matriz de teste final

Teste próximo/médio/longe, frente/lados/traseiro, paredes/ escadas/altura diferenças, cada fase, cada passiva, morte, perda de alvo, e outra luta. Reabrir arquivos para verificar a persistência.

Para um relatório de problema útil, inclua versões mod, etapas de reprodução, arquivos de combate e referenciados, comportamento esperado/real, latest.log e qualquer relatório de falha. Remova tokens privados ou dados pessoais antes de compartilhar logs.

## Receitas, importações e reinício da arena

| Sintoma | Verificar |
| --- | --- |
| Editar uma cópia altera a hitbox original | Uso compartilhado; separe a hitbox ou use Independent copy |
| My techniques vazio em outro servidor | A biblioteca pertence ao jogador naquele servidor |
| Importação rejeitada | Recursos necessários, compatibilidade do modelo, referências e limites |
| Clipes ausentes ou sem reprodução | Recursos reais, descrição da fonte e modelo/provedor compatível |
| Chefe retorna ou cura inesperadamente | Arena aplicada, reinício ao sair e Restore boss health |
| Aviso sem impacto | Ação Hitbox vinculada, tick de contato e posição do alvo |

Use o [fluxo de criação](#mob-editor/battleworks-authoring), o [guia de animação](#mob-editor/battleworks-animation) e as [instruções de arena](#mob-editor/battleworks-encounters) para testar separadamente.
