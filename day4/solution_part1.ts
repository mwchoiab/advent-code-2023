import { readFileSync } from "fs";
import path, { parse } from "path";

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf8");

const lines = data.split("\n");

const temp = lines.map((l) => {
  const res = l.split(":");
  return res[1].replace(/\D/g, ",");
});

const parsedLines = temp.map((line) => line.split(","));

const result = parsedLines.reduce((prev, curr) => {
  const numberSet = new Set<number>();
  let emptyStrCount = 0;
  let score = 0;

  for (const value of curr) {
    if (value === "") {
      emptyStrCount++;
    } else {
      numberSet.add(Number(value));
    }
  }

  for (let x = 0; x < curr.length - emptyStrCount - numberSet.size; x++) {
    if (x === 0) {
      score += 1;
    } else {
      score *= 2;
    }
  }

  return prev + score;
}, 0);

console.log(result);
