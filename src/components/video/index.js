import * as React from "react";
import { Grid } from "gymnast";
import "./styles.css";

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidUpdate({ playing, value, totalTime }) {
    if (this.props.playing === playing) {
      return;
    }

    if (value !== this.props.value) {
      this.videoRef.current.currentTime = value * totalTime;
    }

    if (playing) {
      this.videoRef.current.pause();
    } else {
      this.videoRef.current.play();
    }
  }

  render() {
    const { size, margin, src } = this.props;

    return (
      <Grid className="video" {...{ size, margin }}>
        <video ref={this.videoRef} src={src} />
      </Grid>
    );
  }
}
