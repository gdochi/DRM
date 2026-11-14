---
title: Salvar, simular e executar
slug: expanded-support-run
order: 332
description: Salve, recarregue, teste simulações reais, chame o apoio e resolva problemas com arquivos antigos.
product: dochi-warfare-expanded
category: Apoio de combate
section: support
status: Guia
version: 0.3.3
audience: Criadores de mapas e operadores
translationSource: en
translationMethod: assisted
---

## Diferencie salvar, testar e executar

Conclua o [posicionamento](#dochi-warfare-expanded/expanded-support-timeline) ou os [ajustes de apoio](#dochi-warfare-expanded/expanded-support-actions) e siga estas etapas.

| Operação | Dados | Resultado |
| --- | --- | --- |
| Save / Save As | Rascunho atual | JSON nomeado no servidor |
| Simulation | Rascunho atual | Atores temporários em velocidade normal; terreno e atores existentes protegidos |
| Comando de operador | Arquivo salvo | Apoio real com dano e efeitos nativos |
| Item de ordem tática | Linha do tempo vinculada a uma tática salva | Apoio real no ponto e direção designados pelo jogador |

**Simulation não salva.** Salve o rascunho testado e chame-o por comando de operador, ou vincule-o a uma [ordem tática](#dochi-warfare-expanded/expanded-tactical-orders) para distribuir itens a jogadores comuns. Diagramas antigos e o botão de executar na própria posição não descrevem esta interface.

## 1. Salve um documento

1. Digite um título legível, como **Road reinforcement**.
2. Clique em **Save As**.
3. Use **tutorial_support** como nome do arquivo. Título e nome são separados.
4. Confirme e espere a resposta do servidor.
5. Confira nome e indicação de alteração. Depois use **Save / Ctrl+S**.

![Crie apoio, dê título e nome, salve, pesquise e carregue.](assets/media/guides/dwe-tutorials-20261109/dwe-files.mp4 "09 · Save As → tutorial_support → confirmação → Load → pesquisa → seleção → carregar. Compara arquivo do servidor e disposição reaberta.")

**Clicar não é confirmar.** Leia os estados de espera/erro. Se outro usuário alterou o arquivo, carregue a versão atual e guarde seu rascunho com outro nome.

Leia avisos de alterações não salvas ao criar, restaurar, carregar ou fechar. **Reset restaura a base salva; Create New cria um documento vazio.**

## 2. Recarregue a disposição

1. Pesquise o nome em **Load**.
2. Selecione a linha e espere o resumo.
3. Use **Load** na janela.
4. Confira eventos, tempos, trajetos e centro.

**Relative coordinates move a disposição ao centro atual.** Mude primeiro para **Absolute coordinates** para preservar posições salvas. Para reutilizar em outro lugar, defina **Center** antes de carregar em modo relativo.

## 3. Teste com Simulation

1. Comece com algo simples, como um veículo.
2. Clique em **Simulation**; rascunhos não salvos também funcionam.
3. Aguarde e confira veículo temporário e tempo decorrido.
4. Observe rota, início, duração e chegada.
5. Clique em **Stop** e confira a remoção do apoio.

![Crie uma rota, observe o veículo da Simulation e remova-o com Stop.](assets/media/guides/dwe-tutorials-20261109/dwe-simulation.mp4 "10 · Veículo real em cliente/servidor integrado. Diferente do combate chamado por comando.")

A simulação usa entidades temporárias e movimento nativo em velocidade normal. O centro fica bloqueado durante a execução; pare antes de editar.

Como terreno e atores existentes são protegidos, **dano de simulação não mede dano de combate real**. Verifique também preparação dos NPCs, compatibilidade, política do servidor e terreno.

## 4. Chame o apoio real

Exige permissão **2**. O arquivo é **tutorial_support**, sem extensão no comando.

```text
/dw callgimmicks tutorial_support
/dw callgimmicks tutorial_support ~ ~ ~
```

| Chamada | Posição |
| --- | --- |
| Sem coordenadas | Posições mundiais salvas |
| Com coordenadas | Move partidas, alvos e destinos da origem salva às coordenadas da chamada |

Coordenadas relativas usam a **posição do executor**: jogador ou bloco de comando. Y também move a altura de todo o conjunto.

Alterações não salvas não entram na chamada. A execução real difere da Simulation protegida; confira rotas e armas no local pretendido.

Também existe bombardeio avulso. Confira IDs instalados com o preenchimento automático.

```text
/dw bombard ~ ~ ~ superbwarfare:ju_87 superbwarfare:sc_250 10
```

**10 está em ticks**: primeira soltura após meio segundo a 20 TPS. O comando suporta ponto/área; crie linhas no editor.

## Resolva uma etapa travada

| Sintoma | Primeira verificação |
| --- | --- |
| Clique no chão não cria evento | Ferramenta, superfície carregada e ponteiro na vista |
| Propriedades ausentes | Seleção, painel aberto e rolagem interna |
| Número impede outra ação | Complete entradas vazias/negativas e leia o estado |
| Catálogo vazio | Catálogo real do servidor e combinação instalada |
| NPCs parados | DW AI, Clone ou esfera Area, montaria/contrato/outras ordens |
| Veículo não surge/avança | Espaço, terreno, formação e rota transitável |
| Apoio expira antes da chegada | Lifetime conta desde a geração |
| Load muda posições | Relative/Absolute e Center atual |
| Comando difere do rascunho | Confirmação, nome, coordenadas e política |
| Conflito ao salvar | Load da versão atual; preserve o rascunho com Save As |

## Arquivos e referência JSON

Não é necessário memorizar isto para usar a interface; é uma referência para backup/edição direta.

- Caminho: `config/dochi_warfare/vehicle_ai/gimmicks/<name>.json`
- Esquema atual: `dochi.warfare.gimmicks.v6`; v1–v5 continuam legíveis.
- `origin` é a referência, `steps` contém eventos e `at_tick` é o tick inicial.
- Uma etapa contém `bombard`, `vehicle_support`, `fire_support` ou `npc_move`.
- `lifetime_ticks` é a vida útil do apoio. As posições salvas continuam mundiais mesmo com exibição relativa.
- `explosion_damage` e `direct_damage` são danos base em HP. **Zero zera aquele componente**; vazio preserva o valor nativo. Não alteram raio/destruição do terreno. Distância e armadura afetam o dano real.

Exemplos internos são instalados apenas quando ausentes. Preserve os originais antigos e compare uma cópia de **Save As**.

Volte ao [primeiro bombardeio](#dochi-warfare-expanded/expanded-support-timeline) ou combine [veículos, armas e NPCs](#dochi-warfare-expanded/expanded-support-actions).
