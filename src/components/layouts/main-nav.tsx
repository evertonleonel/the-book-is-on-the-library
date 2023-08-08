"use client";

import React from "react";
import type { User } from "@clerk/nextjs/dist/types/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Icons } from "../icons";
import { mainNav } from "@/config/site";
import { IconComponentMain as TIconComponentMain } from "@/types";
import { ModeToggle } from "../ui/toggle-button";
import Link from "next/link";

interface MainNavProps {
  user: User | null;
}

export function MainNav({ user }: MainNavProps) {
  const initials = `${user?.firstName?.charAt(0) ?? ""} ${
    user?.lastName?.charAt(0) ?? ""
  }`;

  const IconComponent = (icon: TIconComponentMain) => {
    const iconComponent = {
      home: <Icons.home className="h-4" />,
      bookPlus: <Icons.bookPlus className="h-4" />,
      library: <Icons.library className="h-4" />,
      fileStack: <Icons.fileStack className="h-4" />,
      close: <Icons.logout className="h-4" />,
    };
    return iconComponent[icon];
  };

  return (
    <section className="flex justify-center items-center gap-2 ">
      <Avatar>
        <AvatarImage src={user?.imageUrl} alt={user?.username ?? ""} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <p className="text-muted-foreground text-sm md:text-base lg:text-lg font-semibold">
        Olá
      </p>
      <p className="text-indigo-700 text-sm md:text-base lg:text-lg font-semibold">
        {user?.username ?? ""}
      </p>

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">Menu</MenubarTrigger>
          <MenubarContent>
            <ul>
              {mainNav.map(({ href, title, icon }) => {
                return (
                  <li key={title} className="list-none ">
                    {title === "Sair" && <MenubarSeparator />}
                    <Link href={href}>
                      <MenubarItem className="cursor-pointer">
                        {title}
                        <MenubarShortcut>{IconComponent(icon)}</MenubarShortcut>
                      </MenubarItem>
                    </Link>
                    {title === "Home" && <MenubarSeparator />}
                  </li>
                );
              })}
            </ul>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <ModeToggle />
    </section>
  );
}
