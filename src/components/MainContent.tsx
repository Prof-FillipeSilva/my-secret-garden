import AudiosSection from "./sections/AudiosSection";
import PoemasSection from "./sections/PoemasSection";
import FotosSection from "./sections/FotosSection";
import MusicasSection from "./sections/MusicasSection";
import SurpresaSection from "./sections/SurpresaSection";
import ParticlesBackground from "./ParticlesBackground";

interface MainContentProps {
  activeSection: string;
}

const MainContent = ({ activeSection }: MainContentProps) => {
  const renderSection = () => {
    switch (activeSection) {
      case "audios":
        return <AudiosSection />;
      case "poemas":
        return <PoemasSection />;
      case "fotos":
        return <FotosSection />;
      case "musicas":
        return <MusicasSection />;
      case "surpresa":
        return <SurpresaSection />;
      default:
        return <AudiosSection />;
    }
  };

  return (
    <main className="min-h-screen relative">
      <ParticlesBackground />
      <div className="relative z-10 animate-blur-in">
        {renderSection()}
      </div>
    </main>
  );
};

export default MainContent;