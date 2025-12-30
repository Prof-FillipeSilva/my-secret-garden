import { useState, useEffect } from "react";
import { PenLine, Image, Music, Gift, Sparkles, Menu, X, Heart, Home, HeartHandshake } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "inicio", label: "Início", icon: Home },
  { id: "escritas", label: "Escritas", icon: PenLine },
  { id: "fotos", label: "Fotos", icon: Image },
  { id: "musicas", label: "Músicas", icon: Music },
  { id: "surpresa", label: "Surpresa", icon: Sparkles },
  { id: "presentes", label: "Presentes", icon: Gift },
  { id: "despedida", label: "Despedida", icon: HeartHandshake },
];

const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavigate = (section: string) => {
    setIsMobileMenuOpen(false);
    // Small delay to allow menu close animation
    setTimeout(() => {
      onNavigate(section);
    }, 100);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-strong shadow-soft py-2 md:py-3 border-b border-primary/10" : "bg-transparent py-3 md:py-5"
      }`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 md:gap-3 group cursor-pointer" onClick={() => handleNavigate("inicio")}>
              <div className="relative">
                <Heart className="w-6 h-6 md:w-7 md:h-7 text-primary transition-transform group-hover:scale-110" />
                <Sparkles className="absolute -top-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 text-accent/60 animate-twinkle" />
              </div>
              <span className="font-display text-lg md:text-xl text-foreground tracking-wide hidden sm:block">
                Nosso Amor
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                const isLocked = item.id === "surpresa" || item.id === "presentes" || item.id === "despedida";

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`relative flex items-center gap-2 px-3 xl:px-4 py-2 rounded-xl font-body text-sm transition-all duration-300 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20" />
                    )}
                    <Icon className={`w-4 h-4 relative z-10 ${isActive ? "text-primary" : ""}`} />
                    <span className="relative z-10 hidden xl:inline">{item.label}</span>
                    {isLocked && (
                      <Sparkles className="w-3 h-3 text-gold animate-pulse-soft relative z-10" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 md:p-3 glass-soft rounded-xl text-foreground transition-all duration-300 hover:shadow-soft border border-primary/20"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden animate-fade-in">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 md:top-20 left-3 right-3 md:left-4 md:right-4 glass-strong rounded-2xl p-4 md:p-6 animate-scale-in shadow-romantic border border-primary/20 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="flex flex-col gap-1.5 md:gap-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                const isLocked = item.id === "surpresa" || item.id === "presentes" || item.id === "despedida";

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 rounded-xl font-body transition-all duration-300 animate-fade-in-up ${
                      isActive
                        ? "bg-primary/10 border border-primary/20 text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
                    <span className="flex-1 text-left text-sm md:text-base">{item.label}</span>
                    {isLocked && (
                      <Sparkles className="w-4 h-4 text-gold animate-pulse-soft flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Navigation;