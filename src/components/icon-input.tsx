"use client";

import { ElementType, forwardRef } from "react";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Input, InputProps } from "./ui/input";

type IconInputProps = {
  icon: ElementType;
  onClick?: () => void;
};

const IconInput = forwardRef<HTMLInputElement, InputProps & IconInputProps>(
  ({ className, onClick, icon: Icon, ...props }, ref) => {
    return (
      <div className="flex rounded-md border border-input bg-[#ffffff33] backdrop-blur-[10px] px-2 focus-within:ring-2 focus:ring-slate-700">
        <Input
          type={"text"}
          className={cn(
            "bg-transparent border-none ring-0  ring-transparent  focus-visible:outline-none focus-visible:ring-none focus-visible:ring-none  focus-visible:ring-offset-0",
            className
          )}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant={"ghost"}
          onClick={onClick}
          disabled={props.value === "" || props.disabled}
        >
          {props.children ? (
            props.children
          ) : (
            <Icon
              {...props}
              className={cn("stroke-slate-400 h-5 w-5 ", className)}
            />
          )}
        </Button>
      </div>
    );
  }
);
IconInput.displayName = "IconInput";

export { IconInput };
