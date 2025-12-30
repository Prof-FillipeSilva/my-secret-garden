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
    <section className="min-h-screen py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -left-20 md:-left-40 w-60 md:w-80 h-60 md:h-80 bg-primary/6 rounded-full blur-[80px] md:blur-[100px]" />
        <div className="absolute bottom-1/3 -right-20 md:-right-40 w-72 md:w-96 h-72 md:h-96 bg-sky/5 rounded-full blur-[100px] md:blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 px-2">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
          <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl glass-soft shadow-soft border border-primary/20 mb-4 md:mb-6">
            <Image className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            <Sparkles className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-4 h-4 md:w-5 md:h-5 text-sky/60 animate-twinkle" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 md:mb-4 tracking-wide">
            Galeria de Fotos
          </h2>
          <p className="text-muted-foreground font-body font-light max-w-lg mx-auto leading-relaxed text-sm md:text-base px-4">
            Momentos eternizados, memórias que guardaremos para sempre
          </p>
          <div className="divider-elegant w-24 md:w-32 mx-auto mt-6 md:mt-8" />
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {fotos.map((foto, index) => (
            <div
              key={foto.id}
              onClick={() => openLightbox(index)}
              className="relative aspect-square overflow-hidden rounded-xl md:rounded-2xl cursor-pointer group animate-scale-in border border-primary/10 shadow-soft"
              style={{ animationDelay: `${index * 0.08 + 0.2}s` }}
            >
              <img
                src={foto.src}
                alt={foto.alt}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-royal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Hover content */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl glass-strong flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500 shadow-soft">
                  <Heart className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-primary/0 group-hover:border-primary/40 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {fotos.length === 0 && (
          <div className="text-center py-16 md:py-20 glass-soft rounded-xl md:rounded-2xl border border-primary/10">
            <Image className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground/30 mx-auto mb-3 md:mb-4" />
            <p className="text-muted-foreground font-body text-sm md:text-base">
              Nenhuma foto adicionada ainda
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-10 md:mt-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p className="text-muted-foreground/60 text-xs md:text-sm font-body font-light flex items-center justify-center gap-2">
            <span className="w-6 md:w-8 h-px bg-primary/30" />
            Cada foto conta uma história nossa
            <span className="w-6 md:w-8 h-px bg-primary/30" />
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-royal/95 backdrop-blur-xl flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] p-2 md:p-4 lg:p-8" onClick={(e) => e.stopPropagation()}>
            <img
              src={fotos[selectedIndex].src}
              alt={fotos[selectedIndex].alt}
              className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain rounded-xl md:rounded-2xl shadow-romantic animate-scale-in"
            />
            <p className="text-center text-white/70 mt-4 md:mt-6 font-body text-sm md:text-base">
              {fotos[selectedIndex].alt}
            </p>
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 glass px-4 md:px-6 py-2 md:py-3 rounded-full font-body text-xs md:text-sm text-white/80">
            {selectedIndex + 1} / {fotos.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default FotosSection;
