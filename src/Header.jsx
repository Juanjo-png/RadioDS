import "./Header.css";
import Options from "./Options.jsx";
import React, { useState } from "react";

function Header({ volume, onVolumeChange }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="header">
      <a href="#">
        <img src="/assets/icons/Logo.png" className="logo" />
      </a>
      <div>
        <button onClick={() => setShowModal(true)} className="menuButton">
          <img src="/assets/icons/SettingsIcon.png" className="menuIconImg" />
        </button>
        <Options
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          volume={volume} // ✅ Pasar volumen actual
          onVolumeChange={onVolumeChange} // ✅ Pasar función para cambiarlo
        />
      </div>
    </div>
  );
}

export default Header;
