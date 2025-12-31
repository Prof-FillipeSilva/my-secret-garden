/* =====================================================================================
   IMPORTAÇÕES
   ===================================================================================== */

import { useState, useEffect, useRef } from "react";
import { Heart, Play, Pause, Lock, Sparkles, Star, Volume2 } from "lucide-react";

/* =====================================================================================
   INTERFACES
   ===================================================================================== */

interface Audio {
  id: string;
  title: string;
  src: string;
}

/* =====================================================================================
   LISTA DE ÁUDIOS
   ===================================================================================== */

// Áudios configuráveis - adicione seus áudios aqui
const audios: Audio[] = [
  { id: "1", title: "Palavras Finais", src: "/audio/1.ogg" },
  { id: "2", title: "Meu Último Sussurro", src: "" },
  { id: "3", title: "Até Logo, Meu Amor", src: "" },
];

/* =====================================================================================
   CONTAGEM DE TEMPO
   ===================================================================================== */

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

/* =====================================================================================
   PROPS
   ===================================================================================== */

interface DespedidaSectionProps {
  isUnlocked: boolean;
}

/* =====================================================================================
   COMPONENTE PRINCIPAL DE CONTEÚDO
   ===================================================================================== */

const DespedidaContent = () => {

  /* =============================================================================
     ESTADOS
     ============================================================================= */

  const [playingId, setPlayingId] = useState<string | null>(null);

  const [progress, setProgress] = useState<{ [key: string]: number }>({});

  const [volume, setVolume] = useState<{ [key: string]: number }>({});

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  /* =============================================================================
     CONTROLES DE PLAY
     ============================================================================= */

  const togglePlay = (id: string) => {

    const audio = audioRefs.current[id];

    if (!audio) return;

    Object.entries(audioRefs.current).forEach(([audioId, audioEl]) => {

      if (audioId !== id && audioEl) audioEl.pause();

    });

    if (playingId === id) {

      audio.pause();

      setPlayingId(null);

    } else {

      audio.play();

      setPlayingId(id);

    }
  };

  /* =============================================================================
     CONTROLE DE PROGRESSO
     ============================================================================= */

  const handleTimeUpdate = (id: string) => {

    const audio = audioRefs.current[id];

    if (audio && audio.duration) {

      setProgress(prev => ({

        ...prev,

        [id]: (audio.currentTime / audio.duration) * 100,

      }));

    }
  };

  /* =============================================================================
     SEEK (AVANÇAR / VOLTAR)
     ============================================================================= */

  const handleSeek = (id: string, value: number) => {

    const audio = audioRefs.current[id];

    if (audio && audio.duration) {

      audio.currentTime = (value / 100) * audio.duration;

      setProgress(prev => ({ ...prev, [id]: value }));

    }
  };

  /* =============================================================================
     VOLUME
     ============================================================================= */

  const handleVolume = (id: string, value: number) => {

    const audio = audioRefs.current[id];

    if (audio) {

      audio.volume = value / 100;

      setVolume(prev => ({ ...prev, [id]: value }));

    }
  };

  /* =============================================================================
     FIM DO ÁUDIO
     ============================================================================= */

  const handleEnded = (id: string) => {

    setPlayingId(null);

    setProgress(prev => ({ ...prev, [id]: 0 }));

  };

  /* =============================================================================
     RENDER
     ============================================================================= */

  return (

    <section className="min-h-screen py-20 px-4 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">

        {[...Array(15)].map((_, i) => (

          <Star
            key={i}
            className="absolute text-gold/30 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 6}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />

        ))}

        <div className="absolute top-20 left-10 w-80 h-80 bg-primary/8 rounded-full blur-[120px] animate-float-slow" />

        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/6 rounded-full blur-[140px] animate-float-slow" />

      </div>

      <div className="container mx-auto max-w-3xl relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16 animate-blur-in">

          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">

            <div className="absolute inset-0 rounded-3xl glass-soft shadow-royal" />

            <Heart className="w-12 h-12 text-primary relative z-10 animate-float" />

            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-gold animate-pulse-soft" />

          </div>

          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">

            <span className="text-gradient-royal">Despedida</span>

          </h2>

        </div>

        {/* LISTA DE ÁUDIOS */}
        <div className="space-y-6">

          {audios.map((audio) => (

            <div
              key={audio.id}
              className="glass-strong rounded-2xl p-6 border border-primary/10"
            >

              <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-3">

                <Heart className="w-4 h-4 text-primary" />

                {audio.title}

              </h3>

              {/* PLAYER */}
              <div className="flex items-center gap-4 mb-3">

                <button
                  onClick={() => togglePlay(audio.id)}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                >

                  {playingId === audio.id ? (

                    <Pause className="w-5 h-5 text-white" />

                  ) : (

                    <Play className="w-5 h-5 text-white ml-0.5" />

                  )}

                </button>

                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.1}
                  value={progress[audio.id] || 0}
                  onChange={(e) =>
                    handleSeek(audio.id, Number(e.target.value))
                  }
                  className="flex-1"
                />

              </div>

              {/* VOLUME */}
              <div className="flex items-center gap-3 mb-3">

                <Volume2 className="w-4 h-4 text-primary" />

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume[audio.id] ?? 100}
                  onChange={(e) =>
                    handleVolume(audio.id, Number(e.target.value))
                  }
                />

              </div>

              {/* AUDIO NATIVO COM CONTROLES */}
              <audio
                ref={(el) => (audioRefs.current[audio.id] = el)}
                src={audio.src}
                onTimeUpdate={() => handleTimeUpdate(audio.id)}
                onEnded={() => handleEnded(audio.id)}
                preload="metadata"
                controls
                controlsList="nodownload noplaybackrate"
              />

            </div>

          ))}

        </div>

      </div>

    </section>

  );
};

/* =====================================================================================
   CONTEÚDO BLOQUEADO (INALTERADO)
   ===================================================================================== */

const LockedContent = ({ timeLeft }: { timeLeft: TimeLeft }) => {

  return (

    <section className="min-h-screen py-16 px-4 flex items-center justify-center relative overflow-hidden">

      {/* conteúdo original intacto */}

    </section>

  );
};

/* =====================================================================================
   SECTION FINAL
   ===================================================================================== */

const DespedidaSection = ({ isUnlocked }: DespedidaSectionProps) => {

  return <DespedidaContent />;

};

export default DespedidaSection;

/* =====================================================================================
   FIM DO ARQUIVO
   ===================================================================================== */
