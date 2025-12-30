import { useState, useCallback, useRef } from "react";
import PasswordScreen from "@/components/PasswordScreen";
import Navigation from "@/components/Navigation";
import MainContent from "@/components/MainContent";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const handlePasswordSuccess = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsTransitioning(false);
    }, 800);
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    // Scroll to section
    const element = document.getElementById(section);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: "smooth",
      });
    }
  };

  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className={`transition-all duration-700 ${isTransitioning ? "opacity-0 blur-lg scale-105" : "opacity-100"}`}>
        <PasswordScreen onSuccess={handlePasswordSuccess} />
      </div>
    );
  }

  return (
    <div ref={mainContentRef} className="min-h-screen bg-background overflow-x-hidden">
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      <MainContent activeSection={activeSection} onSectionChange={handleSectionChange} />
    </div>
  );
};

export default Index;