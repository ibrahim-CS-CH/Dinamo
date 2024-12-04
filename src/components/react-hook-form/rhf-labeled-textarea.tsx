import { clsx } from "clsx";
import { forwardRef, TextareaHTMLAttributes } from "react";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type InputProps = Partial<
  Merge<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    { label: string; error?: string }
  >
>;

const RHFLabeledTextarea = forwardRef<HTMLTextAreaElement, InputProps>(
  (
    { className, label, id, error = false, required = false, ...props },
    ref
  ) => {
    return (
      <div
        className={clsx("flex flex-col gap-1 text-sm w-full", {
          "text-destructive": error,
        })}>
        <label htmlFor={id ?? props.name}>
          {label}
          <span className="text-destructive"> {required ? "*" : ""}</span>
        </label>
        <Textarea
          className={cn(
            error ? "border-destructive focus-visible:ring-destructive" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-destructive text-xs">{error}</p>}
      </div>
    );
  }
);
RHFLabeledTextarea.displayName = "RHFLabeledTextarea";

export { RHFLabeledTextarea };
