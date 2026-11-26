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

## WebAssembly (Emscripten)

Version utilisée pour compiler les démos : **Emscripten 7.0.1**.
Elle n'est nécessaire que pour recompiler un module, pas pour le site.

Installation, une seule fois, hors du dépôt (requiert `git` et `python3`) :

```sh
git clone https://github.com/emscripten-core/emsdk.git ~/emsdk
cd ~/emsdk
./emsdk install 7.0.1
./emsdk activate 7.0.1
```

Activation, dans chaque nouveau terminal, puis contrôle de la version :

```sh
source ~/emsdk/emsdk_env.sh
emcc --version
```

Compilation d'une démo (après activation), ici `life` :

```sh
make -C wasm/life
```

Les sources sont dans `wasm/<nom>/` ; les fichiers générés, versionnés, dans
`public/demos/<nom>/`.

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
