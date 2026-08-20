import type { CSSProperties } from "react";

export const TOKENS = {
  bgPage: "#FAF9F6",
  bgCard: "#FFFFFF",
  black: "#0D0D0D",
  ink: "#161310",
  inkSoft: "#6B6259",
  hair: "#E7E1D8",
  mocha: "#C7AC99",
  mochaSoft: "#EEE4DA",
  mochaDeep: "#A98D78",
  cream: "#FAF9F6",
} as const;

export const cardStyle: CSSProperties = {
  background: TOKENS.bgCard, borderRadius: 20, border: `1px solid ${TOKENS.hair}`,
  maxWidth: 680,
};
