import { cn } from "@/lib/utils";
import Image from "next/image";

type LogoProps = {
  className?: string;
};

const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <Image
      className={cn(className)}
      src="/images/icon-book.png"
      width={48}
      height={48}
      alt="Logo library"
      {...props}
    />
  );
};

export { Logo };
