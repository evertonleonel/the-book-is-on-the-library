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

import { useSignUp } from "@clerk/nextjs";
import { verfifyEmailSchema } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Icons } from "../icons";
import { useTransition } from "react";
import { catchClerkError } from "@/lib/utils";
import { Input } from "../ui/input";

type Inputs = z.infer<typeof verfifyEmailSchema>;

export const VerifyEmailForm = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [isPending, startTransition] = useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(verfifyEmailSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(data: Inputs) {
    if (!isLoaded) return;

    startTransition(async () => {
      try {
        const completeSignUp = await signUp?.attemptEmailAddressVerification({
          code: data.code,
        });
        if (completeSignUp.status !== "complete") {
          /*   investiga a resposta, para ver se houve algum erro
             ou se o usuário precisar concluir mais etapas.*/
          console.log(JSON.stringify(completeSignUp, null, 2));
        }
        if (completeSignUp.status === "complete") {
          await setActive({ session: completeSignUp.createdSessionId });

          router.push(`${window.location.origin}/`);
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input
                  placeholder="112358"
                  {...field}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                    field.onChange(e);
                  }}
                />
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
          Criar conta
        </Button>
      </form>
    </Form>
  );
};
