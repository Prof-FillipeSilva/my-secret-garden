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
    <section className="min-h-screen py-16 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-rose/10 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[140px] animate-float-slow" style={{ animationDelay: "4s" }} />
      </div>

      <div className="container mx-auto max-w-2xl text-center relative z-10">
        {/* Locked Icon */}
        <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8 animate-float">
          <div className="absolute inset-0 rounded-3xl glass-soft shadow-romantic" />
          <div className="relative z-10">{icon}</div>
          <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-white/80 border border-rose/20 flex items-center justify-center shadow-soft">
            <Lock className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6 animate-fade-in-up tracking-wide">
          {title}
        </h2>

        {/* Waiting Message */}
        <div className="glass-soft rounded-3xl p-8 md:p-10 mb-10 animate-fade-in-up shadow-romantic" style={{ animationDelay: "0.2s" }}>
          <p className="font-display text-xl md:text-2xl text-foreground mb-5 leading-relaxed">
            Ainda não é a hora…
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-4 font-light">
            {waitingMessage}
          </p>
          <div className="flex items-center justify-center gap-3 my-6">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-rose/40" />
            <Sparkles className="w-4 h-4 text-rose" />
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-rose/40" />
          </div>
          <p className="font-display text-lg text-foreground/80 tracking-wide">
            Falta pouco.<br />
            E quando chegar, será só para você. 💙
          </p>
        </div>

        {/* Countdown */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <p className="text-rose font-body text-xs mb-5 uppercase tracking-[0.3em] font-medium">
            Contagem Regressiva
          </p>
          <div className="flex justify-center gap-3 md:gap-5">
            {[
              { value: timeLeft.days, label: "Dias" },
              { value: timeLeft.hours, label: "Horas" },
              { value: timeLeft.minutes, label: "Min" },
              { value: timeLeft.seconds, label: "Seg" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl glass-soft flex items-center justify-center mb-2 shadow-soft border border-rose/10">
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

        {/* Decorative hearts */}
        <div className="mt-12 flex justify-center items-center gap-3 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Heart className="w-3 h-3 text-rose/50 animate-pulse-soft" />
          <Heart className="w-5 h-5 text-rose/70 animate-pulse-soft" style={{ animationDelay: "0.5s" }} />
          <Heart className="w-3 h-3 text-rose/50 animate-pulse-soft" style={{ animationDelay: "1s" }} />
        </div>
      </div>
    </section>
  );
};

export default LockedSection;
