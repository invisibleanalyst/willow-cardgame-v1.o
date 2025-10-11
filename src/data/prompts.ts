export interface Prompt {
  id: string;
  text: string;
  tier: 'spark' | 'vibe' | 'lockin';
  category: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  categoryType?: 'squad' | 'ride-or-die' | 'both';
  isPremium?: boolean;
}

export const prompts: Record<string, Prompt[]> = {
  spark: [
    // SQUAD VIBES - Spark Stage (25 prompts) - Fun, light-hearted, embarrassing
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
    { id: 's11', text: "What's the most ridiculous thing you've convinced someone of just to see if they'd believe it?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's12', text: "What's your most embarrassing social media post from years ago that still haunts you?", tier: 'spark', category: 'Social', difficulty: 'easy', categoryType: 'squad' },
    { id: 's13', text: "What's the weirdest food combination you actually enjoy that would gross everyone out?", tier: 'spark', category: 'Quirky', difficulty: 'easy', categoryType: 'squad' },
    { id: 's14', text: "What's your most ridiculous fear that you know is totally irrational?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's15', text: "What's the most embarrassing thing you've done for attention or likes?", tier: 'spark', category: 'Social', difficulty: 'easy', categoryType: 'squad' },
    { id: 's16', text: "If you had to pick one friend from the group to survive a zombie apocalypse with, who and why?", tier: 'spark', category: 'Hypothetical', difficulty: 'easy', categoryType: 'squad' },
    { id: 's17', text: "What's the most embarrassing thing you've ever done to impress someone in our group?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's18', text: "What's the weirdest dream you've had about one of us?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's19', text: "If we were all characters in a movie, what would be our group's theme song?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's20', text: "What's the most ridiculous thing you've ever bought online while drunk or sleep-deprived?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's21', text: "What's your most embarrassing childhood nickname that you hope never comes back?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's22', text: "What's the weirdest thing you've googled recently that you'd be embarrassed if anyone saw?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's23', text: "What's the most ridiculous thing you've done to avoid an awkward social situation?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's24', text: "What's your most embarrassing autocorrect fail that you wish you could take back?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'squad' },
    { id: 's25', text: "What's the weirdest thing you do when you think no one is watching?", tier: 'spark', category: 'Quirky', difficulty: 'easy', categoryType: 'squad' },
    
    // RIDE-OR-DIE - Spark Stage (25 prompts) - Getting to know each other deeper
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
    { id: 'r11', text: "What's something you wish you could tell your past self about relationships?", tier: 'spark', category: 'Wisdom', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r12', text: "What's a way you show love or care that you think I might not notice?", tier: 'spark', category: 'Love', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r13', text: "What's something you're working on improving about yourself right now?", tier: 'spark', category: 'Growth', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r14', text: "What's a quality you admire in others that you wish you had more of?", tier: 'spark', category: 'Self-Reflection', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r15', text: "What's something you're grateful for that you don't usually talk about?", tier: 'spark', category: 'Gratitude', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r16', text: "What's a quirky habit of mine you secretly love?", tier: 'spark', category: 'Love', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r17', text: "What's something about me that surprised you when we first met?", tier: 'spark', category: 'Discovery', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r18', text: "What's a small thing I do that makes you smile?", tier: 'spark', category: 'Love', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r19', text: "What's something you've learned about yourself since we've been together?", tier: 'spark', category: 'Self-Discovery', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r20', text: "What's a memory of us that you think about often?", tier: 'spark', category: 'Memories', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r21', text: "What's something you're curious about my past that you've never asked?", tier: 'spark', category: 'Curiosity', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r22', text: "What's a way I make you feel most loved?", tier: 'spark', category: 'Love', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r23', text: "What's something you've always wanted to tell me but haven't found the right moment?", tier: 'spark', category: 'Communication', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r24', text: "What's a dream you have for us that you haven't shared yet?", tier: 'spark', category: 'Dreams', difficulty: 'easy', categoryType: 'ride-or-die' },
    { id: 'r25', text: "What's something about our relationship that makes you feel most secure?", tier: 'spark', category: 'Security', difficulty: 'easy', categoryType: 'ride-or-die' },
  ],

  vibe: [
    // SQUAD VIBES - Vibe Check (25 prompts) - Deeper friendship, support, vulnerability
    { id: 'vs1', text: "What's something you're struggling with right now that you haven't told anyone?", tier: 'vibe', category: 'Vulnerability', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs2', text: "What's a fear you have that your friends don't know about but you think they'd understand?", tier: 'vibe', category: 'Vulnerability', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs3', text: "What's something you're insecure about that you think we could help each other with?", tier: 'vibe', category: 'Support', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs4', text: "What's a dream or goal you have that you're scared to pursue?", tier: 'vibe', category: 'Dreams', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs5', text: "What's something you've been hiding from us that you think we'd actually support?", tier: 'vibe', category: 'Trust', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs6', text: "What's a way you've changed recently that you want us to notice and celebrate?", tier: 'vibe', category: 'Growth', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs7', text: "What's something you're really proud of but feel weird bragging about?", tier: 'vibe', category: 'Achievements', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs8', text: "What's a belief or value that's really important to you that you think we'd respect?", tier: 'vibe', category: 'Values', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs9', text: "What's the most embarrassing story from our group hangouts that still makes you laugh?", tier: 'vibe', category: 'Memories', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs10', text: "What's something you've learned about friendship from our group?", tier: 'vibe', category: 'Wisdom', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs11', text: "What's a way someone in our group has supported you when you needed it most?", tier: 'vibe', category: 'Support', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs12', text: "What's something you want to change about how we support each other?", tier: 'vibe', category: 'Growth', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs13', text: "What's your biggest fear about losing our friendship?", tier: 'vibe', category: 'Fears', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs14', text: "What's the most meaningful way someone in our group has supported you?", tier: 'vibe', category: 'Support', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs15', text: "What's something you'd never want to lose about our bond?", tier: 'vibe', category: 'Connection', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs16', text: "What's the hardest thing you've had to forgive one of us for?", tier: 'vibe', category: 'Forgiveness', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs17', text: "What's your vision for our friendship in 10 years?", tier: 'vibe', category: 'Future', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs18', text: "What's something you've never told anyone that you think we'd understand?", tier: 'vibe', category: 'Secrets', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs19', text: "What's the most important thing you've learned about friendship from our group?", tier: 'vibe', category: 'Wisdom', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs20', text: "What's a way you've helped one of us through a tough time?", tier: 'vibe', category: 'Support', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs21', text: "What's something you're grateful for about our friendship that you don't usually say?", tier: 'vibe', category: 'Gratitude', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs22', text: "What's a challenge we've overcome together that made us stronger?", tier: 'vibe', category: 'Growth', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs23', text: "What's your favorite thing about how we handle disagreements?", tier: 'vibe', category: 'Communication', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs24', text: "What's something you've learned about yourself through our friendship?", tier: 'vibe', category: 'Self-Discovery', difficulty: 'medium', categoryType: 'squad' },
    { id: 'vs25', text: "What's a way you've changed because of our friendship?", tier: 'vibe', category: 'Growth', difficulty: 'medium', categoryType: 'squad' },
    
    // RIDE-OR-DIE - Vibe Check (25 prompts) - Deep connection, understanding, intimacy
    { id: 'vr1', text: "What's a small habit of mine that makes you smile?", tier: 'vibe', category: 'Connection', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr2', text: "What's your favorite memory of us together?", tier: 'vibe', category: 'Memories', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr3', text: "What's something you've always wanted to tell me but haven't?", tier: 'vibe', category: 'Deep', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr4', text: "What's your love language and how do you show it?", tier: 'vibe', category: 'Love', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr5', text: "What's the most vulnerable thing you've shared with me?", tier: 'vibe', category: 'Trust', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr6', text: "What's something about me that surprised you when we first met?", tier: 'vibe', category: 'Discovery', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr7', text: "What's a way I make you feel most loved?", tier: 'vibe', category: 'Love', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr8', text: "What's something you've learned about yourself through our relationship?", tier: 'vibe', category: 'Self-Discovery', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr9', text: "If we could swap one daily routine, what would you want to try from my life?", tier: 'vibe', category: 'Curiosity', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr10', text: "What's a challenge we've overcome together that made us stronger?", tier: 'vibe', category: 'Growth', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr11', text: "What's your favorite thing about how we handle disagreements?", tier: 'vibe', category: 'Communication', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr12', text: "What's something you've learned about yourself through our relationship?", tier: 'vibe', category: 'Self-Discovery', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr13', text: "What's a way I've helped you heal from past wounds?", tier: 'vibe', category: 'Healing', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr14', text: "What's something about our relationship that scares you?", tier: 'vibe', category: 'Fears', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr15', text: "What's the most important thing you've learned about love from being with me?", tier: 'vibe', category: 'Love', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr16', text: "What's a way you've changed because of our relationship?", tier: 'vibe', category: 'Growth', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr17', text: "What's something you're grateful for about our relationship that you don't usually say?", tier: 'vibe', category: 'Gratitude', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr18', text: "What's a dream you have for us that you haven't shared yet?", tier: 'vibe', category: 'Dreams', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr19', text: "What's something about me that you admire but don't tell me enough?", tier: 'vibe', category: 'Admiration', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr20', text: "What's a way we've grown together that you're most proud of?", tier: 'vibe', category: 'Growth', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr21', text: "What's something you've learned about love from our relationship?", tier: 'vibe', category: 'Love', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr22', text: "What's a way I make you feel most secure in our relationship?", tier: 'vibe', category: 'Security', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr23', text: "What's something you've discovered about yourself through our relationship?", tier: 'vibe', category: 'Self-Discovery', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr24', text: "What's a way we've supported each other that you're most grateful for?", tier: 'vibe', category: 'Support', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'vr25', text: "What's something about our relationship that makes you feel most alive?", tier: 'vibe', category: 'Connection', difficulty: 'medium', categoryType: 'ride-or-die' },
  ],

  lockin: [
    // SQUAD VIBES - Lock-In Level (25 prompts) - Deep friendship bonds, life support, unbreakable trust
    { id: 'ls1', text: "What's the most important thing you've learned about friendship from our group?", tier: 'lockin', category: 'Wisdom', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls2', text: "What's something you've never told anyone that you think we'd understand?", tier: 'lockin', category: 'Secrets', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls3', text: "What's your biggest fear about losing our friendship?", tier: 'lockin', category: 'Fears', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls4', text: "What's the most meaningful way someone in our group has supported you?", tier: 'lockin', category: 'Support', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls5', text: "What's something you want to change about how we support each other?", tier: 'lockin', category: 'Growth', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls6', text: "What's your vision for our friendship in 10 years?", tier: 'lockin', category: 'Future', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls7', text: "What's something you'd never want to lose about our bond?", tier: 'lockin', category: 'Connection', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls8', text: "What's the hardest thing you've had to forgive one of us for?", tier: 'lockin', category: 'Forgiveness', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls9', text: "If we could relive one group memory but change one thing, what would it be?", tier: 'lockin', category: 'Memories', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls10', text: "What's the most vulnerable thing you've never told any of us?", tier: 'lockin', category: 'Vulnerability', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls11', text: "What's a way you've helped one of us through our darkest time?", tier: 'lockin', category: 'Support', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls12', text: "What's something you've learned about yourself through our friendship?", tier: 'lockin', category: 'Self-Discovery', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls13', text: "What's a way you've changed because of our friendship?", tier: 'lockin', category: 'Growth', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls14', text: "What's something you're grateful for about our friendship that you don't usually say?", tier: 'lockin', category: 'Gratitude', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls15', text: "What's a challenge we've overcome together that made us stronger?", tier: 'lockin', category: 'Growth', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls16', text: "What's your favorite thing about how we handle disagreements?", tier: 'lockin', category: 'Communication', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls17', text: "What's something you've learned about yourself through our friendship?", tier: 'lockin', category: 'Self-Discovery', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls18', text: "What's a way you've helped one of us through a tough time?", tier: 'lockin', category: 'Support', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls19', text: "What's something you're grateful for about our friendship that you don't usually say?", tier: 'lockin', category: 'Gratitude', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls20', text: "What's a challenge we've overcome together that made us stronger?", tier: 'lockin', category: 'Growth', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls21', text: "What's your favorite thing about how we handle disagreements?", tier: 'lockin', category: 'Communication', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls22', text: "What's something you've learned about yourself through our friendship?", tier: 'lockin', category: 'Self-Discovery', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls23', text: "What's a way you've helped one of us through a tough time?", tier: 'lockin', category: 'Support', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls24', text: "What's something you're grateful for about our friendship that you don't usually say?", tier: 'lockin', category: 'Gratitude', difficulty: 'hard', categoryType: 'squad' },
    { id: 'ls25', text: "What's a challenge we've overcome together that made us stronger?", tier: 'lockin', category: 'Growth', difficulty: 'hard', categoryType: 'squad' },
    
    // RIDE-OR-DIE - Lock-In Level (25 prompts) - Ultimate intimacy, life partnership, soul connection
    { id: 'lr1', text: "What's our biggest shared dream?", tier: 'lockin', category: 'Future', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr2', text: "What's the most vulnerable thing you've ever shared with me?", tier: 'lockin', category: 'Intimacy', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr3', text: "What's something you want to change about our relationship?", tier: 'lockin', category: 'Growth', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr4', text: "What's your deepest fear about our future together?", tier: 'lockin', category: 'Fears', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr5', text: "What's the most important lesson you've learned from our relationship?", tier: 'lockin', category: 'Wisdom', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr6', text: "What's your vision for our life together in 10 years?", tier: 'lockin', category: 'Future', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr7', text: "What's something you'd never want to lose about our connection?", tier: 'lockin', category: 'Connection', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr8', text: "What's the hardest thing you've had to forgive me for?", tier: 'lockin', category: 'Forgiveness', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr9', text: "What's a dream we've never shared that could change our future together?", tier: 'lockin', category: 'Dreams', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr10', text: "What's the most difficult conversation we've ever had and what did it teach us?", tier: 'lockin', category: 'Communication', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr11', text: "What's a way I've helped you heal from past wounds?", tier: 'lockin', category: 'Healing', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr12', text: "What's your deepest insecurity and how can I help you overcome it?", tier: 'lockin', category: 'Vulnerability', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr13', text: "What's something about our relationship that scares you?", tier: 'lockin', category: 'Fears', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr14', text: "What's the most important thing you've learned about love from being with me?", tier: 'lockin', category: 'Love', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr15', text: "What's a way you've changed because of our relationship?", tier: 'lockin', category: 'Growth', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr16', text: "What's something you're grateful for about our relationship that you don't usually say?", tier: 'lockin', category: 'Gratitude', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr17', text: "What's a challenge we've overcome together that made us stronger?", tier: 'lockin', category: 'Growth', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr18', text: "What's your favorite thing about how we handle disagreements?", tier: 'lockin', category: 'Communication', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr19', text: "What's something you've learned about yourself through our relationship?", tier: 'lockin', category: 'Self-Discovery', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr20', text: "What's a way I've helped you heal from past wounds?", tier: 'lockin', category: 'Healing', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr21', text: "What's something about our relationship that scares you?", tier: 'lockin', category: 'Fears', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr22', text: "What's the most important thing you've learned about love from being with me?", tier: 'lockin', category: 'Love', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr23', text: "What's a way you've changed because of our relationship?", tier: 'lockin', category: 'Growth', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr24', text: "What's something you're grateful for about our relationship that you don't usually say?", tier: 'lockin', category: 'Gratitude', difficulty: 'hard', categoryType: 'ride-or-die' },
    { id: 'lr25', text: "What's a challenge we've overcome together that made us stronger?", tier: 'lockin', category: 'Growth', difficulty: 'hard', categoryType: 'ride-or-die' },
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

// Helper function to get prompts by category type
export const getPromptsByCategoryType = (tier: 'spark' | 'vibe' | 'lockin', categoryType: 'squad' | 'ride-or-die'): Prompt[] => {
  return prompts[tier].filter(prompt => prompt.categoryType === categoryType);
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

// Get category-specific prompt statistics
export const getCategoryPromptStats = (categoryType: 'squad' | 'ride-or-die') => {
  return {
    spark: getPromptsByCategoryType('spark', categoryType).length,
    vibe: getPromptsByCategoryType('vibe', categoryType).length,
    lockin: getPromptsByCategoryType('lockin', categoryType).length,
    total: getPromptsByCategoryType('spark', categoryType).length + 
           getPromptsByCategoryType('vibe', categoryType).length + 
           getPromptsByCategoryType('lockin', categoryType).length
  };
};