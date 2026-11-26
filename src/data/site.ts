// Informations communes à plusieurs pages et contenu de l'accueil.

export interface ProfileLink {
  id: 'github' | 'linkedin';
  label: string;
  /** Forme courte affichée sur le CV. */
  handle: string;
  url: string;
}

export const name = 'Dan Sylvain';

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
  description: 'Dan Sylvain, software developer: systems, backend, tooling and data.',
  intro:
    'Software developer trained at 42. Remote freelance work: backend, command-line tools, data pipelines and technical integration. Open to developer positions (systems, backend, applications).',
  skills: [
    'Systems and low level: C, C++, Rust, Linux',
    'Applications and data: Python, SQL, C#, TypeScript',
  ],
};
