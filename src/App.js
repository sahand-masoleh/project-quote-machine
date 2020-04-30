import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import * as data from "./quotes.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faRedo,
  faQuoteLeft,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [index, setIndex] = useState(0);
  const [colorArray, setColorArray] = useState([360, 100, 80, 0]);
  const quotes = data.quotes;

  useEffect(() => newQuote(), []); //Grab a quote on the firt load, equal to componentDidMount

  function newQuote() {
    setIndex(Math.round(quotes.length * Math.random()));
    setQuote(quotes[index].quote);
    setAuthor(quotes[index].author);
    newColor();
  }

  function newColor() {
    let randomInt = (min, max) => {
      return min + Math.round(Math.random() * (max - min));
    };
    let randomColor = [
      randomInt(0, 360),
      randomInt(0, 100),
      randomInt(40, 70),
      randomInt(0, 360),
    ];
    let duration = 500;
    let speed = 1000 / 60;
    let frames = duration / speed;
    let steps = colorArray.map((v, i) => (randomColor[i] - v) / frames);
    let j = 0;
    (function transition() {
      setColorArray((prevColorArray) => [
        prevColorArray[0] + steps[0],
        prevColorArray[1] + steps[1],
        prevColorArray[2] + steps[2],
        prevColorArray[3] + steps[3],
      ]);
      j++;
      if (j <= frames) {
        requestAnimationFrame(transition);
      }
    })();
  }
  return (
    <div
      id="quote-box"
      style={{
        background: `linear-gradient(${colorArray[3]}deg, hsl(${
          colorArray[0]
        }, ${colorArray[1]}%, ${colorArray[2]}%)0%,hsl(${
          colorArray[0] + 180
        }, ${colorArray[1]}%, ${colorArray[2]}%)100%)`,
      }}
    >
      <Text text={quote} />
      <Author text={author} />
      <TweetQuote text={quote} />
      <NewQuote function={newQuote} />
    </div>
  );
}

function Text(props) {
  const [fade, setFade] = useState(false);
  const [text, setText] = useState("");
  const fader = () => {
    setFade(!fade);
  };
  useEffect(() => {
    fader();
    setTimeout(() => setText(props.text), 250);
  }, [props.text]);
  return (
    <div id="text">
      <FontAwesomeIcon icon={faQuoteLeft} id="quotation-mark" />
      <p className={fade ? "fade" : null} onAnimationEnd={fader}>
        {text}
      </p>
      <FontAwesomeIcon icon={faQuoteRight} id="quotation-mark" />
    </div>
  );
}

function Author(props) {
  const [fade, setFade] = useState(false);
  const [text, setText] = useState("");
  const fader = () => {
    setFade(!fade);
  };
  useEffect(() => {
    fader();
    setTimeout(() => setText(props.text), 250);
  }, [props.text]);
  return (
    <div id="author">
      <p className={fade ? "fade" : null} onAnimationEnd={fader}>
        <em>-{text}</em>
      </p>
    </div>
  );
}

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

function NewQuote(props) {
  const [click, setClick] = useState(false);
  const rotate = () => {
    setClick(!click);
  };
  const onClick = () => {
    props.function();
    rotate();
  };
  return (
    <div
      id="new-quote"
      className={click ? "rotate" : null}
      onClick={onClick}
      onAnimationEnd={rotate}
    >
      <p>
        <FontAwesomeIcon icon={faRedo} />
      </p>
    </div>
  );
}

export default App;
