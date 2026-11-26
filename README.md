# dansylvain.com

Site personnel : CV, portfolio, blog technique et démos WebAssembly.
Site statique construit avec Astro et TypeScript.

## Commandes

| Commande          | Effet                                        |
| ----------------- | -------------------------------------------- |
| `npm install`     | Installe les dépendances                     |
| `npm run dev`     | Serveur de développement (localhost:4321)    |
| `npm run check`   | Vérification des types                       |
| `npm run build`   | Vérification puis génération dans `dist/`    |
| `npm run preview` | Sert localement le contenu de `dist/`        |

## Contenu

| Contenu        | Emplacement                |
| -------------- | -------------------------- |
| CV             | `src/data/cv.ts`           |
| Accueil, liens | `src/data/site.ts`         |
| Fiches projet  | `src/content/projets/*.md` |

## Styles

| Fichier                 | Contenu                                      |
| ----------------------- | -------------------------------------------- |
| `src/styles/tokens.css` | Couleurs, typographie, espacements, rayons   |
| `src/styles/base.css`   | Éléments HTML                                |
| `src/styles/print.css`  | Impression                                   |
| `*.astro` (`<style>`)   | Styles propres au composant, dans une couche |

Toute règle va dans un `@layer` : un style hors couche l'emporterait sur toutes les couches.
