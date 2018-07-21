import * as React from "react";
import { Grid } from "gymnast";
import { first, last } from "lodash";
import { getGroupedSentences } from "./sliderText.logic";
import { Paragraph } from "./components";
import "./styles.css";

export default function SliderText({
  value,
  text,
  totalTime,
  onChange,
  offset
}) {
  const relativeTime = value + offset;
  const groupedSentences = getGroupedSentences(text, totalTime);

  return (
    <Grid className="sliderText" margin="L 0" padding="0 L">
      {groupedSentences.map((sentences, minute) => {
        const active =
          relativeTime >= first(first(sentences)).startTime &&
          relativeTime < last(last(sentences)).endTime;

        return (
          <Paragraph
            key={minute}
            onChange={value => onChange(value - offset)}
            {...{
              sentences,
              minute,
              relativeTime,
              active
            }}
          />
        );
      })}
    </Grid>
  );
}
