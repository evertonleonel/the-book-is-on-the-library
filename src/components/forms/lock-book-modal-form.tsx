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
import { lockBookModalSchema } from "@/lib/validations/auth";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

type Inputs = z.infer<typeof lockBookModalSchema>;

type lockBookModalProps = {
  onClick: () => void;
};

export const LockBookModalForm = ({ onClick }: lockBookModalProps) => {
  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(lockBookModalSchema),
    defaultValues: {
      description: "",
    },
  });

  function onSubmit(data: Inputs) {
    console.log(data);
    onClick();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid gap-4"
      >
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
        <Button variant={"destructive"} className="w-36 place-self-end">
          Inativar
        </Button>
      </form>
    </Form>
  );
};
