import { NextRequest, NextResponse } from 'next/server';
import { promptGenerator } from '@/lib/promptGenerator';

export async function POST(request: NextRequest) {
  try {
    const { promptId, userId, sessionId } = await request.json();

    // Validate input
    if (!promptId) {
      return NextResponse.json(
        { error: 'Missing required field: promptId' },
        { status: 400 }
      );
    }

    // Mark prompt as used
    await promptGenerator.markPromptAsUsed(promptId);

    // TODO: Track usage in user_session_prompts table if needed
    // This would require additional database operations

    return NextResponse.json({
      success: true,
      message: 'Prompt marked as used'
    });

  } catch (error) {
    console.error('Error marking prompt as used:', error);
    return NextResponse.json(
      { error: 'Failed to mark prompt as used' },
      { status: 500 }
    );
  }
}
