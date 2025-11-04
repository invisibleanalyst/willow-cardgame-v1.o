import { NextRequest, NextResponse } from 'next/server';

interface FeedbackData {
  overallRating: number;
  experience: string;
  favoriteAspects: string[];
  improvements: string;
  newFeatures: string;
  wouldRecommend: boolean;
  additionalComments: string;
  email?: string;
  gameStats?: {
    tier: string;
    questionsAnswered: number;
    timeSpent: number;
  };
  timestamp: string;
  userAgent: string;
  ip?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      overallRating,
      experience,
      favoriteAspects,
      improvements,
      newFeatures,
      wouldRecommend,
      additionalComments,
      email,
      gameStats
    } = body;

    // Validate required fields
    if (!overallRating || !experience || !favoriteAspects || !improvements) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare feedback data
    const feedbackData: FeedbackData = {
      overallRating,
      experience,
      favoriteAspects,
      improvements,
      newFeatures,
      wouldRecommend,
      additionalComments,
      email,
      gameStats,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'Unknown',
      ip: request.headers.get('x-forwarded-for') || 
          request.headers.get('x-real-ip') || 
          'Unknown'
    };

    // Log feedback to console (for development)
    console.log('=== NEW FEEDBACK SUBMISSION ===');
    console.log('Rating:', overallRating);
    console.log('Experience:', experience);
    console.log('Favorite Aspects:', favoriteAspects);
    console.log('Improvements:', improvements);
    console.log('New Features:', newFeatures);
    console.log('Would Recommend:', wouldRecommend);
    console.log('Email:', email || 'Not provided');
    console.log('Game Stats:', gameStats);
    console.log('Timestamp:', feedbackData.timestamp);
    console.log('================================');

    // TODO: Store in database (Supabase)
    // const { data, error } = await supabase
    //   .from('user_feedback')
    //   .insert([feedbackData]);

    // TODO: Send email notification to developers
    // if (process.env.DEVELOPER_EMAIL && process.env.RESEND_API_KEY) {
    //   await sendFeedbackNotification(feedbackData);
    // }

    // TODO: Send thank you email to user (if email provided)
    // if (email && process.env.RESEND_API_KEY) {
    //   await sendThankYouEmail(email, feedbackData);
    // }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your feedback! We really appreciate it.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json(
      { error: 'Failed to process feedback' },
      { status: 500 }
    );
  }
}

// Optional: Send feedback notification to developers
async function sendFeedbackNotification(feedbackData: FeedbackData) {
  // Implementation for sending email notifications
  // This would integrate with Resend, SendGrid, or similar service
  console.log('Would send notification email to developers:', feedbackData);
}

// Optional: Send thank you email to user
async function sendThankYouEmail(email: string, feedbackData: FeedbackData) {
  // Implementation for sending thank you email
  console.log('Would send thank you email to:', email);
}
