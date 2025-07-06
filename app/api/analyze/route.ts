import { NextRequest, NextResponse } from 'next/server';
import { moondream } from '../../../lib/moondream';

export async function POST(request: NextRequest) {
  try {
    let image: string;
    let prompt: string;

    // Check if it's form data or JSON
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const imageFile = formData.get('image') as File;
      prompt = formData.get('prompt') as string;

      if (!imageFile || !prompt) {
        return NextResponse.json(
          { success: false, error: 'Image and prompt are required' },
          { status: 400 }
        );
      }

      // Convert image to base64 for processing
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      image = buffer.toString('base64');
    } else {
      // Handle JSON body
      const body = await request.json();
      image = body.image;
      prompt = body.prompt;

      if (!image || !prompt) {
        return NextResponse.json(
          { success: false, error: 'Image and prompt are required' },
          { status: 400 }
        );
      }
    }

    // Analyze the image
    const result = await moondream.analyzeImage(image, prompt);

    return NextResponse.json({
      success: true,
      result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { success: false, error: 'Analysis failed' },
      { status: 500 }
    );
  }
} 