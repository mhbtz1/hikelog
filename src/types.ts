
export enum Difficulty {
  Easy = 'Easy',
  Moderate = 'Moderate',
  Hard = 'Hard',
}

export interface Hike {
  id: string;
  name: string;
  location: string;
  date: string; // YYYY-MM-DD
  notes: string;
  photos: string[]; // Array of image URLs or base64 strings
  difficulty: Difficulty;
  distance: number; // in miles
}

