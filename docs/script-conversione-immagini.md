# Script di conversione immagini (PNG/JPG → WebP)

Ogni volta che devi caricare foto o immagini pesanti sul sito (es. il
giornale settimanale, uno stemma, una foto community), usa questo script per
convertirle in WebP prima di metterle in `public/`. WebP riduce il peso del
file dell'80-95% a parità di qualità visiva, quindi le pagine si caricano più
in fretta.

Lo script è in [`scripts/convert-images.mjs`](../scripts/convert-images.mjs)
e usa [Sharp](https://sharp.pixelplumbing.com/) (la stessa libreria che usa
Astro internamente per ottimizzare le immagini in build).

## Comandi

```sh
npm run convert-images
```

Non servono parametri: lo script legge sempre da `imgSoruce/` e scrive
sempre in `imgDest/`, entrambe cartelle nella root del progetto.

## Come si usa, passo per passo

1. **Copia le immagini originali** (`.png`, `.jpg`, `.jpeg`) dentro la
   cartella `imgSoruce/` nella root del progetto. Se non esiste, creala:
   ```sh
   mkdir imgSoruce
   ```
2. **Lancia la conversione**:
   ```sh
   npm run convert-images
   ```
3. Lo script stampa a schermo, per ogni file, il nome convertito e il peso
   prima/dopo, ad esempio:
   ```
   0.png -> 0.webp (2694KB -> 272KB)

   1 immagini convertite in "imgDest/". Totale: 2.63MB -> 0.27MB.
   Ora sposta i file da "imgDest/" dove servono (es. public/quotidiani/<stagione>/).
   ```
4. **Trovi i file convertiti** in `imgDest/`, con lo stesso nome
   dell'originale ma estensione `.webp` (es. `foto.png` → `foto.webp`). Gli
   originali in `imgSoruce/` non vengono toccati né cancellati.
5. **Sposta manualmente** i file da `imgDest/` nella cartella `public/` dove
   servono. Esempi già usati nel sito:
   - Giornale settimanale: `public/quotidiani/<stagione>/<numero-giornata>.webp`
     (es. `public/quotidiani/2026-2027/0.webp`)
   - Stemmi squadra: `public/squadre/<id-squadra>.webp` (o `.png`/`.jpg`, il
     campo `logo` in `squadre.json` deve puntare al file giusto)

## Dettagli tecnici

- **Qualità WebP**: 82 (buon compromesso qualità/peso, modificabile nella
  costante `QUALITY` in cima allo script).
- **Formati letti in input**: `.png`, `.jpg`, `.jpeg` (case-insensitive).
  Altri file nella cartella `imgSoruce/` vengono ignorati.
- **`imgSoruce/` e `imgDest/`** sono escluse da git (vedi `.gitignore`): sono
  cartelle di lavoro temporanee, non fanno parte del sito. I file definitivi
  vivono solo sotto `public/`, una volta spostati a mano.
- Se `imgSoruce/` non esiste, lo script si ferma con un messaggio d'errore
  invece di fallire silenziosamente.

## Perché non è automatico anche lo spostamento in `public/`

Lo spostamento finale è manuale di proposito: la destinazione dentro
`public/` dipende da cosa rappresenta l'immagine (giornale, stemma, foto
community, ...) e spesso richiede anche di aggiornare un file dati JSON
(es. aggiungere l'edizione in `src/data/stagione-corrente.json`). Automatizzare
quel passaggio rischierebbe di sovrascrivere file esistenti senza controllo.
