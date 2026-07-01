export default function Navbar({ onNavigate, currentPage }) {
  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        onClick={() => onNavigate("landing")}
        style={{ cursor: "pointer" }}
      >
        <div className="navbar-logo-icon" style={{ background: "linear-gradient(135deg, var(--indigo-light), var(--gold))", color: "var(--navy)", fontWeight: "800", borderRadius: "var(--radius-sm)", padding: "2px 6px", fontSize: "var(--text-xs)", width: "auto", height: "auto" }}>CPD</div>
        <span>Adobe Express for Education</span>
      </div>
    </nav>
  );
}
