import React from "react";
import ReactDOM from "react-dom";
import { Root, Layout, Grid } from "gymnast";
import { A, Slider, SliderText, Pct, Button, Video } from "./components";
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
      shouldPlay: false,
      actualPlay: false,
      totalTime,
      transcriptOffset: transcriptOffsetTime / totalTime
    };
  }

  onChange = value => {
    this.setState({ value, shouldPlay: false });
  };

  onPlay = () => {
    this.setState({ shouldPlay: true });
  };

  onPause = () => {
    this.setState({ shouldPlay: false });
  };

  onVideoChange = actualPlay => {
    this.setState({ actualPlay, shouldPlay: actualPlay }, () => {
      clearInterval(this.interval);

      if (actualPlay) {
        this.interval = setInterval(() => {
          this.setState(({ value, totalTime }) => ({
            value: value + updateRate / 1000 / totalTime
          }));
        }, updateRate);
      }
    });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      value,
      actualPlay,
      shouldPlay,
      totalTime,
      transcriptOffset
    } = this.state;

    return (
      <Layout height="parent">
        <Root>
          <Grid margin="L">
            <Button
              onPlay={this.onPlay}
              onPause={this.onPause}
              playing={shouldPlay}
            />
            <A
              margin="L/2"
              size="fit"
              href="https://github.com/obartra/playback"
            >
              View On Github
            </A>
            <Pct value={value} totalTime={totalTime} />
            <Video
              shouldPlay={shouldPlay}
              actualPlay={actualPlay}
              value={value}
              totalTime={totalTime}
              onVideoChange={this.onVideoChange}
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
