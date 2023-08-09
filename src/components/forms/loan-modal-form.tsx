"use client";

import React, { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { loanModalSchema } from "@/lib/validations";
import { Input } from "../ui/input";
import { createRentHistory } from "@/lib/services";
import { Icons } from "../icons";
import { catchError } from "@/lib/utils";
import { toast } from "sonner";
import { getBooksFunction } from "../modals/book-modal";

type Inputs = z.infer<typeof loanModalSchema>;

type LoanModalProps = {
  onClick: () => void;
  bookId: string;
  getBooks: (params: getBooksFunction) => Promise<void>;
  updateBook: () => void;
};

export const LoanModalForm = ({
  onClick: CloseModal,
  bookId,
  updateBook,
}: LoanModalProps) => {
  const [isPending, startTransition] = useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(loanModalSchema),
    defaultValues: {
      studentName: "",
      className: "",
      withdrawalDate: "",
      deliveryDate: "",
    },
  });

  function onSubmit(data: Inputs) {
    startTransition(() => {
      try {
        const id = bookId;
        const parseData = { ...data, id: id };

        parseData.withdrawalDate = new Date(
          data.withdrawalDate.replaceAll("-", "/")
        ).toISOString();

        parseData.deliveryDate = new Date(
          data.deliveryDate.replaceAll("-", "/")
        ).toISOString();

        createRentHistory(parseData)
          .then(() => {
            toast.success("Livro emprestado com sucesso!");
            updateBook();
            CloseModal();
          })
          .catch((erro) => catchError(erro));
      } catch (err) {
        catchError(err);
      }
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid  gap-8"
      >
        <div className="grid grid-auto-fit-sm gap-6">
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Aluno</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="className"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Classe</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="withdrawalDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">
                  Data do empréstimo
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">
                  Data da devolução
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={isPending}
          type="submit"
          variant={"default"}
          className="w-36 place-self-end"
        >
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Emprestar
        </Button>
      </form>
    </Form>
  );
};
