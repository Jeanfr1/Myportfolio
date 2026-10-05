# Roteiro de animação — Inside the Creative Mind

## Princípio da narrativa

Uma luz azul percorre a arquitetura do retrato e guia o visitante. No hero, ela organiza os planos. Na transição, aponta o projeto em destaque. No automóvel, vira o scan. Na Isola, vira a órbita. Na beleza e nas barbearias, vira o traço e o recorte de luz. No encerramento, volta a ser a linha editorial ao redor de Josean.

Uma direção visual contínua não exige uma animação interminável. Cada capítulo tem um ponto de leitura estável e uma transição curta.

## Ato 1 — A presença

Desktop: hero fixado por aproximadamente 320–380% da altura do viewport. Normalize o progresso desse trecho de 0 a 1. A entrada inicial automática é curta, de 1,2 a 1,6 segundo, e não bloqueia navegação.

| Progresso | Câmera e composição | Texto | Arquivos |
| --- | --- | --- | --- |
| 0,00–0,12 | Prata na borda do retrato; Josean aparece em primeiro plano; planos quase unidos | Nome, especialidade e chamada principal permanecem estáveis | Fundo + retrato monumental + corpo |
| 0,12–0,32 | Planos atrás do rosto afastam-se suavemente; retrato recua 4–6%; Josean quase não se move | Chamada sai com deslocamento de até 40 px | Camadas independentes + linha em SVG/WebGL |
| 0,32–0,55 | Seis janelas emergem de trás do retrato; três ficam em primeiro plano, três ao fundo | “Visão em movimento.”; índice dos projetos | Imagens da pasta de projetos |
| 0,55–0,76 | Automotives STA fica central; janelas laterais reduzem escala e luz; portal enquadra o projeto | Nome do projeto, categoria e “Explorar estudo” | Portal + conceito STA |
| 0,76–1,00 | A janela cresce até preencher a tela; luz azul diminui, vermelho do case assume a cena | Conteúdo do case aparece apenas quando a composição estabiliza | Conceito STA + carro scan |

Mantenha posição, escala e desfoque sob a mesma timeline. Evite atrasos independentes que deixem as camadas deslizando sem relação com o scroll.

## Ato 2 — Entrar no trabalho

O primeiro projeto ocupa uma cena ampla, com informação concisa: empresa, setor, proposta e contribuição. Um botão permite abrir o estudo completo. A leitura pode acontecer sem avançar o scroll.

Na narrativa do STA, use três estados: automóvel → scan → motor. Os arquivos disponibilizados mostram os estados visuais. A transição 2.5D usa crossfade, mudança curta de escala e máscara vertical; não simule uma câmera atravessando uma PNG como se fosse um modelo completo.

Para uma versão com explosão real do motor, use malhas separadas, pivôs definidos e trajetórias de afastamento. Os assets são referências e texturas de apresentação, não um arquivo CAD.

## Ato 3 — Seis universos, uma assinatura

Depois do destaque, organize os demais projetos em uma galeria com cenas amplas e índice fixo. Desktop: um capítulo opcional fixado de 500–650vh. Mobile: fluxo vertical natural, sem exigir scroll horizontal.

| Projeto | Gesto visual | Cor assumida pela cena | Transição de entrada |
| --- | --- | --- | --- |
| Automotives STA | Scan revela mecânica e precisão | Preto, prata, vermelho | Aproximação através do portal |
| Isola | Bola de sorvete e ingredientes orbitam | Pistache e cor do sabor | Reflexo circular transforma-se em órbita |
| Legend Nails | Movimento de mão e esmalte | Creme e oliva | A órbita se estica em um traço editorial |
| Orhan Barber | Navalha, fio e retrato | Grafite e platina | O traço passa a ser a lâmina de luz |
| Bayro Cut | Retrato e ritual da barbearia | Carvão e luz de ambiente | Corte de luz revela o próximo retrato |
| M&M Cleaning | Ambiente em planos | Cinza claro e azul | Os planos se recompõem como arquitetura |

Os seis projetos precisam continuar acessíveis por lista ou grid. A galeria animada não substitui a navegação. O índice deve permitir saltar para um projeto por clique e teclado.

## Ato 4 — Voltar ao criador

O ambiente da M&M se reduz em planos e retorna à composição editorial. Josean aparece com escala humana, sem repetir o grande espetáculo do hero. A seção sobre prioriza a leitura. O retrato move-se até 12 px em parallax; o texto permanece parado.

O processo utiliza três etapas: entender → dar forma → construir e refinar. Uma linha percorre as etapas durante o scroll, sem deslocar a página nem esconder os textos.

## Ato 5 — O próximo capítulo

Um portal arquitetônico se abre com luz prata e azul. A figura de Josean caminha em direção à passagem, como no encerramento do mockup; a frase “Vamos criar o próximo.” entra à esquerda em duas linhas. Use a imagem do portal como keyframe ou fallback estático. Para animar a caminhada de fato, será preciso produzir um clipe ou frames; a PNG não contém essa ação. O botão de LinkedIn deve permanecer estável e legível.

## Movimento e tempos

- Entradas editoriais: 500–800 ms; deslocamento de 16–28 px.
- Troca de projeto acionada por clique: 650–900 ms, sem travar o scroll.
- Hover: 180–250 ms; mudança de borda e aproximação até 2%.
- Parallax: pouco deslocamento, com velocidades diferentes mas previsíveis.
- Camera motion: aceleração discreta e desaceleração longa. Use easing suave; evite bounce e elastic em cenas cinematográficas.
- Blur apenas nas camadas de fundo e em momentos de passagem. Nunca nos textos de leitura.
- Som é opcional e desligado por padrão. O conceito não depende de áudio.

## Mobile

Hero de aproximadamente 100–120svh. Use a composição vertical fornecida. O recorte de Josean deve ficar inteiro ou ser enquadrado intencionalmente; não deixar metade do rosto no limite da tela. Reduza os planos visíveis para dois ou três e dê prioridade ao retrato.

Se o dispositivo suporta a experiência, um trecho fixado curto de até 160–180svh pode levar ao primeiro projeto. Caso contrário, utilize hero estático e transição simples de opacidade. O visitante nunca deve precisar percorrer vários metros de scroll para alcançar os trabalhos.

## Movimento reduzido

Com `prefers-reduced-motion: reduce`, mantenha uma cena inicial estática, remova pinning longo, rotação e zoom de câmera. Exiba os projetos em ordem natural. Os títulos, links e conteúdo dos estudos continuam visíveis.

## Implementação em camadas

Ordem sugerida: fundo → retrato monumental → planos de fundo → previews dos projetos → Josean em primeiro plano → luz de ligação → texto HTML → navegação.

GSAP/ScrollTrigger é uma opção de implementação; uma timeline equivalente pode ser usada. Faça o layout funcionar sem a biblioteca antes de adicionar movimento. Se o roteiro exigir atualização da API ou escolha de uma versão, consulte a documentação oficial no momento da implementação.

Uma versão realmente volumétrica requer produção de modelos 3D, materiais, iluminação e otimização. Os PNGs permitem uma versão sofisticada em 2.5D; eles não contêm profundidade de malha.

## O que verificar

Scroll reverso, redimensionamento, retorno pelo histórico, abertura e fechamento de estudos, foco de teclado, altura de tela pequena, carregamento lento, zoom de texto de 200%, movimento reduzido e ausência de rolagem horizontal involuntária.
