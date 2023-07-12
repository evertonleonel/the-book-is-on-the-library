import { MainNav } from "@/components/layouts/main-nav";
import { Logo } from "@/components/logo";

export default function BookShelfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="h-20 bg-secondary flex justify-between items-center p-6  shadow-xl">
        <Logo className="mix-blend-multiply dark:mix-blend-color-dodge" />
        <MainNav user={""} />
      </header>
      {children}
    </main>
  );
}
