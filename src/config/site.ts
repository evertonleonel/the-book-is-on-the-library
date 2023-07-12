import { homeNavProps } from "@/types";

export const homeNav = [
  {
    title: "Cadastrar novo livro",
    path: "create-new-book",
    icon: "bookPlus",
  },
  {
    title: "Biblioteca",
    path: "library",
    icon: "album",
  },
  {
    title: "Histórico de empréstimos",
    path: "loan-history",
    icon: "fileClock",
  },
] satisfies homeNavProps[];
