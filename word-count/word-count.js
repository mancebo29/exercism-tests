//
// This is only a SKELETON file for the 'Word Count' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const countWords = (input) => {
  const countMap = {};
  const separatorRegexp = /[^\w']+/gim;
  const quotedWordRegexp = /^'\w+'$/gm;

  if (!input) {
    throw new Error('Input needs to be provided');
  }

  const words = input.split(separatorRegexp);
  if (!words || !words.length) {
    throw new Error('Invalid input');
  }

  words.forEach((rawWord) => {
    let word = rawWord.toLowerCase().trim();

    if (quotedWordRegexp.test(word)) {
      word = word.replace(/'/gm, '');
    }

    if (!word) return;

    if (!countMap[word]) {
      countMap[word] = 1;
    } else {
      countMap[word] += 1;
    }
  });

  return countMap;
};
