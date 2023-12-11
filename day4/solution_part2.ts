import { readFileSync } from "fs";
import path from "path";

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf8");

const lines = data.split("\n");

const temp = lines.map((l) => {
  const res = l.split(":");
  return res[1].replace(/\D/g, ",");
});

const parsedLines = temp.map((line) => line.split(","));

let scratchcardsMap: Record<number, number> = {};

const result = parsedLines.reduce((prev, curr, idx) => {
  const cardNo = idx + 1;

  const numberSet = new Set<number>();
  let emptyStrCount = 0;

  for (const value of curr) {
    if (value === "") {
      emptyStrCount++;
    } else {
      numberSet.add(Number(value));
    }
  }

  const winCount = curr.length - emptyStrCount - numberSet.size;

  scratchcardsMap[cardNo] = scratchcardsMap[cardNo]
    ? scratchcardsMap[cardNo] + 1
    : 1;

  for (let x = cardNo + 1; x <= winCount + cardNo; x++) {
    if (scratchcardsMap?.[x]) {
      scratchcardsMap[x] = scratchcardsMap[x] + scratchcardsMap[cardNo];
    } else {
      scratchcardsMap[x] = scratchcardsMap[cardNo];
    }
  }

  return prev + scratchcardsMap[cardNo];
}, 0);

console.log(result);
