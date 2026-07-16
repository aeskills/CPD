import { useState, useEffect } from "react";
import { GOOGLE_SCRIPT_URL } from "../config";
import { fetchJSONP } from "../utils/api";

export default function Sidebar({
  module,
  currentVideoId,
  onSelectVideo,
  videoProgress,
  isVideoComplete,
  areAllVideosComplete,
  onEndSession,
  isMobileOpen,
  onCloseMobile,
  moduleLinks,
  updateModuleLinks,
  userEmail,
}) {
  const [language, setLanguage] = useState("English");
  const [videosExpanded, setVideosExpanded] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  const linksForModule = moduleLinks[module.id] || { teacherLink: "", galleryLink: "" };
  const [teacherLink, setTeacherLink] = useState(linksForModule.teacherLink || "");
  const [galleryLink, setGalleryLink] = useState(linksForModule.galleryLink || "");
  const [teacherError, setTeacherError] = useState(false);
  const [galleryError, setGalleryError] = useState(false);
  const [teacherSuccess, setTeacherSuccess] = useState(!!linksForModule.teacherLink);
  const [gallerySuccess, setGallerySuccess] = useState(!!linksForModule.galleryLink);

  const [teacherErrorMessage, setTeacherErrorMessage] = useState("");
  const [galleryErrorMessage, setGalleryErrorMessage] = useState("");
  const [isSubmittingTeacher, setIsSubmittingTeacher] = useState(false);
  const [isSubmittingGallery, setIsSubmittingGallery] = useState(false);

  useEffect(() => {
    const links = moduleLinks[module.id] || { teacherLink: "", galleryLink: "" };
    setTeacherLink(links.teacherLink || "");
    setGalleryLink(links.galleryLink || "");
    setTeacherError(false);
    setGalleryError(false);
    setTeacherSuccess(!!links.teacherLink);
    setGallerySuccess(!!links.galleryLink);
    setTeacherErrorMessage("");
    setGalleryErrorMessage("");
  }, [module.id, moduleLinks]);

  const validateLink = (url) => {
    if (!url || !url.trim()) return false;
    const cleanUrl = url.trim().toLowerCase();
    return cleanUrl.includes("express.adobe.com") || cleanUrl.includes("adobe.express");
  };

  const handleLinkSubmit = async (type) => {
    const isTeacher = (type === "teacher");
    const linkValue = isTeacher ? teacherLink : galleryLink;

    // Validate link format locally first
    const isValid = validateLink(linkValue);
    if (!isValid) {
      if (isTeacher) {
        setTeacherError(true);
        setTeacherSuccess(false);
        setTeacherErrorMessage("Must be a valid Adobe Express link");
      } else {
        setGalleryError(true);
        setGallerySuccess(false);
        setGalleryErrorMessage("Must be a valid Adobe Express link");
      }
      return;
    }

    if (isTeacher) {
      setIsSubmittingTeacher(true);
      setTeacherError(false);
      setTeacherErrorMessage("");
    } else {
      setIsSubmittingGallery(true);
      setGalleryError(false);
      setGalleryErrorMessage("");
    }

    try {
      // Check for link uniqueness against the Google Sheet
      if (GOOGLE_SCRIPT_URL) {
        const queryUrl = `${GOOGLE_SCRIPT_URL}?action=checkLink&checkLink=${encodeURIComponent(linkValue)}&email=${encodeURIComponent(userEmail || "")}`;
        const result = await fetchJSONP(queryUrl);

        if (result && result.exists) {
          if (isTeacher) {
            setTeacherError(true);
            setTeacherSuccess(false);
            setTeacherErrorMessage("This link has already been submitted by another user.");
          } else {
            setGalleryError(true);
            setGallerySuccess(false);
            setGalleryErrorMessage("This link has already been submitted by another user.");
          }
          return;
        }
      }

      // Submit the link to the Google Sheet row
      if (GOOGLE_SCRIPT_URL) {
        const submitUrl = `${GOOGLE_SCRIPT_URL}?action=submitLink&email=${encodeURIComponent(userEmail)}&moduleId=${module.id}&linkType=${type}&url=${encodeURIComponent(linkValue)}`;
        await fetchJSONP(submitUrl);
      }

      // Save locally in progress state
      if (isTeacher) {
        setTeacherError(false);
        setTeacherSuccess(true);
        updateModuleLinks(module.id, linkValue, galleryLink);
      } else {
        setGalleryError(false);
        setGallerySuccess(true);
        updateModuleLinks(module.id, teacherLink, linkValue);
      }
    } catch (err) {
      console.error("Link submission failed:", err);
      // Fallback: save locally so user can still progress
      if (isTeacher) {
        setTeacherError(false);
        setTeacherSuccess(true);
        updateModuleLinks(module.id, linkValue, galleryLink);
      } else {
        setGalleryError(false);
        setGallerySuccess(true);
        updateModuleLinks(module.id, teacherLink, linkValue);
      }
    } finally {
      if (isTeacher) {
        setIsSubmittingTeacher(false);
      } else {
        setIsSubmittingGallery(false);
      }
    }
  };

  const playableVideos = module.videos.filter((v) => !v.comingSoon);
  const allVideosWatched = playableVideos.length > 0 && areAllVideosComplete(playableVideos);

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isSectionExpanded = (key) => {
    return expandedSections[key] !== false; // default expanded
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${isMobileOpen ? "visible" : ""}`}
        onClick={onCloseMobile}
      />

      <aside
        className={`session-sidebar ${isMobileOpen ? "sidebar-open" : ""}`}
      >
        <div className="sidebar-header">
          <h3>Course Content</h3>
        </div>

        <div className="sidebar-content">
          {/* Videos Section — only show if there are videos */}
          {module.videos.length > 0 && (
            <div className="sidebar-section">
              <div
                className="sidebar-section-title"
                onClick={() => setVideosExpanded(!videosExpanded)}
              >
                <span>Videos ({playableVideos.length}){module.videos.length > playableVideos.length ? ` + ${module.videos.length - playableVideos.length} coming soon` : ""}</span>
                <span>{videosExpanded ? "▾" : "▸"}</span>
              </div>

              {videosExpanded &&
                module.videos.map((video) => {
                  if (video.comingSoon) {
                    return (
                      <div
                        key={video.id}
                        className="video-card video-coming-soon"
                      >
                        <div className="video-thumb">
                          <div className="video-thumb-overlay">
                            <span style={{ fontSize: "14px", color: "var(--gold)" }}>⏳</span>
                          </div>
                        </div>
                        <div className="video-card-info">
                          <h4>{video.title}</h4>
                          <div className="video-meta">
                            <span className="coming-soon-badge">Coming Soon</span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const isPlaying = video.id === currentVideoId;
                  const isComplete =
                    (videoProgress[video.id] || 0) >= 95;
                  const watchPct = videoProgress[video.id] || 0;

                  return (
                    <div
                      key={video.id}
                      className={`video-card ${isPlaying ? "video-playing" : ""} ${isComplete ? "video-complete" : ""}`}
                      onClick={() => onSelectVideo(video)}
                    >
                      <div className="video-thumb">
                        <div className="video-thumb-overlay">
                          {isComplete ? (
                            <span className="checkmark-circle">✓</span>
                          ) : isPlaying ? (
                            <span style={{ fontSize: "14px" }}>▶</span>
                          ) : (
                            <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>▷</span>
                          )}
                        </div>
                      </div>
                      <div className="video-card-info">
                        <h4>{video.title}</h4>
                        <div className="video-meta">
                          <span className="source-badge">{video.source}</span>
                          <span>{video.duration}</span>
                          {watchPct > 0 && watchPct < 95 && (
                            <span style={{ color: "var(--gold)" }}>
                              {Math.round(watchPct)}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* No Videos Placeholder */}
          {module.videos.length === 0 && (
            <div className="sidebar-section">
              <div className="sidebar-section-title">
                <span>Videos</span>
              </div>
              <div className="no-videos-placeholder">
                <div className="no-videos-icon">📋</div>
                <p>This session focuses on templates and resources.</p>
                <p className="no-videos-sub">Explore the resources below to get started!</p>
              </div>
            </div>
          )}

          {/* Resource Sections — new grouped layout */}
          {module.resourceSections && module.resourceSections.map((section, sIdx) => {
            const sectionKey = `resource-${sIdx}`;
            const expanded = isSectionExpanded(sectionKey);

            return (
              <div key={sIdx} className="sidebar-section">
                <div
                  className="sidebar-section-title resource-section-title"
                  onClick={() => toggleSection(sectionKey)}
                >
                  <span>
                    <span className="section-icon">{section.icon}</span>{" "}
                    {section.title} ({section.resources.length})
                  </span>
                  <span>{expanded ? "▾" : "▸"}</span>
                </div>

                {expanded &&
                  section.resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url || "#"}
                      target={resource.url && resource.url !== "#" ? "_blank" : undefined}
                      rel={resource.url && resource.url !== "#" ? "noopener noreferrer" : undefined}
                      className="resource-card resource-card-styled"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="resource-icon">
                        {resource.type === "Comic Strip" ? "💬" :
                         resource.type === "Calendar" ? "📅" :
                         resource.type === "Webpage" ? "🌐" : "📄"}
                      </div>
                      <div className="resource-info">
                        <h4>{resource.title}</h4>
                        <span className="resource-type">{resource.type}</span>
                      </div>
                      <span className="resource-arrow">↗</span>
                    </a>
                  ))}
              </div>
            );
          })}

          {/* Legacy resources fallback */}
          {(!module.resourceSections || module.resourceSections.length === 0) && module.resources && module.resources.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-section-title">
                <span>Learning Resources ({module.resources.length})</span>
              </div>
              {module.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url || "#"}
                  target={resource.url && resource.url !== "#" ? "_blank" : undefined}
                  rel={resource.url && resource.url !== "#" ? "noopener noreferrer" : undefined}
                  className="resource-card"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="resource-icon">📄</div>
                  <div className="resource-info">
                    <h4>{resource.title}</h4>
                    <span className="resource-type">{resource.type}</span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Submission Section */}
          <div className="sidebar-section">
            <div className="sidebar-section-title">
              <span>Project Submissions</span>
            </div>

            <div className="submission-card" style={{ padding: "var(--space-4)", background: "#F7F9FA", borderRadius: "var(--radius-md)", border: "1px solid var(--card-border)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <div className="input-group">
                <label style={{ fontSize: "var(--text-xs)", fontWeight: "600", color: "var(--text-secondary)", display: "block", marginBottom: "var(--space-1)" }}>
                  Teacher Activity Link
                </label>
                <div style={{ display: "flex", gap: "var(--space-2)" }}>
                  <input
                    type="text"
                    placeholder="https://express.adobe.com/..."
                    value={teacherLink}
                    onChange={(e) => {
                      setTeacherLink(e.target.value);
                      setTeacherError(false);
                      setTeacherSuccess(false);
                      setTeacherErrorMessage("");
                    }}
                    disabled={isSubmittingTeacher}
                    style={{
                      flex: 1,
                      padding: "var(--space-2) var(--space-3)",
                      background: "#FFFFFF",
                      border: teacherError 
                        ? "1px solid #ef4444" 
                        : teacherSuccess 
                          ? "1px solid #10b981" 
                          : "1px solid var(--card-border)",
                      borderRadius: "var(--radius-sm)",
                      color: "var(--text-primary)",
                      fontSize: "var(--text-sm)",
                      outline: "none",
                      transition: "border-color var(--transition)"
                    }}
                  />
                  <button
                    onClick={() => handleLinkSubmit("teacher")}
                    className="btn btn-sm btn-primary"
                    disabled={isSubmittingTeacher}
                    style={{ padding: "0 var(--space-4)", fontSize: "var(--text-xs)", minHeight: "36px", height: "36px", opacity: isSubmittingTeacher ? 0.7 : 1 }}
                  >
                    {isSubmittingTeacher ? "..." : "Submit"}
                  </button>
                </div>
                {teacherError && (
                  <span style={{ fontSize: "10px", color: "#ef4444", marginTop: "2px", display: "block" }}>
                    {teacherErrorMessage || "Must be a valid Adobe Express link"}
                  </span>
                )}
                {teacherSuccess && (
                  <span style={{ fontSize: "10px", color: "#10b981", marginTop: "2px", display: "block" }}>
                    Submitted successfully! ✓
                  </span>
                )}
              </div>

              <div className="input-group">
                <label style={{ fontSize: "var(--text-xs)", fontWeight: "600", color: "var(--text-secondary)", display: "block", marginBottom: "var(--space-1)" }}>
                  Gallery Link
                </label>
                <div style={{ display: "flex", gap: "var(--space-2)" }}>
                  <input
                    type="text"
                    placeholder="https://express.adobe.com/..."
                    value={galleryLink}
                    onChange={(e) => {
                      setGalleryLink(e.target.value);
                      setGalleryError(false);
                      setGallerySuccess(false);
                      setGalleryErrorMessage("");
                    }}
                    disabled={isSubmittingGallery}
                    style={{
                      flex: 1,
                      padding: "var(--space-2) var(--space-3)",
                      background: "#FFFFFF",
                      border: galleryError 
                        ? "1px solid #ef4444" 
                        : gallerySuccess 
                          ? "1px solid #10b981" 
                          : "1px solid var(--card-border)",
                      borderRadius: "var(--radius-sm)",
                      color: "var(--text-primary)",
                      fontSize: "var(--text-sm)",
                      outline: "none",
                      transition: "border-color var(--transition)"
                    }}
                  />
                  <button
                    onClick={() => handleLinkSubmit("gallery")}
                    className="btn btn-sm btn-primary"
                    disabled={isSubmittingGallery}
                    style={{ padding: "0 var(--space-4)", fontSize: "var(--text-xs)", minHeight: "36px", height: "36px", opacity: isSubmittingGallery ? 0.7 : 1 }}
                  >
                    {isSubmittingGallery ? "..." : "Submit"}
                  </button>
                </div>
                {galleryError && (
                  <span style={{ fontSize: "10px", color: "#ef4444", marginTop: "2px", display: "block" }}>
                    {galleryErrorMessage || "Must be a valid Adobe Express link"}
                  </span>
                )}
                {gallerySuccess && (
                  <span style={{ fontSize: "10px", color: "#10b981", marginTop: "2px", display: "block" }}>
                    Submitted successfully! ✓
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="btn btn-danger w-full" onClick={onEndSession}>
            End Session
          </button>
        </div>
      </aside>
    </>
  );
}
