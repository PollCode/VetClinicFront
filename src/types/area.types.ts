export interface IArea {
  id: number;
  name: string;
  description: string | null;
  created_date: string;
  updated_date: string;
  created_by: number | null;
  updated_by: number | null;
}

export interface IAreaBase {
  id: number;
  name: string;
}
