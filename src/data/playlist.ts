import playlistCover from "../assets/playlist-cover.png";

export interface Track {
  name: string;
  artist: string;
  duration: string;
}

export const PLAYLIST = {
  url: "https://open.spotify.com/playlist/6QGOe1VCHIz7U4htoUA9KT",
  cover: playlistCover,
  title: "Onboarding Oliva",
  owner: "Oliva Marketing",
  duration: "1h 17min · 21 faixas",
  tracks: [
    { name: "From The Start", artist: "Laufey", duration: "02:49" },
    { name: "Dream A Little Dream Of Me", artist: "Ella Fitzgerald", duration: "03:04" },
    { name: "La Vie En Rose", artist: "Emily Watts", duration: "02:37" },
  ] as Track[],
};
