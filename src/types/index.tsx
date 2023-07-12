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
