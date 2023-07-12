import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/ui/toggle-button";
import { VideoCubic } from "@/components/video/video";
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
    <main className="min-h-screen flex flex-col">
      <header className="h-20 bg-secondary flex justify-between items-center p-6  shadow-xl">
        <Logo className="mix-blend-multiply dark:mix-blend-color-dodge" />
        <ModeToggle />
      </header>
      {children}
    </main>
  );
}
