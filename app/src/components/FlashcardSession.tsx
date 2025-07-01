"use client";

import React, { useState, useEffect } from 'react';
import Flashcard from '@/components/Flashcard';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';


export interface WordItem {
  word: string;
  isRevisit?: boolean;
}

// Fisher-Yates shuffle function
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

interface FlashcardSessionProps {
  words: string[];
  onSessionComplete: () => void;
}

export default function FlashcardSession({ words, onSessionComplete }: FlashcardSessionProps) {
  const [currentWords, setCurrentWords] = useState<WordItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConclusion, setShowConclusion] = useState(false);
  const [revisitQueue, setRevisitQueue] = useState<{word: string, targetIndex: number}[]>([]);

  useEffect(() => {
    if (words.length > 0) {
      const wordItems = shuffleArray(words).map(word => ({ word, isRevisit: false }));
      setCurrentWords(wordItems);
      setCurrentIndex(0);
      setShowConclusion(false);
      setRevisitQueue([]);
    }
  }, [words]);

  const handleMarkForRevisit = () => {
    const currentWord = currentWords[currentIndex];
    if (!currentWord.isRevisit) {
      const reappearAfter = Math.floor(Math.random() * 2) + 3; // 3 or 4
      const targetIndex = currentIndex + reappearAfter;
      setRevisitQueue(prev => [...prev, { word: currentWord.word, targetIndex }]);
    }
    handleNext();
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    const revisitWords = revisitQueue.filter(item => item.targetIndex === nextIndex);
    
    if (revisitWords.length > 0) {
      const updatedWords = [...currentWords];
      revisitWords.forEach((item, idx) => {
        updatedWords.splice(nextIndex + idx, 0, { word: item.word, isRevisit: true });
      });
      setCurrentWords(updatedWords);
      setRevisitQueue(prev => prev.filter(item => item.targetIndex !== nextIndex));
    }
    
    if (currentIndex < currentWords.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      setShowConclusion(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  if (showConclusion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg animate-bounce">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Session Complete!
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Fantastic work! You&apos;ve reviewed <span className="font-semibold text-foreground">{currentWords.length}</span> words.
            <br />
            Keep up the great learning momentum!
          </p>
          <Button 
            onClick={onSessionComplete} 
            size="lg"
            className="modern-button px-8 py-4 text-lg font-semibold rounded-2xl"
          >
            Back to Blends
          </Button>
        </div>
      </div>
    );
  }

  if (currentWords.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading session...</p>
      </div>
    );
  }

  const currentWord = currentWords[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl mb-12">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-medium text-muted-foreground">Progress</span>
          <span className="text-xl font-medium text-muted-foreground">
            {currentIndex + 1} of {currentWords.length}
            {currentWord.isRevisit && (
              <span className="ml-2 text-sm text-orange-500">(Revisit)</span>
            )}
          </span>
        </div>
        <div className="flex items-center w-full">
          <div className="w-1 h-8 bg-muted-foreground/50 rounded-full mr-2"></div>
          <div className="flex-1 bg-muted rounded-full h-4 relative">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / currentWords.length) * 100}%` }}
            />
          </div>
          <div className="w-1 h-8 bg-muted-foreground/50 rounded-full ml-2"></div>
        </div>
      </div>
      <div className="mb-8">
        <Flashcard word={currentWord.word} isRevisit={currentWord.isRevisit} />
      </div>
      <div className="mb-8">
        <Button
          onClick={handleMarkForRevisit}
          variant="outline"
          size="lg"
          className="px-8 py-4 rounded-2xl text-lg font-medium border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Mark for Revisit
        </Button>
      </div>
      <div className="flex items-center space-x-6 mb-12">
        <Button 
          onClick={handlePrevious} 
          disabled={currentIndex === 0}
          size="lg"
          variant="outline"
          className="px-12 py-6 rounded-2xl text-2xl font-semibold disabled:opacity-50 hover:scale-105 transition-all duration-300 focus-modern"
        >
          Previous
        </Button>
        <div className="px-8 py-4 bg-muted/50 rounded-2xl">
          <span className="text-3xl font-bold text-foreground">
            {currentIndex + 1}
          </span>
          <span className="text-2xl text-muted-foreground"> / </span>
          <span className="text-3xl font-bold text-foreground">
            {currentWords.length}
          </span>
        </div>
        <Button 
          onClick={handleNext} 
          size="lg"
          className="modern-button px-12 py-6 rounded-2xl text-2xl font-semibold hover:scale-105 transition-all duration-300"
        >
          {currentIndex === currentWords.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
      <Button 
        onClick={onSessionComplete} 
        variant="ghost" 
        className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-300 rounded-xl px-6 py-3"
      >
        End Session
      </Button>
    </div>
  );
} 