import GameData from "../data/game.json";

export const initialBlocks = () => {
  let blocks = [];
  const data = GameData.blocks;
  for (let i = 0; i < 9; i++) {
    let rows = [];
    for (let j = 0; j < 9; j++) {
      rows.push({
        readOnly: false,
        val: "",
      });
    }
    blocks.push(rows);
  }
  data.map(
    (item) =>
      (blocks[item.x][item.y] = {
        readOnly: true,
        val: item.value,
      })
  );

  return blocks;
};

export const checkRows = (squares) => {
  for (let i = 0; i < 9; i++) {
    let dict = {};
    for (let j = 0; j < 9; j++) {
      const item = squares[i][j].val;
      if (dict[item]) {
        return false;
      } else {
        dict[item] = squares[i][j].val;
      }
    }
  }

  return true;
};

export const checkColumns = (squares) => {
  for (let i = 0; i < 9; i++) {
    let dict = {};

    for (let j = 0; j < 9; j++) {
      const item = squares[j][i].val;
      if (dict[item]) {
        return false;
      } else {
        dict[item] = squares[j][i].val;
      }
    }
  }

  return true;
};

export const checkBlocks = (squares) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let dict = {};

      for (let k = 0; k < 9; k++) {
        const i1 = k % 3;
        const j1 = (k - i1) / 3;

        const rowIndex = i * 3 + i1;
        const colIndex = j * 3 + j1;
        const item = squares[rowIndex][colIndex].val;
        if (dict[item]) {
          return false;
        } else {
          dict[item] = squares[rowIndex][colIndex].val;
        }
      }
    }
  }

  return true;
};

export const checkFinish = (squares) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const item = squares[i][j].val;
      if (item === "") {
        return false;
      }
    }
  }

  return true;
};
