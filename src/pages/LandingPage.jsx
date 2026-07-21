import { courseInfo } from "../data/modules";
import teacherStudentImg from "../assets/teacher_student_creativity.png";

export default function LandingPage({ onNavigate }) {
  const handleCTA = () => {
    onNavigate("modules");
  };

  return (
    <div className="landing-auth-container animate-fade-in">
      {/* Full-Width Glass Banner */}
      <div className="auth-details-side">
        <div className="glass-banner">
          {/* Left side of banner — Text & Information */}
          <div className="glass-banner-left">
            <div className="auth-logo-header">
              <div className="auth-logo-icon">CPD</div>
              <span>Adobe Express for Education</span>
            </div>

            <div className="auth-details-middle">
              <div className="auth-tagline">Designed by {courseInfo.organization}</div>
              <h1 className="auth-hero-title">
                Elevate your <span className="text-highlight-red">teaching practice</span> with structured, certified learning
              </h1>
              <p className="auth-hero-desc">{courseInfo.overview}</p>

              <div className="auth-features-grid">
                <div className="auth-feature-item">
                  <span className="auth-feature-icon">🛡️</span>
                  <div>
                    <h4 className="auth-feature-title">Official CPD Certification</h4>
                    <p className="auth-feature-desc">Earn accredited certification automatically upon completing active sessions.</p>
                  </div>
                </div>
                <div className="auth-feature-item">
                  <span className="auth-feature-icon">⚡</span>
                  <div>
                    <h4 className="auth-feature-title">Interactive Digital Pedagogy</h4>
                    <p className="auth-feature-desc">Practical methods to teach and mentor students in digital creativity</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="auth-footer-text">
              © 2026 Adobe Express for Education. All rights reserved.
            </div>
          </div>

          {/* Right side of banner — Illustration + Floating Cards + Bottom Right CTA */}
          <div className="glass-banner-right">
            <div className="illustration-wrapper">
              <div className="illustration-accent-circle" />
              <img
                src={teacherStudentImg}
                alt="Teacher guiding student in digital creativity"
                className="illustration-img"
              />
            </div>
            <div className="floating-cards-row">
              <div className="floating-card">
                <span className="floating-card-icon">🎨</span>
                <div className="floating-card-text">
                  <span className="floating-card-title">Adobe Express</span>
                  <span className="floating-card-sub">Create & Design</span>
                </div>
              </div>
              <div className="floating-card">
                <span className="floating-card-icon">📜</span>
                <div className="floating-card-text">
                  <span className="floating-card-title">CPD Certificate</span>
                  <span className="floating-card-sub">On Completion</span>
                </div>
              </div>
            </div>

            {/* Bottom Right CTA Button */}
            <div style={{ marginTop: "var(--space-8)", alignSelf: "flex-end", display: "flex", justifyContent: "flex-end", width: "100%" }}>
              <button
                onClick={handleCTA}
                className="btn btn-gold btn-lg"
                style={{
                  padding: "var(--space-3) var(--space-8)",
                  fontSize: "var(--text-base)",
                  fontWeight: "700",
                  borderRadius: "var(--radius-full)",
                  boxShadow: "0 8px 24px rgba(235, 16, 0, 0.3)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--space-2)"
                }}
              >
                Go to Sessions →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
