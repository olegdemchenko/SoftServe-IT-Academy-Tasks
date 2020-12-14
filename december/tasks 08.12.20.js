const testField = [
    [1, 2, 1],
    [2, 1, 2],
    [2, 1, 2],
  ]

function checkTikTacToe (field) {
    const combinations = [...field];
    for (let i = 0; i < field.length; i += 1) {
      const column = field.reduce((acc, row) => [...acc, row[i]], []);
      combinations.push(column);
    }
    const firstDiagonal = field.reduce((acc, row, index) => [...acc, row[index]], []);
    const secondDiagonal = field.reduce((acc, row, index) => [...acc, row[row.length - index - 1]], []);
    combinations.push(firstDiagonal, secondDiagonal);
    const isXWon = (comb) => comb.some((currentComb) => currentComb.every((elem) => elem === 1));
    const isOWon = (comb) => comb.some((currentComb) => currentComb.every((elem) => elem === 2));
    const isCatsGame = (comb) => comb.every((currentComb) => !currentComb.includes(0));
    switch (true) {
      case isXWon(combinations): {
        return 1;
      }
      case isOWon(combinations): {
        return 2;
      }
      case isCatsGame(combinations): {
        return 0;
      }
      default:
        return -1;
    }
  }

const wordRegular = /\b[\w']+'?/;

const parseWords = (sentence) => {
  const match = sentence.match(/\b[\w']+'?/g);
  return match || [];
};

const parseKeys = (words) => words.map((word) => word.replaceAll(/'/g, '')).map((word) => word.length);

const makeSentence = (words) => words.map((word, index, words) => {
  if (index === 0) {
    return `${word[0].toUpperCase()}${word.slice(1)}`;
  }
  const newWord = word.toLowerCase();
  if (index === words.length - 1) {
    return `${newWord}.`;
  }
  return newWord;
}).join(' ');

function getHiddenMessage(message) {
  if (message.length === 0) {
    return '';
  }
  const sentences = message.split(/[.!?]\s/g);
  const keysSentence = sentences[0];
  const keysWords = parseWords(keysSentence);
  const keys = parseKeys(keysWords);
  const sourceSentences = sentences.slice(1, keys.length + 1);
  const restSentences = sentences.slice(keys.length + 1);
  const sourceWords = sourceSentences.map((sentence) => parseWords(sentence));
  const decodedWords = keys.reduce((acc, key, index) => {
    if (sourceWords[index] && sourceWords[index][key - 1]) {
      return [...acc, sourceWords[index][key - 1]];
    }
    return acc;
  }, []);
  const decodedSentence = makeSentence(decodedWords);
  const restDecoded = getHiddenMessage(restSentences.join('. '));
  const space = restDecoded.length === 0 ? '' : ' ';
  return `${decodedSentence}${space}${restDecoded}`;
}