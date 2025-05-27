"use client";

import React from 'react';

interface FlashcardProps {
  word: string;
  isRevisit?: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({ word, isRevisit }) => {
  return (
    <div className="flashcard-modern group cursor-pointer w-full max-w-4xl h-96 mx-auto p-16 flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-4 right-6 w-1 h-1 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center w-full">
        {isRevisit && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Revisit
            </span>
          </div>
        )}
        
        <h2 className="text-8xl md:text-9xl font-bold tracking-tight bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent selection:bg-blue-500/20">
          {word}
        </h2>
        
        {/* Subtle accent line */}
        <div className="mt-6 mx-auto w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
      
      {/* Floating animation on hover */}
      <div className="absolute inset-0 transform group-hover:scale-105 transition-transform duration-300 ease-out pointer-events-none"></div>
    </div>
  );
};

export default Flashcard; 