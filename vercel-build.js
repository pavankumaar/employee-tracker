const { execSync } = require('child_process');

// Set environment variables
process.env.CI = 'false';

try {
  console.log('Building React application...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}