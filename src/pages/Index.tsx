import { useState, useCallback } from "react";
import PasswordScreen from "@/components/PasswordScreen";
import Navigation from "@/components/Navigation";
import MainContent from "@/components/MainContent";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePasswordSuccess = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsTransitioning(false);
    }, 800);
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
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
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      <MainContent activeSection={activeSection} onSectionChange={handleSectionChange} />
    </div>
  );
};

export default Index;