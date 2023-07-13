"use client";
import { HomeCard } from "@/components/cards/home-card";
import Container from "@/components/container/container";
import { Icons } from "@/components/icons";
import { homeNav } from "@/config/site";
import { IconComponent } from "@/types";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const IconComponent = (icon: IconComponent) => {
    const iconComponent = {
      bookPlus: <Icons.bookPlus className="h-10 w-10 stroke-slate-500" />,
      library: <Icons.library className="h-10 w-10 stroke-slate-500" />,
      fileStack: <Icons.fileStack className="h-10 w-10 stroke-slate-500" />,
    };
    return iconComponent[icon] ?? "";
  };

  return (
    <Container>
      <nav className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 group ">
        {homeNav.map(({ path, icon, title }) => {
          return (
            <li key={icon} className="list-none">
              <HomeCard
                className="group-hover:blur-[2px]  hover:!blur-none group-hover:scale-[0.85] hover:!scale-100   ease-in-out transition duration-500"
                onClick={() => router.push(path)}
                title={title}
              >
                {icon && IconComponent(icon)}
              </HomeCard>
            </li>
          );
        })}
      </nav>
    </Container>
  );
}
