import { useState, useCallback, useEffect } from "react";
import { modules } from "../data/modules";
import VideoPlayer from "../components/VideoPlayer";
import Sidebar from "../components/Sidebar";

export default function SessionPage({
  moduleId,
  onNavigate,
  updateVideoProgress,
  completeNoVideoModule,
  isVideoComplete,
  areAllVideosComplete,
  isAllComplete,
  progress,
  addToast,
  updateModuleLinks,
}) {
  const module = modules.find((m) => m.id === moduleId) || modules[0];
  const playableVideos = module.videos.filter((v) => !v.comingSoon);
  const hasVideos = playableVideos.length > 0;
  const [currentVideo, setCurrentVideo] = useState(hasVideos ? playableVideos[0] : null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const quizPassed = progress.quizPassed[module.id] || false;

  // Complete no-video module immediately when visiting it
  useEffect(() => {
    if (!hasVideos) {
      completeNoVideoModule(module.id);
    }
  }, [hasVideos, module.id, completeNoVideoModule]);

  // Show course completion toast when all sessions are complete
  const [completeToastShown, setCompleteToastShown] = useState(false);
  useEffect(() => {
    if (isAllComplete && isAllComplete() && !completeToastShown) {
      setCompleteToastShown(true);
      setTimeout(() => {
        addToast(
          "🎓 All CPD Series & Sessions complete! Your certificate is ready!",
          "success"
        );
      }, 1500);
    }
  }, [isAllComplete, completeToastShown, addToast]);

  const handleProgressUpdate = useCallback(
    (percentage) => {
      if (!currentVideo) return;
      updateVideoProgress(currentVideo.id, percentage);

      // Milestone notifications
      const prevPct = progress.videoProgress[currentVideo.id] || 0;
      if (prevPct < 50 && percentage >= 50) {
        addToast("50% of this video watched!", "info");
      }
      if (prevPct < 95 && percentage >= 95) {
        addToast(`Video "${currentVideo.title}" completed! ✅`, "success");
      }
    },
    [currentVideo, updateVideoProgress, progress.videoProgress, addToast]
  );

  const handleVideoEnd = useCallback(() => {
    if (!currentVideo) return;
    updateVideoProgress(currentVideo.id, 100);
    addToast(`Video "${currentVideo.title}" completed! ✅`, "success");
  }, [currentVideo, updateVideoProgress, addToast]);

  const handleSelectVideo = (video) => {
    if (video.comingSoon) return;
    setCurrentVideo(video);
    setMobileSidebar(false);
  };

  const handleOpenQuiz = () => {
    // Quiz removed
  };

  const handleQuizComplete = (score, total) => {
    // Quiz removed
  };

  const handleEndSession = () => {
    onNavigate("modules");
  };

  return (
    <div className="session-page animate-fade-in">
      <div className="session-layout">
        {/* Main Video Area */}
        <div className="session-main">
          {hasVideos && currentVideo ? (
            <>
              <VideoPlayer
                videoId={currentVideo.youtubeId}
                onProgressUpdate={handleProgressUpdate}
                onVideoEnd={handleVideoEnd}
              />

              <div className="video-info">
                <div
                  className="flex items-center justify-between"
                  style={{ marginBottom: "var(--space-2)" }}
                >
                  <div>
                    <h2>{currentVideo.title}</h2>
                    <p>
                      {module.title} · {currentVideo.duration}
                    </p>
                  </div>
                  <button
                    className="mobile-menu-btn"
                    onClick={() => setMobileSidebar(true)}
                  >
                    ☰
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* No videos — show resource-focused landing */
            <div className="no-video-hero">
              <div className="no-video-hero-content">
                <div className="no-video-icon-large">📋</div>
                <h2>{module.topic}</h2>
                <p className="no-video-description">
                  {module.description
                    ? module.description.split("\n")[0]
                    : "Explore the templates and resources in this session."}
                </p>
                <div className="no-video-features">
                  {module.resourceSections &&
                    module.resourceSections.map((sec, i) => (
                      <div key={i} className="no-video-feature-chip">
                        <span>{sec.icon}</span>
                        <span>{sec.title}</span>
                        <span className="chip-count">{sec.resources.length}</span>
                      </div>
                    ))}
                </div>
                <p className="no-video-hint">
                  ← Browse the sidebar to explore templates and take the quiz
                </p>
              </div>
              <button
                className="mobile-menu-btn no-video-menu-btn"
                onClick={() => setMobileSidebar(true)}
              >
                ☰ Open Sidebar
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <Sidebar
          module={module}
          currentVideoId={currentVideo?.id}
          onSelectVideo={handleSelectVideo}
          videoProgress={progress.videoProgress}
          isVideoComplete={isVideoComplete}
          areAllVideosComplete={areAllVideosComplete}
          onEndSession={handleEndSession}
          isMobileOpen={mobileSidebar}
          onCloseMobile={() => setMobileSidebar(false)}
          moduleLinks={progress.moduleLinks || {}}
          updateModuleLinks={updateModuleLinks}
          userEmail={progress.email}
        />
      </div>
    </div>
  );
}
