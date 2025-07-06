import Anthropic from '@anthropic-ai/sdk';

// Placeholder for Anthropic client wrapper
// We will flesh this out once the SDK is installed and configured.

export class AnthropicClient {
  private client: Anthropic;
  constructor(private apiKey: string) {
    if (!apiKey) {
      throw new Error('[Anthropic] ANTHROPIC_API_KEY is required.');
    } else {
      this.client = new Anthropic({ apiKey });
    }
  }

  async complete(prompt: string): Promise<string> {
    try {
      const msg = await this.client.messages.create({
        model: 'claude-3-7-sonnet-20250219',
        max_tokens: 512,
        messages: [
          { role: 'user', content: prompt },
        ],
      });
      // Claude 3/4 returns content as array of blocks
      if (Array.isArray(msg.content)) {
        return msg.content.map((c: any) => c.text).join(' ');
      }
      return msg.content || '';
    } catch (err: any) {
      console.error('[Anthropic] API error:', err);
      throw new Error('Anthropic API error: ' + err.message);
    }
  }
}

export const anthropic = new AnthropicClient(process.env.ANTHROPIC_API_KEY || ''); 