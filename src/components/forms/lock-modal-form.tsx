"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  lockBookModalSchema,
  unlockBookModalSchema,
} from "@/lib/validations/modals";
import { activeBook, inactiveBook } from "@/lib/services";
import { toast } from "sonner";
import { catchError } from "@/lib/utils";

type InputLock = z.infer<typeof lockBookModalSchema>;
type InputUnlock = z.infer<typeof unlockBookModalSchema>;

type Inputs = InputLock | InputUnlock;

type lockBookModalProps = {
  statusBook?: boolean;
  idBook: string;
  onClick: () => void;
};

export const LockBookModalForm = ({
  onClick: closeModal,
  statusBook,
  idBook,
}: lockBookModalProps) => {
  // react-hook-form

  const form = useForm<Inputs>({
    resolver: zodResolver(
      statusBook ? lockBookModalSchema : unlockBookModalSchema
    ),
    defaultValues: {
      description: "",
    },
  });

  function onSubmit(data: Inputs) {
    try {
      if (statusBook) {
        const parseData = {
          id: idBook,
          description: data.description,
        };
        inactiveBook(parseData);
        toast.success("Livro desativado com sucesso!");
      } else {
        activeBook(idBook);
        toast.success("Livro ativado com sucesso!");
      }

      closeModal();
    } catch (err) {
      catchError(err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid gap-4"
      >
        {statusBook && (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Informe o motivo da desativação."
                    className="h-56"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {!statusBook && (
          <Button
            type="submit"
            variant={"default"}
            className="font-bold  w-36 place-self-end bg-indigo-700 hover:bg-indigo-900"
          >
            Ativar
          </Button>
        )}

        {statusBook && (
          <Button
            type="submit"
            variant={"destructive"}
            className="w-36 place-self-end font-bold"
          >
            Inativar
          </Button>
        )}
      </form>
    </Form>
  );
};
