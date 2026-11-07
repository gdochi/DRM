---
title: Battle Presentation Maker Guia funcional
slug: cobblemon-battle-presentation
order: 530
description: Fazer uma entrada de treinador com texto, fotos, modelos e som.
product: drm-cobblemon-editor
category: Battle Presentation Maker
section: presentation
status: Rascunho
version: Fabric / NeoForge 0.2.9
audience: Criadores de apresentações de batalha
tags:
  - presentation
  - editor
  - workflow
translationSource: en
translationMethod: assisted
---

## Editar a cena em um momento específico

Use a pré-visualização do meio junto com a linha do tempo abaixo. Esta é a entrada padrão do Treinador em **tiquetaque 0 **. Use **Play** ou arraste a régua para o momento em que seu texto, modelos e efeitos aparecem.

![Tela de entrada padrão e linha do tempo da camada em 0/144 carrapatos.](assets/media/guides/cobble-029-neo1211/cobble-presentation.png "0.2.9 / NeoForge 1.21.1. Camadas/categorias são deixadas; as configurações da camada selecionada estão corretas. Esta é a exibição de criação, antes da reprodução em tempo de execução.")

## Fazer uma entrada

1. Abra **Battle Presentation Maker** da lista de editores do DRM e carregue um exemplo.
2. Use **Add Label** para texto VS e **Add Texture** para fotos.
3. Organize texto, fotos e modelos na tela.
4. Defina seus horários de início/fim na linha do tempo e reproduza a visualização.
5. Use **Save As**.
6. Escolha o arquivo sob o treinador **General → Battle Presentation**.

A cena é antes da batalha. **Duration** é o seu comprimento, a rodada é **Battle start delay** Está esperando mais depois. **Skippable** deixa os jogadores pularem.

## Siga a primeira apresentação em vídeo

Battle Presentation Maker cria a **tela exibida na entrada da batalha**. O [Scene Maker](#core-fabric/scene-maker) controla a câmera no mundo. Comece pelo exemplo Trainer e um Label antes de acrescentar movimento e modelos.

São gravações reais do **Cobblemon Editor 0.2.9 / DRM 0.3.1 / NeoForge 1.21.1**, com interface, instruções e indicadores de clique em inglês. Os vídeos não têm áudio. Siga os passos abaixo; pause ou use tela cheia para ler os valores.

### 1. Adicionar e posicionar um Label

![Adicionar um Label, editar texto e tamanho, definir posição e camada e conferir a linha do tempo.](assets/media/guides/tutorial-videos-20261107/battle-label-layout.mp4 "Add Label → Content → Layout → linha do tempo. A ferramenta de captura usa as entradas reais do editor.")

1. Em **Add Label → Content**, escreva **RIVAL CHALLENGE** e defina **Font Size 30**. Width e Height dimensionam a caixa; Font Size dimensiona as letras.
2. Em **Layout**, use Final X **320**, Final Y **70**, Width **360**, Height **70** e Layer **60**. As coordenadas pertencem ao Stage; Layer define a sobreposição com modelos e enfeites.
3. Alterne **Content → Layout** para confirmar os campos antes de clicar perto do **tick 60** na régua. Se o tick zero estiver vazio, confira o intervalo ativo e Fade In.
4. Continue no [vídeo de movimento](#drm-cobblemon-editor/battle-presentation-layers-runtime) para animar o mesmo Label.

### 2. Modelos, áudio e arquivo próprio

![Alterar escala e rotação do modelo, configurar Intro e salvar uma apresentação personalizada.](assets/media/guides/tutorial-videos-20261107/battle-actors-audio.mp4 "Actors → Audio → Save As. Mostra edição e gravação do arquivo; não registra a reprodução do áudio da batalha.")

1. Em **Actors**, confira Player/Opponent e Trainer/slot da equipe. O vídeo muda o Opponent inicialmente selecionado para Scale **60** e Yaw **−25**. Modelos Pokemon não usam poses de articulações humanas.
2. Em **Audio**, use Intro Sound **minecraft:ui.toast.challenge_complete** e Start Tick **20**. Intro pertence à apresentação; Battle começa na batalha real. Use **Play/Stop** para ouvir e confira a ativação do som.
3. Use **Save As → custom/tutorial_rival.json → Save**. Name é o nome de exibição; a referência é o caminho salvo.
4. No editor do treinador, selecione o arquivo em **General → Battle Presentation** e **salve também o treinador**. Um NPC que acompanha o mesmo arquivo usa a alteração na próxima batalha. Aplique o treinador ao configurar um NPC novo.
5. Confira nomes, modelo, áudio e transição em jogo. A prévia e a gravação não vinculam o NPC por si sós. Veja o [vídeo da batalha real do treinador](#drm-cobblemon-editor/cobblemon-trainer-editor).

## Quatro áreas de trabalho.

| Área | Interação | Resultado salvo |
| --- | --- | --- |
| Camadas | Adicionar, selecionar, remover e arrastar as linhas Label, Texture e Color | Lista de elementos e ordem Z |
| Canvas | Visualize o tick atual e selecione ou mova elementos e atores diretamente | Posição de início/fim do elemento ou ator X/Y |
| Inspetor. | Alternar entre Elemento, Modelos, Fundo e Áudio | Conteúdo, transformações, movimento, atores e sons |
| Linha do tempo | Toque, pause, reinicie, esfregue e arraste alças de alcance | Faixas ativas por elemento |

Player Model e Opponent Model são linhas de atores especiais que não podem ser excluídas. Desativar `Render Selected Model` para esconder um. Arrastar linhas de usuário recalcula os valores Z para que a lista, a visualização e o documento salvo usem a mesma ordem.

## Limites e coordenadas

| Item | Alcance |
| --- | ---: |
| Duração | 1–600 carrapatos, até 30 segundos |
| Elementos | Até 64 |
| Estágio padrão | 960×540 Coordenadas lógicas |
| Largura/altura do elemento | 1–3840 / 1–2160 |
| Z | -1000–1000 |
| Texto do rótulo | Até 512 caracteres |
| Tamanho da fonte | 4–128 |
| Escala de movimento | 0.01–20 |
| Rotação de movimento | -3600–3600 graus |
| Alfa e opacidade da imagem | 0–1 |

A origem do Palco é de cima para a esquerda; X aumenta para a direita e Y aumenta para baixo. O centro padrão é X 480, Y 270. A projeção de tempo de execução mapeia o palco na janela e o conteúdo da tesoura fora da janela.

## Ações de arquivo

| Ação | Comportamento |
| --- | --- |
| `Create New` | Abre um modelo seguro e o tutorial guiado. |
| `Reset` | Restaura o padrão de apresentação do treinador; alterações não salvas são perdidas. |
| `Load` | Muda para um documento em `cobblemon/battle_presentations/`. |
| `Save` | Atualiza o caminho atual. Um novo rascunho cai para `Save As`. |
| `Save As` | Escreve um novo caminho relativo como `custom/gym_intro.json`; `.json` é adicionado quando omitido. |

O nome é metadados de exibição dentro do JSON. Os treinadores fazem referência ao caminho do arquivo `Save As`, não ao valor Nome.

## Ordem de compilação recomendada

1. Definir duração e skippable.
2. Configure o plano de fundo e a imagem de palco do mundo.
3. Bloqueie a composição com grandes camadas de cor.
4. Coloque jogadores e atores opostos e escolha sua ordem Z.
5. Adicione conteúdo de etiqueta e textura.
6. Definir intervalos ativos e desvanecimentos.
7. Adicione movimento e afrouxamento.
8. Configure o áudio Introdução e Batalha e reproduza a sequência completa.
9. Salvar em `custom/` e, em seguida, selecione esse caminho no Cobblemon Editor.
10. Salve o documento de batalha; um NPC rastreando esse caminho de origem normalmente não precisa ser reaplicado.

Organize a cena na pré-visualização e, em seguida, jogue uma batalha para verificar as peles reais, modelos, tamanho da janela e som.

O navegador de imagens exibe seus resultados e carrega miniaturas conforme necessário, reduzindo o custo inicial em grandes pacotes de recursos.

## Modelos de equipe e Motion

Escolher `Actors` → `Player` ou `Opponent` → `Trainer / 1–6`. Cada lado tem seis slots com configurações de modelo, Transformar, Pose e Movimento selecionadas por renderização independente. As predefinições normais ocultam os slots da equipe; `presets/vs_party_showcase.json` permite um exemplo opcional 6+6.

Pré-visualizações usam amostra Pokémon; batalhas reais usam a aparência da equipe fornecida pelo servidor. As vagas desaparecidas ficam vazias. Slots ocultos não expõem espécies, movimentos, estatísticas ou itens mantidos. Modelos não são gerados no mundo.

Edições de movimento início/fim, entrada/saída duração, compensações, escala e deriva. Referência JSON: `actors.*.animation.fitToModel` se encaixa no modelo completo; `camera` suporta até 64 quadros-chave de posição/zoom/rotação baseados em carrapatos. Edite essa lista no JSON e verifique-a no renderizador de visualização compartilhado. A flexibilização suportada inclui passo, linear, ease_in, ease_out e ease_in_out. O esquema de apresentação é 5, com documentos anteriores1–4 legíveis.

## Novas predefinições

| Arquivo | Duração em 20 TPS | Propósito |
| --- | --- | --- |
| `presets/vs_trainer.json` | 144 carrapatos / 7.2 s | Treinador revelar e nome |
| `presets/vs_pokemon.json` | 132 carrapatos / 6.6 s | Encontro selvagem. |
| `presets/vs_boss_trainer.json` | 168 carrapatos / 8.4 s | Treinador chefe. |
| `presets/vs_legendary_pokemon.json` | 184 carrapatos / 9.2 s | Lendário Pokémon |
| `presets/vs_party_showcase.json` | 168 carrapatos / 8.4 s | Opcional 6+6 Equipe revelar |

Novas predefinições gerais usam fundos em tela cheia e encaixe de modelo completo. Trate os padrões como modelos e use Save As para arquivos personalizados. Não substitua cenas de usuários por atacado.

Os efeitos incluem raster_warp, vs_ribbon, versus_mark, iris_shutter, arena_depth, wild_meadow, wild_grass, rift_sky, ground_shadow, light_sweep e dust_motes. Cenas encadernadas a batalhas selvagens, RCT ou PvP em [Encounter Presentations](#drm-cobblemon-editor/cobblemon-encounter-presentations).

## Bloquear estágios, FX e agendamento

Veja [ estágios de bloqueio e FX](#drm-cobblemon-editor/cobblemon-presentation-region-fx) para criação de Região/FX em 0.2.4, e [Battle Scheduler](#drm-cobblemon-editor/cobblemon-battle-scheduler) para clone, cena e execução de batalha.
