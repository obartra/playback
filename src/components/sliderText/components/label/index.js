import * as React from "react";
import { Grid } from "gymnast";
import "./styles.css";

export default function Label(props) {
  return <Grid {...props} marginBottom="M" className="label" />;
}
