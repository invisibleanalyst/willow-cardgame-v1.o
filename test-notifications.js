// Test script for notification endpoints
const testFeedback = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        overallRating: 5,
        experience: "Testing notification system - this should appear in your server logs!",
        favoriteAspects: ["User Interface", "Game Mechanics", "Notifications"],
        improvements: "Everything looks great!",
        newFeatures: "Maybe add more categories",
        wouldRecommend: true,
        additionalComments: "This is a TEST notification from the developer to verify the system works",
        email: "test@example.com",
        gameStats: {
          questionsAnswered: 5,
          timeSpent: 300
        }
      })
    });

    const result = await response.json();
    console.log('Feedback API Response:', result);
    return result;
  } catch (error) {
    console.error('Error testing feedback API:', error);
  }
};

const testVIPRequest = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/vip-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: "test@example.com",
        feedback: "Testing VIP request notification system",
        tier: "vip-experience",
        timestamp: new Date().toISOString()
      })
    });

    const result = await response.json();
    console.log('VIP Request API Response:', result);
    return result;
  } catch (error) {
    console.error('Error testing VIP request API:', error);
  }
};

// Run tests
console.log('🧪 Testing Notification System...\n');

testFeedback().then(() => {
  console.log('\n✅ Feedback test completed - check your server console for logs!');
  return testVIPRequest();
}).then(() => {
  console.log('✅ VIP Request test completed - check your server console for logs!');
  console.log('\n🎉 All notification tests completed!');
}).catch(error => {
  console.error('❌ Test failed:', error);
});

