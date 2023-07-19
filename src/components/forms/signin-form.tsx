"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { authSchema } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PasswordInput } from "../password-input";
import { IconInput } from "../icon-input";
import { Icons } from "../icons";
import { useTransition } from "react";
import { toast } from "sonner";
import Link from "next/link";

type Inputs = z.infer<typeof authSchema>;

export const SignInForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: Inputs) {
    console.log(data, "data Input");

    startTransition(async () => {
      const request = await fetch("/api/users", {
        method: "GET",
      });
      const response = await request.json();

      if (!request.ok) {
        toast.error(`Ops... ${response.error}`);
      } else {
        toast.success("Logando");
      }
    });

    router.push("/");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <IconInput
                  placeholder="exemplo@email.com"
                  icon={Icons.mail}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder="senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Enviar
        </Button>
      </form>
    </Form>
  );
};
