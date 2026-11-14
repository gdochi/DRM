---
title: Contratos Mercenários e Comando HUD
slug: warfare-mercenary
order: 355
description: Configure os termos de contratação com o DW Mercenary Core e, em seguida, gerencie contratos ativos através do comando HUD do jogador.
product: dochi-warfare
category: Mercenários
section: mercenary
status: Rascunho
version: 0.3.1
audience: Criadores e jogadores
tags:
  - mercenary
  - contract
  - hud
translationSource: en
translationMethod: assisted
---

## Dois tipos de tela diferentes

O fluxo de trabalho mercenário separa deliberadamente as ferramentas criadoras das telas do jogo.

| Tela ou item | Quem a usa? | Propósito |
| --- | --- | --- |
| `DW Mercenary Core` e `Mercenary Contract Settings` | Criador no modo Criativo | Edite os termos de contratação de um NPC gerenciado pela DW. |
| `Mercenary Contract` confirmação | Jogador | Reveja o custo, a duração, o uso da lista e os termos de ataque do proprietário antes de pagar. |
| `Mercenary Status` comando HUD | Jogador com contratos ativos | Inspecione, selecione, comande, invoque, recue ou liberte mercenários contratados. |

`DW Mercenary Core` não faz parte do `DW Npc Core` editor de armas de fogo. Abre um editor separado e aceita NPCs gerenciados por DW DNPC ou CustomNPCs.

![Configurações de Contrato Mercenário para disponibilidade, pagamento, duração e ataques do proprietário.](assets/media/guides/warfare-031-neo1211/dw-mercenary.png "DW 0.3.1 / DNPC 0.1.3 / NeoForge 1.21.1. Salve a arma de fogo do NPC primeiro e abra-a enquanto segura o Núcleo Mercenário da DW. O aluguel disponível ainda está desligado neste exemplo.")

## Configuração do criador

1. Configure e teste o combate de armas de fogo do NPC com `DW Npc Core`.
2. No modo Criativo, segure `DW Mercenary Core`.
3. Clique com o botão direito do mouse no NPC gerenciado por DW.
4. Configure o contrato e pressione `Save`.

| Campo do contrato | Significado |
| --- | --- |
| `Hire available` | Permite a interação normal do jogador para solicitar uma oferta de contrato. |
| `Cost item ID` | ID do registro do item de contratação. |
| `Cost item count` | Número removido quando o jogador confirmar. O acesso criativo/operador pode dispensar o custo. |
| `Hire duration (seconds)` | Tempo total de contrato ativo. |
| `Summon windup (seconds)` | Atraso de 0 para 60 segundos antes de um mercenário armazenado ser implantado. |
| `Recall windup (seconds)` | Atraso de 0 a 60 segundos antes que um mercenário implantado seja armazenado. |
| `Faction hostility / hits` | Número de ataques de proprietários prejudiciais antes que os NPCs próximos tratem o proprietário como hostil. O contrato em si permanece ativo. |
| `Automatic contract break / hits` | Limite de acerto independente que encerra o contrato e a proteção do proprietário. |
| `Hit reset window (seconds)` | Janela de sucesso do proprietário consecutiva de 1 a 10 segundos. A contagem é reiniciada após tanto tempo sem outro golpe prejudicial. |

A hostilidade da fação e a quebra automática do contrato são independentes. Habilitar um não permite silenciosamente o outro.

## Contratando como jogador

Interagir normalmente com um NPC contratável. Não segure `DW Npc Core`, `DW Mercenary Core` ou um item de editor CustomNPCs; esses itens mantêm seu próprio comportamento de edição.

A tela de confirmação não-pausando mostra o NPC, preço, duração do contrato, slots de lista e regras de ataque do proprietário. O servidor verifica novamente a oferta, a distância, o custo do item, os termos atuais, a propriedade e o limite da lista quando o jogador confirma.

Cada jogador pode ter até cinco contratos ativos. O pagamento é cobrado somente após a confirmação do servidor. Contratos liberados manualmente não são reembolsados.

## Contrato de estados e temporizador

| Estado | Comportamento do temporizador |
| --- | --- |
| Implantado ou seguindo/formação/mantendo/combate | O tempo de contrato ativo continua. |
| Lembrando | O tempo de contrato ativo continua durante o término. |
| Armazenado | O temporizador está pausado. |
| Invocando | O temporizador permanece parado até a implantação ser concluída. |
| Área descarregada | O contrato permanece implantado e é mostrado como descarregada. |

Recall salva o estado atual do NPC antes do armazenamento. Invocar restaura o NPC armazenado perto do proprietário somente quando um espaço seguro é encontrado. Se os dados armazenados necessários não puderem ser restaurados com segurança, o comando será rejeitado em vez de inventar um NPC substituto.

## Abra e use o tempo de execução HUD

Mantenha o padrão `J` chave para mostrar o comando mercenário HUD. Segure `Left Alt` enquanto estiver aberto para liberar o controle da câmera e interagir com os botões HUD. Solte `Left Alt` para retornar o controle da câmera; libere `J` para fechar o HUD.

O HUD mostra até os cinco contratos de propriedade, incluindo:

* Estado do contrato e tempo restante
* Modo de movimento e espaço de formação
* Modo de fogo e postura de combate
* Implantação, convocação e estado de recall
* Contagem atual de proprietários, limite de hostilidade de facção, limite de quebra de contrato e tempo de redefinição

Mercenários podem ser verificados individualmente. Comandos podem direcionar a seleção ou todos os mercenários elegíveis, e o resultado relata quantos aceitaram ou pularam a ordem.

A versão 0.2.3 consolida ordens opostas em botões conscientes do estado. Por exemplo, uma seleção All-Follow oferece Hold; caso contrário, o botão oferece Follow. Formação, postura defensiva/agressiva, e fogo em Will/Hold Fire funcionam da mesma forma. Se algum mercenário selecionado for armazenado, a implantação oferece Invocação primeiro; quando todos os mercenários selecionados são implantados, muda para Recall. Selecções mistas podem ser normalizadas para Seguir, Rear Form, Defensive ou Fire At Will.

Enquanto o servidor processa uma ordem, o botão mantém seu estado visual normal, mas ignora cliques adicionais. Torna-se interativo novamente após o resultado chegar, evitando ordens duplicadas acidentais.

## Comandos de movimento e combate

| Comando | Comportamento |
| --- | --- |
| `Follow` | Siga o dono sem uma vaga de formação fixa. |
| `Rear Form` | Use um espaço de formação atrás do dono. |
| `Front Form` | Use um slot de formação frontal. |
| `Hold` | Salve a posição atual como âncora de espera. |
| `Regroup` | Limpe a tarefa de movimento atual e volte para Seguir. |
| `Hold Fire` | Pare a saída de armas de fogo e alveje a aquisição até ser liberada. |
| `Fire At Will` | Permita disparos e aquisição de alvos novamente. |
| `Defensive Posture` | Reaja a combates reais e ameaças válidas. |
| `Aggressive Posture` | Envolva os inimigos de forma proativa, reconhecidos através das relações de ameaça válidas do proprietário e as regras do alvo do NPC. |
| `Summon` | Implantar um mercenário armazenado após o seu término configurado. |
| `Recall` | Armazene um mercenário implantado após o seu término configurado. |

A postura agressiva não é uma permissão para atacar todas as entidades próximas. Seletores de alvos explícitos, CustomNPCs hostilidade de facção, proteção de jogador amigável, tags e regras reativas autorizadas pelo servidor ainda filtram candidatos.

## Ataques do proprietário e quebra de contrato

O dano do proprietário só é contado quando é um verdadeiro golpe prejudicial. O dano multi-hit conta uma vez, e o contador é reiniciado após a janela silenciosa configurada.

* `Faction hostility / hits` começa uma resposta de facção. Os NPCs próximos podem tratar o dono como hostil, mas o contrato de mercenários permanece ativo.
* `Automatic contract break / hits` Termina o contrato e a proteção do proprietário. Nenhum reembolso é emitido.
* Se ambos os limiares são cruzados, ambos os resultados são relatados.

O HUD ao vivo mostra a contagem atual e os dois limiares para que o jogador possa ver o risco antes de outro hit.

## Liberação e expiração

A liberação de um contrato requer confirmação e não dá reembolso. Um NPC armazenado é restaurado antes da liberação; se a restauração falhar, a liberação é cancelada para evitar perder o NPC.

Quando o tempo de contrato ativo chega a zero, o contrato expira automaticamente. Se um NPC contratado for removido, o contrato também termina e o proprietário é notificado.
