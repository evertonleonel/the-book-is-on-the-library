"use client";
import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "../ui/textarea";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createNewBookSchema } from "@/lib/validations/modals";
import { toast } from "sonner";

type Inputs = z.infer<typeof createNewBookSchema>;

export const CreateBookForm = () => {
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const router = useRouter();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(createNewBookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      synopsis: "",
      systemEntryDate: "",
      image: "",
    },
  });

  // async function handleImageChange(e: { target: HTMLInputElement }) {
  //   const files = e.target.files;
  //   if (files && files.length > 0) {
  //     const file = files[0];
  //     setSelectedImage(URL.createObjectURL(file));
  //     setSelectedFile(file);
  //   }
  // }

  // useEffect(() => {
  //   form.register("image", {
  //     validate: (value) => {
  //       if (!value) {
  //         return "Selecione uma imagem.";
  //       }
  //       return true;
  //     },
  //   });
  // }, [form]);

  const handleFileChange = () => {
    if (inputRef.current && inputRef.current.files) {
      const selectedFile = inputRef.current.files[0];
      handleFileSelect(selectedFile);
    }
  };

  const handleFileSelect = async (fileInput: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileInput);
    reader.onload = async (event) => {
      const base64String = event?.target?.result?.toString();
      setSelectedImage(base64String);
    };
  };

  function onSubmit(data: Inputs) {
    event?.preventDefault();

    startTransition(async () => {
      const request = await fetch(`api/book`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await request.json();
      if (!response.ok) {
        toast.error(`Falha no envio das informações, ${response}`);
      } else {
        toast.success("Livro criado com sucesso!");
      }
    });

    // router.push("/library");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row  max-w-[1400px] w-full justify-center items-center gap-4 m-auto"
      >
        <div className="flex justify-center items-center w-full sm:w-1/4 ">
          <FileInputImage selectedImage={selectedImage}>
            {/* <Input
              id="dropzone-file"
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              className="hidden w-full"
            /> */}

            <input
              id="dropzone-file"
              type="file"
              className="hidden w-full"
              {...(form.register("image"),
              {
                onInput: (file: ChangeEvent<HTMLInputElement>) => {
                  if (file.target.files)
                    form.setValue("image", String(file.target.files[0]));
                },
              })}
              ref={inputRef}
              onChange={handleFileChange}
            />

            {form.formState.errors.image && (
              <p>{form.formState.errors.image.message}</p>
            )}
          </FileInputImage>
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
                    <FormLabel className="font-bold text-base">Autor</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Gênero" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
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
            name="synopsis"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-base">Sinopse</FormLabel>
                <FormControl>
                  <Textarea {...field} className="h-60 " />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="self-end max-w-[280px]:self-center flex  space-x-2 sm:space-x-10">
            <Button variant={"destructive"}>Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
