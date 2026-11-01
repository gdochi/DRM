---
title: Configurar tabelas, cartões e pacotes
slug: authoring
order: 1540
description: Mapeamentos de tabelas de operadores, cartões personalizados, pacotes de cartões e caminhos de armazenamento próprios.
product: mwent
category: Operações e autoria
section: authoring
status: Guia
version: 0.1.6
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Mapear um jogo para uma mesa

Os operadores podem clicar com o botão direito do mouse em uma tabela com a mão vazia para selecionar um jogo salvo MWENT ou um perfil embutido. Múltiplas tabelas podem reutilizar um ID de jogo. Mapeamento não requer um novo JSON para cada bloco. A seleção do deck do jogador é separada das configurações do jogo do operador compartilhado.

O atual editor de jogos gerencia regras, condições de início, recompensas, apresentação e seleção de IA integrada. Configure recompensas de vitória na guia Recompensas. A prática padrão de IA é gratuita e não recompensada. O servidor verifica as condições de início, recompensa os destinatários e os resultados. Referências a DRM moedas, condições ou ações exigem seu provedor.

## Crie um cartão personalizado em 0.1.5

1. Abra **MWENT Table → Card Editor** ou **Mods Config → Minigames → Custom Cards → Card Editor**. `/minigame cards` é outra entrada.
2. Crie um cartão ou use **Save As** para copiar um cartão existente na biblioteca personalizada.
3. Definir facção, armação, raridade, poder, provisões, modelo e equipamento.
4. Configurar o gatilho → condições → alvo → operações → custos e limites.
5. Salve, conecte o cartão a coleções, baralhos, pacotes ou piscinas de aquisição e verifique em uma batalha.

Salvar registra uma definição; não concede itens físicos nem cópias próprias. Variantes cosméticas de cartões existentes compartilham a propriedade do original e duplicam os limites e mantêm seus valores de combate. Correndo fósforos manter as definições que começaram com.

### Leia o Editor de Cartões

Estes **Minigames 0.1.5 / NeoForge 1.21.1** telas mostram o built-in **Imperial Artisan**. Use **Save As** para criar um cartão personalizado antes de tentar editar campos internos desativados.

![A guia Basic do Editor de Cartões com a pré-visualização do cartão, nome, tipo, facção, descrição e lista de cartões personalizados.](assets/media/guides/minigames-015-neo1211/minigames-card-basic.png "Conjuntos básicos de identidade e tipo. Aparência lida com modelo/equipamento, Stats lida com poder e estados, e Habilidades lida com efeitos desencadeados.")

![Estatísticas com a palavra-chave Salvage 1 existente, contador/temporizador inicial, estados especiais e Power.](assets/media/guides/minigames-015-neo1211/minigames-card-stats.png "As estatísticas incluem palavras-chave e estados iniciais, bem como poder. Este exemplo embutido tem Salvage 1.")

![Habilidades com a habilidade existente selecionada, mostrando Impulso e Quantidade 2.](assets/media/guides/minigames-015-neo1211/minigames-card-abilities.png "Selecione uma habilidade à esquerda primeiro. Seu efeito Boost 2 é separado do próprio poder do cartão 4.")

Cada carta suporta até doze habilidades, com oito condições e oito operações por habilidade. Conecte a implantação, ordem, fim da curva, destruição, movimento, cura e eventos de jogo de cartas. A seleção de destino direto é usada para Implantar e Ordem; gatilhos automáticos usam seleções como todas ou aleatórias. Cenários, locais, armadilhas e capítulos também podem ser escritos.

## Modelos de cerco e provedores opcionais

0.1.5 inclui ballista original, trebuchet, canhão, autoloader, ballista motorizado, autocanhão e modelos de supply-wagon. Selecione um modelo de máquina na aparência de um cartão de entidade. Modelos básicos e habilidades funcionam sem Criar ou Grandes Canhões. Paletes compatíveis usam ativos instalados reais; o combate com cartões não requer maquinário mundial ou uma rede de energia.

DNPC Aparências de clones são opcionais. Salve uma entidade fallback para que provedores ou modelos ausentes restaurem o modelo padrão. Inteligência artificial, empregos, inventários e estatísticas de combate não se tornam regras de cartas.

## Faça pacotes de cartões

O editor de pacotes controla cartões fixos, piscinas ponderadas, quantidades, opções de cartões finais e aparência. Verifique se os destinatários podem usar os cartões selecionados. O servidor possui resultados de abertura. Conecte distribuição comerciante e peito através [configurações de aquisição](#mwent/acquisition).

![O exemplo do Volkar Muster Pack, com uma piscina de cartas ponderada à esquerda, abrindo opções acima e detalhes do cartão à direita.](assets/media/guides/minigames-015-neo1211/minigames-card-packs.png "Peso é um peso de seleção relativo dentro da piscina. Leia cartões garantidos para quantidade e opções de escolha para a escolha final separadamente.")

Use **Get saved pack** no topo para obter um pacote salvo. Salve o seu primeiro, depois abra o item físico para verificar a sequência de contagem e escolha garantidas.

## Referência de armazenamento

| Localização | Conteúdo |
| --- | --- |
| `config/dochi_minigames/games/mob_battle/` | Reutilizável MWENT jogo / mapeamentos de IA |
| `config/dochi_minigames/cards/custom_card_<number>.json` | 0.1.5 definições de cartão personalizado |
| `config/dochi_minigames/card_packs/` | Definições do pacote de cartões |
| `config/dochi_minigames/acquisition.json` | Configurações de aquisição ativa |
| `<world>/data/dochi_minigames/cards/` | Quantidades de cofre por jogador |
| `<world>/data/dochi_minigames/decks/` | Decks salvos por jogador |

Minigames possui jogos, cartas e pacotes, mesmo com DRM instalado. Use Save As para arquivos personalizados antes de mapeá-los. Os arquivos legados `table_<32 hex>` permanecem compatíveis com leitura em `config/dochi_minigames/internal/tables/`; novos blocos não os criam automaticamente. DRM GUI Maker layouts são separados das regras do jogo.
