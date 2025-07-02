import React, { useState, useEffect } from "react";
import "./Playlists.css";

const Playlists = ({ onClose, onSongSelect }) => {
  const [songs, setSongs] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(null);

  useEffect(() => {
    fetch("/assets/songs/songs.json")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Error cargando songs.json:", err));
  }, []);

  const groupedBySeries = songs.reduce((acc, song) => {
    if (!acc[song.juego]) acc[song.juego] = [];
    acc[song.juego].push(song);
    return acc;
  }, {});

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setSelectedSeries(null);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2 className="modal-title">
          {selectedSeries ? selectedSeries : "🎶Selecciona un juego🎶"}
        </h2>

        {selectedSeries ? (
          <div>
          <ul className="song-list">
            {groupedBySeries[selectedSeries].map((song, idx) => (
              <li
                key={idx}
                className="song-item"
                onClick={() => {
                  onSongSelect(song);
                  onClose();
                }}
              >
                {song.title}
              </li>
            ))}
          </ul>
          <button className="back-btn" onClick={() => setSelectedSeries(null)}>⬅️ Volver</button>
          </div>
        ) : (
          <ul className="playlist-list">
            {Object.keys(groupedBySeries).map((seriesName, idx) => (
              <div className="listaItem" key={idx}>
                <img
                  className="JuegoIconoPlaylist"
                  src={`/assets/icons/${seriesName}.png`}
                  alt={seriesName}
                />
                <li
                  onClick={() => setSelectedSeries(seriesName)}
                  className="playlist-item"
                >
                  {seriesName}
                </li>
              </div>
            ))}
          </ul>
        )}

        <button
          onClick={() => {
            setSelectedSeries(null);
            onClose();
          }}
          className="close-button"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Playlists;
