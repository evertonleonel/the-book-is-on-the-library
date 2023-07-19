"use client";

import Image from "next/image";
import Highlight from "@/components/effects/hightlight";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/ui/toggle-button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { SignInForm } from "@/components/forms/signin-form";
import Link from "next/link";

export default function SigninPage() {
  return (
    <main className="flex-1">
      <div className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-2 ">
        <div className="absolute top-4 right-6 z-10 flex gap-4 justify-center items-center">
          <Link
            aria-label="Sign up"
            href="/signup"
            className="text-primary text-base font-semibold mt underline-offset-4 transition-colors  hover:underline"
          >
            Registre-se
          </Link>
          <ModeToggle />
        </div>
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

        <div className=" w-full grid items-center justify-center  mx-auto ">
          <div className="container  space-y-10 bg-secondary  p-10 rounded-md shadow-2xl">
            <div className="flex gap-2 justify-center items-center">
              <Logo />
              <div className="grid text-base font-semibold">
                <p className="text-primary leading-none">Dev</p>
                <p className="text-indigo-600 dark:text-indigo-300 font-extrabold leading-none">
                  Library
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <SignInForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
