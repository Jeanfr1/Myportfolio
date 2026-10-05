// The six concept studies (roteiro-secoes.md §03–04, roteiro-animacao.md Ato 3, PDF p.5).
// Every one is a conceptual design study: no client, launch, result or rating is claimed.
// `prototype` is the published prototype of the study (a real URL, so "Abrir protótipo" is allowed);
// set it to null to hide the link. TODO(portfolio): confirm these prototypes should be public here.
export const projects = [
  {
    slug: 'sta',
    number: '01',
    name: 'Automotives STA',
    sector: 'Oficina automotiva · St Albans, Reino Unido',
    tagline: 'Engenharia e precisão',
    proposal: 'Do exterior à engenharia que sustenta o movimento.',
    opportunity:
      'Mostrar que o cuidado com um carro começa por baixo da superfície: quem visita vê a estrutura e o motor antes de falar com a oficina.',
    direction: [
      ['Composição', 'O carro ocupa a cena inteira; o texto fica em uma coluna estreita, sem disputar com a máquina.'],
      ['Tipografia', 'Neo-grotesca pesada em caixa alta para os títulos (Inter Tight) e uma mono (JetBrains Mono) para medidas e rótulos técnicos.'],
      ['Cor', 'Preto, prata e um vermelho usado só em sinais e na luz do freio.'],
      ['Gesto central', 'Uma linha de scan atravessa a carroceria e revela a mecânica.'],
    ],
    motion: ['Carro', 'Scan', 'Motor'],
    script:
      'A luz revela o carro; a linha de scan percorre a lataria e mostra a estrutura; o motor se separa em grupos e as peças encaixam nos cartões de serviço.',
    role: 'Direção visual, interface e narrativa de scan e motor.',
    accent: '#F12E32',
    prototype: 'https://automotives-sta-st-albans.vercel.app',
    concept: { width: 1024, height: 1536 },
  },
  {
    slug: 'isola',
    number: '02',
    name: 'Isola',
    sector: 'Sorveteria · Mosede Havn, Dinamarca',
    tagline: 'Sabores em órbita',
    proposal: 'Um universo de sabores em órbita.',
    opportunity: 'Fazer o visitante sentir o sabor antes de chegar ao balcão: cada sabor vira a cena principal da página.',
    direction: [
      ['Composição', 'Uma bola de sorvete no centro, ingredientes em volta e muito espaço claro.'],
      ['Tipografia', 'Uma grotesca nórdica com peso (Schibsted Grotesk), em frases curtas, no idioma da sorveteria (dinamarquês).'],
      ['Cor', 'O verde do pistache como base; cada um dos quatro sabores traz a própria cor para a cena.'],
      ['Gesto central', 'Os ingredientes orbitam a bola e a troca de sabor acontece na mesma cena.'],
    ],
    motion: ['Bola suspensa', 'Órbita', 'Troca de sabor'],
    script:
      'A bola aparece suspensa sobre a casquinha, com os ingredientes em órbita; quatro sabores trocam fundo, bola e ingredientes na mesma cena; no fim, a bola encaixa na casquinha e o conjunto segue para o seu cartão no catálogo.',
    role: 'Direção visual, interface e troca de sabores.',
    accent: '#BDCF84',
    prototype: 'https://isola-mosede-havn.vercel.app',
    concept: { width: 1086, height: 1448 },
  },
  {
    slug: 'legend',
    number: '03',
    name: 'Legend Nails',
    sector: 'Manicure e nail art · St Albans, Reino Unido',
    tagline: 'O gesto como assinatura',
    proposal: 'O gesto como assinatura.',
    opportunity: 'Traduzir um cuidado delicado em uma primeira impressão calma e editorial.',
    direction: [
      ['Composição', 'Retrato, mão e detalhe em escala editorial, com respiros generosos.'],
      ['Tipografia', 'Serif de display (Fraunces) com uma sans geométrica leve (Jost) para o texto.'],
      ['Cor', 'Marfim, oliva e um rosa suave.'],
      ['Gesto central', 'Do retrato com a mão no rosto ao detalhe de uma única unha.'],
    ],
    motion: ['Retrato', 'Unha em camadas', 'Mão finalizada'],
    script:
      'A câmera se aproxima da mão; a unha se separa em base, cor e brilho; a mão finalizada pousa na seção seguinte e o acabamento pode ser trocado (nude, francesinha, oliva).',
    role: 'Direção editorial, interface e narrativa de manicure.',
    accent: '#72775D',
    prototype: 'https://legend-nails-st-albans.vercel.app',
    concept: { width: 1024, height: 1536 },
  },
  {
    slug: 'orhan',
    number: '04',
    name: 'Orhan Barber',
    sector: 'Barbearia · St Albans, Reino Unido',
    tagline: 'Identidade e lâmina de luz',
    proposal: 'Precisão que define identidade.',
    opportunity: 'Dar à barbearia uma assinatura própria, em que a precisão do corte e a marca falam a mesma língua.',
    direction: [
      ['Composição', 'Retrato em perfil, linha do fade e a navalha como objeto principal.'],
      ['Tipografia', 'Uma só família (Archivo) em duas larguras: larga e espaçada para a marca e os rótulos, alta e condensada para os títulos.'],
      ['Cor', 'Grafite, prata e azul profundo.'],
      ['Gesto central', 'A linha do fade vira o fio da navalha, e a navalha termina no O do monograma.'],
    ],
    motion: ['Linha do fade', 'Navalha em partes', 'Monograma O'],
    script:
      'Uma linha prata acompanha o fade; um corte leva ao fio da navalha; lâmina, suporte e cabo se separam e voltam; a navalha entra no O e o retrato ocupa o primeiro cartão da galeria.',
    role: 'Direção visual, identidade e narrativa da navalha.',
    accent: '#DCE3E9',
    prototype: 'https://orhan-barber-st-albans.vercel.app',
    concept: { width: 1024, height: 1536 },
  },
  {
    slug: 'bayro',
    number: '05',
    name: 'Bayro Cut',
    sector: 'Barbearia · Greve, Dinamarca',
    tagline: 'Atitude e ritual',
    proposal: 'Atitude e ritual em cada corte.',
    opportunity: 'Levar a energia de uma barbearia de bairro para uma experiência com acabamento de marca.',
    direction: [
      ['Composição', 'A barbearia em cena, com o barbeiro e o cliente no centro da luz.'],
      ['Tipografia', 'Condensada em caixa alta para os títulos (Oswald) e Barlow para o texto, em dinamarquês.'],
      ['Cor', 'Carvão, couro e luz âmbar, com dourado nos destaques.'],
      ['Gesto central', 'A máquina sai da mão do barbeiro e se abre em torno da palavra Præcision.'],
    ],
    motion: ['Máquina na mão', 'Máquina aberta', 'Retrato'],
    script:
      'A máquina deixa a mão do barbeiro e vira um objeto em destaque; corpo, lâmina e pente se abrem; a máquina passa pelo fade e o retrato vira o primeiro cartão da galeria.',
    role: 'Direção visual e experiência de barbearia.',
    accent: '#B1BBC3',
    prototype: 'https://bayro-cut-greve.vercel.app',
    concept: { width: 1024, height: 1536 },
  },
  {
    slug: 'mm',
    number: '06',
    name: 'M&M Cleaning',
    sector: 'Serviços de limpeza',
    tagline: 'O espaço em camadas',
    proposal: 'Cuidado que revela o espaço.',
    opportunity: 'Mostrar o resultado de um serviço que normalmente não se vê: o espaço cuidado, camada por camada.',
    direction: [
      ['Composição', 'Uma sala em corte, como uma maquete, com espaço ao redor para o texto.'],
      ['Tipografia', 'Plus Jakarta Sans, com títulos curtos e diretos.'],
      ['Cor', 'Azul-marinho e branco, com um rastro ciano nos detalhes.'],
      ['Gesto central', 'A sala se separa em camadas e volta ao lugar.'],
    ],
    motion: ['Sala pronta', 'Camadas', 'De volta ao lugar'],
    script:
      'A sala aparece pronta; ao rolar, teto, paredes, móveis, tapete e piso se separam; um rastro ciano percorre os detalhes e tudo volta ao lugar antes da seção seguinte.',
    role: 'Direção visual e ambiente em camadas.',
    accent: '#3F82CE',
    prototype: 'https://mm-cleaning-one.vercel.app',
    concept: null, // no concept mockup in the kit: the study shows the room itself
  },
];

export const LINKEDIN = 'https://www.linkedin.com/in/josean-araujo-3ba63b17b/';
