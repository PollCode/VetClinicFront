export interface IHistoriaClinica {
  id: number;
  animal: number;
  piel_mucosas: null | string;
  sist_respiratiorio: null | string;
  sist_digestivo: null | string;
  sist_circulatorio: null | string;
  sist_nervioso: null | string;
  sist_locomotor: null | string;
  sist_reproductor: null | string;
  diagn_clinico_pres: null | string;
  tratamiento: null | string;
  created_date: string;
}
