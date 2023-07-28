"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FileInputImage from "../file-input";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Icons } from "../icons";
import { catchError, parseBase64 } from "@/lib/utils";
import { createBook, getBook, updateBook } from "@/lib/services";
import { CreateBook, GetBook } from "@/types";
import { createNewBookSchema } from "@/lib/validations/modals";
import { useRouter } from "next/navigation";

type Inputs = z.infer<typeof createNewBookSchema>;

export const CreateBookForm = ({ params }: { params?: string }) => {
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState<string | null>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [editBook, setEditBook] = useState<GetBook | null>(null);
  const router = useRouter();

  const editBooks = {
    ...editBook,
  };

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(createNewBookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      synopsis: "",
      systemEntryDate: "",
    },
  });

  async function handleImageChange(e: { target: HTMLInputElement }) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = await parseBase64(files[0]);
      setSelectedImage(file);
    }
  }

  //Edit
  useEffect(() => {
    if (params) {
      getBook(params).then((bookData: GetBook | null) => {
        if (bookData) {
          form.setValue("title", bookData.title);
          form.setValue("genre", bookData.genre);
          form.setValue("author", bookData.author);
          form.setValue("synopsis", bookData.synopsis);
          form.setValue(
            "systemEntryDate",
            new Date(bookData.systemEntryDate).toISOString().substring(0, 10)
          );

          setSelectedImage(bookData.image);

          setEditBook(bookData);
        }
      });
    }
  }, [params]);

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        if (!params) {
          const parseData = data;

          parseData.image = selectedImage;
          parseData.systemEntryDate = new Date(
            parseData.systemEntryDate.replaceAll("-", "/")
          ).toISOString();

          createBook(parseData as CreateBook).then(() => {
            form.reset();
            setSelectedImage("");
            toast.success("Livro criado com sucesso!");
          });
        }

        if (params && editBooks) {
          const parseDate = new Date(
            data.systemEntryDate.replaceAll("-", "/")
          ).toISOString();

          updateBook({
            ...editBooks,
            image: selectedImage,
            title: data.title,
            author: data.author,
            genre: data.genre,
            systemEntryDate: parseDate,
            synopsis: data.synopsis,
          } as GetBook)
            .then(() => {
              toast.success("Livro editado com sucesso!");
              form.reset();
              setSelectedImage("");
              router.push("/library");
            })
            .catch((error) => {
              catchError(error);
            });
        }
      } catch (err) {
        catchError(err);
      }
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row  max-w-[1400px] w-full justify-center items-center gap-4 m-auto"
      >
        <div className="flex justify-center items-center w-full sm:w-1/4 ">
          <FileInputImage selectedImage={selectedImage}>
            <Input
              id="dropzone-file"
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              className="hidden w-full"
            />
          </FileInputImage>
          {form.formState.errors.image && (
            <p>{form.formState.errors.image.message}</p>
          )}
        </div>
        <div className="flex-1 flex flex-col w-full sm:w-3/4 gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full h-full grid flex-wrap max-w-[414px]:gap-4  space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base">
                      Título
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do livro" {...field} />
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
                    <FormLabel className="font-bold text-base">Autor</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do autor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full h-full space-y-4">
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base">
                      Gênero
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Gênero do livro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="systemEntryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base">Data</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="synopsis"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-base">Sinopse</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Sinopse do livro..."
                    {...field}
                    className="h-60 "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="self-end max-w-[280px]:self-center flex  space-x-2 sm:space-x-10">
            <Button
              type="reset"
              variant={"destructive"}
              onClick={() => {
                form.reset();
                setSelectedImage(null);
              }}
            >
              Cancelar
            </Button>
            <Button disabled={isPending} type="submit">
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
