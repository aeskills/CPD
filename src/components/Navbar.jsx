export default function Navbar({ onNavigate, currentPage }) {
  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        onClick={() => onNavigate("landing")}
        style={{ cursor: "pointer" }}
      >
        <div className="navbar-logo-icon">C</div>
        <span>CPD Academy</span>
      </div>
      <div className="navbar-right">
        <button className="navbar-profile">
          <div className="navbar-avatar">U</div>
          <span>My Profile</span>
        </button>
      </div>
    </nav>
  );
}
