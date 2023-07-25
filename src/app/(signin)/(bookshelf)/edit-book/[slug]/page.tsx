import React from "react";

import { Metadata } from "next";

import LinkBackHome from "@/components/link-back-home";
import { auth, currentUser } from "@clerk/nextjs";
import { CreateBookForm } from "@/components/forms/create-book-form";

export const metadata: Metadata = {
  title: "Library - Edit Book",
};

const EditeBookPage = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <LinkBackHome>Editar livro</LinkBackHome>
      <div className="flex-1 flex p-2">
        <CreateBookForm params={params.slug} />
      </div>
    </>
  );
};

export default EditeBookPage;
