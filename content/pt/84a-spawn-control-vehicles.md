---
title: geração de veículos
slug: spawn-control-vehicles
order: 842
description: geração de veículos
product: dochi-spawn-control
category: geração de veículos
section: operations
status: Guia
version: 0.1.5
audience: Criadores / operadores de servidor
translationSource: en
translationMethod: assisted
---

## Escopo

Spawn Control**0.1.5** cria veículos modded salvos e veículos suportados EntityTypes a partir de reprodutores colocados e perfis naturais. DRM e mods são integrações opcionais.

| Mod de veículo | Alvos |
| --- | --- |
| Veículos Imersivos / MTS | Pacote instalado veículo / variantes de cores ou veículos montados salvos; Forge / NeoForge integração |
| Excelente guerra. | EntityTypes ou modelos salvos; Forge / NeoForge integração |
| Aeronaves Imersivas | Aeronave EntityTypes ou veículos salvos; gravado Fabric cobertura de tempo de execução |
| Automobilidade | Veículos montados salvos; registrados Fabric cobertura de tempo de execução |

Use uma versão real para a versão e carregador Minecraft selecionados. As engenhocas de bloqueio Create / Valkyrien Skies estão fora dessa integração baseada em entidade. Spawning não adiciona NPC dirigindo AI ou tripulação automática.

## Exemplo: gerar um M1A2 salvo

Esse fluxo foi salvo, aplicado e executado com ** Spawn Control 0.1.4 / Superb Warfare 0.8.9.1 / NeoForge 1.21.1**. Não estabelece as partes ou o comportamento de combustível de outros mods de veículos.

### 1. Salve o veículo original

Prepare um M1A2 com seu próprio mod, remova todos os passageiros, fique perto e corra:

```text
/spawncontrolvehicle save guide_tank @e[type=superbwarfare:m_1a_2,sort=nearest,limit=1,distance=..32]
```

A resposta de sucesso nomeia **spawncontrol_vehicle:guide_tank**. O original permanece no mundo e `config/dochi_rpg_maker/spawn_control/vehicles/guide_tank.json` é criado. Use `/spawncontrolvehicle list` para verificar IDs salvas ou `/spawncontrolvehicle reload` para reler modelos editados externamente.

Para outro mod, use seu tipo de veículo real depois de `type=`. Salve um veículo montado em vez de selecionar um MTS vazio `mts:builder_existing` ou um veículo da base de automobilidade não montado como alvo de geração.

### 2. Escolha o ID salvo em Entidade

Abra **Spawner Editor → Spawn Target** e deixe **Source** como **Entity**. Pressione a lupa (**Choose**), procure `guide_tank`, depois selecione **spawncontrol_vehicle:guide_tank → Selecione**. Os modelos de veículos pertencem aqui; não mude para **NPC clone template**.

![spawncontrol_vehicle:guide_tank no selecionador de entidades.](assets/media/guides/spawn-control-014-neo1211/spawn-vehicle-picker.png "Spawn Control 0.1.4 / NeoForge 1.21.1. Escolha o ID salvo pelo comando. Um EntityType de veículo padrão e um modelo de veículo salvo são alvos separados.")

### 3. Definir espaço e quantidade, em seguida, salvar

Este exemplo usa **Spawn Settings** com limite de propriedade `1`, raio `12` e **Placement: Air**. O intervalo vertical permanece em `2`, entidades por ativação em `1` e limite total em `0`. Use **Save As → guide_tank_spawner.json → Confirm**.

![guide_tank_spawner.json aponta para a identificação do veículo salvo.](assets/media/guides/spawn-control-014-neo1211/spawn-vehicle-spawner-saved.png "Spawn Control 0.1.4 / NeoForge 1.21.1. A fonte é a Entidade. Esta tela mostra o alvo; a colocação e a quantidade são configuradas separadamente em Configurações de Spawn.")

**Why Ground failed here:** Este M1A2 original salvou uma caixa de colisão que se estendia um pouco abaixo de seu ponto de referência, cruzando o chão em candidatos terrestres. O ar permitiu um candidato claro acima do solo e a geração foi bem sucedida. O ar não adiciona IA de vôo; o mod do veículo controla sua física após a inserção.

### 4. Aplicar a um desovador colocado

Use **Get Spawner** e coloque em uma área ampla e clara. Clique com o botão direito do mouse com o **DRM Core**, então ** guide_tank_spawner.json → Aplique JSON**. As condições padrão excluem jogadores criativos, então mude para Sobrevivência e permaneça próximo para o teste. Siga o mesmo. [Colocar e aplicar janela](#dochi-spawn-control/spawn-control-npc-templates).

![O recém-gerado M1A2 com seu original por trás dele.](assets/media/guides/spawn-control-014-neo1211/spawn-vehicle-runtime.png "Spawn Control 0.1.4 / Grande Guerra 0.8.9.1 / NeoForge 1.21.1. O servidor confirmou um novo tanque, um UUID diferente dos passageiros originais e zero. Isto não é uma tripulação ou demonstração de condução.")

A mesma identificação salva pode ser selecionada em regras naturais com bioma, tempo, distância e limites de quantidade. Salvar essas regras e aplicar JSON a um desovador colocado são operações separadas.

## Espaço e estado restaurado

O veículo completo precisa de pedaços carregados, autorização internacional e espaço de colisão. Raio 0 em uma âncora de entidade usa seu centro; uma âncora de bloco pode obstruir essa posição em si. Combine a superfície, a água ou a colocação de ar no veículo.

`maxOwned: 1`, `maxTotal: 0` permite a geração repetida enquanto mantém um veículo vivo. Dirigir para longe não faz com que ele fique ausente.

As partes nativas do NBT, inventário, combustível e orientação salva são restauradas com um novo UUID. Passageiros não são clonados; combustível e munição não são automaticamente reabastecidos. Distribua mods de veículos, pacotes de conteúdo e arquivos `vehicles/` com a predefinição.

## DNPC geração

Instale DNPC e DRM e escolha o modelo de clone [NPC](#dochi-spawn-control/spawn-control-npc-templates) para gerar um NPC concluído. A entrada NPC padrão não copia a aparência ou o equipamento salvos.
