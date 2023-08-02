"use client";

import React, { useEffect, useState } from "react";
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

import { LockModal } from "./lock-modal";
import { LoanModal } from "./loan-modal";
import { HistoryModal } from "./history-modal";
import StudentTableData from "../tables/table-studant-data";
import { getLastRentHistory, loanedBook } from "@/lib/services";
import { GetBook, RentHistoryBook } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { catchError } from "@/lib/utils";
import { DeleteModal } from "./delete-modal";

export type getBooksFunction = {
  search?: string | undefined;
  take?: number | undefined;
  skip?: number | undefined;
  date?: string | undefined;
  genre?: string | undefined;
};

interface BookModalProps {
  book: GetBook;
  children: React.ReactNode;
  getBooks: (params: getBooksFunction) => Promise<void>;
}

export const BookModal = ({ book, children, getBooks }: BookModalProps) => {
  const [open, setOpen] = useState(false);
  const [lastRentHistory, setLastRentHistory] = useState<RentHistoryBook>();
  const history = book ? book?.rentHistory : [];

  const router = useRouter();

  const Loaned = (id: string) => {
    loanedBook(id).then(() => {
      toast.success("Livro devolvido com sucesso!");
      getBooks({
        take: 10,
        skip: 0,
      });
    });
  };

  const catchLastRentHistory = (id: string) => {
    getLastRentHistory(id).then((data) => {
      setLastRentHistory(data);
    });
  };

  const tableAndStatus = (lastRentHistory && book.loaned) || book.description;

  const container =
    !history && !book.description ? "max-w-[896px]" : "max-w-[1400px]";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => catchLastRentHistory(book.id)}>
        {children}
      </DialogTrigger>
      <DialogContent
        className={`${container} ${
          !history && "max-w-[896px]"
        }  max-h-screen w-full  overflow-auto`}
      >
        <div
          className={`h-full w-full  flex flex-col ${
            history && "lg:flex-row"
          } md:gap-4  m-4 divide-y-2 md:divide-none divide-dashed`}
        >
          <section className="w-full flex flex-col sm:flex-row gap-4 m-auto mt-4 divide-y-2 md:divide-none divide-dashed">
            <div className="flex flex-col justify-between gap-4 mx-auto w-4/5">
              <AspectRatio ratio={4 / 5}>
                <Image
                  src={String(book.image)}
                  alt="Ilustração de uma jovem lendo livros"
                  fill
                  className="absolute inset-0 object-cover"
                  priority
                  sizes="(max-width: 320px) 100vw, (max-width: 160px) 50vw, 33vw"
                />
              </AspectRatio>

              {!book.loaned ? (
                <LoanModal
                  bookId={book.id}
                  disabled={!book.status || book.loaned}
                  getBooks={getBooks}
                >
                  <Button
                    disabled={!book.status || book.loaned}
                    className="font-bold w-full"
                  >
                    Emprestar
                  </Button>
                </LoanModal>
              ) : (
                <Button
                  disabled={!book.status}
                  variant={"secondary"}
                  className="font-bold"
                  onClick={() => Loaned(book.id)}
                >
                  Devolver
                </Button>
              )}
            </div>
            <article className="w-full flex flex-col  justify-between ">
              <h1 className="font-bold text-center  text-lg md:text-xl lg:text-2xl">
                {book.title}
              </h1>
              <div className="flex flex-col flex-1 justify-between mb-6">
                <Accordion
                  className="text-accent-foreground font-semibold"
                  type="single"
                  collapsible
                >
                  <AccordionItem value="Sinopse">
                    <AccordionTrigger>Sinopse</AccordionTrigger>
                    <AccordionContent className="font-normal text-sm max-h-40 max-w-xs md:max-w-md  lg:max-w-lg w-full break-words text-ellipsis overflow-hidden">
                      {book.synopsis}
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
                      {book.author}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                  <AccordionItem value="Gênero">
                    <AccordionTrigger>Gênero</AccordionTrigger>
                    <AccordionContent className="font-normal text-sm">
                      {book.genre}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                  <AccordionItem value="Data">
                    <AccordionTrigger>Data</AccordionTrigger>
                    <AccordionContent className="font-normal text-sm">
                      {new Date(book.systemEntryDate).toLocaleDateString(
                        "pt-BR"
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <nav className="flex  max-[315px]:flex-col justify-around lg:justify-around gap-1">
                <Button
                  disabled={!book.status || book.loaned}
                  onClick={() => router.push(`/edit-book/${book.id}`)}
                  className="font-bold"
                  variant={"default"}
                >
                  Editar
                </Button>

                {book.status && (
                  <LockModal
                    getBooks={getBooks}
                    idBook={book.id}
                    disabled={book.loaned}
                    statusBook={book.status}
                  >
                    <Button
                      disabled={book.loaned}
                      className="font-bold w-full"
                      variant={"destructive"}
                    >
                      Inativar
                    </Button>
                  </LockModal>
                )}

                {!book.status && (
                  <LockModal
                    getBooks={getBooks}
                    idBook={book.id}
                    disabled={book.loaned}
                    statusBook={book.status}
                  >
                    <Button
                      disabled={book.loaned}
                      variant={"default"}
                      className="font-bold w-full bg-indigo-700 hover:bg-indigo-900"
                    >
                      Ativar
                    </Button>
                  </LockModal>
                )}

                <HistoryModal history={history}>
                  <Button className="font-bold w-full" variant={"secondary"}>
                    Histórico
                  </Button>
                </HistoryModal>

                <DeleteModal idBook={book.id} getBooks={getBooks}>
                  <Button className="font-bold w-full" variant={"destructive"}>
                    Deletar
                  </Button>
                </DeleteModal>
              </nav>
            </article>
          </section>

          {tableAndStatus && (
            <section className="grid mt-[21px] w-full">
              {book.loaned && lastRentHistory && (
                <StudentTableData lastRentHistory={lastRentHistory} />
              )}

              {book.description && (
                <div>
                  <h2 className="text-lg  lg:text-xl font-bold">
                    Motivo da inativação
                  </h2>
                  <p className="text-xs md:text-sm h-40 overflow-auto">
                    {book.description}
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
