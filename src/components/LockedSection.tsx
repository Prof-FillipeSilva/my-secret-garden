import { useState, useEffect, ReactNode } from "react";
import { Lock, Heart, Sparkles } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface LockedSectionProps {
  releaseDate: Date;
  icon: ReactNode;
  title: string;
  waitingMessage: string;
  children: ReactNode;
}

const LockedSection = ({ releaseDate, icon, title, waitingMessage, children }: LockedSectionProps) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = releaseDate.getTime() - now.getTime();

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
  }, [releaseDate]);

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <section className="min-h-screen py-12 md:py-16 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 md:-left-40 w-60 md:w-80 h-60 md:h-80 bg-accent/8 rounded-full blur-[100px] md:blur-[120px] animate-float-slow" />
        <div className="absolute bottom-1/4 -right-20 md:-right-40 w-72 md:w-96 h-72 md:h-96 bg-primary/8 rounded-full blur-[120px] md:blur-[140px] animate-float-slow" style={{ animationDelay: "4s" }} />
      </div>

      <div className="container mx-auto max-w-2xl text-center relative z-10 px-2">
        {/* Locked Icon */}
        <div className="relative inline-flex items-center justify-center w-18 h-18 md:w-24 md:h-24 mb-6 md:mb-8 animate-float">
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl glass-soft shadow-romantic" />
          <div className="relative z-10">{icon}</div>
          <div className="absolute -bottom-1.5 -right-1.5 md:-bottom-2 md:-right-2 w-7 h-7 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-white/90 border border-primary/20 flex items-center justify-center shadow-soft">
            <Lock className="w-3 h-3 md:w-4 md:h-4 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 md:mb-6 animate-fade-in-up tracking-wide px-2">
          {title}
        </h2>

        {/* Waiting Message */}
        <div className="glass-soft rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 mb-8 md:mb-10 animate-fade-in-up shadow-romantic border border-primary/10 mx-2" style={{ animationDelay: "0.2s" }}>
          <p className="font-display text-lg sm:text-xl md:text-2xl text-foreground mb-3 md:mb-5 leading-relaxed">
            Aguarda um pouquinho…
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-3 md:mb-4 font-light text-sm md:text-base">
            {waitingMessage}
          </p>
          <div className="flex items-center justify-center gap-2 md:gap-3 my-4 md:my-6">
            <div className="w-8 md:w-10 h-px bg-gradient-to-r from-transparent to-primary/40" />
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary/60" />
            <div className="w-8 md:w-10 h-px bg-gradient-to-l from-transparent to-primary/40" />
          </div>
          <p className="font-display text-base md:text-lg text-foreground/80 tracking-wide">
            💙💙💙
          </p>
        </div>

        {/* Countdown */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <p className="text-primary font-body text-[10px] md:text-xs mb-4 md:mb-5 uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium">
            Contagem Regressiva
          </p>
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-5">
            {[
              { value: timeLeft.days, label: "Dias" },
              { value: timeLeft.hours, label: "Horas" },
              { value: timeLeft.minutes, label: "Min" },
              { value: timeLeft.seconds, label: "Seg" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl md:rounded-2xl glass-strong flex items-center justify-center mb-1.5 md:mb-2 shadow-soft border border-primary/10">
                  <span className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary">
                    {String(item.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="font-body text-[8px] sm:text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative hearts */}
        <div className="mt-8 md:mt-12 flex justify-center items-center gap-2 md:gap-3 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Heart className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary/40 animate-pulse-soft" />
          <Heart className="w-4 h-4 md:w-5 md:h-5 text-primary/60 animate-pulse-soft" style={{ animationDelay: "0.5s" }} />
          <Heart className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary/40 animate-pulse-soft" style={{ animationDelay: "1s" }} />
        </div>
      </div>
    </section>
  );
};

export default LockedSection;