---
title: Configurar a Armadura NPC
slug: dochi-real-armor-setup
order: 910
description: Abra as configurações e escolha integrações NPC, armadura de parte do corpo e durabilidade.
product: dochi-real-armor
category: Instalar e configurar
section: setup
status: Estável
version: 0.1.4
audience: Jogadores e operadores de servidores
tags:
  - installation
  - configuration
  - forge
translationSource: en
translationMethod: assisted
---

## Instalar

Coloque arquivos correspondentes Minecraft/loader Real Armor 0.1.4 no servidor e nos clientes.

| Minecraft | Carregador | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric / NeoForge | 21 |
| 26.3 | Fabric / NeoForge | 25 |

Fabric também precisa de Fabric API. Use DNPC, Easy NPC ou CustomNPCs em alvos mais antigos. DRM é opcional.

## Abrir definições

- **Forge / NeoForge:** escolha Real Armor's **Config** na lista de mods.
- **Fabric:** abra seu **Config** no Menu Mod.
- **With DRM:** use **Mods Config → Real Armor**.

Alterar configurações multijogador precisa de nível de permissão 2.

Estas são as configurações autônomas de **Real Armor 0.1.4 / NeoForge 1.21.1**. Use **General Armor** para comportamento de armadura e **NPC Compatibility** para sua integração com o NPC.

![Armadura Geral com cálculo, armadura de parte do corpo, durabilidade, tenacidade, proteção e interruptores de resistência a knockback.](assets/media/guides/armor-014-neo1211/armor-config.png "Ativar o cálculo da armadura controla todo o recurso. A armadura de parte do corpo seleciona o equipamento por região de ataque; itens de armadura de dano permitem perda de durabilidade.")

![Compatibilidade NPC com Dochi NPC Core, Easy NPC, CustomNPCs e configurações de depuração.](assets/media/guides/armor-014-neo1211/armor-compatibility.png "Verifique Dochi NPC Core ao usar DNPC. Esta captura é 1.21.1; CustomNPCs não está disponível em 26.3.")

DRMs configurações compartilhadas mostram as mesmas opções em duas colunas.

![Dochi Real Armor selecionado nas configurações compartilhadas do DRM, com regras de armadura à esquerda e integrações à direita.](assets/media/guides/armor-014-neo1211/shared-armor.png "Selecione Dochi Real Armor em Mods Config. Verifique o interruptor de cálculo principal, bem como a integração NPC.")

## Escolha o básico

1. Habilite a integração NPC que você usa.
2. Comece com uma armadura de corpo inteiro e equipar o NPC.
3. Ativar **Armadura de parte do corpo** para usar equipamentos cobrindo a região atingida.
4. Permita que **perda de durabilidade** use armadura para baixo quando for atingido.
5. Aplique as configurações.

DNPC regiões atingidas seguem seus limites corporais básicos, que podem diferir da aparência de um modelo personalizado.

## Verifique se está ativado

Use `/dochi_real_armor status`. Comandos também autocompletam `split`, `durability` e `debug`.

Para gerenciamento direto de arquivos, Forge/NeoForge use `config/dochi_real_armor-common.toml`; Fabric use `config/dochi_real_armor.json`.
