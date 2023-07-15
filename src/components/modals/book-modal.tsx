"use client";

import React from "react";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { AspectRatio } from "../ui/aspect-ratio";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import StudentTableData from "../tables/table-studant-data";

export const BookModal = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-[1400px] max-h-screen w-full overflow-auto">
        <div className=" h-full w-full  flex flex-col lg:flex-row md:gap-4 overflow-auto m-4 divide-y-2 md:divide-none divide-dashed">
          <section className="w-full flex flex-col sm:flex-row gap-4 m-auto mt-4 divide-y-2 md:divide-none divide-dashed">
            <div className="flex flex-col justify-between gap-4 mx-auto w-4/5">
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
                <Accordion
                  className="text-accent-foreground font-semibold"
                  type="single"
                  collapsible
                >
                  <AccordionItem value="Sinopse">
                    <AccordionTrigger>Sinopse</AccordionTrigger>
                    <AccordionContent className="font-normal text-sm max-h-40 text-ellipsis overflow-hidden">
                      Napoleon Hill revela que quebrou o código mental do diabo
                      e o forçou a confessar os seus segredos. O manuscrito que
                      resultou deste feito...
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion
                  className="text-accent-foreground font-semibold"
                  type="single"
                  collapsible
                >
                  <AccordionItem value="Autor">
                    <AccordionTrigger>Autor</AccordionTrigger>
                    <AccordionContent className="font-normal text-sm">
                      Napoleon Hill
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                  <AccordionItem value="Gênero">
                    <AccordionTrigger>Gênero</AccordionTrigger>
                    <AccordionContent className="font-normal text-sm">
                      Autoajuda
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                  <AccordionItem value="Data">
                    <AccordionTrigger>Data</AccordionTrigger>
                    <AccordionContent className="font-normal text-sm">
                      01/02/2022
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
          <section className="grid mt-[21px] w-full">
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
