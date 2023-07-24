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

import { useSignIn } from "@clerk/nextjs";
import { authSchema } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PasswordInput } from "../password-input";
import { IconInput } from "../icon-input";
import { Icons } from "../icons";
import { useTransition } from "react";
import { toast } from "sonner";
import { catchClerkError } from "@/lib/utils";

type Inputs = z.infer<typeof authSchema>;

export const SignInForm = () => {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
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
    if (!isLoaded) return;

    startTransition(async () => {
      try {
        const result = await signIn?.create({
          identifier: data.email,
          password: data.password,
        });

        if (result?.status === "complete") {
          await setActive({ session: result.createdSessionId });

          router.push(`${window.location.origin}/home`);
        } else {
          /* Verificar por que o login nao foi concluído  */
          console.log(result);
        }
      } catch (err) {
        catchClerkError(err);
      }
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className="grid gap-4"
      >
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
              <FormMessage className="max-w-sm" />
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
