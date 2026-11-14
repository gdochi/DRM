---
title: Booby Trap Editor e Gerente
slug: warfare-booby-traps
order: 390
description: Configure o acesso à senha, explosões, efeitos, comportamento de lançamento, granadas LRT, perfis, marcadores e ciclo de vida.
product: dochi-warfare
category: Ferramentas do Mundo
section: tools
status: Rascunho
version: 0.3.1
audience: Criadores de mapas e cenários
tags:
  - booby-trap
  - security
  - explosion
translationSource: en
translationMethod: assisted
---

## Funções de editor e tempo de execução

`DW Booby Trap Core` é uma ferramenta criadora de modo criativo.

* Clique com o botão direito do mouse em um bloco com o núcleo para abrir o editor desse bloco.
* Clique com o botão direito do ar no núcleo para abrir o gerente para armadilhas registradas.
* Coloque o núcleo antes de testar uma armadilha configurada através da interação normal do bloco.

O editor e o gerente são telas de criação. Os prompts de senha e os efeitos de armadilha são o comportamento do jogador no jogo, e o servidor faz a validação final e a decisão de acionar.

## Tipos de armadilhas

| Tipo | Alvo e comportamento |
| --- | --- |
| `Password Door` | Apenas porta de baunilha. Autenticar antes de abrir. |
| `Password Container` | Bloquear com uma GUI de inventário; autenticar antes de abrir o contêiner. |
| `Immediate Explosion` | Acionar uma explosão imediatamente na interação. |
| `Delayed Explosion` | Reproduza o feedback de aviso configurado, espere e exploda. |
| `LRT Grenade` | Lançar uma entidade nativa de granadas LesRaisins Tactical Equipments quando o mod opcional estiver instalado. |

Escolher um tipo aplica os campos de linha de base necessários, mas todos os resultados devem ser revisados antes de salvar.

## Evento de gatilho

Em 0.2.9, explosão, explosão atrasada, e armadilhas de granadas LRT podem usar `Interact` ou `Step on block`. O servidor detecta `Step on block` quando uma entidade entra na área de contato superior do bloco configurado e, em seguida, aplica as regras normais de recarga, proprietário-bypass, escopo de destino e uso único. Portas de senha e contêineres mantêm seu fluxo de interação normal.

## Regras de senha e acesso

As armadilhas de senha suportam um PIN numérico de 4 a 12 dígitos ou uma senha de texto de 1 a 32 caracteres. Você pode configurar a sensibilidade do caso, o bypass do proprietário, o lado de entrada, o comportamento do reverso, a política de fechamento de portas, as tentativas máximas, a janela de tentativa, o tempo de bloqueio e a ação de falha.

Ações de falha podem mostrar um aviso, causar dano direto ou explodir. Os valores da senha não são preservados como um rascunho simples editável após a configuração; alterar o modo de senha ou a política de caso requer uma nova senha.

## Payloads e efeitos

Armadilhas de explosão expõem energia, bloqueiam destruição, criam fogo, atrasam, alertam som e alertam partículas. Os efeitos opcionais podem empurrar o acionador e aplicar até oito efeitos de poção ao acionador, todos os jogadores próximos ou todas as entidades vivas próximas.

A carga útil da granada LRT configura o tipo de granada, fusível, potência, contagem, direção, ângulo e guinada/pitch fixos quando necessário. O editor rejeita essa carga quando LesRaisins Tactical Equipments não está disponível ou a granada selecionada não pode ser criada.

## Ciclo de vida e testes

Uma armadilha dispara apenas enquanto ambos `Enabled` e `Armed` estão ligados. Outros controles importantes incluem bypass de proprietário, proteção contra quebra, comportamento de redstone, recarga, uso único, remoção de estado após gatilho, remoção de bloqueio de alvo, destruição de bloqueio e criação de fogo.

Teste nesta ordem:

1. Salve uma armadilha simples com `Enabled` e `Armed` em diante.
2. Colocando `DW Booby Trap Core` Fora.
3. Interaja normalmente como um jogador de teste não proprietário quando o bypass do proprietário estiver ativado.
4. Verifique o efeito e o ciclo de vida antes de adicionar falhas de senha, efeitos de poção ou cargas úteis LRT.

![Armadilhas Booby registradas com pesquisa, seleção, Configurações, Armadilha de Desarmamento e Bloqueio.](assets/media/guides/warfare-031-neo1211/dw-traps.png "DW 0.3.1 / NeoForge 1.21.1. Esta lista gerencia armadilhas registradas. Atualmente tem 0 selecionado; escolha uma entrada para usar configurações ou controles desarmar.")

## Gerente, marcadores e perfis

Clicar com o botão direito do ar com o núcleo para procurar armadilhas registradas e inspecionar status como ativo, desativado, desarmado, descarregada pedaço, bloco obsoleto, pendente explosão atrasada, ou falta de dependência. `Remove Trap` remove apenas o estado da armadilha; `Destroy Block` remove o estado e o bloco alvo. Ações destrutivas do gerente exigem uma segunda confirmação.

Enquanto o núcleo é mantido no modo Criativo, armadilhas configuradas próximas podem ser mostradas com contornos e marcadores compactos. Perfis JSON reutilizáveis são armazenados em:

```text
config/dochi_warfare/booby_traps/profiles/
```

Carregar um perfil aplica as configurações ao rascunho do editor atual. O servidor ainda valida se esse perfil é válido para o tipo de bloco selecionado antes de salvar.
