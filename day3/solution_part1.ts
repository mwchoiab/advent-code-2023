import { readFileSync } from "fs";
import path from "path";

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf8");

const lines = data.split("\n");

let sum = 0;

const validSymbol = ["*", "!", "@", "#", "%", "&", "-", "+", "/", "=", "$"];

const isNumber = (input: any) => {
  return !isNaN(Number(input));
};

const checkLeft = (xIndex: number, yIndex: number) => {
  for (let x = -1; x < 2; x++) {
    if (validSymbol.includes(lines[xIndex + x]?.[yIndex - 1])) {
      return true;
    }
  }
  return false;
};

const checkRight = (xIndex: number, yIndex: number) => {
  for (let x = -1; x < 2; x++) {
    if (validSymbol.includes(lines[xIndex + x]?.[yIndex + 1])) {
      return true;
    }
  }
  return false;
};
const checkBottom = (xIndex: number, yIndex: number) => {
  for (let x = -1; x < 2; x++) {
    if (validSymbol.includes(lines[xIndex + 1]?.[yIndex + x])) {
      return true;
    }
  }
  return false;
};
const checkTop = (xIndex: number, yIndex: number) => {
  for (let x = -1; x < 2; x++) {
    if (validSymbol.includes(lines[xIndex - 1]?.[yIndex + x])) {
      return true;
    }
  }
  return false;
};

for (let x = 0; x < lines.length; x++) {
  const line = lines[x];
  let str = "";
  let isAdjacent = false;
  for (let i = 0; i <= line.length; i++) {
    const value = line[i];
    if (isNumber(value)) {
      if (str === "" || !isNumber(line[i + 1])) {
        if (
          checkBottom(x, i) ||
          checkLeft(x, i) ||
          checkTop(x, i) ||
          checkRight(x, i)
        ) {
          isAdjacent = true;
        }
      }
      str += value;
    } else {
      if (isAdjacent) {
        sum += Number(str);
      }
      str = "";
      isAdjacent = false;
    }
  }
}

console.log(sum);
