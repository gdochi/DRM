---
title: Conecte modelos e animação de combate
slug: battleworks-animation
order: 240
description: Escolha clipes compatíveis e alinhe o estágio, a linha do tempo e o timing da animação de elenco.
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

## 1. Prepare o modelo em NPC Basic

BattleWorks usa APIs de modelo e reprodução de DRM. Configurar geometria, texturas, ativos de animação e mapeamentos semânticos em **DRM NPC Basic** Primeiro.

| Modelo ou método | Fonte apropriada |
| --- | --- |
| Um humanoide normal. | Swing principal ou instalado fornecedor de movimento humanoide |
| DRM Modelo Gecko | Um clipe real do arquivo de animação desse modelo |
| DRM entidade modificada | Clipes nativos expostos por sua integração DRM |
| DRM Comportamento | Um mapeamento semântico configurado, como ataque |
| Teste só de geometria | Explícito Sem animação / Nenhum |

Um clipe de Gecko e uma camada de pose melhor combate humanoide não são intercambiáveis.

![Estágio de ação Animação + Hitbox configurações com main_hand.](assets/media/guides/battleworks-016-neo1211/battleworks-stage-animation.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Build Assist gerado Vanilla Swing / main_hand em velocidade 1. Escolha animação abre clipes; Editar este hitbox abre a detecção de hit.")

Para DNPCs comuns, prepare a aparência no **DNPC editor → Appearance & Model**. Encontre o mapeamento de palco através da linha do tempo **Action → Stage → Animation + Hitbox**. As instruções do NPC Basic se aplicam às configurações do modelo DRM.

## 2. Selecione um clipe na Hitbox Library

1. Abra **Edit this hitbox** da ação.
2. Escolha o uso em **Pattern:**.
3. Selecione Ação na barra de ferramentas de estágio do modelo.
4. Pesquise **Clips** e selecione um clipe real.
5. Pressione Play, inspecione o contato e então pare.
6. Mude o padrão do Event Tick para combinar com o contato.

Padrão seleciona um uso; Clipes seleciona animação. Uma visualização separada pode usar configurações de modelo salvas ou um manequim padrão. Reabrir com o NPC real se o modelo de visualização não corresponder.

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

## 7. Diagnosticar uma lista de clipes vazios

1. Verifique o provedor de modelos do NPC Basic.
2. Distinguir geometria `.geo.json` de animação `.animation.json`.
3. Confirme se o modelo faz referência ao ativo de animação pretendido.
4. Verifique fornecedores opcionais e recursos do cliente.
5. Atualize após a carga de ativos assíncronos.
6. Verifique se DRM realmente expõe o clipe nativo necessário.

Use a lista do NPC atual em vez de inventar IDs.

## Instantâneos do modelo

Um documento com `drmNpcModel` pode restaurar a configuração do modelo quando aplicado. `previewNpcModel` e `previewTexture` são dados de visualização separada. Verifique instantâneos antes de aplicar um encontro importado a um modelo diferente.

Finalmente, verifique se o NPC real joga o mesmo movimento pretendido durante o combate.
