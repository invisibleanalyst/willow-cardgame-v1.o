export interface Prompt {
  id: string;
  text: string;
  tier: 'spark' | 'vibe' | 'lockin';
  category: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  categoryType?: 'squad' | 'ride-or-die' | 'both';
}

export const prompts: Record<string, Prompt[]> = {
  spark: [
    // SQUAD VIBES - Teasing, Fun, Embarrassing Secrets
    { id: 's1', text: "What's your wildest group chat secret that would embarrass you if it got out?", tier: 'spark', category: 'Secrets', difficulty: 'easy', categoryType: 'squad' },
    { id: 's2', text: "What's the most embarrassing thing that happened to you this week that we can all laugh about?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's3', text: "What's the cringiest thing you used to do in middle school?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's4', text: "What's the most ridiculous lie you've ever told that actually worked?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's5', text: "What's your most embarrassing autocorrect fail that you wish you could take back?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's6', text: "What's the weirdest thing you do when you think no one is watching?", tier: 'spark', category: 'Quirky', difficulty: 'easy', categoryType: 'squad' },
    { id: 's7', text: "What's the most ridiculous thing you've cried about recently?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's8', text: "What's your most embarrassing celebrity crush that you're too old for?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's9', text: "What's the most overrated thing everyone loves but you secretly hate?", tier: 'spark', category: 'Opinions', difficulty: 'easy', categoryType: 'squad' },
    { id: 's10', text: "What's your most useless talent that you're weirdly proud of?", tier: 'spark', category: 'Quirky', difficulty: 'easy', categoryType: 'squad' },
    
    // RIDE-OR-DIE - Getting to Know Each Other Deeper
    { id: 'r1', text: "What's something about yourself that you think I don't know yet?", tier: 'spark', category: 'Discovery', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r2', text: "What's a childhood memory that shaped who you are today?", tier: 'spark', category: 'Memories', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r3', text: "What's something you're secretly really good at that might surprise me?", tier: 'spark', category: 'Discovery', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r4', text: "What's a fear or insecurity you have that you haven't shared with me?", tier: 'spark', category: 'Vulnerability', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r5', text: "What's something you've always wanted to try but never had the courage to do?", tier: 'spark', category: 'Dreams', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r6', text: "What's a belief or value that's really important to you that I might not know about?", tier: 'spark', category: 'Values', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r7', text: "What's something you're proud of that you've never told me about?", tier: 'spark', category: 'Achievements', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r8', text: "What's a way you've changed or grown recently that you want me to notice?", tier: 'spark', category: 'Growth', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r9', text: "What's something you're curious about me that you've never asked?", tier: 'spark', category: 'Curiosity', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r10', text: "What's a dream or goal you have that you haven't shared with me yet?", tier: 'spark', category: 'Dreams', difficulty: 'easy', categoryType: 'ride-or-die' },
    
    // Additional Squad Vibes Questions
    { id: 's11', text: "What's the most ridiculous thing you've convinced someone of just to see if they'd believe it?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's12', text: "What's your most embarrassing social media post from years ago that still haunts you?", tier: 'spark', category: 'Social', difficulty: 'easy', categoryType: 'squad' },
    { id: 's13', text: "What's the weirdest food combination you actually enjoy that would gross everyone out?", tier: 'spark', category: 'Quirky', difficulty: 'easy', categoryType: 'squad' },
    { id: 's14', text: "What's your most ridiculous fear that you know is totally irrational?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's15', text: "What's the most embarrassing thing you've done for attention or likes?", tier: 'spark', category: 'Social', difficulty: 'easy', categoryType: 'squad' },
    
    // Additional Ride-or-Die Questions
    { id: 'r11', text: "What's something you wish you could tell your past self about relationships?", tier: 'spark', category: 'Wisdom', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r12', text: "What's a way you show love or care that you think I might not notice?", tier: 'spark', category: 'Love', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r13', text: "What's something you're working on improving about yourself right now?", tier: 'spark', category: 'Growth', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r14', text: "What's a quality you admire in others that you wish you had more of?", tier: 'spark', category: 'Self-Reflection', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r15', text: "What's something you're grateful for that you don't usually talk about?", tier: 'spark', category: 'Gratitude', difficulty: 'easy', categoryType: 'ride-or-die' },
  ],

  vibe: [
    // SQUAD VIBES - Deeper Friendship, Support, Vulnerability
    { id: 'vs1', text: "What's something you're struggling with right now that you haven't told anyone?", tier: 'vibe', category: 'Vulnerability', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs2', text: "What's a fear you have that your friends don't know about but you think they'd understand?", tier: 'vibe', category: 'Vulnerability', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs3', text: "What's something you're insecure about that you think we could help each other with?", tier: 'vibe', category: 'Support', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs4', text: "What's a dream or goal you have that you're scared to pursue?", tier: 'vibe', category: 'Dreams', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs5', text: "What's something you've been hiding from us that you think we'd actually support?", tier: 'vibe', category: 'Trust', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs6', text: "What's a way you've changed recently that you want us to notice and celebrate?", tier: 'vibe', category: 'Growth', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs7', text: "What's something you're really proud of but feel weird bragging about?", tier: 'vibe', category: 'Achievements', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs8', text: "What's a belief or value that's really important to you that you think we'd respect?", tier: 'vibe', category: 'Values', difficulty: 'medium', categoryType: 'squad' },
    
    // RIDE-OR-DIE - Deep Connection, Understanding, Intimacy
    { id: 'vr1', text: "What's a small habit of mine that makes you smile?", tier: 'vibe', category: 'Connection', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr2', text: "What's your favorite memory of us together?", tier: 'vibe', category: 'Memories', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr3', text: "What's something you've always wanted to tell me but haven't?", tier: 'vibe', category: 'Deep', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr4', text: "What's your love language and how do you show it?", tier: 'vibe', category: 'Love', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr5', text: "What's the most vulnerable thing you've shared with me?", tier: 'vibe', category: 'Trust', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr6', text: "What's something about me that surprised you when we first met?", tier: 'vibe', category: 'Discovery', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr7', text: "What's a way I make you feel most loved?", tier: 'vibe', category: 'Love', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr8', text: "What's something you've learned about yourself through our relationship?", tier: 'vibe', category: 'Self-Discovery', difficulty: 'medium', categoryType: 'ride-or-die' },
    
    // Additional Vibe Cards for broader compatibility
    { id: 'v16', text: "What's a way I make you feel most loved?", tier: 'vibe', category: 'Love', difficulty: 'medium' },
    { id: 'v17', text: "What's something about me that surprised you when we first met?", tier: 'vibe', category: 'Discovery', difficulty: 'medium' },
    { id: 'v18', text: "What's a challenge we've overcome together that made us stronger?", tier: 'vibe', category: 'Growth', difficulty: 'medium' },
    { id: 'v19', text: "What's your favorite thing about how we handle disagreements?", tier: 'vibe', category: 'Communication', difficulty: 'medium' },
    { id: 'v20', text: "What's something you've learned about yourself through our relationship?", tier: 'vibe', category: 'Self-Discovery', difficulty: 'medium' },
  ],

  lockin: [
    // SQUAD VIBES - Deep Friendship Bonds, Life Support, Unbreakable Trust
    { id: 'ls1', text: "What's the most important thing you've learned about friendship from our group?", tier: 'lockin', category: 'Wisdom', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls2', text: "What's something you've never told anyone that you think we'd understand?", tier: 'lockin', category: 'Secrets', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls3', text: "What's your biggest fear about losing our friendship?", tier: 'lockin', category: 'Fears', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls4', text: "What's the most meaningful way someone in our group has supported you?", tier: 'lockin', category: 'Support', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls5', text: "What's something you want to change about how we support each other?", tier: 'lockin', category: 'Growth', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls6', text: "What's your vision for our friendship in 10 years?", tier: 'lockin', category: 'Future', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls7', text: "What's something you'd never want to lose about our bond?", tier: 'lockin', category: 'Connection', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls8', text: "What's the hardest thing you've had to forgive one of us for?", tier: 'lockin', category: 'Forgiveness', difficulty: 'hard', categoryType: 'squad' },
    
    // RIDE-OR-DIE - Ultimate Intimacy, Life Partnership, Soul Connection
    { id: 'lr1', text: "What's our biggest shared dream?", tier: 'lockin', category: 'Future', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr2', text: "What's the most vulnerable thing you've ever shared with me?", tier: 'lockin', category: 'Intimacy', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr3', text: "What's something you want to change about our relationship?", tier: 'lockin', category: 'Growth', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr4', text: "What's your deepest fear about our future together?", tier: 'lockin', category: 'Fears', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr5', text: "What's the most important lesson you've learned from our relationship?", tier: 'lockin', category: 'Wisdom', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr6', text: "What's your vision for our life together in 10 years?", tier: 'lockin', category: 'Future', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr7', text: "What's something you'd never want to lose about our connection?", tier: 'lockin', category: 'Connection', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr8', text: "What's the hardest thing you've had to forgive me for?", tier: 'lockin', category: 'Forgiveness', difficulty: 'hard', categoryType: 'ride-or-die' },
    
    // Additional Lock-In Cards for broader compatibility
    { id: 'l17', text: "What's the most difficult conversation we've ever had and what did it teach us?", tier: 'lockin', category: 'Communication', difficulty: 'hard' },
    { id: 'l18', text: "What's a way I've helped you heal from past wounds?", tier: 'lockin', category: 'Healing', difficulty: 'hard' },
    { id: 'l19', text: "What's your deepest insecurity and how can I help you overcome it?", tier: 'lockin', category: 'Vulnerability', difficulty: 'hard' },
    { id: 'l20', text: "What's something about our relationship that scares you?", tier: 'lockin', category: 'Fears', difficulty: 'hard' },
    { id: 'l21', text: "What's the most important thing you've learned about love from being with me?", tier: 'lockin', category: 'Love', difficulty: 'hard' },
  ]
};

// Helper function to get random prompts from a tier
export const getRandomPrompts = (tier: 'spark' | 'vibe' | 'lockin', count: number = 5): Prompt[] => {
  const tierPrompts = prompts[tier];
  const shuffled = [...tierPrompts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to get prompts by category
export const getPromptsByCategory = (tier: 'spark' | 'vibe' | 'lockin', category: string): Prompt[] => {
  return prompts[tier].filter(prompt => prompt.category === category);
};

// Helper function to get prompts by difficulty
export const getPromptsByDifficulty = (tier: 'spark' | 'vibe' | 'lockin', difficulty: 'easy' | 'medium' | 'hard'): Prompt[] => {
  return prompts[tier].filter(prompt => prompt.difficulty === difficulty);
};

// Total count of prompts
export const getTotalPromptCount = (): number => {
  return Object.values(prompts).reduce((total, tierPrompts) => total + tierPrompts.length, 0);
};

// Get prompt statistics
export const getPromptStats = () => {
  return {
    spark: prompts.spark.length,
    vibe: prompts.vibe.length,
    lockin: prompts.lockin.length,
    total: getTotalPromptCount()
  };
};