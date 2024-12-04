import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
  RowData,
  RowSelectionState,
  SortingState,
  TableOptions,
  VisibilityState,
} from "@tanstack/react-table";
import { ReactElement, ReactNode } from "react";

declare module "@tanstack/react-table" {
  interface Table<TData extends RowData> {
    options: TableOptions<TData>;
  }

  interface TableOptions<TData extends RowData> {
    meta: TableMeta<TData>;
  }

  interface TableMeta<TData extends RowData> {
    actions: RowAction<TData>[] | ((row: TData) => RowAction<TData>[]);
    t: (id: string) => string;
    dir: "ltr" | "rtl";
  }
}

export type RowAction<TData> = {
  title: string;
  onClick: (row: Row<TData>) => void;
  icon?: ReactElement;
  disabled?: boolean;
  hidden?: boolean;
};

export type TableFilterChildren =
  | ReactNode
  | ((props: { close: () => void; hasFilter: (f: boolean) => void }) => ReactNode);

export interface DataTableProps<TData, TValue> extends Partial<TableOptions<TData>> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | undefined;
  error?: string | null;
  pagination?: Partial<Record<keyof PaginationState, unknown>>;
  onManualPagination?: (pagination: PaginationState) => void;
  sorting?: SortingState;
  onManualSorting?: (sorting: SortingState) => void;
  filters?: ColumnFiltersState;
  onManualFilter?: (filters: ColumnFiltersState) => void;
  rowSelection?: RowSelectionState;
  onManualRowSelection?: (rowSelection: RowSelectionState) => void;
  columnsVisibility?: VisibilityState;
  onManualColumnsVisibilityChange?: (rowSelection: VisibilityState) => void;
  rowActions?: RowAction<TData>[] | ((row: TData) => RowAction<TData>[]);
  pageCount?: number;
  search?: string;
  onSearch?: (term: string) => void;
  searchPlaceholder?: string;
  showColumnsView?: boolean;
  CustomFilter?: TableFilterChildren;
}
