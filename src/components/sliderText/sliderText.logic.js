import { property, groupBy } from "lodash";
import { parseTime } from "../../index.logic";

function parseWord({ startTime, endTime, word }, index) {
  return {
    isFirst: index === 0,
    word,
    startTime: parseTime(startTime),
    endTime: parseTime(endTime)
  };
}

function relativeTime(word, totalTime) {
  return {
    ...word,
    startTime: word.startTime / totalTime,
    endTime: word.endTime / totalTime
  };
}

export function getGroupedSentences(unparsed, totalTime) {
  const sentences = unparsed.results
    .map(property("alternatives[0].words"))
    .reduce(
      (acc, words) => [
        ...acc,
        words.map(parseWord).map(word => relativeTime(word, totalTime))
      ],
      []
    );

  const relativeMinute = 60 / totalTime;

  return Object.values(
    groupBy(sentences, ([word]) => Math.floor(word.startTime / relativeMinute))
  );
}
