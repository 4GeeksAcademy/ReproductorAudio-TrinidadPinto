import React, { useState, useEffect, useRef } from "react";
import "../../styles/index.css"; 

const Home = () => {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        fetch("https://playground.4geeks.com/sound/songs")
        .then((response) => response.json())
        .then((data) => {
            setSongs(data.songs); 
        })
        .catch((error) =>
            console.error("Error al cargar las canciones:", error)
        );
    }, []);

    const getFullUrl = (relativeUrl) =>
        `https://playground.4geeks.com${relativeUrl}`;

    const playSong = (relativeUrl) => {
        const fullUrl = getFullUrl(relativeUrl);
        setCurrentSong(fullUrl);
        audioRef.current.load();
        audioRef.current.play();
        setIsPlaying(true);
    };

    const handlePlayPause = () => {
        if (isPlaying) {
        audioRef.current.pause();
        } else {
        audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        const currentIndex = songs.findIndex(
        (song) => getFullUrl(song.url) === currentSong
        );
        const nextIndex = (currentIndex + 1) % songs.length;
        playSong(songs[nextIndex].url);
    };

    const handlePrev = () => {
        const currentIndex = songs.findIndex(
        (song) => getFullUrl(song.url) === currentSong
        );
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        playSong(songs[prevIndex].url);
    };

    return (
        <div className="player-wrapper">
            <h1>Reproductor de Música</h1>
            <div className="player-container">
                {songs.length === 0 ? (
                    <p>Cargando canciones...</p>
                    ) : (
                    <ul className="song-list">
                        {songs.map((song, index) => (
                        <li
                            key={index}
                            onClick={() => playSong(song.url)}
                            className={
                            currentSong === getFullUrl(song.url) ? "active" : ""
                            }
                        >
                            {index + 1}. {song.name}
                        </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="controls">
                <button className="control-btn" onClick={handlePrev}>⏮</button>
                <button className="control-btn" onClick={handlePlayPause}>
                    {isPlaying ? "⏸" : "▶"}
                </button>
                <button className="control-btn" onClick={handleNext}>⏭</button>
            </div>

            <audio ref={audioRef}>
                <source src={currentSong} type="audio/mpeg" />
                Tu navegador no soporta el audio HTML5.
            </audio>
        </div>
    );
};

export default Home;
