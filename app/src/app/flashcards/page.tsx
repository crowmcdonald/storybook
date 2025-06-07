"use client";

import React, { useState, useEffect, useCallback } from 'react';
import FlashcardSession from '@/components/FlashcardSession';
import { Button } from '@/components/ui/button';
import { Blocks, Sparkles } from 'lucide-react';

const WORD_COUNT_OPTIONS = [10, 25, 50, 100];

type WordType = 'small' | 'big';

// Fisher-Yates shuffle function
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function FlashcardsPage() {
  const [smallWords, setSmallWords] = useState<string[]>([]);
  const [bigWords, setBigWords] = useState<string[]>([]);
  const [wordType, setWordType] = useState<WordType>('small');
  const [selectedWordCount, setSelectedWordCount] = useState<number | null>(null);
  const [sessionWords, setSessionWords] = useState<string[]>([]);
  const [isLoadingWords, setIsLoadingWords] = useState(false);

  const loadWords = useCallback(async () => {
    setIsLoadingWords(true);
    try {
      const smallResponse = await fetch('/content/small-words.txt');
      if (smallResponse.ok) {
        const text = await smallResponse.text();
        setSmallWords(text.split('\n').map(word => word.trim()).filter(word => word.length > 0));
      }
      const bigResponse = await fetch('/content/big-words.txt');
      if (bigResponse.ok) {
        const text = await bigResponse.text();
        setBigWords(text.split('\n').map(word => word.trim()).filter(word => word.length > 0));
      }
    } catch (error) {
      console.error("Failed to load words:", error);
    }
    setIsLoadingWords(false);
  }, []);

  useEffect(() => {
    loadWords();
  }, [loadWords]);

  const startSession = (count: number) => {
    const sourceWords = wordType === 'small' ? smallWords : bigWords;
    if (sourceWords.length > 0) {
      const shuffledWords = shuffleArray(sourceWords);
      setSessionWords(shuffledWords.slice(0, count));
      setSelectedWordCount(count);
    }
  };

  const handleRestartSession = () => {
    setSelectedWordCount(null);
    setSessionWords([]);
  };

  if (selectedWordCount && sessionWords.length > 0) {
    return <FlashcardSession words={sessionWords} onSessionComplete={handleRestartSession} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Choose Your Challenge
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Select the number of flashcards for your practice session.
          </p>
        </div>
        <div className="mb-8">
          <div className="flex gap-2 bg-muted/50 p-1 rounded-xl w-fit mx-auto">
            <button
              onClick={() => setWordType('small')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                wordType === 'small'
                  ? 'bg-white dark:bg-gray-900 shadow-sm text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Blocks className="w-4 h-4 inline-block mr-2" />
              Small Words ({smallWords.length})
            </button>
            <button
              onClick={() => setWordType('big')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                wordType === 'big'
                  ? 'bg-white dark:bg-gray-900 shadow-sm text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Sparkles className="w-4 h-4 inline-block mr-2" />
              Big Words ({bigWords.length})
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {WORD_COUNT_OPTIONS.map((count) => (
            <Button 
              key={count} 
              onClick={() => startSession(count)} 
              size="lg"
              variant="outline"
              className="h-24 rounded-2xl border-2 hover:border-blue-500"
            >
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{count}</div>
                <div className="text-sm text-muted-foreground">Words</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}