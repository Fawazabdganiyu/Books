import dbClient from "../config/database";
import { Request, Response } from 'express';

export default class AppController {
  static async getStatus(req: Request, res: Response): Promise<void> {
    // Check the database connection status
    const isConnected = dbClient.isConnected();
    if (!isConnected) {
      res.status(500).json({ success: 'false', message: 'Database connection error' });
      return;
    }
    res.status(200).json({ success: 'true', message: 'Database is connected' });
  }
}
