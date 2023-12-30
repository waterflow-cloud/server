import cron from 'node-cron';

// Clear expired logs, logs that were generated in processing images and videos.
// Run on the 1st and 15th of every month

cron.schedule('0 0 1,15 * *', () => {
  console.log('Running a job every two weeks');
});
