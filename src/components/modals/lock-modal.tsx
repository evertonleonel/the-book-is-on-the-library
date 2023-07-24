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

export const LockModal = ({
  children,
  statusBook,
  idBook,
}: {
  children: React.ReactNode;
  statusBook?: boolean;
  idBook: string;
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle className="text-base sm:text-lg md:text-xl text-left mt-2">
            {statusBook ? " Inativar Livro" : "Ativar livro"}
          </DialogTitle>
          <LockBookModalForm
            idBook={idBook}
            statusBook={statusBook}
            onClick={() => setOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
