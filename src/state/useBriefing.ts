import { useContext } from "react";
import { BriefingContext } from "./context";

export function useBriefing() {
  const ctx = useContext(BriefingContext);
  if (!ctx) throw new Error("useBriefing must be used within a BriefingProvider");
  return ctx;
}
