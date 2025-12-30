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
    <section className="min-h-screen py-20 px-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-40 left-20 w-80 h-80 bg-accent/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl glass-soft shadow-romantic border border-primary/20 mb-6">
            <PenLine className="w-10 h-10 text-primary" />
            <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-accent/60 animate-twinkle" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4 tracking-wide">
            Escritas
          </h2>
          <p className="text-muted-foreground font-body font-light max-w-lg mx-auto leading-relaxed">
            Palavras escritas do coração, versos que expressam o que palavras simples não conseguem
          </p>
          <div className="divider-elegant w-32 mx-auto mt-8" />
        </div>

        {/* Writings List */}
        <div className="space-y-10">
          {escritas.map((escrita, index) => (
            <article
              key={escrita.id}
              className="glass-strong rounded-3xl p-8 md:p-12 animate-fade-in-up hover:shadow-romantic transition-all duration-500 border border-primary/10"
              style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/30 mb-6" />

              {/* Title */}
              <h3 className="font-display text-3xl md:text-4xl text-foreground mb-8 tracking-wide">
                {escrita.title}
              </h3>

              {/* Content */}
              <div className="font-display text-foreground/80 leading-loose whitespace-pre-line text-xl md:text-2xl italic">
                {escrita.content}
              </div>

              {/* Author */}
              {escrita.author && (
                <p className="mt-10 text-right font-body text-primary font-light text-sm tracking-wider">
                  — {escrita.author}
                </p>
              )}

              {/* Decorative line */}
              <div className="mt-10 flex justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/30" />
                  <Sparkles className="w-4 h-4 text-primary/40" />
                  <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/30" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {escritas.length === 0 && (
          <div className="text-center py-20 glass rounded-3xl">
            <PenLine className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-body">
              Nenhuma escrita adicionada ainda
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-20 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p className="text-muted-foreground/50 text-sm font-body font-light flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-primary/30" />
            Cada palavra é um pedacinho do meu coração
            <span className="w-8 h-px bg-primary/30" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default EscritasSection;