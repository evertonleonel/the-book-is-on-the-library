import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { isClerkAPIResponseError } from "@clerk/nextjs";
import * as z from "zod";
import { toast } from "sonner";
import Compressor from "compressorjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function catchClerkError(err: unknown) {
  const unknownErr = "Algo deu errado, tente novamente mais tarde.";

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return toast(errors.join("\n"));
  } else if (isClerkAPIResponseError(err)) {
    return toast.error(err.errors[0]?.longMessage ?? unknownErr);
  } else {
    return toast.error(unknownErr);
  }
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return toast(errors.join("\n"));
  } else if (err instanceof Error) {
    return toast(err.message);
  } else {
    return toast("Algo deu errado, tente novamente mais tarde.");
  }
}

export const parseBase64 = async (raw: Blob): Promise<string> => {
  const optimizeImage = await optimize(raw);

  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(optimizeImage as Blob);
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };

    fileReader.onerror = (error: Event) => {
      reject(error);
    };
  });
};

export const optimize = (file: File | Blob) =>
  new Promise(
    (resolve, reject) =>
      new Compressor(file, {
        quality: 0.6,
        success: (result) => resolve(result),
        error: (err) => reject(err),
      })
  );
