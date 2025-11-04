import { cleanPrompts, getPromptStats, type Prompt } from './cleanPrompts';

export class PromptManager {
  private static instance: PromptManager;

  private constructor() {
    // Simplified constructor
  }

  public static getInstance(): PromptManager {
    if (!PromptManager.instance) {
      PromptManager.instance = new PromptManager();
    }
    return PromptManager.instance;
  }

  // Get all prompts for a tier
  public getPromptsForTier(tier: 'spark' | 'vibe' | 'lockin'): Prompt[] {
    const squadPrompts = cleanPrompts.squad?.[tier] || [];
    const rideOrDiePrompts = cleanPrompts['ride-or-die']?.[tier] || [];
    return [...squadPrompts, ...rideOrDiePrompts];
  }

  // Get a specific prompt by ID
  public getPromptById(id: string): Prompt | undefined {
    for (const category of Object.values(cleanPrompts)) {
      for (const tier of Object.values(category)) {
        const prompt = tier.find(p => p.id === id);
        if (prompt) return prompt;
      }
    }
    return undefined;
  }

  // Get prompts by category
  public getPromptsByCategory(tier: 'spark' | 'vibe' | 'lockin', category: string): Prompt[] {
    if (category === 'squad' || category === 'ride-or-die') {
      return cleanPrompts[category]?.[tier] || [];
    }
    return [];
  }

  // Get prompts by difficulty
  public getPromptsByDifficulty(tier: 'spark' | 'vibe' | 'lockin', difficulty: 'easy' | 'medium' | 'hard'): Prompt[] {
    const allPrompts = this.getPromptsForTier(tier);
    return allPrompts.filter(prompt => prompt.difficulty === difficulty);
  }

  // Get random prompts from a tier
  public getRandomPrompts(tier: 'spark' | 'vibe' | 'lockin', count: number = 5): Prompt[] {
    const tierPrompts = this.getPromptsForTier(tier);
    const shuffled = [...tierPrompts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Get all categories for a tier
  public getCategoriesForTier(tier: 'spark' | 'vibe' | 'lockin'): string[] {
    return ['squad', 'ride-or-die'];
  }

  // Get statistics
  public getStats() {
    return getPromptStats();
  }

  // Get all prompts (for admin purposes)
  public getAllPrompts(): Record<string, Record<string, Prompt[]>> {
    return { ...cleanPrompts };
  }
}

// Export singleton instance
export const promptManager = PromptManager.getInstance();