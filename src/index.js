class HashMap {
  constructor(load_factor = 0.75, capacity = 16) {
    this.load_factor = load_factor;
      this.capacity = capacity;
      this.buckets = new Array(capacity);
      this.size = 0;
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = ( primeNumber * hashCode + key.charCodeAt(i) % this.capacity ) ;
    }
    return hashCode;
  }
  set(key, value) {
    const hash = this.hash;
    const index = hash % this.size;
    const bucket = this.buckets[index];
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
