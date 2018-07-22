import * as React from "react";
import { asGrid } from "gymnast";
import "./styles.css";

const A = asGrid("a");

export default function(props) {
  return <A {...props} className="a" />;
}
