import { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function ColumnHeader<TData, TValue>({ column, title, className }: ColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div
      className={cn("flex items-center gap-1 cursor-pointer", className)}
      onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
    >
      <span>{title}</span>
      {column.getIsSorted() === "desc" ? (
        <ChevronDown size={18} className="mx-1" />
      ) : column.getIsSorted() === "asc" ? (
        <ChevronUp size="16" className="mx-1" />
      ) : (
        <ChevronsUpDownIcon size="16" />
      )}
    </div>
  );
}
