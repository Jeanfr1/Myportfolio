# JOSEAN ARAÚJO — INSIDE THE CREATIVE MIND

## Comece aqui

Este é um kit de direção de arte e produção para você construir o portfólio. A entrega reúne imagens, referências visuais, roteiro de scroll, estrutura das seções, textos e especificações. Não contém um site pronto nem uma animação renderizada.

Abra primeiro `01-conceitos/01-portfolio-desktop.png` e `05-roteiros/direcao-e-producao.pdf`. Depois siga o roteiro de animação e o roteiro de seções. O catálogo visual permite conferir os arquivos sem depender de conexão.

## A ideia

**Inside the Creative Mind.** O visitante entra no universo criativo de Josean. Um retrato monumental se desdobra em planos, o criador permanece em primeiro plano e os projetos emergem como janelas de uma mesma arquitetura. A câmera atravessa uma janela e a experiência muda de universo: do automóvel ao gelato, do gesto da manicure ao ritual da barbearia.

O luxo vem de escala, composição, fotografia, silêncio e controle do movimento. A luz azul funciona como um fio narrativo que une as cenas. Cada projeto mantém sua identidade; a moldura do portfólio permanece reconhecível.

## Organização

| Pasta | Conteúdo | Uso |
| --- | --- | --- |
| `00-referencias` | Foto original e referências de identidade e estilo | Orientação de retrato; não são assets finais do hero |
| `01-conceitos` | Mockup desktop, mockup mobile e storyboard | Referência visual; não usar como página inteira |
| `02-hero` | Hero desktop, hero mobile e atmosfera de fundo | Abertura, fallback e ambientação |
| `03-camadas` | Josean recortado, retrato monumental, portal, monograma e artes editoriais | Composição independente e encerramento |
| `04-projetos` | Conceitos e imagens dos seis projetos anteriores | Galeria e transições |
| `05-roteiros` | PDF, roteiro de animação e roteiro de seções | Direção criativa e montagem |
| `06-integracao` | Tokens, configuração da narrativa e prompt de implementação | Handoff para desenvolvimento |

`manifesto-assets.json` registra as dimensões reais, transparência e função de cada imagem. `prompts-criativos.json` registra os prompts de geração. O ZIP inclui todos os arquivos desta pasta.

## Regras de montagem

1. Monte texto, navegação, números e CTAs em HTML. A tipografia nos mockups é uma referência visual, não conteúdo final para recortar.
2. Preserve a identidade e a proporção do retrato. Não estique o rosto para preencher o viewport.
3. Use as imagens transparentes como camadas separadas; o hero completo é uma referência de composição e um fallback de carregamento.
4. Recrie a linha de luz e os planos de projetos como elementos do navegador. As imagens fornecidas têm reflexos e iluminação já definidos.
5. A rotação das imagens deve ser curta. Uma imagem PNG é plana: ela não vira um objeto 3D completo ao girar. Para atravessar ou fragmentar o rosto com volume real, será preciso produzir um modelo 3D e seus materiais.
6. Os arquivos são artes finais e keyframes de direção, não uma sequência contínua de vídeo. Use camadas e transições para a versão 2.5D; produza os frames intermediários ou os modelos 3D para uma versão cinematográfica com câmera volumétrica.
7. As telas dos clientes são conceitos que criamos. Apresente-os como estudos de design, sem afirmar lançamento, contratação, retorno financeiro ou resultados medidos.

As imagens foram dirigidas para a mesma linguagem, mas não são frames registrados pixel a pixel. Monte uma cena contínua com as mesmas camadas e ajuste posição/escala pela composição. Evite saltar de um hero completo para recortes independentes sem uma transição de luz ou opacidade.

## Direção visual

- Grafite: `#080A0D`; preto elevado: `#151920`.
- Prata: `#DCE3E9`; branco: `#F7F9FB`.
- Luz azul: `#61B8FF`; azul de interface: `#295FFF`.
- Títulos: sans geométrica ou neo-grotesca de grande escala. Sugestão de composição: Space Grotesk, com fallback Arial.
- Corpo: Inter, com fallback Arial; texto principal de 16–18 px.
- Serif apenas em momentos editoriais pontuais. Sem misturar cinco famílias.
- Grid de 12 colunas desktop e 4 mobile; margens 5–7%; espaçamento amplo e consistente.
- Bordas retas ou raio discreto. Vidro restrito à narrativa do hero e aos projetos.

## Ordem de construção

1. Estrutura sem animação: hero → projetos → case em destaque → sobre → processo → contato.
2. Responsividade e contraste, incluindo zoom de 200%.
3. Hero em camadas e entrada no primeiro projeto.
4. Troca entre universos dos projetos.
5. Transições finas, foco de teclado e movimento reduzido.
6. Otimização dos arquivos finais e carregamento progressivo.

## Contato e conteúdo pessoal

LinkedIn confirmado: https://www.linkedin.com/in/josean-araujo-3ba63b17b/

O botão principal de contato deve abrir esse perfil. Não adicionar email, WhatsApp ou URL de GitHub sem o endereço real. A fotografia original veio do perfil do GitHub compartilhado nesta conversa; isso não confirma uma URL de perfil.

A apresentação pessoal usa apenas a trajetória pública já consultada no LinkedIn e o contexto dos projetos. Os textos sugeridos estão no roteiro de seções. Evite prêmios, títulos profissionais, clientes pagos e métricas que não tenham sido confirmados.

## Arquivos e ferramentas

As novas imagens foram criadas com a ferramenta integrada de geração de imagens. Os prompts finais estão incluídos. Os mockups são propostas visuais; pequenas diferenças de texto ou de geometria entre a imagem e a implementação devem ser resolvidas pelo conteúdo e pelos tokens deste kit.

Os PNGs transparentes preservam o canal alpha. O fundo quadriculado de um visualizador não deve ser incorporado ao site. Confira o manifesto para saber quais arquivos têm transparência real.

## Critério de pronto

O portfólio está pronto para publicação quando o visitante reconhece Josean e seu trabalho, pode abrir os seis estudos, lê o conteúdo sem depender da animação, encontra o contato e navega por teclado. A narrativa deve continuar compreensível com movimento reduzido e no celular.
