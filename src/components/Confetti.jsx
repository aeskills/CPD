import { useEffect, useRef } from "react";

const COLORS = ["#4F46E5", "#F59E0B", "#10B981", "#EF4444", "#3B82F6", "#6366F1", "#FCD34D"];

export default function Confetti({ duration = 3000 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pieces = [];
    for (let i = 0; i < 80; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 1000;
      const animDuration = 2000 + Math.random() * 2000;
      const size = 6 + Math.random() * 8;

      piece.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        animation-duration: ${animDuration}ms;
        animation-delay: ${delay}ms;
        border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      `;
      container.appendChild(piece);
      pieces.push(piece);
    }

    const timer = setTimeout(() => {
      pieces.forEach((p) => p.remove());
    }, duration + 2000);

    return () => {
      clearTimeout(timer);
      pieces.forEach((p) => p.remove());
    };
  }, [duration]);

  return <div ref={containerRef} className="confetti-container" />;
}
