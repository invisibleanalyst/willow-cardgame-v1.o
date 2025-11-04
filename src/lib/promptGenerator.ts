/**
 * AI-Powered Dynamic Prompt Generation System
 * 
 * This system generates unique prompts on-demand using OpenAI,
 * caches them in Supabase, and ensures uniqueness across all prompts.
 */

import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface PromptTemplate {
  id: string;
  category: 'squad' | 'ride-or-die';
  tier: 'spark' | 'vibe' | 'lockin';
  pack: 'free' | 'premium';
  template: string;
  theme: string;
  keywords: string[];
}

export interface GeneratedPrompt {
  id: string;
  text: string;
  category: 'squad' | 'ride-or-die';
  tier: 'spark' | 'vibe' | 'lockin';
  pack: 'free' | 'premium';
  template_id: string;
  generated_at: Date;
  used_count: number;
}

// Core prompt templates - much smaller set to maintain
const PROMPT_TEMPLATES: PromptTemplate[] = [
  // SQUAD - SPARK STAGE (8 templates)
  {
    id: 'squad_spark_1',
    category: 'squad',
    tier: 'spark',
    pack: 'free',
    template: "What's the most unexpected thing you did at a hangout that surprised everyone?",
    theme: 'surprising_moments',
    keywords: ['hangout', 'surprised', 'unexpected', 'everyone']
  },
  {
    id: 'squad_spark_2',
    category: 'squad',
    tier: 'spark',
    pack: 'free',
    template: "What's the weirdest thing you've done when you thought no one was watching?",
    theme: 'quirky_habits',
    keywords: ['weirdest', 'watching', 'quirky', 'habits']
  },
  {
    id: 'squad_spark_3',
    category: 'squad',
    tier: 'spark',
    pack: 'free',
    template: "What's the most ridiculous thing you've convinced someone of just to see if they'd believe it?",
    theme: 'playful_deception',
    keywords: ['ridiculous', 'convinced', 'believe', 'playful']
  },
  {
    id: 'squad_spark_4',
    category: 'squad',
    tier: 'spark',
    pack: 'free',
    template: "What's your most embarrassing autocorrect fail that you wish you could take back?",
    theme: 'tech_fails',
    keywords: ['embarrassing', 'autocorrect', 'tech', 'fail']
  },
  {
    id: 'squad_spark_5',
    category: 'squad',
    tier: 'spark',
    pack: 'free',
    template: "What's the weirdest food combination you actually enjoy that would gross everyone out?",
    theme: 'food_quirks',
    keywords: ['weirdest', 'food', 'combination', 'gross']
  },
  {
    id: 'squad_spark_6',
    category: 'squad',
    tier: 'spark',
    pack: 'free',
    template: "What's the most ridiculous thing you've cried about recently?",
    theme: 'emotional_moments',
    keywords: ['ridiculous', 'cried', 'recently', 'emotional']
  },
  {
    id: 'squad_spark_7',
    category: 'squad',
    tier: 'spark',
    pack: 'free',
    template: "What's your most useless talent that you're weirdly proud of?",
    theme: 'hidden_talents',
    keywords: ['useless', 'talent', 'proud', 'weirdly']
  },
  {
    id: 'squad_spark_8',
    category: 'squad',
    tier: 'spark',
    pack: 'free',
    template: "What's the most overrated thing everyone loves but you secretly hate?",
    theme: 'unpopular_opinions',
    keywords: ['overrated', 'everyone', 'secretly', 'hate']
  },

  // SQUAD - VIBE CHECK (8 templates)
  {
    id: 'squad_vibe_1',
    category: 'squad',
    tier: 'vibe',
    pack: 'free',
    template: "What's something you're struggling with right now that you haven't told anyone?",
    theme: 'personal_struggles',
    keywords: ['struggling', 'haven\'t told', 'personal', 'support']
  },
  {
    id: 'squad_vibe_2',
    category: 'squad',
    tier: 'vibe',
    pack: 'free',
    template: "What's a fear you have that your friends don't know about but you think they'd understand?",
    theme: 'hidden_fears',
    keywords: ['fear', 'friends', 'understand', 'hidden']
  },
  {
    id: 'squad_vibe_3',
    category: 'squad',
    tier: 'vibe',
    pack: 'free',
    template: "What's something you're really proud of but feel weird bragging about?",
    theme: 'quiet_achievements',
    keywords: ['proud', 'bragging', 'achievement', 'quiet']
  },
  {
    id: 'squad_vibe_4',
    category: 'squad',
    tier: 'vibe',
    pack: 'free',
    template: "What's a way you've changed recently that you want everyone to notice and celebrate?",
    theme: 'personal_growth',
    keywords: ['changed', 'recently', 'notice', 'celebrate']
  },
  {
    id: 'squad_vibe_5',
    category: 'squad',
    tier: 'vibe',
    pack: 'free',
    template: "What's the most meaningful way someone has supported you when you needed it most?",
    theme: 'support_systems',
    keywords: ['meaningful', 'supported', 'needed', 'support']
  },
  {
    id: 'squad_vibe_6',
    category: 'squad',
    tier: 'vibe',
    pack: 'free',
    template: "What's something you've learned about friendship that you think everyone should know?",
    theme: 'friendship_wisdom',
    keywords: ['learned', 'friendship', 'everyone', 'wisdom']
  },
  {
    id: 'squad_vibe_7',
    category: 'squad',
    tier: 'vibe',
    pack: 'free',
    template: "What's your biggest fear about losing the people who matter most to you?",
    theme: 'relationship_fears',
    keywords: ['biggest fear', 'losing', 'matter most', 'relationships']
  },
  {
    id: 'squad_vibe_8',
    category: 'squad',
    tier: 'vibe',
    pack: 'free',
    template: "What's something you'd never want to lose about the connections you have with people?",
    theme: 'cherished_connections',
    keywords: ['never want to lose', 'connections', 'people', 'cherished']
  },

  // SQUAD - LOCK-IN LEVEL (8 templates)
  {
    id: 'squad_lockin_1',
    category: 'squad',
    tier: 'lockin',
    pack: 'free',
    template: "What's the most vulnerable thing you've never told anyone that you think people would understand?",
    theme: 'deep_vulnerability',
    keywords: ['vulnerable', 'never told', 'understand', 'deep']
  },
  {
    id: 'squad_lockin_2',
    category: 'squad',
    tier: 'lockin',
    pack: 'free',
    template: "What's a way you've helped someone through their darkest time that you're most proud of?",
    theme: 'supporting_others',
    keywords: ['helped', 'darkest time', 'proud', 'supporting']
  },
  {
    id: 'squad_lockin_3',
    category: 'squad',
    tier: 'lockin',
    pack: 'free',
    template: "What's something you've learned about yourself through your relationships with others?",
    theme: 'self_discovery',
    keywords: ['learned about yourself', 'relationships', 'others', 'self-discovery']
  },
  {
    id: 'squad_lockin_4',
    category: 'squad',
    tier: 'lockin',
    pack: 'free',
    template: "What's your vision for the relationships that matter most to you in 10 years?",
    theme: 'future_relationships',
    keywords: ['vision', 'relationships', '10 years', 'future']
  },
  {
    id: 'squad_lockin_5',
    category: 'squad',
    tier: 'lockin',
    pack: 'free',
    template: "What's the hardest thing you've had to forgive someone for, and what did it teach you?",
    theme: 'forgiveness_lessons',
    keywords: ['hardest', 'forgive', 'taught', 'lessons']
  },
  {
    id: 'squad_lockin_6',
    category: 'squad',
    tier: 'lockin',
    pack: 'free',
    template: "What's something you're grateful for about the people in your life that you don't usually say?",
    theme: 'unspoken_gratitude',
    keywords: ['grateful', 'people in your life', 'don\'t usually say', 'unspoken']
  },
  {
    id: 'squad_lockin_7',
    category: 'squad',
    tier: 'lockin',
    pack: 'free',
    template: "What's a challenge you've overcome with others that made you stronger?",
    theme: 'shared_challenges',
    keywords: ['challenge', 'overcome', 'others', 'stronger']
  },
  {
    id: 'squad_lockin_8',
    category: 'squad',
    tier: 'lockin',
    pack: 'free',
    template: "What's your favorite thing about how you handle disagreements with people you care about?",
    theme: 'conflict_resolution',
    keywords: ['favorite thing', 'handle disagreements', 'care about', 'conflict']
  },

  // RIDE OR DIE - SPARK STAGE (8 templates)
  {
    id: 'ride_spark_1',
    category: 'ride-or-die',
    tier: 'spark',
    pack: 'free',
    template: "What's something about yourself that you think I don't know yet?",
    theme: 'discovery',
    keywords: ['about yourself', 'don\'t know yet', 'discovery', 'secrets']
  },
  {
    id: 'ride_spark_2',
    category: 'ride-or-die',
    tier: 'spark',
    pack: 'free',
    template: "What's a small moment in our relationship that still makes you smile?",
    theme: 'cherished_moments',
    keywords: ['small moment', 'our relationship', 'makes you smile', 'cherished']
  },
  {
    id: 'ride_spark_3',
    category: 'ride-or-die',
    tier: 'spark',
    pack: 'free',
    template: "What's a quirky habit of mine you secretly love?",
    theme: 'loving_quirks',
    keywords: ['quirky habit', 'secretly love', 'quirks', 'love']
  },
  {
    id: 'ride_spark_4',
    category: 'ride-or-die',
    tier: 'spark',
    pack: 'free',
    template: "What's something you're curious about me that you've never asked?",
    theme: 'curiosity',
    keywords: ['curious about me', 'never asked', 'curiosity', 'questions']
  },
  {
    id: 'ride_spark_5',
    category: 'ride-or-die',
    tier: 'spark',
    pack: 'free',
    template: "What's a way I make you feel most loved?",
    theme: 'love_languages',
    keywords: ['make you feel', 'most loved', 'love languages', 'affection']
  },
  {
    id: 'ride_spark_6',
    category: 'ride-or-die',
    tier: 'spark',
    pack: 'free',
    template: "What's something you've learned about yourself since we've been together?",
    theme: 'self_growth',
    keywords: ['learned about yourself', 'since we\'ve been together', 'self-growth', 'development']
  },
  {
    id: 'ride_spark_7',
    category: 'ride-or-die',
    tier: 'spark',
    pack: 'free',
    template: "What's a memory of us that you think about often?",
    theme: 'fond_memories',
    keywords: ['memory of us', 'think about often', 'fond memories', 'nostalgia']
  },
  {
    id: 'ride_spark_8',
    category: 'ride-or-die',
    tier: 'spark',
    pack: 'free',
    template: "What's something about our relationship that makes you feel most secure?",
    theme: 'security',
    keywords: ['our relationship', 'feel most secure', 'security', 'stability']
  },

  // RIDE OR DIE - VIBE CHECK (8 templates)
  {
    id: 'ride_vibe_1',
    category: 'ride-or-die',
    tier: 'vibe',
    pack: 'free',
    template: "What's your favorite memory of us together?",
    theme: 'shared_memories',
    keywords: ['favorite memory', 'us together', 'shared memories', 'special moments']
  },
  {
    id: 'ride_vibe_2',
    category: 'ride-or-die',
    tier: 'vibe',
    pack: 'free',
    template: "What's something you've always wanted to tell me but haven't?",
    theme: 'unspoken_truths',
    keywords: ['always wanted to tell me', 'haven\'t', 'unspoken truths', 'communication']
  },
  {
    id: 'ride_vibe_3',
    category: 'ride-or-die',
    tier: 'vibe',
    pack: 'free',
    template: "What's your love language and how do you show it?",
    theme: 'love_expression',
    keywords: ['love language', 'how do you show it', 'love expression', 'affection']
  },
  {
    id: 'ride_vibe_4',
    category: 'ride-or-die',
    tier: 'vibe',
    pack: 'free',
    template: "What's the most vulnerable thing you've shared with me?",
    theme: 'vulnerability',
    keywords: ['most vulnerable thing', 'shared with me', 'vulnerability', 'trust']
  },
  {
    id: 'ride_vibe_5',
    category: 'ride-or-die',
    tier: 'vibe',
    pack: 'free',
    template: "What's something about me that surprised you when we first met?",
    theme: 'first_impressions',
    keywords: ['about me', 'surprised you', 'first met', 'first impressions']
  },
  {
    id: 'ride_vibe_6',
    category: 'ride-or-die',
    tier: 'vibe',
    pack: 'free',
    template: "What's a challenge we've overcome together that made us stronger?",
    theme: 'shared_growth',
    keywords: ['challenge', 'overcome together', 'made us stronger', 'shared growth']
  },
  {
    id: 'ride_vibe_7',
    category: 'ride-or-die',
    tier: 'vibe',
    pack: 'free',
    template: "What's your favorite thing about how we handle disagreements?",
    theme: 'conflict_resolution',
    keywords: ['favorite thing', 'how we handle disagreements', 'conflict resolution', 'communication']
  },
  {
    id: 'ride_vibe_8',
    category: 'ride-or-die',
    tier: 'vibe',
    pack: 'free',
    template: "What's something you're grateful for about our relationship that you don't usually say?",
    theme: 'unspoken_gratitude',
    keywords: ['grateful for', 'our relationship', 'don\'t usually say', 'unspoken gratitude']
  },

  // RIDE OR DIE - LOCK-IN LEVEL (8 templates)
  {
    id: 'ride_lockin_1',
    category: 'ride-or-die',
    tier: 'lockin',
    pack: 'free',
    template: "What's our biggest shared dream?",
    theme: 'shared_dreams',
    keywords: ['biggest shared dream', 'our dreams', 'future together', 'aspirations']
  },
  {
    id: 'ride_lockin_2',
    category: 'ride-or-die',
    tier: 'lockin',
    pack: 'free',
    template: "What's the most vulnerable thing you've ever shared with me?",
    theme: 'deep_vulnerability',
    keywords: ['most vulnerable thing', 'ever shared with me', 'deep vulnerability', 'intimacy']
  },
  {
    id: 'ride_lockin_3',
    category: 'ride-or-die',
    tier: 'lockin',
    pack: 'free',
    template: "What's something you want to change about our relationship?",
    theme: 'relationship_growth',
    keywords: ['want to change', 'our relationship', 'relationship growth', 'improvement']
  },
  {
    id: 'ride_lockin_4',
    category: 'ride-or-die',
    tier: 'lockin',
    pack: 'free',
    template: "What's your deepest fear about our future together?",
    theme: 'future_fears',
    keywords: ['deepest fear', 'our future together', 'future fears', 'anxiety']
  },
  {
    id: 'ride_lockin_5',
    category: 'ride-or-die',
    tier: 'lockin',
    pack: 'free',
    template: "What's the most important lesson you've learned from our relationship?",
    theme: 'relationship_lessons',
    keywords: ['most important lesson', 'learned from our relationship', 'lessons', 'wisdom']
  },
  {
    id: 'ride_lockin_6',
    category: 'ride-or-die',
    tier: 'lockin',
    pack: 'free',
    template: "What's your vision for our life together in 10 years?",
    theme: 'future_vision',
    keywords: ['vision', 'our life together', '10 years', 'future vision']
  },
  {
    id: 'ride_lockin_7',
    category: 'ride-or-die',
    tier: 'lockin',
    pack: 'free',
    template: "What's something you'd never want to lose about our connection?",
    theme: 'cherished_connection',
    keywords: ['never want to lose', 'our connection', 'cherished connection', 'bond']
  },
  {
    id: 'ride_lockin_8',
    category: 'ride-or-die',
    tier: 'lockin',
    pack: 'free',
    template: "What's the hardest thing you've had to forgive me for?",
    theme: 'forgiveness',
    keywords: ['hardest thing', 'had to forgive me', 'forgiveness', 'healing']
  },

  // PREMIUM RIDE OR DIE TEMPLATES (24 templates for 335 prompts)
  // Spark Premium (8 templates)
  {
    id: 'ride_premium_spark_1',
    category: 'ride-or-die',
    tier: 'spark',
    pack: 'premium',
    template: "What's the moment you knew you wanted to spend the rest of your life with me?",
    theme: 'defining_moments',
    keywords: ['moment you knew', 'rest of your life', 'defining moments', 'commitment']
  },
  {
    id: 'ride_premium_spark_2',
    category: 'ride-or-die',
    tier: 'spark',
    pack: 'premium',
    template: "What's a dream you have for us that you haven't shared yet?",
    theme: 'unshared_dreams',
    keywords: ['dream you have for us', 'haven\'t shared yet', 'unshared dreams', 'aspirations']
  },
  {
    id: 'ride_premium_spark_3',
    category: 'ride-or-die',
    tier: 'spark',
    pack: 'premium',
    template: "What's something about our relationship that makes you feel most alive?",
    theme: 'vitality',
    keywords: ['our relationship', 'feel most alive', 'vitality', 'passion']
  },
  {
    id: 'ride_premium_spark_4',
    category: 'ride-or-die',
    tier: 'spark',
    pack: 'premium',
    template: "What's a way I've helped you become a better person?",
    theme: 'personal_development',
    keywords: ['helped you become', 'better person', 'personal development', 'growth']
  },
  {
    id: 'ride_premium_spark_5',
    category: 'ride-or-die',
    tier: 'spark',
    pack: 'premium',
    template: "What's something you've discovered about love through being with me?",
    theme: 'love_discovery',
    keywords: ['discovered about love', 'through being with me', 'love discovery', 'understanding']
  },
  {
    id: 'ride_premium_spark_6',
    category: 'ride-or-die',
    tier: 'spark',
    pack: 'premium',
    template: "What's a way we've grown together that you're most proud of?",
    theme: 'shared_growth',
    keywords: ['grown together', 'most proud of', 'shared growth', 'achievement']
  },
  {
    id: 'ride_premium_spark_7',
    category: 'ride-or-die',
    tier: 'spark',
    pack: 'premium',
    template: "What's something about me that you admire but don't tell me enough?",
    theme: 'unspoken_admiration',
    keywords: ['about me', 'admire but don\'t tell me enough', 'unspoken admiration', 'appreciation']
  },
  {
    id: 'ride_premium_spark_8',
    category: 'ride-or-die',
    tier: 'spark',
    pack: 'premium',
    template: "What's a way I make you feel most secure in our relationship?",
    theme: 'security',
    keywords: ['make you feel most secure', 'our relationship', 'security', 'safety']
  },

  // Vibe Premium (8 templates)
  {
    id: 'ride_premium_vibe_1',
    category: 'ride-or-die',
    tier: 'vibe',
    pack: 'premium',
    template: "What's the most important thing you've learned about love from being with me?",
    theme: 'love_wisdom',
    keywords: ['most important thing', 'learned about love', 'being with me', 'love wisdom']
  },
  {
    id: 'ride_premium_vibe_2',
    category: 'ride-or-die',
    tier: 'vibe',
    pack: 'premium',
    template: "What's a way I've helped you heal from past wounds?",
    theme: 'healing',
    keywords: ['helped you heal', 'past wounds', 'healing', 'recovery']
  },
  {
    id: 'ride_premium_vibe_3',
    category: 'ride-or-die',
    tier: 'vibe',
    pack: 'premium',
    template: "What's something about our relationship that scares you?",
    theme: 'relationship_fears',
    keywords: ['our relationship', 'scares you', 'relationship fears', 'anxiety']
  },
  {
    id: 'ride_premium_vibe_4',
    category: 'ride-or-die',
    tier: 'vibe',
    pack: 'premium',
    template: "What's a way you've changed because of our relationship?",
    theme: 'transformation',
    keywords: ['changed because of', 'our relationship', 'transformation', 'growth']
  },
  {
    id: 'ride_premium_vibe_5',
    category: 'ride-or-die',
    tier: 'vibe',
    pack: 'premium',
    template: "What's something you've learned about yourself through our relationship?",
    theme: 'self_discovery',
    keywords: ['learned about yourself', 'through our relationship', 'self-discovery', 'understanding']
  },
  {
    id: 'ride_premium_vibe_6',
    category: 'ride-or-die',
    tier: 'vibe',
    pack: 'premium',
    template: "What's a way we've supported each other that you're most grateful for?",
    theme: 'mutual_support',
    keywords: ['supported each other', 'most grateful for', 'mutual support', 'gratitude']
  },
  {
    id: 'ride_premium_vibe_7',
    category: 'ride-or-die',
    tier: 'vibe',
    pack: 'premium',
    template: "What's something about our relationship that makes you feel most alive?",
    theme: 'vitality',
    keywords: ['our relationship', 'feel most alive', 'vitality', 'passion']
  },
  {
    id: 'ride_premium_vibe_8',
    category: 'ride-or-die',
    tier: 'vibe',
    pack: 'premium',
    template: "What's a way I make you feel most loved and understood?",
    theme: 'love_understanding',
    keywords: ['make you feel most loved', 'understood', 'love understanding', 'connection']
  },

  // Lock-In Premium (8 templates)
  {
    id: 'ride_premium_lockin_1',
    category: 'ride-or-die',
    tier: 'lockin',
    pack: 'premium',
    template: "What's a dream we've never shared that could change our future together?",
    theme: 'unshared_dreams',
    keywords: ['dream we\'ve never shared', 'change our future together', 'unshared dreams', 'possibilities']
  },
  {
    id: 'ride_premium_lockin_2',
    category: 'ride-or-die',
    tier: 'lockin',
    pack: 'premium',
    template: "What's the most difficult conversation we've ever had and what did it teach us?",
    theme: 'difficult_conversations',
    keywords: ['most difficult conversation', 'ever had', 'taught us', 'growth']
  },
  {
    id: 'ride_premium_lockin_3',
    category: 'ride-or-die',
    tier: 'lockin',
    pack: 'premium',
    template: "What's your deepest insecurity and how can I help you overcome it?",
    theme: 'deep_insecurity',
    keywords: ['deepest insecurity', 'help you overcome it', 'deep insecurity', 'support']
  },
  {
    id: 'ride_premium_lockin_4',
    category: 'ride-or-die',
    tier: 'lockin',
    pack: 'premium',
    template: "What's something about our relationship that you're most proud of?",
    theme: 'relationship_pride',
    keywords: ['our relationship', 'most proud of', 'relationship pride', 'achievement']
  },
  {
    id: 'ride_premium_lockin_5',
    category: 'ride-or-die',
    tier: 'lockin',
    pack: 'premium',
    template: "What's a way we've grown together that you never expected?",
    theme: 'unexpected_growth',
    keywords: ['grown together', 'never expected', 'unexpected growth', 'surprise']
  },
  {
    id: 'ride_premium_lockin_6',
    category: 'ride-or-die',
    tier: 'lockin',
    pack: 'premium',
    template: "What's something about our love that you think is unique?",
    theme: 'unique_love',
    keywords: ['our love', 'think is unique', 'unique love', 'special']
  },
  {
    id: 'ride_premium_lockin_7',
    category: 'ride-or-die',
    tier: 'lockin',
    pack: 'premium',
    template: "What's a way I've helped you become the person you always wanted to be?",
    theme: 'self_actualization',
    keywords: ['helped you become', 'person you always wanted to be', 'self-actualization', 'fulfillment']
  },
  {
    id: 'ride_premium_lockin_8',
    category: 'ride-or-die',
    tier: 'lockin',
    pack: 'premium',
    template: "What's something about our future together that excites you most?",
    theme: 'future_excitement',
    keywords: ['our future together', 'excites you most', 'future excitement', 'anticipation']
  }
];

export class PromptGenerator {
  private static instance: PromptGenerator;
  private generatedPrompts: Map<string, GeneratedPrompt> = new Map();

  private constructor() {}

  public static getInstance(): PromptGenerator {
    if (!PromptGenerator.instance) {
      PromptGenerator.instance = new PromptGenerator();
    }
    return PromptGenerator.instance;
  }

  /**
   * Generate a unique prompt using AI based on template
   */
  async generatePrompt(
    category: 'squad' | 'ride-or-die',
    tier: 'spark' | 'vibe' | 'lockin',
    pack: 'free' | 'premium'
  ): Promise<GeneratedPrompt> {
    // First, try to get an existing unused prompt from cache
    const cachedPrompt = await this.getCachedPrompt(category, tier, pack);
    if (cachedPrompt) {
      return cachedPrompt;
    }

    // Get template for this category/tier/pack
    const template = this.getTemplate(category, tier, pack);
    if (!template) {
      throw new Error(`No template found for ${category}/${tier}/${pack}`);
    }

    // Generate new prompt using AI
    const generatedText = await this.generateWithAI(template);
    
    // Check for uniqueness
    const isUnique = await this.checkUniqueness(generatedText);
    if (!isUnique) {
      // If not unique, generate again with variation
      return this.generatePrompt(category, tier, pack);
    }

    // Create and store the prompt
    const prompt: GeneratedPrompt = {
      id: this.generateId(),
      text: generatedText,
      category,
      tier,
      pack,
      template_id: template.id,
      generated_at: new Date(),
      used_count: 0
    };

    // Store in database
    await this.storePrompt(prompt);
    
    return prompt;
  }

  /**
   * Get a cached prompt that hasn't been used recently
   */
  private async getCachedPrompt(
    category: 'squad' | 'ride-or-die',
    tier: 'spark' | 'vibe' | 'lockin',
    pack: 'free' | 'premium'
  ): Promise<GeneratedPrompt | null> {
    const { data, error } = await supabase
      .from('generated_prompts')
      .select('*')
      .eq('category', category)
      .eq('tier', tier)
      .eq('pack', pack)
      .eq('used_count', 0)
      .order('generated_at', { ascending: true })
      .limit(1);

    if (error || !data || data.length === 0) {
      return null;
    }

    return data[0] as GeneratedPrompt;
  }

  /**
   * Get template for category/tier/pack combination
   */
  private getTemplate(
    category: 'squad' | 'ride-or-die',
    tier: 'spark' | 'vibe' | 'lockin',
    pack: 'free' | 'premium'
  ): PromptTemplate | null {
    const templates = PROMPT_TEMPLATES.filter(
      t => t.category === category && t.tier === tier && t.pack === pack
    );
    
    if (templates.length === 0) {
      return null;
    }

    // Return random template from available ones
    return templates[Math.floor(Math.random() * templates.length)];
  }

  /**
   * Generate prompt text using OpenAI
   */
  private async generateWithAI(template: PromptTemplate): Promise<string> {
    const systemPrompt = this.getSystemPrompt(template);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Generate a unique prompt based on this template: "${template.template}"`
        }
      ],
      max_tokens: 100,
      temperature: 0.8
    });

    return completion.choices[0]?.message?.content?.trim() || template.template;
  }

  /**
   * Get system prompt for AI generation
   */
  private getSystemPrompt(template: PromptTemplate): string {
    if (template.category === 'squad') {
      return `You are generating prompts for the "Squad" category - platonic friendships. 
      Create engaging, individual-focused questions that naturally invite laughter through personal anecdotes.
      Avoid cringeworthy terms like "crew" or "group". Don't directly ask for funny actions.
      Focus on surprising, quirky, or unexpected moments that would make people laugh naturally.
      Use "you" or "everyone" instead of group-focused language.
      Keep the same theme and structure as the template but make it unique.`;
    } else {
      return `You are generating prompts for the "Ride or Die" category - deep romantic relationships.
      Create prompts that blend profound connection with occasional playful romance.
      Use couple-specific terms like "our relationship", "our bond", "together".
      Focus on intimacy, love, partnership, and deep emotional connection.
      Mix serious romantic moments with light, playful romantic moments.
      Keep the same theme and structure as the template but make it unique.`;
    }
  }

  /**
   * Check if generated text is unique
   */
  private async checkUniqueness(text: string): Promise<boolean> {
    const normalizedText = text.toLowerCase().replace(/\s+/g, ' ').trim();
    
    const { data, error } = await supabase
      .from('generated_prompts')
      .select('id')
      .ilike('text', normalizedText);

    if (error) {
      console.error('Error checking uniqueness:', error);
      return false;
    }

    return data.length === 0;
  }

  /**
   * Store generated prompt in database
   */
  private async storePrompt(prompt: GeneratedPrompt): Promise<void> {
    const { error } = await supabase
      .from('generated_prompts')
      .insert([prompt]);

    if (error) {
      console.error('Error storing prompt:', error);
      throw error;
    }
  }

  /**
   * Mark prompt as used
   */
  async markPromptAsUsed(promptId: string): Promise<void> {
    const { error } = await supabase
      .from('generated_prompts')
      .update({ used_count: 1 })
      .eq('id', promptId);

    if (error) {
      console.error('Error marking prompt as used:', error);
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `prompt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get statistics about generated prompts
   */
  async getStats(): Promise<any> {
    const { data, error } = await supabase
      .from('generated_prompts')
      .select('category, tier, pack, used_count');

    if (error) {
      console.error('Error getting stats:', error);
      return null;
    }

    const stats = {
      total: data.length,
      byCategory: {} as any,
      byTier: {} as any,
      byPack: {} as any,
      unused: 0
    };

    data.forEach(prompt => {
      // By category
      if (!stats.byCategory[prompt.category]) {
        stats.byCategory[prompt.category] = 0;
      }
      stats.byCategory[prompt.category]++;

      // By tier
      if (!stats.byTier[prompt.tier]) {
        stats.byTier[prompt.tier] = 0;
      }
      stats.byTier[prompt.tier]++;

      // By pack
      if (!stats.byPack[prompt.pack]) {
        stats.byPack[prompt.pack] = 0;
      }
      stats.byPack[prompt.pack]++;

      // Unused count
      if (prompt.used_count === 0) {
        stats.unused++;
      }
    });

    return stats;
  }
}

// Export singleton instance
export const promptGenerator = PromptGenerator.getInstance();
