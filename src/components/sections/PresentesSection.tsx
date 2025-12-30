import { useState } from "react";
import { Gift, Play, Pause, Heart, Sparkles, Video, Music } from "lucide-react";
import LockedSection from "@/components/LockedSection";

// Data de liberação: 31/12/2025 às 10h00
const RELEASE_DATE = new Date("2025-12-31T10:00:00");

const PresentesContent = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Celebration background */}
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
            <div className="absolute inset-0 rounded-3xl glass-soft shadow-romantic" />
            <Gift className="w-12 h-12 text-primary relative z-10 animate-float" />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-gold animate-pulse-soft" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4 tracking-wide">
            <span className="text-gradient-rose">Seus Presentes Especiais!</span>
          </h2>
          <p className="text-muted-foreground font-body font-light max-w-md mx-auto">
            Estes momentos foram preparados especialmente para você, com todo amor do mundo
          </p>
          <div className="divider-elegant w-32 mx-auto mt-8" />
        </div>

        {/* Video Section */}
        <div className="glass-strong rounded-3xl p-8 md:p-10 mb-8 animate-scale-in hover:shadow-romantic transition-all duration-500 border border-primary/10">
          <h3 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
            <Video className="w-5 h-5 text-primary" />
            Vídeo Especial
          </h3>
          
          {/* Video Player */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 ${
                  isVideoPlaying 
                    ? "bg-white/80 backdrop-blur-sm shadow-soft" 
                    : "bg-gradient-to-br from-primary to-accent shadow-romantic"
                }`}
              >
                {isVideoPlaying ? (
                  <Pause className="w-8 h-8 text-foreground" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </button>
            </div>
          </div>
          
          <p className="text-center text-muted-foreground/60 text-sm mt-6 font-body font-light">
            Um vídeo especial, feito com muito amor 💕
          </p>
        </div>

        {/* Audio Section */}
        <div className="glass-strong rounded-3xl p-8 md:p-10 animate-scale-in hover:shadow-romantic transition-all duration-500 border border-primary/10" style={{ animationDelay: "0.2s" }}>
          <h3 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
            <Music className="w-5 h-5 text-primary" />
            Áudio Especial
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
                Mensagem Especial
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

        {/* Celebration Message */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="inline-flex items-center gap-3 glass-strong px-8 py-4 rounded-full shadow-romantic border border-primary/20">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-display text-xl text-gradient-rose">Com todo meu amor!</span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <p className="text-muted-foreground font-body text-sm mt-6 font-light">
            Que este momento seja especial como você é para mim 💕
          </p>
        </div>
      </div>
    </section>
  );
};

const PresentesSection = () => {
  return (
    <LockedSection
      releaseDate={RELEASE_DATE}
      icon={<Gift className="w-12 h-12 text-primary" />}
      title="🎁 Presentes"
      waitingMessage="Estes presentes foram preparados com carinho, pensados em cada detalhe, e serão revelados no momento perfeito."
    >
      <PresentesContent />
    </LockedSection>
  );
};

export default PresentesSection;