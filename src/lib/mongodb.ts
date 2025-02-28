import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Mock database client for local development
const mockClient = {
  db: () => ({
    collection: () => ({
      find: () => Promise.resolve([]),
      findOne: () => Promise.resolve(null),
      insertOne: () => Promise.resolve({ insertedId: 'mock_id' }),
    }),
  }),
  connect: () => Promise.resolve(),
};

const clientPromise = process.env.MONGODB_URI
  ? new MongoClient(process.env.MONGODB_URI).connect()
  : Promise.resolve(mockClient);

export default clientPromise;
