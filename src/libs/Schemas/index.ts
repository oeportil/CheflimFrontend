import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Email obligatorio"),
  nombreCompleto: z.string().min(1, "Tu nombre completo debe ser obligatorio"),
  nombreUsuario: z.string().min(1, "Tu nombre de usuario no debe estar vacio"),
  password: z.string().min(5, "La password debe ser mayor a 5 caracteres"),
});
