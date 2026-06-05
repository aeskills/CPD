import { useState } from "react";

export default function Sidebar({
  module,
  currentVideoId,
  onSelectVideo,
  onOpenQuiz,
  videoProgress,
  isVideoComplete,
  areAllVideosComplete,
  quizPassed,
  onEndSession,
  isMobileOpen,
  onCloseMobile,
}) {
  const [language, setLanguage] = useState("English");
  const [videosExpanded, setVideosExpanded] = useState(true);
  const [resourcesExpanded, setResourcesExpanded] = useState(true);

  const allVideosWatched = areAllVideosComplete(module.videos);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${isMobileOpen ? "visible" : ""}`}
        onClick={onCloseMobile}
      />

      <aside
        className={`session-sidebar ${isMobileOpen ? "sidebar-open" : ""}`}
      >
        <div className="sidebar-header">
          <h3>Course Content</h3>
          <div className="lang-toggle">
            <button
              className={`lang-btn ${language === "English" ? "active" : ""}`}
              onClick={() => setLanguage("English")}
            >
              EN
            </button>
            <button
              className={`lang-btn ${language === "Hindi" ? "active" : ""}`}
              onClick={() => setLanguage("Hindi")}
            >
              HI
            </button>
          </div>
        </div>

        <div className="sidebar-content">
          {/* Videos Section */}
          <div className="sidebar-section">
            <div
              className="sidebar-section-title"
              onClick={() => setVideosExpanded(!videosExpanded)}
            >
              <span>Videos ({module.videos.length})</span>
              <span>{videosExpanded ? "▾" : "▸"}</span>
            </div>

            {videosExpanded &&
              module.videos.map((video) => {
                const isPlaying = video.id === currentVideoId;
                const isComplete =
                  (videoProgress[video.id] || 0) >= 95;
                const watchPct = videoProgress[video.id] || 0;

                return (
                  <div
                    key={video.id}
                    className={`video-card ${isPlaying ? "video-playing" : ""} ${isComplete ? "video-complete" : ""}`}
                    onClick={() => onSelectVideo(video)}
                  >
                    <div className="video-thumb">
                      <div className="video-thumb-overlay">
                        {isComplete ? (
                          <span className="checkmark-circle">✓</span>
                        ) : isPlaying ? (
                          <span style={{ fontSize: "14px" }}>▶</span>
                        ) : (
                          <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>▷</span>
                        )}
                      </div>
                    </div>
                    <div className="video-card-info">
                      <h4>{video.title}</h4>
                      <div className="video-meta">
                        <span className="source-badge">{video.source}</span>
                        <span>{video.duration}</span>
                        {watchPct > 0 && watchPct < 95 && (
                          <span style={{ color: "var(--gold)" }}>
                            {Math.round(watchPct)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Resources Section */}
          <div className="sidebar-section">
            <div
              className="sidebar-section-title"
              onClick={() => setResourcesExpanded(!resourcesExpanded)}
            >
              <span>Learning Resources ({module.resources.length})</span>
              <span>{resourcesExpanded ? "▾" : "▸"}</span>
            </div>

            {resourcesExpanded &&
              module.resources.map((resource, idx) => (
                <div key={idx} className="resource-card">
                  <div className="resource-icon">📄</div>
                  <div className="resource-info">
                    <h4>{resource.title}</h4>
                    <span className="resource-type">{resource.type}</span>
                  </div>
                </div>
              ))}
          </div>

          {/* Quiz Section */}
          <div className="sidebar-section">
            <div className="sidebar-section-title">
              <span>Quiz (1)</span>
            </div>
            <div
              className="quiz-assignment-card"
              onClick={() => onOpenQuiz()}
            >
              <div className="card-icon">📝</div>
              <h4>Quiz for {module.title.split("—")[0].trim()}</h4>
              <p>
                {quizPassed
                  ? "✅ Passed"
                  : "10 MCQ Questions · 70% to pass"}
              </p>
            </div>
          </div>

          {/* Assignment Section */}
          <div className="sidebar-section">
            <div className="sidebar-section-title">
              <span>Assignments (1)</span>
            </div>
            <div className="quiz-assignment-card card-disabled">
              <div className="card-icon">📋</div>
              <h4>Assignment for {module.title.split("—")[0].trim()}</h4>
              <p>Coming soon</p>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="btn btn-danger w-full" onClick={onEndSession}>
            End Session
          </button>
        </div>
      </aside>
    </>
  );
}
