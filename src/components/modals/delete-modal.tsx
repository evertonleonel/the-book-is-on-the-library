"use client";

import React, { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { deleteBook } from "@/lib/services";
import { toast } from "sonner";
import { getBooksFunction } from "./book-modal";

export const DeleteModal = ({
  children,
  idBook,
  getBooks,
}: {
  children: React.ReactNode;
  idBook: string;
  getBooks: (params: getBooksFunction) => Promise<void>;
}) => {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = useTransition();

  const exclude = () => {
    startTransition(async () => {
      await deleteBook(idBook)
        .then(() => {
          toast.success("Livro excluido com sucesso!");
          setOpen(false);
          getBooks({ take: 10, skip: 0 });
        })
        .catch((error) => {
          toast.error(`Ops..,${error}`);
          console.log(error);
        });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle className="text-base sm:text-lg md:text-xl text-left mt-2">
            Tem certeza que deseja deletar este livro?
          </DialogTitle>
          <div className="self-end space-x-2">
            <Button variant={"destructive"} onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={exclude} variant={"secondary"}>
              Confirmar
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
