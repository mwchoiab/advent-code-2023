import { readFileSync } from "fs";
import path from "path";

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const regex = /\d+/g;

const lines = data.split("\n");
const dataLines = lines.map((line) => line.match(regex) as RegExpMatchArray);

const [time, distance] = dataLines.map((arr) =>
  Number(arr.reduce((prev, curr) => prev + curr, ""))
);

let waysToWin = 0;

for (let j = Math.floor((time - 1) / 2); j > 0; j--) {
  if ((time - j) * j > distance) {
    waysToWin += 2;
  } else {
    break;
  }
}

if ((time - 1) % 2 !== 0 && waysToWin !== 0) {
  waysToWin += 1;
}

console.log(waysToWin);
