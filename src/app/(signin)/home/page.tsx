"use client";
import { HomeCard } from "@/components/cards/home-card";
import Container from "@/components/container/container";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <Container>
      <section className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 group w-full ">
        <HomeCard
          className="group-hover:blur-[2px]  hover:!blur-none group-hover:scale-[0.85] hover:!scale-100   ease-in-out transition duration-500"
          onClick={() => router.push("create-new-book")}
          title="Cadastrar novo livro"
        >
          <Icons.bookPlus className="h-10 w-10 stroke-slate-500" />
        </HomeCard>
        <HomeCard
          className="group-hover:blur-[2px]  hover:!blur-none group-hover:scale-[0.85] hover:!scale-100   ease-in-out transition duration-500"
          onClick={() => router.push("library")}
          title="Biblioteca"
        >
          <Icons.album className="h-10 w-10 stroke-slate-500" />
        </HomeCard>
        <HomeCard
          className="group-hover:blur-[2px]  hover:!blur-none group-hover:scale-[0.85] hover:!scale-100   ease-in-out transition duration-500"
          onClick={() => router.push("loan-history")}
          title=" Histórico de empréstimos"
        >
          <Icons.fileClock className="h-10 w-10 stroke-slate-500" />
        </HomeCard>
      </section>
    </Container>
  );
}
