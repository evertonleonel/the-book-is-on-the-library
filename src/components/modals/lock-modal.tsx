"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { LockBookModalForm } from "../forms/lock-modal-form";
import { getBooksFunction } from "./book-modal";

type LockModalProps = {
  children: React.ReactNode;
  statusBook?: boolean;
  idBook: string;
  disabled: boolean;
  getBooks: (params: getBooksFunction) => Promise<void>;
};

export const LockModal = ({
  children,
  statusBook,
  idBook,
  disabled,
  getBooks,
}: LockModalProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger disabled={disabled}>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle className="text-base sm:text-lg md:text-xl text-left mt-2">
            {statusBook ? " Inativar Livro" : "Ativar livro"}
          </DialogTitle>
          <LockBookModalForm
            getBooks={getBooks}
            idBook={idBook}
            statusBook={statusBook}
            onClick={() => setOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
