import { PaginationState, SortingState } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useSearchParamsTable = ({
  perPage,
  page,
  arbitrary,
}: Partial<{
  perPage: string;
  page: string;
  arbitrary: Record<string, any>;
}> = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = useMemo(() => searchParams.toString(), [searchParams]);
  const queryObject = useMemo(() => {
    const object: Record<string, any> = {};

    for (const [key, value] of searchParams) {
      object[key] = value;
    }

    return object;
  }, [searchParams]);

  const [allSearchParams, setAllSearchParams] = useState<Record<string, string[]>>({});

  const getPageCount = useCallback(
    (total: number | undefined) => {
      if (!total) return 0;
      const perPage = +searchParams.get("perPage")!;
      if (isNaN(perPage)) return -1;
      return Math.ceil(total / perPage);
    },
    [searchParams],
  );

  const shouldFetchList = useCallback(() => {
    return searchParams.has("perPage") && searchParams.has("page");
  }, [searchParams]);

  const onPaginationChange = useCallback(
    (pagination: PaginationState) => {
      searchParams.set("perPage", pagination.pageSize.toString());
      searchParams.set("page", pagination.pageIndex.toString());
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const onSearch = useCallback(
    (term: string) => {
      term.trim().length ? searchParams.set("search", term) : searchParams.delete("search");
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const onSort = useCallback(
    (sorting: SortingState) => {
      searchParams.set("sort", `${sorting[0].desc ? "" : "-"}${sorting[0].id}`);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const getParam = useCallback(
    (name: string) => {
      return searchParams.get(name);
    },
    [searchParams],
  );

  const onFilter = useCallback(
    (filter: Record<string, string[]>) => {
      console.log("onfilter", filter);
      Object.entries(filter).forEach(([key, value]) => {
        searchParams.delete(key);
        Array.isArray(value)
          ? value.forEach((v) => (v ? searchParams.append(key, v) : searchParams.delete(key)))
          : value !== undefined
            ? searchParams.append(key, value)
            : searchParams.delete(key);
      });
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("perPage", prevSearchParams.get("perPage") ?? perPage ?? "5");
      prevSearchParams.set("page", prevSearchParams.get("page") ?? page ?? "0");
      return prevSearchParams;
    });
  }, [setSearchParams, perPage, page]);

  useEffect(() => {
    if (arbitrary)
      setSearchParams((prevSearchParams) => {
        Object.entries(arbitrary).forEach(([key, val]) => {
          prevSearchParams.set(key, prevSearchParams.get(key) ?? val);
        });
        return prevSearchParams;
      });
  }, [setSearchParams]);

  useEffect(() => {
    function parseQueryString(query: string) {
      const result: any = {};

      query = query.replace(/^[?#]/, "");
      const pairs = query.split("&");

      for (const pair of pairs) {
        let [key, value] = pair.split("=");

        key = decodeURIComponent(key);
        value = decodeURIComponent(value);

        if (result[key]) {
          if (Array.isArray(result[key])) {
            result[key].push(value);
          } else {
            result[key] = [result[key], value];
          }
        } else {
          result[key] = [value];
        }
      }

      return result;
    }

    setAllSearchParams(parseQueryString(searchQuery));
  }, [searchQuery]);

  return {
    searchParams,
    setSearchParams,
    getPageCount,
    shouldFetchList,
    onSearch,
    onPaginationChange,
    searchQuery,
    queryObject,
    onSort,
    getParam,
    onFilter,
    allSearchParams,
  };
};
