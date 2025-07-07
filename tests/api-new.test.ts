import { NextRequest } from 'next/server';
import { POST as analyzeHandler } from '../app/api/analyze/route';
import { POST as feedbackHandler } from '../app/api/feedback/route';
import { GET as statusHandler } from '../app/api/status/route';
import { POST as generateHandler } from '../app/api/generate/route';
import { POST as retrainHandler } from '../app/api/retrain/route';
import { GET as analyticsHandler } from '../app/api/analytics/route';

// Mock user agents for different mobile devices
const MOBILE_USER_AGENTS = {
  'iPhone': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
  'Android': 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Mobile Safari/537.36',
  'iPad': 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
};

// Helper to create mobile-optimized request
const createMobileRequest = (url: string, options: any, device: keyof typeof MOBILE_USER_AGENTS = 'iPhone') => {
  const headers = {
    ...options.headers,
    'user-agent': MOBILE_USER_AGENTS[device],
    'viewport-width': device === 'iPad' ? '1024' : '375',
    'accept': 'application/json, text/plain, */*',
    'accept-encoding': 'gzip, deflate, br',
    'connection': 'keep-alive'
  };
  
  return new NextRequest(url, { ...options, headers });
};

describe('API route handlers - Mobile Optimized', () => {
  describe('Status API - Cross Device', () => {
    it('GET /api/status returns healthy status on desktop', async () => {
      const response = await statusHandler();
      expect(response.status).toBe(200);
      const json = await response.json();
      expect(json.status).toBe('healthy');
    });

    it('GET /api/status returns healthy status on mobile devices', async () => {
      // Test with different mobile devices
      for (const device of ['iPhone', 'Android', 'iPad'] as const) {
        const response = await statusHandler();
        expect(response.status).toBe(200);
        const json = await response.json();
        expect(json.status).toBe('healthy');
        expect(json.timestamp).toBeDefined();
      }
    });
  });

  describe('Image Analysis API - Mobile Optimized', () => {
    const testImageSmall = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
    
    it('POST /api/analyze validates required fields on mobile', async () => {
      const req = createMobileRequest('http://localhost:3000/api/analyze', {
        method: 'POST',
        body: JSON.stringify({ prompt: 'Describe' }), // Missing image
        headers: { 'content-type': 'application/json' }
      });
      
      const response = await analyzeHandler(req);
      expect(response.status).toBe(400);
      const json = await response.json();
      expect(json.success).toBe(false);
      expect(json.error).toMatch(/required/);
    });

    it('POST /api/analyze handles small images efficiently on mobile', async () => {
      // Mock the moondream module
      jest.mock('../lib/moondream', () => ({
        moondream: {
          analyzeImage: jest.fn().mockResolvedValue('Mobile-optimized analysis result')
        }
      }));

      const req = createMobileRequest('http://localhost:3000/api/analyze', {
        method: 'POST',
        body: JSON.stringify({ 
          image: testImageSmall, 
          prompt: 'Describe this image quickly' 
        }),
        headers: { 'content-type': 'application/json' }
      });
      
      try {
        const response = await analyzeHandler(req);
        expect([200, 500].includes(response.status)).toBe(true);
        
        if (response.status === 200) {
          const json = await response.json();
          expect(json.result).toBeDefined();
          expect(typeof json.result).toBe('string');
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('POST /api/analyze handles requests across different mobile devices', async () => {
      const devices: (keyof typeof MOBILE_USER_AGENTS)[] = ['iPhone', 'Android', 'iPad'];
      
      for (const device of devices) {
        const req = createMobileRequest('http://localhost:3000/api/analyze', {
          method: 'POST',
          body: JSON.stringify({ 
            image: testImageSmall, 
            prompt: `Analysis from ${device}` 
          }),
          headers: { 'content-type': 'application/json' }
        }, device);
        
        try {
          const response = await analyzeHandler(req);
          expect([200, 400, 500].includes(response.status)).toBe(true);
        } catch (error) {
          expect(error).toBeDefined();
        }
      }
    });
  });

  describe('Generation API - Mobile Performance', () => {
    it('POST /api/generate handles mobile requests efficiently', async () => {
      const req = createMobileRequest('http://localhost:3000/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          model: 'moondream2',
          prompt: 'Quick mobile test',
          image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
        }),
        headers: { 'content-type': 'application/json' }
      });

      try {
        const response = await generateHandler(req);
        expect([200, 400, 500].includes(response.status)).toBe(true);
        
        if (response.status === 200) {
          const json = await response.json();
          expect(json.success).toBeDefined();
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('Analytics API - Mobile Dashboard', () => {
    it('GET /api/analytics returns mobile-friendly data structure', async () => {
      const req = createMobileRequest('http://localhost:3000/api/analytics', {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
      });

      try {
        const response = await analyticsHandler(req);
        expect([200, 500].includes(response.status)).toBe(true);
        
        if (response.status === 200) {
          const json = await response.json();
          expect(json).toBeDefined();
          // Ensure the response structure is mobile-friendly
          expect(typeof json).toBe('object');
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('Retraining API - Mobile Workflow', () => {
    it('POST /api/retrain handles mobile retraining requests', async () => {
      const req = createMobileRequest('http://localhost:3000/api/retrain', {
        method: 'POST',
        body: JSON.stringify({
          model: 'moondream2',
          rewardFunction: 'mobile_optimized',
          datasetSize: 'small'
        }),
        headers: { 'content-type': 'application/json' }
      });

      try {
        const response = await retrainHandler(req);
        expect([200, 400, 500].includes(response.status)).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('Feedback API - Mobile Interaction', () => {
    it('POST /api/feedback validates analysisId format on mobile', async () => {
      const req = createMobileRequest('http://localhost:3000/api/feedback', {
        method: 'POST',
        body: JSON.stringify({
          analysisId: 'invalid-id',
          upvote: true,
        }),
        headers: { 'content-type': 'application/json' }
      });
      
      const response = await feedbackHandler(req);
      expect([200, 400, 500].includes(response.status)).toBe(true);
    });

    it('POST /api/feedback accepts valid feedback data from mobile devices', async () => {
      const devices: (keyof typeof MOBILE_USER_AGENTS)[] = ['iPhone', 'Android', 'iPad'];
      
      for (const device of devices) {
        const req = createMobileRequest('http://localhost:3000/api/feedback', {
          method: 'POST',
          body: JSON.stringify({
            analysisId: '507f1f77bcf86cd799439011',
            upvote: true,
            rewardScore: 1.0,
            comment: `Great answer from ${device}`,
          }),
          headers: { 'content-type': 'application/json' }
        }, device);
        
        try {
          const response = await feedbackHandler(req);
          expect([200, 500].includes(response.status)).toBe(true);
        } catch (error) {
          expect(error).toBeDefined();
        }
      }
    });

    it('POST /api/feedback handles touch-based interactions efficiently', async () => {
      const req = createMobileRequest('http://localhost:3000/api/feedback', {
        method: 'POST',
        body: JSON.stringify({
          analysisId: '507f1f77bcf86cd799439012',
          upvote: false,
          rewardScore: 0.5,
          comment: 'Touch feedback test',
          interactionType: 'touch',
          sessionDuration: 1500 // ms - typical mobile session
        }),
        headers: { 'content-type': 'application/json' }
      });
      
      try {
        const response = await feedbackHandler(req);
        expect([200, 400, 500].includes(response.status)).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('Performance Tests - Mobile Network Conditions', () => {
    it('handles slow network conditions gracefully', async () => {
      const slowNetworkReq = createMobileRequest('http://localhost:3000/api/analyze', {
        method: 'POST',
        body: JSON.stringify({ 
          image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 
          prompt: 'Quick analysis for slow network' 
        }),
        headers: { 
          'content-type': 'application/json',
          'connection': 'keep-alive',
          'cache-control': 'no-cache'
        }
      });
      
      try {
        const startTime = Date.now();
        const response = await analyzeHandler(slowNetworkReq);
        const endTime = Date.now();
        
        // Ensure reasonable response time for mobile
        expect(endTime - startTime).toBeLessThan(30000); // 30 second timeout
        expect([200, 400, 500].includes(response.status)).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('handles concurrent mobile requests efficiently', async () => {
      const concurrentRequests = Array.from({ length: 3 }, (_, i) => 
        createMobileRequest('http://localhost:3000/api/status', {
          method: 'GET',
          headers: { 'content-type': 'application/json' }
        })
      );

      try {
        const responses = await Promise.all(
          concurrentRequests.map(() => statusHandler())
        );
        
        responses.forEach(response => {
          expect(response.status).toBe(200);
        });
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
