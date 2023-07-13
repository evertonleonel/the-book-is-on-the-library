import * as z from "zod";

export const authSchema = z.object({
  email: z.string().email({
    message: "Por favor entre com um e-mail válido",
  }),
  password: z.string().min(2, {
    message: "A senha deve ter pelo menos 8 caracteres",
  }),
});

export const createNewBookSchema = z.object({
  title: z.string().min(3, {
    message: "O título deve ter pelo menos 3 caracteres",
  }),
  author: z.string().min(3, {
    message: "O campo author deve ter pelo menos 3 caracteres",
  }),
  genre: z.string().min(3, {
    message: "O campo genêro deve ter pelo menos 3 caracteres",
  }),
  sinopse: z.string().min(3, {
    message: "O campo genêro deve ter pelo menos 3 caracteres",
  }),
  date: z.string().min(3, {
    message: "O campo author deve ter pelo menos 3 caracteres",
  }),
});
