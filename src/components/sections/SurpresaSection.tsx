import { useState, useEffect } from "react";
import { Gift, Lock, Play, Pause, Heart, Sparkles, Star } from "lucide-react";

// Data e hora de liberação da surpresa (configurável)
const RELEASE_DATE = new Date("2025-12-31T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const SurpresaSection = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = RELEASE_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        setIsUnlocked(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isUnlocked) {
    return (
      <section className="min-h-screen section-royal py-16 px-4 flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
          
          {/* Floating stars */}
          {[...Array(12)].map((_, i) => (
            <Star
              key={i}
              className="absolute text-gold/20 animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 16 + 8}px`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
          
          <div className="absolute top-1/4 -left-40 w-80 h-80 bg-gold/10 rounded-full blur-[120px] animate-float-slow" />
          <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-rose/10 rounded-full blur-[140px] animate-float-slow" style={{ animationDelay: "4s" }} />
        </div>

        <div className="container mx-auto max-w-2xl text-center relative z-10">
          {/* Locked Icon */}
          <div className="relative inline-flex items-center justify-center w-28 h-28 mb-10 animate-float">
            <div className="absolute inset-0 rounded-3xl glass glow-gold animate-glow" />
            <Gift className="w-14 h-14 text-gold relative z-10" style={{ filter: "drop-shadow(0 0 15px hsl(43 70% 55% / 0.6))" }} />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl glass-strong flex items-center justify-center">
              <Lock className="w-5 h-5 text-foreground" />
            </div>
          </div>

          {/* Title */}
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8 animate-fade-in-up tracking-wide">
            <span className="text-gradient-gold">Surpresa</span>
          </h2>

          {/* Waiting Message */}
          <div className="glass-strong rounded-3xl p-10 md:p-12 mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="font-display text-2xl md:text-3xl text-foreground mb-6 leading-relaxed tracking-wide">
              Ainda não é a hora…
            </p>
            <p className="font-body text-foreground/70 leading-relaxed mb-4 font-light">
              Algumas surpresas precisam do tempo certo para florescer.
            </p>
            <p className="font-body text-foreground/70 leading-relaxed mb-6 font-light">
              Este presente foi preparado com carinho, pensado em cada detalhe,
              e será revelado no instante exato em que o tempo fizer sentido.
            </p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/40" />
              <Sparkles className="w-5 h-5 text-gold" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/40" />
            </div>
            <p className="font-display text-xl text-foreground/90 tracking-wide">
              Falta pouco.<br />
              E quando chegar, será só para você. 💙🎁
            </p>
          </div>

          {/* Countdown */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p className="text-gold/80 font-body text-sm mb-6 uppercase tracking-[0.3em] font-light">
              Contagem Regressiva
            </p>
            <div className="flex justify-center gap-4 md:gap-6">
              {[
                { value: timeLeft.days, label: "Dias" },
                { value: timeLeft.hours, label: "Horas" },
                { value: timeLeft.minutes, label: "Min" },
                { value: timeLeft.seconds, label: "Seg" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-18 h-18 md:w-24 md:h-24 rounded-2xl glass-strong flex items-center justify-center mb-3 glow-gold">
                    <span className="font-display text-3xl md:text-4xl text-gold">
                      {String(item.value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="font-body text-xs text-foreground/50 uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative hearts */}
          <div className="mt-16 flex justify-center items-center gap-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Heart className="w-4 h-4 text-rose/40 animate-pulse-soft" />
            <Heart className="w-6 h-6 text-gold/50 animate-pulse-soft" style={{ animationDelay: "0.5s" }} />
            <Heart className="w-4 h-4 text-rose/40 animate-pulse-soft" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      </section>
    );
  }

  // Unlocked Content
  return (
    <section className="min-h-screen py-16 px-4 relative overflow-hidden">
      {/* Celebration background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-gold animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
        <div className="absolute top-20 left-10 w-80 h-80 bg-gold/10 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose/10 rounded-full blur-[140px] animate-float-slow" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-blur-in">
          <div className="relative inline-flex items-center justify-center w-28 h-28 mb-8">
            <div className="absolute inset-0 rounded-3xl glass glow-gold animate-glow" />
            <Gift className="w-14 h-14 text-gold relative z-10 animate-float" style={{ filter: "drop-shadow(0 0 15px hsl(43 70% 55% / 0.6))" }} />
            <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-rose animate-pulse-soft" />
            <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-gold animate-twinkle" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4 tracking-wide">
            <span className="text-gradient-gold">Sua Surpresa Chegou!</span>
          </h2>
          <p className="text-muted-foreground font-body font-light max-w-md mx-auto">
            Este momento foi preparado especialmente para você, com todo amor do mundo
          </p>
          <div className="divider-elegant w-32 mx-auto mt-8" />
        </div>

        {/* Video Section */}
        <div className="glass-strong rounded-3xl p-8 md:p-10 mb-8 animate-scale-in hover:glow-gold transition-all duration-500">
          <h3 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
            <Heart className="w-6 h-6 text-rose" />
            Vídeo de Aniversário
          </h3>
          
          {/* Video Player */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-rose/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 ${
                  isVideoPlaying 
                    ? "bg-foreground/20 backdrop-blur-sm" 
                    : "bg-gradient-to-br from-gold to-rose glow-gold"
                }`}
              >
                {isVideoPlaying ? (
                  <Pause className="w-10 h-10 text-foreground" />
                ) : (
                  <Play className="w-10 h-10 text-primary-foreground ml-1" />
                )}
              </button>
            </div>
          </div>
          
          <p className="text-center text-muted-foreground/60 text-sm mt-6 font-body font-light">
            Um vídeo especial de aniversário, feito com muito amor 💙
          </p>
        </div>

        {/* Audio Section */}
        <div className="glass-strong rounded-3xl p-8 md:p-10 animate-scale-in hover:glow-rose transition-all duration-500" style={{ animationDelay: "0.2s" }}>
          <h3 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
            <Heart className="w-6 h-6 text-rose" />
            Áudio Especial
          </h3>

          <div className="flex items-center gap-5 p-5 glass rounded-2xl">
            <button
              onClick={() => setIsAudioPlaying(!isAudioPlaying)}
              className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                isAudioPlaying 
                  ? "bg-gradient-to-br from-rose to-primary glow-rose" 
                  : "bg-gradient-to-br from-gold to-rose glow-gold"
              } hover:scale-105`}
            >
              {isAudioPlaying ? (
                <Pause className="w-7 h-7 text-primary-foreground" />
              ) : (
                <Play className="w-7 h-7 text-primary-foreground ml-1" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <h4 className="font-display text-xl text-foreground mb-3">
                Mensagem de Aniversário
              </h4>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isAudioPlaying 
                        ? "w-1/3 bg-gradient-to-r from-rose to-gold animate-pulse" 
                        : "w-0 bg-gold"
                    }`}
                  />
                </div>
                <span className="text-sm text-muted-foreground font-body">
                  {isAudioPlaying ? "Tocando..." : "0:00"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Celebration Message */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="inline-flex items-center gap-3 glass-strong px-8 py-4 rounded-full glow-gold">
            <Sparkles className="w-6 h-6 text-gold" />
            <span className="font-display text-2xl text-gradient-gold">Feliz Aniversário!</span>
            <Sparkles className="w-6 h-6 text-gold" />
          </div>
          <p className="text-muted-foreground font-body text-sm mt-6 font-light">
            Que este novo ciclo seja repleto de amor, alegria e realizações 💙
          </p>
        </div>
      </div>
    </section>
  );
};

export default SurpresaSection;