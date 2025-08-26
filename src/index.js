class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(capacity);
    this.size = 0;
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    const buckets = this.buckets[index];

    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i][0] === key) {
        buckets[i][1] = value;
        return;
      }
    }
    // if key doesn't exist ==>  add new pair [key ,value]
    buckets.push([key, value]);
    this.size++;

    if (this.size >= this.capacity * this.loadFactor) {
      this.resize();
    }
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    for (let bucket of oldBuckets) {
      if (bucket) {
        for (let [key, value] of bucket) {
          this.set(key, value);
        }
      }
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) {
      return null;
    }
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    return null;
  }
  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) {
      return false;
    }
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return true;
      }
    }
    return false;
  }
  remove(key) {
    if (this.has(key)) {
      const index = this.hash(key);
      let bucket = this.buckets[index];
      bucket = bucket.filter((elements) => {
        return elements.key != key;
      });
      this.buckets[index] = bucket;
    } else {
      return false;
    }
  }

  length() {
    console.log(this.size);
  }
  clear() {
    this.buckets = {};
    console.log(this.buckets);
  }
  keys() {
    let allKeys = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        for (let [key, value] of bucket) {
          allKeys.push(key);
        }
      }
    }
    return allKeys;
  }

  values() {
    let allValues = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        for (let [key, value] of bucket) {
          allValues.push(value);
        }
      }
    }
    return allValues;
  }
  entries() {
    console.log(this.buckets);
  }
}

//buckets example :
/*
BUCKETS= [
    [0]        [1]
  ["apple",   "red"  ], // FIRST element: [key, value] // and every index of [key,value] 
  ["orange", "orange"], // SECOND element: [key, value]  //has a hash code which is used to
];                                                         //acces each [key,value] pairs
*/
const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.entries());
console.log(test.length());
console.log(test.keys());
console.log(test.values());

