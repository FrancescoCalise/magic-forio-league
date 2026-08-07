import giocatoriJson from "../data/giocatori.json";
import squadreJson from "../data/squadre.json";
import type {
  ClassificaGiocatoreEntry,
  ClassificaSquadraEntry,
  Giocatore,
  GiocatoriData,
  Squadra,
  SquadreData,
  StagioneData,
  Titolo,
} from "./types";

const stagioniModules = import.meta.glob<{ default: StagioneData }>(
  "../data/stagioni/*.json",
  { eager: true },
);

export const giocatori: Giocatore[] = (giocatoriJson as GiocatoriData).giocatori;
export const squadre: Squadra[] = (squadreJson as SquadreData).squadre;

function inizioStagione(stagione: string): number {
  return Number.parseInt(stagione.split("/")[0], 10);
}

export const stagioni: StagioneData[] = Object.values(stagioniModules)
  .map((mod) => mod.default)
  .sort((a, b) => inizioStagione(b.stagione) - inizioStagione(a.stagione));

const giocatoriById = new Map<string, Giocatore>(giocatori.map((g) => [g.id, g]));
const squadreById = new Map<string, Squadra>(squadre.map((s) => [s.id, s]));

export function getGiocatore(id: string): Giocatore {
  const giocatore = giocatoriById.get(id);
  if (!giocatore) {
    throw new Error(`Giocatore con id "${id}" non trovato in giocatori.json`);
  }
  return giocatore;
}

export function getSquadra(id: string): Squadra {
  const squadra = squadreById.get(id);
  if (!squadra) {
    throw new Error(`Squadra con id "${id}" non trovata in squadre.json`);
  }
  return squadra;
}

export function getTitoli(): Titolo[] {
  return stagioni.flatMap((stagioneData) =>
    stagioneData.competizioni.map((competizione) => {
      const squadra = getSquadra(competizione.vincitore);
      return {
        stagione: stagioneData.stagione,
        competizione: competizione.nome,
        squadra,
        giocatore: getGiocatore(squadra.giocatoreId),
      };
    }),
  );
}

export function getCompetizioniNomi(): string[] {
  const nomi: string[] = [];
  for (const stagioneData of [...stagioni].reverse()) {
    for (const competizione of stagioneData.competizioni) {
      if (!nomi.includes(competizione.nome)) {
        nomi.push(competizione.nome);
      }
    }
  }
  return nomi;
}

export function getStoricoPerCompetizione(): Map<string, Titolo[]> {
  const storico = new Map<string, Titolo[]>();
  const titoliCronologici = [...getTitoli()].sort(
    (a, b) => inizioStagione(a.stagione) - inizioStagione(b.stagione),
  );

  for (const titolo of titoliCronologici) {
    const lista = storico.get(titolo.competizione) ?? [];
    lista.push(titolo);
    storico.set(titolo.competizione, lista);
  }

  return storico;
}

function classificaGiocatoriDa(titoli: Titolo[]): ClassificaGiocatoreEntry[] {
  const mappa = new Map<string, ClassificaGiocatoreEntry>();

  for (const titolo of titoli) {
    const esistente = mappa.get(titolo.giocatore.id);
    if (esistente) {
      esistente.titoli += 1;
      if (!esistente.squadre.some((s) => s.id === titolo.squadra.id)) {
        esistente.squadre.push(titolo.squadra);
      }
    } else {
      mappa.set(titolo.giocatore.id, {
        giocatore: titolo.giocatore,
        titoli: 1,
        squadre: [titolo.squadra],
      });
    }
  }

  return Array.from(mappa.values()).sort((a, b) => b.titoli - a.titoli);
}

function classificaSquadreDa(titoli: Titolo[]): ClassificaSquadraEntry[] {
  const mappa = new Map<string, ClassificaSquadraEntry>();

  for (const titolo of titoli) {
    const esistente = mappa.get(titolo.squadra.id);
    if (esistente) {
      esistente.titoli += 1;
    } else {
      mappa.set(titolo.squadra.id, {
        squadra: titolo.squadra,
        giocatore: titolo.giocatore,
        titoli: 1,
      });
    }
  }

  return Array.from(mappa.values()).sort((a, b) => b.titoli - a.titoli);
}

export function getClassificaGiocatori(): ClassificaGiocatoreEntry[] {
  return classificaGiocatoriDa(getTitoli());
}

export function getClassificaSquadre(): ClassificaSquadraEntry[] {
  return classificaSquadreDa(getTitoli());
}

export function getClassificaGiocatoriPerCompetizione(): Map<string, ClassificaGiocatoreEntry[]> {
  const mappa = new Map<string, ClassificaGiocatoreEntry[]>();
  for (const nome of getCompetizioniNomi()) {
    const titoliCompetizione = getTitoli().filter((t) => t.competizione === nome);
    mappa.set(nome, classificaGiocatoriDa(titoliCompetizione));
  }
  return mappa;
}

export function getClassificaSquadrePerCompetizione(): Map<string, ClassificaSquadraEntry[]> {
  const mappa = new Map<string, ClassificaSquadraEntry[]>();
  for (const nome of getCompetizioniNomi()) {
    const titoliCompetizione = getTitoli().filter((t) => t.competizione === nome);
    mappa.set(nome, classificaSquadreDa(titoliCompetizione));
  }
  return mappa;
}

export function getTotaleCompetizioni(): number {
  return stagioni.reduce((tot, s) => tot + s.competizioni.length, 0);
}
