import { useState } from "react";
import { useYouTubePlayer } from "../hooks/useYouTubePlayer";

export default function VideoPlayer({
  videoId,
  onProgressUpdate,
  onVideoEnd,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeedState] = useState("1");

  const { play, pause, seekBy, setSpeed, toggleMute } =
    useYouTubePlayer({
      containerId: "yt-player-container",
      videoId,
      onProgressUpdate: (pct) => {
        onProgressUpdate?.(pct);
      },
      onVideoEnd: () => {
        setIsPlaying(false);
        onVideoEnd?.();
      },
    });

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    toggleMute();
    setIsMuted(!isMuted);
  };

  return (
    <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
      <div className="video-container">
        <div
          id="yt-player-container"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="video-controls">
        <div className="video-ctrl-group">
          {/* Play / Pause Primary Red Button */}
          <button
            className="yt-play-btn"
            onClick={handlePlayPause}
            title={isPlaying ? "Pause" : "Play"}
            style={{
              height: "38px",
              padding: "0 18px",
              borderRadius: "8px",
              background: "#eb1000",
              color: "#FFFFFF",
              border: "none",
              fontWeight: "700",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(235, 16, 0, 0.3)",
              transition: "transform 0.2s ease, background 0.2s ease",
            }}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
            <span>{isPlaying ? "Pause" : "Play Video"}</span>
          </button>

          {/* Rewind 10s */}
          <button
            className="yt-ctrl-btn"
            onClick={() => seekBy(-10)}
            title="Rewind 10s"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
            </svg>
            <span>-10s</span>
          </button>

          {/* Forward 10s */}
          <button
            className="yt-ctrl-btn"
            onClick={() => seekBy(10)}
            title="Forward 10s"
          >
            <span>+10s</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
            </svg>
          </button>

          {/* Mute Toggle */}
          <button
            className="yt-ctrl-btn"
            onClick={handleToggleMute}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>
        </div>

        {/* Speed Selector */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: "700" }}>Speed:</span>
          <select
            className="speed-select"
            value={speed}
            onChange={(e) => {
              const val = e.target.value;
              setSpeedState(val);
              setSpeed(parseFloat(val));
            }}
          >
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x (Normal)</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>
    </div>
  );
}
