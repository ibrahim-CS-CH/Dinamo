import {
  ColumnFiltersState,
  ExpandedState,
  flexRender,
  functionalUpdate,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowData,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useEffect, useState } from "react";

import {
  ColumnView,
  DataTablePagination,
  DataTableProps,
  Table as RootTable,
  RowActions,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useErrorHandler } from "@/lib/hooks/use-error-handler";

export function DataTable<TData extends RowData, TValue>({
  columns,
  data,
  error = null,
  pagination: defaultPaginationValue,
  onManualPagination,
  sorting: defaultSorting,
  onManualSorting,
  filters: defaultFilters,
  onManualFilter,
  rowSelection: defaultRowSelection,
  onManualRowSelection,
  columnsVisibility: defaultColumnsVisibility,
  onManualColumnsVisibilityChange,
  rowActions,
  pageCount,
  search,
  onSearch,
  searchPlaceholder = "",
  showColumnsView = true,
  CustomFilter,
  ...options
}: DataTableProps<TData, TValue>) {
  const { handleError } = useErrorHandler();

  const [sorting, setSorting] = useState<SortingState>(defaultSorting ?? []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    defaultFilters ?? []
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    defaultColumnsVisibility ?? {}
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    defaultRowSelection ?? {}
  );
  const [globalFilter, setGlobalFilter] = useState<string>(search ?? "");
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: defaultPaginationValue?.pageIndex
      ? +defaultPaginationValue.pageIndex
      : 0,
    pageSize: defaultPaginationValue?.pageSize
      ? +defaultPaginationValue.pageSize
      : 5,
  });

  const { debouncedValue } = useDebounce(globalFilter);

  const table = useReactTable<TData>({
    data: data ?? [],
    columns: rowActions
      ? [
          ...columns,
          {
            id: "actions",
            cell: (props) => {
              return (
                <div className="text-end">
                  <RowActions {...props} />
                </div>
              );
            },
          },
        ]
      : columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: (updater) => {
      const newSort = functionalUpdate(updater, sorting);
      onManualSorting?.(newSort);
      setSorting(newSort);
    },
    onPaginationChange: (updater) => {
      const newPagination = functionalUpdate(updater, pagination);
      onManualPagination?.(newPagination);
      setPagination(newPagination);
    },
    onColumnFiltersChange: (updater) => {
      const newFilters = functionalUpdate(updater, columnFilters);
      onManualFilter?.(newFilters);
      setColumnFilters(newFilters);
    },
    onColumnVisibilityChange: (updater) => {
      const newColumnsVisibility = functionalUpdate(updater, columnVisibility);
      onManualColumnsVisibilityChange?.(newColumnsVisibility);
      setColumnVisibility(newColumnsVisibility);
    },
    onRowSelectionChange: (updater) => {
      const newSelection = functionalUpdate(updater, rowSelection);
      onManualRowSelection?.(newSelection);
      setRowSelection(newSelection);
    },
    onExpandedChange: setExpanded,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
      expanded,
    },
    pageCount,

    manualPagination: !!onManualPagination,
    manualSorting: !!onManualSorting,
    manualFiltering: !!onManualFilter,

    meta: {
      actions: rowActions ?? [],
    } as any,
    ...options,
  });

  useEffect(() => {
    onSearch?.(debouncedValue as string);
  }, [debouncedValue, onSearch]);

  return (
    <>
      <div
        className={clsx("flex items-center justify-between", {
          "pb-3": onSearch || showColumnsView,
        })}>
        <div className="flex items-center gap-2 flex-1">
          {onSearch && (
            <Input
              placeholder={searchPlaceholder ?? "search"}
              value={globalFilter}
              onChange={(event) => {
                setGlobalFilter(event.target.value);
              }}
              className="lg:w-1/3"
            />
          )}
        </div>

        {showColumnsView && <ColumnView<TData> table={table} />}
      </div>

      <div className="rounded-md border border-border/50 grid bg-card">
        <RootTable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-left">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="hover:[&>tr]:bg-muted/20">
            {error ? (
              <TableRow>
                <TableCell
                  colSpan={50}
                  className="text-destructive text-center">
                  {handleError(error)}
                </TableCell>
              </TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 1}
                      className="h-24 text-center">
                      No results found
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </RootTable>
      </div>

      <div className="my-3">
        <DataTablePagination<TData> table={table} />
      </div>
    </>
  );
}
