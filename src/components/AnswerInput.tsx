'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MicrophoneIcon } from './Icons';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
}

export default function AnswerInput({ onSubmit, isRecording, setIsRecording }: AnswerInputProps) {
  const [answer, setAnswer] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setAnswer(transcript);
        setIsRecording(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognition);
    }
  }, [setIsRecording]);

  const handleVoiceInput = () => {
    if (!recognition) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
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
        {/* Voice input button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`voice-button ${isRecording ? 'recording' : ''}`}
          disabled={!recognition}
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
          >
          </motion.div>
          <span className="font-craftwork text-sm">Listening...</span>
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

