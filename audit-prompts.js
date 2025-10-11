// Willow Talk Edition Prompt Audit Script
// This script analyzes all prompts for duplicates, cross-category overlaps, and count verification

const fs = require('fs');
const path = require('path');

// Helper function to normalize text for comparison
function normalizeText(text) {
  return text.toLowerCase()
    .replace(/\s+/g, ' ')  // Normalize whitespace
    .replace(/[^\w\s]/g, '')  // Remove punctuation
    .trim();
}

// Helper function to extract prompts from SQL files
function extractPromptsFromSQL(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const prompts = [];
  
  // Match INSERT statements with prompt_text
  const insertRegex = /INSERT INTO \w+ \([^)]+\) VALUES\s*([\s\S]*?);/g;
  let match;
  
  while ((match = insertRegex.exec(content)) !== null) {
    const valuesSection = match[1];
    
    // Extract individual prompt values
    const promptRegex = /'([^']*(?:''[^']*)*)'/g;
    let promptMatch;
    let currentPrompt = null;
    let fieldIndex = 0;
    
    while ((promptMatch = promptRegex.exec(valuesSection)) !== null) {
      const value = promptMatch[1].replace(/''/g, "'"); // Unescape SQL quotes
      
      if (fieldIndex === 0) { // First field is prompt_text
        currentPrompt = {
          text: value,
          normalized: normalizeText(value),
          source: path.basename(filePath),
          line: content.substring(0, promptMatch.index).split('\n').length
        };
      }
      
      fieldIndex++;
      if (fieldIndex >= 5) { // Reset after 5 fields (prompt_text, tier, category, difficulty, is_premium_only)
        if (currentPrompt) {
          prompts.push(currentPrompt);
        }
        currentPrompt = null;
        fieldIndex = 0;
      }
    }
  }
  
  return prompts;
}

// Helper function to extract prompts from TypeScript file
function extractPromptsFromTS(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const prompts = [];
  
  // Match prompt objects in the prompts object
  const promptRegex = /{\s*id:\s*'([^']+)',\s*text:\s*"([^"]*(?:\\"[^"]*)*)"/g;
  let match;
  
  while ((match = promptRegex.exec(content)) !== null) {
    const id = match[1];
    const text = match[2].replace(/\\"/g, '"'); // Unescape quotes
    
    prompts.push({
      id: id,
      text: text,
      normalized: normalizeText(text),
      source: path.basename(filePath),
      line: content.substring(0, match.index).split('\n').length
    });
  }
  
  return prompts;
}

// Main audit function
function auditPrompts() {
  console.log('🔍 Willow Talk Edition Prompt Audit Report');
  console.log('=' .repeat(50));
  
  const allPrompts = [];
  const duplicates = [];
  const crossCategoryOverlaps = [];
  const countIssues = [];
  
  // Extract prompts from all sources
  const sources = [
    { file: 'src/data/prompts.ts', extractor: extractPromptsFromTS },
    { file: 'premium-prompts.sql', extractor: extractPromptsFromSQL },
    { file: 'insert-free-prompts.sql', extractor: extractPromptsFromSQL }
  ];
  
  sources.forEach(source => {
    try {
      const prompts = source.extractor(source.file);
      allPrompts.push(...prompts.map(p => ({ ...p, sourceFile: source.file })));
      console.log(`✅ Extracted ${prompts.length} prompts from ${source.file}`);
    } catch (error) {
      console.log(`❌ Error reading ${source.file}: ${error.message}`);
    }
  });
  
  console.log(`\n📊 Total prompts found: ${allPrompts.length}`);
  
  // Check for duplicates (case-insensitive, whitespace-normalized)
  const normalizedMap = new Map();
  
  allPrompts.forEach(prompt => {
    const normalized = prompt.normalized;
    if (normalizedMap.has(normalized)) {
      const existing = normalizedMap.get(normalized);
      duplicates.push({
        text: prompt.text,
        normalized: normalized,
        sources: [
          { file: existing.sourceFile, line: existing.line },
          { file: prompt.sourceFile, line: prompt.line }
        ]
      });
    } else {
      normalizedMap.set(normalized, prompt);
    }
  });
  
  // Check for cross-category overlaps
  const squadPrompts = allPrompts.filter(p => 
    p.text.toLowerCase().includes('squad') || 
    p.text.toLowerCase().includes('group') ||
    p.text.toLowerCase().includes('friends') ||
    p.text.toLowerCase().includes('our group')
  );
  
  const rideOrDiePrompts = allPrompts.filter(p => 
    p.text.toLowerCase().includes('relationship') || 
    p.text.toLowerCase().includes('together') ||
    p.text.toLowerCase().includes('our ') ||
    p.text.toLowerCase().includes('me') ||
    p.text.toLowerCase().includes('love')
  );
  
  // Check for prompts that might belong to wrong category
  squadPrompts.forEach(squadPrompt => {
    if (squadPrompt.sourceFile.includes('ride-or-die') || 
        squadPrompt.text.toLowerCase().includes('relationship') ||
        squadPrompt.text.toLowerCase().includes('love')) {
      crossCategoryOverlaps.push({
        text: squadPrompt.text,
        currentCategory: 'squad',
        suggestedCategory: 'ride-or-die',
        source: squadPrompt.sourceFile
      });
    }
  });
  
  rideOrDiePrompts.forEach(ridePrompt => {
    if (ridePrompt.sourceFile.includes('squad') && 
        !ridePrompt.text.toLowerCase().includes('relationship') &&
        !ridePrompt.text.toLowerCase().includes('love')) {
      crossCategoryOverlaps.push({
        text: ridePrompt.text,
        currentCategory: 'ride-or-die',
        suggestedCategory: 'squad',
        source: ridePrompt.sourceFile
      });
    }
  });
  
  // Count verification
  const freePrompts = allPrompts.filter(p => !p.sourceFile.includes('premium'));
  const premiumPrompts = allPrompts.filter(p => p.sourceFile.includes('premium'));
  
  const squadFree = freePrompts.filter(p => p.sourceFile.includes('squad') || p.text.toLowerCase().includes('group'));
  const rideOrDieFree = freePrompts.filter(p => p.sourceFile.includes('ride-or-die') || p.text.toLowerCase().includes('relationship'));
  
  const squadPremium = premiumPrompts.filter(p => p.sourceFile.includes('squad') || p.text.toLowerCase().includes('group'));
  const rideOrDiePremium = premiumPrompts.filter(p => p.sourceFile.includes('ride-or-die') || p.text.toLowerCase().includes('relationship'));
  
  // Expected counts: 75 free per category, 355 premium (Ride or Die only)
  if (squadFree.length !== 75) {
    countIssues.push({
      type: 'count_mismatch',
      category: 'squad_free',
      expected: 75,
      actual: squadFree.length,
      difference: squadFree.length - 75
    });
  }
  
  if (rideOrDieFree.length !== 75) {
    countIssues.push({
      type: 'count_mismatch',
      category: 'ride_or_die_free',
      expected: 75,
      actual: rideOrDieFree.length,
      difference: rideOrDieFree.length - 75
    });
  }
  
  if (squadPremium.length > 0) {
    countIssues.push({
      type: 'unexpected_premium',
      category: 'squad_premium',
      expected: 0,
      actual: squadPremium.length,
      message: 'Squad should not have premium prompts according to requirements'
    });
  }
  
  if (rideOrDiePremium.length !== 355) {
    countIssues.push({
      type: 'count_mismatch',
      category: 'ride_or_die_premium',
      expected: 355,
      actual: rideOrDiePremium.length,
      difference: rideOrDiePremium.length - 355
    });
  }
  
  // Generate report
  console.log('\n📋 AUDIT RESULTS');
  console.log('=' .repeat(50));
  
  // Duplicates report
  if (duplicates.length > 0) {
    console.log(`\n❌ DUPLICATES FOUND: ${duplicates.length}`);
    duplicates.forEach((dup, index) => {
      console.log(`\n${index + 1}. "${dup.text}"`);
      console.log(`   Found in:`);
      dup.sources.forEach(source => {
        console.log(`   - ${source.file}:${source.line}`);
      });
    });
  } else {
    console.log('\n✅ NO DUPLICATES FOUND');
  }
  
  // Cross-category overlaps report
  if (crossCategoryOverlaps.length > 0) {
    console.log(`\n⚠️  CROSS-CATEGORY OVERLAPS: ${crossCategoryOverlaps.length}`);
    crossCategoryOverlaps.forEach((overlap, index) => {
      console.log(`\n${index + 1}. "${overlap.text}"`);
      console.log(`   Current: ${overlap.currentCategory}`);
      console.log(`   Suggested: ${overlap.suggestedCategory}`);
      console.log(`   Source: ${overlap.source}`);
    });
  } else {
    console.log('\n✅ NO CROSS-CATEGORY OVERLAPS FOUND');
  }
  
  // Count issues report
  if (countIssues.length > 0) {
    console.log(`\n📊 COUNT ISSUES: ${countIssues.length}`);
    countIssues.forEach((issue, index) => {
      console.log(`\n${index + 1}. ${issue.category.toUpperCase()}`);
      console.log(`   Expected: ${issue.expected}`);
      console.log(`   Actual: ${issue.actual}`);
      if (issue.difference) {
        console.log(`   Difference: ${issue.difference > 0 ? '+' : ''}${issue.difference}`);
      }
      if (issue.message) {
        console.log(`   Note: ${issue.message}`);
      }
    });
  } else {
    console.log('\n✅ ALL COUNTS MATCH REQUIREMENTS');
  }
  
  // Summary
  console.log('\n📈 SUMMARY');
  console.log('=' .repeat(50));
  console.log(`Total Prompts: ${allPrompts.length}`);
  console.log(`Free Prompts: ${freePrompts.length}`);
  console.log(`Premium Prompts: ${premiumPrompts.length}`);
  console.log(`Squad Free: ${squadFree.length}/75`);
  console.log(`Ride or Die Free: ${rideOrDieFree.length}/75`);
  console.log(`Squad Premium: ${squadPremium.length}/0 (should be 0)`);
  console.log(`Ride or Die Premium: ${rideOrDiePremium.length}/355`);
  console.log(`Duplicates: ${duplicates.length}`);
  console.log(`Cross-category Overlaps: ${crossCategoryOverlaps.length}`);
  console.log(`Count Issues: ${countIssues.length}`);
  
  // Recommendations
  if (duplicates.length > 0 || crossCategoryOverlaps.length > 0 || countIssues.length > 0) {
    console.log('\n🔧 RECOMMENDATIONS');
    console.log('=' .repeat(50));
    
    if (duplicates.length > 0) {
      console.log('1. Remove duplicate prompts to ensure uniqueness');
    }
    
    if (crossCategoryOverlaps.length > 0) {
      console.log('2. Review and recategorize prompts that may be in wrong category');
    }
    
    if (countIssues.length > 0) {
      console.log('3. Adjust prompt counts to match requirements:');
      console.log('   - 75 free prompts per category (Squad & Ride or Die)');
      console.log('   - 355 premium prompts (Ride or Die only)');
    }
    
    console.log('\n4. Regenerate prompts with proper categorization and uniqueness checks');
  } else {
    console.log('\n🎉 ALL CHECKS PASSED! No issues found.');
  }
  
  return {
    totalPrompts: allPrompts.length,
    duplicates: duplicates.length,
    crossCategoryOverlaps: crossCategoryOverlaps.length,
    countIssues: countIssues.length,
    details: {
      duplicates,
      crossCategoryOverlaps,
      countIssues
    }
  };
}

// Run the audit
if (require.main === module) {
  auditPrompts();
}

module.exports = { auditPrompts, normalizeText };
