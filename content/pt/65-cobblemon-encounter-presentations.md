---
title: Wild, RCT, e PvP Apresentações
slug: cobblemon-encounter-presentations
order: 535
description: Vincular cenas salvas para encontrar categorias e exceções individuais.
product: drm-cobblemon-editor
category: Apresentação de batalha
section: presentation
status: Rascunho
version: Fabric / NeoForge 0.2.9
audience: Criadores e operadores
translationSource: en
translationMethod: assisted
---

## Crie uma cena, então amarre-a.

`Battle Presentation Maker` Autores cenas. **Encounter Presentations** separadamente liga cenas salvas a selvagens comuns Pokémon, RCT treinadores, e batalhas PvP. Encontre-o diretamente abaixo de Battle Presentation na lista de editores addon DRM.

1. Salve uma cena em [ Battle Presentation](#drm-cobblemon-editor/cobblemon-battle-presentation).
2. Abra Apresentações de Encontro e selecione Wild, RCT ou PvP.
3. Ative o switch global dessa categoria e selecione uma cena JSON do servidor.
4. Adicionar espécies selvagens ou RCT-Exceções de entidades, se necessário.
5. Salve e verifique a próxima batalha.

Nova categoria muda para Desligado. Os treinadores NPC existentes mantêm suas próprias configurações de apresentação do Treinador sem reprodução dupla. RCT API permanece opcional.

| Configurando | Resultado |
| --- | --- |
| Global OFF | Desativado mesmo quando uma regra individual está ligada |
| Global ON, individual OFF | Desativado para esse alvo |
| Global ON, individual ON ou ausente | Ativado |
| Conjunto de caminho de cena individual | Usa a cena individual |
| Caminho individual vazio | Herda a cena global |
| O caminho global também está vazio | Usa a cena padrão da categoria de batalha |

Exceções selvagens usam **IDs de espécies**, como `cobblemon:pikachu`, ao invés de entidades mundiais individuais. RCT uso de exceções **entidade mundial UUIDs**. O PvP fornece apenas um caminho global de mudança e cena, sem exceções por jogador.

![Pokémon, Treinadores e PvP apresentação vinculação com categoria padrões.](assets/media/guides/cobble-029-neo1211/cobble-encounters.png "0.2.9 / NeoForge 1.21.1. A parte superior de uma categoria desativa-a completamente. Escolha seu arquivo compartilhado em Apresentação global de categoria e selecione uma entrada para uma substituição individual.")

## PvP e pular

PvP para dois jogadores com um jogador de cada lado suporta singles e formatos duplos. Duas contra duas batalhas múltiplas estão fora deste fluxo de trabalho de apresentação. Cada participante se vê como Jogador e seu rival como Oponente.

Para uma cena skippable, pular um participante não abrevia o temporizador do outro. Ambos pulando podem começar a batalha cedo. O servidor possui tempo, bloqueia solicitações de participantes sobrepostas e permite que batalhas independentes prossigam simultaneamente.

## Armazenamento e solução de problemas

```text
config/dochi_rpg_maker/cobblemon/encounter_presentations/settings.json
config/dochi_rpg_maker/cobblemon/battle_presentations/
```

O primeiro arquivo armazena encadernações; a pasta armazena cenas. Transfira cenas referenciadas com suas ligações e selecione caminhos de servidor, não arquivos client-local.

Se a reprodução estiver faltando, marque a categoria switch global → regra individual OFF → JSON path → categoria de batalha real. Imagens e sons personalizados também devem existir em pacotes de recursos do cliente. As compilações atuais corrigem solicitações repetidas de lista de carga que esgotaram o orçamento de leitura compartilhada. Para erros repetidos `rate limited` em compilações mais antigas, alinhe o servidor e os clientes à compilação atual para o carregador.
