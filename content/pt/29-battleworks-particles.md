---
title: Criar efeitos com o Particle Maker
slug: battleworks-particles
order: 274
description: Construir um anel de dois segundos, testá-lo com um comando, e anexá-lo a uma fase de combate.
product: mob-editor
section: effects
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

## O que esse exercício produz

Um arquivo visual emite um anel por cerca de dois segundos. Você vai jogar através de um comando e um chefe Windup. O dano continua sendo um Hitbox ou Habilidade separado.

O compartilhado 0.1.5 O fabricante de partículas usa **Separe `dochi.particles.v1` arquivos**. Documentos mais antigos em linha particleEffects permanecem um caminho de compatibilidade.

## 1. Abrir sem um NPC

1. Use DRM Core no modo Criativo.
2. Escolha **Visual → Particle Maker**.
3. Criar um efeito ou Carregar `particle_sample.json`.
4. Save As uma cópia de trabalho.

Uma ação BattleWorks Particle Shape também pode abrir o mesmo editor com **Open Particle Maker**, em seguida, conectar o arquivo salvo.

## 2. Criar uma camada de anel

| Controle | Valor |
| --- | --- |
| Nome do efeito | Anel de treinamento |
| Emissão (ticks) | 40 |
| + Camada | Uma camada |
| Início / Fim do tick | 0 / 39 |
| Intervalo | 2 |
| Partícula | minecraft:end_rod |
| Origem | Caster |
| Forma / Raio | Anel / 2.4 |
| Exemplo de pontos / Contagem por ponto | 24 / 1 |
| Espalhar / Velocidade | 0 / 0 |
| Local Y | 0.05 |

1. Defina o tempo em **Timing / names**.
2. Escolha a partícula e origem em **Particle / origin**.
3. Definir forma e dimensões sob **Shape / size**.
4. Mova-se um pouco acima do chão abaixo **Starting position / rotation**.
5. Inspecione Play/Pause e Redefinir.

O tick End de uma camada de partícula é inclusivo, mas deve ser ** menor que a Duração**. Um efeito 40-tiquetaque usa carrapatos 0 – 39. Isso difere dos limites dos eventos do estágio de combate.

No intervalo 2, este exemplo emite 0, 2, 4 através de 38: 20 emissões de 24 partículas, solicitando 480 total.

![Temporização da camada no Particle Maker e suas configurações de tempo/nomes.](assets/media/guides/battleworks-016-neo1211/battleworks-particles.png "BattleWorks 0.1.6 / NeoForge 1.21.1. Leia Emissão 40 com Start 0, End 39 e Intervalo 2. O painel de visualização acima é dobrado; expanda-o para inspecionar a geometria das partículas.")

## 3. Animar o raio

1. Abra **End values (linear)** e permita que o Animate termine os valores.
2. Use o Raio inicial 1 e o Raio final 2.4.
3. Combine as outras coordenadas finais com as coordenadas iniciais.
4. Jogue e veja o anel se expandir.

Para vários pontos de tempo, procure a linha do tempo, abra **Motion keyframes**, pressione **Add key** e defina a posição, o raio e a guinada. Valores interpolam linearmente entre chaves.

As chaves têm precedência para seus valores de X/Y/Z, raio e yaw. Eles animam o **Emissor**Não as posições de cada partícula já criada.

## 4. Selecione opções de partículas válidas

O selecionador lista as partículas de baunilha e mod registradas. Opções adicionais só aparecem quando necessário.

Exemplos: `minecraft:dust` pode usar `1 0.3 0.1 1`; uma partícula de bloco pode usar `minecraft:stone`. Opções específicas devem corresponder ao decodificador real. Comece com end_rod antes de mudar de tipo.

## 5. Pré-visualizar controles e limites

Arraste a tela para girar e use a roda para ampliar. Front / Perspective muda a visão.

**End: Hold** mantém o quadro final da pré-visualização. **End: Clear** limpa a visualização após a reprodução. Estes não são comandos para substituir a vida de todas as partículas do mundo.

A visualização usa provedores de partículas reais, texturas e tipos de renderização. Alguns renderizadores CUSTOM precisam de um estágio separado de renderização do mundo e não podem ser incorporados; NO_RENDER As partículas são intencionalmente invisíveis. Verifique a iluminação do mundo real, profundidade e aparência também.

## 6. Salvar e executar um comando

1. Save As `training_ring.json`.
2. Confirme o resultado da gravação.
3. Verifique se está em `config/dochi_rpg_maker/particles/`.
4. Com nível de permissão 2 ou acima, corra uma vez:

```mcfunction
/drm particle play training_ring ~ ~ ~
```

**Não inclua .json no comando.** Subpastas usam nomes como efeitos/training_ring. A conclusão sugere nomes sem extensão.

Um comando agenda todo o efeito. Repetir todos os carrapatos é desnecessário. Coordenadas relativas usam a posição de execução do comando.

Você também pode salvar o arquivo de partículas [practice](./assets/media/battleworks/training_ring.json) nessa pasta.

## 7. Anexe-o a Windup

1. Selecione um padrão BattleWorks Windup.
2. Adicione **Particle Shape** na categoria de apresentação.
3. Use **Choose particle JSON** e selecione training_ring.json.
4. Escolha Origin Caster.
5. Defina a Marca de Evento 0, Intervalo 0, Contagem Repetida 1.
6. Para este exercício, use um 40-tick Windup antes do contato.
7. Salvar/aplicar o documento de combate.

A ação armazena uma referência particleFile. A edição desse arquivo de partículas compartilhado afeta outros encontros usando-o.

Os efeitos Caster/Target podem continuar seguindo a posição de sua origem e enfrentando enquanto emitem. Para um aviso fixo no local anterior do jogador, registre uma posição e escolha Posição salva.

## 8. Limites de emissão

| Escopo | Limite atual |
| --- | --- |
| Duração do efeito | 600 carrapatos |
| Camadas / chaves por camada | 32 / 64 |
| Amostras de geometria única / contagem | 512 / 32 |
| Combater efeitos simultâneos de NPC / orçamento por tick | 8 / 2,048 |
| Efeitos de comando por dimensão / orçamento por tick | 64 / 4,096 |

Se a saída for ignorada, reduza amostras, contagem, frequência ou efeitos simultâneos. Inspecione `Particle JSON rejected` para falhas de arquivo. Use o comando world quando pré-visualizar relatórios renderização não suportada.

Um anel visível sem danos é esperado até um separado. [hitbox](#mob-editor/battleworks-hitboxes) Está conectado.
