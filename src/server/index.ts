// import 'regenerator-runtime/runtime';
// import Server from './server';
import { RedTetris } from './app';

const app = new RedTetris();

app.listen('0.0.0.0', 3000);

// Listen for SIGINT event (e.g., Ctrl+C)
process.on('SIGINT', () => {
  console.info('Received SIGINT. Shutting down gracefully...');
  app.cleanup();
});

process.on('SIGTERM', () => {
  console.info('Received SIGTERM. Shutting down gracefully...');
  app.cleanup();
});
// Listen for the exit event
// process.on('exit', (err) => {
//   console.log('Exiting process...');
//   app.cleanup();
// });
