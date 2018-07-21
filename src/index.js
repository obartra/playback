import React from "react";
import ReactDOM from "react-dom";
import { Root, Layout, Grid } from "gymnast";
import { Slider, SliderText, Pct, Button, Video } from "./components";
import text from "./text.json";

import "./styles.css";
import { getTotalTime } from "./index.logic";

const updateRate = 200;
const transcriptOffsetTime = 10;

class App extends React.Component {
  constructor(props) {
    super(props);

    const totalTime = getTotalTime(text);

    this.state = {
      value: 0,
      playing: false,
      totalTime,
      transcriptOffset: transcriptOffsetTime / totalTime
    };
  }

  onChange = value => {
    this.setState({ value, playing: false });
  };

  onPlay = () => {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.setState(({ value, totalTime }) => ({
        value: value + updateRate / 1000 / totalTime,
        playing: true
      }));
    }, updateRate);
  };

  onPause = () => {
    clearInterval(this.interval);
    this.setState({ playing: false });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { value, playing, totalTime, transcriptOffset } = this.state;

    return (
      <Layout height="parent">
        <Root>
          <Grid margin="L L/2">
            <Button
              onPlay={this.onPlay}
              onPause={this.onPause}
              playing={playing}
            />
            <Pct value={value} totalTime={totalTime} />
            <Video
              playing={playing}
              value={value}
              totalTime={totalTime}
              src="./playback/Kip_Kinkel_Interview.mp4"
            />
            <Slider
              value={value}
              totalTime={totalTime}
              onPause={this.onPause}
              onChange={this.onChange}
            />
            <SliderText
              value={value}
              totalTime={totalTime}
              text={text}
              offset={transcriptOffset}
              onChange={this.onChange}
            />
          </Grid>
        </Root>
      </Layout>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
