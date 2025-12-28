import { useState } from "react";
import { Heart, Lock, ArrowRight } from "lucide-react";

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
    }, 800);
  };

  return (
    <div className="min-h-screen gradient-royal flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pearl/5 rounded-full blur-2xl animate-pulse-soft" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card/95 backdrop-blur-xl rounded-2xl p-8 md:p-10 shadow-romantic border border-border/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Heart className="w-8 h-8 text-rose animate-heart-beat" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl text-foreground mb-2">
              Um lugar só nosso
            </h1>
            <p className="text-muted-foreground font-body text-sm">
              Digite a senha para entrar neste mundo especial
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
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
                className={`w-full pl-12 pr-4 py-4 bg-secondary/50 border-2 rounded-xl font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-rose transition-all duration-300 ${
                  error ? "border-destructive animate-shake" : "border-transparent"
                }`}
              />
            </div>

            {error && (
              <p className="text-destructive text-sm text-center font-body animate-fade-in">
                Senha incorreta. Tente novamente com carinho 💙
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full py-4 px-6 bg-primary hover:bg-rose text-primary-foreground font-body font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Entrar
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-muted-foreground/60 text-xs mt-8 font-body">
            Este espaço foi criado com muito amor 💙
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PasswordScreen;
