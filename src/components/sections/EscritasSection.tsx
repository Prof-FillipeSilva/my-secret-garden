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
    title: "Impasse",
    content: `Mesmo assim, sem entender
Viajei do céu ao inferno
Tudo isso então se deu
Ao findar o mês eterno

Presente, presença, pretexto
Presepadas, risadas
Uma brecha não prevista
Uma muralha abalada
Um apego coibido
Uma lâmina quebrada

Duas linhas que não cruzam
Foram criadas pelo impasse
Sentimentos e palavras retidos
Antes que a língua queimasse

Eu não sei se é o início, meio ou fim
Não sei se está perto, longe ou em mim
Só sei, que ainda está passando por aqui
E não tenho nem ideia de como fazer sair

Tentando saber o que aconteceu
Me vejo num caminho sem direção
Se esconder, se afastar? Não!
Distância não apaga conexão

Caso concreto, frio e lento
Mexe com o dado imutável
O todo poderoso tempo

Que vai de zero a cem tão rápido
E quem tentou controla-lo, falhou
Mas traz conforto em si mesmo
Pois sempre que choveu, parou`,
    author: "O primeiro"
  },
  {
    id: "2",
    title: "Anjo - Saulo",
    content: `Hoje eu acordei mais cedo
E fiquei te olhando dormir
Imaginei algum suposto medo
Para que tão logo
Pudesse te cobrir

Tenho cuidado de você
Todo esse tempo
Você está sob o meu abraço
E minha proteção
Tenho visto você errar e crescer
Amar e voar
Você sabe onde pousar

Ao acordar já terei partido
Ficarei de longe, escondido
Mas sempre perto, decerto
Como se eu fosse humano, vivo
Vivendo pra te cuidar, te proteger
Sem você me ver
Sem saber quem sou
Se sou anjo
Ou se sou
Seu amor`,
    author: "Essa música tá aqui na playlist, também"
  },
  {
    id: "3",
    title: "Who Knows",
    content: `Eu hoje quis dormir, mas a cabeça quis pensar
Deitado estava ali, mas com você, pra variar
Quis saber se era real, se realmente aconteceu
Quando o coração disparou, e o copo na mão tremeu

Eu brinquei, você brincou
Mas no fundo era de verdade
A mão boba descontou
O que não parou na vontade

Vontade de ter, te amar
Te sentir e te beijar
De grudar e não soltar
De te viver, te cuidar

Te respeito e amo demais
Até no jeito de te tocar
De sentir o seu peito no meu
De ouvir o seu suspirar

Nenhum momento hesitei
Pois no fundo ainda sei
Que aí dentro também tem
Que é recíproco, também

Mas um dia vai rolar
Talvez para me libertar
Talvez para me consolar
Talvez parar de sonhar
Talvez parar de ligar
E ainda assim vai rolar

Talvez para consertar
Tudo que estava lá
Que me colocou a pensar
Vendo a noite passar

Ainda assim vai rolar...

Ou talvez pra te mostrar
Alguém bom em te amar
Te agarrar, te pegar
Cama, parede ou sofá

Ainda assim vai rolar...

Você pode decidir
Sem precisar se punir
Pois o que está aqui
Eu sei que está aí

Por fim quero te falar
Que em qualquer dia ou lugar
No sol, na chuva ou no mar
Ainda assim vai rolar...

Who Knows?`,
    author: "Essa música também tá aqui, mas o poema foi eu que fiz kkk"
  },
  {
    id: "4",
    title: "Nós",
    content: `Cabe um universo inteiro e lindo entre o nosso olhar
Coisas que 5 minutinhos não são capazes de explicar
Apenas um “adolescente” bobão que vive pensando demais
Mãos trêmulas, frio na barriga, e um nervoso “até mais”
  
Nunca precisei dizer, só bastava mesmo te olhar
Sei que sabe e vê o que tem aqui, nosso idioma particular
Infinito particular, onde além de olhar, amar e cuidar
Posso te visitar sempre que quiser, além de sonhar
 
E por falar em sonho, acho que você devia sair daqui
Às vezes te vejo aqui do meu lado, e ainda nem dormi
Sua ausência tomou forma, e nem falo isso por drama
Tá aqui me chamando de chato, toda noite na mesma cama
 
Sempre quis te mandar flores, mas seria estranho, não?
Principalmente, que me conhecendo, chegariam de caminhão
Meu estilo 7 ou 70, você sabe como é
Mas prefiro conquistar pela boca: chocomenta, trufas e café
 
Foi fácil acertar suas preferidas, porque são as minhas também
E se tratando de orquídeas, nas azuis sempre tem você, meu bem
Mas que eu gabaritei na teoria, já está cansada de saber
Mas falando agora da prática, quando vai deixar eu fazer?
`,
    author: "Esse eu não lembrava, mas tava guardado aqui, ficou legal, também kkk"
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
            Todas as vezes que escrevi pensando em você, essas palavras trouxeram você um pouquinho mais pra perto de mim
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
            Na época que foram escritos, cada um desses poemas tinha um enorme significado, e acho que é isso que importa
            <span className="w-6 md:w-8 h-px bg-primary/30" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default EscritasSection;