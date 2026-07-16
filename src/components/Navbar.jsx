export default function Navbar({ onNavigate, currentPage, isLoggedIn, userName, onLogout }) {
  const handleLogout = () => {
    onLogout();
    onNavigate("landing");
  };

  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        onClick={() => onNavigate("landing")}
        style={{ cursor: "pointer" }}
      >
        <div className="navbar-logo-icon">CPD</div>
        <span className="navbar-logo-text">
          <span className="logo-brand">Adobe Express</span>
          <span className="logo-sub"> for Education</span>
        </span>
      </div>

      {isLoggedIn && (
        <div className="navbar-right">
          <span className="navbar-user-name">
            Hello, {userName}
          </span>
          <button 
            onClick={handleLogout} 
            className="btn btn-ghost navbar-logout-btn"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
