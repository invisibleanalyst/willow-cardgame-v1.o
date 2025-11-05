'use client';

import { useState } from 'react';
import { promptManager } from '@/data/promptManager';
import { getPromptStats } from '@/data/prompts';

export default function AdminPage() {
  const [selectedTier, setSelectedTier] = useState<'spark' | 'vibe' | 'lockin'>('spark');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Get statistics from prompt system
  const stats = getPromptStats();
  const categories = promptManager.getCategoriesForTier(selectedTier);
  
  const filteredPrompts: any[] = selectedCategory === 'all' 
    ? promptManager.getPromptsForTier(selectedTier)
    : promptManager.getPromptsByCategory(selectedTier, selectedCategory);

  return (
    <div className="min-h-screen bg-willow-dark text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-craftwork-heavy text-4xl text-willow-green mb-4">
            Willow Admin - Prompt Management
          </h1>
          <p className="font-craftwork text-willow-gray">
            Manage and view all prompts in the Willow Date Night Edition
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <h3 className="font-craftwork-heavy text-lg text-willow-green">Squad Vibes</h3>
            <p className="font-craftwork text-2xl">{stats.squad.total} prompts</p>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <h3 className="font-craftwork-heavy text-lg text-willow-green">Ride or Die</h3>
            <p className="font-craftwork text-2xl">{stats['ride-or-die'].total} prompts</p>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <h3 className="font-craftwork-heavy text-lg text-willow-green">Spark Stage</h3>
            <p className="font-craftwork text-2xl">{stats.squad.spark + stats['ride-or-die'].spark} prompts</p>
          </div>
          <div className="bg-willow-green bg-opacity-20 p-4 rounded-lg">
            <h3 className="font-craftwork-heavy text-lg text-willow-green">Total</h3>
            <p className="font-craftwork text-2xl">{stats.total} prompts</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div>
            <label className="block font-craftwork text-sm text-willow-gray mb-2">Tier</label>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value as 'spark' | 'vibe' | 'lockin')}
              className="bg-white bg-opacity-10 border border-willow-gray rounded-lg px-4 py-2 text-white"
            >
              <option value="spark">Spark Stage</option>
              <option value="vibe">Vibe Check</option>
              <option value="lockin">Lock-In Level</option>
            </select>
          </div>
          <div>
            <label className="block font-craftwork text-sm text-willow-gray mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white bg-opacity-10 border border-willow-gray rounded-lg px-4 py-2 text-white"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Prompts List */}
        <div className="space-y-4">
          <h2 className="font-craftwork-heavy text-2xl text-willow-green">
            {selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)} Prompts
            {selectedCategory !== 'all' && ` - ${selectedCategory}`}
          </h2>
          
          <div className="grid gap-4">
            {filteredPrompts.map((prompt) => (
              <div
                key={prompt.id}
                className="bg-white bg-opacity-10 p-4 rounded-lg border border-white border-opacity-20"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-craftwork-heavy text-sm text-willow-green">
                      {prompt.id}
                    </span>
                    <span className="font-craftwork text-sm text-willow-gray bg-black bg-opacity-30 px-2 py-1 rounded">
                      {prompt.category}
                    </span>
                    <span className="font-craftwork text-xs text-willow-gray bg-willow-green bg-opacity-20 px-2 py-1 rounded">
                      {prompt.difficulty}
                    </span>
                  </div>
                </div>
                <p className="font-craftwork text-lg text-white">
                  {prompt.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="mt-12">
          <h2 className="font-craftwork-heavy text-2xl text-willow-green mb-6">
            Category Breakdown - {selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(category => {
              const categoryPrompts = promptManager.getPromptsByCategory(selectedTier, category);
              return (
                <div key={category} className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <h3 className="font-craftwork-heavy text-lg text-willow-green">{category}</h3>
                  <p className="font-craftwork text-sm text-willow-gray">
                    {categoryPrompts.length} prompts
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
