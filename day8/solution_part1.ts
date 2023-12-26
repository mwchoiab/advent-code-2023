import { readFileSync } from "fs";
import path from "path";

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf8");

const lines = data.split("\n");

const [instructions, _, ...node] = lines;

const parsedNodes = node.map((v) => v.match(/[a-zA-Z]+/g) as RegExpMatchArray);
const parsedInstruction = instructions.split("") as ("L" | "R")[];
const nodesMap: Record<
  string,
  {
    L: string;
    R: string;
  }
> = {};

parsedNodes.forEach(
  ([p, lNode, rNode]) => (nodesMap[p] = { L: lNode, R: rNode })
);

let step = 0;
let count = 0;
let currNode = "";

while (true) {
  if (count === parsedInstruction.length) count = 0;
  if (currNode === "ZZZ") break;

  const instructions = parsedInstruction[count];
  step++;
  count++;
  if (!currNode) {
    currNode = nodesMap["AAA"][instructions];
    continue;
  }
  currNode = nodesMap[currNode][instructions];
}
console.log(step);
