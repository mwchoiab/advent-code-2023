import { readFileSync } from "fs";
import path from "path";

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf8");

const lines = data.split("\n");

let sum = 0;

const isNumber = (input: any) => {
  return !isNaN(Number(input));
};

const getFullNumber = (xIndex: number, yIndex: number, currValue: string) => {
  const lStr = checkLeft(xIndex, yIndex);
  const rStr = checkRight(xIndex, yIndex);
  return lStr + currValue + rStr;
};

const checkLeft = (xIndex: number, yIndex: number) => {
  let str = "";
  for (let y = yIndex - 1; y >= 0; y--) {
    const value = lines[xIndex][y];

    if (isNumber(value)) {
      str = value + str;
      continue;
    }
    break;
  }
  return str;
};

const checkRight = (xIndex: number, yIndex: number) => {
  let str = "";
  for (let y = yIndex + 1; y <= lines[xIndex].length; y++) {
    const value = lines[xIndex][y];
    if (isNumber(value)) {
      str = str + value;
      continue;
    }
    break;
  }
  return str;
};

for (let x = 0; x < lines.length; x++) {
  const line = lines[x];
  let container = new Set<string>();
  for (let i = 0; i <= line.length; i++) {
    const value = line[i];
    if (value !== "*") continue;

    for (let j = -1; j < 2; j++) {
      //top
      if (isNumber(lines[x - 1]?.[i + j])) {
        const value = getFullNumber(x - 1, i + j, lines[x - 1][i + j]);
        if (isNumber(value) && value !== "") {
          container.add(value);
        }
      }
    }

    const leftValue = checkLeft(x, i);
    const rightValue = checkRight(x, i);
    if (isNumber(leftValue) && leftValue !== "") container.add(leftValue);
    if (isNumber(rightValue) && rightValue !== "") container.add(rightValue);

    //bottom
    for (let j = -1; j < 2; j++) {
      if (isNumber(lines[x + 1]?.[i + j])) {
        const value = getFullNumber(x + 1, i + j, lines[x + 1][i + j]);
        if (isNumber(value) && value !== "") {
          container.add(value);
          j++;
        }
      }
    }

    if (container.size === 2) {
      let tempSum = 1;
      for (const value of container) {
        tempSum *= Number(value);
      }
      sum += tempSum;
    }
    container.clear();
  }
}

console.log(sum);
