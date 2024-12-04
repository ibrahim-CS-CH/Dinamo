import { useCallback, useEffect, useRef } from "react";

export function useNavigationBlock(condition?: boolean) {
  // keep reference to the current handler for cleanup
  const handlerRef = useRef<((e: BeforeUnloadEvent) => void) | null>(null);

  const blockNavigation = useCallback((shouldBlock = true) => {
    if (handlerRef.current) {
      window.removeEventListener("beforeunload", handlerRef.current);
      handlerRef.current = null;
    }

    if (shouldBlock) {
      const handleWindowClose = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        return "";
      };

      handlerRef.current = handleWindowClose;
      window.addEventListener("beforeunload", handleWindowClose);
    }

    return () => {
      if (handlerRef.current) {
        window.removeEventListener("beforeunload", handlerRef.current);
        handlerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let unblock: undefined | (() => void);
    if (typeof condition === "boolean") {
      unblock = blockNavigation(condition);
    }
    return () => {
      unblock?.();
    };
  }, [condition, blockNavigation]);

  useEffect(() => {
    return () => {
      blockNavigation(false);
    };
  }, [blockNavigation]);

  return { blockNavigation };
}
