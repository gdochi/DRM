---
title: Rádios e tablets de ordens táticas
slug: expanded-tactical-orders
order: 333
description: Crie e distribua táticas, mantenha pressionado para mirar e configure predefinições, recargas, HUD e sons.
product: dochi-warfare-expanded
category: Apoio ao combate
section: support
status: Guide
version: 0.3.3
audience: Creators and players
translationSource: en
translationMethod: assisted
---

## O que o item faz?

São **itens consumíveis para jogadores** no DWE 0.3.3. Administradores vinculam uma linha do tempo salva no editor Tactical Orders; jogadores apontam um rádio ou tablet para o chão para solicitá-la. A aparência muda, mas ambos podem usar a mesma tática.

Servidor e clientes precisam da mesma build DWE, DW compatível e dos mods originais de veículos/armas. As chamadas são **combate real**, sem proteção de terreno da Simulation. Armas nativas podem atingir aliados, o solicitante e o terreno.

## Administrador: criar e distribuir uma tática

1. Como administrador com permissão nível 2, abra o comando abaixo ou **Tactical Orders** no seletor de editores Warfare.
2. Carregue uma tática ou crie um documento. Em **General**, vincule o ID de um gimmick salvo. Editar o gimmick abre o editor de mundo existente.
3. Em **Use & Target**, defina distância, tempo de uso e movimento permitido. Em **Limits**, defina grupo de recarga, limite de pedidos ativos e dimensões.
4. Em **Item & HUD**, escolha aparência, orientação e cores; salve. Ative a tática e distribua o item. Jogadores comuns não precisam de OP para usar os itens recebidos.

```text
/dw tactical editor
/dw tactical give @s light_bombardment ww2_radio 1
/dw tactical give @s tank_reinforcement rugged_tablet 1
```

## Jogador: designar e pedir apoio

1. Segure o item na mão principal e mire na face superior de chão carregado. Leia alcance, tempo e regra de movimento na dica.
2. Mantenha o botão de uso pressionado. As guias são prévias; coordenadas e direção são confirmadas **quando o tempo termina no servidor**.
3. Mover o corpo cancela táticas que proíbem movimento; olhar ao redor continua permitido. Soltar antes ou trocar item, slot ou dimensão antes da aceitação cancela o pedido.
4. Aguarde o efeito e som de aceitação do servidor. A barra local em 100% não é aceitação. Aceitar consome um item, inclusive no Criativo, e inicia a recarga.
5. Solte antes de tentar novamente. Aceitação não garante acerto; apoio aceito continua após trocar o item ou desconectar.

Táticas do mesmo grupo compartilham uma **recarga por jogador**, mantida após reconexões/reinícios do servidor. Trocar a aparência ou item não a reinicia.

## Predefinições de uma instalação nova

São valores padrão recém-gerados. Arquivos existentes são preservados; a dica do item e a configuração do servidor prevalecem. Precisão, linha e combinado usam air_support; tanques usam ground_support. Os exemplos usam veículos básicos SuperbWarfare; edite facções e rotas no gimmick vinculado.

| ID da tática | Apoio | Manter | Alcance | Movimento | Recarga |
| --- | --- | --- | --- | --- | --- |
| light_bombardment | Bombardeio preciso, um MK-82 | 1 s | 128 | Permitido | 60 s |
| line_bombardment | Bombardeio em linha, quatro MK-82 | 2 s | 192 | Movimento cancela | 90 s |
| tank_reinforcement | Reforço de dois M1A2 | 2 s | 96 | Permitido | 180 s |
| combined_support | Bombardeio seguido de dois M1A2 | 3 s | 128 | Movimento cancela | 240 s |

## Personalizar HUD e sons

Em **Item & HUD**, escolha **Bar: Vertical / Bar: Horizontal**, **Guide color** e **Bar color**. As cores são RGB opacas independentes. Clique em **Apply** no seletor e salve a tática. Apenas uma orientação é exibida. Aceitação/falha usa efeitos visuais/sonoros curtos; não espere aviso no chat.

Rádio e tablet têm sons distintos de equipar/usar/aceitar/falhar. Sons personalizados usam a configuração JSON sounds; não há editor de sons na GUI. Use IDs registrados por um pacote de recursos, não caminhos ou URLs.

## Quando um pedido falha

| Sintoma | Conferir |
| --- | --- |
| Tática sem atribuição/indisponível | ID, ativação, gimmick vinculado e mods originais |
| Mira/rota rejeitada | Chão carregado, alcance/visibilidade, dimensão e espaço de aproximação |
| Uso cancelado | Regra de movimento, troca de slot/dimensão e botão solto |
| Limite de recarga/pedidos ativos | Outras táticas do grupo e apoio em andamento |
| Arquivo editado não aparece | ID salvo e comando reload abaixo |
| Barra cheia sem apoio | Efeitos de aceitação/falha do servidor; aeronave/armas e gimmick |

## Referência de arquivos e scripts

Os campos JSON são referência para edição direta/integração, não conhecimento obrigatório da GUI.

Táticas ficam em **config/dochi_warfare/vehicle_ai/tactical_orders/<id>.json**; linhas do tempo em **config/dochi_warfare/vehicle_ai/gimmicks/**. Padrões só são instalados quando ausentes. Defina enabled como false para desativar: excluir pode restaurar na próxima inicialização. Use Save As com outro ID para personalizar. Execute reload após edições diretas.

```text
/dw tactical reload
```

Configure hold_ticks/allow_movement em activation, max_distance em targeting e cooldown_group/cooldown_ticks em limits. A 20 TPS, 20 ticks equivalem a um segundo. hud usa bar_style/guide_color/bar_color; sounds usa equip/use/cast/fail por aparência. Apenas sons use podem repetir.

Integrações de HUD podem desenhar a barra usando TacticalOrderHud.renderGauge, exclusivo do cliente. Isso só renderiza a tela; não substitui aceitação, consumo do item ou execução no servidor.
