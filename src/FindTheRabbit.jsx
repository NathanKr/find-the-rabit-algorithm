import React, { useEffect, useState } from "react";

let intervalHandler; // should be inside ??

const FindTheRabbit = ({ initialRabbitPos, refreshRateHz }) => {
  const [holes, setHoles] = useState([]); // "h" - hole, "r" - rabbit , "g" - guess
  const [rabbitPos, setRabbitPos] = useState(initialRabbitPos);
  const [guessPos, setGuessPos] = useState(0); // start at zero
  const NUM_HOLES = 20; // assume even for simplicity

  console.log(`rabbitPos : ${rabbitPos} , guessPos : ${guessPos}`);

  useEffect(() => {
    const intervalMs = 1000 / refreshRateHz;
    intervalHandler = setInterval(() => {
      if (guessPos === rabbitPos) {
        clearInterval(intervalHandler);
      } else {
        let newHoles = Array(NUM_HOLES).fill("h");
        const newRabbitPos = moveRabbit();
        const newGuessPos = moveGuess();
        newHoles[newRabbitPos] = "r";
        newHoles[newGuessPos] = "g";
        setHoles(newHoles);
      }
    }, intervalMs); // --- todo clear handle
  }, []);

  const isEven = (index) => index % 2 === 0;

  // if rabbit started on even he will ALWAYS toggle on odd holes (why ??)
  // if rabbit started on odd he will ALWAYS toggle on even holes (why ??)
  // so try first all even holes then if needed try all odd holes
  const moveGuess = () => {
    let newGuessPos;

    console.log(`guessPos : ${guessPos}`);

    if (isEven(guessPos)) {
      newGuessPos = (guessPos + 2 === NUM_HOLES) ? NUM_HOLES - 1 : guessPos + 2;
    } else {
      newGuessPos = guessPos - 2;
    }

    console.log(`newGuessPos : ${newGuessPos}`);
    setGuessPos(newGuessPos)
    return newGuessPos;
  };

  const moveRabbit = () => {
    const rand = Math.random();
    let newRabbitPos;
    // console.log(`rabbit pos : ${rabbitPos}`);

    if (rand < 0.5) {
      //--left
      if (rabbitPos > 0) {
        newRabbitPos = rabbitPos - 1;
      }
    } else {
      //--right
      if (rabbitPos < NUM_HOLES - 1) {
        newRabbitPos = rabbitPos + 1;
      }
    }
    setRabbitPos(newRabbitPos);

    return newRabbitPos;
  };

  const getItemUI = (item) => {
    let itemUI, color;

    if (item === "h") {
      itemUI = "O";
      color = "blue";
    } else if (item === "r") {
      itemUI = "R";
      color = "red";
    } else {
      itemUI = "G";
      color = "green";
    }
    return <span style={{ color }}>{itemUI}</span>;
  };

  const holesElements = holes.map((hole, index) => (
    <span key={index}>{getItemUI(hole)}</span>
  ));

  const gameOver = (guessPos === rabbitPos) ? "Got the Rabbit" : "";

  return (
    <>
      {holesElements}
      <p>
       guessPos : {guessPos}  rabbitPos : {rabbitPos} , refreshRateHz : {refreshRateHz}
      </p>
      {gameOver}
      <button onClick={() => clearInterval(intervalHandler)}>Stop</button>
    </>
  );
};

export default FindTheRabbit;
