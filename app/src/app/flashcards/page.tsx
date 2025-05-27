"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Flashcard from '@/components/Flashcard';
import { Button } from '@/components/ui/button';
import { Blocks, Sparkles, RotateCcw } from 'lucide-react';

const WORD_COUNT_OPTIONS = [10, 25, 50, 100];

type WordType = 'small' | 'big';

interface WordItem {
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

export default function FlashcardsPage() {
  const [smallWords, setSmallWords] = useState<string[]>([]);
  const [bigWords, setBigWords] = useState<string[]>([]);
  const [wordType, setWordType] = useState<WordType>('small');
  const [selectedWordCount, setSelectedWordCount] = useState<number | null>(null);
  const [currentWords, setCurrentWords] = useState<WordItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoadingWords, setIsLoadingWords] = useState(false);
  const [showConclusion, setShowConclusion] = useState(false);
  const [revisitQueue, setRevisitQueue] = useState<{word: string, targetIndex: number}[]>([]);

  const loadWords = useCallback(async () => {
    setIsLoadingWords(true);
    try {
      // Load small words
      const smallResponse = await fetch('/content/small-words.txt');
      if (smallResponse.ok) {
        const text = await smallResponse.text();
        const words = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        setSmallWords(words);
      }

      // Load big words
      const bigResponse = await fetch('/content/big-words.txt');
      if (bigResponse.ok) {
        const text = await bigResponse.text();
        const words = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        setBigWords(words);
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
    if (sourceWords.length === 0) {
      console.warn("Word list is empty or not loaded yet.");
      return;
    }
    const shuffledWords = shuffleArray(sourceWords);
    const wordItems = shuffledWords.slice(0, count).map(word => ({ word, isRevisit: false }));
    setCurrentWords(wordItems);
    setCurrentIndex(0);
    setShowConclusion(false);
    setIsLoadingWords(false);
    setRevisitQueue([]);
  };

  const handleWordCountSelect = (count: number) => {
    setSelectedWordCount(count);
    setIsLoadingWords(true);
    setTimeout(() => startSession(count), 100);
  };

  const handleMarkForRevisit = () => {
    const currentWord = currentWords[currentIndex];
    if (!currentWord.isRevisit) {
      // Add to revisit queue to reappear 3-4 cards later
      const reappearAfter = Math.floor(Math.random() * 2) + 3; // 3 or 4
      const targetIndex = currentIndex + reappearAfter;
      
      setRevisitQueue(prev => [...prev, { word: currentWord.word, targetIndex }]);
    }
    handleNext();
  };

  const handleNext = () => {
    // Check if we need to insert a revisit word at the next position
    const nextIndex = currentIndex + 1;
    const revisitWords = revisitQueue.filter(item => item.targetIndex === nextIndex);
    
    if (revisitWords.length > 0) {
      // Insert revisit words into the current words array
      const updatedWords = [...currentWords];
      revisitWords.forEach((item, idx) => {
        updatedWords.splice(nextIndex + idx, 0, { word: item.word, isRevisit: true });
      });
      setCurrentWords(updatedWords);
      
      // Remove processed words from queue
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

  const handleRestartSession = () => {
    setSelectedWordCount(null);
    setCurrentWords([]);
    setShowConclusion(false);
    setRevisitQueue([]);
  };

  if (showConclusion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-2xl mx-auto">
          {/* Success animation */}
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg animate-bounce">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Session Complete!
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Fantastic work! You&apos;ve reviewed <span className="font-semibold text-foreground">{currentWords.length}</span> {wordType === 'small' ? 'small' : 'big'} words.
            <br />
            Keep up the great learning momentum!
          </p>
          
          <Button 
            onClick={handleRestartSession} 
            size="lg"
            className="modern-button px-8 py-4 text-lg font-semibold rounded-2xl"
          >
            Start New Session
          </Button>
        </div>
      </div>
    );
  }

  if (!selectedWordCount || isLoadingWords && selectedWordCount) {
    const title = isLoadingWords ? `Preparing ${selectedWordCount} Words...` : "Choose Your Challenge";
    
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {isLoadingWords 
                ? "Shuffling words and preparing your personalized learning session..." 
                : "Select the number of flashcards for your practice session. Each word is carefully selected to help improve your reading skills."
              }
            </p>
          </div>

          {/* Word Type Toggle */}
          {!isLoadingWords && (
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
                  Small Words
                  <span className="ml-2 text-sm opacity-70">({smallWords.length})</span>
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
                  Big Words
                  <span className="ml-2 text-sm opacity-70">({bigWords.length})</span>
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {wordType === 'small' 
                  ? "Basic 3-4 letter building blocks for reading foundation"
                  : "Complex words built from smaller word parts"}
              </p>
            </div>
          )}
          
          {isLoadingWords ? (
            <div className="flex flex-col items-center space-y-8">
              <Flashcard word="Ready?" />
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {WORD_COUNT_OPTIONS.map((count) => (
                <Button 
                  key={count} 
                  onClick={() => handleWordCountSelect(count)} 
                  size="lg"
                  variant="outline"
                  className="h-24 rounded-2xl border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 focus-modern group"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                      {count}
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-foreground">
                      Words
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  if (currentWords.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-600 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-foreground">
            No Words Available
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Unable to load the word list. Please check your connection and try again.
          </p>
          <Button 
            onClick={handleRestartSession}
            size="lg"
            className="modern-button px-8 py-4 text-lg font-semibold rounded-2xl"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const currentWord = currentWords[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Progress bar */}
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

      {/* Flashcard */}
      <div className="mb-8">
        <Flashcard word={currentWord.word} isRevisit={currentWord.isRevisit} />
      </div>

      {/* Mark for Revisit Button */}
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

      {/* Navigation controls */}
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

      {/* Session controls */}
      <Button 
        onClick={handleRestartSession} 
        variant="ghost" 
        className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-300 rounded-xl px-6 py-3"
      >
        Change Settings or End Session
      </Button>
    </div>
  );
}