// Hash Map implementation using separate chaining for collision resolution
class HashMap {
  // Initialize the hash map with default capacity and load factor
  constructor(capacity = 16, loadFactor = 0.75) {
    this.loadFactor = loadFactor; // Threshold for resizing (75% full by default)
    this.capacity = capacity; // Number of buckets in the hash table
    this.buckets = new Array(capacity); // Array of buckets to store key-value pairs
    this.size = 0; // Current number of key-value pairs stored
  }
  // Hash function to convert string keys into bucket indices
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31; // Prime number for better hash distribution

    // Calculate hash using polynomial rolling hash algorithm
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode; // Returns index between 0 and capacity-1
  }

  // Insert or update a key-value pair in the hash map
  set(key, value) {
    const index = this.hash(key); // Get bucket index for this key

    // Safety check to ensure index is within bounds
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    // Initialize bucket as empty array if it doesn't exist
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    const buckets = this.buckets[index];
    // Check if key already exists in this bucket (handle collisions)
    for (let i = 0; i < this.buckets.length; i++) {
      if (buckets[i][0] === key) {
        buckets[i][1] = value; // Update existing key's value
        return;
      }
    }
    // if key doesn't exist ==>  add new pair [key ,value]
    buckets.push([key, value]);
    this.size++; // Increment total number of entries
    
    // Check if we need to resize the hash map to maintain performance
    if (this.size >= this.capacity * this.loadFactor) {
      this.resize();
    }
  }

  // Resize the hash map when load factor threshold is exceeded
  resize() {
    const oldBuckets = this.buckets; // Store reference to current buckets
    this.capacity *= 2; // Double the capacity
    this.buckets = new Array(this.capacity); // Create new bucket array
    this.size = 0; // Reset size (will be recalculated during rehashing)

    // Rehash all existing key-value pairs into the new larger bucket array
    for (let bucket of this.buckets) {
      if (bucket) {
        for (let [key, value] of bucket) {
          this.set(key, value); // Rehash each pair with new capacity
        }
      }
    }
  }

  // Retrieve a value by its key (incomplete implementation)
  get(key) {
    //let index = this.hash(key);
    const buckets = this.buckets
    for (let i = 0; i < this.buckets.length; i++){
      
    }
  }
  
  // Check if a key exists in the hash map (placeholder)
  has(key) {}
  
  // Remove a key-value pair from the hash map (placeholder)
  remove(key) {}
  
  // Return the number of key-value pairs (placeholder)
  length() {}
  
  // Remove all key-value pairs from the hash map (placeholder)
  clear() {}
  
  // Return an array of all keys (placeholder)
  keys() {}
  
  // Return an array of all values (placeholder)
  values() {}
  
  // Return an array of all [key, value] pairs (placeholder)
  entries() {}
}
// Example of how buckets store key-value pairs using separate chaining:
/*
BUCKET = [
    [0]        [1]
  ["apple",   "red"  ], // FIRST element: [key, value]
  ["orange", "orange"], // SECOND element: [key, value]
];
*/

// Test code to demonstrate hash map functionality
const testHash = new HashMap();

testHash.set("") // Test with empty string key
console.log(testHash.hash("dna")); // Output the hash value for "dna"
