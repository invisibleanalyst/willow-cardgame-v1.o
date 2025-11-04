import { useState, useCallback } from 'react';

interface Prompt {
  id: string;
  text: string;
  category: 'squad' | 'ride-or-die';
  tier: 'spark' | 'vibe' | 'lockin';
  pack: 'free' | 'premium';
}

interface UsePromptGeneratorReturn {
  generatePrompt: (category: 'squad' | 'ride-or-die', tier: 'spark' | 'vibe' | 'lockin', pack: 'free' | 'premium') => Promise<Prompt | null>;
  markPromptAsUsed: (promptId: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export function usePromptGenerator(): UsePromptGeneratorReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePrompt = useCallback(async (
    category: 'squad' | 'ride-or-die',
    tier: 'spark' | 'vibe' | 'lockin',
    pack: 'free' | 'premium'
  ): Promise<Prompt | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/prompts/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, tier, pack }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate prompt: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate prompt');
      }

      return data.prompt;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error generating prompt:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markPromptAsUsed = useCallback(async (promptId: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/prompts/use', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promptId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to mark prompt as used: ${response.statusText}`);
      }

      const data = await response.json();
      return data.success;
    } catch (err) {
      console.error('Error marking prompt as used:', err);
      return false;
    }
  }, []);

  return {
    generatePrompt,
    markPromptAsUsed,
    isLoading,
    error,
  };
}
