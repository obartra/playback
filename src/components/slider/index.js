import * as React from "react";
import { Col } from "gymnast";
import "./style.css";

export default function Slider({
  className,
  margin,
  onChange,
  onPause,
  size,
  totalTime,
  value
}) {
  /**
   * This number doesn't need to be accurate. If it's too off it will add a lot
   * more steps than needed (since really we only need one step per word).
   *
   * We cannot just do `1 / total words` because that would only work if all
   * words were evenly spaced, of the same length and pronounced at the same
   * speed. Since that's not the case we set a more conservative number (5) but
   * there's nothing special about it.
   */
  const maxWordsPerSecond = 5;
  const step = 1 / (totalTime * maxWordsPerSecond);

  return (
    <Col {...{ size, margin, className }}>
      <input
        className="slider"
        max="1"
        min="0"
        onMouseDown={onPause}
        onChange={e => onChange(parseFloat(e.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </Col>
  );
}
