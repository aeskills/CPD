import { useState } from "react";
import { modules } from "../data/modules";

export default function ModuleSelectionPage({
  onNavigate,
  isModuleUnlocked,
  isModuleComplete,
  getModuleCompletion,
  addToast,
}) {
  const [selectedModule, setSelectedModule] = useState(modules[0]);

  const seriesGroups = [
    {
      title: "CPD Series 1",
      sessions: [
        { ...modules[0], displayName: "Session 1" },
        { ...modules[2], displayName: "Session 2" },
      ],
    },
    {
      title: "CPD Series 2",
      sessions: [
        { ...modules[1], displayName: "Session 1" },
        { ...modules[3], displayName: "Session 2" },
      ],
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
      <div className="top-bar-nav" style={{ marginBottom: "var(--space-4)", display: "flex", justifyContent: "flex-start" }}>
        <button
          className="btn btn-ghost btn-sm back-to-home-top"
          onClick={() => onNavigate("landing")}
        >
          ← Back to Home
        </button>
      </div>

      <div className="modules-header" style={{ marginTop: "0" }}>
        <h1>Course Dashboard</h1>
        <p>Select a CPD Session to begin your learning journey</p>
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
                      className={`module-item ${active ? "module-active" : ""} ${complete ? "module-complete" : ""}`}
                      onClick={() => handleModuleClick(mod)}
                      style={{ opacity: 0, animation: `fadeInUp 400ms ease ${mod.id * 80}ms forwards` }}
                    >
                      <div className="module-number">
                        {complete ? "✓" : mod.displayName === "Session 1" ? "S1" : "S2"}
                      </div>
                      <div className="module-info">
                        <h3>{mod.displayName}</h3>
                        <span className="module-status">
                          {complete
                            ? "Completed"
                            : completion > 0
                              ? `${completion}% complete`
                              : "Not started"}
                        </span>
                        {!complete && (
                          <div className="module-progress-bar">
                            <div
                              className="module-progress-fill"
                              style={{ width: `${completion}%` }}
                            />
                          </div>
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
            <span className="content-pill">
              <span className="pill-dot" style={{ background: "var(--success)" }} />
              {selectedModule.quizCount} Quizzes
            </span>
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
    </div>
  );
}
