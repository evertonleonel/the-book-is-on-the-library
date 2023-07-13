import Container from "@/components/container/container";
import { MainNav } from "@/components/layouts/main-nav";
import { Logo } from "@/components/logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Library",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-20 bg-secondary flex justify-between items-center p-6  shadow-xl">
        <Logo className="mix-blend-multiply dark:mix-blend-color-dodge" />
        <MainNav user={""} />
      </header>
      <Container>{children}</Container>
    </div>
  );
}
