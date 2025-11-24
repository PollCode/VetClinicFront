import { IJwtPayload } from "../types/jwt/JWT.interface";
import { jwtDecode } from "jwt-decode";

export const decodeAccessToken = (token: string): IJwtPayload => {
  try {
    return jwtDecode<IJwtPayload>(token);
  } catch (error) {
    console.error("Token inválido", error);
    return {} as IJwtPayload;
  }
};
