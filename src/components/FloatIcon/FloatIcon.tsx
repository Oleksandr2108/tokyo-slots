import type { CSSProperties } from "react";

const floatIconModules = import.meta.glob(
  "../../assets/floatIcons/*.{svg,png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
) as Record<string, string>;

const icons = Object.entries(floatIconModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => {
    const fileName = path.split("/").pop() ?? `icon-${index + 1}`;
    const name = fileName.replace(/\.[^/.]+$/, "");

    return {
      id: index + 1,
      name,
      src,
    };
  });

const ICON_COUNT = 40;

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 9999.91) * 10000;
  return x - Math.floor(x);
};

const positions = Array.from({ length: ICON_COUNT }, (_, i) => {
  const top = 2 + pseudoRandom(i + 1) * 96;
  const sideStart = 0;
  const sideBandWidth = 35;
  const sidePick = pseudoRandom(i + 101);
  const sideOffset = pseudoRandom(i + 601) * sideBandWidth;
  const left =
    sidePick < 0.5
      ? sideStart + sideOffset
      : 100 - sideStart - sideBandWidth + sideOffset;
  const size = Math.round(30 + pseudoRandom(i + 201) * 40);
  const delay = Number((pseudoRandom(i + 301) * 2.2).toFixed(2));
  const duration = Number((2.8 + pseudoRandom(i + 401) * 2.4).toFixed(2));
  const rotate = Math.round(-35 + pseudoRandom(i + 501) * 70);

  return {
    top: `${top.toFixed(1)}%`,
    left: `${left.toFixed(1)}%`,
    size,
    delay,
    duration,
    rotate,
  };
});

const keyframesCSS = `
  @keyframes floatUpDown {
    0%   { transform: translateY(0px) rotate(var(--r)); }
    50%  { transform: translateY(-14px) rotate(var(--r)); }
    100% { transform: translateY(0px) rotate(var(--r)); }
  }
  @keyframes fadeInFloat {
    0%   { opacity: 0; transform: translateY(20px) rotate(var(--r)); }
    100% { opacity: 1; transform: translateY(0px) rotate(var(--r)); }
  }
  @keyframes gentlePulse {
    0%, 100% { filter: drop-shadow(0 4px 12px rgba(124,58,237,0.25)); }
    50%       { filter: drop-shadow(0 8px 24px rgba(236,72,153,0.45)); }
  }
  .float-icon {
    position: absolute;
    pointer-events: none;
    animation: floatUpDown var(--dur) ease-in-out infinite var(--delay),
               gentlePulse calc(var(--dur) * 1.5) ease-in-out infinite var(--delay);
    will-change: transform;
  }
  .float-icon:hover {
    pointer-events: auto;
    cursor: pointer;
    z-index: 100;
  }
`;

const FloatIcon = () => {
  const iconList = (() => {
    if (icons.length === 0) {
      return [];
    }

    const minSameIconDistance = 20;
    const placedByIcon = new Map<
      number,
      Array<{ top: number; left: number }>
    >();

    return positions.map((pos, i) => {
      const top = Number.parseFloat(pos.top);
      const left = Number.parseFloat(pos.left);
      const startIndex = Math.floor(pseudoRandom(i + 701) * icons.length);

      let selectedIndex = startIndex;

      for (let offset = 0; offset < icons.length; offset += 1) {
        const candidateIndex = (startIndex + offset) % icons.length;
        const history = placedByIcon.get(candidateIndex) ?? [];
        const isTooClose = history.some((point) => {
          const distance = Math.hypot(point.top - top, point.left - left);
          return distance < minSameIconDistance;
        });

        if (!isTooClose) {
          selectedIndex = candidateIndex;
          break;
        }
      }

      const points = placedByIcon.get(selectedIndex) ?? [];
      points.push({ top, left });
      placedByIcon.set(selectedIndex, points.slice(-10));

      return {
        ...pos,
        icon: icons[selectedIndex],
      };
    });
  })();

  return (
    <>
      <style>{keyframesCSS}</style>

      {/* Subtle grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {iconList.map((item, i) => {
        const iconStyle: CSSProperties & {
          "--dur": string;
          "--delay": string;
          "--r": string;
        } = {
          top: item.top,
          left: item.left,
          width: item.size,
          height: item.size,
          "--dur": `${item.duration}s`,
          "--delay": `${item.delay}s`,
          "--r": `${item.rotate}deg`,
        };

        return (
          <div
            key={i}
            className="float-icon"
            style={iconStyle}
          >
            <img
              src={item.icon.src}
              alt={item.icon.name}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        );
      })}
    </>
  );
};

export default FloatIcon;
