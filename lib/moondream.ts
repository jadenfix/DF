// Placeholder Moondream client wrapper
// Actual implementation will depend on how we interface with the Moondream model

import { fal } from '@fal-ai/client';

export class MoondreamClient {
  constructor(private apiKey: string) {
    if (!apiKey) {
      throw new Error('[Moondream] MOONDREAM_KEY (FAL_KEY) is required.');
    } else {
      fal.config({ credentials: apiKey });
    }
  }

  async analyzeImage(image: string, prompt: string): Promise<string> {
    // Accepts base64 or URL
    const isUrl = image.startsWith('http');
    const input = isUrl ? { image_url: image, prompt } : { image_url: `data:image/jpeg;base64,${image}`, prompt };
    try {
      const result = await fal.subscribe('fal-ai/moondream-next', {
        input,
      });
      return result.data?.output || '';
    } catch (err: any) {
      console.error('[Moondream] API error:', err);
      throw new Error('Moondream API error: ' + err.message);
    }
  }
}

export const moondream = new MoondreamClient(process.env.FAL_KEY || process.env.MOONDREAM_KEY || ''); 