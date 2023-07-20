import { currentUser } from "@clerk/nextjs";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ImageLogin } from "@/components/layouts/login-image";
import { SignInForm } from "@/components/forms/signin-form";
import { ModeToggle } from "@/components/ui/toggle-button";
import { OAuthSignIn } from "@/components/auth/oauth-signin";

export default async function SigninPage() {
  const user = await currentUser();
  if (user) redirect("/home");
  return (
    <main className="flex-1">
      <div className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-2 ">
        <div className="absolute top-4 right-6 z-10 flex gap-4 justify-center items-center">
          <ModeToggle />
        </div>
        <ImageLogin />

        <div className=" w-full grid items-center justify-center  mx-auto ">
          <div className="container  space-y-10 bg-secondary  p-10 rounded-md shadow-2xl">
            <div className="flex gap-2 justify-center items-center ">
              <Logo />
              <div className="grid text-base font-semibold">
                <p className="text-primary leading-none">Dev</p>
                <p className="text-indigo-600 dark:text-indigo-300 font-extrabold leading-none">
                  Library
                </p>
              </div>
            </div>
            <SignInForm />
            <span className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 ">
                <p className="text-sm text-center">entrar com</p>
                <OAuthSignIn />
              </div>

              <div className="flex  items-center gap-2 ">
                <p className="text-sm ">Não tem conta?</p>
                <Link
                  aria-label="Sign up"
                  href="/signup"
                  className="text-indigo-800 text-base font-semibold mt underline-offset-4 transition-colors  hover:underline"
                >
                  Registre-se
                </Link>
              </div>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
