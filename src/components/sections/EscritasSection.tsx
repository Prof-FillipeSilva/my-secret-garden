import { PenLine, Quote, Sparkles } from "lucide-react";

interface Escrita {
  id: string;
  title: string;
  content: string;
  author?: string;
}

// Escritas configuráveis - adicione suas escritas aqui
const escritas: Escrita[] = [
  {
    id: "1",
    title: "Nosso Amor",
    content: `Em cada amanhecer, penso em você,
Na doçura do seu olhar, no calor do seu abraço.
Você é meu porto seguro, minha paz,
O amor que preenche cada espaço.

Nas noites silenciosas, sussurro seu nome,
E o vento leva meus sentimentos até você.
Somos duas almas que se encontraram,
Destinadas a juntas florescer.`,
    author: "Para você, com amor"
  },
  {
    id: "2",
    title: "Promessa Eterna",
    content: `Prometo estar ao seu lado,
Nos dias de sol e tempestade.
Prometo amar cada parte de você,
Com toda sinceridade.

Juntos construiremos nosso mundo,
Feito de sonhos e realidade.
Um amor que cresce a cada dia,
Uma história de cumplicidade.`,
    author: "Sempre seu"
  },
  {
    id: "3",
    title: "Você",
    content: `Você é a melodia que embala meus dias,
O sorriso que aquece meu coração.
Em você encontrei meu lar,
Minha mais bela canção.`,
    author: "Com todo meu amor"
  }
];

const EscritasSection = () => {
  return (
    <section className="min-h-screen py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-40 left-5 md:left-20 w-60 md:w-80 h-60 md:h-80 bg-accent/6 rounded-full blur-[100px] md:blur-[120px]" />
        <div className="absolute bottom-20 right-5 md:right-10 w-72 md:w-96 h-72 md:h-96 bg-primary/5 rounded-full blur-[120px] md:blur-[140px]" />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10 px-2">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
          <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl glass-soft shadow-romantic border border-primary/20 mb-4 md:mb-6">
            <PenLine className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            <Sparkles className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-4 h-4 md:w-5 md:h-5 text-accent/60 animate-twinkle" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 md:mb-4 tracking-wide">
            Escritas
          </h2>
          <p className="text-muted-foreground font-body font-light max-w-lg mx-auto leading-relaxed text-sm md:text-base px-4">
            Palavras escritas do coração, versos que expressam o que palavras simples não conseguem
          </p>
          <div className="divider-elegant w-24 md:w-32 mx-auto mt-6 md:mt-8" />
        </div>

        {/* Writings List */}
        <div className="space-y-6 md:space-y-10">
          {escritas.map((escrita, index) => (
            <article
              key={escrita.id}
              className="glass-strong rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-12 animate-fade-in-up hover:shadow-romantic transition-all duration-500 border border-primary/10"
              style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary/30 mb-4 md:mb-6" />

              {/* Title */}
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 md:mb-8 tracking-wide">
                {escrita.title}
              </h3>

              {/* Content */}
              <div className="font-display text-foreground/80 leading-loose whitespace-pre-line text-lg sm:text-xl md:text-2xl italic">
                {escrita.content}
              </div>

              {/* Author */}
              {escrita.author && (
                <p className="mt-6 md:mt-10 text-right font-body text-primary font-light text-xs md:text-sm tracking-wider">
                  — {escrita.author}
                </p>
              )}

              {/* Decorative line */}
              <div className="mt-6 md:mt-10 flex justify-center">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 md:w-16 h-px bg-gradient-to-r from-transparent to-primary/30" />
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary/40" />
                  <div className="w-10 md:w-16 h-px bg-gradient-to-l from-transparent to-primary/30" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {escritas.length === 0 && (
          <div className="text-center py-16 md:py-20 glass rounded-2xl md:rounded-3xl">
            <PenLine className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground/30 mx-auto mb-3 md:mb-4" />
            <p className="text-muted-foreground font-body text-sm md:text-base">
              Nenhuma escrita adicionada ainda
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-12 md:mt-20 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p className="text-muted-foreground/50 text-xs md:text-sm font-body font-light flex items-center justify-center gap-2">
            <span className="w-6 md:w-8 h-px bg-primary/30" />
            Cada palavra é um pedacinho do meu coração
            <span className="w-6 md:w-8 h-px bg-primary/30" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default EscritasSection;