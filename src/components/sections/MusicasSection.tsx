import { useState } from "react";
import { Music, Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react";

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

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? musicas.length - 1 : currentIndex - 1);
  };

  const playNext = () => {
    setCurrentIndex(currentIndex === musicas.length - 1 ? 0 : currentIndex + 1);
  };

  const selectMusic = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  return (
    <section className="min-h-screen gradient-romantic py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-4">
            <Music className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            Músicas
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            A trilha sonora do nosso amor, cada música com um significado especial
          </p>
        </div>

        {/* Main Player */}
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-romantic border border-border/30 mb-8 animate-scale-in">
          {/* Album Art Placeholder */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 rounded-xl bg-gradient-royal overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Music className="w-20 h-20 text-primary-foreground/50" />
            </div>
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full flex items-end justify-center gap-1 p-8">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 bg-primary-foreground/70 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 60 + 20}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Current Track Info */}
          <div className="text-center mb-6">
            <h3 className="font-display text-xl md:text-2xl text-foreground mb-1">
              {currentMusic.title}
            </h3>
            <p className="text-muted-foreground font-body">
              {currentMusic.artist}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs text-muted-foreground font-body w-10">0:00</span>
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full bg-primary rounded-full transition-all duration-300 ${
                  isPlaying ? "w-1/4 animate-pulse" : "w-0"
                }`}
              />
            </div>
            <span className="text-xs text-muted-foreground font-body w-10">3:45</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={playPrevious}
              className="w-12 h-12 rounded-full bg-secondary hover:bg-muted flex items-center justify-center text-foreground transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-primary hover:bg-rose text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7" />
              ) : (
                <Play className="w-7 h-7 ml-1" />
              )}
            </button>

            <button
              onClick={playNext}
              className="w-12 h-12 rounded-full bg-secondary hover:bg-muted flex items-center justify-center text-foreground transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <div className="w-24 h-1 bg-secondary rounded-full">
              <div className="w-3/4 h-full bg-muted-foreground rounded-full" />
            </div>
          </div>
        </div>

        {/* Playlist */}
        <div className="bg-card rounded-xl p-4 shadow-soft border border-border/30">
          <h4 className="font-display text-lg text-foreground mb-4 px-2">
            Playlist
          </h4>
          <div className="space-y-1">
            {musicas.map((musica, index) => (
              <button
                key={musica.id}
                onClick={() => selectMusic(index)}
                className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
                  currentIndex === index
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-secondary text-foreground"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  currentIndex === index ? "bg-primary" : "bg-secondary"
                }`}>
                  {currentIndex === index && isPlaying ? (
                    <div className="flex items-end gap-0.5 h-4">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-0.5 bg-primary-foreground rounded-full animate-pulse"
                          style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  ) : (
                    <Music className={`w-4 h-4 ${currentIndex === index ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-body font-medium text-sm truncate">{musica.title}</p>
                  <p className="font-body text-xs text-muted-foreground truncate">{musica.artist}</p>
                </div>
                {currentIndex === index && (
                  <Heart className="w-4 h-4 text-rose" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-muted-foreground/60 text-sm mt-12 font-body">
          🎵 Cada nota é uma memória nossa
        </p>
      </div>
    </section>
  );
};

export default MusicasSection;
