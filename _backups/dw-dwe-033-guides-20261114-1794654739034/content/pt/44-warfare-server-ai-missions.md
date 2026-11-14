---
title: Servidor de IA e suporte de combate
slug: warfare-server-ai-missions
order: 385
description: Separe as políticas de NPC e IA do veículo e use cronogramas de suporte da DWE.
product: dochi-warfare
category: Ferramentas do Mundo
section: tools
status: Rascunho
version: 0.3.1
audience: Operadores de servidores e cartógrafos
tags:
  - server
  - ai
  - missions
translationSource: en
translationMethod: assisted
---

## Se um NPC está habilitado AI ainda não faz nada

Uma política de servidor pode bloquear um recurso habilitado em um NPC individual. Abra **Minecraft Mods → Dochi’s Warfare → Config → DW Server AI** para verificar a permissão de todo o servidor. Isso é separado da página Sentidos ou Capa aberta clicando com o botão direito do mouse em um NPC. Salvar alterações requer permissão do servidor nível dois.

![A política de IA do servidor na tela Config da DW.](assets/media/guides/warfare-031-neo1211/dw-server-ai-policy.png "Política de servidor real em DW 0.3.1 / NeoForge 1.21.1. Leia o botão ON/OFF do recurso, o status disponível e a explicação de OFF juntos. Este exemplo inicialmente permitia todos os recursos.")

1. Encontre o recurso bloqueado, como **Cover AI** ou **Hearing / investigation**.
2. Configure-o para permitir que ele no servidor.
3. Pressione **Save** abaixo para enviar a política.
4. Volte para a cobertura individual do NPC, sentidos ou outras configurações e configure suas condições.

**Basic combat preset** restringe os recursos de IA estendidos juntos. **Allow all features** remove essas fechaduras globais. Esses botões não substituem o comportamento detalhado de cada NPC com valores idênticos. Verifique a política atual antes de selecionar uma predefinição.

## Características que dependem umas das outras

| Política do servidor | Comportamento relacionado |
| --- | --- |
| Combata a memória do alvo | Desligá-lo também impede o fogo de supressão, que depende da memória de combate. |
| Movimento tático / Cobrir AI | A permissão global ainda precisa de configurações por NPC e terreno acessível. |
| Inteligência Artificial Mercenária | Expiração do contrato, proteção de propriedade e ordens de espera permanecem. Isso não interrompe o tempo do contrato. |
| Armadilhas NPC granada AI / Booby | Granadas lançadas e armadilhas colocadas têm permissões separadas. |

Desativar um recurso retém valores de NPC para reutilização quando permitido novamente. O arquivo de política do servidor é `config/dochi_warfare/server-ai.json`.

## Veículos e sequências de suporte

**DWE 0.3.2** gerencia a política global da IA do veículo separadamente. Mudar a política de NPC não aplica todas as mudanças no comportamento do veículo. A política do veículo está armazenada em `config/dochi_warfare/vehicle_ai/server-ai.json`.

Construa bombardeios, assaltos, reforços de veículos e movimento NPC no [Linha do tempo de suporte da DWE](#dochi-warfare-expanded/expanded-support-timeline).

![Timeline no mundo do DWE 0.3.2, painéis e câmera.](assets/media/guides/dwe-tutorials-20261109/dwe-workspace.mp4 "Tela real do NeoForge 1.21.1. A política do servidor permite funções; a timeline define a ordem da chamada.")

Chame um nome de suporte salvo com `/dw callgimmicks <name> [x y z]`. Siga o guia da linha do tempo da autoria através da execução mundial.

Continue com [ajustes de apoio](#dochi-warfare-expanded/expanded-support-actions) e [salvar, simular e chamar](#dochi-warfare-expanded/expanded-support-run).
