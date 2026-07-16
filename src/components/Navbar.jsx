export default function Navbar({ onNavigate, currentPage, isLoggedIn, userName, onLogout }) {
  const handleLogout = () => {
    onLogout();
    onNavigate("landing");
  };

  return (
    <nav className="navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div
        className="navbar-logo"
        onClick={() => onNavigate("landing")}
        style={{ cursor: "pointer" }}
      >
        <div className="navbar-logo-icon" style={{ background: "linear-gradient(135deg, var(--indigo-light), var(--gold))", color: "var(--navy)", fontWeight: "800", borderRadius: "var(--radius-sm)", padding: "2px 6px", fontSize: "var(--text-xs)", width: "auto", height: "auto" }}>CPD</div>
        <span>Adobe Express for Education</span>
      </div>

      {isLoggedIn && (
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", fontWeight: "500" }}>
            Hello, {userName}
          </span>
          <button 
            onClick={handleLogout} 
            className="btn btn-ghost" 
            style={{ fontSize: "var(--text-xs)", padding: "var(--space-1) var(--space-3)", minHeight: "28px", height: "28px", borderRadius: "var(--radius-sm)" }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
