import { readFileSync } from "fs";
import path from "path";

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf8");

const lines = data.split("\n");

const regex = /\d+/g;

const seeds = lines[0].match(regex) as RegExpMatchArray;

const parsedLines = lines.splice(2).map((line) => line.split(" "));
console.log(parsedLines);
console.log(seeds);

const seedMap: Record<string, number> = {};

for (let y = 0; y < seeds.length; y++) {
  const seed = seeds[y];
  seedMap[seed] = Number(seed);
  let isUpdated = false;

  for (let x = 0; x < parsedLines.length; x++) {
    const line = parsedLines[x];
    if (line.length !== 3) {
      isUpdated = false;
      continue;
    }
    if (isUpdated) continue;

    const [dest, source, length] = line;
    if (
      seedMap[seed] >= Number(source) &&
      seedMap[seed] <= Number(source) + Number(length)
    ) {
      seedMap[seed] = seedMap[seed] - Number(source) + Number(dest);

      console.log(seed, dest, source, length, seedMap[seed]);
      isUpdated = true;
    }
  }
}

const smallestValue = Math.min(...Object.values(seedMap));

console.log(smallestValue);
