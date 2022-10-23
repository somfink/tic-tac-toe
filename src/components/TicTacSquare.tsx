import { useEffect, useState } from "react";

import Square from "./Square";
import "./TicTacSquare.css";

type playerChooseType = {
  playerChoose?: string;
  id: number;
};

type TicTacSquareProps = {
  pName?: string;
  oName?: string;
};

const SQUARE_INIT_STATE = [
  { playerChoose: undefined, id: 1 },
  { playerChoose: undefined, id: 2 },
  { playerChoose: undefined, id: 3 },
  { playerChoose: undefined, id: 4 },
  { playerChoose: undefined, id: 5 },
  { playerChoose: undefined, id: 6 },
  { playerChoose: undefined, id: 7 },
  { playerChoose: undefined, id: 8 },
  { playerChoose: undefined, id: 9 },
];

const TicTacSquare: React.FC<TicTacSquareProps> = ({ pName, oName }) => {
  const [content, setContent] = useState<playerChooseType[]>(SQUARE_INIT_STATE);
  const [winGame, setWinGame] = useState<boolean>(false);

  const [playerName, setPlayerName] = useState<string | undefined>(pName);

  const computerPickHandler = (id: number) => {
    const emptySquare = content.filter(
      (item) => typeof item.playerChoose !== "string"
    );
    const pickedItemIndex = Math.floor(Math.random() * emptySquare.length);

    const newContent = { playerChoose: "O", id: id };

    // emptySquare[pickedItemIndex];
    if (playerName === "Computer") {
      setContent((prevState) => {
        return [
          ...prevState.slice(0, pickedItemIndex),
          { ...newContent },
          ...prevState.slice(pickedItemIndex + 1),
        ];
      });
    }

    setPlayerName(pName);
  };

  const playerWinHandler = () => {
    const squareContent = content.map((item) => item.playerChoose);

    if (
      (typeof squareContent[0] === "string" &&
        squareContent[0] === squareContent[1] &&
        squareContent[1] === squareContent[2]) ||
      (typeof squareContent[3] === "string" &&
        squareContent[3] === squareContent[4] &&
        squareContent[4] === squareContent[5]) ||
      (typeof squareContent[6] === "string" &&
        squareContent[6] === squareContent[7] &&
        squareContent[7] === squareContent[8]) ||
      (typeof squareContent[0] === "string" &&
        squareContent[0] === squareContent[3] &&
        squareContent[3] === squareContent[6]) ||
      (typeof squareContent[1] === "string" &&
        squareContent[1] === squareContent[4] &&
        squareContent[4] === squareContent[7]) ||
      (typeof squareContent[2] === "string" &&
        squareContent[2] === squareContent[5] &&
        squareContent[5] === squareContent[8]) ||
      (typeof squareContent[0] === "string" &&
        squareContent[0] === squareContent[4] &&
        squareContent[4] === squareContent[8]) ||
      (typeof squareContent[2] === "string" &&
        squareContent[2] === squareContent[4] &&
        squareContent[4] === squareContent[6])
    ) {
      setWinGame(true);
    }
  };

  useEffect(() => {
    playerWinHandler();
  }, [content]);

  const addContentHandler = (id: number) => {
    const contentCondition =
      content[id - 1].playerChoose === "X" ||
      content[id - 1].playerChoose === "O";
    if (!contentCondition && !winGame) {
      if (playerName === pName) {
        const newContent = { playerChoose: "X", id: id };
        setContent((prevState) => {
          const selectedIndex = prevState.findIndex((item) => item.id === id);

          if (contentCondition) {
            return [...prevState];
          }

          return [
            ...prevState.slice(0, selectedIndex),
            { ...newContent },
            ...prevState.slice(selectedIndex + 1),
          ];
        });
        setPlayerName(oName);

        if (oName === "Computer") {
          setTimeout(computerPickHandler.bind(null, id), 1000);
        }
      }
      if (playerName === oName) {
        const newContent = { playerChoose: "O", id: id };

        if (oName !== "Computer") {
          setContent((prevState) => {
            const selectedIndex = prevState.findIndex((item) => item.id === id);

            if (contentCondition) {
              return [...prevState];
            }

            return [
              ...prevState.slice(0, selectedIndex),
              { ...newContent },
              ...prevState.slice(selectedIndex + 1),
            ];
          });
          setPlayerName(pName);
        }
      }
    }
    if (contentCondition && !winGame) {
      alert("You must pick other square!");
      return;
    }
    if (winGame) {
      return;
    }
  };

  const resetGameHandler = () => {
    setContent(SQUARE_INIT_STATE);
    setWinGame(false);
    setPlayerName(pName);
  };

  const whoWinGame = () => {
    if (playerName === pName) {
      return `Winner is ${oName} - O`;
    }
    if (playerName === oName) {
      return `Winner is ${pName} - X`;
    }
  };

  return (
    <>
      <h2 className="heading">{`Turn: ${playerName}`}</h2>
      <section className="ticTacSquare">
        {content.map((item) => (
          <Square
            squareContent={item.playerChoose}
            key={item.id}
            onAddContent={addContentHandler.bind(null, item.id)}
          />
        ))}
        {winGame && <div className="winner">{winGame && whoWinGame()}</div>}
        {winGame && (
          <div className="btn-container">
            <button className="button" onClick={resetGameHandler}>
              Try again!
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default TicTacSquare;
