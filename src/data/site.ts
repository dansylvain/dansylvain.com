// Informations communes à plusieurs pages et contenu de l'accueil.

export interface ProfileLink {
  id: 'github' | 'linkedin';
  label: string;
  /** Forme courte affichée sur le CV. */
  handle: string;
  url: string;
}

export const name = 'Dan Sylvain';

export const email = 'dansylvain.dev@gmail.com';

export const profileLinks: ProfileLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: 'github.com/dansylvain',
    url: 'https://github.com/dansylvain',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'linkedin.com/in/dan-sylvain',
    url: 'https://www.linkedin.com/in/dan-sylvain',
  },
];

export const home = {
  description:
    'Dan Sylvain, software developer: systems, automation, data pipelines and multilingual tooling.',
  intro:
    'Software developer trained at 42, with a systems background in C and C++, plus some Rust. I apply low-level rigor and an automation mindset to multilingual work: QA and LQA automation, data pipelines and i18n/l10n tooling in French, English, German and Spanish. Available for remote freelance work and open to developer positions.',
  skills: [
    'Systems and low level: C, C++, Linux, Rust (basics)',
    'Applications and data: Python, SQL, C#, TypeScript',
    'Languages: French (native), English, German and Spanish (C1)',
  ],
};
