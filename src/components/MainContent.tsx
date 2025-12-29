import { useEffect, useRef } from "react";
import AudiosSection from "./sections/AudiosSection";
import PoemasSection from "./sections/PoemasSection";
import FotosSection from "./sections/FotosSection";
import MusicasSection from "./sections/MusicasSection";
import SurpresaSection from "./sections/SurpresaSection";
import ParticlesBackground from "./ParticlesBackground";

interface MainContentProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: "poemas", component: PoemasSection },
  { id: "fotos", component: FotosSection },
  { id: "musicas", component: MusicasSection },
  { id: "audios", component: AudiosSection },
  { id: "surpresa", component: SurpresaSection },
];

const MainContent = ({ activeSection, onSectionChange }: MainContentProps) => {
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

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

  return (
    <main className="relative">
      <ParticlesBackground />
      <div className="relative z-10">
        {sections.map(({ id, component: Component }) => (
          <section
            key={id}
            id={id}
            data-section={id}
            ref={(el) => (sectionRefs.current[id] = el)}
            className="scroll-mt-20"
          >
            <Component />
          </section>
        ))}
      </div>
    </main>
  );
};

export default MainContent;
