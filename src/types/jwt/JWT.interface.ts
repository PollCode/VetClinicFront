export interface IJwtPayload {
  id: number;
  sub: string;
  username: string;
  full_name: string;
  rol: string;
  is_superuser: boolean;
  exp: number;
  //[key: string]: string | number | boolean | null;
}
