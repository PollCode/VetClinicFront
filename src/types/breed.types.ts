import { ISpeciesBase } from "./species.types";

export interface IBreed {
  id: number;
  name: string;
  species: ISpeciesBase;
  size_category: string;
  created_date: string;
  updated_date: string;
  created_by: number | null;
  updated_by: number | null;
}

export interface IBreedBase {
  id: number;
  name: string;
}
