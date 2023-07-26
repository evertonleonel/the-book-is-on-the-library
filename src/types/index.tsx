export type IconComponent = "bookPlus" | "library" | "fileStack";
export type IconComponentMain = IconComponent | "close" | "home";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type HomeNavProps = {
  title: string;
  path: string;
  icon: IconComponent;
};

export type MainNav = Pick<HomeNavProps, "title">;

export type MainNavProps = MainNav & {
  href: string;
  icon: IconComponentMain;
};

//book
export interface RentHistoryBook {
  studentName: string;
  class: string;
  withdrawalDate: string;
  deliveryDate: string;
  id: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: boolean;
  image: string | null;
  systemEntryDate: string;
  synopsis: string;
  description?: string;
  rentHistory: RentHistoryBook[];
}

export type CreateBook = Omit<Book, "id" | "status" | "rentHistory">;

type GetTypesBook = Book;

export type GetBook = Prettify<
  GetTypesBook & {
    createdAt: string;
    description: string;
    loaned: boolean;
  }
>;
