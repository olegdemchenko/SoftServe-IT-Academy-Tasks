const friendsList = 'Fred:Corwill;Wilfred:Corwill;Raphael:Corwill;Alfred:Corwill;Barney:Tornbull;Betty:Tornbull;Bjon:Tornbull';

const sortFriends = ([firstNameA, lastNameA], [firstNameB, lastNameB]) => {
  if (lastNameA > lastNameB) {
    return 1;
  }
  if (lastNameA < lastNameB) {
    return -1;
  }
  return firstNameA.localeCompare(firstNameB);
}

const sortFriendsList = (list) => (
  list.split(';')
  .map((friend) => friend.toUpperCase().split(':'))
  .sort(sortFriends)
  .map(([firstName, lastName]) => `(${lastName}, ${firstName})`)
  .join(' ')
)

const testCase1 = [
  ['XX', 2],
  ['XXXX', 6],
  ['XXXXX', 4],
  ['XX', 7]
];

function getFreeChairs(rooms, count) {
  if (count === 0) {
    return 'Game On';
  }
  const spareChairs = [];
  let chairsNeed = count;
  for (const [occupants, chairs] of rooms) {
    const diff = chairs - occupants.length;
    const freeChairs = diff > 0 ? diff : 0;
    if (freeChairs > chairsNeed) {
      spareChairs.push(chairsNeed);
      chairsNeed = 0;
    } else {
      spareChairs.push(freeChairs);
      chairsNeed -= freeChairs;
    }
    if (chairsNeed === 0) {
      return spareChairs;
    }
  }
  return 'Not enough';
};

const points = [
    [2, 2],
    [2, 8],
    [5, 5],
    [6, 3],
    [6, 7],
    [7, 4],
    [7, 9],
  ];
  
  const points2 = [
    [1, 1],
    [2, 5],
    [6, 1],
    [6, 6],
    [5, 4],
    [4, 2],
    [3, 3],
  ];
  
  const getDistance = ([x1, y1], [x2, y2]) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  
  const sortByDistance = (targetPoint) => (pointA, pointB) => getDistance(targetPoint, pointA) - getDistance(targetPoint, pointB);
  
  const getClosestPoints = (points) => points.reduce((prevResult, currentPoint, index, points) => {
    if (index === points.length - 1) {
      return prevResult;
    };
    const closestPoint = points.slice(index + 1).sort(sortByDistance(currentPoint))[0];
    const newResult = { points: [currentPoint, closestPoint], distance: getDistance(currentPoint, closestPoint) };
    return prevResult.distance > newResult.distance ? newResult : prevResult;
  }, { points: [], distance: Infinity });

  const convertIp = (ip) => (
    ip.split('.')
    .map((numb) => Number(numb).toString(2))
    .map((byte) => {
      if (byte.length < 8) {
        const bitsNeed = 8 - byte.length;
        return `${'0'.repeat(bitsNeed)}${byte}`;
      }
      return byte;
    }).join('')
  );

  const compareIp = ([ip1, ip2]) => {
    const binaryIp1 = convertIp(ip1);
    const binaryIp2 = convertIp(ip2);
    return parseInt(binaryIp2, 2) - parseInt(binaryIp1, 2);
  };

