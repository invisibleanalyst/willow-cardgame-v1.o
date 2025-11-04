/**
 * Clean Prompt System - No Duplicates, Proper Category Separation
 * 
 * This replaces the old mixed system with clean, properly separated prompts
 * that follow the dynamic system's thematic guidelines.
 */

export interface Prompt {
  id: string;
  text: string;
  tier: 'spark' | 'vibe' | 'lockin';
  category: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  categoryType: 'squad' | 'ride-or-die';
}

// Clean, properly separated prompts
export const cleanPrompts: Record<string, Record<string, Prompt[]>> = {
  // SQUAD PROMPTS - Individual-focused, naturally engaging, no romantic terms
  squad: {
    spark: [
      { id: 's_s_1', text: "What's the most unexpected thing you did at a hangout that surprised everyone?", tier: 'spark', category: 'Surprising Moments', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_2', text: "What's the weirdest thing you've done when you thought no one was watching?", tier: 'spark', category: 'Quirky Habits', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_3', text: "What's the most ridiculous thing you've convinced someone of just to see if they'd believe it?", tier: 'spark', category: 'Playful Deception', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_4', text: "What's your most embarrassing autocorrect fail that you wish you could take back?", tier: 'spark', category: 'Tech Fails', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_5', text: "What's the weirdest food combination you actually enjoy that would gross everyone out?", tier: 'spark', category: 'Food Quirks', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_6', text: "What's the most ridiculous thing you've cried about recently?", tier: 'spark', category: 'Emotional Moments', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_7', text: "What's your most useless talent that you're weirdly proud of?", tier: 'spark', category: 'Hidden Talents', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_8', text: "What's the most overrated thing everyone loves but you secretly hate?", tier: 'spark', category: 'Unpopular Opinions', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_9', text: "What's the most random thing you blurted out that changed the vibe?", tier: 'spark', category: 'Random Moments', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_10', text: "What's your most embarrassing social media post from years ago that still haunts you?", tier: 'spark', category: 'Social Media', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_11', text: "What's the most ridiculous fear that you know is totally irrational?", tier: 'spark', category: 'Irrational Fears', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_12', text: "What's the most embarrassing thing you've done for attention or likes?", tier: 'spark', category: 'Attention Seeking', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_13', text: "What's the weirdest thing you do when you're alone that you'd never admit to?", tier: 'spark', category: 'Secret Habits', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_14', text: "What's the most ridiculous thing you've googled recently?", tier: 'spark', category: 'Search History', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_15', text: "What's your most embarrassing celebrity crush that you're too old for?", tier: 'spark', category: 'Celebrity Crushes', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_16', text: "What's the most ridiculous thing you've done to avoid social interaction?", tier: 'spark', category: 'Social Avoidance', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_17', text: "What's the weirdest thing you've eaten that you actually enjoyed?", tier: 'spark', category: 'Food Adventures', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_18', text: "What's the most ridiculous thing you've cried about in a movie?", tier: 'spark', category: 'Movie Emotions', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_19', text: "What's your most embarrassing autocorrect fail in a group chat?", tier: 'spark', category: 'Group Chat Fails', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_20', text: "What's the most ridiculous thing you've done to procrastinate?", tier: 'spark', category: 'Procrastination', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_21', text: "What's the weirdest thing you do when you're nervous?", tier: 'spark', category: 'Nervous Habits', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_22', text: "What's the most ridiculous thing you've done to look cool?", tier: 'spark', category: 'Trying to Look Cool', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_23', text: "What's your most embarrassing middle school memory that still makes you cringe?", tier: 'spark', category: 'Middle School Cringe', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_24', text: "What's the most ridiculous thing you've done to avoid small talk?", tier: 'spark', category: 'Small Talk Avoidance', difficulty: 'easy', categoryType: 'squad' },
      { id: 's_s_25', text: "What's the weirdest thing you've done when you were bored?", tier: 'spark', category: 'Boredom Activities', difficulty: 'easy', categoryType: 'squad' }
    ],
    vibe: [
      { id: 's_v_1', text: "What's something you're struggling with right now that you haven't told anyone?", tier: 'vibe', category: 'Personal Struggles', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_2', text: "What's a fear you have that your friends don't know about but you think they'd understand?", tier: 'vibe', category: 'Hidden Fears', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_3', text: "What's something you're really proud of but feel weird bragging about?", tier: 'vibe', category: 'Quiet Achievements', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_4', text: "What's a dream or goal you have that you're scared to pursue?", tier: 'vibe', category: 'Scary Dreams', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_5', text: "What's something you've been hiding from everyone that you think they'd actually support?", tier: 'vibe', category: 'Hidden Support', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_6', text: "What's a way you've changed recently that you want everyone to notice and celebrate?", tier: 'vibe', category: 'Personal Growth', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_7', text: "What's a belief or value that's really important to you that you think everyone would respect?", tier: 'vibe', category: 'Core Values', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_8', text: "What's something you're insecure about that you think everyone could help each other with?", tier: 'vibe', category: 'Mutual Support', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_9', text: "What's a way you show care for your friends that you think they might not notice?", tier: 'vibe', category: 'Quiet Care', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_10', text: "What's something you're working on improving about yourself that you want your friends to know about?", tier: 'vibe', category: 'Self Improvement', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_11', text: "What's a quality you admire in others that you wish you had more of?", tier: 'vibe', category: 'Admired Qualities', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_12', text: "What's something you're grateful for that you don't usually talk about?", tier: 'vibe', category: 'Quiet Gratitude', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_13', text: "What's a way you've grown as a person that you're proud of?", tier: 'vibe', category: 'Personal Growth', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_14', text: "What's something you've learned about friendship that you think everyone should know?", tier: 'vibe', category: 'Friendship Wisdom', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_15', text: "What's a way you've supported a friend that you think they might not have noticed?", tier: 'vibe', category: 'Quiet Support', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_16', text: "What's something you're curious about that you've never asked anyone?", tier: 'vibe', category: 'Hidden Curiosity', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_17', text: "What's a way you've changed your perspective on something recently?", tier: 'vibe', category: 'Perspective Shifts', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_18', text: "What's something you've overcome that you think could inspire others?", tier: 'vibe', category: 'Inspirational Stories', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_19', text: "What's a way you've been more authentic with your friends lately?", tier: 'vibe', category: 'Authenticity', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_20', text: "What's something you've learned about yourself through your friendships?", tier: 'vibe', category: 'Self Discovery', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_21', text: "What's a way you've been more vulnerable with your friends recently?", tier: 'vibe', category: 'Vulnerability', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_22', text: "What's something you've realized about what you value in friendships?", tier: 'vibe', category: 'Friendship Values', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_23', text: "What's a way you've grown more confident in your friendships?", tier: 'vibe', category: 'Friendship Confidence', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_24', text: "What's something you've learned about being a good friend?", tier: 'vibe', category: 'Friendship Skills', difficulty: 'medium', categoryType: 'squad' },
      { id: 's_v_25', text: "What's a way you've deepened your friendships recently?", tier: 'vibe', category: 'Friendship Depth', difficulty: 'medium', categoryType: 'squad' }
    ],
    lockin: [
      { id: 's_l_1', text: "What's the most important thing you've learned about friendship from your experiences?", tier: 'lockin', category: 'Friendship Wisdom', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_2', text: "What's a way you've supported a friend through a difficult time that you're proud of?", tier: 'lockin', category: 'Deep Support', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_3', text: "What's something you've learned about yourself through your friendships that changed you?", tier: 'lockin', category: 'Transformative Learning', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_4', text: "What's a way you've grown as a person because of your friendships?", tier: 'lockin', category: 'Friendship Growth', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_5', text: "What's something you've realized about what makes a friendship truly meaningful?", tier: 'lockin', category: 'Meaningful Friendships', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_6', text: "What's a way you've been there for a friend when they needed you most?", tier: 'lockin', category: 'Being There', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_7', text: "What's something you've learned about trust and loyalty in friendships?", tier: 'lockin', category: 'Trust and Loyalty', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_8', text: "What's a way you've helped a friend grow or change for the better?", tier: 'lockin', category: 'Helping Friends Grow', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_9', text: "What's something you've realized about the importance of being authentic in friendships?", tier: 'lockin', category: 'Authentic Friendships', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_10', text: "What's a way you've deepened your understanding of what friendship means to you?", tier: 'lockin', category: 'Friendship Meaning', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_11', text: "What's something you've learned about forgiveness and second chances in friendships?", tier: 'lockin', category: 'Forgiveness', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_12', text: "What's a way you've grown more compassionate through your friendships?", tier: 'lockin', category: 'Compassionate Growth', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_13', text: "What's something you've realized about the power of friendship to change lives?", tier: 'lockin', category: 'Friendship Power', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_14', text: "What's a way you've learned to be a better listener through your friendships?", tier: 'lockin', category: 'Listening Skills', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_15', text: "What's something you've learned about boundaries and respect in friendships?", tier: 'lockin', category: 'Boundaries and Respect', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_16', text: "What's a way you've helped a friend through a major life change?", tier: 'lockin', category: 'Life Changes', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_17', text: "What's something you've realized about the importance of showing up for your friends?", tier: 'lockin', category: 'Showing Up', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_18', text: "What's a way you've learned to communicate better through your friendships?", tier: 'lockin', category: 'Communication Growth', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_19', text: "What's something you've learned about the difference between surface-level and deep friendships?", tier: 'lockin', category: 'Friendship Depth', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_20', text: "What's a way you've grown more empathetic through your friendships?", tier: 'lockin', category: 'Empathetic Growth', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_21', text: "What's something you've realized about the importance of being vulnerable in friendships?", tier: 'lockin', category: 'Vulnerability Importance', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_22', text: "What's a way you've learned to celebrate your friends' successes genuinely?", tier: 'lockin', category: 'Celebrating Success', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_23', text: "What's something you've learned about the importance of being honest in friendships?", tier: 'lockin', category: 'Honest Friendships', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_24', text: "What's a way you've grown more patient and understanding through your friendships?", tier: 'lockin', category: 'Patience and Understanding', difficulty: 'hard', categoryType: 'squad' },
      { id: 's_l_25', text: "What's something you've realized about the lasting impact of true friendship?", tier: 'lockin', category: 'Lasting Impact', difficulty: 'hard', categoryType: 'squad' }
    ]
  },
  
  // RIDE OR DIE PROMPTS - Deep romantic, couple-specific, intimate
  'ride-or-die': {
    spark: [
      { id: 'r_s_1', text: "What's something about yourself that you think I don't know yet?", tier: 'spark', category: 'Discovery', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_2', text: "What's a small moment in our relationship that still makes you smile?", tier: 'spark', category: 'Sweet Moments', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_3', text: "What's a quirky habit of mine you secretly love?", tier: 'spark', category: 'Quirky Love', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_4', text: "What's something you've always wanted to tell me but haven't found the right moment?", tier: 'spark', category: 'Unsaid Words', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_5', text: "What's a way I make you feel special that you don't think I realize?", tier: 'spark', category: 'Feeling Special', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_6', text: "What's something about our relationship that makes you feel most secure?", tier: 'spark', category: 'Security', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_7', text: "What's a small gesture from me that means more to you than I might know?", tier: 'spark', category: 'Meaningful Gestures', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_8', text: "What's something you love about our dynamic that you think is unique to us?", tier: 'spark', category: 'Unique Dynamic', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_9', text: "What's a way I show you love that you think I don't realize I'm doing?", tier: 'spark', category: 'Unconscious Love', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_10', text: "What's something about our connection that you find most comforting?", tier: 'spark', category: 'Comforting Connection', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_11', text: "What's a way you feel most loved by me that you don't think I know?", tier: 'spark', category: 'Feeling Loved', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_12', text: "What's something about our relationship that you're most grateful for?", tier: 'spark', category: 'Gratitude', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_13', text: "What's a way I make you laugh that you think is uniquely me?", tier: 'spark', category: 'Unique Humor', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_14', text: "What's something about our bond that you think makes us stronger?", tier: 'spark', category: 'Bond Strength', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_15', text: "What's a way you feel most understood by me?", tier: 'spark', category: 'Feeling Understood', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_16', text: "What's something about our relationship that you think is most beautiful?", tier: 'spark', category: 'Beautiful Aspects', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_17', text: "What's a way I support you that you think I don't realize is so important?", tier: 'spark', category: 'Important Support', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_18', text: "What's something about our connection that you find most magical?", tier: 'spark', category: 'Magical Connection', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_19', text: "What's a way you feel most cherished by me?", tier: 'spark', category: 'Feeling Cherished', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_20', text: "What's something about our relationship that you think is most special?", tier: 'spark', category: 'Special Aspects', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_21', text: "What's a way I make you feel safe that you don't think I realize?", tier: 'spark', category: 'Feeling Safe', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_22', text: "What's something about our bond that you think is most unique?", tier: 'spark', category: 'Unique Bond', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_23', text: "What's a way you feel most connected to me?", tier: 'spark', category: 'Feeling Connected', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_24', text: "What's something about our relationship that you think is most precious?", tier: 'spark', category: 'Precious Aspects', difficulty: 'easy', categoryType: 'ride-or-die' },
      { id: 'r_s_25', text: "What's a way I show you care that you think is most meaningful?", tier: 'spark', category: 'Meaningful Care', difficulty: 'easy', categoryType: 'ride-or-die' }
    ],
    vibe: [
      { id: 'r_v_1', text: "What's a fear or insecurity you have that you haven't shared with me?", tier: 'vibe', category: 'Hidden Fears', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_2', text: "What's something you're struggling with right now that you want me to understand?", tier: 'vibe', category: 'Current Struggles', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_3', text: "What's a way you've grown as a person since we've been together?", tier: 'vibe', category: 'Personal Growth', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_4', text: "What's something you're really proud of that you want me to celebrate with you?", tier: 'vibe', category: 'Proud Moments', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_5', text: "What's a dream or goal you have that you want me to support you in?", tier: 'vibe', category: 'Dreams and Goals', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_6', text: "What's something you've learned about yourself through our relationship?", tier: 'vibe', category: 'Self Discovery', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_7', text: "What's a way you've changed for the better since we've been together?", tier: 'vibe', category: 'Positive Changes', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_8', text: "What's something you're working on improving about yourself right now?", tier: 'vibe', category: 'Self Improvement', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_9', text: "What's a way you show me love that you think I might not notice?", tier: 'vibe', category: 'Quiet Love', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_10', text: "What's something about our connection that you're most grateful for?", tier: 'vibe', category: 'Connection Gratitude', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_11', text: "What's a way you've learned to communicate better with me?", tier: 'vibe', category: 'Communication Growth', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_12', text: "What's something you've realized about what you need in a relationship?", tier: 'vibe', category: 'Relationship Needs', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_13', text: "What's a way you've grown more patient with me?", tier: 'vibe', category: 'Patience Growth', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_14', text: "What's something you've learned about love through our relationship?", tier: 'vibe', category: 'Learning About Love', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_15', text: "What's a way you've become more understanding of me?", tier: 'vibe', category: 'Understanding Growth', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_16', text: "What's something you've realized about the importance of our relationship?", tier: 'vibe', category: 'Relationship Importance', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_17', text: "What's a way you've grown more compassionate toward me?", tier: 'vibe', category: 'Compassionate Growth', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_18', text: "What's something you've learned about trust through our relationship?", tier: 'vibe', category: 'Learning About Trust', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_19', text: "What's a way you've become more supportive of me?", tier: 'vibe', category: 'Supportive Growth', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_20', text: "What's something you've realized about what makes our relationship special?", tier: 'vibe', category: 'Special Aspects', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_21', text: "What's a way you've grown more empathetic toward me?", tier: 'vibe', category: 'Empathetic Growth', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_22', text: "What's something you've learned about commitment through our relationship?", tier: 'vibe', category: 'Learning About Commitment', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_23', text: "What's a way you've become more loving toward me?", tier: 'vibe', category: 'Loving Growth', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_24', text: "What's something you've realized about the depth of our connection?", tier: 'vibe', category: 'Connection Depth', difficulty: 'medium', categoryType: 'ride-or-die' },
      { id: 'r_v_25', text: "What's a way you've grown more devoted to our relationship?", tier: 'vibe', category: 'Devotion Growth', difficulty: 'medium', categoryType: 'ride-or-die' }
    ],
    lockin: [
      { id: 'r_l_1', text: "What's the most important thing you've learned about love through our relationship?", tier: 'lockin', category: 'Love Wisdom', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_2', text: "What's a way you've grown as a person because of our relationship?", tier: 'lockin', category: 'Relationship Growth', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_3', text: "What's something you've realized about what makes our bond unbreakable?", tier: 'lockin', category: 'Unbreakable Bond', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_4', text: "What's a way you've learned to love me more deeply?", tier: 'lockin', category: 'Deeper Love', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_5', text: "What's something you've realized about the power of our connection?", tier: 'lockin', category: 'Connection Power', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_6', text: "What's a way you've grown more committed to our relationship?", tier: 'lockin', category: 'Commitment Growth', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_7', text: "What's something you've learned about the importance of our relationship?", tier: 'lockin', category: 'Relationship Importance', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_8', text: "What's a way you've learned to trust me more completely?", tier: 'lockin', category: 'Complete Trust', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_9', text: "What's something you've realized about the depth of our love?", tier: 'lockin', category: 'Love Depth', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_10', text: "What's a way you've grown more understanding of what our relationship means?", tier: 'lockin', category: 'Relationship Meaning', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_11', text: "What's something you've learned about the strength of our bond?", tier: 'lockin', category: 'Bond Strength', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_12', text: "What's a way you've learned to appreciate me more deeply?", tier: 'lockin', category: 'Deeper Appreciation', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_13', text: "What's something you've realized about the beauty of our connection?", tier: 'lockin', category: 'Connection Beauty', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_14', text: "What's a way you've grown more devoted to our future together?", tier: 'lockin', category: 'Future Devotion', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_15', text: "What's something you've learned about the importance of our partnership?", tier: 'lockin', category: 'Partnership Importance', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_16', text: "What's a way you've learned to love me unconditionally?", tier: 'lockin', category: 'Unconditional Love', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_17', text: "What's something you've realized about the magic of our relationship?", tier: 'lockin', category: 'Relationship Magic', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_18', text: "What's a way you've grown more patient and understanding with me?", tier: 'lockin', category: 'Patience and Understanding', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_19', text: "What's something you've learned about the importance of our commitment?", tier: 'lockin', category: 'Commitment Importance', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_20', text: "What's a way you've learned to cherish me more deeply?", tier: 'lockin', category: 'Deeper Cherishing', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_21', text: "What's something you've realized about the power of our love?", tier: 'lockin', category: 'Love Power', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_22', text: "What's a way you've grown more grateful for our relationship?", tier: 'lockin', category: 'Relationship Gratitude', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_23', text: "What's something you've learned about the importance of our connection?", tier: 'lockin', category: 'Connection Importance', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_24', text: "What's a way you've learned to honor our relationship more deeply?", tier: 'lockin', category: 'Deeper Honor', difficulty: 'hard', categoryType: 'ride-or-die' },
      { id: 'r_l_25', text: "What's something you've realized about the eternal nature of our bond?", tier: 'lockin', category: 'Eternal Bond', difficulty: 'hard', categoryType: 'ride-or-die' }
    ]
  }
};

// Helper function to get prompts by category and tier
export function getPromptsByCategoryAndTier(category: 'squad' | 'ride-or-die', tier: 'spark' | 'vibe' | 'lockin'): Prompt[] {
  return cleanPrompts[category][tier] || [];
}

// Helper function to get random prompts
export function getRandomPrompts(category: 'squad' | 'ride-or-die', tier: 'spark' | 'vibe' | 'lockin', count: number = 1): Prompt[] {
  const prompts = getPromptsByCategoryAndTier(category, tier);
  const shuffled = [...prompts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper function to get all prompts for a category
export function getAllPromptsForCategory(category: 'squad' | 'ride-or-die'): Prompt[] {
  const allPrompts: Prompt[] = [];
  const tiers: ('spark' | 'vibe' | 'lockin')[] = ['spark', 'vibe', 'lockin'];
  
  tiers.forEach(tier => {
    allPrompts.push(...getPromptsByCategoryAndTier(category, tier));
  });
  
  return allPrompts;
}

// Helper function to get prompt statistics
export function getPromptStats() {
  const squadCount = getAllPromptsForCategory('squad').length;
  const rideOrDieCount = getAllPromptsForCategory('ride-or-die').length;
  
  return {
    squad: {
      total: squadCount,
      spark: getPromptsByCategoryAndTier('squad', 'spark').length,
      vibe: getPromptsByCategoryAndTier('squad', 'vibe').length,
      lockin: getPromptsByCategoryAndTier('squad', 'lockin').length
    },
    'ride-or-die': {
      total: rideOrDieCount,
      spark: getPromptsByCategoryAndTier('ride-or-die', 'spark').length,
      vibe: getPromptsByCategoryAndTier('ride-or-die', 'vibe').length,
      lockin: getPromptsByCategoryAndTier('ride-or-die', 'lockin').length
    },
    total: squadCount + rideOrDieCount
  };
}
