import mongoose from 'mongoose';
import env from './environment';

class DBClient {
  private url: string;

  constructor() {
    this.url = env.MONGO_URL;
  }

  // Connect to MongoDB securely
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.url);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1);
    }
  }
  // Confirm that the connection is open
  public async isConnected(): Promise<boolean> {
    return mongoose.connection.readyState === 1;
  }
}

const dbClient = new DBClient();
export default dbClient;
