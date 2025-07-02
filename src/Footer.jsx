import React, { useState } from 'react';
import Clock from './Clock';
import Playlists from './Playlists';
import './Footer.css';

function Footer({ onSongSelect }) {
  const [showPlaylists, setShowPlaylists] = useState(false);

  const togglePlaylists = () => {
    setShowPlaylists(!showPlaylists);
  };

  return (
    <div className='footer'>
      <Clock />
      <div className="buttons">
        <button className='menuButton'>
          <img src="/assets/icons/RandomPlay.png" className="menuIconImg" />
        </button>
        <button onClick={togglePlaylists} className='menuButton'>
          <img src="/assets/icons/MusicIcons.png" className="menuIconImg" />
        </button>
      </div>
      {showPlaylists && (
        <Playlists
          onClose={() => setShowPlaylists(false)}
          onSongSelect={onSongSelect} // ⬅️ Aquí se pasa
        />
      )}
    </div>
  );
}

export default Footer;
