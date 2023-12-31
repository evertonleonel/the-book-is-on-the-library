"use client";

import { forwardRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Input, InputProps } from "./ui/input";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="flex rounded-md border border-input bg-[#ffffff33] backdrop-blur-[10px] px-2 focus-within:ring-2">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            " bg-transparent border-none ring-0  ring-transparent  focus-visible:outline-none focus-visible:ring-none focus-visible:ring-none focus-visible:ring-offset-0",
            className
          )}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={props.value === "" || props.disabled}
        >
          {showPassword ? (
            <Icons.hide className="stroke-slate-400" aria-hidden="true" />
          ) : (
            <Icons.view className="stroke-slate-400" />
          )}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
