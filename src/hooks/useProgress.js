import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "cpd_progress";

function loadProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn("Failed to load progress:", e);
  }
  return {
    videoProgress: {},    // { "v1-1": 98, "v1-2": 45, ... } — percentage watched
    quizScores: {},       // { 1: 8, 2: 9, ... } — score out of 10
    quizPassed: {},       // { 1: true, 2: false, ... }
    modulesUnlocked: [1, 2, 3, 4], // all modules unlocked — free access
    completedModules: [], // fully completed modules
    userName: "",
  };
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn("Failed to save progress:", e);
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const updateVideoProgress = useCallback((videoId, percentage) => {
    setProgress((prev) => {
      const current = prev.videoProgress[videoId] || 0;
      if (percentage <= current) return prev;
      return {
        ...prev,
        videoProgress: {
          ...prev.videoProgress,
          [videoId]: Math.min(100, Math.round(percentage)),
        },
      };
    });
  }, []);

  const isVideoComplete = useCallback(
    (videoId) => {
      return (progress.videoProgress[videoId] || 0) >= 95;
    },
    [progress.videoProgress]
  );

  const areAllVideosComplete = useCallback(
    (moduleVideos) => {
      return moduleVideos.every(
        (v) => (progress.videoProgress[v.id] || 0) >= 95
      );
    },
    [progress.videoProgress]
  );

  const getModuleVideoProgress = useCallback(
    (moduleVideos) => {
      if (!moduleVideos || moduleVideos.length === 0) return 0;
      const total = moduleVideos.reduce(
        (sum, v) => sum + (progress.videoProgress[v.id] || 0),
        0
      );
      return Math.round(total / moduleVideos.length);
    },
    [progress.videoProgress]
  );

  const getModuleCompletion = useCallback(
    (mod) => {
      const videoWeight = 0.7;
      const quizWeight = 0.3;
      const videoProgress = getModuleVideoProgress(mod.videos);
      const quizScore = progress.quizPassed[mod.id] ? 100 : 0;
      return Math.round(videoProgress * videoWeight + quizScore * quizWeight);
    },
    [getModuleVideoProgress, progress.quizPassed]
  );

  const submitQuiz = useCallback(
    (moduleId, score, total) => {
      const passed = score / total >= 0.7;
      setProgress((prev) => {
        const newState = {
          ...prev,
          quizScores: { ...prev.quizScores, [moduleId]: score },
          quizPassed: { ...prev.quizPassed, [moduleId]: passed },
        };

        // Unlock next module if passed
        if (passed) {
          const nextModuleId = moduleId + 1;
          if (
            nextModuleId <= 4 &&
            !newState.modulesUnlocked.includes(nextModuleId)
          ) {
            newState.modulesUnlocked = [
              ...newState.modulesUnlocked,
              nextModuleId,
            ];
          }
          // Mark current module as complete
          if (!newState.completedModules.includes(moduleId)) {
            newState.completedModules = [
              ...newState.completedModules,
              moduleId,
            ];
          }
        }

        return newState;
      });
      return passed;
    },
    []
  );

  const isModuleUnlocked = useCallback(
    (moduleId) => {
      return true; // All modules are free and unlocked
    },
    []
  );

  const isModuleComplete = useCallback(
    (moduleId) => {
      return progress.completedModules.includes(moduleId);
    },
    [progress.completedModules]
  );

  const isAllComplete = useCallback(() => {
    return [1, 2, 3, 4].every((id) =>
      progress.completedModules.includes(id)
    );
  }, [progress.completedModules]);

  const setUserName = useCallback((name) => {
    setProgress((prev) => ({ ...prev, userName: name }));
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = {
      videoProgress: {},
      quizScores: {},
      quizPassed: {},
      modulesUnlocked: [1, 2, 3, 4],
      completedModules: [],
      userName: "",
    };
    setProgress(fresh);
    saveProgress(fresh);
  }, []);

  return {
    progress,
    updateVideoProgress,
    isVideoComplete,
    areAllVideosComplete,
    getModuleVideoProgress,
    getModuleCompletion,
    submitQuiz,
    isModuleUnlocked,
    isModuleComplete,
    isAllComplete,
    setUserName,
    resetProgress,
  };
}
