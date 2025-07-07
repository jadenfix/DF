import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const branch = url.searchParams.get('branch') || 'main';
    const timeRange = url.searchParams.get('timeRange') || '24h';
    
    // Simulate analytics data based on branch and time range
    const getMultiplier = (branchName: string) => {
      switch (branchName) {
        case 'main': return 1.0;
        case 'staging': return 0.3;
        case 'feature/reward-tuning': return 0.15;
        case 'feature/ui-improvements': return 0.1;
        default: return 0.05;
      }
    };
    
    const multiplier = getMultiplier(branch);
    const baseCallCount = 150;
    const baseLatency = 280;
    const baseCost = 0.045;
    
    const analytics = {
      branch,
      timeRange,
      metrics: {
        apiCalls: Math.floor(baseCallCount * multiplier + Math.random() * 20),
        averageLatency: baseLatency + (Math.random() - 0.5) * 50,
        totalCost: baseCost * multiplier + Math.random() * 0.01,
        successRate: 98.5 + Math.random() * 1.5,
        errorRate: 1.5 - Math.random() * 1.5
      },
      recentCalls: generateRecentCalls(branch, 20),
      timestamp: Date.now()
    };
    
    return NextResponse.json(analytics);
    
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

function generateRecentCalls(branch: string, count: number) {
  const endpoints = ['/api/generate', '/api/retrain', '/api/analyze'];
  const models = ['moondream2', 'moondream2-text', 'moondream2-detailed'];
  const calls: any[] = [];
  
  for (let i = 0; i < count; i++) {
    calls.push({
      timestamp: Date.now() - Math.random() * 24 * 60 * 60 * 1000,
      endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
      model: models[Math.floor(Math.random() * models.length)],
      latency: 200 + Math.random() * 300,
      cost: 0.001 + Math.random() * 0.01,
      status: Math.random() > 0.02 ? 'success' : 'error',
      branch: Math.random() > 0.7 ? branch : 'main'
    });
  }
  
  return calls.sort((a, b) => b.timestamp - a.timestamp);
}
