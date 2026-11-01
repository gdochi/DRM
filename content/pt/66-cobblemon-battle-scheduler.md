---
title: Battle Scheduler
slug: cobblemon-battle-scheduler
order: 534
description: Conecte clone geração, introdução/batalha/resultado cenas e admissão área em uma corrida.
product: drm-cobblemon-editor
category: Battle Scheduler
section: scheduler
status: Guia de uso
version: Fabric / NeoForge 0.2.9
audience: Encontrar criadores/operadores de servidor
translationSource: en
translationMethod: assisted
---

## Escolha o NPC que entra na batalha

Escolha um clone de editor ou modelo NPC em **Actor**. Para reutilizar uma terminada DNPC treinador, primeiro salve-o com seu papel em [Clone Library](#drm-cobblemon-editor/cobblemon-clone-library-spawner)Em seguida, conecte as posições da Arena e as cenas de sequência. Existente CustomNPCs clones e DNPC modelos usam formatos diferentes; nomes correspondentes não os tornam intercambiáveis.

## O que ele conecta

O programador executa ** NPC clone spawn → cena de introdução → apresentação de batalha → Cobblemon batalha → recompensas / progressão existentes → cena de resultado → limpeza do ator e saída **. Está disponível em Fabric e NeoForge Cobblemon Editor 0.2.9 para Minecraft 1.21.1. RCT é opcional.

O clone fornece o NPC e aparência; Treinador ou Pokémon em si JSON fornece configurações de batalha. Scene Maker fornece cenas de introdução/resultado, enquanto Battle Presentation Maker fornece a entrada da batalha. Executar um agendador não modifica o clone salvo.

![Programador com Ator, Arena, Sequência, Política, Prévia, Validar e Correr.](assets/media/guides/cobble-029-neo1211/cobble-scheduler.png "0.2.9 / NeoForge 1.21.1. Selecione uma fonte de ator e conecte as posições da Arena, cenas de sequência e gatilhos de política. Ativado sozinho não gera um ator.")

## Criar um primeiro encontro

1. Prepare um clone ou modelo do NPC e um arquivo de batalha do próprio Treinador ou Pokemon.
2. Abra **Battle Scheduler** na lista de editores de complementos do DRM.
3. Em **Actor**, selecione o clone e escolha **Use Existing Settings** ou **Apply New JSON**. Use o novo JSON quando o clone não tiver ligação de batalha.
4. Em **Arena**, configure o ID da sala, limites, posições de ator/jogador/saída e viradas para frente. Assumir a posição atual também registra seu mundo.
5. Em **Sequence**, conecte intro, apresentação de batalha e cenas de vitória/perda/fuga. Cenas são opcionais; uma apresentação vazia usa a ligação de batalha do ator.
6. Em **Policy**, definir comando/área/ambos desencadeando, admissão, deixar cancelamento, recarga, tempo limite de início e escopo de progressão.
7. Em **Preview**, jogue/pare e escolha ganhar, perder ou fugir. Recarregue as referências depois de alterar seus arquivos.
8. Valide, salve um arquivo de usuário com `Save As` e use Executar para testar a geração e a batalha reais.

Pré-visualização lê arquivos referenciados, aparência de clone, cenas e apresentação. Teste a geração real, vitória e recompensas com uma corrida real. Carregue os pedaços usados pela área e visualize a câmera.

## Selecione uma área no mundo

Use **Arena → Select area** para mover a caixa ou arraste os cantos, depois aplique. Esc cancela, e os blocos nunca são alterados. Limites máximos são exclusivos. Coloque posições iniciais de ator/jogador dentro da área e escolha uma saída utilizável.

Habilite **Show scheduler areas** no Mods Config e segure o DRM Core in Creative para ver até 16 áreas próximas dentro de 64 blocos. Verde significa ON, cinza e laranja em uso. A permissão de edição é necessária; guias são escondidos durante cenas ou batalhas. Esta configuração de exibição local é separada do controle de entrada automática.

## Controle a entrada automática

O controle ON/OFF da área do arquivo salvo se aplica imediatamente no servidor e persiste em reinicializações. OFF interrompe novas admissões automáticas enquanto as batalhas atuais continuam e o Start explícito permanece disponível. Use Cancelar para parar uma corrida. Salvar um rascunho do editor não redefine esse interruptor operacional.

```text
/drm battle_scheduler area on "boss_room.json"
/drm battle_scheduler area off "boss_room.json"
/drm battle_scheduler area status "boss_room.json"
```

Entrada automática também requer um documento habilitado, área ou ambos desencadeando, e limites habilitados. A entrada é verificada quando o jogador entra; permanecer dentro não gera atores repetidamente.

## Comandos e diálogo

O administrador comanda o alvo de um jogador. Um jogador executando o comando pode omitir o argumento do jogador para atacar a si mesmo.

```text
/drm battle_scheduler start "boss_room.json" PlayerName
/drm battle_scheduler cancel PlayerName
```

Em DRM comandos de diálogo/pedido, substitua `PlayerName` por `{player}`. **Copy Command** usa essa forma. `@player` pertence à substituição de texto de exibição, não ao argumento do jogador deste comando. Alternativamente, escolha a ação de diálogo **Battle Scheduler** e selecione um servidor JSON. O sucesso fecha o diálogo, o fracasso o mantém aberto.

## Reservas e limpeza

O mesmo jogador, o mesmo ID de mundo/quarto, ou áreas sobrepostas no mesmo mundo não podem ser executados simultaneamente. Arquivos diferentes visando um quarto compartilham a reserva até as cenas de resultados e a limpeza terminar. A admissão individual rejeita as salas ocupadas; a admissão do espectador permite a visualização enquanto bloqueia uma batalha separada contra o ator reservado.

Cancelamento, saída, desconexão, morte, falha de geração e tempo limite de início limpam cenas e o ator gerado e liberam reservas. Os NPCs comuns não são removidos. As referências são corrigidas quando uma execução é iniciada, então as alterações de arquivo entram em vigor na próxima execução.

## Arquivos e solução de problemas

| Dados | Caminho |
| --- | --- |
| Agendador JSON | `config/dochi_rpg_maker/cobblemon/battle_schedulers/` |
| Estado operacional de entrada automática | `config/dochi_rpg_maker/cobblemon/battle_scheduler_area_state.json` |

Para ferramentas externas, o esquema é `dochi.cobble.battle_scheduler.v1`. Progressão é independente do ator temporário UUID; Save As para um arquivo diferente cria um ID de progressão separado. Se o início falhar, verifique a permissão de edição, ligações de clone/batalha, pedaços, reservas de quarto e recarga.
