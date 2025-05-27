"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Plus, X, Copy, Check } from 'lucide-react';

interface SightWord {
  word: string;
  index: number;
}

export default function SightWordsPage() {
  const [smallWords, setSmallWords] = useState<SightWord[]>([]);
  const [bigWords, setBigWords] = useState<SightWord[]>([]);
  const [filteredSmallWords, setFilteredSmallWords] = useState<SightWord[]>([]);
  const [filteredBigWords, setFilteredBigWords] = useState<SightWord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [addWordType, setAddWordType] = useState<'small' | 'big'>('small');
  const [copiedColumn, setCopiedColumn] = useState<'small' | 'big' | null>(null);

  useEffect(() => {
    const loadWords = async () => {
      try {
        setIsLoading(true);
        
        // Load small words
        const smallResponse = await fetch('/content/small-words.txt');
        if (smallResponse.ok) {
          const text = await smallResponse.text();
          const smallList = text
            .split('\n')
            .map((word, index) => ({ word: word.trim(), index: index + 1 }))
            .filter(item => item.word.length > 0);
          setSmallWords(smallList);
          setFilteredSmallWords(smallList);
        }
        
        // Load big words
        const bigResponse = await fetch('/content/big-words.txt');
        if (bigResponse.ok) {
          const text = await bigResponse.text();
          const bigList = text
            .split('\n')
            .map((word, index) => ({ word: word.trim(), index: index + 1 }))
            .filter(item => item.word.length > 0);
          setBigWords(bigList);
          setFilteredBigWords(bigList);
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load words');
      } finally {
        setIsLoading(false);
      }
    };

    loadWords();
  }, []);

  useEffect(() => {
    const filteredS = smallWords.filter(item =>
      item.word.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSmallWords(filteredS);

    const filteredB = bigWords.filter(item =>
      item.word.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBigWords(filteredB);
  }, [searchTerm, smallWords, bigWords]);

  const handleAddWord = async () => {
    if (!newWord.trim()) return;
    
    setIsAdding(true);
    try {
      const response = await fetch('/api/add-sight-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          word: newWord.trim(),
          category: addWordType 
        }),
      });
      
      if (!response.ok) throw new Error('Failed to add word');
      
      // Reload words after adding
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add word');
    } finally {
      setIsAdding(false);
    }
  };

  const copyToClipboard = (words: string, type: 'small' | 'big') => {
    navigator.clipboard.writeText(words);
    setCopiedColumn(type);
    setTimeout(() => setCopiedColumn(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading sight words...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-500 mb-2">Error loading sight words</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const smallWordsList = filteredSmallWords.map(w => w.word).join('\n');
  const bigWordsList = filteredBigWords.map(w => w.word).join('\n');

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sight Words Database
              </h1>
            </div>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              variant="outline"
              className="rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Word
            </Button>
          </div>
          <p className="text-muted-foreground">
            View and manage your sight word collections
          </p>
        </div>

        {/* Add Word Form */}
        {showAddForm && (
          <div className="mb-8 p-6 story-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add New Word</h3>
              <Button
                onClick={() => {
                  setShowAddForm(false);
                  setNewWord('');
                }}
                variant="ghost"
                size="sm"
                className="rounded-xl"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-3">
              <select
                value={addWordType}
                onChange={(e) => setAddWordType(e.target.value as 'small' | 'big')}
                className="px-3 py-2 rounded-xl bg-background border"
              >
                <option value="small">Small</option>
                <option value="big">Big</option>
              </select>
              <Input
                type="text"
                placeholder={addWordType === 'small' ? "Enter 3-4 letter word..." : "Enter compound word..."}
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddWord();
                }}
                className="flex-1 rounded-xl"
                disabled={isAdding}
              />
              <Button
                onClick={handleAddWord}
                disabled={!newWord.trim() || isAdding}
                className="modern-button rounded-xl"
              >
                {isAdding ? 'Adding...' : 'Add'}
              </Button>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search words..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-2 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background"
            />
          </div>
          {searchTerm && (
            <p className="mt-2 text-sm text-muted-foreground">
              Found {filteredSmallWords.length + filteredBigWords.length} total matches
            </p>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Small Words Column */}
          <Card className="overflow-hidden rounded-xl border-blue-500/20 bg-card/50 backdrop-blur-sm">
            <div className="p-4 border-b bg-blue-50 dark:bg-blue-950/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300">Small Words</h2>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{filteredSmallWords.length} words</p>
                </div>
                <Button
                  onClick={() => copyToClipboard(smallWordsList, 'small')}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
                >
                  {copiedColumn === 'small' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className="ml-2">Copy</span>
                </Button>
              </div>
            </div>
            <div className="p-4 font-mono text-sm h-[600px] overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
              <pre className="whitespace-pre-wrap break-words">
                {smallWordsList || 'No words found'}
              </pre>
            </div>
          </Card>

          {/* Big Words Column */}
          <Card className="overflow-hidden rounded-xl border-purple-500/20 bg-card/50 backdrop-blur-sm">
            <div className="p-4 border-b bg-purple-50 dark:bg-purple-950/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300">Big Words</h2>
                  <p className="text-sm text-purple-600 dark:text-purple-400">{filteredBigWords.length} words</p>
                </div>
                <Button
                  onClick={() => copyToClipboard(bigWordsList, 'big')}
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:text-purple-700"
                >
                  {copiedColumn === 'big' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className="ml-2">Copy</span>
                </Button>
              </div>
            </div>
            <div className="p-4 font-mono text-sm h-[600px] overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
              <pre className="whitespace-pre-wrap break-words">
                {bigWordsList || 'No words found'}
              </pre>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}