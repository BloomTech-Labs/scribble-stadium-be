const db = require('../../data/db-config');
const cron = require('node-cron');
cron.schedule = jest.fn()
  .mockImplementation(async (frequency,callback) => { 
    return await callback();
  });

beforeAll(async () => {
  await db('Children-Events').del();
  await db('Notifications').del();
  await require('../../api/cronTasks/notificationScheduler.js');
  return;
});
describe('test does something', () => {
  it('should populate bridge table', async () => {
    await new Promise((r) => setTimeout(r, 1000)); //with all the async and await stuff, not sure why this is needed, but for now it gets this test to pass!
    const data = await db('Children-Events');
    expect(data.length).toBeGreaterThan(10);
  });
});
