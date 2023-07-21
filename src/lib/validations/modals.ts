import * as z from "zod";

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
  synopsis: z.string().min(3, {
    message: "O campo genêro deve ter pelo menos 3 caracteres",
  }),
  systemEntryDate: z.string().min(3, {
    message: "O campo author deve ter pelo menos 3 caracteres",
  }),
  // image: z.string().nonempty({ message: "Selecione uma imagem." }),
  image: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false;
      if (val.some((file) => !(file instanceof File))) return false;
      return true;
    }, "Deve ser um array de arquivos")
    .optional()
    .nullable()
    .default(null),
});

export const lockBookModalSchema = z.object({
  description: z.string().min(5, {
    message: "Deve ter pelo menos 5 caracteres",
  }),
});

export const loanModalSchema = z.object({
  studentName: z.string().min(5, {
    message: "O nome deve ter pelo menos 5 caracteres",
  }),
  class: z.string().min(3, {
    message: "O campo deve ter pelo menos 3 caracteres",
  }),
  withdrawalDate: z.string().min(5, {
    message: "O nome deve ter pelo menos 5 caracteres",
  }),
  deliveryDate: z.string().min(5, {
    message: "O nome deve ter pelo menos 5 caracteres",
  }),
});
