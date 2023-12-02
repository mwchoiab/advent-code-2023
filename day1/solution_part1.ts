import { readFileSync } from "fs";
import path from "path";

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf8");

const lines = data.split("\n");

const result = lines.reduce((prev, curr) => {
  let sum = 0;
  let lastDigit;
  for (let x = 0; x < curr.length; x++) {
    const currValue = Number(curr[x]);
    if (!isNaN(currValue)) {
      if (sum === 0) {
        sum += currValue * 10;
        continue;
      }
      lastDigit = currValue;
    }
  }

  sum += lastDigit ?? sum / 10;

  return prev + sum;
}, 0);

console.log(result);
