  
const task1 = (number = 0) => {
  if (!Number.isSafeInteger(number)) {
    return 'Number is not integer';
  }
  return number.toString(2).replaceAll('0', '').length;
};

const getOrderOfWord = (word) => {
  const order = word.match(/[1-9]/)?.[0] ?? 0;
  return Number(order);
};

const task2 = (str = '') => str.split(' ').sort((a, b) => getOrderOfWord(a) - getOrderOfWord(b)).join(' ');

const task3 = (cards) => {
  const teams = {
    A: Array(11).fill(''),
    B: Array(11).fill(''),
    playersCount: {
      A: 11,
      B: 11,
    }
  };

  for (const card of cards) {
    const [, team, number, color] = card.match(/^(\w)(\d+)(\w)$/);
    const player = number - 1;
    const playerCard = teams[team][player];
    if (playerCard === '') {
      teams[team][player] = color;
      if (color === 'R') {
        teams.playersCount[team] -= 1;
       }
    }
    if (playerCard === 'Y') {
      teams[team][player] = 'R';
      teams.playersCount[team] -= 1;
    }
    const { A: countA, B: countB } = teams.playersCount;
    if (countA < 7 || countB < 7) {
       return [countA, countB];
    }
  }
  return Object.values(teams.playersCount);
};