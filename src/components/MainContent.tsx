import { useEffect, useRef, useState, useCallback } from "react";
import WelcomeSection from "./WelcomeSection";
import EscritasSection from "./sections/EscritasSection";
import FotosSection from "./sections/FotosSection";
import MusicasSection from "./sections/MusicasSection";
import SurpresaSection from "./sections/SurpresaSection";
import PresentesSection from "./sections/PresentesSection";
import DespedidaSection from "./sections/DespedidaSection";
import ParticlesBackground from "./ParticlesBackground";

interface MainContentProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const MainContent = ({ activeSection, onSectionChange }: MainContentProps) => {
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [despedidaUnlocked, setDespedidaUnlocked] = useState(() => {
    return localStorage.getItem("despedida_unlock_time") !== null;
  });
  const isScrollingRef = useRef(false);

  const handleLastAudioPlayed = () => {
    setDespedidaUnlocked(true);
  };

  // Debounced section change to prevent rapid updates
  const debouncedSectionChange = useCallback((section: string) => {
    if (!isScrollingRef.current) {
      onSectionChange(section);
    }
  }, [onSectionChange]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -30% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("data-section");
          if (sectionId) {
            debouncedSectionChange(sectionId);
          }
        }
      });
    }, observerOptions);

    // Small delay to ensure refs are set
    const timer = setTimeout(() => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [debouncedSectionChange]);

  const sections = [
    { id: "inicio", component: <WelcomeSection /> },
    { id: "escritas", component: <EscritasSection /> },
    { id: "fotos", component: <FotosSection /> },
    { id: "musicas", component: <MusicasSection /> },
    { id: "surpresa", component: <SurpresaSection /> },
    { id: "presentes", component: <PresentesSection onLastAudioPlayed={handleLastAudioPlayed} /> },
    { id: "despedida", component: <DespedidaSection isUnlocked={despedidaUnlocked} /> },
  ];

  return (
    <main className="relative w-full overflow-x-hidden">
      <ParticlesBackground />
      <div className="relative z-10 w-full">
        {sections.map(({ id, component }) => (
          <section
            key={id}
            id={id}
            data-section={id}
            ref={(el) => (sectionRefs.current[id] = el)}
            className="scroll-mt-20 w-full"
          >
            {component}
          </section>
        ))}
      </div>
    </main>
  );
};

export default MainContent;
