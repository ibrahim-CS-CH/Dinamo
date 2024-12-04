import { InfoIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export default function ErrorHandler({
  error,
  className,
}: {
  error?: any;
  className?: string;
}) {
  const errorMessage = () => {
    if (typeof error === "string") {
      return error;
    } else if (error instanceof Error) {
      return error.message;
    } else if (error && typeof error.message === "string") {
      return error.message;
    } else {
      return "something_went_wrong";
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center h-[30vh] gap-3 w-full",
        className
      )}>
      <InfoIcon strokeWidth={0.5} className="h-20 w-20 text-destructive" />
      <p className="text-center break-all">{errorMessage()}</p>
    </div>
  );
}
