'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MicrophoneIcon } from './Icons';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
}

export default function AnswerInputImproved({ onSubmit, isRecording, setIsRecording }: AnswerInputProps) {
  const [answer, setAnswer] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [microphonePermission, setMicrophonePermission] = useState<'unknown' | 'granted' | 'denied'>('unknown');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Check if we're on HTTPS or localhost (required for speech recognition)
    const isSecure = location.protocol === 'https:' || 
                    location.hostname === 'localhost' || 
                    location.hostname === '127.0.0.1';
    
    if (!isSecure) {
      setErrorMessage('Speech recognition requires HTTPS or localhost');
      return;
    }

    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setErrorMessage('Speech recognition not supported in this browser');
      return;
    }

    // Initialize speech recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log('Speech recognition started');
      setErrorMessage(null);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setAnswer(transcript);
      setIsRecording(false);
      setErrorMessage(null);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
      
      switch (event.error) {
        case 'not-allowed':
          setErrorMessage('Microphone permission denied. Please allow microphone access.');
          setMicrophonePermission('denied');
          break;
        case 'no-speech':
          setErrorMessage('No speech detected. Please try again.');
          break;
        case 'audio-capture':
          setErrorMessage('No microphone found. Please check your microphone.');
          break;
        case 'network':
          setErrorMessage('Network error. Please check your connection.');
          break;
        default:
          setErrorMessage(`Speech recognition error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    setRecognition(recognition);
    setSpeechSupported(true);

    // Test microphone permission
    testMicrophonePermission();
  }, [setIsRecording]);

  const testMicrophonePermission = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicrophonePermission('granted');
        stream.getTracks().forEach(track => track.stop());
      }
    } catch (error) {
      setMicrophonePermission('denied');
      console.log('Microphone permission test failed:', error);
    }
  };

  const handleVoiceInput = async () => {
    if (!recognition) {
      setErrorMessage('Speech recognition not available');
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      return;
    }

    // Check microphone permission first
    if (microphonePermission === 'denied') {
      setErrorMessage('Microphone permission denied. Please allow microphone access in your browser settings.');
      return;
    }

    // For mobile devices, we need to ensure the user gesture is recent
    try {
      recognition.start();
      setIsRecording(true);
      setErrorMessage(null);
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      setErrorMessage('Failed to start speech recognition. Please try again.');
      setIsRecording(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getMicrophoneButtonState = () => {
    if (!speechSupported) return 'disabled';
    if (microphonePermission === 'denied') return 'denied';
    if (isRecording) return 'recording';
    return 'ready';
  };

  const getMicrophoneButtonText = () => {
    switch (getMicrophoneButtonState()) {
      case 'disabled':
        return 'Not Supported';
      case 'denied':
        return 'Permission Denied';
      case 'recording':
        return 'Listening...';
      default:
        return 'Voice Input';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-6">
        <textarea
          ref={textareaRef}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Share your thoughts..."
          className="w-full h-32 p-4 border border-willow-gray rounded-lg resize-none focus:outline-none focus:border-willow-green text-willow-dark placeholder-willow-gray"
          autoFocus
        />
      </div>

      <div className="flex items-center justify-between">
        {/* Voice input button with improved states */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`voice-button ${isRecording ? 'recording' : ''} ${
            getMicrophoneButtonState() === 'disabled' || getMicrophoneButtonState() === 'denied' 
              ? 'disabled' : ''
          }`}
          disabled={!speechSupported || microphonePermission === 'denied'}
          title={getMicrophoneButtonText()}
        >
          {isRecording ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              <MicrophoneIcon className="w-6 h-6" />
            </motion.div>
          ) : (
            <MicrophoneIcon className="w-6 h-6" />
          )}
        </button>

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={!answer.trim()}
          className="btn-willow disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit Answer
        </motion.button>
      </div>

      {/* Error message */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg"
        >
          <p className="text-red-700 text-sm font-craftwork">{errorMessage}</p>
        </motion.div>
      )}

      {/* Recording indicator */}
      {isRecording && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2 text-willow-green"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="w-3 h-3 bg-red-500 rounded-full"
          />
          <span className="font-craftwork text-sm">Listening... Speak now</span>
        </motion.div>
      )}

      {/* Browser compatibility info */}
      {!speechSupported && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg"
        >
          <p className="text-yellow-700 text-sm font-craftwork">
            Voice input is not supported in this browser. Please use Chrome, Safari, or Edge for the best experience.
          </p>
        </motion.div>
      )}

      {/* Character count */}
      <div className="mt-2 text-right">
        <span className={`font-craftwork text-xs ${answer.length > 200 ? 'text-red-500' : 'text-willow-gray'}`}>
          {answer.length}/200
        </span>
      </div>
    </form>
  );
}
