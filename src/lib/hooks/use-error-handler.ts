import { useCallback } from "react";

export const useErrorHandler = () => {
  const handleError = useCallback((error: any) => {
    return error
      ? typeof error === "string"
        ? error
        : typeof error === "object" && error.message
        ? error.message
        : "something_went_wrong"
      : "";
  }, []);

  return {
    handleError,
  };
};
