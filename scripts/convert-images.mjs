import { readdir, mkdir, stat } from "node:fs/promises";
import { extname, join, basename } from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "imgSoruce";
const DEST_DIR = "imgDest";
const QUALITY = 82;
const EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

async function main() {
  await mkdir(DEST_DIR, { recursive: true });

  let files;
  try {
    files = await readdir(SOURCE_DIR);
  } catch {
    console.error(`Cartella "${SOURCE_DIR}/" non trovata. Creala e mettici dentro le immagini da convertire.`);
    process.exitCode = 1;
    return;
  }

  const immagini = files.filter((file) => EXTENSIONS.has(extname(file).toLowerCase()));

  if (immagini.length === 0) {
    console.log(`Nessuna immagine (.png, .jpg, .jpeg) trovata in "${SOURCE_DIR}/".`);
    return;
  }

  let totalePrima = 0;
  let totaleDopo = 0;

  for (const file of immagini) {
    const sourcePath = join(SOURCE_DIR, file);
    const destPath = join(DEST_DIR, `${basename(file, extname(file))}.webp`);

    const { size: dimensionePrima } = await stat(sourcePath);
    await sharp(sourcePath).webp({ quality: QUALITY }).toFile(destPath);
    const { size: dimensioneDopo } = await stat(destPath);

    totalePrima += dimensionePrima;
    totaleDopo += dimensioneDopo;

    console.log(
      `${file} -> ${basename(destPath)} (${(dimensionePrima / 1024).toFixed(0)}KB -> ${(dimensioneDopo / 1024).toFixed(0)}KB)`,
    );
  }

  console.log(
    `\n${immagini.length} immagini convertite in "${DEST_DIR}/". Totale: ${(totalePrima / 1024 / 1024).toFixed(2)}MB -> ${(totaleDopo / 1024 / 1024).toFixed(2)}MB.`,
  );
  console.log(`Ora sposta i file da "${DEST_DIR}/" dove servono (es. public/quotidiani/<stagione>/).`);
}

main();
