import { useState } from "react";
import { Image, X, ChevronLeft, ChevronRight, Heart, Sparkles } from "lucide-react";

interface Foto {
  id: string;
  src: string;
  alt: string;
}

// Fotos configuráveis - adicione suas fotos aqui
const fotos: Foto[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800", alt: "Momento especial 1" },
  { id: "2", src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800", alt: "Momento especial 2" },
  { id: "3", src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", alt: "Momento especial 3" },
  { id: "4", src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800", alt: "Momento especial 4" },
  { id: "5", src: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800", alt: "Momento especial 5" },
  { id: "6", src: "https://images.unsplash.com/photo-1501901609772-df0848060b33?w=800", alt: "Momento especial 6" },
];

const FotosSection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "";
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? fotos.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === fotos.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <section className="min-h-screen section-royal py-16 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-rose/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl glass glow-gold mb-6">
            <Image className="w-10 h-10 text-gold" style={{ filter: "drop-shadow(0 0 10px hsl(43 70% 55% / 0.5))" }} />
            <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-rose animate-twinkle" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4 tracking-wide">
            Galeria de Fotos
          </h2>
          <p className="text-muted-foreground font-body font-light max-w-lg mx-auto leading-relaxed">
            Momentos eternizados, memórias que guardaremos para sempre
          </p>
          <div className="divider-elegant w-32 mx-auto mt-8" />
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {fotos.map((foto, index) => (
            <div
              key={foto.id}
              onClick={() => openLightbox(index)}
              className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group animate-scale-in"
              style={{ animationDelay: `${index * 0.08 + 0.2}s` }}
            >
              <img
                src={foto.src}
                alt={foto.alt}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Hover content */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl glass-strong flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                  <Heart className="w-7 h-7 text-rose" />
                </div>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl border border-gold/0 group-hover:border-gold/30 transition-all duration-500 group-hover:glow-gold" />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {fotos.length === 0 && (
          <div className="text-center py-20 glass rounded-2xl">
            <Image className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-body">
              Nenhuma foto adicionada ainda
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p className="text-muted-foreground/50 text-sm font-body font-light flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-gold/30" />
            Cada foto conta uma história nossa
            <span className="w-8 h-px bg-gold/30" />
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-foreground hover:glow-rose transition-all duration-300 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-foreground hover:glow-gold transition-all duration-300 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-foreground hover:glow-gold transition-all duration-300 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] p-4 md:p-8" onClick={(e) => e.stopPropagation()}>
            <img
              src={fotos[selectedIndex].src}
              alt={fotos[selectedIndex].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-romantic animate-scale-in"
            />
            <p className="text-center text-muted-foreground/70 mt-6 font-body">
              {fotos[selectedIndex].alt}
            </p>
          </div>

          {/* Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-full font-body text-sm text-foreground/80">
            {selectedIndex + 1} / {fotos.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default FotosSection;