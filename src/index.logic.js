import { last } from "lodash";

export function parseTime(time) {
  return parseFloat(time.substr(0, time.length - 1));
}

export function getTotalTime(unparsed) {
  const finalSentence = last(last(unparsed.results).alternatives);
  const finalWord = last(finalSentence.words);

  return parseTime(finalWord.endTime);
}
