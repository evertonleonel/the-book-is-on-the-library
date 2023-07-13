import * as z from "zod";

export const authSchema = z.object({
  email: z.string().email({
    message: "Por favor entre com um e-mail válido",
  }),
  password: z.string().min(2, {
    message: "A senha deve ter pelo menos 8 caracteres",
  }),
});
