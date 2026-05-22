import { useState } from "react";
import usePlayer from "./hooks/usePlayer";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TopCharts from "./components/TopCharts";
import PlaylistSection from "./components/PlaylistSection";
import ArtistSection from "./components/ArtistSection";
import MiniPlayer from "./components/MiniPlayer";
import { CTABanner, Footer } from "./components/CTABanner";

export default function App() {
  const [activeNav, setActiveNav] = useState("trang-chu");
  const player = usePlayer();

  return (
    <div
      style={{
        fontFamily: "'DM Sans',sans-serif",
        background: "#080808",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <Navbar activeNav={activeNav} onNav={setActiveNav} />

      <main>
        <HeroSection player={player} />
        <TopCharts player={player} />
        <PlaylistSection />
        <ArtistSection />
        <CTABanner />
        <Footer />
      </main>

      <div style={{ paddingBottom: 72 }} />
      <MiniPlayer
        song={player.currentSong}
        playing={player.playing}
        onToggle={player.toggle}
        progress={player.progress}
        onSeek={player.seekFromEvent}
      />
    </div>
  );
}
