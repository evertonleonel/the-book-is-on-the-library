import { cn } from "@/lib/utils";
import Image from "next/image";

type LogoProps = {
  className?: string;
};

const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <Image
      className={cn("w-12 h-fit hidden min-[270px]:block", className)}
      src="/images/icon-book.png"
      height="0"
      width="0"
      sizes="100vw"
      alt="Logo library"
      {...props}
    />
  );
};

export { Logo };
