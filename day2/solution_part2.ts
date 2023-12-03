import { readFileSync } from "fs";
import path from "path";

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf8");

const lines = data.split("\n");

const newLines = lines.map((line) => {
  const replacedline = line.replace(/;/g, ",");
  return replacedline.split(" ");
});

const result = newLines.reduce((prev, curr) => {
  let red = 0;
  let blue = 0;
  let green = 0;

  for (let x = 2; x < curr.length; x += 2) {
    if (curr[x + 1].includes("red")) {
      if (!red || Number(curr[x]) > red) {
        red = Number(curr[x]);
      }
    }
    if (curr[x + 1].includes("green")) {
      if (!green || Number(curr[x]) > green) {
        green = Number(curr[x]);
      }
    }
    if (curr[x + 1].includes("blue")) {
      if (!blue || Number(curr[x]) > blue) {
        blue = Number(curr[x]);
      }
    }
  }

  return prev + red * blue * green;
}, 0);
console.log(result);
