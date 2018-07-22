import * as React from "react";
import { Grid } from "gymnast";
import YouTube from "react-youtube";
import "./styles.css";

export default class Video extends React.Component {
  videoRef = null;

  componentDidUpdate({ shouldPlay, value, totalTime }) {
    if (shouldPlay === this.props.shouldPlay) {
      return;
    }

    if (shouldPlay) {
      this.videoRef.pauseVideo();
    } else {
      const allowSeekAhead = true;
      this.videoRef.seekTo(parseInt(value * totalTime, 10), allowSeekAhead);
      this.videoRef.playVideo();
    }
  }

  onReady = event => {
    this.videoRef = event.target;
    this.videoRef.playVideo();
  };

  onStateChange = ({ data }) => {
    const { PLAYING, PAUSED } = YouTube.PlayerState;
    if (data === PLAYING) {
      this.props.onVideoChange(true);
    } else if (data === PAUSED) {
      this.props.onVideoChange(false);
    }
  };

  render() {
    const { size, margin } = this.props;
    const opts = {
      height: 200,
      width: 356,
      playerVars: {
        controls: 0,
        autoplay: 1
      }
    };

    return (
      <Grid className="video" {...{ size, margin }}>
        <YouTube
          videoId="U9oy5yl5JvM"
          opts={opts}
          onReady={this.onReady}
          onStateChange={this.onStateChange}
        />
      </Grid>
    );
  }
}
