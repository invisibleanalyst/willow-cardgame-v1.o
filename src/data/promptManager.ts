import { prompts, getPromptStats, type Prompt } from './prompts';

export class PromptManager {
  private static instance: PromptManager;
  private allPrompts: Record<string, Prompt[]>;

  private constructor() {
    this.allPrompts = { ...prompts };
  }

  public static getInstance(): PromptManager {
    if (!PromptManager.instance) {
      PromptManager.instance = new PromptManager();
    }
    return PromptManager.instance;
  }

  // Get all prompts for a tier
  public getPromptsForTier(tier: 'spark' | 'vibe' | 'lockin'): Prompt[] {
    return this.allPrompts[tier] || [];
  }

  // Get a specific prompt by ID
  public getPromptById(id: string): Prompt | undefined {
    for (const tier of Object.values(this.allPrompts)) {
      const prompt = tier.find(p => p.id === id);
      if (prompt) return prompt;
    }
    return undefined;
  }

  // Get prompts by category
  public getPromptsByCategory(tier: 'spark' | 'vibe' | 'lockin', category: string): Prompt[] {
    return this.allPrompts[tier].filter(prompt => prompt.category === category);
  }

  // Get prompts by difficulty
  public getPromptsByDifficulty(tier: 'spark' | 'vibe' | 'lockin', difficulty: 'easy' | 'medium' | 'hard'): Prompt[] {
    return this.allPrompts[tier].filter(prompt => prompt.difficulty === difficulty);
  }

  // Get random prompts from a tier
  public getRandomPrompts(tier: 'spark' | 'vibe' | 'lockin', count: number = 5): Prompt[] {
    const tierPrompts = this.allPrompts[tier];
    const shuffled = [...tierPrompts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Get all categories for a tier
  public getCategoriesForTier(tier: 'spark' | 'vibe' | 'lockin'): string[] {
    const categories = new Set(this.allPrompts[tier].map(prompt => prompt.category));
    return Array.from(categories).sort();
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
