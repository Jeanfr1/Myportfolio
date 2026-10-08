// Français, at /fr/. Same structure as pt.js; the French spaces before : ; ! ? are added by
// frenchTypography(), so the strings below are written with ordinary spaces.
import { frenchTypography } from './typography.js';

export default frenchTypography({
  meta: {
    title: 'Josean Araújo · Design, développement et IA',
    description:
      "Portfolio de Josean Araújo : des expériences numériques qui relient identité, technologie et personnes. Six études conceptuelles de design, d'interface et de mouvement.",
    ogDescription: 'Vision. Code. Mouvement. Des expériences numériques qui relient identité, technologie et personnes.',
    ogImageAlt: 'Le monogramme JA à côté de Josean Araújo, devant un portrait monumental et des plans de verre',
    person: 'Design, développement et IA : des expériences numériques qui relient identité, technologie et personnes.',
    country: 'France',
  },
  skip: 'Aller au contenu',
  newTab: "(s'ouvre dans un nouvel onglet)",
  nav: {
    label: 'Principale',
    projects: 'Projets',
    about: 'À propos',
    contact: 'Contact',
    home: 'Josean Araújo, retour au début',
    homePage: "Josean Araújo, page d'accueil",
  },
  lang: { label: 'Langue', toggle: 'Choisir la langue' },
  hero: {
    eyebrow: 'Design · Développement · IA',
    tagline: 'Vision. Code. Mouvement.',
    intro: 'Je crée des expériences numériques qui relient identité, technologie et personnes.',
    explore: 'Explorer les projets',
    all: 'Voir toutes les études',
    revealEyebrow: 'Vision en mouvement',
    revealTitle: 'Chaque idée ouvre un nouvel univers.',
    cue: "Entrer dans l'univers",
  },
  work: {
    title: 'Travaux sélectionnés',
    rail: 'Index des études',
    kicker: 'Étude conceptuelle',
    explore: "Explorer l'étude",
    prototype: 'Ouvrir le prototype',
    role: 'Contribution',
    states: 'États du mouvement',
    duo: 'Deux barbiers. Deux identités.',
  },
  list: {
    title: 'Toutes les études',
    lead: "Six études conceptuelles de direction artistique, d'interface et de mouvement. Chacune garde sa propre identité.",
    tag: "Étude conceptuelle · Explorer l'étude",
  },
  about: {
    eyebrow: 'À propos · derrière la vision',
    title: "La technologie commence par l'humain.",
    paragraphs: [
      "Je suis Josean Araújo. Mon parcours relie implémentation logicielle, présentation de solutions et développement web. À Dublin, avec Microsoft, j'ai rapproché enjeux métier et technologie. À Paris, chez Hewlett Packard Enterprise, j'ai dirigé la présentation et la formation du programme HPE Flex Offers dans toute la France.",
      "Aujourd'hui, je mets cette expérience au service du design, du code et de l'intelligence artificielle : je crée des expériences numériques et je connecte des outils en flux de travail.",
      "J'aime penser l'expérience dans son ensemble : la première impression, ce qui se passe à chaque interaction et la manière dont la technologie devient utile pour la personne en face.",
    ],
    career: 'Expérience',
    roles: [
      {
        years: '2022 — 2023',
        place: 'Paris, France',
        org: 'Hewlett Packard Enterprise',
        title: 'Responsable Présentation et Formation · Programme HPE Flex Offers',
        points: [
          'Pilotage du programme national de présentation et de formation HPE Flex Offers en France.',
          'Animation de 10 à 15 ateliers et présentations stratégiques auprès de plus de 100 clients et partenaires grands comptes.',
          'Traduction de la modernisation des infrastructures en bénéfices business clairs pour chaque public, avec les équipes commerciales, marketing et techniques.',
          "Prix interne de l'entreprise reçu deux mois consécutifs, pour des résultats au-dessus des attentes.",
        ],
      },
      {
        years: '2020 — 2021',
        place: 'Dublin, Irlande',
        org: 'Microsoft',
        partner: 'Infosys',
        title: 'Consultant Solutions Techniques · Conseiller en technologies business',
        points: [
          'Présentation des solutions Microsoft avec une approche centrée sur le client et le métier.',
          'Qualification des besoins et traduction des enjeux métier en recommandations technologiques.',
          'Lien entre priorités business, équipes techniques et exécution, dans un environnement multiculturel.',
        ],
      },
    ],
    facts: [
      ['Basé en', 'France'],
      ['Parcours', 'Brésil · Irlande · France'],
      ['Langues', 'Português · English · Français'],
    ],
    linkedin: 'Mon parcours sur LinkedIn',
  },
  process: {
    eyebrow: 'Processus',
    title: "De l'intention à l'expérience.",
    steps: [
      ['Comprendre', 'Identité, public, service et expérience souhaitée.'],
      ['Donner forme', 'Direction artistique, structure du contenu, composition et narration du mouvement.'],
      ['Construire et affiner', 'Interface, comportement, adaptation à chaque écran et revue des détails.'],
    ],
  },
  contact: {
    eyebrow: 'Contact · le prochain chapitre',
    title: ['Créons', 'le prochain.'],
    lead: 'Un projet, une collaboration ou une bonne conversation.',
    cta: 'Échanger sur LinkedIn',
  },
  footer: {
    sign: 'Josean Araújo · Design, développement et IA',
    projects: 'Projets',
    note: 'Les six projets sont des études conceptuelles.',
    studyNote: (name) => `${name} est une étude conceptuelle : elle n'implique ni commande, ni lancement, ni résultats.`,
  },
  study: {
    kicker: 'Étude conceptuelle',
    description: (name, proposal, role) => `${name} : ${proposal} Étude conceptuelle de Josean Araújo — ${role}.`,
    back: 'Retour aux projets',
    opportunity: "L'opportunité",
    direction: 'La direction artistique',
    directionLabels: { composition: 'Composition', type: 'Typographie', color: 'Couleur', gesture: 'Geste central' },
    interface: "L'interface",
    conceptAlt: (name) => `Maquette conceptuelle de la page ${name}, de haut en bas`,
    zoom: 'Agrandir',
    zoomSr: " la maquette (ouvre l'image dans un nouvel onglet)",
    conceptCaption: 'Maquette conceptuelle : une image de présentation, pas un site fonctionnel.',
    conceptMissing:
      "Le kit de ce portfolio ne comprend pas de maquette de cette page ; le prototype publié montre l'interface complète.",
    interfaceNote:
      "La page a été pensée comme une seule scène qui se déploie au défilement, avec un contenu toujours lisible sans dépendre de l'animation.",
    prototype: 'Ouvrir le prototype publié',
    movement: 'Le mouvement',
    role: 'Le rôle de Josean',
    nav: 'Études',
    next: 'Étude suivante',
    all: 'Toutes les études',
  },
  studies: {
    sta: {
      sector: 'Garage automobile · St Albans, Royaume-Uni',
      tagline: 'Ingénierie et précision',
      proposal: "De l'extérieur à l'ingénierie qui porte le mouvement.",
      opportunity:
        "Montrer que l'entretien d'une voiture commence sous la surface : le visiteur découvre la structure et le moteur avant même de parler au garage.",
      direction: {
        composition: 'La voiture occupe toute la scène ; le texte tient dans une colonne étroite, sans rivaliser avec la machine.',
        type: 'Une néo-grotesque grasse en capitales pour les titres (Inter Tight) et une mono (JetBrains Mono) pour les mesures et les libellés techniques.',
        color: 'Noir, argent et un rouge réservé aux signaux et au feu stop.',
        gesture: 'Une ligne de scan traverse la carrosserie et révèle la mécanique.',
      },
      motion: ['Voiture', 'Scan', 'Moteur'],
      script:
        "La lumière révèle la voiture ; la ligne de scan parcourt la carrosserie et montre la structure ; le moteur se sépare en groupes et les pièces s'emboîtent dans les cartes de service.",
      role: 'Direction artistique, interface et narration du scan et du moteur.',
    },
    isola: {
      sector: 'Glacier · Mosede Havn, Danemark',
      tagline: 'Saveurs en orbite',
      proposal: 'Un univers de saveurs en orbite.',
      opportunity:
        "Faire goûter la saveur avant même d'arriver au comptoir : chaque parfum devient la scène principale de la page.",
      direction: {
        composition: "Une boule de glace au centre, les ingrédients autour et beaucoup d'espace clair.",
        type: 'Une grotesque nordique affirmée (Schibsted Grotesk), en phrases courtes, dans la langue du glacier (le danois).',
        color: 'Le vert pistache comme base ; chacun des quatre parfums apporte sa propre couleur à la scène.',
        gesture: 'Les ingrédients gravitent autour de la boule et le changement de parfum a lieu dans la même scène.',
      },
      motion: ['Boule suspendue', 'Orbite', 'Changement de parfum'],
      script:
        "La boule apparaît suspendue au-dessus du cornet, avec les ingrédients en orbite ; quatre parfums changent le fond, la boule et les ingrédients dans la même scène ; à la fin, la boule se pose sur le cornet et l'ensemble rejoint sa carte dans le catalogue.",
      role: 'Direction artistique, interface et changement de parfum.',
    },
    legend: {
      sector: 'Manucure et nail art · St Albans, Royaume-Uni',
      tagline: 'Le geste comme signature',
      proposal: 'Le geste comme signature.',
      opportunity: 'Traduire un soin délicat en une première impression calme et éditoriale.',
      direction: {
        composition: "Portrait, main et détail à l'échelle éditoriale, avec de généreux espaces de respiration.",
        type: 'Une serif de titrage (Fraunces) avec une sans géométrique légère (Jost) pour le texte.',
        color: 'Ivoire, olive et un rose doux.',
        gesture: "Du portrait, la main posée sur le visage, au détail d'un seul ongle.",
      },
      motion: ['Portrait', 'Ongle en couches', 'Main finie'],
      script:
        "La caméra s'approche de la main ; l'ongle se sépare en base, couleur et brillance ; la main finie se pose dans la section suivante et la finition peut changer (nude, french, olive).",
      role: 'Direction éditoriale, interface et narration de la manucure.',
    },
    orhan: {
      sector: 'Salon de barbier · St Albans, Royaume-Uni',
      tagline: 'Identité et lame de lumière',
      proposal: 'La précision qui définit une identité.',
      opportunity: 'Donner au salon une signature propre, où la précision de la coupe et la marque parlent la même langue.',
      direction: {
        composition: 'Portrait de profil, ligne du dégradé et rasoir comme objet principal.',
        type: 'Une seule famille (Archivo) en deux largeurs : large et espacée pour la marque et les libellés, haute et condensée pour les titres.',
        color: 'Graphite, argent et bleu profond.',
        gesture: 'La ligne du dégradé devient le fil du rasoir, et le rasoir finit dans le O du monogramme.',
      },
      motion: ['Ligne du dégradé', 'Rasoir en pièces', 'Monogramme O'],
      script:
        'Une ligne argentée suit le dégradé ; une coupe mène au fil du rasoir ; lame, support et manche se séparent puis se rassemblent ; le rasoir entre dans le O et le portrait occupe la première carte de la galerie.',
      role: 'Direction artistique, identité et narration du rasoir.',
    },
    bayro: {
      sector: 'Salon de barbier · Greve, Danemark',
      tagline: 'Attitude et rituel',
      proposal: 'Attitude et rituel à chaque coupe.',
      opportunity: "Porter l'énergie d'un barbier de quartier dans une expérience à la finition de marque.",
      direction: {
        composition: 'Le salon en scène, avec le barbier et le client au centre de la lumière.',
        type: 'Une condensée en capitales pour les titres (Oswald) et Barlow pour le texte, en danois.',
        color: "Charbon, cuir et lumière ambrée, avec de l'or dans les accents.",
        gesture: "La tondeuse quitte la main du barbier et s'ouvre autour du mot Præcision.",
      },
      motion: ['Tondeuse en main', 'Tondeuse ouverte', 'Portrait'],
      script:
        "La tondeuse quitte la main du barbier et devient un objet mis en avant ; corps, lame et sabot s'ouvrent ; la tondeuse passe sur le dégradé et le portrait devient la première carte de la galerie.",
      role: 'Direction artistique et expérience du barbier.',
    },
    mm: {
      sector: 'Services de nettoyage',
      tagline: "L'espace en couches",
      proposal: "Un soin qui révèle l'espace.",
      opportunity: "Montrer le résultat d'un service qu'on ne voit pas d'habitude : l'espace soigné, couche après couche.",
      direction: {
        composition: "Une pièce en coupe, comme une maquette, avec de l'espace autour pour le texte.",
        type: 'Plus Jakarta Sans, avec des titres courts et directs.',
        color: 'Bleu marine et blanc, avec une traînée cyan dans les détails.',
        gesture: 'La pièce se sépare en couches puis reprend sa place.',
      },
      motion: ['Pièce prête', 'Couches', 'De retour en place'],
      script:
        'La pièce apparaît prête ; au défilement, plafond, murs, meubles, tapis et sol se séparent ; une traînée cyan parcourt les détails et tout reprend sa place avant la section suivante.',
      role: 'Direction artistique et espace en couches.',
    },
  },
});
