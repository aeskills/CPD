import { useYouTubePlayer } from "../hooks/useYouTubePlayer";

export default function VideoPlayer({
  videoId,
  onProgressUpdate,
  onVideoEnd,
}) {
  const { play, pause, seekBy, setSpeed, setVolume, toggleMute } =
    useYouTubePlayer({
      containerId: "yt-player-container",
      videoId,
      onProgressUpdate,
      onVideoEnd,
    });

  return (
    <div>
      <div className="video-container">
        <div
          id="yt-player-container"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="video-controls">
        <button
          className="video-ctrl-btn"
          onClick={() => seekBy(-10)}
          title="Rewind 10s"
        >
          ⏪
        </button>
        <button className="video-ctrl-btn" onClick={play} title="Play">
          ▶
        </button>
        <button className="video-ctrl-btn" onClick={pause} title="Pause">
          ⏸
        </button>
        <button
          className="video-ctrl-btn"
          onClick={() => seekBy(10)}
          title="Forward 10s"
        >
          ⏩
        </button>
        <button
          className="video-ctrl-btn"
          onClick={toggleMute}
          title="Toggle Mute"
        >
          🔊
        </button>
        <select
          className="speed-select"
          defaultValue="1"
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
        >
          <option value="0.5">0.5x</option>
          <option value="0.75">0.75x</option>
          <option value="1">1x</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
    </div>
  );
}
