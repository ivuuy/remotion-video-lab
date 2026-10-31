import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const SlimeASMR: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#34303a" }}>
      <Video
        name="紫晶史莱姆 · 连续揉捏与拉伸"
        src={staticFile("slime-fold.mp4")}
        trimBefore={1 * fps}
        durationInFrames={15 * fps}
        muted
        objectFit="cover"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          filter: "brightness(1.09) contrast(1.035) saturate(0.96)",
        }}
      />
      <Audio
        name="同期揉捏原声 · 轻降噪与音量增强"
        src={staticFile("slime-original-enhanced.wav")}
        trimBefore={1 * fps}
        durationInFrames={15 * fps}
        volume={interpolate(frame, [0, 0.12 * fps, 14.7 * fps, 15 * fps], [0, 0.9, 0.9, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      />
    </AbsoluteFill>
  );
};
