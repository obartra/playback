import * as React from "react";
import { Grid } from "gymnast";
import "./styles.css";

export default function Button({ onPlay, onPause, playing }) {
  return (
    <Grid
      align="center"
      className="button"
      padding="S M"
      role="button"
      size="fit"
      onClick={() => (playing ? onPause() : onPlay())}
    >
      {playing ? "||" : ">"}
    </Grid>
  );
}
