import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import Container from "@/components/container/container";
import { MainNav } from "@/components/layouts/main-nav";
import { Logo } from "@/components/logo";

export default async function BookShelfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    redirect("/signin");
  }
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-20 bg-secondary flex justify-between items-center p-6  shadow-xl  overflow-hidden">
        <Logo className="hidden sm:block mix-blend-multiply dark:mix-blend-color-dodge" />
        <MainNav user={user} />
      </header>
      <Container>{children}</Container>
    </div>
  );
}
