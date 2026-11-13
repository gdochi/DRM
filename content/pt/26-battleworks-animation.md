---
title: Conecte modelos e animação de combate
slug: battleworks-animation
order: 240
description: Escolha clipes compatíveis e alinhe o estágio, a linha do tempo e o timing da animação de elenco.
product: mob-editor
section: authoring
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

## 1. Preparar o modelo do ator

Configure primeiro o ator real: no DNPC use **Appearance & Model**; para modelos DRM use **DRM NPC Basic** e seus recursos. **DRM é opcional**. Sem DRM, BattleWorks usa o movimento humanoide nativo e provedores opcionais compatíveis; com DRM instalado, DRM mantém o controle da animação.

| Modelo ou método | Fonte apropriada |
| --- | --- |
| Humanoide normal | Main-Hand Swing ou fonte compatível Player Animator / PAL |
| Movimento de arma Better Combat | Recursos Better Combat compatíveis e arma suportada |
| Modelo Gecko | Clipe real exposto pelo provedor e arquivo de animação |
| Entidade modificada / Behavior DRM | Clipes ou mapeamentos semânticos da integração DRM |
| Teste apenas de geometria | No Animation / None explícito |

Clipes humanoides personalizados podem aparecer no próprio namespace; não se limitam a IDs Better Combat. Um clipe Gecko e uma camada humanoide não são intercambiáveis. CustomNPCs é apenas uma integração legada opcional abaixo de 26.3.

## 2. Selecionar um clipe na Hitbox Library

1. Na ação do padrão, abra **Edit this hitbox**.
2. Em **Pattern:** selecione o uso vinculado e escolha sua etapa, como Action.
3. Leia a descrição da fonte acima de **Clips** e busque por nome ou ID.
4. Selecione um clipe compatível, pressione Play, confira o contato e depois Stop.
5. Ajuste o evento de impacto ao contato e salve/aplique.

Uma seleção sem padrão vinculado é temporária na prévia. Selecione o uso desejado para salvar sua animação de etapa. A prévia separada usa a aparência copiada do NPC, configurações salvas ou um ator padrão; reabra com o NPC real se o modelo for diferente.

![Fonte, busca e nomes longos na Hitbox Library.](assets/media/guides/battleworks-017-20261113/animation-clips.png "BattleWorks 0.1.7 / Fabric 1.21.1 / DRM 0.3.2 / DNPC 0.1.4, com recursos Better Combat instalados. A descrição quebra linhas acima da busca e o nome longo aparece ao passar o mouse. Nenhum movimento de etapa compatível está atribuído nesta imagem; ela não demonstra reprodução.")

Nomes longos ficam em uma linha e revelam o texto completo ao passar o mouse. Arraste o divisor entre modelo e lista para ampliar, ou atualize após carregar os recursos.

## 3. Três locais de animação

| Localização | Propósito |
| --- | --- |
| Animação de palco | Iniciar um mapeamento na entrada do palco |
| Ação de animação da linha do tempo | Iniciar um movimento específico em um evento |
| Animação de elenco de habilidades | Solicite uma moção em cada elenco de sucesso |

Comece com uma animação de estágio de ação. Uma animação de palco configurada tem precedência sobre as ações comuns de animação dentro desse estágio. Para agendar vários movimentos explícitos, intencionalmente definir animação de palco para Nenhum primeiro.

## 4. Mudanças de fase em 0.1.5

- Etapas consecutivas usando o mesmo mapeamento compartilham um intervalo de reprodução contínua.
- Um mapeamento de palco diferente pode começar na entrada do palco.
- A recuperação pode esperar enquanto uma animação de ação/cast criada ainda possui seu tempo de reprodução especificado.
- Duração da ação e animação de elenco Ticks usar suas durações de autoria em vez de ser esticado para todo o padrão restante.
- Verificações repetidas de hitbox não reiniciam a animação de palco.

Não aplique a antiga limitação 0.1.2 "uma animação de primeiro estágio para todo o padrão" a esta versão.

## 5. Ajuste a velocidade e entre em contato separadamente

1. Comece com Velocidade de Animação 1.0.
2. Marque a postura de contato.
3. Aumente a velocidade de animação um pouco apenas quando necessário.
4. Verifique novamente o contato e o comprimento do palco depois de alterá-lo.
5. Salvar/aplicar e comparar combate real.

Velocidade de visualização controla a observação. A velocidade de animação é salva e afeta o movimento real. A busca de quadros arbitrários não é garantida para todos os clipes do Gecko; também inspeciona a reprodução normal e reinicia.

## 6. Preservar uma seleção Não intencional

O seguinte é um objeto de animação **stage**, não um arquivo de combate completo:

```json
{
  "explicitSelection": true,
  "provider": "none",
  "id": "",
  "playback": "once",
  "speed": 1.0,
  "fadeTicks": 0
}
```

Sem uma escolha explícita, estágios mais antigos só podem migrar para o balanço básico.

## 7. Diagnosticar uma lista vazia ou incompatível

1. Confira o modelo real e a descrição da fonte acima de Clips.
2. Para Gecko, diferencie geometria `.geo.json` de animação `.animation.json` e confira o recurso vinculado.
3. Para humanoides, confira o provedor Player Animator / PAL correspondente e os recursos reais do cliente. Better Combat só é necessário para suas próprias animações.
4. Atualize após o carregamento assíncrono. Use clipes oferecidos para o modelo atual, sem inventar IDs.
5. Com DRM, confira mapeamentos e reprodução; sem DRM, teste o movimento nativo antes dos clipes opcionais.

Uma entrada visível no catálogo não prova que um modelo incompatível pode reproduzi-la. Compare o NPC real após salvar e aplicar.

## Instantâneos do modelo

Um documento com `drmNpcModel` pode restaurar a configuração do modelo quando aplicado. `previewNpcModel` e `previewTexture` são dados de visualização separada. Verifique instantâneos antes de aplicar um encontro importado a um modelo diferente.

Finalmente, verifique se o NPC real joga o mesmo movimento pretendido durante o combate.
