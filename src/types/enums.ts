export enum GENRE {
  AUTOAJUDA,
  ACAO_AVENTURA,
  FANTASIA,
  HORROR,
  FINANCAS,
  ROMANCE,
}

export const Genres = {
  AUTOAJUDA: "Auto-ajuda",
  ACAO_AVENTURA: "Ação e aventura",
  FANTASIA: "Fantasia",
  HORROR: "Horror",
  FINANCAS: "Finanças",
  ROMANCE: "Romance",
} as const;

type Gender = (typeof Genres)[keyof typeof Genres];
