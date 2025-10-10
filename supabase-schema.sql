-- Supabase Schema for Willow Date Night Edition
-- Run this in your Supabase SQL editor to create the required tables

-- User Packs Table (for storing premium purchases)
CREATE TABLE IF NOT EXISTS user_packs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  pack_type TEXT NOT NULL CHECK (pack_type IN ('romantic-escape', 'premium', 'beta-pass')),
  amount_paid DECIMAL(10,2) NOT NULL,
  reference TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Premium Experience Table (for VIP requests)
CREATE TABLE IF NOT EXISTS premium_experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  feedback TEXT,
  tier TEXT NOT NULL DEFAULT 'vip-experience',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Premium Prompts Table (for storing tier-specific prompts)
CREATE TABLE IF NOT EXISTS premium_prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prompt_text TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('spark', 'vibe', 'lockin', 'premium')),
  category TEXT NOT NULL CHECK (category IN ('squad', 'ride-or-die', 'both')),
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  is_premium_only BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Answers Table (for AI analysis)
CREATE TABLE IF NOT EXISTS user_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  prompt_id TEXT NOT NULL,
  answer_text TEXT NOT NULL,
  sentiment_analysis JSONB,
  intimacy_level INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_packs_user_id ON user_packs(user_id);
CREATE INDEX IF NOT EXISTS idx_user_packs_status ON user_packs(status);
CREATE INDEX IF NOT EXISTS idx_premium_experience_email ON premium_experience(email);
CREATE INDEX IF NOT EXISTS idx_premium_experience_status ON premium_experience(status);
CREATE INDEX IF NOT EXISTS idx_premium_prompts_tier ON premium_prompts(tier);
CREATE INDEX IF NOT EXISTS idx_premium_prompts_category ON premium_prompts(category);
CREATE INDEX IF NOT EXISTS idx_user_answers_user_id ON user_answers(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE user_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_answers ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your auth setup)
-- For now, allowing all operations - you can restrict these later with proper auth

-- User packs policies
CREATE POLICY "Allow all operations on user_packs" ON user_packs FOR ALL USING (true);

-- Premium experience policies
CREATE POLICY "Allow all operations on premium_experience" ON premium_experience FOR ALL USING (true);

-- Premium prompts policies
CREATE POLICY "Allow read access to premium_prompts" ON premium_prompts FOR SELECT USING (true);

-- User answers policies
CREATE POLICY "Allow all operations on user_answers" ON user_answers FOR ALL USING (true);

-- Insert some sample premium prompts
INSERT INTO premium_prompts (prompt_text, tier, category, difficulty, is_premium_only) VALUES
-- Premium Squad Vibes Prompts
('What''s the most embarrassing thing you''ve ever done to impress someone in our group?', 'spark', 'squad', 'easy', true),
('If you had to choose one of us to be your partner in crime, who would it be and why?', 'spark', 'squad', 'medium', true),
('What''s the weirdest dream you''ve had about one of us?', 'vibe', 'squad', 'medium', true),
('If we were all characters in a movie, what would be our group''s theme song?', 'vibe', 'squad', 'easy', true),
('What''s the most vulnerable thing you''ve never told any of us?', 'lockin', 'squad', 'hard', true),

-- Premium Ride-or-Die Prompts
('What''s the moment you knew you wanted to spend the rest of your life with me?', 'spark', 'ride-or-die', 'easy', true),
('If you could change one thing about how we handle conflict, what would it be?', 'spark', 'ride-or-die', 'medium', true),
('What''s the biggest fear you have about our future together?', 'vibe', 'ride-or-die', 'hard', true),
('If we had to describe our love in three words, what would yours be?', 'vibe', 'ride-or-die', 'medium', true),
('What''s the deepest truth about yourself that you''ve never shared with anyone?', 'lockin', 'ride-or-die', 'hard', true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_user_packs_updated_at BEFORE UPDATE ON user_packs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_premium_experience_updated_at BEFORE UPDATE ON premium_experience FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
