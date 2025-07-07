import { NextRequest, NextResponse } from 'next/server';
import { moondream } from '../../../lib/moondream';

export async function POST(request: NextRequest) {
  try {
    const { prompt, image, modelId, rewardWeights } = await request.json();

    if (!prompt || !image) {
      return NextResponse.json(
        { success: false, error: 'Prompt and image are required' },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    
    // Generate response using Moondream
    const response = await moondream.analyzeImage(image, prompt);
    
    const latency = Date.now() - startTime;

    // Calculate reward score based on weights
    const rewardScore = calculateRewardScore(response, rewardWeights, latency);

    return NextResponse.json({
      success: true,
      result: {
        id: `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        modelId: modelId || 'moondream2',
        prompt,
        response,
        timestamp: Date.now(),
        latency,
        rewardScore
      }
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Generation failed' },
      { status: 500 }
    );
  }
}

function calculateRewardScore(response: string, weights: any = {}, latency: number): number {
  // Default weights if not provided
  const defaultWeights = {
    accuracy: 1.0,
    creativity: 0.8,
    detail: 1.2,
    speed: 0.5,
    visual_quality: 1.0,
    helpfulness: 1.1
  };
  
  const w = { ...defaultWeights, ...weights };
  
  // Simple heuristics for scoring
  const responseLength = response.length;
  const wordCount = response.split(' ').length;
  const hasDetails = wordCount > 20;
  const isCreative = response.toLowerCase().includes('unique') || 
                    response.toLowerCase().includes('interesting') ||
                    response.toLowerCase().includes('creative');
  const isHelpful = response.toLowerCase().includes('appears') ||
                   response.toLowerCase().includes('shows') ||
                   response.toLowerCase().includes('contains');
  
  let score = 0;
  
  // Base accuracy score
  score += w.accuracy * 0.8;
  
  // Detail score
  score += w.detail * (hasDetails ? 1 : 0.5);
  
  // Creativity score
  score += w.creativity * (isCreative ? 1 : 0.6);
  
  // Helpfulness score
  score += w.helpfulness * (isHelpful ? 1 : 0.7);
  
  // Visual quality (simulated)
  score += w.visual_quality * 0.85;
  
  // Speed penalty/bonus
  const speedScore = Math.max(0, 1 - (latency / 5000)); // Penalize if > 5s
  score += w.speed * speedScore;
  
  // Normalize to 0-1 range
  const totalWeight = Object.values(w).reduce((sum: number, weight) => sum + (weight as number), 0) as number;
  return Math.max(0, Math.min(1, score / totalWeight));
}
