import { useState } from "react";
import { Heart, Lock, ArrowRight, Sparkles } from "lucide-react";
import ParticlesBackground from "./ParticlesBackground";

interface PasswordScreenProps {
  onSuccess: () => void;
}

const CORRECT_PASSWORD = "amor2025"; // Senha configurável

const PasswordScreen = ({ onSuccess }: PasswordScreenProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        onSuccess();
      } else {
        setError(true);
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <ParticlesBackground />
      
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-rose/10 rounded-full blur-[100px] animate-float-slow" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] animate-pulse-soft" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-blur-in">
        {/* Decorative top element */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Sparkles className="absolute -top-8 -left-6 w-5 h-5 text-gold animate-twinkle" />
            <Sparkles className="absolute -top-6 -right-8 w-4 h-4 text-rose animate-twinkle" style={{ animationDelay: "0.5s" }} />
            <Sparkles className="absolute -top-10 right-0 w-3 h-3 text-gold animate-twinkle" style={{ animationDelay: "1s" }} />
          </div>
        </div>

        <div className="glass-strong rounded-3xl p-10 md:p-12 shadow-glow">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-rose/20 to-primary/20 mb-6 animate-float">
              <Heart className="w-10 h-10 text-rose" style={{ filter: "drop-shadow(0 0 10px hsl(310 40% 60% / 0.5))" }} />
              <div className="absolute inset-0 rounded-2xl glow-rose opacity-50" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-3 tracking-wide">
              Um lugar só nosso
            </h1>
            <p className="text-muted-foreground font-body text-sm font-light">
              Digite a senha para entrar neste mundo especial
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-rose">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Sua senha secreta..."
                className={`w-full pl-14 pr-5 py-5 glass rounded-2xl font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all duration-500 ${
                  error 
                    ? "border-destructive animate-shake ring-2 ring-destructive/30" 
                    : "focus:ring-2 focus:ring-rose/30"
                }`}
              />
            </div>

            {error && (
              <p className="text-destructive text-sm text-center font-body animate-fade-in flex items-center justify-center gap-2">
                <span>Senha incorreta. Tente novamente com carinho</span>
                <Heart className="w-4 h-4" />
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full py-5 px-6 bg-gradient-to-r from-primary to-rose text-primary-foreground font-body font-medium rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed group hover:shadow-lg hover:shadow-rose/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <span className="text-lg">Entrar</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/30" />
            <Heart className="w-4 h-4 text-gold animate-pulse-soft" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/30" />
          </div>
          <p className="text-center text-muted-foreground/40 text-xs mt-4 font-body font-light">
            Este espaço foi criado com muito amor
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordScreen;