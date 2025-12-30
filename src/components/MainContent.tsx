import { useEffect, useRef, useState } from "react";
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

  const handleLastAudioPlayed = () => {
    setDespedidaUnlocked(true);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("data-section");
          if (sectionId) {
            onSectionChange(sectionId);
          }
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [onSectionChange]);

  useEffect(() => {
    const targetRef = sectionRefs.current[activeSection];
    if (targetRef) {
      const navHeight = 80;
      const elementPosition = targetRef.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [activeSection]);

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
    <main className="relative">
      <ParticlesBackground />
      <div className="relative z-10">
        {sections.map(({ id, component }) => (
          <section
            key={id}
            id={id}
            data-section={id}
            ref={(el) => (sectionRefs.current[id] = el)}
            className="scroll-mt-20"
          >
            {component}
          </section>
        ))}
      </div>
    </main>
  );
};

export default MainContent;
