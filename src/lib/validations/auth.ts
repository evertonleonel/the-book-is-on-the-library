import * as z from "zod";

export const authSchema = z.object({
  email: z.string().email({
    message: "Por favor entre com um e-mail válido",
  }),
  password: z
    .string()
    .min(8, {
      message: "A senha deve ter pelo menos 8 caracteres",
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "A senha deve conter pelo menos 8 caracteres, uma maiúscula, uma minúscula, um número e um caractere especial",
    }),
});

export const verfifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "O código de verificação deve ter 6 caracteres",
    })
    .max(6),
});
