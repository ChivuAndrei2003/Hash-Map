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
    const buckets = this.buckets[index];

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }
   
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
    for (let i = 0; i < bucket.length; i++){
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
    for (let i = 0; i < bucket.length; i++){
      if (bucket[i][0] === key) {
        return true;
      } 
    }
    return false;
  }
  remove(key) {   //the index of the bucket to remove
    const index = this.buckets(this.hash(key));
    const tmpBucket = new Array;
    const currBuckets = this.buckets;
    //if(!)
    for (let i = 0; i < currBuckets.length; i++){
      
    }

   // for (let i = 0;i<)

  }
  length() {
    return this.size;
  }
  clear() {}
  keys() {}
  values() {}
  entries() { 
     ;
  }
  /* */
 
}

//buckets example :
/*
BUCKET = [
    [0]        [1]
  ["apple",   "red"  ], // FIRST element: [key, value]
  ["orange", "orange"], // SECOND element: [key, value]
];
*/
const testHash = new HashMap();
 testHash.set("Andrei");

console.log(testHash);
