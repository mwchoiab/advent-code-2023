import { readFileSync } from "fs";
import path from "path";

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const regex = /\d+/g;

const lines = data.split("\n");
const dataLines = lines.map((line) => line.match(regex) as RegExpMatchArray);

const [t, d] = dataLines.map((arr) =>
  Number(arr.reduce((prev, curr) => prev + curr, ""))
);

const timeMidPoint = Math.floor((t - 1) / 2);
let left = 1;
let right = timeMidPoint;
let winCount = 0;
let waysToWin = 0;

while (left < right) {
  const currMidPoint = Math.floor((left + right) / 2);
  if (currMidPoint === left) break;
  if ((t - currMidPoint) * currMidPoint > d) {
    right = currMidPoint;
  } else {
    left = currMidPoint;
  }
}

winCount = (timeMidPoint - left) * 2;

if ((t - 1) % 2 !== 0 && (t - t / 2) * (t / 2) > d) {
  winCount++;
}

if (waysToWin === 0) {
  waysToWin = winCount;
} else {
  waysToWin *= winCount;
}
console.log(waysToWin);
