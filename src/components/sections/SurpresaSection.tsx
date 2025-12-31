import { useState, useRef, useEffect } from "react";
import { Sparkles, Play, Pause, Heart, Star, Video, Quote } from "lucide-react";
import LockedSection from "@/components/LockedSection";

// Data de liberação: 31/12/2025 às 00h00
const RELEASE_DATE = new Date("2025-12-31T00:00:00");

const SurpresaContent = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsVideoPlaying(!isVideoPlaying);
  };

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
            <div className="absolute inset-0 rounded-3xl glass-soft shadow-royal animate-glow" />
            <Sparkles className="w-14 h-14 text-primary relative z-10 animate-float" />
            <Heart className="absolute -top-3 -right-3 w-8 h-8 text-primary animate-pulse-soft" />
            <Star className="absolute -bottom-2 -left-2 w-6 h-6 text-gold animate-twinkle" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6 tracking-wide">
            <span className="text-gradient-royal">Feliz Aniversário, Meu Bem, você merece o mundo!</span>
          </h2>
          <p className="text-muted-foreground font-body font-light max-w-lg mx-auto text-lg leading-relaxed">
            Hoje, é o fim de um ciclo pra nós, mas o início de um novo ciclo pra você, e como falamos sobre esse dia, né, e foi chegando, nessa reta final parecia que eu estava mais ansioso que você, deixo aqui pra você uma mensagem bonitinha de aniversário.
          </p>
          <div className="divider-elegant w-40 mx-auto mt-8" />
        </div>

        {/* Video Section */}
        <div className="glass-strong rounded-3xl p-8 md:p-10 mb-10 animate-scale-in hover:shadow-royal transition-all duration-500 border border-primary/10">
          <h3 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
            <Video className="w-5 h-5 text-primary" />
            🎆🎆 1.6 da Bebelle 🎆🎆
          </h3>
          
          {/* Video Player */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/10">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
            >
              {/* Adicione o src do vídeo aqui */}
              <source src="" type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
            
            {!isVideoPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-royal/20">
                <button
                  onClick={toggleVideo}
                  className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 bg-gradient-to-br from-primary to-accent shadow-royal"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </button>
              </div>
            )}
          </div>
          
          <p className="text-center text-muted-foreground/60 text-sm mt-6 font-body font-light">
            Que esse vídeo deixe o seu coração quentinho 
          </p>
        </div>

        {/* Poem Section */}
        <div className="glass-strong rounded-3xl p-10 md:p-14 mb-10 animate-scale-in hover:shadow-royal transition-all duration-500 border border-primary/10" style={{ animationDelay: "0.2s" }}>
          <Quote className="w-10 h-10 text-primary/30 mb-6" />
          
          <h3 className="font-display text-2xl md:text-3xl text-foreground mb-8 tracking-wide">
            Um Poema Para Você
          </h3>
          
          <div className="font-display text-foreground/80 leading-loose text-xl md:text-2xl italic max-w-2xl mx-auto mb-10">
            <p className="mb-6">
              Que este novo ano traga ainda mais amor,<br />
              alegria e momentos inesquecíveis para nós.
            </p>
            <p className="mb-6">
              Você é a pessoa mais especial da minha vida,<br />
              e não existe ninguém com quem eu prefira<br />
              começar este novo capítulo.
            </p>
            <p>
              Que possamos crescer juntos, sonhar juntos,<br />
              e construir uma história cada vez mais bonita.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/40" />
            <Heart className="w-5 h-5 text-primary animate-pulse-soft" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/40" />
          </div>

          <p className="font-body text-primary font-light text-sm tracking-wider text-center">
            — Espero que tenha gostado de tudo, de verdade
          </p>
        </div>

        {/* Celebration Footer */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="inline-flex items-center gap-3 glass-strong px-10 py-5 rounded-full shadow-royal border border-gold/30">
            <Star className="w-6 h-6 text-gold animate-twinkle" />
            <span className="font-display text-2xl text-gradient-gold">2026</span>
            <Star className="w-6 h-6 text-gold animate-twinkle" style={{ animationDelay: "0.5s" }} />
          </div>
          <p className="text-muted-foreground font-body text-sm mt-6 font-light">
            Que esse ano seja pra você, o melhor da sua vida, te amo muito 💙💙💙
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
      title="Surpresa"
      waitingMessage="Acalma o coração, falta bem pouco"
    >
      <SurpresaContent />
    </LockedSection>
  );
};

export default SurpresaSection;
