/**
 * Comprehensive Microphone Functionality Test
 * Tests Web Speech API support across different browsers and devices
 */

console.log('🎤 Comprehensive Microphone Test Starting...\n');

// Test 1: Browser Support Detection
function testBrowserSupport() {
  console.log('📱 Browser Support Test:');
  
  const userAgent = navigator.userAgent;
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isChrome = /Chrome/i.test(userAgent);
  const isSafari = /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent);
  const isFirefox = /Firefox/i.test(userAgent);
  const isEdge = /Edg/i.test(userAgent);
  
  console.log(`- User Agent: ${userAgent}`);
  console.log(`- Mobile Device: ${isMobile ? '✅ Yes' : '❌ No'}`);
  console.log(`- Chrome: ${isChrome ? '✅ Yes' : '❌ No'}`);
  console.log(`- Safari: ${isSafari ? '✅ Yes' : '❌ No'}`);
  console.log(`- Firefox: ${isFirefox ? '✅ Yes' : '❌ No'}`);
  console.log(`- Edge: ${isEdge ? '✅ Yes' : '❌ No'}\n`);
  
  return { isMobile, isChrome, isSafari, isFirefox, isEdge };
}

// Test 2: Web Speech API Support
function testWebSpeechAPI() {
  console.log('🗣️ Web Speech API Support Test:');
  
  const hasWebkitSpeechRecognition = 'webkitSpeechRecognition' in window;
  const hasSpeechRecognition = 'SpeechRecognition' in window;
  const hasSpeechSynthesis = 'speechSynthesis' in window;
  
  console.log(`- webkitSpeechRecognition: ${hasWebkitSpeechRecognition ? '✅ Available' : '❌ Not Available'}`);
  console.log(`- SpeechRecognition: ${hasSpeechRecognition ? '✅ Available' : '❌ Not Available'}`);
  console.log(`- SpeechSynthesis: ${hasSpeechSynthesis ? '✅ Available' : '❌ Not Available'}\n`);
  
  return { hasWebkitSpeechRecognition, hasSpeechRecognition, hasSpeechSynthesis };
}

// Test 3: HTTPS Requirement
function testHTTPSRequirement() {
  console.log('🔒 HTTPS Requirement Test:');
  
  const isHTTPS = location.protocol === 'https:';
  const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  const speechAPIAvailable = isHTTPS || isLocalhost;
  
  console.log(`- Protocol: ${location.protocol}`);
  console.log(`- Hostname: ${location.hostname}`);
  console.log(`- HTTPS: ${isHTTPS ? '✅ Yes' : '❌ No'}`);
  console.log(`- Localhost: ${isLocalhost ? '✅ Yes' : '❌ No'}`);
  console.log(`- Speech API Available: ${speechAPIAvailable ? '✅ Yes' : '❌ No'}\n`);
  
  return speechAPIAvailable;
}

// Test 4: Microphone Permission Test
async function testMicrophonePermission() {
  console.log('🎤 Microphone Permission Test:');
  
  try {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('✅ Microphone access granted');
      stream.getTracks().forEach(track => track.stop());
      return true;
    } else {
      console.log('❌ getUserMedia not supported');
      return false;
    }
  } catch (error) {
    console.log(`❌ Microphone access denied: ${error.message}`);
    return false;
  }
}

// Test 5: Speech Recognition Test
async function testSpeechRecognition() {
  console.log('🎯 Speech Recognition Test:');
  
  return new Promise((resolve) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.log('❌ Speech Recognition not supported');
      resolve(false);
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
      console.log('✅ Speech recognition started');
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log(`✅ Speech recognized: "${transcript}"`);
      resolve(true);
    };
    
    recognition.onerror = (event) => {
      console.log(`❌ Speech recognition error: ${event.error}`);
      resolve(false);
    };
    
    recognition.onend = () => {
      console.log('⏹️ Speech recognition ended');
    };
    
    try {
      recognition.start();
      // Auto-stop after 3 seconds if no speech detected
      setTimeout(() => {
        if (recognition.state === 'started') {
          recognition.stop();
          console.log('⏰ Auto-stopped after 3 seconds');
          resolve(false);
        }
      }, 3000);
    } catch (error) {
      console.log(`❌ Failed to start speech recognition: ${error.message}`);
      resolve(false);
    }
  });
}

// Test 6: Mobile-Specific Issues
function testMobileIssues() {
  console.log('📱 Mobile-Specific Issues Test:');
  
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    console.log('⚠️ Mobile device detected - known issues:');
    console.log('- Android Chrome: Limited support, requires HTTPS');
    console.log('- iOS Safari: Very limited support');
    console.log('- Mobile browsers often block speech recognition');
    console.log('- May require user gesture to activate');
  } else {
    console.log('✅ Desktop device - better speech recognition support');
  }
  
  console.log('');
}

// Main Test Function
async function runComprehensiveTest() {
  console.log('🚀 Starting Comprehensive Microphone Test...\n');
  
  const browserInfo = testBrowserSupport();
  const speechAPI = testWebSpeechAPI();
  const httpsOK = testHTTPSRequirement();
  testMobileIssues();
  
  let microphoneOK = false;
  let speechRecognitionOK = false;
  
  if (httpsOK) {
    microphoneOK = await testMicrophonePermission();
    
    if (microphoneOK && (speechAPI.hasWebkitSpeechRecognition || speechAPI.hasSpeechRecognition)) {
      console.log('🎤 Testing speech recognition (speak now)...');
      speechRecognitionOK = await testSpeechRecognition();
    }
  }
  
  // Final Results
  console.log('📊 FINAL RESULTS:');
  console.log('================');
  console.log(`Browser Support: ${browserInfo.isChrome || browserInfo.isSafari || browserInfo.isEdge ? '✅ Good' : '⚠️ Limited'}`);
  console.log(`HTTPS/Localhost: ${httpsOK ? '✅ Yes' : '❌ No'}`);
  console.log(`Microphone Access: ${microphoneOK ? '✅ Yes' : '❌ No'}`);
  console.log(`Speech Recognition: ${speechRecognitionOK ? '✅ Working' : '❌ Not Working'}`);
  
  if (speechRecognitionOK) {
    console.log('\n🎉 SUCCESS: Microphone feature is working!');
  } else {
    console.log('\n❌ ISSUES FOUND:');
    if (!httpsOK) {
      console.log('- Speech recognition requires HTTPS or localhost');
    }
    if (!microphoneOK) {
      console.log('- Microphone permission denied or not available');
    }
    if (!speechAPI.hasWebkitSpeechRecognition && !speechAPI.hasSpeechRecognition) {
      console.log('- Speech recognition API not supported in this browser');
    }
    if (browserInfo.isMobile) {
      console.log('- Mobile devices have limited speech recognition support');
    }
  }
  
  console.log('\n💡 RECOMMENDATIONS:');
  if (!speechRecognitionOK) {
    console.log('- Consider implementing fallback text input');
    console.log('- Add clear messaging about browser requirements');
    console.log('- Test on multiple devices and browsers');
    console.log('- Consider using a more robust speech recognition service');
  }
}

// Run the test
runComprehensiveTest().catch(console.error);
