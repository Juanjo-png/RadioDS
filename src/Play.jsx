import "./Play.css";
import {
  useCallback,
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

const Play = forwardRef(({ volume }, ref) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch("/assets/songs/songs.json")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Error cargando songs.json:", err));
  }, []);

  const playSongAtIndex = useCallback(
    (index) => {
      if (songs.length === 0 || index < 0 || index >= songs.length) return;
      setCurrentIndex(index);
      setCurrentSong(songs[index]);
      setIsPlaying(true);
    },
    [songs]
  );

  const playSpecificSong = (song) => {
    const index = songs.findIndex((s) => s.src === song.src);
    if (index !== -1) {
      playSongAtIndex(index);
    }
  };

  useImperativeHandle(ref, () => ({
    playSpecificSong,
  }));

  const handlePrevious = () => {
    if (currentIndex === null) return;
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSongAtIndex(prevIndex);
  };

  const handleNext = () => {
    if (currentIndex === null) return;
    const nextIndex = (currentIndex + 1) % songs.length;
    playSongAtIndex(nextIndex);
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;

    if (currentSong === null) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      playSongAtIndex(randomIndex);
    } else if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((err) => console.error("Error al reanudar:", err));
      setIsPlaying(true);
    }
  };

  // Reproducir la canción y establecer volumen sin recargar por cambio de volumen
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSong) {
      audio.src = currentSong.src;
      audio.load();
      audio.play()
        .then(() => {
          audio.volume = volume;
          setIsPlaying(true);
        })
        .catch((err) => console.error("Error al reproducir:", err));
    }
  }, [currentSong]);

  // Actualizar volumen sin reiniciar canción
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener("ended", handleNext);
    return () => audio.removeEventListener("ended", handleNext);
  }, [handleNext]);

  return (
    <div className="playCenter">
      <div className="playControls">
        <button onClick={handlePrevious} className="menuButton">
          <img src="/assets/icons/Back.png" className="controls" />
        </button>
        <button onClick={handlePlayPause} className="menuButton">
          {isPlaying ? (
            <img src="/assets/icons/Stop.png" className="menuIconImgPlay" />
          ) : (
            <img src="/assets/icons/Play.png" className="menuIconImgPlay" />
          )}
        </button>
        <button onClick={handleNext} className="menuButton">
          <img src="/assets/icons/Next.png" className="controls" />
        </button>
      </div>

      {!currentSong && (
        <p style={{ marginTop: "10px" }}>Haz click para reproducir música</p>
      )}

      {currentSong && (
        <>
          <img
            src={"/assets/icons/" + currentSong.juego + ".png"}
            className="gameIcon"
          />
          <p>
            {currentSong.title} - {currentSong.juego}
          </p>
          <p>{currentSong.series}</p>
          <audio ref={audioRef} />
        </>
      )}
    </div>
  );
});

export default Play;
