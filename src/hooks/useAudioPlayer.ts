import { useEffect, useRef } from "react";

const useAudioPlayer = (sound: string) => {
    const audioRef = useRef(new Audio(sound));

    useEffect(() => {
        return () => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, []);

    const playAudio = () => {
        // If there's any audio playing, stop it before playing the new one
        if (!audioRef.current.paused) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        audioRef.current.play();
    };
    return { playAudio }
}

export default useAudioPlayer