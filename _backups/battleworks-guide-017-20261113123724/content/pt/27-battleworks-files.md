---
title: Arquivos, backups, amostras e upgrades
slug: battleworks-files
order: 280
description: Use os caminhos do servidor corretamente e empacote todos os recursos referenciados.
product: mob-editor
section: reference
category: BattleWorks
status: Guia
version: 0.1.6
audience: Iniciantes e criadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Encontre o diretório correto

Os caminhos são relativos à instância ativa Minecraft ou ao servidor dedicado.

| Caminho | Conteúdo |
| --- | --- |
| `config/dochi_rpg_maker/mobs/patterns/` | Combater JSON |
| `config/dochi_rpg_maker/mobs/animations/` | DRM ativos de animação modelo |
| `config/dochi_rpg_maker/mobs/geometry/` | DRM ativos de geometria |
| `config/dochi_rpg_maker/particles/` | Separe os arquivos do Particle Maker |
| `config/dochi_rpg_maker/settings/battleworks_client.json` | Preferências de editor/apresentação local |
| `config/dochi_rpg_maker/settings/battleworks_global_rules.json` | Bandeiras de combate compartilhadas |

Use **criaturas/padrões**, não a localização das criaturas mais velhas/*.json. Geometria e animação JSON não são documentos de combate.

## 2. Organizar arquivos de trabalho

```text
config/dochi_rpg_maker/
  mobs/
    patterns/
      training/
        first_sword.json
      bosses/
        training_captain.json
    animations/
    geometry/
  particles/
    training_ring.json
```

Entre em caminhos como chefes.training_captain.json em relação aos padrões. Evite caminhos absolutos, prefixos de unidade, transversal dos pais e segmentos vazios.

Use letras, dígitos, sublinhados, hífens e subpastas para nomes de arquivos de partículas. Omit .json apenas no comando de partículas, não em referências armazenadas.

## 3. NPCs referência arquivos compartilhados

NPC NBT armazena um caminho de combate e pequenas bandeiras em vez de uma cópia completa do JSON.

1. Aplicar um arquivo a vários NPCs compartilha o design.
2. Use Save As para NPCs que precisam de designs diferentes.
3. Mova o JSON referenciado ao lado de um mundo transferido ou clone.
4. Inclua dependências de partículas, modelo, som, pop-up e provedores.

Carregar abre o arquivo. Aplicar liga-lo. Veja [salvar/aplicar comportamento](#mob-editor/mob-editor-setup).

![O arquivo de combate guardado no servidor e ligado a um DNPC.](assets/media/guides/battleworks-016-neo1211/battleworks-first-saved.png "BattleWorks 0.1.6 / NeoForge 1.21.1. O título abrevia o caminho; o arquivo verificado é config/dochi_rpg_maker/mobs/patterns/training/first_sword.json. Transferir este arquivo com o NPC para outro servidor.")

## 4. Atualizar edições externas

1. Recuem o JSON.
2. Edite e salve externamente.
3. Verifique a sintaxe estrita do JSON.
4. Atualize o catálogo do editor e reabra o arquivo.
5. **Reapply to the NPC or restart the server**.
6. Verifique o comportamento alterado.

O combate lê dados em cache em vez de disco de votação a cada tiquetaque. O Catalog Refresh por si só não prova que o NPC ao vivo foi atualizado. Arquivos de partículas têm um cache separado e salvar caminho.

## 5. Praticar arquivos incluídos com esses documentos

| Arquivo | Pasta | Preparação |
| --- | --- | --- |
| [first_sword.json](./assets/media/battleworks/first_sword.json) | `mobs/patterns/training/` | Salvo, aplicado e testado com BattleWorks 0.1.6 / DNPC 0.1.3 / NeoForge 1.21.1 |
| [training_swordsman.json](./assets/media/battleworks/training_swordsman.json) | criaturas/padrões/treinamento/ | NPC humanoide normal com um hostil CustomNPCs alvo |
| [training_ring.json](./assets/media/battleworks/training_ring.json) | partículas/ | Fabricante de partículas ou o comando de partículas |

Se o navegador abrir o JSON, salve-o como um arquivo. Verifique se não se tornou .json.txt. A amostra de combate usa um som básico de balanço e baunilha sem configurações de modelo salvas. A amostra de partículas usa uma partícula de baunilha.

## 6. Pacotes de treinamento separados e Jar Fist

O 30O pacote de treinamento de arquivos é mantido sob exemplos de fontes/treinamento-pacote/criaturas/padrões. Não é ** empacotado ou instalado automaticamente na inicialização**. Copie-o apenas se você realmente obteve o pacote.

Nomes como 1_sword.json, 1_tutorial.json e 2_tutorial_irons.json descrevem dificuldade/integração. Leia a autoria de cada arquivo.requiredMods e a autoria. Até mesmo uma amostra de treinamento físico pode exigir melhores clipes de combate.

| Amostra de Jar Fist | Propósito |
| --- | --- |
| battleworks_sample_jar_fist_preview.json | Combate desativado, pré-visualização de dano zero |
| battleworks_sample_jar_fist_combat.json | Perseguição, ataques e testes de retirada |

Onde for fornecido nos recursos de amostras do JAR, copie-os para padrões antes de carregar. Jar Fist modelo, texturas e ativos de animação são separados. Os clipes pretendidos incluem ready_to_fight, sword_attack, sword_attack2 e roll; outros modelos precisam de substituições compatíveis.

Modelos iniciais empacotados e chefes distribuídos separadamente, música e pop-ups são pacotes diferentes. Atualizar o mod não instala todos os materiais de encontro externos.

## 7. Atualizar com cuidado

1. Pare o jogo/servidor e faça backup da configuração e do mundo.
2. Substitua JARs antigos sem deixar versões duplicadas BattleWorks/criatura Editor.
3. Assegure DRM 0.1.7 ou mais recente para BattleWorks 0.1.5.
4. Verifique catálogos e ligações de NPC.
5. Verifique novamente modelos, habilidades, áudio e combate.

Arquivos de combate antigos reconhecidos podem migrar de criaturas para padrões, com bytes originais apoiados config/dochi_rpg_maker/backups/battleworks-mobs-patterns-v1. Conflitos e desconhecido / modelo JSON são preservados.

A recuperação de referência movida pode reparar arquivos identificáveis; não confie nele para escolher entre nomes ambíguos. Reaplicar explicitamente depois de reorganizar.

O ID atual do mod é dochi_battleworks, não drm_addon_mob_editor. A conversão do modelo CNPC-Gecko-NBT não substitui os tipos ou recursos de entidade do addon original; mundos dependendo deles ainda podem exigir esse addon.

## 8. Empacote um encontro

Inclua JSON de combate, JSON de partículas, modelos, sons, arquivos popup/GUI, clones e versões mod necessárias. Teste Carregar e Aplicar em um novo NPC no ambiente de destino.

Continue com a referência [JSON](#mob-editor/battleworks-json-reference) ou [dissolução de problemas](#mob-editor/battleworks-troubleshooting).
