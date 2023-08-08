import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import Link from "next/link";

interface HomeCardProps {
  title?: string;
  className?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  path: string;
}

export function HomeCard({
  title,
  description,
  children,
  footer,
  className,
  path,
}: HomeCardProps) {
  return (
    <Link href={path}>
      <div className="h-48 w-48 sm:h-60 sm:w-60 md:h-72 md:w-72 p-0 z-10 card hover:bg-accent hover:text-accent-foreground">
        <Card
          className={cn(
            "card w-full h-full grid p-1 break-words border-sky-100/80 shadow-[-22px_24px_8px_-8px_rgba(102,136,162,0.312)] dark:border-gray-800 dark:shadow-2xl cursor-pointer ",
            className
          )}
        >
          <CardHeader>
            <CardContent>{children}</CardContent>
          </CardHeader>
          <CardTitle className="text-sm sm:text-base text-center lg:text-xl w-full ">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
          <CardFooter>{footer}</CardFooter>
        </Card>
      </div>
    </Link>
  );
}
