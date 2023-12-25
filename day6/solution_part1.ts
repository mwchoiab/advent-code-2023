import { readFileSync } from "fs";
import path from "path";

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const regex = /\d+/g;

const lines = data.split("\n");
const dataLines = lines.map((line) => line.match(regex) as RegExpMatchArray);

const [time, distance] = dataLines.map((arr) => arr.map(Number));

let waysToWin = 0;

//binary search from mid point, if win, check left to mid

for (let i = 0; i < time.length; i++) {
  const [t, d] = [time[i], distance[i]];
  const timeMidPoint = Math.floor((t - 1) / 2);
  let left = 1;
  let right = timeMidPoint;
  let winCount = 0;

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
}

console.log(waysToWin);
