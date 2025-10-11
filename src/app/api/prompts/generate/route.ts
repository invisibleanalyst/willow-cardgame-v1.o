import { NextRequest, NextResponse } from 'next/server';
import { promptGenerator } from '@/lib/promptGenerator';

export async function POST(request: NextRequest) {
  try {
    const { category, tier, pack } = await request.json();

    // Validate input
    if (!category || !tier || !pack) {
      return NextResponse.json(
        { error: 'Missing required fields: category, tier, pack' },
        { status: 400 }
      );
    }

    if (!['squad', 'ride-or-die'].includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category. Must be "squad" or "ride-or-die"' },
        { status: 400 }
      );
    }

    if (!['spark', 'vibe', 'lockin'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier. Must be "spark", "vibe", or "lockin"' },
        { status: 400 }
      );
    }

    if (!['free', 'premium'].includes(pack)) {
      return NextResponse.json(
        { error: 'Invalid pack. Must be "free" or "premium"' },
        { status: 400 }
      );
    }

    // Generate prompt
    const prompt = await promptGenerator.generatePrompt(category, tier, pack);

    return NextResponse.json({
      success: true,
      prompt: {
        id: prompt.id,
        text: prompt.text,
        category: prompt.category,
        tier: prompt.tier,
        pack: prompt.pack
      }
    });

  } catch (error) {
    console.error('Error generating prompt:', error);
    return NextResponse.json(
      { error: 'Failed to generate prompt' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tier = searchParams.get('tier');
    const pack = searchParams.get('pack');

    if (!category || !tier || !pack) {
      return NextResponse.json(
        { error: 'Missing required query parameters: category, tier, pack' },
        { status: 400 }
      );
    }

    // Generate prompt
    const prompt = await promptGenerator.generatePrompt(
      category as 'squad' | 'ride-or-die',
      tier as 'spark' | 'vibe' | 'lockin',
      pack as 'free' | 'premium'
    );

    return NextResponse.json({
      success: true,
      prompt: {
        id: prompt.id,
        text: prompt.text,
        category: prompt.category,
        tier: prompt.tier,
        pack: prompt.pack
      }
    });

  } catch (error) {
    console.error('Error generating prompt:', error);
    return NextResponse.json(
      { error: 'Failed to generate prompt' },
      { status: 500 }
    );
  }
}
