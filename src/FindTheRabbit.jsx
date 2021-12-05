import React, { useEffect, useState , useRef} from "react";


const FindTheRabbit = ({ initialRabbitPos, refreshRateHz }) => {
  const NUM_HOLES = 10; // assume even for simplicity
  const [holes, setHoles] = useState([]); // "h" - hole, "r" - rabbit , "g" - guess
  const [rabbitPos, setRabbitPos] = useState();
  const [guessPos, setGuessPos] = useState(0); // start at zero
  const rabbitPosRef = useRef();
  const guessPosRef  = useRef();
  let intervalHandler;
  
  guessPosRef.current = guessPos;
  rabbitPosRef.current = rabbitPos;

  // console.log(`rabbitPos : ${rabbitPos} , guessPos : ${guessPos}`);

  useEffect(() => {
    const intervalMs = 1000 / refreshRateHz;
    intervalHandler = setInterval(() => {
      if ((guessPosRef.current === rabbitPosRef.current) || (guessPosRef.current < 0)) {
        clearInterval(intervalHandler);
      } else {
        let newHoles = Array(NUM_HOLES).fill("h");
        const newRabbitPos = moveRabbit();
        const newGuessPos = moveGuess(guessPosRef.current);
        newHoles[newRabbitPos] = "r";
        newHoles[newGuessPos] = "g";
        setHoles(newHoles);
      }
    }, intervalMs); // --- todo clear handle
  }, []);

  const isEven = (index) => index % 2 === 0;

  // if rabbit started on even e.g. 4 he will ALWAYS toggle on odd adjacent holes  : 3,5
  // if rabbit started on odd e.g. 5 he will ALWAYS toggle on even adjacent holes : 4,6
  // so try first all even holes then if needed try all odd holes
  const moveGuess = currentGuessPos => {
    let newGuessPos;

    console.log(`currentGuessPos : ${currentGuessPos}`);

    if (isEven(currentGuessPos)) {
      newGuessPos = (currentGuessPos + 2 === NUM_HOLES) ? NUM_HOLES - 1 : currentGuessPos + 2;
    } else {
      newGuessPos = currentGuessPos - 2;
    }

    console.log(`newGuessPos : ${newGuessPos}`);
    setGuessPos(newGuessPos);

    return newGuessPos;
  };

  const moveRabbit = () => {
    const rand = Math.random();
    let newRabbitPos;
    // console.log(`rabbit pos : ${rabbitPos}`);

    if (rand < 0.5) {
      //--left
      if (initialRabbitPos > 0) {
        newRabbitPos = initialRabbitPos - 1;
      }
    } else {
      //--right
      if (initialRabbitPos < NUM_HOLES - 1) {
        newRabbitPos = initialRabbitPos + 1;
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

  let gameStatus ;
  if (guessPos === rabbitPos) {
    gameStatus = <p style={{color:'green'}}>Game Over - Rabbit is caught</p>
  } else if (guessPos < 0){
    gameStatus = <p style={{color:'red'}}>Game Over - Rabbit is not caught : this is a bug</p>
  } else{
    gameStatus = ""
  }

  return (
    <>
      {holesElements}
      <p>
       initialRabbitPos : {initialRabbitPos} , guessPos : {guessPosRef.current}  rabbitPos : {rabbitPos} , refreshRateHz : {refreshRateHz}
      </p>
      {gameStatus}
    </>
  );
};

export default FindTheRabbit;
