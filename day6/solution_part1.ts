import { readFileSync } from "fs";
import path from "path";

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const regex = /\d+/g;

const lines = data.split("\n");
const dataLines = lines.map((line) => line.match(regex) as RegExpMatchArray);

const [time, distance] = dataLines.map((arr) => arr.map(Number));

let waysToWin = 0;

for (let i = 0; i < time.length; i++) {
  const [t, d] = [time[i], distance[i]];
  let winCount = 0;
  for (let j = Math.floor((t - 1) / 2); j > 0; j--) {
    if ((t - j) * j > d) {
      winCount += 2;
    } else {
      break;
    }
  }

  if ((t - 1) % 2 !== 0 && winCount !== 0) {
    winCount += 1;
  }

  if (waysToWin === 0) {
    waysToWin = winCount;
  } else {
    waysToWin *= winCount;
  }
}

console.log(waysToWin);
