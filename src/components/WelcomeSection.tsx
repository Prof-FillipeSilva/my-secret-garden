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
    <section className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-primary/8 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/6 rounded-full blur-[140px] animate-float-slow" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-soft/10 rounded-full blur-[150px] animate-pulse-soft" />
      </div>

      {/* Floating hearts */}
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

      <div className="container mx-auto max-w-2xl text-center relative z-10">
        {/* Logo/Icon */}
        <div className="relative inline-flex items-center justify-center w-28 h-28 mb-10 animate-blur-in">
          <div className="absolute inset-0 rounded-3xl glass-soft shadow-romantic" />
          <Heart className="w-14 h-14 text-primary relative z-10 animate-float" />
          <Sparkles className="absolute -top-2 -right-2 w-7 h-7 text-gold animate-pulse-soft" />
          <Sparkles className="absolute -bottom-1 -left-2 w-5 h-5 text-primary/60 animate-twinkle" style={{ animationDelay: "0.5s" }} />
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6 animate-fade-in-up tracking-wide">
          Bem-vinda, <span className="text-gradient-royal">Meu Amor</span>
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground font-body font-light text-lg md:text-xl mb-12 animate-fade-in-up max-w-lg mx-auto leading-relaxed" style={{ animationDelay: "0.2s" }}>
          Este é um lugar especial, criado só para você.
          <br />
          Antes de explorar, ouça esta mensagem.
        </p>

        {/* Audio Player Card */}
        <div className="glass-strong rounded-3xl p-8 md:p-10 shadow-romantic border border-primary/20 animate-scale-in mb-12" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-3 mb-6">
            <Volume2 className="w-5 h-5 text-primary" />
            <h2 className="font-display text-2xl text-foreground">Comece Aqui</h2>
          </div>

          <div className="flex items-center gap-5">
            {/* Play Button */}
            <button
              onClick={togglePlay}
              className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-105 ${
                isPlaying
                  ? "bg-gradient-to-br from-accent to-primary shadow-romantic"
                  : "bg-gradient-to-br from-primary to-accent shadow-soft hover:shadow-romantic"
              }`}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-white" />
              ) : (
                <Play className="w-7 h-7 text-white ml-1" />
              )}
            </button>

            {/* Progress */}
            <div className="flex-1">
              <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground font-body">
                <span>{formatTime((progress / 100) * duration)}</span>
                <span>{duration ? formatTime(duration) : "0:00"}</span>
              </div>
            </div>
          </div>

          <p className="text-center text-muted-foreground/70 text-sm mt-6 font-body font-light">
            Uma mensagem especial para guiar sua jornada 💕
          </p>

          {/* Áudio - Adicione o src do áudio aqui */}
          <audio ref={audioRef} src="" preload="metadata" />
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToNext}
          className="animate-fade-in flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="font-body text-sm font-light">Continuar explorando</span>
          <ArrowDown className="w-5 h-5 animate-float group-hover:text-primary" />
        </button>

        {/* Decorative footer */}
        <div className="mt-16 flex justify-center items-center gap-3 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/40" />
          <Heart className="w-4 h-4 text-primary/60 animate-pulse-soft" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/40" />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;