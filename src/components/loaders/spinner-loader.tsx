import { Loader } from "lucide-react";
import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const SpinnerLoader = ({
  containerClasses,
  loaderProps,
}: {
  containerClasses?: string;
  loaderProps?: ComponentProps<typeof Loader>;
} = {}) => {
  return (
    <section
      className={cn(
        "flex w-full items-center justify-center p-4 ",
        containerClasses
      )}>
      <Loader className="animate-spin" size={20} {...loaderProps} />
    </section>
  );
};

export default SpinnerLoader;
