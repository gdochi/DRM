---
title: Instalação e preparação de NPC
slug: mob-editor-setup
order: 220
description: Prepare mods correspondentes, um NPC de teste e o fluxo de trabalho correto de salvar/aplicar.
product: mob-editor
section: start
category: BattleWorks
status: Guia
version: 0.1.7
audience: Iniciantes e criadores de combate
tags:
  - battleworks
  - combat
translationSource: en
translationMethod: assisted
---

## 1. Preparar arquivos compatíveis

Use BattleWorks **0.1.7** para sua versão exata de Minecraft e loader. Mantenha cliente e servidor compatíveis e instale as dependências declaradas pelo arquivo escolhido.

| Minecraft | Loader do BattleWorks | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | Fabric ou NeoForge | 21 |
| 26.3 | Fabric ou NeoForge | 25 |

**DRM é opcional**, inclusive para abrir os editores independentes. DNPC fornece o ator deste exercício. Adicione DRM, bibliotecas de animação, mods de magia ou provedores de modelo apenas para os recursos usados; os recursos externos são separados do JSON de combate.

CustomNPCs é uma integração opcional no Forge 1.20.1 e Fabric / NeoForge 1.21.1. Está excluído a partir de 26.3; use DNPC nesses destinos. Capturas e vídeos antigos de 0.1.6 mantêm suas versões originais.

## 2. Criar uma prática DNPC

1. Seguir [Criando um DNPC](#dochi-npc-core/npc-core-setup) Criativo para colocar um NPC.
2. Dê a ele um nome reconhecível e comece com um modelo de jogador normal.
3. Prepare terreno plano sem outros NPCs ou criaturas próximas.
4. Este exercício usa BattleWorks **Scan Without Target** para encontrar o jogador. Evite atribuir trabalho ou outro controlador de combate ao mesmo NPC durante o exercício.
5. Autor em ataques criativos e de teste em Survival.

![Preparando o ator em DNPC's Identity tela.](assets/media/guides/dnpc-013-neo1211/dnpc-identity.png "DNPC 0.1.3 / NeoForge 1.21.1. O BattleWorks O arquivo será anexado a este ator. Aparência e equipamentos são separados de BattleWorks Danos e caixas.")

Uma espada retida ajuda a comunicar o ataque. O exercício causa danos na BattleWorks Em vez de confiar no dano de ataque do item. Aumentar a saúde do NPC pode esperar até o exercício do chefe.

## 3. Abrir BattleWorks para o NPC

1. No Criativo, encontre a **BattleWorks Wand** na aba própria do BattleWorks. Ela também aparece na aba DNPC quando disponível.
2. Use a varinha no NPC compatível para abrir seu seletor de editores. Use no ar para criar sem um NPC conectado. O comando é `/battleworks editor`; as permissões do servidor continuam necessárias.
3. Escolha BattleWorks e depois **Load Existing**, **Use Default** ou **Create New**. Os padrões são modelos; salve uma cópia de trabalho.
4. Comece com [edição simples e receitas](#mob-editor/battleworks-authoring), ou continue com [seu primeiro ataque](#mob-editor/battleworks-first-attack).

Com DRM instalado, o Core continua sendo outra entrada. A categoria de aplicação do NPC é **Battlework JSON**. Para um arquivo criado sem NPC, selecione-o no catálogo do ator e pressione **Apply Battlework**. Prepare outros modelos pela aparência e pela [conexão de animação](#mob-editor/battleworks-animation).

## 4. Adicionar integrações quando o recurso precisar delas

| Objetivo | Preparação adicional |
| --- | --- |
| Balanço básico do braço e caixa de batidas | Comece com a instalação testada acima |
| Melhor movimento de combate | Compatível Melhor Combate, o movimento e uma arma suportada |
| Clipes de Gecko | Ativos de modelo, textura e animação mais seu provedor |
| Clipes do Animador de Jogador | Fornecedor compatível e clipes reais |
| Feitiços/habilidades de outros mods | O mod, dependências e habilidade registrada |
| Sons/texturas personalizadas | Um mod ou pacote de recursos fornecendo suas IDs |

Verifique o ataque básico primeiro e, em seguida, adicione movimentos ou habilidades para que as falhas de aplicativo de arquivo permaneçam fáceis de distinguir dos ativos externos ausentes.

## 5. Compreenda Salvar, Save As, Carregar e Aplicar

| Operação | Resultado | Próximo passo |
| --- | --- | --- |
| Carregar | Abre um arquivo de servidor no editor | Edite, salve ou aplique |
| Save As | Escreve JSON no caminho escolhido | Ligar o NPC ao novo caminho |
| Salvar com um NPC selecionado | Salva o documento e vincula esse NPC | Teste de combate |
| Salvar sem um NPC, arquivo carregado | Atualiza esse arquivo | Verifique a ligação do NPC pretendido |
| Salvar sem um NPC, novo documento | Abre o prompt de nome de ficheiro | Salvar, em seguida, aplicar a um NPC |
| Catálogo NPC Aplicar | Vincula o caminho do arquivo de servidor selecionado | Teste de combate |

Digite `training/first_sword.json` em Save As. O caminho resultante é:

```text
config/dochi_rpg_maker/mobs/patterns/training/first_sword.json
```

Não insira o caminho de configuração completo ou um caminho de unidade do Windows no campo relativo ao caminho.

Os padrões empacotados são modelos protegidos. Use **Save As** para uma cópia de trabalho. Se o editor tiver um NPC anexado, pressionar **Save after Save As** vincula esse NPC ao novo arquivo.

## 6. Verificar o resultado salvo

1. Resolva qualquer erro de validação ou salvamento do servidor.
2. Atualize Carregar e reabra o arquivo de trabalho.
3. Aplique-o através do catálogo NPC, ou Salve com esse NPC anexado.
4. Teste como um jogador de sobrevivência.

Quando conectado a um servidor remoto, os arquivos são salvos no diretório de configuração do servidor ****. Uma cópia em seu diretório single-player separado não aparecerá nesse servidor.

Os NPCs agora fazem referência a arquivos em vez de armazenar cópias JSON completas. Use caminhos separados Save As quando diferentes NPCs precisam de encontros diferentes. Continue com [Seu primeiro ataque](#mob-editor/battleworks-first-attack).
