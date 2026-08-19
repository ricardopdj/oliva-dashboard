import { Check, MoreHorizontal, Play, SkipBack, SkipForward } from "lucide-react";
import { TOKENS } from "../styles/tokens";
import { PLAYLIST } from "../data/playlist";

export function PlaylistCard() {
  return (
    <div style={{ marginTop: 22, borderRadius: 14, overflow: "hidden", position: "relative", border: `1px solid rgba(199,172,153,0.3)`, background: "#282828" }}>
      <div style={{ padding: "18px 18px 14px", display: "flex", gap: 16, alignItems: "flex-start" }}>
        <img src={PLAYLIST.cover} alt="" style={{ width: 96, height: 96, borderRadius: 8, flexShrink: 0, objectFit: "cover" }} />
        <div style={{ minWidth: 0, flex: 1, paddingTop: 2 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{PLAYLIST.title}</p>
              <p style={{ margin: "3px 0 0", fontSize: 13, color: "#B3B3B3" }}>{PLAYLIST.owner}</p>
            </div>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#1ED760", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Check size={13} color="#000" strokeWidth={3} />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
            <div style={{ width: 15, height: 15, borderRadius: "50%", border: "1.5px solid #1ED760", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={9} color="#1ED760" strokeWidth={3} />
            </div>
            <span style={{ fontSize: 12, color: "#B3B3B3" }}>Saved on Spotify</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
            <SkipBack size={16} color="#B3B3B3" fill="#B3B3B3" />
            <div style={{ flex: 1, height: 3, borderRadius: 2, background: "#4D4D4D", position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "0%", background: "#fff", borderRadius: 2 }} />
            </div>
            <SkipForward size={16} color="#B3B3B3" fill="#B3B3B3" />
            <span style={{ fontSize: 11, color: "#B3B3B3", minWidth: 34 }}>00:00</span>
            <MoreHorizontal size={16} color="#B3B3B3" />
            <button
              onClick={() => window.open(PLAYLIST.url, "_blank")}
              aria-label="Tocar no Spotify"
              style={{
                width: 34, height: 34, borderRadius: "50%", background: "#fff", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0,
              }}
            >
              <Play size={14} color="#000" fill="#000" style={{ marginLeft: 2 }} />
            </button>
          </div>
        </div>
      </div>
      <div style={{ padding: "4px 18px 14px" }}>
        {PLAYLIST.tracks.map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
            <span style={{ fontSize: 12, color: "#8A8178", width: 14, flexShrink: 0 }}>{i + 1}</span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ margin: 0, fontSize: 13, color: "#EDE8E0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</p>
              <p style={{ margin: 0, fontSize: 11, color: "#8A8178", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.artist}</p>
            </div>
            <span style={{ fontSize: 11, color: "#8A8178", flexShrink: 0 }}>{t.duration}</span>
          </div>
        ))}
      </div>
      <div
        onClick={() => window.open(PLAYLIST.url, "_blank")}
        style={{ padding: "10px 16px", borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center", fontSize: 12, fontWeight: 700, color: TOKENS.mocha, cursor: "pointer" }}
      >
        Ver playlist completa no Spotify ↗
      </div>
    </div>
  );
}
