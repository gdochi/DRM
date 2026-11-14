---
title: Integrações de armas gerenciadas
slug: warfare-gun-integrations
order: 365
description: Usar TACZ, PointBlank, e SuperbWarfare armas através do compartilhado Dochi's Warfare Controlador de combate.
product: dochi-warfare
category: Integrações de armas
section: integrations
status: Rascunho
version: 0.3.3
audience: Criadores de NPC de armas de fogo
tags:
  - TACZ
  - PointBlank
  - SuperbWarfare
translationSource: en
translationMethod: assisted
---

DW 0.3.3 suporta Forge 1.20.1, NeoForge 1.21.1 e Fabric 1.21.1. Os veículos precisam de DWE e SuperbWarfare. Siga a [instalação por loader](#dochi-warfare/warfare-setup) para as dependências externas.

## Dê a um NPC uma arma de outro mod

Com um mod de arma compatível instalado, escolha sua arma na página **Gun** da DW. Coloque o item real no inventário do criador, abra o NPC com o DW Npc Core, selecione o item e confirme a visualização e **Stored gun** antes de salvar.

![Seleção de armas e uma piscina M4A1 armazenada.](assets/media/guides/warfare-031-neo1211/dw-gun.png "DW 0.3.1 / NeoForge 1.21.1, IU Inglês. O ícone superior vem do inventário do criador; a lista inferior é a piscina para armazenar no NPC. Este exemplo tem um M4A1 em 100%.")

DW controla quem o NPC detecta e quando dispara ou recarrega. O mod original da arma fornece o modelo, projétil, sons intrínsecos e mecânica de disparo apoiada. Ao trocar de armas, verifique o alcance da arma, a cadência e as ações especiais apoiadas ao lado das configurações de DW.

## Adaptadores suportados

| Sistema de armas | Exigência | Comportamento nativo retido |
| --- | --- | --- |
| TACZ | Forge/NeoForge: integrações TaCZ existentes e 1.2.0. Fabric: TACZ Refabricated 0.7.1 e 1.2.0 | Disparo, estado da arma, estado de recarga, RPM, focinho/efeitos, e persistência da pilha |
| PointBlank | Opcional 1.11.1 ou 2.1.0; instale exatamente um | Projétil nativo ou hitscan, raios multi-pellet, headshots, queda, recarregar fases, sons e renderizador |
| SuperbWarfare | Forge 0.8.9 / 0.8.9.1 / 0.8.9.2; NeoForge 0.8.9.1 / 0.8.9.2 | Nativo disparando, recarregando, parafuso, projétil, som, calor, recuo, durabilidade, modelos, anexos e persistência |

Um mod da família TACZ continua obrigatório. Player Animator é obrigatório nos clientes Forge/NeoForge e opcional no Fabric. Use PointBlank/SuperbWarfare apenas quando existir uma versão compatível com o Minecraft e o loader usados.

:::warning Portões de versão
Instale uma ramificação suportada PointBlank: 1.11.1 ou 2.1.0. Use as versões SuperbWarfare específicas do carregador acima.
:::

## Configurar uma arma externa

1. Primeiro confirme o disparo básico do NPC com uma arma TACZ ou TACZ Refabricated comum, compatível com seu loader.
2. Instale exatamente uma versão mod de arma opcional suportada em ambos os lados.
3. Coloque o item da arma nativa no inventário do criador.
4. Abra o NPC com `DW Npc Core` e selecione o item em `Gun`. Para múltiplas armas, faça com que as chances de piscina totalizem 100% ou pressione `Even`.
5. Mantenha `Ammo Stock: -1`, `Reload Duration Ms: 0`, e um alvo visível simples para o primeiro teste.
6. Salve, verifique a renderização e o disparo nativos, adicione munição finita, piscinas, RPM personalizado ou IA avançada.

Itens suportados também podem ser misturados em uma piscina de armas aleatórias. Uma arma de fogo especial não suportada ou apenas corpo a corpo é rejeitada ao invés de parcialmente gerenciada.

## RPM, recarga e munição

O rótulo de interface do usuário `RPM Mode: TACZ Native` é mantido para compatibilidade. Para um adaptador opcional, o modo nativo resolve a cadência suportada pela arma operada. Configurações de RPM fixas e aleatórias ainda são limitadas pelo comportamento de recarga nativo; uma arma rejeitando um tiro não consome uma oportunidade extra de disparo DW.

`Reload Duration Ms: 0` usa o tempo de recarga vazio ou tático nativo da arma operada. Um valor positivo é uma substituição manual. Reserva de munição sempre vem de DW `Ammo Stock`; não TACZ, PointBlank, ou SuperbWarfare munição ou item de revista deve ser colocado no NPC offhand.

## Solução de problemas com falha fechada

Se TACZ funcionar, mas uma arma externa não funciona:

1. Verifique a versão exata do adaptador.
2. Remova o outro ramo PointBlank se ambos estiverem instalados.
3. Teste uma arma de fogo normal sem fogo especial ou apenas procedimentos corpo a corpo.
4. Mantenha RPM nativo, munição de reserva infinita e uma linha de visão clara.
5. Verifique as mensagens do servidor para obter uma arma ou versão não suportada.

Não compense por um adaptador incompatível levantando RPM, adicionando munição extraviada ou substituindo o renderizador nativo.
