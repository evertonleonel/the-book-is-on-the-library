"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Highlight from "@/components/effects/hightlight";

export function ImageLogin() {
  return (
    <AspectRatio ratio={16 / 9}>
      <Image
        src="/images/girl-book.webp"
        alt="Ilustração de uma jovem lendo livros"
        fill
        className="absolute inset-0 object-cover -hue-rotate-30 dark:-hue-rotate-180"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="hidden dark:block">
        <Highlight />
      </div>
    </AspectRatio>
  );
}
