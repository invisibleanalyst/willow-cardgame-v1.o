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
    // Secrets & Fun
    { id: 's1', text: "What's your wildest group chat secret?", tier: 'spark', category: 'Secrets', difficulty: 'easy', categoryType: 'squad' },
    { id: 's2', text: "What's the most embarrassing thing that happened to you this week?", tier: 'spark', category: 'Funny', difficulty: 'easy', categoryType: 'both' },
    { id: 's3', text: "What's your go-to karaoke song?", tier: 'spark', category: 'Fun', difficulty: 'easy', categoryType: 'both' },
    { id: 's4', text: "What's the weirdest food combination you actually enjoy?", tier: 'spark', category: 'Quirky', difficulty: 'easy', categoryType: 'both' },
    
    // Dreams & Aspirations
    { id: 's5', text: "If you could have dinner with anyone, who would it be?", tier: 'spark', category: 'Dreams', difficulty: 'easy' },
    { id: 's6', text: "What's your dream vacation destination?", tier: 'spark', category: 'Dreams', difficulty: 'easy' },
    { id: 's7', text: "If you could learn any skill instantly, what would it be?", tier: 'spark', category: 'Aspirations', difficulty: 'easy' },
    
    // Personality & Preferences
    { id: 's8', text: "What's your biggest pet peeve?", tier: 'spark', category: 'Personality', difficulty: 'easy' },
    { id: 's9', text: "What's the best compliment you've ever received?", tier: 'spark', category: 'Personality', difficulty: 'easy' },
    { id: 's10', text: "What's your favorite way to spend a lazy Sunday?", tier: 'spark', category: 'Lifestyle', difficulty: 'easy' },
    
    // Childhood & Memories
    { id: 's11', text: "What's your most embarrassing childhood memory?", tier: 'spark', category: 'Memories', difficulty: 'easy' },
    { id: 's12', text: "What's the first thing you'd do if you won the lottery?", tier: 'spark', category: 'Dreams', difficulty: 'easy' },
    { id: 's13', text: "What's your guilty pleasure TV show or movie?", tier: 'spark', category: 'Entertainment', difficulty: 'easy' },
    
    // Fun & Light
    { id: 's14', text: "What's the most spontaneous thing you've ever done?", tier: 'spark', category: 'Adventure', difficulty: 'easy' },
    { id: 's15', text: "What's your favorite dad joke or pun?", tier: 'spark', category: 'Fun', difficulty: 'easy' },
    
    // Additional Spark Cards (16-35)
    { id: 's16', text: "What's your most ridiculous fear?", tier: 'spark', category: 'Funny', difficulty: 'easy' },
    { id: 's17', text: "What's the worst fashion choice you've ever made?", tier: 'spark', category: 'Funny', difficulty: 'easy' },
    { id: 's18', text: "What's your most useless talent?", tier: 'spark', category: 'Quirky', difficulty: 'easy' },
    { id: 's19', text: "What's the strangest thing you've ever eaten?", tier: 'spark', category: 'Adventure', difficulty: 'easy' },
    { id: 's20', text: "What's your most embarrassing autocorrect fail?", tier: 'spark', category: 'Funny', difficulty: 'easy' },
    
    { id: 's21', text: "What's your favorite conspiracy theory (just for fun)?", tier: 'spark', category: 'Fun', difficulty: 'easy' },
    { id: 's22', text: "What's the most random thing you've Googled recently?", tier: 'spark', category: 'Quirky', difficulty: 'easy' },
    { id: 's23', text: "What's your weirdest habit that no one knows about?", tier: 'spark', category: 'Secrets', difficulty: 'easy' },
    { id: 's24', text: "What's the most ridiculous thing you've cried about?", tier: 'spark', category: 'Funny', difficulty: 'easy' },
    { id: 's25', text: "What's your favorite 'so bad it's good' movie?", tier: 'spark', category: 'Entertainment', difficulty: 'easy' },
    
    { id: 's26', text: "What's the most overrated thing everyone loves?", tier: 'spark', category: 'Opinions', difficulty: 'easy' },
    { id: 's27', text: "What's your most controversial food opinion?", tier: 'spark', category: 'Opinions', difficulty: 'easy' },
    { id: 's28', text: "What's the weirdest thing you do when you're alone?", tier: 'spark', category: 'Quirky', difficulty: 'easy' },
    { id: 's29', text: "What's your most embarrassing celebrity crush?", tier: 'spark', category: 'Funny', difficulty: 'easy' },
    { id: 's30', text: "What's the most random skill you've learned from YouTube?", tier: 'spark', category: 'Learning', difficulty: 'easy' },
    
    { id: 's31', text: "What's your favorite 'old person' thing you do?", tier: 'spark', category: 'Lifestyle', difficulty: 'easy' },
    { id: 's32', text: "What's the most ridiculous thing you've convinced someone of?", tier: 'spark', category: 'Funny', difficulty: 'easy' },
    { id: 's33', text: "What's your weirdest shower thought?", tier: 'spark', category: 'Quirky', difficulty: 'easy' },
    { id: 's34', text: "What's the most embarrassing thing you've done for likes/follows?", tier: 'spark', category: 'Social', difficulty: 'easy' },
    { id: 's35', text: "What's your most ridiculous purchase that you don't regret?", tier: 'spark', category: 'Lifestyle', difficulty: 'easy' },
  ],

  vibe: [
    // Connection & Understanding
    { id: 'v1', text: "What's a small habit of mine that makes you smile?", tier: 'vibe', category: 'Connection', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'v2', text: "What's your favorite memory of us together?", tier: 'vibe', category: 'Memories', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'v3', text: "What's something you've always wanted to tell me but haven't?", tier: 'vibe', category: 'Deep', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'v4', text: "What's your love language and how do you show it?", tier: 'vibe', category: 'Love', difficulty: 'medium', categoryType: 'ride-or-die' },
    
    // Vulnerability & Trust
    { id: 'v5', text: "What's a fear you have that your friends don't know about?", tier: 'vibe', category: 'Vulnerability', difficulty: 'medium', categoryType: 'squad' },
    { id: 'v6', text: "What's the most vulnerable thing you've shared with me?", tier: 'vibe', category: 'Trust', difficulty: 'medium', categoryType: 'ride-or-die' },
    { id: 'v7', text: "What's something you're insecure about that your friends could help with?", tier: 'vibe', category: 'Support', difficulty: 'medium', categoryType: 'squad' },
    
    // Communication & Growth
    { id: 'v8', text: "What's a way I could be a better partner to you?", tier: 'vibe', category: 'Growth', difficulty: 'medium' },
    { id: 'v9', text: "What's your favorite thing about our communication style?", tier: 'vibe', category: 'Communication', difficulty: 'medium' },
    { id: 'v10', text: "What's something you wish we did more often together?", tier: 'vibe', category: 'Activities', difficulty: 'medium' },
    
    // Emotional Connection
    { id: 'v11', text: "What's the most romantic thing someone has ever done for you?", tier: 'vibe', category: 'Romance', difficulty: 'medium' },
    { id: 'v12', text: "What's a dream you have that involves us together?", tier: 'vibe', category: 'Future', difficulty: 'medium' },
    { id: 'v13', text: "What's something you're grateful for in our relationship?", tier: 'vibe', category: 'Gratitude', difficulty: 'medium' },
    
    // Deeper Understanding
    { id: 'v14', text: "What's a belief or value that's really important to you?", tier: 'vibe', category: 'Values', difficulty: 'medium' },
    { id: 'v15', text: "What's the best advice you've ever received about relationships?", tier: 'vibe', category: 'Wisdom', difficulty: 'medium' },
    
    // Additional Vibe Cards (16-100) - Expanded for paid tier
    { id: 'v16', text: "What's a way I make you feel most loved?", tier: 'vibe', category: 'Love', difficulty: 'medium' },
    { id: 'v17', text: "What's something about me that surprised you when we first met?", tier: 'vibe', category: 'Discovery', difficulty: 'medium' },
    { id: 'v18', text: "What's a challenge we've overcome together that made us stronger?", tier: 'vibe', category: 'Growth', difficulty: 'medium' },
    { id: 'v19', text: "What's your favorite thing about how we handle disagreements?", tier: 'vibe', category: 'Communication', difficulty: 'medium' },
    { id: 'v20', text: "What's something you've learned about yourself through our relationship?", tier: 'vibe', category: 'Self-Discovery', difficulty: 'medium' },
    
    { id: 'v21', text: "What's a way I support you that means the most?", tier: 'vibe', category: 'Support', difficulty: 'medium' },
    { id: 'v22', text: "What's your favorite inside joke we have?", tier: 'vibe', category: 'Connection', difficulty: 'medium' },
    { id: 'v23', text: "What's something you admire about how I handle stress?", tier: 'vibe', category: 'Admiration', difficulty: 'medium' },
    { id: 'v24', text: "What's a goal you have that you'd like my help achieving?", tier: 'vibe', category: 'Goals', difficulty: 'medium' },
    { id: 'v25', text: "What's your favorite way we spend quality time together?", tier: 'vibe', category: 'Activities', difficulty: 'medium' },
    
    { id: 'v26', text: "What's something you wish I understood better about you?", tier: 'vibe', category: 'Understanding', difficulty: 'medium' },
    { id: 'v27', text: "What's a way we've grown together as a couple?", tier: 'vibe', category: 'Growth', difficulty: 'medium' },
    { id: 'v28', text: "What's your favorite thing about our physical connection?", tier: 'vibe', category: 'Intimacy', difficulty: 'medium' },
    { id: 'v29', text: "What's something you're proud of about our relationship?", tier: 'vibe', category: 'Pride', difficulty: 'medium' },
    { id: 'v30', text: "What's a way I make you feel safe and secure?", tier: 'vibe', category: 'Security', difficulty: 'medium' },
    
    { id: 'v31', text: "What's your favorite thing about how we celebrate each other?", tier: 'vibe', category: 'Celebration', difficulty: 'medium' },
    { id: 'v32', text: "What's something you've taught me that I'm grateful for?", tier: 'vibe', category: 'Learning', difficulty: 'medium' },
    { id: 'v33', text: "What's a way we balance each other out?", tier: 'vibe', category: 'Balance', difficulty: 'medium' },
    { id: 'v34', text: "What's your favorite thing about our morning routine together?", tier: 'vibe', category: 'Routine', difficulty: 'medium' },
    { id: 'v35', text: "What's something you love about how I express affection?", tier: 'vibe', category: 'Affection', difficulty: 'medium' },
    
    { id: 'v36', text: "What's a way we've changed each other for the better?", tier: 'vibe', category: 'Growth', difficulty: 'medium' },
    { id: 'v37', text: "What's your favorite thing about how we make decisions together?", tier: 'vibe', category: 'Decision-Making', difficulty: 'medium' },
    { id: 'v38', text: "What's something you appreciate about how I handle your emotions?", tier: 'vibe', category: 'Emotional Support', difficulty: 'medium' },
    { id: 'v39', text: "What's a way we've built trust in our relationship?", tier: 'vibe', category: 'Trust', difficulty: 'medium' },
    { id: 'v40', text: "What's your favorite thing about our shared sense of humor?", tier: 'vibe', category: 'Humor', difficulty: 'medium' },
    
    { id: 'v41', text: "What's something you love about how I show up for you?", tier: 'vibe', category: 'Support', difficulty: 'medium' },
    { id: 'v42', text: "What's a way we've learned to communicate better over time?", tier: 'vibe', category: 'Communication', difficulty: 'medium' },
    { id: 'v43', text: "What's your favorite thing about how we handle each other's families?", tier: 'vibe', category: 'Family', difficulty: 'medium' },
    { id: 'v44', text: "What's something you admire about my work ethic or passions?", tier: 'vibe', category: 'Admiration', difficulty: 'medium' },
    { id: 'v45', text: "What's a way we've created our own traditions together?", tier: 'vibe', category: 'Traditions', difficulty: 'medium' },
    
    { id: 'v46', text: "What's your favorite thing about how we handle money together?", tier: 'vibe', category: 'Finances', difficulty: 'medium' },
    { id: 'v47', text: "What's something you love about how I take care of you when you're sick?", tier: 'vibe', category: 'Care', difficulty: 'medium' },
    { id: 'v48', text: "What's a way we've learned to give each other space?", tier: 'vibe', category: 'Independence', difficulty: 'medium' },
    { id: 'v49', text: "What's your favorite thing about how we handle each other's friends?", tier: 'vibe', category: 'Social', difficulty: 'medium' },
    { id: 'v50', text: "What's something you appreciate about how I handle your past?", tier: 'vibe', category: 'Acceptance', difficulty: 'medium' },
    
    { id: 'v51', text: "What's a way we've learned to compromise effectively?", tier: 'vibe', category: 'Compromise', difficulty: 'medium' },
    { id: 'v52', text: "What's your favorite thing about how we handle stress together?", tier: 'vibe', category: 'Stress Management', difficulty: 'medium' },
    { id: 'v53', text: "What's something you love about how I encourage your dreams?", tier: 'vibe', category: 'Encouragement', difficulty: 'medium' },
    { id: 'v54', text: "What's a way we've learned to be more patient with each other?", tier: 'vibe', category: 'Patience', difficulty: 'medium' },
    { id: 'v55', text: "What's your favorite thing about how we handle each other's quirks?", tier: 'vibe', category: 'Acceptance', difficulty: 'medium' },
    
    { id: 'v56', text: "What's something you admire about how I handle criticism?", tier: 'vibe', category: 'Growth', difficulty: 'medium' },
    { id: 'v57', text: "What's a way we've learned to be more present with each other?", tier: 'vibe', category: 'Mindfulness', difficulty: 'medium' },
    { id: 'v58', text: "What's your favorite thing about how we handle each other's emotions?", tier: 'vibe', category: 'Emotional Intelligence', difficulty: 'medium' },
    { id: 'v59', text: "What's something you love about how I show respect for your boundaries?", tier: 'vibe', category: 'Boundaries', difficulty: 'medium' },
    { id: 'v60', text: "What's a way we've learned to celebrate each other's successes?", tier: 'vibe', category: 'Celebration', difficulty: 'medium' },
    
    { id: 'v61', text: "What's your favorite thing about how we handle each other's insecurities?", tier: 'vibe', category: 'Support', difficulty: 'medium' },
    { id: 'v62', text: "What's something you appreciate about how I handle your need for alone time?", tier: 'vibe', category: 'Independence', difficulty: 'medium' },
    { id: 'v63', text: "What's a way we've learned to be more vulnerable with each other?", tier: 'vibe', category: 'Vulnerability', difficulty: 'medium' },
    { id: 'v64', text: "What's your favorite thing about how we handle each other's mistakes?", tier: 'vibe', category: 'Forgiveness', difficulty: 'medium' },
    { id: 'v65', text: "What's something you love about how I show appreciation for you?", tier: 'vibe', category: 'Appreciation', difficulty: 'medium' },
    
    { id: 'v66', text: "What's a way we've learned to be more intentional in our relationship?", tier: 'vibe', category: 'Intentionality', difficulty: 'medium' },
    { id: 'v67', text: "What's your favorite thing about how we handle each other's fears?", tier: 'vibe', category: 'Support', difficulty: 'medium' },
    { id: 'v68', text: "What's something you admire about how I handle your independence?", tier: 'vibe', category: 'Independence', difficulty: 'medium' },
    { id: 'v69', text: "What's a way we've learned to be more grateful for each other?", tier: 'vibe', category: 'Gratitude', difficulty: 'medium' },
    { id: 'v70', text: "What's your favorite thing about how we handle each other's ambitions?", tier: 'vibe', category: 'Ambition', difficulty: 'medium' },
    
    { id: 'v71', text: "What's something you love about how I handle your need for adventure?", tier: 'vibe', category: 'Adventure', difficulty: 'medium' },
    { id: 'v72', text: "What's a way we've learned to be more playful with each other?", tier: 'vibe', category: 'Playfulness', difficulty: 'medium' },
    { id: 'v73', text: "What's your favorite thing about how we handle each other's need for routine?", tier: 'vibe', category: 'Routine', difficulty: 'medium' },
    { id: 'v74', text: "What's something you appreciate about how I handle your need for spontaneity?", tier: 'vibe', category: 'Spontaneity', difficulty: 'medium' },
    { id: 'v75', text: "What's a way we've learned to be more understanding of each other's past?", tier: 'vibe', category: 'Understanding', difficulty: 'medium' },
    
    { id: 'v76', text: "What's your favorite thing about how we handle each other's need for control?", tier: 'vibe', category: 'Control', difficulty: 'medium' },
    { id: 'v77', text: "What's something you love about how I handle your need for flexibility?", tier: 'vibe', category: 'Flexibility', difficulty: 'medium' },
    { id: 'v78', text: "What's a way we've learned to be more supportive of each other's growth?", tier: 'vibe', category: 'Growth', difficulty: 'medium' },
    { id: 'v79', text: "What's your favorite thing about how we handle each other's need for security?", tier: 'vibe', category: 'Security', difficulty: 'medium' },
    { id: 'v80', text: "What's something you admire about how I handle your need for freedom?", tier: 'vibe', category: 'Freedom', difficulty: 'medium' },
    
    { id: 'v81', text: "What's a way we've learned to be more accepting of each other's differences?", tier: 'vibe', category: 'Acceptance', difficulty: 'medium' },
    { id: 'v82', text: "What's your favorite thing about how we handle each other's need for structure?", tier: 'vibe', category: 'Structure', difficulty: 'medium' },
    { id: 'v83', text: "What's something you love about how I handle your need for creativity?", tier: 'vibe', category: 'Creativity', difficulty: 'medium' },
    { id: 'v84', text: "What's a way we've learned to be more patient with each other's learning process?", tier: 'vibe', category: 'Learning', difficulty: 'medium' },
    { id: 'v85', text: "What's your favorite thing about how we handle each other's need for validation?", tier: 'vibe', category: 'Validation', difficulty: 'medium' },
    
    { id: 'v86', text: "What's something you appreciate about how I handle your need for recognition?", tier: 'vibe', category: 'Recognition', difficulty: 'medium' },
    { id: 'v87', text: "What's a way we've learned to be more empathetic toward each other's struggles?", tier: 'vibe', category: 'Empathy', difficulty: 'medium' },
    { id: 'v88', text: "What's your favorite thing about how we handle each other's need for comfort?", tier: 'vibe', category: 'Comfort', difficulty: 'medium' },
    { id: 'v89', text: "What's something you love about how I handle your need for challenge?", tier: 'vibe', category: 'Challenge', difficulty: 'medium' },
    { id: 'v90', text: "What's a way we've learned to be more present during our conversations?", tier: 'vibe', category: 'Presence', difficulty: 'medium' },
    
    { id: 'v91', text: "What's your favorite thing about how we handle each other's need for peace?", tier: 'vibe', category: 'Peace', difficulty: 'medium' },
    { id: 'v92', text: "What's something you admire about how I handle your need for excitement?", tier: 'vibe', category: 'Excitement', difficulty: 'medium' },
    { id: 'v93', text: "What's a way we've learned to be more considerate of each other's energy levels?", tier: 'vibe', category: 'Energy', difficulty: 'medium' },
    { id: 'v94', text: "What's your favorite thing about how we handle each other's need for inspiration?", tier: 'vibe', category: 'Inspiration', difficulty: 'medium' },
    { id: 'v95', text: "What's something you love about how I handle your need for motivation?", tier: 'vibe', category: 'Motivation', difficulty: 'medium' },
    
    { id: 'v96', text: "What's a way we've learned to be more appreciative of each other's efforts?", tier: 'vibe', category: 'Appreciation', difficulty: 'medium' },
    { id: 'v97', text: "What's your favorite thing about how we handle each other's need for reassurance?", tier: 'vibe', category: 'Reassurance', difficulty: 'medium' },
    { id: 'v98', text: "What's something you appreciate about how I handle your need for consistency?", tier: 'vibe', category: 'Consistency', difficulty: 'medium' },
    { id: 'v99', text: "What's a way we've learned to be more understanding of each other's communication styles?", tier: 'vibe', category: 'Communication', difficulty: 'medium' },
    { id: 'v100', text: "What's your favorite thing about how we've grown in love together?", tier: 'vibe', category: 'Love', difficulty: 'medium' },
  ],

  lockin: [
    // Deep Intimacy & Connection
    { id: 'l1', text: "What's our biggest shared dream?", tier: 'lockin', category: 'Future', difficulty: 'hard' },
    { id: 'l2', text: "What's the most vulnerable thing you've ever shared with me?", tier: 'lockin', category: 'Intimacy', difficulty: 'hard' },
    { id: 'l3', text: "What's something you want to change about our relationship?", tier: 'lockin', category: 'Growth', difficulty: 'hard' },
    { id: 'l4', text: "What's your deepest fear about our future together?", tier: 'lockin', category: 'Fears', difficulty: 'hard' },
    
    // Life Partnership & Commitment
    { id: 'l5', text: "What's the most important lesson you've learned from our relationship?", tier: 'lockin', category: 'Wisdom', difficulty: 'hard' },
    { id: 'l6', text: "What's your vision for our life together in 10 years?", tier: 'lockin', category: 'Future', difficulty: 'hard' },
    { id: 'l7', text: "What's something you'd never want to lose about our connection?", tier: 'lockin', category: 'Connection', difficulty: 'hard' },
    
    // Deep Emotional Bonds
    { id: 'l8', text: "What's the hardest thing you've had to forgive me for?", tier: 'lockin', category: 'Forgiveness', difficulty: 'hard' },
    { id: 'l9', text: "What's a way I've changed you for the better?", tier: 'lockin', category: 'Growth', difficulty: 'hard' },
    { id: 'l10', text: "What's your biggest hope for our relationship?", tier: 'lockin', category: 'Hope', difficulty: 'hard' },
    
    // Ultimate Trust & Vulnerability
    { id: 'l11', text: "What's something you've never told anyone else?", tier: 'lockin', category: 'Secrets', difficulty: 'hard' },
    { id: 'l12', text: "What's the most important thing you need from me to feel loved?", tier: 'lockin', category: 'Love', difficulty: 'hard' },
    { id: 'l13', text: "What's a boundary you have that's really important to you?", tier: 'lockin', category: 'Boundaries', difficulty: 'hard' },
    
    // Deep Life Questions
    { id: 'l14', text: "What's your biggest regret and how has it shaped you?", tier: 'lockin', category: 'Life', difficulty: 'hard' },
    { id: 'l15', text: "What's the most meaningful way someone has shown you love?", tier: 'lockin', category: 'Love', difficulty: 'hard' },
    { id: 'l16', text: "What's something you'd want me to know if I could read your mind?", tier: 'lockin', category: 'Intimacy', difficulty: 'hard' },
    
    // Additional Lock-In Cards (17-200) - Massive expansion for premium tier
    { id: 'l17', text: "What's the most difficult conversation we've ever had and what did it teach us?", tier: 'lockin', category: 'Communication', difficulty: 'hard' },
    { id: 'l18', text: "What's a way I've helped you heal from past wounds?", tier: 'lockin', category: 'Healing', difficulty: 'hard' },
    { id: 'l19', text: "What's your deepest insecurity and how can I help you overcome it?", tier: 'lockin', category: 'Vulnerability', difficulty: 'hard' },
    { id: 'l20', text: "What's something about our relationship that scares you?", tier: 'lockin', category: 'Fears', difficulty: 'hard' },
    
    { id: 'l21', text: "What's the most important thing you've learned about love from being with me?", tier: 'lockin', category: 'Love', difficulty: 'hard' },
    { id: 'l22', text: "What's a way we've helped each other grow spiritually or emotionally?", tier: 'lockin', category: 'Spiritual Growth', difficulty: 'hard' },
    { id: 'l23', text: "What's your biggest concern about our long-term compatibility?", tier: 'lockin', category: 'Compatibility', difficulty: 'hard' },
    { id: 'l24', text: "What's something you need from me that you've never asked for?", tier: 'lockin', category: 'Needs', difficulty: 'hard' },
    { id: 'l25', text: "What's the most important thing you want to teach our future children about love?", tier: 'lockin', category: 'Parenting', difficulty: 'hard' },
    
    { id: 'l26', text: "What's a way I've challenged you to be a better person?", tier: 'lockin', category: 'Growth', difficulty: 'hard' },
    { id: 'l27', text: "What's your deepest fear about losing me?", tier: 'lockin', category: 'Fears', difficulty: 'hard' },
    { id: 'l28', text: "What's something you've sacrificed for our relationship that was worth it?", tier: 'lockin', category: 'Sacrifice', difficulty: 'hard' },
    { id: 'l29', text: "What's the most important thing you want to accomplish together before we die?", tier: 'lockin', category: 'Legacy', difficulty: 'hard' },
    { id: 'l30', text: "What's a way we've learned to love each other's flaws?", tier: 'lockin', category: 'Acceptance', difficulty: 'hard' },
    
    { id: 'l31', text: "What's your biggest worry about our future together?", tier: 'lockin', category: 'Future', difficulty: 'hard' },
    { id: 'l32', text: "What's something you've never forgiven yourself for that I should know?", tier: 'lockin', category: 'Self-Forgiveness', difficulty: 'hard' },
    { id: 'l33', text: "What's the most important thing you want to change about yourself for our relationship?", tier: 'lockin', category: 'Self-Improvement', difficulty: 'hard' },
    { id: 'l34', text: "What's a way we've learned to support each other's individual dreams?", tier: 'lockin', category: 'Support', difficulty: 'hard' },
    { id: 'l35', text: "What's your deepest desire for our physical intimacy?", tier: 'lockin', category: 'Intimacy', difficulty: 'hard' },
    
    { id: 'l36', text: "What's something about your past that still affects our relationship today?", tier: 'lockin', category: 'Past', difficulty: 'hard' },
    { id: 'l37', text: "What's the most important thing you want to learn about me that you don't know?", tier: 'lockin', category: 'Discovery', difficulty: 'hard' },
    { id: 'l38', text: "What's a way we've learned to handle each other's mental health struggles?", tier: 'lockin', category: 'Mental Health', difficulty: 'hard' },
    { id: 'l39', text: "What's your biggest concern about how we'll handle aging together?", tier: 'lockin', category: 'Aging', difficulty: 'hard' },
    { id: 'l40', text: "What's something you've never told me about your family that I should know?", tier: 'lockin', category: 'Family', difficulty: 'hard' },
    
    { id: 'l41', text: "What's the most important thing you want to preserve about our relationship?", tier: 'lockin', category: 'Preservation', difficulty: 'hard' },
    { id: 'l42', text: "What's a way we've learned to handle each other's career pressures?", tier: 'lockin', category: 'Career', difficulty: 'hard' },
    { id: 'l43', text: "What's your deepest fear about being vulnerable with me?", tier: 'lockin', category: 'Vulnerability', difficulty: 'hard' },
    { id: 'l44', text: "What's something you need me to understand about your love language?", tier: 'lockin', category: 'Love Languages', difficulty: 'hard' },
    { id: 'l45', text: "What's the most important thing you want to teach me about yourself?", tier: 'lockin', category: 'Teaching', difficulty: 'hard' },
    
    { id: 'l46', text: "What's a way we've learned to handle each other's financial stress?", tier: 'lockin', category: 'Finances', difficulty: 'hard' },
    { id: 'l47', text: "What's your biggest concern about how we'll handle major life changes together?", tier: 'lockin', category: 'Change', difficulty: 'hard' },
    { id: 'l48', text: "What's something you've never told me about your spiritual beliefs?", tier: 'lockin', category: 'Spirituality', difficulty: 'hard' },
    { id: 'l49', text: "What's the most important thing you want to change about how we communicate?", tier: 'lockin', category: 'Communication', difficulty: 'hard' },
    { id: 'l50', text: "What's a way we've learned to handle each other's social anxiety or introversion?", tier: 'lockin', category: 'Social', difficulty: 'hard' },
    
    // Continuing with more cards to reach 200...
    { id: 'l51', text: "What's your deepest fear about our sexual compatibility long-term?", tier: 'lockin', category: 'Intimacy', difficulty: 'hard' },
    { id: 'l52', text: "What's something you've never told me about your relationship with your parents?", tier: 'lockin', category: 'Family', difficulty: 'hard' },
    { id: 'l53', text: "What's the most important thing you want to learn about relationships from our experience?", tier: 'lockin', category: 'Learning', difficulty: 'hard' },
    { id: 'l54', text: "What's a way we've learned to handle each other's need for control?", tier: 'lockin', category: 'Control', difficulty: 'hard' },
    { id: 'l55', text: "What's your biggest concern about how we'll handle each other's health issues?", tier: 'lockin', category: 'Health', difficulty: 'hard' },
    
    { id: 'l56', text: "What's something you need me to know about your attachment style?", tier: 'lockin', category: 'Attachment', difficulty: 'hard' },
    { id: 'l57', text: "What's the most important thing you want to change about how we handle conflict?", tier: 'lockin', category: 'Conflict', difficulty: 'hard' },
    { id: 'l58', text: "What's a way we've learned to handle each other's need for independence?", tier: 'lockin', category: 'Independence', difficulty: 'hard' },
    { id: 'l59', text: "What's your deepest fear about our emotional compatibility?", tier: 'lockin', category: 'Emotional Compatibility', difficulty: 'hard' },
    { id: 'l60', text: "What's something you've never told me about your relationship with your siblings?", tier: 'lockin', category: 'Family', difficulty: 'hard' },
    
    { id: 'l61', text: "What's the most important thing you want to preserve about your individual identity in our relationship?", tier: 'lockin', category: 'Identity', difficulty: 'hard' },
    { id: 'l62', text: "What's a way we've learned to handle each other's need for adventure vs. stability?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l63', text: "What's your biggest concern about how we'll handle each other's career changes?", tier: 'lockin', category: 'Career', difficulty: 'hard' },
    { id: 'l64', text: "What's something you need me to understand about your relationship with money?", tier: 'lockin', category: 'Money', difficulty: 'hard' },
    { id: 'l65', text: "What's the most important thing you want to change about how we show affection?", tier: 'lockin', category: 'Affection', difficulty: 'hard' },
    
    { id: 'l66', text: "What's a way we've learned to handle each other's need for routine vs. spontaneity?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l67', text: "What's your deepest fear about our intellectual compatibility?", tier: 'lockin', category: 'Intellectual Compatibility', difficulty: 'hard' },
    { id: 'l68', text: "What's something you've never told me about your relationship with your exes?", tier: 'lockin', category: 'Past Relationships', difficulty: 'hard' },
    { id: 'l69', text: "What's the most important thing you want to learn about love from our relationship?", tier: 'lockin', category: 'Love', difficulty: 'hard' },
    { id: 'l70', text: "What's a way we've learned to handle each other's need for social connection?", tier: 'lockin', category: 'Social', difficulty: 'hard' },
    
    { id: 'l71', text: "What's your biggest concern about how we'll handle each other's mental health challenges?", tier: 'lockin', category: 'Mental Health', difficulty: 'hard' },
    { id: 'l72', text: "What's something you need me to know about your relationship with your body?", tier: 'lockin', category: 'Body Image', difficulty: 'hard' },
    { id: 'l73', text: "What's the most important thing you want to change about how we handle stress together?", tier: 'lockin', category: 'Stress', difficulty: 'hard' },
    { id: 'l74', text: "What's a way we've learned to handle each other's need for validation?", tier: 'lockin', category: 'Validation', difficulty: 'hard' },
    { id: 'l75', text: "What's your deepest fear about our ability to grow together over time?", tier: 'lockin', category: 'Growth', difficulty: 'hard' },
    
    { id: 'l76', text: "What's something you've never told me about your relationship with your friends?", tier: 'lockin', category: 'Friendship', difficulty: 'hard' },
    { id: 'l77', text: "What's the most important thing you want to preserve about our friendship?", tier: 'lockin', category: 'Friendship', difficulty: 'hard' },
    { id: 'l78', text: "What's a way we've learned to handle each other's need for alone time?", tier: 'lockin', category: 'Alone Time', difficulty: 'hard' },
    { id: 'l79', text: "What's your biggest concern about how we'll handle each other's family dynamics?", tier: 'lockin', category: 'Family', difficulty: 'hard' },
    { id: 'l80', text: "What's something you need me to understand about your relationship with your work?", tier: 'lockin', category: 'Work', difficulty: 'hard' },
    
    { id: 'l81', text: "What's the most important thing you want to change about how we handle each other's emotions?", tier: 'lockin', category: 'Emotions', difficulty: 'hard' },
    { id: 'l82', text: "What's a way we've learned to handle each other's need for control in different areas?", tier: 'lockin', category: 'Control', difficulty: 'hard' },
    { id: 'l83', text: "What's your deepest fear about our ability to maintain passion over time?", tier: 'lockin', category: 'Passion', difficulty: 'hard' },
    { id: 'l84', text: "What's something you've never told me about your relationship with your hobbies?", tier: 'lockin', category: 'Hobbies', difficulty: 'hard' },
    { id: 'l85', text: "What's the most important thing you want to learn about commitment from our relationship?", tier: 'lockin', category: 'Commitment', difficulty: 'hard' },
    
    { id: 'l86', text: "What's a way we've learned to handle each other's need for structure vs. flexibility?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l87', text: "What's your biggest concern about how we'll handle each other's changing interests?", tier: 'lockin', category: 'Interests', difficulty: 'hard' },
    { id: 'l88', text: "What's something you need me to know about your relationship with your past mistakes?", tier: 'lockin', category: 'Past', difficulty: 'hard' },
    { id: 'l89', text: "What's the most important thing you want to change about how we handle each other's successes?", tier: 'lockin', category: 'Success', difficulty: 'hard' },
    { id: 'l90', text: "What's a way we've learned to handle each other's need for recognition?", tier: 'lockin', category: 'Recognition', difficulty: 'hard' },
    
    { id: 'l91', text: "What's your deepest fear about our ability to handle major life transitions together?", tier: 'lockin', category: 'Transitions', difficulty: 'hard' },
    { id: 'l92', text: "What's something you've never told me about your relationship with your dreams?", tier: 'lockin', category: 'Dreams', difficulty: 'hard' },
    { id: 'l93', text: "What's the most important thing you want to preserve about our shared values?", tier: 'lockin', category: 'Values', difficulty: 'hard' },
    { id: 'l94', text: "What's a way we've learned to handle each other's need for security vs. adventure?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l95', text: "What's your biggest concern about how we'll handle each other's aging process?", tier: 'lockin', category: 'Aging', difficulty: 'hard' },
    
    { id: 'l96', text: "What's something you need me to understand about your relationship with your fears?", tier: 'lockin', category: 'Fears', difficulty: 'hard' },
    { id: 'l97', text: "What's the most important thing you want to change about how we handle each other's failures?", tier: 'lockin', category: 'Failure', difficulty: 'hard' },
    { id: 'l98', text: "What's a way we've learned to handle each other's need for comfort vs. challenge?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l99', text: "What's your deepest fear about our ability to maintain intimacy as we age?", tier: 'lockin', category: 'Intimacy', difficulty: 'hard' },
    { id: 'l100', text: "What's something you've never told me about your relationship with your future self?", tier: 'lockin', category: 'Future Self', difficulty: 'hard' },
    
    // Continuing to reach 200 cards...
    { id: 'l101', text: "What's the most important thing you want to learn about forgiveness from our relationship?", tier: 'lockin', category: 'Forgiveness', difficulty: 'hard' },
    { id: 'l102', text: "What's a way we've learned to handle each other's need for peace vs. excitement?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l103', text: "What's your biggest concern about how we'll handle each other's changing priorities?", tier: 'lockin', category: 'Priorities', difficulty: 'hard' },
    { id: 'l104', text: "What's something you need me to know about your relationship with your intuition?", tier: 'lockin', category: 'Intuition', difficulty: 'hard' },
    { id: 'l105', text: "What's the most important thing you want to change about how we handle each other's creativity?", tier: 'lockin', category: 'Creativity', difficulty: 'hard' },
    
    { id: 'l106', text: "What's a way we've learned to handle each other's need for tradition vs. innovation?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l107', text: "What's your deepest fear about our ability to handle each other's dark moments?", tier: 'lockin', category: 'Dark Moments', difficulty: 'hard' },
    { id: 'l108', text: "What's something you've never told me about your relationship with your mortality?", tier: 'lockin', category: 'Mortality', difficulty: 'hard' },
    { id: 'l109', text: "What's the most important thing you want to preserve about our shared sense of humor?", tier: 'lockin', category: 'Humor', difficulty: 'hard' },
    { id: 'l110', text: "What's a way we've learned to handle each other's need for certainty vs. mystery?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    
    { id: 'l111', text: "What's your biggest concern about how we'll handle each other's changing energy levels?", tier: 'lockin', category: 'Energy', difficulty: 'hard' },
    { id: 'l112', text: "What's something you need me to understand about your relationship with your past relationships?", tier: 'lockin', category: 'Past Relationships', difficulty: 'hard' },
    { id: 'l113', text: "What's the most important thing you want to change about how we handle each other's need for space?", tier: 'lockin', category: 'Space', difficulty: 'hard' },
    { id: 'l114', text: "What's a way we've learned to handle each other's need for order vs. chaos?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l115', text: "What's your deepest fear about our ability to handle each other's spiritual growth?", tier: 'lockin', category: 'Spiritual Growth', difficulty: 'hard' },
    
    { id: 'l116', text: "What's something you've never told me about your relationship with your inner child?", tier: 'lockin', category: 'Inner Child', difficulty: 'hard' },
    { id: 'l117', text: "What's the most important thing you want to preserve about our shared dreams?", tier: 'lockin', category: 'Dreams', difficulty: 'hard' },
    { id: 'l118', text: "What's a way we've learned to handle each other's need for simplicity vs. complexity?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l119', text: "What's your biggest concern about how we'll handle each other's changing perspectives?", tier: 'lockin', category: 'Perspectives', difficulty: 'hard' },
    { id: 'l120', text: "What's something you need me to know about your relationship with your shadow self?", tier: 'lockin', category: 'Shadow Self', difficulty: 'hard' },
    
    { id: 'l121', text: "What's the most important thing you want to change about how we handle each other's need for control?", tier: 'lockin', category: 'Control', difficulty: 'hard' },
    { id: 'l122', text: "What's a way we've learned to handle each other's need for predictability vs. surprise?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l123', text: "What's your deepest fear about our ability to handle each other's emotional intensity?", tier: 'lockin', category: 'Emotional Intensity', difficulty: 'hard' },
    { id: 'l124', text: "What's something you've never told me about your relationship with your future goals?", tier: 'lockin', category: 'Goals', difficulty: 'hard' },
    { id: 'l125', text: "What's the most important thing you want to preserve about our shared values?", tier: 'lockin', category: 'Values', difficulty: 'hard' },
    
    { id: 'l126', text: "What's a way we've learned to handle each other's need for connection vs. independence?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l127', text: "What's your biggest concern about how we'll handle each other's changing needs?", tier: 'lockin', category: 'Needs', difficulty: 'hard' },
    { id: 'l128', text: "What's something you need me to understand about your relationship with your past traumas?", tier: 'lockin', category: 'Trauma', difficulty: 'hard' },
    { id: 'l129', text: "What's the most important thing you want to change about how we handle each other's need for validation?", tier: 'lockin', category: 'Validation', difficulty: 'hard' },
    { id: 'l130', text: "What's a way we've learned to handle each other's need for stability vs. growth?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    
    { id: 'l131', text: "What's your deepest fear about our ability to handle each other's changing identities?", tier: 'lockin', category: 'Identity', difficulty: 'hard' },
    { id: 'l132', text: "What's something you've never told me about your relationship with your mortality?", tier: 'lockin', category: 'Mortality', difficulty: 'hard' },
    { id: 'l133', text: "What's the most important thing you want to preserve about our shared experiences?", tier: 'lockin', category: 'Experiences', difficulty: 'hard' },
    { id: 'l134', text: "What's a way we've learned to handle each other's need for certainty vs. possibility?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l135', text: "What's your biggest concern about how we'll handle each other's changing beliefs?", tier: 'lockin', category: 'Beliefs', difficulty: 'hard' },
    
    { id: 'l136', text: "What's something you need me to know about your relationship with your past successes?", tier: 'lockin', category: 'Success', difficulty: 'hard' },
    { id: 'l137', text: "What's the most important thing you want to change about how we handle each other's need for recognition?", tier: 'lockin', category: 'Recognition', difficulty: 'hard' },
    { id: 'l138', text: "What's a way we've learned to handle each other's need for comfort vs. discomfort?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l139', text: "What's your deepest fear about our ability to handle each other's changing priorities?", tier: 'lockin', category: 'Priorities', difficulty: 'hard' },
    { id: 'l140', text: "What's something you've never told me about your relationship with your future legacy?", tier: 'lockin', category: 'Legacy', difficulty: 'hard' },
    
    { id: 'l141', text: "What's the most important thing you want to preserve about our shared memories?", tier: 'lockin', category: 'Memories', difficulty: 'hard' },
    { id: 'l142', text: "What's a way we've learned to handle each other's need for control vs. surrender?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l143', text: "What's your biggest concern about how we'll handle each other's changing perspectives on life?", tier: 'lockin', category: 'Life Perspectives', difficulty: 'hard' },
    { id: 'l144', text: "What's something you need me to understand about your relationship with your past failures?", tier: 'lockin', category: 'Failure', difficulty: 'hard' },
    { id: 'l145', text: "What's the most important thing you want to change about how we handle each other's need for approval?", tier: 'lockin', category: 'Approval', difficulty: 'hard' },
    
    { id: 'l146', text: "What's a way we've learned to handle each other's need for security vs. risk?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l147', text: "What's your deepest fear about our ability to handle each other's changing emotional needs?", tier: 'lockin', category: 'Emotional Needs', difficulty: 'hard' },
    { id: 'l148', text: "What's something you've never told me about your relationship with your past regrets?", tier: 'lockin', category: 'Regrets', difficulty: 'hard' },
    { id: 'l149', text: "What's the most important thing you want to preserve about our shared vision for the future?", tier: 'lockin', category: 'Future Vision', difficulty: 'hard' },
    { id: 'l150', text: "What's a way we've learned to handle each other's need for consistency vs. change?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    
    { id: 'l151', text: "What's your biggest concern about how we'll handle each other's changing relationship with our families?", tier: 'lockin', category: 'Family', difficulty: 'hard' },
    { id: 'l152', text: "What's something you need me to know about your relationship with your past loves?", tier: 'lockin', category: 'Past Loves', difficulty: 'hard' },
    { id: 'l153', text: "What's the most important thing you want to change about how we handle each other's need for perfection?", tier: 'lockin', category: 'Perfectionism', difficulty: 'hard' },
    { id: 'l154', text: "What's a way we've learned to handle each other's need for order vs. spontaneity?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l155', text: "What's your deepest fear about our ability to handle each other's changing spiritual beliefs?", tier: 'lockin', category: 'Spirituality', difficulty: 'hard' },
    
    { id: 'l156', text: "What's something you've never told me about your relationship with your past achievements?", tier: 'lockin', category: 'Achievements', difficulty: 'hard' },
    { id: 'l157', text: "What's the most important thing you want to preserve about our shared sense of purpose?", tier: 'lockin', category: 'Purpose', difficulty: 'hard' },
    { id: 'l158', text: "What's a way we've learned to handle each other's need for predictability vs. uncertainty?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l159', text: "What's your biggest concern about how we'll handle each other's changing relationship with our careers?", tier: 'lockin', category: 'Career', difficulty: 'hard' },
    { id: 'l160', text: "What's something you need me to understand about your relationship with your past disappointments?", tier: 'lockin', category: 'Disappointments', difficulty: 'hard' },
    
    { id: 'l161', text: "What's the most important thing you want to change about how we handle each other's need for certainty?", tier: 'lockin', category: 'Certainty', difficulty: 'hard' },
    { id: 'l162', text: "What's a way we've learned to handle each other's need for structure vs. freedom?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l163', text: "What's your deepest fear about our ability to handle each other's changing relationship with our bodies?", tier: 'lockin', category: 'Body', difficulty: 'hard' },
    { id: 'l164', text: "What's something you've never told me about your relationship with your past hopes?", tier: 'lockin', category: 'Past Hopes', difficulty: 'hard' },
    { id: 'l165', text: "What's the most important thing you want to preserve about our shared sense of adventure?", tier: 'lockin', category: 'Adventure', difficulty: 'hard' },
    
    { id: 'l166', text: "What's a way we've learned to handle each other's need for control vs. letting go?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l167', text: "What's your biggest concern about how we'll handle each other's changing relationship with our friends?", tier: 'lockin', category: 'Friends', difficulty: 'hard' },
    { id: 'l168', text: "What's something you need me to know about your relationship with your past fears?", tier: 'lockin', category: 'Past Fears', difficulty: 'hard' },
    { id: 'l169', text: "What's the most important thing you want to change about how we handle each other's need for validation?", tier: 'lockin', category: 'Validation', difficulty: 'hard' },
    { id: 'l170', text: "What's a way we've learned to handle each other's need for safety vs. growth?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    
    { id: 'l171', text: "What's your deepest fear about our ability to handle each other's changing relationship with our past?", tier: 'lockin', category: 'Past', difficulty: 'hard' },
    { id: 'l172', text: "What's something you've never told me about your relationship with your future hopes?", tier: 'lockin', category: 'Future Hopes', difficulty: 'hard' },
    { id: 'l173', text: "What's the most important thing you want to preserve about our shared sense of wonder?", tier: 'lockin', category: 'Wonder', difficulty: 'hard' },
    { id: 'l174', text: "What's a way we've learned to handle each other's need for certainty vs. mystery?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l175', text: "What's your biggest concern about how we'll handle each other's changing relationship with our dreams?", tier: 'lockin', category: 'Dreams', difficulty: 'hard' },
    
    { id: 'l176', text: "What's something you need me to understand about your relationship with your past joys?", tier: 'lockin', category: 'Past Joys', difficulty: 'hard' },
    { id: 'l177', text: "What's the most important thing you want to change about how we handle each other's need for recognition?", tier: 'lockin', category: 'Recognition', difficulty: 'hard' },
    { id: 'l178', text: "What's a way we've learned to handle each other's need for comfort vs. challenge?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l179', text: "What's your deepest fear about our ability to handle each other's changing relationship with our values?", tier: 'lockin', category: 'Values', difficulty: 'hard' },
    { id: 'l180', text: "What's something you've never told me about your relationship with your future fears?", tier: 'lockin', category: 'Future Fears', difficulty: 'hard' },
    
    { id: 'l181', text: "What's the most important thing you want to preserve about our shared sense of curiosity?", tier: 'lockin', category: 'Curiosity', difficulty: 'hard' },
    { id: 'l182', text: "What's a way we've learned to handle each other's need for predictability vs. surprise?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l183', text: "What's your biggest concern about how we'll handle each other's changing relationship with our passions?", tier: 'lockin', category: 'Passions', difficulty: 'hard' },
    { id: 'l184', text: "What's something you need me to know about your relationship with your past struggles?", tier: 'lockin', category: 'Past Struggles', difficulty: 'hard' },
    { id: 'l185', text: "What's the most important thing you want to change about how we handle each other's need for approval?", tier: 'lockin', category: 'Approval', difficulty: 'hard' },
    
    { id: 'l186', text: "What's a way we've learned to handle each other's need for security vs. vulnerability?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l187', text: "What's your deepest fear about our ability to handle each other's changing relationship with our identities?", tier: 'lockin', category: 'Identity', difficulty: 'hard' },
    { id: 'l188', text: "What's something you've never told me about your relationship with your past victories?", tier: 'lockin', category: 'Victories', difficulty: 'hard' },
    { id: 'l189', text: "What's the most important thing you want to preserve about our shared sense of resilience?", tier: 'lockin', category: 'Resilience', difficulty: 'hard' },
    { id: 'l190', text: "What's a way we've learned to handle each other's need for control vs. trust?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    
    { id: 'l191', text: "What's your biggest concern about how we'll handle each other's changing relationship with our purpose?", tier: 'lockin', category: 'Purpose', difficulty: 'hard' },
    { id: 'l192', text: "What's something you need me to understand about your relationship with your past lessons?", tier: 'lockin', category: 'Lessons', difficulty: 'hard' },
    { id: 'l193', text: "What's the most important thing you want to change about how we handle each other's need for perfection?", tier: 'lockin', category: 'Perfectionism', difficulty: 'hard' },
    { id: 'l194', text: "What's a way we've learned to handle each other's need for order vs. chaos?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l195', text: "What's your deepest fear about our ability to handle each other's changing relationship with our mortality?", tier: 'lockin', category: 'Mortality', difficulty: 'hard' },
    
    { id: 'l196', text: "What's something you've never told me about your relationship with your past transformations?", tier: 'lockin', category: 'Transformations', difficulty: 'hard' },
    { id: 'l197', text: "What's the most important thing you want to preserve about our shared sense of evolution?", tier: 'lockin', category: 'Evolution', difficulty: 'hard' },
    { id: 'l198', text: "What's a way we've learned to handle each other's need for certainty vs. possibility?", tier: 'lockin', category: 'Balance', difficulty: 'hard' },
    { id: 'l199', text: "What's your biggest concern about how we'll handle each other's changing relationship with our legacy?", tier: 'lockin', category: 'Legacy', difficulty: 'hard' },
    { id: 'l200', text: "What's something you need me to know about your relationship with your eternal self?", tier: 'lockin', category: 'Eternal Self', difficulty: 'hard' },
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
