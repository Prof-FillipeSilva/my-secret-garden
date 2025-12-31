import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Heart, Sparkles, ArrowDown } from "lucide-react";

const WelcomeSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // 🔹 ADICIONADOS
  const [volume, setVolume] = useState(0.8);
  const [isSeeking, setIsSeeking] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const loaded = () => setDuration(audio.duration);

    const ended = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", loaded);
    audio.addEventListener("ended", ended);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", loaded);
      audio.removeEventListener("ended", ended);
    };
  }, []);

  // 🔹 volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 🔹 clique na barra
  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;

    audio.currentTime = percent * audio.duration;
    setProgress(percent * 100);
  };

  // 🔹 arrastar bolinha
  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const bar = e.currentTarget.parentElement!;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.min(Math.max(x / rect.width, 0), 1);

    audio.currentTime = percent * audio.duration;
    setProgress(percent * 100);
  };

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const scrollToNext = () => {
    document.getElementById("escritas")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen py-16 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="container mx-auto max-w-2xl text-center relative z-10">

        {/* Logo */}
        <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
          <Heart className="w-12 h-12 text-primary animate-float" />
          <Sparkles className="absolute -top-2 -right-2 text-gold" />
        </div>

        {/* Título */}
        <h1 className="font-display text-4xl text-foreground mb-4">
          Bem-vinda, <span className="text-gradient-royal">Meu Benzinho!</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-muted-foreground mb-10">
          <strong>Hoje, pela última vez, vou chamar você assim.</strong> Aproveite, foi criado só pra você, com muito amor e carinho.
          Aqui era pra ser um áudio <em>(kkkk)</em>, mas deu um pequeno erro no meu sistema
          <em> (sistema do Fillipe)</em>, então preferi escrever. Vou te explicar como vai funcionar.
          <br /><br />

          Eu espero, de verdade, que esses dias tenham sido mais fáceis pra você do que foram pra mim
          <em> kkkk</em>, mas enfim… isso aqui foi feito pra você, e só pra você. Por hoje, aproveite as secções que já estão liberadas. As outras só vão ficar disponíveis amanhã, no dia do seu aniversário — tá chegando, hein, guenta aí <em>kkkk</em>. Esse início é só pra te explicar que o site está subdividido em secções, mas nem todas você vai ter acesso agora.
          <br /><br />

          A secção <strong>“ESCRITAS”</strong> guarda todos os poemas que te mandei e todos os que escrevi
          que tinham ao menos um pouquinho de você neles, desde que a gente se conheceu e desde que voltei
          a escrever.
          <br /><br />

          As secções <strong>“FOTOS”</strong> e <strong>“MÚSICAS”</strong> trazem todas as nossas melhores
          lembranças em cada categoria. Essas três secções já estão liberadas — aproveite.
          <br /><br />

          A próxima secção, <strong>“SURPRESA”</strong>, traz uma mensagem especial de aniversário pra você.
          Ela só vai estar liberada às <strong>00h00 do dia 31/12/2025</strong> — já já <em>kkkk</em>. E, como te falei, independente do que qualquer pessoa faça, eu serei o primeiro a te desejar feliz aniversário <em>kkkk</em>. Não sei se vai ser o primeiro que você vai ver, mas assim que virar o dia, vai estar liberado lá pra você.
          <br /><br />

          A secção <strong>“PRESENTES”</strong> é uma secção muito boa e reflexiva. Lá eu te falo algumas coisinhas e explico o significado de cada um desses presentes que você vai receber — e como cada um deles tem um significado real. Essa secção só vai ser liberada amanhã também, quando você receber o presente, que deixei a
          cargo da <strong>Ket</strong>. E eu sei que ela não vai deixar você ver antes <em>kkkkk</em>. Então a liberação meio que vai depender do horário que ela te entregar <em>kkkk</em>. Vou deixar a contagem regressiva lá e vou falando com ela. Também vou deixar os títulos nos áudios. A cada presente que você receber, escute o áudio correspondente — você vai conseguir entender um por um.
          <br /><br />

          Por fim, a secção <strong>“DESPEDIDA”</strong>. Essa secção é um pouco mais pesada, mas é necessária. Ela só vai ser liberada <strong>uma hora depois</strong> de você receber os presentes, porque é a secção que põe fim ao ciclo. Você vai entender melhor quando chegar nela. Não sei se vai gostar de tudo — principalmente da última secção — mas é isso.
          <br /><br />

          Acho que ficou bem explicado. Aproveita esse tour, tá? Até amanhã ainda tem bastante coisa e... 
          <strong>Foi feito com muito amor e carinho.</strong>
        </p>

      </div>
    </section>
  );
};

export default WelcomeSection;
