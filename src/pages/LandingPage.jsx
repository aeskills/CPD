import { useState, useEffect } from "react";
import { courseInfo } from "../data/modules";
import teacherStudentImg from "../assets/teacher_student_creativity.png";
import { getSchedulerUrl } from "../utils/stateConfig";

export default function LandingPage({ onNavigate, currentState }) {
  const [showInstruction, setShowInstruction] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstruction(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleCTA = () => {
    onNavigate("modules");
  };

  const schedulerUrl = getSchedulerUrl(currentState);

  return (
    <div className="landing-auth-container animate-fade-in">
      {/* Floating Top Right Action Container */}
      <div className="floating-top-right-actions">
        {/* Schedule Live Session Button */}
        <a
          href={schedulerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="schedule-live-btn"
          title="Schedule Live Session"
        >
          <span className="schedule-btn-icon">📅</span>
          <span className="schedule-btn-text">Schedule Live Session</span>
        </a>

        {/* Get Your Credentials Button & 6-second auto-hiding instruction hint (Only for Chain & Retail) */}
        {!currentState && (
          <div className="credentials-wrapper">
            <a
              href="https://aeskills.github.io/AdobeExpressforEducation/CR"
              target="_blank"
              rel="noopener noreferrer"
              className="get-credentials-btn"
              title="Get Your Credentials"
            >
              <span className="credentials-btn-icon">🔑</span>
              <span className="credentials-btn-text">Get Your Credentials</span>
            </a>

            {showInstruction && (
              <div className="credentials-instruction-popover popover-below">
                <div className="instruction-arrow-up">↑</div>
                <p className="instruction-text">
                  If your Adobe Express for Education ID has been created by Adobe, click the link above to get your login credentials.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Full-Width Glass Banner */}
      <div className="auth-details-side">
        <div className="glass-banner">
          {/* Left side of banner — Text & Information */}
          <div className="glass-banner-left">
            <div className="auth-logo-header">
              <div className="auth-logo-icon">CPD</div>
            </div>

            <div className="auth-details-middle">
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
                  gap: "var(--space-2)",
                }}
              >
                Go to Course →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
