import { useState } from "react";
import { Mic, Play, Pause, Volume2 } from "lucide-react";

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
    <section className="min-h-screen gradient-romantic py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Mic className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            Áudios
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Mensagens de voz gravadas com todo carinho, para você ouvir sempre que sentir saudade
          </p>
        </div>

        {/* Audio List */}
        <div className="space-y-4">
          {audios.map((audio, index) => (
            <div
              key={audio.id}
              className="bg-card rounded-xl p-6 shadow-soft border border-border/50 hover:shadow-romantic transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                {/* Play Button */}
                <button
                  onClick={() => togglePlay(audio.id)}
                  className="flex-shrink-0 w-14 h-14 rounded-full bg-primary hover:bg-rose text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  {playingId === audio.id ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </button>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg text-foreground truncate">
                    {audio.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-primary rounded-full transition-all duration-300 ${
                          playingId === audio.id ? "w-1/3 animate-pulse" : "w-0"
                        }`}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-body">
                      {playingId === audio.id ? "Reproduzindo..." : "0:00"}
                    </span>
                  </div>
                </div>

                {/* Volume */}
                <div className="hidden md:flex items-center gap-2 text-muted-foreground">
                  <Volume2 className="w-5 h-5" />
                </div>
              </div>

              {/* Audio element placeholder */}
              {audio.src && (
                <audio src={audio.src} className="hidden" />
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {audios.length === 0 && (
          <div className="text-center py-16">
            <Mic className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-body">
              Nenhum áudio adicionado ainda
            </p>
          </div>
        )}

        {/* Note */}
        <p className="text-center text-muted-foreground/60 text-sm mt-12 font-body">
          💙 Cada voz carrega um pedacinho de amor
        </p>
      </div>
    </section>
  );
};

export default AudiosSection;
