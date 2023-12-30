import cron from 'node-cron';

// Clear expired intermediate files, temporary files that were generated in processing images and videos.
// Run every 6 hours

cron.schedule('0 */6 * * *', () => {
  console.log('Running a job every 6 hours');
});
