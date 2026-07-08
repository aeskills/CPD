import { useState } from "react";
import { courseInfo } from "../data/modules";
import PromoVideoModal from "../components/PromoVideoModal";

export default function LandingPage({ onNavigate }) {
  const [showPromo, setShowPromo] = useState(false);

  const handleCTA = () => {
    setShowPromo(true);
  };

  const handlePromoClose = () => {
    setShowPromo(false);
    onNavigate("modules");
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">
          <span>✦</span>
          <span>Continuous Professional Development (CPD)</span>
        </div>
        <h1 className="hero-title" style={{ maxWidth: "800px", margin: "0 auto var(--space-6)" }}>{courseInfo.subtitle}</h1>
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
