"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";
import StudentTableData from "../tables/table-studant-data";

export const BookModal = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-[1400px] max-h-screen w-full overflow-auto">
        <div className=" h-full w-full  flex flex-col lg:flex-row overflow-auto m-4 divide-y-2 md:divide-none divide-dashed">
          <section className="w-full flex flex-col sm:flex-row gap-4 m-auto mt-4 divide-y-2 md:divide-none divide-dashed">
            <div className="grid gap-4 mx-auto w-4/5">
              <AspectRatio ratio={4 / 5}>
                <Image
                  src="/images/girl-book.webp"
                  alt="Ilustração de uma jovem lendo livros"
                  fill
                  className="absolute inset-0 object-cover -hue-rotate-30 dark:-hue-rotate-180"
                  priority
                  sizes="(max-width: 320px) 100vw, (max-width: 160px) 50vw, 33vw"
                />
              </AspectRatio>
              <Button className="font-bold">Emprestar</Button>
            </div>
            <article className="w-full flex flex-col  justify-between ">
              <h1 className="font-bold text-center  text-lg md:text-xl lg:text-2xl mt-2">
                Título
              </h1>
              <div className="flex flex-col flex-1 justify-between mb-6">
                <div className="text-accent-foreground font-semibold">
                  <h3 className="text-secondary-foreground">Sinopse</h3>
                  <p className="font-normal text-sm max-h-40 text-ellipsis overflow-hidden">
                    Napoleon Hill revela que quebrou o código mental do diabo e
                    o forçou a confessar os seus segredos. O manuscrito que
                    resultou deste feito...
                  </p>
                </div>
                <div className="text-accent-foreground font-semibold">
                  <h3>Autor</h3>
                  <p className="font-normal text-sm">Napoleon Hill</p>
                </div>
                <div className="text-accent-foreground font-semibold">
                  <h3>Gênero</h3>
                  <p className="font-normal text-sm">Autoajuda</p>
                </div>
                <div className="text-accent-foreground font-semibold">
                  <h3>Gênero</h3>
                  <p className="font-normal text-sm">01/02/2022</p>
                </div>
              </div>
              <nav className="flex  max-[315px]:flex-col justify-around lg:justify-around gap-1">
                <Button className="font-bold" variant={"default"}>
                  Editar
                </Button>
                <Button className="font-bold" variant={"destructive"}>
                  Ativar
                </Button>
                <Button className="font-bold" variant={"secondary"}>
                  Histórico
                </Button>
              </nav>
            </article>
          </section>
          <section className="grid mt-4 w-full">
            <StudentTableData />
            <div>
              <h2 className="text-lg  lg:text-xl font-bold">
                Motivo da inativação
              </h2>
              <p className="text-xs md:text-sm h-40 overflow-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};
