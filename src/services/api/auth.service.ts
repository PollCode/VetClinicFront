import { api } from "../api/index.ts";
import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(4, "El nombre de usuario debe tener almenos 4 caracteres"),
  password: z
    .string()
    .min(8, "La contraseña debe contener al menos 8 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const authService = {
  async login(data: LoginFormData) {
    const result = await api.post("login/", data);
    return result.data;
  },
};
