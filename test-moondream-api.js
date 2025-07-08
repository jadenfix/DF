// Test script to check Moondream API configuration with base64 conversion
const MOONDREAM_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlfaWQiOiJiODdjN2EwYy0yMDQ2LTQzZGYtOWU3My0wNjY5ODg1NzVmNTQiLCJvcmdfaWQiOiJJbEp2TUZLdUZ2NFpJMmNxa2ZJT0xRZUlCNGJsOE5FcCIsImlhdCI6MTc1MTg4MjUxNCwidmVyIjoxfQ.VWJynTszJS0Pf9ncxtqeHbpZogrvZoyUDGyStcUoi-I';
const BASE_URL = 'https://api.moondream.ai/v1';

async function urlToBase64(url) {
  try {
    console.log('Converting URL to base64:', url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    
    // Try to determine content type from response headers
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error('Error converting URL to base64:', error);
    throw error;
  }
}

async function testMoondreamAPI() {
  try {
    console.log('Testing Moondream API with base64 conversion...');
    
    const testImageUrl = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format';
    const prompt = 'Describe this image';
    
    // Convert URL to base64
    const imageData = await urlToBase64(testImageUrl);
    console.log('Image converted to base64, length:', imageData.length);
    
    console.log('Making request to:', `${BASE_URL}/caption`);
    
    const response = await fetch(`${BASE_URL}/caption`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Moondream-Auth': MOONDREAM_KEY,
      },
      body: JSON.stringify({
        image_url: imageData,
        length: 'normal',
        stream: false
      }),
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('SUCCESS! Response:', result);
    
  } catch (error) {
    console.error('API Test Error:', error);
  }
}

testMoondreamAPI();
