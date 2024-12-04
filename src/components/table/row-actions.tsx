import { CellContext } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Fragment } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const RowActions = <TData,>(props: CellContext<TData, unknown>) => {
  const actions = props.table.options.meta?.actions;

  const finalActions = typeof actions === "function" ? actions(props.row.original) : actions;

  if (finalActions.every((a) => a.hidden)) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {finalActions.map((action) => (
          <Fragment key={action.title}>
            {action.hidden ? null : (
              <DropdownMenuItem
                disabled={action.disabled}
                onClick={() => action.onClick(props.row)}
                className="flex items-center gap-3"
              >
                <span>{action.icon}</span>
                <span>{action.title}</span>
              </DropdownMenuItem>
            )}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
