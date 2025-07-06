import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { width: string; height: string } }) {
  const { width, height } = params;
  const text = req.nextUrl.searchParams.get('text') || 'Placeholder';
  const url = `https://via.placeholder.com/${width}x${height}.png?text=${encodeURIComponent(text)}`;
  return NextResponse.redirect(url, 302);
} 