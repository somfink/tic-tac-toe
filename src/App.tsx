import React, { useEffect, useState } from "react";
import "./App.css";
import StartingBoard from "./components/StartingBoard";
import TicTacSquare from "./components/TicTacSquare";

function App() {
  const [gameStep, setGameStep] = useState<string>('PLAYER_CHOOSE');
  const [playerName, setPlayerName] = useState<string>();
  const [oponentName, setOponentName] = useState<string>();

  useEffect(() => {
    console.log(playerName);
    console.log(oponentName);
  }, [playerName, oponentName])

  const getPlayersName = (name1?: string, name2?: string) => {
    setPlayerName(name1);
    setOponentName(name2);
  };

  const goToPlayHandler = (gameStatus: string) => {
    setGameStep(gameStatus);
  };

  return (
    <header className="header">
      {gameStep === "PLAYER_CHOOSE" && <StartingBoard onLetsPlay={goToPlayHandler} onGetPlayersName={getPlayersName} />}
      {gameStep === 'RUN_GAME' && <TicTacSquare pName={playerName} oName={oponentName} />}
    </header>
  );
}

export default App;
