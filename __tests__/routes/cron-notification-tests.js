const db = require('../../data/db-config');
const cron = require('node-cron');
jest.mock('node-cron', () => {
    return {
        schedule: jest.fn(),
    };
});
describe('test does something', () => {
    it('should do something', () => {
        cron.schedule.mockImplementation(async (frequency, callback) => await callback());
        require('../../api/cronTasks/scheduler');
        expect(cron.schedule).toBeCalledWith('0 9 * * 5', expect.any(Function));
    });
    it('should populate bridge table', async () => {
        const data = await db('Children-Notifications');
        expect(data).toHaveLength(10);
    });
 })