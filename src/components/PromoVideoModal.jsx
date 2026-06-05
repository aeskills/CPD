import { useState } from "react";

export default function PromoVideoModal({ videoId, onClose }) {
  return (
    <div className="promo-modal" onClick={onClose}>
      <div className="promo-content" onClick={(e) => e.stopPropagation()}>
        <button className="promo-close" onClick={onClose} aria-label="Close promo video">
          ✕
        </button>
        <div className="promo-video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="CPD Promotional Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
