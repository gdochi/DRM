---
title: Espaço de trabalho, eventos e cronograma
slug: mob-editor-patterns
order: 230
description: Encontre controles, selecione ações individuais e edite tempo, repetições e probabilidade.
product: mob-editor
section: authoring
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

## Leia o espaço de trabalho nesta ordem

Selecione um padrão na lista à esquerda, escolha Windup / Action / Recovery e selecione uma linha de ação e edite suas propriedades.

| Ferramenta | Propósito |
| --- | --- |
| Bancada de trabalho padrão | Condições padrão e cronograma de ação |
| Biblioteca Hitbox | Geometria compartilhada, dano, posicionamento e visualização do modelo |
| Regras de Combate | Gerente, alvo, fases, morte e BGM |
| Fabricante de partículas | Separe arquivos visuais reutilizáveis |
| Auxiliar de construção de padrões | Gerar um ataque físico a partir de respostas |
| Gráfico de padrões | Inspecione padrões e combine links |
| Simulação | Ensaie o movimento e a colocação do hitbox |

![Padrão Workbench depois de gerar um ataque.](assets/media/guides/battleworks-016-neo1211/battleworks-assist-built.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Varredura larga está selecionada à esquerda. O meio mostra os estágios e o tempo; o direito é o inspetor de itens selecionado. Selecione uma linha de ação para editar essa ação.")

## 1. Selecione um padrão

Use **Find pattern** para pesquisar nomes ou IDs. Clique no padrão pretendido e edite seu nome, estado Ativado e alcance no Core. Use o Score para preferências de seleção e o Combo para links de acompanhamento.

Os nomes são para leitores; IDs conectam referências JSON. Se editar IDs externamente, atualize todas as referências de combinação e transição que as usam.

## 2. Definir comprimentos de palco

| Palco | Propósito | Valor de prática |
| --- | --- | --- |
| Windup | Prepare-se e avise. | 24 carrapatos |
| Ação | Execute hit, habilidade ou movimento | 16 carrapatos |
| Recuperação | Termine o movimento e ofereça uma abertura | 24 carrapatos |

O Core's **Recovery Delay** é um andar de atraso pós-padrão, separado do comprimento do estágio de recuperação. Depois de encurtar um palco, verifique todos os eventos e repita novamente.

## 3. Adicionar uma ação

1. Selecione Ação.
2. Pressione **+ Ação**.
3. Escolha uma categoria de propósito, então a ação real.
4. Para Hitbox, use **Choose from list** ou crie um hitbox.
5. Clique na linha de ação nomeada.
6. Defina a Marca de Evento `3`, Intervalo `0` e Contagem de Repetição `1`.
7. Mantenha as chances de eventos e ações em 100 enquanto testa.

As categorias organizam o selecionador; selecionar uma categoria não é uma opção de ativação. Volte para a categoria pai ou use Esc ao navegar na lista.

**+ Habilidade** abre a seleção de habilidades diretamente. **+ FX** ajuda a adicionar sons, títulos e comandos.

## 4. Separar eventos de linhas de ação

Um evento significa "as ações agendadas neste momento". Um Hitbox e Sound dentro de um evento compartilham seu tick e repetem, mas cada um tem uma linha selecionável.

| Editar | Afeta |
| --- | --- |
| Tique de evento | Todas as ações dentro desse evento |
| Intervalo de eventos / Contagem repetida | Todo o calendário do evento. |
| Chance de evento | Se essa ocorrência corre ou não |
| Chance de Ação | Essa ação é uma chance independente. |
| Multiplicador de ação Hitbox | Esse uso do hitbox compartilhado |
| Danos na biblioteca | Cada uso dessa definição de hitbox |

Coloque um som no tick 3 e dano no tick 8 em eventos separados.

## 5. Mova os pinos e a cabeça de jogo

Arraste um pino de ação para reiniciar o evento. Clicando ou arrastando a régua e as faixas vazias move o playhead de visualização. Role quando houver muitas linhas de ação.

Evento Tick é local para o estágio selecionado. Com um 24-tiquetaque Windup, o tick Ação 3 aparece no tick geral 27.

## 6. Criar um evento repetido

Use uma ação 20-tick com:

| Configurando | Valor |
| --- | --- |
| Tique de evento | 4 |
| Intervalo | 6 |
| Contagem repetida | 3 |
| Executar carrapatos | 4, 10, 16 |

```text
first tick + interval × (count - 1) ≤ stage length
4 + 6 × (3 - 1) = 16 ≤ 20
```

A contagem inclui a primeira execução. Intervalo 0 significa não repetir. Repetir um hitbox não reinicia automaticamente a animação de palco. Veja. [Atingir políticas](#mob-editor/battleworks-hitboxes) para controlar repetidas tentativas de dano.

## 7. Ajustar a probabilidade em um lugar primeiro

Para danos confiáveis com diálogo ocasional, use evento 100%, Hitbox 100%, Som 100% e diálogo 20%.

Um evento de 50% contendo uma ação de 20% dá probabilidade de base de 10%. Condições avançadas e bônus de chance de saúde/fase podem mudar ainda mais a frequência efetiva.

## 8. Recupere um layout apertado

- Arraste divisores para redimensionar listas, espaço de trabalho e propriedades.
- Na Biblioteca Hitbox, redimensione a altura do modelo/linha de tempo e a largura do modelo/Clips.
- Use setas de cabeçalho para dobrar ou desdobrar painéis.
- Pressione **Reset panels** para restaurar o arranjo.
- Arraste a Simulação pelo cabeçalho e redimensione usando seu aperto inferior direito.

Velocidade de visualização 0.1x–4.0x altera a velocidade de observação, não salva carrapatos padrão. O layout pertence às configurações do cliente local.

## Antes de salvar

Verifique Habilitado, IDs ausentes, limites de eventos e a última repetição. Resolver erros de validação, salvar/aplicar e testar o NPC real. Continue com [ hitboxes](#mob-editor/battleworks-hitboxes).
