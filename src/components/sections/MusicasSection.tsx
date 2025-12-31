import { useEffect, useRef, useState } from "react";
import {
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Disc,
} from "lucide-react";

interface Musica {
  id: string;
  title: string;
  artist: string;
  src: string;
}

const musicas: Musica[] = [
  { id: "1", title: "Equalize", artist: "Pitty", src: "/music/equalize.mp3" },
  { id: "2", title: "Faz parte do meu show", artist: "Cazuza", src: "/music/fazparte.mp3" },
  { id: "3", title: "Pétala", artist: "Djavan", src: "/music/petala.mp3" },
  { id: "4", title: "Vive", artist: "Djavan", src: "/music/vive.mp3" },
  { id: "5", title: "Escorpião", artist: "Xamã e Agnes", src: "/music/escorpiao.mp3" },
  { id: "6", title: "Palpite", artist: "Vanessa Rangel", src: "/music/palpite.mp3" },
  { id: "7", title: "Emily's Song", artist: "Daniel Caesar", src: "/music/emilly.mp3" },
  { id: "8", title: "Se", artist: "Djavan", src: "/music/se.mp3" },
  { id: "9", title: "Who Knows", artist: "Daniel Caesar", src: "/music/whoknows.mp3" },
  { id: "10", title: "Cida", artist: "Xamã e Agnes", src: "/music/cida.mp3" },
  { id: "11", title: "Imaginando coisas", artist: "G.A, Dael, Cold & Izzat", src: "/music/imaginandocoisas.mp3" },
  { id: "12", title: "Focus", artist: "H.E.R", src: "/music/focus.mp3" },
  { id: "13", title: "Oceano", artist: "Djavan", src: "/music/oceano.mp3" },
  { id: "14", title: "Infinito particular", artist: "Marisa Monte", src: "/music/infinito.mp3" },
  { id: "15", title: "La Belle De Jour", artist: "Alceu Valença", src: "/music/labelle.mp3" },
  { id: "16", title: "Sozinho", artist: "Caetano", src: "/music/sozinho.mp3" },
  { id: "17", title: "Just Love", artist: "Xamã e Agnes", src: "/music/justlove.mp3" },
  { id: "18", title: "Pequena flor", artist: "Gabriel Elias", src: "/music/pequenaflor.mp3" },
  { id: "19", title: "Pra você dar o nome", artist: "5 a seco", src: "/music/daronome.mp3" },
  { id: "20", title: "Anjo", artist: "Saulo", src: "/music/anjosaulo.mp3" },
  { id: "21", title: "Capricorniana", artist: "Poesia Acústica", src: "/music/capricorn.mp3" },
];

const MusicasSection = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null); // 🔹 ADICIONADO

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isSeeking, setIsSeeking] = useState(false); // 🔹 ADICIONADO

  const currentMusic = musicas[currentIndex];

  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentIndex((prev) => (prev + 1) % musicas.length);
  };

  const playPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? musicas.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = currentMusic.src;
    audioRef.current.load();
    if (isPlaying) audioRef.current.play();
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!isSeeking) setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("ended", playNext);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", playNext);
    };
  }, [isSeeking]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  // 🔹 ADICIONADO — clique + arrastar
  const seek = (clientX: number) => {
    if (!audioRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    audioRef.current.currentTime = percent * duration;
    setCurrentTime(percent * duration);
  };

  return (
    <section className="min-h-screen py-16 px-4">
      <audio ref={audioRef} preload="metadata" />

      <div className="max-w-4xl mx-auto">
        <div className="glass-strong rounded-3xl p-8">

          <div className="relative w-48 h-48 mx-auto mb-6">
            <div
              className={`w-full h-full rounded-full bg-gradient-to-br from-primary to-sky flex items-center justify-center ${
                isPlaying ? "animate-rotate-slow" : ""
              }`}
            >
              <Disc className="w-16 h-16 text-white/70" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-display">{currentMusic.title}</h3>
            <p className="text-muted-foreground">{currentMusic.artist}</p>
          </div>

          {/* 🔹 PROGRESSO COM SEEK */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs w-10">{formatTime(currentTime)}</span>

            <div
              ref={progressRef}
              onMouseDown={(e) => {
                setIsSeeking(true);
                seek(e.clientX);
              }}
              onMouseMove={(e) => isSeeking && seek(e.clientX)}
              onMouseUp={() => setIsSeeking(false)}
              onMouseLeave={() => setIsSeeking(false)}
              onTouchStart={(e) => {
                setIsSeeking(true);
                seek(e.touches[0].clientX);
              }}
              onTouchMove={(e) => seek(e.touches[0].clientX)}
              onTouchEnd={() => setIsSeeking(false)}
              className="flex-1 h-1 bg-secondary rounded-full relative cursor-pointer"
            >
              <div
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>

            <span className="text-xs w-10">{formatTime(duration)}</span>
          </div>

          <div className="flex justify-center gap-6 mb-6">
            <button onClick={playPrevious}><SkipBack /></button>
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center"
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button onClick={playNext}><SkipForward /></button>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Volume2 />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="mt-8 space-y-2">
          {musicas.map((musica, index) => (
            <button
              key={musica.id}
              onClick={() => {
                setCurrentIndex(index);
                setIsPlaying(true);
              }}
              className={`w-full p-4 rounded-xl flex justify-between ${
                currentIndex === index ? "glass" : "hover:bg-secondary/30"
              }`}
            >
              <div>
                <p>{musica.title}</p>
                <p className="text-sm text-muted-foreground">{musica.artist}</p>
              </div>
              {currentIndex === index && <Heart className="text-primary" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicasSection;
