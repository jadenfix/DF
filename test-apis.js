#!/usr/bin/env node

const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testAPI(endpoint, method = 'GET', body = null, headers = {}) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();

    console.log(`✅ ${method} ${endpoint} - ${response.status}`);
    return { success: response.ok, data };
  } catch (error) {
    console.log(`❌ ${method} ${endpoint} - Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('🧪 Testing DreamForge APIs...\n');

  // Test status endpoint
  await testAPI('/api/status');

  // Test analyze endpoint with mock data
  await testAPI('/api/analyze', 'POST', {
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    prompt: 'What do you see in this image?'
  });

  // Test feedback endpoint
  await testAPI('/api/feedback', 'POST', {
    analysisId: '507f1f77bcf86cd799439011',
    feedback: 'positive',
    rewardScore: 5,
    comment: 'Great analysis!'
  });

  // Test admin endpoints (should fail without proper auth)
  await testAPI('/api/admin/reward-config', 'GET', null, {
    'x-admin-secret': 'wrong-secret'
  });

  console.log('\n🎉 API tests completed!');
  console.log('\nNext steps:');
  console.log('1. Set up your API keys in .env.local');
  console.log('2. Test with real data');
  console.log('3. Deploy to Vercel');
}

runTests().catch(console.error); 