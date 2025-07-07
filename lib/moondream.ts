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
      // Convert image to base64 if it's a URL
      let imageData = image;
      if (image.startsWith('http')) {
        console.log('[Moondream] Converting URL to base64...');
        imageData = await this.urlToBase64(image);
      } else if (!image.startsWith('data:')) {
        // Assume it's already base64 encoded
        imageData = `data:image/jpeg;base64,${image}`;
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
            image_url: imageData,
            question: prompt,
            stream: false
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('[Moondream] Query API error response:', errorText);
          throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
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
            image_url: imageData,
            length: 'normal',
            stream: false
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('[Moondream] Caption API error response:', errorText);
          throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
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

  private async urlToBase64(url: string): Promise<string> {
    try {
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
      console.error('[Moondream] Error converting URL to base64:', error);
      throw new Error(`Failed to convert image URL to base64: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async caption(image: string, length: 'short' | 'normal' = 'normal'): Promise<string> {
    try {
      // Convert image to base64 if it's a URL
      let imageData = image;
      if (image.startsWith('http')) {
        imageData = await this.urlToBase64(image);
      } else if (!image.startsWith('data:')) {
        imageData = `data:image/jpeg;base64,${image}`;
      }

      const response = await fetch(`${this.baseUrl}/caption`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Moondream-Auth': this.apiKey,
        },
        body: JSON.stringify({
          image_url: imageData,
          length,
          stream: false
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Moondream] Caption API error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
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
      // Convert image to base64 if it's a URL
      let imageData = image;
      if (image.startsWith('http')) {
        imageData = await this.urlToBase64(image);
      } else if (!image.startsWith('data:')) {
        imageData = `data:image/jpeg;base64,${image}`;
      }

      const response = await fetch(`${this.baseUrl}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Moondream-Auth': this.apiKey,
        },
        body: JSON.stringify({
          image_url: imageData,
          question,
          stream: false
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Moondream] Query API error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
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