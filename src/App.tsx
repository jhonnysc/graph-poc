import { Curve } from "./curve";
import { GRAPH_WIDTH_LARGE, GRAPH_HEIGHT_LARGE } from "./sizes";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  MotionValue,
} from "framer-motion";

import styled from "styled-components";
import points from "./points";
import { FC } from "react";

const UserAvatar = styled.div`
  width: 30px;
  height: 30px;
  background-color: blue;
  border-radius: 50px;
  right: -15px;
  top: -15px;
  position: absolute;
`;

const GraphContainer = styled.div`
  position: relative;
`;

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border: 2px gray dotted;
  border-left: none;
  border-bottom: none;
`;

const BaseContainer = styled.div`
  position: relative;
`;

const ContainerHeader = styled.div`
  position: absolute;
  display: flex;
  inset: 0;
`;

const HeaderItem = styled.span`
  padding: 15px 20px;
  position: relative;
`;

interface HeaderItemComponentProps {
  progress: MotionValue<number>;
  index: number;
}


const HeaderItemComponent: FC<HeaderItemComponentProps> = ({
  progress,
  index,
  children,
}) => {

  const itemThreshHold = index * 60

  const itemProgress = useTransform(progress, (x) => {
    if (x > itemThreshHold && x < itemThreshHold + 60) {
      console.log('rendering', index);
      
      const b = (x - itemThreshHold)
      return `${b}%`
     }
    return 0
  })

  return (
    <HeaderItem>
      {children}
      <motion.div
        style={{
          position: "absolute",
          height: "100%",
          width: itemProgress,
        }}
      />
    </HeaderItem>
  );
};

function App() {
  const score = 150;
  const width = GRAPH_WIDTH_LARGE;
  const height = GRAPH_HEIGHT_LARGE;

  const progress = useMotionValue(0);

  const controls = animate(progress, score, {
    type: "spring",
    damping: 40,
    stiffness: 60,
  });

  const widthx = useTransform(progress, (x) => {
    return points.percentile[Math.round(x)] * width;
  });

  const heightx = useTransform(progress, (x) => {
    return Math.abs((x / 300) * height);
  });

  return (
    <BaseContainer>
      <ContainerHeader>
        {new Array(5).fill(0).map((_, i) => {
          return (
            <HeaderItemComponent progress={progress} index={i}>
              Example 1
            </HeaderItemComponent>
          );
        })}
      </ContainerHeader>
      <GraphContainer>
        <motion.div
          style={{
            width: widthx,
            height: heightx,
            position: "absolute",
            bottom: 0,
          }}
        >
          <InnerContainer>
            <UserAvatar />
          </InnerContainer>
        </motion.div>
        <Curve height={GRAPH_HEIGHT_LARGE} width={GRAPH_WIDTH_LARGE} />
      </GraphContainer>
    </BaseContainer>
  );
}

export default App;
