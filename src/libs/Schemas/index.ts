import { z } from "zod";

export const registerSchema = z.object({
  correo: z.string().email("Email obligatorio"),
  nombre: z.string().min(1, "Tu nombre completo debe ser obligatorio"),
  usuario: z.string().min(1, "Tu nombre de usuario no debe estar vacio"),
  contrasena: z.string().min(5, "La password debe ser mayor a 5 caracteres"),
});

export const LoginSchema = z.object({
  correo: z.string().email("Email obligatorio"),
  contrasena: z.string().min(5, "Error con contraseña"),
});

export const CommentSchema = z.object({
  comentario: z.string().min(1, "El comentario no puede ir vacio"),
  id_usuario: z.number(),
});
