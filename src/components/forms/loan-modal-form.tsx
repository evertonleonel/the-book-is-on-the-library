"use client";

import React from "react";
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
import { loanModalSchema } from "@/lib/validations/modals";
import { Input } from "../ui/input";

type Inputs = z.infer<typeof loanModalSchema>;

type LoanModalProps = {
  onClick: () => void;
};

export const LoanModalForm = ({ onClick }: LoanModalProps) => {
  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(loanModalSchema),
    defaultValues: {
      studentName: "",
      class: "",
      withdrawalDate: "",
      deliveryDate: "",
    },
  });

  function onSubmit(data: Inputs) {
    onClick();
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
            name="class"
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
        <Button variant={"default"} className="w-36 place-self-end">
          Emprestar
        </Button>
      </form>
    </Form>
  );
};
