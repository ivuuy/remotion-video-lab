import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type PigProps = {
  readonly x: number;
  readonly y: number;
  readonly scale: number;
  readonly shirt: string;
  readonly shorts?: string;
  readonly phase: number;
  readonly frame: number;
  readonly fps: number;
  readonly label: string;
};

const Pig: React.FC<PigProps> = ({
  x,
  y,
  scale,
  shirt,
  shorts = "#315d96",
  phase,
  frame,
  fps,
  label,
}) => {
  const intro = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 110 },
    durationInFrames: 36,
  });
  const walk = Math.sin(frame / 7 + phase);
  const bob = Math.sin(frame / 8 + phase) * 5;
  const blink = Math.sin(frame / 55 + phase) > 0.93 ? 0.18 : 1;
  const wave = Math.sin(frame / 11 + phase) * 22;
  const exit = interpolate(frame, [13.4 * fps, 15 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 1, 1),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 260,
        height: 390,
        scale: scale * (0.82 + intro * 0.18),
        translate: `-130px ${bob - (1 - intro) * 120}px`,
        opacity: intro * exit,
        transformOrigin: "50% 100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 17,
          top: 130,
          width: 226,
          height: 190,
          borderRadius: "48% 50% 43% 43%",
          background: "#f5a7a9",
          border: "5px solid #8f4b68",
          boxSizing: "border-box",
          rotate: `${walk * 1.1}deg`,
          boxShadow: "inset -15px -12px rgba(190, 91, 117, 0.15)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 70,
            top: 92,
            width: 86,
            height: 122,
            borderRadius: "26% 26% 38% 38%",
            background: shirt,
            border: "5px solid #8f4b68",
            borderTop: 0,
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 102,
            top: 92,
            width: 20,
            height: 120,
            background: "rgba(255,255,255,0.22)",
            rotate: "-12deg",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 77,
            top: 175,
            width: 35,
            height: 110,
            borderRadius: 18,
            background: "#f5a7a9",
            border: "5px solid #8f4b68",
            boxSizing: "border-box",
            rotate: `${-17 - walk * 8}deg`,
            transformOrigin: "50% 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 146,
            top: 175,
            width: 35,
            height: 110,
            borderRadius: 18,
            background: "#f5a7a9",
            border: "5px solid #8f4b68",
            boxSizing: "border-box",
            rotate: `${17 + walk * 8}deg`,
            transformOrigin: "50% 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 62,
            top: 266,
            width: 52,
            height: 90,
            borderRadius: 22,
            background: shorts,
            border: "5px solid #8f4b68",
            boxSizing: "border-box",
            rotate: `${-7 + walk * 8}deg`,
            transformOrigin: "50% 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 145,
            top: 266,
            width: 52,
            height: 90,
            borderRadius: 22,
            background: shorts,
            border: "5px solid #8f4b68",
            boxSizing: "border-box",
            rotate: `${7 - walk * 8}deg`,
            transformOrigin: "50% 0",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 45,
          top: 16,
          width: 168,
          height: 166,
          borderRadius: "50% 50% 47% 47%",
          background: "#f5a7a9",
          border: "5px solid #8f4b68",
          boxSizing: "border-box",
          rotate: `${walk * 1.5}deg`,
          zIndex: 3,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 14,
            top: -28,
            width: 48,
            height: 62,
            borderRadius: "54% 54% 45% 45%",
            background: "#f5a7a9",
            border: "5px solid #8f4b68",
            rotate: "-20deg",
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 14,
            top: -28,
            width: 48,
            height: 62,
            borderRadius: "54% 54% 45% 45%",
            background: "#f5a7a9",
            border: "5px solid #8f4b68",
            rotate: "20deg",
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 35,
            top: 57,
            width: 18,
            height: 25 * blink,
            borderRadius: 10,
            background: "#2d2036",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 35,
            top: 57,
            width: 18,
            height: 25 * blink,
            borderRadius: 10,
            background: "#2d2036",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 47,
            top: 87,
            width: 28,
            height: 13,
            borderRadius: "50%",
            borderBottom: "5px solid #8f4b68",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 92,
            top: 78,
            width: 65,
            height: 53,
            borderRadius: "48% 52% 52% 48%",
            background: "#e88d9c",
            border: "5px solid #8f4b68",
            boxSizing: "border-box",
          }}
        >
          <div style={{ position: "absolute", left: 13, top: 17, width: 12, height: 15, borderRadius: "50%", background: "#8f4b68" }} />
          <div style={{ position: "absolute", right: 13, top: 17, width: 12, height: 15, borderRadius: "50%", background: "#8f4b68" }} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 198,
          top: 220,
          width: 64,
          height: 26,
          borderRadius: 20,
          border: "7px solid #f5a7a9",
          borderLeftColor: "transparent",
          borderBottomColor: "transparent",
          rotate: `${28 + wave * 0.2}deg`,
          zIndex: 4,
        }}
      />
      <div style={{ position: "absolute", left: 51, bottom: 1, width: 156, height: 13, borderRadius: "50%", background: "rgba(63, 43, 66, 0.2)", filter: "blur(5px)" }} />
      <div style={{ position: "absolute", left: 55, top: 365, width: 150, textAlign: "center", color: "#7d3f5b", fontSize: 18, fontWeight: 800, letterSpacing: 2 }}>{label}</div>
    </div>
  );
};

const Cloud: React.FC<{ readonly x: number; readonly y: number; readonly scale?: number; readonly frame: number; readonly speed: number }> = ({ x, y, scale = 1, frame, speed }) => (
  <div style={{ position: "absolute", left: x + Math.sin(frame / (75 / speed)) * 14, top: y, scale, opacity: 0.85 }}>
    <div style={{ position: "absolute", left: 0, top: 28, width: 160, height: 52, borderRadius: 40, background: "#fff9f1" }} />
    <div style={{ position: "absolute", left: 30, top: 4, width: 75, height: 75, borderRadius: "50%", background: "#fff9f1" }} />
    <div style={{ position: "absolute", left: 82, top: 18, width: 88, height: 65, borderRadius: "50%", background: "#fff9f1" }} />
  </div>
);

const MudPuddle: React.FC<{ readonly x: number; readonly y: number; readonly frame: number }> = ({ x, y, frame }) => {
  const splash = Math.abs(Math.sin(frame / 6));
  return (
    <div style={{ position: "absolute", left: x, top: y }}>
      <div style={{ width: 320, height: 74, borderRadius: "50%", background: "#8f5d42", border: "6px solid #70412f", scale: `1 ${0.85 + splash * 0.12}` }} />
      <div style={{ position: "absolute", left: 38, top: -15 - splash * 8, width: 17, height: 30, borderRadius: 20, background: "#a97352", rotate: "-18deg", opacity: 0.7 }} />
      <div style={{ position: "absolute", left: 236, top: -18 - splash * 10, width: 14, height: 26, borderRadius: 20, background: "#a97352", rotate: "18deg", opacity: 0.7 }} />
    </div>
  );
};

export const PeppaAdventure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleIn = interpolate(frame, [0, 1.2 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const titleOut = interpolate(frame, [13.3 * fps, 15 * fps], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.4, 0, 1, 1) });
  const sunSpin = frame * 0.25;
  const pigWalk = interpolate(frame, [2 * fps, 10.7 * fps], [250, 1260], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.12, 0.8, 0.2, 1) });
  const familyWalk = interpolate(frame, [2.5 * fps, 10.7 * fps], [40, 1040], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.12, 0.8, 0.2, 1) });
  const camera = interpolate(frame, [0, 15 * fps], [1.04, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#aee8ff", fontFamily: "Arial Rounded MT Bold, Trebuchet MS, sans-serif", color: "#713d52" }}>
      <AbsoluteFill style={{ scale: camera, background: "linear-gradient(180deg, #8fdcff 0%, #baf1ff 56%, #9edb72 56%, #6fbd61 100%)" }}>
        <div style={{ position: "absolute", left: -40, top: 570, width: 2040, height: 470, background: "linear-gradient(180deg, #96d66a 0%, #65b456 100%)", clipPath: "ellipse(70% 66% at 50% 100%)" }} />
        <div style={{ position: "absolute", left: -40, top: 675, width: 2040, height: 390, background: "#75c45e", clipPath: "ellipse(75% 64% at 38% 100%)" }} />
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 1920, height: 190, background: "repeating-linear-gradient(75deg, rgba(255,255,255,0.08) 0 2px, transparent 2px 34px)" }} />
        <div style={{ position: "absolute", left: 1450, top: 94, width: 190, height: 190, borderRadius: "50%", background: "#ffd75b", boxShadow: "0 0 0 16px rgba(255,215,91,0.15), 0 0 80px rgba(255,215,91,0.42)", rotate: `${sunSpin}deg` }}>
          <div style={{ position: "absolute", left: 89, top: -37, width: 12, height: 264, background: "rgba(255,215,91,0.55)" }} />
          <div style={{ position: "absolute", left: -37, top: 89, width: 264, height: 12, background: "rgba(255,215,91,0.55)" }} />
        </div>
        <Cloud x={190} y={115} scale={0.95} frame={frame} speed={1} />
        <Cloud x={760} y={210} scale={0.7} frame={frame} speed={0.7} />
        <Cloud x={1250} y={350} scale={0.55} frame={frame} speed={0.5} />
        <div style={{ position: "absolute", left: 160, top: 550, width: 320, height: 160, background: "#f6c6d2", border: "10px solid #8f4b68", borderBottom: 0, borderRadius: "18px 18px 0 0" }}>
          <div style={{ position: "absolute", left: 130, top: 72, width: 65, height: 88, background: "#7ab6db", border: "8px solid #8f4b68", borderBottom: 0, borderRadius: "44px 44px 0 0" }} />
          <div style={{ position: "absolute", left: 55, top: -106, width: 70, height: 108, background: "#e96b72", border: "8px solid #8f4b68", borderBottom: 0, borderRadius: "42px 42px 0 0" }} />
          <div style={{ position: "absolute", left: 195, top: -106, width: 70, height: 108, background: "#e96b72", border: "8px solid #8f4b68", borderBottom: 0, borderRadius: "42px 42px 0 0" }} />
          <div style={{ position: "absolute", left: 65, top: 16, width: 190, height: 10, borderRadius: 8, background: "rgba(255,255,255,0.35)" }} />
        </div>
        <div style={{ position: "absolute", left: 185, top: 705, width: 270, height: 24, borderRadius: "50%", background: "rgba(72, 131, 63, 0.3)", filter: "blur(6px)" }} />
        <MudPuddle x={890} y={855} frame={frame} />
        <Pig x={pigWalk} y={560} scale={1.08} shirt="#ef5c79" phase={0.1} frame={frame} fps={fps} label="PIPPA" />
        <Pig x={familyWalk} y={625} scale={0.76} shirt="#eaa6d9" shorts="#6a65ad" phase={1.8} frame={frame} fps={fps} label="MAMA" />
        <Pig x={familyWalk - 240} y={682} scale={0.62} shirt="#80c7e9" shorts="#4d7bb1" phase={3.2} frame={frame} fps={fps} label="GEORGE" />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 80, top: 58, opacity: titleIn * titleOut, translate: `0px ${interpolate(frame, [0, 1.2 * fps], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}px` }}>
        <div style={{ fontSize: 23, letterSpacing: 5, color: "#8f4b68", fontWeight: 800 }}>A SUNNY LITTLE STORY</div>
        <div style={{ fontSize: 82, lineHeight: 0.9, letterSpacing: -4, color: "#713d52", fontWeight: 900 }}>PIPPA'S DAY</div>
        <div style={{ marginTop: 14, fontSize: 22, color: "#8f4b68", letterSpacing: 3 }}>JUMP IN THE MUDDY PUDDLE!</div>
      </div>
      <div style={{ position: "absolute", right: 82, top: 67, padding: "12px 22px", borderRadius: 30, background: "rgba(255,255,255,0.62)", border: "3px solid rgba(113,61,82,0.25)", color: "#713d52", fontSize: 20, fontWeight: 800, letterSpacing: 2, opacity: titleIn * titleOut }}>ORIGINAL 2D ANIMATION</div>
      <div style={{ position: "absolute", left: 80, bottom: 42, fontSize: 19, letterSpacing: 3, color: "rgba(113,61,82,0.65)", opacity: titleOut }}>PIPPA · MAMA · GEORGE</div>
      <div style={{ position: "absolute", right: 80, bottom: 42, fontSize: 19, letterSpacing: 3, color: "rgba(113,61,82,0.65)", opacity: titleOut }}>15 SEC / SUNNY DAY</div>
      <div style={{ position: "absolute", left: 0, bottom: 0, height: 6, width: `${interpolate(frame, [0, 15 * fps - 1], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`, background: "#f05e7b" }} />
    </AbsoluteFill>
  );
};
