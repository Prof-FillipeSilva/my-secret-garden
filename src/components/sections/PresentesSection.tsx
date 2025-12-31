import { useState, useRef } from "react";
import {
  Gift,
  Play,
  Pause,
  Heart,
  Sparkles,
  Music,
  Image as ImageIcon,
  Volume2
} from "lucide-react";
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
    src: "/audio/blusa.ogg",
    photoSrc: "/assets/camisa.webp",
    photoAlt: "Salve o Corinthians"
  },
  {
    id: "2",
    title: "A garrafinha",
    src: "/audio/garrafinha.ogg",
    photoSrc: "/assets/garrafa.webp",
    photoAlt: "Pra lembrar de beber água kkk"
  },
  {
    id: "3",
    title: "A foto",
    src: "/audio/foto.ogg",
    photoSrc: "/assets/bg-2.jpeg",
    photoAlt: "Esse dia 💙"
  },
  {
    id: "4",
    title: "A rosa azul",
    src: "/audio/rosa.ogg",
    photoSrc: "/assets/rosa.webp",
    photoAlt: "O impossível, o extraordinário"
  },
  {
    id: "5",
    title: "O ursinho",
    src: "/audio/rosa.ogg",
    photoSrc: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
    photoAlt: "Um momento bobo que vai estar sempre aqui"
  }
];

interface PresentesContentProps {
  onLastAudioPlayed: () => void;
}

const PresentesContent = ({ onLastAudioPlayed }: PresentesContentProps) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [volume, setVolume] = useState<{ [key: string]: number }>({});
  const [introPlaying, setIntroPlaying] = useState(false);
  const [introProgress, setIntroProgress] = useState(0);
  const [introVolume, setIntroVolume] = useState(1);

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const introAudioRef = useRef<HTMLAudioElement>(null);

  // =======================
  // INTRO AUDIO CONTROLS
  // =======================
  const toggleIntro = () => {
    const audio = introAudioRef.current;
    if (!audio) return;

    Object.values(audioRefs.current).forEach(a => a?.pause());
    setPlayingId(null);

    if (introPlaying) {
      audio.pause();
      setIntroPlaying(false);
    } else {
      audio.play();
      setIntroPlaying(true);
    }
  };

  const handleIntroTimeUpdate = () => {
    const audio = introAudioRef.current;
    if (!audio || !audio.duration) return;

    setIntroProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleIntroSeek = (percent: number) => {
    const audio = introAudioRef.current;
    if (!audio || !audio.duration) return;

    audio.currentTime = (percent / 100) * audio.duration;
  };

  const handleIntroVolume = (value: number) => {
    const audio = introAudioRef.current;
    if (!audio) return;

    audio.volume = value;
    setIntroVolume(value);
  };

  const handleIntroEnded = () => {
    setIntroPlaying(false);
    setIntroProgress(0);
  };

  // =======================
  // AUDIO ITEMS CONTROLS
  // =======================
  const togglePlay = (id: string) => {
    if (introAudioRef.current) {
      introAudioRef.current.pause();
      setIntroPlaying(false);
    }

    Object.entries(audioRefs.current).forEach(([key, audio]) => {
      if (key !== id) audio?.pause();
    });

    const audio = audioRefs.current[id];
    if (!audio) return;

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
    if (!audio || !audio.duration) return;

    setProgress(prev => ({
      ...prev,
      [id]: (audio.currentTime / audio.duration) * 100
    }));
  };

  const handleSeek = (id: string, percent: number) => {
    const audio = audioRefs.current[id];
    if (!audio || !audio.duration) return;

    audio.currentTime = (percent / 100) * audio.duration;
  };

  const handleVolumeChange = (id: string, value: number) => {
    const audio = audioRefs.current[id];
    if (!audio) return;

    audio.volume = value;
    setVolume(prev => ({ ...prev, [id]: value }));
  };

  const handleEnded = (id: string) => {
    setPlayingId(null);
    setProgress(prev => ({ ...prev, [id]: 0 }));

    if (id === audioItems[audioItems.length - 1].id) {
      onLastAudioPlayed();
    }
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
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-display mb-4">
            <span className="text-gradient-royal">Seus Presentes</span>
          </h2>
          <p className="text-muted-foreground">
            Como expliquei no início, cada áudio representa um dos presentes, segue a sequência certinho...
          </p>
        </div>

        {/* INTRODUÇÃO */}
        <div className="glass-strong rounded-3xl p-8 mb-10">
          <h3 className="text-2xl mb-4 flex items-center gap-2">
            <Heart className="text-primary" /> Introdução
          </h3>

          <button onClick={toggleIntro} className="mb-4">
            {introPlaying ? <Pause /> : <Play />}
          </button>

          {/* SEEK INTRO */}
          <div
            className="relative h-2 bg-secondary rounded-full cursor-pointer mb-3"
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = ((e.clientX - rect.left) / rect.width) * 100;
              handleIntroSeek(percent);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              style={{ width: `${introProgress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"
              style={{ left: `calc(${introProgress}% - 6px)` }}
            />
          </div>

          {/* VOLUME INTRO */}
          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={introVolume}
              onChange={e => handleIntroVolume(Number(e.target.value))}
            />
          </div>

          <audio
            ref={introAudioRef}
            src="/audio/presentes.ogg"
            onTimeUpdate={handleIntroTimeUpdate}
            onEnded={handleIntroEnded}
            preload="metadata"
          />
        </div>

        {/* AUDIO ITEMS */}
        <div className="space-y-10">
          {audioItems.map(item => (
            <div key={item.id} className="glass-strong p-8 rounded-3xl">
              <h3 className="text-2xl mb-4 flex gap-2">
                <Music className="text-primary" /> {item.title}
              </h3>

              <button onClick={() => togglePlay(item.id)}>
                {playingId === item.id ? <Pause /> : <Play />}
              </button>

              {/* SEEK */}
              <div
                className="relative h-2 bg-secondary rounded-full cursor-pointer my-3"
                onClick={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = ((e.clientX - rect.left) / rect.width) * 100;
                  handleSeek(item.id, percent);
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ width: `${progress[item.id] || 0}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"
                  style={{ left: `calc(${progress[item.id] || 0}% - 6px)` }}
                />
              </div>

              {/* VOLUME */}
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume[item.id] ?? 1}
                  onChange={e =>
                    handleVolumeChange(item.id, Number(e.target.value))
                  }
                />
              </div>

              <audio
                ref={el => (audioRefs.current[item.id] = el)}
                src={item.src}
                preload="metadata"
                onTimeUpdate={() => handleTimeUpdate(item.id)}
                onEnded={() => handleEnded(item.id)}
              />

              <img
                src={item.photoSrc}
                alt={item.photoAlt}
                className="rounded-xl mt-6"
              />
            </div>
          ))}
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
      waitingMessage="Essa parte aqui, só amanhã, a Ket vai se encarregar de me falar kkk, pode ser que essa contagem mude, who knows?"
    >
      <PresentesContent onLastAudioPlayed={onLastAudioPlayed} />
    </LockedSection>
  );
};

export default PresentesSection;
