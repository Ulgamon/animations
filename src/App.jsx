import { useState } from "react";
import {
  useSpring,
  useTransition,
  useChain,
  config,
  animated,
  useSpringRef,
} from "@react-spring/web";
import data from "./data";

import "./App.css";

function App() {
  const [open, setOpen] = useState(false);

  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: {
      size: "20%",
      background: "hotpink",
    },
    to: {
      size: open ? "100%" : "20%",
      background: open ? "white" : "hotpink",
    },
  });

  const transApi = useSpringRef();
  const transition = useTransition(open ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0.1,
    open ? 0.1 : 0.6,
  ]);

  return (
    <div className="wrapper">
      <animated.div
        style={{ ...rest, width: size, height: size }}
        className="container"
        onClick={() => setOpen((open) => !open)}
      >
        {transition((style, item) => (
          <animated.div
            className="item"
            style={{ ...style, background: item.css }}
          />
        ))}
      </animated.div>
    </div>
  );
}

export default App;
