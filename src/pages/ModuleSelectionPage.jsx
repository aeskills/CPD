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
      <div className="top-bar-nav" style={{ marginBottom: "var(--space-2)", display: "flex", alignItems: "center" }}>
        <button
          onClick={() => onNavigate("landing")}
          className="btn back-to-home-top"
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
    </div>
  );
}
