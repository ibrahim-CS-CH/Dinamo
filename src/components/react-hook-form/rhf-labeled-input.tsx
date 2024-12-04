import { clsx } from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface InputProps
  extends Partial<
    Merge<
      InputHTMLAttributes<HTMLInputElement>,
      {
        label?: string;
        error?: string | null;
        labelClasses?: string;
      }
    >
  > {}

const RHFLabeledInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, labelClasses, id, error = false, required = false, ...props }, ref) => {
    return (
      <div className={clsx("flex w-full flex-col gap-1 text-sm", { "text-destructive": error })}>
        {label && (
          <label htmlFor={id ?? props.name} className={labelClasses}>
            {label}
            <span className="text-destructive"> {required ? "*" : ""}</span>
          </label>
        )}
        <Input
          className={cn(
            error ? "border-destructive focus-visible:ring-destructive" : "placeholder:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  },
);
RHFLabeledInput.displayName = "RHFLabeledInput";

export { RHFLabeledInput };
