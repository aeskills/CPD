export default function PptPreviewModal({ pptTitle, pptLink, onClose }) {
  const isGoogleSlides = pptLink?.includes("docs.google.com");
  const fileName = pptLink?.split("/").pop() || "Presentation.pptx";

  // Formulate Google Slides embed URL and PPTX export download URL
  const embedUrl = isGoogleSlides
    ? pptLink.replace(/\/edit.*/, "/embed?start=false&loop=false&delayms=3000")
    : pptLink;

  const downloadUrl = isGoogleSlides
    ? pptLink.replace(/\/edit.*/, "/export/pptx")
    : pptLink;

  return (
    <div
      className="promo-modal"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justify: "center",
        padding: "20px",
      }}
    >
      <div
        className="ppt-modal-content animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "860px",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "18px 24px",
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justify: "space-between",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #eb1000 0%, #c40d00 100%)",
                display: "flex",
                alignItems: "center",
                justify: "center",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(235, 16, 0, 0.3)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  margin: 0,
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={pptTitle || "Session Presentation Slides (PPT)"}
              >
                {pptTitle || "Session Presentation Slides (PPT)"}
              </h3>
              <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.7)", display: "block" }}>
                Continuous Professional Development · Course Presentation
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close presentation preview"
            style={{
              background: "transparent",
              border: "none",
              color: "#FFFFFF",
              fontSize: "20px",
              fontWeight: "700",
              cursor: "pointer",
              marginLeft: "auto",
              flexShrink: 0,
              padding: "4px 8px",
              opacity: 0.8,
              transition: "opacity 0.2s ease",
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        {isGoogleSlides ? (
          <div style={{ width: "100%", height: "500px", background: "#0F172A", position: "relative" }}>
            <iframe
              src={embedUrl}
              title={pptTitle}
              width="100%"
              height="100%"
              style={{ border: "none", display: "block" }}
              allowFullScreen
            />
          </div>
        ) : (
          <div
            style={{
              padding: "36px 32px",
              background: "#F8FAFC",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* PowerPoint Hero Banner */}
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #FF3B30 0%, #D70015 100%)",
                display: "flex",
                alignItems: "center",
                justify: "center",
                marginBottom: "20px",
                boxShadow: "0 10px 25px rgba(215, 0, 21, 0.25)",
              }}
            >
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>

            <h4
              style={{
                fontSize: "18px",
                fontWeight: "800",
                color: "#0F172A",
                margin: "0 0 8px 0",
              }}
            >
              {pptTitle}
            </h4>
            <p
              style={{
                fontSize: "13px",
                color: "#64748B",
                maxWidth: "520px",
                margin: "0 0 24px 0",
                lineHeight: 1.5,
              }}
            >
              Official presentation slides for this session. Download to view the complete lesson deck, activity frameworks, and classroom templates.
            </p>

            {/* File Info Badges */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justify: "center",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#334155",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                }}
              >
                📁 {fileName}
              </span>
              <span
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#eb1000",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                }}
              >
                📊 PowerPoint (.pptx)
              </span>
            </div>

            {/* Primary Action Button */}
            <a
              href={downloadUrl}
              download
              className="btn btn-primary btn-lg"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: "700",
                fontSize: "14px",
                borderRadius: "10px",
                padding: "12px 28px",
                background: "linear-gradient(135deg, #eb1000 0%, #c40d00 100%)",
                color: "#FFFFFF",
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(235, 16, 0, 0.35)",
                transition: "transform 0.2s ease, boxShadow 0.2s ease",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Presentation Slides (.pptx)
            </a>
          </div>
        )}

        {/* Modal Footer */}
        <div
          style={{
            padding: "14px 24px",
            background: "#FFFFFF",
            borderTop: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            justify: "space-between",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a
              href={downloadUrl}
              download
              className="btn btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: "700",
                fontSize: "12px",
                borderRadius: "8px",
                padding: "8px 16px",
                background: "#eb1000",
                color: "#FFFFFF",
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(235, 16, 0, 0.25)",
              }}
            >
              📥 Download PPTX
            </a>

            {isGoogleSlides && (
              <a
                href={pptLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#334155",
                  textDecoration: "none",
                  border: "1px solid #CBD5E1",
                  borderRadius: "8px",
                  padding: "8px 14px",
                }}
              >
                ↗ Open in Google Slides
              </a>
            )}
          </div>

          <button
            className="btn btn-ghost"
            onClick={onClose}
            style={{ fontSize: "12px", fontWeight: "600" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
