import { useState } from "react";
import { courseInfo } from "../data/modules";
import { GOOGLE_SCRIPT_URL } from "../config";
import { fetchJSONP } from "../utils/api";
import teacherStudentImg from "../assets/teacher_student_creativity.png";

export default function LandingPage({ onNavigate, progress, loginUser, updateSchoolName }) {
  const isLoggedIn = !!(progress && progress.isLoggedIn);
  const hasSchool = !!(progress && progress.schoolName);

  // Auth screen state: "login" or "register"
  const [authMode, setAuthMode] = useState("login");

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [schoolName, setSchoolName] = useState("");

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpType, setOtpType] = useState(""); // "login" or "register"
  const [loading, setLoading] = useState(false);

  const handleCTA = () => {
    onNavigate("modules");
  };

  const validateLogin = () => {
    const newErrors = {};
    const emailTrim = email.trim();
    if (!emailTrim) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(emailTrim)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setLoading(true);
    setApiError("");
    setSuccessMessage("");

    try {
      if (GOOGLE_SCRIPT_URL) {
        const queryUrl = `${GOOGLE_SCRIPT_URL}?action=sendLoginOTP&email=${encodeURIComponent(email.trim().toLowerCase())}`;
        const result = await fetchJSONP(queryUrl);
        if (result && result.success) {
          setOtpSent(true);
          setOtpType("login");
          setErrors({});
          setApiError("");
        } else {
          setApiError(result.error || "Failed to send OTP. Please try again.");
        }
      } else {
        console.warn("GOOGLE_SCRIPT_URL not configured. Mocking login OTP send.");
        setOtpSent(true);
        setOtpType("login");
        setErrors({});
      }
    } catch (err) {
      console.error("Login OTP send failed:", err);
      setApiError("Failed to connect to authentication server");
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setErrors({ otp: "OTP is required" });
      return;
    } else if (otp.trim().length !== 6) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" });
      return;
    }

    setLoading(true);
    setApiError("");
    setSuccessMessage("");

    try {
      if (GOOGLE_SCRIPT_URL) {
        let queryUrl = "";
        if (otpType === "register") {
          queryUrl = `${GOOGLE_SCRIPT_URL}?action=registerWithOTP&email=${encodeURIComponent(email.trim().toLowerCase())}&otp=${encodeURIComponent(otp.trim())}&firstName=${encodeURIComponent(firstName.trim())}&lastName=${encodeURIComponent(lastName.trim())}`;
        } else {
          queryUrl = `${GOOGLE_SCRIPT_URL}?action=verifyLoginOTP&email=${encodeURIComponent(email.trim().toLowerCase())}&otp=${encodeURIComponent(otp.trim())}`;
        }

        const result = await fetchJSONP(queryUrl);
        if (result && result.success) {
          loginUser(result.user);
          if (result.user.schoolName) {
            onNavigate("modules");
          }
        } else {
          setApiError(result.error || "Invalid or expired OTP");
        }
      } else {
        // Mock offline verification
        const mockUser = {
          firstName: otpType === "register" ? firstName : "Teacher",
          lastName: otpType === "register" ? lastName : "User",
          email: email.trim().toLowerCase(),
          schoolName: ""
        };
        loginUser(mockUser);
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
      setApiError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    const emailTrim = email.trim();
    if (!emailTrim) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(emailTrim)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    setLoading(true);
    setApiError("");
    setSuccessMessage("");

    try {
      if (GOOGLE_SCRIPT_URL) {
        // First check if email already registered
        const checkUrl = `${GOOGLE_SCRIPT_URL}?action=checkEmail&email=${encodeURIComponent(email.trim().toLowerCase())}`;
        const checkResult = await fetchJSONP(checkUrl);
        if (checkResult && checkResult.exists) {
          setErrors({ email: "Email is already registered" });
          setLoading(false);
          return;
        }

        const queryUrl = `${GOOGLE_SCRIPT_URL}?action=sendRegisterOTP&email=${encodeURIComponent(email.trim().toLowerCase())}`;
        const result = await fetchJSONP(queryUrl);
        if (result && result.success) {
          setOtpSent(true);
          setOtpType("register");
          setErrors({});
          setApiError("");
        } else {
          setApiError(result.error || "Failed to send OTP. Please try again.");
        }
      } else {
        console.warn("GOOGLE_SCRIPT_URL not configured. Mocking register OTP send.");
        setOtpSent(true);
        setOtpType("register");
        setErrors({});
      }
    } catch (err) {
      console.error("Registration failed:", err);
      setApiError("Server connection error during registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSchoolSubmit = async (e) => {
    e.preventDefault();
    if (!schoolName.trim()) {
      setErrors({ schoolName: "School name is required" });
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      if (GOOGLE_SCRIPT_URL) {
        const queryUrl = `${GOOGLE_SCRIPT_URL}?action=saveSchool&email=${encodeURIComponent(progress.email)}&schoolName=${encodeURIComponent(schoolName.trim())}`;
        const result = await fetchJSONP(queryUrl);
        if (result && result.success) {
          updateSchoolName(schoolName.trim());
          onNavigate("modules");
        } else {
          setApiError(result.error || "Failed to save school name");
        }
      } else {
        updateSchoolName(schoolName.trim());
        onNavigate("modules");
      }
    } catch (err) {
      console.error("Save school name failed:", err);
      updateSchoolName(schoolName.trim());
      onNavigate("modules");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-auth-container animate-fade-in">
      {!isLoggedIn || !hasSchool ? (
        <>
          {/* Left Column (70%) - Glass Banner */}
          <div className="auth-details-side">
            <div className="glass-banner">
              {/* Left side of banner — Text */}
              <div className="glass-banner-left">
                <div className="auth-logo-header">
                  <div className="auth-logo-icon">CPD</div>
                  <span>Adobe Express for Education</span>
                </div>

                <div className="auth-details-middle">
                  <div className="auth-tagline">Designed by {courseInfo.organization}</div>
                  <h1 className="auth-hero-title">
                    Elevate your <span className="text-highlight-red">teaching practice</span> with structured, certified learning
                  </h1>
                  <p className="auth-hero-desc">{courseInfo.overview}</p>

                  <div className="auth-features-grid">
                    <div className="auth-feature-item">
                      <span className="auth-feature-icon">🛡️</span>
                      <div>
                        <h4 className="auth-feature-title">Official CPD Certification</h4>
                        <p className="auth-feature-desc">Earn accredited certification automatically upon completing active sessions.</p>
                      </div>
                    </div>
                    <div className="auth-feature-item">
                      <span className="auth-feature-icon">⚡</span>
                      <div>
                        <h4 className="auth-feature-title">Interactive Digital Pedagogy</h4>
                        <p className="auth-feature-desc">Practical methods to teach and mentor students in digital creativity</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="auth-footer-text">
                  © 2026 Adobe Express for Education. All rights reserved.
                </div>
              </div>

              {/* Right side of banner — Illustration + Floating Cards */}
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
                      <span className="floating-card-title">Adobe Express</span>
                      <span className="floating-card-sub">Create & Design</span>
                    </div>
                  </div>
                  <div className="floating-card">
                    <span className="floating-card-icon">📜</span>
                    <div className="floating-card-text">
                      <span className="floating-card-title">CPD Certificate</span>
                      <span className="floating-card-sub">On Completion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (30%) - Login / Register Form */}
          <div className="auth-form-side">
            {!isLoggedIn ? (
              <div className="course-card glass-card" style={{ width: "100%", margin: 0, padding: "var(--space-6)" }}>
                {otpSent ? (
                    /* OTP VERIFICATION SCREEN */
                    <div>
                      <div className="course-card-header" style={{ marginBottom: "var(--space-4)" }}>
                        <span className="org-badge">
                          <span>◆</span>
                          Verify OTP
                        </span>
                      </div>
                      <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "var(--space-2)" }}>Enter Verification Code</h2>
                      <p className="text-secondary" style={{ fontSize: "var(--text-xs)", marginBottom: "var(--space-6)" }}>
                        A 6-digit verification code has been sent to your registered email: <strong>{email}</strong>
                      </p>

                      {apiError && (
                        <div style={{ padding: "var(--space-3)", background: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", borderRadius: "var(--radius-sm)", color: "#ef4444", fontSize: "var(--text-xs)", marginBottom: "var(--space-4)" }}>
                          {apiError}
                        </div>
                      )}

                      <form onSubmit={handleOTPSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                        <div>
                          <label style={{ fontSize: "var(--text-xs)", fontWeight: "600", display: "block", marginBottom: "var(--space-1)" }}>6-Digit OTP</label>
                          <input
                            type="text"
                            placeholder="e.g. 123456"
                            value={otp}
                            maxLength={6}
                            onChange={(e) => {
                              setOtp(e.target.value.replace(/\D/g, ""));
                              setErrors({ ...errors, otp: "" });
                              setApiError("");
                            }}
                            style={{
                              width: "100%",
                              padding: "var(--space-2) var(--space-3)",
                              background: "#FFFFFF",
                              border: errors.otp ? "1px solid #ef4444" : "1px solid var(--card-border)",
                              borderRadius: "var(--radius-sm)",
                              color: "var(--text-primary)",
                              textAlign: "center",
                              fontSize: "var(--text-lg)",
                              letterSpacing: "4px",
                              fontWeight: "700"
                            }}
                          />
                          {errors.otp && <span style={{ fontSize: "10px", color: "#ef4444", marginTop: "2px", display: "block" }}>{errors.otp}</span>}
                        </div>

                        <button
                          type="submit"
                          className="btn btn-gold w-full"
                          disabled={loading}
                          style={{ marginTop: "var(--space-2)", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                          {loading ? "Verifying..." : "Verify & Continue"}
                        </button>
                      </form>

                      <div style={{ marginTop: "var(--space-4)", textAlign: "center" }}>
                        <button
                          onClick={() => {
                            setOtpSent(false);
                            setOtp("");
                            setApiError("");
                            setErrors({});
                          }}
                          className="btn-link"
                          style={{ fontSize: "var(--text-xs)", color: "var(--indigo-light)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 }}
                        >
                          ← Back to Sign In
                        </button>
                      </div>
                    </div>
                  ) : authMode === "login" ? (
                    /* LOGIN SCREEN */
                    <div>
                      <div className="course-card-header" style={{ marginBottom: "var(--space-4)" }}>
                        <span className="org-badge">
                          <span>◆</span>
                          Teacher Login
                        </span>
                      </div>
                      <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "var(--space-6)" }}>Sign In to Your Account</h2>

                      {apiError && (
                        <div style={{ padding: "var(--space-3)", background: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", borderRadius: "var(--radius-sm)", color: "#ef4444", fontSize: "var(--text-xs)", marginBottom: "var(--space-4)" }}>
                          {apiError}
                        </div>
                      )}

                      {successMessage && (
                        <div style={{ padding: "var(--space-3)", background: "rgba(16, 185, 129, 0.1)", border: "1px solid #10b981", borderRadius: "var(--radius-sm)", color: "#10b981", fontSize: "var(--text-xs)", marginBottom: "var(--space-4)" }}>
                          {successMessage}
                        </div>
                      )}

                      <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                        <div>
                          <label style={{ fontSize: "var(--text-xs)", fontWeight: "600", display: "block", marginBottom: "var(--space-1)" }}>Email ID</label>
                          <input
                            type="email"
                            placeholder="teacher@example.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setErrors({ ...errors, email: "" });
                              setApiError("");
                            }}
                            style={{
                              width: "100%",
                              padding: "var(--space-2) var(--space-3)",
                              background: "#FFFFFF",
                              border: errors.email ? "1px solid #ef4444" : "1px solid var(--card-border)",
                              borderRadius: "var(--radius-sm)",
                              color: "var(--text-primary)"
                            }}
                          />
                          {errors.email && <span style={{ fontSize: "10px", color: "#ef4444", marginTop: "2px", display: "block" }}>{errors.email}</span>}
                        </div>

                        <button
                          type="submit"
                          className="btn btn-gold w-full"
                          disabled={loading}
                          style={{ marginTop: "var(--space-2)", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                          {loading ? "Sending OTP..." : "Send Verification Code"}
                        </button>
                      </form>

                      <div style={{ marginTop: "var(--space-4)", textAlign: "center" }}>
                        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>Don't have an account? </span>
                        <button
                          onClick={() => {
                            setAuthMode("register");
                            setApiError("");
                            setErrors({});
                          }}
                          className="btn-link"
                          style={{ fontSize: "var(--text-xs)", color: "var(--indigo-light)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 }}
                        >
                          Register Here
                        </button>
                      </div>
                    </div>
                  ) : (
                  /* REGISTER SCREEN */
                  <div>
                    <div className="course-card-header" style={{ marginBottom: "var(--space-2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="org-badge">
                        <span>◆</span>
                        Teacher Registration
                      </span>
                    </div>
                    <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "var(--space-6)" }}>Create Account</h2>

                    {apiError && (
                      <div style={{ padding: "var(--space-3)", background: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", borderRadius: "var(--radius-sm)", color: "#ef4444", fontSize: "var(--text-xs)", marginBottom: "var(--space-4)" }}>
                        {apiError}
                      </div>
                    )}

                    <form onSubmit={handleRegisterSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                      <div style={{ display: "flex", gap: "var(--space-4)" }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: "var(--text-xs)", fontWeight: "600", display: "block", marginBottom: "var(--space-1)" }}>First Name</label>
                          <input
                            type="text"
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => {
                              setFirstName(e.target.value);
                              setErrors({ ...errors, firstName: "" });
                            }}
                            style={{
                              width: "100%",
                              padding: "var(--space-2) var(--space-3)",
                              background: "#FFFFFF",
                              border: errors.firstName ? "1px solid #ef4444" : "1px solid var(--card-border)",
                              borderRadius: "var(--radius-sm)",
                              color: "var(--text-primary)"
                            }}
                          />
                          {errors.firstName && <span style={{ fontSize: "10px", color: "#ef4444", marginTop: "2px", display: "block" }}>{errors.firstName}</span>}
                        </div>

                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: "var(--text-xs)", fontWeight: "600", display: "block", marginBottom: "var(--space-1)" }}>Last Name</label>
                          <input
                            type="text"
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => {
                              setLastName(e.target.value);
                              setErrors({ ...errors, lastName: "" });
                            }}
                            style={{
                              width: "100%",
                              padding: "var(--space-2) var(--space-3)",
                              background: "#FFFFFF",
                              border: errors.lastName ? "1px solid #ef4444" : "1px solid var(--card-border)",
                              borderRadius: "var(--radius-sm)",
                              color: "var(--text-primary)"
                            }}
                          />
                          {errors.lastName && <span style={{ fontSize: "10px", color: "#ef4444", marginTop: "2px", display: "block" }}>{errors.lastName}</span>}
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: "var(--text-xs)", fontWeight: "600", display: "block", marginBottom: "var(--space-1)" }}>Personal Email ID</label>
                        <input
                          type="email"
                          placeholder="john.doe@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({ ...errors, email: "" });
                            setApiError("");
                          }}
                          style={{
                            width: "100%",
                            padding: "var(--space-2) var(--space-3)",
                            background: "#FFFFFF",
                            border: errors.email ? "1px solid #ef4444" : "1px solid var(--card-border)",
                            borderRadius: "var(--radius-sm)",
                            color: "var(--text-primary)"
                          }}
                        />
                        {errors.email && <span style={{ fontSize: "10px", color: "#ef4444", marginTop: "2px", display: "block" }}>{errors.email}</span>}
                      </div>

                      <button
                        type="submit"
                        className="btn btn-gold w-full"
                        disabled={loading}
                        style={{ marginTop: "var(--space-2)", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}
                      >
                        {loading ? "Sending OTP..." : "Send Verification Code"}
                      </button>
                    </form>

                    <div style={{ marginTop: "var(--space-4)", textAlign: "center" }}>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>Already have an account? </span>
                      <button
                        onClick={() => {
                          setAuthMode("login");
                          setApiError("");
                          setErrors({});
                        }}
                        className="btn-link"
                        style={{ fontSize: "var(--text-xs)", color: "var(--indigo-light)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 }}
                      >
                        Login Here
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* SCHOOL REGISTRATION FORM */
              <div className="course-card glass-card" style={{ width: "100%", margin: 0, padding: "var(--space-6)" }}>
                <div className="course-card-header" style={{ marginBottom: "var(--space-4)" }}>
                  <span className="org-badge">
                    <span>◆</span>
                    Certification Profile Complete
                  </span>
                </div>

                <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "var(--space-2)" }}>Enter Your School</h2>
                <p className="text-secondary" style={{ marginBottom: "var(--space-6)" }}>Please provide your school details below. This is required to process and print your certificate.</p>

                {apiError && (
                  <div style={{ padding: "var(--space-3)", background: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", borderRadius: "var(--radius-sm)", color: "#ef4444", fontSize: "var(--text-xs)", marginBottom: "var(--space-4)" }}>
                    {apiError}
                  </div>
                )}

                <form onSubmit={handleSaveSchoolSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                  <div>
                    <label style={{ fontSize: "var(--text-xs)", fontWeight: "600", display: "block", marginBottom: "var(--space-1)" }}>School Name</label>
                    <input
                      type="text"
                      placeholder="e.g. ABC School, District, State"
                      value={schoolName}
                      onChange={(e) => {
                        setSchoolName(e.target.value);
                        setErrors({});
                        setApiError("");
                      }}
                      style={{
                        width: "100%",
                        padding: "var(--space-2) var(--space-3)",
                        background: "#FFFFFF",
                        border: errors.schoolName ? "1px solid #ef4444" : "1px solid var(--card-border)",
                        borderRadius: "var(--radius-sm)",
                        color: "var(--text-primary)"
                      }}
                    />
                    <span className="text-muted" style={{ fontSize: "10px", display: "block", marginTop: "4px" }}>
                      Format: School Name (For Example- ABC School, District, State)
                    </span>
                    {errors.schoolName && <span style={{ fontSize: "10px", color: "#ef4444", marginTop: "2px", display: "block" }}>{errors.schoolName}</span>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-gold w-full"
                    disabled={loading}
                    style={{ marginTop: "var(--space-2)", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}
                  >
                    {loading ? "Saving school..." : "Save & Go to Course →"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </>
      ) : (
        /* COURSE CARD OVERVIEW (FALLBACK FOR LOGGED IN & COMPLETE) */
        <div className="course-card glass-card" style={{ maxWidth: "800px", margin: "var(--space-10) auto" }}>
          <div className="course-card-header">
            <span className="org-badge">
              <span>◆</span>
              Designed by {courseInfo.organization}
            </span>
          </div>

          <p className="course-overview">{courseInfo.overview}</p>

          <div className="benefits-list">
            {courseInfo.benefits.map((benefit, idx) => (
              <div key={idx} className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="card-footer">
            <button className="btn btn-primary btn-lg" onClick={handleCTA}>
              Go to Course Page →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
