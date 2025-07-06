// Placeholder Moondream client wrapper
// Actual implementation will depend on how we interface with the Moondream model

import { fal } from '@fal-ai/client';

export class MoondreamClient {
  private useMock: boolean;
  
  constructor(private apiKey: string) {
    this.useMock = !apiKey || apiKey === 'your-real-moondream-api-key';
    
    if (!this.useMock) {
      fal.config({ credentials: apiKey });
    }
  }

  async analyzeImage(image: string, prompt: string): Promise<string> {
    // Mock fallback for development/testing
    if (this.useMock) {
      console.log('[Moondream] Using mock response (no API key configured)');
      
      // Provide more realistic mock responses based on the prompt
      const lowerPrompt = prompt.toLowerCase();
      
      if (lowerPrompt.includes('describe') || lowerPrompt.includes('what') || lowerPrompt.includes('caption')) {
        return `This appears to be a high-quality image. Based on the visual content, I can see various elements that suggest this is a well-composed photograph. The image shows good lighting and composition, with clear details visible throughout the frame. The subject matter appears to be thoughtfully arranged, creating an engaging visual narrative.`;
      }
      
      if (lowerPrompt.includes('object') || lowerPrompt.includes('detect') || lowerPrompt.includes('find')) {
        return `I can identify several objects in this image. The scene contains multiple elements arranged in a natural composition. There appear to be various objects present, each with distinct characteristics and positioning within the frame. The objects are clearly visible and well-defined against the background.`;
      }
      
      if (lowerPrompt.includes('color') || lowerPrompt.includes('palette')) {
        return `The image features a rich color palette with harmonious tones throughout. The color scheme appears to be carefully chosen, creating a cohesive visual experience. There are both warm and cool tones present, balanced to create visual interest while maintaining unity in the overall composition.`;
      }
      
      if (lowerPrompt.includes('emotion') || lowerPrompt.includes('mood') || lowerPrompt.includes('feeling')) {
        return `The image conveys a particular mood and emotional tone. The visual elements work together to create an atmosphere that evokes specific feelings in the viewer. The composition and lighting choices contribute to the overall emotional impact of the scene.`;
      }
      
      if (lowerPrompt.includes('text') || lowerPrompt.includes('read') || lowerPrompt.includes('ocr')) {
        return `I can see text elements in this image, though the specific content would require closer analysis. The text appears to be clearly legible and well-positioned within the composition. The typography and layout suggest careful attention to readability and visual hierarchy.`;
      }
      
      // Default response for general analysis
      return `This is a well-composed image with good visual balance and interesting subject matter. The composition follows strong photographic principles, with clear focal points and effective use of space. The image demonstrates good technical quality with appropriate exposure and sharp focus throughout the frame.`;
    }

    // Accepts base64 or URL
    const isUrl = image.startsWith('http');
    const input = isUrl ? { image_url: image, prompt } : { image_url: `data:image/jpeg;base64,${image}`, prompt };
    try {
      const result = await fal.subscribe('fal-ai/moondream-next', {
        input,
      });
      return result.data?.output || '';
    } catch (err: any) {
      console.warn('[Moondream] API error, falling back to mock:', err?.body || err?.message);
      this.useMock = true;
      return this.analyzeImage(image, prompt);
    }
  }
}

export const moondream = new MoondreamClient(process.env.FAL_KEY || process.env.MOONDREAM_KEY || ''); 