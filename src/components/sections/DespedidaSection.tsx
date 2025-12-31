import { useState, useEffect, useRef } from "react";
import { Heart, Play, Pause, Lock, Sparkles, Star } from "lucide-react";

interface Audio {
  id: string;
  title: string;
  src: string;
}

// Áudios configuráveis - adicione seus áudios aqui
const audios: Audio[] = [
  { id: "1", title: "Carta Aberta", src: "/audio/1.ogg" },
  { id: "2", title: "2026", src: "/audio/2.ogg" },
  { id: "3", title: " 'Frieza Total' ", src: "/audio/3.ogg" },
  { id: "4", title: "O silêncio", src: "/audio/4.ogg" },
  { id: "5", title: "Piloto Automático", src: "/audio/5.mp3" },
  { id: "6", title: "03/12/2025", src: "/audio/51.mp3" },
  { id: "7", title: "Por fim, fim...", src: "/audio/61.ogg" },
  
];

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

interface DespedidaSectionProps {
  isUnlocked: boolean;
}

const DespedidaContent = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const [volume, setVolume] = useState<{ [key: string]: number }>({});

  const handleVolumeChange = (id: string, value: number) => {
  const audio = audioRefs.current[id];
  if (!audio) return;

  audio.volume = value;
  setVolume(prev => ({
    ...prev,
    [id]: value
  }));
  };

  const handleSeek = (id: string, value: number) => {
  const audio = audioRefs.current[id];
  if (!audio || !audio.duration) return;

  const newTime = (value / 100) * audio.duration;
  audio.currentTime = newTime;

  setProgress(prev => ({
    ...prev,
    [id]: value
  }));
  };

  const togglePlay = (id: string) => {
  const audio = audioRefs.current[id];
  if (!audio) return;

  Object.entries(audioRefs.current).forEach(([audioId, audioEl]) => {
    if (audioId !== id && audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
      setProgress(prev => ({ ...prev, [audioId]: 0 }));
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
  };

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background */}
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
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/6 rounded-full blur-[140px] animate-float-slow" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-blur-in">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-3xl glass-soft shadow-royal" />
            <Heart className="w-12 h-12 text-primary relative z-10 animate-float" />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-gold animate-pulse-soft" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4 tracking-wide">
            <span className="text-gradient-royal">Despedida</span>
          </h2>
          <p className="text-muted-foreground font-body font-light max-w-md mx-auto leading-relaxed">
            É estranho isso aqui acontecendo, porque nunca imaginei dessa forma kkk, mas enfim, nem tudo é do jeito que a gente quer
          </p>
          <div className="divider-elegant w-32 mx-auto mt-8" />
        </div>

        {/* Audio List */}
        <div className="space-y-6">
          {audios.map((audio, index) => (
            <div
              key={audio.id}
              className="glass-strong rounded-2xl p-6 animate-fade-in-up hover:shadow-royal transition-all duration-500 border border-primary/10"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Title */}
              <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-3">
                <Heart className="w-4 h-4 text-primary" />
                {audio.title}
              </h3>

              {/* Audio Player */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => togglePlay(audio.id)}
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    playingId === audio.id
                      ? "bg-gradient-to-br from-accent to-primary shadow-royal"
                      : "bg-gradient-to-br from-primary to-accent shadow-soft"
                  } hover:scale-105`}
                >
                  {playingId === audio.id ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  )}
                </button>

                <div className="flex-1 relative">
                  {/* Barra visual */}
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                      style={{ width: `${progress[audio.id] || 0}%` }}
                    />
                  </div>

                  {/* Slider invisível para controle */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={progress[audio.id] || 0}
                    onChange={(e) => handleSeek(audio.id, Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  {/* Bolinha */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md pointer-events-none"
                    style={{ left: `calc(${progress[audio.id] || 0}% - 6px)` }}
                  />
                </div>


                <span className="text-sm text-muted-foreground font-body min-w-[50px] text-right">
                  {playingId === audio.id ? "Tocando" : "0:00"}
                </span>

                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume[audio.id] ?? 0.8}
                    onChange={(e) => handleVolumeChange(audio.id, Number(e.target.value))}
                    className="w-24 accent-primary cursor-pointer"
                  />

                
              </div>

              <audio
                ref={el => audioRefs.current[audio.id] = el}
                src={audio.src}
                onTimeUpdate={() => handleTimeUpdate(audio.id)}
                onEnded={() => handleEnded(audio.id)}
                preload="metadata"

                onLoadedMetadata={() => {
                  const audio = audioRefs.current[audio.id];
                  if (audio) {
                    audio.volume = 0.8;
                    setVolume(prev => ({ ...prev, [audio.id]: 0.8 }));
                  }
                }}

              />
            </div>
          ))}
        </div>

        {/* Final Message */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="glass-strong rounded-3xl p-10 shadow-royal border border-primary/10">
            <Heart className="w-10 h-10 text-primary mx-auto mb-6 animate-pulse-soft" />
            <p className="font-display text-2xl text-foreground mb-4 italic">
              "Obrigado por cada momento..."
            </p>
            <p className="text-muted-foreground font-body font-light">
              Você nunca vai ser uma estranha pra mim, sempre vai existir aqui e sempre vai ter um espacinho reservado no meu coração, do tamanho e formato que só você consegue preencher
            </p>
          </div>
        </div>

        {/* Footer Hearts */}
        <div className="mt-12 flex justify-center items-center gap-3 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <Heart className="w-3 h-3 text-primary/40 animate-pulse-soft" />
          <Heart className="w-5 h-5 text-primary/60 animate-pulse-soft" style={{ animationDelay: "0.5s" }} />
          <Heart className="w-3 h-3 text-primary/40 animate-pulse-soft" style={{ animationDelay: "1s" }} />
        </div>
      </div>
    </section>
  );
};

const LockedContent = ({ timeLeft }: { timeLeft: TimeLeft }) => {
  return (
    <section className="min-h-screen py-16 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-accent/8 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-primary/8 rounded-full blur-[140px] animate-float-slow" style={{ animationDelay: "4s" }} />
      </div>

      <div className="container mx-auto max-w-2xl text-center relative z-10">
        {/* Locked Icon */}
        <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8 animate-float">
          <div className="absolute inset-0 rounded-3xl glass-soft shadow-royal" />
          <Heart className="w-12 h-12 text-primary relative z-10" />
          <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-white/90 border border-primary/20 flex items-center justify-center shadow-soft">
            <Lock className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6 animate-fade-in-up tracking-wide">
          Despedida
        </h2>

        {/* Message */}
        <div className="glass-soft rounded-3xl p-8 md:p-10 mb-10 animate-fade-in-up shadow-royal border border-primary/10" style={{ animationDelay: "0.2s" }}>
          <p className="font-display text-xl md:text-2xl text-foreground mb-5 leading-relaxed">
            Quase lá...
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-4 font-light">
            Esta seção, era pra ser liberada 1 hora após você ouvir o último áudio da seção Presentes, mas como você recebeu tarde, dimunuí para 15 minutos, se já tiver escutado, provavelmente o contador já está aqui em baixo. 
            Esse site foi pensado nos mínimos detalhes, Belle, e te confesso que essa foi a secção que menos gostei, porém, a mais necessária, preciso que veja-a, também.
          </p>
          <div className="flex items-center justify-center gap-3 my-6">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-primary/40" />
            <Sparkles className="w-4 h-4 text-primary/60" />
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-primary/40" />
          </div>
          <p className="font-display text-lg text-foreground/80 tracking-wide">
            Alguns minutinhos para o fim desse ciclo, que me fez tão bem, e tão mal, em intervalos de tempo tão próximos... 
          </p>
        </div>

        {/* Countdown */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <p className="text-primary font-body text-xs mb-5 uppercase tracking-[0.3em] font-medium">
            Tempo Restante
          </p>
          <div className="flex justify-center gap-3 md:gap-5">
            {[
              { value: timeLeft.hours, label: "Horas" },
              { value: timeLeft.minutes, label: "Min" },
              { value: timeLeft.seconds, label: "Seg" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl glass-strong flex items-center justify-center mb-2 shadow-soft border border-primary/10">
                  <span className="font-display text-2xl md:text-3xl text-primary">
                    {String(item.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hearts */}
        <div className="mt-12 flex justify-center items-center gap-3 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Heart className="w-3 h-3 text-primary/40 animate-pulse-soft" />
          <Heart className="w-5 h-5 text-primary/60 animate-pulse-soft" style={{ animationDelay: "0.5s" }} />
          <Heart className="w-3 h-3 text-primary/40 animate-pulse-soft" style={{ animationDelay: "1s" }} />
        </div>
      </div>
    </section>
  );
};

const DespedidaSection = ({ isUnlocked }: DespedidaSectionProps) => {
  const [unlockTime, setUnlockTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 1, minutes: 0, seconds: 0 });
  const [sectionUnlocked, setSectionUnlocked] = useState(false);

  useEffect(() => {
    // Check if already unlocked from localStorage
    const savedUnlockTime = localStorage.getItem("despedida_unlock_time");
    
    if (isUnlocked) {
      // Set unlock time to 1 hour from now when unlocked
      if (!savedUnlockTime) {
        const newUnlockTime = new Date(Date.now() + 60 * 15 * 1000); // 1 hour
        localStorage.setItem("despedida_unlock_time", newUnlockTime.toISOString());
        setUnlockTime(newUnlockTime);
      } else {
        setUnlockTime(new Date(savedUnlockTime));
      }
    }
  }, [isUnlocked]);

  useEffect(() => {
    if (!unlockTime) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = unlockTime.getTime() - now.getTime();

      if (difference <= 0) {
        setSectionUnlocked(true);
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [unlockTime]);

  // If parent says unlocked and countdown finished
  if (sectionUnlocked) {
    return <DespedidaContent />;
  }

  // Show locked with countdown
  if (isUnlocked && unlockTime) {
    return <LockedContent timeLeft={timeLeft} />;
  }

  // Initial locked state - waiting for Presentes last audio
  return (
    <section className="min-h-screen py-16 px-4 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-accent/8 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-primary/8 rounded-full blur-[140px] animate-float-slow" style={{ animationDelay: "4s" }} />
      </div>

      <div className="container mx-auto max-w-2xl text-center relative z-10">
        <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8 animate-float">
          <div className="absolute inset-0 rounded-3xl glass-soft shadow-royal" />
          <Heart className="w-12 h-12 text-primary relative z-10" />
          <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-white/90 border border-primary/20 flex items-center justify-center shadow-soft">
            <Lock className="w-4 h-4 text-primary" />
          </div>
        </div>

        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6 animate-fade-in-up tracking-wide">
          Despedida
        </h2>

        <div className="glass-soft rounded-3xl p-8 md:p-10 mb-10 animate-fade-in-up shadow-royal border border-primary/10" style={{ animationDelay: "0.2s" }}>
          <p className="font-display text-xl md:text-2xl text-foreground mb-5 leading-relaxed">
            Essa secção é a que eu menos gosto, mas que você também precisa conhecer
          </p>
          <p className="font-body text-muted-foreground leading-relaxed font-light"> 
            Ela vai ser liberada amanhã quando você ouvir o último áudio da secção "Presentes", 1 hora depois, pra você conseguir curtir seus presentes, entra nela quando estiver só.
          </p>
        </div>

        <div className="mt-12 flex justify-center items-center gap-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Heart className="w-3 h-3 text-primary/40 animate-pulse-soft" />
          <Heart className="w-5 h-5 text-primary/60 animate-pulse-soft" style={{ animationDelay: "0.5s" }} />
          <Heart className="w-3 h-3 text-primary/40 animate-pulse-soft" style={{ animationDelay: "1s" }} />
        </div>
      </div>
    </section>
  );
};

export default DespedidaSection;
