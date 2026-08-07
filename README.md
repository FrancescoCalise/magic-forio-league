# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🖼️ Conversione immagini (PNG/JPG → WebP)

Lo script `scripts/convert-images.mjs` converte in WebP tutte le immagini che
metti in `imgSoruce/`, salvando il risultato in `imgDest/`, senza toccare gli
originali. Usalo ogni volta che devi caricare foto o immagini pesanti (es. il
giornale settimanale) prima di spostarle nella loro cartella finale sotto
`public/`.

**Come si usa:**

1. Copia le immagini (`.png`, `.jpg`, `.jpeg`) dentro la cartella `imgSoruce/`
   nella root del progetto (creala se non esiste).
2. Lancia lo script:
   ```sh
   npm run convert-images
   ```
3. Trovi i file convertiti in `.webp` dentro `imgDest/`, con lo stesso nome
   dell'originale (es. `foto.png` → `foto.webp`). Lo script stampa a schermo
   quanto si è ridotto ogni file.
4. Sposta manualmente i file da `imgDest/` nella cartella `public/` dove
   servono (es. `public/quotidiani/<stagione>/` per il giornale settimanale,
   `public/squadre/` per gli stemmi).

`imgSoruce/` e `imgDest/` sono cartelle di lavoro temporanee (escluse da git):
puoi svuotarle quando vuoi, tanto i file definitivi vivono sotto `public/`.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
