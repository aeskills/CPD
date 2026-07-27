export default function Navbar({
  onNavigate,
  currentPage,
  isLoggedIn,
  userName,
  onLogout,
}) {
  const handleLogout = () => {
    onLogout();
    onNavigate("landing");
  };

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
