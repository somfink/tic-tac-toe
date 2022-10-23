import React, { useState } from "react";
import "./App.css";
import StartingBoard from "./components/StartingBoard";
import TicTacSquare from "./components/TicTacSquare";

function App() {
  const [gameStep, setGameStep] = useState('PLAYER_CHOOSE');

  const goToPlayHandler = (gameStatus: string) => {
    setGameStep(gameStatus)
  };

  return (
    <header className="header">
      {gameStep === "PLAYER_CHOOSE" && <StartingBoard onLetsPlay={goToPlayHandler} />}
      {gameStep === 'RUN_GAME' && <TicTacSquare />}
    </header>
  );
}

export default App;
