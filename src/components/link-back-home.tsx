import React from "react";
import { Icons } from "./icons";
import Link from "next/link";

const LinkBackHome = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="flex flex-col flex-wrap gap-2 self-start m-4">
      <h1 className="text-lg sm:text-2xl break-words font-bold text-indigo-900 dark:text-indigo-400">
        {children}
      </h1>
      <Link
        href={"/home"}
        className="flex gap-2 w-fit rounded hover:bg-foreground/5  dark:hover:bg-background/40 ease-in-out duration-500 p-1 "
      >
        <Icons.arrowLeftSquare />
        <h2 className="text-lg font-semibold text-foreground break-words">
          Home
        </h2>
      </Link>
    </header>
  );
};

export default LinkBackHome;
