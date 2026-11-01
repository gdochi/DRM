---
title: Solução de problemas e verificações de combate ao vivo
slug: battleworks-troubleshooting
order: 290
description: Reduza a segmentação, dano, animação, arquivo, habilidade e falhas de apresentação.
product: mob-editor
section: reference
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


## Primeiros cheques

1. Combinar Minecraft, carregador, BattleWorks e DRM arquivos.
2. Seguir [Preparação do NPC](#mob-editor/mob-editor-setup) para o atual DNPC exercício. CustomNPCs é excluído em 26.3 e mais tarde.
3. Confirme que o caminho salvo é o caminho ligado ao NPC.
4. Separe a autoria criativa dos testes de combate Survival.
5. Verifique o balanço básico do braço e o Hitbox antes de adicionar modelos ou habilidades externas.

![Configurações de combate usadas para o teste save/apply real.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / DNPC 0.1.3 / NeoForge 1.21.1. Alcance de varredura 16, FOV 360 e Salvo. Avisos: 0 foram verificados antes de verificar a perda de saúde da Survival. Trate os avisos de salvamento e de visualização de modelo separadamente.")

Nesta combinação, o balanço básico causou danos reais, enquanto os avisos de modelo / animação e uma janela de Simulação que não abriu também foram observados. Compare o arquivo [verified first-attack](#mob-editor/battleworks-first-attack) e o combate real antes de descartar a ligação NPC por causa de um problema de visualização.

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

## O NPC nunca ataca.

1. Deixe o modo Criativo/Espectador.
2. Confirmar CustomNPCs Alvo hostil.
3. Se estiver usando a varredura de fallback, o intervalo de verificação, FOV e visão.
4. Amplie temporariamente a faixa de padrões, altura, fase e condições de saúde para isolar a falha.
5. Certifique-se de que pelo menos um padrão de gerente comum exista.
6. Verifique a Pontuação Base e os multiplicadores de repetição zero.
7. Verifique a propriedade de movimentos longos e recargas.

Compare um NPC separado usando o [arquivo de prática simples](./assets/media/battleworks/training_swordsman.json).

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

## Animação ou ataques se sobrepõem

1. Verifique Suprimir Ataques Nativos.
2. Inspecione os scripts de combate do CustomNPC existentes.
3. Teste Suprimir scripts de NPC personalizados quando apropriado.
4. Evite solicitações de animação de palco e linha do tempo.
5. Compare o Cast Animation Ticks com os estágios posteriores.
6. Verifique a compatibilidade provedor/modelo.

Não é esperado reiniciar uma animação correspondente em etapas consecutivas.

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
