import React, { useEffect, useRef, useState } from "react";
import "./Options.css";

const Options = ({ isOpen, onClose, volume, onVolumeChange }) => {
  const modalRef = useRef();
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [subModalTitle, setSubModalTitle] = useState("");

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
        setSubModalOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const openSubModal = (title) => {
    setSubModalTitle(title);
    setSubModalOpen(true);
  };

  const handleBack = () => {
    setSubModalOpen(false);
    setSubModalTitle("");
  };

  const changeBackground = (number) => {
    const background = document.querySelector(".background");
    background.className = "background bg" + number;
    localStorage.setItem("background", "bg" + number);
  };

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>

        {!subModalOpen && (
          <>
            <h2 className="tituloOpciones">⚙️Opciones⚙️</h2>
            <div className="options">
              <button onClick={() => openSubModal("Volumen")}>
                🔊 Volumen
              </button>
              <button onClick={() => openSubModal("Fondos")}>🖼️ Fondos</button>
              <button onClick={() => openSubModal("Información")}>
                ℹ️ Información
              </button>
              <button onClick={() => openSubModal("Otros Proyectos")}>
                👾 Otros Proyectos
              </button>
            </div>
          </>
        )}

        {subModalOpen && (
          <div className="submodal">
            <h4 className="subtituloOpciones">{subModalTitle}</h4>

            {subModalTitle === "Volumen" && (
              <>
                <input
                  className="slider"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                />
                <p className="subtitulo">{Math.round(volume * 100)}%</p>
              </>
            )}

            {subModalTitle === "Fondos" && (
              <div className="fondos-options">
                <button onClick={() => changeBackground(1)}>
                  🍃Animal Crossing🍃
                </button>
                <button onClick={() => changeBackground(2)}>
                  👻Mundo Misterioso👻
                </button>
                <button onClick={() => changeBackground(3)}>
                  ❄️Kyurem Negro⚡
                </button>
                <button onClick={() => changeBackground(4)}>
                  🦔Sonic Colors💙
                </button>
              </div>
            )}

            {subModalTitle === "Información" && (
              <div className="info">
                <h3>
                  Radio DS es un sitio web sin animo de lucro que utiliza música
                  licenciada por Nintendo. El objetivo de la página es servir
                  como proyecto personal.
                </h3>

                <h3>Creado a partir de:</h3>
                <img src="/assets/icons/react.png" className="logoreact" />
                <h3>Con ❤️ por Juan José García</h3>
                {/* <img src="/assets/icons/mariodance.gif" className="logoreact"/> */}
              </div>
            )}

            {subModalTitle === "Otros Proyectos" && (
              <div className="info">
                <h3>¿Te ha gustado la web? Pues tengo una buena noticia 😏, dispongo de otros proyectos
                  similares en mi portfolio que quizás te interesen.</h3>
                <a href="https://portfolio-juanjo-garcia.vercel.app">
                  <button className="some-btn">
                    💻 Portfolio
                  </button>
                </a>
                <h3> Dale un vistazillo si te apetece, quizás encuentres algo que te mole 😎</h3>
              </div>
            )}

            <button className="back-btn" onClick={handleBack}>
              ⬅️ Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Options;
