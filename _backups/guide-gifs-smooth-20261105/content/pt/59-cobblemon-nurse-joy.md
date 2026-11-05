---
title: Vincule a Enfermeira Alegria a uma Máquina de Cura
slug: cobblemon-nurse-joy
order: 550
description: Escreva uma saudação de cura, aplique o papel de NPC e conecte seu Cobblemon Máquina de cura.
product: drm-cobblemon-editor
category: Serviço NPCs
section: services
status: Rascunho
version: Fabric / NeoForge 0.2.9
audience: Criadores de NPC e operadores de servidor
tags:
  - nurse-joy
  - healer
  - dialogue
translationSource: en
translationMethod: assisted
---

## Faça um NPC que cura a equipe

Depois que um jogador pede tratamento, o NPC caminha para sua conexão. Cobblemon máquina de cura, cura a equipe e retorna. Aplique o papel a um DNPC ou CustomNPCs NPC em **Minecraft 1.21.1, Fabric or NeoForge**.

![Enfermeira Joy nome, distância, diálogo e tratamento / rótulos fechados.](assets/media/guides/cobble-029-neo1211/cobble-nurse.png "Cobblemon Editor 0.2.9 / NeoForge 1.21.1, IU Inglês. Nenhum NPC é selecionado aqui; salve e aplique o perfil antes de vincular uma máquina.")

1. Abra **Nurse Joy Editor → Use Default** da lista de editores do DRM.
2. Defina **Display Name** para que você possa reconhecer esse perfil.
3. Escreva a saudação em **Dialogue Text** e as duas escolhas em **Treatment Choice Text / Close Choice Text**.
4. **Save As** um arquivo de usuário como `custom/village_healer.json`.
5. Abra o NPC pretendido com o DRM Core e **Apply** esse arquivo para **Nurse Joy**.
6. Vincule uma máquina usando os passos abaixo. Salvar o perfil não liga uma máquina.

O tratamento e as ações próximas têm um comportamento e ordem fixos. Renomar uma escolha não a transforma em um botão de recompensa. Usar [DRM diálogo](#core-fabric/dialogue-system) para ramos gerais ou recompensas.

![Caminho do usuário e status salvo após Save As.](assets/media/guides/cobble-029-neo1211/cobble-nurse-save.png "O caminho do exemplo foi salvo através de Save As. Criar o arquivo e aplicar a função NPC são etapas separadas.")

## Ligar a máquina de cura

![Aplicar a função a um NPC com a skin de Nurse Joy, ligar a máquina, curar e regressar.](assets/media/guides/short-gifs-20261105/nurse-joy-treatment.gif "Captura real: Cobblemon Editor 0.2.9 · DRM 0.3.1 · DNPC 0.1.3 / NeoForge 1.21.1, interface em inglês. Bulbasaur recuperou de 1 para os seus 19 PV máximos e o NPC regressou à posição inicial.")

A gravação utiliza a [skin de Nurse Joy de AcidFlounder391](https://www.minecraftskins.com/skin/22531361/nurse-joy/).

1. No editor do NPC aplicado, escolha **Link Healing Machine**.
2. Dentro **60 segundos**, **Shift+right-click** a Cobblemon máquina de cura na mesma dimensão.
3. Mantenha-o dentro de **Max Distance**, de 1 a 16 blocos; este exemplo usa 16.
4. Deixem um terreno seguro e espaço ao lado da máquina para o NPC ficar de pé e voltar.
5. Interaja com o NPC com as duas mãos vazias e escolha tratamento.

Uma máquina ligada é usada através da enfermeira Joy. Mantenha uma máquina separada para uso público direto. Dois Enfermeiros Joy NPCs não podem possuir a mesma máquina; quebrá-la remove a ligação.

## Atualizar diálogo ou trocar máquinas

**Save to the same referenced file** para atualizar o texto ou a distância para a próxima interação. Candidate-se novamente depois de salvar com um nome diferente. Os links de máquina pertencem a NPCs individuais: aplicar um perfil compartilhado não compartilha seu link de máquina.

| Problema | Verificar |
| --- | --- |
| Outro diálogo ou loja abre | Use a mão vazia **Shift+right-click** Para acessar a Enfermeira Joy. |
| Pedido de ligação expirado | Escolha Link Healing Machine novamente e link dentro de 60 segundos. |
| NPC não pode alcançar a máquina | Mesma dimensão, distância permitida, terreno seguro e um espaço adjacente livre. |
| O tratamento não começará. | Jogador dentro de 12 blocos, nenhuma batalha ativa, e uma máquina carregada/utilizável. Espere por qualquer tratamento já em andamento. |
| O velho texto permanece. | Salvar no caminho realmente aplicado ao NPC. |

Os perfis estão em `config/dochi_rpg_maker/cobblemon/nurse_joy/`. Mantenha o mundo também ao mover um servidor: o link de máquina do NPC é dados do mundo.
