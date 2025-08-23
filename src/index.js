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
    for (let i = 0; i < this.buckets.length; i++) {
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

    for (let bucket of this.buckets) {
      if (bucket) {
        for (let [key, value] of bucket) {
          this.set(key, value);
        }
      }
    }
  }

  get(key) {}
  has(key) {}
  remove(key) {}
  length() {}
  clear() {}
  keys() {}
  values() {}
  entries() {}
}
//buckets example :
BUCKET = [
    [0]        [1]
  ["apple",   "red"  ], // FIRST element: [key, value]
  ["orange", "orange"], // SECOND element: [key, value]
];

const testHash = new HashMap();
console.log(testHash.hash("Andrei"));
