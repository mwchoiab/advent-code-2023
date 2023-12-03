import { readFileSync } from "fs";
import path from "path";

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf8");

const lines = data.split("\n");

const newLines = lines.map((line) => {
  const replacedline = line.replace(/;/g, ",");
  return replacedline.split(" ");
});

const result = newLines.reduce((prev, curr) => {
  for (let x = 2; x < curr.length; x += 2) {
    if (Number(curr[x]) > 12 && curr[x + 1].includes("red")) {
      return prev;
    }
    if (Number(curr[x]) > 13 && curr[x + 1].includes("green")) {
      return prev;
    }
    if (Number(curr[x]) > 14 && curr[x + 1].includes("blue")) {
      return prev;
    }
  }
  const [id, _] = curr[1].split(":");

  return prev + Number(id);
}, 0);
console.log(result);
