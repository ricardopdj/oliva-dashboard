import { useLayoutEffect, useState } from "react";
import { PlaylistCard } from "./PlaylistCard";
import { TOKENS } from "../styles/tokens";

type Rect = { top: number; left: number; width: number; height: number };

const MINI_WIDTH = 300;
const MINI_HEIGHT = 80;
const MINI_MARGIN = 20;

function miniRect(): Rect {
  return {
    top: window.innerHeight - MINI_HEIGHT - MINI_MARGIN,
    left: window.innerWidth - Math.min(MINI_WIDTH, window.innerWidth - MINI_MARGIN * 2) - MINI_MARGIN,
    width: Math.min(MINI_WIDTH, window.innerWidth - MINI_MARGIN * 2),
    height: MINI_HEIGHT,
  };
}

// Never reparents the iframe DOM node — moving/removing a mounted iframe resets Spotify
// playback, so this component stays mounted once and only repositions via CSS.
export function PersistentPlayer({ anchorEl }: { anchorEl: HTMLDivElement | null }) {
  const [rect, setRect] = useState<Rect | null>(null);
  const compact = !anchorEl;

  useLayoutEffect(() => {
    const update = () => {
      if (anchorEl) {
        const r = anchorEl.getBoundingClientRect();
        setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
      } else {
        setRect(miniRect());
      }
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    let ro: ResizeObserver | undefined;
    if (anchorEl) {
      ro = new ResizeObserver(update);
      ro.observe(anchorEl);
    }

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      ro?.disconnect();
    };
  }, [anchorEl]);

  if (!rect) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: 12,
        overflow: "hidden",
        zIndex: compact ? 800 : 1,
        boxShadow: compact ? "0 12px 32px rgba(13, 13, 13, 0.35)" : "none",
        border: compact ? `1px solid ${TOKENS.hair}` : "none",
        pointerEvents: "auto",
      }}
    >
      <PlaylistCard compact={compact} />
    </div>
  );
}
