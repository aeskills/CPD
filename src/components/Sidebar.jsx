import { useState } from "react";

export default function Sidebar({
  module,
  currentVideoId,
  onSelectVideo,
  videoProgress,
  isVideoComplete,
  areAllVideosComplete,
  onEndSession,
  isMobileOpen,
  onCloseMobile,
}) {
  const [videosExpanded, setVideosExpanded] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  const playableVideos = module.videos.filter((v) => !v.comingSoon);

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isSectionExpanded = (key) => {
    return expandedSections[key] !== false; // default expanded
  };

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
        </div>

        <div className="sidebar-content">
          {/* Videos Section — only show if there are videos */}
          {module.videos.length > 0 && (
            <div className="sidebar-section">
              <div
                className="sidebar-section-title"
                onClick={() => setVideosExpanded(!videosExpanded)}
              >
                <span>Videos ({playableVideos.length}){module.videos.length > playableVideos.length ? ` + ${module.videos.length - playableVideos.length} coming soon` : ""}</span>
                <span>{videosExpanded ? "▾" : "▸"}</span>
              </div>

              {videosExpanded &&
                module.videos.map((video) => {
                  if (video.comingSoon) {
                    return (
                      <div
                        key={video.id}
                        className="video-card video-coming-soon"
                      >
                        <div className="video-thumb">
                          <div className="video-thumb-overlay">
                            <span style={{ fontSize: "14px", color: "var(--gold)" }}>⏳</span>
                          </div>
                        </div>
                        <div className="video-card-info">
                          <h4>{video.title}</h4>
                          <div className="video-meta">
                            <span className="coming-soon-badge">Coming Soon</span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const isPlaying = video.id === currentVideoId;
                  const isComplete =
                    (videoProgress[video.id] || 0) >= 95;
                  const watchPct = videoProgress[video.id] || 0;

                  return (
                    <div
                      key={video.id}
                      className={`video-card ${isPlaying ? "video-playing" : ""}`}
                      onClick={() => onSelectVideo(video)}
                    >
                      <div className="video-thumb">
                        <div className="video-thumb-overlay">
                          {isPlaying ? (
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
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* No Videos Placeholder */}
          {module.videos.length === 0 && (
            <div className="sidebar-section">
              <div className="sidebar-section-title">
                <span>Videos</span>
              </div>
              <div className="no-videos-placeholder">
                <div className="no-videos-icon">📋</div>
                <p>This session focuses on templates and resources.</p>
                <p className="no-videos-sub">Explore the resources below to get started!</p>
              </div>
            </div>
          )}

          {/* Resource Sections — new grouped layout */}
          {module.resourceSections && module.resourceSections.map((section, sIdx) => {
            const sectionKey = `resource-${sIdx}`;
            const expanded = isSectionExpanded(sectionKey);

            return (
              <div key={sIdx} className="sidebar-section">
                <div
                  className="sidebar-section-title resource-section-title"
                  onClick={() => toggleSection(sectionKey)}
                >
                  <span>
                    <span className="section-icon">{section.icon}</span>{" "}
                    {section.title} ({section.resources.length})
                  </span>
                  <span>{expanded ? "▾" : "▸"}</span>
                </div>

                {expanded &&
                  section.resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url || "#"}
                      target={resource.url && resource.url !== "#" ? "_blank" : undefined}
                      rel={resource.url && resource.url !== "#" ? "noopener noreferrer" : undefined}
                      className="resource-card resource-card-styled"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="resource-icon">
                        {resource.type === "Comic Strip" ? "💬" :
                         resource.type === "Calendar" ? "📅" :
                         resource.type === "Webpage" ? "🌐" : "📄"}
                      </div>
                      <div className="resource-info">
                        <h4>{resource.title}</h4>
                        <span className="resource-type">{resource.type}</span>
                      </div>
                      <span className="resource-arrow">↗</span>
                    </a>
                  ))}
              </div>
            );
          })}

          {/* Legacy resources fallback */}
          {(!module.resourceSections || module.resourceSections.length === 0) && module.resources && module.resources.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-section-title">
                <span>Learning Resources ({module.resources.length})</span>
              </div>
              {module.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url || "#"}
                  target={resource.url && resource.url !== "#" ? "_blank" : undefined}
                  rel={resource.url && resource.url !== "#" ? "noopener noreferrer" : undefined}
                  className="resource-card"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="resource-icon">📄</div>
                  <div className="resource-info">
                    <h4>{resource.title}</h4>
                    <span className="resource-type">{resource.type}</span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Submission Section */}
          <div className="sidebar-section">
            <div className="sidebar-section-title">
              <span>Project Submissions</span>
            </div>

            <div
              className="submission-card"
              style={{
                padding: "var(--space-4)",
                background: "#F7F9FA",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--card-border)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                Submit your activity & gallery project links using our official Google Form.
              </p>
              <a
                href={module.formLink || "https://forms.gle/airPprUG211Dy8TX6"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm w-full"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justify: "center",
                  gap: "var(--space-2)",
                  padding: "var(--space-2) var(--space-4)",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "var(--text-xs)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Submit Project via Google Form ↗
              </a>
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
