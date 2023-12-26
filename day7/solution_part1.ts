import { readFileSync } from "fs";
import path from "path";

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const card = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const bidMap: Record<string, number> = {};
const lines = data.split("\n");

for (const data of lines) {
  const [hand, bid] = data.split(" ");
  bidMap[hand] = Number(bid);
}

const getHandRank = (hand: string) => {
  const cards = hand.split("");
  let handsMap: Record<string, number> = {};

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    if (!handsMap?.[card]) {
      handsMap[card] = 1;
    } else {
      handsMap[card] = handsMap[card] + 1;
    }
  }

  const keyLength = Object.keys(handsMap).length;

  if (keyLength === 1) return 0;
  if (keyLength === 2) {
    if (Object.values(handsMap).includes(4)) return 1;
    return 2;
  }
  if (keyLength === 3) {
    if (Object.values(handsMap).includes(3)) return 3;
    return 4;
  }
  return keyLength + 1;
};

const getCardRank = (handCard: string) => {
  return card.findIndex((v) => v === handCard);
};

const sortedHands = Object.keys(bidMap).sort((a, b) => {
  const diff = getHandRank(a) - getHandRank(b);
  if (diff !== 0) return diff;
  for (let i = 0; i < 5; i++) {
    const diff = getCardRank(a[i]) - getCardRank(b[i]);
    if (diff === 0) continue;
    return diff;
  }
  return 0;
});

const result = sortedHands.reduce((prev, curr, index) => {
  const bid = bidMap[curr];
  return prev + bid * (sortedHands.length - index);
}, 0);

console.log(result);
