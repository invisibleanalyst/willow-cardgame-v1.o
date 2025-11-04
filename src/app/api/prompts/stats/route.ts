import { NextRequest, NextResponse } from 'next/server';
import { promptGenerator } from '@/lib/promptGenerator';

export async function GET(request: NextRequest) {
  try {
    const stats = await promptGenerator.getStats();

    return NextResponse.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Error getting prompt stats:', error);
    return NextResponse.json(
      { error: 'Failed to get prompt statistics' },
      { status: 500 }
    );
  }
}
