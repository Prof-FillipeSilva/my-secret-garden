import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Heart, Sparkles, ArrowDown } from "lucide-react";

const WelcomeSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById("escritas");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen py-16 md:py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-5 md:left-10 w-60 md:w-80 h-60 md:h-80 bg-primary/8 rounded-full blur-[100px] md:blur-[120px] animate-float-slow" />
        <div className="absolute bottom-20 right-5 md:right-10 w-72 md:w-96 h-72 md:h-96 bg-accent/6 rounded-full blur-[120px] md:blur-[140px] animate-float-slow" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-rose-soft/10 rounded-full blur-[120px] md:blur-[150px] animate-pulse-soft" />
      </div>

      {/* Floating hearts - hidden on very small screens */}
      <div className="hidden sm:block">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/20 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              width: `${12 + (i % 3) * 6}px`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-2xl text-center relative z-10 w-full px-2">
        {/* Logo/Icon */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 mb-8 md:mb-10 animate-blur-in">
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl glass-soft shadow-romantic" />
          <Heart className="w-10 h-10 md:w-14 md:h-14 text-primary relative z-10 animate-float" />
          <Sparkles className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-5 h-5 md:w-7 md:h-7 text-gold animate-pulse-soft" />
          <Sparkles className="absolute -bottom-0.5 -left-1.5 md:-bottom-1 md:-left-2 w-4 h-4 md:w-5 md:h-5 text-primary/60 animate-twinkle" style={{ animationDelay: "0.5s" }} />
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 md:mb-6 animate-fade-in-up tracking-wide px-2">
          Bem-vinda, <span className="text-gradient-royal">Meu Amor</span>
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground font-body font-light text-base md:text-lg lg:text-xl mb-8 md:mb-12 animate-fade-in-up max-w-lg mx-auto leading-relaxed px-4" style={{ animationDelay: "0.2s" }}>
          Este é um lugar especial, criado só para você.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Antes de explorar, ouça esta mensagem.
        </p>

        {/* Audio Player Card */}
        <div className="glass-strong rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 shadow-romantic border border-primary/20 animate-scale-in mb-8 md:mb-12 mx-2" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
            <h2 className="font-display text-lg sm:text-xl md:text-2xl text-foreground">Comece Aqui</h2>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            {/* Play Button */}
            <button
              onClick={togglePlay}
              className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-105 ${
                isPlaying
                  ? "bg-gradient-to-br from-accent to-primary shadow-romantic"
                  : "bg-gradient-to-br from-primary to-accent shadow-soft hover:shadow-romantic"
              }`}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 md:w-7 md:h-7 text-white" />
              ) : (
                <Play className="w-5 h-5 md:w-7 md:h-7 text-white ml-0.5 md:ml-1" />
              )}
            </button>

            {/* Progress */}
            <div className="flex-1 min-w-0">
              <div className="h-1.5 md:h-2 bg-secondary rounded-full overflow-hidden mb-1.5 md:mb-2">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs md:text-sm text-muted-foreground font-body">
                <span>{formatTime((progress / 100) * duration)}</span>
                <span>{duration ? formatTime(duration) : "0:00"}</span>
              </div>
            </div>
          </div>

          <p className="text-center text-muted-foreground/70 text-xs md:text-sm mt-4 md:mt-6 font-body font-light">
            Uma mensagem especial para guiar sua jornada 💕
          </p>

          {/* Áudio - Adicione o src do áudio aqui */}
          <audio ref={audioRef} src="" preload="metadata" />
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToNext}
          className="animate-fade-in flex flex-col items-center gap-1.5 md:gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="font-body text-xs md:text-sm font-light">Continuar explorando</span>
          <ArrowDown className="w-4 h-4 md:w-5 md:h-5 animate-float group-hover:text-primary" />
        </button>

        {/* Decorative footer */}
        <div className="mt-10 md:mt-16 flex justify-center items-center gap-2 md:gap-3 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-primary/40" />
          <Heart className="w-3 h-3 md:w-4 md:h-4 text-primary/60 animate-pulse-soft" />
          <div className="w-8 md:w-12 h-px bg-gradient-to-l from-transparent to-primary/40" />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;