import { useState } from "react";
import { Mic, Play, Pause, Volume2, Waves } from "lucide-react";
import LockedSection from "@/components/LockedSection";

interface Audio {
  id: string;
  title: string;
  src: string;
}

// Data de liberação: 30/12/2025 às 10h00
const RELEASE_DATE = new Date("2025-12-30T10:00:00");

// Áudios configuráveis - adicione seus áudios aqui
const audios: Audio[] = [
  { id: "1", title: "Mensagem de bom dia", src: "" },
  { id: "2", title: "Declaração especial", src: "" },
  { id: "3", title: "Momento de carinho", src: "" },
];

const AudiosContent = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <section className="min-h-screen py-20 px-4 relative">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-sky/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl glass-soft shadow-romantic mb-6 border border-primary/20">
            <Mic className="w-10 h-10 text-primary" />
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
              className="glass-strong rounded-2xl p-6 hover:shadow-romantic transition-all duration-500 animate-fade-in-up group border border-primary/10"
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <div className="flex items-center gap-5">
                {/* Play Button */}
                <button
                  onClick={() => togglePlay(audio.id)}
                  className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    playingId === audio.id 
                      ? "bg-gradient-to-br from-sky to-primary shadow-romantic" 
                      : "bg-gradient-to-br from-primary to-sky hover:shadow-romantic"
                  } group-hover:scale-105`}
                >
                  {playingId === audio.id ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  )}
                </button>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl text-foreground mb-2">
                    {audio.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          playingId === audio.id 
                            ? "w-1/3 bg-gradient-to-r from-primary to-sky animate-pulse" 
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
                    <Waves className="w-5 h-5 text-primary animate-pulse" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>

              {audio.src && <audio src={audio.src} className="hidden" />}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {audios.length === 0 && (
          <div className="text-center py-20 glass-soft rounded-2xl border border-primary/10">
            <Mic className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-body">
              Nenhum áudio adicionado ainda
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-muted-foreground/60 text-sm font-body font-light flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-primary/30" />
            Cada voz carrega um pedacinho de amor
            <span className="w-8 h-px bg-primary/30" />
          </p>
        </div>
      </div>
    </section>
  );
};

const AudiosSection = () => {
  return (
    <LockedSection
      releaseDate={RELEASE_DATE}
      icon={<Mic className="w-12 h-12 text-primary" />}
      title="Áudios"
      waitingMessage="As mensagens de voz estão guardadas com carinho, esperando o momento perfeito para tocar no seu coração."
    >
      <AudiosContent />
    </LockedSection>
  );
};

export default AudiosSection;
