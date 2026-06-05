import { useState, useEffect } from "react";
import { courseInfo } from "../data/modules";
import PromoVideoModal from "../components/PromoVideoModal";

export default function LandingPage({ onNavigate }) {
  const [showPromo, setShowPromo] = useState(false);
  const [faculty, setFaculty] = useState(() => {
    try {
      const stored = localStorage.getItem("cpd_faculty");
      return stored ? JSON.parse(stored) : courseInfo.faculty;
    } catch (e) {
      return courseInfo.faculty;
    }
  });
  const [showAddFaculty, setShowAddFaculty] = useState(false);
  const [newFaculty, setNewFaculty] = useState({ name: "", designation: "" });

  useEffect(() => {
    try {
      localStorage.setItem("cpd_faculty", JSON.stringify(faculty));
    } catch (e) {
      console.warn("Failed to save faculty:", e);
    }
  }, [faculty]);

  const handleCTA = () => {
    setShowPromo(true);
  };

  const handlePromoClose = () => {
    setShowPromo(false);
    onNavigate("modules");
  };

  const handleAddFaculty = () => {
    if (newFaculty.name.trim() && newFaculty.designation.trim()) {
      setFaculty((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: newFaculty.name.trim(),
          designation: newFaculty.designation.trim(),
          photo: null,
        },
      ]);
      setNewFaculty({ name: "", designation: "" });
      setShowAddFaculty(false);
    }
  };

  const handleRemoveFaculty = (id) => {
    setFaculty((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">
          <span>✦</span>
          <span>CPD Foundation Program 2024</span>
        </div>
        <h1 className="hero-title">{courseInfo.title}</h1>
        <p className="hero-subtitle">{courseInfo.subtitle}</p>
        <button
          className="btn btn-gold btn-lg btn-glow"
          onClick={handleCTA}
          style={{ animationDelay: "300ms", opacity: 0, animation: "fadeInUp 600ms ease 300ms forwards, glowPulse 2s ease-in-out infinite" }}
        >
          Go to Course Page →
        </button>
      </section>

      {/* Course Info Card */}
      <div className="course-card glass-card">
        <div className="course-card-header">
          <span className="org-badge">
            <span>◆</span>
            Designed by {courseInfo.organization}
          </span>
        </div>

        <h2 className="course-title">{courseInfo.title}</h2>

        <div className="lang-pill">
          <span>🌐</span>
          Lectures available in {courseInfo.languages.length} Languages
        </div>

        {/* Faculty List */}
        <div style={{ marginBottom: "var(--space-6)" }}>
          {faculty.map((f) => (
            <div key={f.id} className="faculty-section" style={{ marginBottom: "var(--space-2)", position: "relative" }}>
              <div className="faculty-photo">
                {f.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div className="faculty-name">{f.name}</div>
                <div className="faculty-title">{f.designation}</div>
              </div>
              {faculty.length > 1 && (
                <button
                  onClick={() => handleRemoveFaculty(f.id)}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "rgba(239, 68, 68, 0.15)",
                    color: "#EF4444",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                  title="Remove faculty"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {/* Add Faculty Button */}
          {!showAddFaculty ? (
            <button
              onClick={() => setShowAddFaculty(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
                padding: "var(--space-3) var(--space-4)",
                background: "transparent",
                border: "1px dashed var(--card-border)",
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                width: "100%",
                color: "var(--text-muted)",
                fontSize: "var(--text-sm)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "var(--indigo)";
                e.currentTarget.style.color = "var(--indigo-light)";
                e.currentTarget.style.background = "rgba(79, 70, 229, 0.06)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "var(--card-border)";
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "var(--glass-bg)",
                  border: "1px dashed var(--card-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "var(--text-xl)",
                  flexShrink: 0,
                }}
              >
                +
              </span>
              <span>Add Faculty / Mentor</span>
            </button>
          ) : (
            <div
              style={{
                padding: "var(--space-4)",
                background: "var(--glass-bg)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--card-border)",
              }}
            >
              <div style={{ marginBottom: "var(--space-3)" }}>
                <input
                  type="text"
                  placeholder="Faculty Name"
                  value={newFaculty.name}
                  onChange={(e) =>
                    setNewFaculty((prev) => ({ ...prev, name: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "var(--space-2) var(--space-3)",
                    background: "var(--navy)",
                    border: "1px solid var(--card-border)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text-primary)",
                    fontSize: "var(--text-sm)",
                  }}
                />
              </div>
              <div style={{ marginBottom: "var(--space-3)" }}>
                <input
                  type="text"
                  placeholder="Designation (e.g., Director, Organization)"
                  value={newFaculty.designation}
                  onChange={(e) =>
                    setNewFaculty((prev) => ({
                      ...prev,
                      designation: e.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "var(--space-2) var(--space-3)",
                    background: "var(--navy)",
                    border: "1px solid var(--card-border)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text-primary)",
                    fontSize: "var(--text-sm)",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: "var(--space-2)" }}>
                <button
                  className="btn btn-primary"
                  onClick={handleAddFaculty}
                  disabled={!newFaculty.name.trim() || !newFaculty.designation.trim()}
                  style={{
                    opacity:
                      newFaculty.name.trim() && newFaculty.designation.trim()
                        ? 1
                        : 0.5,
                    fontSize: "var(--text-sm)",
                    padding: "var(--space-2) var(--space-4)",
                  }}
                >
                  Add Faculty
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setShowAddFaculty(false);
                    setNewFaculty({ name: "", designation: "" });
                  }}
                  style={{
                    fontSize: "var(--text-sm)",
                    padding: "var(--space-2) var(--space-4)",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Overview */}
        <p className="course-overview">{courseInfo.overview}</p>

        {/* Benefits */}
        <div className="benefits-list">
          {courseInfo.benefits.map((benefit, idx) => (
            <div key={idx} className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="card-footer">
          <button className="btn btn-primary btn-lg" onClick={handleCTA}>
            Go to Course Page →
          </button>
        </div>
      </div>

      {/* Promo Video Modal */}
      {showPromo && (
        <PromoVideoModal
          videoId={courseInfo.promoVideoId}
          onClose={handlePromoClose}
        />
      )}
    </div>
  );
}
