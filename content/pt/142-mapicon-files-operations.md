---
title: Mapear arquivos e solução de problemas
slug: mapicon-files-operations
order: 1420
description: Perfis e locais PNG, limites de exibição NPC ao vivo e solução de problemas.
product: dochi-mapicon-integration
category: Arquivos e Operações
section: operations
status: Guia de uso
version: 0.1.3
audience: Criadores/operadores
translationSource: en
translationMethod: assisted
---

## Perfis e imagens

| Dados | Caminho / exemplo |
| --- | --- |
| Perfis de servidor | `config/dochi_mapicon_integration/*.json` |
| Nome do perfil ativo | `config/dochi_mapicon_integration/active.txt` |
| DRM servidor PNGs | `config/dochi_rpg_maker/assets/textures/icons/` |
| PNGs empacotados instalados | `config/dochi_rpg_maker/assets/textures/icons/nikoichu/` |

Coloque PNGs personalizados na pasta textura do servidor e procure **Choose Icon → External Images**. `assets/textures/icons/vendor.png` usa o ID de exibição `dochi_rpg_maker:textures/icons/vendor.png`. Os clientes usam a transferência de textura e o cache do DRM.

Para um pacote de recursos `assets/myserver/textures/icons/vendor.png`, digite `myserver:textures/icons/vendor.png`. Estático 32×32 ou 64×64 PNGs são recomendados; o máximo é 1024×1024. Imagens ausentes ou pendentes usam o ícone NPC padrão. A inicialização do servidor instala apenas PNGs em falta e preserva os arquivos existentes.

MapIcon 0.1.3 reutiliza imagens e marcadores do JourneyMap que não mudaram. Após substituir um PNG de pacote de recursos mantendo o mesmo ID de recurso, recarregue os pacotes de recursos para atualizar a imagem nos mapas.

## Limites de exibição ao vivo

Somente NPCs carregados por servidor na dimensão do jogador são exibidos: dentro de 4096 blocos, primeiro mais próximo, até 512 entradas. O servidor atualiza a cada segundo; clientes rastreando uma entidade usam sua posição real.

Descarregamento, morte, mudanças de dimensão e desconecta entradas obsoletas. A versão 0.1.3 não armazena POIs fixos ou locais conhecidos para NPCs descarregados. Os NPCs controlados suprimem o marcador de radar Xaero normal para reduzir duplicatas. O modo Xaero Fair Play não desenha a camada de minimapa adicional.

![O recebido DNPC marcador renderizado no mapa Xaero real.](assets/media/guides/mapicon-012-neo1211/mapicon-minimap.png "MapIcon 0.1.2 / NeoForge 1.21.1 / Minimapa de Xaero 26.6.0. O humanóide azul acima do marcador de jogador branco representa o NPC visível no mundo. Verifique o mapa real depois de salvar, bem como a visualização do editor.")

## Solução de problemas

| Sintoma | Verificar |
| --- | --- |
| Sem ícones | Suportado Xaero / XaeroLib ou JourneyMap 6, exibição global, deslocamento de mapa, NPC carregado, dimensão e distância |
| Escondido apenas para um jogador | DRM Condições de visibilidade do NPC, por NPC Hide e uma regra de desabilitação correspondente |
| ícone inesperado | Substituição por NPC, caminho JSON, prioridade de regra e ordem de tipo padrão |
| Marcadores duplicados | Se o addon gerencia esse NPC e compatibilidade da compilação Xaero instalada |
| Conflito ao salvar | Use **Reload saved settings** e reaplique as alterações; outro editor pode ter alterado o perfil ou o NPC selecionado |
| Os ícones desaparecem muito longe. | NPCs descarregados estão fora do escopo atual de exibição ao vivo |

Edição, navegação e salvamento de arquivos exigem nível de permissão 2, enquanto os jogadores comuns podem ver ícones de mapa. Faça backup de perfis de mapas, DRM ativos e os dados de NPC do mundo juntos.
