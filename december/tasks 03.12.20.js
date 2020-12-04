
Array.prototype.push = function () {
    const self = this;
    let length = self.length;
    for (const arg of arguments) {
      self[length] = arg;
      length += 1;
    }
    return length;
  }
  
  Array.prototype.pop = function () {
    const self = this;
    const length = this.length;
    if (length === 0) {
      return;
    }
    const res = self[length - 1];
    self.length -= 1;
    return res;
  }
  
  Array.prototype.shift = function () {
    const self = this;
    const length = this.length;
    if (length === 0) {
      return;
    }
    const res = self[0];
    for (let i = 0; i < length - 1; i +=1) {
      self[i] = self[i + 1];
    }
    self.pop();
    return res;
  }
  
  Array.prototype.unshift = function () {
    const self = this;
    let length = self.length;
    for (let j = arguments.length - 1; j >= 0; j -= 1) {
      for (let i = length; i > 0; i -= 1) {
        self[i] = self[i - 1];
      }
      self[0] = arguments[j];
      length += 1;
    }
    return length;
  }
  
  Array.prototype.concat = function () {
    const self = this;
    const res = [];
    for (const elem of self) {
      res.push(elem);
    }
    for (const arg of arguments) {
      if (Array.isArray(arg)) {
        for (const subArg of arg) {
          res.push(subArg);
        }
      } else {
        res.push(arg);
      }
    }
    return res;
  }
  
  
  const mapByReduce = (data) => data.reduce((acc, elem) => acc.concat(elem[0]), []); 
  
  const filterByReduce = (data) => data.reduce((acc, elem) => {
    if (typeof elem === 'string') {
      return elem[0].toLowerCase() === 'а' ? acc.concat(elem) : acc;
    }
    return acc;
  }, []);
  
  const forEachByReduce = (data) => data.reduce((acc, elem, i, arr) => { arr[i] = `${i + 1}: ${elem};` }, undefined);