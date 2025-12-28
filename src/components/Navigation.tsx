import { useState } from "react";
import { Mic, PenLine, Image, Music, Gift, Menu, X, Heart } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "audios", label: "Áudios", icon: Mic },
  { id: "poemas", label: "Poemas", icon: PenLine },
  { id: "fotos", label: "Fotos", icon: Image },
  { id: "musicas", label: "Músicas", icon: Music },
  { id: "surpresa", label: "Surpresa", icon: Gift },
];

const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose" />
              <span className="font-display text-lg text-foreground">Nosso Amor</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                const isSurprise = item.id === "surpresa";

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    } ${isSurprise ? "text-gold hover:text-gold" : ""}`}
                  >
                    <Icon className={`w-4 h-4 ${isSurprise && !isActive ? "text-gold" : ""}`} />
                    <span>{item.label}</span>
                    {isSurprise && (
                      <span className="text-xs">🎁</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-card border-b border-border shadow-romantic animate-fade-in">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  const isSurprise = item.id === "surpresa";

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body text-base transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      } ${isSurprise ? "text-gold hover:text-gold" : ""}`}
                    >
                      <Icon className={`w-5 h-5 ${isSurprise && !isActive ? "text-gold" : ""}`} />
                      <span>{item.label}</span>
                      {isSurprise && (
                        <span className="ml-auto">🎁</span>
                      )}
                    </button>
                  );
                })}
              </div>
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
