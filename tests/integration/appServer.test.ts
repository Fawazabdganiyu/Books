import request from 'supertest';
import app from '../../src/app'; 
import dbClient from '../../src/config/database';

jest.mock('../../src/config/database', () => ({
  isConnected: jest.fn().mockResolvedValue(true),
}));

describe('Application Server Connection', () => {
  it('should connect to the database successfully', async () => {
    expect(await dbClient.isConnected()).toBe(true);
  });

  it('should start the express server', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
