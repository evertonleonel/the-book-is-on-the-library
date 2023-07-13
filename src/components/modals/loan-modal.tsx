"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { LoanModalForm } from "../forms/loan-modal-form";

export const LoanModal = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle className="text-base sm:text-lg md:text-xl text-left mt-2">
            Informe os dados do aluno
          </DialogTitle>
          <DialogDescription>
            <LoanModalForm onClick={() => setOpen(false)} />
          </DialogDescription>
          <DialogFooter></DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
