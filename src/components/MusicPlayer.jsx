import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./MusicPlayer.css";

const MusicPlayer = forwardRef(({ buttonVisible = true }, ref) => {
  const [mode, setMode] = useState("bday"); // "bday" | "bg"
  const [isPlaying, setIsPlaying] = useState(false);

  const bdayRef = useRef(null);
  const bgRef   = useRef(null);

  // ── helpers ────────────────────────────────────────────────────────────────

  const stopAll = () => {
    [bdayRef, bgRef].forEach((r) => {
      if (r.current) {
        r.current.pause();
        r.current.currentTime = 0;
      }
    });
    setIsPlaying(false);
  };

  const playTrack = (trackRef) => {
    trackRef.current
      ?.play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.error("Playback error:", err);
        setIsPlaying(false);
      });
  };

  // ── icon button toggle ─────────────────────────────────────────────────────
  const handleIconClick = () => {
    if (mode === "bg") {
      stopAll();
      setMode("bday");
      playTrack(bdayRef);
      return;
    }
    if (isPlaying) {
      bdayRef.current?.pause();
      setIsPlaying(false);
    } else {
      playTrack(bdayRef);
    }
  };

  // ── exposed API ────────────────────────────────────────────────────────────
  useImperativeHandle(ref, () => ({
    play: () => {
      stopAll();
      setMode("bg");
      setTimeout(() => playTrack(bgRef), 50);
    },
    pause: () => {
      [bdayRef, bgRef].forEach((r) => r.current?.pause());
      setIsPlaying(false);
    },
    toggle: () => handleIconClick(),

    // ── NEW: called by App when the loader finishes ────────────────────────
    startBday: () => {
      stopAll();
      setMode("bday");
      setTimeout(() => playTrack(bdayRef), 50);
    },
  }));

  // ── start BdaySong as early as possible ───────────────────────────────────
  useEffect(() => {
    const audio = bdayRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    // Attempt 1: try immediate autoplay (works if browser allows it)
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Attempt 2: browser blocked autoplay — wait for the very first
        // user interaction (tap/click/keydown) anywhere on the page,
        // then start. This fires during the loading screen so the song
        // begins as soon as the user touches anything.
        const startOnInteraction = () => {
          audio
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {}); // still blocked — give up gracefully
          // Remove all three listeners after first successful trigger
          document.removeEventListener("click",     startOnInteraction);
          document.removeEventListener("touchstart", startOnInteraction);
          document.removeEventListener("keydown",   startOnInteraction);
        };

        document.addEventListener("click",     startOnInteraction, { once: true });
        document.addEventListener("touchstart", startOnInteraction, { once: true });
        document.addEventListener("keydown",   startOnInteraction, { once: true });

        // Cleanup: if the component unmounts before interaction, remove listeners
        return () => {
          document.removeEventListener("click",     startOnInteraction);
          document.removeEventListener("touchstart", startOnInteraction);
          document.removeEventListener("keydown",   startOnInteraction);
        };
      });
  }, []);

  const icon  = isPlaying ? "⏸" : "🎵";
  const label = isPlaying ? "Pause music" : "Play music";

  return (
    <>
      <audio ref={bdayRef} loop preload="auto">
        <source src="/BdaySong.mp3" type="audio/mpeg" />
      </audio>

      <audio ref={bgRef} loop preload="auto">
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <button
        className={`music-toggle ${isPlaying ? "playing" : ""}`}
        onClick={handleIconClick}
        aria-label={label}
        title={label}
        style={{
          opacity: buttonVisible ? 1 : 0,
          pointerEvents: buttonVisible ? "auto" : "none",
          transition: "opacity 0.8s ease",
        }}
      >
        {icon}
      </button>
    </>
  );
});

MusicPlayer.displayName = "MusicPlayer";

export default MusicPlayer;