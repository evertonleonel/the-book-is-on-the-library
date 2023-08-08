import { IconComponent } from "@/types";
import { homeNav } from "@/config/site";
import { Icons } from "@/components/icons";
import { HomeCard } from "@/components/cards/home-card";

export default function HomePage() {
  const getIconComponent = (icon: IconComponent) => {
    const iconComponent = {
      bookPlus: <Icons.bookPlus className="h-10 w-10 stroke-slate-500" />,
      library: <Icons.library className="h-10 w-10 stroke-slate-500" />,
      fileStack: <Icons.fileStack className="h-10 w-10 stroke-slate-500" />,
    };
    return iconComponent[icon];
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <nav className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 group">
        {homeNav.map(({ path, icon, title }) => {
          return (
            <li key={icon} className="list-none">
              <HomeCard
                className="group-hover:blur-[2px]  hover:!blur-none group-hover:scale-[0.85] hover:!scale-100   ease-in-out transition duration-300"
                path={path}
                title={title}
              >
                {icon && getIconComponent(icon)}
              </HomeCard>
            </li>
          );
        })}
      </nav>
    </div>
  );
}
