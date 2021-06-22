const db = require('../../data/db-config');
const cron = require('node-cron');
jest.mock('node-cron', () => {
  return {
    schedule: jest.fn(),
  };
});
beforeAll(async () => {
  return await db('Notifications').del();
});
describe('test does something', () => {
  it('should do something', () => {
    cron.schedule.mockImplementation(
      async (frequency, callback) => await callback());
    require('../../api/cronTasks/notificationScheduler');
    expect(cron.schedule).toBeCalledWith('0 9 * * 5', expect.any(Function));
  });
  it('should populate bridge table', async () => {
    await new Promise(r => setTimeout((r), 1000)); //with all the async and await stuff, not sure why this is needed, but for now it gets this test to pass!
      const data = await db('Children-Notifications');
      expect(data.length).toBeGreaterThan(10);
  });
});
