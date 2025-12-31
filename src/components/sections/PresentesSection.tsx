import { useState, useRef, useEffect } from "react";
import { Gift, Play, Pause, Heart, Sparkles, Music, Image as ImageIcon } from "lucide-react";
import LockedSection from "@/components/LockedSection";

// Data de liberação: 31/12/2025 às 10h00
const RELEASE_DATE = new Date("2025-12-31T17:00:00");

interface AudioItem {
  id: string;
  title: string;
  src: string;
  photoSrc: string;
  photoAlt: string;
}

// Áudios configuráveis - adicione seus áudios e fotos aqui
const audioItems: AudioItem[] = [
  {
    id: "1",
    title: "A blusa",
    src: "",
    photoSrc: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
    photoAlt: "Salve o Corinthians"
  },
  {
    id: "2",
    title: "A garrafinha",
    src: "",
    photoSrc: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800",
    photoAlt: "Pra lembrar de beber água kkk"
  },
  {
    id: "3",
    title: "A foto",
    src: "",
    photoSrc: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
    photoAlt: "Esse dia 💙"
  },
  {
    id: "4",
    title: "A rosa azul",
    src: "/audio/1.mp3",
    photoSrc: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
    photoAlt: "O impossível, o extraordinário"
  },
  {
    id: "5",
    title: "O ursinho",
    src: "/audio/1.mp3",
    photoSrc: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
    photoAlt: "Um momento bobo que vai estar sempre aqui"
  },
];

interface PresentesContentProps {
  onLastAudioPlayed: () => void;
}

const PresentesContent = ({ onLastAudioPlayed }: PresentesContentProps) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [introPlaying, setIntroPlaying] = useState(false);
  const [introProgress, setIntroProgress] = useState(0);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const introAudioRef = useRef<HTMLAudioElement>(null);

  const toggleIntro = () => {
    const audio = introAudioRef.current;
    if (!audio) return;

    // Pause all other audios
    Object.values(audioRefs.current).forEach(audioEl => {
      if (audioEl) audioEl.pause();
    });
    setPlayingId(null);

    if (introPlaying) {
      audio.pause();
      setIntroPlaying(false);
    } else {
      audio.play();
      setIntroPlaying(true);
    }
  };

  const togglePlay = (id: string) => {
    const audio = audioRefs.current[id];
    if (!audio) return;

    // Pause intro
    if (introAudioRef.current) {
      introAudioRef.current.pause();
      setIntroPlaying(false);
    }

    // Pause all other audios
    Object.entries(audioRefs.current).forEach(([audioId, audioEl]) => {
      if (audioId !== id && audioEl) {
        audioEl.pause();
      }
    });

    if (playingId === id) {
      audio.pause();
      setPlayingId(null);
    } else {
      audio.play();
      setPlayingId(id);
    }
  };

  const handleTimeUpdate = (id: string) => {
    const audio = audioRefs.current[id];
    if (audio && audio.duration) {
      setProgress(prev => ({
        ...prev,
        [id]: (audio.currentTime / audio.duration) * 100
      }));
    }
  };

  const handleEnded = (id: string) => {
    setPlayingId(null);
    setProgress(prev => ({ ...prev, [id]: 0 }));
    
    // Check if it's the last audio
    if (id === audioItems[audioItems.length - 1].id) {
      onLastAudioPlayed();
    }
  };

  const handleIntroTimeUpdate = () => {
    const audio = introAudioRef.current;
    if (audio && audio.duration) {
      setIntroProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const handleIntroEnded = () => {
    setIntroPlaying(false);
    setIntroProgress(0);
  };

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-primary/30 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 16 + 8}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
        <div className="absolute top-20 left-10 w-80 h-80 bg-accent/6 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/6 rounded-full blur-[140px] animate-float-slow" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-blur-in">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-3xl glass-soft shadow-royal" />
            <Gift className="w-12 h-12 text-primary relative z-10 animate-float" />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-gold animate-pulse-soft" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4 tracking-wide">
            <span className="text-gradient-royal">Seus Presentes Especiais!</span>
          </h2>
          <p className="text-muted-foreground font-body font-light max-w-md mx-auto">
            Essa parte aqui só quando você receber a encomenda, amanhã kkk
          </p>
          <div className="divider-elegant w-32 mx-auto mt-8" />
        </div>

        {/* Intro Audio */}
        <div className="glass-strong rounded-3xl p-8 md:p-10 mb-10 animate-scale-in hover:shadow-royal transition-all duration-500 border border-primary/10">
          <h3 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
            <Heart className="w-5 h-5 text-primary" />
            Introdução
          </h3>
          <p className="text-muted-foreground font-body font-light mb-6">
            Como expliquei no início, cada áudio representa um dos presentes, esse é o de introdução...
          </p>

          <div className="flex items-center gap-5 p-5 glass-soft rounded-2xl border border-primary/10">
            <button
              onClick={toggleIntro}
              className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                introPlaying
                  ? "bg-gradient-to-br from-accent to-primary shadow-royal"
                  : "bg-gradient-to-br from-primary to-accent shadow-soft"
              } hover:scale-105`}
            >
              {introPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-0.5" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                    style={{ width: `${introProgress}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground font-body">
                  {introPlaying ? "Tocando..." : "0:00"}
                </span>
              </div>
            </div>
          </div>

          <audio
            ref={introAudioRef}
            src=""
            onTimeUpdate={handleIntroTimeUpdate}
            onEnded={handleIntroEnded}
            preload="metadata"
          />
        </div>

        {/* Audio Items with Photos */}
        <div className="space-y-8">
          {audioItems.map((item, index) => (
            <div
              key={item.id}
              className="glass-strong rounded-3xl p-8 md:p-10 animate-fade-in-up hover:shadow-royal transition-all duration-500 border border-primary/10"
              style={{ animationDelay: `${(index + 1) * 0.15}s` }}
            >
              {/* Title */}
              <h3 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
                <Music className="w-5 h-5 text-primary" />
                {item.title}
              </h3>

              {/* Audio Player */}
              <div className="flex items-center gap-5 p-5 glass-soft rounded-2xl border border-primary/10 mb-6">
                <button
                  onClick={() => togglePlay(item.id)}
                  className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    playingId === item.id
                      ? "bg-gradient-to-br from-accent to-primary shadow-royal"
                      : "bg-gradient-to-br from-primary to-accent shadow-soft"
                  } hover:scale-105`}
                >
                  {playingId === item.id ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                        style={{ width: `${progress[item.id] || 0}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground font-body min-w-[60px]">
                      {playingId === item.id ? "Tocando..." : "0:00"}
                    </span>
                  </div>
                </div>
              </div>

              <audio
                ref={el => audioRefs.current[item.id] = el}
                src={item.src}
                onTimeUpdate={() => handleTimeUpdate(item.id)}
                onEnded={() => handleEnded(item.id)}
                preload="metadata"
              />

              {/* Photo */}
              <div className="relative rounded-2xl overflow-hidden border border-primary/10">
                <div className="flex items-center gap-2 absolute top-4 left-4 z-10 glass-strong px-4 py-2 rounded-full">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  <span className="font-body text-sm text-foreground">Momento Especial</span>
                </div>
                <img
                  src={item.photoSrc}
                  alt={item.photoAlt}
                  className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <div className="inline-flex items-center gap-3 glass-strong px-8 py-4 rounded-full shadow-royal border border-primary/20">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-display text-xl text-gradient-royal">Como todo o amor que ainda sinto!</span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <p className="text-muted-foreground font-body text-sm mt-6 font-light">
            Que tenha sido especial pra você, também 💕
          </p>
        </div>
      </div>
    </section>
  );
};

interface PresentesSectionProps {
  onLastAudioPlayed: () => void;
}

const PresentesSection = ({ onLastAudioPlayed }: PresentesSectionProps) => {
  return (
    <LockedSection
      releaseDate={RELEASE_DATE}
      icon={<Gift className="w-12 h-12 text-primary" />}
      title="🎁 Presentes"
      waitingMessage="Estes presentes foram preparados com carinho, pensados em cada detalhe, e serão revelados no momento perfeito."
    >
      <PresentesContent onLastAudioPlayed={onLastAudioPlayed} />
    </LockedSection>
  );
};

export default PresentesSection;
