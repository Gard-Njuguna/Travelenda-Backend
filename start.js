// Backend server starter script
const { spawn } = require('child_process');
const path = require('path');

// Define colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m'
};

console.log(`${colors.bright}${colors.cyan}Starting Travelenda Backend Server...${colors.reset}\n`);

// Start the server
const server = spawn('node', ['server.js'], {
  cwd: path.resolve(__dirname),
  stdio: 'inherit',
  shell: true
});

server.on('error', (error) => {
  console.error(`${colors.bright}${colors.yellow}Server Error:${colors.reset}`, error);
});

process.on('SIGINT', () => {
  console.log(`\n${colors.bright}${colors.cyan}Shutting down server...${colors.reset}`);
  server.kill('SIGINT');
  process.exit(0);
});