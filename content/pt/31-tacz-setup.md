---
title: Instalar e configurar o primeiro tiro
slug: warfare-setup
order: 320
description: Instale os mods necessários e configure um NPC para disparar.
product: dochi-warfare
category: Configuração
section: setup
status: Rascunho
version: 0.3.3
audience: Operadores de servidor
tags:
  - setup
  - TACZ
  - gui
translationSource: en
translationMethod: assisted
---

## Mods necessários

| Item | Exigência |
| --- | --- |
| Minecraft / carregador | Forge 1.20.1, NeoForge 1.21.1 ou Fabric 1.21.1 |
| Java | Forge 17 / NeoForge e Fabric 21 |
| DW | 0.3.3 do carregador correto |
| TACZ | Obrigatório: TACZ no Forge/NeoForge; TACZ Refabricated no Fabric. A antiga restrição abaixo de 1.2 não se aplica |
| Player Animator | Obrigatório nos clientes Forge/NeoForge: Forge 1.0.0+ / NeoForge 2.0+. Opcional no Fabric |
| Fabric | Fabric API + Forge Config API Port (versões Fabric) |
| Mod NPC | DNPC ou CustomNPCs |

Instale o carregador de correspondência DW e seus requisitos no servidor e cliente. DRM é opcional. Para veículos, adicione **DWE 0.3.3** e SuperbWarfare. SuperbWarfare As versões suportadas são ** 0.8.9 / 0.8.9.1 / 0.8.9.2 ** em Forge e ** 0.8.9.1 / 0.8.9.2 ** em NeoForge. Inclua as próprias dependências de SuperbWarfare, como Kotlin para Forge.

## Escolha uma arma do inventário do jogador

Essas telas inglesas usam **DW 0.3.1, DNPC 0.1.3 and NeoForge 1.21.1**.

![Carbina M4A1 selecionada em Gun com a prévia NPC armada.](assets/media/guides/warfare-031-neo1211/dw-gun.png "Escolha Gun à esquerda e clique em uma arma de fogo no catálogo de inventário do jogador. Verifique a arma armazenada e o 100% entrada de armas abaixo.")

1. Coloque um NPC. Veja [ DNPC setup](#dochi-npc-core/npc-core-setup) para um primeiro ator.
2. Coloque uma arma de fogo suportada no inventário **player** e clique com o botão direito do mouse no NPC com **DW Npc Core**.
3. Ativar **TACZ Fire NPC Mode** no canto superior direito. Verifique o modo e o estado ativado em **Overview**.
4. Em **Gun**, selecione o ícone de arma de fogo. Se a lista estiver vazia, verifique o inventário do jogador.
5. Em **Senses → Quick View → Combat Mode**, escolha **Stance: Ranged** ou **Auto**. Ranged usa a arma. Trocas automáticas entre o alcance e o corpo a distância.
6. Em **Quick View → Fire Rate**, comece com **RPM Mode: TACZ Native**. Taxa e precisão estão configuradas aqui.
7. Ativar **Reload / Supply Ammo** em **Ammo** e definir **Ammo Stock**. `-1` fornece reservas ilimitadas.
8. Selecione um alvo em **Targets** e, em seguida, use o controle top **Save** para salvar no NPC.
9. Teste contra um alvo válido dentro do alcance, com visão clara e a direção correta de detecção. Verifique se disparam e recarregam.

## Encontre a próxima configuração

![Sentindo a Visão Rápida ao lado do Modo de Consciência e Combate.](assets/media/guides/warfare-031-neo1211/dw-senses.png "Clique em uma entrada Quick View para pular para essa seção. Distância de detecção e distância de disparo são configuradas separadamente.")

| Localização | Controles |
| --- | --- |
| **Gun / Melee** | Armas e danos à distância / corpo a corpo |
| **Senses → Awareness** | Distância de aquisição, ângulo, atraso e movimento ocioso |
| **Senses → Combat Mode** | Interrupção e comportamento de engajamento de Ranged/Melee |
| **Senses → Fire Modes / Fire Rate** | Movendo fogo e explosões / taxa e precisão |
| **Targets** | Alvos para atacar |
| **Ammo** | Recarregamento, reservas e regeneração |
| **Armor / Visual & FX / Pose** | Armadura, aparência, sons e poses |
| **Cover** | Cubra durante o combate. |

**Overview** resume os valores atuais. Múltiplos candidatos a armas, peles ou armaduras devem totalizar **100%** em sua respectiva piscina. A interface atual **Even** O controle distribui a probabilidade igualmente.

## Reutilizar configurações em outro NPC

**Save As** um perfil, **Load** em outro NPC, então **Save**. Os perfis estão em `config/dochi_warfare/target_entities/`. Para manter o NPC em si, clique com o botão direito no ar com o núcleo para abrir a biblioteca [clone](#dochi-warfare/warfare-entity-clones).

Continue até [Easy Build and Presets](#dochi-warfare/warfare-easy-build-presets) para configuração de comportamento guiado, ou [problemshooting](#dochi-warfare/warfare-troubleshooting) se não disparar. Usar **DW Pose Core / DW Mercenary Core / DW Booby Trap Core** para poses, contratações ou armadilhas, e [DWE](#dochi-warfare-expanded/expanded-overview) para veículos.

## Instalação e salvamento na 0.3.3

Forge/NeoForge preservam as integrações TaCZ existentes e adicionam 1.2.0. Fabric suporta TACZ Refabricated 0.7.1 e 1.2.0. Isso não garante todas as versões antigas ou futuras. No Fabric, Mod Menu abre as configurações do DW.

Use **Ctrl+S** nos editores e telas que já possuem Save. Para um novo documento que exija Save As, escolha o nome e aguarde a confirmação do servidor. As imagens da 0.3.1 abaixo identificam a versão gravada; não indicam que você deve instalar uma versão anterior.
