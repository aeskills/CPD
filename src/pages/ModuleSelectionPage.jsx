import { useState } from "react";
import { modules } from "../data/modules";
import PromoVideoModal from "../components/PromoVideoModal";
import PptPreviewModal from "../components/PptPreviewModal";

export default function ModuleSelectionPage({
  onNavigate,
  isModuleUnlocked,
  isModuleComplete,
  getModuleCompletion,
  addToast,
}) {
  const [selectedModule, setSelectedModule] = useState(modules[0]);
  const [activePromoVideo, setActivePromoVideo] = useState(null);
  const [activePptModal, setActivePptModal] = useState(null);

  const seriesGroups = [
    {
      title: "CPD Series 1",
      sessions: modules
        .filter((m) => m.series === 1)
        .sort((a, b) => a.session - b.session)
        .map((m) => ({ ...m, displayName: `Session ${m.session}` })),
    },
    {
      title: "CPD Series 2",
      sessions: modules
        .filter((m) => m.series === 2)
        .sort((a, b) => a.session - b.session)
        .map((m) => ({ ...m, displayName: `Session ${m.session}` })),
    },
  ];

  const handleModuleClick = (mod) => {
    setSelectedModule(mod);
  };

  const handleEnterSession = () => {
    onNavigate("session", { moduleId: selectedModule.id });
  };

  return (
    <div className="modules-page animate-fade-in">
      <div
        className="top-bar-nav"
        style={{
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto var(--space-3) auto",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={() => onNavigate("landing")}
          className="btn back-to-home-top"
          style={{ margin: 0 }}
        >
          ← Back to Home
        </button>
      </div>

      <div
        className="dashboard-header-container"
        style={{
          position: "relative",
          maxWidth: "1280px",
          margin: "0 auto var(--space-6) auto",
          display: "flex",
          alignItems: "center",
          justify: "center",
          width: "100%",
          minHeight: "75px",
        }}
      >
        {/* Centered Course Dashboard Title */}
        <div className="modules-header" style={{ margin: "0 auto", textAlign: "center", width: "100%" }}>
          <h1 style={{ textAlign: "center", margin: "0 0 6px 0" }}>Course Dashboard</h1>
          <p style={{ textAlign: "center", margin: 0 }}>Select a CPD Session to begin your learning journey</p>
        </div>

        {/* Right Corner Certification Notice Card — Perfectly aligned with 340px right panel */}
        <div
          className="certificate-notice-card animate-fade-in"
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "linear-gradient(135deg, #FFF5F5 0%, #FFFFFF 100%)",
            border: "1.5px solid rgba(235, 16, 0, 0.25)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-3) var(--space-4)",
            width: "340px",
            maxWidth: "100%",
            boxShadow: "0 4px 16px rgba(235, 16, 0, 0.08)",
            boxSizing: "border-box",
            zIndex: 2,
          }}
        >
          <div style={{ width: "100%" }}>
            <span
              style={{
                fontSize: "10px",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#eb1000",
                display: "block",
                marginBottom: "2px",
              }}
            >
              Important Certification Notice
            </span>
            <p
              style={{
                fontSize: "11px",
                fontWeight: "600",
                color: "var(--text-primary)",
                margin: 0,
                lineHeight: 1.35,
              }}
            >
              In order to receive a certificate, you need to submit the Activity Link via the submission form inside the session.
            </p>
          </div>
        </div>
      </div>

      <div className="modules-grid">
        {/* Left Panel — Module List */}
        <div className="module-list stagger">
          {seriesGroups.map((group) => (
            <div key={group.title} className="session-group">
              <h4 className="session-group-title">{group.title}</h4>
              <div className="session-series-list">
                {group.sessions.map((mod) => {
                  const unlocked = isModuleUnlocked(mod.id);
                  const complete = isModuleComplete(mod.id);
                  const active = selectedModule.id === mod.id;
                  const completion = getModuleCompletion(mod);

                  return (
                    <div
                      key={mod.id}
                      className={`module-item ${active ? "module-active" : ""}`}
                      onClick={() => handleModuleClick(mod)}
                      style={{ opacity: 0, animation: `fadeInUp 400ms ease ${mod.id * 80}ms forwards` }}
                    >
                      <div className="module-number">
                        {`S${mod.session}`}
                      </div>
                      <div className="module-info">
                        <h3 title={mod.topic}>
                          {mod.topic}
                        </h3>
                        <span className="module-status">
                          {mod.lessonCount > 0 ? `${mod.lessonCount} Lessons` : "Resources & Form"}
                        </span>
                        {active && (
                          <button
                            className="btn btn-primary btn-sm mobile-start-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate("session", { moduleId: mod.id });
                            }}
                          >
                            Start Session →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Center Panel — Topic Details */}
        <div className="topic-details glass-card">
          <h2>{selectedModule.topic}</h2>

          {/* Intro Video & Presentation PPT Section — Above Description */}
          {(selectedModule.introVideo || selectedModule.pptLink) && (
            <div className="session-media-wrapper" style={{ marginBottom: "var(--space-6)" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justify: "space-between",
                  marginBottom: "var(--space-3)",
                }}
              >
                <h4
                  style={{
                    fontSize: "var(--text-xs)",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#eb1000",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#eb1000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Session Preview & Materials
                </h4>
              </div>

              {/* Case 1: Both Intro Video AND PPT link exist */}
              {selectedModule.introVideo && selectedModule.pptLink ? (
                <div
                  className="session-media-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "var(--space-4)",
                  }}
                >
                  {/* Intro Video Card */}
                  <div
                    className="media-card intro-video-card"
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "var(--radius-lg)",
                      border: "1px solid var(--card-border)",
                      padding: "var(--space-3)",
                      boxShadow: "var(--shadow-sm)",
                      display: "flex",
                      flexDirection: "column",
                      justify: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justify: "space-between",
                        marginBottom: "var(--space-2)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "700",
                          color: "var(--text-secondary)",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <polygon points="10 9 15 12 10 15 10 9" />
                        </svg>
                        Session Intro Video
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          color: "var(--text-muted)",
                          background: "#F3F4F6",
                          padding: "2px 8px",
                          borderRadius: "10px",
                          fontWeight: "600",
                        }}
                      >
                        Overview
                      </span>
                    </div>

                    <div
                      className="intro-video-thumb-wrapper"
                      onClick={() => setActivePromoVideo(selectedModule.introVideo)}
                      style={{
                        position: "relative",
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                        cursor: "pointer",
                        background: "#0F172A",
                        height: "130px",
                        border: "1px solid #E2E8F0",
                      }}
                    >
                      <img
                        src={selectedModule.introVideo.thumbnail}
                        alt={selectedModule.introVideo.title}
                        style={{
                          width: "100%",
                          height: "130px",
                          objectFit: "cover",
                          display: "block",
                          opacity: 1,
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </div>
                  </div>

                  {/* Presentation PPT Card */}
                  <div
                    className="media-card ppt-card"
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "var(--radius-lg)",
                      border: "1px solid var(--card-border)",
                      padding: "var(--space-3)",
                      boxShadow: "var(--shadow-sm)",
                      display: "flex",
                      flexDirection: "column",
                      justify: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justify: "space-between",
                        marginBottom: "var(--space-2)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "700",
                          color: "var(--text-secondary)",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                        Session Presentation
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          color: "#eb1000",
                          background: "rgba(235, 16, 0, 0.08)",
                          padding: "2px 8px",
                          borderRadius: "10px",
                          fontWeight: "700",
                        }}
                      >
                        PPT Slides
                      </span>
                    </div>

                    <div
                      style={{
                        height: "130px",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid #E2E8F0",
                        background: "linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)",
                        padding: "12px 14px",
                        display: "flex",
                        flexDirection: "column",
                        justify: "space-between",
                        boxSizing: "border-box",
                      }}
                    >
                      <div style={{ width: "100%" }}>
                        <h4
                          style={{
                            fontSize: "12px",
                            fontWeight: "700",
                            color: "var(--text-primary)",
                            lineHeight: 1.35,
                            margin: 0,
                          }}
                          title={selectedModule.pptTitle || "Session Presentation Slides (PPT)"}
                        >
                          {selectedModule.pptTitle || "Session Presentation Slides (PPT)"}
                        </h4>
                        <span
                          style={{
                            fontSize: "10px",
                            color: "var(--text-muted)",
                            marginTop: "4px",
                            display: "block",
                          }}
                        >
                          Google Slides / Presentation
                        </span>
                      </div>

                      <button
                        onClick={() => setActivePptModal({ title: selectedModule.pptTitle || "Session Presentation Slides (PPT)", link: selectedModule.pptLink })}
                        className="btn btn-primary btn-sm"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justify: "center",
                          gap: "6px",
                          fontWeight: "700",
                          fontSize: "11px",
                          borderRadius: "6px",
                          padding: "6px 12px",
                          background: "#eb1000",
                          color: "#FFFFFF",
                          border: "none",
                          boxShadow: "0 2px 8px rgba(235, 16, 0, 0.25)",
                          cursor: "pointer",
                          transition: "transform 0.2s ease, background 0.2s ease",
                        }}
                      >
                        Preview & Download PPT ↗
                      </button>
                    </div>
                  </div>
                </div>
              ) : selectedModule.introVideo ? (
                /* Case 2: ONLY Intro Video exists (no PPT) — Compact Horizontal Layout */
                <div
                  className="media-card-horizontal"
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--card-border)",
                    padding: "var(--space-3)",
                    boxShadow: "var(--shadow-sm)",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-4)",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    className="intro-video-thumb-wrapper"
                    onClick={() => setActivePromoVideo(selectedModule.introVideo)}
                    style={{
                      position: "relative",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      cursor: "pointer",
                      background: "#0F172A",
                      width: "210px",
                      height: "118px",
                      flexShrink: 0,
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <img
                      src={selectedModule.introVideo.thumbnail}
                      alt={selectedModule.introVideo.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        opacity: 1,
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      flex: 1,
                      minWidth: "220px",
                      display: "flex",
                      flexDirection: "column",
                      justify: "space-between",
                      gap: "var(--space-2)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justify: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "700",
                          color: "var(--text-secondary)",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <polygon points="10 9 15 12 10 15 10 9" />
                        </svg>
                        Session Intro Video
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          color: "var(--text-muted)",
                          background: "#F3F4F6",
                          padding: "2px 8px",
                          borderRadius: "10px",
                          fontWeight: "600",
                        }}
                      >
                        Overview
                      </span>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          color: "var(--text-primary)",
                          lineHeight: 1.35,
                          margin: 0,
                        }}
                      >
                        {selectedModule.introVideo.title}
                      </h4>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "var(--text-muted)",
                          margin: "3px 0 0 0",
                          lineHeight: 1.4,
                        }}
                      >
                        Watch a quick video overview of this CPD session before getting started.
                      </p>
                    </div>

                    <div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setActivePromoVideo(selectedModule.introVideo)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontWeight: "700",
                          fontSize: "11px",
                          borderRadius: "6px",
                          padding: "6px 14px",
                          background: "#eb1000",
                          color: "#FFFFFF",
                          border: "none",
                          boxShadow: "0 2px 8px rgba(235, 16, 0, 0.25)",
                          cursor: "pointer",
                        }}
                      >
                        Watch Intro Video ↗
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          <div className="objectives-list">
            {selectedModule.objectives.map((obj, idx) => (
              <div key={idx} className="objective-item">
                <span className="objective-bullet">{idx + 1}</span>
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel — Content Summary */}
        <div className="content-summary glass-card">
          <h3>In this session, you will learn:</h3>
          <div className="lessons-list">
            {selectedModule.lessons.map((lesson, idx) => (
              <div key={idx} className="lesson-item">
                <span className="lesson-number">{idx + 1}</span>
                <span>{lesson}</span>
              </div>
            ))}
          </div>

          <div className="content-pills">
            <span className="content-pill">
              <span className="pill-dot" />
              {selectedModule.lessonCount} Lessons
            </span>
            <span className="content-pill">
              <span className="pill-dot" style={{ background: "var(--gold)" }} />
              {selectedModule.videoCount} Videos
            </span>
            {selectedModule.quizCount > 0 && (
              <span className="content-pill">
                <span className="pill-dot" style={{ background: "var(--success)" }} />
                {selectedModule.quizCount} Quizzes
              </span>
            )}
            {selectedModule.resourceSections && selectedModule.resourceSections.length > 0 && (
              <span className="content-pill">
                <span className="pill-dot" style={{ background: "#a78bfa" }} />
                {selectedModule.resourceSections.reduce((sum, s) => sum + s.resources.length, 0)} Templates
              </span>
            )}
          </div>

          <div className="module-actions">
            <button
              className="btn btn-primary btn-lg w-full"
              onClick={handleEnterSession}
              style={{ width: "100%" }}
            >
              Start Session →
            </button>
          </div>
        </div>
      </div>

      {activePromoVideo && (
        <PromoVideoModal
          videoId={activePromoVideo.youtubeId}
          title={activePromoVideo.title}
          onClose={() => setActivePromoVideo(null)}
        />
      )}

      {activePptModal && (
        <PptPreviewModal
          pptTitle={activePptModal.title}
          pptLink={activePptModal.link}
          onClose={() => setActivePptModal(null)}
        />
      )}
    </div>
  );
}
