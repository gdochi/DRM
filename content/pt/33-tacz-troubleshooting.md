---
title: Solução de problemas
slug: warfare-troubleshooting
order: 360
description: Diagnosticar Dochi's Warfare Armas de NPC, adaptadores opcionais, IA do veículo, ferramentas de clone, armadilhas, munição, visuais e desempenho.
product: dochi-warfare
category: Operações
section: operations
status: Rascunho
version: 0.3.3
audience: Operadores
tags:
  - troubleshooting
  - reload
  - npc
translationSource: en
translationMethod: assisted
---

## Fluxo de isolamento rápido

Quando uma arma de fogo NPC falhar, reduza a configuração antes de alterar muitos valores:

1. Use um fresco DNPC. Suportado CustomNPCs atores também estão disponíveis em 1.20.1 e 1.21.1.
2. Use uma arma simples TACZ 1.1.8 antes de testar um adaptador opcional PointBlank ou SuperbWarfare.
3. Ligue `TACZ Fire NPC Mode` e `Enabled`.
4. Use `Stance: Ranged` ou `Stance: Auto`.
5. Fique com `Ammo Stock: -1`.
6. Em Alvos, selecione o alvo de teste pretendido. Uma lista vazia não torna automaticamente todas as entidades hostis.
7. Teste com um alvo visível dentro de `Max Distance`.

Se isso funcionar, o addon e a arma estão bem. Adicione filtros, munição finita, movimento, piscinas e FX um passo de cada vez.

![M4A1 selecionado na tela real da arma DW.](assets/media/guides/warfare-031-neo1211/dw-gun.png "DW 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1, UI em inglês. Confirme a arma desejada na arma armazenada e no NPC Preview. Isso mostra seleção, não prova de disparo.")

## Guia de sintomas

| Sintoma | Verificações prováveis |
| --- | --- |
| `DW Npc Core` não abre a GUI esperada | Use o modo Criativo. Clique com o botão direito do mouse em DNPC ou compatível CustomNPCs NPC para configurações de NPC, um veículo SuperbWarfare compatível para configurações de veículo ou ar para a biblioteca de clones. |
| NPC nunca dispara | Verifique `TACZ Fire NPC Mode`, `Enabled`, posição, arma de apoio selecionada, visibilidade do alvo, `Max Distance`, regras do alvo e estoque de munição. |
| NPC vê o alvo, mas espera | Verifique `Combat Delay Ms`, `Detect Angle`, `Instant Combat Angle` e linha de visão. |
| NPC perde um alvo próximo atrás dele | Verifique `Close Detection` e `Close Detect Distance`. OFF é esperado para um NPC intencional no estilo backstab. |
| NPC ignora tiros de jogadores ou bloqueia ações | Verifique `Sound Detection`, cada intervalo de eventos, `Detect Distance` e `Sound Investigation`. Jogadores criativos e espectadores são ignorados. |
| NPC ritmo de disparo está errado | Verifique `RPM Mode`, `Fixed RPM` ou `RPM Min/Max`, limites de explosão, e o modo de disparo nativo da arma operada. Adaptadores externos não podem exceder a cadência nativa suportada por uma arma. |
| A rampa de precisão nunca avança | Confirme se o alvo é um jogador, visível, dentro de `Ramp Max Range`, e movendo-se horizontalmente acima `Min Target Speed`. |
| NPC pára depois de esvaziar a arma | Verifique `Reload`, `Supply Ammo`, `Ammo Stock`, `Reload Type`, `Ammo-Aware Switching`, e recuo corpo a corpo / desarmado. |
| Dano personalizado, knockback ou velocidade de ataque não é usado | Verifique a seleção `Gun Spec`/`Weapon Spec` ou `Custom` e os valores em `Gun` e `Melee`. |
| Melhor movimento de arma de combate não aparece | Verifique Better Combat, criatura Jogador Animador, o NPC's `Better Combat Compatibility`, e registrou ataques para a arma. Espera-se um balanço da mão principal de baunilha quando o movimento registrado não puder ser tocado. |
| A velocidade de ataque personalizada é ignorada durante a compatibilidade do Better Combat | A compatibilidade bloqueia o tempo para a arma ser eficaz `ATTACK_SPEED`. Desabilitar `Better Combat Compatibility` para usar uma velocidade de ataque `Custom`. |
| Patrulha entra em uma parede ou faz uma pausa a cada passo | Verifique `Default Walk Speed`, pontos de patrulha, altura vertical e alcance A*. Também confirme que a corrente 0.3.3 está instalada no cliente e no servidor. |
| NPC ataca o alvo errado | Limpar os filtros de ID da entidade, tags exigidas, tags rejeitadas e regras de tag de mesma fração e, em seguida, adicioná-las novamente gradualmente. |
| NPC continua mostrando a arma anterior ou errada | Confirme que ambos os lados usam a corrente 0.3.3 e salve novamente. Verifique se o item é suportado pelo adaptador TACZ, PointBlank ou SuperbWarfare e remova acessórios físicos de munição. |
| `DW Pose Core` não abre o editor | Confirme o modo Criativo, um Steve/Alex CustomNPCs modelo de jogador, uma distância dentro 12 blocos, e que o núcleo permanece em ambas as mãos. |
| Uma pose personalizada salva não é visível | Em `DW Npc Core > Pose`, confirme se a ação usa `Custom JSON` e o perfil pretendido. O arquivo deve existir em `config/dochi_warfare/poses/`. |
| Mudanças de pool não podem ser salvas | Faça a chance em linha total `100%` ou pressione `Equalize`. Editar uma linha não redistribui automaticamente as outras. |
| Entradas abaixo de uma longa piscina de armadura não são visíveis. | Role dentro da piscina de armaduras com a roda do mouse ou arraste sua barra de rolagem interna do lado direito. Se a tela inteira estiver cortada, também ajuste a baunilha. `GUI Scale`. |
| Os ícones de alerta visual estão faltando | Verifique a configuração por NPC `Alert Icons` e as configurações de visibilidade do marcador do lado do cliente `dochi_warfare Config`. |
| GUI parece distorcida | Ajuste `GUI Scale` nas configurações de vídeo de baunilha e, em seguida, verifique a tela novamente. |
| A capa nunca começa | Verifique global `[experimentalCover].enabled`, por-NPC `Enable Cover`, o gatilho individual, fase de combate, raio de busca, recarga, e se existe uma posição de bloqueio de explosão/tiro alcançável. |
| A cobertura começa, mas o NPC nunca volta a lutar. | Verifique `Max Duration`, `Hold Time`, verifique as configurações, a acessibilidade da rota e essa corrente 0.3.3 está instalada. A cobertura deve proteger o peito e a cabeça; o servidor tenta novamente outro candidato após uma falha de busca inicial. |
| A confirmação do contrato não abre. | O NPC deve ser um NPC gerenciado por DW com `Hire available` habilitado. Use uma mão vazia ou um item de interação normal; `DW Npc Core`, `DW Mercenary Core` e CustomNPCs as ferramentas de interação mantêm seu próprio comportamento de editor. |
| Cliques ou dicas de ferramentas da GUI mercenária são compensados | Use corrente 0.3.3 em ambos os lados. As configurações mercenárias, a tela de confirmação e o comando HUD usam escalas adequadas e traduziram as coordenadas do mouse. |
| PointBlank arma não é aceita | Instale exatamente um ramo suportado, 1.11.1 ou 2.1.0. Se ambos forem detectados, a ponte se desativa. |
| SuperbWarfare arma ou veículo não está disponível | Verifique as versões suportadas específicas do carregador em [ setup](#dochi-warfare/warfare-setup). |
| A IA do veículo está ativada, mas não se move | Remova os passageiros do jogador, confirme o compatível SuperbWarfare versão, modo de movimento, casa/destino e terreno carregado. Helicópteros e aeronaves de asa fixa precisam de espaço suficiente. |
| Uma torre de veículos rastreia o alvo, mas nunca dispara. | Em `Weapons`, verifique se a montagem está ligada e incluída por `Weapon use mode`. Verifique munição por arma, recarga, requisitos de tripulação, alcance mínimo/máximo e limites de arremesso de torre. Um alvo muito próximo pode exigir que o veículo se afaste. |
| Um veículo repete um pequeno círculo ou lança e pára abruptamente. | Confirme que 0.2.9 está instalado em ambos os lados, então verifique o raio da Patrulha de Área, a velocidade de movimento e o terreno alcançável. A versão 0.2.9 usa setores de patrulha distribuídos e aceleradores/tracking de reconhecimento à distância. |
| A página da tripulação continua carregando ou não pode embarcar em um NPC | Pressione `Refresh` e re-selecione o veículo/assento. Use um clone NPC servidor válido ou inventário de pedra de alma NPC, ficar dentro de blocos 64 com permissão criativa, e confirmar o NPC não é hostil à facção veículo. |
| Uma armadilha não aciona | Guarde `DW Booby Trap Core`, verifique ambos `Enabled` e `Armed`, verifique o bypass/cooldown do proprietário e confirme as dependências de carga útil LRT opcionais. |

## Problemas de acesso à GUI

`DW Npc Core` é um item de editor em modo criativo com três contextos: DNPC ou suportado CustomNPCs NPC, veículo suportado SuperbWarfare e ar para a biblioteca de clones. Se o editor NPC nunca abrir, confirme se o alvo é suportado. DNPC ou CustomNPCs ator e ambos os lados têm o addon. Se o editor de veículos não estiver disponível, verifique a versão compatível SuperbWarfare em vez de tratá-la como uma falha do alvo NPC.

## Problemas de fogo e linha de visão

Dochi's Warfare realiza uma verificação final de linha de visão antes de atirar. Se um NPC detecta um alvo mas não dispara, teste uma planície TACZ arma em uma área plana aberta. Se TACZ funcionar, mas uma arma opcional não funcionar, isole a versão do adaptador, a recarga nativa e as regras de fogo especial não suportadas antes de alterar a IA.

`Detect Distance` controla a consciência inicial. `Max Distance` controles variaram o fogo. Não aperte um como se fosse o outro.

## Problemas de munição e recarga

O problema mais comum é misturar itens de munição física com estoque de munição DW. Não coloque TACZ, PointBlank, ou SuperbWarfare munição ou revistas no NPC offhand. Use `Ammo Stock`, `Supply Ammo` e recarregue o estado.

Para o diagnóstico:

1. Defina `Ammo Stock` para `-1`.
2. Mantenha `Reload` e `Supply Ammo` ligado.
3. Defina `Reload Duration Ms` para `0` para usar o tempo de recarga nativo da arma.
4. Teste novamente com um alvo.

Se o estoque infinito funciona, mas o estoque finito falha, o NPC provavelmente alcança `0` Reserva de munição ou regeneração não está configurada.

![Recarregar e reservar configurações de munição.](assets/media/guides/warfare-031-neo1211/dw-ammo.png "Ammo Stock1 Significa munição de reserva ilimitada. A Sra. 0 usa a duração de recarga nativa da arma. Esses controles são separados de colocar um item de munição física na mão do NPC.")

## Problemas de detecção de som

A versão 0.2.9 usa um sistema de estímulo para tiros gerenciados, recargas, sons de bloqueio, sons de entidade e sons de mundo somente de posição. Use um jogador de Sobrevivência ao testar sons e verifique a detecção do alvo separadamente da investigação de som; e `Move To Source` ainda se rende ao combate ativo ou a uma posição bloqueada.

## Problemas de patrulha e busca de caminho

Patrulhas de área e rota mantêm um caminho A* ativo em `Default Walk Speed`. Se a criação ou conclusão do caminho falhar, o NPC será repetido imediatamente dentro de um limite limitado e, em seguida, pulará o ponto. Repetidamente empurrando uma parede ou tentando atravessá-la não é comportamento esperado.

Para uma descida fracassada de um bloco, confirme que um ponto de rota direto usa os pés Y pretendidos. A versão 0.2.0 resolve o terreno estável nas proximidades e inclui distância vertical nas verificações de chegada, mas não força o movimento através de cercas, lacunas seladas ou plataformas que não têm rota segura.

## Problemas de política de danos

`Gun Spec` preserva o comportamento de dano nativo da arma operada, enquanto `Custom` aplica a substituição DW suportada para este NPC. Melee `Weapon Spec` usa atributos de item; corpo a corpo `Custom` pode independentemente definir danos, knockback, e ataques por segundo. Troque uma política de cada vez ao isolar um resultado inesperado.

Habilitando `Better Combat Compatibility` trava a velocidade de ataque para que o item seja efetivo `ATTACK_SPEED` e `Overview` mostra `Weapon Spec (locked)`. Se os atributos da arma não forem aplicados em uma compilação mais antiga, atualize o cliente e o servidor para o 0.3.3 atual antes de testar novamente.

## Mudança de arma e problemas de animação corpo a corpo

O addon sincroniza o estado da mão principal confirmado pelo servidor com os clientes. Se uma releitura do equipamento corpo a corpo não corresponder ao item solicitado, o NPC atrasa o ataque e tenta novamente o equipamento em vez de atacar com a arma errada. Uma breve pausa durante o switch pode, portanto, ser esperada; uma arma permanentemente obsoleta deve primeiro ser verificada para versões JAR de cliente e servidor incompatíveis.

Exato Melhor Combate NPC movimento requer tanto Melhor Combate e criatura Jogador Animador. Mesmo com `Better Combat Compatibility` habilitado, o addon cai de volta para um balanço de baunilha quando a criatura Jogador Animador está faltando ou nenhum movimento de arma registrado utilizável está disponível.

## Problemas com o editor de poses

`DW Pose Core` é uma ferramenta criadora de modo criativo e atualmente suporta Steve/Alex CustomNPCs Modelos de jogadores. Mantenha o núcleo na mão principal ou fora da mão e permaneça dentro de 12 blocos do NPC durante a edição.

`Save` armazena apenas a pose JSON. `Save & Apply` armazena-o e aplica-o como a pose ociosa personalizada do NPC atual. Para usar o perfil para uma ação específica, abra `DW Npc Core > Pose`, defina essa ação como `Custom JSON`, selecione o perfil e salve a configuração NPC.

Os arquivos de pose são armazenados em:

```text
config/dochi_warfare/poses/
```

Fechamento de cabeça-rastreamento ou pé-pernas eixos pode fazer o movimento parecer congelado. Deixe eixos que devem continuar seguindo o movimento normal em `Animation`, e defina apenas os eixos que você precisa substituir para `Custom`.

## Problemas de regras de destino

Uma lista de identificação de entidade vazia permite gerenciar CustomNPCs Para herdar de verdade CustomNPCs hostilidade de facção. Não faz com que entidades passivas ou não relacionadas sejam alvos automáticos. Uma lista de ID de entidade preenchida torna-se um seletor explícito, enquanto as tags necessárias e rejeitadas permanecem filtros adicionais.

Em caso de dúvida, exporte o perfil de configuração, simplifique-o e reimporte após o teste.

## Desempenho e registro

A versão 0.2.0 usa índices espaciais para buscas longas `Detect Distance` e audição baseada em eventos para reduzir varreduras repetidas. Grande `Detect Distance`, grande `Max Distance`, listas de alvos amplas e muitos NPCs gerenciados ainda podem aumentar a filtragem de candidatos e o trabalho de combate. Mantenha os testes iniciais pequenos.

Traços detalhados de mão principal, troca de armas, cobertura e animação ficam atrás do registro de depuração. Ative o debug somente ao reproduzir um problema e, em seguida, desligue-o para que os logs do servidor ao vivo permaneçam legíveis.
