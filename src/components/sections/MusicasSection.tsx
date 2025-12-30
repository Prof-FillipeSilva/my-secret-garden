import { useState } from "react";
import { Music, Play, Pause, SkipBack, SkipForward, Volume2, Heart, Disc } from "lucide-react";

interface Musica {
  id: string;
  title: string;
  artist: string;
  src: string;
}

// Músicas configuráveis - adicione suas músicas aqui
const musicas: Musica[] = [
  { id: "1", title: "Nossa Canção", artist: "Artista Especial", src: "" },
  { id: "2", title: "Momentos Juntos", artist: "Banda Favorita", src: "" },
  { id: "3", title: "Para Sempre", artist: "Cantor Romântico", src: "" },
  { id: "4", title: "Amor Eterno", artist: "Duo Musical", src: "" },
];

const MusicasSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentMusic = musicas[currentIndex];

  const togglePlay = () => setIsPlaying(!isPlaying);
  const playPrevious = () => setCurrentIndex(currentIndex === 0 ? musicas.length - 1 : currentIndex - 1);
  const playNext = () => setCurrentIndex(currentIndex === musicas.length - 1 ? 0 : currentIndex + 1);
  const selectMusic = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  return (
    <section className="min-h-screen py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-5 md:right-20 w-60 md:w-80 h-60 md:h-80 bg-primary/5 rounded-full blur-[100px] md:blur-[120px]" />
        <div className="absolute bottom-40 left-5 md:left-20 w-72 md:w-96 h-72 md:h-96 bg-sky/6 rounded-full blur-[120px] md:blur-[140px]" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10 px-2">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
          <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl glass-soft shadow-soft border border-primary/20 mb-4 md:mb-6">
            <Music className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 md:mb-4 tracking-wide">
            Músicas
          </h2>
          <p className="text-muted-foreground font-body font-light max-w-lg mx-auto leading-relaxed text-sm md:text-base px-4">
            A trilha sonora do nosso amor, cada música com um significado especial
          </p>
          <div className="divider-elegant w-24 md:w-32 mx-auto mt-6 md:mt-8" />
        </div>

        {/* Main Player */}
        <div className="glass-strong rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 mb-6 md:mb-8 animate-scale-in hover:shadow-romantic transition-all duration-500 border border-primary/10">
          {/* Album Art */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto mb-6 md:mb-8">
            <div className={`w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-sky/30 flex items-center justify-center ${isPlaying ? "animate-rotate-slow" : ""}`}>
              <div className="w-4/5 h-4/5 rounded-full glass flex items-center justify-center">
                <Disc className="w-10 h-10 md:w-16 md:h-16 text-primary/60" />
              </div>
              {/* Center hole */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-background" />
            </div>
            
            {/* Glow effect when playing */}
            {isPlaying && (
              <div className="absolute inset-0 rounded-full glow-royal animate-pulse-soft opacity-50" />
            )}
          </div>

          {/* Current Track Info */}
          <div className="text-center mb-6 md:mb-8">
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-foreground mb-1 md:mb-2 tracking-wide">
              {currentMusic.title}
            </h3>
            <p className="text-muted-foreground font-body font-light text-sm md:text-base">
              {currentMusic.artist}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 max-w-md mx-auto">
            <span className="text-xs text-muted-foreground font-body w-8 md:w-10">0:00</span>
            <div className="flex-1 h-1 md:h-1.5 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isPlaying ? "w-1/4 bg-gradient-to-r from-primary to-sky animate-pulse" : "w-0 bg-primary"
                }`}
              />
            </div>
            <span className="text-xs text-muted-foreground font-body w-8 md:w-10">3:45</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <button
              onClick={playPrevious}
              className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl glass flex items-center justify-center text-foreground hover:glow-royal transition-all duration-300"
            >
              <SkipBack className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <button
              onClick={togglePlay}
              className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-105 ${
                isPlaying 
                  ? "bg-gradient-to-br from-sky to-primary glow-royal" 
                  : "bg-gradient-to-br from-primary to-sky glow-royal"
              }`}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
              ) : (
                <Play className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground ml-0.5 md:ml-1" />
              )}
            </button>

            <button
              onClick={playNext}
              className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl glass flex items-center justify-center text-foreground hover:glow-royal transition-all duration-300"
            >
              <SkipForward className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center justify-center gap-2 md:gap-3 mt-6 md:mt-8">
            <Volume2 className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
            <div className="w-20 md:w-24 h-1 md:h-1.5 bg-secondary rounded-full">
              <div className="w-3/4 h-full bg-primary/60 rounded-full" />
            </div>
          </div>
        </div>

        {/* Playlist */}
        <div className="glass-strong rounded-xl md:rounded-2xl p-4 md:p-6 animate-fade-in-up border border-primary/10" style={{ animationDelay: "0.3s" }}>
          <h4 className="font-display text-lg md:text-xl text-foreground mb-4 md:mb-6 px-2">
            Playlist
          </h4>
          <div className="space-y-1.5 md:space-y-2">
            {musicas.map((musica, index) => (
              <button
                key={musica.id}
                onClick={() => selectMusic(index)}
                className={`w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl transition-all duration-300 ${
                  currentIndex === index
                    ? "glass glow-royal"
                    : "hover:bg-secondary/30"
                }`}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                  currentIndex === index 
                    ? "bg-gradient-to-br from-primary to-sky" 
                    : "bg-secondary/50"
                }`}>
                  {currentIndex === index && isPlaying ? (
                    <div className="flex items-end gap-0.5 h-4 md:h-5">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-0.5 md:w-1 bg-primary-foreground rounded-full animate-pulse"
                          style={{ 
                            height: `${40 + Math.random() * 60}%`,
                            animationDelay: `${i * 0.15}s` 
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <Music className={`w-4 h-4 md:w-5 md:h-5 ${currentIndex === index ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className={`font-body font-medium truncate text-sm md:text-base ${currentIndex === index ? "text-primary" : "text-foreground"}`}>
                    {musica.title}
                  </p>
                  <p className="font-body text-xs md:text-sm text-muted-foreground truncate">
                    {musica.artist}
                  </p>
                </div>
                {currentIndex === index && (
                  <Heart className="w-4 h-4 md:w-5 md:h-5 text-primary animate-pulse-soft flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-10 md:mt-16 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-muted-foreground/50 text-xs md:text-sm font-body font-light flex items-center justify-center gap-2">
            <span className="w-6 md:w-8 h-px bg-primary/30" />
            Cada nota é uma memória nossa
            <span className="w-6 md:w-8 h-px bg-primary/30" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default MusicasSection;
