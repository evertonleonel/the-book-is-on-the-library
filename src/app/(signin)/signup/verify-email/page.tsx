import { type Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VerifyEmailForm } from "@/components/forms/verify-email-form";

export const metadata: Metadata = {
  title: "Verifar E-mail",
  description:
    "Verifique seu endereço de e-mail para continuar com sua inscrição",
};

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen w-full justify-center items-center bg-secondary shadow-2xl">
      <div className="max-w-lg ">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Verify email</CardTitle>
            <CardDescription>
              Verify your email address to complete your account creation
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <VerifyEmailForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
