import { useState } from "react";
import { Image, X, ChevronLeft, ChevronRight } from "lucide-react";

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
    <section className="min-h-screen gradient-royal py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-4">
            <Image className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-3">
            Galeria de Fotos
          </h2>
          <p className="text-primary-foreground/70 font-body max-w-md mx-auto">
            Momentos eternizados, memórias que guardaremos para sempre
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {fotos.map((foto, index) => (
            <div
              key={foto.id}
              onClick={() => openLightbox(index)}
              className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group animate-scale-in"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <img
                src={foto.src}
                alt={foto.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                  <Image className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {fotos.length === 0 && (
          <div className="text-center py-16">
            <Image className="w-16 h-16 text-primary-foreground/30 mx-auto mb-4" />
            <p className="text-primary-foreground/60 font-body">
              Nenhuma foto adicionada ainda
            </p>
          </div>
        )}

        {/* Footer Note */}
        <p className="text-center text-primary-foreground/50 text-sm mt-12 font-body">
          📸 Cada foto conta uma história nossa
        </p>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-xl flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-primary-foreground transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-primary-foreground transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-primary-foreground transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] p-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={fotos[selectedIndex].src}
              alt={fotos[selectedIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-romantic"
            />
            <p className="text-center text-primary-foreground/70 mt-4 font-body">
              {fotos[selectedIndex].alt}
            </p>
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-primary-foreground/60 font-body text-sm">
            {selectedIndex + 1} / {fotos.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default FotosSection;
