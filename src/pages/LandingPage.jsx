import { useState, useEffect } from "react";
import { courseInfo } from "../data/modules";
import teacherStudentImg from "../assets/teacher_student_creativity.png";
import { getSchedulerUrl, getStateConfig } from "../utils/stateConfig";

export default function LandingPage({ onNavigate, currentState }) {
  const [showScheduleInstruction, setShowScheduleInstruction] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScheduleInstruction(false);
    }, 30000); // 30 seconds downtime
    return () => clearTimeout(timer);
  }, []);

  const handleCTA = () => {
    onNavigate("modules");
  };

  const schedulerUrl = getSchedulerUrl(currentState);
  const stateConfig = getStateConfig(currentState);

  return (
    <div className="landing-auth-container animate-fade-in">
      {/* Floating Top Right Action Container — Landing Page ONLY */}
      <div className="floating-top-right-actions">
        <div className="schedule-btn-wrapper" style={{ position: "relative" }}>
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

          {/* 30-Second Auto-Disappearing Instruction Box */}
          {showScheduleInstruction && (
            <div className="schedule-instruction-popover theme-red-white">
              <p className="instruction-text-red">
                If you want to attend a Live CPD Session , Click on Schedule a live session to select your desired date.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Full-Width Glass Banner */}
      <div className="auth-details-side">
        <div className="glass-banner">
          {/* Left side of banner — Text & Information */}
          <div className="glass-banner-left">
            {/* Header: CPD Logo */}
            <div className="auth-logo-header">
              <div className="auth-logo-icon">CPD</div>
            </div>

            {/* YouTube Channel Subscribe Box Below CPD Logo */}
            <div className="youtube-subscribe-card animate-fade-in">
              <div className="youtube-card-left">
                <div className="youtube-thumbnail">
                  <span className="youtube-play-icon">▶</span>
                </div>
                <div className="youtube-card-text">
                  <h5 className="youtube-card-title">YouTube Channel</h5>
                  <p className="youtube-card-desc">
                    For More Tutorial and live session Please Subscribe to our channel.
                  </p>
                </div>
              </div>
              <a
                href="https://www.youtube.com/@createjoyhappiness"
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-subscribe-btn"
              >
                <span className="yt-icon">🔴</span> Subscribe
              </a>
            </div>

            <div className="auth-details-middle" style={{ marginTop: "var(--space-4)" }}>
              <h1 className="auth-hero-title">
                Elevate your <span className="text-highlight-red">{stateConfig.heroTitleHighlight || "teaching practice"}</span> with structured, certified learning
              </h1>
              <p className="auth-hero-desc">{courseInfo.overview}</p>

              <div className="auth-features-grid">
                <div className="auth-feature-item">
                  <span className="auth-feature-icon">🛡️</span>
                  <div>
                    <h4 className="auth-feature-title">Official CPD Certification</h4>
                    <p className="auth-feature-desc-large">
                      Earn accredited certification automatically upon completing active sessions.
                    </p>
                  </div>
                </div>
                <div className="auth-feature-item">
                  <span className="auth-feature-icon">⚡</span>
                  <div>
                    <h4 className="auth-feature-title">Interactive Digital Pedagogy</h4>
                    <p className="auth-feature-desc-large">
                      Practical methods to teach and mentor students in digital creativity
                    </p>
                  </div>
                </div>
              </div>

              {/* Red Notice Box Below Official CPD Certification Section */}
              <div className="credentials-red-notice-banner animate-fade-in">
                <p className="credentials-notice-body">
                  <strong>Important:</strong> To complete the CPD session, please log in using your school-issued Adobe Express for Education ID or the ID deployed by the Adobe team. Do not use your personal email address to access or complete the CPD session, as it may affect your participation records and certificate eligibility.
                </p>
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
                  <span className="floating-card-title-large">Adobe Express</span>
                  <span className="floating-card-sub-large">Create & Design</span>
                </div>
              </div>
              <div className="floating-card">
                <span className="floating-card-icon">📜</span>
                <div className="floating-card-text">
                  <span className="floating-card-title-large">CPD Certificate</span>
                  <span className="floating-card-sub-large">On Completion</span>
                </div>
              </div>
            </div>

            {/* Bottom CTA Container: Asynchronous Disclaimer Spanning Full Available Width + Right CTA Button */}
            <div className="bottom-cta-container">
              <div className="course-btn-disclaimer">
                If you are unable to attend the live session, you can complete your CPD asynchronously by selecting the &quot;Go to Course&quot; option on the portal. You may complete any available CPD session from the course list. If you missed any previous CPD session, you can also complete it through the same option at your convenience.
              </div>
              <div className="bottom-cta-btn-wrapper">
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
                    whiteSpace: "nowrap",
                  }}
                >
                  Go to Course →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
