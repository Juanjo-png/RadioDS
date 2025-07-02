import "./App.css";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Play from "./Play.jsx";
import { useState, useRef, useEffect } from "react";

function App() {
  const [volume, setVolume] = useState(1);
  const [background, setBackground] = useState("");
  const playRef = useRef();

  // Cargar volumen desde localStorage al iniciar
  useEffect(() => {
    const storedVolume = localStorage.getItem("volume");
    if (storedVolume !== null) {
      setVolume(parseFloat(storedVolume));
    }
  }, []);

  //Cargar Fondo de pantalla
  useEffect(() => {
    const storedBackground = localStorage.getItem("background");
    if (storedBackground !== null) {
      setBackground(storedBackground)
    }
    else{
      setBackground("bg1")
      localStorage.setItem("background", "bg1");
    }
  }, []);

  // Guardar en localStorage al cambiar volumen
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    localStorage.setItem("volume", newVolume);
  };

  const handleSongSelect = (song) => {
    playRef.current?.playSpecificSong(song);
  };

  return (
    <div className="body">
      <Header volume={volume} onVolumeChange={handleVolumeChange} />
      <div className="centro">
        <Play ref={playRef} volume={volume} />
      </div>
      <Footer onSongSelect={handleSongSelect} />
      <div className={`background ${background}`}>.</div>
    </div>
  );
}

export default App;
