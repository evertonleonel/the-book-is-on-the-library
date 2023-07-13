"use client";

import React from "react";
import { Input } from "./ui/input";
import { Icons } from "./icons";

const FileInput = () => {
  return (
    <div className="flex items-center justify-center  w-full ">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-40 sm:h-56 md:h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-background dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-slate-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600  ease-in-out duration-7000"
      >
        <div className="flex flex-col items-center justify-center text-foreground font-semibold sm:text-lg pt-5 pb-6 gap-4">
          <Icons.plus className=" sm:w-12 sm:h-12" />
          Capa
        </div>
        <Input id="dropzone-file" type="file" className="hidden w-full" />
      </label>
    </div>
  );
};

export default FileInput;