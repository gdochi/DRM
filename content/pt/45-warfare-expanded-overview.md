---
title: Mova Veículos e Atribua Tripulações
slug: expanded-overview
order: 310
description: Montar movimento de veículos DWE, armas, motoristas e artilheiros.
product: dochi-warfare-expanded
category: Começando
section: overview
status: Rascunho
version: 0.3.1
audience: Criadores e operadores de servidor
translationSource: en
translationMethod: assisted
---

## O que instalar

DWE ** adiciona características do veículo para DW**. Mover suportado SuperbWarfare veículos, usar suas armas e atribuir NPC motoristas / atiradores.

| Item | Exigência |
| --- | --- |
| Minecraft / carregador | Forge 1.20.1 ou NeoForge 1.21.1 |
| DW e DWE | Ambos 0.3.1, instalados juntos no servidor e nos clientes |
| SuperbWarfare | Forge 0.8.9 / 0.8.9.1 / 0.8.9.2; NeoForge 0.8.9.1 / 0.8.9.2 |
| Equipes do NPC | DNPC ou CustomNPCs |
| DRM | Opcional |

Os requisitos do DW TACZ e do Player Animator ainda se aplicam. Veja a configuração do [DW](#dochi-warfare/warfare-setup).

![A visão geral do veículo DWE abriu para um M1A2 real.](assets/media/guides/warfare-expanded-031-neo1211/dwe-ai.png "DWE/DW 0.3.1, SuperbWarfare 0.8.9.1, NeoForge 1.21.1. Use AI, Targets, Weapons, Gimmicks e Crew à esquerda; AI habilitada na ativação dos controles superior direito. Este exemplo está desligado.")

## Montar o primeiro veículo

1. Coloque um veículo de apoio.
2. Clique com o botão direito do mouse com **DW Npc Core**.
3. Habilite a IA do veículo e escolha o movimento, a posição da casa e o alcance operacional.
4. Escolha armas e alvos.
5. Atribua assentos de motorista/argumentista em **Crew**.
6. Salve, então verifique o movimento e o disparo.

Desligue a IA do veículo antes de dirigi-la. As armas disponíveis dependem do que o veículo realmente tem.

## O que adicionar a seguir

- Retirada, fumaça e desmontagem de combate: [Reações do veículo](#dochi-warfare-expanded/expanded-vehicle-gimmicks)
- Bombardeios e reforços: [timelines de suporte](#dochi-warfare-expanded/expanded-support-timeline)
- Movimento, alvos e munição: [ AI do veículo](#dochi-warfare/warfare-vehicle-ai)
- Outros pacotes de veículos: [ veículos compatíveis](#dochi-warfare-expanded/expanded-compatibility)

## Reutilizar uma configuração

**Save As** mantém as configurações para **Load** em outro veículo. A **clone** É para gerar uma nova cópia do próprio veículo.

As configurações do veículo estão em `config/dochi_warfare/vehicle_ai/profiles/`; os cronogramas de suporte estão em `config/dochi_warfare/vehicle_ai/gimmicks/`.

Substitua o velho `dochi_warfare_vehicle` JAR ao invés de mantê-lo ao lado de DWE. Perfis mais antigos são importados enquanto mantêm seus originais.
