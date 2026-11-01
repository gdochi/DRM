---
title: MWENT aquisição de cartão
slug: acquisition
order: 1545
description: Configurar comércios comerciais, saques no peito, piscinas ponderadas e ativação de perfil.
product: mwent
category: MWENT aquisição de cartão
section: authoring
status: Guia
version: 0.1.6
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Abra o editor

Minigames **0.1.6** suporta cartões físicos e pacotes em ofertas de aldeão/viajante-comerciante e gerou saques no peito. DRM é opcional.

1. Abra as configurações do Minigames e escolha **Edit MWENT**.
2. Escolha **General / Merchant trades / Chest rewards / Product pools** à esquerda.
3. Selecione uma regra e edite seus valores no meio.
4. Escolha cartões, pacotes ou alvos de tabela de saque à direita.
5. Use a barra superior **Apply** para ativar o rascunho.

Enquanto estiver conectado, você edita as configurações do servidor com o nível do operador 2. Fora de um mundo, edita arquivos locais para a próxima inicialização. Os seletores de itens não estão disponíveis lá, mas os IDs, valores e pesos existentes permanecem editáveis.

## Tipos de regras

![Interruptor mestre de aquisição e interruptores de comércio / peito separados.](assets/media/guides/minigames-016-neo1211/mwent-acquisition-general.png "Minijogos 0.1.6 / NeoForge 1.21.1. Ativado é o interruptor mestre; os próximos três aldeões de controle, comerciantes errantes e baús naturais separadamente. O rascunho do servidor significa que as edições ainda precisam da barra superior Aplicar.")

| Categoria | Conteúdo |
| --- | --- |
| Comerciante negocia | Profissão/nível, piscina, item de pagamento, faixa de preço, contagem, estoque e experiência |
| Saque no peito. | Incluiu/excluído loot-table IDs, piscina, chance, rolos e contagem |
| Piscinas de cartão | Cartões automáticos / opcionais, facções, raridade, edição, cartões / pacotes explícitos ponderados e exclusões |

O pagamento usa itens físicos, como esmeraldas, separadamente dos pagamentos baseados em conta DRM/CobbleDollars. Cartão/exclusão selecionadores show MWENT cartões apenas e não consomem itens de inventário.

## Leia uma regra de comerciante

Escolha uma regra em **Merchant trades**. Defina profissão, nível, pool de produtos e item de pagamento no meio. Preço mínimo e máximo são quantidades de itens de pagamento. **Items per offer** é a quantidade de produto recebida por comércio.

![Profissão, faixa de preço e quantidade para cartões bibliotecários.](assets/media/guides/minigames-016-neo1211/mwent-acquisition-trades.png "Minijogos 0.1.6 / NeoForge 1.21.1. Este exemplo usa o nível de bibliotecário 2, um preço de 6 – 12, um produto por oferta e estoque 12 antes de reabastecer. Cards, Packs e Excluído à direita editam os produtos e exclusões explícitas da piscina.")

## Adicionar um cartão ao saque do calabouço

1. Habilite a aquisição e o saque no peito em General.
2. Adicione e habilite uma regra de saque de peito.
3. Escolha uma piscina, chance `0.2`, um rolo e contagem `1–1`.
4. Selecione a tabela de saques `minecraft:chests/simple_dungeon` e aplique.
5. Verifique um baú de masmorra cujo saque ainda não foi gerado.

Isso adiciona um cartão selecionado pela piscina ou um pacote com uma chance de 20% por peito elegível. Baús previamente abertos não rerolam. Os pesos da piscina escolhem o produto, não dão chance ao peito.

`minecraft:chests/village/*` alvejar o saque da vila de baunilha. Modded Pokémon Os centros precisam de suas próprias identificações. `minecraft:chests/` por si só não é um jogo recursivo. A regra padrão do cartão da aldeia 18% é por caixa elegível, não por aldeia.

![Editando a chance no peito e mirando em mesas de saque.](assets/media/guides/minigames-016-neo1211/mwent-acquisition-chests.png "Minijogos 0.1.6 / NeoForge 1.21.1. Os cartões de exploração padrão retratados usam 0.18, um rolo e contar 1–1. Defina Chance por rolo para 0.2 para o exemplo de 20% acima. Alvos incluem mesas; Excluído os remove.")

## Escolha os produtos disponíveis

Edite a piscina referenciada por comércios e baús em **Product pools**. **Card edition**, **Rarity filter** e **Faction filter** restringem as cartas disponíveis. Use cartões e pacotes à direita para entradas explícitas. Editar uma piscina afeta todas as regras usando essa piscina.

![Cartões automáticos, integrações, edição e filtros em cartões Standard.](assets/media/guides/minigames-016-neo1211/mwent-acquisition-pools.png "Minijogos 0.1.6 / NeoForge 1.21.1. Uma piscina escolhe os produtos disponíveis. Recompensas no peito decidem separadamente a probabilidade e o número de rolos daquela piscina.")

## Perfis versus ativação

Os arquivos vivem em `config/dochi_minigames/`.

- `acquisition.json`: configurações de aquisição ativa
- `acquisition_profiles/<name>.json`: salvo perfil de regra completa

| Ação | Significado |
| --- | --- |
| Carregar / Salvar / Save As | Carregar um rascunho ou preservar um perfil |
| Aplicar | Validar e armazenar a política ativa |
| Cancelar / Esc | Descarte o rascunho não aplicado do editor |

O perfil `default.json` empacotado instala somente quando falta. Salve perfis personalizados com um nome diferente. Carregar ou salvar um perfil não o ativa.

Para edições externas de arquivos, use `/minigame acquisition reload`. Ordinary `/reload` não relê esta configuração. As edições inválidas mantêm a última política de trabalho. **Ligado. 26.3Mudanças na definição de comércio nativo, incluindo preços, ações, profissões e novas regras, exigem reconexão mundial ou reinicialização do servidor.**

Negociações existentes e itens concedidos permanecem inalterados. Novas ofertas se juntam aos candidatos existentes e não são garantidas a todos os comerciantes. As configurações de aquisição não criam estruturas ou baús. A concessão de um cartão físico não o registra simultaneamente no armazenamento do cartão.
