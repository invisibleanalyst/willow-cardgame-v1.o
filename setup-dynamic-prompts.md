# Dynamic Prompt System Setup Guide

## 🚀 Overview

This guide will help you set up the AI-powered dynamic prompt generation system for Willow Talk Edition. This system is much more efficient than pre-generating 485 prompts and provides better user experience.

## 📋 What This System Provides

### ✅ **Benefits**
- **Faster Setup**: Only 64 core templates instead of 485 pre-generated prompts
- **AI-Powered**: Unique prompts generated on-demand using OpenAI
- **Scalable**: Can generate unlimited unique prompts
- **Efficient**: Prompts cached in database for reuse
- **Quality**: Ensures thematic fit and uniqueness
- **Cost-Effective**: Only generates prompts when needed

### 📊 **System Architecture**
- **64 Core Templates**: 8 templates per category/tier/pack combination
- **AI Generation**: Uses OpenAI GPT-4 to create unique variations
- **Database Caching**: Stores generated prompts for reuse
- **Uniqueness Validation**: Prevents duplicates across all prompts
- **Usage Tracking**: Tracks which prompts have been used

## 🛠️ Setup Steps

### 1. **Database Setup**

Run the SQL schema to create the dynamic prompt tables:

```bash
# Connect to your Supabase database and run:
psql -h your-supabase-host -U postgres -d postgres -f dynamic-prompt-schema.sql
```

Or copy the contents of `dynamic-prompt-schema.sql` into your Supabase SQL editor.

### 2. **Environment Variables**

Make sure you have these environment variables set:

```env
# OpenAI API Key (required for prompt generation)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 3. **Install Dependencies**

```bash
npm install openai @supabase/supabase-js
```

### 4. **Update Game Logic**

Replace the static prompt system with the dynamic one:

#### In your game page component:

```typescript
// Replace the old GameCard with DynamicGameCard
import DynamicGameCard from '@/components/DynamicGameCard';

// In your game component:
<DynamicGameCard
  category={category}
  tier={currentTier}
  pack="free" // or "premium" for premium users
  onSwipeLeft={handleSwipeLeft}
  onSwipeRight={handleSwipeRight}
  gameCategory={category}
/>
```

#### Add the review screen:

```typescript
import ReviewScreen from '@/components/ReviewScreen';

// In your game completion component:
<ReviewScreen
  answers={answers}
  prompts={prompts}
  category={category}
  isOpen={showReview}
  onClose={() => setShowReview(false)}
/>
```

### 5. **API Endpoints**

The system includes these API endpoints:

- `POST /api/prompts/generate` - Generate a new prompt
- `POST /api/prompts/use` - Mark a prompt as used
- `GET /api/prompts/stats` - Get prompt statistics

### 6. **Testing**

Test the system by:

1. **Generate a prompt**:
```bash
curl -X POST http://localhost:3000/api/prompts/generate \
  -H "Content-Type: application/json" \
  -d '{"category": "squad", "tier": "spark", "pack": "free"}'
```

2. **Check statistics**:
```bash
curl http://localhost:3000/api/prompts/stats
```

## 📈 **How It Works**

### **Prompt Generation Flow**

1. **User starts game** → System requests prompt for category/tier/pack
2. **Check cache** → Look for unused prompts in database
3. **If cache miss** → Generate new prompt using AI
4. **Validate uniqueness** → Ensure no duplicates
5. **Store in database** → Cache for future use
6. **Return to user** → Display the prompt

### **Template System**

Each template includes:
- **Base prompt text** (e.g., "What's the most unexpected thing you did at a hangout?")
- **Theme** (e.g., "surprising_moments")
- **Keywords** (e.g., ["hangout", "surprised", "unexpected"])
- **AI instructions** for generating variations

### **AI Generation**

The AI receives:
- **System prompt** with category-specific instructions
- **Template** to base the variation on
- **Constraints** to ensure uniqueness and thematic fit

## 🎯 **Expected Results**

### **Squad Prompts** (Individual-focused, naturally engaging)
- ✅ "What's the most unexpected thing you did at a hangout that surprised everyone?"
- ✅ "What's the weirdest thing you've done when you thought no one was watching?"
- ✅ "What's the most ridiculous thing you've convinced someone of just to see if they'd believe it?"

### **Ride or Die Prompts** (Deep romantic, with playful moments)
- ✅ "What's a small moment in our relationship that still makes you smile?"
- ✅ "What's a quirky habit of mine you secretly love?"
- ✅ "What's something about our relationship that makes you feel most secure?"

## 🔧 **Customization**

### **Adding New Templates**

To add new prompt templates:

1. **Add to `PROMPT_TEMPLATES` array** in `promptGenerator.ts`
2. **Update database** with new template
3. **Test generation** to ensure quality

### **Modifying AI Instructions**

Edit the `getSystemPrompt()` method in `promptGenerator.ts` to change how AI generates prompts.

### **Adjusting Caching**

Modify the caching logic in `getCachedPrompt()` to change how long prompts stay cached.

## 📊 **Monitoring**

### **Check Prompt Statistics**

```typescript
const stats = await promptGenerator.getStats();
console.log(stats);
```

### **Database Queries**

```sql
-- Check total prompts generated
SELECT COUNT(*) FROM generated_prompts;

-- Check prompts by category
SELECT category, COUNT(*) FROM generated_prompts GROUP BY category;

-- Check unused prompts
SELECT COUNT(*) FROM generated_prompts WHERE used_count = 0;
```

## 🚨 **Troubleshooting**

### **Common Issues**

1. **"Failed to generate prompt"**
   - Check OpenAI API key
   - Verify API quota
   - Check network connection

2. **"No template found"**
   - Ensure templates are loaded in database
   - Check category/tier/pack values

3. **"Prompt not unique"**
   - System will retry automatically
   - Check for database constraints

### **Performance Optimization**

1. **Batch generation**: Generate multiple prompts at once
2. **Pre-warming**: Generate prompts during low traffic
3. **Caching**: Increase cache size for popular combinations

## 🎉 **Benefits Over Static System**

| Aspect | Static System | Dynamic System |
|--------|---------------|----------------|
| Setup Time | 30+ minutes | 5 minutes |
| Storage | 485 prompts | 64 templates |
| Uniqueness | Manual checking | Automatic validation |
| Scalability | Fixed content | Unlimited generation |
| Maintenance | Manual updates | Self-maintaining |
| User Experience | Repetitive | Always fresh |

## 🔮 **Future Enhancements**

1. **User Preferences**: Generate prompts based on user history
2. **A/B Testing**: Test different prompt styles
3. **Analytics**: Track which prompts get best responses
4. **Personalization**: Adapt prompts to user's relationship stage
5. **Multi-language**: Generate prompts in different languages

---

This dynamic system will save you hours of setup time while providing a much better user experience with always-fresh, unique prompts!
