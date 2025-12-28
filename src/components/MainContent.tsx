import AudiosSection from "./sections/AudiosSection";
import PoemasSection from "./sections/PoemasSection";
import FotosSection from "./sections/FotosSection";
import MusicasSection from "./sections/MusicasSection";
import SurpresaSection from "./sections/SurpresaSection";

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
    <main className="min-h-screen animate-blur-in">
      {renderSection()}
    </main>
  );
};

export default MainContent;
