import { useRef, useState } from "react";
import "./StartingBoard.css";

const StartingBoard: React.FC<{ onLetsPlay: (gameStatus: string) => void }> = ({
  onLetsPlay,
}) => {
  const [oponent, setOponent] = useState<any>(null);

  const playerOneRef = useRef<HTMLInputElement>(null);
  const playerTwoRef = useRef<HTMLInputElement>(null);

  const playerNameHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const firstPlayer = playerOneRef.current?.value;
    const secondPlayer = playerTwoRef.current?.value;

    console.log(firstPlayer);
    console.log(secondPlayer);

    onLetsPlay("RUN_GAME");
  };

  const pickOponentHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setOponent(e.currentTarget.value);
    console.log(oponent);
  };

  return (
    <form className="pickPlayer" onSubmit={playerNameHandler}>
      <div className="select-oponent">
        <h2>Choose your oponent:</h2>
        <input
          type="radio"
          name="oponent"
          id="friends"
          value="PVP"
          onChange={pickOponentHandler}
        />
        <label htmlFor="friends">Play with Friends</label>
        <input
          type="radio"
          name="oponent"
          id="computer"
          value="COMPUTER"
          onChange={pickOponentHandler}
        />
        <label htmlFor="computer">Play with Computer</label>
      </div>
      {oponent && (
        <div className="select-name">
          <h2>Enter Player Name:</h2>
          <div className="select-name__form">
            <label htmlFor="p1">Player 1</label>
            <input type="text" ref={playerOneRef} id="p1" />
            {oponent === "PVP" && (
              <>
                <label htmlFor="p2">Player 2</label>
                <input type="text" ref={playerTwoRef} id="p2" />
              </>
            )}
          </div>
        </div>
      )}
      <div className="play-container">
        <button type="submit" className="play-btn">
          Play!
        </button>
      </div>
    </form>
  );
};

export default StartingBoard;
