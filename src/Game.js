import React, { useEffect, useState } from "react";

import "./App.css";
import {
  initialBlocks,
  checkRows,
  checkColumns,
  checkBlocks,
  checkFinish,
} from "./utiles/helper";

const Game = () => {
  const [blocks, setBlocks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const blocks = initialBlocks();
    setBlocks(blocks);
  }, []);

  const onChange = (e, row, col) => {
    setMessage("");
    const temp = [...blocks];
    const insertedNum = e.target.value.charAt(e.target.value.length - 1);
    if (+insertedNum === 0 || !Number.isInteger(+insertedNum)) return;
    temp[row][col] = {
      readOnly: false,
      val: +insertedNum,
    };
    setBlocks(temp);
  };

  const checkAnswer = () => {
    if (!checkRows(blocks)) {
      return setMessage("Row contains duplicate numbers");
    }
    if (!checkColumns(blocks)) {
      return setMessage("Column contains duplicate numbers");
    }
    if (!checkBlocks(blocks)) {
      return setMessage(
        "One of the nine 3x3 subgrids that compose the grid contains duplicate numbers"
      );
    }
    if (!checkFinish(blocks)) {
      return setMessage("Please complete the game");
    }
    setMessage("Completed!");
  };

  return (
    <div className="game">
      <div className="text-error">{message}</div>
      <div className="game-board">
        {blocks.map((rows, i) => (
          <div className="board-row" key={`row_${i}`}>
            {rows.map((item, j) => (
              <input
                readOnly={item.readOnly}
                className={item.readOnly ? "block block-disable" : "block"}
                value={item.val}
                onChange={(e) => onChange(e, i, j)}
                key={`col_${j}`}
              />
            ))}
          </div>
        ))}
      </div>
      <button className="btn-check" onClick={checkAnswer}>
        Check Answer
      </button>
    </div>
  );
};

export default Game;
