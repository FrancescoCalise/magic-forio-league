export interface Giocatore {
  id: string;
  nome: string;
  immagine: string;
}

export interface GiocatoriData {
  giocatori: Giocatore[];
}

export interface Squadra {
  id: string;
  nome: string;
  giocatoreId: string;
  logo?: string;
}

export interface SquadreData {
  squadre: Squadra[];
}

export interface Competizione {
  nome: string;
  vincitore: string;
}

export interface StagioneData {
  stagione: string;
  competizioni: Competizione[];
}

export interface Titolo {
  stagione: string;
  competizione: string;
  squadra: Squadra;
  giocatore: Giocatore;
}

export interface ClassificaGiocatoreEntry {
  giocatore: Giocatore;
  titoli: number;
  squadre: Squadra[];
}

export interface ClassificaSquadraEntry {
  squadra: Squadra;
  giocatore: Giocatore;
  titoli: number;
}

export interface EdizioneGiornale {
  settimana: number;
  data: string;
  titolo: string;
  immagine: string;
}

export interface StagioneCorrenteData {
  stagione: string;
  squadre: string[];
  giornale: EdizioneGiornale[];
}
