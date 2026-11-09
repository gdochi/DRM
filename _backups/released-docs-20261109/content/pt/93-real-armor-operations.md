---
title: Comandos e solução de problemas
slug: dochi-real-armor-operations
order: 930
description: Comandos de administração, verificações de status, uso de depuração e problemas comuns de CustomNPCs ou NPC fácil.
product: dochi-real-armor
category: Comandos e solução de problemas
section: operations
status: Estável
version: 0.1.4
audience: Operadores de servidor e criadores de modpacks
tags:
  - commands
  - troubleshooting
  - debug
translationSource: en
translationMethod: assisted
---

## Comandos

Todos os comandos exigem nível de permissão 2.

```mcfunction
/dochi_real_armor status
/dochi_real_armor split true
/dochi_real_armor durability false
/dochi_real_armor debug true
```

`status` relata o modo de parte do corpo, durabilidade, depuração, CustomNPCs suporte e suporte para NPC fácil. Os outros comandos atualizam a configuração comum imediatamente.

## Depurar com segurança

![Depurar mensagens de dano sob compatibilidade com NPC.](assets/media/guides/armor-014-neo1211/armor-compatibility.png "Real Armor 0.1.4 / NeoForge 1.21.1. Use mensagens de dano de depuração na GUI ou /dochi_real_armor depuração true para permitir observações de dano.")

Ative a depuração temporariamente para ver a parte do corpo selecionada e reduzir os danos. Depuração é um observador: armadura deve continuar a trabalhar depois de `/dochi_real_armor debug false`.

## Lista de verificação de solução de problemas

| Sintoma | Verificar |
| --- | --- |
| Sem redução de armadura. | Confirme o cálculo da armadura e a compatibilidade com NPC correspondente. |
| Fácil NPC é ignorado | Confirme se o ID da entidade usa o namespace `easy_npc` e o suporte do Easy NPC está ativado |
| Tiros no corpo inferior usam a armadura errada. | Confirme a correspondência Forge 0.1.1 ou NeoForge 0.1.2 build está instalado no servidor e teste com o modo de parte do corpo mais depuração |
| Cada slot protege cada hit. | A armadura da parte do corpo está desligada, ou a posição de acerto não poderia ser resolvida. |
| A proteção não faz nada. | Verifique o interruptor de proteção e se o tipo de dano ignora armaduras ou encantamentos |
| Mudanças na GUI são rejeitadas | Use uma conta com nível de permissão 2 |
| Erro de inicialização duplicado-mod | Remova frascos mais antigos `cnpc_real_armor` e `dochi_real_armor` para que apenas uma liberação permaneça |

Ao relatar um problema, inclua `logs/latest.log`, os nomes de arquivo exatos do jar, as versões mod e mod da arma do NPC, as configurações relevantes e se o mesmo hit se comporta de maneira diferente com o debug OFF.
