const request = require('supertest');
const app = require('@src/server');

describe('Server', () => {
  it('should start the server and listen on the specified port', async () => {
    const response = await request(app).get('/api/healthcheck');
    expect(response.status).toEqual(200);
  });
});
