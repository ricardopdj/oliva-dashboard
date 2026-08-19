import { useCallback, useRef, useState } from "react";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export function useDebouncedSave<T>(save: (payload: T) => Promise<void>, delayMs = 700) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [status, setStatus] = useState<SaveStatus>("idle");

  const trigger = useCallback((payload: T) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      setStatus("saving");
      try {
        await save(payload);
        setStatus("saved");
      } catch {
        setStatus("error");
      }
    }, delayMs);
  }, [save, delayMs]);

  return { trigger, status };
}
