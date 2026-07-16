import { useState } from "react";
import Confetti from "../components/Confetti";
import { courseInfo, modules } from "../data/modules";

export default function CertificatePage({ userName, setUserName, onNavigate }) {
  const [name, setName] = useState(userName || "");
  const [showCert, setShowCert] = useState(!!userName);
  const [showConfetti, setShowConfetti] = useState(true);

  const handleGenerate = () => {
    if (name.trim()) {
      setUserName(name.trim());
      setShowCert(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="certificate-page animate-fade-in">
      {showConfetti && <Confetti duration={4000} />}

      <div className="modules-header">
        <h1>🎉 Congratulations!</h1>
        <p>You've completed all CPD Series 1 & Series 2 Sessions</p>
      </div>

      {!showCert ? (
        <div
          className="glass-card"
          style={{
            maxWidth: "500px",
            textAlign: "center",
            padding: "var(--space-10)",
          }}
        >
          <h2
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: 700,
              marginBottom: "var(--space-4)",
            }}
          >
            Generate Your Certificate
          </h2>
          <p
            className="text-secondary"
            style={{ marginBottom: "var(--space-6)" }}
          >
            Enter your full name as you'd like it to appear on your certificate
          </p>
          <input
            type="text"
            className="name-input"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          />
          <div style={{ marginTop: "var(--space-6)" }}>
            <button
              className="btn btn-gold btn-lg"
              onClick={handleGenerate}
              disabled={!name.trim()}
              style={{ opacity: name.trim() ? 1 : 0.5 }}
            >
              Generate Certificate →
            </button>
          </div>
        </div>
      ) : (
        <div className="certificate-container">
          <div className="certificate" id="certificate-print">
            <div className="cert-org">{courseInfo.organization}</div>
            <h1 className="cert-title">Certificate of Completion</h1>
            <p className="cert-subtitle">This is to certify that</p>

            <div className="cert-present">is hereby awarded to</div>
            <div className="cert-name">{userName || name}</div>

            <p className="cert-description">
              For successfully completing the {courseInfo.title}, demonstrating
              proficiency in professional development, leadership communication,
              strategic thinking, and professional ethics.
            </p>

            <div className="cert-details">
              <div className="cert-detail">
                <div className="cert-detail-label">Date</div>
                <div className="cert-detail-value">{today}</div>
              </div>
              <div className="cert-detail">
                <div className="cert-detail-label">Course</div>
                <div className="cert-detail-value">{courseInfo.title}</div>
              </div>
              <div className="cert-detail">
                <div className="cert-detail-label">Sessions</div>
                <div className="cert-detail-value">
                  2 Series ({modules.filter((m) => m.videos && m.videos.some((v) => !v.comingSoon)).length} Sessions) Completed
                </div>
              </div>
            </div>

            <div className="cert-seal">🏆</div>
          </div>

          <div className="cert-actions">
            <button className="btn btn-gold btn-lg" onClick={handlePrint}>
              📥 Download as PDF
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => onNavigate("modules")}
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
