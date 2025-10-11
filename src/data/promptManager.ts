import { cleanPrompts, getPromptStats, type Prompt } from './cleanPrompts';

export class PromptManager {
  private static instance: PromptManager;
  private allPrompts: Record<string, Record<string, Prompt[]>>;

  private constructor() {
    this.allPrompts = { ...cleanPrompts };
  }

  public static getInstance(): PromptManager {
    if (!PromptManager.instance) {
      PromptManager.instance = new PromptManager();
    }
    return PromptManager.instance;
  }

  // Get all prompts for a tier
  public getPromptsForTier(tier: 'spark' | 'vibe' | 'lockin'): Prompt[] {
    const squadPrompts = this.allPrompts.squad?.[tier] || [];
    const rideOrDiePrompts = this.allPrompts['ride-or-die']?.[tier] || [];
    return [...squadPrompts, ...rideOrDiePrompts];
  }

  // Get a specific prompt by ID
  public getPromptById(id: string): Prompt | undefined {
    for (const category of Object.values(this.allPrompts)) {
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
      return this.allPrompts[category]?.[tier] || [];
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
  public getAllPrompts(): Record<string, Prompt[]> {
    return { ...this.allPrompts };
  }

  // Add a new prompt (for future admin features)
  public addPrompt(tier: 'spark' | 'vibe' | 'lockin', prompt: Omit<Prompt, 'tier'>): void {
    const newPrompt: Prompt = {
      ...prompt,
      tier
    };
    this.allPrompts[tier].push(newPrompt);
  }

  // Update a prompt (for future admin features)
  public updatePrompt(id: string, updates: Partial<Prompt>): boolean {
    for (const tier of Object.values(this.allPrompts)) {
      const index = tier.findIndex(p => p.id === id);
      if (index !== -1) {
        tier[index] = { ...tier[index], ...updates };
        return true;
      }
    }
    return false;
  }

  // Remove a prompt (for future admin features)
  public removePrompt(id: string): boolean {
    for (const tier of Object.values(this.allPrompts)) {
      const index = tier.findIndex(p => p.id === id);
      if (index !== -1) {
        tier.splice(index, 1);
        return true;
      }
    }
    return false;
  }
}

// Export singleton instance
export const promptManager = PromptManager.getInstance();
