import React, { useEffect, useState } from "react";

let intervalHandler; // should be inside ??

const FindTheRabbit = ({
  numHoles,
  initialRabbitPos,
  initialGuessPos,
  refreshRateHz,
}) => {
  const [holes, setHoles] = useState([]); // "h" - hole, "r" - rabbit , "g" - guess
  const [rabbitPos, setRabbitPos] = useState(initialRabbitPos);
  const [guessPos, setGuessPos] = useState(initialGuessPos);
  const [guessEven, setGuessEven] = useState(true);

  useEffect(() => {
    const intervalMs = 1000 / refreshRateHz;
    intervalHandler = setInterval(() => {
      console.log('intervalHandler');
      if (guessPos === rabbitPos) {
        clearInterval(intervalHandler);
      } else {
        let newHoles = Array(numHoles).fill("h")
        newHoles[rabbitPos] = "r";
        newHoles[guessPos] = "g";
        setHoles(newHoles);
        moveRabbit();
      }
    }, intervalMs); // --- todo clear handle
  }, []);


  const moveRabbit = () => {
    const rand = Math.random();
    console.log(`rabbit pos : ${rabbitPos}`);

    if (rand < 0.5) {
      //--left
      if (rabbitPos > 0) {
        setRabbitPos(rabbitPos - 1);
      }
    } else {
      //--right
      if (rabbitPos < numHoles - 1) {
        setRabbitPos(rabbitPos + 1);
      }
    }
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

  const gameOver = guessPos === rabbitPos ? "Got the Rabbit" : "";

  return (
    <>
      {holesElements}
      <p>rabbitPos : {rabbitPos}</p>
      {gameOver}
      <button onClick={() => clearInterval(intervalHandler)}>Stop</button>
    </>
  );
};

export default FindTheRabbit;
