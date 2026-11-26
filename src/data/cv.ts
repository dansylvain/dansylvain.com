// Contenu du CV. La présentation est dans src/pages/cv/index.astro.
// Dépôt public : ni téléphone, ni adresse postale, ni e-mail personnel.

export interface Entry {
  title: string;
  place?: string;
  period: string;
  details?: string;
}

export interface Section {
  title: string;
  entries: Entry[];
}

export interface Skill {
  label: string;
  value: string;
}

export const headline = 'Linguist and software developer · FR / EN / DE / ES';
export const location = 'Rennes (relocating to Cádiz, Spain, mid-January 2027)';

export const profile =
  'I work across languages and cultures, and I build digital tools. Native French speaker, C1 in German, Spanish and English; over four years in both Germany and Spain, in customer service, team coordination and teaching. Software developer trained at 42 and AWS Certified AI Practitioner. I am looking for a role where language meets technology: multilingual technical support, LQA and localization. Remote work, flexible daytime hours.';

export const skills: Skill[] = [
  {
    label: 'Languages',
    value: 'French (native) · German C1 (TestDaF) · Spanish C1 · English C1 · Italian B1',
  },
  {
    label: 'Technical',
    value:
      'C, C++, C#, Python, JavaScript, Bash · Git, Docker, Nginx, SQLite, Streamlit, Rust (basics)',
  },
];

export const experience: Section[] = [
  {
    title: 'Technology and projects',
    entries: [
      {
        title: 'Work-study placement',
        place: 'Impleemence (Perpignan, France)',
        period: 'Dec 2025 – Mar 2026',
        details:
          'Streamlit/SQLite prototype to extract, clean and centralize customer data from Excel files.',
      },
      {
        title: 'Intern',
        place: 'David Dessens Studio (Elne, France)',
        period: 'May – Oct 2025',
        details:
          'Windows installation scripts for deploying digital artworks on screens; interactive modules in C# (sensors, computer vision).',
      },
      {
        title: '42 Perpignan (France)',
        period: '2023 – 2025',
        details:
          'Project-based software engineering (C/C++, Docker, Python, networking). Certificate "Architect in Digital Technologies", October 2026.',
      },
    ],
  },
  {
    title: 'Languages, translation and teaching',
    entries: [
      {
        title: 'Independent French teacher',
        place: 'Cádiz',
        period: '2018 – 2021',
        details:
          'Online and in-person lessons; client acquisition and administration. Multilingual city tours (Lokafy). CertTESOL (Trinity College London).',
      },
      {
        title: 'European Voluntary Service',
        place: 'Foundation for the Rights of Future Generations (Oberursel, Germany)',
        period: '2008 – 2009',
        details:
          'Coordinated the collective book "Générations équitables" (2010); DE/EN/FR translation, website, newsletter.',
      },
    ],
  },
  {
    title: 'Customer service and team supervision (hospitality)',
    entries: [
      {
        title: 'Breakfast manager',
        place: "Hôtel Les Mouettes, Ajaccio (2022) and Hôtel Les Grandes Rousses, Alpe d'Huez",
        period: '2021 – 2022',
        details: 'Supervised the service team.',
      },
      {
        title: 'Restaurant waiter',
        place: 'M/V Silver Muse, Silversea Cruises',
        period: '2017',
        details: 'Luxury service for international guests and crew, in English.',
      },
      {
        title: 'Station waiter and banquet service',
        place: 'Leonardo Royal Hotel and Maritim proArte Hotel, Berlin',
        period: '2012 – 2015',
        details: 'Breakfast, room service, bar, in German; reference letter available.',
      },
    ],
  },
];

export const education: Entry[] = [
  {
    title: 'Architect in Digital Technologies',
    place: '42 Perpignan',
    period: '2023 – 2025',
    details: 'Certificate obtained in October 2026.',
  },
  { title: 'AWS Certified AI Practitioner', period: 'Dec 2025' },
  {
    title: 'MA Communication and Media Studies',
    place: 'TU Berlin',
    period: '2014 – 2015',
    details: 'Not completed; 72 credits earned.',
  },
  {
    title: 'Master 1 "Plurilinguisme européen et interculturalité" (German / Spanish)',
    place: 'University of Strasbourg',
    period: '2010 – 2011',
    details: 'With Merit (mention Bien).',
  },
  {
    title: 'Licence LEA (English / Spanish)',
    place: 'Université Grenoble Alpes',
    period: '2005 – 2008',
    details: 'Erasmus year at the University of Cádiz (2006 – 2007).',
  },
];

export const interests =
  'Hiking (Camino de Santiago, 2021), badminton, language learning (a vocabulary method built from authentic texts, in development).';
