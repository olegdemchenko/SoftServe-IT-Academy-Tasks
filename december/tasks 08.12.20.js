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

const testStr = 'Yesterday, we bumped into Laura. It had to happen, but you can\'t deny the timing couldn\'t be worse. The "mission" to try and seduce her was a complete failure last month. By the way, she still has the ring I gave her. Anyhow, it hasn\'t been a pleasurable experience to go through it. I wanted to feel done with it first.'

const wordRegular = /\b[\w'`]+\b/;

function getHiddenMessage (message) {
    if (message === '') {
      return '';
    }
    const [firstSentence, ...restSentences] = message.slice(0, message.length - 1).split(/[.!?]/g);
    const wordsNumbs = firstSentence.trim().split(' ').map((word) => {
      const match = word.match(wordRegular)[0];
      if (/['`]/.test(match)) {
        return match.length - 1;
      }
      return match.length;
    });
    
    const hiddenWordsSources = restSentences.slice(0, wordsNumbs.length)
      .map((sent) => sent.trim().split(' '))
      .map((sent) => sent.map((word) => word.match(wordRegular)[0]));
    const otherSentences = restSentences.slice(wordsNumbs.length);
    const hiddenWords = wordsNumbs.reduce((acc, numb, index) => {
        return [...acc, hiddenWordsSources[index][numb - 1]];
      }, []);
    const restMessage = getHiddenMessage(otherSentences.join('.'));
    hiddenWords[0] = `${hiddenWords[0][0].toUpperCase()}${hiddenWords[0].slice(1)}`;
    const space = restMessage !== '' ? ' ' : '';
    return `${hiddenWords.join(' ')}.${space}${restMessage}`;
  }