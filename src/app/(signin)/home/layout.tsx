import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { Metadata } from "next";
import { Logo } from "@/components/logo";
import { MainNav } from "@/components/layouts/main-nav";
import Container from "@/components/container/container";

export const metadata: Metadata = {
  title: "Home Library",
};

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-20 bg-secondary flex justify-between items-center p-6  shadow-xl">
        <Logo className="mix-blend-multiply dark:mix-blend-color-dodge" />
        <MainNav user={user} />
      </header>
      <Container>{children}</Container>
    </div>
  );
}
