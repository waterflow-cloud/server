import cron from 'node-cron';

// Make bulletin, a weekly report of works.
// Run on every Sunday at 00:00

cron.schedule('0 0 * * 0', () => {
  console.log('Running a job every week');
});
