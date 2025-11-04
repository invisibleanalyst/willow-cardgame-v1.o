#!/usr/bin/env node

/**
 * Willow Talk Edition - Static Prompt Audit Script
 * 
 * This script audits the prompts from the SQL files to ensure:
 * 1. No duplicates (case-insensitive, whitespace-normalized)
 * 2. No cross-category overlaps (Squad vs Ride or Die)
 * 3. Proper count balance across tiers and categories
 * 4. Thematic fit for each category
 * 
 * Expected counts:
 * - 50 free prompts per category (Squad: 50, Ride or Die: 50)
 * - 200 premium prompts (Ride or Die only)
 * - Evenly split across tiers (~16-17 per tier for free, ~66-67 per tier for premium)
 */

const fs = require('fs');
const path = require('path');

// Normalize text for comparison (case-insensitive, whitespace-normalized)
function normalizeText(text) {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

// Check thematic fit
function checkThematicFit(prompt, category) {
  const text = prompt.prompt_text.toLowerCase();
  
  if (category === 'squad') {
    // Squad should be platonic, fun, embarrassing, group-focused
    const squadKeywords = ['group', 'squad', 'friends', 'together', 'hangout', 'party', 'fun', 'embarrassing', 'crazy', 'wild', 'our group', 'us'];
    const romanticKeywords = ['love', 'romantic', 'partner', 'relationship', 'kiss', 'date', 'marriage', 'forever', 'soulmate', 'our relationship', 'our bond'];
    
    const hasSquadKeywords = squadKeywords.some(keyword => text.includes(keyword));
    const hasRomanticKeywords = romanticKeywords.some(keyword => text.includes(keyword));
    
    return {
      fits: hasSquadKeywords && !hasRomanticKeywords,
      hasSquadKeywords,
      hasRomanticKeywords,
      reason: hasRomanticKeywords ? 'Contains romantic language' : hasSquadKeywords ? 'Good fit' : 'Missing squad-focused language'
    };
  } else if (category === 'ride-or-die') {
    // Ride or Die should be deep, romantic, for long-term partners
    const romanticKeywords = ['love', 'romantic', 'partner', 'relationship', 'together', 'forever', 'bond', 'connection', 'intimacy', 'our relationship', 'our bond', 'us'];
    const squadKeywords = ['group', 'squad', 'friends', 'hangout', 'party'];
    
    const hasRomanticKeywords = romanticKeywords.some(keyword => text.includes(keyword));
    const hasSquadKeywords = squadKeywords.some(keyword => text.includes(keyword));
    
    return {
      fits: hasRomanticKeywords && !hasSquadKeywords,
      hasRomanticKeywords,
      hasSquadKeywords,
      reason: hasSquadKeywords ? 'Contains group/friend language' : hasRomanticKeywords ? 'Good fit' : 'Missing romantic language'
    };
  }
  
  return { fits: true, reason: 'Unknown category' };
}

// Parse SQL file to extract prompts
function parseSQLFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const prompts = [];
  
  // Extract INSERT statements
  const insertMatches = content.match(/INSERT INTO prompts \([^)]+\) VALUES\s*\(([^;]+)\);/gs);
  
  if (insertMatches) {
    insertMatches.forEach(insert => {
      // Extract individual prompt values
      const valueMatches = insert.match(/\('([^']*(?:''[^']*)*)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*(true|false)\)/g);
      
      if (valueMatches) {
        valueMatches.forEach(match => {
          const parts = match.match(/\('([^']*(?:''[^']*)*)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*(true|false)\)/);
          if (parts) {
            prompts.push({
              prompt_text: parts[1].replace(/''/g, "'"),
              tier: parts[2],
              category: parts[3],
              difficulty: parts[4],
              is_premium_only: parts[5] === 'true',
              pack: parts[5] === 'true' ? 'premium' : 'free'
            });
          }
        });
      }
    });
  }
  
  return prompts;
}

// Parse premium prompts SQL file
function parsePremiumSQLFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const prompts = [];
  
  // Extract INSERT statements
  const insertMatches = content.match(/INSERT INTO premium_prompts \([^)]+\) VALUES\s*\(([^;]+)\);/gs);
  
  if (insertMatches) {
    insertMatches.forEach(insert => {
      // Extract individual prompt values
      const valueMatches = insert.match(/\('([^']*(?:''[^']*)*)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*(true|false)\)/g);
      
      if (valueMatches) {
        valueMatches.forEach(match => {
          const parts = match.match(/\('([^']*(?:''[^']*)*)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*(true|false)\)/);
          if (parts) {
            prompts.push({
              prompt_text: parts[1].replace(/''/g, "'"),
              tier: parts[2],
              category: parts[3],
              difficulty: parts[4],
              is_premium_only: parts[5] === 'true',
              pack: parts[5] === 'true' ? 'premium' : 'free'
            });
          }
        });
      }
    });
  }
  
  return prompts;
}

async function auditPrompts() {
  console.log('🔍 Starting Willow Talk Edition Static Prompt Audit...\n');
  
  try {
    // Parse SQL files
    const freePrompts = parseSQLFile(path.join(__dirname, 'insert-free-prompts.sql'));
    const premiumPrompts = parsePremiumSQLFile(path.join(__dirname, 'premium-prompts.sql'));
    
    // Combine all prompts
    const allPrompts = [...freePrompts, ...premiumPrompts];
    
    console.log(`📊 Total prompts found: ${allPrompts.length}`);
    console.log(`   Free prompts: ${freePrompts.length}`);
    console.log(`   Premium prompts: ${premiumPrompts.length}\n`);
    
    // Initialize audit results
    const auditResults = {
      duplicates: [],
      crossCategoryOverlaps: [],
      countIssues: [],
      thematicIssues: [],
      summary: {
        total: allPrompts.length,
        byCategory: {},
        byTier: {},
        byPack: {}
      }
    };
    
    // Check for duplicates
    console.log('🔍 Checking for duplicates...');
    const normalizedPrompts = new Map();
    
    allPrompts.forEach((prompt, index) => {
      const normalized = normalizeText(prompt.prompt_text);
      
      if (normalizedPrompts.has(normalized)) {
        const duplicate = normalizedPrompts.get(normalized);
        auditResults.duplicates.push({
          original: duplicate,
          duplicate: prompt,
          normalizedText: normalized
        });
      } else {
        normalizedPrompts.set(normalized, prompt);
      }
    });
    
    console.log(`   Found ${auditResults.duplicates.length} duplicate(s)`);
    
    // Check cross-category overlaps
    console.log('🔍 Checking for cross-category overlaps...');
    const squadPrompts = allPrompts.filter(p => p.category === 'squad');
    const rideOrDiePrompts = allPrompts.filter(p => p.category === 'ride-or-die');
    
    squadPrompts.forEach(squadPrompt => {
      const squadNormalized = normalizeText(squadPrompt.prompt_text);
      
      rideOrDiePrompts.forEach(rideOrDiePrompt => {
        const rideOrDieNormalized = normalizeText(rideOrDiePrompt.prompt_text);
        
        if (squadNormalized === rideOrDieNormalized) {
          auditResults.crossCategoryOverlaps.push({
            squad: squadPrompt,
            rideOrDie: rideOrDiePrompt,
            normalizedText: squadNormalized
          });
        }
      });
    });
    
    console.log(`   Found ${auditResults.crossCategoryOverlaps.length} cross-category overlap(s)`);
    
    // Check counts and balance
    console.log('🔍 Checking prompt counts and balance...');
    
    // Count by category
    const categoryCounts = {};
    allPrompts.forEach(prompt => {
      if (!categoryCounts[prompt.category]) {
        categoryCounts[prompt.category] = { total: 0, byTier: {}, byPack: {} };
      }
      categoryCounts[prompt.category].total++;
      
      if (!categoryCounts[prompt.category].byTier[prompt.tier]) {
        categoryCounts[prompt.category].byTier[prompt.tier] = 0;
      }
      categoryCounts[prompt.category].byTier[prompt.tier]++;
      
      if (!categoryCounts[prompt.category].byPack[prompt.pack]) {
        categoryCounts[prompt.category].byPack[prompt.pack] = 0;
      }
      categoryCounts[prompt.category].byPack[prompt.pack]++;
    });
    
    auditResults.summary.byCategory = categoryCounts;
    
    // Check expected counts
    const expectedCounts = {
      'squad': { free: 50, premium: 0 },
      'ride-or-die': { free: 50, premium: 200 }
    };
    
    Object.keys(expectedCounts).forEach(category => {
      const actual = categoryCounts[category] || { byPack: {} };
      const expected = expectedCounts[category];
      
      if (actual.byPack.free !== expected.free) {
        auditResults.countIssues.push({
          type: 'free_count_mismatch',
          category,
          expected: expected.free,
          actual: actual.byPack.free || 0
        });
      }
      
      if (actual.byPack.premium !== expected.premium) {
        auditResults.countIssues.push({
          type: 'premium_count_mismatch',
          category,
          expected: expected.premium,
          actual: actual.byPack.premium || 0
        });
      }
    });
    
    // Check tier balance
    Object.keys(categoryCounts).forEach(category => {
      const tiers = categoryCounts[category].byTier;
      const freeTiers = {};
      const premiumTiers = {};
      
      allPrompts.filter(p => p.category === category).forEach(prompt => {
        if (prompt.pack === 'free') {
          freeTiers[prompt.tier] = (freeTiers[prompt.tier] || 0) + 1;
        } else if (prompt.pack === 'premium') {
          premiumTiers[prompt.tier] = (premiumTiers[prompt.tier] || 0) + 1;
        }
      });
      
      // Check free tier balance (should be ~16-17 each)
      const freeTierCounts = Object.values(freeTiers);
      if (freeTierCounts.length > 0) {
        const minFree = Math.min(...freeTierCounts);
        const maxFree = Math.max(...freeTierCounts);
        if (maxFree - minFree > 2) {
          auditResults.countIssues.push({
            type: 'free_tier_imbalance',
            category,
            tierCounts: freeTiers,
            imbalance: maxFree - minFree
          });
        }
      }
      
      // Check premium tier balance (should be ~66-67 each for Ride or Die)
      const premiumTierCounts = Object.values(premiumTiers);
      if (premiumTierCounts.length > 0) {
        const minPremium = Math.min(...premiumTierCounts);
        const maxPremium = Math.max(...premiumTierCounts);
        if (maxPremium - minPremium > 3) {
          auditResults.countIssues.push({
            type: 'premium_tier_imbalance',
            category,
            tierCounts: premiumTiers,
            imbalance: maxPremium - minPremium
          });
        }
      }
    });
    
    console.log(`   Found ${auditResults.countIssues.length} count/balance issue(s)`);
    
    // Check thematic fit
    console.log('🔍 Checking thematic fit...');
    allPrompts.forEach(prompt => {
      const thematicCheck = checkThematicFit(prompt, prompt.category);
      if (!thematicCheck.fits) {
        auditResults.thematicIssues.push({
          prompt,
          issue: thematicCheck.reason,
          hasSquadKeywords: thematicCheck.hasSquadKeywords,
          hasRomanticKeywords: thematicCheck.hasRomanticKeywords
        });
      }
    });
    
    console.log(`   Found ${auditResults.thematicIssues.length} thematic issue(s)`);
    
    // Generate report
    console.log('\n📋 AUDIT REPORT');
    console.log('================\n');
    
    // Summary
    console.log('📊 SUMMARY:');
    console.log(`   Total prompts: ${auditResults.summary.total}`);
    Object.keys(auditResults.summary.byCategory).forEach(category => {
      const cat = auditResults.summary.byCategory[category];
      console.log(`   ${category}: ${cat.total} total (${cat.byPack.free || 0} free, ${cat.byPack.premium || 0} premium)`);
      Object.keys(cat.byTier).forEach(tier => {
        console.log(`     ${tier}: ${cat.byTier[tier]}`);
      });
    });
    
    // Issues
    if (auditResults.duplicates.length > 0) {
      console.log('\n❌ DUPLICATES FOUND:');
      auditResults.duplicates.forEach((dup, index) => {
        console.log(`   ${index + 1}. "${dup.normalizedText}"`);
        console.log(`      Original: ${dup.original.category}/${dup.original.tier}/${dup.original.pack}`);
        console.log(`      Duplicate: ${dup.duplicate.category}/${dup.duplicate.tier}/${dup.duplicate.pack}`);
      });
    }
    
    if (auditResults.crossCategoryOverlaps.length > 0) {
      console.log('\n❌ CROSS-CATEGORY OVERLAPS FOUND:');
      auditResults.crossCategoryOverlaps.forEach((overlap, index) => {
        console.log(`   ${index + 1}. "${overlap.normalizedText}"`);
        console.log(`      Squad: ${overlap.squad.tier}/${overlap.squad.pack}`);
        console.log(`      Ride or Die: ${overlap.rideOrDie.tier}/${overlap.rideOrDie.pack}`);
      });
    }
    
    if (auditResults.countIssues.length > 0) {
      console.log('\n❌ COUNT/BALANCE ISSUES:');
      auditResults.countIssues.forEach((issue, index) => {
        console.log(`   ${index + 1}. ${issue.type}: ${issue.category}`);
        if (issue.expected !== undefined) {
          console.log(`      Expected: ${issue.expected}, Actual: ${issue.actual}`);
        }
        if (issue.tierCounts) {
          console.log(`      Tier counts: ${JSON.stringify(issue.tierCounts)}`);
        }
      });
    }
    
    if (auditResults.thematicIssues.length > 0) {
      console.log('\n❌ THEMATIC ISSUES:');
      auditResults.thematicIssues.slice(0, 10).forEach((issue, index) => {
        console.log(`   ${index + 1}. ${issue.prompt.category}/${issue.prompt.tier}/${issue.prompt.pack}`);
        console.log(`      Issue: ${issue.issue}`);
        console.log(`      Text: "${issue.prompt.prompt_text.substring(0, 100)}..."`);
      });
      if (auditResults.thematicIssues.length > 10) {
        console.log(`   ... and ${auditResults.thematicIssues.length - 10} more`);
      }
    }
    
    // Overall status
    const totalIssues = auditResults.duplicates.length + 
                       auditResults.crossCategoryOverlaps.length + 
                       auditResults.countIssues.length + 
                       auditResults.thematicIssues.length;
    
    console.log('\n🎯 OVERALL STATUS:');
    if (totalIssues === 0) {
      console.log('   ✅ All checks passed! The prompts are ready for production.');
    } else {
      console.log(`   ⚠️  Found ${totalIssues} total issue(s) that need attention.`);
      console.log('\n💡 SUGGESTED FIXES:');
      console.log('   1. Remove duplicate prompts from the database');
      console.log('   2. Fix cross-category overlaps by ensuring unique content');
      console.log('   3. Adjust prompt counts to match expected totals');
      console.log('   4. Review and regenerate prompts with thematic issues');
      console.log('   5. Ensure even distribution across tiers');
      console.log('   6. Remove Squad premium prompts (should only be Ride or Die)');
    }
    
    // Sample review
    console.log('\n📝 SAMPLE PROMPT REVIEW:');
    console.log('========================');
    
    const samplePrompts = allPrompts.slice(0, 5);
    samplePrompts.forEach((prompt, index) => {
      console.log(`\n${index + 1}. ${prompt.category.toUpperCase()} - ${prompt.tier.toUpperCase()} - ${prompt.pack.toUpperCase()}`);
      console.log(`   "${prompt.prompt_text}"`);
      const thematicCheck = checkThematicFit(prompt, prompt.category);
      console.log(`   Thematic fit: ${thematicCheck.fits ? '✅' : '❌'} ${thematicCheck.reason}`);
    });
    
  } catch (error) {
    console.error('❌ Audit failed:', error);
  }
}

// Run the audit
auditPrompts();
