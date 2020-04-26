import React from "react";
import "./App.css";
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
      quotes: [],
      index: 0,
      color: "#000000",
    };
    this.newQuote = this.newQuote.bind(this);
  }
  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/sahand-masoleh/fd85e3fd6dbd412b0531a96df53480ad/raw/be27f1fcfa882b05a271ffaa6dc93258cdd11aef/quotes.json"
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          quotes: data.quotes,
        });
      })
      .then(() => {
        this.newQuote();
      });
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
      return (
        "hsl(" +
        randomInt(0, 360) +
        ", " +
        randomInt(0, 100) +
        "%, " +
        randomInt(50, 80) +
        "%)"
      );
    };
    this.setState({
      color:
        "linear-gradient(" +
        randomInt(0, 360) +
        "deg, " +
        randomColor() +
        " 0%, " +
        randomColor() +
        " 100%)",
    });
  }
  render() {
    if (this.state.quote !== "Loading...") {
      return (
        <div id="quote-box" style={{ background: this.state.color }}>
          <Text text={this.state.quote} />
          <Author text={this.state.author} />
          <TweetQuote text={this.state.quote} />
          <NewQuote function={this.newQuote} />
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

const Text = (props) => {
  return (
    <div id="text">
      <FontAwesomeIcon icon={faQuoteLeft} id="quotation-mark" />
      <p>
        {props.text}
        {/* <FontAwesomeIcon icon={faQuoteRight} /> */}
      </p>
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

const NewQuote = (props) => {
  return (
    <div id="new-quote">
      <p onClick={props.function}>
        <FontAwesomeIcon icon={faRedo} />
      </p>
    </div>
  );
};
export default App;
