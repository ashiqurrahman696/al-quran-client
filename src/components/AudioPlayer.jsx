"use client";

import { FaPlay, FaPause } from "react-icons/fa6";
import { useRef, useState } from "react";

export default function AudioPlayer({ src, title = "Audio Track", theme }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Toggle Play and Pause
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

    // Update current time as the audio plays
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // Grab total duration once metadata loads
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // Scrub/Seek to a specific timestamp
    const handleSeek = (e) => {
        const newTime = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    // Helper to format seconds into MM:SS
    const formatTime = (time) => {
        if (isNaN(time) || !isFinite(time)) return "00:00";

        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);

        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");

        if (hours > 0) {
            return `${hours.toString().padStart(2, "0")}:${formattedMinutes}:${formattedSeconds}`;
        }

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <div className={`w-full p-4 text-center rounded-xl shadow-md bottom-4 sticky mt-6 bg-base-300 ${theme === "light" ? "text-black" : "text-white"}`}>
            {/* Hidden native audio element */}
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />

            <p className="font-medium mb-3">{title}</p>

            <div className="space-y-4">

                {/* Seek Bar and Timestamps */}
                <div className="flex items-center justify-between gap-2 text-xs text-zinc-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
                <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className={`w-full cursor-pointer ${theme === "light" ? "accent-black" : "accent-white"}`}
                />

                {/* Play / Pause Button */}
                <button
                onClick={togglePlay}
                    className={`btn btn-circle ${theme === "light" ? "btn-base-300" : "btn-neutral"}`}
                >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
            </div>
        </div>
    );
}
