import { useState } from "react";
import { Mic, Play, Pause, Volume2, Waves } from "lucide-react";

interface Audio {
  id: string;
  title: string;
  src: string;
}

// Áudios configuráveis - adicione seus áudios aqui
const audios: Audio[] = [
  { id: "1", title: "Mensagem de bom dia", src: "" },
  { id: "2", title: "Declaração especial", src: "" },
  { id: "3", title: "Momento de carinho", src: "" },
];

const AudiosSection = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <section className="min-h-screen py-16 px-4 relative">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-rose/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl glass glow-blue mb-6">
            <Mic className="w-10 h-10 text-primary" style={{ filter: "drop-shadow(0 0 10px hsl(222 63% 50% / 0.5))" }} />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4 tracking-wide">
            Áudios
          </h2>
          <p className="text-muted-foreground font-body font-light max-w-lg mx-auto leading-relaxed">
            Mensagens de voz gravadas com todo carinho, para você ouvir sempre que sentir saudade
          </p>
          <div className="divider-elegant w-32 mx-auto mt-8" />
        </div>

        {/* Audio List */}
        <div className="space-y-5">
          {audios.map((audio, index) => (
            <div
              key={audio.id}
              className="glass-strong rounded-2xl p-6 hover:glow-blue transition-all duration-500 animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <div className="flex items-center gap-5">
                {/* Play Button */}
                <button
                  onClick={() => togglePlay(audio.id)}
                  className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    playingId === audio.id 
                      ? "bg-gradient-to-br from-rose to-primary glow-rose" 
                      : "bg-gradient-to-br from-primary/80 to-primary hover:from-rose hover:to-primary"
                  } group-hover:scale-105`}
                >
                  {playingId === audio.id ? (
                    <Pause className="w-7 h-7 text-primary-foreground" />
                  ) : (
                    <Play className="w-7 h-7 text-primary-foreground ml-1" />
                  )}
                </button>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl text-foreground mb-3">
                    {audio.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          playingId === audio.id 
                            ? "w-1/3 bg-gradient-to-r from-rose to-gold animate-pulse" 
                            : "w-0 bg-primary"
                        }`}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground font-body">
                      {playingId === audio.id ? "Tocando..." : "0:00"}
                    </span>
                  </div>
                </div>

                {/* Waveform indicator */}
                <div className="hidden md:flex items-center gap-1">
                  {playingId === audio.id ? (
                    <Waves className="w-6 h-6 text-rose animate-pulse" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
              </div>

              {audio.src && <audio src={audio.src} className="hidden" />}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {audios.length === 0 && (
          <div className="text-center py-20 glass rounded-2xl">
            <Mic className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-body">
              Nenhum áudio adicionado ainda
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-muted-foreground/50 text-sm font-body font-light flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-gold/30" />
            Cada voz carrega um pedacinho de amor
            <span className="w-8 h-px bg-gold/30" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default AudiosSection;