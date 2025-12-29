import { useState, useEffect } from "react";
import { Mic, PenLine, Image, Music, Gift, Menu, X, Heart, Sparkles } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "poemas", label: "Poemas", icon: PenLine },
  { id: "fotos", label: "Fotos", icon: Image },
  { id: "musicas", label: "Músicas", icon: Music },
  { id: "audios", label: "Áudios", icon: Mic },
  { id: "surpresa", label: "Surpresa", icon: Gift },
];

const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-strong shadow-soft py-3 border-b border-primary/10" : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => handleNavigate("poemas")}>
              <div className="relative">
                <Heart className="w-7 h-7 text-primary transition-transform group-hover:scale-110" />
                <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-sky/60 animate-twinkle" />
              </div>
              <span className="font-display text-xl text-foreground tracking-wide hidden sm:block">
                Nosso Amor
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                const isSurprise = item.id === "surpresa";

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm transition-all duration-300 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20" />
                    )}
                    <Icon className={`w-4 h-4 relative z-10 ${isActive ? "text-primary" : ""}`} />
                    <span className="relative z-10">{item.label}</span>
                    {isSurprise && (
                      <Sparkles className="w-3 h-3 text-gold animate-pulse-soft relative z-10" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 glass-soft rounded-xl text-foreground transition-all duration-300 hover:shadow-soft border border-primary/20"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden animate-fade-in">
          <div 
            className="absolute inset-0 bg-background/60 backdrop-blur-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-20 left-4 right-4 glass-strong rounded-2xl p-6 animate-scale-in shadow-romantic border border-primary/20">
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                const isSurprise = item.id === "surpresa";

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`flex items-center gap-4 px-5 py-4 rounded-xl font-body transition-all duration-300 animate-fade-in-up ${
                      isActive
                        ? "bg-primary/10 border border-primary/20 text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {isSurprise && (
                      <Sparkles className="w-4 h-4 text-gold animate-pulse-soft" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default Navigation;
