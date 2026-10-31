import { Composition } from "remotion";
import { SlimeASMR } from "./Composition";
import { GirlGroupDance } from "./GirlGroupDance";
import { PeppaAdventure } from "./PeppaAdventure";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PeppaAdventure"
        component={PeppaAdventure}
        durationInFrames={360}
        fps={24}
        width={1920}
        height={1080}
      />
      <Composition
        id="GirlGroupDance"
        component={GirlGroupDance}
        durationInFrames={360}
        fps={24}
        width={1920}
        height={1080}
      />
      <Composition
        id="SlimeASMR"
        component={SlimeASMR}
        durationInFrames={375}
        fps={25}
        width={1080}
        height={1920}
      />
    </>
  );
};
