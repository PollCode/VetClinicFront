export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  rol: string;
  is_superuser: boolean;
  area: {
    id: number;
    nombre: string;
  };
  is_active: boolean;
  created_date: string;
  updated_date: string;
  created_by: number | null;
  updated_by: number | null;
}
