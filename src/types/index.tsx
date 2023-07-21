export type IconComponent = "bookPlus" | "library" | "fileStack";
export type IconComponentMain = IconComponent | "close" | "home";

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
export type StatusBook = {
  isActive: boolean;
  description: string;
};

export interface RentHistoryBook {
  studentName: string;
  class: string;
  withdrawalDate: string;
  deliveryDate: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: StatusBook;
  image: string | unknown;
  systemEntryDate: string;
  synopsis: string;
  rentHistory: RentHistoryBook[];
}

export type CreateBook = Omit<Book, "id" | "status" | "rentHistory">;
