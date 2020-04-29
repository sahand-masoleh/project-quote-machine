import React from "react";
import "./App.css";
import * as data from "./quotes.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faRedo,
  faQuoteLeft,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "Loading...",
      author: "",
      quotes: data.quotes,
      index: 0,
      color: "#000000",
    };
    this.newQuote = this.newQuote.bind(this);
  }
  componentDidMount() {
    this.newQuote();
  }
  newQuote() {
    this.setState({
      index: Math.round(this.state.quotes.length * Math.random()),
    });
    this.setState({
      quote: this.state.quotes[this.state.index].quote,
      author: this.state.quotes[this.state.index].author,
    });
    this.newColor();
  }
  newColor() {
    let randomInt = (min, max) => {
      return min + Math.round(Math.random() * (max - min));
    };
    let randomColor = () => {
      return `hsl(${randomInt(0, 360)}, ${randomInt(0, 100)}%, ${randomInt(
        50,
        80
      )}%)`;
    };
    this.setState({
      color: `linear-gradient(${randomInt(
        0,
        360
      )}deg, ${randomColor()}0%,${randomColor()}100%)`,
    });
  }
  render() {
    const quoteBoxStyle = {
      background: this.state.color,
    };
    return (
      <div id="quote-box" style={quoteBoxStyle}>
        <Text text={this.state.quote} />
        <Author text={this.state.author} />
        <TweetQuote text={this.state.quote} />
        <NewQuote function={this.newQuote} />
      </div>
    );
  }
}

const Text = (props) => {
  return (
    <div id="text">
      <FontAwesomeIcon icon={faQuoteLeft} id="quotation-mark" />
      <p>{props.text}</p>
      <FontAwesomeIcon icon={faQuoteRight} id="quotation-mark" />
    </div>
  );
};

const Author = (props) => {
  return (
    <div id="author">
      <p>
        <em>-{props.text}</em>
      </p>
    </div>
  );
};

const TweetQuote = (props) => {
  return (
    <a
      href={"https://www.twitter.com/intent/tweet?text=" + props.text}
      id="tweet-quote"
      target="_blank"
      rel="noopener noreferrer"
    >
      <p>
        <FontAwesomeIcon icon={faTwitter} />
      </p>
    </a>
  );
};

class NewQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = { click: false };
    this.rotate = this.rotate.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  rotate() {
    this.setState({ click: !this.state.click });
  }
  onClick() {
    this.props.function();
    this.rotate();
  }

  render() {
    return (
      <div
        id="new-quote"
        className={this.state.click ? "rotate" : null}
        onClick={this.onClick}
        onAnimationEnd={() => this.setState({ click: !this.state.click })}
      >
        <p>
          <FontAwesomeIcon icon={faRedo} />
        </p>
      </div>
    );
  }
}

export default App;
