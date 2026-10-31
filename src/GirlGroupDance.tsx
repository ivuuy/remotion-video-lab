import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Palette = {
  readonly hair: string;
  readonly outfit: string;
  readonly accent: string;
  readonly skin: string;
  readonly boot: string;
};

type DancerProps = {
  readonly name: string;
  readonly palette: Palette;
  readonly x: number;
  readonly floor: number;
  readonly scale: number;
  readonly phase: number;
  readonly frame: number;
  readonly fps: number;
  readonly spotlight: string;
};

const members: Omit<DancerProps, "frame" | "fps">[] = [
  {
    name: "LUNA",
    palette: { hair: "#17132c", outfit: "#8b5cf6", accent: "#d8b4fe", skin: "#f4c9b5", boot: "#241b45" },
    x: 235,
    floor: 500,
    scale: 0.92,
    phase: 0,
    spotlight: "#a78bfa",
  },
  {
    name: "MIRA",
    palette: { hair: "#20162e", outfit: "#ec4899", accent: "#fbcfe8", skin: "#f2c3ae", boot: "#3b1635" },
    x: 680,
    floor: 510,
    scale: 1.02,
    phase: 1.8,
    spotlight: "#fb7185",
  },
  {
    name: "SORA",
    palette: { hair: "#122033", outfit: "#06b6d4", accent: "#a5f3fc", skin: "#efbea8", boot: "#123141" },
    x: 1120,
    floor: 510,
    scale: 1.04,
    phase: 3.2,
    spotlight: "#22d3ee",
  },
  {
    name: "NOVA",
    palette: { hair: "#2e1a18", outfit: "#f59e0b", accent: "#fef3c7", skin: "#f4c6ad", boot: "#42230f" },
    x: 1565,
    floor: 500,
    scale: 0.94,
    phase: 4.8,
    spotlight: "#fbbf24",
  },
];

const Limb: React.FC<{
  readonly width: number;
  readonly height: number;
  readonly color: string;
  readonly left: number;
  readonly top: number;
  readonly rotate: number;
  readonly radius?: number;
}> = ({ width, height, color, left, top, rotate, radius = 30 }) => (
  <div
    style={{
      position: "absolute",
      left,
      top,
      width,
      height,
      borderRadius: radius,
      background: color,
      rotate: `${rotate}deg`,
      transformOrigin: "50% 10%",
      boxShadow: "inset -7px -7px 12px rgba(0,0,0,0.14)",
    }}
  />
);

const Dancer: React.FC<DancerProps> = ({
  name,
  palette,
  x,
  floor,
  scale,
  phase,
  frame,
  fps,
  spotlight,
}) => {
  const intro = spring({ frame, fps, config: { damping: 18, stiffness: 110 }, durationInFrames: 42 });
  const outro = interpolate(frame, [13.2 * fps, 15 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 1, 1),
  });
  const beat = Math.sin((frame / 24) * Math.PI * 2 * 1.75 + phase);
  const beatSoft = Math.sin((frame / 24) * Math.PI * 2 * 0.875 + phase * 0.7);
  const bounce = beat * 14;
  const bodyLean = beatSoft * 4;
  const leftArm = -29 + beat * 43;
  const rightArm = 24 - beat * 38;
  const leftForearm = 12 + beatSoft * 38;
  const rightForearm = -12 - beatSoft * 38;
  const leftLeg = -5 - beat * 7;
  const rightLeg = 5 + beat * 7;
  const headTilt = beatSoft * 4;
  const glow = 0.24 + Math.abs(beat) * 0.18;
  const spotlightAlphaValue = Math.round((glow + 0.18) * 255);
  const spotlightAlpha = spotlightAlphaValue < 16 ? `0${spotlightAlphaValue.toString(16)}` : spotlightAlphaValue.toString(16);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: floor,
        width: 250,
        height: 560,
        scale: scale * (0.86 + intro * 0.14),
        translate: `-125px ${bounce - intro * 34}px`,
        opacity: intro * outro,
        rotate: `${bodyLean * 0.25}deg`,
        transformOrigin: "50% 100%",
        filter: `drop-shadow(0 20px 24px rgba(0, 0, 0, ${0.34 + glow}))`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 120,
          width: 230,
          height: 360,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${spotlight}${spotlightAlpha} 0%, transparent 68%)`,
          opacity: 0.8,
          filter: "blur(8px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 84,
          top: 8,
          width: 82,
          height: 92,
          borderRadius: "46% 46% 42% 42%",
          background: palette.skin,
          rotate: `${headTilt}deg`,
          boxShadow: "inset -8px -10px 12px rgba(137, 59, 65, 0.14)",
          zIndex: 4,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -7,
            top: -14,
            width: 96,
            height: 56,
            borderRadius: "62% 62% 38% 38%",
            background: palette.hair,
            rotate: "-4deg",
            boxShadow: "inset -10px 0 16px rgba(255,255,255,0.08)",
          }}
        />
        <div style={{ position: "absolute", left: -15, top: 23, width: 28, height: 78, borderRadius: 18, background: palette.hair, rotate: "8deg" }} />
        <div style={{ position: "absolute", right: -12, top: 23, width: 28, height: 78, borderRadius: 18, background: palette.hair, rotate: "-7deg" }} />
        <div style={{ position: "absolute", left: 22, top: 40, width: 10, height: 5, borderRadius: 4, background: "#24182c" }} />
        <div style={{ position: "absolute", right: 22, top: 40, width: 10, height: 5, borderRadius: 4, background: "#24182c" }} />
        <div style={{ position: "absolute", left: 35, top: 63, width: 14, height: 7, borderRadius: "50%", borderBottom: "3px solid #a54a61" }} />
      </div>
      <div style={{ position: "absolute", left: 113, top: 90, width: 24, height: 45, borderRadius: 12, background: palette.skin, zIndex: 2 }} />
      <div
        style={{
          position: "absolute",
          left: 62,
          top: 112,
          width: 128,
          height: 178,
          borderRadius: "36px 36px 42px 42px",
          background: `linear-gradient(145deg, ${palette.accent} 0%, ${palette.outfit} 42%, ${palette.outfit} 100%)`,
          rotate: `${bodyLean}deg`,
          zIndex: 2,
          boxShadow: "inset -15px -16px 22px rgba(0,0,0,0.16)",
        }}
      >
        <div style={{ position: "absolute", left: 14, top: 20, width: 100, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.65)" }} />
        <div style={{ position: "absolute", left: 54, top: 9, width: 10, height: 140, borderRadius: 8, background: "rgba(255,255,255,0.18)", rotate: "-18deg" }} />
        <div style={{ position: "absolute", left: 38, bottom: 16, width: 54, height: 12, borderRadius: 10, background: "rgba(43, 22, 58, 0.26)" }} />
      </div>
      <Limb width={35} height={145} color={palette.skin} left={35} top={120} rotate={leftArm} />
      <Limb width={26} height={130} color={palette.accent} left={18} top={236} rotate={leftForearm} />
      <Limb width={35} height={145} color={palette.skin} left={182} top={120} rotate={rightArm} />
      <Limb width={26} height={130} color={palette.accent} left={202} top={236} rotate={rightForearm} />
      <Limb width={44} height={170} color={palette.outfit} left={72} top={270} rotate={leftLeg} />
      <Limb width={44} height={170} color={palette.outfit} left={135} top={270} rotate={rightLeg} />
      <Limb width={48} height={116} color={palette.boot} left={62} top={420} rotate={leftLeg * 0.25} radius={18} />
      <Limb width={48} height={116} color={palette.boot} left={140} top={420} rotate={rightLeg * 0.25} radius={18} />
      <div style={{ position: "absolute", left: 75, bottom: -3, width: 100, height: 6, borderRadius: "50%", background: spotlight, opacity: 0.55, filter: "blur(8px)" }} />
      <div style={{ position: "absolute", left: 61, top: 512, width: 128, textAlign: "center", color: "rgba(255,255,255,0.72)", fontSize: 15, letterSpacing: 4, fontWeight: 700 }}>
        {name}
      </div>
    </div>
  );
};

const Starfield: React.FC<{ readonly frame: number }> = ({ frame }) => {
  const stars = Array.from({ length: 34 }, (_, index) => {
    const x = (index * 271) % 1920;
    const y = 70 + ((index * 97) % 490);
    const twinkle = 0.2 + 0.7 * Math.abs(Math.sin(frame / 22 + index));
    return (
      <div key={index} style={{ position: "absolute", left: x, top: y, width: index % 5 === 0 ? 5 : 3, height: index % 5 === 0 ? 5 : 3, borderRadius: "50%", background: index % 3 === 0 ? "#f9a8d4" : "#dbeafe", opacity: twinkle, boxShadow: "0 0 14px currentColor" }} />
    );
  });
  return <>{stars}</>;
};

export const GirlGroupDance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleIn = interpolate(frame, [0, 1.3 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const titleOut = interpolate(frame, [13.2 * fps, 15 * fps], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.4, 0, 1, 1) });
  const cameraScale = interpolate(frame, [0, 15 * fps], [1.06, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sweep = ((frame * 34) % 2600) - 340;

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#090617", color: "#fff", fontFamily: "Inter, Helvetica Neue, Arial, sans-serif" }}>
      <AbsoluteFill style={{ scale: cameraScale, background: "radial-gradient(circle at 50% 32%, #2b1b4f 0%, #140e2c 38%, #090617 78%)" }}>
        <Starfield frame={frame} />
        <div style={{ position: "absolute", left: sweep, top: -160, width: 270, height: 1300, rotate: "18deg", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", filter: "blur(14px)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 650, background: "linear-gradient(180deg, rgba(7,4,20,0.25), transparent)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 290, background: "linear-gradient(180deg, rgba(12, 7, 28, 0), rgba(4, 3, 14, 0.98) 48%)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 75, height: 3, background: "linear-gradient(90deg, transparent, #f9a8d4 24%, #a78bfa 50%, #67e8f9 76%, transparent)", opacity: 0.85, boxShadow: "0 0 30px #c084fc" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 170, background: "repeating-linear-gradient(105deg, rgba(167,139,250,0.12) 0px, rgba(167,139,250,0.12) 2px, transparent 2px, transparent 110px)", opacity: 0.7 }} />
        {members.map((member) => <Dancer key={member.name} {...member} frame={frame} fps={fps} />)}
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 78, top: 54, opacity: titleIn * titleOut, translate: `0px ${interpolate(frame, [0, 1.3 * fps], [26, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}px` }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 8, color: "#f9a8d4" }}>ORIGINAL GIRL GROUP</div>
        <div style={{ fontSize: 78, lineHeight: 0.92, fontWeight: 900, letterSpacing: -3 }}>NEON BLOOM</div>
        <div style={{ marginTop: 14, fontSize: 18, letterSpacing: 5, color: "rgba(255,255,255,0.62)" }}>CHOREO 01 · STARDUST</div>
      </div>
      <div style={{ position: "absolute", right: 80, top: 62, display: "flex", alignItems: "center", gap: 12, opacity: titleIn * titleOut, color: "rgba(255,255,255,0.75)", fontSize: 18, letterSpacing: 3 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f472b6", boxShadow: "0 0 14px #f472b6" }} />
        LIVE STAGE / 2026
      </div>
      <div style={{ position: "absolute", left: 80, bottom: 45, fontSize: 16, letterSpacing: 3, color: "rgba(255,255,255,0.48)", opacity: titleOut }}>LUNA · MIRA · SORA · NOVA</div>
      <div style={{ position: "absolute", right: 80, bottom: 45, fontSize: 16, letterSpacing: 3, color: "rgba(255,255,255,0.48)", opacity: titleOut }}>15 SEC / 24 FPS</div>
      <div style={{ position: "absolute", left: 0, bottom: 0, height: 4, width: `${interpolate(frame, [0, 15 * fps - 1], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`, background: "linear-gradient(90deg, #f472b6, #a78bfa, #67e8f9)" }} />
    </AbsoluteFill>
  );
};
