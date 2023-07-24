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
import { useSignUp } from "@clerk/nextjs";
import { catchClerkError } from "@/lib/utils";

type Inputs = z.infer<typeof authSchema>;

export const SignUpForm = () => {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();
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
        await signUp.create({
          emailAddress: data.email,
          password: data.password,
        });

        // Send email verification code
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        router.push("/signup/verify-email");
        toast.message("Verifique seu email", {
          description:
            "Enviamos um código de verificação de 6 dígitos para o seu e-mail.",
        });
      } catch (err) {
        catchClerkError(err);
      }
    });

    router.push("/");
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
