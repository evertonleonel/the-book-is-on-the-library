import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Icons } from "../icons";

interface HomeCardProps {
  title?: string;
  className?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClick: () => void;
}

export function HomeCard({
  title,
  description,
  children,
  footer,
  className,
  onClick,
}: HomeCardProps) {
  return (
    <Button
      onClick={onClick}
      variant={"ghost"}
      className="h-48 w-48 sm:h-60 sm:w-60 md:h-72 md:w-72 p-0 z-10 card"
    >
      <Card
        className={cn(
          "card w-full h-full grid p-1 break-words border-sky-100/80 shadow-[-22px_24px_8px_-8px_rgba(102,136,162,0.312)] dark:border-gray-800 dark:shadow-2xl cursor-pointer ",
          className
        )}
      >
        <CardHeader>
          <CardContent>{children}</CardContent>
        </CardHeader>
        <CardTitle className="text-sm sm:text-base lg:text-xl w-full ">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardFooter>{footer}</CardFooter>
      </Card>
    </Button>
  );
}
