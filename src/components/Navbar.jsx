import { getSchedulerUrl } from "../utils/stateConfig";

export default function Navbar({
  onNavigate,
  currentPage,
  isLoggedIn,
  userName,
  onLogout,
  currentState,
}) {
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
