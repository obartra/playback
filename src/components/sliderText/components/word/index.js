import * as React from "react";
import { capitalize } from "lodash";
import { asGrid } from "gymnast";
import "./styles.css";

const Span = asGrid("span");

export default function Word({
  word,
  startTime,
  endTime,
  relativeTime,
  onChange,
  isFirst,
  ...props
}) {
  const active = relativeTime >= startTime && relativeTime < endTime;
  const text = isFirst ? capitalize(word) : word;

  return (
    <Span
      {...props}
      size="fit"
      className={`word ${active ? "active" : ""}`}
      onClick={() => onChange(startTime)}
    >
      {text}
    </Span>
  );
}
