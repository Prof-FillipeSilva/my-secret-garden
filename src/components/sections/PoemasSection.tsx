import { PenLine, Quote } from "lucide-react";

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
    <section className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose/10 mb-4">
            <PenLine className="w-8 h-8 text-rose" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            Poemas
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Palavras escritas do coração, versos que expressam o que palavras simples não conseguem
          </p>
        </div>

        {/* Poems List */}
        <div className="space-y-10">
          {poemas.map((poema, index) => (
            <article
              key={poema.id}
              className="bg-card rounded-2xl p-8 md:p-10 shadow-soft border border-border/30 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-rose/30 mb-4" />

              {/* Title */}
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                {poema.title}
              </h3>

              {/* Content */}
              <div className="font-body text-foreground/80 leading-relaxed whitespace-pre-line text-lg">
                {poema.content}
              </div>

              {/* Author */}
              {poema.author && (
                <p className="mt-8 text-right font-display text-rose italic">
                  — {poema.author}
                </p>
              )}

              {/* Decorative line */}
              <div className="mt-8 flex justify-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose/40 to-transparent" />
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {poemas.length === 0 && (
          <div className="text-center py-16">
            <PenLine className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-body">
              Nenhum poema adicionado ainda
            </p>
          </div>
        )}

        {/* Footer Note */}
        <p className="text-center text-muted-foreground/60 text-sm mt-16 font-body">
          💜 Cada palavra é um pedaço do meu coração
        </p>
      </div>
    </section>
  );
};

export default PoemasSection;
