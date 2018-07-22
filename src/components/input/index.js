import * as React from "react";
import { Grid } from "gymnast";
import "./styles.css";

export default function Input({ size, margin, label, ...props }) {
  return (
    <Grid {...{ size, margin }} padding="S" className="input">
      <label>{label}</label>
      <input {...props} />
    </Grid>
  );
}
