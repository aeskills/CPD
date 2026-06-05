import { useState, useCallback } from "react";
import { modules } from "../data/modules";
import VideoPlayer from "../components/VideoPlayer";
import Sidebar from "../components/Sidebar";
import QuizModal from "../components/QuizModal";

export default function SessionPage({
  moduleId,
  onNavigate,
  updateVideoProgress,
  isVideoComplete,
  areAllVideosComplete,
  submitQuiz,
  progress,
  addToast,
}) {
  const module = modules.find((m) => m.id === moduleId) || modules[0];
  const [currentVideo, setCurrentVideo] = useState(module.videos[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const quizPassed = progress.quizPassed[module.id] || false;

  const handleProgressUpdate = useCallback(
    (percentage) => {
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
    updateVideoProgress(currentVideo.id, 100);
    addToast(`Video "${currentVideo.title}" completed! ✅`, "success");
  }, [currentVideo, updateVideoProgress, addToast]);

  const handleSelectVideo = (video) => {
    setCurrentVideo(video);
    setMobileSidebar(false);
  };

  const handleOpenQuiz = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = (score, total) => {
    const passed = submitQuiz(module.id, score, total);
    setShowQuiz(false);
    if (passed) {
      addToast("🎉 Quiz passed successfully!", "success");
    } else {
      addToast("Quiz not passed. Keep trying!", "error");
    }
  };

  const handleEndSession = () => {
    onNavigate("modules");
  };

  return (
    <div className="session-page animate-fade-in">
      <div className="session-layout">
        {/* Main Video Area */}
        <div className="session-main">
          <VideoPlayer
            videoId={currentVideo.youtubeId}
            onProgressUpdate={handleProgressUpdate}
            onVideoEnd={handleVideoEnd}
          />

          <div className="video-info">
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: "var(--space-4)" }}
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

            {/* Video progress indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
              }}
            >
              <div
                className="module-progress-bar"
                style={{ flex: 1, height: "4px" }}
              >
                <div
                  className="module-progress-fill"
                  style={{
                    width: `${progress.videoProgress[currentVideo.id] || 0}%`,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--text-muted)",
                  minWidth: "32px",
                }}
              >
                {Math.round(progress.videoProgress[currentVideo.id] || 0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar
          module={module}
          currentVideoId={currentVideo.id}
          onSelectVideo={handleSelectVideo}
          onOpenQuiz={handleOpenQuiz}
          videoProgress={progress.videoProgress}
          isVideoComplete={isVideoComplete}
          areAllVideosComplete={areAllVideosComplete}
          quizPassed={quizPassed}
          onEndSession={handleEndSession}
          isMobileOpen={mobileSidebar}
          onCloseMobile={() => setMobileSidebar(false)}
        />
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <QuizModal
          quiz={module.quiz}
          moduleTitle={module.title}
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
}
