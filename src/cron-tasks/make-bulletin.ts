import cron from 'node-cron';

// Check data health and remove the data that is not in consistent.
// Run on every Sunday at 02:00

cron.schedule('0 2 * * *', () => {
  console.log('Running a job at 2 AM every day');
});
