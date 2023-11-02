import { useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./App.css";

function App() {
  const cardRef = useRef(null);

  const [{ xys }, api] = useSpring(() => ({ xys: [0, 0, 1] }));

  const handleMouseLeave = () =>
    api.start({
      xys: [0, 0, 1],
    });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    api.start({
      xys: calc(e.clientX, e.clientY, rect),
    });
  };
  return (
    <div className="card-main" ref={cardRef}>
      <animated.div
        className="card"
        style={{ transform: xys.to(trans) }}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
}

const calc = (x, y, rect) => [
  -(y - rect.top - rect.height / 2) / 5,
  (x - rect.left - rect.width / 2) / 5,
  1.4,
];

const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export default App;
