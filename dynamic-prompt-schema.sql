-- Dynamic Prompt Generation System Schema
-- This schema supports AI-powered on-demand prompt generation

-- Generated Prompts Table (stores AI-generated prompts)
CREATE TABLE IF NOT EXISTS generated_prompts (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('squad', 'ride-or-die')),
  tier TEXT NOT NULL CHECK (tier IN ('spark', 'vibe', 'lockin')),
  pack TEXT NOT NULL CHECK (pack IN ('free', 'premium')),
  template_id TEXT NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  used_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prompt Templates Table (stores the core templates for AI generation)
CREATE TABLE IF NOT EXISTS prompt_templates (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('squad', 'ride-or-die')),
  tier TEXT NOT NULL CHECK (tier IN ('spark', 'vibe', 'lockin')),
  pack TEXT NOT NULL CHECK (pack IN ('free', 'premium')),
  template TEXT NOT NULL,
  theme TEXT NOT NULL,
  keywords TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Session Prompts Table (tracks prompts used in each game session)
CREATE TABLE IF NOT EXISTS user_session_prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  prompt_id TEXT NOT NULL REFERENCES generated_prompts(id),
  used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_generated_prompts_category_tier_pack ON generated_prompts(category, tier, pack);
CREATE INDEX IF NOT EXISTS idx_generated_prompts_used_count ON generated_prompts(used_count);
CREATE INDEX IF NOT EXISTS idx_generated_prompts_generated_at ON generated_prompts(generated_at);
CREATE INDEX IF NOT EXISTS idx_prompt_templates_category_tier_pack ON prompt_templates(category, tier, pack);
CREATE INDEX IF NOT EXISTS idx_user_session_prompts_user_id ON user_session_prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_session_prompts_session_id ON user_session_prompts(session_id);

-- Create unique constraint to prevent duplicate prompts
CREATE UNIQUE INDEX IF NOT EXISTS idx_generated_prompts_unique_text 
ON generated_prompts(LOWER(REGEXP_REPLACE(text, '\s+', ' ', 'g')));

-- Enable Row Level Security (RLS)
ALTER TABLE generated_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_session_prompts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to generated_prompts" ON generated_prompts FOR SELECT USING (true);
CREATE POLICY "Allow insert access to generated_prompts" ON generated_prompts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update access to generated_prompts" ON generated_prompts FOR UPDATE USING (true);

CREATE POLICY "Allow read access to prompt_templates" ON prompt_templates FOR SELECT USING (true);

CREATE POLICY "Allow all operations on user_session_prompts" ON user_session_prompts FOR ALL USING (true);

-- Insert the core prompt templates
INSERT INTO prompt_templates (id, category, tier, pack, template, theme, keywords) VALUES
-- SQUAD - SPARK STAGE (8 templates)
('squad_spark_1', 'squad', 'spark', 'free', 'What''s the most unexpected thing you did at a hangout that surprised everyone?', 'surprising_moments', ARRAY['hangout', 'surprised', 'unexpected', 'everyone']),
('squad_spark_2', 'squad', 'spark', 'free', 'What''s the weirdest thing you''ve done when you thought no one was watching?', 'quirky_habits', ARRAY['weirdest', 'watching', 'quirky', 'habits']),
('squad_spark_3', 'squad', 'spark', 'free', 'What''s the most ridiculous thing you''ve convinced someone of just to see if they''d believe it?', 'playful_deception', ARRAY['ridiculous', 'convinced', 'believe', 'playful']),
('squad_spark_4', 'squad', 'spark', 'free', 'What''s your most embarrassing autocorrect fail that you wish you could take back?', 'tech_fails', ARRAY['embarrassing', 'autocorrect', 'tech', 'fail']),
('squad_spark_5', 'squad', 'spark', 'free', 'What''s the weirdest food combination you actually enjoy that would gross everyone out?', 'food_quirks', ARRAY['weirdest', 'food', 'combination', 'gross']),
('squad_spark_6', 'squad', 'spark', 'free', 'What''s the most ridiculous thing you''ve cried about recently?', 'emotional_moments', ARRAY['ridiculous', 'cried', 'recently', 'emotional']),
('squad_spark_7', 'squad', 'spark', 'free', 'What''s your most useless talent that you''re weirdly proud of?', 'hidden_talents', ARRAY['useless', 'talent', 'proud', 'weirdly']),
('squad_spark_8', 'squad', 'spark', 'free', 'What''s the most overrated thing everyone loves but you secretly hate?', 'unpopular_opinions', ARRAY['overrated', 'everyone', 'secretly', 'hate']),

-- SQUAD - VIBE CHECK (8 templates)
('squad_vibe_1', 'squad', 'vibe', 'free', 'What''s something you''re struggling with right now that you haven''t told anyone?', 'personal_struggles', ARRAY['struggling', 'haven''t told', 'personal', 'support']),
('squad_vibe_2', 'squad', 'vibe', 'free', 'What''s a fear you have that your friends don''t know about but you think they''d understand?', 'hidden_fears', ARRAY['fear', 'friends', 'understand', 'hidden']),
('squad_vibe_3', 'squad', 'vibe', 'free', 'What''s something you''re really proud of but feel weird bragging about?', 'quiet_achievements', ARRAY['proud', 'bragging', 'achievement', 'quiet']),
('squad_vibe_4', 'squad', 'vibe', 'free', 'What''s a way you''ve changed recently that you want everyone to notice and celebrate?', 'personal_growth', ARRAY['changed', 'recently', 'notice', 'celebrate']),
('squad_vibe_5', 'squad', 'vibe', 'free', 'What''s the most meaningful way someone has supported you when you needed it most?', 'support_systems', ARRAY['meaningful', 'supported', 'needed', 'support']),
('squad_vibe_6', 'squad', 'vibe', 'free', 'What''s something you''ve learned about friendship that you think everyone should know?', 'friendship_wisdom', ARRAY['learned', 'friendship', 'everyone', 'wisdom']),
('squad_vibe_7', 'squad', 'vibe', 'free', 'What''s your biggest fear about losing the people who matter most to you?', 'relationship_fears', ARRAY['biggest fear', 'losing', 'matter most', 'relationships']),
('squad_vibe_8', 'squad', 'vibe', 'free', 'What''s something you''d never want to lose about the connections you have with people?', 'cherished_connections', ARRAY['never want to lose', 'connections', 'people', 'cherished']),

-- SQUAD - LOCK-IN LEVEL (8 templates)
('squad_lockin_1', 'squad', 'lockin', 'free', 'What''s the most vulnerable thing you''ve never told anyone that you think people would understand?', 'deep_vulnerability', ARRAY['vulnerable', 'never told', 'understand', 'deep']),
('squad_lockin_2', 'squad', 'lockin', 'free', 'What''s a way you''ve helped someone through their darkest time that you''re most proud of?', 'supporting_others', ARRAY['helped', 'darkest time', 'proud', 'supporting']),
('squad_lockin_3', 'squad', 'lockin', 'free', 'What''s something you''ve learned about yourself through your relationships with others?', 'self_discovery', ARRAY['learned about yourself', 'relationships', 'others', 'self-discovery']),
('squad_lockin_4', 'squad', 'lockin', 'free', 'What''s your vision for the relationships that matter most to you in 10 years?', 'future_relationships', ARRAY['vision', 'relationships', '10 years', 'future']),
('squad_lockin_5', 'squad', 'lockin', 'free', 'What''s the hardest thing you''ve had to forgive someone for, and what did it teach you?', 'forgiveness_lessons', ARRAY['hardest', 'forgive', 'taught', 'lessons']),
('squad_lockin_6', 'squad', 'lockin', 'free', 'What''s something you''re grateful for about the people in your life that you don''t usually say?', 'unspoken_gratitude', ARRAY['grateful', 'people in your life', 'don''t usually say', 'unspoken']),
('squad_lockin_7', 'squad', 'lockin', 'free', 'What''s a challenge you''ve overcome with others that made you stronger?', 'shared_challenges', ARRAY['challenge', 'overcome', 'others', 'stronger']),
('squad_lockin_8', 'squad', 'lockin', 'free', 'What''s your favorite thing about how you handle disagreements with people you care about?', 'conflict_resolution', ARRAY['favorite thing', 'handle disagreements', 'care about', 'conflict']),

-- RIDE OR DIE - SPARK STAGE (8 templates)
('ride_spark_1', 'ride-or-die', 'spark', 'free', 'What''s something about yourself that you think I don''t know yet?', 'discovery', ARRAY['about yourself', 'don''t know yet', 'discovery', 'secrets']),
('ride_spark_2', 'ride-or-die', 'spark', 'free', 'What''s a small moment in our relationship that still makes you smile?', 'cherished_moments', ARRAY['small moment', 'our relationship', 'makes you smile', 'cherished']),
('ride_spark_3', 'ride-or-die', 'spark', 'free', 'What''s a quirky habit of mine you secretly love?', 'loving_quirks', ARRAY['quirky habit', 'secretly love', 'quirks', 'love']),
('ride_spark_4', 'ride-or-die', 'spark', 'free', 'What''s something you''re curious about me that you''ve never asked?', 'curiosity', ARRAY['curious about me', 'never asked', 'curiosity', 'questions']),
('ride_spark_5', 'ride-or-die', 'spark', 'free', 'What''s a way I make you feel most loved?', 'love_languages', ARRAY['make you feel', 'most loved', 'love languages', 'affection']),
('ride_spark_6', 'ride-or-die', 'spark', 'free', 'What''s something you''ve learned about yourself since we''ve been together?', 'self_growth', ARRAY['learned about yourself', 'since we''ve been together', 'self-growth', 'development']),
('ride_spark_7', 'ride-or-die', 'spark', 'free', 'What''s a memory of us that you think about often?', 'fond_memories', ARRAY['memory of us', 'think about often', 'fond memories', 'nostalgia']),
('ride_spark_8', 'ride-or-die', 'spark', 'free', 'What''s something about our relationship that makes you feel most secure?', 'security', ARRAY['our relationship', 'feel most secure', 'security', 'stability']),

-- RIDE OR DIE - VIBE CHECK (8 templates)
('ride_vibe_1', 'ride-or-die', 'vibe', 'free', 'What''s your favorite memory of us together?', 'shared_memories', ARRAY['favorite memory', 'us together', 'shared memories', 'special moments']),
('ride_vibe_2', 'ride-or-die', 'vibe', 'free', 'What''s something you''ve always wanted to tell me but haven''t?', 'unspoken_truths', ARRAY['always wanted to tell me', 'haven''t', 'unspoken truths', 'communication']),
('ride_vibe_3', 'ride-or-die', 'vibe', 'free', 'What''s your love language and how do you show it?', 'love_expression', ARRAY['love language', 'how do you show it', 'love expression', 'affection']),
('ride_vibe_4', 'ride-or-die', 'vibe', 'free', 'What''s the most vulnerable thing you''ve shared with me?', 'vulnerability', ARRAY['most vulnerable thing', 'shared with me', 'vulnerability', 'trust']),
('ride_vibe_5', 'ride-or-die', 'vibe', 'free', 'What''s something about me that surprised you when we first met?', 'first_impressions', ARRAY['about me', 'surprised you', 'first met', 'first impressions']),
('ride_vibe_6', 'ride-or-die', 'vibe', 'free', 'What''s a challenge we''ve overcome together that made us stronger?', 'shared_growth', ARRAY['challenge', 'overcome together', 'made us stronger', 'shared growth']),
('ride_vibe_7', 'ride-or-die', 'vibe', 'free', 'What''s your favorite thing about how we handle disagreements?', 'conflict_resolution', ARRAY['favorite thing', 'how we handle disagreements', 'conflict resolution', 'communication']),
('ride_vibe_8', 'ride-or-die', 'vibe', 'free', 'What''s something you''re grateful for about our relationship that you don''t usually say?', 'unspoken_gratitude', ARRAY['grateful for', 'our relationship', 'don''t usually say', 'unspoken gratitude']),

-- RIDE OR DIE - LOCK-IN LEVEL (8 templates)
('ride_lockin_1', 'ride-or-die', 'lockin', 'free', 'What''s our biggest shared dream?', 'shared_dreams', ARRAY['biggest shared dream', 'our dreams', 'future together', 'aspirations']),
('ride_lockin_2', 'ride-or-die', 'lockin', 'free', 'What''s the most vulnerable thing you''ve ever shared with me?', 'deep_vulnerability', ARRAY['most vulnerable thing', 'ever shared with me', 'deep vulnerability', 'intimacy']),
('ride_lockin_3', 'ride-or-die', 'lockin', 'free', 'What''s something you want to change about our relationship?', 'relationship_growth', ARRAY['want to change', 'our relationship', 'relationship growth', 'improvement']),
('ride_lockin_4', 'ride-or-die', 'lockin', 'free', 'What''s your deepest fear about our future together?', 'future_fears', ARRAY['deepest fear', 'our future together', 'future fears', 'anxiety']),
('ride_lockin_5', 'ride-or-die', 'lockin', 'free', 'What''s the most important lesson you''ve learned from our relationship?', 'relationship_lessons', ARRAY['most important lesson', 'learned from our relationship', 'lessons', 'wisdom']),
('ride_lockin_6', 'ride-or-die', 'lockin', 'free', 'What''s your vision for our life together in 10 years?', 'future_vision', ARRAY['vision', 'our life together', '10 years', 'future vision']),
('ride_lockin_7', 'ride-or-die', 'lockin', 'free', 'What''s something you''d never want to lose about our connection?', 'cherished_connection', ARRAY['never want to lose', 'our connection', 'cherished connection', 'bond']),
('ride_lockin_8', 'ride-or-die', 'lockin', 'free', 'What''s the hardest thing you''ve had to forgive me for?', 'forgiveness', ARRAY['hardest thing', 'had to forgive me', 'forgiveness', 'healing']),

-- PREMIUM RIDE OR DIE TEMPLATES (24 templates for premium prompts)
-- Spark Premium (8 templates)
('ride_premium_spark_1', 'ride-or-die', 'spark', 'premium', 'What''s the moment you knew you wanted to spend the rest of your life with me?', 'defining_moments', ARRAY['moment you knew', 'rest of your life', 'defining moments', 'commitment']),
('ride_premium_spark_2', 'ride-or-die', 'spark', 'premium', 'What''s a dream you have for us that you haven''t shared yet?', 'unshared_dreams', ARRAY['dream you have for us', 'haven''t shared yet', 'unshared dreams', 'aspirations']),
('ride_premium_spark_3', 'ride-or-die', 'spark', 'premium', 'What''s something about our relationship that makes you feel most alive?', 'vitality', ARRAY['our relationship', 'feel most alive', 'vitality', 'passion']),
('ride_premium_spark_4', 'ride-or-die', 'spark', 'premium', 'What''s a way I''ve helped you become a better person?', 'personal_development', ARRAY['helped you become', 'better person', 'personal development', 'growth']),
('ride_premium_spark_5', 'ride-or-die', 'spark', 'premium', 'What''s something you''ve discovered about love through being with me?', 'love_discovery', ARRAY['discovered about love', 'through being with me', 'love discovery', 'understanding']),
('ride_premium_spark_6', 'ride-or-die', 'spark', 'premium', 'What''s a way we''ve grown together that you''re most proud of?', 'shared_growth', ARRAY['grown together', 'most proud of', 'shared growth', 'achievement']),
('ride_premium_spark_7', 'ride-or-die', 'spark', 'premium', 'What''s something about me that you admire but don''t tell me enough?', 'unspoken_admiration', ARRAY['about me', 'admire but don''t tell me enough', 'unspoken admiration', 'appreciation']),
('ride_premium_spark_8', 'ride-or-die', 'spark', 'premium', 'What''s a way I make you feel most secure in our relationship?', 'security', ARRAY['make you feel most secure', 'our relationship', 'security', 'safety']),

-- Vibe Premium (8 templates)
('ride_premium_vibe_1', 'ride-or-die', 'vibe', 'premium', 'What''s the most important thing you''ve learned about love from being with me?', 'love_wisdom', ARRAY['most important thing', 'learned about love', 'being with me', 'love wisdom']),
('ride_premium_vibe_2', 'ride-or-die', 'vibe', 'premium', 'What''s a way I''ve helped you heal from past wounds?', 'healing', ARRAY['helped you heal', 'past wounds', 'healing', 'recovery']),
('ride_premium_vibe_3', 'ride-or-die', 'vibe', 'premium', 'What''s something about our relationship that scares you?', 'relationship_fears', ARRAY['our relationship', 'scares you', 'relationship fears', 'anxiety']),
('ride_premium_vibe_4', 'ride-or-die', 'vibe', 'premium', 'What''s a way you''ve changed because of our relationship?', 'transformation', ARRAY['changed because of', 'our relationship', 'transformation', 'growth']),
('ride_premium_vibe_5', 'ride-or-die', 'vibe', 'premium', 'What''s something you''ve learned about yourself through our relationship?', 'self_discovery', ARRAY['learned about yourself', 'through our relationship', 'self-discovery', 'understanding']),
('ride_premium_vibe_6', 'ride-or-die', 'vibe', 'premium', 'What''s a way we''ve supported each other that you''re most grateful for?', 'mutual_support', ARRAY['supported each other', 'most grateful for', 'mutual support', 'gratitude']),
('ride_premium_vibe_7', 'ride-or-die', 'vibe', 'premium', 'What''s something about our relationship that makes you feel most alive?', 'vitality', ARRAY['our relationship', 'feel most alive', 'vitality', 'passion']),
('ride_premium_vibe_8', 'ride-or-die', 'vibe', 'premium', 'What''s a way I make you feel most loved and understood?', 'love_understanding', ARRAY['make you feel most loved', 'understood', 'love understanding', 'connection']),

-- Lock-In Premium (8 templates)
('ride_premium_lockin_1', 'ride-or-die', 'lockin', 'premium', 'What''s a dream we''ve never shared that could change our future together?', 'unshared_dreams', ARRAY['dream we''ve never shared', 'change our future together', 'unshared dreams', 'possibilities']),
('ride_premium_lockin_2', 'ride-or-die', 'lockin', 'premium', 'What''s the most difficult conversation we''ve ever had and what did it teach us?', 'difficult_conversations', ARRAY['most difficult conversation', 'ever had', 'taught us', 'growth']),
('ride_premium_lockin_3', 'ride-or-die', 'lockin', 'premium', 'What''s your deepest insecurity and how can I help you overcome it?', 'deep_insecurity', ARRAY['deepest insecurity', 'help you overcome it', 'deep insecurity', 'support']),
('ride_premium_lockin_4', 'ride-or-die', 'lockin', 'premium', 'What''s something about our relationship that you''re most proud of?', 'relationship_pride', ARRAY['our relationship', 'most proud of', 'relationship pride', 'achievement']),
('ride_premium_lockin_5', 'ride-or-die', 'lockin', 'premium', 'What''s a way we''ve grown together that you never expected?', 'unexpected_growth', ARRAY['grown together', 'never expected', 'unexpected growth', 'surprise']),
('ride_premium_lockin_6', 'ride-or-die', 'lockin', 'premium', 'What''s something about our love that you think is unique?', 'unique_love', ARRAY['our love', 'think is unique', 'unique love', 'special']),
('ride_premium_lockin_7', 'ride-or-die', 'lockin', 'premium', 'What''s a way I''ve helped you become the person you always wanted to be?', 'self_actualization', ARRAY['helped you become', 'person you always wanted to be', 'self-actualization', 'fulfillment']),
('ride_premium_lockin_8', 'ride-or-die', 'lockin', 'premium', 'What''s something about our future together that excites you most?', 'future_excitement', ARRAY['our future together', 'excites you most', 'future excitement', 'anticipation']);

-- Create a function to clean up old unused prompts (optional maintenance)
CREATE OR REPLACE FUNCTION cleanup_old_prompts()
RETURNS void AS $$
BEGIN
  -- Delete prompts that haven't been used in 30 days
  DELETE FROM generated_prompts 
  WHERE used_count = 0 
  AND generated_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Create a function to get prompt statistics
CREATE OR REPLACE FUNCTION get_prompt_stats()
RETURNS TABLE (
  category TEXT,
  tier TEXT,
  pack TEXT,
  total_count BIGINT,
  unused_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    gp.category,
    gp.tier,
    gp.pack,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE gp.used_count = 0) as unused_count
  FROM generated_prompts gp
  GROUP BY gp.category, gp.tier, gp.pack
  ORDER BY gp.category, gp.tier, gp.pack;
END;
$$ LANGUAGE plpgsql;
