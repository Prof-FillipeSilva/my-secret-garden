import { useState } from "react";
import { Sparkles, Play, Pause, Heart, Star } from "lucide-react";
import LockedSection from "@/components/LockedSection";

// Data de liberação: 31/12/2025 às 00h00
const RELEASE_DATE = new Date("2025-12-31T00:00:00");

const SurpresaContent = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Celebration background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-gold/40 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 12 + 8}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
        <div className="absolute top-20 left-10 w-80 h-80 bg-primary/8 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/8 rounded-full blur-[140px] animate-float-slow" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-blur-in">
          <div className="relative inline-flex items-center justify-center w-28 h-28 mb-8">
            <div className="absolute inset-0 rounded-3xl glass-soft shadow-romantic animate-glow" />
            <Sparkles className="w-14 h-14 text-primary relative z-10 animate-float" />
            <Heart className="absolute -top-3 -right-3 w-8 h-8 text-primary animate-pulse-soft" />
            <Star className="absolute -bottom-2 -left-2 w-6 h-6 text-gold animate-twinkle" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6 tracking-wide">
            <span className="text-gradient-rose">Feliz Ano Novo!</span>
          </h2>
          <p className="text-muted-foreground font-body font-light max-w-lg mx-auto text-lg leading-relaxed">
            Meu amor, este é o início de um novo ciclo, e eu quero vivê-lo ao seu lado.
          </p>
          <div className="divider-elegant w-40 mx-auto mt-8" />
        </div>

        {/* Main Message Card */}
        <div className="glass-strong rounded-3xl p-10 md:p-14 mb-10 animate-scale-in hover:shadow-romantic transition-all duration-500 border border-primary/10">
          <div className="text-center">
            <Sparkles className="w-8 h-8 text-gold mx-auto mb-6 animate-pulse-soft" />
            
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-8 tracking-wide">
              Uma Mensagem do Coração
            </h3>
            
            <div className="font-display text-foreground/80 leading-loose text-xl md:text-2xl italic max-w-2xl mx-auto mb-10">
              <p className="mb-6">
                Que este novo ano traga ainda mais amor, alegria e momentos inesquecíveis para nós.
              </p>
              <p className="mb-6">
                Você é a pessoa mais especial da minha vida, e não existe ninguém com quem eu prefira começar este novo capítulo.
              </p>
              <p>
                Que possamos crescer juntos, sonhar juntos, e construir uma história cada vez mais bonita.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/40" />
              <Heart className="w-5 h-5 text-primary animate-pulse-soft" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/40" />
            </div>

            <p className="font-body text-primary font-light text-sm tracking-wider">
              — Com todo meu amor, sempre
            </p>
          </div>
        </div>

        {/* Audio Message */}
        <div className="glass-strong rounded-3xl p-8 md:p-10 animate-scale-in hover:shadow-romantic transition-all duration-500 border border-primary/10" style={{ animationDelay: "0.2s" }}>
          <h3 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
            <Heart className="w-5 h-5 text-primary" />
            Mensagem de Ano Novo
          </h3>

          <div className="flex items-center gap-5 p-5 glass-soft rounded-2xl border border-primary/10">
            <button
              onClick={() => setIsAudioPlaying(!isAudioPlaying)}
              className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                isAudioPlaying 
                  ? "bg-gradient-to-br from-accent to-primary shadow-romantic" 
                  : "bg-gradient-to-br from-primary to-accent shadow-soft"
              } hover:scale-105`}
            >
              {isAudioPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-0.5" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <h4 className="font-display text-xl text-foreground mb-2">
                Áudio Especial de Ano Novo
              </h4>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isAudioPlaying 
                        ? "w-1/3 bg-gradient-to-r from-primary to-accent animate-pulse" 
                        : "w-0 bg-primary"
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

        {/* Celebration Footer */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="inline-flex items-center gap-3 glass-strong px-10 py-5 rounded-full shadow-romantic border border-gold/30">
            <Star className="w-6 h-6 text-gold animate-twinkle" />
            <span className="font-display text-2xl text-gradient-gold">2026</span>
            <Star className="w-6 h-6 text-gold animate-twinkle" style={{ animationDelay: "0.5s" }} />
          </div>
          <p className="text-muted-foreground font-body text-sm mt-6 font-light">
            Que seja o nosso melhor ano juntos 💕
          </p>
          
          <div className="mt-10 flex justify-center items-center gap-3">
            <Heart className="w-4 h-4 text-primary/40 animate-pulse-soft" />
            <Heart className="w-6 h-6 text-primary/60 animate-pulse-soft" style={{ animationDelay: "0.5s" }} />
            <Heart className="w-4 h-4 text-primary/40 animate-pulse-soft" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

const SurpresaSection = () => {
  return (
    <LockedSection
      releaseDate={RELEASE_DATE}
      icon={<Sparkles className="w-12 h-12 text-primary" />}
      title="✨ Surpresa"
      waitingMessage="Uma surpresa especial está preparada para a virada do ano. Quando o relógio marcar meia-noite, este momento será só nosso."
    >
      <SurpresaContent />
    </LockedSection>
  );
};

export default SurpresaSection;