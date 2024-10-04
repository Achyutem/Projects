import './TicTac.css'
import Blocks from "./Blocks";
import { useState } from "react";
import { FaRegCircle, FaTimes} from "react-icons/fa";

const TicToe = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [xwon, setXwon] = useState(0);
  const [owon, setOwon] = useState(0);
  const [draw, setDraw] = useState(0)
  const [gameOver, setGameOver] = useState(false);
  const [lastgame, setLastGame] = useState<null | string>(null)

  const getIcons = (value : string | null) => {
    if (value === 'O') return <FaRegCircle />
    if (value === 'X') return <FaTimes />
    return null
  }

  const checkWinner = (boardState: any[]) => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (
        boardState[a] !== null &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return true;
      }
    }
    return false;
  };

  const lastWinner = () => {
    if (lastgame === null) {
      return null;
    }
    return <h4>Last Winner: {lastgame === "Draw" ? "It's a Draw!" : `${lastgame}`}</h4>;
  };

  const handleBlockClick = (index: number) => {
    if (state[index] !== null || gameOver) return;
    const stateCopy = Array.from(state);
    stateCopy[index] = currentTurn;
    setState(stateCopy);

    const win = checkWinner(stateCopy);

    if (win) {
      if (currentTurn === "X") {
        setLastGame("X")
        setXwon((prev) => prev + 1);
      } else if (currentTurn === "O") {
        setLastGame("O")
        setOwon((prev) => prev + 1);
      }
      setGameOver(true);
      setTimeout(() => {
        resetGame()
      }, 500);
      return;
    }
    else if (stateCopy.every((block) => block !== null)){
        setDraw(prev => prev + 1)
        setLastGame("Draw")
        setGameOver(true)
        setTimeout(() => {
            resetGame()
        }, 500)
    } else {
        setCurrentTurn(currentTurn === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setState(Array(9).fill(null));
    setGameOver(false);
    setCurrentTurn("X");
  };

  return (
    <>
      <div className="texts">
        <h3>Tic Tac Toe</h3>
        {lastWinner()}
        <div className="stats">
          <h4>Player X: {xwon}</h4>
          <h4>Player O: {owon}</h4>
          <h4>Draw: {draw}</h4>
        </div>
        <div className="board">
          <div className="row-1">
            <Blocks onClick={() => handleBlockClick(0)} value={getIcons(state[0])} />
            <Blocks onClick={() => handleBlockClick(1)} value={getIcons(state[1])} />
            <Blocks onClick={() => handleBlockClick(2)} value={getIcons(state[2])} />
          </div>
          <div className="row-2">
            <Blocks onClick={() => handleBlockClick(3)} value={getIcons(state[3])} />
            <Blocks onClick={() => handleBlockClick(4)} value={getIcons(state[4])} />
            <Blocks onClick={() => handleBlockClick(5)} value={getIcons(state[5])} />
          </div>
          <div className="row-3">
            <Blocks onClick={() => handleBlockClick(6)} value={getIcons(state[6])} />
            <Blocks onClick={() => handleBlockClick(7)} value={getIcons(state[7])} />
            <Blocks onClick={() => handleBlockClick(8)} value={getIcons(state[8])} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TicToe;