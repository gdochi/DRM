---
title: Aparência, equipamentos e empregos
slug: npc-core-editor
order: 1510
description: Vista seu NPC e escolha suas ferramentas, local de trabalho e rotina.
product: dochi-npc-core
category: NPCs, horários e emprego
section: editor
status: Guia
version: 0.1.3
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Alterar aparência e equipamentos

Clique com o botão direito do mouse em um NPC com o Core. Escolha seu nome, pele, proporções e equipamentos, então salve. Modelos instalados adicionam opções de aparência; os modelos Gecko precisam de GeckoLib.

![DNPC s Identity tela, com categorias à esquerda, uma visualização NPC no meio, e nome e campos de título à direita.](assets/media/guides/dnpc-013-neo1211/dnpc-identity.png "DNPC 0.1.3 / NeoForge 1.21.1, IU Inglês. Selecione Identity → Information, edite Name à direita e Save to NPC na parte superior. Style muda a aparência do nome e do texto do título.")

### Alterar a pele e o tamanho

Selecione **Appearance & Model**. Com **Humanoid**, use o localizador ao lado **Skin**, mude **Scale** para o tamanho total e escolha **Slim arms** se necessário. Use **Part scales** para proporções corporais individuais e **Hitbox** para dimensões de colisão.

![DNPC 0.1.2 em NeoForge 1.21.1, mostrando Appearance & Model com Humanoid, Skin, Scale e Slim arms.](assets/media/guides/dnpc-012-neo1211/dnpc-appearance.png "Verifique a aparência na pré-visualização do meio. Scale muda o tamanho total do modelo, em vez de seu local de trabalho ou alcance de ataque.")

![Alterar Scale para 1.15, guardar o NPC e conferir o resultado no mundo.](assets/media/guides/short-videos-20261106/npc-appearance.mp4 "DNPC 0.1.3 / NeoForge 1.21.1, interface em inglês. Appearance & Model → Scale → Save to NPC.")

Use o poser para fazer poses e juntar-se a eles em animações. Para equipamentos aleatórios, escolha candidatos e chances para cada slot.

### Encontre os caça-níqueis de armas e munições

Equipar armadura sob **Inventory & Equipment → Equipment**, usando **Head / Chest / Legs / Feet**. Armadura armazenada em **NPC storage** não é armadura equipada.

![DNPC Inventory & Equipment com NPC storage e Player inventory no meio e fendas de armadura à direita.](assets/media/guides/dnpc-012-neo1211/dnpc-inventory.png "DNPC 0.1.2 / NeoForge 1.21.1. Separe os itens armazenados da armadura equipada. Veja Real Armor para comportamento de armadura adicional.")

Selecione **Weapon & ammunition** à esquerda. **Idle hands** define o que o NPC mantém fora do combate; **Combat hands** define o que ele mantém durante o combate. Escolha sua arma e munição em **Ranged weapon** e **Ammunition**.

![DNPC's Weapon & ammunition tela. A aba Weapons à direita mostra slots de mão ociosos e de combate, um slot de arma de alcance e um slot de munição.](assets/media/guides/dnpc-013-neo1211/dnpc-weapons.png "DNPC 0.1.3 / NeoForge 1.21.1, IU Inglês. Use os slots na guia Weapons. NPC storage no meio é o inventário, separado da mão e arma slots à direita.")

## Dê um emprego ao NPC.

1. Adicionar horas de trabalho abaixo **Schedule** à esquerda.
2. Escolha mineração, agricultura, madeira, coleta, transporte ou outro trabalho.
3. Defina seu local de trabalho/intervalo, ferramentas e armazenamento de entrada/saída.
4. Forneça as ferramentas e itens necessários, então salve.

Se o NPC não funcionar, verifique as horas ativas, ferramentas e rotas para o local de trabalho e armazenamento. Os filtros de mineração permitem que você escolha blocos ou tags.

Veja [schedules](#dochi-npc-core/npc-core-schedules) por horas e [cozinhando](#dochi-npc-core/npc-core-cooking) para produção de alimentos.

## Faça um guia estacionário

![DNPC's Movement AI tela, com Lock position e Lock rotation interruptores perto do canto inferior direito.](assets/media/guides/dnpc-013-neo1211/dnpc-movement.png "DNPC 0.1.3 / NeoForge 1.21.1, IU Inglês. Selecione Movement AI à esquerda. Lock position corrige a localização do NPC; Lock rotation corrige sua direção de frente.")

Habilite **Movement AI → Lock position** para manter o NPC no lugar. **Lock rotation** separadamente fixa o seu corpo / cabeça direção e substitui olhando para os jogadores próximos.

**Combat AI → Invulnerable** Bloqueia todos os danos. Desativar **Allow player damage** para bloquear somente os danos causados pelos jogadores.

![DNPC 0.1.2 em NeoForge 1.21.1, mostrando Combat AI com saúde, dano corpo a corpo, intervalo de ataque, Invulnerable e Allow player damage.](assets/media/guides/dnpc-012-neo1211/dnpc-combat.png "Invulnerable Bloqueia todos os danos. Allow player damage controla separadamente os danos causados pelos jogadores.")

Treinadores compatíveis Cobblemon ainda podem executar seu traço configurado/retorno enquanto travados, e então retornar à posição.

## Deixe os jogadores contratarem NPCs

Esse recurso precisa de **DRM**.

1. Acabar e salvar a aparência do trabalhador, equipamentos e empregos.
2. Criar uma entrada de recrutamento em DRM's **editor de emprego**.
3. Escolha o NPC, local de início, preço, duração e empregos que o empregador pode editar.
4. Aplique ao NPC de recrutamento através de **NPC Apply → Function → NPC employment**.
5. Os jogadores falam com o recrutador para contratar. O padrão **H → My employment** fornece parada, retorno, renovação, dispensa e coleta de carga.

Um NPC expirado permanece disponível até que a carga restante seja coletada.

### Escolha o trabalhador e contrato

Estes são os **DNPC 0.1.2 + DRM 0.3.1 / NeoForge 1.21.1** Telas de emprego. Em **NPC**, use o localizador ao lado **Prepared NPC JSON set** para escolher um [modelo NPC salvo](#dochi-npc-core/npc-core-templates). Selecione seu trabalhador no lugar de **Default NPC** para usar sua aparência e trabalhos preparados na oferta.

![A guia NPC do Editor de Emprego com NPC Preparado JSON definido, NPC exibe o nome e o botão de contratação.](assets/media/guides/dnpc-012-neo1211/employment-npc.png "Selecione o NPC que está sendo contratado aqui, em vez do diálogo do recrutador ou loja.")

Defina o pagamento, o custo e a duração em **Contract**. Este exemplo usa dez esmeraldas, ** 20 Minutos ** e **Real Ticks**. O Real Ticks segue os ticks do servidor em execução; o World Ticks segue o tempo do mundo, incluindo comandos de sono e tempo.

![Contrato com um custo de esmeralda de dez, um período de vinte minutos, Real Ticks e Renew contrato.](assets/media/guides/dnpc-012-neo1211/employment-contract.png "Leia a unidade Period e o relógio de duração junto com o número. Renovar o contrato controla se a renovação é permitida.")

**Allowed Work** controla quais papéis o empregador pode atribuir. Um switch não cria um novo trabalho que o NPC preparado não suporta.

## Faça um músico

Com **Immersive Melodies** ligado 1.20.1 / 1.21.1, adicione uma performance de instrumento ao cronograma. Escolha uma música, instrumento e localização.

**Use equipped instrument only** Precisa de um instrumento equipado. **Provide a temporary instrument if missing** mostra um durante a performance. Instrumentos temporários não se tornam gotas de morte.
