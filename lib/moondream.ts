// Official Moondream API client
// https://moondream.ai/c/docs/advanced/api

export class MoondreamClient {
  private apiKey: string;
  private baseUrl = 'https://api.moondream.ai/v1';
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    if (!apiKey || apiKey === 'your-real-moondream-api-key') {
      throw new Error('Valid Moondream API key is required. Please configure MOONDREAM_KEY environment variable.');
    }
  }

  async analyzeImage(image: string, prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Moondream API key is not configured');
    }

    try {
      // Ensure image has proper data URI format
      let imageUrl = image;
      if (!image.startsWith('data:') && !image.startsWith('http')) {
        // Assume it's base64 encoded
        imageUrl = `data:image/jpeg;base64,${image}`;
      }

      // Determine if this is a question or caption request
      const isQuestion = prompt.toLowerCase().includes('?') || 
                        prompt.toLowerCase().includes('what') ||
                        prompt.toLowerCase().includes('how') ||
                        prompt.toLowerCase().includes('where') ||
                        prompt.toLowerCase().includes('why') ||
                        prompt.toLowerCase().includes('when') ||
                        prompt.toLowerCase().includes('who');

      if (isQuestion) {
        // Use Query API for questions
        const response = await fetch(`${this.baseUrl}/query`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Moondream-Auth': this.apiKey,
          },
          body: JSON.stringify({
            image_url: imageUrl,
            question: prompt,
            stream: false
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        if (result.error) {
          throw new Error(result.error.message || 'API error');
        }
        
        return result.answer || '';
      } else {
        // Use Caption API for descriptions
        const response = await fetch(`${this.baseUrl}/caption`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Moondream-Auth': this.apiKey,
          },
          body: JSON.stringify({
            image_url: imageUrl,
            length: 'normal',
            stream: false
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        if (result.error) {
          throw new Error(result.error.message || 'API error');
        }
        
        return result.caption || '';
      }
    } catch (err: any) {
      console.error('[Moondream] API error:', err?.message || err);
      throw new Error(`Moondream API error: ${err?.message || 'Unknown error'}`);
    }
  }

  async caption(image: string, length: 'short' | 'normal' = 'normal'): Promise<string> {
    try {
      let imageUrl = image;
      if (!image.startsWith('data:') && !image.startsWith('http')) {
        imageUrl = `data:image/jpeg;base64,${image}`;
      }

      const response = await fetch(`${this.baseUrl}/caption`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Moondream-Auth': this.apiKey,
        },
        body: JSON.stringify({
          image_url: imageUrl,
          length,
          stream: false
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error.message || 'API error');
      }
      
      return result.caption || '';
    } catch (err: any) {
      console.error('[Moondream] Caption API error:', err?.message || err);
      throw new Error(`Moondream Caption API error: ${err?.message || 'Unknown error'}`);
    }
  }

  async query(image: string, question: string): Promise<string> {
    try {
      let imageUrl = image;
      if (!image.startsWith('data:') && !image.startsWith('http')) {
        imageUrl = `data:image/jpeg;base64,${image}`;
      }

      const response = await fetch(`${this.baseUrl}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Moondream-Auth': this.apiKey,
        },
        body: JSON.stringify({
          image_url: imageUrl,
          question,
          stream: false
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error.message || 'API error');
      }
      
      return result.answer || '';
    } catch (err: any) {
      console.error('[Moondream] Query API error:', err?.message || err);
      throw new Error(`Moondream Query API error: ${err?.message || 'Unknown error'}`);
    }
  }
}

export const moondream = new MoondreamClient(process.env.MOONDREAM_KEY || ''); 