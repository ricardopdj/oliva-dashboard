export function PlaylistCard() {
  return (
    <div style={{ marginTop: 22, borderRadius: 12, overflow: "hidden" }}>
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: 12 }}
        src="https://open.spotify.com/embed/playlist/6QGOe1VCHIz7U4htoUA9KT?utm_source=generator&theme=0&si=ff7932b75e674882"
        width="100%"
        height={352}
        frameBorder={0}
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
