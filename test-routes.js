/**
 * Simple test script to verify backend routes
 * Run with: node test-routes.js
 */

const axios = require('axios');
const baseURL = 'http://localhost:5000';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// Test routes
const routes = [
  { method: 'GET', url: '/api/user/profile', description: 'Get user profile' },
  { method: 'GET', url: '/api/user/trips', description: 'Get user trips' },
  { method: 'GET', url: '/api/blog/posts', description: 'Get all blog posts' },
  { method: 'GET', url: '/api/blog/posts/bali-adventure', description: 'Get blog post by slug' },
  { method: 'GET', url: '/api/blog/categories/adventure', description: 'Get blog posts by category' },
  { method: 'GET', url: '/api/weather?location=Bali', description: 'Get weather data for Bali' },
  { method: 'GET', url: '/api/weather?location=Kyoto', description: 'Get weather data for Kyoto' },
  { method: 'GET', url: '/api/weather?location=Paris', description: 'Get weather data for Paris (generic)' }
];

// Mock auth token for testing
const mockAuthToken = 'mock-auth-token';

// Test a single route
async function testRoute(route) {
  console.log(`${colors.cyan}Testing: ${colors.bright}${route.method} ${route.url}${colors.reset} - ${route.description}`);
  
  try {
    const response = await axios({
      method: route.method.toLowerCase(),
      url: `${baseURL}${route.url}`,
      headers: {
        'Authorization': `Bearer ${mockAuthToken}`
      }
    });
    
    console.log(`${colors.green}✓ Status: ${response.status}${colors.reset}`);
    console.log(`${colors.yellow}Response data:${colors.reset}`, JSON.stringify(response.data, null, 2).substring(0, 150) + '...');
    return true;
  } catch (error) {
    console.log(`${colors.red}✗ Error: ${error.message}${colors.reset}`);
    if (error.response) {
      console.log(`${colors.red}Status: ${error.response.status}${colors.reset}`);
      console.log(`${colors.yellow}Response data:${colors.reset}`, error.response.data);
    }
    return false;
  }
  console.log('\n');
}

// Run all tests
async function runTests() {
  console.log(`${colors.bright}${colors.cyan}=== Testing Travelenda Backend Routes ===${colors.reset}\n`);
  
  let passed = 0;
  let failed = 0;
  
  for (const route of routes) {
    const success = await testRoute(route);
    if (success) passed++;
    else failed++;
    console.log('\n');
  }
  
  console.log(`${colors.bright}${colors.cyan}=== Test Results ===${colors.reset}`);
  console.log(`${colors.green}Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failed}${colors.reset}`);
  console.log(`${colors.cyan}Total: ${routes.length}${colors.reset}`);
}

// Check if server is running before testing
axios.get(`${baseURL}/api/health`)
  .then(() => {
    runTests();
  })
  .catch(error => {
    console.log(`${colors.red}Error: Server not running at ${baseURL}${colors.reset}`);
    console.log(`${colors.yellow}Start the server with:${colors.reset} node server.js`);
  });