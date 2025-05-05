import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./../styles/index.css";

const Home = () => {
  const canciones = [
    { name: "Overworld", url: "https://assets.breatheco.de/apis/sound/files/mario/songs/overworld.mp3" },
    { name: "Castle", url: "https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3" },
    { name: "Star", url: "https://assets.breatheco.de/apis/sound/files/mario/songs/hurry-starman.mp3" },
    { name: "Underworld", url: "https://assets.breatheco.de/apis/sound/files/mario/songs/underworld.mp3" },
    { name: "Water World", url: "https://assets.breatheco.de/apis/sound/files/mario/songs/water-world.mp3" },
    { name: "Game Over", url: "https://assets.breatheco.de/apis/sound/files/mario/songs/game-over.mp3" },
    { name: "Bowser Battle", url: "https://assets.breatheco.de/apis/sound/files/mario/songs/bowser.mp3" },
    { name: "Level Complete", url: "https://assets.breatheco.de/apis/sound/files/mario/songs/stage-clear.mp3" },
    { name: "1-Up", url: "https://assets.breatheco.de/apis/sound/files/mario/songs/1-up.mp3" },
    { name: "Power Up", url: "https://assets.breatheco.de/apis/sound/files/mario/songs/power-up.mp3" }
  ];  

  const audioRef = useRef(new Audio(canciones[0].url));
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current.src = canciones[currentSongIndex].url;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex]);

  const playSong = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % canciones.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) =>
      (prevIndex - 1 + canciones.length) % canciones.length
    );
  };

  const handleSongClick = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    audioRef.current.src = canciones[index].url;
    audioRef.current.play();
  };

  return (
    <div className="player-wrapper">
      <h1>Reproductor de Música</h1>
      <div className="player-container">
        <ol className="song-list">
          {canciones.map((cancion, index) => (
            <li
              key={index}
              onClick={() => handleSongClick(index)}
              className={index === currentSongIndex ? "active" : ""}
            >
              {cancion.name}
            </li>
          ))}
        </ol>

        <div className="controls">
          <button onClick={prevSong} className="control-btn">◀◀</button>
          {isPlaying ? (
            <button onClick={pauseSong} className="control-btn">⏸</button>
          ) : (
            <button onClick={playSong} className="control-btn">▶</button>
          )}
          <button onClick={nextSong} className="control-btn">▶▶</button>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Home />);
