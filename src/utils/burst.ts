export function triggerBurst(el: HTMLElement | null): void {
  if (!el) return;
  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const style = getComputedStyle(document.documentElement);
  const dawnCol = style.getPropertyValue("--dawn").trim() || "#b45309";
  const accentCol = style.getPropertyValue("--accent").trim() || "#0f766e";
  const colors = [dawnCol, accentCol, "#f59e0b", "#14b8a6"];

  const count = 22;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.style.cssText = `
      position: fixed;
      left: ${cx}px;
      top: ${cy}px;
      width: ${Math.random() > 0.5 ? 9 : 6}px;
      height: ${Math.random() > 0.5 ? 9 : 6}px;
      border-radius: 50%;
      background: ${colors[i % colors.length]};
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(s);

    const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.2 - 0.1);
    const distance = 50 + Math.random() * 80;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;

    const anim = s.animate(
      [
        { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
        { transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(0.15)`, opacity: 0 }
      ],
      {
        duration: 750 + Math.random() * 250,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)"
      }
    );

    anim.onfinish = () => s.remove();
  }
}
