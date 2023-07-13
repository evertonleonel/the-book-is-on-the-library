import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type CardProps = {
  className?: string;
};

const BookCard = ({ className, ...props }: CardProps) => {
  return (
    <li className="w-48  flex flex-col justify-center items-center space-y-2 bg-card shadow-lg rounded-lg p-4 cursor-pointer hover:bg-muted-foreground/20  text-accent-foreground font-semibold text-center hover:text-indigo-900 dark:hover:text-indigo-300 ease-in-out duration-700">
      <p>Os segredos da mente milionária</p>
      <figure className={cn("w-20 sm:w-24 md:w-36  h-fit", className)}>
        <Image
          className={"w-full h-fit"}
          src="/images/books/livro01.png"
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
