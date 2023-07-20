import "../styles/globals.css";

import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Library",
  description:
    "Uma biblioteca de código aberto construída com a nova versão do Next.js 13.",
  keywords: ["Next.js", "React", "Tailwind CSS"],
  authors: [
    {
      name: "evertonleonel",
      url: "https://github.com/evertonleonel",
    },
  ],
  creator: "evertonleonel",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <head />
        <body
          className={cn(inter.className, "min-h-screen font-sans antialiased")}
        >
          <Toaster />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
