import { useEffect, useRef, useCallback } from "react";

let ytAPILoaded = false;
let ytAPILoading = false;
const ytAPICallbacks = [];

function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (ytAPILoaded) {
      resolve();
      return;
    }
    ytAPICallbacks.push(resolve);
    if (ytAPILoading) return;
    ytAPILoading = true;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(tag, firstScript);

    window.onYouTubeIframeAPIReady = () => {
      ytAPILoaded = true;
      ytAPICallbacks.forEach((cb) => cb());
      ytAPICallbacks.length = 0;
    };
  });
}

export function useYouTubePlayer({
  containerId,
  videoId,
  onProgressUpdate,
  onVideoEnd,
}) {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const progressCallbackRef = useRef(onProgressUpdate);
  const endCallbackRef = useRef(onVideoEnd);

  // Keep callbacks fresh
  useEffect(() => {
    progressCallbackRef.current = onProgressUpdate;
    endCallbackRef.current = onVideoEnd;
  }, [onProgressUpdate, onVideoEnd]);

  const startTracking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        try {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          if (duration > 0) {
            const pct = (currentTime / duration) * 100;
            progressCallbackRef.current?.(pct);
          }
        } catch (e) {
          // Player might be destroyed
        }
      }
    }, 2000);
  }, []);

  const stopTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const initPlayer = useCallback(
    async (ytVideoId) => {
      await loadYouTubeAPI();

      // Destroy existing player
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
        playerRef.current = null;
      }
      stopTracking();

      const container = document.getElementById(containerId);
      if (!container) return;

      // Clear container and create fresh div
      container.innerHTML = "";
      const playerDiv = document.createElement("div");
      playerDiv.id = containerId + "-player";
      container.appendChild(playerDiv);

      playerRef.current = new window.YT.Player(playerDiv.id, {
        videoId: ytVideoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          controls: 1,
          cc_load_policy: 1,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              startTracking();
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              // Do one final progress check
              if (playerRef.current) {
                try {
                  const ct = playerRef.current.getCurrentTime();
                  const dur = playerRef.current.getDuration();
                  if (dur > 0) {
                    progressCallbackRef.current?.((ct / dur) * 100);
                  }
                } catch (e) {}
              }
              stopTracking();
            } else if (event.data === window.YT.PlayerState.ENDED) {
              stopTracking();
              progressCallbackRef.current?.(100);
              endCallbackRef.current?.();
            }
          },
        },
      });
    },
    [containerId, startTracking, stopTracking]
  );

  // Initialize on videoId change
  useEffect(() => {
    if (videoId) {
      initPlayer(videoId);
    }
    return () => {
      stopTracking();
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
        playerRef.current = null;
      }
    };
  }, [videoId, initPlayer, stopTracking]);

  const play = useCallback(() => {
    playerRef.current?.playVideo?.();
  }, []);

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo?.();
  }, []);

  const seekBy = useCallback((seconds) => {
    if (playerRef.current?.getCurrentTime) {
      const current = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(current + seconds, true);
    }
  }, []);

  const setSpeed = useCallback((rate) => {
    playerRef.current?.setPlaybackRate?.(rate);
  }, []);

  const setVolume = useCallback((vol) => {
    playerRef.current?.setVolume?.(vol);
  }, []);

  const toggleMute = useCallback(() => {
    if (playerRef.current?.isMuted?.()) {
      playerRef.current.unMute();
    } else {
      playerRef.current?.mute?.();
    }
  }, []);

  return { play, pause, seekBy, setSpeed, setVolume, toggleMute, playerRef };
}
