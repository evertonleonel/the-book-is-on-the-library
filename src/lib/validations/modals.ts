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
  sinopse: z.string().min(3, {
    message: "O campo genêro deve ter pelo menos 3 caracteres",
  }),
  date: z.string().min(3, {
    message: "O campo author deve ter pelo menos 3 caracteres",
  }),
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
