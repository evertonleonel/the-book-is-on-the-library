import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type CardProps = {
  className?: string;
  title?: string;
  image: string;
};

const BookCard = ({ className, title, image, ...props }: CardProps) => {
  return (
    <li className="w-48  flex flex-col justify-center items-center space-y-2 bg-card shadow-lg rounded-lg p-4 cursor-pointer hover:bg-muted-foreground/20  text-accent-foreground font-semibold text-center hover:text-indigo-900 dark:hover:text-indigo-300 ease-in-out duration-700">
      <figure className={cn("w-20 sm:w-24 md:w-36  h-fit", className)}>
        <p>{title}</p>
        <Image
          className={"w-full h-48"}
          src={image}
          height="0"
          width="0"
          sizes="100vw"
          alt="Logo library"
          {...props}
        />
      </figure>
    </li>
  );
};

export default BookCard;
