import { useState, useEffect } from "react";
import { getSchedulerUrl } from "../utils/stateConfig";

export default function Navbar({
  onNavigate,
  currentPage,
  isLoggedIn,
  userName,
  onLogout,
  currentState,
}) {
  const [showNavInstruction, setShowNavInstruction] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavInstruction(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    onLogout();
    onNavigate("landing");
  };

  const schedulerUrl = getSchedulerUrl(currentState);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div
          className="navbar-logo"
          onClick={() => onNavigate("landing")}
          style={{ cursor: "pointer" }}
        >
          <div className="navbar-logo-icon">CPD</div>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-actions-column">
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

          {/* Get Your Credentials Button & 6-sec Instruction (Only for Chain & Retail) */}
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

              {showNavInstruction && (
                <div className="credentials-instruction-popover nav-popover popover-below">
                  <div className="instruction-arrow-up">↑</div>
                  <p className="instruction-text">
                    If your Adobe Express for Education ID has been created by Adobe, click the link above to get your login credentials.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {isLoggedIn && (
          <div className="navbar-user-section">
            <span className="navbar-user-name">Hello, {userName}</span>
            <button
              onClick={handleLogout}
              className="btn btn-ghost navbar-logout-btn"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
