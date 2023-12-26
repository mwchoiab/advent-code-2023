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

const startNodes = parsedNodes
  .filter((n) => n[0].endsWith("A"))
  .map((n) => n[0]);

const getMinStep = (startNode: string) => {
  let step = 0;
  let count = 0;
  let currNode = "";

  while (true) {
    if (count === parsedInstruction.length) count = 0;
    if (currNode.endsWith("Z")) break;

    const instructions = parsedInstruction[count];
    step++;
    count++;
    if (!currNode) {
      currNode = nodesMap[startNode][instructions];
      continue;
    }
    currNode = nodesMap[currNode][instructions];
  }

  return step;
};

const minStepsForEachStartNode = startNodes.map((n) => getMinStep(n));

// use online calculator to find the LCM of these numbers

console.log(minStepsForEachStartNode);
