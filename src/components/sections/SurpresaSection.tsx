import { useState, useEffect } from "react";
import { Gift, Lock, Play, Pause, Heart, Sparkles } from "lucide-react";

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
      <section className="min-h-screen gradient-royal py-12 px-4 flex items-center justify-center">
        <div className="container mx-auto max-w-2xl text-center">
          {/* Locked Icon */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gold/20 mb-8 animate-float">
            <Gift className="w-12 h-12 text-gold" />
            <Lock className="absolute -bottom-1 -right-1 w-8 h-8 text-primary-foreground bg-primary rounded-full p-1.5" />
          </div>

          {/* Title */}
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-6 animate-fade-in-up">
            🎁 Surpresa
          </h2>

          {/* Waiting Message */}
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="font-display text-xl md:text-2xl text-primary-foreground mb-4 leading-relaxed">
              Ainda não é a hora…
            </p>
            <p className="font-body text-primary-foreground/80 leading-relaxed mb-4">
              Algumas surpresas precisam do tempo certo para florescer.
            </p>
            <p className="font-body text-primary-foreground/80 leading-relaxed mb-4">
              Este presente foi preparado com carinho, pensado em cada detalhe,
              e será revelado no instante exato em que o tempo fizer sentido.
            </p>
            <p className="font-display text-lg text-primary-foreground/90 mt-6">
              Falta pouco.<br />
              E quando chegar, será só para você. 💙🎁
            </p>
          </div>

          {/* Countdown */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p className="text-primary-foreground/60 font-body text-sm mb-4 uppercase tracking-wider">
              Contagem regressiva
            </p>
            <div className="flex justify-center gap-3 md:gap-6">
              {[
                { value: timeLeft.days, label: "Dias" },
                { value: timeLeft.hours, label: "Horas" },
                { value: timeLeft.minutes, label: "Min" },
                { value: timeLeft.seconds, label: "Seg" },
              ].map((item, index) => (
                <div key={item.label} className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mb-2 border border-gold/30">
                    <span className="font-display text-2xl md:text-3xl text-gold">
                      {String(item.value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="font-body text-xs text-primary-foreground/60">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative */}
          <div className="mt-12 flex justify-center gap-2">
            <Heart className="w-4 h-4 text-rose animate-pulse-soft" />
            <Heart className="w-5 h-5 text-gold animate-pulse-soft" style={{ animationDelay: "0.3s" }} />
            <Heart className="w-4 h-4 text-rose animate-pulse-soft" style={{ animationDelay: "0.6s" }} />
          </div>
        </div>
      </section>
    );
  }

  // Unlocked Content
  return (
    <section className="min-h-screen gradient-romantic py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-blur-in">
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gold/20 mb-6">
            <Gift className="w-12 h-12 text-gold animate-float" />
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-gold animate-pulse-soft" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            🎁 Sua Surpresa Chegou!
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Este momento foi preparado especialmente para você, com todo amor do mundo
          </p>
        </div>

        {/* Video Section */}
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-romantic border border-border/30 mb-8 animate-scale-in">
          <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose" />
            Vídeo de Aniversário
          </h3>
          
          {/* Video Player Placeholder */}
          <div className="relative aspect-video bg-gradient-royal rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="w-20 h-20 rounded-full bg-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                {isVideoPlaying ? (
                  <Pause className="w-10 h-10 text-primary-foreground" />
                ) : (
                  <Play className="w-10 h-10 text-primary-foreground ml-1" />
                )}
              </button>
            </div>
            {/* Add video element here */}
            {/* <video src="seu-video.mp4" /> */}
          </div>
          
          <p className="text-center text-muted-foreground/60 text-sm mt-4 font-body">
            Um vídeo especial de aniversário, feito com muito amor 💙
          </p>
        </div>

        {/* Audio Section */}
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-romantic border border-border/30 animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose" />
            Áudio Especial
          </h3>

          <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
            <button
              onClick={() => setIsAudioPlaying(!isAudioPlaying)}
              className="flex-shrink-0 w-14 h-14 rounded-full bg-primary hover:bg-rose text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              {isAudioPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <h4 className="font-display text-lg text-foreground">
                Mensagem de Aniversário
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gold rounded-full transition-all duration-300 ${
                      isAudioPlaying ? "w-1/3 animate-pulse" : "w-0"
                    }`}
                  />
                </div>
                <span className="text-xs text-muted-foreground font-body">
                  {isAudioPlaying ? "Reproduzindo..." : "0:00"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Add audio element here */}
          {/* <audio src="seu-audio.mp3" /> */}
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="inline-flex items-center gap-2 text-gold">
            <Sparkles className="w-5 h-5" />
            <span className="font-display text-lg">Feliz Aniversário!</span>
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="text-muted-foreground font-body text-sm mt-2">
            Que este novo ciclo seja repleto de amor, alegria e realizações 💙
          </p>
        </div>
      </div>
    </section>
  );
};

export default SurpresaSection;
