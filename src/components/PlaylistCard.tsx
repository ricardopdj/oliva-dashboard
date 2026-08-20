export function PlaylistCard({ compact = false }: { compact?: boolean }) {
  return (
    <iframe
      data-testid="embed-iframe"
      style={{ borderRadius: 12, display: "block" }}
      src="https://open.spotify.com/embed/playlist/6QGOe1VCHIz7U4htoUA9KT?utm_source=generator&theme=0&si=ff7932b75e674882"
      width="100%"
      height={compact ? 80 : 352}
      frameBorder={0}
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}
