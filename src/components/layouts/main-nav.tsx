"use client";

import React from "react";
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
import Link from "next/link";
import { ModeToggle } from "../ui/toggle-button";
import { Icons } from "../icons";
import { IconComponentMain } from "@/types";
import { mainNav } from "@/config/site";

interface MainNavProps {
  user: string | "";
}

export function MainNav({ user }: MainNavProps) {
  const IconComponent = (icon: IconComponentMain) => {
    const iconComponent = {
      home: <Icons.home className="h-4" />,
      bookPlus: <Icons.bookPlus className="h-4" />,
      library: <Icons.library className="h-4" />,
      fileStack: <Icons.fileStack className="h-4" />,
      close: <Icons.close className="h-4" />,
    };
    return iconComponent[icon] ?? null;
  };

  return (
    <section className="flex justify-center items-center gap-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt={user ?? ""} />
        <AvatarFallback>{user ?? ""}</AvatarFallback>
      </Avatar>
      <p className="text-muted-foreground text-sm md:text-base lg:text-lg font-semibold">
        Olá
      </p>
      <p className="text-indigo-700 text-sm md:text-base lg:text-lg font-semibold">
        {user ? user : ""}
      </p>

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Menu</MenubarTrigger>
          <MenubarContent>
            <ul>
              {mainNav.map(({ href, title, icon }) => {
                if (title === "Home") {
                  return (
                    <li key={title} className="list-none">
                      <Link href={href}>
                        <MenubarItem>
                          {title}
                          <MenubarShortcut>
                            {IconComponent(icon)}
                          </MenubarShortcut>
                        </MenubarItem>
                      </Link>
                      <MenubarSeparator />
                    </li>
                  );
                } else if (title === "Sair") {
                  return (
                    <li key={title} className="list-none">
                      <MenubarSeparator />
                      <Link href={href}>
                        <MenubarItem>
                          {title}
                          <MenubarShortcut>
                            {IconComponent(icon)}
                          </MenubarShortcut>
                        </MenubarItem>
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li key={title} className="list-none">
                      <Link href={href}>
                        <MenubarItem>
                          {title}
                          <MenubarShortcut>
                            {IconComponent(icon)}
                          </MenubarShortcut>
                        </MenubarItem>
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <ModeToggle />
    </section>
  );
}
