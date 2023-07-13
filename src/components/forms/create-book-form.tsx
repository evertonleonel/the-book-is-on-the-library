"use client";
import React from "react";

import { useRouter } from "next/navigation";
import FileInputImage from "../file-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { createNewBookSchema } from "@/lib/validations/auth";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Inputs = z.infer<typeof createNewBookSchema>;

export const CreateBookForm = () => {
  const router = useRouter();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(createNewBookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      sinopse: "",
      date: "",
    },
  });

  function onSubmit(data: Inputs) {
    console.log(data);
    router.push("/library");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row  max-w-[1400px] w-full justify-center items-center gap-4 m-auto"
      >
        <div className="flex justify-center items-center w-full sm:w-1/4 ">
          <FileInputImage />
        </div>
        <div className="flex-1 flex flex-col w-full sm:w-3/4 gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full grid flex-wrap max-w-[414px]:gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Autor</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gênero</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="sinopse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sinopse</FormLabel>
                <FormControl>
                  <Textarea {...field} className="h-64 " />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="self-end max-w-[280px]:self-center flex  space-x-2 sm:space-x-10">
            <Button variant={"destructive"}>Cancelar</Button>
            <Button>Salvar</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
