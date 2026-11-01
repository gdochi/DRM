---
title: Coloque uma mesa e jogue
slug: minigames-setup
order: 1300
description: Abra um minijogo e escolha suas regras, taxa de inscrição e recompensas.
product: dochi-minigames
category: Iniciar
section: setup
status: Guia de uso
version: 0.1.6
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Jogue uma rodada primeiro

Coloque a [mesa minigame](#dochi-minigames/minigames-tables) e escolher um jogo. DRM não é necessário.

Os criadores podem abrir `/minigame editor`, carregar uma predefinição e **Apply to table**. Os jogadores clicam com o botão direito na mesa para entrar.

### Tente uma rodada do editor

Essas telas inglesas são de **Minigames 0.1.5 / NeoForge 1.21.1**. Escolha um exemplo em **Presets**, então inspecione o editor.

![Editor de minijogos com tipos de jogo à esquerda, uma pré-visualização do Monty Hall no meio e configurações de título, hora e taxa à direita.](assets/media/guides/minigames-015-neo1211/minigames-editor.png "Escolha um jogo à esquerda e configure seu Inspetor à direita. O meio é uma pré-visualização de design; A reprodução de teste abre a tela jogável.")

1. Selecione **Monty Hall** à esquerda.
2. Defina seu título e **Time (s)** abaixo de **General**. **Entry fee → 0** é livre.
3. Escolha regras de porta em **Rules**, itens em **Symbols** e prêmios em **Rewards**.
4. Pressione **Test play** no topo. Escolha uma porta fechada, uma vez que as portas perdidas são reveladas, escolha se deve manter sua porta original ou mudar.

![A tela de teste jogável do Monty Hall, mostrando três portas fechadas, pontuação e tempo restante.](assets/media/guides/minigames-015-neo1211/minigames-test-play.png "Test play não usa taxa de entrada ou recompensas. Depois de verificar a jogabilidade, teste a confirmação de entrada e liquidação na mesa real separadamente.")

## Jogos disponíveis

Escolha Monty Hall, slots, memória, whack, timing, high-low, tiro ou o **MWENT** Jogo de cartas. Use [regras do jogo](#dochi-minigames/minigames-rules-rewards) para definir jogadas e recompensas. MWENT tem seu próprio guia [começando](#mwent/start).

**0.1.6 adiciona [Item Roulette](#dochi-minigames/minigames-roulette)** ao lado dos jogos existentes, com seus próprios prêmios e chances.

## Faça disso o seu jogo

1. Carregue uma predefinição no editor.
2. Mude seu título, limite de tempo e regras.
3. Escolha uma taxa de inscrição e recompensas. Uma taxa de 0 é gratuita.
4. Use **Save As** para manter seu jogo.
5. Aplique na mesa que vai usá-la.

O pagamento acontece quando o jogador pressiona **Start** na tela de entrada. Cancelar a tela é gratuito; fechar um jogo de pontuação já iniciado conta como perda. Rotação padrão na roleta do bloco começa e cobra no clique da máquina sem uma janela de entrada, e mantém seu sorteio e prêmio; siga o [Guia de roleta](#dochi-minigames/minigames-roulette).

## Abra a partir de um NPC ou diálogo

Com DRM, use **NPC Apply → Minigames** para dar um jogo a um NPC.

Para acesso somente ao diálogo, use um **Go Minigames** Escolha a ação em vez de aplicar o jogo diretamente. Um jogo aplicado diretamente abre antes do diálogo.

## Escolha os arquivos de instalação

| Minecraft | Carregador | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

Este guia segue 0.1.6. 0.1.5 As capturas de tela anteriores mantêm as legendas de versão. Corresponder versões/carregadores no servidor e clientes; Fabric também precisa de Fabric API. DRM dinheiro ou Cobblemon As recompensas precisam de seus respectivos mods.
