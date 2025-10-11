'use client';

import { useState, useEffect } from 'react';
import AnswerInputImproved from '@/components/AnswerInputImproved';

export default function TestMicrophonePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  useEffect(() => {
    // Run comprehensive test
    runMicrophoneTest();
  }, []);

  const runMicrophoneTest = async () => {
    const results = {
      userAgent: navigator.userAgent,
      isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isHTTPS: location.protocol === 'https:',
      isLocalhost: location.hostname === 'localhost' || location.hostname === '127.0.0.1',
      hasWebkitSpeechRecognition: 'webkitSpeechRecognition' in window,
      hasSpeechRecognition: 'SpeechRecognition' in window,
      hasSpeechSynthesis: 'speechSynthesis' in window,
      microphonePermission: 'unknown' as 'unknown' | 'granted' | 'denied'
    };

    // Test microphone permission
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        results.microphonePermission = 'granted';
        stream.getTracks().forEach(track => track.stop());
      }
    } catch (error) {
      results.microphonePermission = 'denied';
    }

    setTestResults(results);
  };

  const handleAnswerSubmit = (answer: string) => {
    console.log('Answer submitted:', answer);
    alert(`Answer submitted: "${answer}"`);
  };

  return (
    <div className="min-h-screen bg-willow-dark text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-craftwork-heavy text-4xl text-willow-green mb-4">
            🎤 Microphone Test Page
          </h1>
          <p className="font-craftwork text-willow-gray">
            Test the microphone functionality across different devices and browsers
          </p>
        </div>

        {/* Test Results */}
        {testResults && (
          <div className="bg-willow-gray bg-opacity-10 p-6 rounded-lg mb-8">
            <h3 className="font-craftwork-heavy text-xl text-willow-green mb-4">Test Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-craftwork text-sm">
                  <span className="text-willow-green">Device:</span> {testResults.isMobile ? 'Mobile' : 'Desktop'}
                </p>
                <p className="font-craftwork text-sm">
                  <span className="text-willow-green">HTTPS:</span> {testResults.isHTTPS ? '✅ Yes' : '❌ No'}
                </p>
                <p className="font-craftwork text-sm">
                  <span className="text-willow-green">Localhost:</span> {testResults.isLocalhost ? '✅ Yes' : '❌ No'}
                </p>
                <p className="font-craftwork text-sm">
                  <span className="text-willow-green">Microphone:</span> {
                    testResults.microphonePermission === 'granted' ? '✅ Granted' :
                    testResults.microphonePermission === 'denied' ? '❌ Denied' : '❓ Unknown'
                  }
                </p>
              </div>
              <div>
                <p className="font-craftwork text-sm">
                  <span className="text-willow-green">webkitSpeechRecognition:</span> {testResults.hasWebkitSpeechRecognition ? '✅ Yes' : '❌ No'}
                </p>
                <p className="font-craftwork text-sm">
                  <span className="text-willow-green">SpeechRecognition:</span> {testResults.hasSpeechRecognition ? '✅ Yes' : '❌ No'}
                </p>
                <p className="font-craftwork text-sm">
                  <span className="text-willow-green">SpeechSynthesis:</span> {testResults.hasSpeechSynthesis ? '✅ Yes' : '❌ No'}
                </p>
                <p className="font-craftwork text-sm">
                  <span className="text-willow-green">Overall Support:</span> {
                    (testResults.hasWebkitSpeechRecognition || testResults.hasSpeechRecognition) && 
                    (testResults.isHTTPS || testResults.isLocalhost) && 
                    testResults.microphonePermission === 'granted' ? '✅ Good' : '❌ Limited'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Test Interface */}
        <div className="bg-willow-card-white text-willow-dark p-6 rounded-lg">
          <h3 className="font-craftwork-heavy text-xl mb-4">Test Voice Input</h3>
          <p className="font-craftwork text-sm text-willow-gray mb-6">
            Try the microphone button below. If it works, you should see your speech converted to text.
          </p>
          
          <AnswerInputImproved
            onSubmit={handleAnswerSubmit}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
          />
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-willow-gray bg-opacity-10 p-6 rounded-lg">
          <h3 className="font-craftwork-heavy text-xl text-willow-green mb-4">Testing Instructions</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-willow-green font-bold">1.</span>
              <p className="font-craftwork text-sm">Click the microphone button (green circle)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-willow-green font-bold">2.</span>
              <p className="font-craftwork text-sm">Allow microphone permission if prompted</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-willow-green font-bold">3.</span>
              <p className="font-craftwork text-sm">Speak clearly into your microphone</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-willow-green font-bold">4.</span>
              <p className="font-craftwork text-sm">Your speech should appear as text in the input field</p>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="mt-8 bg-willow-gray bg-opacity-10 p-6 rounded-lg">
          <h3 className="font-craftwork-heavy text-xl text-willow-green mb-4">Troubleshooting</h3>
          <div className="space-y-3">
            <div>
              <p className="font-craftwork text-sm font-medium text-willow-green">If microphone button is disabled:</p>
              <p className="font-craftwork text-sm text-willow-gray">- Use Chrome, Safari, or Edge browser</p>
              <p className="font-craftwork text-sm text-willow-gray">- Ensure you're on HTTPS or localhost</p>
            </div>
            <div>
              <p className="font-craftwork text-sm font-medium text-willow-green">If permission is denied:</p>
              <p className="font-craftwork text-sm text-willow-gray">- Check browser settings for microphone access</p>
              <p className="font-craftwork text-sm text-willow-gray">- Refresh the page and try again</p>
            </div>
            <div>
              <p className="font-craftwork text-sm font-medium text-willow-green">If speech isn't recognized:</p>
              <p className="font-craftwork text-sm text-willow-gray">- Speak louder and more clearly</p>
              <p className="font-craftwork text-sm text-willow-gray">- Check that your microphone is working</p>
              <p className="font-craftwork text-sm text-willow-gray">- Try in a quieter environment</p>
            </div>
          </div>
        </div>

        {/* Back to Game */}
        <div className="text-center mt-8">
          <a
            href="/category-selection"
            className="bg-willow-green hover:bg-willow-green-dark text-willow-dark font-craftwork-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Back to Game
          </a>
        </div>
      </div>
    </div>
  );
}
