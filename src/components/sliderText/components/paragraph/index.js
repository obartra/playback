import * as React from "react";
import { Grid } from "gymnast";
import Label from "../label";
import Word from "../word";

export default class Paragraph extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  /**
   * This ensures we are not re-rendering every single word every time which is
   * too costly.
   *
   * This way we limit re-rendering to the active paragraph
   */
  shouldComponentUpdate({ active }) {
    return active || active !== this.props.active;
  }

  componentDidUpdate({ active }) {
    if (!active && this.props.active) {
      /**
       * Since the text is long, auto scroll each section
       **/
      this.ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  render() {
    const { minute, sentences, relativeTime, onChange } = this.props;

    return (
      <React.Fragment>
        <Label innerRef={this.ref}>{minute}</Label>
        {sentences.map((sentence, si) => (
          <Grid marginBottom="L" key={si}>
            {sentence.map((word, wi) => (
              <Word
                key={wi}
                {...word}
                relativeTime={relativeTime}
                onChange={onChange}
              />
            ))}.
          </Grid>
        ))}
      </React.Fragment>
    );
  }
}
