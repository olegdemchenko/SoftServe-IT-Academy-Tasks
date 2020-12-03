  function concat() {
    return Array.prototype.join.call(arguments, '');
  }
  
  function createStr(data, start, end) {
    let res = '';
    for (let i = start; i < end; i += 1) {
      res += data[i];
    }
    return res;
  }
  
  function anotherConcat () {
    return createStr(arguments, 0, arguments.length);
  }
  
  function repeat(str = '', count = 1) {
    const isCountNotCorrect = !Number.isFinite(count) || count < 0 || str.length * count >= 1 << 28;
    if (isCountNotCorrect) {
      throw new Error('count is not correct');
    }
    if (str === '' || count === 0) {
      return '';
    }
    const repeatedStr = Array(count).fill(str);
    return createStr(repeatedStr, 0, count);
  }
  
  function normalizeIndex(maxLength, index, type) {
    const value = Number(index);
    switch (true) {
      case (!Number.isFinite(value) && type === 'start'): {
        return 0;
      }
      case (!Number.isFinite(value) && type === 'end'):
      case (value >= maxLength): {
        return maxLength;
      }
      case (value <= 0): {
        return 0;
      }
      default:
        return Math.floor(value);
    }
  }
  
  function lastIndexOf(str, searchValue, fromIndex) {
    if (typeof str !== 'string') {
      throw new Error('First arguments must be string');
    }
    const startIndex = normalizeIndex(str.length, fromIndex, 'end');
    const stringifiedSearchValue = String(searchValue);
    for (let i = startIndex; i >= 0; i -= 1) {
      const subStr = substr(str, i, stringifiedSearchValue.length);
      if (subStr === stringifiedSearchValue) {
        return i;
      }
    }
    return -1;
  }
  
  const includes = (str, searchValue, fromIndex) => lastIndexOf(str, searchValue, fromIndex) !== -1; 
  
  function substring(str = '', start = 0, end) {
    if (typeof str !== 'string') {
      throw new Error('First argument must be string');
    }
    const index1 = normalizeIndex(str.length, start, 'start');
    const index2 = normalizeIndex(str.length, end, 'end');
    const startIndex = Math.min(index1, index2);
    const endIndex = Math.max(index1, index2);
    return createStr(str, startIndex, endIndex);
  }
  
  function substr(str, startIndex, length) {
    if (typeof str !== 'string') {
      throw new Error('First argument must be string');
    }
    const normalizedStartIndex = startIndex < 0 ? normalizeIndex(str.length, str.length + startIndex, 'start') : normalizeIndex(str.length, startIndex, 'start');
    const normalizedEndIndex = Number(length) ? normalizeIndex(str.length, normalizedStartIndex + length, 'end') : 0;
    return createStr(str, normalizedStartIndex, normalizedEndIndex);
  }