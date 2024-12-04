import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { useErrorHandler } from "@/lib/hooks/use-error-handler";

export function useDeleteTableRow({
  onDelete,
  successMessage,
}: {
  onDelete?: () => void;
  successMessage: string;
}) {
  const { handleError } = useErrorHandler();

  const [open, setOpen] = useState(false);
  const [rowUrl, setRowUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteRow = useCallback(async () => {
    if (!rowUrl) return;

    try {
      setIsLoading(true);
      await axios.delete(rowUrl);
      toast.success(successMessage);
      setRowUrl(null);
      onDelete?.(); // Call the onDelete callback if provided
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError && error.response
          ? handleError(error.response)
          : "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [rowUrl, handleError, onDelete, successMessage]);

  const cancelDeletion = () => {
    setRowUrl(null);
    setOpen(false);
  };

  return {
    deleteRow,
    cancelDeletion,
    open,
    setOpen,
    rowUrl,
    setRowUrl,
    isLoading,
  };
}
