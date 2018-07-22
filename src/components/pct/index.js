import * as React from "react";
import { asGrid } from "gymnast";

const H3 = asGrid("h3");

export default function Pct({ value, totalTime }) {
  const pct = Math.max(0, parseInt(value * 100, 10));
  const currentTime = parseInt(value * totalTime, 10);

  return (
    <H3>
      {pct}% {currentTime}s ({totalTime}s)
    </H3>
  );
}
