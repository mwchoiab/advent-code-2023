import { readFileSync } from "fs";
import path from "path";

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf8");

const validDigits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const lines = data.split("\n");

const result = lines.reduce((prev, curr) => {
  let sum = 0;
  let lastDigit;
  let digitStr = "";

  for (let x = 0; x < curr.length; x++) {
    const currValue = curr[x];
    const isNumber = Number(currValue);
    if (!isNumber) {
      digitStr = digitStr + currValue;
      const digitIndex = validDigits.findIndex((digit) =>
        digitStr.includes(digit)
      );

      if (digitIndex === -1) {
        continue;
      } else {
        digitStr = currValue;
        if (sum === 0) {
          sum += (digitIndex + 1) * 10;
          continue;
        }
        lastDigit = digitIndex + 1;
      }
    } else {
      digitStr = "";
      if (sum === 0) {
        sum += Number(currValue) * 10;
        continue;
      }
      lastDigit = Number(currValue);
    }
  }

  sum += lastDigit ?? sum / 10;
  return prev + sum;
}, 0);

console.log(result);
