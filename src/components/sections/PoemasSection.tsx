import { PenLine, Quote, Sparkles } from "lucide-react";

interface Poema {
  id: string;
  title: string;
  content: string;
  author?: string;
}

// Poemas configuráveis - adicione seus poemas aqui
const poemas: Poema[] = [
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

const PoemasSection = () => {
  return (
    <section className="min-h-screen py-16 px-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-40 left-20 w-80 h-80 bg-rose/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl glass glow-rose mb-6">
            <PenLine className="w-10 h-10 text-rose" style={{ filter: "drop-shadow(0 0 10px hsl(310 40% 60% / 0.5))" }} />
            <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-gold animate-twinkle" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4 tracking-wide">
            Poemas
          </h2>
          <p className="text-muted-foreground font-body font-light max-w-lg mx-auto leading-relaxed">
            Palavras escritas do coração, versos que expressam o que palavras simples não conseguem
          </p>
          <div className="divider-elegant w-32 mx-auto mt-8" />
        </div>

        {/* Poems List */}
        <div className="space-y-10">
          {poemas.map((poema, index) => (
            <article
              key={poema.id}
              className="glass-strong rounded-3xl p-8 md:p-12 animate-fade-in-up hover:glow-rose transition-all duration-500"
              style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
            >
              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-rose/20 mb-6" />

              {/* Title */}
              <h3 className="font-display text-3xl md:text-4xl text-foreground mb-8 tracking-wide">
                {poema.title}
              </h3>

              {/* Content */}
              <div className="font-display text-foreground/80 leading-loose whitespace-pre-line text-xl md:text-2xl italic">
                {poema.content}
              </div>

              {/* Author */}
              {poema.author && (
                <p className="mt-10 text-right font-body text-rose font-light text-sm tracking-wider">
                  — {poema.author}
                </p>
              )}

              {/* Decorative line */}
              <div className="mt-10 flex justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
                  <Sparkles className="w-4 h-4 text-gold/50" />
                  <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {poemas.length === 0 && (
          <div className="text-center py-20 glass rounded-3xl">
            <PenLine className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-body">
              Nenhum poema adicionado ainda
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-20 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p className="text-muted-foreground/50 text-sm font-body font-light flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-rose/30" />
            Cada palavra é um pedaço do meu coração
            <span className="w-8 h-px bg-rose/30" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default PoemasSection;