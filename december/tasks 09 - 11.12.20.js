const wordRegular = /\b[\w']+/;
const allWordsRegular = new RegExp(wordRegular, 'g');

const parseWords = (sentence) => {
  const match = sentence.match(allWordsRegular);
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

const testField = [
    [0,0,0,2,2,0],
    [0,3,0,0,0,0],
    [0,3,0,1,0,0],
    [0,3,0,1,0,0],
  ];
  const testHits = [[2, 1], [1, 3], [4, 2]];
  
  const isShipHeat = (status) => status.some((elem) => elem === 'Hit');
  
  const isShipSunk = (status) => status.every((elem) => elem === 'Hit');
  
  function battleShips(field, hits) {
    const fieldWidth = field[0].length;
    const fieldHeight = field.length;
    const map = {};
    let points = 0;
    for (let x = 0; x < fieldWidth; x += 1) {
      for (let y = 0; y < fieldHeight; y += 1) {
        if (field[y][x] !== 0) {
          const ship = field[y][x];
          const key = `${x + 1}${fieldHeight - y}`;
          map[key] = { ship, status: 'Norm' };
        }
      }
    }
    for (const [x, y] of hits) {
      const hitKey = `${x}${y}`;
      if (map[hitKey]) {
        map[hitKey].status = 'Hit';
      } 
    }
    const shipsStatistic = Object.values(map).reduce((acc, { ship, status}) => {
      if (!acc[ship]) {
        return { ...acc, [ship]: [status] };
      } 
      return { ...acc, [ship]: [...acc[ship], status] };
    }, {});
    const startHash = { sunk:0, damaged: 0, notTouched: 0, points };
    const res = Object.values(shipsStatistic).reduce((stat, shipStatus) => {
      switch (true) {
        case (isShipSunk(shipStatus)): {
          return { ...stat, sunk: stat.sunk + 1, points: stat.points + 1 };
        }
        case (isShipHeat(shipStatus)): {
          return { ...stat, damaged: stat.damaged + 1, points: stat.points + 0.5 };
        }
        default: 
          return { ...stat, notTouched: stat.notTouched + 1, points: stat.points - 1 };
      }
    }, startHash);
    return res;
  }

  