import { useState, useCallback, useEffect } from "react";
import { modules } from "../data/modules";

const STORAGE_PREFIX = "cpd_progress_";
const ACTIVE_USER_KEY = "cpd_active_user";

function getUserStorageKey(email) {
  return STORAGE_PREFIX + (email || "anonymous").toLowerCase().trim();
}

function getDefaultProgress() {
  return {
    videoProgress: {},    // { "v1-1": 98, "v1-2": 45, ... } — percentage watched
    quizScores: {},       // { 1: 8, 2: 9, ... } — score out of 10
    quizPassed: {},       // { 1: true, 2: false, ... }
    modulesUnlocked: modules.map((m) => m.id), // all modules unlocked — free access
    completedModules: [], // fully completed modules
    userName: "",
    firstName: "",
    lastName: "",
    schoolName: "",
    email: "",
    isLoggedIn: false,    // whether user is authenticated
    moduleLinks: {},      // { moduleId: { teacherLink: "", galleryLink: "" } }
  };
}

function loadProgress() {
  try {
    // Check if there's an active user session
    const activeEmail = localStorage.getItem(ACTIVE_USER_KEY);
    if (activeEmail) {
      const key = getUserStorageKey(activeEmail);
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure isLoggedIn is true for active sessions
        parsed.isLoggedIn = true;
        return parsed;
      }
    }
    
    // Migrate old single-key data if it exists (one-time migration)
    const oldData = localStorage.getItem("cpd_progress");
    if (oldData) {
      const parsed = JSON.parse(oldData);
      if (parsed.email && parsed.isLoggedIn) {
        // Save under new user-specific key
        const key = getUserStorageKey(parsed.email);
        localStorage.setItem(key, JSON.stringify(parsed));
        localStorage.setItem(ACTIVE_USER_KEY, parsed.email);
        localStorage.removeItem("cpd_progress");
        return parsed;
      }
      // Old data without email — just remove it
      localStorage.removeItem("cpd_progress");
    }
  } catch (e) {
    console.warn("Failed to load progress:", e);
  }
  return getDefaultProgress();
}

function saveProgress(progress) {
  try {
    if (progress.isLoggedIn && progress.email) {
      const key = getUserStorageKey(progress.email);
      localStorage.setItem(key, JSON.stringify(progress));
      localStorage.setItem(ACTIVE_USER_KEY, progress.email);
    }
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

      const newVideoProgress = {
        ...prev.videoProgress,
        [videoId]: Math.min(100, Math.round(percentage)),
      };

      // Automatically mark module as complete if all playable videos are done
      let newCompletedModules = [...prev.completedModules];
      const targetModule = modules.find((m) => m.videos.some((v) => v.id === videoId));
      if (targetModule) {
        const playableVideos = targetModule.videos.filter((v) => !v.comingSoon);
        const allDone = playableVideos.every(
          (v) => (newVideoProgress[v.id] || 0) >= 95
        );
        if (allDone && !newCompletedModules.includes(targetModule.id)) {
          newCompletedModules.push(targetModule.id);
        }
      }

      return {
        ...prev,
        videoProgress: newVideoProgress,
        completedModules: newCompletedModules,
      };
    });
  }, []);

  const completeNoVideoModule = useCallback((moduleId) => {
    setProgress((prev) => {
      if (prev.completedModules.includes(moduleId)) return prev;
      return {
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
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
      const playableVideos = mod.videos.filter((v) => !v.comingSoon);
      const hasVideos = playableVideos.length > 0;

      if (!hasVideos) {
        return progress.completedModules.includes(mod.id) ? 100 : 0;
      }

      return getModuleVideoProgress(playableVideos);
    },
    [getModuleVideoProgress, progress.completedModules]
  );

  const submitQuiz = useCallback(
    (moduleId, score, total) => {
      // Quiz is now disabled / coming soon. Keep as no-op.
      return false;
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
    // Only require completion for active modules that have playable videos
    const activeModules = modules.filter((m) => 
      m.videos && m.videos.some((v) => !v.comingSoon)
    );
    return activeModules.every((m) =>
      progress.completedModules.includes(m.id)
    );
  }, [progress.completedModules]);

  const setUserName = useCallback((name) => {
    setProgress((prev) => ({ ...prev, userName: name }));
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = getDefaultProgress();
    setProgress(fresh);
    localStorage.removeItem(ACTIVE_USER_KEY);
  }, []);

  const updateModuleLinks = useCallback((moduleId, teacherLink, galleryLink) => {
    setProgress((prev) => {
      const newLinks = {
        ...prev.moduleLinks,
        [moduleId]: { teacherLink, galleryLink },
      };
      return {
        ...prev,
        moduleLinks: newLinks,
      };
    });
  }, []);

  const loginUser = useCallback((user) => {
    const email = (user.email || "").toLowerCase().trim();
    
    // Load this specific user's saved progress (if they logged in before)
    let existingProgress = getDefaultProgress();
    try {
      const key = getUserStorageKey(email);
      const stored = localStorage.getItem(key);
      if (stored) {
        existingProgress = JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Failed to load user progress:", e);
    }
    
    // Merge user identity with their saved progress
    const merged = {
      ...existingProgress,
      isLoggedIn: true,
      firstName: user.firstName,
      lastName: user.lastName,
      email: email,
      schoolName: user.schoolName || existingProgress.schoolName || "",
      userName: `${user.firstName} ${user.lastName}`.trim(),
    };
    
    setProgress(merged);
    localStorage.setItem(ACTIVE_USER_KEY, email);
  }, []);

  const updateSchoolName = useCallback((schoolName) => {
    setProgress((prev) => ({
      ...prev,
      schoolName: schoolName,
    }));
  }, []);

  const logoutUser = useCallback(() => {
    // Clear the active session marker
    localStorage.removeItem(ACTIVE_USER_KEY);
    // Reset to a completely fresh state
    setProgress(getDefaultProgress());
  }, []);

  return {
    progress,
    updateVideoProgress,
    completeNoVideoModule,
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
    updateModuleLinks,
    loginUser,
    updateSchoolName,
    logoutUser,
  };
}
