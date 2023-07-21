import { HomeNavProps, MainNavProps } from "@/types";

export const homeNav = [
  {
    title: "Cadastrar novo livro",
    path: "create-new-book",
    icon: "bookPlus",
  },
  {
    title: "Biblioteca",
    path: "library",
    icon: "library",
  },
  {
    title: "Histórico de empréstimos",
    path: "loan-history",
    icon: "fileStack",
  },
] satisfies HomeNavProps[];

export const mainNav = [
  {
    title: "Home",
    href: "/home",
    icon: "home",
  },
  {
    title: "Novo livro",
    href: "/create-new-book",
    icon: "bookPlus",
  },
  {
    title: "Library",
    href: "/library",
    icon: "library",
  },
  {
    title: "Empréstimos",
    href: "/loan-history",
    icon: "fileStack",
  },
  {
    title: "Sair",
    href: "/signout",
    icon: "close",
  },
] satisfies MainNavProps[];

export const defaultGenres = [
  "AutoAjuda",
  "Ação e Aventura",
  "Fantasia",
  "Horror",
  "Finanças",
  "Romance",
];
